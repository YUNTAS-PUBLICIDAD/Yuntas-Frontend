import { httpService } from "./httpService";
import { config } from "../../config";
import type Blog from "../models/Blog";
import type { BlogFormData } from "../models/Blog";

interface BlogPagination {
  data: Blog[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

interface BlogListResponse {
  success: boolean;
  data: BlogPagination;
  message: string;
  status: number;
}

interface BlogDetailResponse {
  success: boolean;
  data: Blog;
  message: string;
  status: number;
}

class BlogService {
  // --- MÉTODOS DE OBTENCIÓN (CORREGIDOS) ---

  async getAllBlogs(): Promise<BlogListResponse> {
    let allBlogs: Blog[] = [];
    let currentPage = 1;
    let lastPage = 1;
    let hasMorePages = true;

    while (hasMorePages) {
      try {
        // Usar httpService.authenticatedGet si necesitas autenticación
        const response = await httpService.get<BlogPagination>(
          `${config.endpoints.blogs.list}?page=${currentPage}`
        );

        if (response.success && response.data.data.length > 0) {
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
      } catch (error) {
        console.error(`Error obteniendo página ${currentPage}:`, error);
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
        total: allBlogs.length,
      },
    };
  }

  async getBlogByLink(link: string): Promise<BlogDetailResponse> {
    // Usar la función de la configuración
    return await httpService.get<Blog>(config.endpoints.blogs.link(link));
  }

  // --- MÉTODOS DE MODIFICACIÓN (CORREGIDOS) ---

  async createBlog(blogData: BlogFormData): Promise<BlogDetailResponse> {
    const formData = this.buildFormData(blogData, "create");
    return await httpService.authenticatedPostFormData<Blog>(
      config.endpoints.blogs.create,
      formData
    );
  }

  async updateBlog(
    id: number | string,
    blogData: BlogFormData
  ): Promise<BlogDetailResponse> {
    const formData = this.buildFormData(blogData, "update");

    // Para PATCH con FormData, necesitamos usar el método POST con _method
    formData.append("_method", "PATCH");

    return await httpService.authenticatedPostFormData<Blog>(
      config.endpoints.blogs.update(id),
      formData
    );
  }

  async deleteBlog(id: number | string): Promise<any> {
    return await httpService.authenticatedDelete(
      config.endpoints.blogs.delete(id)
    );
  }

  // --- FUNCIÓN PRIVADA PARA CONSTRUIR FORMDATA ---

  private buildFormData(
    data: BlogFormData,
    mode: "create" | "update"
  ): FormData {
    const formData = new FormData();

    // Campos básicos
    formData.append("producto_id", data.producto_id || "");
    formData.append("link", data.link || "");
    formData.append("subtitulo", data.titulo || "");

    // Parrafos
    if (data.parrafo) {
      formData.append("parrafos[0]", data.parrafo);
    }

    // Video
    if (data.url_video) {
      formData.append("url_video", data.url_video);
    }

    // Imagen principal (solo si es un archivo nuevo)
    if (data.imagen_principal instanceof File) {
      formData.append("imagen_principal", data.imagen_principal);
    }

    // Imágenes adicionales
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

  generateLinkFromTitle(title: string): string {
    return title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  }
}

export const blogService = new BlogService();
