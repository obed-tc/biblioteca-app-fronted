import { useState } from "react";
import { buscarLibro } from "../services/Book_service";

const BuscarLibroComponent = () => {
  const [busqueda, setBusqueda] = useState("");
  const [resultados, setResultados] = useState([]);

  const handleBusqueda = async (event) => {
    const valorBusqueda = event.target.value;
    setBusqueda(valorBusqueda);

    try {
      if (valorBusqueda.trim() === "") {
        setResultados([]);
        return;
      }

      const response = await buscarLibro("titulo", valorBusqueda);
      setResultados(response.slice(0, 5));
    } catch (error) {
      console.error("Error en la búsqueda:", error.message);
      setResultados([]);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Buscar libro por título"
        value={busqueda}
        onChange={handleBusqueda}
      />
      <ul>
        {resultados.map((libro) => (
          <li key={libro._id}>{libro.titulo}</li>
        ))}
      </ul>
    </div>
  );
};

export default BuscarLibroComponent;
