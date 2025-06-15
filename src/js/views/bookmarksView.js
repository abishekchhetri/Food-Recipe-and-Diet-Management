import { View } from './View';
import { previewView } from './previewView';
class BookmarkView extends View {
  _parentEl = document.querySelector('.bookmarks');
  _errorMessage = `Error getting bookmarks!`;
  _successMessage = `No bookmarks added!`;

  _generateMarkup() {
    return previewView.render(this._data, false);
  }

  //adding bookmarks
  addHandlerRender(handle) {
    document.addEventListener('click', handle);
  }
}

export const bookmarksView = new BookmarkView();
