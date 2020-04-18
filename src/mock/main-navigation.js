/**
 * @description Показываем общее число просмотренных/избранных фильмов
 * @param films - массив фильмов
 * @returns {*} объект чисел на каждый из категории фильтра
 */

const getWatchFilms = (films) => films.reduce((stats, film) => {
  if (film.isWatchlist) {
    stats.watchlist += 1;
  }
  if (film.isHistory) {
    stats.history += 1;
  }
  if (film.isFavorites) {
    stats.favorites += 1;
  }
  return stats;
}, {watchlist: 0, history: 0, favorites: 0});

const generateItems = (item) => {
  return [{
    name: `All`,
  }, {
    name: `Watchlist`,
    count: item.watchlist,
  }, {
    name: `History`,
    count: item.history,
  }, {
    name: `Favorites`,
    count: item.favorites,
  }];
};

export {generateItems, getWatchFilms};
