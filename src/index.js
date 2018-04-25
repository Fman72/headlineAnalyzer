import React from "react";
import ReactDOM from "react-dom";
import {clientRouter} from "~/routes/reactRouter";
import {configureStore} from "./store/configureStore";
import {Provider} from "react-redux";

const initialStore = window.__INITIAL_STORE__;

const store = configureStore(initialStore);

ReactDOM.render(<Provider store = {store}>{clientRouter()}</Provider>, document.getElementById('content'));
