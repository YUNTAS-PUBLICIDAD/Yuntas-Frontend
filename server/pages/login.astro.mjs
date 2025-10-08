import { c as createComponent, d as createAstro, a as addAttribute, g as renderHead, f as renderSlot, r as renderTemplate, b as renderComponent } from '../chunks/astro/server_hsX-BFeG.mjs';
import 'kleur/colors';
import 'clsx';
/* empty css                                 */
import { jsxs, jsx, Fragment } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
/* empty css                                 */
import { g as getApiUrl, c as config } from '../chunks/config_CL3T0jDM.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$BlankLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$BlankLayout;
  const { title } = Astro2.props;
  return renderTemplate`<html lang="es" class="scroll-smooth"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>${title}</title>${renderHead()}</head> <body> ${renderSlot($$result, $$slots["default"])} </body></html>`;
}, "/home/runner/work/Yuntas-Frontend/Yuntas-Frontend/src/layouts/BlankLayout.astro", void 0);

const logo = "/_astro/yuntas_publicidad_logo.h6dFVRry.webp";

const loginImagen = "/_astro/Login_fondo.SxhXBwt_.webp";

const DesktopLogin = ({ handleLogin, logo, loginImagen }) => {
  return /* @__PURE__ */ jsxs("div", { className: "flex h-screen w-screen bg-gray-200", children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "w-1/2 h-full bg-cover bg-center",
        style: { backgroundImage: `url(${loginImagen})` },
        children: /* @__PURE__ */ jsx("div", { className: "w-full h-full bg-black/30 flex items-center justify-center", children: /* @__PURE__ */ jsxs("div", { className: "Montserrat text-center max-w-2xl px-4", children: [
          /* @__PURE__ */ jsxs("h1", { className: "sombra-title text-white text-5xl font-extrabold mb-4 leading-tight", children: [
            "Yuntas",
            /* @__PURE__ */ jsx("br", {}),
            "Producciones"
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "sombra-blanca text-white text-3xl font-light", children: [
            "te da la",
            /* @__PURE__ */ jsx("br", {}),
            "bienvenida"
          ] })
        ] }) })
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "w-1/2 h-full flex flex-col items-center justify-center p-8", children: /* @__PURE__ */ jsxs("div", { className: "w-full max-w-sm", children: [
      /* @__PURE__ */ jsx("img", { src: logo, alt: "Logo Yuntas", className: "w-24 md:w-32 mx-auto mb-6" }),
      /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold mb-6 text-center text-gray-800", children: "BIENVENIDO" }),
      /* @__PURE__ */ jsxs("form", { onSubmit: handleLogin, className: "w-full", children: [
        /* @__PURE__ */ jsx("div", { className: "mb-4", children: /* @__PURE__ */ jsx(
          "input",
          {
            type: "email",
            name: "email",
            className: "rounded-full bg-white w-full py-3 px-4 text-black leading-tight focus:outline-none focus:ring-2 focus:ring-[#23C1DE] placeholder-gray-500",
            placeholder: "Usuario"
          }
        ) }),
        /* @__PURE__ */ jsx("div", { className: "mb-6", children: /* @__PURE__ */ jsx(
          "input",
          {
            type: "password",
            name: "password",
            className: "rounded-full bg-white w-full py-3 px-4 text-black leading-tight focus:outline-none focus:ring-2 focus:ring-[#23C1DE] placeholder-gray-500",
            placeholder: "Password"
          }
        ) }),
        /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center", children: /* @__PURE__ */ jsx(
          "button",
          {
            className: "bg-[#23C1DE] hover:bg-[#1ca5be] text-white font-bold py-3 px-10 rounded-full focus:outline-none focus:shadow-outline transition duration-300",
            type: "submit",
            children: "INGRESAR"
          }
        ) })
      ] })
    ] }) })
  ] });
};

