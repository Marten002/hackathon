import misc from '../index'

export const apiGetMonitoringUsersByGender = async () => {
	const url = '/api/monitoring/users-by-gender'
	const response = await misc.get(url)

	return response.data
}

export const apiGetMonitoringEventsByTags = async () => {
	const url = '/api/monitoring/events-by-tags'
	const response = await misc.get(url)

	return response.data
}

export const apiGetMonitoringFinishedEvents = async () => {
	const url = '/api/monitoring/finished-events'
	const response = await misc.get(url)

	return response.data
}

export const apiGetMonitoringParticipantsInEvents = async () => {
	const url = '/api/monitoring/participants-in-events'
	const response = await misc.get(url)

	return response.data
}

export const apiGetMonitoringFavoriteEvents = async () => {
	const url = '/api/monitoring/favorite-events'
	const response = await misc.get(url)

	return response.data
}

export const apiGetMonitoringFavoriteUser = async () => {
	const url = '/api/monitoring/favorite-user'
	const response = await misc.get(url)

	return response.data
}
