
const MobileLogin = ({ handleLogin, logo, loginImagen }) => {
  return (
    <div
      className="h-screen w-screen bg-cover bg-center p-6 flex flex-col justify-between"
      style={{ backgroundImage: `url(${loginImagen})` }}
    >
      <div className="absolute inset-0 bg-black/40 z-0"></div>

      {/* ===== SECCIÓN SUPERIOR (BIENVENIDA) - se empuja hacia arriba ===== */}
      <div className="relative z-10 text-center Montserrat text-white pt-16">
        <h1 className="sombra-title text-4xl font-extrabold mb-2 leading-tight">
          Yuntas<br />Producciones
        </h1>
        <p className="sombra-blanca text-2xl font-light">
          te da la<br />bienvenida
        </p>
      </div>

      {/* ===== TARJETA INFERIOR (FORMULARIO) - se empuja hacia abajo ===== */}
      <div 
        className="relative z-10 bg-white/10 backdrop-blur-lg rounded-3xl p-8 w-full max-w-md mx-auto mb-8 border border-white/20"
      >
        <h2 className="text-3xl font-bold mb-8 text-center text-white">
          BIENVENIDO
        </h2>
        
        <form onSubmit={handleLogin} className="w-full">
          <div className="mb-4">
            <input
              type="email"
              name="email"
              className="rounded-full bg-white/80 w-full py-3 px-4 text-black leading-tight focus:outline-none focus:ring-2 focus:ring-[#23C1DE] placeholder-gray-600"
              placeholder="Usuario"
              defaultValue="admin@gmail.com"
            />
          </div>
          <div className="mb-6">
            <input
              type="password"
              name="password"
              className="rounded-full bg-white/80 w-full py-3 px-4 text-black leading-tight focus:outline-none focus:ring-2 focus:ring-[#23C1DE] placeholder-gray-600"
              placeholder="Password"
              defaultValue="password"
            />
          </div>
          <div className="flex items-center justify-center mt-8">
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
  );
};

export default MobileLogin;