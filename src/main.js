import Profile from "./components/profile";
import MainNavigation from "./components/main-navigation";
import Sort from "./components/sort";
import NoFilms from "./components/no-films";
import FilmContent from "./components/film-content";
import FilmList from "./components/film-list";
import FilmDetail from "./components/film-detail";
import FilmCard from "./components/film-card";
import BtnMore from "./components/btn-more";
import Statistics from "./components/statistics";

import {KeyCode, CardCount} from "./const";
import {generateItems, getWatchFilms} from "./mock/main-navigation";
import {generateCountCard} from "./mock/film-card";
import {render} from "./utils/render";


const body = document.querySelector(`body`);
const pageHeader = document.querySelector(`.header`);
const mainContent = document.querySelector(`.main`);
const footerStatistics = document.querySelector(`.footer__statistics`);
const filmCardGenerate = generateCountCard(CardCount.START);
const navigationItem = generateItems(getWatchFilms(filmCardGenerate));
const filmsContent = new FilmContent();

render(pageHeader, new Profile().getElement());
render(mainContent, new MainNavigation(navigationItem).getElement());
render(mainContent, new Sort().getElement());
render(footerStatistics, new Statistics().getElement());
render(mainContent, filmsContent.getElement());

/**
 * @description Генерация карточки фильма и открывает нужный попап
 * @contentElem
 * @film
 */

const renderFilmCard = (contentElem, film) => {
  const filmDetail = new FilmDetail(film);
  const filmCard = new FilmCard(film);
  const closeFilmDetail = filmDetail.getElement().querySelector(`.film-details__close-btn`);
  const filmCardTitle = filmCard.getElement().querySelector(`.film-card__title`);
  const filmCardPoster = filmCard.getElement().querySelector(`.film-card__poster`);
  const filmCardComments = filmCard.getElement().querySelector(`.film-card__comments`);

  const onFilmClick = () => {
    body.appendChild(filmDetail.getElement());
    body.classList.add(`hide-overflow`);
    document.addEventListener(`keydown`, onEscKeyDown);
  };

  const onCloseFilmDetail = () => {
    body.removeChild(filmDetail.getElement());
    body.classList.remove(`hide-overflow`);
    document.removeEventListener(`keydown`, onEscKeyDown);
  };

  const onEscKeyDown = (evt) => {
    if (evt.keyCode === KeyCode.ESC) {
      onCloseFilmDetail();
    }
  };

  filmCardTitle.addEventListener(`click`, onFilmClick);
  filmCardPoster.addEventListener(`click`, onFilmClick);
  filmCardComments.addEventListener(`click`, onFilmClick);
  closeFilmDetail.addEventListener(`click`, onCloseFilmDetail);
  render(contentElem, filmCard.getElement());
};


/**
 * @description Генерация списков фильмов
 * @param container - Расположение шаблона
 * @param listFilms - перечада сгенерированныйх фильмов
 */

const renderListFilm = (container, listFilms) => {
  const mainListFilm = new FilmList({title: `All movies. Upcoming`, mainTitle: true});
  const topListFilm = new FilmList({title: `Top rated`, className: `films-list--extra`, mainTitle: false});
  const mostCommentedListFilm = new FilmList({title: `Most commented`, className: `films-list--extra`, mainTitle: false});
  const btnMore = new BtnMore();

  const listFilmContainerMain = mainListFilm.getElement().querySelector(`.films-list__container`);
  const listFilmContainerTop = topListFilm.getElement().querySelector(`.films-list__container`);
  const listFilmContainerMostComent = mostCommentedListFilm.getElement().querySelector(`.films-list__container`);

  const isAllFilmsArchived = listFilms.every((film) => film.isArchive);
  if (isAllFilmsArchived) {
    render(filmsContent.getElement(), new NoFilms().getElement());
    return;
  }

  render(container, mainListFilm.getElement());
  listFilms.slice(0, CardCount.START).forEach((film) => {
    renderFilmCard(listFilmContainerMain, film);
  });

  render(mainListFilm.getElement(), btnMore.getElement());
  render(container, topListFilm.getElement());
  render(container, mostCommentedListFilm.getElement());

  listFilms.slice(0, CardCount.EXTRA).forEach((film) => {
    renderFilmCard(listFilmContainerTop, film);
    renderFilmCard(listFilmContainerMostComent, film);
  });

  btnMore.getElement().addEventListener(`click`, () => {
    listFilms.slice(0, CardCount.START).forEach((film) => {
      renderFilmCard(listFilmContainerMain, film);
    });

    if (CardCount.START >= filmCardGenerate.length) {
      btnMore.getElement().remove();
      btnMore.removeElement();
    }
  });
};

renderListFilm(filmsContent.getElement(), filmCardGenerate);
