import ApiHelper from '~/ApiHelper';

import Source from '~/framework/sources/Source';
import Article from '~/framework/articles/Article';

import {parseString} from 'xml2js';

import SourceAdapter from './SourceAdapter';

const AdapterApiHelper = new ApiHelper('http://rss.nzherald.co.nz/rss/xml/', {contentType: 'xml'});

const NZ_HERALD_FIELD_MAPPING = {
	publishedAt: 'pubDate',
	url: 'link'
};

let storedNzHeraldSource = null;

async function getOrCreateSource(){
	if(storedNzHeraldSource)
	{
		return storedNzHeraldSource;
	}
	let nzHeraldSource = await Source.getObjectWhere("name = 'New Zealand Herald'");
	if(nzHeraldSource)
	{
		storedNzHeraldSource = nzHeraldSource;
        return storedNzHeraldSource;
	}
	nzHeraldSource = new Source({id: 'nz-herald', name: "New Zealand Herald", description: "Latest breaking news articles, photos, video, blogs, reviews, analysis, opinion and reader comment from New Zealand and around the World.", country: "nz", category: "general"});
	nzHeraldSource.save();
	return nzHeraldSource;
};

class NzHeraldRssAdapter extends SourceAdapter
{

	constructor()
	{
		super();
	}



	static getSources(category, callback)
	{
		return;
	}

	static async getTopArticlesForSource(source, callback)
	{

	}

	static getSourceData()
	{
		return {
			id: 'nz-herald',
			name: "New Zealand Herald",
			description: "Latest breaking news articles, photos, video, blogs, reviews, analysis, opinion and reader comment from New Zealand and around the World.",
			country: "nz",
			category: "general"
		};
	}

	static async getTopArticlesForAllSources()
	{
        let source = await getOrCreateSource();
        let response = await AdapterApiHelper.makeGetRequest({resource: 'nzhrsscid_000000001.xml'});
        let responseBody = await response.text();
        let localMappings = NZ_HERALD_FIELD_MAPPING;
        parseString(responseBody, (error, result) => {
            if(!error)
            {
            	let tidiedArticles = result.rss.channel[0].item.map(tidyRssArticle);
                Article.createAndSaveObjects(tidiedArticles, source.id, localMappings);
            }
            else
            {
                console.log(error.message);
            }
        });
	}
}

export default NzHeraldRssAdapter;

