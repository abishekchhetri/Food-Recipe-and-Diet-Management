import { View } from './view.js';

class PaginationView extends View {
  _parentEl = document.querySelector('.pagination');
  pages;
  // _this.pages = this._data.length;
  _curr = 1;
  _resetCurr() {
    this._curr = 1;
  }
  _generateMarkup() {
    this.pages = this._data.length;

    //page1, page2......lastPage buttons do things

    if (this.pages === 1) {
      return '';
    } else if (this._curr === this.pages) {
      return ` <button class="btn--inline pagination__btn--prev">
      <span>Page ${this._curr - 1}</span>
    </button>`;
    }
    if (this._curr < this.pages && this._curr !== 1) {
      return ` <button class="btn--inline pagination__btn--prev">
      <span>Page ${this._curr - 1}</span>
    </button>
    <button class="btn--inline pagination__btn--next">
      <span>Page ${this._curr + 1}</span>
    </button> `;
    }
    if (this._curr === 1 && this.pages > this._curr) {
      return ` <button class="btn--inline pagination__btn--next">
      <span>Page ${this._curr + 1}</span>
    </button> `;
    }
  }
  addHandlerClick(handler) {
    this._parentEl.addEventListener('click', e => {
      const btn = e.target.closest('button');
      if (btn.classList.contains('pagination__btn--prev')) {
        if (this._curr == 1) return;
        this._curr--;
      }
      if (btn.classList.contains('pagination__btn--next')) {
        if (this._curr === this.pages) return;
        this._curr++;
      }
      handler(this._curr);
    });
  }
}

export const paginationView = new PaginationView();
