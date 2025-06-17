//this view toggles any of the view and updates to the state array this is for increasing easiness to toggle the views
import { View } from './View';
import icons from 'url:../../../css/sprite.svg';

class toggleView extends View {
  bookmarkToggle = document.querySelector('.click__bookmark');
  bookmarkTab = document.querySelector('.bookmarks');
  _parentEl = document.querySelector('.theme');

  _generateMarkup() {
    if (this._data)
      return `
                <use href="${icons}#icon-sun-fill"></use> 
    `;
    else
      return `
                <use href="${icons}#icon-moon-fill"></use>      
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
  }
}

export const toggleFields = new toggleView();
