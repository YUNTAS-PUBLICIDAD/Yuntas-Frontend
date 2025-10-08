import { c as createComponent, b as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_hsX-BFeG.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../chunks/Layout_oc6Si_Zm.mjs';
import { $ as $$Picture } from '../chunks/_astro_assets_j3t7V6bN.mjs';
import { jsxs, jsx, Fragment } from 'react/jsx-runtime';
import { useState, useRef, useEffect } from 'react';
import { b as buildImageUrl, g as getImageTitle } from '../chunks/imageHelpers_BvyCxxJ7.mjs';
export { renderers } from '../renderers.mjs';

const imagenPrincipio = new Proxy({"src":"/_astro/principio2.BnuQupFP.png","width":1439,"height":961,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/home/runner/work/Yuntas-Frontend/Yuntas-Frontend/src/assets/images/products/principio2.png";
							}
							
							return target[name];
						}
					});

const ProductCard = ({ producto }) => {
  console.log("🎴 ProductCard recibió producto:", producto);
  const imagenUrl = buildImageUrl(producto.imagen_principal);
  const imagenAlt = producto.text_alt_principal || "Imagen del producto";
  const titulo = producto.title || producto.titulo || producto.nombre || "Producto sin título";
  const link = producto.link;
  console.log("🖼️ Imagen URL calculada:", imagenUrl);
  console.log("📝 Título calculado:", titulo);
  console.log("🔗 Link del producto:", link);
  const handleClick = (e) => {
    e.preventDefault();
    window.location.href = `/products/${link}`;
  };
  return /* @__PURE__ */ jsxs(
    "a",
    {
      href: `/products/${link}`,
      onClick: handleClick,
      className: "relative flex flex-col items-center hover:scale-105 transition-all duration-200 cursor-pointer group mb-8",
      title: titulo,
      children: [
        /* @__PURE__ */ jsx("div", { className: "relative w-[280px] bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl overflow-hidden border border-gray-700", children: /* @__PURE__ */ jsx("div", { className: "h-[200px] w-[280px] overflow-hidden", children: imagenUrl ? /* @__PURE__ */ jsx(
          "img",
          {
            className: "w-full h-full object-cover object-center",
            src: imagenUrl,
            alt: imagenAlt,
            title: getImageTitle(imagenUrl, titulo),
            loading: "lazy"
          }
        ) : /* @__PURE__ */ jsx("div", { className: "w-full h-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center", children: /* @__PURE__ */ jsx("p", { className: "text-white text-xl font-bold", children: "Sin imagen" }) }) }) }),
        /* @__PURE__ */ jsx("div", { className: "p-4 mt-2", children: /* @__PURE__ */ jsx("p", { className: "text-white text-center text-sm font-semibold leading-tight", children: titulo }) })
      ]
    }
  );
};

