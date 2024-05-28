import misc from '../../index'

export const apiPostAuthSendCode = async (data) => {
	const url = '/api/auth/send-code'
	const response = await misc.post(url, data)

	return response.data
}

export const apiPostAuthCheckCode = async (data) => {
	const url = '/api/auth/check-code'
	const response = await misc.post(url, data)

	return response.data
}
