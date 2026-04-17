import { Router } from "express";
import { CategoryRoutes } from "../modules/category/category.routes";
import { ProductRoutes } from "../modules/product/product.routes";

export const rootRouter = Router();

const moduleRoutes = [
  {
    path: "/category",
    element: CategoryRoutes,
  },
  {
    path: "/product",
    element: ProductRoutes,
  }
];

moduleRoutes.forEach((x) => rootRouter.use(x.path, x.element));