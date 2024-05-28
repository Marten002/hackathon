import createSagaMiddleware from 'redux-saga'

import { applyMiddleware, compose, createStore } from 'redux'

import sagas from '../saga/index'

import reducers from './reducers'

const sagaMiddleware = createSagaMiddleware()

const composeEnhancer = compose

const store = createStore(
	reducers,
	composeEnhancer(
		applyMiddleware(
			sagaMiddleware
		)
	)
)

sagaMiddleware.run(sagas)

export default store
