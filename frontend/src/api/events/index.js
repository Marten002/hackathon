import misc from '../index'

export const apiGetAllEvents = async () => {
    const url = '/api/event/all'
    const response = await misc.get(url)

    return response.data
}

export const apiGetEvent = async ({ query }) => {
    const { id } = query
    const url = `/api/event/${id}`
    const response = await misc.get(url)

    return response.data
}

export const apiPostEventCreate = async ({ payload }) => {
    const url = '/api/event/create'
    const response = await misc.post(url, payload)

    return response.data
}

export const apiPutEventChange = async ({ payload }) => {
    const url = '/api/event/change'
    const response = await misc.put(url, payload)

    return response.data
}

export const apiPostEventJoin = async ({ payload }) => {
    const url = '/api/event/join'
    const response = await misc.post(url, payload)

    return response.data
}

export const apiPostExitJoin = async ({ payload }) => {
    const url = '/api/event/exit'
    const response = await misc.post(url, payload)

    return response.data
}

export const apiPostEventLike = async ({ payload }) => {
    const url = '/api/event/like'
    const response = await misc.post(url, payload)

    return response.data
}

export const apiPostEventJoinManyParticipants = async ({ payload }) => {
    const url = '/api/event/join-many'
    const response = await misc.post(url, payload)

    return response.data
}

export const apiPostEventComment = async ({ payload }) => {
    const url = '/api/event/comment/create'
    const response = await misc.post(url, payload)

    return response.data
}

export const apiDeleteEventComment = async ({ payload }) => {
    const url = '/api/event/comment/delete'
    const response = await misc.delete(url, { data: payload })

    return response.data
}