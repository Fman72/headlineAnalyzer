import React from 'react';
import {connect} from 'react-redux';

import {filterData} from '~/chartUtils';

class ChartFilterWrapper extends React.Component{
  constructor(props){
    super(props);
  }

  renderChildrenWithFilteredData(data){
    return React.Children.map(this.props.children, child => {
      return React.cloneElement(child, {data: data});
    });
  }

  render(){

    let data = filterData(this.props.dataSet, this.props.filterArrays, this.props.filterMappings);

    return (
      <div>
        {this.renderChildrenWithFilteredData(data)}
      </div>
    );
  }
}

function mapStateToProps(state, ownProps){
  return {
    filters: state.filters
  };
}

export default connect(mapStateToProps)(ChartFilterWrapper);
