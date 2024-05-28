export const authActionTypes = {
	AUTH_REQUEST: 'AUTH_REQUEST',
	AUTH_RESPONSE_SUCCESS: 'AUTH_RESPONSE_SUCCESS',
	AUTH_RESPONSE_FAILURE: 'AUTH_RESPONSE_FAILURE',

	REGISTRATION_REQUEST: 'REGISTRATION_REQUEST',
	REGISTRATION_RESPONSE_SUCCESS: 'REGISTRATION_RESPONSE_SUCCESS',
	REGISTRATION_RESPONSE_FAILURE: 'REGISTRATION_RESPONSE_FAILURE',

	AUTH_TOKEN: 'AUTH_TOKEN',

	OUT_REQUEST: 'OUT_REQUEST',
	OUT_RESPONSE_SUCCESS: 'OUT_RESPONSE_SUCCESS',
	OUT_RESPONSE_FAILURE: 'OUT_RESPONSE_FAILURE',

	AUTH_INITIAL: 'AUTH_INITIAL'
}

const initialState = {
	authIsFetching: false,
	authSuccess: null,
	authFailure: null,

	registrationIsFetching: false,
	registrationSuccess: null,
	registrationFailure: null,

	authIsExpired: false,

	outIsFetching: false,
	outSuccess: null,
	outFailure: null
}

export function auth(state = initialState, action) {
	switch (action.type) {
		case authActionTypes.AUTH_REQUEST:
			return {
				...state,
				authIsFetching: true,
				authSuccess: null,
				authFailure: null
			}
		case authActionTypes.AUTH_RESPONSE_SUCCESS:
			return {
				...state,
				authIsFetching: false,
				authSuccess: action.data
			}
		case authActionTypes.AUTH_RESPONSE_FAILURE:
			return {
				...state,
				authIsFetching: false,
				authFailure: action.data
			}
		case authActionTypes.REGISTRATION_REQUEST:
			return {
				...state,
				registrationIsFetching: true,
				registrationSuccess: null,
				registrationFailure: null
			}
		case authActionTypes.REGISTRATION_RESPONSE_SUCCESS:
			return {
				...state,
				registrationIsFetching: false,
				registrationSuccess: action.data
			}
		case authActionTypes.REGISTRATION_RESPONSE_FAILURE:
			return {
				...state,
				registrationIsFetching: false,
				registrationFailure: action.data
			}
		case authActionTypes.AUTH_TOKEN:
			return {
				...state,
				authIsExpired: true
			}
		case authActionTypes.OUT_REQUEST:
			return {
				...state,
				outIsFetching: true,
				outSuccess: null,
				outFailure: null
			}
		case authActionTypes.OUT_RESPONSE_SUCCESS:
			return {
				...state,
				outIsFetching: false,
				outSuccess: action.data
			}
		case authActionTypes.OUT_RESPONSE_FAILURE:
			return {
				...state,
				outIsFetching: false,
				outFailure: action.data
			}
		case authActionTypes.AUTH_INITIAL:
			return {
				...initialState
			}
		default:
			return state
	}
}
