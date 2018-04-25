import {LOAD_SOURCES, RECIEVE_SOURCES, REJECT_SOURCES, RECIEVE_DATED_SOURCES} from '~/actions/actionNames';

let sources = (state = {sourceList: [], datedSourceList: [], loadingSources: false}, action) => {
  switch (action.type) {
    case LOAD_SOURCES:
      return Object.assign({}, state, {loadingSources: true});
      break;
    case REJECT_SOURCES:
      return Object.assign({}, state, {loadingSources: false});
      break;
    case RECIEVE_SOURCES:
      return Object.assign({}, state, {loadingSources: false, sourceList: [...state.sourceList, ...action.sources]});
      break;
    case RECIEVE_DATED_SOURCES:
      return Object.assign({}, state, {loadingSources: false, datedSourceList: [...state.datedSourceList, ...action.datedSources]})
    default:
      return state;
      break;
  }
};

export default sources;
