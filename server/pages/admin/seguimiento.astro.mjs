import { c as createComponent, b as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_hsX-BFeG.mjs';
import 'kleur/colors';
import { $ as $$LayoutAdmin } from '../../chunks/LayoutAdmin_B6m1CA_E.mjs';
import { jsx, jsxs } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
import { FaTimes, FaCheck, FaTrash, FaEdit } from 'react-icons/fa';
import { g as getApiUrl, c as config } from '../../chunks/config_CL3T0jDM.mjs';
import { T as TableContainer } from '../../chunks/TableContainer_BGxs4l4M.mjs';
export { renderers } from '../../renderers.mjs';

const useClienteAcciones = () => {
  const getValidToken = () => {
    const token = localStorage.getItem("token");
    console.log("🔍 Token encontrado:", token ? "✅ Sí" : "❌ No");
    console.log("🔍 Token (primeros 20 chars):", token ? token.substring(0, 20) + "..." : "No token");
    if (!token) throw new Error("No se encontró el token");
    return token;
  };
  const updateCliente = async (id, updatedData) => {
    try {
      const token = getValidToken();
      const url = getApiUrl(config.endpoints.clientes.update(id));
      const requestOptions = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
          "Accept": "application/json",
          "X-Requested-With": "XMLHttpRequest"
        },
        body: JSON.stringify(updatedData)
      };
      console.log("🔍 Headers de la petición:", requestOptions.headers);
      const response = await fetch(url, requestOptions);
      if (!response.ok) {
        const errorText = await response.text();
        console.error("🚨 Error response body:", errorText);
        throw new Error(`Error ${response.status}: ${errorText}`);
      }
      const result = await response.json();
      console.log("✅ Respuesta exitosa:", result);
      return result.data;
    } catch (error) {
      console.error("🚨 Error completo:", error);
      throw error;
    }
  };
  const addCliente = async (clienteData) => {
    const token = getValidToken();
    const url = getApiUrl(config.endpoints.clientes.create);
    console.log("🔍 ADD - URL completa:", url);
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
        "Accept": "application/json",
        "X-Requested-With": "XMLHttpRequest"
      },
      body: JSON.stringify(clienteData)
    });
    console.log("🔍 ADD - Status:", response.status);
    console.log("🔍 ADD - URL final:", response.url);
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error al agregar cliente: ${response.status} - ${errorText}`);
    }
    const result = await response.json();
    return result.data;
  };
  const deleteCliente = async (id) => {
    const token = getValidToken();
    const url = getApiUrl(config.endpoints.clientes.delete(id));
    console.log("🔍 DELETE - URL completa:", url);
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Accept": "application/json",
        "X-Requested-With": "XMLHttpRequest"
      }
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error al eliminar cliente: ${response.status} - ${errorText}`);
    }
    const result = await response.json();
    return result;
  };
  return {
    addCliente,
    updateCliente,
    deleteCliente
  };
};

const useClienteForm = (cliente, onSuccess) => {
  const [formData, setFormData] = useState({
    name: "",
    celular: "",
    email: "",
    producto_id: 0,
    created_at: ""
  });
  const [isEditing, setIsEditing] = useState(false);
  const { addCliente, updateCliente } = useClienteAcciones();
  useEffect(() => {
    if (cliente) {
      setFormData({
        name: cliente.name,
        celular: cliente.celular,
        email: cliente.email,
        producto_id: cliente.producto_id,
        created_at: cliente.created_at
      });
      setIsEditing(true);
    } else {
      resetForm();
      setIsEditing(false);
    }
  }, [cliente]);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, celular, email } = formData;
    if (!name.trim() || !celular.trim() || !email.trim()) {
      alert("⚠️ Todos los campos son obligatorios.");
      return;
    }
    if (!/^\d+$/.test(celular)) {
      alert("⚠️ El teléfono solo debe contener números.");
      return;
    }
    try {
      if (isEditing) {
        await updateCliente(cliente.id, { name, celular, email, producto_id: formData.producto_id });
        alert(" Cliente actualizado correctamente");
      } else {
        await addCliente({ name, celular, email });
        alert(" Cliente registrado exitosamente");
      }
      onSuccess?.();
      resetForm();
    } catch (error) {
      console.error("❌ Error en la operación:", error);
      alert(`❌ Error: ${error.message || "Error desconocido"}`);
    }
  };
  const resetForm = () => {
    setFormData({ name: "", celular: "", email: "", producto_id: 0, created_at: "" });
    setIsEditing(false);
  };
  return {
    formData,
    // Retornamos los datos del formulario
    handleChange,
    // Retornamos la función para manejar los cambios en los inputs
    handleSubmit
    // Retornamos la función para manejar el envío del formulario
  };
};

