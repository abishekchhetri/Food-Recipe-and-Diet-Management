import { View } from './View';
import { ADDED_DIET_LIMIT } from '../config';
import icons from 'url:../../../css/sprite.svg';
import { DOUGHNUT_DATA } from '../staticsData';
class aboutSectiona extends View {
  _parentEl = document.querySelector('.recipe');
  diet = document.querySelector('.click__diet');
  about = document.querySelector('.click__about');
  // <svg>
  //    <use href="${icons}#icon-eye"></use>
  //  </svg>
  _generateMarkup() {
    return `
    <section class="about__section">
  <div class="about__container">
    <h2 class="about__title">About This App</h2>
    <p class="about__text">
      This is a modern, feature-rich recipe and diet management application that allows users to explore over 1 million recipes using the Forkify API. Users can upload their own recipes, bookmark favorites, and stay updated through an integrated food blog curated via JSONBin.
    </p>
    <p class="about__text">
      The app also includes a dedicated diet management feature tailored to local preferences. It helps users create personalized meal plans using locally stored data from a curated Nepali food recipe app. Users can visualize their health and nutrition progress through interactive graphs.
    </p>
    <p class="about__text">
      Designed with a focus on simplicity, usability, and awareness, this application is built to make healthy eating smarter and more engaging for everyone.
    </p>
    <p class="about__signature">— Developed by Avishek Chhetri 🧑‍💻</p>
  </div>
</section>
`;
  }

  addHandlerRenderAbout(handler) {
    this.about.addEventListener('click', () => {
      return handler();
    });
  }
}

export const aboutSection = new aboutSectiona();
