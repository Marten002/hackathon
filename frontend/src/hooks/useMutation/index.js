import { useMutation as useMutationHook } from '@tanstack/react-query'
import { useState } from 'react'
import _ from 'lodash'
import { v4 as uuidv4 } from 'uuid'

export const useMutation = ({ callback, options }) => {
	const {
		isLoading,
		isSuccess,
		mutate,
		reset
	} = useMutationHook([uuidv4()], (params) => callback(params), {
		retry: false,
		...options
	})

	const [data, setData] = useState(null)
	const [error, setError] = useState(null)

	return {
		isLoading: isLoading,
		isSuccess: isSuccess,
		data: data,
		error: {
			type: 'manually',
			error: _.get(error, 'response.data.error', ''),
			message: _.get(error, 'response.data.message', ''),
			reset: () => {
				reset()
				setData(null)
				setError(null)
			}
		},
		mutate: (params) => {
			mutate(params, {
				onSuccess: (data) => {
					setData(data)
				},
				onError: (error) => {
					setError(error)
				}
			})
		},
		reset: () => {
			reset()
			setData(null)
			setError(null)
		}
	}
}