const AddUpdateDataModal = ({
  isOpen,
  setIsOpen,
  cliente,
  onRefetch
}) => {
  const { formData, handleChange, handleSubmit } = useClienteForm(
    cliente,
    () => {
      onRefetch();
      setIsOpen(false);
    }
  );
  if (!isOpen) return null;
  return /* @__PURE__ */ jsx("div", { className: "fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-2 sm:p-4", children: /* @__PURE__ */ jsxs(
    "div",
    {
      style: { backgroundColor: "#528FC2" },
      className: "text-white px-6 py-6 sm:px-10 sm:py-8 rounded-2xl w-full max-w-lg sm:max-w-2xl",
      children: [
        /* @__PURE__ */ jsx("h2", { className: "text-xl sm:text-2xl font-bold mb-4 text-center sm:text-left", children: cliente ? "EDITAR CLIENTE" : "AÑADIR CLIENTE" }),
        /* @__PURE__ */ jsxs(
          "form",
          {
            onSubmit: handleSubmit,
            className: "grid grid-cols-1 sm:grid-cols-2 gap-4",
            children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { className: "block text-sm mb-1", children: "Nombres" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "text",
                    name: "name",
                    value: formData.name,
                    onChange: handleChange,
                    required: true,
                    className: "w-full bg-white outline-none p-2 rounded-md text-black text-sm sm:text-base"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { className: "block text-sm mb-1", children: "Teléfono" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "text",
                    name: "celular",
                    value: formData.celular,
                    onChange: handleChange,
                    required: true,
                    className: "w-full bg-white outline-none p-2 rounded-md text-black text-sm sm:text-base"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "sm:col-span-2", children: [
                /* @__PURE__ */ jsx("label", { className: "block text-sm mb-1", children: "Gmail" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "email",
                    name: "email",
                    value: formData.email,
                    onChange: handleChange,
                    required: true,
                    className: "w-full bg-white outline-none p-2 rounded-md text-black text-sm sm:text-base"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { className: "block text-sm mb-1", children: "Producto ID" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "text",
                    name: "producto_id",
                    value: formData.producto_id ?? "",
                    onChange: handleChange,
                    required: true,
                    className: "w-full bg-white outline-none p-2 rounded-md text-black text-sm sm:text-base"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { className: "block text-sm mb-1", children: "Fecha" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "text",
                    name: "fecha",
                    value: formData.created_at,
                    onChange: handleChange,
                    required: true,
                    className: "w-full bg-white outline-none p-2 rounded-md text-black text-sm sm:text-base"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-2 mt-6 sm:col-span-2", children: [
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    type: "submit",
                    style: { backgroundColor: "#98D8DF" },
                    className: "flex-1 sm:flex-none px-6 py-2 rounded-full text-base text-white hover:opacity-90 transition",
                    children: cliente ? "Guardar cambios" : "Añadir cliente"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: () => setIsOpen(false),
                    type: "button",
                    className: "flex-1 sm:flex-none px-6 py-2 bg-gray-400 rounded-full text-base hover:bg-gray-500 transition",
                    children: "Cancelar"
                  }
                )
              ] })
            ]
          }
        )
      ]
    }
  ) });
};

const DeleteClienteModal = ({
  isOpen,
  setIsOpen,
  clienteId,
  onRefetch
}) => {
  const { deleteCliente } = useClienteAcciones();
  const [isLoading, setIsLoading] = useState(false);
  const handleDelete = async () => {
    try {
      setIsLoading(true);
      await deleteCliente(clienteId);
      onRefetch();
      setIsOpen(false);
    } catch (error) {
      console.error("Error al eliminar cliente:", error);
      alert("No se pudo eliminar el cliente");
    } finally {
      setIsLoading(false);
    }
  };
  if (!isOpen) return null;
  return /* @__PURE__ */ jsx("div", { className: "fixed inset-0 bg-black/50 flex items-center justify-center z-50", children: /* @__PURE__ */ jsxs("div", { className: "bg-white p-6 rounded-xl shadow-lg max-w-md w-full text-center", children: [
    /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold text-red-600 mb-4", children: "¿Eliminar cliente?" }),
    /* @__PURE__ */ jsx("p", { className: "text-gray-700 mb-6", children: "Esta acción es permanente y no se puede deshacer." }),
    /* @__PURE__ */ jsxs("div", { className: "flex justify-center gap-4", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: handleDelete,
          disabled: isLoading,
          className: "bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700 disabled:opacity-50",
          children: isLoading ? "Eliminando..." : "Eliminar"
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => setIsOpen(false),
          className: "bg-gray-200 text-gray-800 px-5 py-2 rounded-lg hover:bg-gray-300",
          children: "Cancelar"
        }
      )
    ] })
  ] }) });
};

