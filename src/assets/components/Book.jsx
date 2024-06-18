/* eslint-disable react/prop-types */
import "./../style/bookstyle.css";
const Book = ({ book }) => {
  return (
    <li>
      <figure className="book">
        <ul className="hardcover_front">
          <li>
            <img src={book.urlImagen} alt="" width="100%" height="100%" />
          </li>
          <li></li>
        </ul>
        <ul className="page">
          <li></li>
          <li>
            <a className="btn" href={book.urlImagen}>
              Descargar
            </a>
          </li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
        <ul className="hardcover_back">
          <li></li>
          <li></li>
        </ul>
        <ul className="book_spine">
          <li></li>
          <li></li>
        </ul>
        <figcaption>
          <h1>{book.titulo}</h1>
          <span>Autor: {book.autor}</span>
          <p>Codigo: {book.codigo}</p>
        </figcaption>
      </figure>
    </li>
  );
};

export default Book;
