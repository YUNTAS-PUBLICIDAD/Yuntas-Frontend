import { c as createComponent, b as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_hsX-BFeG.mjs';
import 'kleur/colors';
import { jsx, jsxs } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { g as getApiUrl, c as config } from '../chunks/config_CL3T0jDM.mjs';
import Swal from 'sweetalert2';
import { T as TableContainer } from '../chunks/TableContainer_BGxs4l4M.mjs';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, Navigation } from 'swiper/modules';
/* empty css                                 */
import '../chunks/admin.30f82b17_l0sNRNKZ.mjs';
import { u as useDarkMode } from '../chunks/Footer_DLPwzSAN.mjs';
import { $ as $$LayoutAdmin } from '../chunks/LayoutAdmin_B6m1CA_E.mjs';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

const AddBlogModal = ({
  isOpen,
  setIsOpen,
  blogToEdit,
  onSuccess
}) => {
  const [productos, setProductos] = useState([]);
  const [nombreProducto, setNombreProducto] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
  const [selectedParagraphIndex, setSelectedParagraphIndex] = useState(null);
  const [selectedTextRange, setSelectedTextRange] = useState(null);
  const [selectedText, setSelectedText] = useState("");
  const [isProductLinkModalOpen, setIsProductLinkModalOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const defaultFormData = {
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
  const [formData, setFormData] = useState(defaultFormData);
  useEffect(() => {
    if (!isOpen) return;
    if (blogToEdit) {
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
          blogToEdit.imagenes?.[2]?.text_alt || ""
        ],
        parrafos: [
          blogToEdit.parrafos?.[0]?.parrafo || "",
          blogToEdit.parrafos?.[1]?.parrafo || "",
          blogToEdit.parrafos?.[2]?.parrafo || ""
        ],
        url_video: blogToEdit.url_video || ""
      });
      setNombreProducto(blogToEdit.nombre_producto || "");
    } else {
      setFormData(defaultFormData);
      setNombreProducto("");
    }
  }, [isOpen, blogToEdit]);
  useEffect(() => {
    const fetchProductos = async () => {
      if (!isOpen) return;
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(getApiUrl(config.endpoints.productos.all), {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json"
          }
        });
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        if (data.success && Array.isArray(data.data)) {
          setProductos(data.data);
        } else if (Array.isArray(data)) {
          setProductos(data);
        } else {
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
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSelectChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleFileChange = (e, field) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2048 * 1024) {
        Swal.fire({
          icon: "warning",
          title: "¡Imagen muy grande!",
          text: "Máx. 2 MB."
        });
        if (e.target) e.target.value = "";
        return;
      }
      setFormData({ ...formData, [field]: file });
    }
  };
  const handleImagenSecundariaChange = (e, index) => {
    const file = e.target.files?.[0] || null;
    if (file && file.size > 2048 * 1024) {
      Swal.fire({
        icon: "warning",
        title: "¡Imagen muy grande!",
        text: "Máx. 2 MB."
      });
      if (e.target) e.target.value = "";
      return;
    }
    const updated = [...formData.imagenes_secundarias];
    updated[index] = file;
    setFormData({ ...formData, imagenes_secundarias: updated });
  };
  const handleAltImagenSecundariaChange = (e, index) => {
    const updated = [...formData.alt_imagenes_secundarias];
    updated[index] = e.target.value;
    setFormData({ ...formData, alt_imagenes_secundarias: updated });
  };
  const handleParrafoChange = (e, index) => {
    const updated = [...formData.parrafos];
    updated[index] = e.target.value;
    setFormData({ ...formData, parrafos: updated });
  };
  const handleInsertLinkClick = (index) => {
    const textarea = document.getElementById(
      `parrafo-${index}`
    );
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    if (start === end) {
      Swal.fire(
        "Selecciona texto",
        "Selecciona una palabra o frase antes de insertar el enlace.",
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
  const handleInsertManualLink = () => {
    if (selectedParagraphIndex === null || selectedTextRange === null || !linkUrl.trim())
      return;
    const currentText = formData.parrafos[selectedParagraphIndex];
    const linkedText = `<a href="${linkUrl}" target="_blank" rel="noopener noreferrer" title="${selectedText}" style="color: white; font-weight: bold; font-style: italic;">${selectedText}</a>`;
    const newText = currentText.slice(0, selectedTextRange.start) + linkedText + currentText.slice(selectedTextRange.end);
    const updatedParrafos = [...formData.parrafos];
    updatedParrafos[selectedParagraphIndex] = newText;
    setFormData({ ...formData, parrafos: updatedParrafos });
    setSelectedParagraphIndex(null);
    setSelectedTextRange(null);
    setSelectedText("");
    setLinkUrl("");
    setIsLinkModalOpen(false);
  };
  const handleProductLinkClick = (index) => {
    const textarea = document.getElementById(
      `parrafo-${index}`
    );
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = textarea.value.substring(start, end);
    if (!selected) {
      Swal.fire(
        "Selecciona texto",
        "Selecciona una palabra o frase para enlazar a un producto.",
        "warning"
      );
      return;
    }
    setSelectedParagraphIndex(index);
    setSelectedTextRange({ start, end });
    setSelectedText(selected);
    setIsProductLinkModalOpen(true);
  };
  const handleInsertProductLink = (producto) => {
    if (selectedParagraphIndex === null || selectedTextRange === null) return;
    const currentText = formData.parrafos[selectedParagraphIndex];
    const link = producto.link;
    const linkedText = `<a href="/products/producto/?link=${link}" style="color: white; font-weight: bold; font-style: italic;" title="${link}">${selectedText}</a>`;
    const newText = currentText.slice(0, selectedTextRange.start) + linkedText + currentText.slice(selectedTextRange.end);
    const updatedParrafos = [...formData.parrafos];
    updatedParrafos[selectedParagraphIndex] = newText;
    setFormData({ ...formData, parrafos: updatedParrafos });
    setSelectedParagraphIndex(null);
    setSelectedTextRange(null);
    setSelectedText("");
    setIsProductLinkModalOpen(false);
  };
  const closeModal = () => {
    setIsOpen(false);
    setSelectedParagraphIndex(null);
    setSelectedTextRange(null);
    setSelectedText("");
    setIsLinkModalOpen(false);
    setIsProductLinkModalOpen(false);
    setLinkUrl("");
    setFormData(defaultFormData);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const isEdit = !!blogToEdit;
    if (!formData.producto_id) return alert("⚠️ Debe seleccionar un producto.");
    if (!formData.subtitulo.trim())
      return alert("⚠️ El subtítulo es obligatorio.");
    if (!isEdit && !formData.imagen_principal)
      return alert("⚠️ La imagen principal es obligatoria para crear.");
    if (!formData.subtitulo.trim())
      return alert("⚠️ El subtítulo es obligatorio.");
    if (!isEdit && !formData.imagen_principal)
      return alert("⚠️ La imagen principal es obligatoria para crear.");
    const parrafosConContenido = formData.parrafos.filter((p) => p.trim());
    if (parrafosConContenido.length === 0)
      return alert("⚠️ Debe haber al menos un párrafo con contenido.");
    const urlRegex = /^[a-z0-Z0-9]+(?:-[a-z0-Z0-9]+)*$/;
    if (formData.link && !urlRegex.test(formData.link)) {
      return alert(
        "⚠️ El link debe ser URL-friendly (Solo letras, guiones y números)."
      );
    }
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const formDataToSend = new FormData();
      formDataToSend.append("producto_id", formData.producto_id);
      formDataToSend.append("subtitulo", formData.subtitulo);
      formDataToSend.append("url_video", formData.url_video);
      if (formData.link?.trim())
        formDataToSend.append("link", formData.link.trim());
      const etiqueta = {
        meta_titulo: formData.meta_titulo?.trim() || "",
        meta_descripcion: formData.meta_descripcion?.trim() || ""
      };
      if (etiqueta.meta_titulo || etiqueta.meta_descripcion) {
        formDataToSend.append("etiqueta", JSON.stringify(etiqueta));
      }
      if (formData.text_alt_principal?.trim())
        formDataToSend.append(
          "text_alt_principal",
          formData.text_alt_principal.trim()
        );
      if (formData.alt_imagen_card?.trim())
        formDataToSend.append(
          "alt_imagen_card",
          formData.alt_imagen_card.trim()
        );
      if (formData.imagen_principal)
        formDataToSend.append("imagen_principal", formData.imagen_principal);
      const imagenesConArchivo = formData.imagenes_secundarias.filter(
        (img) => img !== null
      );
      imagenesConArchivo.forEach(
        (img) => formDataToSend.append("imagenes[]", img)
      );
      formData.alt_imagenes_secundarias.forEach((alt, index) => {
        if (formData.imagenes_secundarias[index] !== null || isEdit && alt.trim()) {
          formDataToSend.append("alt_imagenes[]", alt.trim());
        }
      });
      parrafosConContenido.forEach(
        (parrafo) => formDataToSend.append("parrafos[]", parrafo.trim())
      );
      const endpoint = isEdit ? getApiUrl(config.endpoints.blogs.update(blogToEdit.id)) : getApiUrl(config.endpoints.blogs.create);
      if (isEdit) formDataToSend.append("_method", "PUT");
      const res = await fetch(endpoint, {
        method: "POST",
        body: formDataToSend,
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json"
        }
      });
      let data;
      try {
        data = await res.json();
      } catch {
        data = await res.text();
      }
      if (res.ok) {
        alert(`✅ Blog ${isEdit ? "actualizado" : "creado"} correctamente.`);
        closeModal();
        onSuccess?.();
      } else {
        if (data.errors) {
          let errorMessage = "❌ Errores de validación:\n";
          Object.keys(data.errors).forEach((field) => {
            const errors = Array.isArray(data.errors[field]) ? data.errors[field] : [data.errors[field]];
            errorMessage += `• ${field}: ${errors.join(", ")}
`;
          });
          alert(errorMessage);
        } else {
          alert(
            `❌ Error (${res.status}): ${data.message || JSON.stringify(data)}`
          );
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
  return /* @__PURE__ */ jsx("div", { className: "fixed inset-0 flex items-center justify-center bg-black/50 z-50", children: /* @__PURE__ */ jsxs("div", { className: "bg-white text-black px-4 sm:px-6 md:px-8 py-6 rounded-lg max-h-[90vh] w-full max-w-5xl mx-2 overflow-y-auto", children: [
    /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold mb-6 text-center md:text-left", children: blogToEdit ? "Editar Blog" : "Añadir Blog" }),
    /* @__PURE__ */ jsx(
      "form",
      {
        onSubmit: handleSubmit,
        encType: "multipart/form-data",
        className: "space-y-8",
        children: /* @__PURE__ */ jsxs("div", { className: "bg-blue-50 p-4 sm:p-6 rounded-lg border border-blue-200", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-blue-800 mb-4", children: "Información Principal & SEO" }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "col-span-1 md:col-span-4", children: [
              /* @__PURE__ */ jsxs("label", { className: "block mb-2 font-medium", children: [
                "Producto ",
                /* @__PURE__ */ jsx("span", { className: "text-red-500", children: "*" })
              ] }),
              /* @__PURE__ */ jsxs(
                "select",
                {
                  name: "producto_id",
                  value: formData.producto_id,
                  onChange: handleSelectChange,
                  required: true,
                  className: "w-full bg-white text-black p-2 rounded-md border border-gray-300",
                  disabled: loading,
                  children: [
                    /* @__PURE__ */ jsx("option", { value: "", children: loading ? "Cargando productos..." : "-- Selecciona un producto --" }),
                    productos.map((producto) => /* @__PURE__ */ jsx("option", { value: producto.id.toString(), children: producto.nombre || `Producto ${producto.id}` }, producto.id))
                  ]
                }
              ),
              /* @__PURE__ */ jsx("small", { className: "text-gray-500", children: "Selecciona el producto relacionado con este blog. Requerido." }),
              nombreProducto && /* @__PURE__ */ jsxs("p", { className: "text-xs text-gray-500 mt-1", children: [
                "Producto seleccionado: ",
                /* @__PURE__ */ jsx("strong", { children: nombreProducto })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "col-span-1 md:col-span-2", children: [
              /* @__PURE__ */ jsxs("label", { className: "block font-medium mb-1", children: [
                "Subtítulo ",
                /* @__PURE__ */ jsx("span", { className: "text-red-500", children: "*" })
              ] }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  name: "subtitulo",
                  value: formData.subtitulo,
                  onChange: handleInputChange,
                  className: "w-full border border-gray-300 rounded px-3 py-2",
                  required: true
                }
              ),
              /* @__PURE__ */ jsx("small", { className: "text-gray-500 block mt-1", children: "Máx. 120 caracteres (letras, números y espacios)." })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "col-span-1 md:col-span-2", children: [
              /* @__PURE__ */ jsx("label", { className: "block font-medium mb-1", children: "Meta título" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  name: "meta_titulo",
                  value: formData.meta_titulo || "",
                  onChange: handleInputChange,
                  placeholder: "Título optimizado para SEO",
                  className: "w-full border border-gray-300 rounded px-3 py-2"
                }
              ),
              /* @__PURE__ */ jsx("small", { className: "text-gray-500 block mt-1", children: "Máx. 70 caracteres (letras, números y espacios)." })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "col-span-1 md:col-span-4", children: [
              /* @__PURE__ */ jsx("label", { className: "block font-medium mb-1", children: "Meta descripción" }),
              /* @__PURE__ */ jsx(
                "textarea",
                {
                  name: "meta_descripcion",
                  value: formData.meta_descripcion || "",
                  onChange: handleInputChange,
                  placeholder: "Descripción optimizada para SEO",
                  className: "w-full border border-gray-300 rounded px-3 py-2"
                }
              ),
              /* @__PURE__ */ jsx("small", { className: "text-gray-500 block mt-1", children: "Máx. 160 caracteres (letras, números y espacios)." })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "col-span-1 md:col-span-4", children: [
              /* @__PURE__ */ jsx("label", { className: "block font-medium mb-1", children: "Link (URL amigable)" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  name: "link",
                  value: formData.link,
                  onChange: handleInputChange,
                  placeholder: "ejemplo: mi-blog-post",
                  className: "w-full border border-gray-300 rounded px-3 py-2"
                }
              ),
              /* @__PURE__ */ jsx("small", { className: "text-gray-500", children: "Escribe solo letras y guiones. Máx. 255 letras o números." })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-green-50 p-4 sm:p-6 rounded-lg border border-green-200", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-green-800 mb-4", children: "Imágenes" }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
              /* @__PURE__ */ jsxs("div", { className: "border border-green-400 rounded p-4", children: [
                /* @__PURE__ */ jsxs("label", { className: "block font-medium mb-2", children: [
                  "Imagen Principal",
                  " ",
                  !blogToEdit && /* @__PURE__ */ jsx("span", { className: "text-red-500", children: "*" })
                ] }),
                blogToEdit?.imagen_principal && /* @__PURE__ */ jsx(
                  "img",
                  {
                    src: blogToEdit.imagen_principal,
                    alt: formData.text_alt_principal || "Imagen principal",
                    className: "w-full h-48 sm:h-64 object-cover rounded mb-4 border"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "file",
                    accept: "image/*",
                    onChange: (e) => handleFileChange(e, "imagen_principal"),
                    className: "w-full file:py-2 file:px-3 file:border-0 file:bg-green-100 file:text-green-700 hover:file:bg-green-200"
                  }
                ),
                /* @__PURE__ */ jsx("small", { className: "text-gray-500", children: "Peso máximo: 2 MB." }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "text",
                    name: "text_alt_principal",
                    placeholder: "Texto ALT para SEO",
                    value: formData.text_alt_principal,
                    onChange: handleInputChange,
                    className: "mt-2 w-full border border-gray-300 rounded px-3 py-2"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "border border-green-400 rounded p-4", children: [
                /* @__PURE__ */ jsx("label", { className: "block font-semibold mb-4", children: "Imágenes Secundarias" }),
                /* @__PURE__ */ jsx("small", { className: "text-gray-500", children: "Imágenes adicionales del artículo. Se creará un registro por archivo en la tabla imagen_blogs." }),
                /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6", children: formData.imagenes_secundarias.map((_, i) => /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center", children: [
                  blogToEdit?.imagenes?.[i]?.ruta_imagen && /* @__PURE__ */ jsx(
                    "img",
                    {
                      src: blogToEdit.imagenes[i].ruta_imagen,
                      alt: formData.alt_imagenes_secundarias[i] || `Imagen secundaria #${i + 1}`,
                      className: "w-full h-32 object-cover rounded mb-2 border"
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "file",
                      accept: "image/*",
                      onChange: (e) => handleImagenSecundariaChange(e, i),
                      className: "w-full file:py-2 file:px-3 file:border-0 file:bg-green-100 file:text-green-700 hover:file:bg-green-200"
                    }
                  ),
                  /* @__PURE__ */ jsxs("small", { className: "text-gray-500", children: [
                    "Archivo de imagen secundaria #",
                    i + 1,
                    ".",
                    /* @__PURE__ */ jsx("br", {}),
                    "Tamaño máximo: 2 MB."
                  ] }),
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "text",
                      placeholder: `Texto ALT imagen secundaria #${i + 1}`,
                      value: formData.alt_imagenes_secundarias[i],
                      onChange: (e) => handleAltImagenSecundariaChange(e, i),
                      className: "w-full border border-gray-300 rounded px-3 py-2 mt-2"
                    }
                  )
                ] }, i)) })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-purple-50 p-4 sm:p-6 rounded-lg border border-purple-200", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-purple-800 mb-4", children: "Video" }),
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
            ),
            /* @__PURE__ */ jsx("small", { className: "text-gray-500", children: "Solo minúsculas y guiones. Hasta 255 letras, números o espacios." })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-yellow-50 p-4 sm:p-6 rounded-lg border border-yellow-200", children: [
            /* @__PURE__ */ jsxs("h3", { className: "text-lg font-semibold text-yellow-800 mb-4", children: [
              "Párrafos ",
              /* @__PURE__ */ jsx("span", { className: "text-red-500", children: "*" })
            ] }),
            formData.parrafos.map((p, i) => /* @__PURE__ */ jsxs("div", { className: "relative mb-6", children: [
              /* @__PURE__ */ jsx(
                "textarea",
                {
                  id: `parrafo-${i}`,
                  value: p,
                  onChange: (e) => handleParrafoChange(e, i),
                  className: "w-full border border-gray-300 rounded px-3 py-2 pr-20",
                  rows: 4,
                  placeholder: `Párrafo ${i + 1} (opcional)`
                }
              ),
              /* @__PURE__ */ jsx("small", { className: "text-gray-500", children: "Máx. 100 caracteres (letras, números y espacios)." }),
              /* @__PURE__ */ jsxs("div", { className: "absolute top-2 right-2 flex gap-2", children: [
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => handleInsertLinkClick(i),
                    className: "bg-blue-500 hover:bg-blue-700 text-white p-2 rounded-full shadow-lg transition",
                    children: "🔗"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => handleProductLinkClick(i),
                    className: "bg-green-500 hover:bg-green-700 text-white p-2 rounded-full shadow-lg transition",
                    children: "🛒"
                  }
                )
              ] })
            ] }, i))
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row justify-end gap-3 sm:gap-4", children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: closeModal,
                className: "bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded",
                disabled: loading,
                children: "Cancelar"
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "submit",
                disabled: loading,
                className: "bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded disabled:opacity-50",
                children: loading ? "Procesando..." : blogToEdit ? "Actualizar" : "Crear"
              }
            )
          ] })
        ] })
      }
    ),
    isLinkModalOpen && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 flex items-center justify-center bg-black/50 z-[60]", children: /* @__PURE__ */ jsxs("div", { className: "bg-white p-6 rounded-lg max-w-md w-full mx-4", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold mb-4", children: "Insertar Enlace" }),
      /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-600 mb-2", children: [
        "Texto seleccionado: ",
        /* @__PURE__ */ jsxs("strong", { children: [
          '"',
          selectedText,
          '"'
        ] })
      ] }),
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "url",
          value: linkUrl,
          onChange: (e) => setLinkUrl(e.target.value),
          placeholder: "https://ejemplo.com",
          className: "w-full border border-gray-300 rounded px-3 py-2 mb-4",
          required: true
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "flex justify-end gap-2", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: () => setIsLinkModalOpen(false),
            className: "bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded",
            children: "Cancelar"
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: handleInsertManualLink,
            disabled: !linkUrl.trim(),
            className: "bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white px-4 py-2 rounded",
            children: "Insertar"
          }
        )
      ] })
    ] }) }),
    isProductLinkModalOpen && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 flex items-center justify-center bg-black/50 z-[60]", children: /* @__PURE__ */ jsxs("div", { className: "bg-white p-6 rounded-lg max-w-md w-full mx-4", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold mb-4", children: "Enlazar a Producto" }),
      /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-600 mb-4", children: [
        "Texto seleccionado: ",
        /* @__PURE__ */ jsxs("strong", { children: [
          '"',
          selectedText,
          '"'
        ] })
      ] }),
      /* @__PURE__ */ jsxs(
        "select",
        {
          onChange: (e) => {
            const selectedId = parseInt(e.target.value);
            const selectedProduct = productos.find(
              (p) => p.id === selectedId
            );
            if (selectedProduct) handleInsertProductLink(selectedProduct);
          },
          className: "w-full border border-gray-300 rounded px-3 py-2 mb-4",
          children: [
            /* @__PURE__ */ jsx("option", { value: "", children: "-- Seleccionar producto --" }),
            productos.map((producto) => /* @__PURE__ */ jsx("option", { value: producto.id, children: producto.nombre }, producto.id))
          ]
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          onClick: () => setIsProductLinkModalOpen(false),
          className: "bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded",
          children: "Cancelar"
        }
      ) })
    ] }) })
  ] }) });
};