const ProductSearchBar = ({
  products,
  onFilteredProducts
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef(null);
  const getProductNames = () => {
    const names = /* @__PURE__ */ new Set();
    products.forEach((product) => {
      const name = product.title || product.titulo || product.nombre || "";
      if (name.trim()) {
        names.add(name.trim());
      }
    });
    return Array.from(names);
  };
  const generateSuggestions = (term) => {
    if (term.length === 0) return [];
    const allNames = getProductNames();
    const lowerTerm = term.toLowerCase();
    const matchingSuggestions = allNames.filter(
      (name) => name.toLowerCase().includes(lowerTerm)
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
  const filterProducts = (term) => {
    if (!term.trim()) {
      return products;
    }
    const lowerTerm = term.toLowerCase();
    return products.filter((product) => {
      const productName = (product.title || product.titulo || product.nombre || "").toLowerCase();
      return productName.includes(lowerTerm);
    });
  };
  useEffect(() => {
    const filtered = filterProducts(searchTerm);
    onFilteredProducts(filtered);
    if (searchTerm.length > 0) {
      const newSuggestions = generateSuggestions(searchTerm);
      setSuggestions(newSuggestions);
      setShowSuggestions(newSuggestions.length > 0);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchTerm, products]);
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
    /* @__PURE__ */ jsx("div", { className: "relative w-full mb-6", children: /* @__PURE__ */ jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "text",
          value: searchTerm,
          onChange: handleInputChange,
          onFocus: handleInputFocus,
          placeholder: "Buscar productos...",
          className: "w-full bg-gradient-to-r from-gray-800 to-gray-900 border-2 border-gray-700 placeholder-gray-400 px-6 py-4 pr-16 rounded-2xl text-white text-xl focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300 shadow-xl"
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center space-x-2", children: [
        searchTerm && /* @__PURE__ */ jsx(
          "button",
          {
            onClick: clearSearch,
            className: "w-6 h-6 text-gray-400 hover:text-white transition-colors duration-200 hover:scale-110",
            title: "Limpiar búsqueda",
            children: /* @__PURE__ */ jsx("svg", { fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx(
              "path",
              {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeWidth: 2,
                d: "M6 18L18 6M6 6l12 12"
              }
            ) })
          }
        ),
        /* @__PURE__ */ jsx(
          "svg",
          {
            className: "w-6 h-6 text-gray-400",
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
    showSuggestions && suggestions.length > 0 && /* @__PURE__ */ jsx("div", { className: "relative", children: /* @__PURE__ */ jsx("div", { className: "absolute top-0 left-0 right-0 bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-gray-700 rounded-2xl shadow-2xl z-50 max-h-64 overflow-y-auto backdrop-blur-sm", children: /* @__PURE__ */ jsxs("div", { className: "p-3", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-xs text-cyan-400 px-4 py-2 font-bold uppercase tracking-wider border-b border-gray-700 flex items-center space-x-2", children: [
        /* @__PURE__ */ jsx(
          "svg",
          {
            className: "w-3 h-3",
            fill: "none",
            stroke: "currentColor",
            viewBox: "0 0 24 24",
            children: /* @__PURE__ */ jsx(
              "path",
              {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeWidth: 2,
                d: "M13 10V3L4 14h7v7l9-11h-7z"
              }
            )
          }
        ),
        /* @__PURE__ */ jsxs("span", { children: [
          "Sugerencias (",
          suggestions.length,
          ")"
        ] })
      ] }),
      suggestions.map((suggestion, index) => /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: () => handleSuggestionClick(suggestion),
          className: "w-full text-left px-4 py-3 hover:bg-gray-700/50 rounded-xl text-white transition-all duration-200 flex items-center space-x-3 group hover:scale-[1.02] hover:border-l-2 hover:border-cyan-400",
          children: [
            /* @__PURE__ */ jsx(
              "svg",
              {
                className: "w-4 h-4 text-gray-400 group-hover:text-cyan-400 transition-colors",
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
            ),
            /* @__PURE__ */ jsx("span", { className: "text-sm font-medium group-hover:text-cyan-100 transition-colors", children: suggestion })
          ]
        },
        index
      ))
    ] }) }) })
  ] });
};

