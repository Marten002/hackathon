import { useMemo } from 'react'
import _ from 'lodash'
import moment from 'moment'

const useUsersNormalize = (data) => useMemo(() => {
	if (!_.isEmpty(data)) {
		return data.reduce((acc, item) => {
			return [
				...acc,
				{
					...item,
					createdAt: moment(_.get(item, 'createdAt', '')).format('LL, HH:mm:ss'),
					updatedAt: moment(_.get(item, 'updatedAt', '')).format('LL, HH:mm:ss'),
					isTwoFactorAuth: _.get(item, 'isTwoFactorAuth', false) === true ? 'Да' : 'Нет'
				}
			]
		}, [])
	}

	return []
}, [data])

export default useUsersNormalize
