export async function GET() {
  try {
    // Usar SIEMPRE la API de producción
    const apiUrl = "https://apiyuntas.yuntaspublicidad.com/api/v1/productos";
    
    console.log('🌐 Usando API de PRODUCCIÓN');
    console.log('📡 API URL:', apiUrl);
    
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization"
      }
    });

  } catch (error) {
    console.error("Error en el servidor:", error);
    
    return new Response(JSON.stringify({ 
      success: false, 
      message: "Error al obtener productos",
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
