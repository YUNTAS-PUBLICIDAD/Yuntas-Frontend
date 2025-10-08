import { c as createComponent, d as createAstro, m as maybeRenderHead, s as spreadAttributes, r as renderTemplate, b as renderComponent, a as addAttribute, g as renderHead, f as renderSlot } from './astro/server_hsX-BFeG.mjs';
import 'kleur/colors';
/* empty css                         */
import { a as $$Navbar, $ as $$Footer } from './Footer_DLPwzSAN.mjs';
import { jsx, jsxs } from 'react/jsx-runtime';
import { useState, useRef, useEffect } from 'react';
import { g as getApiUrl, c as config } from './config_CL3T0jDM.mjs';
import { z } from 'zod';
import 'clsx';

const yuleLove = new Proxy({"src":"/_astro/yuleLove.CH0xEpdJ.jpg","width":2166,"height":3264,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/home/runner/work/Yuntas-Frontend/Yuntas-Frontend/src/assets/images/emergente/yuleLove.jpg";
							}
							
							return target[name];
						}
					});

const MODAL_STORAGE_KEY = "asesoriaModalLastClosed";
const MODAL_COOLDOWN_MS = 1 * 10 * 1e3;
const schema = z.object({
  nombre: z.string().min(1, "El nombre es obligatorio").max(100, "El nombre no puede exceder 100 caracteres").regex(
    /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/,
    "El nombre solo puede contener letras y espacios"
  ),
  email: z.string().min(1, "El email es obligatorio").email("El formato del correo electrónico es inválido").max(100, "El email no puede exceder 100 caracteres"),
  telefono: z.string().regex(/^[0-9]{9}$/, "El celular debe tener exactamente 9 dígitos").regex(/^[0-9]{9}$/, "El celular solo puede contener números")
});
const ScrollModal = () => {
  const [showModal, setShowModal] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: ""
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const lastScrollRef = useRef(0);
  const hasReachedBottomRef = useRef(false);
  const hasShownRef = useRef(false);
  const modalRef = useRef(null);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: ""
      }));
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setSuccessMessage("");
    const result = schema.safeParse(formData);
    if (!result.success) {
      const fieldErrors = {};
      result.error.errors.forEach((err) => {
        const fieldName = err.path[0];
        fieldErrors[fieldName] = err.message;
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
      const response = await fetch(
        getApiUrl(config.endpoints.clientes.create),
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "X-Requested-With": "XMLHttpRequest"
          },
          body: payload
        }
      );
      if (response.type === "opaque" || response.url !== getApiUrl(config.endpoints.clientes.create)) {
        throw new Error(
          "Error de configuración del servidor. Por favor contacta al administrador."
        );
      }
      let responseData;
      try {
        const responseText = await response.text();
        if (!responseText) {
          throw new Error("Respuesta vacía del servidor");
        }
        responseData = JSON.parse(responseText);
      } catch (parseError) {
        console.error("[ScrollModal] Error parsing response:", parseError);
        console.error("[ScrollModal] Response status:", response.status);
        console.error("[ScrollModal] Response headers:", response.headers);
        throw new Error("Error al procesar la respuesta del servidor");
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
      setSuccessMessage("✅ Información enviada con éxito");
      setFormData({ nombre: "", email: "", telefono: "" });
      setTimeout(() => {
        closeModal();
        setSuccessMessage("");
      }, 2e3);
    } catch (err) {
      console.error("[ScrollModal] Error:", err);
      if (err.name === "TypeError" && (err.message.includes("fetch") || err.message.includes("CORS"))) {
        setErrors({
          general: "Error de conexión con el servidor. Por favor intenta nuevamente."
        });
      } else if (err.message.includes("configuración del servidor")) {
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
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    };
    if (showModal) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showModal]);
  useEffect(() => {
    const handleOpenEvent = () => {
      setShowModal(true);
      hasShownRef.current = true;
    };
    window.addEventListener("open-scroll-modal", handleOpenEvent);
    return () => window.removeEventListener("open-scroll-modal", handleOpenEvent);
  }, []);
  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      const scrollDirection = currentScroll < lastScrollRef.current ? "up" : "down";
      lastScrollRef.current = currentScroll;
      const atBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight;
      if (atBottom) hasReachedBottomRef.current = true;
      if (hasReachedBottomRef.current && scrollDirection === "up" && !hasShownRef.current) {
        const lastClosed = parseInt(
          localStorage.getItem(MODAL_STORAGE_KEY) || "0",
          10
        );
        const now = Date.now();
        if (now - lastClosed < MODAL_COOLDOWN_MS) {
          return;
        }
        setShowModal(true);
        hasShownRef.current = true;
        hasReachedBottomRef.current = false;
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const closeModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setShowModal(false);
      setIsClosing(false);
      localStorage.setItem(MODAL_STORAGE_KEY, Date.now().toString());
      hasShownRef.current = false;
      setFormData({ nombre: "", email: "", telefono: "" });
      setErrors({});
      setSuccessMessage("");
    }, 300);
  };
  if (!showModal) return null;
  return /* @__PURE__ */ jsx("div", { className: "fixed inset-0 bg-black/30 z-50 flex items-center justify-center px-4 modal-overlay", children: /* @__PURE__ */ jsxs(
    "div",
    {
      ref: modalRef,
      className: `flex flex-col sm:flex-row rounded-3xl shadow-xl w-[90vw] sm:w-full max-w-2xl max-h-[90vh] overflow-hidden bg-white relative ${isClosing ? "animate-slideOut" : "animate-slideIn"}`,
      style: {
        border: "3px solid #e5e7eb"
      },
      children: [
        /* @__PURE__ */ jsxs("div", { className: "w-full sm:w-1/2 relative", children: [
          /* @__PURE__ */ jsx("div", { className: "w-full h-[250px] sm:h-auto sm:min-h-[400px] relative overflow-hidden sm:p-4", children: /* @__PURE__ */ jsxs("div", { className: "w-full h-full relative clip-vase overflow-hidden flex items-center justify-center", children: [
            /* @__PURE__ */ jsx(
              "img",
              {
                src: yuleLove.src,
                alt: "Asesoría",
                className: "w-full h-full object-cover object-center"
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
        /* @__PURE__ */ jsxs("div", { className: "w-full sm:w-1/2 p-6 relative flex flex-col justify-center", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: closeModal,
              "aria-label": "Cerrar modal",
              className: "hidden sm:flex absolute top-3 right-3 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-full w-8 h-8 items-center justify-center transition-colors cursor-pointer text-sm z-10",
              children: "✕"
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "mb-6 sm:mb-8", children: /* @__PURE__ */ jsxs(
            "h2",
            {
              className: "text-xl sm:text-2xl md:text-3xl font-bold leading-tight font-montserrat text-center sm:text-left",
              style: { color: "#0E3F88" },
              children: [
                "¡Un detalle que",
                /* @__PURE__ */ jsx("br", {}),
                "cambia todo!"
              ]
            }
          ) }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  name: "nombre",
                  type: "text",
                  value: formData.nombre,
                  onChange: handleChange,
                  className: `w-[95%] px-4 py-3 rounded-xl bg-gray-100 text-gray-800 placeholder-gray-500 border-0 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-gray-50 ${errors.nombre ? "ring-2 ring-red-400" : ""}`,
                  placeholder: "Nombre"
                }
              ),
              errors.nombre && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-sm mt-1 ml-1", children: errors.nombre })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "tel",
                  name: "telefono",
                  value: formData.telefono,
                  onChange: handleChange,
                  className: `w-[95%] px-4 py-3 rounded-xl bg-gray-100 text-gray-800 placeholder-gray-500 border-0 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-gray-50 ${errors.telefono ? "ring-2 ring-red-400" : ""}`,
                  placeholder: "Teléfono",
                  maxLength: 9
                }
              ),
              errors.telefono && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-sm mt-1 ml-1", children: errors.telefono })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "email",
                  name: "email",
                  value: formData.email,
                  onChange: handleChange,
                  className: `w-[95%] px-4 py-3 rounded-xl bg-gray-100 text-gray-800 placeholder-gray-500 border-0 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-gray-50 ${errors.email ? "ring-2 ring-red-400" : ""}`,
                  placeholder: "Correo"
                }
              ),
              errors.email && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-sm mt-1 ml-1", children: errors.email })
            ] }),
            errors.general && /* @__PURE__ */ jsx("div", { className: "bg-red-50 border border-red-200 rounded-xl p-3", children: /* @__PURE__ */ jsx("p", { className: "text-red-600 text-sm", children: errors.general }) }),
            successMessage && /* @__PURE__ */ jsx("div", { className: "bg-green-50 border border-green-200 rounded-xl p-3", children: /* @__PURE__ */ jsx("p", { className: "text-green-600 text-sm", children: successMessage }) }),
            /* @__PURE__ */ jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsx(
              "button",
              {
                onClick: handleSubmit,
                disabled: isSubmitting,
                className: "w-full max-w-[220px] bg-[#0E3F88] hover:bg-[#0b3674] text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed mt-4 sm:mt-6 font-montserrat",
                children: isSubmitting ? /* @__PURE__ */ jsxs("span", { className: "flex items-center justify-center", children: [
                  /* @__PURE__ */ jsxs(
                    "svg",
                    {
                      className: "animate-spin -ml-1 mr-2 h-4 w-4 text-white",
                      xmlns: "http://www.w3.org/2000/svg",
                      fill: "none",
                      viewBox: "0 0 24 24",
                      children: [
                        /* @__PURE__ */ jsx(
                          "circle",
                          {
                            className: "opacity-25",
                            cx: "12",
                            cy: "12",
                            r: "10",
                            stroke: "currentColor",
                            strokeWidth: "4"
                          }
                        ),
                        /* @__PURE__ */ jsx(
                          "path",
                          {
                            className: "opacity-75",
                            fill: "currentColor",
                            d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          }
                        )
                      ]
                    }
                  ),
                  "Enviando..."
                ] }) : "Empieza a brillar"
              }
            ) })
          ] })
        ] })
      ]
    }
  ) });
};

