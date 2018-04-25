import React from 'react';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import FlatLineChart from './FlatLineChart';
import ChartFilterWrapper from '../container/ChartFilterWrapper';
import {formatTimestampToDate, beautifyString} from '~/util';
import {filterData} from '~/chartUtils';

let SourceTimeLineChart = (props) => {

  let lines = [];

  let colorArray = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#00FFFF'];

  let filteredSources = filterData(props.sources, props.filters, {countries: 'country', categories: 'category', sources: 'id'})

  if(filteredSources)
  {
    let maxLength = filteredSources.length < 5 ? filteredSources.length : 5;

    for(let i = 0; i < maxLength; i++)
    {
      lines.push(<Line stroke = {colorArray[i]} key = {filteredSources[i].id} connectNulls = {true} dataKey = {filteredSources[i].id + '-ts'} name = {filteredSources[i].name}/>);
    }
  }

  let lineArray = [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5];

  let currentDate = new Date().setHours(0,0,0,0);

  return (
    <div id = 'source-time-line-div'>
      <FlatLineChart width={'90%'} height={250} data = {[...props.datedSources, {refreshHack: Math.random}]}>
        <XAxis type = {'number'} dataKey = {'date'} tickFormatter = {formatTimestampToDate} domain = {[currentDate - 2592000000, currentDate]} allowDataOverflow = {true}/>
        <YAxis type = {'number'} domain = {[-5, 5]} ticks = {lineArray} interval = {0}/>
        <Tooltip labelFormatter = {formatTimestampToDate}/>
        {lines}
      </FlatLineChart>
    </div>
  );
}

export default SourceTimeLineChart;
