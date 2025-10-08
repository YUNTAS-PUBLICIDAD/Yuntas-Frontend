import { c as createComponent, b as renderComponent, r as renderTemplate } from '../../chunks/astro/server_hsX-BFeG.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../../chunks/Layout_oc6Si_Zm.mjs';
import { B as BlogPage } from '../../chunks/BlogPage_DfJkCreo.mjs';
export { renderers } from '../../renderers.mjs';

const $$Blog = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Yuntas Producciones - Detalle de blog" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "BlogPage", BlogPage, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/home/runner/work/Yuntas-Frontend/Yuntas-Frontend/src/components/blog/BlogPage.jsx", "client:component-export": "default" })} ` })}`;
}, "/home/runner/work/Yuntas-Frontend/Yuntas-Frontend/src/pages/blogs/blog.astro", void 0);

const $$file = "/home/runner/work/Yuntas-Frontend/Yuntas-Frontend/src/pages/blogs/blog.astro";
const $$url = "/blogs/blog";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Blog,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
