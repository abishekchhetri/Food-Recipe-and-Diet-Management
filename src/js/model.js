import { AJAX } from './helper';
import { API_KEY, RESULT_PER_PAGE, JSON_BIN, BLOG_KEY } from './config';
import { saveBookmarkLocalStorage } from './helper';
import { ingredientsRight } from './helper';
import { validateUploadRecipe } from './helper';
import { commonRecipe } from './commonRecipes';

export const state = {
  recipe: {},
  search: {
    query: [],
    results: [],
    resultPerPage: [],
    resultArrayPerPage: [],
  },
  bookmarks: [],
  darkTheme: false,
  blog: [],
  localRecipe: commonRecipe,
  recipeParameters: {},
  filterRecipe: [],
};

export const themeData = {
  lightData: [
    [`--html-color`, `#fff9f3`],
    [`--primary-color`, `#fff3e6`],
    [`--secondary-color`, `#ffe8cc`],
    [`--bookmark-color`, `#ffe0b2`],
    [`--text-color`, `#3a2e2e`],
    [`--body-color`, `#fff6ed`],
    [`--svg-color`, `#5c4033`],
    [`--hover-color`, `#ff944d`],
    [`--button-color`, `#ff7f50`],
    [`--box-shadow-color`, `rgba(0,0,0,0.07)`],
    [`--transparent`, `rgba(255,243,228,0)`],
  ],
  darkData: [
    [`--html-color`, `#2f3136`],
    [`--primary-color`, `#2f3136`],
    [`--secondary-color`, `#202225`],
    [`--bookmark-color`, `#36393f`],
    [`--text-color`, `#dcddde`],
    [`--body-color`, `#2b2d31`],
    [`--svg-color`, `#b9bbbe`],
    [`--hover-color`, `#5865f2`],
    [`--button-color`, `#3ba55d`],
    [`--box-shadow-color`, `rgba(0,0,0,0.4)`],
    [`--transparent`, `rgba(32,34,37,0)`],
  ],
};

export const loadBlog = async function () {
  try {
    const data = await fetch(`https://api.jsonbin.io/v3/b/${BLOG_KEY}`, {
      method: 'GET',
      headers: {
        'X-Master-Key': JSON_BIN,
      },
    });
    const blog = await data.json();
    state.blog = blog.record;
    console.log(state.blog);
  } catch (err) {
    throw new Error(err);
  }
};

const uploadBlog = async function (json) {
  try {
    const data = await fetch(`https://api.jsonbin.io/v3/b/${BLOG_KEY}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-Master-Key': JSON_BIN,
      },
      body: JSON.stringify(json),
    });

    const res = await data.json();
    console.log(res.record);
  } catch (err) {
    throw new Error(err);
  }
};

export const uploadBlogPosts = async function (BlogObject) {
  try {
    //delete operation
    if (BlogObject === 'delete') {
      let i = 1;
      for (let post of state.blog.posts) {
        post.id = i;
        i++;
      }
      await uploadBlog(state.blog);
      return;
    }

    //core delete operation
    state.blog.posts.unshift(BlogObject);
    //assign id to blogObject
    let i = 1;
    for (let post of state.blog.posts) {
      post.id = i;
      i++;
    }
    await uploadBlog(state.blog);
  } catch (err) {
    throw new Error(err);
  }
};

export const deleteBlog = async function (id) {
  id = id - 1;
  state.blog.posts.splice(id, 1);
  uploadBlogPosts('delete');
};
export const loadRecipe = async function (hash) {
  try {
    const response = await AJAX(
      `https://forkify-api.herokuapp.com/api/v2/recipes/${hash}?key=${API_KEY}`
    );
    const { recipe } = response.data;
    state.recipe = createRecipeObject(recipe);
  } catch (err) {
    throw new Error(err);
  }
};

/**
 * @param {Object} data- this parameter will supply us with data of recipe
 * @return {Object}
 */

export const createRecipeObject = function (data) {
  return {
    cookingTime: data.cooking_time,
    id: data.id,
    imageUrl: data.image_url,
    ingredients: data.ingredients,
    publisher: data.publisher,
    servings: data.servings,
    sourceUrl: data.source_url,
    title: data.title,
    key: data.key,
  };
};

export const loadSearchResults = async function (query) {
  try {
    const searchData = await AJAX(
      `https://forkify-api.herokuapp.com/api/v2/recipes?search=${query}&key=${API_KEY}`
    );
    const data = searchData.data.recipes;
    state.search.results = data.map(val => {
      return {
        id: val.id,
        imageUrl: val.image_url,
        publisher: val.publisher,
        title: val.title,
        key: val.key,
      };
    });

    if (!state.search.results[0]) throw new Error('No result found');
  } catch (err) {
    throw new Error(err);
  }
};

