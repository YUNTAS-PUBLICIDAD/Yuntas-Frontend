import { c as createComponent, m as maybeRenderHead, a as addAttribute, r as renderTemplate, b as renderComponent } from '../chunks/astro/server_hsX-BFeG.mjs';
import 'kleur/colors';
import 'clsx';
import { y as yuntasLogo } from '../chunks/Footer_DLPwzSAN.mjs';
import { TbTargetArrow } from 'react-icons/tb';
import { RiTeamFill, RiEmotionHappyFill, RiShakeHandsFill } from 'react-icons/ri';
import { FaHeadset } from 'react-icons/fa';
import { LuTelescope } from 'react-icons/lu';
import { $ as $$Layout } from '../chunks/Layout_oc6Si_Zm.mjs';
export { renderers } from '../renderers.mjs';

const $$AboutComponent = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section class="relative w-full py-28 md:py-36 flex justify-center bg-gradient-to-b from-blue-900 to-indigo-950 px-8 text-white"> <div class="md:max-w-5xl flex flex-col xl:flex-row items-center gap-6 md:gap-12"> <!-- Logo --> <div class="flex-shrink-0"> <img${addAttribute(yuntasLogo.src, "src")} alt="Logo Yuntas" title="Logo Yuntas Publicidad" class="w-32 md:w-60"> </div> <!-- Texto --> <div class="text-center max-w-sm md:max-w-lg"> <p class="text-lg md:text-3xl font-light leading-tight">
En Yuntas Producciones
<span class="font-bold">transformamos espacios con soluciones tecnológicas</span>
innovadoras en iluminación y diseño, ofreciendo calidad y vanguardia
<span class="font-bold">para crear experiencias inolvidables</span>.
</p> </div> </div> <!-- Esquinas decorativas --> <div class="absolute hidden md:block top-15 left-15 border-t-2 border-l-2 border-cyan-400 md:w-40 md:h-30 lg:w-80 lg:h-60"></div> <div class="absolute hidden md:block bottom-15 right-15 border-b-2 border-r-2 border-cyan-400 md:w-40 md:h-30 lg:w-80 lg:h-60"></div> </section>`;
}, "/home/runner/work/Yuntas-Frontend/Yuntas-Frontend/src/components/about/AboutComponent.astro", void 0);

const $$MissionCard = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section class="w-full bg-white p-6 flex md:flex-col flex-row items-center justify-evenly md:h-full"> <div class="flex flex-col items-center md:order-1 md:w-1/2"> ${renderComponent($$result, "TbTargetArrow", TbTargetArrow, { "className": "bg-blue-500/90 rounded-3xl size-24 md:size-32 p-4" })} <div class="flex-col w-full"> <p class="text-blue-500 text-center font-extrabold text-2xl md:text-3xl my-4 mb-0 md:mb-4">
MISIÓN
</p> <hr class="border-2 border-blue-500"> </div> </div> <p class="text-gray-600 text-sm md:text-lg lg:text-xl font-semibold md:order-2 md:w-1/2 md:text-center text-wrap p-4">
Transformar espacios y generar
<span class="text-blue-800/70 font-bold">experiencias inolvidables</span>
mediante productos de servicios de iluminación y
<span class="text-blue-800/70 font-bold">diseño innovadores</span>
, superando expectativas y satisfaciendo a los clientes.
</p> </section>`;
}, "/home/runner/work/Yuntas-Frontend/Yuntas-Frontend/src/components/about/MissionCard.astro", void 0);

