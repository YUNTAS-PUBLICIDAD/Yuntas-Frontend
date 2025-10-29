/**
 * Componente Slider Versión mejorada con CSS Scroll Snap
 *
 * Utiliza las propiedades de CSS Scroll Snap para un deslizamiento fluido y preciso.
 */
import { useState, useEffect, useRef } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const Slider = ({ comentarios }) => {
  const sliderRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);

  // 1. Detectar si es móvil para cambiar la lógica
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 2. Lógica para los botones de navegación
  const handleNavigation = (direction) => {
    if (sliderRef.current) {
      const slider = sliderRef.current;
      // clientWidth nos da el ancho visible del contenedor del slider
      const scrollAmount = slider.clientWidth;
      
      if (direction === "next") {
        slider.scrollBy({ left: scrollAmount, behavior: "smooth" });
      } else {
        slider.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      }
    }
  };
  
  // 3.Deshabilitar flechas cuando se llega al final
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const checkScrollPosition = () => {
      const { scrollLeft, scrollWidth, clientWidth } = slider;
      setIsAtStart(scrollLeft === 0);
      // Usamos un pequeño margen de 1px para evitar errores de redondeo
      setIsAtEnd(scrollLeft + clientWidth >= scrollWidth - 1);
    };

    slider.addEventListener('scroll', checkScrollPosition);
    checkScrollPosition(); 
    
    return () => slider.removeEventListener('scroll', checkScrollPosition);
  }, [isMobile]); 

  const itemsPerPage = isMobile ? 1 : 3;

  return (
    <div className="flex w-full max-w-7xl mx-auto  py-2">
      {/* Contenedor principal del slider */}
      <div
        ref={sliderRef}
        style={{scrollbarWidth: 'none'}}
        className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-hide pt-6"
      >
        {comentarios.map((comentario) => (
          // 4. Cada tarjeta es ahora un item del slider
          <div
            key={comentario.id}
            className="flex-shrink-0 w-full md:w-1/3 snap-center p-3 box-border relative"

          >
            <div className="w-16 h-16 flex justify-center items-center bg-black text-white rounded-full absolute -top-5 left-[42%] z-10">
              {comentario.nombre.charAt(0)}
            </div>

            {/* El contenido de la tarjeta no cambia */}

            <div className="h-80 bg-white text-black rounded-2xl p-8 shadow-lg flex flex-col justify-between">
              <div className="space-y-5">
                {/* <div className="flex items-center gap-4">
                  <div className="w-10 h-10 flex justify-center items-center bg-black text-white rounded-full">
                    {comentario.nombre.charAt(0)}
                  </div>
                  <p className="text-lg font-semibold">{comentario.nombre}</p>
                </div> */}
                <div className="mt-8">
                  <p className="text-lg font-semibold text-center">{comentario.nombre}</p>
                  <p className="text-center text-yellow-500">
                    {"⭐".repeat(comentario.estrellas)}
                  </p>
                </div>
                <p className="mt-2 text-lg">{comentario.comentario}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 italic mt-4 text-end">
                  Publicado: {comentario.publicado}
                </p>
                
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 5. Flechas de navegación (se ocultan si no son necesarias) */}
      {!isAtStart && (
        <button
          onClick={() => handleNavigation("prev")}
          className="absolute top-1/2 left-0 -translate-y-1/2 p-2 m-2 bg-black rounded-full text-white cursor-pointer z-20"
          aria-label="Ir a la lista anterior"
        >
          <FaArrowLeft className="size-4 md:size-6" />
        </button>
      )}
      {!isAtEnd && (
        <button
          onClick={() => handleNavigation("next")}
          className="absolute top-1/2 right-0 -translate-y-1/2 p-2 m-2 bg-black rounded-full text-white cursor-pointer z-20"
          aria-label="Ir a la lista siguiente"
        >
          <FaArrowRight className="size-4 md:size-6" />
        </button>
      )}
    </div>
  );
};

export default Slider;