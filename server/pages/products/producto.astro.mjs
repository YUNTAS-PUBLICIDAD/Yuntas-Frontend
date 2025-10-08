import { c as createComponent, b as renderComponent, r as renderTemplate } from '../../chunks/astro/server_hsX-BFeG.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../../chunks/Layout_oc6Si_Zm.mjs';
import { jsx, jsxs } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
import { g as getApiUrl, c as config } from '../../chunks/config_CL3T0jDM.mjs';
import { FaRegSquareCheck } from 'react-icons/fa6';
import { motion } from 'framer-motion';
import { E as Emergente } from '../../chunks/Emergente_BSXN7Y04.mjs';
import { g as getImageTitle, b as buildImageUrl } from '../../chunks/imageHelpers_BvyCxxJ7.mjs';
export { renderers } from '../../renderers.mjs';

function ProductPage() {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const linkParam = urlParams.get("link");
    if (!linkParam) {
      console.error("No se encontró el parámetro link en la URL");
      setLoading(false);
      return;
    }
    console.log("Buscando producto con link:", linkParam);
    console.log("URL de API:", getApiUrl(config.endpoints.productos.link(linkParam)));
    fetch(getApiUrl(config.endpoints.productos.link(linkParam))).then((response) => {
      if (!response.ok) {
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("text/html")) {
          throw new Error("Se recibió HTML en lugar de JSON. Posible error 500.");
        }
        throw new Error(`Error HTTP: ${response.status}`);
      }
      return response.json();
    }).then((data) => {
      console.log("Datos recibidos:", data);
      if (!data.success) {
        console.error("Error en la respuesta:", data.message);
        setProduct(null);
        setLoading(false);
        return;
      }
      const productData = data.data;
      let specsObject = {};
      if (productData.especificaciones && typeof productData.especificaciones === "object" && !Array.isArray(productData.especificaciones)) {
        specsObject = { ...productData.especificaciones };
      } else if (Array.isArray(productData.especificaciones)) {
        productData.especificaciones.forEach((spec, index) => {
          specsObject[`spec_${index + 1}`] = spec;
        });
      }
      if (productData.beneficios && Array.isArray(productData.beneficios)) {
        productData.beneficios.forEach((beneficio, index) => {
          specsObject[`beneficio_${index + 1}`] = beneficio;
        });
      }
      const mappedProduct = {
        success: data.success,
        message: data.message,
        data: {
          ...productData,
          title: productData.titulo || productData.nombre,
          subtitle: productData.nombre,
          description: productData.descripcion,
          image: productData.imagen_principal,
          specs: specsObject,
          benefits: productData.beneficios || [],
          images: productData.imagenes || []
        }
      };
      setProduct(mappedProduct);
      setLoading(false);
    }).catch((error) => {
      console.error("Error al obtener el producto:", error);
      setProduct(null);
      setLoading(false);
    });
  }, []);
  if (loading) {
    return /* @__PURE__ */ jsx("p", { className: "grid min-h-screen place-content-center text-5xl font-extrabold animate-pulse bg-blue-200", children: "Cargando..." });
  }
  if (!product) {
    return /* @__PURE__ */ jsx("div", { className: "grid min-h-screen place-content-center text-center bg-blue-200", children: /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("p", { className: "text-5xl font-extrabold mb-4", children: "Producto no encontrado" }),
      /* @__PURE__ */ jsx("p", { className: "text-xl", children: "El producto solicitado no existe o ha sido eliminado." }),
      /* @__PURE__ */ jsx("a", { href: "/products", className: "inline-block mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700", children: "Volver a productos" })
    ] }) });
  }
  const { title, subtitle, description, images, specs: allSpecs, benefits, image } = product.data;
  return /* @__PURE__ */ jsxs("div", { className: "w-full", children: [
    /* @__PURE__ */ jsx(Emergente, { producto: product }),
    /* @__PURE__ */ jsx(
      "img",
      {
        id: "product-img",
        src: images && images.length > 0 && images[0]?.url_imagen ? buildImageUrl(images[0].url_imagen) : buildImageUrl(image),
        alt: images && images.length > 0 && images[0]?.texto_alt_SEO ? images[0].texto_alt_SEO : "Banner de " + title,
        title: getImageTitle(images[0] || image, "Banner de " + title),
        className: "w-full h-[600px] mx-auto my-auto object-cover"
      }
    ),
    /* @__PURE__ */ jsx("h2", { className: "font-extrabold text-center text-5xl py-16 px-4 text-blue-950", children: title }),
    /* @__PURE__ */ jsx("div", { className: "bg-indigo-950 py-12 lg:py-20", children: /* @__PURE__ */ jsx("div", { className: "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs(
      motion.div,
      {
        className: "grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center",
        initial: { opacity: 0, y: 50 },
        whileInView: { opacity: 1, y: 0 },
        transition: { duration: 0.8 },
        viewport: { once: true, amount: 0.2 },
        children: [
          /* @__PURE__ */ jsx("div", { className: "mx-auto w-2/3 md:w-full aspect-[1/1] overflow-hidden flex items-center justify-center border-2", children: /* @__PURE__ */ jsx(
            "img",
            {
              id: "product-viewer",
              src: images && images.length > 1 && images[1]?.url_imagen ? buildImageUrl(images[1].url_imagen) : buildImageUrl(image),
              alt: images && images.length > 1 && images[1]?.texto_alt_SEO ? images[1].texto_alt_SEO : "Especificaciones de " + title,
              title: getImageTitle(images[1] || image, "Especificaciones de " + title),
              className: "w-full rounded-2xl object-contain"
            }
          ) }),
          /* @__PURE__ */ jsxs("div", { className: "order-1 lg:order-2 text-white", children: [
            /* @__PURE__ */ jsx("h2", { className: "text-3xl sm:text-4xl lg:text-5xl font-bold mb-8 text-center lg:text-left", children: "Especificaciones" }),
            /* @__PURE__ */ jsx("div", { className: "space-y-4", children: Object.entries(allSpecs).filter(([key]) => key.toLowerCase().startsWith("spec")).map(([key, value]) => /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
              /* @__PURE__ */ jsx("div", { className: "flex-shrink-0 mt-1", children: /* @__PURE__ */ jsx(FaRegSquareCheck, { className: "text-cyan-400 text-xl sm:text-2xl" }) }),
              /* @__PURE__ */ jsx("p", { className: "text-lg sm:text-xl lg:text-2xl font-medium leading-relaxed", children: value })
            ] }, key)) })
          ] })
        ]
      }
    ) }) }),
    /* @__PURE__ */ jsx("div", { className: "bg-white py-12 lg:py-20", children: /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl sm:text-4xl lg:text-5xl font-bold text-blue-950 mb-8", children: "Información" }),
      /* @__PURE__ */ jsx("p", { className: "text-lg sm:text-xl lg:text-2xl text-gray-700 leading-relaxed font-medium", children: description })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "bg-indigo-950 py-12 lg:py-20", children: /* @__PURE__ */ jsx("div", { className: "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs(
      motion.div,
      {
        className: "grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center",
        initial: { opacity: 0, y: 50 },
        whileInView: { opacity: 1, y: 0 },
        transition: { duration: 0.8 },
        viewport: { once: true, amount: 0.2 },
        children: [
          /* @__PURE__ */ jsxs("div", { className: "text-white", children: [
            /* @__PURE__ */ jsx("h2", { className: "text-3xl sm:text-4xl lg:text-5xl font-bold mb-8 text-center lg:text-left", children: "Beneficios:" }),
            /* @__PURE__ */ jsx("div", { className: "space-y-4", children: Object.entries(allSpecs).filter(([key]) => key.toLowerCase().startsWith("beneficio")).map(([key, value]) => /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
              /* @__PURE__ */ jsx("div", { className: "flex-shrink-0 mt-1", children: /* @__PURE__ */ jsx(FaRegSquareCheck, { className: "text-cyan-400 text-xl sm:text-2xl" }) }),
              /* @__PURE__ */ jsx("p", { className: "text-lg sm:text-xl lg:text-2xl font-medium leading-relaxed", children: value })
            ] }, key)) })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "flex justify-center lg:justify-end", children: /* @__PURE__ */ jsxs("div", { className: "relative max-w-sm w-full", children: [
            /* @__PURE__ */ jsx("div", { className: "aspect-[3/4] bg-white rounded-3xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-300", children: /* @__PURE__ */ jsx(
              "img",
              {
                src: images && images.length > 2 && images[2]?.url_imagen ? buildImageUrl(images[2].url_imagen) : buildImageUrl(image),
                alt: "Beneficios de " + title,
                title: getImageTitle(images[2] || image, "Beneficios de " + title),
                className: "w-full h-full object-cover"
              }
            ) }),
            /* @__PURE__ */ jsx("div", { className: "absolute -inset-4 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 blur-xl opacity-60 -z-10" })
          ] }) })
        ]
      }
    ) }) }),
    /* @__PURE__ */ jsx("div", { className: "bg-indigo-950 py-16 lg:py-20", children: /* @__PURE__ */ jsx("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center", children: /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        transition: { duration: 0.6 },
        viewport: { once: true, amount: 0.3 },
        children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-8", children: "¿Encontraste lo que buscabas?" }),
          /* @__PURE__ */ jsxs(
            "a",
            {
              href: "/contact",
              className: "inline-block bg-gradient-to-r from-cyan-400 to-cyan-600 hover:from-cyan-500 hover:to-cyan-700 text-white font-bold text-xl sm:text-2xl lg:text-3xl px-12 sm:px-16 lg:px-20 py-4 sm:py-5 lg:py-6 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/50 relative overflow-hidden group",
              children: [
                /* @__PURE__ */ jsx("span", { className: "relative z-10", children: "Cotizar" }),
                /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" })
              ]
            }
          )
        ]
      }
    ) }) })
  ] });
}

const $$Producto = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Yuntas Producciones - Detalle de producto" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "ProductPage", ProductPage, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/home/runner/work/Yuntas-Frontend/Yuntas-Frontend/src/components/products/ProductPage.jsx", "client:component-export": "default" })} ` })}`;
}, "/home/runner/work/Yuntas-Frontend/Yuntas-Frontend/src/pages/products/producto.astro", void 0);

const $$file = "/home/runner/work/Yuntas-Frontend/Yuntas-Frontend/src/pages/products/producto.astro";
const $$url = "/products/producto";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Producto,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
