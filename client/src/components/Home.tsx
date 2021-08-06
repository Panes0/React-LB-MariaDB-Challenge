import { BACK_URL } from "../config";
import React from "react";
import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import axios from "axios";
import { MovieObj } from "../types";

function Home() {
  const [movieList, setMovieList] = useState<MovieObj[]>([]); //array with fetched movies

  async function fetchMovies(): Promise<MovieObj[]> {
    let response = await axios.get(`${BACK_URL}/movies`);
    let data = response.data;
    return data;
  }

  useEffect(() => {
    //get movies
    fetchMovies()
      .then((movies) => {
        console.log(movies);
        setMovieList(movies);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <div className="ui cards">
        {movieList.map((movie) => {
          return <MovieCard movieData={movie} />;
        })}
      </div>
    </div>
  );
}

export default Home;
