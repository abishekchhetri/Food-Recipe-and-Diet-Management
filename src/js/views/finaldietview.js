import { View } from './view.js';
import { Fraction } from 'fraction.js';
import icons from 'url:../../../css/sprite.svg';
import Chart from 'chart.js/auto';
import { DOUGHNUT_DATA, LINE_GRAPH } from '../staticsdata';

class finalDiet extends View {
  _parentEl = document.querySelector('.recipe');
  diet = document.querySelector('.click__diet');
  _errorMessage = 'Error loading recipe!';
  _successMessage = 'Start by searching for recipe!';
  // <svg>
  //    <use href="${icons}#icon-eye"></use>
  //  </svg>
  _generateMarkup() {
    return `
    <div class = 'proceed__main'>
    <button class = "add__more">Add Food + </button>
      <ul class = diet__proceed__stack>
        ${this._data.addedDiet
          .map(
            val =>
              `<li class="list__body">
              <table class = diet__proceed__lists>
                  <tr class="diet__sublists">
                    <td>Name</td> 
                    <td>${val.name}</td>
                  </tr>
                  <tr class="diet__sublists">
                    <td>Description</td> 
                    <td>${val.description}</td>
                  </tr>
                  <tr class="diet__sublists">
                    <td>Diet Type</td> 
                    <td>${val.dietType}</td>
                  </tr>
                  <tr class="diet__sublists">
                    <td>Time of Diet</td> 
                    <td>${val.time}</td>
                  </tr>
                  <tr class ="diet__sublists">
                    <td>Calories</td>
                    <td>${val.calories}</td>
                  </tr>
                  </table>
                  <div class="isolate">
                    <td><button class="delete__button" data-id = "${val.id}">X</button><td>
                  </div>
              </li>`
          )
          .join('')}
       </ul>

       <div class= "statistics">
       <h1>Hi, ${
         this._data.personalDetails.name
       } here is your diet summary : </h1>
          <ul class = "summary__box">
          <li class="diet__summary"><span>BMI</span><span>${
            this._data.dietSummary.bmi
          }</span></li>
          <li class="diet__summary"><span>Calorie-Gap</span><span>${
            this._data.dietSummary.calorieGap
          }</span></li>
          <li class="diet__summary"><span>Monthly-Change</span><span>${
            this._data.dietSummary.monthlyChange
          }</span></li>
          <li class="diet__summary"><span>Total calories of foods selected</span><span>${
            this._data.dietSummary.totalCalories
          }</span></li>
          </ul>

          <p>This is doughnut graph that shows calories of food you chose:</p>
          <canvas class="chart chart__here" style = "height:25rem;width:25rem"></canvas>
          <p>This line graph shows if you take this food you will have added yearly basis</p>
          <canvas class="chart line__graph" style = "height:25rem;width:25rem"></canvas>
          
       </div>
    </div>
            `;
  }

  addHandlerProceed(handler) {
    this._parentEl.addEventListener('click', e => {
      if (!e.target.classList.contains('proceed__diet')) return;
      return handler();
    });
  }

  addHandlerAddPie() {
    //doughnut graph
    const ctx = this._parentEl.querySelector('.chart__here');

    new Chart(ctx, {
      type: 'doughnut',
      data: DOUGHNUT_DATA(this._data),
    });

    //line graph
    const ctx2 = this._parentEl.querySelector('.line__graph');

    new Chart(ctx2, {
      type: 'line',
      data: LINE_GRAPH(this._data),
    });
  }

  addHandlerDeleteButton(handler) {
    this._parentEl.addEventListener('click', e => {
      if (!e.target.classList.contains('delete__button')) return;
      return handler(e.target.getAttribute('data-id'));
    });
  }

  addHandlerGoBack(handler) {
    this._parentEl.addEventListener('click', e => {
      if (!e.target.classList.contains('add__more')) return;
      handler();
    });
  }
}

export const proceedDietView = new finalDiet();
