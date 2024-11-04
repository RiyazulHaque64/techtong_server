import { Router } from "express";
import { AuthRoutes } from "../modules/Auth/Auth.routes";
import { UserRoutes } from "../modules/User/User.routes";
import { ProductRoutes } from "../modules/Product/Product.routes";
import { ImageRoutes } from "../modules/Image/Image.routes";
import { CategoryRoutes } from "../modules/Category/Category.routes";
import { BrandRoutes } from "../modules/Brand/Brand.routes";
import { AddressRoutes } from "../modules/Address/Address.routes";
import { AttributeRoutes } from "../modules/Attribute/Attribute.routes";
import { CartRoutes } from "../modules/Cart/Cart.routes";

const router = Router();

const routes = [
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/user",
    route: UserRoutes,
  },
  {
    path: "/product",
    route: ProductRoutes,
  },
  {
    path: "/cart",
    route: CartRoutes,
  },
  {
    path: "/category",
    route: CategoryRoutes,
  },
  {
    path: "/brand",
    route: BrandRoutes,
  },
  {
    path: "/address",
    route: AddressRoutes,
  },
  {
    path: "/image",
    route: ImageRoutes,
  },
  {
    path: "/attribute",
    route: AttributeRoutes,
  },
];

routes.forEach((route) => router.use(route.path, route.route));

export default router;
