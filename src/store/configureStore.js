import {createStore, applyMiddleware} from 'redux';
import rootReducer from '~/store/reducers/index'
import thunk from 'redux-thunk';

//Function that creates the store
function configureStore(initialState){
  //Creates the store by using the rootReducer (a combination of all other reducers), the initial state (null) and the middleware I am using.
	return createStore(
		rootReducer, initialState, applyMiddleware(thunk)
	);
};

const store = configureStore();

export {store, configureStore};
