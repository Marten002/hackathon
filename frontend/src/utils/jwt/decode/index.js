import { jwtDecode } from 'jwt-decode'

import { get } from '../../localStorage'

export const decodeJWT = () => {
	const token = get('token')

	if (token) {
		const decode = jwtDecode(token)

		if (decode === 'null') {
			return null
		}

		return decode
	}

	return null
}
