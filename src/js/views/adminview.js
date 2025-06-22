import { View } from './view.js';

class RecipeView extends View {
  isRendered = false;
  _parentEl = document.querySelector('.recipe');
  _errorMessage = 'Error loading recipe!';
  _successMessage = 'Operation completed successfully!';
  adminButton = document.querySelector('.click__admin');

  _generateMarkup() {
    //this._data has blog posts data
    return `
      <h1 class='spacer'>Give the data in prompt so data can be pushed to the server, this is in prompt mode because of simplicity</h1>
      <button class = "upload__blog">Upload Blog</button>
      <h1 class='spacer'>Delete Blog here, it will auto update but we dont have update functionality because it is tiny disposable blog we didn't felt it necessary</h1>
      <button class = "delete__blog">Delete Blog ID</button>
    `;
  }

  addHandlerAdmin(handler) {
    this.adminButton.addEventListener('click', () => {
      const pwd = +prompt('Enter config pwd');
      if (pwd !== AUTH) {
        alert('wrong password!');
        return;
      }
      this.okay = true;
      handler();
    });
  }

  addHandlerAdminUploadPost(handler) {
    this._parentEl.addEventListener('click', e => {
      if (!e.target.classList.contains('upload__blog')) return;

      const [title, content, image, uploader, veg, caloriesPerServing] = [
        prompt('Enter title'),
        prompt('Enter content of the post'),
        prompt('Enter image of post'),
        prompt('Uploader Ex. (Avishek Chhetri)'),
        prompt('is Veg (true for veg dish)'),
        prompt('calories per serving (kcal)'),
      ];

      //id is auto initiated
      return handler({
        title,
        content,
        image,
        uploader,
        veg,
        caloriesPerServing,
        createdAt: Date.now(),
      });
    });
  }

  addHandlerAdminDeletePost(handler) {
    this._parentEl.addEventListener('click', e => {
      if (!e.target.classList.contains('delete__blog')) return;
      const id = prompt('Enter post id to delete');
      return handler(id);
    });
  }
}

export const adminView = new RecipeView();
