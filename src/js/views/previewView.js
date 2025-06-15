import { View } from './View';

class PreviewView extends View {
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
        <h4 class="preview__title">${val.title}</h4>
        <p class="preview__publisher">${val.publisher}</p>
      <div class="preview__user-generated ${!val.key ? 'hidden' : ''}">
          UserGenerated
        </div>
      </div>
    </a>
  </li>`;
  }
}

export const previewView = new PreviewView();
