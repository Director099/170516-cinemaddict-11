const createNavigationItem = (nav, active) => {
  const {name, count} = nav;
  return (
    `<a href="#${name.toLowerCase()}" 
        class="main-navigation__item ${active ? `main-navigation__item--active` : ``}">
        ${(name === `All`) ? `${name} movies` : `${name}`} 
        ${(name !== `All`) ? `<span class="main-navigation__item-count">${count}</span>` : ``}
    </a>`
  );
};

export const createMainNavigation = (navigationItem) => {
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
