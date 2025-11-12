import { useEffect } from "react";
import { buildImageUrl, getImageTitle } from "../../utils/imageHelpers";
import { motion } from "framer-motion";
import Emergente from "./Emergente";
import { FaCheck } from "react-icons/fa6";
import type { Product } from "../../models/Product";
import { insertJsonLd } from "../../utils/schema-markup-generator";

interface ProductoPageProps {
  data: Product;
}

const ProductoPage = ({ data }: ProductoPageProps) => {
  if (!data)
    return (
      <p className="grid min-h-screen place-content-center text-5xl font-extrabold animate-pulse bg-blue-200">
        Cargando...
      </p>
    );
  //insertJsonLd("product", {data});

  useEffect(() => {
    insertJsonLd("product", { data });
  }, [data]);

  if (!data)
    return (
      <p className="grid min-h-screen place-content-center text-5xl font-extrabold animate-pulse bg-blue-200">
        Cargando...
      </p>
    );

  return (
    <div className="w-full">
      {/* el componente emergente genera el siguiente error por consola: Minified React error #418 */}
      <Emergente producto={data} />
    <div className="relative w-full h-[900px]">
      {/* Banner principal */}
      <img
        id="product-img"
        src={
          data.imagenes &&
          data.imagenes.length > 0 &&
          data.imagenes[0]?.url_imagen
            ? buildImageUrl(data.imagenes[0].url_imagen) ?? undefined
            : buildImageUrl(data.imagen_principal) ?? undefined
        }
        alt={
          data.imagenes &&
          data.imagenes.length > 0 &&
          data.imagenes[0]?.texto_alt_SEO
            ? data.imagenes[0].texto_alt_SEO
            : "Banner de " + data.titulo
        }
        title={getImageTitle(
          data.imagenes[0] || data.imagen_principal,
          "Banner de " + data.titulo
        )}
        className="absolute inset-0 w-full h-full object-cover"
      />
       <div className="absolute inset-0  flex flex-col justify-center items-center text-center">
                
                <h1
                    className="
                        text-[80px] text-white font-black 
                        Montserrat 
                        [--stroke-color:#2DCCFF] 
                        [paint-order:stroke_fill] 
                        [-webkit-text-stroke:2px_var(--stroke-color)]
                        [text-shadow:4px_4px_0px_rgba(0,0,0,0.4)]
                        mb-0 leading-none
                    "
                >
                    {data.titulo}
                </h1>
            </div>

      </div>      
      <div className="bg-[#98d8df] p-2"></div>

      {/* Sección de Especificaciones */}
      <div className="bg-white py-12 lg:py-10">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-9 lg:gap-18 items-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <div className="order-0 h-full text-black text-center lg:text-left flex flex-col justify-center items-center lg:items-start px-4 sm:px-0 ">
              <h2 className="px-20 text-xl sm:text-xl lg:text-4xl font-semibold mb-18 text-center text-[#203565]  lg:text-left">
                ESPECIFICACIONES
              </h2>
              <div className="space-y-12 px-20">
                {Object.entries(data.especificaciones)
                  .filter(([key]) => key.startsWith("spec"))
                  .map(([key, value]) => (
                    <div key={key} className="flex items-center gap-3 bg-[#e2f6f6] rounded-xl shadow-md p-4">
                      <div className="flex-shrink-0 mt-1 ">
                        <FaCheck className="text-[#203565] text-xl sm:text-2xl" />
                      </div>
                      <p className="text-lg sm:text-xl lg:text-2xl font-semibold  leading-relaxed">
                        {String(value)}
                      </p>
                    </div>
                  ))}
              </div>
            </div>

            <div className="mx-auto max-w-4xl rounded-4xl max-w-md lg:max-w-full aspect-[1/1] overflow-hidden flex items-center justify-center ">
              <img
                id="product-viewer"
                src={
                  data.imagenes &&
                  data.imagenes.length > 1 &&
                  data.imagenes[1]?.url_imagen
                    ? buildImageUrl(data.imagenes[1].url_imagen) ?? undefined
                    : buildImageUrl(data.imagen_principal) ?? undefined
                }
                alt={
                  data.imagenes &&
                  data.imagenes.length > 1 &&
                  data.imagenes[1]?.texto_alt_SEO
                    ? data.imagenes[1].texto_alt_SEO
                    : "Especificaciones de " + data.titulo
                }
                title={getImageTitle(
                  data.imagenes[1] || data.imagen_principal,
                  "Especificaciones de " + data.titulo
                )}
                className="w-full h-full rounded-2xl object-cover"
              />
            </div>

            
          </motion.div>
        </div>
      </div>

      {/* Sección de Información */}
      <div className="bg-[#e2f6f6] py-12 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-4xl font-semibold text-blue-950 mb-8">
            INFORMACIÓN
          </h2>
          <p className="text-lg sm:text-xl lg:text-2xl text-gray-700 leading-relaxed font-medium">
            {data.descripcion}
          </p>
        </div>
      </div>

      {/* Sección de Beneficios */}
      <div className="bg-white h-full py-12 lg:py-20">
        <div className="h-full mx-auto sm:px-6 lg:px-9 ">
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-9 lg:gap-18 items-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <div className=" w-full h-full lg:w-2xl order-1 text-black text-center lg:text-left flex flex-col justify-center items-center lg:items-start px-4 sm:px-0 ">
              <h2 className=" text-2xl sm:text-4xl lg:text-4xl text-[#203565] font-semibold mb-6 text-center lg:text-left lg:p-10">
                BENEFICIOS:
              </h2>
              <div className="space-y-12 w-full ">
                {Object.entries(data.especificaciones)
                  .filter(([key]) => key.toLowerCase().startsWith("beneficio"))
                  .map(([key, value]) => (
                    <div key={key} className="flex items-center gap-6 bg-[#e2f6f6] rounded-xl shadow-md p-4">
                      <div className="flex-shrink-0 mt-1">
                        <FaCheck className="text-[#203565] text-xl sm:text-2xl" />
                      </div>
                      <p className="text-lg sm:text-xl lg:text-2xl font-medium leading-relaxed text-gray-800">
                        {String(value)}
                      </p>
                    </div>
                  ))}
              </div>
            </div>

            <div className="w-full sm:px-6 lg:px-40 lg:max-w-1xl ">
              <div className="lg:w-auto 
               aspect-[3/4] bg-white rounded-3xl 
               overflow-hidden shadow-2xl transform
                hover:scale-105 transition-transform duration-300">                 
               <img
                    src={
                      data.imagenes &&
                      data.imagenes.length > 2 &&
                      data.imagenes[2]?.url_imagen
                        ? buildImageUrl(data.imagenes[2].url_imagen) ?? ""
                        : buildImageUrl(data.imagen_principal) ?? ""
                    }
                    alt={"Beneficios de " + data.titulo}
                    title={getImageTitle(
                      data.imagenes[2] || data.imagen_principal,
                      "Beneficios de " + data.titulo
                    )}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 blur-xl opacity-60 -z-10"></div>
              
            </div>
          </motion.div>
        </div>
      </div>

      {/* Call To Action */}
      <div className="bg-[#e2f6f6] py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#203565] mb-8">
              ¿ENCONTRASTE LO QUE BUSCABAS?
            </h2>
            <a
              href="/contact"
              className="inline-block bg-[#203565] hover:from-cyan-500 hover:to-cyan-700 
              text-white font-bold text-xl sm:text-2xl lg:text-3xl 
              px-12 sm:px-16 lg:px-20 py-4 sm:py-5 lg:py-6 
              rounded-3xl transition-all duration-300 transform 
              hover:scale-105 hover:shadow-2xl hover:shadow-[#203565] 
              relative overflow-hidden group"
            >
              <span className="relative z-10">¡COTIZA AHORA!</span>
              <div className="absolute inset-0 bg-gradient-to-r 
              from-transparent via-white/20 to-transparent 
              -translate-x-full group-hover:translate-x-full 
              transition-transform duration-1000"></div>
            </a>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProductoPage;
