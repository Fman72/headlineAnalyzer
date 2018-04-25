

let articles = (state = [], action) => {
  switch (action.name) {
    case "ADD_SOURCES":
      let newArticlesList = [...state, ...actions.articles];
      return Object.assign({}, state, newArticlesList);
      break;
    default:
      return state;
      break;
  }
};

export default articles;
