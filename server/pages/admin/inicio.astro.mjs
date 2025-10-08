import { c as createComponent, b as renderComponent, r as renderTemplate, m as maybeRenderHead, a as addAttribute } from '../../chunks/astro/server_hsX-BFeG.mjs';
import 'kleur/colors';
import { $ as $$LayoutAdmin } from '../../chunks/LayoutAdmin_B6m1CA_E.mjs';
export { renderers } from '../../renderers.mjs';

const $$Inicio = createComponent(($$result, $$props, $$slots) => {
  const tiempoTranscurrido = Date.now();
  const hoy = new Date(tiempoTranscurrido);
  const data = [
    { id: 1, nombre: "Kiara", gmail: "namelose@gmail.com", telefono: "941825478", seccion: "WAOS", fecha: "25/01/2025" }
  ];
  const extraRows = Array.from({ length: 9 }).map((_, i) => {
    const id = i + 2;
    const isEven = id % 2 === 0;
    const lightBg = isEven ? "bg-gray-100" : "bg-gray-200";
    const darkBg = isEven ? "dark:bg-gray-800" : "dark:bg-gray-700";
    const textColor = "text-gray-900 dark:text-gray-100";
    return { id, classes: `${lightBg} ${darkBg} ${textColor}` };
  });
  return renderTemplate`${renderComponent($$result, "LayoutAdmin", $$LayoutAdmin, { "title": "VENTAS" }, { "default": ($$result2) => renderTemplate`  ${renderComponent($$result2, "AdminDashboard", null, { "client:only": "react", "client:component-hydration": "only", "client:component-path": "/home/runner/work/Yuntas-Frontend/Yuntas-Frontend/src/components/admin/Admin", "client:component-export": "default" })} ${maybeRenderHead()}<p class="text-2xl text-red-500 font-bold text-center mt-10">
Bienvenido al Dashboard de Administrador. ${hoy.toLocaleDateString()} </p>  <div class="hidden md:block overflow-x-auto p-4"> <table class="min-w-full text-sm text-center border-separate border-spacing-x-2 border-spacing-y-2"> <thead> <tr> ${["ID", "Nombre", "Gmail", "Tel\xE9fono", "Secci\xF3n", "Fecha", "Acci\xF3n"].map((header) => renderTemplate`<th class="px-4 py-2 bg-cyan-400 dark:bg-cyan-600 text-white uppercase text-xs font-bold rounded-md"> ${header} </th>`)} </tr> </thead> <tbody> ${data.map((item) => renderTemplate`<tr> <td class="px-4 py-2 rounded-md font-bold bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100">${item.id}</td> <td class="px-4 py-2 rounded-md font-bold bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100">${item.nombre}</td> <td class="px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100">${item.gmail}</td> <td class="px-4 py-2 rounded-md font-bold bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100">${item.telefono}</td> <td class="px-4 py-2 rounded-md font-bold bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100">${item.seccion}</td> <td class="px-4 py-2 rounded-md font-bold bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100">${item.fecha}</td> <td class="px-4 py-2 rounded-md font-bold bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 flex justify-center gap-2"> <button class="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300">🗑️</button> <button class="text-green-500 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300">✅</button> </td> </tr>`)} <!-- filas vacías con estilo alternado --> ${extraRows.map((row) => renderTemplate`<tr> <td${addAttribute(`px-4 py-2 rounded-md font-bold ${row.classes}`, "class")}>${row.id}</td> <td${addAttribute(`px-4 py-2 rounded-md ${row.classes}`, "class")}></td> <td${addAttribute(`px-4 py-2 rounded-md ${row.classes}`, "class")}></td> <td${addAttribute(`px-4 py-2 rounded-md ${row.classes}`, "class")}></td> <td${addAttribute(`px-4 py-2 rounded-md ${row.classes}`, "class")}></td> <td${addAttribute(`px-4 py-2 rounded-md ${row.classes}`, "class")}></td> <td${addAttribute(`px-4 py-2 rounded-md ${row.classes} flex justify-center gap-2`, "class")}> <button class="text-red-400 dark:text-red-500 cursor-not-allowed opacity-50">🗑️</button> <button class="text-green-400 dark:text-green-500 cursor-not-allowed opacity-50">✅</button> </td> </tr>`)} </tbody> </table> </div>  <div class="md:hidden flex flex-col gap-4 p-4"> ${data.map((item) => renderTemplate`<div class="bg-white dark:bg-gray-800 shadow rounded-lg p-4 border border-gray-200 dark:border-gray-700"> <div class="grid grid-cols-2 gap-2 text-sm"> <p class="font-semibold text-gray-600 dark:text-gray-300">ID:</p> <p class="font-bold">${item.id}</p> <p class="font-semibold text-gray-600 dark:text-gray-300">Nombre:</p> <p>${item.nombre}</p> <p class="font-semibold text-gray-600 dark:text-gray-300">Gmail:</p> <p>${item.gmail}</p> <p class="font-semibold text-gray-600 dark:text-gray-300">Teléfono:</p> <p>${item.telefono}</p> <p class="font-semibold text-gray-600 dark:text-gray-300">Sección:</p> <p>${item.seccion}</p> <p class="font-semibold text-gray-600 dark:text-gray-300">Fecha:</p> <p>${item.fecha}</p> </div> <!-- acciones --> <div class="flex justify-end gap-3 mt-4"> <button class="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300">🗑️</button> <button class="text-green-500 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300">✅</button> </div> </div>`)} </div> ` })}`;
}, "/home/runner/work/Yuntas-Frontend/Yuntas-Frontend/src/pages/admin/inicio.astro", void 0);

const $$file = "/home/runner/work/Yuntas-Frontend/Yuntas-Frontend/src/pages/admin/inicio.astro";
const $$url = "/admin/inicio";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Inicio,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
