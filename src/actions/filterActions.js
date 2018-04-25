import {ADD_FILTER, REMOVE_FILTER, SET_FILTERS, FILTER_SOURCES} from './actionNames';

import {tryLoad} from './thunkHelper';

let addFilter = (filterGroup, filterValue) => {
  return {type: ADD_FILTER, filterGroup, filterValue};
}

let removeFilter = (filterGroup, filterValue) => {
  return {type: REMOVE_FILTER, filterGroup, filterValue};
}

let setFilters = (filterGroup, filters) => {
  return {type: SET_FILTERS, filterGroup, filters}
}

let filterSources = (sources, filters, filterMappings) => {
  return {type: FILTER_SOURCES, sources, filters, filterMappings};
}

export {addFilter, removeFilter, setFilters, filterSources};
