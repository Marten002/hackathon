import React, { useMemo, useCallback, useEffect } from 'react'
import _ from 'lodash'
import { EuiButtonIcon } from '@elastic/eui'
import { COLOR_DANGER } from '../../../../../../constants/colors'
import moment from 'moment'
import useDeleteCommentMutation from '../useDeleteCommentMutation'
import { shallowEqual, useSelector } from 'react-redux'
import { userSuccessSelectorReselect } from '../../../../../../redux/selectors/user'
import Response from '../../../../../../extensions/Response'

const useCommentsNormalize = (comments = [], refetch) => {
    const { data, mutate, error, reset } = useDeleteCommentMutation()

    const userSuccess = useSelector((state) => userSuccessSelectorReselect(state), shallowEqual)

    const handleMutate = useCallback((uuid) => {
        mutate({
            payload: {
                uuid: uuid
            }
        })
    }, [])

    useEffect(() => {
        if (data) {
            reset()
            refetch()
        }
    }, [data])

    return useMemo(() => {
        return _.map(comments, (item) => {
            return {
                username: _.get(item, 'username', ''),
                timelineAvatarAriaLabel: 'Juana Barros',
                event: 'добавлен комментарий',
                children: _.get(item, 'message', ''),
                actions: _.get(userSuccess, 'username', '') === _.get(item, 'username', '') ? (
	<Response
		isLoading={false}
		error={error}
		data={null}
		callback={null}
		isSmall={false}
    >
		<EuiButtonIcon
			title="Удалить комментарий"
			aria-label="Custom action"
			color={COLOR_DANGER}
			iconType="trash"
			isLoading={false}
			onClick={() => handleMutate(_.get(item, 'uuid', ''))}
                        />
	</Response>
	
                ) : null,
                timestamp: moment(_.get(item, 'createdAt', '')).format('LL, HH:mm:ss')
            }
        })
    }, [comments, data, error])
}

export default useCommentsNormalize
