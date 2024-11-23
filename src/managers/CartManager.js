import fs from 'fs';
import { v4 as uuid } from 'uuid';

export class CartManager {
    constructor() {
        this.carts = [];
        this.path = './src/managers/data/carts.json';
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
    async getCartById(id){
        const carts = await this.getCarts();
        const cart = carts.find((c) => c.id === id);
        if(!cart) throw new Error ('No se encontro el carrito');
        return carts;
    };
    async addProductToCart(cid, pid){
        const cart = await this.getCartById(cid);
        const product = cart.products.find(product => product.id === pid);
        if (!product) {
            cart.products.push({id:pid, quantity:1});
        } else {
            product.quantity ++;
        };
        await fs.promises.writeFile(this.path, JSON.stringify(cart, null, 2));
        return cart;
    };
}