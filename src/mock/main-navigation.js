const generateNames = [
  `All`, `Watchlist`, `History`, `Favorites`
];

const generateItems = () => {
  return generateNames.map((it) => {
    return {
      name: it,
      count: Math.floor(Math.random() * 10),
    };
  });
};

export {generateItems};
