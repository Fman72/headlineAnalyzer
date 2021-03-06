import ApiHelper from '~/ApiHelper';

let chartRoutesHelper = new ApiHelper(`http://139.99.193.82:3000/chart`, {contentType: 'json'});

async function getAllSources()
{
  return await chartRoutesHelper.makeGetRequest({resource: '/sources'});
}

async function getCountries()
{
  return await chartRoutesHelper.makeGetRequest({resource: '/countries'});
}

async function getCategories()
{
  return await chartRoutesHelper.makeGetRequest({resource: '/categories'});
}

async function getDatedSources()
{
  return await chartRoutesHelper.makeGetRequest({resource: '/datedSources'});
}

async function getArticlesForDot(date, source)
{
  return await chartRoutesHelper.makeGetRequest({resource: `/articlesForDot?date=${date}&source=${source}`});
}

export {getAllSources, getCountries, getCategories, getDatedSources, getArticlesForDot};
