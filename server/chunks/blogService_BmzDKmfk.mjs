import { h as httpService } from './httpService_BN6QZkFS.mjs';
import { c as config } from './config_CL3T0jDM.mjs';

class BlogService {
  // --- MÉTODOS DE OBTENCIÓN (Sin cambios) ---
  async getAllBlogs() {
    let allBlogs = [];
    let currentPage = 1;
    let lastPage = 1;
    let hasMorePages = true;
    while (hasMorePages) {
      const response = await httpService.get(
        `${config.endpoints.blogs.list}?page=${currentPage}`
      );
      if (response && response.success && response.data.data.length > 0) {
        allBlogs = [...allBlogs, ...response.data.data];
        lastPage = response.data.last_page;
        if (currentPage >= lastPage) {
          hasMorePages = false;
        } else {
          currentPage++;
        }
      } else {
        hasMorePages = false;
      }
    }
    return {
      success: true,
      message: "Todos los blogs obtenidos exitosamente.",
      status: 200,
      data: {
        data: allBlogs,
        current_page: 1,
        last_page: 1,
        per_page: allBlogs.length,
        total: allBlogs.length
      }
    };
  }
  getBlogByLink(link) {
    return httpService.get(`/api/blogs/link/${link}`);
  }
  // --- MÉTODOS DE MODIFICACIÓN ---
  createBlog(blogData) {
    const formData = this.buildFormData(blogData, "create");
    return httpService.authenticatedPostFormData(config.endpoints.blogs.create, formData);
  }
  updateBlog(id, blogData) {
    const formData = this.buildFormData(blogData, "update");
    formData.append("_method", "PATCH");
    return httpService.authenticatedPostFormData(`/api/blogs/${id}`, formData);
  }
  deleteBlog(id) {
    return httpService.authenticatedDelete(`/api/blogs/${id}`);
  }
  // --- FUNCIÓN PRIVADA Y ADAPTADA PARA CONSTRUIR FORMDATA ---
  /**
   * Construye el FormData para crear o actualizar un blog.
   * Traduce los campos de BlogFormData a lo que la API espera.
   */
  buildFormData(data, mode) {
    const formData = new FormData();
    formData.append("producto_id", data.producto_id || "");
    formData.append("link", data.link || "");
    formData.append("subtitulo", data.titulo || "");
    if (data.parrafo) {
      formData.append("parrafos[0]", data.parrafo);
    }
    if (data.url_video) {
      formData.append("url_video", data.url_video);
    }
    if (data.imagen_principal instanceof File) {
      formData.append("imagen_principal", data.imagen_principal);
    }
    if (data.imagenes?.length) {
      data.imagenes.forEach((img, i) => {
        if (img.url_imagen instanceof File) {
          formData.append(`imagenes[${i}]`, img.url_imagen);
          formData.append(`alt_imagenes[${i}]`, img.parrafo_imagen || "");
        }
      });
    }
    return formData;
  }
  // Generar un link automáticamente a partir del título
  generateLinkFromTitle(title) {
    return title.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").trim();
  }
}
const blogService = new BlogService();

export { blogService as b };
