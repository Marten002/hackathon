import { useMemo } from 'react'
import _ from 'lodash'

const useFavoriteNormalize = (data) => useMemo(() => {
	if (!_.isEmpty(data)) {
		const names = data.reduce((acc, item) => {
			if (_.get(item, 'count', 0) <= 0) {
				return [
					...acc
				]
			}

			return [
				...acc,
				_.get(item, 'event', null)
			]
		}, [])

		const series = data.reduce((acc, item, index) => {
			const insert = (value, insert) => {
				return _.times(_.size(data)).reduce((accChild, itemChild, indexChild) => {
					if (_.toInteger(indexChild) === _.toInteger(index)) {
						return [
							...accChild,
							value
						]
					}

					return [
						...accChild,
						insert
					]
				}, [])
			}

			const event = _.times(_.toNumber(_.get(item, 'count', 0))).reduce((accChild) => {
				if (_.get(item, 'count', 0) <= 0) {
					return [
						...accChild
					]
				}

				return [
					...accChild,
					{
						name: _.get(item, 'event', ''),
						data: insert(_.size(_.times(_.toNumber(_.get(item, 'count', 0)))), null)
					}
				]
			}, [])

			return [
				...acc,
				...event
			]
		}, [])

		const filtered = _.uniqBy(series, (item) => _.get(item, 'name', ''))

		return {
			names: names,
			series: filtered
		}
	}

	return {}
}, [data])

export default useFavoriteNormalize
