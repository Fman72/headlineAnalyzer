import React from 'react';

import {initialCapsString} from 'util.js';

import ControlledCheckBox from './ControlledCheckBox';

import {tryLoadCategories, tryLoadCountries} from '~/actions/filterActions';

class FilterCheckBox extends React.Component
{
  constructor(props){
    super(props)
  }

  hangleChange(event)
  {
    if(event.target.checked)
    {
      this.props.dispatch(addFilter(this.props.filterName, this.props.filter));
    }
    else
    {
      this.props.dispatch(removeFilter(this.props.filterName, this.props.filter));
    }
  }

  render()
  {
    return (
      <div>
        <span>
          {initialCapsString(this.props.filter)}
        </span>
        <ControlledCheckBox value = {this.props.filter} onChange = {this.handleChange} isChecked = {this.props.filters[this.props.filterName].indexOf(this.props.filter) > -1}/>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps)
{
  return {
    filters: state.filters
  };
}

export default connect(mapStateToProps)(FilterCheckBox);
