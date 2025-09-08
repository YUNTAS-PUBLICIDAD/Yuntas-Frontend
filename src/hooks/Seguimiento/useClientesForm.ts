/**
 * @file useClienteForm.ts
 * @description Este hook maneja el formulario para añadir o editar clientes.
 * Maneja el estado del formulario, la validación de los campos y la lógica de envío.
 */

import { useState, useEffect } from "react";
import useClienteAcciones from "./useClientesActions";
import type Cliente from "../../models/clients";

/**
 * Funcion para manejar el formulario de cliente 
 */
const useClienteForm = (cliente?: Cliente | null, onSuccess?: () => void) => {
  type ClienteFormData = Pick<Cliente, "name" | "celular" | "email" | "producto_id" | "created_at">;

  /**
   * Estado para manejar los datos del formulario.
   * Inicialmente se establece como un objeto vacío.
   */
  const [formData, setFormData] = useState<ClienteFormData>({
    name: "",
    celular: "",
    email: "",
    producto_id: 0,
    created_at: "",
  });

  const [isEditing, setIsEditing] = useState(false); // Estado para manejar si estamos editando o añadiendo un cliente
  const { addCliente, updateCliente } = useClienteAcciones(); // Importamos las funciones de los fetch para añadir y actualizar clientes

  /**
   * Efecto para manejar la carga inicial del formulario.
   * Si se pasa un cliente, se cargan sus datos en el formulario.
   */
  useEffect(() => {
    if (cliente) {
      
      /**
       * Si hay un cliente, cargamos sus datos en el formulario.
       */
      setFormData({
        name: cliente.name,
        celular: cliente.celular,
        email: cliente.email,
        producto_id: cliente.producto_id,
        created_at: cliente.created_at,
      });
      setIsEditing(true);
    } else {
      /**
       * Si no hay cliente, reiniciamos el formulario 
       * y establecemos el estado de edición en falso.
       */
      resetForm();
      setIsEditing(false);
    }
  }, [cliente]);

  /**
   * Función para manejar los cambios en los inputs del formulario.
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /**
   * Función para manejar el envío del formulario.
   * Valida los campos y llama a las funciones de añadir o actualizar cliente.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevenimos el comportamiento por defecto del formulario
    const { name, celular, email } = formData; // Desestructuramos los datos del formulario

    /**
     * Validación de los campos del formulario.
     */
    if (!name.trim() || !celular.trim() || !email.trim()) {
      alert("⚠️ Todos los campos son obligatorios.");
      return;
    }

    /**
     * Validación del formato del email.
     */
    if (!/^\d+$/.test(celular)) {
      alert("⚠️ El teléfono solo debe contener números.");
      return;
    }

    try {
      if (isEditing) {
        /**
         * Si estamos editando un cliente, llamamos a la función de actualización.
         */
       await updateCliente(cliente!.id, { name, celular, email, producto_id: formData.producto_id });
        alert(" Cliente actualizado correctamente");
      } else {
        /**
         * Si estamos añadiendo un nuevo cliente, llamamos a la función de añadir.
         */
        await addCliente({ name, celular, email });
        alert(" Cliente registrado exitosamente");
      }

      onSuccess?.(); // Llamamos a la función de éxito si existe
      resetForm(); // Reiniciamos el formulario después de la operación

    /**
     * Manejo de errores en la operación de añadir o actualizar cliente.
     */
    } catch (error: any) {
      console.error("❌ Error en la operación:", error);
      alert(`❌ Error: ${error.message || "Error desconocido"}`);
    }
  };

  /**
   * Función para reiniciar el formulario.
   * Limpia los datos del formulario y establece el estado de edición en falso.
   */
  const resetForm = () => {
    setFormData({ name: "", celular: "", email: "", producto_id: 0, created_at: "" });
    setIsEditing(false);
  };

  return {
    formData, // Retornamos los datos del formulario
    handleChange, // Retornamos la función para manejar los cambios en los inputs
    handleSubmit, // Retornamos la función para manejar el envío del formulario
  };
};

export default useClienteForm;
