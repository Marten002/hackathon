import { all } from 'redux-saga/effects'

import { watchAuthAsync } from './auth'
import { watchUserAsync } from './user'

export default function* sagas() {
	yield all([
		watchAuthAsync(),
		watchUserAsync()
	])
}