const useClientes = (trigger, page = 1) => {
  const [clientes, setClientes] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchClientes = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No se encontró el token de autenticación");
        const endpoint = `${config.endpoints.clientes.list}?page=${page}`;
        const url = getApiUrl(endpoint);
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        });
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Error al obtener clientes: ${response.status} - ${errorText}`);
        }
        const result = await response.json();
        console.log("🚀 Respuesta completa:", result);
        const responseData = result.data || {};
        const clientesArray = responseData.data || [];
        const total = responseData.total || 0;
        const lastPage = responseData.last_page || 1;
        setClientes(clientesArray);
        setTotalPages(lastPage);
      } catch (err) {
        console.error("🚨 Error en fetchClientes:", err);
        setError(
          err instanceof Error ? err.message : "Ocurrió un error desconocido"
        );
      } finally {
        setLoading(false);
      }
    };
    fetchClientes();
  }, [trigger, page]);
  return {
    clientes,
    totalPages,
    loading,
    error
  };
};

const Paginator = ({
  currentPage,
  // Página actual
  totalPages,
  // Total de páginas
  onPageChange
  // Función para manejar el cambio de página
}) => {
  return /* @__PURE__ */ jsxs("div", { className: "flex justify-center items-center gap-2 mt-4", children: [
    /* @__PURE__ */ jsx(
      "button",
      {
        onClick: () => onPageChange(currentPage - 1),
        disabled: currentPage === 1,
        className: "pagination-btn",
        children: "Anterior"
      }
    ),
    /* @__PURE__ */ jsxs("span", { className: "text-gray-700 font-bold", children: [
      "Página ",
      currentPage,
      " de ",
      totalPages
    ] }),
    /* @__PURE__ */ jsx(
      "button",
      {
        onClick: () => onPageChange(currentPage + 1),
        disabled: currentPage === totalPages,
        className: "pagination-btn",
        children: "Siguiente"
      }
    )
  ] });
};

const DataTable = () => {
  const [refetchTrigger, setRefetchTrigger] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [showSeguimiento, setShowSeguimiento] = useState(false);
  const { clientes, totalPages, loading, error } = useClientes(
    refetchTrigger,
    currentPage
  );
  const [respuestaEstado, setRespuestaEstado] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCliente, setSelectedCliente] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [clienteIdToDelete, setClienteIdToDelete] = useState(
    null
  );
  const [isMensajesModalOpen, setIsMensajesModalOpen] = useState(false);
  const [isMonitoreoModalOpen, setIsMonitoreoModalOpen] = useState(false);
  useEffect(() => {
    if (clientes && clientes.length > 0) {
      const nuevosEstados = {};
      clientes.forEach((cliente) => {
        nuevosEstados[cliente.id] = {
          whatsapp: true,
          gmail: true
        };
      });
      setRespuestaEstado(nuevosEstados);
    } else {
      setRespuestaEstado({});
    }
  }, [clientes]);
  if (loading)
    return /* @__PURE__ */ jsx("p", { className: "text-center text-gray-500", children: "Cargando datos..." });
  if (error) return /* @__PURE__ */ jsxs("p", { className: "text-center text-red-500", children: [
    "Error: ",
    error
  ] });
  const handleRefetch = () => setRefetchTrigger((prev) => !prev);
  const openModalForEdit = (cliente) => {
    setSelectedCliente(cliente);
    setIsModalOpen(true);
  };
  const openModalForCreate = () => {
    setSelectedCliente(null);
    setIsModalOpen(true);
  };
  const toggleRespuesta = (id, tipo, nuevoEstado) => {
    setRespuestaEstado((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [tipo]: nuevoEstado
      }
    }));
  };
  const openDeleteModal = (id) => {
    setClienteIdToDelete(id);
    setIsDeleteModalOpen(true);
  };
  const handleClienteFormSuccess = () => {
    handleRefetch();
    setIsModalOpen(false);
  };
  const toggleSeguimiento = () => {
    setShowSeguimiento(!showSeguimiento);
  };
  const handleMensajesClick = () => {
    setIsMensajesModalOpen(true);
  };
  const handleMonitoreoClick = () => {
    setIsMonitoreoModalOpen(true);
  };
  const renderSeguimientoTable = () => /* @__PURE__ */ jsxs(
    TableContainer,
    {
      tableType: "seguimiento",
      headerContent: /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-2 mb-4", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            className: "bg-sky-600 text-white px-4 py-2 rounded-xl font-semibold opacity-80 hover:opacity-100 transition-opacity",
            onClick: handleMensajesClick,
            children: "MENSAJES"
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            className: "bg-sky-600 text-white px-4 py-2 rounded-xl font-semibold opacity-80 hover:opacity-100 transition-opacity",
            onClick: toggleSeguimiento,
            children: "SEGUIMIENTO"
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            className: "bg-sky-600 text-white px-4 py-2 rounded-xl font-semibold opacity-80 hover:opacity-100 transition-opacity",
            onClick: handleMonitoreoClick,
            children: "MONITOREO"
          }
        )
      ] }),
      children: [
        /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { children: [
          /* @__PURE__ */ jsx("th", { className: "px-2 py-2 bg-cyan-400 text-white text-xs font-bold rounded-md w-12", children: "ID" }),
          /* @__PURE__ */ jsx("th", { className: "px-4 py-2 bg-cyan-400 text-white text-xs font-bold rounded-md", children: "NOMBRE" }),
          /* @__PURE__ */ jsx("th", { className: "px-4 py-2 bg-cyan-400 text-white text-xs font-bold rounded-md", children: "WHATSAPP" }),
          /* @__PURE__ */ jsx("th", { className: "px-4 py-2 bg-cyan-400 text-white text-xs font-bold rounded-md", children: "RESPUESTA" }),
          /* @__PURE__ */ jsx("th", { className: "px-4 py-2 bg-cyan-400 text-white text-xs font-bold rounded-md", children: "GMAIL" }),
          /* @__PURE__ */ jsx("th", { className: "px-4 py-2 bg-cyan-400 text-white text-xs font-bold rounded-md", children: "RESPUESTA" }),
          /* @__PURE__ */ jsx("th", { className: "px-4 py-2 bg-cyan-400 text-white text-xs font-bold rounded-md", children: "ACCIÓN" })
        ] }) }),
        /* @__PURE__ */ jsx("tbody", { children: clientes.length === 0 ? /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", { colSpan: 7, className: "text-center py-4 text-gray-500", children: "No hay clientes disponibles." }) }) : clientes.map((item, index) => {
          const rowBg = index % 2 === 0 ? "bg-gray-100" : "bg-white";
          const estado = respuestaEstado[item.id] || {
            whatsapp: true,
            gmail: true
          };
          return /* @__PURE__ */ jsxs("tr", { className: `${rowBg} hover:bg-gray-50`, children: [
            /* @__PURE__ */ jsx("td", { className: "px-2 py-3 text-center font-bold text-sm border-r", children: item.id }),
            /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-center font-medium text-sm border-r", children: item.name || /* @__PURE__ */ jsx("div", { className: "bg-gray-300 h-4 rounded animate-pulse font-bold" }) }),
            /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-center border-r", children: /* @__PURE__ */ jsx("span", { className: "text-black px-2 py-1 rounded text-xs font-bold", children: estado.whatsapp ? "ENVIADO" : "NO ENVIADO" }) }),
            /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-center border-r", children: /* @__PURE__ */ jsxs("div", { className: "flex justify-center items-center gap-4", children: [
              /* @__PURE__ */ jsx(
                "button",
                {
                  className: `w-10 h-10 flex justify-center items-center rounded-full transition-colors ${!estado.whatsapp ? "bg-red-100 text-red-500 hover:bg-red-500 hover:text-white" : "bg-gray-200 cursor-not-allowed opacity-50"}`,
                  onClick: () => toggleRespuesta(item.id, "whatsapp", false),
                  title: "Marcar como no enviado",
                  "aria-label": "Marcar como no enviado",
                  disabled: estado.whatsapp === false,
                  children: /* @__PURE__ */ jsx(FaTimes, { size: 20 })
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  className: `w-10 h-10 flex justify-center items-center rounded-full transition-colors ${estado.whatsapp ? "bg-green-100 text-green-500 hover:bg-green-500 hover:text-white" : "bg-gray-200 cursor-not-allowed opacity-50"}`,
                  onClick: () => toggleRespuesta(item.id, "whatsapp", true),
                  title: "Marcar como enviado",
                  "aria-label": "Marcar como enviado",
                  disabled: estado.whatsapp === true,
                  children: /* @__PURE__ */ jsx(FaCheck, { size: 20 })
                }
              )
            ] }) }),
            /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-center border-r", children: /* @__PURE__ */ jsx("span", { className: "text-black px-2 py-1 rounded text-xs font-bold", children: estado.gmail ? "ENVIADO" : "NO ENVIADO" }) }),
            /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-center border-r", children: /* @__PURE__ */ jsxs("div", { className: "flex justify-center items-center gap-4", children: [
              /* @__PURE__ */ jsx(
                "button",
                {
                  className: `w-10 h-10 flex justify-center items-center rounded-full transition-colors ${!estado.gmail ? "bg-red-100 text-red-500 hover:bg-red-500 hover:text-white" : "bg-gray-200 cursor-not-allowed opacity-50"}`,
                  onClick: () => toggleRespuesta(item.id, "gmail", false),
                  title: "Marcar como no enviado",
                  "aria-label": "Marcar como no enviado",
                  disabled: estado.gmail === false,
                  children: /* @__PURE__ */ jsx(FaTimes, { size: 20 })
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  className: `w-10 h-10 flex justify-center items-center rounded-full transition-colors ${estado.gmail ? "bg-green-100 text-green-500 hover:bg-green-500 hover:text-white" : "bg-gray-200 cursor-not-allowed opacity-50"}`,
                  onClick: () => toggleRespuesta(item.id, "gmail", true),
                  title: "Marcar como enviado",
                  "aria-label": "Marcar como enviado",
                  disabled: estado.gmail === true,
                  children: /* @__PURE__ */ jsx(FaCheck, { size: 20 })
                }
              )
            ] }) }),
            /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-center", children: /* @__PURE__ */ jsxs("div", { className: "flex justify-center items-center gap-4", children: [
              /* @__PURE__ */ jsx(
                "button",
                {
                  className: "w-10 h-10 flex justify-center items-center rounded-full bg-red-100 text-red-500 hover:bg-red-500 hover:text-white transition-colors",
                  title: "Eliminar",
                  onClick: () => openDeleteModal(item.id),
                  "aria-label": "Eliminar",
                  children: /* @__PURE__ */ jsx(FaTrash, { size: 20 })
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  className: "w-10 h-10 flex justify-center items-center rounded-full bg-green-100 text-green-600 hover:bg-green-600 hover:text-white transition-colors",
                  title: "Editar",
                  onClick: () => openModalForEdit(item),
                  "aria-label": "Editar",
                  children: /* @__PURE__ */ jsx(FaEdit, { size: 20 })
                }
              )
            ] }) })
          ] }, item.id);
        }) })
      ]
    }
  );
  const renderCompleteTable = () => /* @__PURE__ */ jsxs(
    TableContainer,
    {
      tableType: "seguimiento",
      headerContent: /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-2 mb-4", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            className: "bg-sky-600 text-white px-4 py-2 rounded-xl font-semibold opacity-80 hover:opacity-100 transition-opacity",
            children: "MENSAJES"
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            className: "bg-sky-600 text-white px-4 py-2 rounded-xl font-semibold opacity-80 hover:opacity-100 transition-opacity",
            onClick: toggleSeguimiento,
            children: "MEDIO DE SEGUIMIENTO"
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            className: "bg-sky-600 text-white px-4 py-2 rounded-xl font-semibold opacity-80 hover:opacity-100 transition-opacity",
            children: "MONITOREO"
          }
        )
      ] }),
      children: [
        /* @__PURE__ */ jsx("thead", { className: "hidden md:table-header-group", children: /* @__PURE__ */ jsx("tr", { children: [
          "ID",
          "Nombre",
          "Gmail",
          "Teléfono",
          "Producto",
          "Fecha",
          "Acción"
        ].map((header) => /* @__PURE__ */ jsx(
          "th",
          {
            className: "px-4 py-2 bg-cyan-400 text-white uppercase text-xs font-bold rounded-md",
            children: header
          },
          header
        )) }) }),
        /* @__PURE__ */ jsx("tbody", { children: clientes.length === 0 ? /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", { colSpan: 7, className: "text-center py-4 text-gray-500", children: "No hay clientes disponibles." }) }) : clientes.map((item, index) => {
          const rowBg = index % 2 === 0 ? "bg-[#d9d9d9]" : "bg-[#d9d9d94d]";
          return /* @__PURE__ */ jsxs(
            "tr",
            {
              className: `text-center md:table-row block md:mb-0 mb-4 rounded-lg shadow-sm ${rowBg}`,
              children: [
                /* @__PURE__ */ jsx(
                  "td",
                  {
                    "data-label": "ID",
                    className: "px-4 py-2 font-bold border border-gray-300 block md:table-cell",
                    children: item.id
                  }
                ),
                /* @__PURE__ */ jsx(
                  "td",
                  {
                    "data-label": "Nombre",
                    className: "px-4 py-2 font-bold border border-gray-300 block md:table-cell",
                    children: item.name
                  }
                ),
                /* @__PURE__ */ jsx(
                  "td",
                  {
                    "data-label": "Gmail",
                    className: "px-4 py-2 border border-gray-300 block md:table-cell",
                    children: item.email
                  }
                ),
                /* @__PURE__ */ jsx(
                  "td",
                  {
                    "data-label": "Teléfono",
                    className: "px-4 py-2 font-bold border border-gray-300 block md:table-cell",
                    children: item.celular
                  }
                ),
                /* @__PURE__ */ jsx(
                  "td",
                  {
                    "data-label": "Producto",
                    className: "px-4 py-2 font-bold border border-gray-300 block md:table-cell",
                    children: item.nombre_producto || "N/A"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "td",
                  {
                    "data-label": "Fecha",
                    className: "px-4 py-2 font-bold border border-gray-300 block md:table-cell",
                    children: item.created_at
                  }
                ),
                /* @__PURE__ */ jsx(
                  "td",
                  {
                    "data-label": "Acción",
                    className: "px-4 py-2 border border-gray-300 block md:table-cell",
                    children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row justify-center gap-2 rounded-xl p-1", children: [
                      /* @__PURE__ */ jsx(
                        "button",
                        {
                          className: "p-2 text-red-600 hover:text-red-800 transition",
                          title: "Eliminar",
                          onClick: () => openDeleteModal(item.id),
                          children: /* @__PURE__ */ jsx(FaTrash, { size: 18 })
                        }
                      ),
                      /* @__PURE__ */ jsx(
                        "button",
                        {
                          className: "p-2 text-green-600 hover:text-green-800 transition",
                          title: "Editar",
                          onClick: () => openModalForEdit(item),
                          children: /* @__PURE__ */ jsx(FaEdit, { size: 18 })
                        }
                      )
                    ] })
                  }
                )
              ]
            },
            item.id
          );
        }) })
      ]
    }
  );
  return /* @__PURE__ */ jsxs("div", { className: "overflow-x-auto p-4", children: [
    showSeguimiento ? renderSeguimientoTable() : renderCompleteTable(),
    !showSeguimiento && /* @__PURE__ */ jsx(
      "button",
      {
        className: "mt-4 ml-2 p-2 pl-4 bg-blue-900 text-white rounded-lg",
        onClick: openModalForCreate,
        children: "Agregar Cliente"
      }
    ),
    /* @__PURE__ */ jsx(
      AddUpdateDataModal,
      {
        isOpen: isModalOpen,
        setIsOpen: setIsModalOpen,
        cliente: selectedCliente,
        onRefetch: handleClienteFormSuccess
      }
    ),
    clienteIdToDelete !== null && /* @__PURE__ */ jsx(
      DeleteClienteModal,
      {
        isOpen: isDeleteModalOpen,
        setIsOpen: setIsDeleteModalOpen,
        clienteId: clienteIdToDelete,
        onRefetch: handleRefetch
      }
    ),
    /* @__PURE__ */ jsx(
      Paginator,
      {
        currentPage,
        totalPages,
        onPageChange: (page) => setCurrentPage(page)
      }
    )
  ] });
};

const $$Seguimiento = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "LayoutAdmin", $$LayoutAdmin, { "title": "SEGUIMIENTO" }, { "default": ($$result2) => renderTemplate`  ${renderComponent($$result2, "AdminDashboard", null, { "client:only": "react", "client:component-hydration": "only", "client:component-path": "/home/runner/work/Yuntas-Frontend/Yuntas-Frontend/src/components/admin/Admin", "client:component-export": "default" })}  ${maybeRenderHead()}<div class="flex-1"> <div class="w-full"> ${renderComponent($$result2, "SeguimientoTabla", DataTable, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/home/runner/work/Yuntas-Frontend/Yuntas-Frontend/src/components/dashboard/tables/seguimiento/SeguimientoTable", "client:component-export": "default" })} </div> </div> ` })}`;
}, "/home/runner/work/Yuntas-Frontend/Yuntas-Frontend/src/pages/admin/seguimiento.astro", void 0);

const $$file = "/home/runner/work/Yuntas-Frontend/Yuntas-Frontend/src/pages/admin/seguimiento.astro";
const $$url = "/admin/seguimiento";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Seguimiento,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
