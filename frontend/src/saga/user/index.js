import { call, put, takeEvery } from 'redux-saga/effects'

import { apiGetUser } from '../../api/users'

import { userActionTypes } from '../../redux/reducers/user'

function* userWorker(action) {
	try {
		const data = yield call(apiGetUser, action.data)

		return yield put({
			type: userActionTypes.USER_RESPONSE_SUCCESS,
			data: data
		})
	} catch (error) {
		return yield put({
			type: userActionTypes.USER_RESPONSE_FAILURE,
			data: error.response.data
		})
	}
}

export function* watchUserAsync() {
	yield takeEvery(userActionTypes.USER_REQUEST, userWorker)
}
