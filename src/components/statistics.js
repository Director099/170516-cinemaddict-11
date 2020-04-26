import {createElement} from "../utils/render";

const createStatistics = () => {
  return (
    `<p>130 291 movies inside</p>`
  );
};

export default class Statistics {
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
    return createStatistics();
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
