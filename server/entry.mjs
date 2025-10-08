import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_CT72z5WI.mjs';
import { manifest } from './manifest_B21mgkDe.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/about.astro.mjs');
const _page2 = () => import('./pages/admin/inicio.astro.mjs');
const _page3 = () => import('./pages/admin/productos.astro.mjs');
const _page4 = () => import('./pages/admin/seguimiento.astro.mjs');
const _page5 = () => import('./pages/admin/usuarios.astro.mjs');
const _page6 = () => import('./pages/admin/ventas.astro.mjs');
const _page7 = () => import('./pages/admin.astro.mjs');
const _page8 = () => import('./pages/api/productos.astro.mjs');
const _page9 = () => import('./pages/api/test-product-creation.astro.mjs');
const _page10 = () => import('./pages/api/user-info.astro.mjs');
const _page11 = () => import('./pages/blogs/blog.astro.mjs');
const _page12 = () => import('./pages/blogs/_link_.astro.mjs');
const _page13 = () => import('./pages/blogs.astro.mjs');
const _page14 = () => import('./pages/contact.astro.mjs');
const _page15 = () => import('./pages/dashboard/blogs.astro.mjs');
const _page16 = () => import('./pages/libro_reclamaciones.astro.mjs');
const _page17 = () => import('./pages/login.astro.mjs');
const _page18 = () => import('./pages/products/producto.astro.mjs');
const _page19 = () => import('./pages/products/_link_.astro.mjs');
const _page20 = () => import('./pages/products.astro.mjs');
const _page21 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/node.js", _page0],
    ["src/pages/about.astro", _page1],
    ["src/pages/admin/inicio.astro", _page2],
    ["src/pages/admin/productos.astro", _page3],
    ["src/pages/admin/seguimiento.astro", _page4],
    ["src/pages/admin/usuarios.astro", _page5],
    ["src/pages/admin/ventas.astro", _page6],
    ["src/pages/admin.astro", _page7],
    ["src/pages/api/productos.ts", _page8],
    ["src/pages/api/test-product-creation.ts", _page9],
    ["src/pages/api/user-info.ts", _page10],
    ["src/pages/blogs/blog.astro", _page11],
    ["src/pages/blogs/[link].astro", _page12],
    ["src/pages/blogs.astro", _page13],
    ["src/pages/contact.astro", _page14],
    ["src/pages/dashboard/blogs.astro", _page15],
    ["src/pages/libro_reclamaciones.astro", _page16],
    ["src/pages/login.astro", _page17],
    ["src/pages/products/producto.astro", _page18],
    ["src/pages/products/[link].astro", _page19],
    ["src/pages/products.astro", _page20],
    ["src/pages/index.astro", _page21]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./_noop-actions.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "mode": "standalone",
    "client": "file:///home/runner/work/Yuntas-Frontend/Yuntas-Frontend/dist/client/",
    "server": "file:///home/runner/work/Yuntas-Frontend/Yuntas-Frontend/dist/server/",
    "host": false,
    "port": 4321,
    "assets": "_astro",
    "experimentalStaticHeaders": false
};
const _exports = createExports(_manifest, _args);
const handler = _exports['handler'];
const startServer = _exports['startServer'];
const options = _exports['options'];
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) {
	serverEntrypointModule[_start](_manifest, _args);
}

export { handler, options, pageMap, startServer };
