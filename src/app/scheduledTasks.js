import databaseHelper from './databaseHelper';
import Source from '~/framework/sources/Source';
import DatedSource from '~/framework/datedsources/DatedSource';
import NewsApiAdapter from '~/framework/adapters/NewsApiAdapter';
import {formatTimestampToDate} from '~/util';
import NzHeraldRssAdapter from "../framework/adapters/NzHeraldRssAdapter";
import TheSpinoffRssAdapter from "../framework/adapters/TheSpinoffRssAdapter";
import StuffRssAdapter from "../framework/adapters/StuffRssAdapter";
import RadioNzRssAdapter from "../framework/adapters/RadioNzRssAdapter";
import YahooRssFeed from "../framework/adapters/YahooRssFeed";
import TheStandardRssAdapter from "../framework/adapters/TheStandardRssAdapter";
import TheGuardianRssAdapter from "../framework/adapters/TheGuardianRssAdapter";
import RssFeedAdapter from "../framework/adapters/RssFeedAdapter";
import {
  nzHeraldRssAdapter, radioNzRssAdapter, theGuardianRssAdapter, theSpinoffRssAdapter,
  theStandardRssAdapter, yahooRssAdapter
} from "../framework/adapters/AdapterList";

let recalculateSourceSentiments = (callback) => {
  databaseHelper.tryQuery(`SELECT AVG(titleSentiment) as titleSentiment, AVG(descriptionSentiment) as descriptionSentiment, source FROM article GROUP BY source;`, null)
  .then(
    (results) => {
      results.forEach((currentValue) => {
        Source.getObjectWhere(`id = '${currentValue.source}'`).then(
          (source) => {
            source.titleSentiment = currentValue.titleSentiment;
            source.descriptionSentiment = currentValue.descriptionSentiment;
            source.save();
          }
        );
    });
    if(callback){
      callback(results);
    }
  },
  (error) => {
    console.log(error.message);
  });
};

async function updateDatabase(){
  //NewsApiAdapter.getSources(null, (arg) => {console.log(`Grabbed new sources.`);});
  //setTimeout(NewsApiAdapter.getTopArticlesForAllSources.bind(NewsApiAdapter), 10000);
  await nzHeraldRssAdapter.getArticlesForAllCategories();
  await theSpinoffRssAdapter.getArticlesForAllCategories();
  await radioNzRssAdapter.getArticlesForAllCategories();
  await theStandardRssAdapter.getArticlesForAllCategories();
  await yahooRssAdapter.getArticles('rss');
  await theGuardianRssAdapter.getArticles('world/newzealand/rss');
  const boundGenerateDatedSources = DatedSource.generateDatedSources.bind(DatedSource);
  await (boundGenerateDatedSources(20000, (Date.now() - 604800000) / 1000));
  console.log(`Grabbed new articles at ${formatTimestampToDate(Date.now())}`);
}

let startArticleGrabbing = () => {
  updateDatabase();
  setInterval(updateDatabase, 86400000);
}

export {startArticleGrabbing, recalculateSourceSentiments, updateDatabase};
