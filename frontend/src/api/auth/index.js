import misc from '../index'

export const apiPostLogIn = async (data) => {
	const url = '/api/auth/sign-in'
	const response = await misc.post(url, data)

	return response.data
}

export const apiPostLogOut = async (data) => {
	const url = '/api/users/authenticate'
	const response = await misc.post(url, data)

	return response.data
}

export const apiPostSingUp = async (data) => {
	const url = '/api/auth/sign-up'
	const response = await misc.post(url, data)

	return response.data
}

export const apiPostSingIn = async (data) => {
	const url = '/api/auth/sign-in'
	const response = await misc.post(url, data)

	return response.data
}
