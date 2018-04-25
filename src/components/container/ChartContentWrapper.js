import React from 'react';
import {connect} from 'react-redux';

import {tryLoadSources, tryLoadDatedSources} from '~/actions/sourceActions';
import {tryLoadCategories} from '~/actions/categoryActions';
import {tryLoadCountries} from '~/actions/countryActions';


import SourceBarChart from '../presentational/SourceBarChart';
import SourceTimeLineChart from '../presentational/SourceTimeLineChart';

import {getSourcesByTime} from '~/chartRouteRequests';
import {tryRequestFocusedArticles} from "../../actions/articleActions";
import {showFocusedArticlesModal} from "../../actions/modalActions";

class ChartContentWrapper extends React.Component{
  constructor(props){
    super(props);
    this.handleDotClick = this.handleDotClick.bind(this);
  }

  componentDidMount(){
    this.props.dispatch(tryLoadSources());
    this.props.dispatch(tryLoadDatedSources());
  }

  handleDotClick(event)
  {
    console.log(event);
    this.props.dispatch(tryRequestFocusedArticles(event.payload.date, event.dataKey));
    this.props.dispatch(showFocusedArticlesModal());
  }

  render(){
    return (
      <div>
        <SourceTimeLineChart handleDotClick = {this.handleDotClick} sources = {this.props.sources.sourceList} datedSources = {this.props.sources.datedSourceList} filters = {this.props.filters}/>
      </div>
    );
  }
}
//        <SourceBarChart sources = {this.props.sources.sourceList} filters = {this.props.filters}/>

function mapStateToProps(state, ownProps){
  return {
    sources: state.sources,
    articles: state.articles,
    filters: state.filters
  };
}

export default connect(mapStateToProps)(ChartContentWrapper);
