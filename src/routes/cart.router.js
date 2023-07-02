import { Router } from 'express';
import CartManager from '../manager/cart.manager.js';

const router = Router();
const cartManager = new CartManager();

// Ruta para obtener la lista de carritos
router.get('/', async (req, res) => {
    const result = await cartManager.list();
    res.send(result);
});

// Ruta para agregar un producto a un carrito específico
router.get('/:cid/:pid', async (req, res) => {
    const cid = parseInt(req.params.cid);
    const pid = parseInt(req.params.pid);

    const result = await cartManager.addProduct(cid, pid);
    res.send(result);
});

// Ruta para crear un nuevo carrito
router.post('/', async (req, res) => {
    const result = await cartManager.create();
    res.send(result);
});

export default router;
