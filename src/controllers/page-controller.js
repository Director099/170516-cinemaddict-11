import FilmDetail from "../components/film-detail";
import FilmCard from "../components/film-card";
import {CardCount, KeyCode} from "../const";
import {remove, render} from "../utils/render";
import FilmList from "../components/film-list";
import BtnMore from "../components/btn-more";
import NoFilms from "../components/no-films";

/**
 * @description Генерация карточки фильма и открывает нужный попап
 * @contentElem
 * @film
 */

const renderFilmCard = (contentElem, film) => {
  const filmDetail = new FilmDetail(film);
  const filmCard = new FilmCard(film);

  const onFilmClick = () => {
    document.body.appendChild(filmDetail.getElement());
    document.body.classList.add(`hide-overflow`);
    document.addEventListener(`keydown`, onEscKeyDown);
  };

  const onCloseFilmDetail = () => {
    document.body.removeChild(filmDetail.getElement());
    document.body.classList.remove(`hide-overflow`);
    document.removeEventListener(`keydown`, onEscKeyDown);
  };

  const onEscKeyDown = (evt) => {
    if (evt.keyCode === KeyCode.ESC) {
      onCloseFilmDetail();
    }
  };

  filmCard.setClickHandler(`.film-card__title`, onFilmClick);
  filmCard.setClickHandler(`.film-card__poster`, onFilmClick);
  filmCard.setClickHandler(`.film-card__comments`, onFilmClick);
  filmDetail.setClickHandler(`.film-details__close-btn`, onCloseFilmDetail);
  render(contentElem, filmCard.getElement());
};

export default class PageController {
  constructor(container) {
    this._container = container;

    this._mainListFilm = new FilmList({title: `All movies. Upcoming`, mainTitle: true});
    this._topListFilm = new FilmList({title: `Top rated`, className: `films-list--extra`, mainTitle: false});
    this._mostCommentedListFilm = new FilmList({title: `Most commented`, className: `films-list--extra`, mainTitle: false});
    this._noFilms = new NoFilms();
    this._btnMore = new BtnMore();
  }

  render(films) {
    const container = this._container.getElement();
    const listFilmContainerMain = this._mainListFilm.getElement().querySelector(`.films-list__container`);
    const listFilmContainerTop = this._topListFilm.getElement().querySelector(`.films-list__container`);
    const listFilmContainerMostComent = this._mostCommentedListFilm.getElement().querySelector(`.films-list__container`);

    const isAllFilmsArchived = films.every((film) => film.isArchive);

    if (isAllFilmsArchived) {
      render(container, this._noFilms.getElement());
      return;
    }

    render(container, this._mainListFilm.getElement());

    films.slice(0, CardCount.START).forEach((film) => {
      renderFilmCard(listFilmContainerMain, film);
    });

    render(this._mainListFilm.getElement(), this._btnMore.getElement());
    render(container, this._topListFilm.getElement());
    render(container, this._mostCommentedListFilm.getElement());

    films.slice(0, CardCount.EXTRA).forEach((film) => {
      renderFilmCard(listFilmContainerTop, film);
      renderFilmCard(listFilmContainerMostComent, film);
    });

    this._btnMore.setClickHandler(() => {
      films.slice(0, CardCount.START).forEach((film) => {
        renderFilmCard(listFilmContainerMain, film);
      });

      if (CardCount.START >= films.length) {
        remove(this._btnMore);
      }
    });
  }
}
