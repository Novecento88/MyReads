import React from "react";
import Book from "./Book";
import { BookShelves } from "../Util";

function BookShelf(props) {
  const { bookShelf, books, handleBookUpdate } = props;

  const booksByShelf = books.reduce((shelf, book) => {
    if (!shelf[book.shelf]) {
      shelf[book.shelf] = [];
    }

    shelf[book.shelf].push(book);

    return shelf;
  }, {});

  console.log("Shelf: ", bookShelf);
  console.log("Books: ", books);

  return (
    <div>
      {Object.entries(booksByShelf).map((entry, index) => {
        return (
          <div key={index} className="bookshelf">
            <h2 className="bookshelf-title">{bookShelf}</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                {props.books.map((book, index) => (
                  <Book
                    key={index}
                    book={book}
                    handleBookUpdate={handleBookUpdate}
                  />
                ))}
              </ol>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default BookShelf;
