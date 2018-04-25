import {getCategories as requestCategories} from '~/chartRouteRequests';

import {LOAD_CATEGORIES, REJECT_CATEGORIES, RECIEVE_CATEGORIES} from './actionNames';

import {tryLoad} from './thunkHelper';

let recieveCategories = (categories) => {
  return {type: RECIEVE_CATEGORIES, categories};
}

let loadCategories = () => {
  return {type: LOAD_CATEGORIES};
}

let rejectCategories = () => {
  return {type: REJECT_CATEGORIES};
}

let tryLoadCategories = () => {
  return tryLoad(requestCategories, loadCategories, recieveCategories, rejectCategories);
}

export {tryLoadCategories};
