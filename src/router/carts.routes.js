import { Router } from 'express';
import { CartManager } from '../managers/CartManager.js';
import { ProductManager } from '../managers/ProductManager.js';

const cartManager = new CartManager();
const productManager = new ProductManager();
const router = Router();

router.get('/', (req, res) => {
    try {
        const carts = cartManager.getCarts();
        res.status(200).send(carts);
    } catch (error) {
        console.log(error);
    }
})
router.post('/', async(req, res) => {
    try {
        const cart = await cartManager.createCart();
        res.status(200).send(cart);
    } catch (error) {
        res.status(500).send(error.message);
    };
});
router.get('/:cid', async(req, res) => {
    const { cid } = req.params;
    try {
        const cart = await cartManager.getCartById(cid);
        res.status(200).send(cart);
    } catch (error) {
        res.status(500).send(error.message);
    }
});
router.post('/:cid/products/:pid', async(req, res) => {
    const { cid, pid } = req.params;
    try {
        const product = await productManager.getProductById(pid);
        if (!product){
            throw new Error(`No se encuentra el producto con el id: ${pid}`);
        };
        const cart = await cartManager.addProductToCart(cid, pid);
        res.status(200).send(cart);
    } catch (error) {
        res.status(500).send(error.message);
    };
})

export default router