import ApiHelper from "~/ApiHelper";

class SourceAdapter
{

	constructor(domain, apiHelperOptions)
	{
		this.apiHelper = new ApiHelper(domain, apiHelperOptions);
	}

	getSources(category, callback)
	{
		console.log('getSources base method called.');
	}

	getTopArticlesForSource(source, callback)
	{
		console.log('getArticles base method called.');
	}

	getTopArticlesForAllSources()
	{
		console.log('getArticlesFromAllSources base method called.');
	}
}

export default SourceAdapter;
