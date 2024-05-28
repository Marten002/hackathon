import misc from '../index'

export const apiGetUsersAll = async () => {
	const url = '/api/user/all'
	const response = await misc.get(url)

	return response.data
}

export const apiPostUserCreate = async (data) => {
	const url = '/api/user/create'
	const response = await misc.post(url, data)

	return response.data
}

export const apiPutUserChange = async (data) => {
	const url = '/api/user/change'
	const response = await misc.put(url, data)

	return response.data
}

export const apiDeleteUserDelete = async (data) => {
	const url = '/api/user/delete'
	const response = await misc.delete(url, {
		data: data
	})

	return response.data
}

export const apiDeleteUserDeleteMany = async (data) => {
	const url = '/api/user/delete-many'
	const response = await misc.delete(url, {
		data: data
	})

	return response.data
}

export const apiGetUser = async ({ uuid }) => {
	const url = `/api/user/${uuid}`
	const response = await misc.get(url)

	return response.data
}
