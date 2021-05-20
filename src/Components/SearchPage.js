import React from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "../BooksAPI";
import BookShelf from "./BookShelf";
import { BookShelves } from "../Util";

class SearchPage extends React.Component {
  state = {
    query: "",
    booksByShelf: {},
  };

  searchForQuery(query) {
    BooksAPI.search(query)
      .then((books) => {
        console.log("Search results: ", books);

        const booksByShelf = books.reduce((shelf, book) => {
          if (!shelf[book.shelf]) {
            shelf[book.shelf] = [];
          }

          shelf[book.shelf].push(book);

          return shelf;
        }, {});

        this.setState(() => ({
          booksByShelf: booksByShelf,
        }));
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

  render() {
    const { query } = this.state;

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
          <ol className="books-grid">
            <div>
              {Object.entries(this.state.booksByShelf).map((entry, index) => {
                return (
                  <BookShelf
                    key={index}
                    bookShelf={BookShelves[entry[0]]}
                    books={entry[1]}
                    handleBookUpdate={this.handleBookUpdate}
                  />
                );
              })}
            </div>
          </ol>
        </div>
      </div>
    );
  }
}

export default SearchPage;
