import fs from 'fs';
import { v4 as uuid } from 'uuid';

export class CartManager {
    constructor() {
        this.carts = [];
        this.path = './src/managers/data/carts.json'
    };
    async getCarts(){
        const file = await fs.promises.readFile(this.path, "utf-8");
        const fileParse = JSON.parse(file);
        this.carts = fileParse || [];
        return this.carts;
    };
    async createCart(){
        const carts = await this.getCarts();
        const newCart = {
            id: uuid(),
            products: [],
        };
        carts.push(newCart);
        await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2));
        return newCart;
    };
    async getCartById(cid){
        const carts = await this.getCarts();
        const cart = carts.find(cart => cart.id === cid);
        if (!cart) throw new Error(`No existe un carrito con este id: ${cid}`);
        return cart;
    };
    async addProductToCart(cid, pid){
        const cart =  await this.getCartById(cid);
        const product = cart.products.find(productCart => productCart.id === pid);
        if (!product) {
            cart.products.push({id: pid, quantity: 1});
        } else {
            product.quantity += 1;
        };
        await fs.promises.writeFile(this.path, JSON.stringify(this.carts, null, 2));
        return cart;
    };
}