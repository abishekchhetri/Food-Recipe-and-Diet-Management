import { View } from './view.js';
class PreviewView extends View {
  icons = new URL('../../../css/sprite.svg', import.meta.url);
  _parentEl = '';
  _generateMarkup() {
    return `
      ${this._data.map(val => this._generateSearchResults(val)).join('')}`;
  }
  _generateSearchResults(val) {
    return ` <li class="preview">
    <a class="preview__link ${
      window.location.hash === `#${val.id}` ? `preview__link--active` : ''
    } " href="#${val.id}">
      <figure class="preview__fig">
        <img src="${val.imageUrl}" alt="Test" class="preview__fig" />
      </figure>
      <div class="preview__data">
        <h3 class="preview__title">${val.title}</h3>
        <p class="preview__publisher">${val.publisher}</p>
      <div class="preview__user-generated ${!val.key ? 'hidden' : ''}">
          <svg class = "svg__small">
          <use href="${icons}#icon-user"></use>
          </svg>
        </div>
      </div>
    </a>
  </li>`;
  }
}

export const previewView = new PreviewView();
