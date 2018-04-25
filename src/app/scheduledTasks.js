import databaseHelper from './databaseHelper';
import Source from '~/framework/sources/Source';
import DatedSource from '~/framework/datedsources/DatedSource';
import NewsApiAdapter from '~/framework/adapters/NewsApiAdapter';
import {formatTimestampToDate} from '~/util';

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

let startArticleGrabbing = () => {
  updateDatabase();
  setInterval(startArticleGrabbing, 86400000);
}

let updateDatabase = () => {
  NewsApiAdapter.getSources(null, (arg) => {console.log(`Grabbed new sources.`);});
  setTimeout(NewsApiAdapter.getTopArticlesForAllSources.bind(NewsApiAdapter), 10000);
  setTimeout(DatedSource.generateDatedSources.bind(DatedSource), 20000, (Date.now() - 604800000) / 1000);
  console.log(`Grabbed new articles at ${formatTimestampToDate(Date.now())}`);
}


export {startArticleGrabbing, recalculateSourceSentiments, updateDatabase};
