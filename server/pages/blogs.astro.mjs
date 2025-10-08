import { c as createComponent, b as renderComponent, r as renderTemplate, m as maybeRenderHead, a as addAttribute } from '../chunks/astro/server_hsX-BFeG.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../chunks/Layout_oc6Si_Zm.mjs';
import { jsxs, jsx, Fragment } from 'react/jsx-runtime';
import { useState, useRef, useEffect } from 'react';
import { b as buildImageUrl, g as getImageTitle } from '../chunks/imageHelpers_BvyCxxJ7.mjs';
export { renderers } from '../renderers.mjs';

const imagen1 = new Proxy({"src":"/_astro/banner_blog.CzIyHKs6.webp","width":1440,"height":780,"format":"webp"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/home/runner/work/Yuntas-Frontend/Yuntas-Frontend/src/assets/images/blog/banner_blog.webp";
							}
							
							return target[name];
						}
					});

function BlogCard({ blog }) {
  const [imageError, setImageError] = useState(false);
  const handleImageError = () => {
    setImageError(true);
  };
  const handleClick = (e) => {
    e.preventDefault();
    window.location.href = `/blogs/${blog.link}`;
  };
  const imagenUrl = buildImageUrl(blog.imagen_principal);
  const titulo = blog.nombre_producto || "Blog sin título";
  return /* @__PURE__ */ jsxs(
    "a",
    {
      href: `/blogs/${blog.link}`,
      onClick: handleClick,
      className: "group relative overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-300 hover:scale-105 w-[250px] h-[320px] flex flex-col",
      children: [
        /* @__PURE__ */ jsx("div", { className: "relative w-full h-[200px] overflow-hidden flex-shrink-0", children: !imageError && imagenUrl ? /* @__PURE__ */ jsx(
          "img",
          {
            src: imagenUrl,
            alt: blog.text_alt_principal || titulo,
            title: getImageTitle(imagenUrl, titulo),
            className: "w-full h-full aspect-square object-cover transition-transform duration-500 group-hover:scale-110",
            onError: handleImageError,
            loading: "lazy"
          }
        ) : /* @__PURE__ */ jsx("div", { className: "w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center", children: /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
          /* @__PURE__ */ jsx(
            "svg",
            {
              className: "mx-auto h-10 w-10 text-gray-400 mb-1",
              fill: "none",
              stroke: "currentColor",
              viewBox: "0 0 24 24",
              children: /* @__PURE__ */ jsx(
                "path",
                {
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  strokeWidth: 1.5,
                  d: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                }
              )
            }
          ),
          /* @__PURE__ */ jsx("p", { className: "text-gray-500 text-xs", children: "Imagen no disponible" })
        ] }) }) }),
        /* @__PURE__ */ jsxs("div", { className: "px-4 py-1 flex-1 flex flex-col justify-center items-center min-h-[60px] max-h-[90px] text-center", children: [
          /* @__PURE__ */ jsx("h3", { className: "w-full flex justify-center items-center text-base font-semibold text-gray-800 mb-1 text-center uppercase leading-tight line-clamp-3 max-h-[48px]", children: titulo }),
          blog.subtitulo && /* @__PURE__ */ jsx("p", { className: "w-full flex justify-center items-center text-gray-600 text-sm text-center leading-tight line-clamp-3 max-h-[36px]", children: blog.subtitulo })
        ] })
      ]
    }
  );
}

