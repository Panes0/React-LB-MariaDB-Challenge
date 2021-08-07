import { BACK_URL } from "../config";
import React from "react";
import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import axios from "axios";
import { MovieObj } from "../types";

function Home() {
  const [movieList, setMovieList] = useState<MovieObj[]>([]); //array with fetched movies
  const [rerender, setRerender] = useState<boolean>(false);

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
  }, [rerender]);

  return (
    <div>
      <div className="ui cards">
        {movieList.map((movie) => {
          return (
            <MovieCard
              key={movie.title}
              movieData={movie}
              rerender={rerender}
              setRerender={setRerender}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Home;
