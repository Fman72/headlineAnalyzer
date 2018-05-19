import React from 'react';
import {connect} from 'react-redux';

import {initialCapsString} from '~/util';

import {setFilters} from '~/actions/filterActions';

import ControlledSelect from '../presentational/ControlledSelect';

class FilterSelect extends React.Component{

  constructor(props){
    super(props)
    this.handleChange = this.handleChange.bind(this);
    this.state = {value: props.value};
  }

  handleChange(value)
  {
    if(value)
    {
      let valuesArray = value.map((currentValue) => {
        return currentValue.value;
      });
      this.props.dispatch(setFilters(this.props.filterGroup, valuesArray));
    }
  }

  render(){
    return (
      <div className = 'filter-select col-md-12'>
        <span>{initialCapsString(this.props.filterGroup)}</span>
        <ControlledSelect className = "styled-select" multi = {true} value = {this.props.value} options = {this.props.options} onChange = {this.handleChange}/>
      </div>
    );
  }
}

export default connect(null)(FilterSelect);