const BlogSearchBar = ({
  blogs,
  onFilteredBlogs
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef(null);
  const getBlogTitles = () => {
    const titles = /* @__PURE__ */ new Set();
    blogs.forEach((blog) => {
      const title = blog.nombre_producto || "";
      if (title.trim()) {
        titles.add(title.trim());
      }
    });
    return Array.from(titles);
  };
  const generateSuggestions = (term) => {
    if (term.length === 0) return [];
    const allTitles = getBlogTitles();
    const lowerTerm = term.toLowerCase();
    const matchingSuggestions = allTitles.filter(
      (title) => title.toLowerCase().includes(lowerTerm)
    );
    return matchingSuggestions.sort((a, b) => {
      const aLower = a.toLowerCase();
      const bLower = b.toLowerCase();
      if (aLower === lowerTerm) return -1;
      if (bLower === lowerTerm) return 1;
      if (aLower.startsWith(lowerTerm) && !bLower.startsWith(lowerTerm))
        return -1;
      if (bLower.startsWith(lowerTerm) && !aLower.startsWith(lowerTerm))
        return 1;
      return aLower.indexOf(lowerTerm) - bLower.indexOf(lowerTerm);
    }).slice(0, 6);
  };
  const filterBlogs = (term) => {
    if (!term.trim()) {
      return blogs;
    }
    const lowerTerm = term.toLowerCase();
    return blogs.filter((blog) => {
      const blogTitle = (blog.nombre_producto || "").toLowerCase();
      return blogTitle.includes(lowerTerm);
    });
  };
  useEffect(() => {
    const filtered = filterBlogs(searchTerm);
    onFilteredBlogs(filtered);
    if (searchTerm.length > 0) {
      const newSuggestions = generateSuggestions(searchTerm);
      setSuggestions(newSuggestions);
      setShowSuggestions(newSuggestions.length > 0);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchTerm, blogs]);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
  };
  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion);
    setShowSuggestions(false);
  };
  const handleInputFocus = () => {
    if (suggestions.length > 0 && searchTerm.length > 0) {
      setShowSuggestions(true);
    }
  };
  const clearSearch = () => {
    setSearchTerm("");
    setShowSuggestions(false);
  };
  return /* @__PURE__ */ jsxs("div", { className: "w-full mb-8", ref: searchRef, children: [
    /* @__PURE__ */ jsx("div", { className: "bg-gray-300 rounded-2xl p-8 w-full flex items-center relative", children: /* @__PURE__ */ jsxs("div", { className: "relative w-full", children: [
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "text",
          value: searchTerm,
          onChange: handleInputChange,
          onFocus: handleInputFocus,
          placeholder: "Buscar blogs...",
          className: "w-full bg-white placeholder-black px-6 py-3 rounded-full text-black text-xl focus:outline-none"
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "absolute right-6 top-1/2 transform -translate-y-1/2 flex items-center space-x-2", children: [
        searchTerm && /* @__PURE__ */ jsx(
          "button",
          {
            onClick: clearSearch,
            className: "w-6 h-6 text-gray-500 hover:text-gray-700 transition-colors duration-200",
            title: "Limpiar búsqueda"
          }
        ),
        /* @__PURE__ */ jsx(
          "svg",
          {
            className: "w-6 h-6 text-gray-500",
            fill: "none",
            stroke: "currentColor",
            viewBox: "0 0 24 24",
            children: /* @__PURE__ */ jsx(
              "path",
              {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeWidth: 2,
                d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              }
            )
          }
        )
      ] })
    ] }) }),
    showSuggestions && suggestions.length > 0 && /* @__PURE__ */ jsx("div", { className: "relative", children: /* @__PURE__ */ jsx("div", { className: "absolute top-2 left-8 right-8 bg-white rounded-xl shadow-xl border border-gray-200 z-50 max-h-60 overflow-y-auto", children: /* @__PURE__ */ jsxs("div", { className: "p-2", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-xs text-gray-500 px-3 py-2 font-semibold uppercase tracking-wide border-b border-gray-100", children: [
        "Sugerencias de blogs (",
        suggestions.length,
        ")"
      ] }),
      suggestions.map((suggestion, index) => /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: () => handleSuggestionClick(suggestion),
          className: "w-full text-left px-3 py-3 hover:bg-gray-100 rounded-lg text-black transition-colors duration-150 flex items-center space-x-3",
          children: [
            /* @__PURE__ */ jsx(
              "svg",
              {
                className: "w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors",
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24",
                children: /* @__PURE__ */ jsx(
                  "path",
                  {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: 2,
                    d: "M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                  }
                )
              }
            ),
            /* @__PURE__ */ jsx("span", { className: "text-sm font-medium", children: suggestion })
          ]
        },
        index
      ))
    ] }) }) })
  ] });
};

