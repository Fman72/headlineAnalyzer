import React from 'react';
import {Row, Col} from 'react-bootstrap';

import ChartContentWrapper from '../container/ChartContentWrapper';
import FilterDiv from '../container/FilterDiv';
import FocusedArticleModal from "../container/FocusedArticleModal";

let AnalysisPage = (props) => {

  return (
    <div className = "content full-height">

        <div id = "title-div" className="col-md-12 yellow-text">TRACKRnz | Live Sentiment Analysis</div>

        <div id = "left-div" className = "col-md-3">
            <h3 className = "col-md-12 light-grey-text">Filters</h3>
            <FilterDiv/>
        </div>

        <div id = "right-div" className = "col-md-9">
            <ChartContentWrapper />
            <FocusedArticleModal/>
        </div>
    </div>
  );
}

export default AnalysisPage;
