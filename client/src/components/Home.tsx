import { BACK_URL, PAGE_LIMIT } from "../config";
import React from "react";
import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import axios from "axios";
import { MovieObj } from "../types";

function Home() {
  const [movieList, setMovieList] = useState<MovieObj[]>([]); //array with fetched movies
  const [rerender, setRerender] = useState<boolean>(false);
  const [searchStr, setSearchStr] = useState<string>("");
  const [page, setPage] = useState<number>(0);
  const [movieCount, setMovieCount] = useState<number>(0);

  async function fetchMovies(): Promise<MovieObj[]> {
    let fetchConfig = {
      offset: PAGE_LIMIT * page,
      limit: PAGE_LIMIT,
      skip: 0,
      fields: {
        title: true,
        description: true,
        release: true,
      },
      where: {
        title: {
          like: `%${searchStr}%`,
        },
      },
    };

    let response = await axios.get(`${BACK_URL}/movies`, {
      params: {
        filter: fetchConfig,
      },
    });
    return response.data;
  }

  async function getMovieCount(): Promise<number> {
    let response = await axios.get(`${BACK_URL}/movies/count`);
    return response.data.count;
  }

  useEffect(() => {
    // get movie count
    getMovieCount()
      .then((count) => {
        setMovieCount(count);
      })
      .catch((error) => console.error(error));

    //get movies
    fetchMovies()
      .then((movies) => {
        setMovieList(movies);
      })
      .catch((error) => console.error(error));
  }, [rerender, searchStr, page, movieCount]);

  function onSearchChange(e: any) {
    e.preventDefault();
    ///
    console.log(e.target.value);
    //
    setSearchStr(e.target.value);
    setPage(0);
  }

  function nextPage() {
    if (page + 1 < Math.ceil(movieCount / PAGE_LIMIT)) {
      setPage(page + 1);
    }
  }

  function prevPage() {
    if (page > 0) {
      setPage(page - 1);
    }
  }

  return (
    <div>
      {/* Searchbar */}
      <div className="ui icon input">
        <input type="text" onChange={onSearchChange} placeholder="Search..." />
        <i className="search icon"></i>
      </div>
      <div className="ui divider"></div>
      {/* MovieCards */}
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
      {/* Pagination */}
      <div className="ui equal width grid">
        <div className="column">
          <button className="ui primary basic button" onClick={prevPage}>
            Prev
          </button>
        </div>
        <div className="eight wide column">
          <div className="ui segment">{page + 1}</div>
        </div>
        <div className="column">
          <button className="ui primary basic button" onClick={nextPage}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
