import React, { memo, useCallback, useEffect, useMemo } from 'react'
import Response from '../../../../../../extensions/Response'
import { COLOR_DANGER, COLOR_SUCCESS } from '../../../../../../constants/colors'
import { EuiButton } from '@elastic/eui'
import useEventJoinMutation from '../../../../../Events/components/Card/components/ParticipateButton/hooks/useEventJoinMutation'
import { shallowEqual, useSelector } from 'react-redux'
import { userSuccessSelectorReselect } from '../../../../../../redux/selectors/user'
import _ from 'lodash'
import useEventExitMutation from './hooks/useEventExitMutation'

const ParticipateButton = ({ config, refetch }) => {
    const { data, error, isLoading, mutate, reset } = useEventJoinMutation()
    const { data: dataExit, error: errorExit, isLoading: isLoadingExit, mutate: mutateExit, reset: resetExit } = useEventExitMutation()
    const userSuccess = useSelector((state) => userSuccessSelectorReselect(state), shallowEqual)

    useEffect(() => {
        if (data) {
            refetch()
            reset()
        }
    }, [data])

    useEffect(() => {
        if (dataExit) {
            refetch()
            resetExit()
        }
    }, [dataExit])

    const isParticipate = useMemo(() => {
        const participants = _.get(config, 'participants', [])

        const index = participants.findIndex(item => _.get(item, 'email', '') === _.get(userSuccess, 'email', ''))

        return index >= 0
    }, [config, userSuccess])

    const handleJoinMutate = useCallback(() => {
        mutate({
            payload: {
                eventUuid: _.get(config, 'uuid', '')
            }
        })
    }, [config])

    const handleExitMutate = useCallback(() => {
        mutateExit({
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
			error={error || errorExit}
			isSmall={false}
			callback={null}
            >
			{
                    isParticipate
                        ? <EuiButton size="m" color={COLOR_DANGER} isLoading={isLoadingExit} onClick={handleExitMutate}>Отказаться от участия</EuiButton>
                        : <EuiButton size="m" color={COLOR_SUCCESS} isLoading={isLoading} onClick={handleJoinMutate}>Участвую</EuiButton>
                }
		</Response>
	</>
    )
}

export default memo(ParticipateButton)
