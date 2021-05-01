import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/Header";
import Nav from "./components/Nav";
import Home from "./components/Home";
import Search from "./components/Search";
import Saved from "./components/Saved";
import SaveBtn from "./components/SaveBtn";
import { List, ListItem } from "./components/List/List";
import Submit from "./components/Submit";
import { Input, TextArea, FormBtn } from "./components/Form";
import API from "./utils/API";
import { BookList, BookListItem } from "./components/BookList";
import { Link } from "react-router-dom";

function App() {
  const [books, setBook] = useState([]);
  const [bookSearch, setBookSearch] = useState("");
  const [formObject, setFormObject] = useState({});

  // Loads all books and sets them to books
  function loadBooks() {
    API.getBook()
      .then((res) => setBook(res.data))
      .catch((err) => console.log(err));
  }

  // // Deletes a book from the database with a given id, then reloads books from the db
  // function deleteBook(id) {
  //   API.deleteBook(id)
  //     .then(res => loadBooks())
  //     .catch(err => console.log(err));
  // }

  // Handles updating component state when the user types into the input field
  function handlePostInputChange(event) {
    const { name, value } = event.target;
    setFormObject({ ...formObject, [name]: value });
  }

  // When the form is submitted, use the API.saveBook method to save the book data
  // Then reload books from the database
  function handlePostFormSubmit(event) {
    event.preventDefault();
    if (formObject.title && formObject.author) {
      API.saveBook({
        title: formObject.title,
        author: formObject.author,
        description: formObject.description,
        link: formObject.link,
        image: formObject.image,
      })
        .then((res) => loadBooks())
        .catch((err) => console.log(err));
    }
  }

  const handleInputChange = (event) => {
    // Destructure the name and value properties off of event.target
    // Update the appropriate state
    const { value } = event.target;
    setBookSearch(value);
  };

  const handleFormSubmit = (event) => {
    // When the form is submitted, prevent its default behavior, get recipes update the books state
    event.preventDefault();
    API.getBook(bookSearch)
      .then((res) => setBook(res.data))
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div className="container">
        <Header />
      </div>

      <Router>
        <Nav />
        <Route exact path={["/", "/search"]}>
          <div className="container">
            <Home />
            <Search
              name="BookSearch"
              value={bookSearch}
              onChange={handleInputChange}
            />
            <br></br>
            <div className="text-center">
              <Submit
                onClick={handleFormSubmit}
                type="success"
                className="input-lg"
              >
                Submit
              </Submit>
            </div>
            <br></br>
          </div>
          <div className="container">
            <BookList>
              {books.map((book) => {
                return (
                  <BookListItem
                    // id={book._id}
                    key={book.title}
                    title={book.title}
                    description={book.description}
                    authors={book.authors}
                    image={book.image}
                    link={book.link}
                  />
                );
              })}
            </BookList>
            <form>
              <Input
                onChange={handlePostInputChange}
                name="title"
                placeholder="Title (required)"
              />
              <Input
                onChange={handlePostInputChange}
                name="author"
                placeholder="Author (required)"
              />
              <Input
                onChange={handlePostInputChange}
                name="link"
                placeholder="Enter google books link"
              />
              <Input
                onChange={handlePostInputChange}
                name="image"
                placeholder="Enter a google books image src"
              />
              <TextArea
                onChange={handlePostInputChange}
                name="description"
                placeholder="Description (Optional)"
              />
              <FormBtn
                disabled={!(formObject.author && formObject.title)}
                onClick={handlePostFormSubmit}
              >
                Submit Book
              </FormBtn>
            </form>
          </div>
        </Route>
        <Route exact path="/saved">
          <Saved>
            <List>
              {books.map((book) => (
                <ListItem key={book._id}>
                  <Link to={"/books/" + book._id}>
                    <strong>
                      {book.title} by {book.author}
                    </strong>
                  </Link>
                </ListItem>
              ))}
            </List>
          </Saved>
        </Route>
      </Router>
    </div>
  );
}

export default App;
