import React from "react";
import {Grid} from 'react-bootstrap';

//App container object.
function AppRoot(props){
    return (
        <Grid fluid className="full-height">
          {props.children}
          <script src = 'trackr/bundle.js'></script>
        </Grid>
    );
};

export default AppRoot;
