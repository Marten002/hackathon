import _ from 'lodash'

export const get = (key, initialValue) => {
	const data = JSON.parse(window.localStorage.getItem(key))

	if (_.isNil(data)) {
		if (_.isUndefined(initialValue)) {
			window.localStorage.setItem(key, null)

			return null
		}

		window.localStorage.setItem(key, JSON.stringify(initialValue))

		return initialValue
	}

	return data
}
