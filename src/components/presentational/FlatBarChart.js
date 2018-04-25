import React from 'react';
import {BarChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';


let FlatBarChart = (props) => {
  return (
    <BarChart {...props} width={800} height={730} data={props.data} layout = {'vertical'}>
      <XAxis type = {'number'} name = {props.xAxisName}/>
      <YAxis dataKey = {props.columnNameProp} type = 'category' width = {100} name = {props.yAxisName}/>
      <CartesianGrid strokeDasharray="3 3" />
      <Tooltip />
      <Legend />
      {props.children}
    </BarChart>
  );
};

export default FlatBarChart;
