import AbstractComponent from "./abstract-component";

const createFilmContent = () => {
  return (
    `<section class="films"></section>`
  );
};

export default class FilmContent extends AbstractComponent {
  /**
   * @description Метод для создания HTML разметки
   * @return {string} - возвращает результат функции
   */
  getTemplate() {
    return createFilmContent();
  }
}
