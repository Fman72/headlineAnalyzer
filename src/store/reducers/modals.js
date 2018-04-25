

let modals = (state = {focusedArticles: false}, action) => {
  switch (action.type) {
    case "SHOW_FOCUSED_ARTICLES_MODAL":
      return Object.assign({}, state, {focusedArticles: true});
      break;
    case "HIDE_FOCUSED_ARTICLES_MODAL":
      return Object.assign({}, state, {focusedArticles: false});
      break;
    default:
      return state;
      break;
  }
};

export default modals;
