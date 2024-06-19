// bookService.js

const BASE_URL = "https://biblioteca-backend-5kk2.onrender.com/api/v1";

// Función para obtener el token de localStorage
const getToken = () => {
  const token = localStorage.getItem("token");
  return token ? `Bearer ${token}` : "";
};

// Función para obtener todos los libros ordenados por un campo especificado y con búsqueda
export const getAllLibros = async (
  sortField = "titulo",
  algorithm = "quick",
  keysearch = "titulo",
  search = ""
) => {
  try {
    const response = await fetch(
      `${BASE_URL}/libros?sortField=${sortField}&algorithm=${algorithm}&keysearch=${keysearch}&search=${search}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: getToken(), // Incluir el Bearer Token aquí
        },
      }
    );
    if (!response.ok) {
      throw new Error("Error al obtener los libros");
    }
    return await response.json();
  } catch (error) {
    console.error("Error en getAllLibros:", error.message);
    throw error;
  }
};
// Función para buscar un libro por un campo específico y su valor
export const buscarLibro = async (key, value) => {
  try {
    const response = await fetch(
      `${BASE_URL}/libros/buscar?key=${key}&value=${value}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: getToken(), // Incluir el Bearer Token aquí
        },
      }
    );
    if (!response.ok) {
      throw new Error("Libro no encontrado");
    }
    return await response.json();
  } catch (error) {
    console.error("Error en buscarLibro:", error.message);
    throw error;
  }
};

// Función para crear un nuevo libro
export const crearLibro = async (nuevoLibro) => {
  try {
    const response = await fetch(`${BASE_URL}/libros/crear`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: getToken(), // Incluir el Bearer Token aquí
      },
      body: JSON.stringify(nuevoLibro),
    });
    if (!response.ok) {
      throw new Error("Error al crear el libro");
    }
    return await response.json();
  } catch (error) {
    console.error("Error en crearLibro:", error.message);
    throw error;
  }
};

// Función para editar un libro por su ID
export const editarLibro = async (id, libroEditado) => {
  try {
    const response = await fetch(`${BASE_URL}/libros/editar/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: getToken(), // Incluir el Bearer Token aquí
      },
      body: JSON.stringify(libroEditado),
    });
    if (!response.ok) {
      throw new Error("Libro no encontrado");
    }
    return await response.json();
  } catch (error) {
    console.error("Error en editarLibro:", error.message);
    throw error;
  }
};

// Función para eliminar un libro por su ID
export const eliminarLibro = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/libros/eliminar/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: getToken(), // Incluir el Bearer Token aquí
      },
    });
    if (!response.ok) {
      throw new Error("Libro no encontrado");
    }
    return { mensaje: "Libro eliminado" };
  } catch (error) {
    console.error("Error en eliminarLibro:", error.message);
    throw error;
  }
};

// Función para obtener un libro por su ID
export const obtenerLibroPorId = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/libros/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: getToken(), // Incluir el Bearer Token aquí
      },
    });
    if (!response.ok) {
      throw new Error("Libro no encontrado");
    }
    return await response.json();
  } catch (error) {
    console.error("Error en obtenerLibroPorId:", error.message);
    throw error;
  }
};

// Función para contar el número total de libros
export const contarTotalLibros = async () => {
  try {
    const response = await fetch(`${BASE_URL}/libros/total`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: getToken(), // Incluir el Bearer Token aquí
      },
    });
    if (!response.ok) {
      throw new Error("Error al contar los libros");
    }
    const data = await response.json();
    return data.totalLibros;
  } catch (error) {
    console.error("Error en contarTotalLibros:", error.message);
    throw error;
  }
};
