/**
 * Componente Slider Versión mejorada con CSS Scroll Snap
 *
 * Utiliza las propiedades de CSS Scroll Snap para un deslizamiento fluido y preciso.
 */
import { useState, useEffect, useRef } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

interface Props {
  comentarios: {
    id: number;
    nombre: string;
    estrellas: number;
    comentario: string;
    publicado: string;
  }[];
}

const CommentSlider = ({ comentarios }: Props) => {
  const sliderRef = useRef<HTMLDivElement | null>(null);
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
  const handleNavigation = (direction: string) => {
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
    <div className="relative w-full max-w-7xl mx-auto">
      {/* Contenedor principal del slider */}
      <div
        ref={sliderRef}
        style={{ scrollbarWidth: 'none' }}
        className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth pt-12"
      >
        {comentarios.map((comentario) => (
          // 4. Cada tarjeta es ahora un item del slider
          <div
            key={comentario.id}
            className="flex-shrink-0 w-full md:w-1/3 snap-center box-border relative p-4"
          >
            <div className="w-28 h-28 flex justify-center items-center bg-[#203565] text-white rounded-full absolute -top-12 left-1/2 -translate-x-1/2 z-30 text-4xl font-semibold">
              {comentario.nombre.charAt(0)}
            </div>

            {/* El contenido de la tarjeta no cambia */}
            <div className="h-[397px] bg-white text-black rounded-3xl p-8 pb-6 shadow-lg flex flex-col justify-between">
              <div className="flex flex-col items-center justify-center gap-10 h-full ">
                <div className="space-y-1">
                  <p className="text-xl font-semibold text-center">{comentario.nombre}</p>
                  <div className="flex justify-center space-x-1 text-yellow-300">
                    {Array.from({ length: comentario.estrellas }).map((_, i) => (
                      <svg
                        key={`star-${comentario.id}-${i}`}
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 fill-current"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 15l-5.878 3.09 1.122-6.545L.488 6.91l6.561-.955L10 0l2.951 5.955 6.561.955-4.756 4.635 1.122 6.545z" />
                      </svg>
                    ))}

                  </div>
                </div>
                <p className="mt-2 font-semibold text-xl text-center text-[#1D1D1DB2]">{comentario.comentario}</p>
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

export default CommentSlider;