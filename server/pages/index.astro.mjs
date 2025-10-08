import { c as createComponent, m as maybeRenderHead, e as renderScript, b as renderComponent, r as renderTemplate, a as addAttribute } from '../chunks/astro/server_hsX-BFeG.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../chunks/Layout_oc6Si_Zm.mjs';
import { c as $$Image, $ as $$Picture } from '../chunks/_astro_assets_j3t7V6bN.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import { useRef, useState, useEffect } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
/* empty css                                 */
/* empty css                                 */
export { renderers } from '../renderers.mjs';

const card1 = new Proxy({"src":"/_astro/card_1.c_VqoZjA.webp","width":1280,"height":853,"format":"webp"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/home/runner/work/Yuntas-Frontend/Yuntas-Frontend/src/assets/images/inicio/cards/card_1.webp";
							}
							
							return target[name];
						}
					});

const card2 = new Proxy({"src":"/_astro/card_2.OJSNTOE-.webp","width":1200,"height":673,"format":"webp"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/home/runner/work/Yuntas-Frontend/Yuntas-Frontend/src/assets/images/inicio/cards/card_2.webp";
							}
							
							return target[name];
						}
					});

const bg_comentarios = new Proxy({"src":"/_astro/bg_comentarios.Dxp_r5S2.webp","width":1024,"height":852,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/home/runner/work/Yuntas-Frontend/Yuntas-Frontend/src/assets/images/inicio/bg_comentarios.webp";
							}
							
							return target[name];
						}
					});

const Slider = ({ comentarios }) => {
  const sliderRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const handleNavigation = (direction) => {
    if (sliderRef.current) {
      const slider = sliderRef.current;
      const scrollAmount = slider.clientWidth;
      if (direction === "next") {
        slider.scrollBy({ left: scrollAmount, behavior: "smooth" });
      } else {
        slider.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      }
    }
  };
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;
    const checkScrollPosition = () => {
      const { scrollLeft, scrollWidth, clientWidth } = slider;
      setIsAtStart(scrollLeft === 0);
      setIsAtEnd(scrollLeft + clientWidth >= scrollWidth - 1);
    };
    slider.addEventListener("scroll", checkScrollPosition);
    checkScrollPosition();
    return () => slider.removeEventListener("scroll", checkScrollPosition);
  }, [isMobile]);
  return /* @__PURE__ */ jsxs("div", { className: "relative w-full max-w-7xl mx-auto", children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        ref: sliderRef,
        className: "flex overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-hide",
        children: comentarios.map((comentario) => (
          // 4. Cada tarjeta es ahora un item del slider
          /* @__PURE__ */ jsx(
            "div",
            {
              className: "flex-shrink-0 w-full md:w-1/3 snap-center p-3 box-border",
              children: /* @__PURE__ */ jsxs("div", { className: "h-80 bg-white text-black rounded-2xl p-8 shadow-lg flex flex-col justify-between", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
                    /* @__PURE__ */ jsx("div", { className: "w-10 h-10 flex justify-center items-center bg-black text-white rounded-full", children: comentario.nombre.charAt(0) }),
                    /* @__PURE__ */ jsx("p", { className: "text-lg font-semibold", children: comentario.nombre })
                  ] }),
                  /* @__PURE__ */ jsx("p", { className: "mt-2 text-lg", children: comentario.comentario })
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-500 italic mt-4", children: [
                    "Publicado: ",
                    comentario.publicado
                  ] }),
                  /* @__PURE__ */ jsx("hr", { className: "border-gray-300 my-2" }),
                  /* @__PURE__ */ jsx("p", { className: "text-center text-yellow-500", children: "⭐".repeat(comentario.estrellas) })
                ] })
              ] })
            },
            comentario.id
          )
        ))
      }
    ),
    !isAtStart && /* @__PURE__ */ jsx(
      "button",
      {
        onClick: () => handleNavigation("prev"),
        className: "absolute top-1/2 left-0 -translate-y-1/2 p-2 m-2 bg-black rounded-full text-white cursor-pointer z-20",
        "aria-label": "Ir a la lista anterior",
        children: /* @__PURE__ */ jsx(FaArrowLeft, { className: "size-4 md:size-6" })
      }
    ),
    !isAtEnd && /* @__PURE__ */ jsx(
      "button",
      {
        onClick: () => handleNavigation("next"),
        className: "absolute top-1/2 right-0 -translate-y-1/2 p-2 m-2 bg-black rounded-full text-white cursor-pointer z-20",
        "aria-label": "Ir a la lista siguiente",
        children: /* @__PURE__ */ jsx(FaArrowRight, { className: "size-4 md:size-6" })
      }
    )
  ] });
};

const imagen1 = new Proxy({"src":"/_astro/diseño-luces-led-en-tunel.Cfmhe6Pr.webp","width":1440,"height":960,"format":"webp"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/home/runner/work/Yuntas-Frontend/Yuntas-Frontend/src/assets/images/inicio/slider/diseño-luces-led-en-tunel.webp";
							}
							
							return target[name];
						}
					});