function FetchProductsList() {
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const itemsPerPage = 6;
  useEffect(() => {
    const fetchAllProducts = async () => {
      setLoading(true);
      try {
        let allFetchedProducts = [];
        let currentPageToFetch = 1;
        let hasMorePages = true;
        while (hasMorePages) {
          const apiUrl = `https://apiyuntas.yuntaspublicidad.com/api/v1/productos?page=${currentPageToFetch}&per_page=50`;
          const response = await fetch(apiUrl, {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json"
            }
          });
          const json = await response.json();
          if (json && Array.isArray(json.data) && json.data.length > 0) {
            allFetchedProducts = [...allFetchedProducts, ...json.data];
            if (json.current_page < json.last_page) {
              currentPageToFetch++;
            } else {
              hasMorePages = false;
            }
          } else {
            hasMorePages = false;
          }
        }
        console.log(
          "Todos los productos obtenidos:",
          allFetchedProducts.length
        );
        setAllProducts(allFetchedProducts);
        setFilteredProducts(allFetchedProducts);
        setTotalPages(Math.ceil(allFetchedProducts.length / itemsPerPage));
      } catch (error) {
        console.error("Error fetching products:", error);
        setAllProducts([]);
        setFilteredProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchAllProducts();
  }, []);
  const handleFilteredProducts = (products) => {
    setFilteredProducts(products);
    setIsSearchActive(
      products.length !== allProducts.length || products.length === 0 && allProducts.length > 0
    );
    setCurrentPage(1);
  };
  const getCurrentPageProducts = () => {
    if (isSearchActive) {
      return filteredProducts;
    } else {
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      return filteredProducts.slice(startIndex, endIndex);
    }
  };
  const currentProducts = getCurrentPageProducts();
  const createProductRows = (products) => {
    const rows2 = [];
    for (let i = 0; i < products.length; i += 3) {
      rows2.push(products.slice(i, i + 3));
    }
    return rows2;
  };
  const rows = createProductRows(currentProducts);
  const goLeft = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const goRight = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  const canGoLeft = currentPage > 1;
  const canGoRight = currentPage < totalPages;
  useEffect(() => {
    if (!isSearchActive) {
      setTotalPages(Math.ceil(filteredProducts.length / itemsPerPage));
    }
  }, [filteredProducts, isSearchActive]);
  if (loading) {
    return /* @__PURE__ */ jsx("div", { className: "grid place-content-center min-h-screen", children: /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsx("div", { className: "inline-block animate-spin rounded-full h-16 w-16 border-b-2 border-cyan-400 mb-4" }),
      /* @__PURE__ */ jsx("p", { className: "text-white text-2xl font-bold animate-pulse", children: "Cargando productos..." })
    ] }) });
  }
  return /* @__PURE__ */ jsx("div", { className: "w-full", children: allProducts.length > 0 ? /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      ProductSearchBar,
      {
        products: allProducts,
        onFilteredProducts: handleFilteredProducts
      }
    ),
    currentProducts.length > 0 ? /* @__PURE__ */ jsx("div", { className: "space-y-8 mb-12", children: rows.map((row, rowIndex) => /* @__PURE__ */ jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 mb-4", children: [
        row.map((producto, index) => /* @__PURE__ */ jsx(
          "div",
          {
            className: "flex justify-center",
            children: /* @__PURE__ */ jsx(ProductCard, { producto })
          },
          `${rowIndex}-${index}-${producto.id || producto.title || index}`
        )),
        row.length < 3 && Array.from({ length: 3 - row.length }).map(
          (_, emptyIndex) => /* @__PURE__ */ jsx(
            "div",
            {
              className: "invisible",
              children: /* @__PURE__ */ jsx("div", { className: "w-[280px] h-[200px]" })
            },
            `empty-${rowIndex}-${emptyIndex}`
          )
        )
      ] }),
      /* @__PURE__ */ jsx("div", { className: "w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent" })
    ] }, rowIndex)) }) : (
      /* Mensaje cuando no hay resultados de búsqueda */
      /* @__PURE__ */ jsx("div", { className: "text-white text-center py-16", children: /* @__PURE__ */ jsxs("div", { className: "bg-gray-800/50 rounded-2xl p-12 max-w-lg mx-auto", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold mb-3", children: "No se encontraron productos" }),
        /* @__PURE__ */ jsxs("p", { className: "text-gray-300 text-lg", children: [
          "Intenta con otros términos de búsqueda o",
          " ",
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => {
                setFilteredProducts(allProducts);
                setIsSearchActive(false);
              },
              className: "text-cyan-400 hover:text-cyan-300 underline font-semibold transition-colors",
              children: "ver todos los productos"
            }
          )
        ] })
      ] }) })
    ),
    totalPages > 1 && !isSearchActive && /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsxs("div", { className: "flex justify-center items-center mt-16 space-x-8", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: goLeft,
            disabled: !canGoLeft,
            className: `w-12 h-12 rounded-full border-2 transition-all duration-300 ${canGoLeft ? "border-white/50 text-white hover:bg-white/10 hover:border-white cursor-pointer" : "border-white/20 text-white/30 cursor-not-allowed"}`,
            title: canGoLeft ? "Página anterior" : "No hay página anterior",
            children: /* @__PURE__ */ jsx("span", { className: "text-2xl font-bold", children: "<" })
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center sm:space-x-3 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white px-6 sm:px-8 py-2 sm:py-4 rounded-full text-sm sm:text-base", children: /* @__PURE__ */ jsxs("span", { className: "uppercase tracking-wide font-semibold text-center", children: [
          "Página ",
          currentPage,
          " de ",
          totalPages
        ] }) }),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: goRight,
            disabled: !canGoRight,
            className: `w-12 h-12 rounded-full border-2 transition-all duration-300 ${canGoRight ? "border-white/50 text-white hover:bg-white/10 hover:border-white cursor-pointer" : "border-white/20 text-white/30 cursor-not-allowed"}`,
            title: canGoRight ? "Página siguiente" : "No hay página siguiente",
            children: /* @__PURE__ */ jsx("span", { className: "text-2xl font-bold", children: ">" })
          }
        )
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex justify-center mt-6 space-x-2", children: Array.from({ length: totalPages }, (_, i) => /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => setCurrentPage(i + 1),
          className: `w-3 h-3 rounded-full transition-all duration-300 ${i + 1 === currentPage ? "bg-white" : "bg-white/30 hover:bg-white/50"}`,
          title: `Ir a página ${i + 1}`
        },
        i
      )) })
    ] })
  ] }) : (
    /* Mensaje cuando no hay productos en absoluto */
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
              d: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
            }
          )
        }
      ),
      /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold mb-3", children: "No hay productos disponibles" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-300 text-lg", children: "Intenta recargar la página o contacta al administrador" })
    ] }) })
  ) });
}

