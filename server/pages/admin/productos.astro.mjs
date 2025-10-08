import { c as createComponent, b as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_hsX-BFeG.mjs';
import 'kleur/colors';
import { $ as $$LayoutAdmin } from '../../chunks/LayoutAdmin_B6m1CA_E.mjs';
import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import { FaTimes, FaImage, FaRegEdit, FaTrash, FaTags } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { g as getApiUrl, c as config } from '../../chunks/config_CL3T0jDM.mjs';
import { T as TableContainer } from '../../chunks/TableContainer_BGxs4l4M.mjs';
import { p as productoService } from '../../chunks/productoService_BNz5f_MX.mjs';
import { u as useDarkMode } from '../../chunks/Footer_DLPwzSAN.mjs';
export { renderers } from '../../renderers.mjs';

const Modal = ({ children, isOpen, onClose, title }) => {
  if (!isOpen) return null;
  return /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-black/40 overflow-y-auto", children: /* @__PURE__ */ jsxs("div", { className: "relative bg-white dark:bg-gray-900 px-5 py-6 rounded-xl max-w-4xl w-full mx-4 my-10 shadow-lg", children: [
    title && /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold mb-4 text-gray-800 dark:text-white", children: title }),
    /* @__PURE__ */ jsx(
      "button",
      {
        onClick: onClose,
        className: "absolute top-4 right-5 text-gray-500 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white text-xl",
        "aria-label": "Cerrar",
        children: "✕"
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "overflow-y-auto max-h-[75vh] pr-2", children })
  ] }) });
};

