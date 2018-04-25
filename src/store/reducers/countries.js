import {RECIEVE_COUNTRIES} from '~/actions/actionNames';

let countries = (state = [], action) => {
  switch (action.type) {
    case RECIEVE_COUNTRIES:
      return action.countries;
      break;
    default:
      return state;
  }
}

export default countries;
