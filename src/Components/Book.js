import React from "react";
import bookPlaceholderImage from "../icons/book_placeholder.svg";

function Book(props) {
  const { book, bookShelf } = props;

  const handleUpdate = (e, book) => {
    e.preventDefault();
    if (props.handleBookUpdate) {
      props.handleBookUpdate(book, e.target.value);
    }
  };

  const bookCoverImageUrl = book.imageLinks
    ? book.imageLinks.smallThumbnail
    : bookPlaceholderImage;

  return (
    <li key={book.title}>
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url(${bookCoverImageUrl})`,
              backgroundPosition: "center",
              backgroundSize: "100%",
              backgroundRepeat: "no-repeat",
            }}
          ></div>
          <div className="book-shelf-changer">
            <select
              value={bookShelf}
              onChange={(event) => handleUpdate(event, book)}
            >
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
        {book.authors.map((author) => (
          <div key={author} className="book-authors">
            {author}
          </div>
        ))}
      </div>
    </li>
  );
}

export default Book;
