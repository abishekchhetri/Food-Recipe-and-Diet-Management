// import '../node_modules/core-js'
import * as data from './model';
import './node_modules/regenerator-runtime';
import './node_modules/core-js/stable';
import { recipeView } from './views/recipeview';
import { searchView } from './views/searchview';
import { resultView } from './views/resultview';
import { paginationView } from './views/paginationview';
import { bookmarksView } from './views/bookmarkview';
import { addRecipeView } from './views/addrecipeview';
import { ADD_RECIPE_EVENT_TIMEOUT } from './config';
import { RECIPE_RENDER_TIMEOUT } from './config';
import { toggleFields } from './views/toggleview';
import { blog } from './views/dietblog';
import { adminView } from './views/adminview';
import { dietMgt } from './views/dietmanagement';
import { proceedDietView } from './views/finaldietview';
import { aboutSection } from './views/aboutview';

const showRecipe = async function () {
  try {
    const hash = window.location.hash.slice(1);
    //navigator frontend client api routing via hash values to prevent points loss in jsonbin
    if (hash === 'blogs') {
      recipeView.renderSpinner();
      await data.loadBlog();
      blog.render(data.state.blog);
      return;
    } else if (!hash || hash.length < 10) {
      aboutSection.render();
    } else {
      recipeView.renderSpinner();
      await data.loadRecipe(hash);
      data.saveOrRenderBookmarkStatus(data.state.recipe.id, true);
      bookmarksView.render(data.state.bookmarks);
      recipeView.render(data.state.recipe);
      resultView.render(data.state.search.resultPerPage);
      // addRecipeView.render();
    }
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

const controlToggleTheme = function () {
  if (data.state.darkTheme) {
    data.state.darkTheme = false;
    toggleFields.lightTheme(data.themeData.lightData);
  } else {
    data.state.darkTheme = true;
    toggleFields.darkTheme(data.themeData.darkData);
  }
  //see view.js and know why ive done that
  toggleFields.render(data.state.darkTheme, 'data');
  toggleFields.render(data.state.darkTheme);
};

const controlAdmin = function () {
  adminView.render(data.state.blog);
};

const controlAdminUploadPost = async function (postObject) {
  try {
    await data.uploadBlogPosts(postObject);
    adminView.renderSuccess();
    setTimeout(() => {
      adminView.render(data.state.blog);
    }, 2000);
  } catch (err) {
    recipeView.renderError();
    console.log(err);
  }
};

const controlAdminDeletePost = async function (id) {
  try {
    await data.deleteBlog(id);
    adminView.renderSuccess();
    setTimeout(() => {
      adminView.render(data.state.blog);
    }, 2000);
  } catch (err) {
    recipeView.renderError();
    console.log(err);
  }
};

const controlBlog = async function () {
  window.location.hash = 'blogs';
  location.reload();
};

//DIET MGT HELPER//////////////////
const updateDietAndSearch = function (updateRenderOnly = false) {
  if (!updateRenderOnly) data.searchOptions(data.state.searchName);
  data.updateFilteredRecipe();
  dietMgt.render(data.state);
};

///////////////////////////////////

const controlDietManagement = function () {
  data.loadParameters();
  updateDietAndSearch();
};

const controlDietSearch = function (typeTimeObj) {
  data.state.searchName = typeTimeObj;
  updateDietAndSearch();
};

const controlAddDietToList = function (addedRecipe) {
  data.addDiet(addedRecipe);
  data.findDietStatistics();
  updateDietAndSearch(true);
};

const controlProceedDiet = function () {
  try {
    if (!data.state.personalDetails) data.localStorageUser();
    else {
      data.getWeightProjectionData();
      proceedDietView.render(data.state);
      proceedDietView.addHandlerAddPie();
    }
  } catch (err) {
    alert(err);
  }
};

const controlDeleteDiet = function (id) {
  data.deleteDiet(id);
  data.updateFilteredRecipe();
  data.findDietStatistics();
  data.getWeightProjectionData();
  proceedDietView.render(data.state);
  proceedDietView.addHandlerAddPie();
};

const controlQuitDiet = function () {
  updateDietAndSearch();
};

const controlAboutSection = function () {
  window.location.hash = 'about';
  location.reload();
  aboutSection.render();
};

const init = function () {
  recipeView.addHandlerRender(showRecipe);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  bookmarksView.addHandlerRender(controlBookmark);
  toggleFields.addHandlerToggle();
  toggleFields.addHandlerToggleTheme(controlToggleTheme);
  addRecipeView._addHandlerUpload(controlAddRecipe);
  adminView.addHandlerAdmin(controlAdmin);
  adminView.addHandlerAdminUploadPost(controlAdminUploadPost);
  adminView.addHandlerAdminDeletePost(controlAdminDeletePost);
  blog.addHandlerBlogspot(controlBlog);
  dietMgt.handlerRecipeContainer(controlDietManagement);
  dietMgt.handlerSearchButton(controlDietSearch);
  dietMgt.handlerAddRecipe(controlAddDietToList);
  proceedDietView.addHandlerProceed(controlProceedDiet);
  proceedDietView.addHandlerDeleteButton(controlDeleteDiet);
  proceedDietView.addHandlerGoBack(controlQuitDiet);
  aboutSection.addHandlerRenderAbout(controlAboutSection);
};

init();
