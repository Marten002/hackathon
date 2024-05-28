import React, { memo, useCallback, useEffect, useState } from 'react'
import _ from 'lodash'
import { EuiFieldText, EuiFormRow } from '@elastic/eui'

import Response from '../../../../../../../../extensions/Response'

import useAuthCheckCodeMutation from './hooks/useAuthCheckCodeMutation'

const Check = ({ callback }) => {

	const {
		isLoading,
		data,
		error,
		mutate,
		reset
	} = useAuthCheckCodeMutation()

	const [config, setConfig] = useState({
		code: '',
		email: ''
	})

	const handleSetConfig = useCallback((name, value) => {
		setConfig((prevState) => ({
			...prevState,
			[name]: value
		}))
	}, [])

	useEffect(() => {
		if (_.toString(_.get(config, 'code', '')).length === 6) {
			mutate({
				email: 'gosha.kitov@mail.ru',
				code: _.get(config, 'code', '')
			})
		}
	}, [config])

	useEffect(() => {
		if (data) {
			reset()
			callback()
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
				<EuiFormRow
					label="Введите код с почты"
					display="rowCompressed"
					fullWidth={true}
					error={null}
					isInvalid={false}
					className={null}
				>
					<EuiFieldText
						name="code"
						placeholder="000000"
						value={_.get(config, 'code', '')}
						onChange={(event) => handleSetConfig('code', _.get(event, 'target.value', ''))}
						readOnly={isLoading}
						disabled={false}
						compressed={true}
						fullWidth={true}
						required={false}
						isInvalid={false}
						append={null}
						data-test-subj={null}
					/>
				</EuiFormRow>
			</Response>
		</>
	)
}

export default memo(Check)
