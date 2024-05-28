export const userActionTypes = {
	USER_REQUEST: 'USER_REQUEST',
	USER_RESPONSE_SUCCESS: 'USER_RESPONSE_SUCCESS',
	USER_RESPONSE_FAILURE: 'USER_RESPONSE_FAILURE'
}

const initialState = {
	userIsFetching: false,
	userSuccess: null,
	userFailure: null
}

export function user(state = initialState, action) {
	switch (action.type) {
		case userActionTypes.USER_REQUEST:
			return {
				...state,
				userIsFetching: true,
				userSuccess: null,
				userFailure: null
			}
		case userActionTypes.USER_RESPONSE_SUCCESS:
			return {
				...state,
				userIsFetching: false,
				userSuccess: action.data
			}
		case userActionTypes.USER_RESPONSE_FAILURE:
			return {
				...state,
				userIsFetching: false,
				userFailure: action.data
			}
		default:
			return state
	}
}
