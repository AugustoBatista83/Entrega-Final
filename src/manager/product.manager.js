import FileManager from "./file.manager.js";

export default class ProductManager extends FileManager {

    constructor() {
        super('./products.json');
    }

    // Método para crear un nuevo producto
    create = async (data) => {
        await this.set(data);
        return data;
    }

    // Método para obtener la lista de productos
    list = async () => {
        return await this.get();
    }

}
