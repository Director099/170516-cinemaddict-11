const MAX_CARD = 5;
const MAX_EXTRA_LIST = 2;
const MAX_EXTRA_FILMS = 2;

import {createProfile} from "./components/profile.js";
import {createMainNavigation} from "./components/main-navigation.js";
import {createSort} from "./components/sort.js";
import {createFilmContent} from "./components/film-content.js";
import {createFilmsExtra} from "./components/films-extra.js";
import {createFilmDetails} from "./components/film-details.js";
import {templateCard} from "./components/film-card.js";
import {createBtnMore} from "./components/btn-more.js";
import {createStatistics} from "./components/statistics.js";
import {generateItems, getWatchFilms} from "./mock/main-navigation.js";
import {generateCountCard} from "./mock/film-card.js";

/**
 * @description - Функция отрисовки компанента
 * @param container {object} - объект куда отрисовывать
 * @param template {string} - HTML шаблон
 * @param place {DOMString} - Определяет позицию добавленного элемента
 */

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const pageHeader = document.querySelector(`.header`);
const mainContent = document.querySelector(`.main`);
const footerStatistics = document.querySelector(`.footer__statistics`);
const filmCard = generateCountCard(MAX_CARD);
const navigationItem = generateItems(getWatchFilms(filmCard));

render(pageHeader, createProfile(), `beforeend`);
render(mainContent, createMainNavigation(navigationItem), `beforeend`);
render(mainContent, createSort(), `beforeend`);
render(mainContent, createFilmContent(), `beforeend`);
render(footerStatistics, createStatistics(), `beforeend`);

const films = document.querySelector(`.films`);
const filmsList = films.querySelector(`.films-list`);
const filmsListContainer = films.querySelector(`.films-list__container`);

for (let i = 0; i < filmCard.length; i++) {
  render(filmsListContainer, templateCard(filmCard[i]), `beforeend`);
}

for (let i = 0; i < MAX_EXTRA_LIST; i++) {
  render(films, createFilmsExtra(), `beforeend`);
}

const filmsListExtra = document.querySelectorAll(`.films-list--extra`);

const [filmsRated, filmsCommented] = filmsListExtra;

for (let i = 0; i < MAX_EXTRA_FILMS; i++) {
  render(filmsRated.querySelector(`.films-list__container`), templateCard(filmCard[i]), `beforeend`);
  render(filmsCommented.querySelector(`.films-list__container`), templateCard(filmCard[i]), `beforeend`);
}

render(filmsList, createBtnMore(), `beforeend`);

const loadMoreButton = document.querySelector(`.films-list__show-more`);

loadMoreButton.addEventListener(`click`, () => {
  for (let i = 0; i < filmCard.length; i++) {
    render(filmsListContainer, templateCard(filmCard[i]), `beforeend`);
  }
});

const cards = document.querySelectorAll(`.film-card`);
const body = document.querySelector(`body`);

cards.forEach((elem, i) => {
  elem.addEventListener(`click`, () => {
    render(document.body, createFilmDetails(filmCard[i]), `beforeend`);

    const filmDetail = document.querySelector(`.film-details`);
    filmDetail.classList.remove(`visually-hidden`);
    body.classList.add(`hide-overflow`);
  });
});

document.addEventListener(`click`, (evt) => {
  const filmDetail = document.querySelector(`.film-details`);
  if (evt.target.classList.contains(`film-details__close-btn`)) {
    filmDetail.remove();
    body.classList.remove(`hide-overflow`);
  }
});

