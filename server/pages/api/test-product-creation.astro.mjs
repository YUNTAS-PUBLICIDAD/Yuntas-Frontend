export { renderers } from '../../renderers.mjs';

async function POST() {
  try {
    const formData = new FormData();
    formData.append("title", "Producto de Prueba API");
    formData.append("subtitle", "Prueba desde frontend");
    formData.append("tagline", "Testing API");
    formData.append("description", "Este es un producto de prueba creado desde el frontend");
    formData.append("nombreProducto", "Test Product");
    formData.append("stockProducto", "10");
    formData.append("precioProducto", "99.99");
    formData.append("seccion", "Pruebas");
    const token = "TU_TOKEN_AQUI";
    const response = await fetch("https://apiyuntas.yuntaspublicidad.com/api/v1/productos", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Authorization": `Bearer ${token}`,
        "X-Requested-With": "XMLHttpRequest"
      },
      body: formData
    });
    const result = await response.json();
    return new Response(JSON.stringify({
      success: response.ok,
      status: response.status,
      data: result,
      message: response.ok ? "Producto creado exitosamente" : "Error al crear producto"
    }), {
      status: response.status,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    });
  } catch (error) {
    return new Response(JSON.stringify({
      success: false,
      error: error instanceof Error ? error.message : "Error desconocido"
    }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    });
  }
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
