import React, { useCallback, useMemo } from 'react'
import _ from 'lodash'

import BlockSmallLoading from '../../components//Loader/Small'
import BlockLargeLoading from '../../components/Loader/Large'
import ModalError from './components/Error'
import ModalData from './components/Data'

const Response = ({ isLoading, error, data, callback, isSmall, children }) => {
	const errorMemoize = useMemo(() => {
		if (!_.isEmpty(error)) {
			if (_.get(error, 'error', '') !== '') {
				return error
			}

			return null
		}

		return null
	}, [error])

	const dataMemoize = useMemo(() => {
		if (!_.isEmpty(data)) {
			if (_.get(data, 'body.status', false) === true || _.get(data, 'body.status', false) === false) {
				return data
			}

			return null
		}

		return null
	}, [data])

	const handleCallback = useCallback(() => {
		callback()
	}, [])

	return (
		<>
			{
				isLoading === true && _.isNil(errorMemoize) && _.isNil(dataMemoize)
					? <>
						{
							isSmall === true
								? <>
									<BlockSmallLoading/>
								</>
								: <>
									<BlockLargeLoading/>
								</>
						}
					</>
					: null
			}
			{
				isLoading === false && !_.isNil(errorMemoize) && _.isNil(dataMemoize)
					? <>
						<ModalError
							data={errorMemoize}
						/>
					</>
					: null
			}
			{
				isLoading === false && _.isNil(errorMemoize) && !_.isNil(dataMemoize)
					? <>
						<ModalData
							data={dataMemoize}
							callback={handleCallback}
						/>
					</>
					: null
			}
			{
				isLoading === false
					? children
					: null
			}
		</>
	)
}

export default Response