const imagen2 = new Proxy({"src":"/_astro/estructura-iluminada-con-luces-led-para-exteriores.Bmn5uYBG.webp","width":1472,"height":1672,"format":"webp"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/home/runner/work/Yuntas-Frontend/Yuntas-Frontend/src/assets/images/inicio/slider/estructura-iluminada-con-luces-led-para-exteriores.webp";
							}
							
							return target[name];
						}
					});

const imagen3 = new Proxy({"src":"/_astro/slider_3.CJZ9VSgy.webp","width":1250,"height":750,"format":"webp"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/home/runner/work/Yuntas-Frontend/Yuntas-Frontend/src/assets/images/inicio/slider/slider_3.webp";
							}
							
							return target[name];
						}
					});

const $$Hero = createComponent(($$result, $$props, $$slots) => {
  const slidersData = [
    {
      src: imagen1,
      title: "T\xFAnel iluminado con luces LED",
      alt: "T\xFAnel iluminado con luces LED, dise\xF1o moderno de iluminaci\xF3n en espacios urbanos, tecnolog\xEDa visual para entornos impactantes y personalizados."
    },
    {
      src: imagen2,
      title: "Instalaci\xF3n arquitect\xF3nica curva",
      alt: "Instalaci\xF3n arquitect\xF3nica curva, iluminaci\xF3n LED roja, estructura exterior futurista, ideal para eventos nocturnos y espacios p\xFAblicos envolventes."
    },
    {
      src: imagen3,
      title: "Instalaciones de paneles electr\xF3nicos",
      alt: "Instalaciones de paneles electr\xF3nicos y sistemas visuales para negocios"
    }
  ];
  return renderTemplate`${maybeRenderHead()}<section class="relative w-full h-screen select-none overflow-hidden bg-black" data-astro-cid-znye3wee> <div class="hero-swiper" data-astro-cid-znye3wee> <div class="swiper" data-astro-cid-znye3wee> <div class="swiper-wrapper" data-astro-cid-znye3wee> ${slidersData.map((slide, index) => renderTemplate`<div class="swiper-slide" data-astro-cid-znye3wee> ${renderComponent($$result, "Image", $$Image, { "src": slide.src, "alt": slide.alt, "title": slide.title, "widths": [320, 540, 600, slide.src.width], "sizes": "(max-width: 420px) 320px, (max-width: 720px) 540px, (max-width: 1024px) 600px, 100vw", "quality": 60, "loading": index === 0 ? "eager" : "lazy", "class": "w-full h-full object-cover absolute inset-0", "data-astro-cid-znye3wee": true })}  <div class="absolute inset-0 flex flex-col justify-center items-center text-center px-4 sm:px-8 pointer-events-none z-20" data-astro-cid-znye3wee> <h1 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl Montserrat font-bold text-white sombra-title" data-astro-cid-znye3wee>
ESPECIALISTAS
</h1> <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl Montserrat font-black text-white sombra-title" data-astro-cid-znye3wee>
EN DISEÑAR TU ESPACIO
</h1> </div> </div>`)} </div> <!-- Controles --> <div class="swiper-pagination" data-astro-cid-znye3wee></div> </div> </div> </section>  ${renderScript($$result, "/home/runner/work/Yuntas-Frontend/Yuntas-Frontend/src/components/index/Hero.astro?astro&type=script&index=0&lang.ts")}`;
}, "/home/runner/work/Yuntas-Frontend/Yuntas-Frontend/src/components/index/Hero.astro", void 0);

