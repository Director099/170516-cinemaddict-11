import {createElement} from "../utils/render";

const createFilmContent = () => {
  return (
    `<section class="films"></section>`
  );
};

export default class FilmContent {
  /**
   * @description Для передачи обьяекта
   */
  constructor() {
    this._elem = null;
  }

  /**
   * @description Метод для создания HTML разметки
   * @return {string} - возвращает результат функции
   */
  getTemplate() {
    return createFilmContent();
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
