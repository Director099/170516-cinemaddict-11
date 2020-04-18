import {MONTH_NAMES} from "../const.js";

const posterFilms = [
  `./images/posters/the-dance-of-life.jpg`,
  `./images/posters/sagebrush-trail.jpg`,
  `./images/posters/the-man-with-the-golden-arm.jpg`,
  `./images/posters/santa-claus-conquers-the-martians.jpg`,
  `./images/posters/popeye-meets-sinbad.png`,
];

const titleFilms = [
  `The Dance of Life`,
  `Sagebrush Trail`,
  `The Man with the Golden Arm`,
  `Santa Claus Conquers the Martians`,
  `Popeye the Sailor Meets Sindbad the Sailor`,
];

const descriptionsItems = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra.`,
  `Aliquam id orci ut lectus varius viverra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `Sed sed nisi sed augue convallis suscipit in sed felis.`,
  `Aliquam erat volutpat.`,
  `Nunc fermentum tortor ac porta dapibus.`,
  `In rutrum ac purus sit amet tempus.`,
];

const genreItems = [
  `Musical`,
  `Western`,
  `Drama`,
  `Comedy`,
  `Cartoon`,
  `Mystery`,
];

const directorItems = [
  `Dodo Abashidze`,
  `Brad Bird`,
  `Martin Campbell`,
];

const writersItems = [
  `Anne Wigton`,
  `Heinz Herald`,
  `Richard Weil`,
];

const actorsItems = [
  `Erich von Stroheim`,
  `Mary Beth Hughes`,
  `Dan Duryea`,
];

const countryItems = [
  `Russia`,
  `China`,
  `USA`,
  `India`,
];

const ageRatingItems = [`0+`, `6+`, `12+`, `16+`, `18+`];

const emojiItems = [
  `smile`,
  `sleeping`,
  `puke`,
  `angry`,
];

const autorItems = [
  `Tim Macoveev`,
  `John Doe`,
  `Mikkie Rurk`,
  `James Bond`,
  `Yarick`
];

const textItems = [
  `Interesting setting and a good cast`,
  `Booooooooooring`,
  `Very very old. Meh`,
  `Almost two hours? Seriously?`,
];

const getRandomArrayItem = (array) => {
  const randomIndex = getRandomIntegerNumber(0, array.length);
  return array[randomIndex];
};

const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor(Math.random() * (max - min));
};

const generateDescription = (elem) => {
  let descriptionList = [];
  const maxIndex = getRandomIntegerNumber(1, 5);

  for (let i = 0; i < maxIndex; i++) {
    descriptionList.push(getRandomArrayItem(elem));
  }
  return descriptionList;
};

const generateCommentDate = () => {
  const targetDate = new Date();
  const differenceDate = getRandomIntegerNumber(0, 12);
  const differenceHours = getRandomIntegerNumber(0, 24);
  const differenceMinutes = getRandomIntegerNumber(0, 60);
  targetDate.setDate(targetDate.getDate() - differenceDate);
  targetDate.setHours(targetDate.getHours() - differenceHours);
  targetDate.setMinutes(targetDate.getMinutes() - differenceMinutes);
  const generatedDate = `${targetDate.getFullYear()}/${targetDate.getMonth()}/${targetDate.getDay()} ${targetDate.getHours()}:${targetDate.getMinutes()}`;
  return generatedDate;
};

const generateComment = () => {
  return {
    text: getRandomArrayItem(textItems),
    emoji: getRandomArrayItem(emojiItems),
    author: getRandomArrayItem(autorItems),
    date: generateCommentDate(),
  };
};

let randomBoolean = () => {
  return Math.random() >= 0.5;
};

const generateCountComment = (count) => {
  return new Array(count).fill(``).map(generateComment);
};

const generateCountCard = (count) => {
  return new Array(count).fill(``).map(generateCard);
};

const generateCard = () => {
  const countComments = getRandomIntegerNumber(0, 5);

  return {
    title: getRandomArrayItem(titleFilms),
    poster: getRandomArrayItem(posterFilms),
    description: generateDescription(descriptionsItems).join(` `),
    genres: generateDescription(genreItems),
    rating: getRandomIntegerNumber(0, 10),
    year: getRandomIntegerNumber(1920, 2010),
    duration: `1h ${getRandomIntegerNumber(0, 60)}m`,
    data: getRandomIntegerNumber(0, 30),
    month: getRandomArrayItem(MONTH_NAMES),
    country: getRandomArrayItem(countryItems),
    ageRating: getRandomArrayItem(ageRatingItems),
    director: directorItems,
    writer: writersItems,
    actor: actorsItems,
    countComment: countComments,
    isHistory: randomBoolean(),
    isWatchlist: randomBoolean(),
    isFavorites: randomBoolean(),
    comments: generateCountComment(countComments),
  };
};

export {generateCard, generateCountCard};