const BlogImageCarousel = ({ item, getImageUrl }) => {
  const [swiperInstance, setSwiperInstance] = useState(null);
  const totalSlides = 1 + (item.imagenes?.length || 0);
  useEffect(() => {
    if (swiperInstance) {
      swiperInstance.update();
    }
  }, [item, swiperInstance]);
  if (totalSlides <= 1) {
    return /* @__PURE__ */ jsx(
      "img",
      {
        src: getImageUrl(item.imagen_principal),
        alt: item.nombre_producto || "Blog",
        className: "w-full max-w-[120px] h-20 object-cover rounded-lg shadow-md"
      }
    );
  }
  return /* @__PURE__ */ jsxs(
    Swiper,
    {
      onSwiper: setSwiperInstance,
      modules: [Pagination, Autoplay],
      spaceBetween: 10,
      slidesPerView: 1,
      loop: totalSlides >= 3,
      rewind: totalSlides === 2,
      speed: 800,
      autoplay: {
        delay: 2e3,
        disableOnInteraction: false,
        pauseOnMouseEnter: true
      },
      pagination: { clickable: true },
      className: "w-full max-w-[120px] h-20 rounded-lg shadow-md",
      children: [
        /* @__PURE__ */ jsx(SwiperSlide, { children: /* @__PURE__ */ jsx(
          "img",
          {
            src: getImageUrl(item.imagen_principal),
            alt: item.nombre_producto || "Blog",
            className: "w-full h-20 object-cover rounded-lg"
          }
        ) }, `slide-principal-${item.id}`),
        item.imagenes?.map((img, i) => /* @__PURE__ */ jsx(SwiperSlide, { children: /* @__PURE__ */ jsx(
          "img",
          {
            src: getImageUrl(img.ruta_imagen),
            alt: img.text_alt || "Imagen extra",
            className: "w-full h-20 object-cover rounded-lg"
          }
        ) }, `slide-${item.id}-${i}`))
      ]
    }
  );
};

