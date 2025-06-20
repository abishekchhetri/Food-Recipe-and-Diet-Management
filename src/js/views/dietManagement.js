import { View } from './View';
import { Fraction } from 'fraction.js';
import icons from 'url:../../../css/sprite.svg';
class dietManagement extends View {
  _parentEl = document.querySelector('.recipe');
  diet = document.querySelector('.click__diet');
  _errorMessage = 'Error loading recipe!';
  _successMessage = 'Start by searching for recipe!';
  dietContainer = document.querySelector('.dietContainer');
  timeContainer = document.querySelector('.timeContainer');
  // <svg>
  //    <use href="${icons}#icon-eye"></use>
  //  </svg>
  _generateMarkup() {
    return `
      <div class= "mainDiet">
        <h1>This is dietManagement section</h1>
        <p>Select your food with dietType and time</p>
        <div class="dietMgt">

        <div>
        <p>Diet type</p>
        <ul class = "buttonContainer dietContainer">
        ${this._data.recipeParameters.dietType
          .map(val => {
            return `<li class="dietBtnList"><button class = "dietButton diet__list" data-id = ${val}>${val}</button></li>`;
          })
          .join(' ')}
        </ul>
        </div>

        <div>
        <p>Time</p>
        <ul class = "buttonContainer timeContainer">
        ${this._data.recipeParameters.time
          .map(val => {
            return `<li class="dietBtnList"><button class = "dietButton time__list" data-id = ${val}> ${val}</button></li>`;
          })
          .join('')}
          </ul>
        </div>
          </div>


          <button class = "click__check">Search</button>
          <div class="search__result__diet">
          <ul class = "search__main">${this._data.filterRecipe
            .map(
              val =>
                `<li class="search__result__view">${
                  val.name
                } <button class="search__result"data-id="${JSON.stringify(
                  val
                )}">+ Add</button></li>`
            )
            .join('')}
          </ul>
          </div>
          <div class="added__diets">added diet values</div>
          <button>Proceed</button>
        </div>

    `;
  }

  handlerSearchButton(handler) {
    // this.dietContainer = document.querySelector('.dietContainer');
    // this.timeContainer = document.querySelector('.timeContainer');
    let hasDiet = false;
    let obj = { dietType: null, time: null };
    let tempClick;
    let clicker = true;

    this._parentEl.addEventListener('click', e => {
      //since many feature share recipe div they pollute event listener so we did solved by this
      if (!this.parentHasCurrentDiv('mainDiet')) return;
      if (e.target.tagName !== 'BUTTON') return;

      if (e.target.classList.contains('diet__list')) {
        const btn = e.target;
        tempClick = btn;
        clicker = true;
        [...this._parentEl.querySelector('.dietContainer').childNodes].forEach(
          val => {
            val.firstChild?.classList?.remove('selectedDiet');
          }
        );
        btn.classList?.add('selectedDiet');
        obj.dietType = btn.getAttribute('data-id');
        obj.time = null;
        hasDiet = true;
      }

      if (e.target.classList.contains('time__list')) {
        const btn = e.target;
        [...this._parentEl.querySelector('.timeContainer').childNodes].forEach(
          val => {
            val.firstChild?.classList?.remove('selectedDiet');
          }
        );
        btn.classList?.add('selectedDiet');
        obj.time = btn.getAttribute('data-id');
        if (!hasDiet) obj.dietType = null;
      }

      if (e.target.classList.contains('click__check')) return handler(obj);
    });
  }

  handlerDietTime(handler) {
    // this._parentEl.addEventListener('click', e => {
    //   //since many feature share recipe div they pollute event listener so we did solved by this
    //   if (!this.parentHasCurrentDiv('dietMgt')) return;
    //   if (e.target.tagName !== 'BUTTON') return;
    //   console.log(e.target);
    //   handler();
    // });
  }
  handlerRecipeContainer(handler) {
    this.diet.addEventListener('click', handler);
  }
}

export const dietMgt = new dietManagement();
