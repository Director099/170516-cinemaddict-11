import {createElement} from "../utils/render";

export default class AbstractComponent {

  /**
   * @description Для передачи обьяекта, проверка позволяет не выполнить AbstractComponent как конструктор
   */
  constructor() {
    if (new.target === AbstractComponent) {
      throw new Error(`Can't instantiate AbstractComponent, only concrete one.`);
    }

    this._element = null;
  }

  /**
   * @description getTemplate обязателен для каждого кто наследует абстрактный класс
   */

  getTemplate() {
    throw new Error(`Abstract method not implemented: getTemplate`);
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
   * @description Удалить ДОМ элемент
   */
  removeElement() {
    this._elem = null;
  }
}
