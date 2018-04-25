import {getCountries as requestCountries} from '~/chartRouteRequests';

import {LOAD_COUNTRIES, REJECT_COUNTRIES, RECIEVE_COUNTRIES} from './actionNames';

import {tryLoad} from './thunkHelper';

let recieveCountries = (countries) => {
  return {type: RECIEVE_COUNTRIES, countries};
}

let loadCountries = () => {
  return {type: LOAD_COUNTRIES};
}

let rejectCountries = () => {
  return {type: REJECT_COUNTRIES};
}

let tryLoadCountries = () => {
  return tryLoad(requestCountries, loadCountries, recieveCountries, rejectCountries);
}

export {tryLoadCountries};
