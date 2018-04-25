import {LOAD_SOURCES, RECIEVE_SOURCES, REJECT_SOURCES, RECIEVE_DATED_SOURCES} from './actionNames';

import {getAllSources, getDatedSources} from '~/chartRouteRequests';

import {tryLoad} from './thunkHelper';

let loadSources = () => {
  return {type: LOAD_SOURCES};
}

let recieveSources = (sources) => {
  return {type: RECIEVE_SOURCES, sources}
}

let recieveDatedSources = (datedSources) => {
  return {type: RECIEVE_DATED_SOURCES, datedSources}
}

let rejectSources = () => {
  return {type: REJECT_SOURCES};
}

let tryLoadSources = () => {
  return tryLoad(getAllSources, loadSources, recieveSources, rejectSources);
}

let tryLoadDatedSources = () => {
  return tryLoad(getDatedSources, loadSources, recieveDatedSources, rejectSources);
}

export {loadSources, recieveSources, rejectSources, tryLoadSources, tryLoadDatedSources};
