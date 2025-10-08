import { c as createComponent, b as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_hsX-BFeG.mjs';
import 'kleur/colors';
import { $ as $$LayoutAdmin } from '../../chunks/LayoutAdmin_B6m1CA_E.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import { FaRegEdit, FaTrash } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { T as TableContainer } from '../../chunks/TableContainer_BGxs4l4M.mjs';
export { renderers } from '../../renderers.mjs';

const Input = ({
  label,
  type = "text",
  rows,
  name,
  value,
  placeholder,
  onChange,
  className,
  required = false,
  disabled = false,
  defaultValue
}) => {
  return /* @__PURE__ */ jsxs("div", { className: `flex flex-col w-full ${className}`, children: [
    label && /* @__PURE__ */ jsx("label", { htmlFor: name, className: "mb-1 font-semibold text-gray-700", children: label }),
    type === "textarea" ? /* @__PURE__ */ jsx(
      "textarea",
      {
        id: name,
        name,
        value,
        placeholder,
        rows,
        required,
        disabled,
        defaultValue,
        className: `px-4 py-2 text-black border border-gray-300 rounded-lg shadow-sm focus:outline-none  focus:ring-2 focus:ring-[#6886e9] focus:border-[#6886e9] transition duration-200 disabled:bg-gray-100 disabled:cursor-not-allowed`
      }
    ) : /* @__PURE__ */ jsx(
      "input",
      {
        id: name,
        type,
        name,
        value,
        placeholder,
        onChange,
        required,
        disabled,
        defaultValue,
        className: `px-4 py-2 text-black border border-gray-300 rounded-lg shadow-sm focus:outline-none  focus:ring-2 focus:ring-[#6886e9] focus:border-[#6886e9] transition duration-200 disabled:bg-gray-100 disabled:cursor-not-allowed ${className}`
      }
    )
  ] });
};

const AddUserModal = ({ onClose, onUserAdded, initialData, isEditing }) => {
  const [name, setName] = useState(initialData?.name || "");
  const [email, setEmail] = useState(initialData?.email || "");
  const [celular, setCelular] = useState(initialData?.celular || "");
  const [roles, setRoles] = useState(initialData?.roles?.join(", ") || "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    if (!isEditing && password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      setLoading(false);
      return;
    }
    const token = localStorage.getItem("token");
    try {
      const body = {
        name,
        email,
        celular,
        roles: roles.split(",").map((r) => r.trim()).filter(Boolean)
      };
      if (isEditing) {
        body._method = "PUT";
        if (password) body.password = password;
      } else {
        body.password = password;
      }
      const response = await fetch(`https://apiyuntas.yuntaspublicidad.com/api/v1/users${isEditing && initialData ? `/${initialData.id}` : ""}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(body)
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Error al guardar usuario");
      }
      onUserAdded();
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsx("div", { className: "fixed inset-0 bg-[#1e293b]/60 flex items-center justify-center z-50", children: /* @__PURE__ */ jsxs("div", { className: "bg-white p-8 rounded-xl shadow-lg w-full max-w-2xl relative", children: [
    /* @__PURE__ */ jsx(
      "button",
      {
        className: "absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-2xl font-bold",
        onClick: onClose,
        children: "×"
      }
    ),
    /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold mb-6 text-blue-900 border-b-2 border-blue-700 pb-2 w-fit", children: isEditing ? "Editar Usuario" : "Ingresar Usuario" }),
    /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "grid max-sm:grid-cols-1 grid-cols-2 gap-5", children: [
      /* @__PURE__ */ jsx(Input, { label: "Nombre", name: "name", value: name, onChange: (e) => setName(e.target.value), required: true, className: "" }),
      /* @__PURE__ */ jsx(Input, { label: "Email", name: "email", value: email, onChange: (e) => setEmail(e.target.value), required: true, type: "email", className: "" }),
      /* @__PURE__ */ jsx(Input, { label: "Celular", name: "celular", value: celular, onChange: (e) => setCelular(e.target.value), className: "" }),
      /* @__PURE__ */ jsx(Input, { label: "Roles (separados por coma)", name: "roles", value: roles, onChange: (e) => setRoles(e.target.value), required: true, className: "" }),
      /* @__PURE__ */ jsx(Input, { label: "Contraseña", name: "password", value: password, onChange: (e) => setPassword(e.target.value), type: "password", className: "", required: !isEditing }),
      /* @__PURE__ */ jsx(Input, { label: "Confirmar contraseña", name: "confirmPassword", value: confirmPassword, onChange: (e) => setConfirmPassword(e.target.value), type: "password", className: "", required: !isEditing }),
      error && /* @__PURE__ */ jsx("div", { className: "col-span-2 text-red-600 text-sm", children: error }),
      /* @__PURE__ */ jsxs("div", { className: "col-span-2 flex justify-end gap-3 mt-4", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            className: "px-4 py-2 rounded-lg font-semibold bg-gray-200 text-gray-700 hover:bg-gray-300 transition",
            onClick: onClose,
            disabled: loading,
            children: "Cancelar"
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "submit",
            className: "px-6 py-2 rounded-lg font-semibold bg-blue-600 text-white hover:bg-blue-700 transition",
            disabled: loading,
            children: loading ? isEditing ? "Guardando..." : "Agregando..." : isEditing ? "Guardar cambios" : "Agregar usuario"
          }
        )
      ] })
    ] })
  ] }) });
};

function UsersTable() {
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const obtenerUsuarios = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      const respuesta = await fetch(
        "https://apiyuntas.yuntaspublicidad.com/api/v1/users",
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
          }
        }
      );
      const data = await respuesta.json();
      setUsers(data.data || []);
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un error al cargar los usuarios",
        confirmButtonColor: "#14b8a6"
      });
    } finally {
      setIsLoading(false);
    }
  };
  const eliminarUsuario = async (userId) => {
    const token = localStorage.getItem("token");
    const confirm = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción eliminará el usuario permanentemente.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar"
    });
    if (!confirm.isConfirmed) return;
    try {
      const response = await fetch(
        `https://apiyuntas.yuntaspublicidad.com/api/v1/users/${userId}`,
        {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
          }
        }
      );
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Error al eliminar usuario");
      }
      await obtenerUsuarios();
      Swal.fire("Eliminado", "El usuario ha sido eliminado.", "success");
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    }
  };
  useEffect(() => {
    obtenerUsuarios();
  }, []);
  return /* @__PURE__ */ jsxs("div", { className: "p-4", children: [
    /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold mb-4", children: "Usuarios" }),
    /* @__PURE__ */ jsx(TableContainer, { tableType: "usuarios", children: /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full responsive-table", children: [
      /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { children: [
        /* @__PURE__ */ jsx("th", { className: "px-4 py-2 bg-cyan-400 dark:bg-cyan-600 text-white uppercase text-xs font-bold rounded-md", children: "ID" }),
        /* @__PURE__ */ jsx("th", { className: "px-4 py-2 bg-cyan-400 dark:bg-cyan-600 text-white uppercase text-xs font-bold rounded-md", children: "Nombre" }),
        /* @__PURE__ */ jsx("th", { className: "px-4 py-2 bg-cyan-400 dark:bg-cyan-600 text-white uppercase text-xs font-bold rounded-md", children: "Email" }),
        /* @__PURE__ */ jsx("th", { className: "px-4 py-2 bg-cyan-400 dark:bg-cyan-600 text-white uppercase text-xs font-bold rounded-md", children: "Acción" })
      ] }) }),
      /* @__PURE__ */ jsx("tbody", { children: isLoading ? /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", { colSpan: 4, className: "text-center py-2", children: /* @__PURE__ */ jsxs("div", { className: "flex justify-center items-center gap-3", children: [
        /* @__PURE__ */ jsx("div", { className: "animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-teal-500" }),
        /* @__PURE__ */ jsx("span", { className: "text-teal-500 font-medium", children: "Cargando usuarios..." })
      ] }) }) }) : users.length > 0 ? users.map((user, index) => {
        const isEven = index % 2 === 0;
        const lightBg = isEven ? "bg-gray-100" : "bg-gray-200";
        const darkBg = isEven ? "dark:bg-gray-800" : "dark:bg-gray-700";
        const textColor = "text-gray-900 dark:text-gray-100";
        const cellClass = `px-4 py-2 rounded-md font-bold ${lightBg} ${darkBg} ${textColor}`;
        return /* @__PURE__ */ jsxs("tr", { children: [
          /* @__PURE__ */ jsx("td", { "data-label": "ID", className: cellClass, children: user.id }),
          /* @__PURE__ */ jsx("td", { "data-label": "Nombre", className: cellClass, children: user.name }),
          /* @__PURE__ */ jsx("td", { "data-label": "Email", className: cellClass, children: user.email }),
          /* @__PURE__ */ jsx(
            "td",
            {
              "data-label": "Acción",
              className: `px-4 py-2 rounded-md ${lightBg} ${darkBg} ${textColor}`,
              children: /* @__PURE__ */ jsxs("div", { className: "flex justify-center gap-4", children: [
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    className: "text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300 transition cursor-pointer",
                    title: "Editar",
                    onClick: () => setEditUser(user),
                    children: /* @__PURE__ */ jsx(FaRegEdit, { size: 18 })
                  }
                ),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    className: "text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 transition cursor-pointer",
                    title: "Eliminar",
                    onClick: () => eliminarUsuario(user.id),
                    children: /* @__PURE__ */ jsx(FaTrash, { size: 18 })
                  }
                )
              ] })
            }
          )
        ] }, user.id);
      }) : /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", { colSpan: 4, className: "text-center py-12", children: /* @__PURE__ */ jsx("span", { className: "text-gray-500", children: "No hay usuarios registrados" }) }) }) })
    ] }) }) }),
    /* @__PURE__ */ jsx("div", { className: "mt-4", children: /* @__PURE__ */ jsx(
      "button",
      {
        className: "bg-blue-600 text-white px-4 py-2 rounded-xl font-semibold hover:bg-blue-700 transition",
        onClick: () => setShowAddModal(true),
        children: "Agregar usuario"
      }
    ) }),
    showAddModal && /* @__PURE__ */ jsx(
      AddUserModal,
      {
        onClose: () => setShowAddModal(false),
        onUserAdded: obtenerUsuarios
      }
    ),
    editUser && /* @__PURE__ */ jsx(
      AddUserModal,
      {
        onClose: () => setEditUser(null),
        onUserAdded: obtenerUsuarios,
        initialData: editUser,
        isEditing: true
      }
    )
  ] });
}

const $$Usuarios = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "LayoutAdmin", $$LayoutAdmin, { "title": "Usuarios" }, { "default": ($$result2) => renderTemplate`  ${renderComponent($$result2, "AdminDashboard", null, { "client:only": "react", "client:component-hydration": "only", "client:component-path": "/home/runner/work/Yuntas-Frontend/Yuntas-Frontend/src/components/admin/Admin", "client:component-export": "default" })}  ${maybeRenderHead()}<div class="flex-1"> <div class="w-full"> ${renderComponent($$result2, "UsersTable", UsersTable, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/home/runner/work/Yuntas-Frontend/Yuntas-Frontend/src/components/dashboard/tables/UsersTable", "client:component-export": "default" })} </div> </div> ` })}`;
}, "/home/runner/work/Yuntas-Frontend/Yuntas-Frontend/src/pages/admin/usuarios.astro", void 0);

const $$file = "/home/runner/work/Yuntas-Frontend/Yuntas-Frontend/src/pages/admin/usuarios.astro";
const $$url = "/admin/usuarios";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Usuarios,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
