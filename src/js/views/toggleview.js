//this view toggles any of the view and updates to the state array this is for increasing easiness to toggle the views
import { View } from './view.js';

class toggleView extends View {
  icons = new URL('../../../css/sprite.svg', import.meta.url);
  bookmarkToggle = document.querySelector('.click__bookmark');
  bookmarkTab = document.querySelector('.bookmarks');
  _parentEl = document.querySelector('.theme');
  threeLiner = document.querySelector('.show__button');
  navBar = document.querySelector('.quickBox');
  search = document.querySelector('.search__btn');
  searchResult = document.querySelector('.search-results');
  searchCancel = document.querySelector('.search__cancel');
  _overlay = document.querySelector('.overlay');

  _generateMarkup() {
    if (this._data)
      return `
                <use href="${icons}#icon-moon-fill"></use> 
    `;
    else
      return `
                <use href="${icons}#icon-sun-stroke"></use>      
    `;
  }

  addHandlerToggleTheme(handler) {
    this._parentEl.addEventListener('click', handler);
  }

  updateTheme(data) {
    for (let item of data)
      document.documentElement.style.setProperty(item[0], item[1]);
  }
  darkTheme(data) {
    this.updateTheme(data);
  }

  lightTheme(data) {
    this.updateTheme(data);
  }
  addHandlerToggle() {
    this.bookmarkToggle.addEventListener('click', () => {
      this.bookmarkTab.classList.toggle('hidden');
    });
    //assuming user wont toggle manually

    if (window.innerWidth <= 970) {
      this.navBar.classList.add('hidden');
      // this.bookmarkTab.classList.add('hidden');
      this.searchResult.classList.add('hidden');
      this.searchCancel.classList.remove('hidden');
      this.threeLiner.addEventListener('click', () => {
        this.navBar.classList.toggle('hidden');
        this.bookmarkTab.classList.add('hidden');
      });

      this.search.addEventListener('click', () => {
        this.searchResult.classList.remove('hidden');
        this._overlay.classList.toggle('hidden');
      });

      this.searchCancel.addEventListener('click', () => {
        this.searchResult.classList.toggle('hidden');
        this._overlay.classList.toggle('hidden');
      });
    } else {
      this.bookmarkTab.classList.toggle('hidden');
      this.searchCancel.classList.toggle('hidden');
    }
  }
}

export const toggleFields = new toggleView();
