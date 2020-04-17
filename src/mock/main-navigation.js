export const generateItems = (item) => {
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
