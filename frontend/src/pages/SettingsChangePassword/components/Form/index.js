import React, { memo, useState, useCallback, useEffect } from 'react'
import { EuiButton, EuiCallOut, EuiFieldPassword, EuiFlexGroup, EuiFlexItem, EuiFormRow } from '@elastic/eui'
import _ from 'lodash'

import useChangePasswordMutation from './hooks/useChangePasswordMutation'
import { COLOR_DANGER, COLOR_SUCCESS } from '../../../../constants/colors'

const Form = () => {
	const { data, error: mutateError, mutate, isLoading, reset } = useChangePasswordMutation()
	const [error, setError] = useState('')

	const [config, setConfig] = useState({
		password1: '',
		password2: ''
	})

	const handleChangeConfig = useCallback((name, value) => {
		setConfig((prevState) => ({
			...prevState,
			[name]: value
		}))
	}, [])

	useEffect(() => {
		setError(_.get(mutateError, 'message', ''))
	}, [mutateError])

	const handleMutate = useCallback((config) => {
		if (config.password1 !== config.password2) {
			setError('Введенные пароли не совпадают')
		} else {
			setError('')
			reset()
			mutate({
				payload: {
					password: config.password1
				}
			})
		}
	}, [mutate, reset])

    return (
	<>
		<EuiFlexGroup direction="column">
			<EuiFlexItem>
				{
					error
						? <EuiCallOut
							title={error}
							color={COLOR_DANGER}
							iconType="alert"
						/>
						: null
				}
				{
					data
						? <EuiCallOut
							title="Пароль успешно изменен"
							color={COLOR_SUCCESS}
							iconType="alert"
						/>
						: null
				}
			</EuiFlexItem>
			<EuiFlexItem>
				<EuiFormRow>
					<EuiFieldPassword
						placeholder="Введите новый пароль"
						value={config.password1}
						onChange={(event) => handleChangeConfig('password1', event.target.value)}
						isDisabled={data}
					/>
				</EuiFormRow>
			</EuiFlexItem>
			<EuiFlexItem>
				<EuiFormRow>
					<EuiFieldPassword
						placeholder="Повторите новый пароль"
						value={config.password2}
						onChange={(event) => handleChangeConfig('password2', event.target.value)}
						isDisabled={data}
					/>
				</EuiFormRow>
			</EuiFlexItem>
			<EuiFlexItem grow={false}>
				<EuiFormRow>
					<EuiButton
						isLoading={isLoading}
						fill={true}
						onClick={() => handleMutate(config)}
						isDisabled={data}
					>Сохранить</EuiButton>
				</EuiFormRow>
			</EuiFlexItem>
		</EuiFlexGroup>
	</>
    )
}

export default memo(Form)
