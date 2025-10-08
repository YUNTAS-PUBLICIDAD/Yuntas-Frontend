import { c as createComponent, d as createAstro, b as renderComponent, r as renderTemplate } from '../../chunks/astro/server_hsX-BFeG.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../../chunks/Layout_oc6Si_Zm.mjs';
import { B as BlogPage } from '../../chunks/BlogPage_DfJkCreo.mjs';
import { b as blogService } from '../../chunks/blogService_BmzDKmfk.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
const $$link = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$link;
  const { link } = Astro2.params;
  if (!link) {
    return Astro2.redirect("/blogs");
  }
  let article = null;
  try {
    const response = await blogService.getBlogByLink(link);
    article = response.data;
  } catch (err) {
    console.error("Error obteniendo blog:", err);
    err instanceof Error ? err.message : "Error desconocido";
  }
  if (!article) {
    return Astro2.redirect("/blogs");
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": article.nombre_producto, "description": article.subtitulo || "", "canonicalUrl": `https://yuntaspublicidad.com/blogs/${link}` }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "BlogDetail", BlogPage, { "client:load": true, "article": article, "client:component-hydration": "load", "client:component-path": "/home/runner/work/Yuntas-Frontend/Yuntas-Frontend/src/components/blog/BlogPage.jsx", "client:component-export": "default" })} ` })}`;
}, "/home/runner/work/Yuntas-Frontend/Yuntas-Frontend/src/pages/blogs/[link].astro", void 0);

const $$file = "/home/runner/work/Yuntas-Frontend/Yuntas-Frontend/src/pages/blogs/[link].astro";
const $$url = "/blogs/[link]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$link,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
