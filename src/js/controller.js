import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as data from './model';
import { recipeView } from './views/recipeView';
import { searchView } from './views/searchView';
import { resultView } from './views/resultView';
import { paginationView } from './views/paginationView';
import { bookmarksView } from './views/bookmarksView';
import { addRecipeView } from './views/addRecipeView';
import { ADD_RECIPE_EVENT_TIMEOUT } from './config';
import { RECIPE_RENDER_TIMEOUT } from './config';
import { toggleFields } from './views/toggleView';

const showRecipe = async function () {
  try {
    recipeView.renderSuccess();
    const hash = window.location.hash.slice(1);
    if (!hash) return;
    recipeView.renderSpinner();
    await data.loadRecipe(hash);
    data.saveOrRenderBookmarkStatus(data.state.recipe.id, true);
    bookmarksView.render(data.state.bookmarks);
    recipeView.render(data.state.recipe);
    resultView.render(data.state.search.resultPerPage);
    // addRecipeView.render();
  } catch (err) {
    recipeView.renderError();
    console.log(err);
  }
};

const controlSearchResults = async function (query) {
  try {
    await data.loadSearchResults(query);
    data.getSearchResultsPage(1);
    paginationView._resetCurr();
    paginationView.render(data.state.search.resultArrayPerPage);
    resultView.render(data.state.search.resultPerPage);
  } catch (err) {
    resultView.renderError();
    console.log(err);
  }
};

const controlPagination = function (pageNumber) {
  data.getSearchResultsPage(pageNumber);
  paginationView.render(data.state.search.resultArrayPerPage);
  resultView.render(data.state.search.resultPerPage);
  //saving hash to # link preventing reload of page on clicking of new link
  window.history.pushState(null, '', window.location.hash);
};

const controlAddBookmark = function (bookmarkData) {
  if (!data.hasBookmark(bookmarkData.id)) {
    data.saveOrRenderBookmarkStatus(bookmarkData.id);
  } else data.deleteBookmark(bookmarkData.id);
  recipeView.render(data.state.recipe);
};

const controlBookmark = function () {
  if (data.state.bookmarks.length === 0) {
    bookmarksView.renderSuccess();
    return;
  }
  bookmarksView.render(data.state.bookmarks);
};

const controlServings = function (servings) {
  data.updateServings(servings);
  recipeView.render(data.state.recipe);
};

const controlAddRecipe = async function (formData) {
  try {
    addRecipeView.renderSpinner();
    await data.uploadRecipe(formData);
    addRecipeView.renderSuccess();
    setTimeout(() => {
      addRecipeView._toggleShowHideUpload();
      console.log(data.state.recipe.id);

      window.location.hash = data.state.recipe.id;
    }, ADD_RECIPE_EVENT_TIMEOUT);

    setTimeout(() => {
      addRecipeView.render();
      //bug fixing that image wont show after successful upload
      recipeView.render(data.state.recipe);
    }, RECIPE_RENDER_TIMEOUT);
  } catch (err) {
    console.log(err);
    setTimeout(() => {
      addRecipeView.render();
    }, ADD_RECIPE_EVENT_TIMEOUT);
    addRecipeView.renderError();
  }
};

const init = function () {
  recipeView.addHandlerRender(showRecipe);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  bookmarksView.addHandlerRender(controlBookmark);
  toggleFields.addHandlerToggle();
  addRecipeView._addHandlerUpload(controlAddRecipe);
};
init();
