import AbstractComponent from "./abstract-component";

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

export default class MainNavigation extends AbstractComponent {
  constructor(item) {
    super();
    this._item = item;
  }

  /**
   * @description Метод для создания HTML разметки
   * @return {string} - возвращает результат функции
   */
  getTemplate() {
    return createMainNavigation(this._item);
  }
}
