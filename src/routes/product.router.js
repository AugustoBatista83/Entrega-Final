import { Router } from 'express';
import ProductManager from '../manager/product.manager.js';

const router = Router();
const productManager = new ProductManager();




// Ruta para crear un nuevo producto
router.post('/', async (req, res) => {
    try {
        const data = req.body;
        const result = await productManager.create(data);
        res.send(result);
    } catch (error) {
        console.error('Error al crear el producto:', error);
        res.status(500).send('Error al crear el producto');
    }
});

// Ruta para obtener la lista de productos
router.get('/', async (req, res) => {
    try {
        const products = await productManager.list();
        res.send(products);
    } catch (error) {
        console.error('Error al obtener la lista de productos:', error);
        res.status(500).send('Error al obtener la lista de productos');
    }
});

// Ruta para obtener un producto por su ID
router.get('/:pid', async (req, res) => {
    try {
        const productId = req.params.pid;
        const product = await productManager.getById(productId);

        if (product) {
            res.send(product);
        } else {
            res.status(404).send('Producto no encontrado');
        }
    } catch (error) {
        console.error('Error al obtener el producto:', error);
        res.status(500).send('Error al obtener el producto');
    }
});


export default router;
