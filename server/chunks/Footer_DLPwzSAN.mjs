import { c as createComponent, d as createAstro, b as renderComponent, r as renderTemplate } from './astro/server_hsX-BFeG.mjs';
import 'kleur/colors';
import { jsxs, jsx } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
import { IoClose, IoPerson } from 'react-icons/io5';
import clsx from 'clsx';
/* empty css                         */
import { FaRegFolder, FaFacebook, FaWhatsapp, FaInstagram, FaTiktok, FaLinkedin, FaYoutube } from 'react-icons/fa';
import { RxHamburgerMenu } from 'react-icons/rx';
import { FaTiktok as FaTiktok$1 } from 'react-icons/fa6';
import { MdEmail } from 'react-icons/md';

const yuntasLogo = new Proxy({"src":"/_astro/yuntas_publicidad_logo.h6dFVRry.webp","width":304,"height":287,"format":"webp"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/home/runner/work/Yuntas-Frontend/Yuntas-Frontend/src/assets/images/yuntas_publicidad_logo.webp";
							}
							
							return target[name];
						}
					});

const useDarkMode = () => {
  const [darkMode, setDarkMode] = useState(false);
  const applyDarkMode = (isDark) => {
    if (typeof window === "undefined") return;
    const htmlElement = document.documentElement;
    const bodyElement = document.body;
    const mainElement = document.getElementById("main-content");
    if (isDark) {
      htmlElement.classList.add("dark");
      bodyElement.classList.add("dark");
      if (mainElement) {
        mainElement.classList.remove("bg-gray-50", "text-gray-900");
        mainElement.classList.add("bg-gray-800", "text-gray-100");
      }
    } else {
      htmlElement.classList.remove("dark");
      bodyElement.classList.remove("dark");
      if (mainElement) {
        mainElement.classList.remove("bg-gray-800", "text-gray-100");
        mainElement.classList.add("bg-gray-50", "text-gray-900");
      }
    }
  };
  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("darkMode", JSON.stringify(newMode));
    applyDarkMode(newMode);
    window.dispatchEvent(
      new CustomEvent("darkModeToggle", {
        detail: { darkMode: newMode }
      })
    );
  };
  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = localStorage.getItem("darkMode");
    const initialMode = stored ? JSON.parse(stored) : false;
    setDarkMode(initialMode);
    applyDarkMode(initialMode);
    const handleDarkModeChange = (event) => {
      const customEvent = event;
      const newMode = customEvent.detail.darkMode;
      setDarkMode(newMode);
    };
    window.addEventListener("darkModeToggle", handleDarkModeChange);
    return () => {
      window.removeEventListener("darkModeToggle", handleDarkModeChange);
    };
  }, []);
  return { darkMode, toggleDarkMode };
};

const RUTAS = [
  { link: "/", texto: "INICIO", title: "Página de Inicio - Yuntas Publicidad" },
  { link: "/products", texto: "PRODUCTOS", title: "Productos - Yuntas Publicidad" },
  { link: "/about", texto: "NOSOTROS", title: "Nosotros - Yuntas Publicidad" },
  { link: "/blogs", texto: "BLOG", title: "Blog - Yuntas Publicidad" },
  { link: "/contact", texto: "CONTACTO", title: "Contacto - Yuntas Publicidad" }
];

