import newsApi from 'newsapi';

import Source from '~/framework/sources/Source';
import Article from '~/framework/articles/Article';

import {newsApiKey} from '~/sensitiveStuff';

import SourceAdapter from './SourceAdapter';

//const NewsApiHelper = new ApiHelper('https://newsapi.org/v2/top-headlines', {defaultParams: {Key: newsApiKey, language: 'en'}, contentType: 'json'});
const NewsApiHelper = new newsApi(newsApiKey);

const searchKeyword = 'trump';

class NewsApiAdapter extends SourceAdapter
{

	constructor()
	{
		super();
	}

	static async getSources(category)
	{
		let sourcesResponse = await NewsApiHelper.v2.sources();
	  //let sources = await NewsApiHelper.makeGetRequest({resource: 'sources', params: {category: category}, responseObject: 'sources'});
	  let sources = Source.createAndSaveObjects(sourcesResponse.sources);
	  return sources;
	}

	static async getTopArticlesForSource(source)
	{
    let articlesResponse = await NewsApiHelper.v2.topHeadlines({
			sources: source
		});
    //let articles = await NewsApiHelper.makeGetRequest({resource: 'articles', params: {source: source}, responseObject: 'articles'});
		articles = Article.createAndSaveObjects(articlesResponse.articles, source);
		return articles;
	}

	static async getTopArticlesForAllSources(callback)
	{
    let sources = await Source.getObjectsWhere("country = 'au'");

    sources = sources.map(source => {return source.id});

    let sourcesString = sources.join(',');

    let articlesResponse = await NewsApiHelper.v2.topHeadlines({
			pageSize: 100,
			q: searchKeyword
		});

    let articles = articlesResponse.articles.map(article => {article.source = article.source.id; return article;});
    //let articles = await NewsApiHelper.makeGetRequest({resource: 'articles', params: {source: source}, responseObject: 'articles'});
    articles = Article.createAndSaveObjects(articles);
    return articles;
		/*let sources = await this.getSources(null);

		let sourceIds = sources.map((source) => {
			return source.id;
		});

		let allArticles = [];

		sourceIds.forEach((source, index) => {

			this.getTopArticlesForSource(source).then((articles) => {

				allArticles = allArticles.concat(articles);
				if(index + 1 == sourceIds.length)
				{
					//callback(allArticles);
				}

			},
			(error) => {
				console.log(error.message);
			});

		});
		console.log('Grabbed new articles.');*/
	}
  //Hardcoding to just grab australia for now.
	static async getHistoricArticlesForAllSources(fromDate, toDate)
	{
		let sources = await Source.getObjectsWhere("country = 'au' AND name NOT LIKE '%google%'");

		sources = sources.map(source => {return source.id});

		let now = new Date();
		if(!toDate)
		{
			toDate = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate();
		}
		if(!fromDate)
		{
			now.setMonth(now.getMonth() - 1);
      fromDate = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate();
		}

		let sourcesString = sources.join(',');



		for (let i = 1; i < 70; i++)
    {

      let articlesResponse = await NewsApiHelper.v2.everything({
        from: fromDate,
        to: toDate,
        //sources: sourcesString,
        pageSize: 100,
        language: 'en',
				page: i,
				q: searchKeyword
      });

      let articles = articlesResponse.articles.map(article => {
        article.source = article.source.id;
        return article;
      });
      //let articles = await NewsApiHelper.makeGetRequest({resource: 'articles', params: {source: source}, responseObject: 'articles'});
      articles = Article.createAndSaveObjects(articles);
    }
	}
}

export default NewsApiAdapter;
