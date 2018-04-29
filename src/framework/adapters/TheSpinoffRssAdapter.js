import ApiHelper from '~/ApiHelper';

import Article from '~/framework/articles/Article';

import {parseString} from 'xml2js';

import SourceAdapter, {getOrCreateSource} from './SourceAdapter';

const AdapterApiHelper = new ApiHelper('https://thespinoff.co.nz/', {contentType: 'xml'});

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
  author: 'dc:creator'
};

class TheSpinoffRssAdapter extends SourceAdapter {

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
      id: 'the-spinoff',
      name: "The Spinoff",
      description: "",
      country: "nz",
      category: "general"
    };
  }

  static async getTopArticlesForAllSources() {
    let source = await getOrCreateSource('The Spinoff', TheSpinoffRssAdapter.getSourceData());
    let response = await AdapterApiHelper.makeGetRequest({resource: 'feed'});
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

export default TheSpinoffRssAdapter;

