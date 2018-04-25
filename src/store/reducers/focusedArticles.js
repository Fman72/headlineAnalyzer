

let focusedArticles = (state = [], action) => {
  switch (action.type) {
    case "REQUEST_FOCUSED_ARTICLES":
      return [];
      break;
    case "RECIEVE_FOCUSED_ARTICLES":
      return action.articles;
      break;
    default:
      return state;
      break;
  }
};

export default focusedArticles;
