import { userActionTypes } from '../../reducers/user'

export const getAsyncUser = (data) => {
	return {
		type: userActionTypes.USER_REQUEST,
		data: {
			uuid: data
		}
	}
}
