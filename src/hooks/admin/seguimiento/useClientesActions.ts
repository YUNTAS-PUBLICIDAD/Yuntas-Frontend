/**
 * @file useClientesActions.ts
 * @description Este archivo contiene los hooks para las acciones de los clientes.
 */

import { config, getApiUrl } from "../../../../config";
import type Cliente from "../../../models/clients"; // importa el modelo de cliente

const useClienteAcciones = () => {
  /**
   * Obtiene el token de autenticación del localStorage y realiza la solicitud a la API.
   * Si no se encuentra el token, lanza un error.
   */

  const getValidToken = () => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No se encontró el token");
    return token;
  };

  /**
   * Funcion para añadir un cliente
   */

  const addCliente = async (
    clienteData: Partial<Cliente>
  ): Promise<Cliente> => {
    const token = getValidToken();
    const url = getApiUrl(config.endpoints.clientes.create);

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(clienteData),
    });

    if (!response.ok) throw new Error("Error al agregar cliente");

    const result: { data: Cliente } = await response.json();
    return result.data;
  };

  /**
   * Función para actualizar un cliente, usando los tipos
   */

  const updateCliente = async (
    id: number,
    updatedData: Partial<Cliente>
  ): Promise<Cliente> => {
    const token = getValidToken();
    const url = getApiUrl(config.endpoints.clientes.update(id));

    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedData),
    });

    if (!response.ok) throw new Error("Error al actualizar cliente");

    const result: { data: Cliente } = await response.json();
    return result.data;
  };

  /**
   * Función para eliminar un cliente, usando los tipos
   */

  const deleteCliente = async (id: number): Promise<{ message: string }> => {
    const token = getValidToken();
    const url = getApiUrl(config.endpoints.clientes.delete(id));

    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) throw new Error("Error al eliminar cliente");

    const result: { message: string } = await response.json();
    return result;
  };

  return {
    addCliente,
    updateCliente,
    deleteCliente,
  };
};

export default useClienteAcciones;
