import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import { useEffect } from 'react';
import { g as getImageTitle, b as buildImageUrl } from './imageHelpers_BvyCxxJ7.mjs';
import { i as insertJsonLd } from './schema-markup-generator_k_zjfotv.mjs';

// hooks/useBlogSEO.js

const useBlogSEO = (blog) => {
  useEffect(() => {
    if (!blog || !blog.etiqueta) return;

    const metaTitle = blog.etiqueta.meta_titulo || blog.nombre_producto;
    const metaDescription = blog.etiqueta.meta_descripcion || blog.subtitulo;

    console.log('🔍 Aplicando SEO del blog:', {
      id: blog.id,
      metaTitle,
      metaDescription,
      hasEtiqueta: !!blog.etiqueta
    });

    // Setear título del documento
    document.title = metaTitle;

    // Meta descripción
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      document.head.appendChild(metaDesc);
    }
    metaDesc.content = metaDescription;

    // Open Graph
    const setOgMeta = (property, content) => {
      let tag = document.querySelector(`meta[property="${property}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('property', property);
        document.head.appendChild(tag);
      }
      tag.content = content;
    };

    setOgMeta('og:title', metaTitle);
    setOgMeta('og:description', metaDescription);
  }, [blog]);
};

function BlogPage({ article }) {
  useBlogSEO(article);
  useEffect(() => {
    insertJsonLd("blog", article);
  }, [article]);
  if (!article) {
    return /* @__PURE__ */ jsx("div", { className: "grid min-h-screen place-content-center text-center bg-red-100", children: /* @__PURE__ */ jsx("p", { className: "text-3xl font-bold text-red-700", children: "Error: No se recibieron los datos del artículo." }) });
  }
  const getEmbeddedVideoUrl = (url) => {
    if (!url) return null;
    const match = url.match(/(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([^&]+)/);
    if (match && match[1]) {
      return `https://www.youtube.com/embed/${match[1]}`;
    }
    const shortMatch = url.match(/youtu\.be\/([^?]+)/);
    if (shortMatch && shortMatch[1]) {
      return `https://www.youtube.com/embed/${shortMatch[1]}`;
    }
    return url;
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("section", { className: "relative", children: article.imagen_principal ? /* @__PURE__ */ jsx(
      "img",
      {
        src: buildImageUrl(article.imagen_principal),
        alt: article.nombre_producto || "Imagen principal del blog",
        title: getImageTitle(
          article.imagen_principal,
          "Imagen principal del blog"
        ),
        className: "w-full max-h-[100vh] object-cover"
      }
    ) : /* @__PURE__ */ jsx("div", { className: "w-full h-[50vh] flex items-center justify-center bg-gray-200 text-gray-500", children: "Sin imagen disponible" }) }),
    /* @__PURE__ */ jsx("div", { className: "w-full bg-white text-blue-950 text-center py-6 sm:py-8", children: /* @__PURE__ */ jsx("h2", { className: "text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold", children: article.nombre_producto }) }),
    /* @__PURE__ */ jsx("section", { className: "px-4 sm:px-8 md:px-12 lg:px-24 py-16 text-white bg-gradient-to-b from-blue-900 to-indigo-950 flex flex-col", children: /* @__PURE__ */ jsxs("div", { className: "Montserrat relative z-10 max-w-7xl mx-auto py-12 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsx("div", { className: "text-center mb-16 animate-fade-in", children: /* @__PURE__ */ jsx("h1", { className: "text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white animate-float", children: article.subtitulo || "Descubre nuestro blog" }) }),
      /* @__PURE__ */ jsx("div", { className: "space-y-12 mb-16", children: article.parrafos?.map((p, index) => {
        const image = article.imagenes?.[index % article.imagenes.length];
        const isEven = index % 2 === 0;
        return /* @__PURE__ */ jsxs(
          "div",
          {
            className: `flex flex-col ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"} items-center gap-12 p-8 rounded-3xl`,
            children: [
              image && /* @__PURE__ */ jsx("div", { className: "flex-none w-full lg:w-80 h-56 rounded-[2.5rem] overflow-hidden shadow-2xl", children: /* @__PURE__ */ jsx(
                "img",
                {
                  src: buildImageUrl(image.ruta_imagen),
                  alt: image.texto_alt || "Imagen del blog",
                  title: getImageTitle(image, "Imagen del blog"),
                  className: "w-full h-full object-cover"
                }
              ) }),
              /* @__PURE__ */ jsx("div", { className: "flex-1", children: /* @__PURE__ */ jsx(
                "p",
                {
                  className: "text-lg leading-relaxed text-white/90 text-justify",
                  dangerouslySetInnerHTML: { __html: p.parrafo }
                }
              ) })
            ]
          },
          index
        );
      }) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 py-20 px-4 overflow-hidden", children: /* @__PURE__ */ jsxs("div", { className: "relative z-10 max-w-6xl mx-auto", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-12", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-4xl md:text-5xl font-bold text-white mb-4", children: "Mira nuestro video" }),
        /* @__PURE__ */ jsx("p", { className: "text-xl text-white/80 max-w-2xl mx-auto", children: "Descubre más detalles sobre nuestros productos y servicios" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "relative bg-black/30 backdrop-blur-sm rounded-2xl overflow-hidden shadow-2xl border border-white/10", children: /* @__PURE__ */ jsx("div", { className: "aspect-video w-full relative", children: article.url_video ? /* @__PURE__ */ jsx(
        "iframe",
        {
          src: getEmbeddedVideoUrl(article.url_video),
          title: "Video",
          className: "absolute inset-0 w-full h-full",
          allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
          allowFullScreen: true
        }
      ) : /* @__PURE__ */ jsx("div", { className: "absolute inset-0 flex items-center justify-center", children: /* @__PURE__ */ jsx("p", { className: "text-white/80 text-xl font-medium", children: "Video próximamente" }) }) }) })
    ] }) })
  ] });
}

export { BlogPage as B };
