import misc from '../index'

export const apiPostChangePassword = async (data) => {
	const url = '/api/settings/change-password'
	const response = await misc.post(url, data)

	return response.data
}

export const apiPostSettingsChangeName = async (data) => {
	const url = '/api/settings/change-name'
	const response = await misc.post(url, data)

	return response.data
}
