import { config, getApiUrl } from "../../../config";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";

interface BlogPOST {
  producto_id: string;
  subtitulo: string;
  link: string;
  meta_titulo?: string;
  meta_descripcion?: string;
  imagen_principal: File | null;
  text_alt_principal: string;
  alt_imagen_card: string;
  imagenes_secundarias: (File | null)[];
  alt_imagenes_secundarias: string[];
  parrafos: string[];
  url_video: string;
}

interface Blog {
  id: number;
  producto_id: number;
  nombre_producto: string;
  subtitulo: string;
  link?: string;
  etiqueta?: { meta_titulo: string; meta_descripcion: string };
  imagen_principal: string;
  imagenes?: { ruta_imagen: string; text_alt: string }[];
  parrafos?: { parrafo: string }[];
  alt_imagen_card?: string;
  text_alt_principal?: string;
  url_video: string;
  created_at?: string;
  updated_at?: string;
}

interface Producto {
  id: number;
  nombre: string;
  link: string;
}

interface AddBlogModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  blogToEdit?: Blog | null;
  onSuccess?: () => void;
}

const AddBlogModal = ({
                        isOpen,
                        setIsOpen,
                        blogToEdit,
                        onSuccess,
                      }: AddBlogModalProps) => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [nombreProducto, setNombreProducto] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
  const [selectedParagraphIndex, setSelectedParagraphIndex] = useState<number | null>(null);
  const [selectedTextRange, setSelectedTextRange] = useState<{ start: number; end: number } | null>(null);
  const [selectedText, setSelectedText] = useState("");
  const [isProductLinkModalOpen, setIsProductLinkModalOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");

  const defaultFormData: BlogPOST = {
    producto_id: "",
    subtitulo: "",
    link: "",
    meta_titulo: "",
    meta_descripcion: "",
    imagen_principal: null,
    text_alt_principal: "",
    alt_imagen_card: "",
    imagenes_secundarias: [null, null, null],
    alt_imagenes_secundarias: ["", "", ""],
    parrafos: ["", "", ""],
    url_video: ""
  };

  const [formData, setFormData] = useState<BlogPOST>(defaultFormData);

  useEffect(() => {
    if (!isOpen) return;

    if (blogToEdit) {
      console.log("📝 Editando blog:", {
        id: blogToEdit.id,
        producto_id: blogToEdit.producto_id,
        nombre_producto: blogToEdit.nombre_producto
      });

      // ✅ ASEGURAR que producto_id se cargue correctamente
      const productoIdString = blogToEdit.producto_id?.toString() || "";

      setFormData({
        producto_id: productoIdString,
        subtitulo: blogToEdit.subtitulo || "",
        link: blogToEdit.link || "",
        meta_titulo: blogToEdit.etiqueta?.meta_titulo || "",
        meta_descripcion: blogToEdit.etiqueta?.meta_descripcion || "",
        imagen_principal: null,
        text_alt_principal: blogToEdit.text_alt_principal || "",
        alt_imagen_card: blogToEdit.alt_imagen_card || "",
        imagenes_secundarias: [null, null, null],
        alt_imagenes_secundarias: [
          blogToEdit.imagenes?.[0]?.text_alt || "",
          blogToEdit.imagenes?.[1]?.text_alt || "",
          blogToEdit.imagenes?.[2]?.text_alt || "",
        ],
        parrafos: [
          blogToEdit.parrafos?.[0]?.parrafo || "",
          blogToEdit.parrafos?.[1]?.parrafo || "",
          blogToEdit.parrafos?.[2]?.parrafo || "",
        ],
        url_video: blogToEdit.url_video || ""
      });

      setNombreProducto(blogToEdit.nombre_producto || "");

      console.log("✅ FormData inicializado con producto_id:", productoIdString);
    } else {
      console.log("➕ Creando nuevo blog");
      setFormData(defaultFormData);
      setNombreProducto("");
    }
  }, [isOpen, blogToEdit]);

  // Cargar productos
  useEffect(() => {
    console.log("hola")
    const fetchProductos = async () => {
      if (!isOpen) return;

      setLoading(true);
      try {
        const token = localStorage.getItem("token");

        const res = await fetch(getApiUrl(config.endpoints.productos.list), {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        });

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        console.log("Respuesta de productos/select:", data);

        if (data.success && Array.isArray(data.data)) {
          setProductos(data.data);
        } else if (Array.isArray(data)) {
          setProductos(data);
        } else {
          console.error("La respuesta no contiene un array de productos:", data);
          setProductos([]);
        }

      } catch (error) {
        console.error("Error al obtener productos:", error);
        setProductos([]);
        alert("❌ Error al cargar los productos. Por favor, intenta de nuevo.");
      } finally {
        setLoading(false);
      }
    };

    fetchProductos();
  }, [isOpen]);

  const handleInputChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (
      e: React.ChangeEvent<HTMLInputElement>,
      field: keyof BlogPOST
  ) => {
    if (e.target.files?.[0]) {
      setFormData({ ...formData, [field]: e.target.files[0] });
    }
  };

  const handleImagenSecundariaChange = (
      e: React.ChangeEvent<HTMLInputElement>,
      index: number
  ) => {
    const updated = [...formData.imagenes_secundarias];
    updated[index] = e.target.files?.[0] || null;
    setFormData({ ...formData, imagenes_secundarias: updated });
  };

  const handleAltImagenSecundariaChange = (
      e: React.ChangeEvent<HTMLInputElement>,
      index: number
  ) => {
    const updated = [...formData.alt_imagenes_secundarias];
    updated[index] = e.target.value;
    setFormData({ ...formData, alt_imagenes_secundarias: updated });
  };

  const handleParrafoChange = (
      e: React.ChangeEvent<HTMLTextAreaElement>,
      index: number
  ) => {
    const updated = [...formData.parrafos];
    updated[index] = e.target.value;
    setFormData({ ...formData, parrafos: updated });
  };

  // Función para abrir el modal de enlace manual
  const handleInsertLinkClick = (index: number) => {
    const textarea = document.getElementById(`parrafo-${index}`) as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;

    if (start === end) {
      Swal.fire(
          "Selecciona texto",
          "Por favor selecciona una palabra o frase antes de insertar el enlace.",
          "warning"
      );
      return;
    }

    const selected = textarea.value.substring(start, end);
    setSelectedParagraphIndex(index);
    setSelectedTextRange({ start, end });
    setSelectedText(selected);
    setIsLinkModalOpen(true);
  };

  // Función para insertar enlace manual
  const handleInsertManualLink = () => {
    if (selectedParagraphIndex === null || selectedTextRange === null || !linkUrl.trim()) {
      alert("❌ Faltan datos para insertar el enlace");
      return;
    }

    const currentText = formData.parrafos[selectedParagraphIndex];
    const linkedText = `<a href="${linkUrl}" target="_blank" rel="noopener noreferrer">${selectedText}</a>`;

    const newText =
        currentText.slice(0, selectedTextRange.start) +
        linkedText +
        currentText.slice(selectedTextRange.end);

    const updatedParrafos = [...formData.parrafos];
    updatedParrafos[selectedParagraphIndex] = newText;

    setFormData({ ...formData, parrafos: updatedParrafos });

    // Limpiar estados
    setSelectedParagraphIndex(null);
    setSelectedTextRange(null);
    setSelectedText("");
    setLinkUrl("");
    setIsLinkModalOpen(false);
  };

  // Función para abrir selector de producto
  const handleProductLinkClick = (index: number) => {
    const textarea = document.getElementById(`parrafo-${index}`) as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = textarea.value.substring(start, end);

    if (!selected) {
      Swal.fire(
          "Selecciona texto",
          "Por favor selecciona una palabra o frase para enlazar a un producto.",
          "warning"
      );
      return;
    }

    setSelectedParagraphIndex(index);
    setSelectedTextRange({ start, end });
    setSelectedText(selected);
    setIsProductLinkModalOpen(true);
  };

  // Función para insertar enlace a producto
  const handleInsertProductLink = (producto: Producto) => {
    if (selectedParagraphIndex === null || selectedTextRange === null) return;

    const currentText = formData.parrafos[selectedParagraphIndex];
    const link = producto.link;
    const linkedText = `<a href="/products/producto/?link=${link}" style="color: blue; text-decoration: underline;">${selectedText}</a>`;

    const newText =
        currentText.slice(0, selectedTextRange.start) +
        linkedText +
        currentText.slice(selectedTextRange.end);

    const updatedParrafos = [...formData.parrafos];
    updatedParrafos[selectedParagraphIndex] = newText;

    setFormData({ ...formData, parrafos: updatedParrafos });

    // Limpiar estados
    setSelectedParagraphIndex(null);
    setSelectedTextRange(null);
    setSelectedText("");
    setIsProductLinkModalOpen(false);
  };

  const closeModal = () => {
    setIsOpen(false);
    // Limpiar todos los estados relacionados
    setSelectedParagraphIndex(null);
    setSelectedTextRange(null);
    setSelectedText("");
    setIsLinkModalOpen(false);
    setIsProductLinkModalOpen(false);
    setLinkUrl("");
    setFormData(defaultFormData);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isEdit = !!blogToEdit;

    console.log("🚀 Iniciando envío:", { isEdit, blogToEdit: blogToEdit?.id });

    // ✅ VALIDACIONES MEJORADAS
    if (!formData.producto_id || formData.producto_id.trim() === "") {
      return alert("⚠️ Debe seleccionar un producto.");
    }

    // Debug para verificar el producto_id en edición
    if (isEdit) {
      console.log("🔍 Verificando producto_id en edición:", {
        formData_producto_id: formData.producto_id,
        blogToEdit_producto_id: blogToEdit.producto_id,
        nombreProducto: nombreProducto
      });
    }

    if (!formData.subtitulo || formData.subtitulo.trim() === "") {
      return alert("⚠️ El subtítulo es obligatorio.");
    }

    if (!isEdit && !formData.imagen_principal) {
      return alert("⚠️ La imagen principal es obligatoria para crear.");
    }

    // Verificar que hay al menos un párrafo con contenido
    const parrafosConContenido = formData.parrafos.filter(p => p.trim());
    if (parrafosConContenido.length === 0) {
      return alert("⚠️ Debe haber al menos un párrafo con contenido.");
    }

    const urlRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
    if (formData.link && !urlRegex.test(formData.link)) {
      return alert(
          "⚠️ El link debe ser URL-friendly (solo minúsculas, guiones y números)."
      );
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const formDataToSend = new FormData();

      // ✅ CAMPOS OBLIGATORIOS - SIEMPRE ENVIAR
      formDataToSend.append('producto_id', formData.producto_id);
      formDataToSend.append('subtitulo', formData.subtitulo);


      formDataToSend.append('url_video', formData.url_video );

      // ✅ CAMPOS OPCIONALES - ENVIAR SOLO SI TIENEN VALOR
      if (formData.link?.trim()) {
        formDataToSend.append('link', formData.link.trim());
      }
      // if (formData.meta_titulo?.trim()) {
      //   formDataToSend.append('meta_titulo', formData.meta_titulo.trim());
      // }
      // if (formData.meta_descripcion?.trim()) {
      //   formDataToSend.append('meta_descripcion', formData.meta_descripcion.trim());
      // }
      // ✅ Enviar los campos de etiqueta como array asociativo anidado
      const etiqueta = {
        meta_titulo: formData.meta_titulo?.trim() || "",
        meta_descripcion: formData.meta_descripcion?.trim() || ""
      };

      // Solo enviarlo si al menos uno tiene contenido
      if (etiqueta.meta_titulo || etiqueta.meta_descripcion) {
        formDataToSend.append('etiqueta', JSON.stringify(etiqueta));
      }


      if (formData.text_alt_principal?.trim()) {
        formDataToSend.append('text_alt_principal', formData.text_alt_principal.trim());
      }
      if (formData.alt_imagen_card?.trim()) {
        formDataToSend.append('alt_imagen_card', formData.alt_imagen_card.trim());
      }

      // ✅ IMAGEN PRINCIPAL
      if (formData.imagen_principal) {
        formDataToSend.append("imagen_principal", formData.imagen_principal);
        console.log("📷 Imagen principal agregada");
      }

      // ✅ IMÁGENES SECUNDARIAS - SOLO LAS QUE TIENEN ARCHIVO
      const imagenesConArchivo = formData.imagenes_secundarias.filter((img, index) => {
        const tieneArchivo = img !== null;
        if (tieneArchivo) {
          console.log(`📷 Imagen secundaria ${index + 1} agregada`);
        }
        return tieneArchivo;
      });

      imagenesConArchivo.forEach((img) => {
        formDataToSend.append("imagenes[]", img as File);
      });

      // ✅ ALT TEXTS PARA IMÁGENES SECUNDARIAS
      formData.alt_imagenes_secundarias.forEach((alt, index) => {
        if (formData.imagenes_secundarias[index] !== null || (isEdit && alt.trim())) {
          formDataToSend.append("alt_imagenes[]", alt.trim());
        }
      });

      // ✅ PÁRRAFOS - SOLO LOS QUE TIENEN CONTENIDO
      parrafosConContenido.forEach((parrafo) => {
        formDataToSend.append("parrafos[]", parrafo.trim());
      });

      // Debug: Mostrar lo que se va a enviar
      console.log("=== DATOS A ENVIAR ===");
      console.log("Modo:", isEdit ? "EDICIÓN" : "CREACIÓN");
      console.log("Blog ID:", blogToEdit?.id);

      for (let [key, value] of formDataToSend.entries()) {
        if (value instanceof File) {
          console.log(`${key}: [File] ${value.name} (${value.size} bytes)`);
        } else {
          console.log(`${key}: "${value}"`);
        }
      }

      const endpoint = isEdit
          ? getApiUrl(config.endpoints.blogs.update(blogToEdit.id))
          : getApiUrl(config.endpoints.blogs.create);

      console.log("🎯 Endpoint:", endpoint);
      console.log("🔄 Método:", isEdit ? "PUT" : "POST");

      if (isEdit) {
        formDataToSend.append("_method", "PUT"); // Necesario para Laravel y similares
      }

      const res = await fetch(endpoint, {
        method: "POST", // Siempre POST
        body: formDataToSend,
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });


      console.log("📊 Response status:", res.status);

      let data;
      try {
        data = await res.json();
      } catch {
        data = await res.text();
      }

      console.log("📋 Response data:", data);

      if (res.ok) {
        alert(`✅ Blog ${isEdit ? "actualizado" : "creado"} correctamente.`);
        closeModal();
        onSuccess?.();
      } else {
        console.error("❌ Error response:", data);

        // Mostrar errores de validación específicos
        if (data.errors) {
          let errorMessage = "❌ Errores de validación:\n";
          Object.keys(data.errors).forEach(field => {
            const errors = Array.isArray(data.errors[field])
                ? data.errors[field]
                : [data.errors[field]];
            errorMessage += `• ${field}: ${errors.join(', ')}\n`;
          });
          alert(errorMessage);
        } else {
          alert(`❌ Error (${res.status}): ${data.message || JSON.stringify(data)}`);
        }
      }
    } catch (err) {
      console.error("❌ Error en la solicitud:", err);
      alert("❌ Error en la conexión con el servidor.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
        <div className="bg-white text-black px-8 py-6 rounded-lg max-h-[90vh] overflow-y-auto">
          <h2 className="text-2xl font-bold mb-6">
            {blogToEdit ? "Editar Blog" : "Añadir Blog"}
          </h2>
          <form
              onSubmit={handleSubmit}
              encType="multipart/form-data"
              className="space-y-8 max-w-3xl mx-auto"
          >
            {/* Información Principal & SEO */}
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
              <h3 className="text-lg font-semibold text-blue-800 mb-4">
                Información Principal & SEO
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Producto */}
                <div className="col-span-4">
                  <label className="block mb-2 font-medium">
                    Producto <span className="text-red-500">*</span>
                  </label>

                  <select
                      name="producto_id"
                      value={formData.producto_id}
                      onChange={handleSelectChange}
                      required
                      className="w-full bg-white text-black p-2 rounded-md border border-gray-300"
                      disabled={loading} // Solo deshabilitar cuando está cargando
                  >
                    <option value="">
                      {loading ? "Cargando productos..." : "-- Selecciona un producto --"}
                    </option>
                    {Array.isArray(productos) && productos.length > 0 ? (
                        productos.map((producto) => (
                            <option key={producto.id} value={producto.id.toString()}>
                              {producto.nombre || `Producto ${producto.id}`}
                            </option>
                        ))
                    ) : (
                        !loading && (
                            <option value="" disabled>
                              No hay productos disponibles
                            </option>
                        )
                    )}
                  </select>

                  {nombreProducto && (
                      <p className="text-xs text-gray-500 mt-1">
                        Producto seleccionado: <strong>{nombreProducto}</strong>
                      </p>
                  )}

                  {productos.length > 0 && (
                      <p className="text-xs text-green-600 mt-1">
                        ✅ {productos.length} productos cargados
                      </p>
                  )}
                </div>

                {/* Subtítulo */}
                <div className="md:col-span-2">
                  <label className="block font-medium mb-1">
                    Subtítulo <span className="text-red-500">*</span>
                  </label>
                  <input
                      name="subtitulo"
                      value={formData.subtitulo}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded px-3 py-2"
                      required
                  />
                </div>

                {/* Meta título */}
                <div className="md:col-span-2">
                  <label className="block font-medium mb-1">Meta título</label>
                  <input
                      type="text"
                      name="meta_titulo"
                      value={formData.meta_titulo || ""}
                      onChange={handleInputChange}
                      placeholder="Título optimizado para SEO"
                      className="w-full border border-gray-300 rounded px-3 py-2"
                  />
                  <p className="text-xs text-gray-500 mt-1">Recomendado: 50-60 caracteres</p>
                </div>

                {/* Meta descripción */}
                <div className="md:col-span-2">
                  <label className="block font-medium mb-1">Meta descripción</label>
                  <input
                      type="text"
                      name="meta_descripcion"
                      value={formData.meta_descripcion || ""}
                      onChange={handleInputChange}
                      placeholder="Descripción optimizada para SEO"
                      className="w-full border border-gray-300 rounded px-3 py-2"
                  />
                  <p className="text-xs text-gray-500 mt-1">Recomendado: 100-160 caracteres</p>
                </div>

                {/* Link */}
                <div className="md:col-span-4">
                  <label className="block font-medium mb-1">
                    Link (URL amigable)
                  </label>
                  <input
                      type="text"
                      name="link"
                      value={formData.link}
                      onChange={handleInputChange}
                      placeholder="ejemplo: mi-blog-post"
                      className="w-full border border-gray-300 rounded px-3 py-2"
                  />
                </div>
              </div>
            </div>

            {/* Imágenes */}
            <div className="bg-green-50 p-6 rounded-lg border border-green-200">
              <h3 className="text-lg font-semibold text-green-800 mb-4">Imágenes</h3>

              {/* Imagen Principal */}
              <div className="border border-green-400 rounded p-4 mb-8">
                <label className="block font-medium mb-2">
                  Imagen Principal {!blogToEdit && <span className="text-red-500">*</span>}
                </label>

                {blogToEdit && blogToEdit.imagen_principal && (
                    <img
                        src={blogToEdit.imagen_principal}
                        alt={formData.text_alt_principal || "Imagen principal"}
                        className="w-full h-64 object-cover rounded mb-4 border"
                    />
                )}

                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, "imagen_principal")}
                    className="w-full file:py-2 file:px-3 file:border-0 file:bg-green-100 file:text-green-700 hover:file:bg-green-200"
                />
                <input
                    type="text"
                    name="text_alt_principal"
                    placeholder="Texto ALT para SEO"
                    value={formData.text_alt_principal}
                    onChange={handleInputChange}
                    className="mt-2 w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>

              {/* Imágenes Secundarias */}
              <div className="border border-green-400 rounded p-4">
                <label className="block font-semibold mb-4">Imágenes Secundarias</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {formData.imagenes_secundarias.map((_, i) => (
                      <div key={i} className="flex flex-col items-center">
                        {blogToEdit?.imagenes?.[i]?.ruta_imagen && (
                            <img
                                src={blogToEdit.imagenes[i].ruta_imagen}
                                alt={formData.alt_imagenes_secundarias[i] || `Imagen secundaria #${i + 1}`}
                                className="w-full h-32 object-cover rounded mb-2 border"
                            />
                        )}
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImagenSecundariaChange(e, i)}
                            className="w-full file:py-2 file:px-3 file:border-0 file:bg-green-100 file:text-green-700 hover:file:bg-green-200"
                        />
                        <input
                            type="text"
                            placeholder={`Texto ALT imagen secundaria #${i + 1}`}
                            value={formData.alt_imagenes_secundarias[i]}
                            onChange={(e) => handleAltImagenSecundariaChange(e, i)}
                            className="w-full border border-gray-300 rounded px-3 py-2 mt-2"
                        />
                      </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Video */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  URL del Video *
                </label>
                <input
                    type="url"
                    name="url_video"
                    value={formData.url_video}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>


            </div>

            {/* Párrafos */}
            <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200 relative">
              <h3 className="text-lg font-semibold text-yellow-800 mb-4">
                Párrafos <span className="text-red-500">*</span>
              </h3>
              <p className="text-sm text-yellow-700 mb-4">
                * Al menos un párrafo debe tener contenido
              </p>
              {formData.parrafos.map((p, i) => (
                  <div key={i} className="relative mb-6">
                <textarea
                    id={`parrafo-${i}`}
                    value={p}
                    onChange={(e) => handleParrafoChange(e, i)}
                    className="w-full border border-gray-300 rounded px-3 py-2 pr-20"
                    rows={4}
                    placeholder={`Párrafo ${i + 1} (opcional)`}
                />

                    {/* Botones para insertar enlaces */}
                    <div className="absolute top-2 right-2 flex gap-2">
                      <button
                          type="button"
                          onClick={() => handleInsertLinkClick(i)}
                          title="Insertar enlace manual"
                          className="bg-blue-500 hover:bg-blue-700 text-white p-2 rounded-full shadow-lg transition-all duration-200"
                      >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                          <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                          />
                        </svg>
                      </button>
                      <button
                          type="button"
                          onClick={() => handleProductLinkClick(i)}
                          title="Enlazar a producto"
                          className="bg-green-500 hover:bg-green-700 text-white p-2 rounded-full shadow-lg transition-all duration-200"
                      >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                          <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
              ))}
            </div>

            {/* Botones */}
            <div className="flex justify-end space-x-4">
              <button
                  type="button"
                  onClick={closeModal}
                  className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded"
                  disabled={loading}
              >
                Cancelar
              </button>
              <button
                  type="submit"
                  disabled={loading}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded disabled:opacity-50"
              >
                {loading ? "Procesando..." : (blogToEdit ? "Actualizar" : "Crear")}
              </button>
            </div>
          </form>

          {/* Modal para enlace manual */}
          {isLinkModalOpen && (
              <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-[60]">
                <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
                  <h3 className="text-lg font-bold mb-4">Insertar Enlace</h3>
                  <p className="text-sm text-gray-600 mb-2">
                    Texto seleccionado: <strong>"{selectedText}"</strong>
                  </p>
                  <div className="mb-4">
                    <label className="block font-medium mb-1">URL del enlace</label>
                    <input
                        type="url"
                        value={linkUrl}
                        onChange={(e) => setLinkUrl(e.target.value)}
                        placeholder="https://ejemplo.com"
                        className="w-full border border-gray-300 rounded px-3 py-2"
                        required
                    />
                  </div>
                  <div className="flex justify-end space-x-2">
                    <button
                        type="button"
                        onClick={() => setIsLinkModalOpen(false)}
                        className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded"
                    >
                      Cancelar
                    </button>
                    <button
                        type="button"
                        onClick={handleInsertManualLink}
                        disabled={!linkUrl.trim()}
                        className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white px-4 py-2 rounded"
                    >
                      Insertar
                    </button>
                  </div>
                </div>
              </div>
          )}

          {/* Modal para enlace a producto */}
          {isProductLinkModalOpen && (
              <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-[60]">
                <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
                  <h3 className="text-lg font-bold mb-4">Enlazar a Producto</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Texto seleccionado: <strong>"{selectedText}"</strong>
                  </p>
                  <div className="mb-4">
                    <label className="block font-medium mb-1">Selecciona un producto</label>
                    <select
                        onChange={(e) => {
                          const selectedId = parseInt(e.target.value);
                          const selectedProduct = productos.find(p => p.id === selectedId);
                          if (selectedProduct) {
                            handleInsertProductLink(selectedProduct);
                          }
                        }}
                        className="w-full border border-gray-300 rounded px-3 py-2"
                    >
                      <option value="">-- Seleccionar producto --</option>
                      {productos.map((producto) => (
                          <option key={producto.id} value={producto.id}>
                            {producto.nombre}
                          </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex justify-end">
                    <button
                        type="button"
                        onClick={() => setIsProductLinkModalOpen(false)}
                        className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              </div>
          )}
        </div>
      </div>
  );
};

export default AddBlogModal;