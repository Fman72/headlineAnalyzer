import React from 'react';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import FlatLineChart from './FlatLineChart';
import ChartFilterWrapper from '../container/ChartFilterWrapper';
import {formatTimestampToDate, beautifyString} from '~/util';
import {filterData} from '~/chartUtils';

let SourceTimeLineChart = (props) => {

  let lines = [];

  let colorArray = ['#FFE800', '#101D4C', '#700C0C', '#0A5A0A', '#70520C'];

  let graphColor = "#101D4C";

  if(props.filteredLineNames)
  {
    let maxLength = props.filteredLineNames.length < 5 ? props.filteredLineNames.length : 5;

    for(let i = 0; i < maxLength; i++)
    {
      lines.push(<Line stroke = {colorArray[i]} key = {props.filteredLineNames[i]} connectNulls = {true} dataKey = {props.filteredLineNames[i]} name = {props.filteredLineNames[i]} activeDot = {{onClick: props.handleDotClick}}/>);
    }
  }

  let lineArray = [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5];

  let currentDate = new Date().setHours(0,0,0,0);

  return (
      <FlatLineChart id = {'source-time-line-chart'} data = {[...props.datedSources, {refreshHack: Math.random}]}>
        <XAxis stroke = {graphColor} width = {10} type = {'number'} dataKey = {'date'} tickFormatter = {formatTimestampToDate} domain = {[currentDate - 2592000000, 'dataMax + 15920000']} allowDataOverflow = {true}/>
        <YAxis stroke = {graphColor} type = {'number'} domain = {[-5, 5]} ticks = {lineArray}/>
        <Tooltip stroke = {graphColor} labelFormatter = {formatTimestampToDate}/>
        {lines}
      </FlatLineChart>
  );
}

export default SourceTimeLineChart;