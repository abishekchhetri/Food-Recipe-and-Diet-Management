import icons from 'url:../../../css/sprite.svg';
export class View {
  _data;
  render(renderData = null, boolean = true) {
    this._data = renderData;
    //return only data
    if (boolean === 'data') {
      return;
    }
    // if (!renderData) return;
    if (!boolean) return this._generateMarkup();

    if (!this.update(this._generateMarkup())) {
      this.clear();
      this._parentEl.insertAdjacentHTML('afterBegin', this._generateMarkup());
    } else this.update(this._generateMarkup());
  }

  update(renderData) {
    const currElem = [...this._parentEl.querySelectorAll('*')];
    const elem = document.createRange().createContextualFragment(renderData);
    const markup = [...elem.querySelectorAll('*')];

    //initially i mean at first page load there may not be data or other element in this parent so i used this condition to prevent invalid update and after once the data is embedded to the html we can see for any updates
    if (currElem.length !== markup.length) return false;

    markup.forEach((val, idx) => {
      if (currElem[idx]) {
        if (!val.isEqualNode(currElem[idx])) {
          if (val.childElementCount > 0) {
            //i dont want to get into hassle of just going to each element it will be slow, also, divs are there with unknown data fields or any other type of element and then solve its text content lol!
            //in my perspective if i embed inner html instead of going further deep it will be less efficient
            currElem[idx].innerHTML = val.innerHTML;
          } else {
            //if i feel i will be using data attribute i will save it separetly here
            //since this is single element i will have no problem setting text content without any string function like trim
            currElem[idx].textContent = val.textContent;
          }
        }
      }
    });
  }

  clear() {
    this._parentEl.innerHTML = '';
  }

  renderComponent(html) {
    this.clear();
    this._parentEl.insertAdjacentHTML('afterBegin', html);
  }

  renderError() {
    const html = ` <div class="error">
    <div>
    <p>${this._errorMessage}</p>
    </div>
     <svg>
     <use href="${icons}#icon-sad"></use>
     </svg>
  </div> `;
    this.renderComponent(html);
  }

  renderSuccess() {
    const html = `
    <div class="message">
     <svg>
             <use href="${icons}#icon-spoon-knife"></use>
               </svg>
    <p>${this._successMessage}</p> 
    </div>
`;
    this.renderComponent(html);
  }

  renderSpinner() {
    const html = `<div class="spinner">
    <svg class = "svg__big"xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><radialGradient id="a12" cx=".66" fx=".66" cy=".3125" fy=".3125" gradientTransform="scale(1.5)"><stop offset="0" stop-color="#FF3F10"></stop><stop offset=".3" stop-color="#FF3F10" stop-opacity=".9"></stop><stop offset=".6" stop-color="#FF3F10" stop-opacity=".6"></stop><stop offset=".8" stop-color="#FF3F10" stop-opacity=".3"></stop><stop offset="1" stop-color="#FF3F10" stop-opacity="0"></stop></radialGradient><circle transform-origin="center" fill="none" stroke="url(#a12)" stroke-width="15" stroke-linecap="round" stroke-dasharray="200 1000" stroke-dashoffset="0" cx="100" cy="100" r="70"><animateTransform type="rotate" attributeName="transform" calcMode="spline" dur="2" values="360;0" keyTimes="0;1" keySplines="0 0 1 1" repeatCount="indefinite"></animateTransform></circle><circle transform-origin="center" fill="none" opacity=".2" stroke="#FF3F10" stroke-width="15" stroke-linecap="round" cx="100" cy="100" r="70"></circle></svg>
    </div> `;
    this.renderComponent(html);
  }
}
