import React, { useState, useEffect } from "react";
import RecipeComponent from "./RecipeComponent";
import "./App.css";
import Alert from "./Alert";

const Recipe = () => {
  const [search, setSearch] = useState("s");
  const [query, setQuery] = useState("");
  const [recipe, setRecipe] = useState([]);
  const [alert, setAlert] = useState("");

  const fetchapi = async () => {
    if (search !== "") {
      const apiUrl = `https://api.edamam.com/search?q=${search}&app_id=52654fcd&app_key=7733d37c415968ed9ac7437591b0f385&from=0&to=15`;
      const respond = await fetch(apiUrl);
      const result = await respond.json();
      setAlert("");

      if (!result.more) {
        setAlert("No Such Food Found.......");
      }
      setRecipe(result.hits);
      setSearch("");
      console.log(result);
    } else {
      setAlert("Please fill the Input Field");
    }
  };
  const submit = () => {
    setQuery(search);
  };
  useEffect(() => {
    fetchapi();
  }, [query]);

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
          />
          <button id="submit" onClick={submit}>
            Search
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
                url={recipe.recipe.url}
                ingredients={recipe.recipe.ingredients}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Recipe;
