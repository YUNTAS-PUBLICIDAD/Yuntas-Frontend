import { useEffect, useState } from "react";
import { IoPersonCircle } from "react-icons/io5";
import clsx from "clsx";

import { useDarkMode } from "../hooks/darkmode/useDarkMode";
import { RUTAS } from "../constants/navigation"; // MEJORA: Constantes externalizadas
import "../styles/navbar.css";

import MobileMenuUnified from "./MobileMenuUnified";
import ToggleNavbar from "./ui/ToggleNavbar";
// MEJORA: Tipado de las props

interface NavbarProps {
  variant?: "default" | "admin";
  pathname: string;
}

interface NavItemProps {
  link: string;
  texto: string;
  title: string;
  isActive: boolean;
}

// MEJORA: Componente NavItem para reutilizar la lógica del enlace
const NavItem = ({ link, texto, title, isActive }: NavItemProps) => (
  <a
    href={link}
    title={title}
    className={clsx("relative px-4 py-2 text-base", { "font-bold": isActive })}
  >
    <span className="relative">{texto}</span>
  </a>
);

// MEJORA: Navbar
const Navbar = ({ variant = "default", pathname }: NavbarProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { darkMode } = useDarkMode();

  const navClasses = clsx(
    "fixed top-0 left-0 z-50 w-full flex justify-between items-center h-20 px-6 lg:px-10 py-4 transition-colors duration-300",
    {
      "bg-gradient-to-b from-[#0d1030] to-[#1a1a3a] shadow-md text-white": variant === "admin" && darkMode,
      "bg-gradient-to-b from-[#0d1030] to-[#293296] shadow-md text-white": variant === "admin" && !darkMode,
      // Mobile: transparente por defecto, blanco si scroll > 50
      "bg-transparent md:bg-white text-white md:text-[#0D1030]": variant === "default" && !isScrolled,
      "bg-white": variant === "default" && isScrolled,
      "shadow": isScrolled && variant === "default",
    }
  );

  const headerClasses = clsx("w-full z-50", {
    fixed: variant !== "admin",
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={headerClasses}>
      <nav className={navClasses}>
        <div className="flex items-center lg:hidden">
          <ToggleNavbar
            isOpen={menuOpen}
            setIsOpen={setMenuOpen}
            controlsId="mobile-nav"
          />
        </div>

        <a href="/login" className="ml-4 flex items-center justify-center md:hidden" title="Iniciar Sesión - Yuntas Publicidad">
          <IoPersonCircle size={40} aria-label="Login" />
        </a>

        <a href="/" title="Ir a la página de inicio" className="hidden md:block">
          <img
            src={variant === "admin" ? "/images/yuntas_publicidad_logo.webp" : "/images/yuntas_publicidad_logo-v2.webp"}
            width={59}
            height={56}
            // srcSet={'/images/yuntas_publicidad_logo_mobile.webp 60w, /images/yuntas_publicidad_logo_tablet.webp 125w'}
            // sizes="(max-width: 640px) 60px, 125px"
            alt="Logo Yuntas"
            title="Logo Yuntas Publicidad"
            loading="eager"
            className="h-14 w-auto"
          />
        </a>

        <div className="hidden lg:flex justify-between gap-x-4">
          {RUTAS.map((ruta) => (
            <NavItem
              key={ruta.link}
              {...ruta}
              isActive={pathname === ruta.link}
            />
          ))}
          <a href="/login" className="ml-4 flex items-center justify-center" title="Iniciar Sesión - Yuntas Publicidad">
            <IoPersonCircle size={40} className="text-[#203565]" aria-label="Login" />
          </a>
        </div>
      </nav>

      <MobileMenuUnified
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
      />
    </header>
  );
};

export default Navbar;