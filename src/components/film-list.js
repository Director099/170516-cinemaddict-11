import {createElement} from "../utils/render";

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

export default class FilmList {
  /**
   * @description Для передачи обьяекта
   */

  constructor(info) {
    this._info = info;
    this._elem = null;
  }

  /**
   * @description Метод для создания HTML разметки
   * @return {string} - возвращает результат функции
   */
  getTemplate() {
    return createFilmList(this._info);
  }

  /**
   * @description Возвращает ДОМ элемент
   * @return {null}
   */
  getElement() {
    if (!this._elem) {
      this._elem = createElement(this.getTemplate());
    }

    return this._elem;
  }

  /**
   * @description Удалять ДОМ элемент
   */
  removeElement() {
    this._elem = null;
  }
}
