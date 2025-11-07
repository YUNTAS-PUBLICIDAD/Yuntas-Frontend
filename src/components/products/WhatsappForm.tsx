import { useState, useEffect } from "react";
import { FaImage, FaTimes } from "react-icons/fa";
import { config, getApiUrl } from "../../../config";
import type { Product } from "../../models/Product";
import Swal from "sweetalert2";

interface SeccionWhatsapp {
  imagenPrincipal: File | null;
  vistaPreviaPrincipal: string;
  parrafo1: string;
}

interface FormularioWhatsappProps {
  onSubmit: (formData: FormData) => Promise<void>;
  plantillaId?: number | null;
}

export default function FormularioWhatsapp({
  onSubmit,
  plantillaId = null,
}: FormularioWhatsappProps) {
  const [productoSeleccionado, setProductoSeleccionado] = useState<
    number | null
  >(null);
  const [listaProductos, setListaProductos] = useState<Product[]>([]);
  const [cargando, setCargando] = useState<boolean>(false);
  const [seccionesWhatsapp, setSeccionesWhatsapp] = useState<SeccionWhatsapp[]>([]);
  const selectedProduct = listaProductos.find(
      (producto) => producto.id === productoSeleccionado
    );
  // ✅ Plantilla base vacía para reutilizar
    const SECCIONES_VACIAS: SeccionWhatsapp[] = Array.from({ length: 1 }, () => ({
        imagenPrincipal: null,
        vistaPreviaPrincipal: "",
        parrafo1: "",
    }));

  // Inicializa con secciones vacías
  useEffect(() => {
    setSeccionesWhatsapp(SECCIONES_VACIAS);
  }, []);

  // 🔹 Cargar plantilla del producto seleccionado
  useEffect(() => {
    if (productoSeleccionado === null) {
      setSeccionesWhatsapp(SECCIONES_VACIAS);
      return;
    }

    const cargarDatosProducto = async () => {
      try {
        setCargando(true);
        const token = localStorage.getItem("token");
          const respuesta = await fetch(
              getApiUrl(config.endpoints.whatsappProducto.get(productoSeleccionado)),
              {
                  headers: {
                      Authorization: `Bearer ${token}`,
                      Accept: "application/json",
                  },
              }
          );

          // 🟦 No hay registro (producto sin datos de WhatsApp todavía)
          if (respuesta.status === 404) {
              setSeccionesWhatsapp(SECCIONES_VACIAS);
              Swal.fire({
                  title: "Sin plantilla",
                  text: "El producto no tiene plantillas asignadas.",
                  icon: "info",
                  confirmButtonText: "OK",
              });
              return;
          }

          if (!respuesta.ok) throw new Error("Error al obtener plantilla");

          const json = await respuesta.json();
          const d = json?.data ?? json;

          console.log('DEBUG plantilla whatsapp d =>', d);

          const texto =
              d?.parrafo1 ??
              d?.whatsapp_caption ??
              d?.parrafo ??
              d?.titulo ??        // 👈 por si el back solo manda titulo
              "";

          const imagenUrl =
              d?.whatsapp_image_url ??
              d?.imagen_url ??
              (d?.whatsapp_image ? getApiUrl(d.whatsapp_image) : "") ??
              "";

          setSeccionesWhatsapp([{
              imagenPrincipal: null,
              vistaPreviaPrincipal: imagenUrl,
              parrafo1: texto,
          }]);
      } catch (error) {
        console.error("Error cargando plantilla del producto:", error);
        alert("❌ Ocurrió un error al cargar la plantilla del producto.");
        setSeccionesWhatsapp(SECCIONES_VACIAS);
      } finally {
        setCargando(false);
      }
    };

    cargarDatosProducto();
  }, [productoSeleccionado]);

  // 🔹 Obtener lista de productos
  useEffect(() => {
    const obtenerProductos = async () => {
      setCargando(true);
      try {
        const token = localStorage.getItem("token");
        const respuesta = await fetch(
          getApiUrl(config.endpoints.productos.all),
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );

        if (!respuesta.ok) throw new Error(`Error HTTP: ${respuesta.status}`);
        const datos = await respuesta.json();

        if (datos.success && Array.isArray(datos.data)) {
          setListaProductos(datos.data);
        } else if (Array.isArray(datos)) {
          setListaProductos(datos);
        } else {
          setListaProductos([]);
        }
      } catch (error) {
        console.error("Error al obtener los productos:", error);
        setListaProductos([]);
        alert("❌ No se pudieron cargar los productos. Intenta nuevamente.");
      } finally {
        setCargando(false);
      }
    };

    obtenerProductos();
  }, []);

  // 🔹 Manejadores
  const manejarCambioImagen = (
    indice: number,
    tipo: keyof Pick<
      SeccionWhatsapp,
      "imagenPrincipal" 
    >,
    archivo: File | null
  ) => {
    const nuevasSecciones = [...seccionesWhatsapp];
    nuevasSecciones[indice][tipo] = archivo;
    const vistaPrevia = archivo ? URL.createObjectURL(archivo) : "";

    if (tipo === "imagenPrincipal")
      nuevasSecciones[indice].vistaPreviaPrincipal = vistaPrevia;

    setSeccionesWhatsapp(nuevasSecciones);
  };

    const manejarCambioTexto = (
        indice: number,
        valor: string
    ) => {
        const nuevasSecciones = [...seccionesWhatsapp];
        nuevasSecciones[indice].parrafo1 = valor;
        setSeccionesWhatsapp(nuevasSecciones);
    };

  const eliminarImagen = (
    indice: number,
    tipo: "imagenPrincipal"
  ) => manejarCambioImagen(indice, tipo, null);

  // 🔹 Enviar formulario
  const manejarEnvio = async (e: React.FormEvent) => {
    e.preventDefault();

    if (productoSeleccionado === null) {
      alert("⚠️ Debes seleccionar un producto antes de continuar.");
      return;
    }

      const formData = new FormData();
      formData.append("producto_id", String(productoSeleccionado));

      const s0 = seccionesWhatsapp[0]; // 1 sección (basic)
      formData.append("parrafo", s0.parrafo1 ?? ""); // se guarda en productos.whatsapp_caption

      if (s0.imagenPrincipal) {
          // nueva imagen adjunta
          formData.append("imagen_principal", s0.imagenPrincipal);
      } else if (!s0.vistaPreviaPrincipal) {
          // si no hay archivo nuevo y tampoco vista previa => usuario eliminó la imagen
          formData.append("eliminar_imagen", "1");
      }

    if (plantillaId != null) formData.append("_method", "PUT");

    try {
      await onSubmit(formData);
    } catch (err) {
      console.error("Error al enviar plantilla:", err);
      alert("❌ No se pudo guardar la plantilla. Ver consola.");
    }
  };

  // 🔹 Componente interno para carga de imágenes
  const SeccionCargaImagen = ({
   WhatsappIndex,
    tipoImagen,
    vistaPrevia,
    etiqueta,
  }: {
   WhatsappIndex: number;
    tipoImagen: "imagenPrincipal" ;
    vistaPrevia: string;
    etiqueta: string;
  }) => (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {etiqueta}
      </label>
      {vistaPrevia ? (
        <div className="relative group">
          <img
            src={vistaPrevia}
            alt={etiqueta}
            className="w-full h-32 object-cover rounded-lg border-2 border-gray-300"
          />
          <button
            type="button"
            onClick={() => eliminarImagen(WhatsappIndex, tipoImagen)}
            className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <FaTimes size={12} />
          </button>
        </div>
      ) : (
        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition">
          <FaImage className="text-gray-400 text-3xl mb-2" />
          <span className="text-sm text-gray-500">Subir imagen</span>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const archivo = e.target.files?.[0] || null;
              manejarCambioImagen(WhatsappIndex, tipoImagen, archivo);
            }}
          />
        </label>
      )}
    </div>
  );

  // 🔹 Render principal
  return (
    <form
      onSubmit={manejarEnvio}
      className="space-y-8 max-h-[70vh] overflow-y-auto px-2"
    >
      {/* Selector de producto */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Selecciona un producto
        </label>
        <select
          value={productoSeleccionado ?? ""}
          onChange={(e) =>
            setProductoSeleccionado(
              e.target.value ? Number(e.target.value) : null
            )
          }
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">-- Elige un producto --</option>
          {listaProductos.map((producto) => (
            <option key={producto.id} value={producto.id}>
              {producto.nombre}
            </option>
          ))}
        </select>

        {cargando && (
          <p className="text-sm text-gray-400 italic mt-1">Cargando...</p>
        )}
        {!cargando && listaProductos.length === 0 && (
          <p className="text-sm text-gray-500 italic mt-2">
            No hay productos disponibles.
          </p>
        )}
      </div>

      {/* Secciones */}
      {seccionesWhatsapp.map((seccion, index) => (
        <div
          key={index}
          className="p-6 bg-gradient-to-br from-green-50 to-indigo-50 rounded-xl shadow-md border border-green-200"
        >
          <h3 className="text-xl font-bold text-green-900 mb-4 flex items-center gap-2">
            <span className="bg-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">
              {index + 1}
            </span>
            
            {selectedProduct ? (
              <span>{selectedProduct.nombre}</span>
            ) : (
              <span>Sección Whatsapp </span>
            )}
          </h3>

          <div className="space-y-4">
            <SeccionCargaImagen
              WhatsappIndex={index}
              tipoImagen="imagenPrincipal"
              vistaPrevia={seccion.vistaPreviaPrincipal}
              etiqueta="Imagen Principal"
            />

            <div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Párrafo
              </label>
                <textarea
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    value={seccion.parrafo1}
                    onChange={(e) => manejarCambioTexto(index, e.target.value)}
                    placeholder="Escribe el párrafo aquí"
                    rows={6}
                />
            </div>
          </div>
        </div>
      ))}

      <button
        type="submit"
        className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition"
      >
        Guardar plantilla
      </button>
    </form>
  );
}
