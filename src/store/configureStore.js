import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import promiseMiddleware from 'redux-promise';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducers from '../reducers'

export default function configureStore() {
    return createStore(reducers, {}, composeWithDevTools(applyMiddleware(thunkMiddleware, promiseMiddleware)))
}