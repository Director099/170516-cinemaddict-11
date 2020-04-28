import AbstractComponent from "./abstract-component";

const createNoFilmsTemplate = () => {
  return (
    `<section class="films-list">
      <h2 class="films-list__title">There are no movies in our database</h2>
    </section>`
  );
};

export default class NoFilms extends AbstractComponent {
  /**
   * @description Метод для создания HTML разметки
   * @return {string} - возвращает результат функции
   */
  getTemplate() {
    return createNoFilmsTemplate();
  }
}
