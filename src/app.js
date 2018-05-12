import express from 'express';
import bodyParser from 'body-parser';

import testRoutes from '~/routes/testRoutes';
import pageRoutes from '~/routes/pageRoutes';
import chartRoutes from '~/routes/chartRoutes';
import utilRoutes from '~/routes/utilRoutes';

import {startArticleGrabbing} from '~/app/scheduledTasks';

import {port} from './sensitiveStuff';

let app = express();

Error.stackTraceLimit = 50;

app.use(bodyParser.json());

//Scheduled Tasks
app.use('/util', utilRoutes);

app.use(pageRoutes);

app.use('/test', testRoutes);

app.use('/chart', chartRoutes);

app.use(express.static('public'));

app.listen(port, null, () => {
  console.log("Up and running fam.");
});

process.on('unhandledRejection', (reason, p) => {
    console.error('Unhandled Rejection at: Promise', p, 'reason:', reason);
    // application specific logging, throwing an error, or other logic here
});

startArticleGrabbing();
