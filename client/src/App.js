import React, { useState } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/Header";
import Nav from "./components/Nav";
import Home from "./components/Home";
import Search from "./components/Search";
import Submit from "./components/Submit";
import { Input, TextArea, FormBtn } from './components/Form'; 
import API from "./utils/API";
import { BookList, BookListItem } from "./components/BookList";


function App() {
  const [books, setBook] = useState([]);
  const [bookSearch, setBookSearch] = useState("");
  const [formObject, setFormObject] = useState({})

  // Loads all books and sets them to books
  function loadBooks() {
    API.getBook()
      .then(res => 
        setBook(res.data)
      )
      .catch(err => console.log(err));
  };

  // // Deletes a book from the database with a given id, then reloads books from the db
  // function deleteBook(id) {
  //   API.deleteBook(id)
  //     .then(res => loadBooks())
  //     .catch(err => console.log(err));
  // }

  // Handles updating component state when the user types into the input field
  function handlePostInputChange(event) {
    const { name, value } = event.target;
    setFormObject({...formObject, [name]: value})
  };

  // When the form is submitted, use the API.saveBook method to save the book data
  // Then reload books from the database
  function handlePostFormSubmit(event) {
    event.preventDefault();
    if (formObject.title && formObject.author) {
      API.saveBook({
        title: formObject.title,
        author: formObject.author,
        description: formObject.description
      })
        .then(res => loadBooks())
        .catch(err => console.log(err));
    }
  };

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
      <Header />
      <Router>
        <Nav />
        <Route exact path={["/", "/search"]}>
          <Home />
          <Search
            name="BookSearch"
            value={bookSearch}
            onChange={handleInputChange}
          />
          <Submit
            onClick={handleFormSubmit}
            type="success"
            className="input-lg"
          >Submit</Submit>
          <BookList>
                {books.map(book => {
                  return (
                    <BookListItem
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
        </Route>
    {/* <Route exact path="/saved">
      <Saved />
    </Route> */}
      </Router>
    </div>
  );
}

export default App;
