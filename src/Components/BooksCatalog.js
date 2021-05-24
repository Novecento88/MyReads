import React from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "../BooksAPI";
import BookShelf from "./BookShelf";

class BooksCatalog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      booksByShelf: {},
    };

    this.handleBookUpdate = this.handleBookUpdate.bind(this);

    this.refreshBooksList = this.refreshBooksList.bind(this);
  }

  handleBookUpdate(book, shelf) {
    BooksAPI.update(book, shelf)
      .then((response) => {
        console.log(response);
        this.refreshBooksList();
      })
      .catch((error) => {
        console.log("ERROR: ", error);
      });
  }

  async refreshBooksList() {
    const booksByShelf = await BooksAPI.getAll().then((books) => {
      return books.reduce((shelf, book) => {
        if (!shelf[book.shelf]) {
          shelf[book.shelf] = [];
        }

        shelf[book.shelf].push(book);

        return shelf;
      }, {});
    });

    console.log("Books by Shelf: ", booksByShelf);

    this.setState(() => ({
      booksByShelf,
    }));
  }

  componentDidMount() {
    this.refreshBooksList();
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
              return (
                <BookShelf
                  key={index}
                  bookShelf={entry[0]}
                  handleBookUpdate={this.handleBookUpdate}
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
