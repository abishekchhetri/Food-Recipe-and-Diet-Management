import { View } from './View';
import { previewView } from './previewView';

class ResultView extends View {
  _parentEl = document.querySelector('.results');
  _errorMessage = `No results available!`;
  _generateMarkup() {
    return previewView.render(this._data, false);
  }
}

export const resultView = new ResultView();