/**
 *
 *
 * @param {String|Number} page - this is page number supplied by controller
 */
export const getSearchResultsPage = async function (page) {
  let result = state.search.results.length;
  const pages = Math.trunc(result / RESULT_PER_PAGE);
  const arr = Array.from({ length: pages }, val => RESULT_PER_PAGE);
  const rem = result % RESULT_PER_PAGE;
  if (result % RESULT_PER_PAGE != 0) arr.push(rem);
  const pagInfo = arr.map((val, idx) => {
    const start = idx * RESULT_PER_PAGE;
    return [start, start + val];
  });
  page--;
  state.search.resultArrayPerPage = pagInfo;
  state.search.resultPerPage = state.search.results.slice(
    pagInfo[page][0],
    pagInfo[page][1]
  );
};

export const updateServings = async function (newServings) {
  const prevServing = state.recipe.servings;
  if (newServings <= 0) {
    state.recipe.servings = 1;
    return;
  }
  state.recipe.servings = newServings;
  state.recipe.ingredients.forEach(
    val => (val.quantity = (val.quantity / prevServing) * state.recipe.servings)
  );
};

//----------------->BOOKMARK DATA SECTION

export const hasBookmark = bookmarkID =>
  state.bookmarks.findIndex(val => val.id == bookmarkID) >= 0 ? true : false;

/**
 *
 *
 * @param {String|Object[]} recipeId - it accepts string
 * @param {boolean} [renderIcon=false] - it does two thing basically like if render icon is false it will only render bookmark
 * @return {void}
 */
export const saveOrRenderBookmarkStatus = function (
  recipeId,
  renderIcon = false
) {
  //this is for rendering when recipe loads
  if (renderIcon) {
    hasBookmark(recipeId)
      ? (state.recipe.bookmark = true)
      : (state.recipe.bookmark = false);
    return;
  }
  state.recipe.bookmark = true;
  const { id, imageUrl, publisher, title, key } = state.recipe;
  state.bookmarks.push({
    id,
    imageUrl,
    publisher,
    title,
    key,
  });
  saveBookmarkLocalStorage(state.bookmarks); //from helper
};

export const deleteBookmark = function (recipeId) {
  state.recipe.bookmark = false;
  const bookmarkDeleteKey = state.bookmarks.findIndex(
    val => val.id === recipeId
  );
  state.bookmarks.splice(bookmarkDeleteKey, 1);
  saveBookmarkLocalStorage(state.bookmarks); //from helper
};

//----------------->RECIPE UPLOAD SECTION
export const uploadRecipe = async function (recipeObject) {
  const arr = [];
  let {
    cookingTime: cooking_time,
    image: image_url,
    publisher,
    servings,
    sourceUrl: source_url,
    title,
    ...ingredients
  } = recipeObject;

  for (let [_, idx] of Object.entries(ingredients)) {
    let [quantity, unit, description] = idx.split(',');
    if (ingredientsRight(quantity, unit, description))
      arr.push({
        quantity: +quantity,
        unit,
        description,
      });
  }
  ingredients = arr;
  const recipe = {
    cooking_time: +cooking_time,
    image_url: image_url.trim(),
    publisher: publisher.trim(),
    servings: +servings,
    source_url: source_url.trim(),
    title: title.trim(),
    ingredients,
  };

  try {
    if (!validateUploadRecipe(recipe)) throw new Error('bad recipe!');
    const recipeData = await AJAX(
      `https://forkify-api.herokuapp.com/api/v2/recipes?key=${API_KEY}`,
      recipe
    );
    const {
      data: { recipe: userRecipe },
    } = recipeData;

    console.log(userRecipe);

    state.recipe = userRecipe;
  } catch (err) {
    throw err;
  }
};

//state.recipeParameters will give the object or parameter we will give
export const loadParameters = function () {
  const time = new Set(state.localRecipe.map(val => val.time));
  const dietType = new Set(state.localRecipe.map(val => val.dietType));
  state.recipeParameters = { time: [...time], dietType: [...dietType] };
};

//state.filterRecipe will give filtered with time and dietType
export const searchOptions = function (objectOptions) {
  objectOptions = { time: 'Lunch/Dinner', dietType: 'Vegetarian' };
  state.filterRecipe = state.localRecipe.filter(
    val =>
      val.dietType === objectOptions.dietType && val.time === objectOptions.time
  );
};

/*
calories:
description:
dietType: Junk/Vegetarian/Non Vegetarian
name: 
time: Snack, Lunch/Dinner, Dessert, Side/Snack, Side, Breakfast/Lunch, drink, 
*/

const init = function () {
  const storage = JSON.parse(localStorage.getItem('ForkifyRecipeBookmarks'));
  if (storage) state.bookmarks = storage;
};
init();
