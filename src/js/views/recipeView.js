import { View } from './View';
import { Fraction } from 'fraction.js';
class RecipeView extends View {
  _parentEl = document.querySelector('.recipe');
  _errorMessage = 'Error loading recipe!';
  _successMessage = 'Start by searching for recipe!';

  _generateMarkup() {
    return `
        <figure class="recipe__fig">
          <img src="${this._data.imageUrl}" alt="Tomato" class="recipe__img" />
          <h1 class="recipe__title">
            <span>${this._data.title}</span>
          </h1>
        </figure>

        <div class="recipe__details">
          <div class="recipe__info">
            <span class="recipe__info-data recipe__info-data--minutes">${
              this._data.cookingTime
            }</span>
            <span class="recipe__info-text">minutes</span>
          </div>

          <div class="recipe__info">
            <span class="recipe__info-data recipe__info-data--people">${
              this._data.servings
            }</span>
            <span class="recipe__info-text">servings</span>

            <div class="recipe__info-buttons">
              <button class="btn--tiny btn--decrease-servings">
               reduce
              </button>
              <button class="btn--tiny btn--increase-servings">
               add
              </button>
            </div>
          </div>

          <div class="recipe__user-generated ${this._data.key ? '' : 'hidden'}">
            UserGenerated
          </div>
          <button class="btn--round ${this._data.bookmark ? 'bookmarked' : ''}">
          ${this._data.bookmark ? 'Bookmarked' : 'Bookmark?'}
          </button>
        </div>

        <div class="recipe__ingredients">
          <h2 class="heading--2">Recipe ingredients</h2>
          <ul class="recipe__ingredient-list">
            ${this._data.ingredients
              .map(val => this._generateMarkupIngredients(val))
              .join(' ')}
          </ul>
        </div>

        <div class="recipe__directions">
          <h2 class="heading--2">How to cook it</h2>
          <p class="recipe__directions-text">
            This recipe was carefully designed and tested by
            <span class="recipe__publisher">${
              this._data.publisher
            }</span>. Please check out
            directions at their website.
          </p>
          <a
            class="btn--small recipe__btn"
            href=${this._data.sourceUrl}
            target="_blank"
          >
            <span>Directions</span>
          </a>
        </div>`;
  }
  _generateMarkupIngredients(val) {
    return `<li class="recipe__ingredient">
    <p>-> </p>
    <div class="recipe__quantity">${
      val.quantity === 0 || val.quantity == null
        ? ''
        : new Fraction(val.quantity).toFraction(1)
    }</div>
    <div class="recipe__description">
      <span class="recipe__unit">${val.unit}</span>
      ${val.description}
    </div>
  </li>
`;
  }

  addHandlerRender(handler) {
    ['load', 'hashchange'].map(val => window.addEventListener(val, handler));
  }
  addHandlerUpdateServings(handler) {
    this._parentEl.addEventListener('click', e => {
      let servingCount = this._data.servings;
      const btn = e.target.closest('button');
      if (!btn || !btn.classList.contains('btn--tiny')) return;
      if (btn.classList.contains('btn--decrease-servings')) servingCount--;
      else servingCount++;
      handler(servingCount);
    });
  }

  addHandlerAddBookmark(handler) {
    this._parentEl.addEventListener('click', e => {
      const btn = e.target.closest('button');
      if (!btn || !btn.classList.contains('btn--round')) return;
      handler(this._data);
    });
  }
}

export const recipeView = new RecipeView();
