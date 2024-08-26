import express from 'express';
import { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct } from '../controllers/product.controller.js';
import { verifyJWT } from "../middlewares/auth.middleware.js";
const router = express.Router();
router.route("/").get(verifyJWT, getAllProducts)
router.route("/:product_id").get(verifyJWT, getProductById)
router.route("/").post(verifyJWT, createProduct)
router.route("/:product_id").put(verifyJWT, updateProduct)
router.route("/:product_id").delete(verifyJWT, deleteProduct)

export default router;
