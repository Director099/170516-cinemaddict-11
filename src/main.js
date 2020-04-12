const MAX_CARD = 5;
const MAX_EXTRA_LIST = 2;
const MAX_EXTRA_FILMS = 2;

import {createProfile} from "./components/profile.js";
import {createMainNavigation} from "./components/main-navigation.js";
import {createSort} from "./components/sort.js";
import {createFilmContent} from "./components/film-content.js";
import {createFilmsExtra} from "./components/films-extra.js";
import {createFilmDetails} from "./components/film-details.js";
import {createFilmCard} from "./components/film-card.js";
import {createBtnMore} from "./components/btn-more.js";
import {createStatistics} from "./components/statistics.js";
import {generateItems} from "./mock/main-navigation.js";

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
const navigationItem = generateItems();

render(pageHeader, createProfile(), `beforeend`);
render(mainContent, createMainNavigation(navigationItem), `beforeend`);
render(mainContent, createSort(), `beforeend`);
render(mainContent, createFilmContent(), `beforeend`);
render(footerStatistics, createStatistics(), `beforeend`);
// render(document.body, createFilmDetails(), `beforeend`);

const films = document.querySelector(`.films`);
const filmsList = films.querySelector(`.films-list`);
const filmsListContainer = films.querySelector(`.films-list__container`);

for (let i = 0; i < MAX_CARD; i++) {
  render(filmsListContainer, createFilmCard(), `beforeend`);
}

for (let i = 0; i < MAX_EXTRA_LIST; i++) {
  render(films, createFilmsExtra(), `beforeend`);
}

const filmsListExtra = document.querySelectorAll(`.films-list--extra`);

const [filmsRated, filmsCommented] = filmsListExtra;

for (let i = 0; i < MAX_EXTRA_FILMS; i++) {
  render(filmsRated.querySelector(`.films-list__container`), createFilmCard(), `beforeend`);
  render(filmsCommented.querySelector(`.films-list__container`), createFilmCard(), `beforeend`);
}

render(filmsList, createBtnMore(), `beforeend`);
