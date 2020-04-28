export const renderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`,
};

/**
 * @description Создание элемента
 * @param template Принимает шаблонную строку
 * @return {ChildNode}
 */

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

/**
 * @description - Функция отрисовки компанента
 * @param container {object} - объект куда отрисовывать
 * @param element {string} - Элемент  ДОМ дерева
 * @param place {DOMString} - Определяет позицию добавленного элемента
 */

export const render = (container, element, place = renderPosition.BEFOREEND) => {
  switch (place) {
    case renderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case renderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};

export const remove = (component) => {
  component.getElement().remove();
  component.removeElement();
};
