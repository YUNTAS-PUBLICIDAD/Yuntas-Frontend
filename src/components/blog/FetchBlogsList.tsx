import { useEffect, useState } from "react";
import BlogCard from "../../components/blog/BlogCard.tsx";
import BlogSearchBar from "../../pages/blogs/_SearchBar.tsx";
import {config} from "../../../config";
interface Blog {
  id: number;
  nombre_producto: string;
  subtitulo: string;
  imagen_principal: string;
  text_alt_principal: string;
  link: string;
  imagenes?: { ruta_imagen: string; texto_alt: string }[];
  parrafos?: { parrafo: string }[];
}

export default function FetchBlogsList() {
  const [allBlogs, setAllBlogs] = useState<Blog[]>([]);
  const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [totalPages, setTotalPages] = useState(1);
  const [totalBlogs, setTotalBlogs] = useState(0);
  const [isSearchActive, setIsSearchActive] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024 && window.innerWidth >= 640) {
        setItemsPerPage(6); // Para 2x3 layout en tablets
      } else {
        setItemsPerPage(6); // Para desktop o móvil
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
        let allFetchedBlogs: Blog[] = [];
        let currentPageToFetch = 1;
        let hasMorePages = true;

        // Obtener todos los blogs de todas las páginas
        while (hasMorePages) {
          const timestamp = new Date().getTime();
          //Se uso el config global
          const apiUrl = `${config.apiUrl}${config.endpoints.blogs.list}?page=${currentPageToFetch}&perPage=50&_t=${timestamp}`;

          const response = await fetch(apiUrl, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
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

              // Verificar si hay más páginas
              const lastPage = jsonResponse.data?.last_page || 1;
              if (currentPageToFetch < lastPage) {
                currentPageToFetch++;
              } else {
                hasMorePages = false;
              }
            } else {
              hasMorePages = false;
            }
          } else {
            hasMorePages = false;
          }
        }

        console.log("Todos los blogs obtenidos:", allFetchedBlogs.length);

        setAllBlogs(allFetchedBlogs);
        setFilteredBlogs(allFetchedBlogs);
        setTotalBlogs(allFetchedBlogs.length);

        // Calcular páginas para mostrar
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

  // Manejar blogs filtrados desde el buscador
  const handleFilteredBlogs = (blogs: Blog[]) => {
    setFilteredBlogs(blogs);
    setIsSearchActive(
      blogs.length !== allBlogs.length ||
        (blogs.length === 0 && allBlogs.length > 0)
    );
    setCurrentIndex(0); // Resetear a página 1 cuando se filtra
  };

  // Obtener blogs para la página actual
  const getCurrentPageBlogs = (): Blog[] => {
    if (isSearchActive) {
      // Si estamos buscando, mostrar todos los resultados filtrados
      return filteredBlogs;
    } else {
      // Si no estamos buscando, mostrar paginado
      const startIndex = currentIndex * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      return filteredBlogs.slice(startIndex, endIndex);
    }
  };

  const currentBlogs = getCurrentPageBlogs();

  const hasMorePages = () => {
    return (
      !isSearchActive &&
      (currentBlogs.length === itemsPerPage || currentIndex < totalPages - 1)
    );
  };

  const canGoLeft = currentIndex > 0 && !isSearchActive;
  const canGoRight =
    hasMorePages() && currentIndex < totalPages - 1 && !isSearchActive;

  const goLeft = () => {
    if (canGoLeft) setCurrentIndex(currentIndex - 1);
  };

  const goRight = () => {
    if (canGoRight) setCurrentIndex(currentIndex + 1);
  };

  // Actualizar total de páginas cuando cambian los blogs filtrados
  useEffect(() => {
    if (!isSearchActive) {
      setTotalPages(Math.ceil(filteredBlogs.length / itemsPerPage));
    }
  }, [filteredBlogs, isSearchActive, itemsPerPage]);

  if (loading) {
    return (
      <div className="min-h-screen grid place-content-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-2 border-cyan-400 mb-4"></div>
          <p className="text-white text-2xl font-bold mb-2">
            Cargando blogs...
          </p>
        </div>
      </div>
    );
  }

  return (
  
    <div className="min-h-screen py-16 ">
      {/* Header */}
      <div className="w-full bg-[#2DCCFF]
       text-white px-6 md:px-12 py-8 flex 
       items-center gap-8 mb-12 shadow-md"> 
  
        <h2 className="text-white px-25 text-5xl md:text-5xl font-bold uppercase tracking-wide flex-1 leading-tight"> 
          DESCUBRE MÁS SOBRE NUESTROS PRODUCTOS
        </h2>

        {allBlogs.length > 0 && (
          <div className="w-full max-w-[614px] pr-50 "> {/* Limit the width of the search bar */}
            <BlogSearchBar blogs={allBlogs} onFilteredBlogs={handleFilteredBlogs} />
          </div>
        )}
      </div>
      {/* Cards Container */}
      <div className="w-full mx-auto px-6 relative ">
        <div className="overflow-hidden ">
          <div
            className="w-full transition-transform duration-500 ease-in-out  "
            style={{ transform: `translateX(0%)` }}
          >
            {currentBlogs.length > 0 ? (
              <>
                {/* Layout 2x3 para sm y md */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 place-items-center lg:hidden ">
                  {currentBlogs.map((blog) => (
                    <div
                      key={blog.id}
                      className="group transform transition-all duration-300 shadow-lg "
                    >
                      <div className="rounded-2xl p-1">
                        <div className="w-full max-w-[320px] mx-auto bg-gradient-to-br from-white/5 to-white/10 rounded-xl overflow-hidden">
                          <BlogCard blog={blog} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Layout 3 arriba + 3 abajo para ≥1024px */}
                <div className="hidden lg:block space-y-8">
                  <div className="grid grid-cols-3 gap-8 justify-items-center ">
                    {currentBlogs.slice(0, 3).map((blog) => (
                      <div
                        key={blog.id}
                        className="group transform transition-all w-[500px] h-[400px] duration-300  shadow-lg"
                      >
                        <div className="rounded-2xl p-1">
                          <div className="w-full  mx-auto bg-gradient-to-br from-white/5 to-white/10 rounded-xl overflow-hidden">
                            <BlogCard blog={blog} />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {currentBlogs.length > 3 && !isSearchActive && (
                    <div className="hidden lg:block space-y-8 py-4  ">
                      <div className="grid grid-cols-3 gap-8  justify-items-center ">
                        {currentBlogs.slice(3, 6).map((blog) => (
                          <div
                            key={blog.id}
                            className="group transform transition-all w-[500px] h-[400px] duration-300  shadow-lg "
                          >
                            <div className="rounded-2xl p-1">
                              <div className="w-full mx-auto bg-gradient-to-br from-white/5 to-white/10 rounded-xl overflow-hidden ">
                                <BlogCard blog={blog} />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Mostrar todos los blogs filtrados en búsqueda */}
                  {isSearchActive && currentBlogs.length > 3 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
                      {currentBlogs.slice(3).map((blog) => (
                        <div
                          key={blog.id}
                          className="group transform transition-all duration-300 justify-self-center"
                        >
                          <div className="rounded-2xl p-1">
                            <div className="w-full max-w-[320px] mx-auto bg-gradient-to-br from-white/5 to-white/10 rounded-xl overflow-hidden">
                              <BlogCard blog={blog} />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </>
            ) : isSearchActive ? (
              /* Mensaje cuando no hay resultados de búsqueda */
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
                      d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                    />
                  </svg>
                  <h3 className="text-2xl font-bold mb-3">
                    No se encontraron blogs
                  </h3>
                  <p className="text-gray-300 text-lg">
                    Intenta con otros términos de búsqueda o{" "}
                    <button
                      onClick={() => {
                        setFilteredBlogs(allBlogs);
                        setIsSearchActive(false);
                      }}
                      className="text-cyan-400 hover:text-cyan-300 underline font-semibold transition-colors"
                    >
                      ver todos los blogs
                    </button>
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-white/70 text-xl">
                  No hay blogs disponibles
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Navegación - Solo mostrar si no estamos buscando */}
        {(totalPages > 1 || hasMorePages()) && !isSearchActive && (
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
                      onClick={() => setCurrentIndex(i)}
                      className={`
                        w-8 h-8 sm:w-10 sm:h-10   {/* Size */}
                        rounded-full             {/* Shape */}
                        flex items-center justify-center 
                        text-[20px] font-semibold 
                        transition-colors duration-200 cursor-pointer
                        ${
                          i === currentIndex
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
                    onClick={() => setCurrentIndex(i)}
                    className={`w-3 h-3 rounded-full transition-all duration-300  ${
                      i === currentIndex
                        ? "bg-white"
                        : "bg-white/30 hover:bg-white/50"
                    }`}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
