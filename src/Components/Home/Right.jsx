import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromFavorites, saveList } from "../../redux/favoriteSlice";
import Right from "./Right.module.css";
import { NavLink } from "react-router-dom";
const Section2 = () => {
  const dispatch = useDispatch();
  const favoriteMovies = useSelector((state) => state.favoriteMovies.favoriteMovies);
  const [listName, setListName] = useState("");
  const [isSaved, setIsSaved] = useState(false);
  const [listId, setListId] = useState(null);

  const isSaveDisabled = favoriteMovies.length === 0 || listName.trim() === "";

  const handleSaveList = () => {
    if (!isSaveDisabled) {
      const newListId = Date.now().toString();
      setListId(newListId);
      setIsSaved(true);
      const newList = {
        listName,
        movies: favoriteMovies,
        id: newListId,
      };
      dispatch(saveList(newList));
    }
  };

  return (
    <div>
      <div className={Right.container}>
        <input
          type="text"
          placeholder="Enter name..."
          className={Right.input}
          value={listName}
          onChange={(e) => {
            setListName(e.target.value);
            setIsSaved(false);
          }}
          disabled={isSaved}
        />
        <div className={Right.names}>
          <h3 className={Right.h3}>Favorite Movies:</h3>
          <div>
            {favoriteMovies.map((movie) => (
              <div key={movie.imdbID} className={Right.listItem}>
                {movie.Title}
                {!isSaved && (
                  <button
                    className={Right.removeButton}
                    onClick={() => dispatch(removeFromFavorites(movie.imdbID))}
                  >
                    <i className="fa-solid fa-delete-left"></i>
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
        <button
          className={Right.button}
          onClick={handleSaveList}
          disabled={isSaveDisabled}
        >
          Save
        </button>
        <div
          className={Right.links}
          style={{ display: isSaved ? "flex" : "none" }}
        >
         
          <NavLink to={`/GoToFavoriteList/${listId}`} className={Right.navLink}>
            Show list
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Section2;
