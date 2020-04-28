import Profile from "./components/profile";
import MainNavigation from "./components/main-navigation";
import Sort from "./components/sort";
import FilmContent from "./components/film-content";
import Statistics from "./components/statistics";

import PageController from "./controllers/page-controller";

import {CardCount} from "./const";
import {generateItems, getWatchFilms} from "./mock/main-navigation";
import {generateCountCard} from "./mock/film-card";
import {render} from "./utils/render";

const pageHeader = document.querySelector(`.header`);
const mainContent = document.querySelector(`.main`);
const footerStatistics = document.querySelector(`.footer__statistics`);
const filmCardGenerate = generateCountCard(CardCount.START);
const navigationItem = generateItems(getWatchFilms(filmCardGenerate));
const filmsContent = new FilmContent();
const pageController = new PageController(filmsContent);

render(pageHeader, new Profile().getElement());
render(mainContent, new MainNavigation(navigationItem).getElement());
render(mainContent, new Sort().getElement());
render(footerStatistics, new Statistics().getElement());
render(mainContent, filmsContent.getElement());


pageController.render(filmCardGenerate);
