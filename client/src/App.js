import React, { useState } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/Header";
import Nav from "./components/Nav";
import Home from "./components/Home";
import Search from "./components/Search";
import Submit from "./components/Submit";
import API from "./utils/API";
import { BookList, BookListItem } from "./components/BookList";


function App() {
  const [books, setBook] = useState([]);
  const [bookSearch, setBookSearch] = useState("");

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
        </Route>
    {/* <Route exact path="/saved">
      <Saved />
    </Route> */}
      </Router>
    </div>
  );
}

export default App;
