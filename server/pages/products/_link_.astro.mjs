import { c as createComponent, d as createAstro, b as renderComponent, r as renderTemplate } from '../../chunks/astro/server_hsX-BFeG.mjs';
import 'kleur/colors';
import { jsx, jsxs } from 'react/jsx-runtime';
import { useEffect } from 'react';
import { g as getImageTitle, b as buildImageUrl } from '../../chunks/imageHelpers_BvyCxxJ7.mjs';
import { motion } from 'framer-motion';
import { E as Emergente } from '../../chunks/Emergente_BSXN7Y04.mjs';
import { FaRegSquareCheck } from 'react-icons/fa6';
import { i as insertJsonLd } from '../../chunks/schema-markup-generator_k_zjfotv.mjs';
import { $ as $$Layout } from '../../chunks/Layout_oc6Si_Zm.mjs';
import { p as productoService } from '../../chunks/productoService_BNz5f_MX.mjs';
export { renderers } from '../../renderers.mjs';

const ProductoPage = ({ data }) => {
  if (!data)
    return /* @__PURE__ */ jsx("p", { className: "grid min-h-screen place-content-center text-5xl font-extrabold animate-pulse bg-blue-200", children: "Cargando..." });
  useEffect(() => {
    insertJsonLd("product", { data });
  }, [data]);
  if (!data)
    return /* @__PURE__ */ jsx("p", { className: "grid min-h-screen place-content-center text-5xl font-extrabold animate-pulse bg-blue-200", children: "Cargando..." });
  return /* @__PURE__ */ jsxs("div", { className: "w-full", children: [
    /* @__PURE__ */ jsx(Emergente, { producto: data }),
    /* @__PURE__ */ jsx(
      "img",
      {
        id: "product-img",
        src: data.imagenes && data.imagenes.length > 0 && data.imagenes[0]?.url_imagen ? buildImageUrl(data.imagenes[0].url_imagen) ?? void 0 : buildImageUrl(data.imagen_principal) ?? void 0,
        alt: data.imagenes && data.imagenes.length > 0 && data.imagenes[0]?.texto_alt_SEO ? data.imagenes[0].texto_alt_SEO : "Banner de " + data.titulo,
        title: getImageTitle(
          data.imagenes[0] || data.imagen_principal,
          "Banner de " + data.titulo
        ),
        className: "w-full h-[600px] mx-auto my-auto object-cover"
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "bg-white", children: /* @__PURE__ */ jsx("h2", { className: "font-extrabold text-center text-5xl py-16 px-4 text-blue-950", children: data.titulo }) }),
    /* @__PURE__ */ jsx("div", { className: "bg-indigo-950 py-12 lg:py-20", children: /* @__PURE__ */ jsx("div", { className: "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs(
      motion.div,
      {
        className: "grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center",
        initial: { opacity: 0, y: 50 },
        whileInView: { opacity: 1, y: 0 },
        transition: { duration: 0.8 },
        viewport: { once: true, amount: 0.2 },
        children: [
          /* @__PURE__ */ jsx("div", { className: "mx-auto w-full max-w-md lg:max-w-full aspect-[1/1] overflow-hidden flex items-center justify-center", children: /* @__PURE__ */ jsx(
            "img",
            {
              id: "product-viewer",
              src: data.imagenes && data.imagenes.length > 1 && data.imagenes[1]?.url_imagen ? buildImageUrl(data.imagenes[1].url_imagen) ?? void 0 : buildImageUrl(data.imagen_principal) ?? void 0,
              alt: data.imagenes && data.imagenes.length > 1 && data.imagenes[1]?.texto_alt_SEO ? data.imagenes[1].texto_alt_SEO : "Especificaciones de " + data.titulo,
              title: getImageTitle(
                data.imagenes[1] || data.imagen_principal,
                "Especificaciones de " + data.titulo
              ),
              className: "w-full rounded-2xl object-contain"
            }
          ) }),
          /* @__PURE__ */ jsxs("div", { className: "order-1 lg:order-2 text-white text-center lg:text-left flex flex-col justify-center items-center lg:items-start px-4 sm:px-0", children: [
            /* @__PURE__ */ jsx("h2", { className: "text-3xl sm:text-4xl lg:text-5xl font-bold mb-8 text-center lg:text-left", children: "Especificaciones" }),
            /* @__PURE__ */ jsx("div", { className: "space-y-4", children: Object.entries(data.especificaciones).filter(([key]) => key.startsWith("spec")).map(([key, value]) => /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
              /* @__PURE__ */ jsx("div", { className: "flex-shrink-0 mt-1", children: /* @__PURE__ */ jsx(FaRegSquareCheck, { className: "text-cyan-400 text-xl sm:text-2xl" }) }),
              /* @__PURE__ */ jsx("p", { className: "text-lg sm:text-xl lg:text-2xl font-medium leading-relaxed", children: String(value) })
            ] }, key)) })
          ] })
        ]
      }
    ) }) }),
    /* @__PURE__ */ jsx("div", { className: "bg-white py-12 lg:py-20", children: /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl sm:text-4xl lg:text-5xl font-bold text-blue-950 mb-8", children: "Información" }),
      /* @__PURE__ */ jsx("p", { className: "text-lg sm:text-xl lg:text-2xl text-gray-700 leading-relaxed font-medium", children: data.descripcion })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "bg-indigo-950 py-12 lg:py-20", children: /* @__PURE__ */ jsx("div", { className: "max-w-6xl mx-auto sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs(
      motion.div,
      {
        className: "grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center",
        initial: { opacity: 0, y: 50 },
        whileInView: { opacity: 1, y: 0 },
        transition: { duration: 0.8 },
        viewport: { once: true, amount: 0.2 },
        children: [
          /* @__PURE__ */ jsxs("div", { className: "text-white text-center lg:text-left flex flex-col justify-center items-center lg:items-start px-4 sm:px-0", children: [
            /* @__PURE__ */ jsx("h2", { className: "text-3xl sm:text-4xl lg:text-5xl font-bold mb-8 text-center lg:text-left", children: "Beneficios:" }),
            /* @__PURE__ */ jsx("div", { className: "space-y-4", children: Object.entries(data.especificaciones).filter(([key]) => key.toLowerCase().startsWith("beneficio")).map(([key, value]) => /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
              /* @__PURE__ */ jsx("div", { className: "flex-shrink-0 mt-1", children: /* @__PURE__ */ jsx(FaRegSquareCheck, { className: "text-cyan-400 text-xl sm:text-2xl" }) }),
              /* @__PURE__ */ jsx("p", { className: "text-lg sm:text-xl lg:text-2xl font-medium leading-relaxed", children: String(value) })
            ] }, key)) })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "flex justify-center lg:justify-end", children: /* @__PURE__ */ jsxs("div", { className: "relative max-w-sm w-full", children: [
            /* @__PURE__ */ jsx("div", { className: "aspect-[3/4] bg-white rounded-3xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-300", children: /* @__PURE__ */ jsx(
              "img",
              {
                src: data.imagenes && data.imagenes.length > 2 && data.imagenes[2]?.url_imagen ? buildImageUrl(data.imagenes[2].url_imagen) ?? "" : buildImageUrl(data.imagen_principal) ?? "",
                alt: "Beneficios de " + data.titulo,
                title: getImageTitle(
                  data.imagenes[2] || data.imagen_principal,
                  "Beneficios de " + data.titulo
                ),
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
};

const $$Astro = createAstro();
const $$link = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$link;
  const { link } = Astro2.params;
  if (!link) {
    return Astro2.redirect("/products");
  }
  let producto = null;
  try {
    const response = await productoService.getProductoByLink(link);
    producto = response.data;
  } catch (err) {
    console.error("Error obteniendo producto:", err);
    err instanceof Error ? err.message : "Error desconocido";
  }
  if (!producto) {
    return Astro2.redirect("/products");
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": producto.etiqueta.meta_titulo || producto.nombre, "description": producto.etiqueta.meta_descripcion || producto.descripcion, "keywords": "publicidad, maquinaria, dise\xF1o, decoraci\xF3n, carteles", "canonicalUrl": `${Astro2.site}products/${producto.link}` }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "ProductoPage", ProductoPage, { "client:load": true, "data": producto, "client:component-hydration": "load", "client:component-path": "/home/runner/work/Yuntas-Frontend/Yuntas-Frontend/src/components/products/ProductoPage", "client:component-export": "default" })} ` })}`;
}, "/home/runner/work/Yuntas-Frontend/Yuntas-Frontend/src/pages/products/[link].astro", void 0);

const $$file = "/home/runner/work/Yuntas-Frontend/Yuntas-Frontend/src/pages/products/[link].astro";
const $$url = "/products/[link]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$link,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
