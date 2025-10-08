import { c as createComponent, d as createAstro, a as addAttribute, e as renderScript, r as renderTemplate, m as maybeRenderHead, b as renderComponent, f as renderSlot, g as renderHead } from './astro/server_hsX-BFeG.mjs';
import 'kleur/colors';
import 'clsx';
/* empty css                         */
/* empty css                         */
import { u as useDarkMode, $ as $$Footer, a as $$Navbar } from './Footer_DLPwzSAN.mjs';
import { jsx, jsxs } from 'react/jsx-runtime';
import { FaRegFolder } from 'react-icons/fa';

const $$Astro$1 = createAstro();
const $$ClientRouter = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$ClientRouter;
  const { fallback = "animate" } = Astro2.props;
  return renderTemplate`<meta name="astro-view-transitions-enabled" content="true"><meta name="astro-view-transitions-fallback"${addAttribute(fallback, "content")}>${renderScript($$result, "/home/runner/work/Yuntas-Frontend/Yuntas-Frontend/node_modules/astro/components/ClientRouter.astro?astro&type=script&index=0&lang.ts")}`;
}, "/home/runner/work/Yuntas-Frontend/Yuntas-Frontend/node_modules/astro/components/ClientRouter.astro", void 0);

async function logout() {
  try {
    const response = await fetch("https://apiyuntas.yuntaspublicidad.com/api/v1/auth/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    });
    const data = await response.json();
    if (response.ok) {
      localStorage.removeItem("token");
      window.location.href = "/";
    } else {
      alert(data.message || "Error al cerrar sesión");
    }
  } catch (error) {
    alert("Error de conexión con el servidor");
  }
}
const Sidebar = () => {
  const { darkMode, toggleDarkMode } = useDarkMode();
  const items = [
    { name: "Inicio", path: "/admin/inicio" },
    { name: "Seguimiento", path: "/admin/seguimiento" },
    { name: "Blogs", path: "/admin/" },
    { name: "Productos", path: "/admin/productos" },
    { name: "Usuarios", path: "/admin/usuarios" }
  ];
  return /* @__PURE__ */ jsx(
    "aside",
    {
      className: `sidebar hidden lg:block top-0 left-0 z-50 w-64 h-full transition-transform duration-300 ease-in-out
        ${darkMode ? "bg-[#1e1e2f] text-white" : "bg-gray-200 text-gray-800"}`,
      children: /* @__PURE__ */ jsxs("div", { className: "p-4 space-y-6", children: [
        /* @__PURE__ */ jsx("nav", { children: /* @__PURE__ */ jsxs("ul", { className: "space-y-1", children: [
          /* @__PURE__ */ jsx("li", { className: "font-bold text-lg", children: "★ Administración" }),
          items.map((item, index) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(
            "a",
            {
              href: item.path,
              className: `flex items-center gap-2 text-sm transition-colors ${darkMode ? "text-gray-300 hover:text-white" : "text-gray-700 hover:text-gray-900"}`,
              children: [
                /* @__PURE__ */ jsx(FaRegFolder, { className: darkMode ? "text-gray-400" : "text-gray-500" }),
                item.name
              ]
            }
          ) }, index))
        ] }) }),
        /* @__PURE__ */ jsxs("div", { className: "border-t border-gray-400 pt-4 flex items-center justify-between", children: [
          /* @__PURE__ */ jsx("span", { className: "text-sm font-medium", children: "Dark Mode" }),
          /* @__PURE__ */ jsxs("label", { className: "relative inline-flex items-center cursor-pointer", children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "checkbox",
                className: "sr-only peer",
                checked: darkMode,
                onChange: toggleDarkMode
              }
            ),
            /* @__PURE__ */ jsx(
              "div",
              {
                className: `w-10 h-5 rounded-full transition-colors duration-300 ${darkMode ? "bg-gray-700" : "bg-gray-400"}`,
                children: /* @__PURE__ */ jsx(
                  "div",
                  {
                    className: `absolute w-4 h-4 rounded-full shadow-md transition-transform translate-y-0.5 duration-300 flex items-center justify-center ${darkMode ? "translate-x-5 bg-white" : "translate-x-1 bg-white"}`
                  }
                )
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "border-t border-gray-400 pt-4 text-center", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center space-y-1", children: [
          /* @__PURE__ */ jsx(
            "div",
            {
              className: `w-10 h-10 rounded-full flex items-center justify-center text-lg ${darkMode ? "bg-gray-700 text-white" : "bg-gray-500 text-white"}`,
              children: "👤"
            }
          ),
          /* @__PURE__ */ jsx("p", { className: "font-semibold", children: "Bienvenido" }),
          /* @__PURE__ */ jsx("p", { className: `text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`, children: "Administrador" }),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: logout,
              className: `mt-2 w-full py-2 rounded-full transition ${darkMode ? "bg-blue-800 hover:bg-blue-600 text-white" : "bg-blue-900 hover:bg-teal-600 text-white"}`,
              children: "Cerrar sesión"
            }
          )
        ] }) })
      ] })
    }
  );
};

