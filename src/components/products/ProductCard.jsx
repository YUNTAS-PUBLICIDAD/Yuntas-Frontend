const ProductCard = ({ producto }) => {
    console.log('🎴 ProductCard recibió producto:', producto);
    
    // Determinar la imagen a mostrar (API v1 usa different structure)
    const imagenUrl = producto.image || producto.images?.[0] || (producto.imagenes?.[0]?.url_imagen);
    const imagenAlt = producto.title || producto.imagenes?.[0]?.texto_alt_SEO || "Imagen de prueba";
    
    console.log('🖼️ Imagen URL calculada:', imagenUrl);
    
    // Determinar el título a mostrar
    const titulo = producto.title || producto.titulo;
    
    console.log('📝 Título calculado:', titulo);
    
    // Usar el link del producto directamente (viene de la base de datos)
    const link = producto.link;
    
    console.log('🔗 Link del producto:', link);
    
    // Determinar la URL base para las imágenes (local vs desplegada)
    // const isLocalDev = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    // const imageBaseUrl = isLocalDev ? 'http://127.0.0.1:8000' : 'https://apiyuntas.yuntaspublicidad.com';
    // Forzar siempre la URL de producción para las imágenes
    const imageBaseUrl = 'https://apiyuntas.yuntaspublicidad.com';
    
    // ProductCard modificado para coincidir con el estilo de la imagen
// ProductCard con el nombre fuera de la card
// ProductCard modificado para coincidir con el estilo de la imagen
// ProductCard con el nombre fuera de la card
return (
  <a
    href={`/products/producto/?link=${link}`}
    className="relative flex flex-col items-center hover:scale-105 transition-all duration-200 cursor-pointer group mb-8"
  >
    {/* Contenedor principal con dimensiones fijas */}
    <div className="relative w-[280px] bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl overflow-hidden border border-gray-700">
      
      {/* Imagen del producto */}
      <div className="h-[200px] w-[280px] overflow-hidden">
        {imagenUrl ? (
          <img
            className="w-full h-full object-cover object-center"
            src={`${imageBaseUrl}${imagenUrl.startsWith('/') ? '' : '/'}${imagenUrl}`}
            alt={imagenAlt}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
            <p className="text-white text-xl font-bold">Sin imagen</p>
          </div>
        )}
      </div>
    </div>
    {/* Título en la parte inferior */}
      <div className="p-4 mt-2">
        <p className="text-white text-center text-sm font-semibold leading-tight">
          {titulo || "Producto sin título"}
        </p>
      </div>

  </a>
);
};

export default ProductCard;
