import { Link } from "react-router-dom";
import { MovieObj } from "../types";
import axios from "axios";
import { BACK_URL } from "../config";

interface I_Param {
  movieData: MovieObj;
  rerender: boolean;
  setRerender: Function;
}

function MovieCard(params: I_Param) {
  let movieData = params.movieData;
  let rerender = params.rerender;
  const setRerender = params.setRerender;

  function onDelete(e: any) {
    axios
      .delete(`${BACK_URL}/movies/${movieData.title}`)
      .then(() => {
        setRerender(!rerender);
      })
      .catch((e) => {
        console.error(e);
      });
  }

  return (
    <div className="card">
      <div className="content">
        <div className="header">{movieData.title}</div>
        <div className="meta">{movieData.release}</div>
        <div className="description">{movieData.description}</div>
      </div>
      <div className="extra content">
        <button
          className="left floated  ui negative basic button"
          onClick={onDelete}
        >
          Delete
        </button>
        <button className="right floated  ui primary basic button">Edit</button>
      </div>
    </div>
  );
}

export default MovieCard;
