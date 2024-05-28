import { useMemo } from 'react'
import _ from 'lodash'

const useTagsNormalize = (data) => useMemo(() => {
	if (!_.isEmpty(data)) {
		const tags = _.map(data, (value, key) => {
			return {
				value: value,
				key: key
			}
		})

		const names = tags.reduce((acc, item) => {
			return [
				...acc,
				_.get(item, 'key', null)
			]
		}, [])

		const series = tags.reduce((acc, item, index) => {
			const insert = (value, insert) => {
				return _.times(_.size(tags)).reduce((accChild, itemChild, indexChild) => {
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

			const event = _.get(item, 'value', []).reduce((accChild, itemChild) => {
				return [
					...accChild,
					{
						name: itemChild,
						data: insert(_.size(_.get(item, 'value', [])), null)
					}
				]
			}, [])

			return [
				...acc,
				...event
			]
		}, [])

		return {
			names: names,
			series: series
		}
	}

	return {}
}, [data])

export default useTagsNormalize
