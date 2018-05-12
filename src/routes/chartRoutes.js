import {Router} from 'express';

import Source from '~/framework/sources/Source';
import DatedSource from '~/framework/datedsources/DatedSource';
import Article from '~/framework/articles/Article';
import {formatTimestampToDate} from "../util";


let chartRoutes = Router();

chartRoutes.get('/datedSources', (req, res) => {
  DatedSource.getGroupedBy(['date'], ['date', 'GROUP_CONCAT(source ORDER BY source DESC) as sources', 'GROUP_CONCAT(titleSentiment ORDER BY source DESC)  as titleSentiments', 'GROUP_CONCAT(descriptionSentiment ORDER BY source DESC) as descriptionSentiments'])
    .then(
      (results) => {
        results = results.map((currentValue) => {
          let sources = currentValue.sources.split(',');
          let titleSentiments = currentValue.titleSentiments.split(',');
          let lineObject = [];
          sources.forEach((source, index) => {
            lineObject[source + '-ts'] = titleSentiments[index];
          });
          return Object.assign({}, {date: new Date(currentValue.date).getTime()}, lineObject);
        });
        res.json(results);
      }, (error) => {
        console.warn(error.message);
      }
    );
});

chartRoutes.get('/datedSourcesByCategory', (req, res) => {
  DatedSource.getGroupedBy(
    ['date'],
    ['date', 'GROUP_CONCAT(source ORDER BY source DESC) as sources',
      'GROUP_CONCAT(titleSentiment ORDER BY source DESC)  as titleSentiments',
      'GROUP_CONCAT(descriptionSentiment ORDER BY source DESC) as descriptionSentiments',
      'GROUP_CONCAT(category ORDER BY source DESC) as categories',
    ],
    `category IS NOT NULL and date > ${formatTimestampToDate(Date.now() - 2594000000)}`)
    .then(
      (results) => {
        results = results.map((currentValue) => {
          let sources = currentValue.sources.split(',');
          let titleSentiments = currentValue.titleSentiments.split(',');
          let categories = currentValue.categories.split(',');
          let lineObject = [];
          sources.forEach((source, index) => {
            lineObject[`${source}:${categories[index]}-ts`] = titleSentiments[index];
          });
          return Object.assign({}, {
            date: new Date(currentValue.date).getTime()
          }, lineObject);
        });
        res.json(results);
      }, (error) => {
        console.warn(error.message);
      }
    );
});

chartRoutes.get('/sources', (req, res) => {
  Source.getObjectsWhere('country = \'nz\'')
    .then(
      (results) => {
        res.json(results);
      }, (reason) => {
        console.warn(reason);
      }
    );
});

chartRoutes.get('/categories', (req, res) => {
  Source.getCategories()
    .then(
      (results) => {
        res.json(results);
      }, (reason) => {
        console.warn(reason);
      }
    );
});

chartRoutes.get('/countries', (req, res) => {
  Source.getCountries()
    .then(
      (results) => {
        res.json(results);
      }, (reason) => {
        console.warn(reason);
      }
    );
});

chartRoutes.get('/articles', (req, res) => {

});

chartRoutes.get('/articlesForDot', (req, res) => {
  let date = req.query.date / 1000;
  let source = req.query.source.split(':')[0];
  let category = req.query.source.split(':')[1].slice(0, -3);

  Article.getObjectsWhere(`UNIX_TIMESTAMP(DATE(publishedAt))  = ${date} AND source = '${source}' AND category = '${category}'`).then(
    (articles) => res.json(articles),
    (reason) => console.warn(reason)
  );
});

export default chartRoutes;
