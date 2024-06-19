import { useState, useEffect } from "react";
import {
  crearLibro,
  editarLibro,
  eliminarLibro,
  getAllLibros,
} from "./../services/Book_service";
import HeaderComponent from "../components/HeaderComponent";
import Book from "../components/Book";

const BookPage = () => {
  const [books, setBooks] = useState([]);
  const [code, setCode] = useState("");
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [id, setID] = useState(null);
  const rol = localStorage.getItem("rol");
  const [imageUrl, setImageUrl] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const [sortField, setSortField] = useState("titulo");
  const [sortAlgorithm, setSortAlgorithm] = useState("quick");

  // Nuevos estados para búsqueda
  const [keysearch, setKeysearch] = useState("titulo");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchBooks();
  }, [sortField, sortAlgorithm, keysearch, search]);

  const fetchBooks = async () => {
    try {
      const fetchedBooks = await getAllLibros(
        sortField,
        sortAlgorithm,
        keysearch,
        search
      );
      setBooks(fetchedBooks);
    } catch (error) {
      console.error("Error fetching books:", error.message);
    }
  };

  const handleSaveBook = async () => {
    try {
      if (id != null) {
        await editarLibro(id, {
          codigo: code,
          titulo: title,
          autor: author,
          urlImagen: imageUrl,
        });
      } else {
        await crearLibro({
          codigo: code,
          titulo: title,
          autor: author,
          urlImagen: imageUrl,
        });
      }
      setID(null);

      setCode("");
      setAuthor("");
      setTitle("");
      setImageUrl("");
      setIsModalOpen(false);
      fetchBooks();
    } catch (error) {
      console.error("Error saving book:", error.message);
    }
  };

  const handleDeleteBook = async (bookCode) => {
    try {
      await eliminarLibro(bookCode);
      fetchBooks();
    } catch (error) {
      console.error("Error deleting book:", error.message);
    }
  };

  const openAddModal = () => {
    setCode("");
    setID(null);

    setAuthor("");
    setTitle("");
    setImageUrl("");
    setIsEditMode(false);
    setIsModalOpen(true);
  };

  const openEditModal = (book) => {
    console.log(book);
    setCode(book.codigo);
    setID(book._id);

    setAuthor(book.autor);
    setTitle(book.titulo);
    setImageUrl(book.urlImagen);
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <HeaderComponent />

      <div className="flex justify-between">
        <h1 className="text-3xl font-bold text-center">Libros</h1>
        {rol === "admin" && (
          <button
            onClick={openAddModal}
            className="bg-green-500 text-white py-2 px-5 rounded hover:bg-green-600 transition"
          >
            + Agregar nuevo libro
          </button>
        )}
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="flex items-center space-x-4 my-4">
          <select
            value={sortAlgorithm}
            onChange={(e) => setSortAlgorithm(e.target.value)}
            className="p-2 border border-gray-300 rounded"
          >
            <option value="quick">Quick Sort</option>
            <option value="bubble">Bubble Sort</option>
            <option value="merge">Merge Sort</option>
          </select>
          <select
            value={sortField}
            onChange={(e) => setSortField(e.target.value)}
            className="p-2 border border-gray-300 rounded"
          >
            <option value="codigo">Código</option>
            <option value="titulo">Título</option>
            <option value="autor">Autor</option>
          </select>
          <button
            onClick={fetchBooks}
            className="bg-[#dc8524] text-white p-2 rounded hover:bg-[#dc8524] transition"
          >
            Ordenar
          </button>
        </div>
        <div className="flex items-center space-x-4 my-4">
          <select
            value={keysearch}
            onChange={(e) => setKeysearch(e.target.value)}
            className="p-2 border border-gray-300 rounded"
          >
            <option value="titulo">Título</option>
            <option value="autor">Autor</option>
            <option value="codigo">Código</option>
          </select>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar..."
            className="p-2 border border-gray-300 rounded"
          />
          <button
            onClick={fetchBooks}
            className="bg-[#dc8524] text-white p-2 rounded hover:bg-[#c28138] transition"
          >
            Buscar
          </button>
        </div>

        <ul className="space-y-4">
          {books.map((book, index) => (
            <li
              key={index}
              className="bg-white p-4 rounded-lg shadow-lg flex items-center justify-between"
            >
              <div className="bg-white px-20 py-5 rounded-lg shadow-lg flex items-center justify-between">
                <Book book={book} />
                {rol === "admin" && (
                  <div className="space-x-2 ml-[500px] flex flex-col items-center">
                    <button
                      onClick={() => openEditModal(book)}
                      className="bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600 transition"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDeleteBook(book._id)}
                      className="bg-red-500 text-white p-2 rounded hover:bg-red-600 transition"
                    >
                      Eliminar
                    </button>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
            <h2 className="text-2xl font-semibold mb-4">
              {isEditMode ? "Editar libro" : "Agregar libro"}
            </h2>
            <input
              type="text"
              placeholder="Código"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mb-4"
            />
            <input
              type="text"
              placeholder="Autor"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mb-4"
            />
            <input
              type="text"
              placeholder="Título"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mb-4"
            />
            <input
              type="text"
              placeholder="URL de imagen"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mb-4"
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={closeModal}
                className="bg-gray-500 text-white p-2 rounded hover:bg-gray-600 transition"
              >
                Cancelar
              </button>
              <button
                onClick={handleSaveBook}
                className="bg-[#dc8524] text-white p-2 rounded hover:bg-[#dc8524] transition"
              >
                {isEditMode ? "Guardar cambios" : "Guardar libro"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookPage;
