const API_URL = "https://biblioteca-backend-5kk2.onrender.com/auth";

const register = async (nombre, email, password, rol) => {
  try {
    const response = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nombre, email, password, rol }),
    });
    const data = await response.json();
    if (response.ok) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("rol", data.rol);
    } else {
      throw new Error(data.mensaje || "Error en el registro");
    }
    return data;
  } catch (error) {
    console.error("Error en el registro:", error.message);
    throw error;
  }
};

const login = async (email, password) => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (response.ok) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("rol", data.rol);
    } else {
      throw new Error(data.mensaje || "Error en el inicio de sesión");
    }
    return data;
  } catch (error) {
    console.error("Error en el inicio de sesión:", error.message);
    throw error;
  }
};

const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("rol");
};

const getCurrentUser = () => {
  return localStorage.getItem("token");
};

export default {
  register,
  login,
  logout,
  getCurrentUser,
};
