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
    BooksAPI.search(query).then((books) => {
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
      books: [],
    }));
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
          </ol>
        </div>
      </div>
    );
  }
}

export default SearchPage;
