import React from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "../BooksAPI";

class SearchPage extends React.Component {
  state = {
    query: "",
    books: [],
  };

  searchForQuery(query) {
    BooksAPI.search(query).then((books) => {
      this.setState(() => ({
        books: books,
      }));
    });
  }

  updateQuery(query) {
    this.setState(() => ({
      query: query.trim(),
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
              onChange={(event) => this.updateQuery(event.target)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid"></ol>
        </div>
      </div>
    );
  }
}

export default SearchPage;
