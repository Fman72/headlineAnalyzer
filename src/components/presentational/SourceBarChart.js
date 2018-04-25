import React from 'react';
import {Bar} from 'recharts';
import FlatBarChart from './FlatBarChart';
import ChartFilterWrapper from '../container/ChartFilterWrapper';
import {filterData} from '~/chartUtils';


let SourceBarChart = (props) =>{
  return (
    <div id = 'source-bar-div'>
      <FlatBarChart columnNameProp = {"name"} yAxisName = {'Sources'} xAxisName = {'Sentiment Score'} data = {filterData(props.sources, props.filters, {countries: 'country', categories: 'category'})}>
        <Bar dataKey = {"titleSentiment"} fill = {"#00FF00"} name = {'Title Sentiment'} legendType = {'diamond'}/>
        <Bar dataKey = {"descriptionSentiment"} fill = {"#FF0000"} name = {'Description Sentiment'} legendType = {'diamond'}/>
      </FlatBarChart>
    </div>
  );
}

export default SourceBarChart;
