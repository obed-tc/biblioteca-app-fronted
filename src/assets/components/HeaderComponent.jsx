import { Link } from "react-router-dom";

function HeaderComponent() {
  const rol = localStorage.getItem("rol");

  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };
  return (
    <div className=" w-full flex items-center justify-between px-10">
      <Link to="/" className="flex items-center">
        <img src="/logo.png" className="w-20" />
        <span className="text-[#dc8524] text-2xl font-bold">LIBRO APP</span>
      </Link>
      <nav>
        <ul className="flex space-x-5 text-[#dc8524] ">
          <Link to="/">Inicio</Link>

          <Link to="/books">Libros</Link>

          {rol == "admin" && <li>Usuarios</li>}
          <button onClick={logout}>Cerrar sesión</button>
        </ul>
      </nav>
    </div>
  );
}

export default HeaderComponent;
