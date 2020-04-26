import {createElement} from "../utils/render";

const createNoFilmsTemplate = () => {
  return (
    `<section class="films-list">
      <h2 class="films-list__title">There are no movies in our database</h2>
    </section>`
  );
};

export default class NoFilms {
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
    return createNoFilmsTemplate();
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
