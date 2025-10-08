export { renderers } from '../../renderers.mjs';

async function GET() {
  try {
    const url = "https://apiyuntas.yuntaspublicidad.com/api/v1/auth/user";
    return new Response(JSON.stringify({
      message: "Endpoint para verificar permisos de usuario",
      instructions: "Usa este endpoint desde el cliente para verificar permisos"
    }), {
      status: 200,
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
  GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