function FetchBlogsList() {
  const [allBlogs, setAllBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState(1);
  const [totalBlogs, setTotalBlogs] = useState(0);
  const [isSearchActive, setIsSearchActive] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024 && window.innerWidth >= 640) {
        setItemsPerPage(6);
      } else {
        setItemsPerPage(5);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  useEffect(() => {
    const fetchAllBlogs = async () => {
      setLoading(true);
      try {
        let allFetchedBlogs = [];
        let currentPageToFetch = 1;
        let hasMorePages2 = true;
        while (hasMorePages2) {
          const timestamp = (/* @__PURE__ */ new Date()).getTime();
          const apiUrl = `https://apiyuntas.yuntaspublicidad.com/api/blogs?page=${currentPageToFetch}&perPage=50&_t=${timestamp}`;
          const response = await fetch(apiUrl, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json"
            }
          });
          if (!response.ok) {
            throw new Error(`Error al obtener blogs: ${response.status}`);
          }
          const jsonResponse = await response.json();
          if (jsonResponse.success) {
            const blogData = jsonResponse.data?.data || [];
            const blogsArray = Array.isArray(blogData) ? blogData : [blogData];
            const validBlogs = blogsArray.filter(
              (blog) => blog && (blog.id || blog.nombre_producto)
            );
            if (validBlogs.length > 0) {
              allFetchedBlogs = [...allFetchedBlogs, ...validBlogs];
              const lastPage = jsonResponse.data?.last_page || 1;
              if (currentPageToFetch < lastPage) {
                currentPageToFetch++;
              } else {
                hasMorePages2 = false;
              }
            } else {
              hasMorePages2 = false;
            }
          } else {
            hasMorePages2 = false;
          }
        }
        console.log("Todos los blogs obtenidos:", allFetchedBlogs.length);
        setAllBlogs(allFetchedBlogs);
        setFilteredBlogs(allFetchedBlogs);
        setTotalBlogs(allFetchedBlogs.length);
        setTotalPages(Math.ceil(allFetchedBlogs.length / itemsPerPage));
      } catch (err) {
        console.error("❌ Error al obtener blogs:", err);
        setAllBlogs([]);
        setFilteredBlogs([]);
        setTotalBlogs(0);
      } finally {
        setLoading(false);
      }
    };
    fetchAllBlogs();
  }, []);
  const handleFilteredBlogs = (blogs) => {
    setFilteredBlogs(blogs);
    setIsSearchActive(
      blogs.length !== allBlogs.length || blogs.length === 0 && allBlogs.length > 0
    );
    setCurrentIndex(0);
  };
  const getCurrentPageBlogs = () => {
    if (isSearchActive) {
      return filteredBlogs;
    } else {
      const startIndex = currentIndex * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      return filteredBlogs.slice(startIndex, endIndex);
    }
  };
  const currentBlogs = getCurrentPageBlogs();
  const hasMorePages = () => {
    return !isSearchActive && (currentBlogs.length === itemsPerPage || currentIndex < totalPages - 1);
  };
  const canGoLeft = currentIndex > 0 && !isSearchActive;
  const canGoRight = hasMorePages() && currentIndex < totalPages - 1 && !isSearchActive;
  const goLeft = () => {
    if (canGoLeft) setCurrentIndex(currentIndex - 1);
  };
  const goRight = () => {
    if (canGoRight) setCurrentIndex(currentIndex + 1);
  };
  useEffect(() => {
    if (!isSearchActive) {
      setTotalPages(Math.ceil(filteredBlogs.length / itemsPerPage));
    }
  }, [filteredBlogs, isSearchActive, itemsPerPage]);
  if (loading) {
    return /* @__PURE__ */ jsx("div", { className: "min-h-screen grid place-content-center", children: /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsx("div", { className: "inline-block animate-spin rounded-full h-16 w-16 border-b-2 border-cyan-400 mb-4" }),
      /* @__PURE__ */ jsx("p", { className: "text-white text-2xl font-bold mb-2", children: "Cargando blogs..." })
    ] }) });
  }
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen py-16", children: [
    /* @__PURE__ */ jsx("div", { className: "text-center mb-12", children: /* @__PURE__ */ jsx("h2", { className: "text-white text-3xl md:text-4xl font-bold uppercase tracking-wide", children: "DESCUBRE MÁS SOBRE NUESTROS PRODUCTOS" }) }),
    allBlogs.length > 0 && /* @__PURE__ */ jsx(BlogSearchBar, { blogs: allBlogs, onFilteredBlogs: handleFilteredBlogs }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-6 relative", children: [
      /* @__PURE__ */ jsx("div", { className: "overflow-hidden", children: /* @__PURE__ */ jsx(
        "div",
        {
          className: "transition-transform duration-500 ease-in-out",
          style: { transform: `translateX(0%)` },
          children: currentBlogs.length > 0 ? /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-6 place-items-center lg:hidden", children: currentBlogs.map((blog) => /* @__PURE__ */ jsx(
              "div",
              {
                className: "group transform transition-all duration-300",
                children: /* @__PURE__ */ jsx("div", { className: "rounded-2xl p-1", children: /* @__PURE__ */ jsx("div", { className: "w-full max-w-[320px] mx-auto bg-gradient-to-br from-white/5 to-white/10 rounded-xl overflow-hidden", children: /* @__PURE__ */ jsx(BlogCard, { blog }) }) })
              },
              blog.id
            )) }),
            /* @__PURE__ */ jsxs("div", { className: "hidden lg:block space-y-8", children: [
              /* @__PURE__ */ jsx("div", { className: "grid grid-cols-3 gap-8 justify-items-center", children: currentBlogs.slice(0, 3).map((blog) => /* @__PURE__ */ jsx(
                "div",
                {
                  className: "group transform transition-all duration-300",
                  children: /* @__PURE__ */ jsx("div", { className: "rounded-2xl p-1", children: /* @__PURE__ */ jsx("div", { className: "w-full max-w-[320px] mx-auto bg-gradient-to-br from-white/5 to-white/10 rounded-xl overflow-hidden", children: /* @__PURE__ */ jsx(BlogCard, { blog }) }) })
                },
                blog.id
              )) }),
              currentBlogs.length > 3 && !isSearchActive && /* @__PURE__ */ jsx("div", { className: "flex justify-center mt-12", children: /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 gap-24 max-w-2xl", children: currentBlogs.slice(3, 5).map((blog) => /* @__PURE__ */ jsx(
                "div",
                {
                  className: "group transform transition-all duration-300",
                  children: /* @__PURE__ */ jsx("div", { className: "rounded-2xl p-1", children: /* @__PURE__ */ jsx("div", { className: "bg-gradient-to-br from-white/5 to-white/10 rounded-xl overflow-hidden max-w-[250px]", children: /* @__PURE__ */ jsx(BlogCard, { blog }) }) })
                },
                blog.id
              )) }) }),
              isSearchActive && currentBlogs.length > 3 && /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12", children: currentBlogs.slice(3).map((blog) => /* @__PURE__ */ jsx(
                "div",
                {
                  className: "group transform transition-all duration-300 justify-self-center",
                  children: /* @__PURE__ */ jsx("div", { className: "rounded-2xl p-1", children: /* @__PURE__ */ jsx("div", { className: "w-full max-w-[320px] mx-auto bg-gradient-to-br from-white/5 to-white/10 rounded-xl overflow-hidden", children: /* @__PURE__ */ jsx(BlogCard, { blog }) }) })
                },
                blog.id
              )) })
            ] })
          ] }) : isSearchActive ? (
            /* Mensaje cuando no hay resultados de búsqueda */
            /* @__PURE__ */ jsx("div", { className: "text-white text-center py-16", children: /* @__PURE__ */ jsxs("div", { className: "bg-gray-800/50 rounded-2xl p-12 max-w-lg mx-auto", children: [
              /* @__PURE__ */ jsx(
                "svg",
                {
                  className: "w-20 h-20 text-gray-400 mx-auto mb-6",
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24",
                  children: /* @__PURE__ */ jsx(
                    "path",
                    {
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      strokeWidth: 1.5,
                      d: "M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold mb-3", children: "No se encontraron blogs" }),
              /* @__PURE__ */ jsxs("p", { className: "text-gray-300 text-lg", children: [
                "Intenta con otros términos de búsqueda o",
                " ",
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: () => {
                      setFilteredBlogs(allBlogs);
                      setIsSearchActive(false);
                    },
                    className: "text-cyan-400 hover:text-cyan-300 underline font-semibold transition-colors",
                    children: "ver todos los blogs"
                  }
                )
              ] })
            ] }) })
          ) : /* @__PURE__ */ jsx("div", { className: "text-center py-12", children: /* @__PURE__ */ jsx("p", { className: "text-white/70 text-xl", children: "No hay blogs disponibles" }) })
        }
      ) }),
      (totalPages > 1 || hasMorePages()) && !isSearchActive && /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsxs("div", { className: "flex justify-center items-center mt-16 space-x-8", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              "aria-label": "Página anterior",
              title: "Página anterior",
              onClick: goLeft,
              disabled: !canGoLeft,
              className: `flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300 ${canGoLeft ? "border-white/50 text-white hover:bg-white/10 hover:border-white cursor-pointer" : "border-white/20 text-white/30 cursor-not-allowed"}`,
              children: /* @__PURE__ */ jsx("span", { className: "text-2xl font-bold", children: "<" })
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center sm:space-x-3 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white px-6 sm:px-8 py-2 sm:py-4 rounded-full text-sm sm:text-base", children: /* @__PURE__ */ jsx("span", { className: "uppercase tracking-wide font-semibold text-center", children: "ver más" }) }),
          /* @__PURE__ */ jsx(
            "button",
            {
              "aria-label": "Página siguiente",
              title: "Página siguiente",
              onClick: goRight,
              disabled: !canGoRight,
              className: `flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300 ${canGoRight ? "border-white/50 text-white hover:bg-white/10 hover:border-white cursor-pointer" : "border-white/20 text-white/30 cursor-not-allowed"}`,
              children: /* @__PURE__ */ jsx("span", { className: "text-2xl font-bold", children: ">" })
            }
          )
        ] }),
        totalPages > 1 && /* @__PURE__ */ jsx("div", { className: "flex justify-center mt-6 space-x-2", children: Array.from({ length: totalPages }, (_, i) => /* @__PURE__ */ jsx(
          "button",
          {
            "aria-label": `Ir a la página ${i + 1}`,
            title: `Ir a la página ${i + 1}`,
            onClick: () => setCurrentIndex(i),
            className: `w-3 h-3 rounded-full transition-all duration-300 ${i === currentIndex ? "bg-white" : "bg-white/30 hover:bg-white/50"}`
          },
          i
        )) })
      ] })
    ] })
  ] });
}

