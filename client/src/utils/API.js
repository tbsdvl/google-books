import axios from "axios";

// The getRecipes method retrieves recipes from the server
// It accepts a "query" or term to search the book api for
export default {
  getBook: function(query) {
    return axios.get("/api/books", { params: { q: query } });
  },
   // Saves a book to the database
   saveBook: function(bookData) {
    return axios.post("/api/books", bookData);
  }
};
