import {combineReducers} from 'redux';

import sources from './sources';
import articles from './articles';
import countries from './countries';
import categories from './categories';
import filters from './filters';
import filteredSources from './filteredSources'
import focusedArticles from './focusedArticles';
import modals from "./modals";

let rootReducer = combineReducers({
  sources: sources,
  articles: articles,
  countries: countries,
  categories: categories,
  filters: filters,
  filteredSources: filteredSources,
  focusedArticles: focusedArticles,
  modals: modals
});

export default rootReducer;