const $$Index = createComponent(($$result, $$props, $$slots) => {
  const comentarios = [
    {
      id: 1,
      nombre: "Kathy Calle",
      comentario: "\xA1Incre\xEDble, redise\xF1aron todo mi local! Ahora derrocha brillo y personalidad.",
      publicado: "10/10/2024",
      estrellas: 5
    },
    {
      id: 2,
      nombre: "Fabricio Valle",
      comentario: "Como siempre, los m\xE1s confiables del mercado. Nunca me decepcionan con sus productos LED.",
      publicado: "10/10/2024",
      estrellas: 5
    },
    {
      id: 3,
      nombre: "Sofia Herrera",
      comentario: "\xA1Excelente! Nunca me imagin\xE9 que mi sal\xF3n brillar\xEDa tanto. Gracias YUNTAS.",
      publicado: "10/10/2024",
      estrellas: 5
    },
    {
      id: 4,
      nombre: "Carlos Mendoza",
      comentario: "El servicio al cliente es excepcional y los productos son de alta calidad.",
      publicado: "11/10/2024",
      estrellas: 4
    },
    {
      id: 5,
      nombre: "Lucia Perez",
      comentario: "Muy profesionales y atentos a los detalles. Mi oficina luce espectacular.",
      publicado: "12/10/2024",
      estrellas: 5
    },
    {
      id: 6,
      nombre: "Miguel Torres",
      comentario: "Gran experiencia, el equipo de YUNTAS es muy creativo y eficiente.",
      publicado: "13/10/2024",
      estrellas: 5
    }
  ];
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Yuntas Publicidad | Letreros Luminosos y Decoraci\xF3n LED en Lima.", "description": "Especialistas en letreros LED, paneles acr\xEDlicos y hologramas 3D en Lima. Transforma tu negocio con tecnolog\xEDa visual impactante. \xA1Cont\xE1ctanos hoy!", "keywords": "letreros led para negocio, yuntas, yuntas publicidad, yuntas producciones, yuntas decoraciones, decoraciones, iluminaci\xF3n led negocio, que son vinilos, precio led, productos led lima", "canonicalUrl": "https://yuntaspublicidad.com/" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="relative h-screen"> <!-- <HeroSlider client:load /> --> ${renderComponent($$result2, "Hero", $$Hero, {})} </section>  <div class="w-full bg-white text-blue-950 text-center text-2xl md:text-3xl font-extrabold py-6"> <h2>¡SOMOS YUNTAS PRODUCCIONES!</h2> </div> <section class="px-4 sm:px-8 md:px-16 lg:px-24 text-white bg-gradient-to-b from-blue-900 to-indigo-950 flex flex-col items-center"> <a href="/contact" class="mt-10 mb-7 font-bold bg-gradient-to-l from-cyan-300 to-cyan-600 px-6 sm:px-8 py-2 rounded-full text-lg sm:text-xl hover:from-cyan-600 hover:to-cyan-300 mx-auto">
¡Cotiza ahora!
</a> <hr class="mb-13 w-4/5 sm:w-3/4 md:w-2/3 lg:w-1/2 border-t border-cyan-400 my-6 mx-auto"> <div class="flex flex-col justify-between items-center w-full h-auto"> <div class="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 w-full"> <div class="rounded-4xl w-full bg-white text-black"> ${renderComponent($$result2, "Picture", $$Picture, { "src": card1, "formats": ["webp"], "alt": "T\xFAnel urbano, luces LED azules, experiencia inmersiva, ideal para ambientaciones modernas y espacios interactivos", "title": "T\xFAnel urbano", "class": "h-64 sm:h-80 md:h-96 w-full rounded-t-4xl object-cover object-center", "width": 685, "height": 384, "widths": [320, 540, 600, card1.width], "sizes": "(max-width: 420px) 300px, (max-width: 720px) 340px, (max-width: 1024px) 420px, 100vw", "quality": 60 })} <p class="w-full text-center italic py-4 px-6 sm:px-14 text-sm sm:text-base cursor-default">
Descubre cómo integrar esta innovadora tecnología en tus proyectos
            arquitectónicos
</p> </div> <div class="rounded-4xl w-full bg-white text-black"> ${renderComponent($$result2, "Picture", $$Picture, { "src": card2, "formats": ["webp"], "alt": "Puente geom\xE9trico, barras pixel LED p\xFArpura y \xE1mbar, iluminaci\xF3n envolvente, ideal para intervenciones urbanas nocturnas", "title": "Puente geom\xE9trico", "class": "h-64 sm:h-80 md:h-96 w-full rounded-t-4xl object-cover object-center", "width": 685, "height": 384, "widths": [320, 540, 600, card2.width], "sizes": "(max-width: 420px) 320px, (max-width: 720px) 540px, (max-width: 1024px) 600px, 100vw", "quality": 60 })} <p class="w-full text-center italic py-4 px-6 sm:px-14 text-sm sm:text-base cursor-default">
Aprende cómo esta tecnología transforma el ambiente y optimiza el
            consumo energético
</p> </div> </div> <hr class="mx-auto w-2/3 sm:w-1/2 md:w-1/3 border-cyan-400 my-10"> </div> <!-- Sección de testimonios --> <div class="py-20 w-full max-w-8xl mx-auto px-4 md:px-0 relative"> <h3 class="text-2xl md:text-3xl font-semibold text-center mb-12">
Tu opinión es importante para <span class="font-extrabold">NOSOTROS</span> </h3></div> </section> <section class="relative w-full min-h-screen flex justify-center items-center"> <img${addAttribute(bg_comentarios.src, "src")} alt="Luminaria LED innovadora para interior de cafetería, estilo contemporáneo, ideal para espacios cálidos y funcionales" title="Luminaria LED" class="absolute z-0 w-full h-full object-cover" loading="lazy"> <div class="relative z-10 p-6 w-full"> ${renderComponent($$result2, "CommentSlider", Slider, { "comentarios": comentarios, "client:visible": true, "client:component-hydration": "visible", "client:component-path": "/home/runner/work/Yuntas-Frontend/Yuntas-Frontend/src/components/index/ComentariosSlider.jsx", "client:component-export": "default" })} </div> </section> ` })}`;
}, "/home/runner/work/Yuntas-Frontend/Yuntas-Frontend/src/pages/index.astro", void 0);

const $$file = "/home/runner/work/Yuntas-Frontend/Yuntas-Frontend/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Index,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