const MobileMenuUnified = ({ isOpen, logo, onClose }) => {
  const [isMobile, setIsMobile] = useState(true);
  const [adminOpen, setAdminOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [hasToken, setHasToken] = useState(false);
  const { darkMode, toggleDarkMode } = useDarkMode();
  useEffect(() => {
    setMounted(true);
    setHasToken(!!localStorage.getItem("token"));
    const handleResize = () => setIsMobile(window.innerWidth <= 1023);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  if (!isMobile) return null;
  const publicLinks = [
    { texto: "Inicio", link: "/" },
    { texto: "Productos", link: "/products" },
    { texto: "Nosotros", link: "/about" },
    { texto: "Blog", link: "/blogs" },
    { texto: "Contacto", link: "/contact" }
  ];
  const adminLinks = [
    { name: "Dashboard", path: "/admin/inicio" },
    { name: "Seguimiento", path: "/admin/seguimiento" },
    { name: "Blogs", path: "/admin/" },
    { name: "Productos", path: "/admin/productos" },
    { name: "Usuarios", path: "/admin/usuarios" }
  ];
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
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: `lg:hidden fixed inset-0 bg-[#0D1030] z-50 transform transition-transform duration-500 ease-in-out overflow-y-auto ${isOpen ? "translate-x-0" : "-translate-x-full"}`,
      children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between p-6", children: [
          logo && /* @__PURE__ */ jsx(
            "img",
            {
              src: "/images/yuntas_publicidad_logo.webp",
              srcSet: "/images/yuntas_publicidad_logo_mobile.webp 60w, /images/yuntas_publicidad_logo_tablet.webp 125w",
              sizes: "(max-width: 640px) 60px, 125px",
              alt: "Logo Yuntas",
              width: 80,
              height: 80,
              className: "h-[50px] w-auto cursor-pointer"
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: onClose,
              "aria-label": "Cerrar menu",
              className: "text-white text-4xl hover:text-red-400 transition-colors",
              children: /* @__PURE__ */ jsx(IoClose, {})
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("nav", { className: "flex flex-col", children: [
          publicLinks.map((item) => /* @__PURE__ */ jsx(
            "a",
            {
              href: item.link,
              onClick: onClose,
              className: "text-white px-8 py-4 hover:text-indigo-200 text-xl font-medium border-b border-gray-100",
              children: item.texto
            },
            item.link
          )),
          mounted && hasToken && /* @__PURE__ */ jsxs("div", { className: "border-b border-gray-100", children: [
            /* @__PURE__ */ jsxs(
              "button",
              {
                onClick: () => setAdminOpen(!adminOpen),
                className: "w-full flex justify-between items-center px-8 py-4 text-white text-xl font-medium hover:text-indigo-200",
                children: [
                  "Admin",
                  /* @__PURE__ */ jsx("span", { children: adminOpen ? "▲" : "▼" })
                ]
              }
            ),
            adminOpen && /* @__PURE__ */ jsx("div", { className: "flex flex-col pl-12 pb-2", children: adminLinks.map((item, index) => /* @__PURE__ */ jsxs(
              "a",
              {
                href: item.path,
                onClick: onClose,
                className: "flex items-center gap-2 py-2 text-white hover:text-indigo-200",
                children: [
                  /* @__PURE__ */ jsx(FaRegFolder, {}),
                  item.name
                ]
              },
              index
            )) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "border-b border-gray-100 px-8 py-4 flex justify-between items-center text-white", children: [
          /* @__PURE__ */ jsx("span", { className: "text-lg", children: "Dark Mode" }),
          /* @__PURE__ */ jsxs("label", { className: "relative inline-flex items-center cursor-pointer", children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "checkbox",
                className: "sr-only peer",
                checked: darkMode,
                onChange: toggleDarkMode,
                "aria-label": "Activar modo oscuro"
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
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-y-2 m-8", children: [
          /* @__PURE__ */ jsxs(
            "a",
            {
              href: "https://www.facebook.com/yuntaspublicidad",
              target: "_blank",
              "aria-label": "Facebook",
              title: "Facebook - Yuntas Publicidad",
              className: "flex items-center gap-1 text-white",
              children: [
                /* @__PURE__ */ jsx(FaFacebook, { className: "text-2xl hover:text-blue-500" }),
                /* @__PURE__ */ jsx("span", { className: "font-light", children: "Yuntas Producciones" })
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            "a",
            {
              href: "https://wa.me/912849782",
              target: "_blank",
              "aria-label": "WhatsApp",
              title: "WhatsApp - Yuntas Publicidad",
              className: "flex items-center gap-1 text-white",
              children: [
                /* @__PURE__ */ jsx(FaWhatsapp, { className: "text-2xl hover:text-green-500" }),
                /* @__PURE__ */ jsx("span", { className: "font-light", children: "+51 912 849 782" })
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            "a",
            {
              href: "https://www.instagram.com/yuntasdecoracioncomercial/",
              target: "_blank",
              "aria-label": "Instagram",
              title: "Instagram - Yuntas Publicidad",
              className: "flex items-center gap-1 text-white",
              children: [
                /* @__PURE__ */ jsx(FaInstagram, { className: "text-2xl hover:text-pink-500" }),
                /* @__PURE__ */ jsx("span", { className: "font-light", children: "Yuntas Producciones" })
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            "a",
            {
              href: "https://www.tiktok.com/@yuntasproduccione",
              target: "_blank",
              "aria-label": "TikTok",
              title: "TikTok - Yuntas Publicidad",
              className: "flex items-center gap-1 text-white",
              children: [
                /* @__PURE__ */ jsx(FaTiktok, { className: "text-2xl hover:text-purple-500" }),
                /* @__PURE__ */ jsx("span", { className: "font-light", children: "Yuntas Producciones" })
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            "a",
            {
              href: "https://www.linkedin.com/company/yuntas-producciones/",
              target: "_blank",
              "aria-label": "LinkedIn",
              title: "LinkedIn - Yuntas Publicidad",
              className: "flex items-center gap-1 text-white",
              children: [
                /* @__PURE__ */ jsx(FaLinkedin, { className: "text-2xl hover:text-blue-700" }),
                /* @__PURE__ */ jsx("span", { className: "font-light", children: "Yuntas Producciones" })
              ]
            }
          )
        ] }),
        mounted && hasToken && /* @__PURE__ */ jsx("div", { className: "border-t border-gray-400 pt-4 text-center px-6 pb-8", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center space-y-1", children: [
          /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-full flex items-center justify-center text-lg bg-gray-500 text-white", children: "👤" }),
          /* @__PURE__ */ jsx("p", { className: "font-semibold text-white", children: "Bienvenido" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-300", children: "Administrador" }),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: logout,
              className: "mt-2 w-full py-2 rounded-full transition bg-blue-800 hover:bg-blue-600 text-white",
              children: "Cerrar sesión"
            }
          )
        ] }) })
      ]
    }
  );
};

const ToggleNavbar = ({
  isOpen,
  setIsOpen,
  controlsId = "mobile-nav"
}) => {
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };
  return /* @__PURE__ */ jsx(
    "button",
    {
      type: "button",
      onClick: handleToggle,
      "aria-label": isOpen ? "Cerrar menú" : "Abrir menú",
      "aria-expanded": isOpen,
      "aria-controls": controlsId,
      className: "block lg:hidden cursor-pointer",
      children: isOpen ? /* @__PURE__ */ jsx(IoClose, { className: "text-3xl" }) : /* @__PURE__ */ jsx(RxHamburgerMenu, { className: "text-3xl" })
    }
  );
};

const NavItem = ({ link, texto, title, isActive }) => /* @__PURE__ */ jsx(
  "a",
  {
    href: link,
    title,
    className: clsx("relative px-6 py-2", { "border-effect": isActive }),
    children: /* @__PURE__ */ jsx("span", { className: "relative", children: texto })
  }
);
const Navbar = ({ variant = "default", pathname }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { darkMode } = useDarkMode();
  const navClasses = clsx(
    "relative w-full flex justify-between items-center h-20 px-6 lg:px-10 py-4 font-semibold text-white",
    {
      "bg-gradient-to-b from-[#0d1030] to-[#1a1a3a] shadow-md": variant === "admin" && darkMode,
      "bg-gradient-to-b from-[#0d1030] to-[#293296] shadow-md": variant === "admin" && !darkMode,
      "bg-gradient-to-b from-slate-900/85 to-transparent": variant === "default"
    }
  );
  const headerClasses = clsx("w-full z-20", {
    fixed: variant !== "admin"
  });
  return /* @__PURE__ */ jsxs("header", { className: headerClasses, children: [
    /* @__PURE__ */ jsxs("nav", { className: navClasses, children: [
      /* @__PURE__ */ jsx("div", { className: "flex items-center lg:hidden", children: /* @__PURE__ */ jsx(
        ToggleNavbar,
        {
          isOpen: menuOpen,
          setIsOpen: setMenuOpen,
          controlsId: "mobile-nav"
        }
      ) }),
      /* @__PURE__ */ jsx("a", { href: "/", title: "Ir a la página de inicio", children: /* @__PURE__ */ jsx(
        "img",
        {
          src: "/images/yuntas_publicidad_logo.webp",
          width: 59,
          height: 56,
          srcSet: "/images/yuntas_publicidad_logo_mobile.webp 60w, /images/yuntas_publicidad_logo_tablet.webp 125w",
          sizes: "(max-width: 640px) 60px, 125px",
          alt: "Logo Yuntas",
          title: "Logo Yuntas Publicidad",
          loading: "eager",
          className: "h-14 w-auto"
        }
      ) }),
      /* @__PURE__ */ jsx("div", { className: "hidden lg:flex justify-between gap-x-6", children: RUTAS.map((ruta) => /* @__PURE__ */ jsx(
        NavItem,
        {
          ...ruta,
          isActive: pathname === ruta.link
        },
        ruta.link
      )) }),
      /* @__PURE__ */ jsx("a", { href: "/login", className: "ml-4", title: "Iniciar Sesión - Yuntas Publicidad", children: /* @__PURE__ */ jsx(IoPerson, { className: "text-3xl", "aria-label": "Login" }) })
    ] }),
    /* @__PURE__ */ jsx(
      MobileMenuUnified,
      {
        isOpen: menuOpen,
        onClose: () => setMenuOpen(false)
      }
    )
  ] });
};

const $$Astro$1 = createAstro();
const $$Navbar = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Navbar;
  const { variant = "default" } = Astro2.props;
  return renderTemplate`<!-- Navbar principal en escritorio -->${renderComponent($$result, "Navbar", Navbar, { "variant": variant, "pathname": Astro2.url.pathname, "client:idle": true, "client:component-hydration": "idle", "client:component-path": "/home/runner/work/Yuntas-Frontend/Yuntas-Frontend/src/components/Navbar.tsx", "client:component-export": "default" })}`;
}, "/home/runner/work/Yuntas-Frontend/Yuntas-Frontend/src/components/Navbar.astro", void 0);

const Footerjsx = ({ variant = "default" }) => {
  const { darkMode } = useDarkMode();
  const isAdmin = variant === "admin";
  const footerClasses = isAdmin ? darkMode ? "bg-gradient-to-b from-[#0d1030] to-[#1a1a3a] text-white shadow-md" : "bg-gradient-to-b from-[#0d1030] to-[#293296] text-white shadow-md" : "bg-[#172649] text-white";
  return /* @__PURE__ */ jsx(
    "footer",
    {
      className: `${footerClasses} ${isAdmin ? "py-6" : "py-16"} text-sm sm:text-base`,
      children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto flex flex-col md:flex-row justify-between items-center lg:px-20 gap-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center text-center md:text-left mb-8 md:mb-0 w-full md:w-auto", children: [
          /* @__PURE__ */ jsx(
            "img",
            {
              src: yuntasLogo.src,
              alt: "Yuntas Logo",
              title: "Logo Yuntas Publicidad",
              className: `mx-auto ${isAdmin ? "h-16" : "h-24"}`
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "border-t-1 border-l-2 border-cyan-400 max-w-54 w-full my-2" }),
          /* @__PURE__ */ jsxs("div", { className: "flex justify-center gap-3 mt-4", children: [
            /* @__PURE__ */ jsx(
              "a",
              {
                href: "https://www.facebook.com/yuntaspublicidad",
                title: "Facebook de Yuntas Publicidad",
                target: "_blank",
                "aria-label": "Facebook",
                children: /* @__PURE__ */ jsx(FaFacebook, { className: "text-white text-2xl hover:text-blue-500" })
              }
            ),
            /* @__PURE__ */ jsx(
              "a",
              {
                href: "https://www.instagram.com/yuntasdecoracioncomercial/",
                target: "_blank",
                title: "Instagram de Yuntas Publicidad",
                "aria-label": "Instagram",
                children: /* @__PURE__ */ jsx(FaInstagram, { className: "text-white text-2xl hover:text-pink-500" })
              }
            ),
            /* @__PURE__ */ jsx(
              "a",
              {
                href: "https://www.youtube.com/@yuntaspublicidad5082/",
                target: "_blank",
                "aria-label": "YouTube",
                title: "YouTube de Yuntas Publicidad",
                children: /* @__PURE__ */ jsx(FaYoutube, { className: "text-white text-2xl hover:text-red-500" })
              }
            ),
            /* @__PURE__ */ jsx(
              "a",
              {
                href: "https://wa.me/912849782",
                target: "_blank",
                "aria-label": "WhatsApp",
                title: "WhatsApp de Yuntas Publicidad",
                children: /* @__PURE__ */ jsx(FaWhatsapp, { className: "text-white text-2xl hover:text-green-500" })
              }
            ),
            /* @__PURE__ */ jsx(
              "a",
              {
                href: "https://www.tiktok.com/@yuntasproduccione",
                target: "_blank",
                "aria-label": "TikTok",
                title: "TikTok de Yuntas Publicidad",
                children: /* @__PURE__ */ jsx(FaTiktok$1, { className: "text-white text-2xl hover:text-purple-500" })
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "text-center md:text-left mb-8 md:mb-0", children: [
          /* @__PURE__ */ jsx("h3", { className: "font-semibold text-[#98D8DF]", children: "Dirección" }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-300", children: "Urb. Alameda La Rivera Mz F Lt 30" }),
          /* @__PURE__ */ jsx("h3", { className: "font-semibold text-[#98D8DF] mt-4", children: "Horario" }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-300", children: "L - V: 9 a.m - 5 p.m" }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-300", children: "S: 9 a.m - 2 p.m" }),
          /* @__PURE__ */ jsx("a", { href: "/libro_reclamaciones", className: "text-sm font-bold mt-2 block", title: "Libro de Reclamaciones - Yuntas Publicidad", children: "Libro de reclamaciones" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "text-center md:text-left", children: [
          /* @__PURE__ */ jsx("h3", { className: "font-semibold text-[#98D8DF]", children: "Contacto" }),
          /* @__PURE__ */ jsxs("p", { className: "flex items-center justify-center md:justify-start gap-2", children: [
            /* @__PURE__ */ jsx(FaWhatsapp, { className: "text-white" }),
            " +51 912 849 782"
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "flex items-center justify-center md:justify-start gap-2 mt-2", children: [
            /* @__PURE__ */ jsx(MdEmail, { className: "text-white" }),
            /* @__PURE__ */ jsx(
              "a",
              {
                href: "mailto:yuntaspublicidad@gmail.com",
                className: "hover:text-blue-400",
                title: "Correo de Contacto Yuntas Publicidad",
                children: "yuntaspublicidad@gmail.com"
              }
            )
          ] })
        ] })
      ] })
    }
  );
};

const $$Astro = createAstro();
const $$Footer = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Footer;
  const { variant = "default" } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "Footerjsx", Footerjsx, { "variant": variant, "client:visible": true, "client:component-hydration": "visible", "client:component-path": "/home/runner/work/Yuntas-Frontend/Yuntas-Frontend/src/components/Footer", "client:component-export": "default" })}`;
}, "/home/runner/work/Yuntas-Frontend/Yuntas-Frontend/src/components/Footer.astro", void 0);

export { $$Footer as $, $$Navbar as a, useDarkMode as u, yuntasLogo as y };
