import { call, put, takeEvery } from 'redux-saga/effects'

import { apiPostLogIn, apiPostLogOut, apiPostSingUp } from '../../api/auth'

import { authActionTypes } from '../../redux/reducers/auth'

function* authWorker(action) {
	try {
		const data = yield call(apiPostLogIn, action.data)

		return yield put({
			type: authActionTypes.AUTH_RESPONSE_SUCCESS,
			data: data
		})
	} catch (error) {
		return yield put({
			type: authActionTypes.AUTH_RESPONSE_FAILURE,
			data: error.response.data
		})
	}
}

function* singUpWorker(action) {
	try {
		const data = yield call(apiPostSingUp, action.data)

		return yield put({
			type: authActionTypes.REGISTRATION_RESPONSE_SUCCESS,
			data: data
		})
	} catch (error) {
		return yield put({
			type: authActionTypes.REGISTRATION_RESPONSE_FAILURE,
			data: error.response.data
		})
	}
}

function* outWorker() {
	try {
		const data = yield call(apiPostLogOut)

		return yield put({
			type: authActionTypes.OUT_RESPONSE_SUCCESS,
			data: data
		})
	} catch (error) {
		return yield put({
			type: authActionTypes.OUT_RESPONSE_FAILURE,
			error: error.response.data
		})
	}
}

export function* watchAuthAsync() {
	yield takeEvery(authActionTypes.AUTH_REQUEST, authWorker)
	yield takeEvery(authActionTypes.OUT_REQUEST, outWorker)
	yield takeEvery(authActionTypes.REGISTRATION_REQUEST, singUpWorker)
}