const $$Blogs = createComponent(async ($$result, $$props, $$slots) => {
  const generalMetadata = {
    titulo: "Blog Yuntas | Tendencias en Publicidad LED y Tips para tu negocio",
    description: "Consejos, tendencias y gu\xEDas sobre publicidad LED, letreros luminosos, se\xF1ales digitales y mucho m\xE1s. Contenido experto para potenciar tu negocio con tecnolog\xEDa innovadora.",
    keywordsBlog: "c\xF3mo elegir letrero led, mantenimiento letreros luminosos, diferencias LED vs ne\xF3n tradicional, ahorro energ\xE9tico publicidad LED, problemas comunes paneles LED, duraci\xF3n vida \xFAtil LED, mejores letreros luminosos, como usar neon, mejores productos led"
  };
  let allArticles = [];
  try {
    const res = await fetch("https://apiyuntas.yuntaspublicidad.com/api/blogs");
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const apiResponse = await res.json();
    allArticles = apiResponse.data;
  } catch (err) {
    err instanceof Error ? err.message : "Error desconocido";
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": generalMetadata.titulo, "description": generalMetadata.description, "keywords": generalMetadata.keywordsBlog, "canonicalUrl": "https://yuntaspublicidad.com/blogs/" }, { "default": async ($$result2) => renderTemplate`  ${maybeRenderHead()}<section class="relative h-screen"> <img${addAttribute(imagen1.src, "src")} alt="Biblioteca moderna con tecnología LED, espacio ideal para proyectos de diseño sostenible y ambientes funcionales" title="Biblioteca moderna con tecnología LED" class="w-full h-full object-cover"> <div class="absolute inset-0 flex flex-col justify-center items-center text-center"> <h1 class="text-7xl text-center Montserrat font-black text-white sombra-title">
Blog Yuntero
</h1> </div> </section>  <div class="bg-gray h-30 flex items-center justify-center"> <h2 class="text-xl sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl Montserrat font-extrabold text-[#243360]">
NUESTROS ARTICULOS
</h2> </div>   <section class="w-full bg-gradient-to-b from-blue-900 to-indigo-950 py-20"> <div class="max-w-[1200px] px-4 sm:px-8 md:px-12 lg:px-16 xl:px-24 mx-auto"> ${renderComponent($$result2, "FetchBlogsList", FetchBlogsList, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/home/runner/work/Yuntas-Frontend/Yuntas-Frontend/src/components/blog/FetchBlogsList.tsx", "client:component-export": "default" })} </div> </section> ` })}`;
}, "/home/runner/work/Yuntas-Frontend/Yuntas-Frontend/src/pages/blogs.astro", void 0);

const $$file = "/home/runner/work/Yuntas-Frontend/Yuntas-Frontend/src/pages/blogs.astro";
const $$url = "/blogs";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Blogs,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