const BlogsTable = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [paginationData, setPaginationData] = useState({
    current_page: 1,
    last_page: 1,
    per_page: itemsPerPage,
    total: 0
  });
  const [editBlog, setEditBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { darkMode} = useDarkMode();
  const fetchData = async (page = 1) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${getApiUrl(config.endpoints.blogs.list)}?page=${page}&per_page=${itemsPerPage}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json"
          }
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      if (result.success && result.data && Array.isArray(result.data.data)) {
        setData(result.data.data);
        setPaginationData({
          current_page: result.data.current_page ?? page,
          last_page: result.data.last_page,
          per_page: result.data.per_page,
          total: result.data.total
        });
      } else {
        setData([]);
      }
    } catch (error) {
      console.error("❌ Error al cargar datos:", error);
      setData([]);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);
  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= paginationData.last_page) {
      setCurrentPage(pageNumber);
    }
  };
  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    const confirmDelete = window.confirm(
      "¿Estás seguro de que deseas eliminar este blog?"
    );
    if (confirmDelete) {
      try {
        const response = await fetch(
          getApiUrl(config.endpoints.blogs.delete(id)),
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`
            }
          }
        );
        if (response.ok) {
          fetchData(currentPage);
          alert("✅ Blog eliminado exitosamente");
        } else {
          const errorData = await response.json().catch(() => ({}));
          alert(
            `❌ Error al eliminar el blog: ${errorData.message || "Error desconocido"}`
          );
        }
      } catch {
        alert("❌ Error al conectar con el servidor");
      }
    }
  };
  const getImageUrl = (imagePath) => {
    if (!imagePath) return "/placeholder-image.jpg";
    if (imagePath.startsWith("http")) return imagePath;
    const baseUrl = "https://apiyuntas.yuntaspublicidad.com";
    return `${baseUrl}${imagePath}`;
  };
  const truncateText = (text, maxLength = 50) => {
    if (!text) return "";
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  };
  const handleAddNewBlog = () => {
    setEditBlog(null);
    setIsModalOpen(true);
  };
  return /* @__PURE__ */ jsxs("div", { className: "overflow-x-auto p-2 sm:p-4", children: [
    /* @__PURE__ */ jsxs(
      TableContainer,
      {
        tableType: "blogs",
        exportData: data,
        onAddNew: handleAddNewBlog,
        children: [
          /* @__PURE__ */ jsx("thead", { className: "hidden md:table-header-group", children: /* @__PURE__ */ jsx("tr", { className: "bg-blue-950 text-white", children: ["ID", "PRODUCTO", "SUBTÍTULO", "IMAGEN", "FECHA", "ACCIÓN"].map(
            (header) => /* @__PURE__ */ jsx(
              "th",
              {
                className: `px-4 py-2 text-white uppercase text-xs font-bold rounded-md ${darkMode ? "bg-cyan-900" : "bg-cyan-400"}`,
                children: header
              },
              header
            )
          ) }) }),
          /* @__PURE__ */ jsx("tbody", { children: loading ? /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx(
            "td",
            {
              colSpan: 6,
              className: "text-center py-4 text-gray-500 block md:table-cell",
              children: "Cargando blogs..."
            }
          ) }) : data.length > 0 ? data.map((item, idx) => {
            1 + (item.imagenes?.length || 0);
            return /* @__PURE__ */ jsxs(
              "tr",
              {
                className: `md:table-row block md:mb-0 mb-6 rounded-xl shadow-md overflow-hidden border ${idx % 2 === 0 && darkMode ? "bg-white text-black" : "text-black bg-white"}`,
                children: [
                  /* @__PURE__ */ jsx(
                    "td",
                    {
                      "data-label": "ID",
                      className: `block md:table-cell px-4 py-2 border-b font-bold before:content-['ID'] before:font-semibold before:block md:before:hidden ${darkMode ? "bg-gray-300" : ""}`,
                      children: item.id
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "td",
                    {
                      "data-label": "Producto",
                      className: `block md:table-cell px-4 py-2 border-b font-semibold before:content-['Producto'] before:font-semibold before:block md:before:hidden ${darkMode ? "bg-gray-300" : ""}`,
                      children: truncateText(item.nombre_producto || "Sin nombre", 30)
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "td",
                    {
                      "data-label": "Subtítulo",
                      className: `block md:table-cell px-4 py-2 border-b before:content-['Subtítulo'] before:font-semibold before:block md:before:hidden ${darkMode ? "bg-gray-300" : ""}`,
                      children: truncateText(item.subtitulo, 40)
                    }
                  ),
                  /* @__PURE__ */ jsxs(
                    "td",
                    {
                      "data-label": "Imagen",
                      className: `block md:table-cell px-4 py-2 border-b border-gray-200 relative md:static before:content-['Imagen'] before:font-semibold before:block md:before:hidden ${darkMode ? "bg-gray-300" : ""}`,
                      children: [
                        /* @__PURE__ */ jsx("div", { className: "block md:hidden w-full", children: /* @__PURE__ */ jsxs(
                          Swiper,
                          {
                            modules: [Navigation, Pagination],
                            spaceBetween: 10,
                            slidesPerView: 1,
                            pagination: { clickable: true },
                            navigation: true,
                            className: "w-full max-w-[320px] rounded-lg shadow-md",
                            children: [
                              /* @__PURE__ */ jsx(SwiperSlide, { children: /* @__PURE__ */ jsx(
                                "img",
                                {
                                  src: getImageUrl(item.imagen_principal),
                                  alt: item.nombre_producto || "Blog",
                                  className: "w-full h-48 object-cover rounded-lg"
                                }
                              ) }),
                              item.imagenes?.map((img, i) => /* @__PURE__ */ jsx(SwiperSlide, { children: /* @__PURE__ */ jsx(
                                "img",
                                {
                                  src: getImageUrl(img.ruta_imagen),
                                  alt: img.text_alt || "Imagen extra",
                                  className: "w-full h-48 object-cover rounded-lg"
                                }
                              ) }, i))
                            ]
                          }
                        ) }),
                        /* @__PURE__ */ jsx("div", { className: "hidden md:block w-full", children: /* @__PURE__ */ jsx(BlogImageCarousel, { item, getImageUrl }, item.id) })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "td",
                    {
                      "data-label": "Fecha",
                      className: `block md:table-cell px-4 py-2 border-b text-sm before:content-['Fecha'] before:font-semibold before:block md:before:hidden ${darkMode ? "bg-gray-300" : ""}`,
                      children: item.created_at ? new Date(item.created_at).toLocaleDateString("es-ES") : "N/A"
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "td",
                    {
                      "data-label": "Acción",
                      className: `block md:table-cell px-4 py-3 border-b before:content-['Acción'] before:font-semibold before:block md:before:hidden ${darkMode ? "bg-gray-300" : ""}`,
                      children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row justify-center gap-3 mt-2 sm:mt-0", children: [
                        /* @__PURE__ */ jsxs(
                          "button",
                          {
                            className: "flex items-center justify-center gap-2 p-2 text-red-600 hover:text-red-800 transition bg-red-100 rounded-lg shadow-sm",
                            title: "Eliminar",
                            onClick: () => handleDelete(item.id),
                            children: [
                              /* @__PURE__ */ jsx(FaTrash, { size: 18 }),
                              /* @__PURE__ */ jsx("span", { className: "md:hidden font-medium", children: "Borrar" })
                            ]
                          }
                        ),
                        /* @__PURE__ */ jsxs(
                          "button",
                          {
                            className: "flex items-center justify-center gap-2 p-2 text-yellow-600 hover:text-yellow-800 transition bg-yellow-100 rounded-lg shadow-sm",
                            title: "Editar",
                            onClick: () => {
                              setEditBlog(item);
                              setIsModalOpen(true);
                            },
                            children: [
                              /* @__PURE__ */ jsx(FaEdit, { size: 18 }),
                              /* @__PURE__ */ jsx("span", { className: "md:hidden font-medium", children: "Editar" })
                            ]
                          }
                        )
                      ] })
                    }
                  )
                ]
              },
              item.id
            );
          }) : /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", { colSpan: 6, className: "text-center py-4 text-gray-500", children: "No hay blogs disponibles" }) }) })
        ]
      }
    ),
    paginationData.last_page > 1 && /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap justify-center items-center mt-4 gap-2", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => handlePageChange(currentPage - 1),
          disabled: currentPage === 1,
          className: "px-4 py-2 bg-blue-950 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-800 transition-colors",
          children: "Anterior"
        }
      ),
      Array.from({ length: paginationData.last_page }, (_, i) => {
        const pageNum = i + 1;
        return /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => handlePageChange(pageNum),
            className: `px-3 py-2 rounded-md ${currentPage === pageNum ? "bg-blue-950 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`,
            children: pageNum
          },
          pageNum
        );
      }),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => handlePageChange(currentPage + 1),
          disabled: currentPage === paginationData.last_page,
          className: "px-4 py-2 bg-blue-950 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-800 transition-colors",
          children: "Siguiente"
        }
      )
    ] }),
    /* @__PURE__ */ jsx(
      "button",
      {
        onClick: handleAddNewBlog,
        className: "mt-4 mb-6 bg-blue-950 hover:bg-blue-800 text-white text-lg px-8 sm:px-10 py-2 rounded-full w-full sm:w-auto",
        children: "Añadir Blog"
      }
    ),
    /* @__PURE__ */ jsx(
      AddBlogModal,
      {
        isOpen: isModalOpen,
        setIsOpen: setIsModalOpen,
        blogToEdit: editBlog,
        onSuccess: () => {
          setEditBlog(null);
          setIsModalOpen(false);
          fetchData(currentPage);
        }
      }
    )
  ] });
};

const $$Admin = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "LayoutAdmin", $$LayoutAdmin, { "title": "admin" }, { "default": ($$result2) => renderTemplate`  ${renderComponent($$result2, "AdminDashboard", null, { "client:only": "react", "client:component-hydration": "only", "client:component-path": "/home/runner/work/Yuntas-Frontend/Yuntas-Frontend/src/components/admin/Admin.tsx", "client:component-export": "default" })}  ${maybeRenderHead()}<div class="flex-1"> <div class="w-full"> ${renderComponent($$result2, "BlogsTable", BlogsTable, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/home/runner/work/Yuntas-Frontend/Yuntas-Frontend/src/components/dashboard/tables/BlogsTable.tsx", "client:component-export": "default" })} </div> </div> ` })}`;
}, "/home/runner/work/Yuntas-Frontend/Yuntas-Frontend/src/pages/admin.astro", void 0);

const $$file = "/home/runner/work/Yuntas-Frontend/Yuntas-Frontend/src/pages/admin.astro";
const $$url = "/admin";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Admin,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
