import { useState } from "react";
import { MovieObj } from "../types";
import axios from "axios";
import { BACK_URL } from "../config";
import Swal from "sweetalert2";

interface I_Param {
  movieData: MovieObj;
  rerender: boolean;
  setRerender: Function;
}

const RELEASE = 0;
const DESCRIPTION = 1;

function MovieCard(params: I_Param) {
  let movieData = params.movieData;
  let rerender = params.rerender;
  const setRerender = params.setRerender;

  const [editing, setEditing] = useState<boolean>(false); //when true, activates the editor

  function onDelete(e: any) {
    axios
      .delete(`${BACK_URL}/movies/${movieData.title}`)
      .then(() => {
        setRerender(!rerender); //this forces parent component to rerender
      })
      .catch((e) => {
        console.error(e);
      });
  }

  function toggleEdit() {
    setEditing(!editing);
  }

  function onSubmit(event: any) {
    event.preventDefault();
    console.log(event.target);
    let title: string = movieData.title;
    let description: string = event.target[DESCRIPTION].value;
    let release: string = event.target[RELEASE].value;
    let newMovieData = { title, description, release };

    //////TESTING VALUES//////
    console.log("newMovieData: ", newMovieData);
    //////
    axios
      .put(
        `${BACK_URL}/movies/${movieData.title}`,
        JSON.stringify(newMovieData),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(() => {
        Swal.fire("Data Updated!");
      })
      .catch(function (error) {
        Swal.fire("Error updating data.");
        console.log("ERROR: ", error.response.data);
      })
      .finally(() => {
        toggleEdit();
        setRerender(!rerender); //this forces parent component to rerender
      });
  }

  if (editing) {
    // Is editing
    return (
      <div className="card">
        <form onSubmit={onSubmit}>
          <div className="content">
            <div className="header">{movieData.title}</div>
            {/* Release and Description form */}
            <div className="ui form">
              <div className="ui input">
                <input
                  type="text"
                  defaultValue={movieData.release}
                  placeholder={movieData.release}
                />
              </div>
              <div className="ui left corner labeled input">
                <div className="ui left corner label">
                  <i className="asterisk icon"></i>
                </div>
                <textarea defaultValue={movieData.description} />
              </div>
            </div>
          </div>
          {/* Buttons */}
          <div className="extra content">
            <button
              className="right floated  ui positive basic button"
              type="submit"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    );
  } else {
    // Not editing
    return (
      <div className="card">
        {/* Movie data */}
        <div className="content">
          <div className="header">{movieData.title}</div>
          <div className="meta">{movieData.release}</div>
          <div className="description">{movieData.description}</div>
        </div>
        {/* Buttons */}
        <div className="extra content">
          <button
            className="left floated  ui negative basic button"
            onClick={onDelete}
          >
            Delete
          </button>
          <button
            className="right floated  ui primary basic button"
            onClick={toggleEdit}
          >
            Edit
          </button>
        </div>
      </div>
    );
  }
}

export default MovieCard;
