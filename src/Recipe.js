import React, { useState, useEffect } from "react";
import RecipeComponent from "./RecipeComponent";
import "./App.css";
import Alert from "./Alert";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, fas } from "@fortawesome/free-solid-svg-icons";

const Recipe = (props) => {
  const [search, setSearch] = useState(props.initialSearch);
  const [query, setQuery] = useState("");
  const [recipe, setRecipe] = useState([]);
  const [alert, setAlert] = useState("");
  const [fromRecipe, setFromRecipe] = useState(0);
  const [toRecipe, setToRecipe] = useState(props.initialRecipe);
  const [count, setCount] = useState(0);
  const [haveResults, setHaveResults] = useState(true);

  const scrollTop = () => {
    window.scrollTo({ top: 0 });
  };
  const nextPage = () => {
    if (toRecipe < count) {
      setFromRecipe(fromRecipe + props.initialRecipe);
      setToRecipe(toRecipe + props.initialRecipe);
      scrollTop();
    } else {
      return;
    }
  };
  const prevPage = () => {
    if (fromRecipe > 0) {
      setFromRecipe(fromRecipe - props.initialRecipe);
      setToRecipe(toRecipe - props.initialRecipe);
      scrollTop();
    } else {
      return;
    }
  };

  const fetchapi = async () => {
    if (search !== "") {
      props.setProgress(10);
      const apiUrl = `https://api.edamam.com/search?q=${search}&app_id=52654fcd&app_key=7733d37c415968ed9ac7437591b0f385&from=${fromRecipe}&to=${toRecipe}`;
      props.setProgress(30);
      const respond = await fetch(apiUrl);
      props.setProgress(70);
      const result = await respond.json();
      setAlert("");
      setCount(result.count);
      setHaveResults(result.more);
      props.setProgress(100);

      if (!result.more) {
        setAlert("No Such Food Found.......");
      }
      setRecipe(result.hits);

      console.log(result);
    } else {
      setAlert("Please fill the Input Field");
    }
  };
  const submit = () => {
    setQuery(search);
    setFromRecipe(0);
    setToRecipe(props.initialRecipe);
  };
  useEffect(() => {
    fetchapi();
  }, [query, fromRecipe]);

  return (
    <div>
      <div className="container">
        <div className="input-cont">
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Search Food....."
            autoComplete="off"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            onClick={(e) => {
              e.target.select();
            }}
          />

          <button id="submit" onClick={submit}>
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
        {alert !== "" && <Alert alert={alert} />}

        <div className="recipe-cont">
          {recipe !== [] &&
            recipe.map((recipe) => (
              <RecipeComponent
                key={recipe.recipe.label}
                label={recipe.recipe.label}
                image={recipe.recipe.image}
                ingredients={recipe.recipe.ingredients}
              />
            ))}
        </div>
        {haveResults && (
          <div className="pagination-cont">
            <button
              className="prev-page"
              onClick={prevPage}
              disabled={fromRecipe == 0}
            >
              <span>&#xab;</span> Previous
            </button>
            <button
              className="next-page"
              onClick={nextPage}
              disabled={toRecipe >= count}
            >
              Next <span>&#xbb;</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

Recipe.defaultProps = {
  initialRecipe: 21,
  initialSearch: "banana",
};
Recipe.propTypes = {
  initialRecipe: PropTypes.number,
  initialSearch: PropTypes.string,
};

export default Recipe;
