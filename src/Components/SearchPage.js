import React from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "../BooksAPI";
import Book from "./Book";

class SearchPage extends React.Component {
  state = {
    query: "",
    books: [],
    ownedBooks: {},
  };

  searchForQuery(query) {
    BooksAPI.search(query)
      .then((response) => {
        console.log("Search results: ", response);
        if (!("error" in response)) {
          this.setState(() => ({
            books: response,
          }));
        }
      })
      .catch((error) => {
        console.log("Error: ", error);
        this.clearReasults();
      });
  }

  updateQuery(query) {
    console.log("Query: ", query);

    this.setState(() => ({
      query: query,
    }));

    if (query.trim() !== "") {
      this.searchForQuery(query);
    } else {
      this.clearReasults();
    }
  }

  clearReasults() {
    this.setState(() => ({
      booksByShelf: {},
    }));
    console.log("Clear results.");
  }

  handleBookUpdate(book, shelf) {
    BooksAPI.update(book, shelf).then((response) => {
      console.log(response);
    });
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      console.log("OWNED BOOKS: ", books);
      const ownedBooks = books.reduce((books, book) => {
        books[book.id] = book.shelf;
        return books;
      }, {});

      this.setState(() => ({
        ownedBooks,
      }));
    });
  }

  render() {
    const { query, books } = this.state;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={(event) => this.updateQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <div className="bookshelf-books">
            <ol className="books-grid">
              {books.map((book, index) => (
                <Book
                  key={index}
                  book={book}
                  bookShelf={
                    this.state.ownedBooks[book.id]
                      ? this.state.ownedBooks[book.id]
                      : "none"
                  }
                  handleBookUpdate={this.handleBookUpdate}
                />
              ))}
            </ol>
          </div>
        </div>
      </div>
    );
  }
}

export default SearchPage;