const handleImageFileChange = (e) => {
  const file = e.target.files?.[0];
  if (file && file.size > 2 * 1024 * 1024) {
    Swal.fire({
      icon: "warning",
      title: "¡Imagen muy grande!",
      text: "Máx. 2 MB."
    });
    e.target.value = "";
  }
};
const ProductForm = ({ initialData, onSubmit, isEditing }) => {
  useEffect(() => {
    if (initialData) {
      console.log(
        "Inicializando especificaciones y beneficios desde specs:",
        initialData.especificaciones
      );
      const specs = initialData.especificaciones ? Object.entries(initialData.especificaciones).filter(([key]) => key.startsWith("spec_")).map(([, value]) => String(value).trim()) : [];
      setEspecificaciones(specs.length > 0 ? specs : [""]);
      const benefits = initialData.especificaciones ? Object.entries(initialData.especificaciones).filter(([key]) => key.startsWith("beneficio_")).map(([, value]) => String(value).trim()) : [];
      setBeneficios(benefits.length > 0 ? benefits : [""]);
    }
  }, [initialData]);
  const [imagenesExistentes, setImagenesExistentes] = useState(
    initialData?.imagenes || []
  );
  const [idsAEliminar, setIdsAEliminar] = useState([]);
  const [especificaciones, setEspecificaciones] = useState(
    (() => {
      if (!initialData?.especificaciones) return [""];
      const specs = Object.entries(initialData.especificaciones).filter(([key]) => key.startsWith("spec_")).map(([, value]) => String(value));
      return specs.length > 0 ? specs : [""];
    })()
  );
  const [beneficios, setBeneficios] = useState(
    (() => {
      if (!initialData?.especificaciones) return [""];
      const benefits = Object.entries(initialData.especificaciones).filter(([key]) => key.startsWith("beneficio_")).map(([, value]) => String(value));
      return benefits.length > 0 ? benefits : [""];
    })()
  );
  const [keywords, setKeywords] = useState(
    initialData?.etiqueta?.keywords || [""]
  );
  const handleKeywordChange = (index, value) => {
    const updated = [...keywords];
    updated[index] = value;
    setKeywords(updated);
  };
  const addKeyword = () => {
    const last = keywords[keywords.length - 1];
    if (last.trim()) {
      setKeywords([...keywords, ""]);
    }
  };
  const removeKeyword = (index) => {
    if (keywords.length > 1) {
      setKeywords(keywords.filter((_, i) => i !== index));
    }
  };
  const deleteExistImage = (id) => {
    setImagenesExistentes(imagenesExistentes.filter((img) => img.id !== id));
    setIdsAEliminar([...idsAEliminar, id]);
  };
  const handleEspecificacionChange = (index, value) => {
    const updated = [...especificaciones];
    updated[index] = value;
    setEspecificaciones(updated);
  };
  const addEspecificacion = () => {
    const last = especificaciones[especificaciones.length - 1];
    if (last.trim()) {
      setEspecificaciones([...especificaciones, ""]);
    }
  };
  const removeEspecificacion = (index) => {
    if (especificaciones.length > 1) {
      setEspecificaciones(especificaciones.filter((_, i) => i !== index));
    }
  };
  const handleBeneficioChange = (index, value) => {
    const updated = [...beneficios];
    updated[index] = value;
    setBeneficios(updated);
  };
  const addBeneficio = () => {
    const last = beneficios[beneficios.length - 1];
    if (last.trim()) {
      setBeneficios([...beneficios, ""]);
    }
  };
  const removeBeneficio = (index) => {
    if (beneficios.length > 1) {
      setBeneficios(beneficios.filter((_, i) => i !== index));
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const finalFormData = new FormData();
    finalFormData.append("nombre", formData.get("nombre"));
    finalFormData.append("link", formData.get("link"));
    finalFormData.append("titulo", formData.get("titulo_hero"));
    finalFormData.append("stock", formData.get("stock"));
    const precioValue = formData.get("precio").replace("$", "").trim();
    finalFormData.append("precio", precioValue);
    finalFormData.append("subtitulo", formData.get("nombre"));
    finalFormData.append(
      "descripcion",
      formData.get("descripcion_informacion")
    );
    finalFormData.append("seccion", formData.get("seccion"));
    const imagenListaProductos = formData.get("imagen_lista_productos");
    if (imagenListaProductos && imagenListaProductos.size > 0) {
      finalFormData.append("imagen_principal", imagenListaProductos);
    }
    const especificacionesObj = {};
    especificaciones.forEach((esp, index) => {
      if (esp.trim()) {
        especificacionesObj[`spec_${index + 1}`] = esp.trim();
      }
    });
    beneficios.forEach((ben, index) => {
      if (ben.trim()) {
        especificacionesObj[`beneficio_${index + 1}`] = ben.trim();
      }
    });
    if (Object.keys(especificacionesObj).length > 0) {
      Object.entries(especificacionesObj).forEach(([key, value]) => {
        finalFormData.append(`especificaciones[${key}]`, value);
      });
    }
    const tiposImagenes = [
      {
        key: "imagen_hero",
        file: formData.get("imagen_hero"),
        index: 0
      },
      {
        key: "imagen_especificaciones",
        file: formData.get("imagen_especificaciones"),
        index: 1
      },
      {
        key: "imagen_beneficios",
        file: formData.get("imagen_beneficios"),
        index: 2
      },
      {
        key: "imagen_popups",
        file: formData.get("imagen_popups"),
        index: 3
      }
    ];
    console.log("=== DEBUGGING IMÁGENES FRONTEND ===");
    let imagenesEnviadas = 0;
    tiposImagenes.forEach((imagen) => {
      console.log(`Revisando imagen ${imagen.index} (${imagen.key}):`, {
        hasFile: imagen.file instanceof File,
        fileName: imagen.file?.name || "N/A",
        fileSize: imagen.file?.size || 0,
        fileType: imagen.file?.type || "N/A"
      });
      if (imagen.file && imagen.file instanceof File && imagen.file.size > 0) {
        console.log(
          `✅ Agregando imagen ${imagen.index}:`,
          imagen.key,
          imagen.file.name,
          `(${imagen.file.size} bytes)`
        );
        finalFormData.append(`imagenes[${imagen.index}]`, imagen.file);
        finalFormData.append(`imagen_tipos[${imagen.index}]`, imagen.key);
        imagenesEnviadas++;
      } else {
        console.log(
          `❌ Imagen ${imagen.index} (${imagen.key}) no tiene archivo válido o está vacía`
        );
      }
      const metaTitulo2 = formData.get("meta_título");
      const metaDescripcion2 = formData.get("meta_descripcion");
      finalFormData.append("etiqueta[meta_titulo]", metaTitulo2.trim());
      finalFormData.append("etiqueta[meta_descripcion]", metaDescripcion2.trim());
      const nonEmptyKeywords = keywords.filter((k) => k.trim() !== "");
      if (nonEmptyKeywords.length > 0) {
        nonEmptyKeywords.forEach((keyword, index) => {
          finalFormData.append(`etiqueta[keywords][${index}]`, keyword.trim());
        });
      }
    });
    console.log(`Total de imágenes enviadas: ${imagenesEnviadas}`);
    if (idsAEliminar.length > 0) {
      idsAEliminar.forEach((id, index) => {
        finalFormData.append(`imagenes_eliminar[${index}]`, id);
      });
    }
    const metaTitulo = formData.get("meta_título");
    const metaDescripcion = formData.get("meta_descripcion");
    if (metaTitulo.trim() || metaDescripcion.trim()) {
      finalFormData.append("etiqueta[meta_titulo]", metaTitulo.trim());
      finalFormData.append(
        "etiqueta[meta_descripcion]",
        metaDescripcion.trim()
      );
    }
    console.log("=== DATOS ENVIADOS AL BACKEND ===");
    finalFormData.forEach((value, key) => {
      if (value instanceof File) {
        console.log(
          `Campo: ${key}, Archivo: ${value.name} (${value.size} bytes)`
        );
      } else {
        console.log(`Campo: ${key}, Valor: ${value}`);
      }
    });
    if (isEditing) {
      finalFormData.append("_method", "PUT");
    }
    await onSubmit(finalFormData);
  };
  return /* @__PURE__ */ jsxs(
    "form",
    {
      id: "product-form",
      onSubmit: handleSubmit,
      className: "space-y-8 max-w-4xl mx-auto p-6",
      children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-blue-50 p-6 rounded-lg border border-blue-200", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-blue-800 mb-4 flex items-center", children: "Datos para Dashboard (Gestión Interna)" }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: [
                "Nombre del Producto",
                " ",
                /* @__PURE__ */ jsx("span", { className: "text-blue-600 text-sm", children: "(Aparece en tabla)" })
              ] }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  name: "nombre",
                  defaultValue: initialData?.nombre || initialData?.titulo,
                  className: "mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500",
                  required: true
                }
              ),
              /* @__PURE__ */ jsx("small", { className: "text-gray-500 block mt-1", children: "Máx. 255 caracteres (letras, números y espacios)." })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: [
                "Sección/Categoría",
                " ",
                /* @__PURE__ */ jsx("span", { className: "text-blue-600 text-sm", children: "(Aparece en tabla)" })
              ] }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  name: "seccion",
                  defaultValue: initialData?.seccion,
                  placeholder: "ej: Letreros LED, Sillas LED, Pisos LED, etc.",
                  className: "mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500",
                  required: true
                }
              ),
              /* @__PURE__ */ jsx("small", { className: "text-gray-500 block mt-1", children: "Máx. 255 caracteres (letras, números y espacios)." })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: [
                "Precio",
                " ",
                /* @__PURE__ */ jsx("span", { className: "text-blue-600 text-sm", children: "(Aparece en tabla)" })
              ] }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  name: "precio",
                  defaultValue: initialData?.precio ? `$${initialData.precio}` : initialData?.precio,
                  placeholder: "ej: $500.00",
                  className: "mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500",
                  required: true
                }
              ),
              /* @__PURE__ */ jsx("small", { className: "text-gray-500 block mt-1", children: "Coloca el precio en números (máx. 100 000)." })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "md:col-span-2", children: [
              /* @__PURE__ */ jsxs("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: [
                "Link/URL",
                " ",
                /* @__PURE__ */ jsx("span", { className: "text-blue-600 text-sm", children: "(ej: letreros-neon-led)" })
              ] }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  name: "link",
                  defaultValue: initialData?.link || (initialData?.titulo ? initialData.titulo.toLowerCase().replace(/\s+/g, "-").replace(/[^\w\-]/g, "") : ""),
                  placeholder: "letreros-neon-led",
                  className: "mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500",
                  required: true
                }
              ),
              /* @__PURE__ */ jsx("small", { className: "text-gray-500 block mt-1", children: "Solo minúsculas y guiones. Hasta 255 letras, números o espacios." })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "md:col-span-2", children: [
              /* @__PURE__ */ jsxs("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: [
                "Meta Título ",
                /* @__PURE__ */ jsx("span", { className: "text-blue-600 text-sm", children: "(SEO)" })
              ] }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  name: "meta_título",
                  defaultValue: initialData?.etiqueta?.meta_titulo || "",
                  placeholder: "Título para SEO del producto",
                  className: "mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                }
              ),
              /* @__PURE__ */ jsx("small", { className: "text-gray-500 block mt-1", children: "Máx. 70 caracteres (letras, números y espacios)." })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "md:col-span-2", children: [
              /* @__PURE__ */ jsxs("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: [
                "Meta Descripción",
                " ",
                /* @__PURE__ */ jsx("span", { className: "text-blue-600 text-sm", children: "(SEO)" })
              ] }),
              /* @__PURE__ */ jsx(
                "textarea",
                {
                  name: "meta_descripcion",
                  defaultValue: initialData?.etiqueta?.meta_descripcion || "",
                  rows: 3,
                  className: "mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500",
                  placeholder: "Descripción breve del producto para SEO..."
                }
              ),
              /* @__PURE__ */ jsx("small", { className: "text-gray-500 block mt-1", children: "Máx. 160 caracteres (letras, números y espacios)." })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "md:col-span-2", children: [
              /* @__PURE__ */ jsxs("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: [
                "Keywords ",
                /* @__PURE__ */ jsx("span", { className: "text-blue-600 text-sm", children: "(SEO)" })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "space-y-2", children: keywords.map((keyword, index) => /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "text",
                    value: keyword,
                    onChange: (e) => handleKeywordChange(index, e.target.value),
                    placeholder: "ej: letreros para negocio",
                    className: "flex-1 mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  }
                ),
                keywords.length > 1 && /* @__PURE__ */ jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => removeKeyword(index),
                    className: "text-red-500 hover:text-red-700 font-bold text-lg",
                    children: "✕"
                  }
                )
              ] }, index)) }),
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  onClick: addKeyword,
                  className: "mt-2 text-blue-600 hover:text-blue-800 text-sm font-medium cursor-pointer",
                  children: "+ Agregar keyword"
                }
              ),
              /* @__PURE__ */ jsx("small", { className: "text-gray-500 block mt-1", children: "Palabras clave relevantes para que los buscadores encuentren el producto." })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-green-50 p-6 rounded-lg border border-green-200", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-green-800 mb-4 flex items-center", children: "Datos para Página de Producto (Frontend)" }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: [
                "Título Hero",
                " ",
                /* @__PURE__ */ jsx("span", { className: "text-green-600 text-sm", children: "(Aparece sobre la imagen principal)" })
              ] }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  name: "titulo_hero",
                  defaultValue: initialData?.titulo,
                  placeholder: "ej: Letreros Neón LED",
                  className: "mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-green-500 focus:border-green-500",
                  required: true
                }
              ),
              /* @__PURE__ */ jsx("small", { className: "text-gray-500 block mt-1", children: "Máx. 255 caracteres (letras, números y espacios)." })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: [
                "Descripción",
                " ",
                /* @__PURE__ */ jsx("span", { className: "text-green-600 text-sm", children: '(Sección "Información")' })
              ] }),
              /* @__PURE__ */ jsx(
                "textarea",
                {
                  rows: 4,
                  name: "descripcion_informacion",
                  defaultValue: initialData?.descripcion,
                  placeholder: "Describe el producto, sus usos y características principales...",
                  className: "mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-green-500 focus:border-green-500",
                  required: true
                }
              ),
              /* @__PURE__ */ jsx("small", { className: "text-gray-500 block mt-1", children: "Descripción detallada. 300-600 palabras." })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-purple-50 p-6 rounded-lg border border-purple-200", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-purple-800 mb-4 flex items-center", children: "Especificaciones (Checkmarks en el producto)" }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
            especificaciones.map((esp, index) => /* @__PURE__ */ jsxs("div", { className: "flex gap-2 items-center", children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  value: esp,
                  onChange: (e) => handleEspecificacionChange(index, e.target.value),
                  placeholder: "ej: Materiales duraderos",
                  className: "flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                }
              ),
              especificaciones.length > 1 && /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  onClick: () => removeEspecificacion(index),
                  className: "text-red-500 hover:text-red-700 px-2 py-1",
                  children: "✕"
                }
              )
            ] }, index)),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: addEspecificacion,
                className: "text-purple-600 hover:text-purple-800 text-sm font-medium",
                children: "+ Agregar especificación"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-orange-50 p-6 rounded-lg border border-orange-200", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-orange-800 mb-4 flex items-center", children: "Beneficios (Lista en el producto)" }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
            beneficios.map((beneficio, index) => /* @__PURE__ */ jsxs("div", { className: "flex gap-2 items-center", children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  value: beneficio,
                  onChange: (e) => handleBeneficioChange(index, e.target.value),
                  placeholder: "ej: Iluminación con colores vibrantes",
                  className: "flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                }
              ),
              beneficios.length > 1 && /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  onClick: () => removeBeneficio(index),
                  className: "text-red-500 hover:text-red-700 px-2 py-1",
                  children: "✕"
                }
              )
            ] }, index)),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: addBeneficio,
                className: "text-orange-600 hover:text-orange-800 text-sm font-medium",
                children: "+ Agregar beneficio"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-gray-50 p-6 rounded-lg border border-gray-200", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-gray-800 mb-4 flex items-center", children: "Imágenes del Producto (4 imágenes específicas requeridas)" }),
          imagenesExistentes.length > 0 && /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
            /* @__PURE__ */ jsx("h4", { className: "text-md font-medium text-gray-700 mb-3", children: "Imágenes actuales" }),
            /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4", children: imagenesExistentes.map((img) => /* @__PURE__ */ jsxs(
              "div",
              {
                className: "flex flex-col items-center p-4 bg-white rounded-lg shadow-sm border hover:shadow-md transition",
                children: [
                  /* @__PURE__ */ jsx(
                    "img",
                    {
                      src: `${img.url_imagen}`,
                      alt: img.texto_alt_SEO,
                      className: "w-32 h-32 object-cover rounded-lg mb-2"
                    }
                  ),
                  /* @__PURE__ */ jsx("span", { className: "text-center text-gray-700 text-sm mb-2", children: img.texto_alt_SEO }),
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => deleteExistImage(img.id),
                      className: "bg-red-100 text-red-600 text-xs px-3 py-1 rounded-full hover:bg-red-200 transition",
                      children: "Eliminar"
                    }
                  )
                ]
              },
              img.id
            )) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
            /* @__PURE__ */ jsxs("div", { className: "bg-white p-4 rounded-lg border border-blue-200", children: [
              /* @__PURE__ */ jsxs("h4", { className: "text-md font-semibold text-blue-700 mb-3", children: [
                "Imagen para Lista de Productos",
                " ",
                /* @__PURE__ */ jsx("span", { className: "text-red-500", children: "*" })
              ] }),
              /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-600 mb-3", children: [
                'Esta imagen aparece en la página "Nuestros Productos" y es',
                " ",
                /* @__PURE__ */ jsx("strong", { children: "obligatoria" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "file",
                    accept: "image/*",
                    name: "imagen_lista_productos",
                    required: !isEditing,
                    className: "w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100",
                    onChange: handleImageFileChange
                  }
                ),
                /* @__PURE__ */ jsx("small", { className: "text-gray-500 block mt-1", children: "Cada imagen debe pesar menos de 2 MB." }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "text",
                    name: "alt_imagen_lista",
                    value: initialData?.text_alt_principal || "",
                    placeholder: "Texto ALT para SEO",
                    className: "w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "bg-white p-4 rounded-lg border border-green-200", children: [
              /* @__PURE__ */ jsxs("h4", { className: "text-md font-semibold text-green-700 mb-3", children: [
                "🎯 Imagen Hero del Producto",
                " ",
                /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-500", children: "(Banner Principal)" })
              ] }),
              /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-600 mb-3", children: [
                "Imagen de fondo grande en la página individual del producto -",
                " ",
                /* @__PURE__ */ jsx("strong", { children: "Banner superior principal" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "file",
                    accept: "image/*",
                    name: "imagen_hero",
                    className: "w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100",
                    onChange: handleImageFileChange
                  }
                ),
                /* @__PURE__ */ jsx("small", { className: "text-gray-500 block mt-1", children: "Cada imagen debe pesar menos de 2 MB." }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "text",
                    name: "alt_imagen_hero",
                    value: initialData?.imagenes[0]?.texto_alt_SEO || "",
                    placeholder: "Texto ALT para SEO",
                    className: "w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "bg-white p-4 rounded-lg border border-purple-200", children: [
              /* @__PURE__ */ jsxs("h4", { className: "text-md font-semibold text-purple-700 mb-3", children: [
                "📋 Imagen para Especificaciones",
                " ",
                /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-500", children: "(Sección Izquierda)" })
              ] }),
              /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-600 mb-3", children: [
                "Imagen que acompaña la sección de especificaciones -",
                " ",
                /* @__PURE__ */ jsx("strong", { children: "Lado izquierdo de la página" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "file",
                    accept: "image/*",
                    name: "imagen_especificaciones",
                    className: "w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100",
                    onChange: handleImageFileChange
                  }
                ),
                /* @__PURE__ */ jsx("small", { className: "text-gray-500 block mt-1", children: "Cada imagen debe pesar menos de 2 MB." }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "text",
                    name: "alt_imagen_especificaciones",
                    value: initialData?.imagenes[1]?.texto_alt_SEO || "",
                    placeholder: "Texto ALT para SEO",
                    className: "w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "bg-white p-4 rounded-lg border border-orange-200", children: [
              /* @__PURE__ */ jsxs("h4", { className: "text-md font-semibold text-orange-700 mb-3", children: [
                "🎁 Imagen para Beneficios",
                " ",
                /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-500", children: "(Sección Derecha)" })
              ] }),
              /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-600 mb-3", children: [
                "Imagen que acompaña la sección de beneficios -",
                " ",
                /* @__PURE__ */ jsx("strong", { children: "Lado derecho de la página" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "file",
                    accept: "image/*",
                    name: "imagen_beneficios",
                    className: "w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100",
                    onChange: handleImageFileChange
                  }
                ),
                /* @__PURE__ */ jsx("small", { className: "text-gray-500 block mt-1", children: "Cada imagen debe pesar menos de 2 MB." }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "text",
                    name: "alt_imagen_beneficios",
                    value: initialData?.imagenes[2]?.texto_alt_SEO || "",
                    placeholder: "Texto ALT para SEO",
                    className: "w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "bg-white p-4 rounded-lg border border-yellow-200", children: [
              /* @__PURE__ */ jsx("h4", { className: "text-md font-semibold text-yellow-700 mb-3", children: "💬 Imagen para Popups" }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600 mb-3", children: "Imagen que acompaña los popups de registro clientes" }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "file",
                    accept: "image/*",
                    name: "imagen_popups",
                    className: "w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-yellow-50 file:text-yellow-700 hover:file:bg-yellow-100",
                    onChange: handleImageFileChange
                  }
                ),
                /* @__PURE__ */ jsx("small", { className: "text-gray-500 block mt-1", children: "Cada imagen debe pesar menos de 2 MB." }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "text",
                    name: "alt_imagen_popups",
                    value: initialData?.imagenes[3]?.texto_alt_SEO || "",
                    placeholder: "Texto ALT para SEO",
                    className: "w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg", children: /* @__PURE__ */ jsxs("p", { className: "text-sm text-yellow-800", children: [
              /* @__PURE__ */ jsx("strong", { children: "💡 Estructura CORRECTA de imágenes:" }),
              /* @__PURE__ */ jsx("br", {}),
              "📸 ",
              /* @__PURE__ */ jsx("strong", { children: "Lista Productos:" }),
              " Imagen para vista de catálogo (imagen_principal)",
              /* @__PURE__ */ jsx("br", {}),
              "🎯 ",
              /* @__PURE__ */ jsx("strong", { children: "Hero:" }),
              " Banner principal superior (images[0])",
              /* @__PURE__ */ jsx("br", {}),
              "📋 ",
              /* @__PURE__ */ jsx("strong", { children: "Especificaciones:" }),
              " Acompaña características (images[1])",
              /* @__PURE__ */ jsx("br", {}),
              "🎁 ",
              /* @__PURE__ */ jsx("strong", { children: "Beneficios:" }),
              " Acompaña ventajas (images[2])",
              /* @__PURE__ */ jsx("br", {}),
              "💬 ",
              /* @__PURE__ */ jsx("strong", { children: "Popups:" }),
              " Acompaña popups registro (images[3])"
            ] }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex justify-end gap-3 pt-6 border-t border-gray-200", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              className: "px-6 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition",
              children: "Cancelar"
            }
          ),
          /* @__PURE__ */ jsxs(
            "button",
            {
              type: "submit",
              className: "px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition",
              children: [
                isEditing ? "Actualizar" : "Crear",
                " Producto"
              ]
            }
          )
        ] })
      ]
    }
  );
};

