import { useEffect, useState, type FormEvent } from "react";
import "../../src/styles/login.css";
import logo from "../../public/images/yuntas_publicidad_logo.webp?url";
import loginImagen from "../assets/images/login/Login_fondo.webp?url";
import { config, getApiUrl } from "../../config";
import DesktopLogin from "../components/login/DesktopLogin";
import MobileLogin from "../components/login/MobileLogin";

const Login = () => {
  
  const [checkingAuth, setCheckingAuth] = useState(true); //  Nuevo estado

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      window.location.href = "/admin/inicio";
    } else {
      setCheckingAuth(false); //  Solo mostramos el formulario si no hay token
    }

    
  }, []);

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
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
        body: JSON.stringify({ email, password }),
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

  //  No renderizar nada mientras se verifica el token
  if (checkingAuth) {
    return null;
  }

  return (
     <>
      {/* Versión de Escritorio: Oculta en móvil, visible en md y superior */}
      <div className="hidden md:block">
        <DesktopLogin handleLogin={handleLogin} logo={logo} loginImagen={loginImagen} />
      </div>

      {/* Versión Móvil: Visible por defecto, oculta en md y superior */}
      <div className="block md:hidden">
        <MobileLogin handleLogin={handleLogin} logo={logo} loginImagen={loginImagen} />
      </div>
    </>
  );
};

export default Login;
