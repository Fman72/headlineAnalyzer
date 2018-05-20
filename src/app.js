import express from 'express';
import bodyParser from 'body-parser';

import testRoutes from '~/routes/testRoutes';
import pageRoutes from '~/routes/pageRoutes';
import chartRoutes from '~/routes/chartRoutes';
import utilRoutes from '~/routes/utilRoutes';

import {startArticleGrabbing} from '~/app/scheduledTasks';

import {port} from './sensitiveStuff';

const BASE_ROUTE = '/trackr';

let app = express();

Error.stackTraceLimit = 50;

app.use(BASE_ROUTE, bodyParser.json());

//Scheduled Tasks
app.use(BASE_ROUTE + '/util', utilRoutes);

app.use(BASE_ROUTE, pageRoutes);

app.use(BASE_ROUTE + '/test', testRoutes);

app.use(BASE_ROUTE + '/chart', chartRoutes);

app.use(BASE_ROUTE, express.static('public'));

app.listen(port, null, () => {
  console.log("Up and running fam.");
});

process.on('unhandledRejection', (reason, p) => {
    console.error('Unhandled Rejection at: Promise', p, 'reason:', reason);
    // application specific logging, throwing an error, or other logic here
});

startArticleGrabbing();
