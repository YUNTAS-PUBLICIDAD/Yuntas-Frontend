import { c as config } from './config_CL3T0jDM.mjs';

class HttpService {
  baseURL;
  constructor() {
    this.baseURL = config.apiUrl;
  }
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          "Content-Type": "application/json",
          ...options.headers
        }
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`[HttpService] Error en ${url}:`, error);
      throw error;
    }
  }
  async get(endpoint, options) {
    return this.request(endpoint, { ...options, method: "GET" });
  }
  async post(endpoint, data, options) {
    return this.request(endpoint, {
      ...options,
      method: "POST",
      body: JSON.stringify(data)
    });
  }
  async postFormData(endpoint, formData, options) {
    return this.request(endpoint, {
      ...options,
      method: "POST",
      body: formData,
      headers: {
        // No establecer Content-Type para FormData, el navegador lo hace automáticamente
        ...options?.headers
      }
    });
  }
  async put(endpoint, data, options) {
    return this.request(endpoint, {
      ...options,
      method: "PUT",
      body: JSON.stringify(data)
    });
  }
  async putFormData(endpoint, formData, options) {
    return this.request(endpoint, {
      ...options,
      method: "PUT",
      body: formData,
      headers: {
        ...options?.headers
      }
    });
  }
  async delete(endpoint, options) {
    return this.request(endpoint, { ...options, method: "DELETE" });
  }
  // Método para obtener headers con autenticación
  getAuthHeaders() {
    const token = localStorage.getItem("auth_token");
    return token ? { Authorization: `Bearer ${token}` } : {};
  }
  // Métodos autenticados
  async authenticatedGet(endpoint, options) {
    return this.get(endpoint, {
      ...options,
      headers: {
        ...this.getAuthHeaders(),
        ...options?.headers
      }
    });
  }
  async authenticatedPost(endpoint, data, options) {
    return this.post(endpoint, data, {
      ...options,
      headers: {
        ...this.getAuthHeaders(),
        ...options?.headers
      }
    });
  }
  async authenticatedPostFormData(endpoint, formData, options) {
    return this.postFormData(endpoint, formData, {
      ...options,
      headers: {
        ...this.getAuthHeaders(),
        ...options?.headers
      }
    });
  }
  async authenticatedPut(endpoint, data, options) {
    return this.put(endpoint, data, {
      ...options,
      headers: {
        ...this.getAuthHeaders(),
        ...options?.headers
      }
    });
  }
  async authenticatedPutFormData(endpoint, formData, options) {
    return this.putFormData(endpoint, formData, {
      ...options,
      headers: {
        ...this.getAuthHeaders(),
        ...options?.headers
      }
    });
  }
  async authenticatedDelete(endpoint, options) {
    return this.delete(endpoint, {
      ...options,
      headers: {
        ...this.getAuthHeaders(),
        ...options?.headers
      }
    });
  }
}
const httpService = new HttpService();

export { httpService as h };
