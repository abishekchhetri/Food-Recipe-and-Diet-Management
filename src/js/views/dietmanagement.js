import { View } from './view';
import { ADDED_DIET_LIMIT } from '../config';
import icons from 'url:../../../css/sprite.svg';
import { DOUGHNUT_DATA } from '../staticsdata';
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
          <h3>${
            this._data.searchParameters.description ||
            'Start searching via diet type and time, example click on either type and hit serach that"s it !'
          }</h3><br>
          <ul class = "search__main">${this._data.filterRecipe
            .map(
              val =>
                `<li class="search__result__view">${
                  val.name
                } <button class="search__result ${
                  val?.status ? 'hidden' : ''
                }"data-id="${val.name}">+ Add</button></li>`
            )
            .join('')}
          </ul>
          </div>

          <div class="added__diets">
          <h2>Your Added Food Are : </h2>
           <ol class = "">
          ${this._data.addedDiet
            .map(val => {
              return `<li class="dietBtnList">${val.name}</li>`;
            })
            .join('')}
          </ol>
           <div>
        </div>
          </div>
          <button class="proceed__diet">Proceed</button>
        </div>

    `;
  }
  renderSpecific() {
    const elem = document.querySelector('.added__diets');
    elem.innerHTML = '';
    elem.insertAdjacentHTML(
      'beforeend',
      `<h2>Your Added Food Are : </h2>
       <ul class = "">
          ${this._data.addedDiet
            .map(val => {
              return `<li class="dietBtnList">${val.name}</li>`;
            })
            .join('')}
          </ul>
      `
    );
  }
  handlerSearchButton(handler) {
    let obj = { dietType: null, time: null };
    this._parentEl.addEventListener('click', e => {
      //since many feature share recipe div they pollute event listener so we did solved by this
      if (!this.parentHasCurrentDiv('mainDiet')) return;
      if (e.target.tagName !== 'BUTTON') return;

      if (e.target.classList.contains('diet__list')) {
        const btn = e.target;
        [...this._parentEl.querySelector('.dietContainer').childNodes].forEach(
          val => {
            val.firstChild?.classList?.remove('selectedDiet');
          }
        );
        btn.classList?.add('selectedDiet');
        obj.dietType = btn.getAttribute('data-id');
        obj.time = null;
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
        if (!obj.dietType) obj.dietType = null;
      }

      if (e.target.classList.contains('click__check')) {
        const copy = { ...obj };
        obj = { dietType: null, time: null };
        return handler(copy);
      }
    });
  }

  handlerAddRecipe(handler) {
    this._parentEl.addEventListener('click', e => {
      if (!e.target.classList.contains('search__result')) return;
      if (this._data.addedDiet.length >= ADDED_DIET_LIMIT) {
        alert(`Only ${ADDED_DIET_LIMIT} food can be added!`);
        return;
      }
      e.target.classList.add('selectedDiet');
      e.target.innerHTML = 'Added';
      setTimeout(() => {
        e.target.parentNode.innerHTML = `<p>Added Successfully</p>`;
      }, 100);
      setTimeout(() => {
        this.renderSpecific();
      }, 100);
      return handler(e.target.getAttribute('data-id'));
    });
  }
  handlerRecipeContainer(handler) {
    this.diet.addEventListener('click', handler);
  }
}

export const dietMgt = new dietManagement();
