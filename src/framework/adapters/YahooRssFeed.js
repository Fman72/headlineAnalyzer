import ApiHelper from '~/ApiHelper';

import Article from '~/framework/articles/Article';

import {parseString} from 'xml2js';

import SourceAdapter, {getOrCreateSource} from './SourceAdapter';

const AdapterApiHelper = new ApiHelper('https://nz.news.yahoo.com/', {contentType: 'xml'});

let tidyRssArticle = (article) => {
  let tidiedArticle = {};
  Object.keys(article).forEach((key) => {
    tidiedArticle[key] = article[key][0];
  });
  return tidiedArticle;
}

const FIELD_MAPPING = {
  publishedAt: 'pubDate',
  url: 'link',
};

class YahooRssFeed extends SourceAdapter {

  constructor(config) {
    super();
  }


  static getSources(category, callback) {
    return;
  }

  static async getTopArticlesForSource(source, callback) {

  }

  static getSourceData() {
    return {
      id: 'yahoo',
      name: "Yahoo",
      description: "",
      country: "nz",
      category: "general"
    };
  }

  static async getTopArticlesForAllSources() {
    let source = await getOrCreateSource('Yahoo', YahooRssFeed.getSourceData());
    let response = await AdapterApiHelper.makeGetRequest({resource: 'rss'});
    let responseBody = await response.text();
    parseString(responseBody, (error, result) => {
      if (!error) {
        let tidiedArticles = result.rss.channel[0].item.map(tidyRssArticle);
        Article.createAndSaveObjects(tidiedArticles, source.id, FIELD_MAPPING);
      }
      else {
        console.log(error.message);
      }
    });
  }
}

export default YahooRssFeed;

