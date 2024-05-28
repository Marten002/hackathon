import React, { memo, useCallback, useEffect } from 'react'
import { EuiButton } from '@elastic/eui'
import { v4 as uuidv4 } from 'uuid'

import useAuthSendCodeMutation from './hooks/useAuthSendCodeMutation'
import Response from '../../../../../../../../extensions/Response'

import { COLOR_PRIMARY } from '../../../../../../../../constants/colors'

const Submit = ({ callback }) => {

	const {
		isLoading,
		data,
		error,
		mutate,
		reset
	} = useAuthSendCodeMutation()

	const handleMutate = useCallback(() => {
		mutate({
			email: 'gosha.kitov@mail.ru'
		})
	}, [])

	useEffect(() => {
		if (data) {
			callback('check')
			reset()
		}
	}, [data])

	return (
		<>
			<Response
				isLoading={isLoading}
				error={error}
				data={null}
				callback={null}
				isSmall={true}
			>
				<EuiButton
					key={uuidv4()}
					aria-label="submit"
					color={COLOR_PRIMARY}
					size="m"
					iconType={null}
					iconSide={null}
					fill={true}
					fullWidth={true}
					isDisabled={false}
					isLoading={false}
					onClick={() => handleMutate()}
					className={null}
					data-test-subj={null}
				>
					Отправить
				</EuiButton>
			</Response>
		</>
	)
}

export default memo(Submit)
