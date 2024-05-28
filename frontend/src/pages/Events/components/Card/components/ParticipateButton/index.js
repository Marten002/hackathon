import React, { memo, useCallback, useEffect, useMemo } from 'react'
import Response from '../../../../../../extensions/Response'
import { COLOR_SUCCESS } from '../../../../../../constants/colors'
import { EuiButton, EuiFlexGroup, EuiFlexItem, EuiIcon, EuiText } from '@elastic/eui'
import useEventJoinMutation from './hooks/useEventJoinMutation'
import { shallowEqual, useSelector } from 'react-redux'
import { userSuccessSelectorReselect } from '../../../../../../redux/selectors/user'
import _ from 'lodash'

const ParticipateButton = ({ config, refetch }) => {
	const { data, error, isLoading, mutate, reset } = useEventJoinMutation()
	const userSuccess = useSelector((state) => userSuccessSelectorReselect(state), shallowEqual)

	useEffect(() => {
		if (data) {
			refetch()
			reset()
		}
	}, [data])

	const isParticipate = useMemo(() => {
		const participants = _.get(config, 'participants', [])

		const index = participants.findIndex(item => _.get(item, 'email', '') === _.get(userSuccess, 'email', ''))

		return index >= 0
	}, [config, userSuccess])

	const handleMutate = useCallback(() => {
		mutate({
			payload: {
				eventUuid: _.get(config, 'uuid', '')
			}
		})
	}, [config])

    return (
	<>
		<Response
			isLoading={false}
			data={null}
			error={error}
			isSmall={false}
			callback={null}
		>
			{
				isParticipate
					? <EuiFlexGroup alignItems="center" gutterSize="s" justifyContent="flexEnd">
						<EuiFlexItem>
							<EuiIcon
								type="checkInCircleFilled"
								size="s"
								color={COLOR_SUCCESS}
							/>
						</EuiFlexItem>
						<EuiFlexItem grow={true}>
							<EuiText size="s" color={COLOR_SUCCESS}>Участвую</EuiText>
						</EuiFlexItem>
					</EuiFlexGroup>
					: <EuiButton size="s" color={COLOR_SUCCESS} isLoading={isLoading} onClick={handleMutate}>Участвую</EuiButton>
			}
		</Response>
	</>
    )
}

export default memo(ParticipateButton)
