import { jsx, jsxs } from 'react/jsx-runtime';
import { useRef, useState, useMemo, useEffect } from 'react';
import { g as getApiUrl, c as config } from './config_CL3T0jDM.mjs';
import { z } from 'zod';
import { y as yuleLove } from './Layout_oc6Si_Zm.mjs';

const textosPromocionales = [
  { titulo: "Convierte la pista en el alma de la fiesta" }
];
const textosBoton = [
  "Cotiza aquí"
];
const schema = z.object({
  nombre: z.string().min(1, "El nombre es obligatorio").max(100, "El nombre no puede exceder 100 caracteres").regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/, "El nombre solo puede contener letras y espacios"),
  email: z.string().min(1, "El email es obligatorio").email("Formato de correo inválido").max(100, "El email no puede exceder 100 caracteres"),
  telefono: z.string().regex(/^[0-9]{9}$/, "El celular debe tener exactamente 9 dígitos")
});
const SHOW_DELAY_MS = 16e3;
const Emergente = ({ producto }) => {
  const modalRef = useRef(null);
  const [show, setShow] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const productoId = producto?.id;
  const productoTitulo = producto?.title || producto?.nombre;
  const imageBaseUrl = "https://apiyuntas.yuntaspublicidad.com";
  const buildImageUrl = (url) => {
    if (!url) return null;
    return url.startsWith("http") ? url : `${imageBaseUrl}${url.startsWith("/") ? "" : "/"}${url}`;
  };
  const getPopupImage = () => {
    const images = producto?.imagenes || [];
    if (images.length > 3) {
      const url = images[3]?.url_imagen || images[3]?.ruta_imagen || images[3]?.imagen_principal;
      if (url) return buildImageUrl(url);
    }
    return buildImageUrl(producto?.imagen_principal) || yuleLove;
  };
  const imagenPopup = getPopupImage();
  const textoData = useMemo(() => {
    const idx = Math.floor(Math.random() * textosPromocionales.length);
    return textosPromocionales[idx];
  }, []);
  const textoBoton = useMemo(() => {
    const idx = Math.floor(Math.random() * textosBoton.length);
    return textosBoton[idx];
  }, []);
  const [formData, setFormData] = useState({
    nombre: "",
    telefono: "",
    email: "",
    producto_id: productoId || ""
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  useEffect(() => {
    const timer = setTimeout(() => setShow(true), SHOW_DELAY_MS);
    return () => clearTimeout(timer);
  }, []);
  useEffect(() => {
    setFormData((prev) => ({ ...prev, producto_id: productoId || "" }));
  }, [productoId]);
  const closeModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setShow(false);
      setIsClosing(false);
      setFormData({
        nombre: "",
        telefono: "",
        email: "",
        producto_id: productoId || ""
      });
      setErrors({});
      setSuccessMessage("");
    }, 300);
  };
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        closeModal();
      }
    };
    const handleEsc = (e) => {
      if (e.key === "Escape") closeModal();
    };
    if (show) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEsc);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, [show]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setSuccessMessage("");
    const result = schema.safeParse(formData);
    if (!result.success) {
      const fieldErrors = {};
      result.error.errors.forEach((err) => {
        fieldErrors[err.path[0]] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setIsSubmitting(true);
    try {
      const payload = new FormData();
      payload.append("name", result.data.nombre);
      payload.append("email", result.data.email);
      payload.append("celular", result.data.telefono);
      payload.append("producto_id", formData.producto_id);
      const response = await fetch(
        getApiUrl(config.endpoints.productos.info),
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "X-Requested-With": "XMLHttpRequest"
          },
          body: payload
        }
      );
      let responseData = {};
      try {
        const text = await response.text();
        if (text) responseData = JSON.parse(text);
      } catch (err) {
        console.error("[Emergente] Error parsing response:", err);
      }
      if (!response.ok) {
        if (response.status === 422 && responseData.errors) {
          const validationErrors = {};
          if (responseData.errors.name) {
            validationErrors.nombre = Array.isArray(responseData.errors.name) ? responseData.errors.name[0] : responseData.errors.name;
          }
          if (responseData.errors.email) {
            validationErrors.email = Array.isArray(responseData.errors.email) ? responseData.errors.email[0] : responseData.errors.email;
          }
          if (responseData.errors.celular) {
            validationErrors.telefono = Array.isArray(
              responseData.errors.celular
            ) ? responseData.errors.celular[0] : responseData.errors.celular;
          }
          setErrors(validationErrors);
          return;
        }
        throw new Error(
          responseData.message || `Error ${response.status}: ${response.statusText}`
        );
      }
      setSuccessMessage("Información enviada con éxito");
      setFormData({
        nombre: "",
        telefono: "",
        email: "",
        producto_id: productoId || ""
      });
      setTimeout(() => {
        closeModal();
        setSuccessMessage("");
      }, 2e3);
    } catch (err) {
      console.error("[Emergente] Error:", err);
      if (err.name === "TypeError" && (err.message.includes("fetch") || err.message.includes("CORS"))) {
        setErrors({
          general: "Error de conexión con el servidor. Por favor intenta nuevamente."
        });
      } else if (err.message && err.message.includes("configuración del servidor")) {
        setErrors({
          general: "Error de configuración del servidor. Contacta al administrador."
        });
      } else {
        setErrors({
          general: err.message || "Error desconocido al enviar la información."
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  if (!show) return null;
  return /* @__PURE__ */ jsx("div", { className: "fixed inset-0 bg-black/30 z-50 flex items-center justify-center px-4", children: /* @__PURE__ */ jsxs(
    "div",
    {
      ref: modalRef,
      className: `flex flex-col sm:flex-row sm:gap-[1px] rounded-3xl shadow-xl w-[90vw] sm:w-full max-w-2xl max-h-[90vh] overflow-hidden bg-white relative ${isClosing ? "animate-slideOut" : "animate-slideIn"}`,
      style: { border: "3px solid #e5e7eb" },
      children: [
        /* @__PURE__ */ jsxs("div", { className: "w-full sm:w-[60%] relative", children: [
          /* @__PURE__ */ jsx("div", { className: "w-full h-[250px] sm:h-full relative sm:pt-2 sm:pb-2 sm:pl-2 sm:pr-[1px]", children: /* @__PURE__ */ jsxs("div", { className: "w-full h-full clip-vase overflow-hidden rounded-2xl relative", children: [
            /* @__PURE__ */ jsx(
              "img",
              {
                src: imagenPopup,
                alt: `Popup de ${productoTitulo || "producto"}`,
                title: `Popup de ${productoTitulo || "producto"}`,
                className: "w-full h-full object-cover object-center",
                onError: (e) => {
                  try {
                    e.target.src = yuleLove;
                  } catch {
                  }
                }
              }
            ),
            /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-black/10 sm:bg-transparent" })
          ] }) }),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: closeModal,
              "aria-label": "Cerrar modal",
              className: "absolute top-3 right-3 bg-white/90 hover:bg-white text-gray-600 rounded-full w-8 h-8 flex items-center justify-center transition-colors cursor-pointer text-sm z-10 shadow-sm sm:hidden",
              children: "✕"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "w-full sm:w-[40%] pr-2 pt-6 pb-6 pl-0 relative flex flex-col justify-center", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: closeModal,
              "aria-label": "Cerrar modal",
              className: "hidden sm:flex absolute top-3 right-3 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-full w-8 h-8 items-center justify-center transition-colors cursor-pointer text-sm z-10",
              children: "✕"
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "w-full text-center max-w-[240px] mx-auto", children: [
            /* @__PURE__ */ jsx("div", { className: "mb-4 sm:mb-6", children: /* @__PURE__ */ jsx(
              "h2",
              {
                className: "text-2xl sm:text-3xl font-extrabold font-montserrat leading-tight text-center pt-2 pb-6",
                style: { color: "#0E3F88" },
                children: textoData.titulo
              }
            ) }),
            /* @__PURE__ */ jsxs("form", { className: "space-y-3", onSubmit: handleSubmit, children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  value: formData.nombre,
                  onChange: (e) => setFormData({ ...formData, nombre: e.target.value }),
                  className: `w-full px-4 py-3 rounded-xl bg-[#EBEBEB] border-0 text-base font-montserrat focus:ring-2 ${errors.nombre ? "ring-2 ring-red-400" : "focus:ring-blue-500/20"}`,
                  placeholder: "Nombre"
                }
              ),
              errors.nombre && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-sm", children: errors.nombre }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "tel",
                  value: formData.telefono,
                  onChange: (e) => setFormData({ ...formData, telefono: e.target.value }),
                  className: `w-full px-4 py-3 rounded-xl bg-[#EBEBEB] border-0 text-base font-montserrat focus:ring-2 ${errors.telefono ? "ring-2 ring-red-400" : "focus:ring-blue-500/20"}`,
                  placeholder: "Teléfono",
                  maxLength: 9
                }
              ),
              errors.telefono && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-sm", children: errors.telefono }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "email",
                  value: formData.email,
                  onChange: (e) => setFormData({ ...formData, email: e.target.value }),
                  className: `w-full px-4 py-3 rounded-xl bg-[#EBEBEB] border-0 text-base font-montserrat focus:ring-2 ${errors.email ? "ring-2 ring-red-400" : "focus:ring-blue-500/20"}`,
                  placeholder: "Correo"
                }
              ),
              errors.email && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-sm", children: errors.email }),
              errors.general && /* @__PURE__ */ jsx("div", { className: "bg-red-50 border border-red-200 rounded-xl p-3 text-red-600", children: errors.general }),
              successMessage && /* @__PURE__ */ jsx("div", { className: "bg-green-50 border border-green-200 rounded-xl p-3 text-green-600", children: successMessage }),
              /* @__PURE__ */ jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsx(
                "button",
                {
                  type: "submit",
                  disabled: isSubmitting,
                  className: "bg-[#172649] hover:bg-[#0f1a33] text-white font-montserrat font-semibold text-2xl pt-[3px] pr-[20px] pb-[9px] pl-[20px] rounded-xl transition-all disabled:opacity-50 mt-2 sm:mt-3",
                  children: isSubmitting ? "Enviando..." : textoBoton
                }
              ) })
            ] })
          ] })
        ] })
      ]
    }
  ) });
};

export { Emergente as E };