const $$Astro$1 = createAstro();
const $$WhatsAppIcon = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$WhatsAppIcon;
  return renderTemplate`${maybeRenderHead()}<svg${spreadAttributes(Astro2.props)} viewBox="0 0 256 259" width="256" height="259" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid"><path d="m67.663 221.823 4.185 2.093c17.44 10.463 36.971 15.346 56.503 15.346 61.385 0 111.609-50.224 111.609-111.609 0-29.297-11.859-57.897-32.785-78.824-20.927-20.927-48.83-32.785-78.824-32.785-61.385 0-111.61 50.224-110.912 112.307 0 20.926 6.278 41.156 16.741 58.594l2.79 4.186-11.16 41.156 41.853-10.464Z" fill="#00E676"></path><path d="M219.033 37.668C195.316 13.254 162.531 0 129.048 0 57.898 0 .698 57.897 1.395 128.35c0 22.322 6.278 43.947 16.742 63.478L0 258.096l67.663-17.439c18.834 10.464 39.76 15.347 60.688 15.347 70.453 0 127.653-57.898 127.653-128.35 0-34.181-13.254-66.269-36.97-89.986ZM129.048 234.38c-18.834 0-37.668-4.882-53.712-14.648l-4.185-2.093-40.458 10.463 10.463-39.76-2.79-4.186C7.673 134.63 22.322 69.058 72.546 38.365c50.224-30.692 115.097-16.043 145.79 34.181 30.692 50.224 16.043 115.097-34.18 145.79-16.045 10.463-35.576 16.043-55.108 16.043Zm61.385-77.428-7.673-3.488s-11.16-4.883-18.136-8.371c-.698 0-1.395-.698-2.093-.698-2.093 0-3.488.698-4.883 1.396 0 0-.697.697-10.463 11.858-.698 1.395-2.093 2.093-3.488 2.093h-.698c-.697 0-2.092-.698-2.79-1.395l-3.488-1.395c-7.673-3.488-14.648-7.674-20.229-13.254-1.395-1.395-3.488-2.79-4.883-4.185-4.883-4.883-9.766-10.464-13.253-16.742l-.698-1.395c-.697-.698-.697-1.395-1.395-2.79 0-1.395 0-2.79.698-3.488 0 0 2.79-3.488 4.882-5.58 1.396-1.396 2.093-3.488 3.488-4.883 1.395-2.093 2.093-4.883 1.395-6.976-.697-3.488-9.068-22.322-11.16-26.507-1.396-2.093-2.79-2.79-4.883-3.488H83.01c-1.396 0-2.79.698-4.186.698l-.698.697c-1.395.698-2.79 2.093-4.185 2.79-1.395 1.396-2.093 2.79-3.488 4.186-4.883 6.278-7.673 13.951-7.673 21.624 0 5.58 1.395 11.161 3.488 16.044l.698 2.093c6.278 13.253 14.648 25.112 25.81 35.575l2.79 2.79c2.092 2.093 4.185 3.488 5.58 5.58 14.649 12.557 31.39 21.625 50.224 26.508 2.093.697 4.883.697 6.976 1.395h6.975c3.488 0 7.673-1.395 10.464-2.79 2.092-1.395 3.487-1.395 4.882-2.79l1.396-1.396c1.395-1.395 2.79-2.092 4.185-3.487 1.395-1.395 2.79-2.79 3.488-4.186 1.395-2.79 2.092-6.278 2.79-9.765v-4.883s-.698-.698-2.093-1.395Z" fill="#FFF"></path></svg>`;
}, "/home/runner/work/Yuntas-Frontend/Yuntas-Frontend/src/assets/icons/WhatsAppIcon.astro", void 0);

