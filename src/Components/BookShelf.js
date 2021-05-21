import React from "react";
import Book from "./Book";
import { BookShelves } from "../Util";

function BookShelf(props) {
  const { bookShelf, books, handleBookUpdate } = props;

  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{BookShelves[bookShelf]}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.map((book, index) => (
            <Book
              key={index}
              book={book}
              bookShelf={bookShelf}
              handleBookUpdate={handleBookUpdate}
            />
          ))}
        </ol>
      </div>
    </div>
  );
}

export default BookShelf;
