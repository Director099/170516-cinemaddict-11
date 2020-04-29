import AbstractComponent from "./abstract-component";

const createFilmList = (info) => {
  const {title, className, mainTitle} = info;
  const addClass = className ? className : ``;
  const mainListfilm = (mainTitle === true) ? `visually-hidden` : ``;
  return (
    `<section class="films-list ${addClass}">
        <h2 class="films-list__title ${mainListfilm}">${title}</h2>
        <div class="films-list__container"></div>
    </section>`
  );
};

export default class FilmList extends AbstractComponent {
  constructor(info) {
    super();
    this._info = info;
  }

  /**
   * @description Метод для создания HTML разметки
   * @return {string} - возвращает результат функции
   */
  getTemplate() {
    return createFilmList(this._info);
  }
}