const $$Whatsapp = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<a href="https://wa.me/912849782" class="fixed size-15 bottom-10 right-10 z-100 transition duration-200 ease-in-out transform hover:scale-120" target="_blank" rel="noopener noreferrer" aria-label="Contactar por WhatsApp al 912 849 782"> ${renderComponent($$result, "WhatsAppIcon", $$WhatsAppIcon, { "class": "size-full" })} </a>`;
}, "/home/runner/work/Yuntas-Frontend/Yuntas-Frontend/src/components/ui/whatsapp.astro", void 0);

const $$Astro = createAstro();
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Layout;
  const {
    title,
    description = "Descubre letreros LED, paneles acr\xEDlicos, hologramas 3D y m\xE1s. Soluciones innovadoras y personalizadas para tu negocio en Lima. \xA1Cotiza gratis!",
    keywords,
    canonicalUrl
  } = Astro2.props;
  return renderTemplate`<html lang="es" class="scroll-smooth"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>${title}</title><meta name="description"${addAttribute(description, "content")}><meta name="author" content="Yuntas"><meta name="publisher" content="Technology 3"><link rel="canonical"${addAttribute(canonicalUrl, "href")}>${keywords && renderTemplate`<meta name="keywords"${addAttribute(keywords, "content")}>`}${description && renderTemplate`<meta name="description"${addAttribute(description, "content")}>`}<meta name="robots" content="index, follow"><!--  fuente de Google Fonts Optimizada --><!-- Proximamente --><!-- <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />

    <link
      href="https://fonts.googleapis.com/css2?family=Roboto:wght@700&display=swap"
      rel="stylesheet"
    />
    <link
      rel="preload"
      href="https://fonts.gstatic.com/s/roboto/v30/KFOlCnqEu92Fr1MmWUlfBBc4.woff2"
      as="font"
      type="font/woff2"
      crossorigin
    />
    <link
      href="https://fonts.googleapis.com/css2?family=Roboto:wght@700&display=swap"
      rel="stylesheet"
      media="print"
      onload="this.media='all'"
    />
    <noscript>
      <link
        href="https://fonts.googleapis.com/css2?family=Roboto:wght@700&display=swap"
        rel="stylesheet"
      />
    </noscript> --><meta name="google-site-verification" content="XmepIr9EXYbyFVG03v5DDp8vneZIOH0Z3OLHOBGX6e0"><!-- ClientRouter removido - causa conflictos con SSR -->${renderHead()}</head> <body> ${renderComponent($$result, "Navbar", $$Navbar, { "variant": "default" })} ${renderSlot($$result, $$slots["default"])} ${renderComponent($$result, "Footer", $$Footer, {})} ${Astro2.url.pathname === "/" && renderTemplate`${renderComponent($$result, "ScrollModal", ScrollModal, { "client:idle": true, "client:component-hydration": "idle", "client:component-path": "/home/runner/work/Yuntas-Frontend/Yuntas-Frontend/src/components/ScrollModal", "client:component-export": "default" })}`} ${renderComponent($$result, "WhatsApp", $$Whatsapp, {})} </body></html>`;
}, "/home/runner/work/Yuntas-Frontend/Yuntas-Frontend/src/layouts/Layout.astro", void 0);

export { $$Layout as $, yuleLove as y };
