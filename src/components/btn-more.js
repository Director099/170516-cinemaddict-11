import {createElement} from "../utils/render";

const createBtnMore = () => {
  return (
    `<button class="films-list__show-more">Show more</button>`
  );
};

export default class BtnMore {
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
    return createBtnMore();
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
