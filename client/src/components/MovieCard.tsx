import React from "react";
import { Link } from "react-router-dom";
import { MovieObj } from "../types";

interface I_Param {
  movieData: MovieObj;
}

function MovieCard(params: I_Param) {
  let movieData = params.movieData;
  return (
    <div className="card">
      <div className="content">
        <div className="header">{movieData.title}</div>
        <div className="meta">{movieData.release}</div>
        <div className="description">{movieData.description}</div>
      </div>
      <div className="extra content">
        <button className="left floated  ui negative basic button">
          Delete
        </button>
        <button className="right floated  ui primary basic button">Edit</button>
      </div>
    </div>
  );
}

export default MovieCard;
