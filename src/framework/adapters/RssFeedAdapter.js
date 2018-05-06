import Source from '~/framework/sources/Source';
import Article from '~/framework/articles/Article';

import {parseString} from 'xml2js';

import SourceAdapter, {getOrCreateSource} from './SourceAdapter';
import StuffRssAdapter from "./StuffRssAdapter";
import ApiHelper from "../../ApiHelper";

let storedSource;

class RssFeedAdapter
{
    constructor(config)
    {
        if(config.rssArticleMappings){
          this.rssArticleMappings = config.rssArticleMappings;
        }
        else{
          this.rssArticleMappings = {
            publishedAt: 'pubDate',
            url: 'link'
          };
        }
        this.sourceObject = config.sourceObject;
        this.apiHelper = new ApiHelper(config.rssFeedEndpointBase, {contentType: 'xml'});
        if(config.tidyRssArticle){
          this.tidyRssArticle = config.tidyRssArticle;
        }
        else{
          this.tidyRssArticle = (article) => {
            let tidiedArticle = {};
            Object.keys(article).forEach((key) => {
              tidiedArticle[key] = article[key][0];
            });
            return tidiedArticle;
          };
        }
        this.storedSource = null;
    }

    async getOrCreateSource(sourceDefinition) {
      if (this.storedSource) {
        return storedSource;
      }
      let grabbedSource = await Source.getObjectWhere(`name = '${sourceDefinition.name}'`);
      if (grabbedSource) {
        storedSource = grabbedSource;
        return storedSource;
      }
      let newSource = new Source(sourceDefinition);
      newSource.save();
      return newSource;
    }

    async getArticles(resourceName, category=null){
      let source = await this.getOrCreateSource(this.sourceObject);
      let response = await this.apiHelper.makeGetRequest({resource: resourceName});
      let responseBody = await response.text();
      parseString(responseBody, (error, result) => {
        if (!error) {
          let tidiedArticles = result.rss.channel[0].item.map(this.tidyRssArticle);
          if(category){
            tidiedArticles = tidiedArticles.map((article) => {
              article.category = category;
              return article;
            });
          }
          Article.createAndSaveObjects(tidiedArticles, source.id, this.rssArticleMappings);
        }
        else {
          console.log(error.message);
        }
      });
    }
}

export default RssFeedAdapter;