function FormularioEmail({ onSubmit }) {
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [listaProductos, setListaProductos] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [seccionesEmail, setSeccionesEmail] = useState([
    {
      imagenPrincipal: null,
      vistaPreviaPrincipal: "",
      imagenSecundaria1: null,
      vistaPreviaSecundaria1: "",
      imagenSecundaria2: null,
      vistaPreviaSecundaria2: "",
      titulo: "",
      subtitulo: ""
    },
    {
      imagenPrincipal: null,
      vistaPreviaPrincipal: "",
      imagenSecundaria1: null,
      vistaPreviaSecundaria1: "",
      imagenSecundaria2: null,
      vistaPreviaSecundaria2: "",
      titulo: "",
      subtitulo: ""
    },
    {
      imagenPrincipal: null,
      vistaPreviaPrincipal: "",
      imagenSecundaria1: null,
      vistaPreviaSecundaria1: "",
      imagenSecundaria2: null,
      vistaPreviaSecundaria2: "",
      titulo: "",
      subtitulo: ""
    }
  ]);
  useEffect(() => {
    const obtenerProductos = async () => {
      setCargando(true);
      try {
        const token = localStorage.getItem("token");
        const respuesta = await fetch(
          getApiUrl(config.endpoints.productos.all),
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
              "Content-Type": "application/json"
            }
          }
        );
        if (!respuesta.ok) throw new Error(`Error HTTP: ${respuesta.status}`);
        const datos = await respuesta.json();
        if (datos.success && Array.isArray(datos.data)) {
          setListaProductos(datos.data);
        } else if (Array.isArray(datos)) {
          setListaProductos(datos);
        } else {
          setListaProductos([]);
        }
      } catch (error) {
        console.error("Error al obtener los productos:", error);
        setListaProductos([]);
        alert("❌ No se pudieron cargar los productos. Intenta nuevamente.");
      } finally {
        setCargando(false);
      }
    };
    obtenerProductos();
  }, []);
  const manejarCambioImagen = (indice, tipo, archivo) => {
    const nuevasSecciones = [...seccionesEmail];
    nuevasSecciones[indice][tipo] = archivo;
    const vistaPrevia = archivo ? URL.createObjectURL(archivo) : "";
    if (tipo === "imagenPrincipal") {
      nuevasSecciones[indice].vistaPreviaPrincipal = vistaPrevia;
    } else if (tipo === "imagenSecundaria1") {
      nuevasSecciones[indice].vistaPreviaSecundaria1 = vistaPrevia;
    } else if (tipo === "imagenSecundaria2") {
      nuevasSecciones[indice].vistaPreviaSecundaria2 = vistaPrevia;
    }
    setSeccionesEmail(nuevasSecciones);
  };
  const manejarCambioTexto = (indice, campo, valor) => {
    const nuevasSecciones = [...seccionesEmail];
    nuevasSecciones[indice][campo] = valor;
    setSeccionesEmail(nuevasSecciones);
  };
  const eliminarImagen = (indice, tipo) => {
    manejarCambioImagen(indice, tipo, null);
  };
  const manejarEnvio = async (e) => {
    e.preventDefault();
    if (productoSeleccionado === null) {
      alert("⚠️ Debes seleccionar un producto antes de continuar.");
      return;
    }
    const formData = new FormData();
    formData.append("producto_id", String(productoSeleccionado));
    seccionesEmail.forEach((item, i) => {
      const seccion = i + 1;
      if (item.imagenPrincipal) {
        formData.append(`email${seccion}_main_image`, item.imagenPrincipal);
      }
      if (item.imagenSecundaria1) {
        formData.append(
          `email${seccion}_secondary_image_1`,
          item.imagenSecundaria1
        );
      }
      if (item.imagenSecundaria2) {
        formData.append(
          `email${seccion}_secondary_image_2`,
          item.imagenSecundaria2
        );
      }
      formData.append(`email${seccion}_title`, item.titulo);
      formData.append(`email${seccion}_subtitle`, item.subtitulo);
    });
    await onSubmit(formData);
  };
  const SeccionCargaImagen = ({
    emailIndex,
    tipoImagen,
    vistaPrevia,
    etiqueta
  }) => /* @__PURE__ */ jsxs("div", { className: "relative", children: [
    /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: etiqueta }),
    vistaPrevia ? /* @__PURE__ */ jsxs("div", { className: "relative group", children: [
      /* @__PURE__ */ jsx(
        "img",
        {
          src: vistaPrevia,
          alt: etiqueta,
          className: "w-full h-32 object-cover rounded-lg border-2 border-gray-300"
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          onClick: () => eliminarImagen(emailIndex, tipoImagen),
          className: "absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity",
          children: /* @__PURE__ */ jsx(FaTimes, { size: 12 })
        }
      )
    ] }) : /* @__PURE__ */ jsxs("label", { className: "flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition", children: [
      /* @__PURE__ */ jsx(FaImage, { className: "text-gray-400 text-3xl mb-2" }),
      /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-500", children: "Subir imagen" }),
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "file",
          accept: "image/*",
          className: "hidden",
          onChange: (e) => {
            const archivo = e.target.files?.[0] || null;
            manejarCambioImagen(emailIndex, tipoImagen, archivo);
          }
        }
      )
    ] })
  ] });
  return /* @__PURE__ */ jsxs(
    "form",
    {
      onSubmit: manejarEnvio,
      className: "space-y-8 max-h-[70vh] overflow-y-auto px-2",
      children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Selecciona un producto" }),
          /* @__PURE__ */ jsxs(
            "select",
            {
              value: productoSeleccionado ?? "",
              onChange: (e) => setProductoSeleccionado(
                e.target.value ? Number(e.target.value) : null
              ),
              className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent",
              children: [
                /* @__PURE__ */ jsx("option", { value: "", children: "-- Elige un producto --" }),
                listaProductos.map((producto) => /* @__PURE__ */ jsx("option", { value: producto.id, children: producto.nombre }, producto.id))
              ]
            }
          ),
          cargando && /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-400 italic mt-1", children: "Cargando productos..." }),
          !cargando && listaProductos.length === 0 && /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 italic mt-2", children: "No hay productos disponibles." })
        ] }),
        seccionesEmail.map((seccion, index) => /* @__PURE__ */ jsxs(
          "div",
          {
            className: "p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl shadow-md border border-blue-200",
            children: [
              /* @__PURE__ */ jsxs("h3", { className: "text-xl font-bold text-blue-900 mb-4 flex items-center gap-2", children: [
                /* @__PURE__ */ jsx("span", { className: "bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm", children: index + 1 }),
                "Sección Email ",
                index + 1
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
                /* @__PURE__ */ jsx(
                  SeccionCargaImagen,
                  {
                    emailIndex: index,
                    tipoImagen: "imagenPrincipal",
                    vistaPrevia: seccion.vistaPreviaPrincipal,
                    etiqueta: "Imagen Principal"
                  }
                ),
                /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
                  /* @__PURE__ */ jsx(
                    SeccionCargaImagen,
                    {
                      emailIndex: index,
                      tipoImagen: "imagenSecundaria1",
                      vistaPrevia: seccion.vistaPreviaSecundaria1,
                      etiqueta: "Imagen Secundaria 1"
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    SeccionCargaImagen,
                    {
                      emailIndex: index,
                      tipoImagen: "imagenSecundaria2",
                      vistaPrevia: seccion.vistaPreviaSecundaria2,
                      etiqueta: "Imagen Secundaria 2"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Título" }),
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "text",
                      value: seccion.titulo,
                      onChange: (e) => manejarCambioTexto(index, "titulo", e.target.value),
                      className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent",
                      placeholder: "Escribe el título"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Subtítulo" }),
                  /* @__PURE__ */ jsx(
                    "textarea",
                    {
                      value: seccion.subtitulo,
                      onChange: (e) => manejarCambioTexto(index, "subtitulo", e.target.value),
                      className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent",
                      placeholder: "Escribe el subtítulo",
                      rows: 3
                    }
                  )
                ] })
              ] })
            ]
          },
          index
        )),
        /* @__PURE__ */ jsx("div", { className: "flex justify-end gap-3 pt-4 border-t", children: /* @__PURE__ */ jsx(
          "button",
          {
            type: "submit",
            className: "bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-lg transition-colors shadow-md",
            children: "Guardar Cambios"
          }
        ) })
      ]
    }
  );
}

