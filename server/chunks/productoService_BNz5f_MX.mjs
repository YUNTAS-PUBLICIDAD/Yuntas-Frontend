import { c as config } from './config_CL3T0jDM.mjs';
import { h as httpService } from './httpService_BN6QZkFS.mjs';

class ProductoService {
  async getAllProductos(page = 1, perPage = 6) {
    try {
      const url = `${config.endpoints.productos.list}?page=${page}&perPage=${perPage}`;
      const response = await fetch(config.apiUrl + url);
      const data = await response.json();
      console.log("response from getAllProductos2:", data);
      return data;
    } catch (error) {
      console.error("[ProductoService] Error obteniendo productos:", error);
      throw error;
    }
  }
  async getProductoById(id) {
    try {
      const response = await httpService.get(config.endpoints.productos.detail(id));
      return response;
    } catch (error) {
      console.error("[ProductoService] Error obteniendo producto:", error);
      throw error;
    }
  }
  async getProductoByLink(link) {
    try {
      const response = await httpService.get(config.endpoints.productos.link(link));
      return response;
    } catch (error) {
      console.error("[ProductoService] Error obteniendo producto por link:", error);
      throw error;
    }
  }
  async createProducto(productData) {
    try {
      const formData = this.buildFormData(productData);
      const response = await httpService.authenticatedPostFormData(config.endpoints.productos.create, formData);
      return response;
    } catch (error) {
      console.error("[ProductoService] Error creando producto:", error);
      throw error;
    }
  }
  async updateProducto(id, productData) {
    try {
      const formData = this.buildFormData(productData);
      const response = await httpService.authenticatedPutFormData(config.endpoints.productos.update(id), formData);
      return response;
    } catch (error) {
      console.error("[ProductoService] Error actualizando producto:", error);
      throw error;
    }
  }
  async deleteProducto(id) {
    try {
      const response = await httpService.authenticatedDelete(config.endpoints.productos.delete(id));
      return response;
    } catch (error) {
      console.error("[ProductoService] Error eliminando producto:", error);
      throw error;
    }
  }
  buildFormData(productoData) {
    const formData = new FormData();
    formData.append("link", productoData.link);
    formData.append("nombre", productoData.nombre);
    formData.append("titulo", productoData.titulo);
    formData.append("descripcion", productoData.descripcion);
    formData.append("seccion", productoData.seccion);
    if (productoData.imagen_principal_file) {
      formData.append("imagen_principal", productoData.imagen_principal_file);
    }
    if (productoData.imagenes_files) {
      productoData.imagenes_files.forEach((file, index) => {
        formData.append(`imagenes[${index}]`, file);
      });
    }
    return formData;
  }
}
const productoService = new ProductoService();

export { productoService as p };
