import {ADD_FILTER, REMOVE_FILTER, GET_COUNTRIES, GET_CATEGORIES, SET_FILTERS} from '~/actions/actionNames';

let filters = (state = {}, action) => {
  switch (action.type) {
    case ADD_FILTER:
      return Object.assign({}, state, {[action.filterGroup]: [...state[action.filterGroup], action.filterValue]});
      break;
    case REMOVE_FILTER:
      return Object.assign({}, state, )
      break;
    case SET_FILTERS:
      if(action.filters.length == 0)
      {
        let  {[action.filterGroup]: omit, ...remainingFilters} = state;
        return remainingFilters;
      }
      return Object.assign({}, state, {[action.filterGroup]: action.filters});
      break;
    default:
      return state;
  }
}

export default filters;