function useProducts() {
  const [productos, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
    per_page: 6,
    total: 0
  });
  console.log("PRODUCTOS HOOK:", productos);
  const fetchProducts = async (page = 1, perPage = pagination.per_page) => {
    setLoading(true);
    setError(null);
    try {
      const response = await productoService.getAllProductos(page, perPage);
      console.log("response from getAllProductos:", response.data);
      setProducts(response.data);
      setPagination({
        current_page: response.current_page,
        last_page: response.last_page,
        per_page: response.per_page,
        total: response.total
      });
    } catch (error2) {
      setError(error2 instanceof Error ? error2.message : "Error desconocido al obtener productos");
      console.error("Error en useProducts:", error2);
    } finally {
      setLoading(false);
    }
  };
  const refetch = async (page, perPage) => {
    await fetchProducts(page, perPage);
  };
  useEffect(() => {
    fetchProducts(pagination.current_page, pagination.per_page);
  }, []);
  const createProduct = async (product) => {
    setLoading(true);
    setError(null);
    try {
      const response = await productoService.createProducto(product);
      refetch(pagination.current_page);
      return response.data;
    } catch (error2) {
      setError(error2 instanceof Error ? error2.message : "Error desconocido al crear producto");
      console.error("Error al crear producto:", error2);
      return null;
    } finally {
      setLoading(false);
    }
  };
  const updateProduct = async (id, product) => {
    setLoading(true);
    setError(null);
    try {
      const response = await productoService.updateProducto(id, product);
      if (!response.data) {
        throw new Error("Producto no encontrado");
      }
      setProducts((prev) => prev.map((p) => p.id === id ? response.data : p));
      return response.data;
    } catch (error2) {
      setError(error2 instanceof Error ? error2.message : "Error desconocido al actualizar producto");
      console.error("Error al actualizar producto:", error2);
      return null;
    } finally {
      setLoading(false);
    }
  };
  return { productos, loading, error, pagination, refetch, createProduct, updateProduct };
}

