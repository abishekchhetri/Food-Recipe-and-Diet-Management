import {
  FETCH_ERROR_TIMEOUT,
  FETCH_TIMEOUT_TIMER_SECONDS,
  JSON_BIN,
} from './config.js';

const timeout = async function (seconds) {
  return new Promise((_, reject) => {
    setTimeout(
      () => reject('Took too long to respond'),
      seconds * FETCH_TIMEOUT_TIMER_SECONDS
    );
  });
};

export const AJAX = async function (url, recipeData = null) {
  try {
    let response = await Promise.race([
      timeout(FETCH_ERROR_TIMEOUT),
      recipeData
        ? fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(recipeData),
          })
        : fetch(url),
    ]);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err.message);
    throw err;
  }
};

//bookmark saving functionality
export const saveBookmarkLocalStorage = bookmarkArray =>
  localStorage.setItem('ForkifyRecipeBookmarks', JSON.stringify(bookmarkArray));

////validation part
const isNullorEmpty = data =>
  data === '' || data === null || data === undefined;
export const ingredientsRight = (quantity, unit, description) => {
  return !(
    isNullorEmpty(quantity) ||
    Number.isNaN(+quantity) ||
    isNullorEmpty(unit) ||
    isNullorEmpty(description)
  );
};

export const validateUploadRecipe = recipe => {
  let bool;
  for (let val of Object.values(recipe)) {
    if (isNullorEmpty(val)) {
      bool = true;
      break;
    }
  }
  if (bool) return false;
  return !(
    Number.isNaN(recipe.cooking_time) ||
    Number.isNaN(recipe.servings) ||
    recipe.cooking_time === 0 ||
    recipe.servings === 0 ||
    recipe.ingredients.length === 0
  );
};
