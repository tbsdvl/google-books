const router = require("express").Router();
const db = require("../models");

router.get("/books", (req, res) => {
  // Use a regular expression to search titles for req.query.q
  // using case insensitive match. https://docs.mongodb.com/manual/reference/operator/query/regex/index.html
  db.Book.find({
    title: { $regex: new RegExp(req.query.q, "i") },
  })
    .then((books) => res.json(books))
    .catch((err) => res.status(422).end());
});

router.post("/books", (req, res) => {
  db.Book.create(req.body)
    .then((dbModel) => res.json(dbModel))
    .catch((err) => res.status(422).json(err));
});

module.exports = router;
