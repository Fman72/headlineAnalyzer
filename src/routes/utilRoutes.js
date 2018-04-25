import {updateDatabase, recalculateSourceSentiments} from '~/app/scheduledTasks';

import DatedSource from '~/framework/datedsources/DatedSource';

import newsApiMethods from '~/app/newsApiMethods';

import NewsApiAdapter from '~/framework/adapters/NewsApiAdapter';

import {Router} from 'express';

let utilRoutes = Router();

utilRoutes.get('/recalculateSourceSentiments', (req, res) => {
  recalculateSourceSentiments();
});

utilRoutes.get('/generateDatedSources', (req, res) => {
  DatedSource.generateDatedSources();
});

utilRoutes.get('/updateSources', (req, res) => {
  newsApiMethods.getSources();
})

utilRoutes.get('/getTopArticlesForAllSources', (req, res) => {
  newsApiMethods.getTopArticlesForAllSources();
});

utilRoutes.get('/updateDatabase', (req, res) => {
  updateDatabase();
});

utilRoutes.get('/getAllArticlesForAllSources', (req, res) => {
  NewsApiAdapter.getHistoricArticlesForAllSources();
});

export default utilRoutes;
