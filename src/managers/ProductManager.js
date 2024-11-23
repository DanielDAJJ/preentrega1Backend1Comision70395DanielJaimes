import fs from 'fs';
import { v4 as uuid } from "uuid";

export class ProductManager {
    constructor() {
        this.products = [];
        this.path = './src/managers/data/products.json'
    };
    async getProducts(limit){
            const file = await fs.promises.readFile(this.path, "utf-8");
            const fileParse = JSON.parse(file);
            this.products = fileParse || [];
            if(!limit) return this.products;
            return this.products.slice(0, limit);
    };
    async getProductById(id){
        const products = await this.getProducts();
        const product = products.find(product => product.id === id);
        if (!product) throw new Error(`No existe un producto con este id: ${id}`);
        return product;        
    };
    async addProduct(product){
        const products = await this.getProducts();
        const { title, description, price, thumbnail, code, stock, category } = product;
        const newProduct = {
            id: uuid(),
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
            status: true,
            category
        };
        const productExist = products.find(product => product.code === code || product.title === title);
        if(productExist){
            throw new Error(`el producto: ${product.title} ya existe`)
        };
        if(!title || !description || !price || !code || !stock || !category){
            throw new Error(`debes completar los campos en el producto`);
        }
        products.push(newProduct);
        await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2)); 
        return products;
    };
    async updateProduct(id, data){
        const products = await this.getProducts();
        let product = await this.getProductById(id);
        const index = products.indexOf(product);
        products[index] = {
            ...product,
            ...data
        };
        await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));
        return products[index];
    };
    async deleteProduct(id){
       const product = await this.getProductById(id);
       this.products = this.products.filter(product => product.id !== id);
       await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, 2));
       return console.log(`el producto ${product.title} con el ${product.id} ha sido eliminado`);
    };
};
