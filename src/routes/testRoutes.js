import {Router} from 'express';

import RssFeedAdapter from '~/framework/adapters/RssFeedAdapter';

let testRoutes = Router();

let nzHeraldRssFeedAdapterConfig = {
    resources: [
        {url: 'nzhtsrsscid_000000698.xml', name: 'Top Stories', resourceArticleProperties: {category: 'general'}},
        {url: 'nzhrsscid_000000001.xml', name: 'NZ News', resourceArticleProperties: {category: 'general'}},
        {url: 'nzhrsscid_000000003.xml', name: 'Business', resourceArticleProperties: {category: 'business'}},
        {url: 'nzhrsscid_000000080.xml', name: 'Rugby', resourceArticleProperties: {category: 'sport'}},
        {url: 'nzhrsscid_001501119.xml', name: 'Entertainment', resourceArticleProperties: {category: 'entertainment'}},
        {url: 'nzhrsscid_000000002.xml', name: 'World', resourceArticleProperties: {category: 'general'}},
        {url: 'nzhrsscid_000000005.xml', name: 'Technology', resourceArticleProperties: {category: 'technology'}},
        {
            url: 'nzhrsscid_000000006.xml',
            name: 'Lifestyle',
            resourceArticleProperties: {category: 'science-and-nature'}
        },
        {url: 'nzhrsscid_000000004.xml', name: 'Sport', resourceArticleProperties: {category: 'sport'}}
    ],
    xmlMapping: {
        publishedAt: 'pubdate',
        url: 'link'
    },
    adapterArticleProperties: {
        country: 'New Zealand'
    },
    sourceData: {
        name: "New Zealand Herald"
    },
    tidyRssArticle(article)
    {
        let tidiedArticle = {};
        Object.keys(article).forEach((key) => {
            tidiedArticle[key] = article[key][0];
        });
        return tidiedArticle;
    }
};


testRoutes.get('/nzRssFeed', (req, res) => {
    let NzHeraldRssAdapter = new RssFeedAdapter('http://rss.nzherald.co.nz/rss/xml/', {contentType: 'xml'}, nzHeraldRssFeedAdapterConfig);
    NzHeraldRssAdapter.getTopArticlesForAllSources();
});

export default testRoutes;
