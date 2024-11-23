import { Router } from "express";
import { ProductManager } from "../managers/ProductManager.js";
const router = Router();

const productManager = new ProductManager();
router.get('/', async (req, res) => {
    const { limit } = req.query;
    try {
        const products = await productManager.getProducts(limit);
        res.status(200).send(products);
    } catch (error) {
        res.status(500).send(error);
    }
});
router.get('/:pid', async (req, res) => {
    const { pid } = req.params;
    try {
        const product = await productManager.getProductById(pid);
        res.status(200).send(product);
    } catch (error) {
        res.status(500).send(error);
    }
});
router.post('/', async (req, res) => {
    const product = req.body;
    try {
        const newProduct = await productManager.addProduct(product);
        res.status(201).send(newProduct);
    } catch (error) {
        res.status(400).send(error.message);
        console.log(error.message);
    }
});
router.put('/:pid', async (req, res) => {
    const { pid } = req.params;
    const updatedProduct = req.body;
    try {
        const updatedProductData = await productManager.updateProduct(pid, updatedProduct);
        res.status(200).send(updatedProductData);
    } catch (error) {
        res.status(404).send(error.message);
    }
});
router.delete('/:pid', async (req, res) => {
    const { pid } = req.params;
    try {
        const product = await productManager.deleteProduct(pid);
        res.status(204).send(product);
    } catch (error) {
        res.status(404).send(error.message)
    }
});

export default router