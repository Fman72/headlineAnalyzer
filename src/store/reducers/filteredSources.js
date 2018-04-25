import {FILTER_SOURCES} from '~/actions/actionNames';

let filteredSources = (state = [], action) => {
  switch (action.type) {
    case FILTER_SOURCES:
      return filterData(action.sources, action.filters, action.filterOn);
      break;
    default:
      return state;
  }
}

export default filteredSources;
