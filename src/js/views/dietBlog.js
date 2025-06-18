import { View } from './View';
import { Fraction } from 'fraction.js';
import icons from 'url:../../../css/sprite.svg';
class BlogView extends View {
  _parentEl = document.querySelector('.recipe');
  _errorMessage = 'Error loading recipe!';
  _successMessage = 'Start by searching for recipe!';

  // <svg>
  //    <use href="${icons}#icon-eye"></use>
  //  </svg>

  _generateMarkup() {
    return `
    <main class="blog">
      ${this._data.posts
        .map(
          post => `
        <article class="post ${post.veg ? 'veg' : 'non-veg'}">
          <img
            src="${post.image}"
            alt="${post.title}"
            class="post__img"
          />
          <div class="post__info">
            <h2 class="post__heading">
              ${post.title} ${post.veg ? '🥦' : '🍗'}
            </h2>
            <p class="post__meta">
              <span class="post__author">👤 ${post.uploader}</span> |
              <span class="post__date">📅 ${new Date(
                post.createdAt
              ).toDateString()}</span> |
              <span class="post__calories">🔥 ${
                post.caloriesPerServing
              } kcal</span>
            </p>
            <p class="post__content">${post.content}</p>
          </div>
        </article>
      `
        )
        .join('')}
    </main>
  `;
  }
}

export const blog = new BlogView();
