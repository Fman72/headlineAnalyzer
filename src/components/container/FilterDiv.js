import React from 'react';

import {connect} from 'react-redux';

import {tryLoadCountries} from '~/actions/countryActions';
import {tryLoadCategories} from '~/actions/categoryActions';

import FilterSelect from './FilterSelect';

class FilterDiv extends React.Component
{
  constructor(props)
  {
    super(props);
  }

  componentDidMount()
  {
    this.props.dispatch(tryLoadCountries());
    this.props.dispatch(tryLoadCategories());
  }

  render()
  {
    let sourceOptions = this.props.sources.sourceList.map((source) => {
      return {value: source.id, label: source.name}
    });

    return (
      <div id = 'filter-div-container'>
        <FilterSelect options = {this.props.countries} filterGroup = {"countries"}/>
        <FilterSelect options = {this.props.categories} filterGroup = {"categories"}/>
        <FilterSelect options = {sourceOptions} filterGroup = {"sources"}/>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps){
  return {
    countries: state.countries,
    categories: state.categories,
    sources: state.sources
  };
}

export default connect(mapStateToProps)(FilterDiv);
