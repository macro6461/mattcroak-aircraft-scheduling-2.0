import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga';
import rootReducer from '../reducers/index'
import { composeWithDevTools } from 'redux-devtools-extension'
import { sagaInitiator } from './sagas';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(sagaMiddleware)));

sagaInitiator(sagaMiddleware);

export default store;