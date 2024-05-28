import { authActionTypes } from '../../reducers/auth'

export const postAsyncSignIn = (data) => {
	return {
		type: authActionTypes.AUTH_REQUEST,
		data
	}
}

export const postAsyncSignUp = (data) => {
	return {
		type: authActionTypes.REGISTRATION_REQUEST,
		data
	}
}

export const getAsyncToken = () => {
	return {
		type: authActionTypes.AUTH_TOKEN
	}
}

export const postAsyncSignOut = () => {
	return {
		type: authActionTypes.OUT_REQUEST
	}
}

export const setSignInInitial = () => {
	return {
		type: authActionTypes.AUTH_INITIAL
	}
}
