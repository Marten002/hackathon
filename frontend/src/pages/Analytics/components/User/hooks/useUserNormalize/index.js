import { useMemo } from 'react'
import _ from 'lodash'

const useUserNormalize = (data) => useMemo(() => {
	if (!_.isEmpty(data)) {
		return {
			username: _.get(data, 'username', ''),
			likes: _.get(data, 'TEMP_DATA', 9),
			comments: _.get(data, 'TEMP_DATA', 7)
		}
	}

	return {}
}, [data])

export default useUserNormalize