const $$Header = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<header class="col-span-2 bg-blue-950 text-white py-4 px-4 flex justify-between items-center relative"> <!-- titulo --> <h2 class="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold tracking-wide text-center flex-1">
SECCION PRINCIPAL
</h2> </header>`;
}, "/home/runner/work/Yuntas-Frontend/Yuntas-Frontend/src/components/dashboard/Header.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro();
const $$LayoutAdmin = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$LayoutAdmin;
  const { title } = Astro2.props;
  return renderTemplate(_a || (_a = __template(['<html lang="es"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"', "><title>", '</title><link href="https://fonts.googleapis.com/css2?family=Roboto:wght@700&display=swap" rel="stylesheet">', "", '</head> <body id="admin-body" class="grid min-h-[100dvh] grid-rows-[auto_1fr_auto] bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"> <!-- FILA SUPERIOR: Navbar + Header --> <div class="w-full"> ', " ", ' </div> <!-- FILA CENTRAL: Sidebar + Contenido --> <main class="flex w-full relative"> <!-- Sidebar --> ', ' <!-- Contenido --> <section id="main-content" class="flex-1 p-6 overflow-x-auto bg-gray-50 dark:bg-gray-800"> ', ' </section> </main> <!-- FILA INFERIOR: Footer --> <footer class="col-span-full w-full"> ', ' </footer> <!-- Script abrir/cerrar sidebar --> <script>\n      window.addEventListener("DOMContentLoaded", () => {\n        const toggleBtn = document.getElementById("admin-menu-toggle");\n\n        toggleBtn?.addEventListener("click", () => {\n          document.body.classList.toggle("admin-sidebar-open");\n        });\n\n        document.querySelectorAll("[data-close-sidebar]").forEach((btn) => {\n          btn.addEventListener("click", () => {\n            document.body.classList.remove("admin-sidebar-open");\n          });\n        });\n      });\n    <\/script> </body> </html>'])), addAttribute(Astro2.generator, "content"), title, renderComponent($$result, "ClientRouter", $$ClientRouter, {}), renderHead(), renderComponent($$result, "Navbar", $$Navbar, { "variant": "admin" }), renderComponent($$result, "Header", $$Header, {}), renderComponent($$result, "Sidebar", Sidebar, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/home/runner/work/Yuntas-Frontend/Yuntas-Frontend/src/components/dashboard/Sidebar", "client:component-export": "default" }), renderSlot($$result, $$slots["default"]), renderComponent($$result, "Footer", $$Footer, {}));
}, "/home/runner/work/Yuntas-Frontend/Yuntas-Frontend/src/layouts/LayoutAdmin.astro", void 0);

export { $$LayoutAdmin as $ };
