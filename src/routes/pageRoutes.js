
import React from 'react';
import ReactDOMServer from "react-dom/server";

import {Router} from "express";
import {serverRouter} from "./reactRouter";

import htmlBodyString from '~/htmlBodyString';

import Helmet from 'react-helmet';

import {Provider} from 'react-redux';
import {store} from '~/store/configureStore';

let head = Helmet.rewind();

let pageRoutes = Router();

const context = {};

pageRoutes.get("/analysis", (req, res) => {

    //Head customization for this route.
    head.title = "News Sentiment";

    const content = ReactDOMServer.renderToString(
      <Provider store = {store}>
        {serverRouter(context, req.url)}
      </Provider>);

    if(context.url){
        console.log(context.url);
    }
    else{
        res.send(htmlBodyString(head, content, store));
    }

});

export default pageRoutes;
