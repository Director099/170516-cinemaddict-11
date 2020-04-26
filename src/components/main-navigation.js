import {createElement} from "../utils/render";

const createNavigationItem = (nav, active) => {
  const {name, count} = nav;
  const linkName = name.toLowerCase();
  const activeClass = active ? `main-navigation__item--active` : ``;
  const mainLink = (name === `All`) ? `${name} movies` : `${name}`;
  const countFilm = (name !== `All`) ? `<span class="main-navigation__item-count">${count}</span>` : ``;
  return (
    `<a href="#${linkName}" class="main-navigation__item ${activeClass}">${mainLink} ${countFilm}</a>`
  );
};

const createMainNavigation = (navigationItem) => {
  const renderItem = navigationItem.map((item, i) => createNavigationItem(item, i === 0)).join(`\n`);

  return (
    `<nav class="main-navigation">
        <div class="main-navigation__items">
            ${renderItem}
        </div>            
        <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`
  );
};

export default class MainNavigation {
  /**
   * @description Для передачи обьяекта
   * @param item передаю шаблон пункта навигации
   */

  constructor(item) {
    this._item = item;
    this._elem = null;
  }

  /**
   * @description Метод для создания HTML разметки
   * @return {string} - возвращает результат функции
   */
  getTemplate() {
    return createMainNavigation(this._item);
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
