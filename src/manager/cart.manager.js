import FileManager from "./file.manager.js";

export default class CartManager extends FileManager {
    
    constructor() {
        super('./carts.json');
    }

    // Método para crear un nuevo carrito
    create = async () => {
        const data = {
            products: []
        };

        return await this.set(data);
    }

    // Método para agregar un producto a un carrito existente
    addProduct = async (cartId, productId) => {
        const cart = await this.getById(cartId);
        
        if (cart) {
            cart.products.push(productId);
            return await this.update(cart);
        } else {
            console.error('Carrito no encontrado con el ID:', cartId);
        }
    }

    // Método para obtener la lista de carritos
    list = async () => {
        return await this.get();
    }
}
