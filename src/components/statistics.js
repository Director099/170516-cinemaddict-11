import AbstractComponent from "./abstract-component";

const createStatistics = () => {
  return (
    `<p>130 291 movies inside</p>`
  );
};

export default class Statistics extends AbstractComponent {
  /**
   * @description Метод для создания HTML разметки
   * @return {string} - возвращает результат функции
   */
  getTemplate() {
    return createStatistics();
  }
}
