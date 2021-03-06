import React from "react";
import { Route, Switch } from "react-router";
import "./App.css";
import BooksCatalog from "./Components/BooksCatalog";
import SearchPage from "./Components/SearchPage";

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
  };

  render() {
    return (
      <div className="app">
        <Switch>
          <Route path="/" exact component={BooksCatalog} />
          <Route path="/search-page" component={SearchPage} />
        </Switch>
      </div>
    );
  }
}

export default BooksApp;
