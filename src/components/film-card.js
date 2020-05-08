import AbstractComponent from "./abstract-component";

const createButtonMarkup = (name, text, isActive = true) => {
  return (
    `<button class="film-card__controls-item button film-card__controls-item--${name} ${isActive ? `` : `film-card__controls-item--active`}">${text}</button>`
  );
};

const templateCard = (card) => {
  const {title, poster, rating, year, duration, genres, description, countComment} = card;
  const promoDescription = description.length > 140 ? `${description.substr(0, 140)}...` : `${description}`;
  const buttonWatchlist = createButtonMarkup(`add-to-watchlist`, `Add to watchlist`, !card.isWatchlist);
  const buttonWatched = createButtonMarkup(`mark-as-watched`, `Mark as watched`, !card.isHistory);
  const buttonFavorite = createButtonMarkup(`favorite`, `Mark as favorite`, !card.isFavorites);
  return (
    `<article class="film-card">
      <h3 class="film-card__title">${title}</h3>
      <p class="film-card__rating">${rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${year}</span>
        <span class="film-card__duration">${duration}</span>
        <span class="film-card__genre">${genres[0]}</span>
      </p>
      <img src="${poster}" alt="${title}" class="film-card__poster">
      <p class="film-card__description">${promoDescription}</p>
      <a class="film-card__comments">${countComment} comments</a>
      <form class="film-card__controls">
        ${buttonWatchlist}
        ${buttonWatched}
        ${buttonFavorite}
      </form>
    </article>`
  );
};

export default class FilmCard extends AbstractComponent {
  constructor(film) {
    super();
    this._film = film;
  }

  /**
   * @description Метод для создания HTML разметки
   * @return {string} - возвращает результат функции
   */
  getTemplate() {
    return templateCard(this._film);
  }

  /**
   * @description Клик по карточке
   * @param elem поиск элемента, на что кликаем
   * @param handler Функция
   */

  setClickHandler(elem, handler) {
    this.getElement().querySelector(elem).addEventListener(`click`, handler);
  }

  setFavoritesButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--favorite`)
      .addEventListener(`click`, handler);
  }

  setWatchedButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--mark-as-watched`)
      .addEventListener(`click`, handler);
  }

  setWatchlistButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`)
      .addEventListener(`click`, handler);
  }
}
