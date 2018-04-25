import Source from '~/framework/sources/Source';
import Article from '~/framework/articles/Article';

import {parseString} from 'xml2js';

import SourceAdapter from './SourceAdapter';

let storedSource;

class RssFeedAdapter extends SourceAdapter
{

    constructor(domain, apiHelperOptions, config)
    {
        super(domain, apiHelperOptions);
        this.config = config;
        this.storedSource = null;
    }

    async getOrCreateSource()
    {
        if(this.storedSource)
        {
            return this.storedSource;
        }
        this.storedSource = await Source.getObjectWhere(`name = '${this.config.sourceData.name}'`);
        if(this.storedSource)
        {
            return this.storedSource;
        }
        this.storedSource = new Source(this.config.sourceData);
        this.storedSource.save();
        return this.storedSource;
    }

    static getSourceData()
    {
        throw new Error("Base getSourceData() function called.");
    }

    static getSources(category, callback)
    {
        return;
    }

    static async getTopArticlesForSource(source, callback)
    {

    }

    tidyRssArticle()
    {
        return;
    }

    insertAdapterValuesFactory(resource, article)
    {
        let insertionFunction = (article) => {
            Object.keys(this.config.adapterArticleProperties).forEach((adapterProperty) => {
                article[adapterProperty] = this.config.adapterArticleProperties[adapterProperty];
            });
            Object.keys(resource.resourceArticleProperties).forEach((resourceProperty) => {
                article[resourceProperty] = resource.resourceArticleProperties[resourceProperty];
            });
            return article;
        };

        return insertionFunction;
    }

    async getTopArticlesForAllSources()
    {
        for (let i = 0; i < this.config.resources.length; i++)
        {
            let resourceObject = this.config.resources[i];
            let source = await this.getOrCreateSource();
            let response = await this.apiHelper.makeGetRequest({resource: resourceObject.url});
            let responseBody = await response.text();
            let self = this;
            parseString(responseBody, (error, result) => {
                if(!error)
                {
                    let tidiedArticles = result.rss.channel[0].item.map(this.config.tidyRssArticle);
                    let insertedArticles = tidiedArticles.map(this.insertAdapterValuesFactory(resourceObject));
                    return Article.createAndSaveObjects(insertedArticles, source.id, self.config.xmlMapping);
                }
                else
                {
                    console.log(error.message);
                }
            });
        }
    }
}

export default RssFeedAdapter;

