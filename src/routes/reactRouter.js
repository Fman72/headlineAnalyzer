import React from "react";

import {BrowserRouter} from 'react-router-dom';

import {StaticRouter, Switch, Route} from 'react-router';

import AppRoot from "~/components/presentational/appRoot";
import AnalysisPage from "~/components/presentational/analysisPage";

let pageRoutes = () => {
  return (
    <AppRoot>
      <Route path="/analysis" component = {AnalysisPage}/>
    </AppRoot>
    );
};


let clientRouter = () => {
    return(
	    <BrowserRouter>
	        {pageRoutes()}
	    </BrowserRouter>
    );
}

let serverRouter = (context, location) => {
  return(
    <StaticRouter context = {context} location = {location}>
        {pageRoutes()}
    </StaticRouter>
  );
}

export {serverRouter, clientRouter};
