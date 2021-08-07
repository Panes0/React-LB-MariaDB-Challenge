import React from "react";
import Swal from "sweetalert2";
import { MovieObj } from "../types";
import axios from "axios";
import { BACK_URL } from "../config";

const TITLE = 0;
const RELEASE = 1;
const DESCRIPTION = 2;

function Add() {
  //checks valid input and uploads to DB
  function onSubmit(event: any) {
    event.preventDefault();
    let title: string = event.target[TITLE].value;
    let description: string = event.target[DESCRIPTION].value;
    let release: string = event.target[RELEASE].value;
    let movie: MovieObj = { title, description, release };

    //////TESTING VALUES//////
    console.log(movie);
    //////

    //form validation
    if (title.length === 0) {
      Swal.fire("Title cannot be empty");
    } else {
      axios
        .post(`${BACK_URL}/movies`, JSON.stringify(movie), {
          headers: {
            "Content-Type": "application/json",
          },
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
      .catch((e) => console.error(e));
  }

  return (
    <div>
      <div id="upload">
        <h3>Upload files</h3>
        <form id="uploadForm" onSubmit={onUpload}>
          <input type="file" id="files" name="files" multiple />
          <br />
          <br />
          <input type="submit" value="Upload" />
        </form>
      </div>

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

        <button className="ui button" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Add;
