import { c as createComponent, b as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_hsX-BFeG.mjs';
import 'kleur/colors';
import { $ as $$Picture } from '../chunks/_astro_assets_j3t7V6bN.mjs';
import { $ as $$Layout } from '../chunks/Layout_oc6Si_Zm.mjs';
export { renderers } from '../renderers.mjs';

const imagen1 = new Proxy({"src":"/_astro/banner_blog2.CUbHlEeB.jpg","width":4096,"height":2734,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/home/runner/work/Yuntas-Frontend/Yuntas-Frontend/src/assets/images/blog/banner_blog2.jpg";
							}
							
							return target[name];
						}
					});

const imagenNumero1 = new Proxy({"src":"/_astro/numero1.B_0QW6Ir.webp","width":368,"height":368,"format":"webp"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/home/runner/work/Yuntas-Frontend/Yuntas-Frontend/src/assets/images/libro_reclamaciones/numero1.webp";
							}
							
							return target[name];
						}
					});

const imagenNumero2 = new Proxy({"src":"/_astro/numero2.c_gE-rch.webp","width":365,"height":361,"format":"webp"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/home/runner/work/Yuntas-Frontend/Yuntas-Frontend/src/assets/images/libro_reclamaciones/numero2.webp";
							}
							
							return target[name];
						}
					});

const $$LibroReclamaciones = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Blog", "canonicalUrl": "https://yuntaspublicidad.com/libro_reclamaciones/" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="relative h-screen"> ${renderComponent($$result2, "Picture", $$Picture, { "src": imagen1, "formats": ["webp"], "alt": "Imagen", "class": "w-full h-full object-cover" })} <div class="absolute inset-0 flex flex-col justify-center items-center text-center"> <h1 class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl Montserrat font-black text-white sombra-title">
Reclamaciones
</h1> </div> </section> <div class="w-full bg-white text-blue-950 text-3xl font-extrabold text-center h-20 content-center"> <h2 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
LIBRO DE RECLAMACIONES
</h2> </div>  <section class="bg-linear-to-b from-blue-900 to-indigo-950 p-4 sm:p-12"> <!-- Datos Personales --> <div class="p-5 sm:p-20 bg-white"> <div class="mb-4 sm:mb-12 flex flex-row items-center justify-between"> ${renderComponent($$result2, "Picture", $$Picture, { "src": imagenNumero1, "alt": "N\xFAmero 1 Yuntas", "class": "w-15 sm:w-40 mr-16" })} <h2 class="inline border-b-5 w-full text-lg sm:text-3xl sm:text-6xl Montserrat font-medium">
Datos personales
</h2> </div> <label for="nombre" class="block text-lg sm:text-3xl Montserrat font-medium">Nombres y Apellidos</label> <input id="nombre" name="nombre" type="text" placeholder="ej: Juan Quispe" class="border-b-3 w-full text-lg sm:text-3xl mt-2 mb-4 sm:mb-12"> <label for="tipo_documento" class="block text-lg sm:text-3xl Montserrat font-medium">Tipo de documento</label> <select id="tipo_documento" name="tipo_documento" class="border-b-3 w-full text-lg sm:text-3xl mt-2 mb-4 sm:mb-12"> <option>DNI</option> <option>Carnet de Extranjería</option> </select> <label for="numero_documento" class="block text-lg sm:text-3xl Montserrat font-medium">Número de documento</label> <input id="numero_documento" name="numero_documento" type="number" placeholder="ej: 123456789" class="border-b-3 w-full text-lg sm:text-3xl mt-2 mb-4 sm:mb-12"> <label for="correo" class="block text-lg sm:text-3xl Montserrat font-medium">Correo Electrónico</label> <input id="correo" name="correo" type="email" placeholder="ej: juanquispe@gmail.com" class="border-b-3 w-full text-lg sm:text-3xl mt-2 mb-4 sm:mb-12"> <label for="telefono" class="block text-lg sm:text-3xl Montserrat font-medium">Teléfono</label> <input id="telefono" name="telefono" type="tel" placeholder="ej: 987 654 321" class="border-b-3 w-full text-lg sm:text-3xl mt-2 mb-4 sm:mb-12"> </div> <!-- Información del reclamo --> <div class="p-5 sm:p-20 bg-white mt-12"> <div class="mb-4 sm:mb-12 flex flex-row items-center justify-between"> ${renderComponent($$result2, "Picture", $$Picture, { "src": imagenNumero2, "alt": "N\xFAmero 2 Yuntas", "class": "w-15 sm:w-40 mr-16" })} <h2 class="inline border-b-5 w-full text-lg sm:text-3xl sm:text-6xl Montserrat font-medium">
Información del reclamo
</h2> </div> <label for="fecha" class="block text-lg sm:text-3xl Montserrat font-medium">Fecha de compra</label> <input id="fecha" name="fecha" type="date" class="border-b-3 w-full text-lg sm:text-3xl mt-2 mb-4 sm:mb-12"> <label for="producto" class="block text-lg sm:text-3xl Montserrat font-medium">Producto</label> <select id="producto" name="producto" class="border-b-3 w-full text-lg sm:text-3xl mt-2 mb-4 sm:mb-12"> <option>Letreros Neón LED</option> <option>Sillas y Mesas LED</option> <option>Pisos LED</option> </select> <label for="reclamacion" class="block text-lg sm:text-3xl Montserrat font-medium">Detalle de la reclamación</label> <textarea id="reclamacion" name="reclamacion" placeholder="Detalle su reclamo aquí..." class="border-b-3 w-full text-lg sm:text-3xl mt-2 mb-4 sm:mb-12" rows="1"></textarea> <label for="monto" class="block text-lg sm:text-3xl Montserrat font-medium">Monto reclamado S/</label> <input id="monto" name="monto" type="number" placeholder="S/999" class="border-b-3 w-full text-lg sm:text-3xl mt-2 mb-4 sm:mb-12"> <div class="flex justify-center"> <button class="bg-[#D9D9D9] active:bg-blue-900 active:text-white hover:bg-blue-900 hover:text-white w-xl sm:w-4xl py-3 sm:py-8 Montserrat text-lg sm:text-3xl mt-5 sm:mt-16">ENVIAR</button> </div> </div> </section> ` })}`;
}, "/home/runner/work/Yuntas-Frontend/Yuntas-Frontend/src/pages/libro_reclamaciones.astro", void 0);

const $$file = "/home/runner/work/Yuntas-Frontend/Yuntas-Frontend/src/pages/libro_reclamaciones.astro";
const $$url = "/libro_reclamaciones";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$LibroReclamaciones,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
