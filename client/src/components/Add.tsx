import React from "react";
import Swal from "sweetalert2";
import { MovieObj } from "../types";
import axios from "axios";
import { BACK_URL } from "../config";
import { useHistory } from "react-router-dom";

const TITLE = 0;
const RELEASE = 1;
const DESCRIPTION = 2;

function Add() {
  const history = useHistory();

  //checks valid input and uploads to DB
  function onSubmit(event: any) {
    event.preventDefault();
    let title: string = event.target[TITLE].value;
    let description: string = event.target[DESCRIPTION].value;
    let release: string = event.target[RELEASE].value;
    let movie: MovieObj = { title, description, release };

    //////TESTING VALUES//////
    console.log(movie);
    /////

    // for number validation
    let reg = new RegExp("^\\d+$");

    //form validation
    if (title.length === 0) {
      Swal.fire("Title cannot be empty");
    } else if (!reg.test(release) && release !== "") {
      Swal.fire("Release year must be a number");
    } else {
      axios
        .post(`${BACK_URL}/movies`, JSON.stringify(movie), {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then(() => {
          Swal.fire("Movie added!");
          history.push("/");
        })
        .catch(function (error) {
          console.log("ERROR: ", error.response.data);
        });
    }
  }

  function onUpload(event: any) {
    event.preventDefault();
    console.log("FILE: ", event.target[0].files[0]);
    let up_file = event.target[0].files[0];

    //check csv extension
    if (
      up_file.name.split(".").some((element: string) => {
        return element === "csv";
      })
    ) {
      // formdata will be sent by html request
      let formData = new FormData();
      // Update the formData object
      console.log(up_file.name, up_file);
      formData.append("File", up_file);
      console.log(formData);

      axios
        .post(`${BACK_URL}/files`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(() => {
          Swal.fire("File uploaded!");
          history.push("/");
        })
        .catch((e) => console.error(e));
    } else {
      Swal.fire("Selected file is not .csv");
    }
  }

  return (
    <div>
      <div id="upload" className="ui raised very padded text container segment">
        <h3>Upload files</h3>
        <form id="uploadForm" onSubmit={onUpload}>
          <input
            className="ui button positive basic button"
            type="file"
            id="files"
            name="files"
            multiple
          />
          <br />
          <br />
          <input
            className="ui button positive basic button"
            type="submit"
            value="Upload"
          />
        </form>
      </div>

      {/* ADD FORM */}
      <div className="ui raised very padded text container segment">
        <h3>Movie entry</h3>
        <form className="ui form" onSubmit={onSubmit}>
          <div className="field">
            <label>Title</label>
            <input type="text" name="Title" placeholder="Title" />
          </div>

          <div className="field">
            <label>Release Date</label>
            <input type="text" name="Release Date" placeholder="Release Date" />
          </div>

          <div className="field">
            <label>Description</label>
            <input type="text" name="Description" placeholder="Description" />
          </div>

          <button className="ui button positive basic" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Add;
