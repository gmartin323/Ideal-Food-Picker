// javascript

import { dishArray } from "./data.js";
import { ingredientArray } from "./data.js";
import { typeArray } from "./data.js";

const choiceContainer = document.getElementById("choice-container");
const ingredientChoices = document.getElementById("ingredient-choices")
const typeChoices = document.getElementById("type-choices")
const mealFilter = document.getElementById("meal-filter");
const priceFilter = document.getElementById("price-filter");
const confirmBtn = document.getElementById("confirm-button");
const modal = document.getElementById("modal");
const closeModalBtn = document.getElementById("close-modal-btn")
const modalInner = document.getElementById("modal-inner")

/* get current day of the week */

var dateObj = new Date()
var weekday = dateObj.toLocaleString("default", { weekday: "long" })


confirmBtn.addEventListener("click", renderDish)

function renderDish() {
  const dishObject = getSingleDishObject()
  modalInner.innerHTML = `
        <h2 class="modal-header">You should go for...</h2>
        <section class="dish-container">
          <div class="dish-info">${dishObject.name}</div>
          <div class="dish-img">img</div>
        </section>
        <section class="restaurant-container">
            <div class="restaurant-info">  
                <div class="restaurant-name">at<br>${dishObject.restaurant}</div>
                <div class="dish-price">Price: ${dishObject.price}₫</div>
            </div>                
            <div class="restaurant-map-container">
                <div class="restaurant-map">map</div>
                <div class="restaurant-address">address</div>
            </div>
        </section>
        `
  
  showModal()
}

function getSingleDishObject() {
  const dishesArray = getMatchingDishesArray()
  if(dishesArray.length === 1){
    return dishesArray[0]
  }
  else {
    const randomNumber = Math.floor(Math.random() * dishesArray.length)
    return dishesArray[randomNumber]
    
  }
}

/* get selected radio option when submit button is clicked */



function getMatchingDishesArray(){
  if (document.querySelector('input[type="radio"]:checked')){
    const selectedChoice = document.querySelector('input[type="radio"]:checked').value
    const matchingDishesArray = []
    
    
    if (dishArray.filter(function(dish){return dish.type === selectedChoice}).length > 0) 
    /* Find objects that have selected type */
      {
        function hasSelectedType(type) {
            const hasType = dishArray.filter(function(dish){
            return dish.type === type
            })
            matchingDishesArray.push(hasType)
        }
        hasSelectedType(selectedChoice)
      } else /* Find objects that have selected ingredient  */
      {
        function hasSelectedIngredient(ingredient){
            const hasIngredient = dishArray.filter(function(dish){
            return dish.ingredients.includes(ingredient)
            })
            matchingDishesArray.push(hasIngredient)
        }
        hasSelectedIngredient(selectedChoice)
  }
  return matchingDishesArray[0]
    }
      }

/* Add any objects with selected type to matchingDishArray */


/* Add any objects with selected ingredient to matchingDishArray */
    








/* add highlight class when option is selected */

choiceContainer.addEventListener('change', highlightCheckedOption)
  
function highlightCheckedOption(e){
    const choices = document.getElementsByClassName('choice')
    for (let choice of choices){
        choice.classList.remove('highlight')
    }
    document.getElementById(e.target.id).parentElement.classList.add('highlight')
}


/* Display ingredient choices */

function getIngredientsArray(dishes){
  const ingredientsArray = []
  for (let dish of dishes){
    for (let ingredient of dish.ingredients){
      if (!ingredientsArray.includes(ingredient)){
        ingredientsArray.push(ingredient)
      }
    }
  }
  return ingredientsArray
}

function renderIngredientChoices(dishes){
  const ingredients = getIngredientsArray(dishes)
  let ingredientsHTML = ``
  for (let ingredient of ingredients){
    let result = ingredientArray.find(item => item.name === ingredient)
    ingredientsHTML += `<div class="choice">
            <label for="${ingredient}">
              <img src = "./images/ingredient/${result.image}" class="ingredient-image">
            </label>
            <p>${ingredient}</p>
            <input
                type="radio"
                id="${ingredient}"
                value="${ingredient}"
                name="choice-radio"
            >
        </div>`
  }
  ingredientChoices.innerHTML = ingredientsHTML
}

renderIngredientChoices(dishArray)


/* Display types choices */

function getTypesArray(dishes){
  const typesArray = []
  for (let dish of dishes){
    if (!typesArray.includes(dish.type)){
        typesArray.push(dish.type)
      }
  }
  return typesArray
}

function renderTypeChoices(dishes){
  const types = getTypesArray(dishes)
  let typesHTML = ``
  for (let type of types){
    let result = typeArray.find(item => item.name === type)
    typesHTML += `<div class="choice">
            <label for="${type}">
              <img src = "${result.image}" class="type-image">
            </label>
            <input
                type="radio"
                id="${type}"
                value="${type}"
                name="choice-radio"
            >
        </div>`
  }
  typeChoices.innerHTML = typesHTML
}

renderTypeChoices(dishArray)


/* Show modal when click confirm (added in above conirmBtn event listener) */

function showModal() {
  modal.classList.remove("hidden");
  modal.classList.add("block");
}

/* Close modal when click close-modal-btn */

closeModalBtn.addEventListener("click", closeModal)

function closeModal() {
    modal.classList.remove("block");
  modal.classList.add("hidden");
}


