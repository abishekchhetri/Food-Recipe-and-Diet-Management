//this view toggles any of the view and updates to the state array this is for increasing easiness to toggle the views
import { View } from './View';
class toggleView extends View {
  bookmarkToggle = document.querySelector('.click__bookmark');
  bookmarkTab = document.querySelector('.bookmarks');

  addHandlerToggle() {
    this.bookmarkToggle.addEventListener('click', () => {
      this.bookmarkTab.classList.toggle('hidden');
    });
  }
}

export const toggleFields = new toggleView();
