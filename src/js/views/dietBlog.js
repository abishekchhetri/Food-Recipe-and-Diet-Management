import { View } from './View';
import { Fraction } from 'fraction.js';
import icons from 'url:../../../css/sprite.svg';
class BlogView extends View {
  _parentEl = document.querySelector('.recipe');
  _errorMessage = 'Error in JSON BIN, HOLD ON OR REFRESH!';
  _successMessage = 'Start by searching for recipe!';
  postButton = document.querySelector('.goto__blogspot');
  // <svg>
  //    <use href="${icons}#icon-eye"></use>
  //  </svg>

  _generateMarkup() {
    return `
    <main class="blog">
    <h1>ALL FOOD DIET POSTS </h1>
    <p style="margin-bottom:2rem; margin-top:2rem">This post is managed by <span class = "dev">developer</span> and his collaborators</p>
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
              <span style = "color:var(--hover-color); font-size:1.2rem">POST ID : ${
                post.id
              } </span> | <span class="post__author">👤 ${
            post.uploader
          }</span> | <span class="post__date">📅 ${new Date(
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

  addHandlerBlogspot(handler) {
    this.postButton.addEventListener('click', () => {
      handler();
    });
  }
}

export const blog = new BlogView();
