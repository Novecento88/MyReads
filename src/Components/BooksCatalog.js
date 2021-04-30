import React from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "../BooksAPI";
import BookShelf from "./BookShelf";
import { BookShelves } from "../Util";

class BooksCatalog extends React.Component {
  state = {
    booksByShelf: {},
  };

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      const booksByShelf = books.reduce((shelf, book) => {
        if (!shelf[book.shelf]) {
          shelf[book.shelf] = [];
        }

        shelf[book.shelf].push(book);

        return shelf;
      }, {});

      console.log("Books by Shelf: ", booksByShelf);

      this.setState(() => ({
        booksByShelf,
      }));
    });
  }

  render() {
    console.log("Books by Shelf: ", this.state.booksByShelf);
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {Object.entries(this.state.booksByShelf).map((entry, index) => {
              console.log("Shelf: ", BookShelves[entry[0]]);
              console.log("Books: ", entry[1]);
              return (
                <BookShelf
                  key={index}
                  bookShelf={BookShelves[entry[0]]}
                  books={entry[1]}
                />
              );
            })}
          </div>
        </div>
        <div className="open-search">
          <Link to="/search-page">Add a book</Link>
        </div>
      </div>
    );
  }
}

export default BooksCatalog;
