import { useQuery as useQueryHook } from '@tanstack/react-query'
import _ from 'lodash'

export const useQuery = ({ key, params = {}, callback, options = {}, config = {} }) => {
	const {
		isLoading,
		data,
		refetch,
		error,
		remove
	} = useQueryHook([key, params], () => callback(params, config), {
		refetchInterval: 30 * 1000,
		refetchIntervalInBackground: false,
		refetchOnMount: 'always',
		...options
	})

	if (error) {
		return {
			isLoading: isLoading,
			error: {
				type: 'automatically',
				error: _.get(error, 'response.data.error', ''),
				message: _.get(error, 'response.data.message', ''),
				refetch: refetch,
				remove: remove
			}
		}
	}

	return {
		isLoading: isLoading,
		data: data,
		refetch: refetch,
		remove: remove
	}
}
