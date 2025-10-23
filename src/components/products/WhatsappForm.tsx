import { useState, useEffect } from "react";
import { FaImage, FaTimes } from "react-icons/fa";
import { config, getApiUrl } from "../../../config";
import type { Product } from "../../models/Product";

interface SeccionWhatsapp {
  imagenPrincipal: File | null;
  vistaPreviaPrincipal: string;
  titulo: string;
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
    titulo: "",
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
          getApiUrl(
            config.endpoints.WhatsappProducto.plantillaPorProducto(
              productoSeleccionado
            )
          ),
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          }
        );

        // 🟦 No hay plantilla asociada
        if (respuesta.status === 404) {
          alert("ℹ️ El producto seleccionado no tiene una plantilla asociada.");
          setSeccionesWhatsapp(SECCIONES_VACIAS);
          return;
        }

        if (!respuesta.ok) throw new Error("Error al obtener plantilla");

        const datos = await respuesta.json();

        // 🟨 No hay secciones configuradas
        if (!datos?.secciones || datos.secciones.length === 0) {
          alert(
            "ℹ️ Este producto no tiene secciones configuradas en su plantilla."
          );
          setSeccionesWhatsapp(SECCIONES_VACIAS);
          return;
        }

        // ✅ Cargar plantilla existente
        const secciones = datos.secciones.map((sec: any) => ({
          imagenPrincipal: null,
          vistaPreviaPrincipal: sec.imagen_principal_url || "",
          imagenSecundaria1: null,
          vistaPreviaSecundaria1: sec.imagen_secundaria1_url || "",
          imagenSecundaria2: null,
          vistaPreviaSecundaria2: sec.imagen_secundaria2_url || "",
          titulo: sec.titulo || "",
          subtitulo: sec.subtitulo || "",
          parrafo1: sec.parrafo1 || "",
        }));

        // Si vienen menos de 3 secciones, completamos el resto vacías
        const seccionesCompletas = [
          ...secciones,
          ...Array(Math.max(0, 3 - secciones.length)).fill(SECCIONES_VACIAS[0]),
        ];

        setSeccionesWhatsapp(seccionesCompletas);
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
    campo: "titulo" | "parrafo1",
    valor: string
  ) => {
    const nuevasSecciones = [...seccionesWhatsapp];
    nuevasSecciones[indice][campo] = valor;
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

    seccionesWhatsapp.forEach((item, i) => {
      if (item.imagenPrincipal)
        formData.append(
          `secciones[${i}][imagen_principal]`,
          item.imagenPrincipal
        );
      formData.append(`secciones[${i}][titulo]`, item.titulo);
      formData.append(`secciones[${i}][parrafo1]`, item.parrafo1);
    });

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
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Título
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                value={seccion.titulo}
                onChange={(e) =>
                  manejarCambioTexto(index, "titulo", e.target.value)
                }
                placeholder="Escribe el título aquí"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Párrafo 1
              </label>
              <textarea
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                value={seccion.parrafo1}
                onChange={(e) =>
                  manejarCambioTexto(index, "parrafo1", e.target.value)
                }
                placeholder="Escribe el párrafo aquí"
                rows={3}
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
