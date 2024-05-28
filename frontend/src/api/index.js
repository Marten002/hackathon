import axios from 'axios'
import _ from 'lodash'

import store from '../redux'

import { getAsyncToken } from '../redux/actions/auth'
import { get } from '../utils/localStorage'

const BASE_URL = 'http://localhost:3000/'

const client = axios.create({
	BASE_URL: BASE_URL,
	withCredentials: true
})

client.interceptors.request.use((config) => {
	const token = get('token')

	if (token) {
		_.set(config, 'headers.Authorization', `Bearer ${token}`)
	}

	return config
})

client.interceptors.response.use((response) => response, (error) => {
	if (_.toInteger(_.get(error, 'response.data.statusCode', null)) === 401) {
		store.dispatch(getAsyncToken())
	}

	return Promise.reject(error)
})

export default client
