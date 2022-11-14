const fs = require('fs');

class Contenedor {
    constructor(name) {
        this.filename = name;
    }

    async getAll() {

        try {
            const contenido = await fs.promises.readFile(this.filename, "UTF-8");
            if(contenido.length > 0) {
                const productos = JSON.parse(contenido);
                return productos;
            }

            return "Archivo vacío";
        } catch (error) {
            return "El archivo no puede ser leído";
        }
    }

    async save(product) {
        try {
            const productos = await this.getAll();
            if(productos.length > 0) {
               const lastId = productos[productos.length - 1].id + 1;
               product.id = lastId;
               productos.push(product);
               await fs.promises.writeFile(this.filename, JSON.stringify(productos, null, 2));
            } else {
                product.id = 1;
                await fs.promises.writeFile(this.filename, JSON.stringify(product, null, 2));
            }
        } catch (error) {
            return "El producto no pudo ser guardado";
        }
    }

    getName() {
        return this.filename;
    }

    async getById(id) {
        try {
            const productos = await this.getAll();
            // Buscar producto por el id
            const producto = productos.find((elemento) => elemento.id === id);
            return producto;
        } catch (error) {
            return "El producto no se encuentra";
        }
    }

    async deleteById(id) {
        try {
            const productos = await this.getAll();
            const newProductos = productos.filter((elemento) => elemento.id !== id);
            
            if(newProductos) {
                await fs.promises.writeFile(this.filename, JSON.stringify(newProductos, null, 2));
                return `El producto id ${id} ha sido eliminado`;
            }
            return `No se ha encontrado el producto id ${id} por lo tanto no pudo ser eliminado`;
        } catch (error) {
            return "El elemento no puede ser eliminado";
        }
    }

    async deleteAll() {
        try {
            await fs.promises.writeFile(this.filename, "");
            return "Todos los productos fueron eliminados correctamente";
        } catch (error) {
            return "No se pudieron eliminar los elementos";
        }
    }
}

module.exports = Contenedor;