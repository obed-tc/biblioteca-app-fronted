import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import HeaderComponent from "../components/HeaderComponent";
import MostReadBooksComponent from "../components/MostReadBooks";

function Home() {
  const rol = localStorage.getItem("rol");
  return (
    <div className="flex flex-col min-h-screen">
      <HeaderComponent />
      <div className="flex justify-around flex-1">
        <div className="flex flex-col justify-center ">
          <span className=" text-3xl font-bold animate-slide-in-left">
            BIENVENIDO {rol == "admin" ? "ADMINISTRADOR" : "ESTUDIANTE"}
          </span>
          <br />

          {rol == "admin" ? (
            <div className="bg-white text-center shadow-lg p-5 rounded-md animate-slide-in-left">
              <span className="font-bold ">Libros mas leidos</span>
              <MostReadBooksComponent />
            </div>
          ) : (
            <div className="bg-white text-center shadow-lg p-5 rounded-md flex flex-col animate-slide-in-left">
              <span>
                Descubre mundos infinitos, abre un libro y transforma tu mente.
              </span>
              <br />
              <br />

              <Link
                to="/books"
                className="inline-block bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              >
                Explorar libros
              </Link>
            </div>
          )}
        </div>
        <div className="flex flex-col justify-center">
          <div className="text-center flex flex-col justify-center items-center">
            <img
              className="w-40 animate-blurred-fade-in"
              src="https://crai.uab.edu.bo/wp-content/uploads/2022/10/version-horizontal-fondo-transparente-azul.png"
            />
            <br />

            <span className="font-semibold text-2xl animate-zoom-in">
              Presentación realizada por
            </span>
            <br />
            <ul className="animate-flip-in-x">
              <li>André Alexis Orlando López Guerra </li>
              <li>josue David chino pacohuanaco</li>
              <li>julieta Noemi rocha Cossío</li>
              <li>jhon Carlos Porco Gonzáles</li>
              <li>rosmery Nuñez Mamani</li>
              <li>michel Aguirre omonte</li>
              <li>Edison Arellano</li>
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
