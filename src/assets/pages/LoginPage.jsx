import { useState } from "react";
import auth_service from "../services/auth_service";
import { Link } from "react-router-dom";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await auth_service.login(email, password);
      console.log("Inicio de sesión exitoso:", data);
      const userRole = data.rol;

      if (userRole === "admin") {
        localStorage.setItem("rol", "admin");
        window.location.href = "/";
      } else if (userRole === "usuario") {
        localStorage.setItem("rol", "usuario");
        window.location.href = "/"; // Cambia la URL según sea necesario
      }
    } catch (error) {
      console.error("Error en el inicio de sesión:", error.message);
      // Aquí puedes manejar el error, mostrar un mensaje al usuario, etc.
    }
  };

  return (
    <div className="bg-grey-300 h-screen">
      <img src="/background_book.png" className="h-screen absolute right-0" />
      <div className="absolute z-40 bg-white shadow-xl flex flex-col py-10 px-7 w-[500px] space-y-3 left-20 top-10 rounded-md animate-slide-in-left items-center">
        <img src="https://i.gifer.com/Ybin.gif" className="w-20" />
        <h1 className="text-4xl font-bold text-[#dc8524]">LIBRO APP</h1>
        <span className="text-gray-500">Inicia sesión para continuar</span>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
          className="bg-gray-300 px-2 py-3 rounded-md  w-full"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={handlePasswordChange}
          className="bg-gray-300 px-2 py-3 rounded-md w-full"
        />
        <br />
        <br />
        <br />
        <button
          type="submit"
          onClick={handleSubmit}
          className="hover:bg-[#f3a042] text-white rounded-md w-full py-2 bg-[#dc8524] font-semibold"
        >
          Iniciar sesión
        </button>
        <Link to="/register" className="text-blue-600 hover:text-blue-400">
          Registrarme
        </Link>
      </div>
    </div>
  );
}

export default LoginPage;
