import { View } from './View';
import icons from 'url:../../img/icons.svg';

class AddRecipeView extends View {
  _parentEl = document.querySelector('.upload');
  inp = document.querySelectorAll('input');
  _successMessage = 'Recipe added successfully!';
  _errorMessage = 'Please enter valid recipe';
  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');
  _btnUpload = document.querySelector('.upload__btn');

  _generateMarkup() {
    return ` <div class="upload__column">
    <h3 class="upload__heading">Recipe data</h3>
    <label>Title</label>
    <input value="Pani puri" required name="title" type="text" />
    <label>URL</label>
    <input value="https://www.google.com" required name="sourceUrl" type="text" />
    <label>Image URL</label>
    <input value="https://www.google.com" required name="image" type="text" />
    <label>Publisher</label>
    <input value="TEST" required name="publisher" type="text" />
    <label>Prep time</label>
    <input value="23" required name="cookingTime" type="number" />
    <label>Servings</label>
    <input value="23" required name="servings" type="number" />
  </div>

  <div class="upload__column">
    <h3 class="upload__heading">Ingredients</h3>
    <label>Ingredient 1</label>
    <input
      value="0.5,kg,wheat flour"
      type="text"
      required
      name="ingredient-1"
      placeholder="Format: 'Quantity,Unit,Description'"
    />
    <label>Ingredient 2</label>
    <input
      value="1,packet,chatmasala"
      type="text"
      name="ingredient-2"
      placeholder="Format: 'Quantity,Unit,Description'"
    />
    <label>Ingredient 3</label>
    <input
      value="2,tsp,salt"
      type="text"
      name="ingredient-3"
      placeholder="Format: 'Quantity,Unit,Description'"
    />
    <label>Ingredient 4</label>
    <input
      type="text"
      name="ingredient-4"
      placeholder="Format: 'Quantity,Unit,Description'"
    />
    <label>Ingredient 5</label>
    <input
      type="text"
      name="ingredient-5"
      placeholder="Format: 'Quantity,Unit,Description'"
    />
    <label>Ingredient 6</label>
    <input
      type="text"
      name="ingredient-6"
      placeholder="Format: 'Quantity,Unit,Description'"
    />
  </div>

  <button class="btn upload__btn">
    <svg>
      <use href="${icons}#icon-upload-cloud"></use>
    </svg>
    <span>Upload</span>
  </button>`;
  }
  constructor() {
    super();
    this._btnOpen.addEventListener(
      'click',
      this._toggleShowHideUpload.bind(this)
    );
    this._btnClose.addEventListener(
      'click',
      this._toggleShowHideUpload.bind(this)
    );
  }

  _toggleShowHideUpload() {
    this._window.classList.toggle('hidden');
    this._overlay.classList.toggle('hidden');
  }

  _addHandlerUpload(handler) {
    this._parentEl.addEventListener('submit', e => {
      e.preventDefault();
      const formData = Object.fromEntries(new FormData(this._parentEl));
      handler(formData);
    });
  }
}

export const addRecipeView = new AddRecipeView();
