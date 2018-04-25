import {tryLoad} from './thunkHelper';
import {REJECT_SOURCES} from "./actionNames";

import {getArticlesForDot} from "../chartRouteRequests";

let recieveFocusedArticles = (articles) => {
  return {type: "RECIEVE_FOCUSED_ARTICLES", articles};
};

let requestFocusedArticles = () => {
  return {type: "REQUEST_FOCUSED_ARTICLES"};
};

let rejectFocusedArticles = () => {
  return {type: "REJECT_FOCUSED_ARTICLES"};
};

let tryRequestFocusedArticles = (date, source) => {
  return tryLoad(getArticlesForDot.bind(this, date, source), requestFocusedArticles, recieveFocusedArticles, rejectFocusedArticles);
};

export {tryRequestFocusedArticles};