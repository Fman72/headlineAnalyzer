import ApiHelper from '~/ApiHelper';

import Article from '~/framework/articles/Article';

import {parseString} from 'xml2js';

import SourceAdapter, {getOrCreateSource} from './SourceAdapter';

const AdapterApiHelper = new ApiHelper('https://stuff.co.nz/', {contentType: 'xml'});

let tidyRssArticle = (article) => {
  let tidiedArticle = {};
  Object.keys(article).forEach((key) => {
    tidiedArticle[key] = article[key][0];
  });
  return tidiedArticle;
}

const FIELD_MAPPING = {
  publishedAt: 'pubDate',
  url: 'link'
};

class StuffRssAdapter extends SourceAdapter {

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
      id: 'stuff',
      name: "Stuff",
      description: "Top Stories from Stuff.co.nz. New Zealand, world, sport, business &amp; entertainment news on Stuff.co.nz.",
      country: "nz",
      category: "general"
    };
  }

  static getApiHelper()
  {
    const AdapterApiHelper = new ApiHelper('https://stuff.co.nz/', {contentType: 'xml'});
  }

  static async getTopArticlesForAllSources() {

    this.getTopArticlesForSource(StuffRssAdapter.getSourceData(), 'rss', FIELD_MAPPING);

    let source = await getOrCreateSource('Stuff', StuffRssAdapter.getSourceData());
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

export default StuffRssAdapter;

