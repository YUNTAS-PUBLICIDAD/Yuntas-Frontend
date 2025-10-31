import { useEffect, useState,useMemo } from "react";
import type Producto from "../../models/Product.ts";
import ProductCard from "./ProductCard.jsx";
import ProductSearchBar from "../../pages/products/_ProductSearchBar.tsx";
import {config} from "../../../config.ts";

interface CategoryCounts {
  [key: string]: number;
}
const getCategoryCounts = (products: Producto[]): CategoryCounts => {
  return products.reduce((acc, product) => {
    const category = product.seccion || "Sin Categoría"; // <-- ¡CAMBIO AQUÍ!
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {} as CategoryCounts);
};

export default function FetchProductsList() {
  const [allProducts, setAllProducts] = useState<Producto[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Producto[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const itemsPerPage = 6;

  // Fetch inicial de productos
  useEffect(() => {
    const fetchAllProducts = async () => {
      setLoading(true);
      try {
        let allFetchedProducts: Producto[] = [];
        let currentPageToFetch = 1;
        let hasMorePages = true;

        // Obtener todos los productos de todas las páginas
        while (hasMorePages) {
          const apiUrl = `${config.apiUrl}${config.endpoints.productos.list}?page=${currentPageToFetch}&per_page=50`;

          const response = await fetch(apiUrl, {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          });

          const json = await response.json();

          if (json && Array.isArray(json.data) && json.data.length > 0) {
            allFetchedProducts = [...allFetchedProducts, ...json.data];

            // Verificar si hay más páginas
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

        // Calcular páginas para mostrar
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

  // Manejar productos filtrados desde el buscador
  const handleFilteredProducts = (products: Producto[]) => {
    setFilteredProducts(products);
    setIsSearchActive(
      products.length !== allProducts.length ||
        (products.length === 0 && allProducts.length > 0)
    );
    setCurrentPage(1); // Resetear
  };

  const categoriesWithCounts = useMemo(() => getCategoryCounts(allProducts), [allProducts]);
  const categories = Object.keys(categoriesWithCounts).sort();

  useEffect(() => {
    let products = [...allProducts];

    if (selectedCategory) {
      products = products.filter(p => (p.seccion || "Sin Categoría") === selectedCategory);
    }

    if (searchTerm) {
      const lowerTerm = searchTerm.toLowerCase();
      products = products.filter(p =>
        (p.nombre || p.titulo || "").toLowerCase().includes(lowerTerm)
      );
    }

    setFilteredProducts(products);
    setCurrentPage(1); // Resetea la paginación con cada filtro
  }, [searchTerm, selectedCategory, allProducts]);


  useEffect(() => {
    setTotalPages(Math.ceil(filteredProducts.length / itemsPerPage));
  }, [filteredProducts, itemsPerPage]);

  const getCurrentPageProducts = (): Producto[] => {
    if (isSearchActive) {
      return filteredProducts;
    } else {
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      return filteredProducts.slice(startIndex, endIndex);
    }
  };

  const currentProducts = getCurrentPageProducts();

  // Filas de 3 productos
  const createProductRows = (products: Producto[]) => {
    const rows = [];
    for (let i = 0; i < products.length; i += 3) {
      rows.push(products.slice(i, i + 3));
    }
    return rows;
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

 const canGoLeft = currentPage > 1 && !isSearchActive;
  const canGoRight = currentPage < totalPages && !isSearchActive;
  


  // Actualizar total de páginas cuando cambian los productos filtrados
  useEffect(() => {
    if (!isSearchActive) {
      setTotalPages(Math.ceil(filteredProducts.length / itemsPerPage));
    }
  }, [filteredProducts, isSearchActive]);

  if (loading) {
    return (
      <div className="grid place-content-center min-h-screen">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-2 border-cyan-400 mb-4"></div>
          <p className="text-white text-2xl font-bold animate-pulse">
            Cargando productos...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="w-full 
       text-white px-6 md:px-12 py-8 flex
       flex-col sm:flex-row 
       items-center gap-8 mb-12 "> 
  
        <h2 className="text-black
          text-3xl sm:text-4xl lg:text-5xl     
          font-bold uppercase tracking-wide
          flex-grow                           
          leading-tight text-center sm:text-left "> 
          Descubre la selección que tenemos para ti
        </h2>

        {allProducts.length > 0 && (
          <div className="w-full flex-grow "> 
             {/* Buscador de productos */}
          <ProductSearchBar
            products={allProducts}
            onFilteredProducts={handleFilteredProducts}
          />
          </div>
        )}
      </div>      
      {allProducts.length > 0 ? (
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-12">
          
          {/* --- BARRA LATERAL (SIDEBAR) DE CATEGORÍAS --- */}
          <aside className="w-full lg:w-1/4 xl:w-1/5 flex-shrink-0">
            <h3 className="text-2xl font-bold uppercase tracking-wider mb-4 text-gray-800 dark:text-gray-200">
              CATEGORÍA
            </h3>
            <nav className="space-y-2">
              {/* Botón "Todos los productos" */}
              <button
                onClick={() => setSelectedCategory(null)}
                className={`flex justify-between items-center
                   w-full text-left font-bold ${
                  selectedCategory === null
                    ? "text-gray-400 dark:text-cyan-400 rounded-2xl text-xl w-full bg-[#d4efef] px-4 border-2 border-[#23c1de] placeholder-gray-400 focus:outline-none focus:border-[#23c1de] focus:ring-2   focus:ring-[#23c1de] transition-all duration-300 shadow-xl "
                    : "text-gray-400 dark:text-gray-300 hover:text-black dark:hover:text-white "
                }`}
              >
                <span>Todos los productos ({allProducts.length})</span>
              </button>
              
              {/* Línea decorativa para la categoría activa */}
              <div className={`pl-4 border-l-2 ${selectedCategory === null ? 'border-cyan-400' : 'border-transparent'}`}>
              </div>

              {/* Mapeo de Categorías Dinámicas */}
              {categories.map(category => (
                <div
                  key={category}
                  className={`pl-4 border-l-2 ${
                    selectedCategory === category ? 'border-cyan-400' : 'border-transparent'
                  }`}
                >
                  <button
                    onClick={() => setSelectedCategory(category)}
                    className={`block w-full text-left ${
                      selectedCategory === category
                        ? "text-gray-900 dark:text-white font-semibold"
                        : "text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white"
                    }`}
                  >
                    {category} ({categoriesWithCounts[category]})
                  </button>
                  {/* Aquí puedes añadir lógica de subcategorías si la tienes */}
                </div>
              ))}
            </nav>
          </aside>
      <div className="flex-grow w-full lg:w-0"> 
            {currentProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8  px-30 items-center">
                {currentProducts.map((producto) => (
                  <ProductCard
                    producto={producto}
                    key={producto.id || producto.nombre}
                  />
                ))}
              </div>
            ) : isSearchActive ? (
              <div className="text-gray-600 dark:text-gray-300 text-center py-16">
                <div className="bg-gray-100 dark:bg-gray-800/50 rounded-2xl p-12 max-w-lg mx-auto">
                  <h3 className="text-2xl font-bold mb-3">No se encontraron productos</h3>
                  <p className="text-gray-500 dark:text-gray-300 text-lg">
                    Intenta con otros términos de búsqueda o{" "}
                    <button
                      onClick={() => {
                        setFilteredProducts(allProducts);
                        setIsSearchActive(false);
                      }}
                      className="text-cyan-500 dark:text-cyan-400 hover:underline font-semibold"
                    >
                      ver todos los productos
                    </button>
                  </p>
                </div>
              </div>
            ) : (
              /* Mensaje "No hay productos" */
              <div className="text-center py-12">
                <p className="text-gray-500 dark:text-gray-400 text-xl">
                  No hay productos disponibles
                </p>
              </div>
            )}
          {/* Paginación - Solo mostrar si no estamos buscando y hay múltiples páginas */}
          {(totalPages > 1) && !isSearchActive && (
          <>
            <div className="flex justify-center items-center mt-10 space-x-2 sm:space-x-4"> 
               <button
                aria-label="Página anterior"
                title="Página anterior"
                onClick={goLeft}
                disabled={!canGoLeft}
                className={`px-2 py-1 transition-colors duration-200 cursor-pointer ${
                  canGoLeft
                    ? "text-blue-900 hover:text-blue-700" 
                    : "text-gray-400 cursor-not-allowed"
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                </svg>
              </button>

              <div className="flex items-center space-x-1 sm:space-x-2"> 
                  {Array.from({ length: totalPages }, (_, i) => (
                    <button
                      key={i}
                      aria-label={`Ir a la página ${i + 1}`}
                      title={`Ir a la página ${i + 1}`}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`
                        w-8 h-8 sm:w-10 sm:h-10   {/* Size */}
                        rounded-full             {/* Shape */}
                        flex items-center justify-center 
                        text-[20px] font-semibold 
                        transition-colors duration-200 cursor-pointer
                        ${
                          i === (currentPage - 1)
                            ? "bg-blue-900 text-white" 
                            : "bg-transparent text-blue-900 hover:bg-blue-100"
                        }
                      `}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
              <button
                  aria-label="Página siguiente"
                  title="Página siguiente"
                  onClick={goRight}
                  disabled={!canGoRight}
                  className={`px-2 py-1 transition-colors duration-200 cursor-pointer  ${
                    canGoRight
                      ? "text-blue-900 hover:text-blue-700" 
                      : "text-gray-400 cursor-not-allowed"
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                  </svg>
                </button>
              </div>

            {/* Paginación - Solo mostrar si conocemos el número total de páginas */}
            {totalPages > 1 && (
                  <div className="flex justify-center mt-6 space-x-2">
                    {Array.from({ length: totalPages }, (_, i) => (
                      <button
                        key={i}
                        aria-label={`Ir a la página ${i + 1}`}
                        title={`Ir a la página ${i + 1}`}
                        onClick={() => setCurrentPage(i + 1)} 
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                          i === (currentPage - 1) 
                            ? "bg-gray-800 dark:bg-white" 
                            : "bg-gray-300 dark:bg-white/30 hover:bg-gray-400 dark:hover:bg-white/50" // Color inactivo
                        }`}
                      />
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      ) : (

        <div className="text-white text-center py-16">
          <div className="bg-gray-800/50 rounded-2xl p-12 max-w-lg mx-auto">
            <svg
              className="w-20 h-20 text-gray-400 mx-auto mb-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
              />
            </svg>
            <h3 className="text-2xl font-bold mb-3">
              No hay productos disponibles
            </h3>
            <p className="text-gray-300 text-lg">
              Intenta recargar la página o contacta al administrador
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
