import React, { useState, useEffect } from "react";

const Recipe = () => {
  const [search, setSearch] = useState("pizza");
  useEffect(() => {
    const fetchapi = async () => {
      const url = `https://api.edamam.com/search?q=${search}&app_id=52654fcd&app_key=7733d37c415968ed9ac7437591b0f385`;
      const respond = await fetch(url);
      const data = await respond.json();
      console.log(data);
    };
    fetchapi();
  }, [search]);

  return (
    <div>
      <form>
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Search Food....."
          autoComplete="off"
          onClick={(e) => {
            setSearch(e.target.value);
          }}
        />
        <input type="submit" value="Search" />
      </form>
    </div>
  );
};

export default Recipe;