const $$Products = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "C\xE1talogo Yuntas Per\xFA | Letreros LED, Hologramas 3D y M\xE1s", "keywords": "comprar panel led exterior, precios paneles led, letrero luminoso precio, precio holograma, letreros led restaurantes, techo led barberia, mesas y sillas luminosas discotecas, iluminacion lima, info de letreros led, barras\xA0luminosas", "canonicalUrl": "https://yuntaspublicidad.com/products/" }, { "default": ($$result2) => renderTemplate`  ${maybeRenderHead()}<section class="relative h-screen"> ${renderComponent($$result2, "Picture", $$Picture, { "src": imagenPrincipio, "alt": "Night club iluminada con letreros ne\xF3n LED, luces rosa y azul, ideal para publicidad visual nocturna", "class": "w-full h-full object-cover", "title": "Night club iluminada con letreros ne\xF3n LED" })} </section>  <div class="bg-gray h-30 flex items-center justify-center"> <h2 class="text-xl sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl Montserrat font-extrabold text-[#243360]">
NUESTROS PRODUCTOS
</h2> </div>  <section class="w-full bg-gradient-to-b from-blue-900 to-indigo-950 py-20"> <div class="max-w-[1200px] px-4 sm:px-8 md:px-12 lg:px-16 xl:px-24 mx-auto"> <!-- Subtítulo --> <div class="flex items-center justify-center mb-10"> <p class="text-xl sm:text-2xl md:text-2xl lg:text-3xl xl:text-4xl Montserrat font-medium text-white/75 text-center">
Descubre la selección que tenemos para ti
</p> </div> ${renderComponent($$result2, "FetchProductsList", FetchProductsList, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/home/runner/work/Yuntas-Frontend/Yuntas-Frontend/src/components/products/FetchProductsList.tsx", "client:component-export": "default" })} </div> </section> ` })}`;
}, "/home/runner/work/Yuntas-Frontend/Yuntas-Frontend/src/pages/products.astro", void 0);

const $$file = "/home/runner/work/Yuntas-Frontend/Yuntas-Frontend/src/pages/products.astro";
const $$url = "/products";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Products,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
