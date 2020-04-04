'use strict';

const MAX_CARD = 5;
const MAX_EXTRA_LIST = 2;
const MAX_EXTRA_FILMS = 2;

const createProfile = () => {
  return (
    `<section class="header__profile profile">
      <p class="profile__rating">Movie Buff</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`
  );
};

const createMainNavigation = () => {
  return (
    `<nav class="main-navigation">
      <div class="main-navigation__items">
        <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
        <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">13</span></a>
        <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">4</span></a>
        <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">8</span></a>
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`
  );
};


const createSort = () => {
  return (
    `<ul class="sort">
      <li><a href="#" class="sort__button sort__button--active">Sort by default</a></li>
      <li><a href="#" class="sort__button">Sort by date</a></li>
      <li><a href="#" class="sort__button">Sort by rating</a></li>
    </ul>`
  );
};

const createFilmContent = () => {
  return (
    `<section class="films">
      <section class="films-list">
        <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
        <div class="films-list__container"></div>
      </section>
    </section>`
  );
};

const createFilmsExtra = () => {
  return (
    `<section class="films-list--extra">
      <h2 class="films-list__title">Top rated</h2>
      <div class="films-list__container"></div>
    </section>`
  );
};

const createFilmCard = () => {
  return (
    `<article class="film-card">
      <h3 class="film-card__title">The Dance of Life</h3>
      <p class="film-card__rating">8.3</p>
      <p class="film-card__info">
        <span class="film-card__year">1929</span>
        <span class="film-card__duration">1h 55m</span>
        <span class="film-card__genre">Musical</span>
      </p>
      <img src="./images/posters/the-dance-of-life.jpg" alt="" class="film-card__poster">
      <p class="film-card__description">Burlesque comic Ralph "Skid" Johnson (Skelly), and specialty dancer Bonny Lee King (Carroll), end up together on a cold, rainy night at a tr…</p>
      <a class="film-card__comments">5 comments</a>
      <form class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
      </form>
    </article>`
  );
};

const createBtnMore = () => {
  return (
    `<button class="films-list__show-more">Show more</button>`
  );
};

const createStatistics = () => {
  return (
    `<p>130 291 movies inside</p>`
  );
}

/**
 * @description - Функция отрисовки компанента
 * @param container {object} - объект куда отрисовывать
 * @param template {string} - HTML шаблон
 * @param place {DOMString} - Определяет позицию добавленного элемента
 */

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const pageHeader = document.querySelector('.header');
const mainContent = document.querySelector('.main');
const footerStatistics = document.querySelector('.footer__statistics');

render(pageHeader, createProfile(), 'beforeend');
render(mainContent, createMainNavigation(), 'beforeend');
render(mainContent, createSort(), 'beforeend');
render(mainContent, createFilmContent(), 'beforeend');
render(footerStatistics, createStatistics(), 'beforeend');

const films = document.querySelector('.films');
const filmsList = films.querySelector('.films-list');
const filmsListContainer = films.querySelector('.films-list__container');

for (let i = 0; i < MAX_CARD; i++) {
  render(filmsListContainer, createFilmCard(), 'beforeend');
}

for (let i = 0; i < MAX_EXTRA_LIST; i++) {
  render(films, createFilmsExtra(), `beforeend`);
}

const filmsListExtra = document.querySelectorAll('.films-list--extra');

const [filmsRated, filmsCommented] = filmsListExtra;

for (let i = 0; i < MAX_EXTRA_FILMS; i++) {
  render(filmsRated.querySelector('.films-list__container'), createFilmCard(), `beforeend`);
  render(filmsCommented.querySelector('.films-list__container'), createFilmCard(), `beforeend`);
}


render(filmsList, createBtnMore(), `beforeend`);
