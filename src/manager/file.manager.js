import fs from 'fs';

class FileManager {
  constructor(filename = './db.json') {
    this.filename = filename;
  }

  // Método para obtener el siguiente ID en base a una lista de elementos
  getNextId = (list) => {
    return list.length === 0 ? 1 : list[list.length - 1].id + 1;
  };

  // Método para obtener todos los datos del archivo
  get = async () => {
    try {
      const fileContent = await fs.promises.readFile(this.filename, 'utf-8');
      return JSON.parse(fileContent); // Parsea los datos del archivo como JSON
    } catch (error) {
      console.error('Error al leer el archivo:', error);
      return []; // Devuelve una lista vacía si ocurre un error en la lectura del archivo
    }
  };

  // Método para obtener un elemento por ID
  getById = async (id) => {
    const data = await this.get(); // Obtiene todos los datos del archivo
    return data.find((d) => d.id === id); // Busca el elemento que coincida con el ID proporcionado
  };

  // Método para agregar un nuevo elemento al archivo
  set = async (data) => {
    const list = await this.get(); // Obtiene todos los datos del archivo
    data.id = this.getNextId(list); // Asigna un nuevo ID al objeto de datos
    list.push(data); // Agrega el objeto de datos a la lista
    try {
      await fs.promises.writeFile(this.filename, JSON.stringify(list)); // Guarda la lista actualizada en el archivo
    } catch (error) {
      console.error('Error al escribir en el archivo:', error);
    }
  };

  // Método para actualizar un elemento existente en el archivo
  update = async (data) => {
    const list = await this.get(); // Obtiene todos los datos del archivo
    const idx = list.findIndex((a) => a.id === data.id); // Busca el índice del elemento que coincide con el ID proporcionado
    if (idx !== -1) {
      list[idx] = data; // Reemplaza el elemento existente con el objeto de datos proporcionado
      try {
        await fs.promises.writeFile(this.filename, JSON.stringify(list)); // Guarda la lista actualizada en el archivo
      } catch (error) {
        console.error('Error al escribir en el archivo:', error);
      }
    } else {
      console.error('Elemento no encontrado con el ID:', data.id);
    }
  };
}

export default FileManager;
