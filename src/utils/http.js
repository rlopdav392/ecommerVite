import { UPDATE_PRODUCTS_ENDPOINT } from "../config";
export async function syncCartWithBackend(items, token) {
  try {
    const response = await fetch(UPDATE_PRODUCTS_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(items),
    });

    if (!response.ok) {
      throw new Error(
        `Error al sincronizar el carrito: ${response.status} ${response.statusText}`
      );
    }
  } catch (error) {
    console.error("Error al sincronizar el carrito con el backend:", error);
    throw error;
  }
}
