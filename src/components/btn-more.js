import AbstractComponent from "./abstract-component";

const createBtnMore = () => {
  return (
    `<button class="films-list__show-more">Show more</button>`
  );
};

export default class BtnMore extends AbstractComponent {
  /**
   * @description Метод для создания HTML разметки
   * @return {string} - возвращает результат функции
   */
  getTemplate() {
    return createBtnMore();
  }

  /**
   * @description Обработчик клика
   * @param handler
   */

  setClickHandler(handler) {
    this.getElement().addEventListener(`click`, handler);
  }
}