function DataTable() {
  const {
    productos,
    loading,
    pagination,
    refetch
  } = useProducts();
  const [isOpen, setIsOpen] = useState(false);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(
    void 0
  );
  const { darkMode} = useDarkMode();
  console.log("Productos cargados:", productos);
  const eliminarProducto = async (id) => {
    const url = getApiUrl(config.endpoints.productos.delete(id));
    const token = localStorage.getItem("token");
    if (!token) {
      Swal.fire({
        title: "Error de autenticación",
        text: "No se encontró token de acceso. Por favor inicia sesión nuevamente.",
        icon: "error",
        confirmButtonText: "Entendido"
      });
      return;
    }
    const confirmacion = await Swal.fire({
      title: "¿Estás seguro?",
      text: "¡Esta acción no se puede deshacer!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar"
    });
    if (confirmacion.isConfirmed) {
      try {
        const respuesta = await fetch(url, {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
            "X-Requested-With": "XMLHttpRequest"
          }
        });
        const data = await respuesta.json();
        if (respuesta.ok) {
          Swal.fire("¡Eliminado!", data.message, "success");
          refetch(pagination.current_page);
        } else {
          let errorMessage = data.message || "Error desconocido al eliminar";
          if (respuesta.status === 401) {
            errorMessage = "Token expirado o inválido. Por favor inicia sesión nuevamente.";
            localStorage.removeItem("token");
          } else if (respuesta.status === 403) {
            errorMessage = "Acceso denegado. No tienes permisos para eliminar productos.";
          } else if (respuesta.status === 404) {
            errorMessage = "El producto no existe o ya fue eliminado.";
          }
          Swal.fire("Error", errorMessage, "error");
        }
      } catch (error2) {
        Swal.fire("Error", "No se pudo conectar con el servidor.", "error");
      }
    }
  };
  const handlePageChange = (pageNumber) => {
    refetch(pageNumber, pagination.per_page);
  };
  const handleEdit = (producto) => {
    setCurrentProduct(producto);
    setIsOpen(true);
  };
  const handleSubmit = async function(formData) {
    const urlCreate = getApiUrl(config.endpoints.productos.create);
    const token = localStorage.getItem("token");
    if (!token) {
      Swal.fire(
        "Error",
        "No hay token de autenticación. Por favor inicia sesión.",
        "error"
      );
      return;
    }
    try {
      const url = currentProduct ? getApiUrl(config.endpoints.productos.update(currentProduct.id)) : urlCreate;
      const respuesta = await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
          "X-Requested-With": "XMLHttpRequest"
        },
        body: formData
      });
      const result = await respuesta.json();
      if (respuesta.ok) {
        Swal.fire({
          title: `${result.message || "Producto guardado exitosamente"}`,
          icon: "success"
        });
        setIsOpen(false);
        refetch(pagination.current_page);
      } else {
        let errorMessage = result.message || "Error desconocido";
        if (respuesta.status === 401) {
          errorMessage = "Token expirado o inválido. Por favor inicia sesión nuevamente.";
          localStorage.removeItem("token");
        } else if (respuesta.status === 403) {
          errorMessage = "Acceso denegado. Permisos insuficientes.";
        } else if (respuesta.status === 422) {
          errorMessage = "Datos inválidos: " + (result.message || "Verifica los campos del formulario");
        }
        Swal.fire("Error", errorMessage, "error");
      }
    } catch (error2) {
      Swal.fire({
        title: `Hubo un error al insertar el producto`,
        icon: "error"
      });
    }
  };
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-row gap-4 mb-4", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => {
            setCurrentProduct(void 0);
            setIsOpen(true);
          },
          className: "mt-4 bg-blue-950 hover:bg-blue-800 text-white text-lg px-10 py-1.5 rounded-full flex items-center gap-2",
          children: "Añadir Producto"
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => {
            setIsEmailModalOpen(true);
          },
          className: "mt-4 bg-green-700 hover:bg-green-600 text-white text-lg px-10 py-1.5 rounded-full flex items-center gap-2",
          children: "Envio de Emails"
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { className: "overflow-x-auto p-4", children: /* @__PURE__ */ jsxs(TableContainer, { tableType: "productos", children: [
      /* @__PURE__ */ jsx("thead", { className: "hidden md:table-header-group", children: /* @__PURE__ */ jsx("tr", { children: ["ID", "Nombre", "Sección", "Precio", "Acción"].map((header) => /* @__PURE__ */ jsx(
        "th",
        {
          className: `px-4 py-2 text-white uppercase text-xs font-bold rounded-md ${darkMode ? "bg-cyan-900" : "bg-cyan-400"}`,
          children: header
        },
        header
      )) }) }),
      /* @__PURE__ */ jsx("tbody", { children: loading ? /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", { colSpan: 5, className: "text-center py-12", children: /* @__PURE__ */ jsxs("div", { className: "flex justify-center items-center gap-3", children: [
        /* @__PURE__ */ jsx("div", { className: "animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-teal-500" }),
        /* @__PURE__ */ jsx("span", { className: "text-teal-500 font-medium", children: "Cargando productos..." })
      ] }) }) }) : productos.length > 0 ? productos.map((item, index) => {
        const rowBg = index % 2 === 0 && darkMode ? "bg-white text-black" : "text-black bg-white";
        const key = item.id ?? `producto-${index}`;
        return /* @__PURE__ */ jsxs(
          "tr",
          {
            className: `text-center md:table-row block md:mb-0 mb-4 rounded-lg shadow-sm ${rowBg}`,
            children: [
              /* @__PURE__ */ jsx(
                "td",
                {
                  "data-label": "ID",
                  className: `px-4 py-2 font-bold border block md:table-cell ${darkMode ? "bg-gray-300" : "bg-white"}`,
                  children: item.id
                }
              ),
              /* @__PURE__ */ jsx(
                "td",
                {
                  "data-label": "Nombre",
                  className: `px-4 py-2 font-bold border block md:table-cell ${darkMode ? "bg-gray-300" : "bg-white"}`,
                  children: item.nombre
                }
              ),
              /* @__PURE__ */ jsx(
                "td",
                {
                  "data-label": "Sección",
                  className: `px-4 py-2 font-bold border block md:table-cell ${darkMode ? "bg-gray-300" : "bg-white"}`,
                  children: item.seccion
                }
              ),
              /* @__PURE__ */ jsxs(
                "td",
                {
                  "data-label": "Precio",
                  className: `px-4 py-2 font-bold border block md:table-cell ${darkMode ? "bg-gray-300" : "bg-white"}`,
                  children: [
                    "$",
                    item.precio ? item.precio.toFixed(2) : ""
                  ]
                }
              ),
              /* @__PURE__ */ jsx(
                "td",
                {
                  "data-label": "Acción",
                  className: `px-4 py-2 border block md:table-cell ${darkMode ? "bg-gray-300" : "bg-white"}`,
                  children: /* @__PURE__ */ jsxs("div", { className: "flex justify-center gap-4", children: [
                    /* @__PURE__ */ jsx(
                      "button",
                      {
                        onClick: () => handleEdit(item),
                        className: "flex items-center justify-center gap-2 p-2 text-yellow-600 hover:text-yellow-800 transition bg-yellow-100 rounded-lg shadow-sm",
                        title: "Editar",
                        children: /* @__PURE__ */ jsx(FaRegEdit, { size: 18 })
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      "button",
                      {
                        onClick: () => eliminarProducto(item.id),
                        className: "flex items-center justify-center gap-2 p-2 text-red-600 hover:text-red-800 transition bg-red-100 rounded-lg shadow-sm",
                        title: "Eliminar",
                        children: /* @__PURE__ */ jsx(FaTrash, { size: 18 })
                      }
                    )
                  ] })
                }
              )
            ]
          },
          key
        );
      }) : /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", { colSpan: 5, className: "text-center py-16 text-gray-500", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center gap-2", children: [
        /* @__PURE__ */ jsx("div", { className: "bg-teal-50 p-6 rounded-full", children: /* @__PURE__ */ jsx(FaTags, { className: "h-10 w-10 text-teal-300" }) }),
        /* @__PURE__ */ jsx("p", { className: "text-xl font-medium text-gray-600 mt-4", children: "No hay productos registrados" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-400 max-w-md mx-auto", children: "Comienza agregando productos a tu catálogo con el botón 'Añadir Producto'" })
      ] }) }) }) })
    ] }) }),
    pagination.last_page > 1 && /* @__PURE__ */ jsxs("div", { className: "flex justify-center items-center mt-4 gap-2", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => handlePageChange(pagination.current_page - 1),
          disabled: pagination.current_page === 1,
          className: "px-4 py-2 bg-blue-950 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed",
          children: "Anterior"
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "flex gap-1", children: Array.from({ length: pagination.last_page }, (_, i) => {
        const pageNum = i + 1;
        return /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => handlePageChange(pageNum),
            className: `px-3 py-2 rounded-md ${pagination.current_page === pageNum ? "bg-blue-950 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`,
            children: pageNum
          },
          pageNum
        );
      }) }),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => handlePageChange(pagination.current_page + 1),
          disabled: pagination.current_page === pagination.last_page,
          className: "px-4 py-2 bg-blue-950 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed",
          children: "Siguiente"
        }
      )
    ] }),
    /* @__PURE__ */ jsx(
      Modal,
      {
        isOpen,
        onClose: () => {
          setIsOpen(false);
          setCurrentProduct(void 0);
        },
        title: currentProduct ? "Editar Datos" : "Ingresar Datos",
        children: /* @__PURE__ */ jsx(
          ProductForm,
          {
            initialData: currentProduct,
            onSubmit: handleSubmit,
            isEditing: !!currentProduct
          }
        )
      }
    ),
    /* @__PURE__ */ jsx(
      Modal,
      {
        isOpen: isEmailModalOpen,
        onClose: () => setIsEmailModalOpen(false),
        title: "Envio de Emails",
        children: /* @__PURE__ */ jsx(FormularioEmail, { onSubmit: handleSubmit })
      }
    )
  ] });
}

const $$Productos = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "LayoutAdmin", $$LayoutAdmin, { "title": "PRODUCTOS" }, { "default": ($$result2) => renderTemplate`  ${renderComponent($$result2, "AdminDashboard", null, { "client:only": "react", "client:component-hydration": "only", "client:component-path": "/home/runner/work/Yuntas-Frontend/Yuntas-Frontend/src/components/admin/Admin", "client:component-export": "default" })}  ${maybeRenderHead()}<div class="flex-1"> <div class="w-full"> ${renderComponent($$result2, "ProductosTabla", DataTable, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/home/runner/work/Yuntas-Frontend/Yuntas-Frontend/src/components/dashboard/tables/ProductTable.tsx", "client:component-export": "default" })} </div> </div> ` })}`;
}, "/home/runner/work/Yuntas-Frontend/Yuntas-Frontend/src/pages/admin/productos.astro", void 0);

const $$file = "/home/runner/work/Yuntas-Frontend/Yuntas-Frontend/src/pages/admin/productos.astro";
const $$url = "/admin/productos";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Productos,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
