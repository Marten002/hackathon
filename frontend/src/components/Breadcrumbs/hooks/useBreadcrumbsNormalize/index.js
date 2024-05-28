import { useMemo } from 'react'
import _ from 'lodash'
import { useLocation, useNavigate } from 'react-router-dom'

import { Routs } from '../../../../routs'

import { COLOR_PRIMARY } from '../../../../constants/colors'

const useBreadcrumbsNormalize = (breadcrumbs) => {
	const navigate = useNavigate()
	const { pathname } = useLocation()

	return useMemo(() => {
		if (!_.isEmpty(breadcrumbs)) {
			return breadcrumbs.reduce((acc, item) => {
				if (_.get(item, 'href', Routs.index) === pathname) {
					_.set(item, 'color', COLOR_PRIMARY)
				}

				return [...acc, {
					...item,
					text: _.get(item, 'text', ''),
					href: _.get(item, 'href', ''),
					onClick: (event) => {
						event.preventDefault()
						navigate(_.get(item, 'href', Routs.index))
					}
				}]
			}, [])
		}

		return []
	}, [breadcrumbs])
}

export default useBreadcrumbsNormalize
