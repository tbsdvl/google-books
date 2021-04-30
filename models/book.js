// require mongoose
const mongoose = require('mongoose');
const { Schema } = mongoose;

// Schema for the google book
const bookSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  authors: {
    type: [String],
  },
  description: {
    type: String,
  },
  image: {
    type: String,
  },
  link: {
    type: String, 
  },
})

// New mongoose model
const Book = mongoose.model('Book', bookSchema);

// Export the model
module.exports = Book;