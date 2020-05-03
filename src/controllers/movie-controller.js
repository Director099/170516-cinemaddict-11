import {KeyCode} from "../const";
import FilmDetail from "../components/film-detail";
import FilmCard from "../components/film-card";
import {render} from "../utils/render";

export default class MovieController {
  constructor(container, onDataChange) {
    this._container = container;
    this._onDataChange = onDataChange;

    this._filmDetail = null;
    this._filmCard = null;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  render(film) {
    this._filmDetail = new FilmDetail(film);
    this._filmCard = new FilmCard(film);

    this._filmCard.setClickHandler(`.film-card__title`, () => {
      this._onFilmClick();
    });
    this._filmCard.setClickHandler(`.film-card__poster`, () => {
      this._onFilmClick();
    });
    this._filmCard.setClickHandler(`.film-card__comments`, () => {
      this._onFilmClick();
    });

    this._filmDetail.setClickHandler(`.film-details__close-btn`, () => {
      this._onCloseFilmDetail();
    });

    render(this._container, this._filmCard.getElement());

    this._filmCard.setFavoritesButtonClickHandler((evt) => {
      evt.preventDefault();
      this._onDataChange(this, film, Object.assign({}, film, {
        isFavorite: !film.isFavorites,
      }));
    });

    this._filmCard.setWatchedButtonClickHandler((evt) => {
      evt.preventDefault();
      this._onDataChange(this, film, Object.assign({}, film, {
        isWatched: !film.isWatched,
      }));
    });

    this._filmCard.setWatchlistButtonClickHandler((evt) => {
      evt.preventDefault();
      this._onDataChange(this, film, Object.assign({}, film, {
        isWatch: !film.isWatch,
      }));
    });
  }

  _onFilmClick() {
    document.body.appendChild(this._filmDetail.getElement());
    document.body.classList.add(`hide-overflow`);
    document.addEventListener(`keydown`, this._onEscKeyDown);
  }

  _onCloseFilmDetail() {
    document.body.removeChild(this._filmDetail.getElement());
    document.body.classList.remove(`hide-overflow`);
  }

  _onEscKeyDown(evt) {
    if (evt.keyCode === KeyCode.ESC) {
      this._onCloseFilmDetail();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }
}
