import FilmList from "../components/film-list";
import BtnMore from "../components/btn-more";
import NoFilms from "../components/no-films";
import MovieController from "./movie-controller";
import {CardCount} from "../const";
import {render, remove} from "../utils/render";

/**
 * @description Проходим по всем фильмам и на каждый фильм создаем отедльный контроллер
 * @param filmListElement
 * @param filmInfo - передаю данные по фильму
 * @return {*}
 */

const renderFilms = (filmListElement, filmInfo, onDataChange) => {
  return filmInfo.map((film) => {
    const movieController = new MovieController(filmListElement, onDataChange);

    movieController.render(film);

    return movieController;
  });
};

export default class PageController {
  constructor(container) {
    this._container = container;

    this._films = [];
    this._showedFilmController = [];
    this._showingdFilmsCount = CardCount.START;
    this._mainListFilm = new FilmList({title: `All movies. Upcoming`, mainTitle: true});
    this._topListFilm = new FilmList({title: `Top rated`, className: `films-list--extra`, mainTitle: false});
    this._mostCommentedListFilm = new FilmList({title: `Most commented`, className: `films-list--extra`, mainTitle: false});
    this._noFilms = new NoFilms();
    this._btnMore = new BtnMore();
    this._onDataChange = this._onDataChange.bind(this);
  }

  render(films) {
    this._films = films;
    const container = this._container.getElement();
    const listFilmContainerMain = this._mainListFilm.getElement().querySelector(`.films-list__container`);
    const listFilmContainerTop = this._topListFilm.getElement().querySelector(`.films-list__container`);
    const listFilmContainerMostComent = this._mostCommentedListFilm.getElement().querySelector(`.films-list__container`);

    const isAllFilmsArchived = this._films.every((film) => film.isArchive);

    if (isAllFilmsArchived) {
      render(container, this._noFilms.getElement());
      return;
    }

    render(container, this._mainListFilm.getElement());

    const newFilm = renderFilms(listFilmContainerMain, this._films.slice(0, this._showingdFilmsCount, this._onDataChange));
    this._showedFilmController = this._showedFilmController.concat(newFilm);

    render(this._mainListFilm.getElement(), this._btnMore.getElement());
    render(container, this._topListFilm.getElement());
    render(container, this._mostCommentedListFilm.getElement());

    renderFilms(listFilmContainerTop, this._films.slice(0, CardCount.EXTRA));
    renderFilms(listFilmContainerMostComent, this._films.slice(0, CardCount.EXTRA));

    this._renderLoadMoreButton();
  }

  _renderLoadMoreButton() {
    const container = this._container.getElement();
    render(container, this._btnMore);

    this._btnMore.setClickHandler(() => {
      const filmListElement = this._mainListFilm.getElement().querySelector(`.films-list__container`);
      this._showingdFilmsCount += CardCount.NEXT;

      const newFilm = renderFilms(filmListElement, this._films.slice(0, this._showingdFilmsCount, this._onDataChange));
      this._showedFilmController = this._showedFilmController.concat(newFilm);

      if (this._showingdFilmsCount >= this._films.length) {
        remove(this._btnMore);
      }
    });
  }

  /**
   * @description Метод по вношению изменения
   * @param movieController - передаю метод обновления
   * @param oldData - старые данные
   * @param newData - новые данные
   * @private
   */

  _onDataChange(movieController, oldData, newData) {
    const index = this._films.findIndex((it) => it === oldData);

    if (index === -1) {
      return;
    }

    this._films = [].concat(this._films.slice(0, index), newData, this._films.slice(index + 1));

    movieController.render(this._films[index]);
  }
}
