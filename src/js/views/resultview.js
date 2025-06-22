import { View } from './view';
import { previewView } from './previewview';

class ResultView extends View {
  _parentEl = document.querySelector('.results');
  _errorMessage = `No results available!`;
  _generateMarkup() {
    return previewView.render(this._data, false);
  }
}

export const resultView = new ResultView();
