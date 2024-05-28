import { useMemo } from 'react'
import _ from 'lodash'

const useUsersNormalize = (data) => useMemo(() => {
	if (!_.isEmpty(data)) {
		return {
			female: _.get(data, 'female', 0),
			male: _.get(data, 'male', 0)
		}
	}

	return {}
}, [data])

export default useUsersNormalize