const MobileLogin = ({ handleLogin, logo, loginImagen }) => {
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: "h-screen w-screen bg-cover bg-center p-6 flex flex-col justify-between",
      style: { backgroundImage: `url(${loginImagen})` },
      children: [
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-black/40 z-0" }),
        /* @__PURE__ */ jsxs("div", { className: "relative z-10 text-center Montserrat text-white pt-16", children: [
          /* @__PURE__ */ jsxs("h1", { className: "sombra-title text-4xl font-extrabold mb-2 leading-tight", children: [
            "Yuntas",
            /* @__PURE__ */ jsx("br", {}),
            "Producciones"
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "sombra-blanca text-2xl font-light", children: [
            "te da la",
            /* @__PURE__ */ jsx("br", {}),
            "bienvenida"
          ] })
        ] }),
        /* @__PURE__ */ jsxs(
          "div",
          {
            className: "relative z-10 bg-white/10 backdrop-blur-lg rounded-3xl p-8 w-full max-w-md mx-auto mb-8 border border-white/20",
            children: [
              /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold mb-8 text-center text-white", children: "BIENVENIDO" }),
              /* @__PURE__ */ jsxs("form", { onSubmit: handleLogin, className: "w-full", children: [
                /* @__PURE__ */ jsx("div", { className: "mb-4", children: /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "email",
                    name: "email",
                    className: "rounded-full bg-white/80 w-full py-3 px-4 text-black leading-tight focus:outline-none focus:ring-2 focus:ring-[#23C1DE] placeholder-gray-600",
                    placeholder: "Usuario",
                    defaultValue: "admin@gmail.com"
                  }
                ) }),
                /* @__PURE__ */ jsx("div", { className: "mb-6", children: /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "password",
                    name: "password",
                    className: "rounded-full bg-white/80 w-full py-3 px-4 text-black leading-tight focus:outline-none focus:ring-2 focus:ring-[#23C1DE] placeholder-gray-600",
                    placeholder: "Password",
                    defaultValue: "password"
                  }
                ) }),
                /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center mt-8", children: /* @__PURE__ */ jsx(
                  "button",
                  {
                    className: "bg-[#23C1DE] hover:bg-[#1ca5be] text-white font-bold py-3 px-10 rounded-full focus:outline-none focus:shadow-outline transition duration-300",
                    type: "submit",
                    children: "INGRESAR"
                  }
                ) })
              ] })
            ]
          }
        )
      ]
    }
  );
};

const Login = () => {
  const [checkingAuth, setCheckingAuth] = useState(true);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      window.location.href = "/admin/inicio";
    } else {
      setCheckingAuth(false);
    }
  }, []);
  const handleLogin = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");
    try {
      const response = await fetch(getApiUrl(config.endpoints.auth.login), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("token", data.data.token);
        window.location.href = "/admin/inicio";
      } else {
        alert(data.message || "Error al iniciar sesión");
      }
    } catch (error) {
      alert("Error de conexión con el servidor.");
    }
  };
  if (checkingAuth) {
    return null;
  }
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { className: "hidden md:block", children: /* @__PURE__ */ jsx(DesktopLogin, { handleLogin, logo, loginImagen }) }),
    /* @__PURE__ */ jsx("div", { className: "block md:hidden", children: /* @__PURE__ */ jsx(MobileLogin, { handleLogin, logo, loginImagen }) })
  ] });
};

const $$Login = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "BlankLayout", $$BlankLayout, { "title": "Iniciar Sesi\xF3n - Yuntas" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "LoginComponent", Login, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/home/runner/work/Yuntas-Frontend/Yuntas-Frontend/src/components/Login.tsx", "client:component-export": "default" })} ` })}`;
}, "/home/runner/work/Yuntas-Frontend/Yuntas-Frontend/src/pages/login.astro", void 0);

const $$file = "/home/runner/work/Yuntas-Frontend/Yuntas-Frontend/src/pages/login.astro";
const $$url = "/login";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Login,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
