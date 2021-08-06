import React from "react";
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
    </div>
  );
}

export default MovieCard;
