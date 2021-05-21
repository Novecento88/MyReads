import React from "react";
import Book from "./Book";

function BookShelf(props) {
  const { bookShelf, books, handleBookUpdate } = props;

  console.log("Shelf: ", bookShelf);
  console.log("Books: ", books);

  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{bookShelf}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.map((book, index) => (
            <Book key={index} book={book} handleBookUpdate={handleBookUpdate} />
          ))}
        </ol>
      </div>
    </div>
  );
}

export default BookShelf;
