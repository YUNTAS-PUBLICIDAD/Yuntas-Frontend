import { useState } from "react";
import MobileMenuUnified from "./MobileMenuUnified";
import ToggleNavbar from "./ui/ToggleNavbar";

const NavbarMobileWrapper = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <ToggleNavbar isOpen={isOpen} setIsOpen={setIsOpen} />
      <MobileMenuUnified isOpen={isOpen} onClose={() => setIsOpen(false)} logo="/images/yuntas_publicidad_logo.webp" />
    </>
  );
};

export default NavbarMobileWrapper;
