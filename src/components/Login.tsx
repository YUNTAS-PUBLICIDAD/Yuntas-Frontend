import { useEffect, useState, type FormEvent } from "react";
import "../../src/styles/login.css";
import logo from "../assets/images/yuntas_publicidad_logo.webp?url";
import loginImagen from "../assets/images/login/Login_fondo.webp?url";
import { config, getApiUrl } from "../../config";


const Login = () => {
  const [error, setError] = useState<string | null>(null);
  const [isActive, setIsActive] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [hasCheckedWidth, setHasCheckedWidth] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true); // 👈 Nuevo estado

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      window.location.href = "/admin/inicio";
    } else {
      setCheckingAuth(false); // 👈 Solo mostramos el formulario si no hay token
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

  // 🚫 No renderizar nada mientras se verifica el token
  if (checkingAuth) {
    return null;
  }

  return (
    <div className="flex h-screen w-screen bg-gray-200"> 
      {/* Fondo lateral */}
      <div
        className="hidden md:block md:w-1/2 h-full bg-cover bg-center"
        style={{ backgroundImage: `url(${loginImagen})` }}
      >
        <div className="w-full h-full bg-black/30 flex items-center justify-center">
          <div className="Montserrat text-center max-w-2xl px-4">
            <h1 className="sombra-title text-white text-5xl font-extrabold mb-4 leading-tight">
              Yuntas<br />Producciones
            </h1>
            <p className="sombra-blanca text-white text-3xl font-light">
              te da la<br />bienvenida
            </p>
          </div>
        </div>
      </div>

       {/* ===== PANEL DERECHO (FORMULARIO) ===== */}
      <div className="w-full md:w-1/2 h-full flex flex-col items-center justify-center p-8">
        <div className="w-full max-w-sm">
          <img src={logo} alt="Logo Yuntas" className="w-24 md:w-32 mx-auto mb-6" />
          <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
            BIENVENIDO
          </h1>
          <form onSubmit={handleLogin} className="w-full">
            <div className="mb-4">
              <input
                type="email"
                name="email"
                className="rounded-full bg-white w-full py-3 px-4 text-black leading-tight focus:outline-none focus:ring-2 focus:ring-[#23C1DE] placeholder-gray-500"
                placeholder="Usuario"
              />
            </div>
            <div className="mb-6">
              <input
                type="password"
                name="password"
                className="rounded-full bg-white w-full py-3 px-4 text-black leading-tight focus:outline-none focus:ring-2 focus:ring-[#23C1DE] placeholder-gray-500"
                placeholder="Password"
              />
            </div>
            <div className="flex items-center justify-center">
              <button
                className="bg-[#23C1DE] hover:bg-[#1ca5be] text-white font-bold py-3 px-10 rounded-full focus:outline-none focus:shadow-outline transition duration-300"
                type="submit"
              >
                INGRESAR
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
