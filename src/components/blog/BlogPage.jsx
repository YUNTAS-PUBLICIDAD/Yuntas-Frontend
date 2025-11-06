import { useEffect } from "react";
import useBlogSEO from "../../hooks/useBlogSEO";
import { buildImageUrl, getImageTitle } from "../../utils/imageHelpers";
import { insertJsonLd } from "../../utils/schema-markup-generator";

export default function BlogPage({ article }) {
  useBlogSEO(article);

  useEffect(() => {
    insertJsonLd("blog", article);
  }, [article]);

  if (!article) {
    return (
      <div className="grid min-h-screen place-content-center text-center bg-red-100">
        <p className="text-3xl font-bold text-red-700">
          Error: No se recibieron los datos del artículo.
        </p>
      </div>
    );
  }

  const getEmbeddedVideoUrl = (url) => {
    if (!url) return null;
    try {
      const parsedUrl = new URL(url);
      if (parsedUrl.hostname.includes("youtube.com") && parsedUrl.searchParams.get("v")) {
        return `https://www.youtube.com/embed/${parsedUrl.searchParams.get("v")}`;
      }
      if (parsedUrl.hostname === "youtu.be") {
        const id = parsedUrl.pathname.replace("/", "").split("?")[0];
        return `https://www.youtube.com/embed/${id}`;
      }
      if (parsedUrl.pathname.startsWith("/shorts/")) {
        const id = parsedUrl.pathname.split("/shorts/")[1].split("?")[0];
        return `https://www.youtube.com/embed/${id}`;
      }
      return url;
    } catch {
      return null;
    }
  };

  return (
    <>
      {/* ======= HERO ======= */}
      <section className="relative">
        <div className="absolute inset-0 bg-black/40"></div>
        {article.imagen_principal ? (
          <img
            src={buildImageUrl(article.imagen_principal)}
            alt={article.nombre_producto || "Imagen principal del blog"}
            title={getImageTitle(article.imagen_principal, "Imagen principal del blog")}
            className="w-full max-h-[100vh] object-cover"
          />
        ) : (
          <div className="w-full h-[50vh] flex items-center justify-center bg-gray-200 text-gray-500">
            Sin imagen disponible
          </div>
        )}

        {/* Título sobrepuesto */}
        <div className="absolute top-0 right-0 h-full flex items-center justify-end w-full px-6 md:px-12">
          <h2
            className="text-stroke-blue text-[#FEFEFF] font-bold text-right whitespace-pre-line text-[45px] sm:text-[60px] md:text-[80px] lg:text-[95px] leading-[0.9] font-montserrat drop-shadow-lg uppercase"
            style={{ verticalAlign: "middle" }}
          >
            {(article.nombre_producto || "").split(" ").length >= 2
              ? article.nombre_producto.split(" ").join("\n")
              : article.nombre_producto}
          </h2>
        </div>
      </section>

      {/* Franja azul */}
      <div className="w-full h-3 bg-[#98D8DF]" />

      {/* ======= CONTENIDO PRINCIPAL ======= */}
      <section className="bg-[#F7FAFB] text-[#1A1A1A] font-montserrat">
        <div className="relative z-10 w-full mx-auto px-4 sm:px-6 md:px-8 lg:px-0">

          {/* === ENCABEZADO === */}
          <div className="text-center mb-10 py-12 px-2">
            <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-extrabold mb-4 leading-tight max-w-[1100px] mx-auto">
              {article.subtitulo}
            </h1>
          </div>

          {/* === BLOQUE 1: TEXTO + IMAGEN === */}
          <div className="flex flex-col md:flex-row gap-0 mb-8 h-auto md:h-[500px]">
            {/* Texto celeste */}
            <div className="flex-1 bg-[#E2F6F6] shadow-lg p-6 sm:p-8 flex items-center justify-center">
              <div className="max-w-xl text-center md:text-left">
                <div
                  className="text-lg md:text-xl text-[#1A1A1A] mb-4"
                  dangerouslySetInnerHTML={{ __html: article.descripcion }}
                />
                <div
                  className="text-base md:text-lg text-[#1A1A1A]"
                  dangerouslySetInnerHTML={{
                    __html: article.parrafos && article.parrafos[0]?.parrafo,
                  }}
                />
              </div>
            </div>

            {/* Imagen — solo visible en desktop */}
            {article.imagenes?.[0] && (
              <div className="hidden md:flex flex-1 items-stretch">
                <img
                  src={buildImageUrl(article.imagenes[0].ruta_imagen)}
                  alt={article.imagenes[0].texto_alt || "Imagen del blog"}
                  className="shadow-lg w-full h-[300px] md:h-full object-cover object-center"
                />
              </div>
            )}
          </div>

          {/* === BLOQUE 2: IMAGEN CIRCULAR + TEXTO === */}
          <div className="relative flex flex-col md:flex-row items-center justify-center md:justify-between gap-8 md:gap-16 mb-8 h-auto md:h-[550px]">
            {/* Imagen rectangular solo para mobile */}
            {article.imagenes?.[0] && (
              <div className="block md:hidden w-full">
                <img
                  src={buildImageUrl(article.imagenes[0].ruta_imagen)}
                  alt={article.imagenes[0].texto_alt || 'Imagen del blog'}
                  className="w-full h-[250px] sm:h-[300px] object-cover rounded-lg shadow-md"
                />
              </div>
            )}

            {/* Imagen circular flotante */}
            {article.imagenes?.[1] && (
              <div
                className="
                  relative md:static
                  -mt-[90px] sm:-mt-[110px] md:mt-0
                  flex justify-center md:justify-end flex-1 z-10
                "
              >
                <img
                  src={buildImageUrl(article.imagenes[1].ruta_imagen)}
                  alt={article.imagenes[1].texto_alt || 'Imagen del blog'}
                  className="
                    rounded-full shadow-lg border-4 border-[#98D8DF]
                    w-[220px] h-[220px]
                    sm:w-[300px] sm:h-[300px]
                    md:w-[420px] md:h-[420px]
                    object-cover transition-all duration-300 bg-white
                  "
                />
              </div>
            )}
            
            {/* Texto */}
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="text-2xl">✨</span> BENEFICIOS CLAVE:
              </h3>

                <div className="flex flex-col gap-4">
                  {[
                    article.parrafos?.[1]?.parrafo,
                    article.parrafos?.[2]?.parrafo,
                    article.parrafos?.[3]?.parrafo
                  ]
                  .filter(item => item) 
                  .map((textoDelItem, index) => (
                    
                    <div 
                      key={index}
                      className="bg-[#e0f7fa] rounded-xl p-4 shadow-lg flex items-center gap-3"
                    >
                      <div className="flex-shrink-0">
                        <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"></path>
                        </svg>
                      </div>
                      
                      <div 
                        className="text-gray-900 font-semibold text-base sm:text-lg"
                        dangerouslySetInnerHTML={{ __html: textoDelItem }}
                      />
                    </div>

                  ))}
                </div>
            </div>
          </div>

          {/* === TESTIMONIO === */}
          <div className="w-full bg-[#23C1DE] text-white font-extrabold italic text-2xl sm:text-3xl md:text-4xl py-6 flex justify-center md:justify-start px-4 md:px-20 mb-0">
            OPINIÓN DE NUESTRO CLIENTE
          </div>

          {/* Imagen + tarjeta */}
          <div className={`relative flex flex-col md:flex-row items-center justify-center w-full 
            py-16 overflow-hidden rounded-none h-auto md:h-[750px]`}
            style={{
              backgroundImage: `url(${buildImageUrl(article.imagenes[2].ruta_imagen)})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="bg-[#00031ECF]/80 absolute inset-0"></div>
            {/* Imagen desplazada */}
            <div className="w-[95%] md:w-[900px] h-[300px] sm:h-[400px] md:h-[500px] flex items-center justify-center rounded-2xl overflow-hidden shadow-lg md:translate-x-[200px]">
              <img
                src={buildImageUrl(article.imagenes[2].ruta_imagen)}
                alt={article.imagenes[2].texto_alt || "Imagen del blog"}
                className="w-full h-full object-cover object-center"
              />
            </div>

            {/* Tarjeta superpuesta */}
            <div className="absolute inset-0 flex items-center justify-center px-4">
              <div className="bg-white border border-[#98D8DF] shadow-xl rounded-2xl p-6 sm:p-8 w-full sm:w-[85%] md:w-[500px] max-w-[520px] md:-translate-x-[180px]">
                <blockquote
                  className="text-[#1A1A1A] text-sm sm:text-base md:text-lg leading-relaxed"
                  dangerouslySetInnerHTML={{
                    __html: article.parrafos && article.parrafos[2]?.parrafo,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Franja separadora */}
      <div className="w-full h-3 bg-[#98D8DF]" />

      {/* ======= SECCIÓN VIDEO ======= */}
      <section className="relative bg-white py-16 sm:py-20 px-4 overflow-hidden">
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0A0A0A] mb-3 uppercase">
              Mira nuestro video
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-[#4B4B4B] max-w-2xl mx-auto">
              Descubre más detalles sobre nuestros productos y servicios
            </p>
          </div>

          <div className="relative bg-black rounded-2xl overflow-hidden shadow-lg border border-gray-200">
            <div className="aspect-video w-full relative">
              {article.url_video ? (
                <iframe
                  src={getEmbeddedVideoUrl(article.url_video)}
                  title="Video"
                  className="absolute inset-0 w-full h-full rounded-2xl"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                  <p className="text-gray-600 text-lg font-medium">
                    Video próximamente
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="mt-10 flex justify-center">
            <a
              href="#contacto"
              className="bg-[#00CFFF] hover:bg-[#00B8E6] text-white font-semibold px-8 sm:px-10 py-3 sm:py-4 rounded-full shadow-md transition duration-300 text-base sm:text-lg"
            >
              ¡Cotiza ahora!
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
