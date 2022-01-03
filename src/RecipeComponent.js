import React, { useState } from "react";
import Style from "./Recipe.module.css";

const RecipeComponent = ({ label, image, ingredients }) => {
  const [show, setShow] = useState(false);
  const changeShow = () => {
    setShow(!show);
  };
  return (
    <div className={Style.container}>
      <div className={Style.innerContainer}>
        <img
          src={image}
          className={!show ? Style.image : Style.imageOnShow}
          alt="loading image...."
        />
        <h3 className={!show ? Style.label : Style.labelOnShow}>{label}</h3>
        <p className={Style.showIngredients} onClick={changeShow}>
          {!show ? "Show Ingredients" : "Hide Ingredients"}
        </p>
        {show && (
          <ul>
            {ingredients.map((ingredients) => (
              <li key={ingredients.text} className={Style.list}>
                {ingredients.text}
              </li>
            ))}
          </ul>
        )}
        <div />
      </div>
    </div>
  );
};

export default RecipeComponent;
