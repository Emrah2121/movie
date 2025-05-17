import React, { useState } from "react";
import { useParams, NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from "./List.module.css";

const Main2Section1 = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const savedList = useSelector((state) =>
    state.favoriteMovies.savedLists.find((list) => list.id === id)
  );

  if (!savedList) {
    return <div className={styles.notFoundMessage}>No list found!</div>;
  }

  return (
    <div className={styles.pageWrapper}>
      <NavLink to="/" className={styles.homeButton}>
        <i className="fa-solid fa-house"></i>
      </NavLink>

      <div className={styles.headerSection}>
        <h1 className={styles.listTitle}>
          Siyahı adı: {savedList.listName}
        </h1>
      </div>

      <div className={styles.moviesGrid}>
        {savedList.movies.map((movie) => (
          <div key={movie.imdbID} className={styles.movieCard}>
            <h2 className={styles.movieName}>{movie.Title}</h2>
            <img
              className={styles.posterImage}
              src={movie.Poster}
              alt={movie.Title}
            />
            <button
              className={styles.openImdbBtn}
              onClick={() =>
                window.open(`https://www.imdb.com/title/${movie.imdbID}`, "_blank")
              }
            >
              <i className="fa-solid fa-arrow-up-right-from-square"></i>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Main2Section1;
