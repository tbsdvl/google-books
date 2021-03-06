import React from "react";
import Thumbnail from "../Thumbnail";

// import { Container, Row, Col } from "../Grid";

// Exporting both BookList and BookItem from this file

//BookList renders a bootstrap list item
export function BookList({ children }) {
  return <ul className="list-group">{children}</ul>;
}

// RecipeListItem renders a bootstrap list item containing data from the recipe api call
export function BookListItem({ image, title, authors, description, id }) {
  const style = {
    width: '30%'
  };

  return (
    <li className="list-group-item">
      <figure style={style}>
        <Thumbnail image={image || "https://placehold.it/300x300"} />
      </figure>
      <h3>{title}</h3>
      <p>Authors: {authors}</p>
      <p>{description}</p>
    </li>
  );
}
