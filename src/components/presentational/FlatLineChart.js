import React from 'react';
import {LineChart, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';

class FlatLineChart extends React.Component{

  constructor(props){
    super(props);
  }

  render() {
    return (
      <ResponsiveContainer width = {"95%"} aspect = {2}>
        <LineChart margin = {{top: 20, bottom: 20}} data={this.props.data}>
          <CartesianGrid fill = "white"/>
          <Legend />
          {this.props.children}
        </LineChart>
      </ResponsiveContainer>
    );
  }
}

export default FlatLineChart;