const $$ValoresCorporativos = createComponent(($$result, $$props, $$slots) => {
  const valores = [
    {
      light: "Somos un",
      bold: "EQUIPO",
      icon: RiTeamFill
    },
    {
      light: "Velamos por",
      bold: "EL CLIENTE",
      icon: RiEmotionHappyFill
    },
    {
      light: "Somos",
      bold: "RESPETUOSOS",
      icon: RiShakeHandsFill
    },
    {
      light: "Orientamos",
      bold: "AL CLIENTE",
      icon: FaHeadset
    }
  ];
  return renderTemplate`${maybeRenderHead()}<section> <div class="bg-linear-to-b from-blue-950 from-65% bg-slate-900 w-full py-15"> <div class="text-5xl text-white font-extrabold text-center">
Nuestros valores
</div> </div> <div class="bg-cyan-500 py-24"> <div class="max-w-4xl mx-auto grid grid-cols-2 md:flex md:flex-row justify-between items-center text-white gap-8 text-center"> ${valores.map((valor) => {
    return renderTemplate`<div class="flex flex-col items-center gap-2 text-center text-2xl font-bold"> ${renderComponent($$result, "valor.icon", valor.icon, { "className": "size-24 md:size-32" })} <p class="flex flex-col"> ${valor.light} <span class="font-extrabold">${valor.bold}</span> </p> </div>`;
  })} </div> </div> </section>`;
}, "/home/runner/work/Yuntas-Frontend/Yuntas-Frontend/src/components/about/ValoresCorporativos.astro", void 0);

const $$VisionCard = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section class="w-full bg-white p-6 flex md:flex-col flex-row items-center justify-evenly md:h-full"> <div class="flex flex-col items-center md:order-1 md:w-1/2"> ${renderComponent($$result, "LuTelescope", LuTelescope, { "className": "bg-blue-500/90 rounded-3xl size-24 md:size-32 p-4" })} <div class="flex-col w-full"> <p class="text-blue-500 text-center font-extrabold text-2xl md:text-3xl my-4 mb-0 md:mb-4">
VISIÓN
</p> <hr class="border-2 border-blue-500"> </div> </div> <p class="text-gray-600 text-sm md:text-lg lg:text-xl font-semibold md:order-2 md:w-1/2 md:text-center text-wrap p-4">
Ser reconocidos como líderes en
<span class="text-blue-800/70 font-bold">soluciones tecnológicas</span> para
    iluminación y diseño en el mercado nacional peruano, impulsando la
<span class="text-blue-800/70 font-bold">innovación constante</span> y creando un impacto positivo en la comunidad
    local.
</p> </section>`;
}, "/home/runner/work/Yuntas-Frontend/Yuntas-Frontend/src/components/about/VisionCard.astro", void 0);

const about = new Proxy({"src":"/_astro/image.D0adUQTn.webp","width":1440,"height":771,"format":"webp"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/home/runner/work/Yuntas-Frontend/Yuntas-Frontend/src/assets/images/about/image.webp";
							}
							
							return target[name];
						}
					});

const $$About = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Sobre Nosotros", "canonicalUrl": "https://yuntaspublicidad.com/about/" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="relative w-full h-dvh flex justify-center items-center"> <img${addAttribute(about.src, "src")} alt="Oficina moderna iluminada con luces LED blancas, espacio de trabajo minimalista con escritorios, monitores y sillas, ideal para entornos corporativos creativos y tecnológicos" title="Oficina moderna iluminada con luces LED blancas" class="absolute z-0 w-full h-full object-cover object-bottom"> <h1 class="relative z-10 text-cyan-500 font-bold text-3xl md:text-5xl flex flex-col text-center sombra-title">
TU SOCIO PARA PERSONALIZAR
<span class="text-5xl md:text-8xl text-white">TU NEGOCIO</span> </h1> </section> ${renderComponent($$result2, "AboutComponent", $$AboutComponent, {})} <div class="card-container flex flex-col lg:flex-row justify-between items-stretch"> <div class="card flex-1 flex flex-col md:border-b-0 border-b-90 border-b-blue-950"> ${renderComponent($$result2, "MissionCard", $$MissionCard, {})} </div> <div class="card flex-1 flex flex-col"> ${renderComponent($$result2, "VisionCard", $$VisionCard, {})} </div> </div> ${renderComponent($$result2, "ValoresCorporativos", $$ValoresCorporativos, {})} ` })}`;
}, "/home/runner/work/Yuntas-Frontend/Yuntas-Frontend/src/pages/about.astro", void 0);

const $$file = "/home/runner/work/Yuntas-Frontend/Yuntas-Frontend/src/pages/about.astro";
const $$url = "/about";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$About,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
