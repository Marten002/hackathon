import React, { memo, useEffect, useState } from 'react'
import { EuiButtonIcon, EuiFlexGroup, EuiFlexItem, EuiText } from '@elastic/eui'
import { COLOR_DANGER, COLOR_PRIMARY } from '../../../../../../constants/colors'
import useEventLikeMutation from './hooks/useEventLikeMutation'
import _ from 'lodash'
import { decodeJWT } from '../../../../../../utils/jwt'

const Like = ({ config, refetch }) => {
	const { mutate, isLoading, data, reset } = useEventLikeMutation()
	const [isLike, setIsLike] = useState(false)

	const handleClick = () => {
		mutate({
			payload: {
				eventUuid: _.get(config, 'uuid', '')
			}
		})
	}

	useEffect(() => {
		const decodedToken = decodeJWT()

		if (_.get(config, 'likes', []).includes(_.get(decodedToken, 'email'))) {
			setIsLike(true)
		}
	}, [config])

	useEffect(() => {
		if (data) {
			refetch()
			reset()
		}
	}, [data])

    return (
	<>
		<EuiFlexGroup justifyContent="flexStart" gutterSize="none" alignItems="center">
			<EuiFlexItem grow={false}>
				<EuiButtonIcon
					iconType="heart"
					className={isLike ? 'disable-btn-hover c-default' : ''}
					color={isLike ? COLOR_DANGER : COLOR_PRIMARY}
					isLoading={isLoading}
					size="xs"
					onClick={isLike ? null : handleClick}
				/>
			</EuiFlexItem>
			<EuiFlexItem grow={false}>
				<EuiText
					size="s"
					color={isLike ? COLOR_DANGER : COLOR_PRIMARY}
				>
					{_.size(_.get(config, 'likes', ''))}
				</EuiText>
			</EuiFlexItem>
		</EuiFlexGroup>
	</>
    )
}

export default memo(Like)

