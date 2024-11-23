import express from 'express';
import productsRoutes from './router/products.routes.js';
import cartsRoutes from './router/carts.routes.js';

const app = express();
const PORT = 8080;
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api/products', productsRoutes);
app.use('/api/carts', cartsRoutes);

app.listen(PORT, ()=>{
    console.log(`Server Listo en el puerto: ${PORT}`);
});