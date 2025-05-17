import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToFavorites } from "../../redux/favoriteSlice";
import Left from "./Left.module.css";

export default function Section1() {
  const [movies, setMovies] = useState([]);
  const [movieName, setMovieName] = useState("harry");
  const dispatch = useDispatch();
  
  const disabledButtons = useSelector(
    (state) => state.favoriteMovies.disabledButtons
  );
  const isSaved = useSelector((state) => state.favoriteMovies.isSaved);

  useEffect(() => {
    fetchForMovie("Dabbe");
  }, []);

  const fetchForMovie = (query) => {
    fetch(`https://www.omdbapi.com/?s=${query}&apikey=3f19a676`)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.Search || []);
      })
      .catch((err) => console.error("Fetch error:", err));
  };

  const search = (e) => {
    setMovieName(e.target.value);
  };

  const searchbutton = () => {
    if (movieName.trim().length > 0) {
      fetchForMovie(movieName);
    } else {
      alert("Search input is empty!");
    }
  };

  return (
    <div>
    <div className={Left.searchContainer}>
  <input
    type="text"
    onChange={search}
    placeholder="Enter a movie name..."
    className={Left.input}
  />
  <button onClick={searchbutton} className={Left.button1}>
    <i className="fa-solid fa-magnifying-glass"></i>
  </button>
</div>

      <br />
      <br />
      <div className={Left.movies}>
        {movies.map((movie) => (
          <div className={Left.movie} key={movie.imdbID}>
            <div>
              <img
                src={movie.Poster}
                alt={movie.Title}
                className={Left.img}
              />
            </div>
            <div>
              <h1>{movie.Title}</h1>
              <button
                className={Left.button2}
                disabled={disabledButtons[movie.imdbID] || isSaved}
                onClick={() => dispatch(addToFavorites(movie))}
              >
                {disabledButtons[movie.imdbID] === true ? (
    "Added"
  ) : (
    <i className="fa-solid fa-bookmark"></i>
  )}
              </button>
            </div>  
          </div>
        ))}
      </div>
    </div>
  );
}
