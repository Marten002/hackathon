export const remove = ({ key, withEvent }) => {
	if (key) {
		if (withEvent) {
			const old = JSON.parse(window.localStorage.getItem(key))

			window.localStorage.removeItem(key)

			const event = new StorageEvent('storage', {
				isTrusted: true,
				bubbles: true,
				cancelable: false,
				key: key,
				oldValue: JSON.stringify(old),
				newValue: JSON.stringify(null)
			})

			window.dispatchEvent(event)
		} else {
			window.localStorage.removeItem(key)
		}
	}
}
