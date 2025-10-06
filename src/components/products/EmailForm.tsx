import { useState, useEffect } from "react";
import { FaImage, FaTimes } from "react-icons/fa";
import { config, getApiUrl } from "../../../config";
import type { Product } from "../../models/Product";

// Estructura para cada sección del email
interface SeccionEmail {
  imagenPrincipal: File | null;
  vistaPreviaPrincipal: string;
  imagenSecundaria1: File | null;
  vistaPreviaSecundaria1: string;
  imagenSecundaria2: File | null;
  vistaPreviaSecundaria2: string;
  titulo: string;
  subtitulo: string;
}

interface FormularioEmailProps {
  onSubmit: (formData: FormData) => Promise<void>;
}

export default function FormularioEmail({ onSubmit }: FormularioEmailProps) {
  const [productoSeleccionado, setProductoSeleccionado] = useState<
    number | null
  >(null);
  const [listaProductos, setListaProductos] = useState<Product[]>([]);
  const [cargando, setCargando] = useState<boolean>(false);

  const [seccionesEmail, setSeccionesEmail] = useState<SeccionEmail[]>([
    {
      imagenPrincipal: null,
      vistaPreviaPrincipal: "",
      imagenSecundaria1: null,
      vistaPreviaSecundaria1: "",
      imagenSecundaria2: null,
      vistaPreviaSecundaria2: "",
      titulo: "",
      subtitulo: "",
    },
    {
      imagenPrincipal: null,
      vistaPreviaPrincipal: "",
      imagenSecundaria1: null,
      vistaPreviaSecundaria1: "",
      imagenSecundaria2: null,
      vistaPreviaSecundaria2: "",
      titulo: "",
      subtitulo: "",
    },
    {
      imagenPrincipal: null,
      vistaPreviaPrincipal: "",
      imagenSecundaria1: null,
      vistaPreviaSecundaria1: "",
      imagenSecundaria2: null,
      vistaPreviaSecundaria2: "",
      titulo: "",
      subtitulo: "",
    },
  ]);

  // ✅ Cargar la lista de productos al montar el componente
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

  // Manejar cambio de imágenes
  const manejarCambioImagen = (
    indice: number,
    tipo: keyof Pick<
      SeccionEmail,
      "imagenPrincipal" | "imagenSecundaria1" | "imagenSecundaria2"
    >,
    archivo: File | null
  ) => {
    const nuevasSecciones = [...seccionesEmail];
    nuevasSecciones[indice][tipo] = archivo;

    const vistaPrevia = archivo ? URL.createObjectURL(archivo) : "";

    if (tipo === "imagenPrincipal") {
      nuevasSecciones[indice].vistaPreviaPrincipal = vistaPrevia;
    } else if (tipo === "imagenSecundaria1") {
      nuevasSecciones[indice].vistaPreviaSecundaria1 = vistaPrevia;
    } else if (tipo === "imagenSecundaria2") {
      nuevasSecciones[indice].vistaPreviaSecundaria2 = vistaPrevia;
    }

    setSeccionesEmail(nuevasSecciones);
  };

  // Manejar cambio de texto
  const manejarCambioTexto = (
    indice: number,
    campo: "titulo" | "subtitulo",
    valor: string
  ) => {
    const nuevasSecciones = [...seccionesEmail];
    nuevasSecciones[indice][campo] = valor;
    setSeccionesEmail(nuevasSecciones);
  };

  // Eliminar imagen
  const eliminarImagen = (
    indice: number,
    tipo: "imagenPrincipal" | "imagenSecundaria1" | "imagenSecundaria2"
  ) => {
    manejarCambioImagen(indice, tipo, null);
  };

  // Enviar formulario
  const manejarEnvio = async (e: React.FormEvent) => {
    e.preventDefault();

    if (productoSeleccionado === null) {
      alert("⚠️ Debes seleccionar un producto antes de continuar.");
      return;
    }

    const formData = new FormData();
    formData.append("producto_id", String(productoSeleccionado));

    seccionesEmail.forEach((item, i) => {
      const seccion = i + 1;
      if (item.imagenPrincipal) {
        formData.append(`email${seccion}_main_image`, item.imagenPrincipal);
      }
      if (item.imagenSecundaria1) {
        formData.append(
          `email${seccion}_secondary_image_1`,
          item.imagenSecundaria1
        );
      }
      if (item.imagenSecundaria2) {
        formData.append(
          `email${seccion}_secondary_image_2`,
          item.imagenSecundaria2
        );
      }
      formData.append(`email${seccion}_title`, item.titulo);
      formData.append(`email${seccion}_subtitle`, item.subtitulo);
    });

    await onSubmit(formData);
  };

  // Componente de carga de imagen
  const SeccionCargaImagen = ({
    emailIndex,
    tipoImagen,
    vistaPrevia,
    etiqueta,
  }: {
    emailIndex: number;
    tipoImagen: "imagenPrincipal" | "imagenSecundaria1" | "imagenSecundaria2";
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
            onClick={() => eliminarImagen(emailIndex, tipoImagen)}
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
              manejarCambioImagen(emailIndex, tipoImagen, archivo);
            }}
          />
        </label>
      )}
    </div>
  );

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
          <p className="text-sm text-gray-400 italic mt-1">
            Cargando productos...
          </p>
        )}

        {!cargando && listaProductos.length === 0 && (
          <p className="text-sm text-gray-500 italic mt-2">
            No hay productos disponibles.
          </p>
        )}
      </div>

      {/* Secciones de email */}
      {seccionesEmail.map((seccion, index) => (
        <div
          key={index}
          className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl shadow-md border border-blue-200"
        >
          <h3 className="text-xl font-bold text-blue-900 mb-4 flex items-center gap-2">
            <span className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">
              {index + 1}
            </span>
            Sección Email {index + 1}
          </h3>

          <div className="space-y-4">
            <SeccionCargaImagen
              emailIndex={index}
              tipoImagen="imagenPrincipal"
              vistaPrevia={seccion.vistaPreviaPrincipal}
              etiqueta="Imagen Principal"
            />

            <div className="grid grid-cols-2 gap-4">
              <SeccionCargaImagen
                emailIndex={index}
                tipoImagen="imagenSecundaria1"
                vistaPrevia={seccion.vistaPreviaSecundaria1}
                etiqueta="Imagen Secundaria 1"
              />
              <SeccionCargaImagen
                emailIndex={index}
                tipoImagen="imagenSecundaria2"
                vistaPrevia={seccion.vistaPreviaSecundaria2}
                etiqueta="Imagen Secundaria 2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Título
              </label>
              <input
                type="text"
                value={seccion.titulo}
                onChange={(e) =>
                  manejarCambioTexto(index, "titulo", e.target.value)
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Escribe el título"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subtítulo
              </label>
              <textarea
                value={seccion.subtitulo}
                onChange={(e) =>
                  manejarCambioTexto(index, "subtitulo", e.target.value)
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Escribe el subtítulo"
                rows={3}
              />
            </div>
          </div>
        </div>
      ))}

      <div className="flex justify-end gap-3 pt-4 border-t">
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-lg transition-colors shadow-md"
        >
          Guardar Cambios
        </button>
      </div>
    </form>
  );
}
