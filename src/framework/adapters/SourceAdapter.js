import ApiHelper from "~/ApiHelper";
import Source from "../sources/Source";

let storedSource;

async function getOrCreateSource(sourceName, sourceDefinition) {
  if (storedSource && storedSource.name == sourceName) {
    return storedSource;
  }
  let grabbedSource = await Source.getObjectWhere(`name = '${sourceName}'`);
  if (grabbedSource) {
    storedSource = grabbedSource;
    return storedSource;
  }
  let newSource = new Source(sourceDefinition);
  newSource.save();
  return newSource;
};

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
export {getOrCreateSource};
