import { dishArray } from "./data.mjs";

const choiceContainer = document.getElementById("choice-container");
const mealFilter = document.getElementById("meal-filter");
const priceFilter = document.getElementById("price-filter");
const confirmBtn = document.getElementById("confirm-button");
const modal = document.getElementById("modal");

const matchingDishesArray = [];

/* 
1. 
*/

document.addEventListener("click", showModal);

function showModal() {
  modal.classList.remove("hidden");
  modal.classList.add("block");
  console.log("click");
}

function getMatchingDishesArray() {
  if (document.querySelector('input[type="radio"]:checked')) {
    const selectedChoice = document.querySelector(
      'input[type="radio"]:checked'
    ).value;

    console.log(selectedChoice);
    /* showModal() */

    if (
      dishArray.filter(function (dish) {
        return dish.type === selectedChoice;
      }).length > 0
    ) {
      /* Find objects that have selected type */
      hasSelectedType();
    } else {
      /* Find objects that have selected ingredient  */
      hasSelectedIngredient(selectedChoice);
    }
    console.log(matchingDishesArray);
  }
}

function hasSelectedType() {
  const hasType = dishArray.filter(function (dish) {
    return dish.type === selectedChoice;
  });
  matchingDishesArray.push(hasType);
}

function hasSelectedIngredient(ingredient) {
  const hasIngredient = dishArray.filter(function (dish) {
    return dish.ingredients.includes(ingredient);
  });
  matchingDishesArray.push(hasIngredient);
}
