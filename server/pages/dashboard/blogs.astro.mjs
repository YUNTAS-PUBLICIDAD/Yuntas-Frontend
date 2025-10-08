import { c as createComponent, b as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_hsX-BFeG.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../../chunks/Layout_oc6Si_Zm.mjs';
import { jsx, jsxs } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
import { b as blogService } from '../../chunks/blogService_BmzDKmfk.mjs';
export { renderers } from '../../renderers.mjs';

function useBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const fetchBlogs = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await blogService.getAllBlogs();
      setBlogs(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido al obtener blogs");
      console.error("Error en useBlogs:", err);
    } finally {
      setLoading(false);
    }
  };
  const refetch = async () => {
    await fetchBlogs();
  };
  useEffect(() => {
    fetchBlogs();
  }, []);
  return { blogs, loading, error, refetch };
}

function useBlogActions() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const clearError = () => setError(null);
  const createBlog = async (blogData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await blogService.createBlog(blogData);
      return response.data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Error desconocido al crear el blog";
      setError(errorMessage);
      console.error("Error creando blog:", err);
      return null;
    } finally {
      setLoading(false);
    }
  };
  const updateBlog = async (id, blogData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await blogService.updateBlog(id, blogData);
      return response.data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Error desconocido al actualizar el blog";
      setError(errorMessage);
      console.error("Error actualizando blog:", err);
      return null;
    } finally {
      setLoading(false);
    }
  };
  const deleteBlog = async (id) => {
    try {
      setLoading(true);
      setError(null);
      await blogService.deleteBlog(id);
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Error desconocido al eliminar el blog";
      setError(errorMessage);
      console.error("Error eliminando blog:", err);
      return false;
    } finally {
      setLoading(false);
    }
  };
  return {
    loading,
    error,
    createBlog,
    updateBlog,
    deleteBlog,
    clearError
  };
}

class FileUtils {
  // Tamaño máximo permitido para imágenes (10MB)
  static MAX_FILE_SIZE = 10 * 1024 * 1024;
  // Tipos MIME permitidos para imágenes
  static ALLOWED_MIME_TYPES = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp"
  ];
  /**
   * Valida si un archivo es una imagen válida
   * @param file - El archivo a validar
   * @returns objeto con resultado de validación
   */
  static validateImage(file) {
    if (!file) {
      return { valid: false, error: "No se ha seleccionado ningún archivo" };
    }
    if (!this.ALLOWED_MIME_TYPES.includes(file.type)) {
      return {
        valid: false,
        error: `Tipo de archivo no permitido. Use: ${this.ALLOWED_MIME_TYPES.join(", ")}`
      };
    }
    if (file.size > this.MAX_FILE_SIZE) {
      return {
        valid: false,
        error: `El archivo es demasiado grande. Tamaño máximo: ${this.formatFileSize(this.MAX_FILE_SIZE)}`
      };
    }
    return { valid: true };
  }
  /**
   * Convierte bytes a un formato legible
   * @param bytes - Número de bytes
   * @returns String formateado (ej: "2.5 MB")
   */
  static formatFileSize(bytes) {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  }
  /**
   * Crea una URL de preview para un archivo
   * @param file - El archivo
   * @returns URL de preview o null si no es posible
   */
  static createPreviewUrl(file) {
    if (file && file.type.startsWith("image/")) {
      return URL.createObjectURL(file);
    }
    return null;
  }
  /**
   * Revoca una URL de preview creada anteriormente
   * @param url - La URL a revocar
   */
  static revokePreviewUrl(url) {
    if (url) {
      URL.revokeObjectURL(url);
    }
  }
  /**
   * Redimensiona una imagen manteniendo la proporción
   * @param file - El archivo de imagen
   * @param maxWidth - Ancho máximo
   * @param maxHeight - Alto máximo
   * @param quality - Calidad de la imagen (0-1)
   * @returns Promise<File> - Archivo redimensionado
   */
  static async resizeImage(file, maxWidth = 1920, maxHeight = 1080, quality = 0.8) {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = new Image();
      img.onload = () => {
        let { width, height } = img;
        if (width > maxWidth || height > maxHeight) {
          const ratio = Math.min(maxWidth / width, maxHeight / height);
          width *= ratio;
          height *= ratio;
        }
        canvas.width = width;
        canvas.height = height;
        ctx?.drawImage(img, 0, 0, width, height);
        canvas.toBlob((blob) => {
          if (blob) {
            const resizedFile = new File([blob], file.name, {
              type: file.type,
              lastModified: Date.now()
            });
            resolve(resizedFile);
          } else {
            reject(new Error("Error al redimensionar la imagen"));
          }
        }, file.type, quality);
      };
      img.onerror = () => reject(new Error("Error al cargar la imagen"));
      img.src = URL.createObjectURL(file);
    });
  }
  /**
   * Genera un nombre único para un archivo
   * @param originalName - Nombre original del archivo
   * @returns Nombre único
   */
  static generateUniqueFileName(originalName) {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 15);
    const extension = originalName.split(".").pop();
    return `${timestamp}_${random}.${extension}`;
  }
  /**
   * Extrae metadatos de una imagen
   * @param file - El archivo de imagen
   * @returns Promise con metadatos
   */
  static async extractImageMetadata(file) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        resolve({
          width: img.naturalWidth,
          height: img.naturalHeight,
          size: file.size,
          type: file.type,
          name: file.name
        });
      };
      img.onerror = () => reject(new Error("Error al cargar la imagen"));
      img.src = URL.createObjectURL(file);
    });
  }
}

