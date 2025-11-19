import { buildImageUrl, getImageTitle } from "../../utils/imageHelpers";

const ProductCard = ({ producto }) => {
  console.log("🎴 ProductCard recibió producto:", producto);

  // 📸 Usar imagen principal (resuelta con helper)
  const imagenUrl = buildImageUrl(producto.imagen_principal);
  const imagenAlt = producto.text_alt_principal || "Imagen del producto";
  const titulo =
    producto.title || producto.titulo || producto.nombre || "Producto sin título";
  const link = producto.link;

  console.log("🖼️ Imagen URL calculada:", imagenUrl);
  console.log("📝 Título calculado:", titulo);
  console.log("🔗 Link del producto:", link);

  const handleClick = (e) => {
    e.preventDefault();
    window.location.href = `/products/${link}`;
  };

  return (
    <a
      href={`/products/${link}`}
      onClick={handleClick}
      className="block max-w-lg flex flex-col w-max-lg items-center 
      hover:scale-105 transition-all duration-200 
      cursor-pointer group mb-7 rounded-xl
      shadow-xl"
      title={titulo}
    >
      {/* Contenedor principal con dimensiones fijas */}
      <div className="block max-w-lg bg-white rounded-t-xl shadow-lg overflow-hidden group mb-2 ">
        {/* Imagen del producto */}
        <div className="relative aspect-[4/3] w-full ">
          {imagenUrl ? (
            <img
              className="w-full h-full object-cover object-center "
              src={imagenUrl}
              alt={imagenAlt}
              title={getImageTitle(imagenUrl, titulo)}
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <p className="text-gray-500 text-xl font-bold">Sin imagen</p>
            </div>
          )}
        </div>
      </div>

      {/* Título en la parte inferior */}
      <div className="p-4   ">
        <p className="text-left text-gray-900 text-sm font-semibold uppercase tracking-wider">
          {titulo}
        </p>
      </div>
    </a>
  );
};

export default ProductCard;
