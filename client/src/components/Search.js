import React from 'react';

function Search(props) {
    return (
      <div className="input-group input-group-lg">
        <input placeholder="Enter a book!" className="form-control" type="text" {...props} />
      </div>
    );
  }
  
  export default Search;
  