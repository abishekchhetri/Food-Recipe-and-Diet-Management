export class View {
  _data;
  render(renderData = null, boolean = true) {
    this._data = renderData;
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
    </div>
    <p>${this._errorMessage}</p>
  </div> `;
    this.renderComponent(html);
  }

  renderSuccess() {
    const html = `<div class="recipe">
    <div class="message">
      <div>
      </div>
      <p>${this._successMessage}</p> 
    </div>
`;
    this.renderComponent(html);
  }

  renderSpinner() {
    const html = `<div class="spinner">
  </div> `;
    this.renderComponent(html);
  }
}
