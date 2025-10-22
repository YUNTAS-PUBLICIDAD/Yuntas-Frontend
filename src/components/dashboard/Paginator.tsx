/**
 * @file Paginator.tsx
 * @description Componente de paginación para la tabla de clientes.
 * Componente reutilizable que permite la navegación entre páginas de datos.
 */

const Paginator = ({
  currentPage, // Página actual
  totalPages, // Total de páginas
  onPageChange, // Función para manejar el cambio de página
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) => {
  return (
    <div className="flex justify-center items-center mt-4 gap-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-blue-950 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Anterior
      </button>
      <div className="flex gap-1">
        {Array.from({ length: totalPages }, (_, i) => {
          const pageNum = i + 1;
          return (
            <button
              key={pageNum}
              onClick={() => onPageChange(pageNum)}
              className={`px-3 py-2 rounded-md ${
                currentPage === pageNum
                  ? "bg-blue-950 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {pageNum}
            </button>
          );
        })}
      </div>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 bg-blue-950 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Siguiente
      </button>
    </div>
  );
};

export default Paginator;