const BlogModal = ({ isOpen, onClose, blogToEdit, onSuccess }) => {
  const { createBlog, updateBlog, loading, error, clearError } = useBlogActions();
  const [formData, setFormData] = useState({
    titulo: "",
    link: "",
    producto_id: "",
    parrafo: "",
    descripcion: "",
    imagen_principal: null,
    titulo_blog: "",
    subtitulo_beneficio: "",
    url_video: "",
    titulo_video: "",
    imagenes: [
      { url_imagen: null, parrafo_imagen: "" },
      { url_imagen: null, parrafo_imagen: "" }
    ]
  });
  const [titleModified, setTitleModified] = useState(false);
  useEffect(() => {
    if (blogToEdit) {
      setFormData({
        titulo: blogToEdit.titulo,
        link: blogToEdit.link,
        producto_id: blogToEdit.producto_id.toString(),
        parrafo: blogToEdit.parrafo,
        descripcion: blogToEdit.descripcion,
        imagen_principal: null,
        // No se puede pre-cargar archivos
        titulo_blog: blogToEdit.tituloBlog || "",
        subtitulo_beneficio: blogToEdit.subTituloBlog || "",
        url_video: blogToEdit.videoBlog || "",
        titulo_video: blogToEdit.tituloVideoBlog || "",
        imagenes: [
          { url_imagen: null, parrafo_imagen: "" },
          { url_imagen: null, parrafo_imagen: "" }
        ]
      });
      setTitleModified(true);
    }
  }, [blogToEdit]);
  useEffect(() => {
    if (formData.titulo && !titleModified) {
      setFormData((prev) => ({
        ...prev,
        link: blogService.generateLinkFromTitle(formData.titulo)
      }));
    }
  }, [formData.titulo, titleModified]);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "titulo") {
      setTitleModified(false);
    }
    if (name === "link") {
      setTitleModified(true);
    }
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      const file = files[0];
      const validation = FileUtils.validateImage(file);
      if (!validation.valid) {
        alert(validation.error);
        return;
      }
      setFormData((prev) => ({
        ...prev,
        [name]: file
      }));
    }
  };
  const handleImageChange = (index, field, value) => {
    if (field === "url_imagen" && value instanceof File) {
      const validation = FileUtils.validateImage(value);
      if (!validation.valid) {
        alert(validation.error);
        return;
      }
    }
    setFormData((prev) => ({
      ...prev,
      imagenes: prev.imagenes?.map(
        (img, i) => i === index ? { ...img, [field]: value } : img
      ) || []
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    clearError();
    if (!formData.titulo || !formData.link || !formData.parrafo || !formData.descripcion) {
      alert("Por favor, completa todos los campos obligatorios.");
      return;
    }
    if (!formData.titulo_blog || !formData.subtitulo_beneficio || !formData.url_video || !formData.titulo_video) {
      alert("Por favor, completa todos los campos de información adicional del blog.");
      return;
    }
    if (!blogToEdit && !formData.imagen_principal) {
      alert("Por favor, selecciona una imagen principal.");
      return;
    }
    if (!formData.imagenes || formData.imagenes.length === 0 || !formData.imagenes[0].url_imagen) {
      alert("Por favor, selecciona al menos una imagen adicional.");
      return;
    }
    try {
      let result = null;
      if (blogToEdit) {
        result = await updateBlog(blogToEdit.id, formData);
      } else {
        result = await createBlog(formData);
      }
      if (result) {
        onSuccess?.(result);
        handleClose();
      }
    } catch (err) {
      console.error("Error al guardar el blog:", err);
    }
  };
  const handleClose = () => {
    setFormData({
      titulo: "",
      link: "",
      producto_id: "",
      parrafo: "",
      descripcion: "",
      imagen_principal: null,
      titulo_blog: "",
      subtitulo_beneficio: "",
      url_video: "",
      titulo_video: "",
      imagenes: [
        { url_imagen: null, parrafo_imagen: "" },
        { url_imagen: null, parrafo_imagen: "" }
      ]
    });
    setTitleModified(false);
    clearError();
    onClose();
  };
  if (!isOpen) return null;
  return /* @__PURE__ */ jsx("div", { className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4", children: /* @__PURE__ */ jsx("div", { className: "bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto", children: /* @__PURE__ */ jsxs("div", { className: "p-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-4", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-gray-800", children: blogToEdit ? "Editar Blog" : "Crear Nuevo Blog" }),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: handleClose,
          className: "text-gray-500 hover:text-gray-700 text-2xl",
          children: "×"
        }
      )
    ] }),
    error && /* @__PURE__ */ jsx("div", { className: "mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded", children: error }),
    /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Título *" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              name: "titulo",
              value: formData.titulo,
              onChange: handleInputChange,
              required: true,
              className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Link (URL amigable) *" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              name: "link",
              value: formData.link,
              onChange: handleInputChange,
              required: true,
              className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "ID del Producto (opcional)" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "number",
            name: "producto_id",
            value: formData.producto_id,
            onChange: handleInputChange,
            placeholder: "Deja vacío si no tienes productos aún",
            className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          }
        ),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 mt-1", children: "Puedes asociar este blog a un producto específico (opcional)" })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Párrafo *" }),
        /* @__PURE__ */ jsx(
          "textarea",
          {
            name: "parrafo",
            value: formData.parrafo,
            onChange: handleInputChange,
            required: true,
            rows: 3,
            className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Descripción *" }),
        /* @__PURE__ */ jsx(
          "textarea",
          {
            name: "descripcion",
            value: formData.descripcion,
            onChange: handleInputChange,
            required: true,
            rows: 4,
            className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: [
          "Imagen Principal ",
          !blogToEdit && "*"
        ] }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "file",
            name: "imagen_principal",
            onChange: handleFileChange,
            accept: "image/*",
            required: !blogToEdit,
            className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Título del Blog *" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              name: "titulo_blog",
              value: formData.titulo_blog,
              onChange: handleInputChange,
              required: true,
              className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Subtítulo *" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              name: "subtitulo_beneficio",
              value: formData.subtitulo_beneficio,
              onChange: handleInputChange,
              required: true,
              className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "URL del Video *" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "url",
              name: "url_video",
              value: formData.url_video,
              onChange: handleInputChange,
              required: true,
              className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Título del Video *" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              name: "titulo_video",
              value: formData.titulo_video,
              onChange: handleInputChange,
              required: true,
              className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h3", { className: "text-lg font-medium text-gray-700 mb-3", children: "Imágenes Adicionales * (Al menos 1 requerida)" }),
        formData.imagenes?.map((imagen, index) => /* @__PURE__ */ jsxs("div", { className: "border border-gray-200 rounded-md p-4 mb-4", children: [
          /* @__PURE__ */ jsxs("h4", { className: "text-md font-medium text-gray-600 mb-2", children: [
            "Imagen ",
            index + 1
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: [
                "Archivo de Imagen ",
                index === 0 ? "*" : ""
              ] }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "file",
                  accept: "image/*",
                  required: index === 0,
                  onChange: (e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      handleImageChange(index, "url_imagen", file);
                    }
                  },
                  className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Párrafo de la Imagen" }),
              /* @__PURE__ */ jsx(
                "textarea",
                {
                  value: imagen.parrafo_imagen,
                  onChange: (e) => handleImageChange(index, "parrafo_imagen", e.target.value),
                  rows: 3,
                  className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                }
              )
            ] })
          ] })
        ] }, index))
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex justify-end space-x-3 pt-4", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: handleClose,
            className: "px-4 py-2 text-gray-600 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500",
            children: "Cancelar"
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "submit",
            disabled: loading,
            className: "px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed",
            children: loading ? "Guardando..." : blogToEdit ? "Actualizar" : "Crear"
          }
        )
      ] })
    ] })
  ] }) }) });
};

