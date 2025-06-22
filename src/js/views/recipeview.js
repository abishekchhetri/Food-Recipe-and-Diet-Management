import { View } from './view';
import { Fraction } from 'fraction.js';
import icons from 'url:../../../css/sprite.svg';
class RecipeView extends View {
  _parentEl = document.querySelector('.recipe');
  _errorMessage = 'Error loading recipe!';
  _successMessage = 'Start by searching for recipe!';

  // <svg>
  //    <use href="${icons}#icon-eye"></use>
  //  </svg>
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
              <svg>
             <use href="${icons}#icon-stopwatch"></use>
               </svg>
            <p class="recipe__info-data recipe__info-data--minutes">${
              this._data.cookingTime
            } minutes</p>
           

          </div>

          <div class="recipe__info">
            <div class="recipe__info-buttons">
              <button class="btn--tiny btn--increase-servings">
               <svg class="svg__medium">
            <use href="${icons}#icon-plus"></use>
            </svg>
              </button>
              <span></span>
              <button class="btn--tiny btn--decrease-servings">
               <svg class="svg__medium">
            <use href="${icons}#icon-minus"></use>
            </svg>
              </button>
            </div>

              <p class="recipe__info-data recipe__info-data--people">${
                this._data.servings
              } servings</p>
          </div>

          <div class="recipe__user-generated ${this._data.key ? '' : 'hidden'}">
                <svg>
                <use href="${icons}#icon-user"></use>
                </svg>

          </div>

          <button class="btn--round ${this._data.bookmark ? 'bookmarked' : ''}">
          <svg >
          <use href="${icons}#${
      this._data.bookmark ? 'icon-tag-fill' : 'icon-tag-stroke'
    }"></use>
          </svg>
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
          <div>
          <h2>Share this recipe</h2>
          <img style = "width:10rem;height:10rem"src="https://qrtag.net/api/qr.png" alt="qrtag">
          </div>
          <button class = "btn__direction">
          <a
            class="btn--small recipe__btn"
            href=${this._data.sourceUrl}
            target="_blank"
          >
          <div class="direction">
            <p>Directions</p>
            <svg>
                <use href="${icons}#icon-global"></use>
                </svg>
          </div>
          </a>
          </button>
        </div>`;
  }
  _generateMarkupIngredients(val) {
    return `<li class="recipe__ingredient">
    <svg class = "svg__small">
       <use href="${icons}#icon-checkmark"></use>
     </svg>

    <p class="recipe__quantity">${
      val.quantity === 0 || val.quantity == null
        ? ''
        : new Fraction(val.quantity).toFraction(1)
    } ${val.unit} ${val.description}</p>
  </li>
`;
  }

  addHandlerRender(handler) {
    ['load', 'hashchange'].map(val => window.addEventListener(val, handler));
  }
  addHandlerUpdateServings(handler) {
    this._parentEl.addEventListener('click', e => {
      let servingCount = this?._data?.servings;
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
