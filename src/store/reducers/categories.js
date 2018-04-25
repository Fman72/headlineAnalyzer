import {RECIEVE_CATEGORIES} from '~/actions/actionNames';

let categories = (state = [], action) => {
  switch (action.type) {
    case RECIEVE_CATEGORIES:
      return action.categories;
      break;
    default:
      return state;
  }
}

export default categories;
