import { AppError } from '../../errors/AppError';
import { QueryBuilder } from '../../utils/QueryBuilder';
import { Category } from '../category/category.model';
import { IProduct } from './product.interface';
import { Product } from './product.model';
import { generateProductCodeBase } from './product.utils';


const createUniqueProductCode = async (name: string) => {
  const baseCode = generateProductCodeBase(name);

  let finalCode = baseCode;
  let counter = 1;

  while (await Product.findOne({ productCode: finalCode })) {
    finalCode = `${baseCode}-${counter}`;
    counter++;
  }

  return finalCode;
};

const createProduct = async (payload: IProduct) => {
  const categoryExists = await Category.findById(payload.category);

  if (!categoryExists) {
    throw new AppError(401, 'Invalid category ID');
  }

  const productCode = await createUniqueProductCode(payload.name);

  const productData = {
    ...payload,
    productCode,
  };

  const result = await Product.create(productData);
  return result;
};


const updateProduct = async (
  productId: string,
  payload: Partial<Pick<IProduct, 'status' | 'description' | 'discount'>>
) => {
  const product = await Product.findById(productId);

  if (!product) {
    throw new AppError(404, 'Product not found');
  }

  if (payload.discount !== undefined) {
    if (payload.discount < 0 || payload.discount > 100) {
      throw new AppError(
        401,
        'Discount must be between 0 and 100'
      );
    }
  }

  const result = await Product.findByIdAndUpdate(productId, payload, {
    new: true,
    runValidators: true,
  }).populate('category');

  return result;
};


const getAllProducts = async (query: Record<string, string>) => {
  if (query.category) {
    const categoryExists = await Category.findById(query.category);

    if (!categoryExists) {
      throw new AppError(401, 'Invalid category ID');
    }
  }

  const queryBuilder = new QueryBuilder(
    Product.find().populate('category'),
    query
  )
    .search(['name'])
    .filter()
    .sort()
    .fields()
    .paginate();

  const products = await queryBuilder.builder();

  const result = products.map((product: any) => {
    const originalPrice = product.price;
    const discount = product.discount || 0;
    const finalPrice = Number(
      (originalPrice - (originalPrice * discount) / 100).toFixed(2)
    );

    return {
      _id: product._id,
      name: product.name,
      description: product.description,
      image: product.image,
      status: product.status,
      productCode: product.productCode,
      category: product.category,
      pricing: {
        originalPrice,
        discount,
        finalPrice,
      },
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    };
  });

  return result;
};

export const ProductServices = {
  createProduct,
  updateProduct,
  getAllProducts,
};
