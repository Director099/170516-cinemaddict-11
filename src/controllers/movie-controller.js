import {KeyCode, Mode, ControlID} from "../const";
import FilmDetail from "../components/film-detail";
import FilmCard from "../components/film-card";
import {render, replace} from "../utils/render";

export default class MovieController {
  constructor(container, onDataChange) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._mode = Mode.DEFAULT;

    this._filmDetail = null;
    this._filmCard = null;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  render(film) {
    this._film = film;
    const oldFilmDetail = this._filmDetail;
    const oldFilmCard = this._filmCard;

    this._filmDetail = new FilmDetail(film);
    this._filmCard = new FilmCard(film);

    this._filmCard.setClickHandler(`.film-card__title`, () => {
      this._onShowModal();
    });
    this._filmCard.setClickHandler(`.film-card__poster`, () => {
      this._onShowModal();
    });
    this._filmCard.setClickHandler(`.film-card__comments`, () => {
      this._onShowModal();
    });

    this._filmDetail.setClickHandler(`.film-details__close-btn`, () => {
      this._onHideModal();
    });

    this._setFilmHandlers();
    this._setFilmDetailChangeHandler();

    if (oldFilmDetail && oldFilmCard) {
      replace(this._filmCard, oldFilmCard);
      replace(this._filmDetail, oldFilmDetail);
    } else {
      render(this._container, this._filmCard.getElement());
    }
  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._onHideModal();
    }
  }

  _setFilmHandlers() {
    this._filmCard.setFavoritesButtonClickHandler((evt) => {
      evt.preventDefault();
      this._onDataChange(this, this._film, Object.assign({}, this._film, {
        isFavorites: !this._film.isFavorites,
      }));
    });

    this._filmCard.setHistoryButtonClickHandler((evt) => {
      evt.preventDefault();
      this._onDataChange(this, this._film, Object.assign({}, this._film, {
        isHistory: !this._film.isHistory,
      }));
    });

    this._filmCard.setWatchlistButtonClickHandler((evt) => {
      evt.preventDefault();
      this._onDataChange(this, this._film, Object.assign({}, this._film, {
        isWatchlist: !this._film.isWatchlist,
      }));
    });
  }

  _setFilmDetailChangeHandler() {
    this._filmDetail.setControlButtonsChangeHandler((id) => {
      if (ControlID.FAVORITE === id) {
        this._onDataChange(this, this._film, Object.assign({}, this._film, {
          isFavorites: !this._film.isFavorites,
        }));
      }

      if (ControlID.HISTORY === id) {
        this._onDataChange(this, this._film, Object.assign({}, this._film, {
          isHistory: !this._film.isHistory,
        }));
      }

      if (ControlID.WATCHLIST === id) {
        this._onDataChange(this, this._film, Object.assign({}, this._film, {
          isWatchlist: !this._film.isWatchlist,
        }));
      }
    });
  }

  _onShowModal() {
    // this._onViewChange();
    document.body.appendChild(this._filmDetail.getElement());
    document.body.classList.add(`hide-overflow`);
    document.addEventListener(`keydown`, this._onEscKeyDown);
  }

  _onHideModal() {
    document.body.removeChild(this._filmDetail.getElement());
    document.body.classList.remove(`hide-overflow`);
  }

  _onEscKeyDown(evt) {
    if (evt.keyCode === KeyCode.ESC) {
      this._onHideModal();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }
}
