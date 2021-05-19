import React from "react";

function Book(props) {
  const { book } = props;

  const handleUpdate = (e, book) => {
    e.preventDefault();
    if (this.props.updateBookHandler) {
      this.props.updateBookHandler(book, e.target.value);
    }
  };

  return (
    <li key={book.title}>
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url(${book.imageLinks.smallThumbnail})`,
            }}
          ></div>
          <div className="book-shelf-changer">
            <select onChange={(event) => handleUpdate(event, book)}>
              <option value="move" disabled>
                Move to...
              </option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{book.author}</div>
      </div>
    </li>
  );
}

export default Book;
