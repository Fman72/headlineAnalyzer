let newsApiMethods = {};

newsApiMethods.getSources = (category, callback) => {
  NewsApiHelper.makeGetRequest({resource: 'sources', params: {category: category}, responseObject: 'sources'}, (sources) => {

    sources = Source.createAndSaveObjects(sources);
    return callback(sources);

  });
}

newsApiMethods.getTopArticlesForSource = (source, callback) => {
  NewsApiHelper.makeGetRequest({resource: 'articles', params: {source: source}, responseObject: 'articles'}, (articles) => {

    articles = Article.createAndSaveObjects(articles, source);
    return callback(articles);

  });
}

newsApiMethods.getTopArticlesForAllSources = (category, callback = (allArticles) => {return allArticles}) => {
  newsApiMethods.getSources(null, (sources) => {

    let sourceIds = sources.map((source) => {
      return source.id;
    });

    let allArticles = [];

    sourceIds.forEach((source, index) => {

    newsApiMethods.getTopArticlesForSource(source, (articles) => {

        allArticles = allArticles.concat(articles);
        if(index + 1 == sourceIds.length)
        {
          callback(allArticles);
        }
      });

    });

  });
}

export default newsApiMethods;
