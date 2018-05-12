export let filterData = (data, filterArrays, filterMappings) => {
  if ((data && filterArrays)) {
    let filteredData = data.map(item => Object.assign({}, item));
      Object.keys(filterArrays).forEach((currentFilter) => {
        filteredData = filteredData.filter((currentDataItem) => {
          if (!(filterArrays[currentFilter].indexOf(currentDataItem[filterMappings[currentFilter]]) > -1)) {
            return false;
          }
          return true;
        });
    });
    return filteredData;
  }
  return data;
};

export let getLineNamesFromFilters = (sources, categories) => {
  let lineNames = [];
  sources.forEach(source => {
    categories.forEach(category => {
      lineNames.push(`${source}:${category}-ts`);
    });
  });
  return lineNames;
};