import { Navigate } from 'react-router-dom'
import React, { memo, useState } from 'react'
import _ from 'lodash'

import { decodeJWT } from '../../utils/jwt'
import { Routs } from '../../routs'
import { useLocalStorageEffect } from '../../hooks/useLocalStorageEffect'

const PrivateRoute = ({ acceptForAuthorized, acceptForRoles = [], next, children }) => {
	const [token, setToken] = useState(decodeJWT())

	useLocalStorageEffect(() => {
		setToken(decodeJWT())
	}, ['token'])

	if (acceptForAuthorized && (_.isNil(token) || _.isEmpty(token))) {
		if (next) {
			return <Navigate to={`${Routs.auth.authorization.index}?next=${next}`}/>
		}

		return <Navigate to={Routs.auth.authorization.index}/>
	}

	if (_.includes(acceptForRoles, 'all')) {
		return children
	}

	if (_.includes(acceptForRoles, _.get(token, 'role', ''))) {
		return children
	}

	return <Navigate to={Routs.forbidden.index}/>
}

export default memo(PrivateRoute)
