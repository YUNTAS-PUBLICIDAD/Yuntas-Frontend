const config = {
  // La URL de la API se obtiene de la variable de entorno PUBLIC_API_URL
  // Si no está definida, usa el fallback de producción
  apiUrl: "https://apiyuntas.yuntaspublicidad.com",
  environment: "development",
  // Entorno de la aplicación, por defecto development
  endpoints: {
    auth: {
      // Endpoints de autenticaci贸
      login: "/api/v1/auth/login",
      logout: "/api/v1/auth/logout"
    },
    users: {
      // Endpoints de usuarios
      list: "/api/v1/users",
      detail: (id) => `/api/v1/users/${id}`,
      create: "/api/v1/users",
      update: (id) => `/api/v1/users/${id}`,
      delete: (id) => `/api/v1/users/${id}`
    },
    clientes: {
      // Endpoints de clientes
      list: "/api/v1/clientes",
      detail: (id) => `/api/v1/clientes/${id}`,
      create: "/api/v1/clientes",
      update: (id) => `/api/v1/clientes/${id}`,
      delete: (id) => `/api/v1/clientes/${id}`
    },
    productos: {
      // Endpoints de productos
      list: "/api/v1/productos",
      all: "/api/v1/productos/all",
      detail: (id) => `/api/v1/productos/${id}`,
      link: (link) => `/api/v1/productos/link/${link}`,
      create: "/api/v1/productos",
      update: (id) => `/api/v1/productos/${id}`,
      delete: (id) => `/api/v1/productos/${id}`,
      info: "/api/v1/solicitar-info-producto"
    },
    blogs: {
      // Endpoints de blogs
      list: "/api/blogs",
      detail: (id) => `/api/blogs/${id}`,
      link: (link) => `/api/blogs/link/${link}`,
      create: "/api/blogs",
      update: (id) => `/api/blogs/${id}`,
      delete: (id) => `/api/blogs/${id}`
    }
  }
};
const getApiUrl = (endpoint) => {
  const url = `${config.apiUrl}${endpoint}`;
  console.log(`[${config.environment}] Requesting:`, url);
  return url;
};

export { config as c, getApiUrl as g };
