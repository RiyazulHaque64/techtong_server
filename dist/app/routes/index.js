"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Auth_routes_1 = require("../modules/Auth/Auth.routes");
const User_routes_1 = require("../modules/User/User.routes");
const Product_routes_1 = require("../modules/Product/Product.routes");
const Image_routes_1 = require("../modules/Image/Image.routes");
const Category_routes_1 = require("../modules/Category/Category.routes");
const Brand_routes_1 = require("../modules/Brand/Brand.routes");
const Address_routes_1 = require("../modules/Address/Address.routes");
const Attribute_routes_1 = require("../modules/Attribute/Attribute.routes");
const Cart_routes_1 = require("../modules/Cart/Cart.routes");
const Order_routes_1 = require("../modules/Order/Order.routes");
const Coupon_routes_1 = require("../modules/Coupon/Coupon.routes");
const Review_routes_1 = require("../modules/Review/Review.routes");
const router = (0, express_1.Router)();
const routes = [
    {
        path: "/auth",
        route: Auth_routes_1.AuthRoutes,
    },
    {
        path: "/user",
        route: User_routes_1.UserRoutes,
    },
    {
        path: "/product",
        route: Product_routes_1.ProductRoutes,
    },
    {
        path: "/cart",
        route: Cart_routes_1.CartRoutes,
    },
    {
        path: "/order",
        route: Order_routes_1.OrderRoutes,
    },
    {
        path: "/category",
        route: Category_routes_1.CategoryRoutes,
    },
    {
        path: "/brand",
        route: Brand_routes_1.BrandRoutes,
    },
    {
        path: "/address",
        route: Address_routes_1.AddressRoutes,
    },
    {
        path: "/image",
        route: Image_routes_1.ImageRoutes,
    },
    {
        path: "/attribute",
        route: Attribute_routes_1.AttributeRoutes,
    },
    {
        path: "/coupon",
        route: Coupon_routes_1.CouponRoutes,
    },
    {
        path: "/review",
        route: Review_routes_1.ReviewRoutes,
    },
];
routes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
