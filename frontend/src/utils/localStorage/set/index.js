import _ from 'lodash'

export const set = ({ key, value, withEvent }) => {
	if (key) {
		if (_.isUndefined(value)) {
			window.localStorage.setItem(key, null)
		}

		if (withEvent) {
			const old = JSON.parse(window.localStorage.getItem(key))

			const event = new StorageEvent('storage', {
				isTrusted: true,
				bubbles: true,
				cancelable: false,
				key: key,
				oldValue: JSON.stringify(old),
				newValue: JSON.stringify(value)
			})

			window.dispatchEvent(event)
		}

		window.localStorage.setItem(key, JSON.stringify(value))
	}
}