const BlogList = () => {
  const { blogs, loading, error, refetch } = useBlogs();
  const { deleteBlog, loading: actionLoading } = useBlogActions();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [blogToEdit, setBlogToEdit] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const filteredBlogs = blogs.filter(
    (blog) => blog.titulo.toLowerCase().includes(searchTerm.toLowerCase()) || blog.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const handleEdit = (blog) => {
    setBlogToEdit(blog);
    setIsModalOpen(true);
  };
  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este blog?")) {
      const success = await deleteBlog(id);
      if (success) {
        refetch();
      }
    }
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setBlogToEdit(null);
  };
  const handleBlogSuccess = (blog) => {
    refetch();
  };
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  };
  if (loading) {
    return /* @__PURE__ */ jsx("div", { className: "flex justify-center items-center h-64", children: /* @__PURE__ */ jsx("div", { className: "animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" }) });
  }
  if (error) {
    return /* @__PURE__ */ jsxs("div", { className: "bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded", children: [
      "Error cargando blogs: ",
      error
    ] });
  }
  return /* @__PURE__ */ jsxs("div", { className: "p-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-6", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold text-gray-800", children: "Gestión de Blogs" }),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => setIsModalOpen(true),
          className: "bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded",
          children: "Crear Nuevo Blog"
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { className: "mb-4", children: /* @__PURE__ */ jsx(
      "input",
      {
        type: "text",
        placeholder: "Buscar blogs...",
        value: searchTerm,
        onChange: (e) => setSearchTerm(e.target.value),
        className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      }
    ) }),
    /* @__PURE__ */ jsx("div", { className: "bg-white shadow-md rounded-lg overflow-hidden", children: filteredBlogs.length === 0 ? /* @__PURE__ */ jsx("div", { className: "p-8 text-center text-gray-500", children: searchTerm ? "No se encontraron blogs que coincidan con tu búsqueda." : "No hay blogs disponibles." }) : /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "min-w-full divide-y divide-gray-200", children: [
      /* @__PURE__ */ jsx("thead", { className: "bg-gray-50", children: /* @__PURE__ */ jsxs("tr", { children: [
        /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Imagen" }),
        /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Título" }),
        /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Descripción" }),
        /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Fecha" }),
        /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Acciones" })
      ] }) }),
      /* @__PURE__ */ jsx("tbody", { className: "bg-white divide-y divide-gray-200", children: filteredBlogs.map((blog) => /* @__PURE__ */ jsxs("tr", { className: "hover:bg-gray-50", children: [
        /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap", children: /* @__PURE__ */ jsx(
          "img",
          {
            src: blog.imagenPrincipal,
            alt: blog.titulo,
            className: "h-16 w-16 rounded-lg object-cover"
          }
        ) }),
        /* @__PURE__ */ jsxs("td", { className: "px-6 py-4 whitespace-nowrap", children: [
          /* @__PURE__ */ jsx("div", { className: "text-sm font-medium text-gray-900", children: blog.titulo }),
          /* @__PURE__ */ jsxs("div", { className: "text-sm text-gray-500", children: [
            "ID: ",
            blog.id
          ] })
        ] }),
        /* @__PURE__ */ jsx("td", { className: "px-6 py-4", children: /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-900 max-w-xs truncate", children: blog.descripcion }) }),
        /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500", children: formatDate(blog.created_at) }),
        /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap text-sm font-medium", children: /* @__PURE__ */ jsxs("div", { className: "flex space-x-2", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => handleEdit(blog),
              className: "text-blue-600 hover:text-blue-900 bg-blue-100 hover:bg-blue-200 px-3 py-1 rounded",
              children: "Editar"
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => handleDelete(blog.id),
              disabled: actionLoading,
              className: "text-red-600 hover:text-red-900 bg-red-100 hover:bg-red-200 px-3 py-1 rounded disabled:opacity-50",
              children: actionLoading ? "Eliminando..." : "Eliminar"
            }
          ),
          /* @__PURE__ */ jsx(
            "a",
            {
              href: `/blogs/${blog.id}`,
              target: "_blank",
              rel: "noopener noreferrer",
              className: "text-green-600 hover:text-green-900 bg-green-100 hover:bg-green-200 px-3 py-1 rounded",
              children: "Ver"
            }
          )
        ] }) })
      ] }, blog.id)) })
    ] }) }) }),
    /* @__PURE__ */ jsx(
      BlogModal,
      {
        isOpen: isModalOpen,
        onClose: handleCloseModal,
        blogToEdit,
        onSuccess: handleBlogSuccess
      }
    )
  ] });
};

const BlogDashboard = () => {
  return /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(BlogList, {}) });
};

const $$Blogs = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Dashboard - Gesti\xF3n de Blogs" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="min-h-screen bg-gray-100"> <div class="container mx-auto py-8"> ${renderComponent($$result2, "BlogDashboard", BlogDashboard, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/home/runner/work/Yuntas-Frontend/Yuntas-Frontend/src/components/dashboard/BlogDashboard", "client:component-export": "default" })} </div> </div> ` })}`;
}, "/home/runner/work/Yuntas-Frontend/Yuntas-Frontend/src/pages/dashboard/blogs.astro", void 0);

const $$file = "/home/runner/work/Yuntas-Frontend/Yuntas-Frontend/src/pages/dashboard/blogs.astro";
const $$url = "/dashboard/blogs";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Blogs,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
