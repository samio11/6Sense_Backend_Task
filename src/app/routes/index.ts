import { Router } from "express";
import { CategoryRoutes } from "../modules/category/category.routes";

export const rootRouter = Router();

const moduleRoutes = [
  {
    path: "/category",
    element: CategoryRoutes,
  }
];

moduleRoutes.forEach((x) => rootRouter.use(x.path, x.element));