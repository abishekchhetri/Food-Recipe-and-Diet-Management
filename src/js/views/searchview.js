import { View } from './view';
class SearchView extends View {
  _parentEl = document.querySelector('.search__field');
  _button = document.querySelector('.search__btn');
  clearInput() {
    this._parentEl.value = '';
  }
  getQuery() {
    return this._parentEl.value;
  }
  addHandlerSearch(handle) {
    this._button.addEventListener('click', e => {
      e.preventDefault();
      const data = this.getQuery();
      handle(data);
      this.clearInput();
    });
  }
}

export const searchView = new SearchView();
