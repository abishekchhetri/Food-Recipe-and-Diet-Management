import { View } from './View';
import { Fraction } from 'fraction.js';
import icons from 'url:../../../css/sprite.svg';
class dietManagement extends View {
  _parentEl = document.querySelector('.recipe');
  diet = document.querySelector('.click__diet');
  _errorMessage = 'Error loading recipe!';
  _successMessage = 'Start by searching for recipe!';
  // <svg>
  //    <use href="${icons}#icon-eye"></use>
  //  </svg>
  _generateMarkup() {
    return `
      <div>
        <h1>This is dietManagement section</h1>
        <ul>
        ${this._data.recipeParameters.dietType
          .map(val => {
            return `<li><button>${val}</button></li>`;
          })
          .join(' ')}
        </ul>

        <ul>
        ${this._data.recipeParameters.time
          .map(val => {
            return `<li><button>${val}</button></li>`;
          })
          .join('')}
        </ul>
      </div>
    `;
  }

  handleSearchRecipe(handler) {
    this.diet.addEventListener('click', handler);
  }

  handlerSearchRecipeObject(handler) {
    this._parentEl.addEventListener('click', () => {
      handler();
    });
  }
}

export const dietMgt = new dietManagement();
