import React, { memo, useCallback, useEffect, useState } from 'react'
import {
	EuiButton,
	EuiFieldPassword,
	EuiFieldText,
	EuiFlexGroup,
	EuiFlexItem,
	EuiFormRow,
	EuiModal,
	EuiModalBody,
	EuiModalHeader,
	EuiModalHeaderTitle,
	EuiSuperSelect
} from '@elastic/eui'

import classes from './index.module.scss'
import _ from 'lodash'
import { v4 as uuidv4 } from 'uuid'
import { COLOR_PRIMARY } from '../../../../constants/colors'
import Response from '../../../../extensions/Response'
import useUserChangeMutation from './hooks/useUserChangeMutation'

const Modal = ({ item, callback }) => {
	const {
		isLoading,
		data,
		error,
		mutate,
		reset
	} = useUserChangeMutation()

	const [config, setConfig] = useState({
		password: '',
		username: '',
		role: ''
	})

	useEffect(() => {
		if (!_.isNil(item)) {
			setConfig((prevState) => ({
				...prevState,
				...item
			}))
		}
	}, [item])

	const handleSetConfig = useCallback((name, value) => {
		setConfig((prevState) => ({
			...prevState,
			[name]: value
		}))
	}, [])

	const handleMutate = useCallback(() => {
		mutate({
			password: _.get(config, 'password', ''),
			username: _.get(config, 'username', ''),
			role: _.get(config, 'role', '')
		})
	}, [config])

	const handleCallback = useCallback(() => {
		reset()
	}, [])

	return (
		<>
			<EuiModal onClose={callback} className={classes.modal}>
				<EuiModalHeader>
					<EuiModalHeaderTitle>
						<b>Изменение данных пользователя</b>
					</EuiModalHeaderTitle>
				</EuiModalHeader>
				<EuiModalBody>
					<Response
						isLoading={isLoading}
						error={error}
						data={data}
						callback={handleCallback}
						isSmall={true}
					>
						<EuiFlexGroup gutterSize="m" direction="column">
							<EuiFlexItem>
								<EuiFormRow
									label="Пароль"
									display="rowCompressed"
									fullWidth={true}
									error={null}
									isInvalid={false}
									className={null}
								>
									<EuiFieldPassword
										name="password"
										placeholder="******"
										type="dual"
										value={_.get(config, 'password', '')}
										onChange={(event) => handleSetConfig('password', _.get(event, 'target.value', ''))}
										readOnly={false}
										compressed={true}
										fullWidth={true}
										disabled={false}
										required={false}
										isInvalid={false}
										append={null}
										data-test-subj={null}
									/>
								</EuiFormRow>
							</EuiFlexItem>
							<EuiFlexItem>
								<EuiFormRow
									label="Имя пользователя"
									display="rowCompressed"
									fullWidth={true}
									error={null}
									isInvalid={false}
									className={null}
								>
									<EuiFieldText
										name="username"
										placeholder="Иван Иванов"
										value={_.get(config, 'username', '')}
										onChange={(event) => handleSetConfig('username', _.get(event, 'target.value', ''))}
										readOnly={isLoading}
										disabled={false}
										compressed={false}
										fullWidth={true}
										required={false}
										isInvalid={false}
										append={null}
										data-test-subj={null}
									/>
								</EuiFormRow>
							</EuiFlexItem>
							<EuiFlexItem>
								<EuiFormRow
									label="Роль"
									display="rowCompressed"
									fullWidth={true}
									error={null}
									isInvalid={false}
									className={null}
								>
									<EuiSuperSelect
										name="role"
										placeholder="Роль"
										value={_.get(config, 'role', '')}
										onChange={(event) => handleSetConfig('role', event)}
										options={
											[
												{
													value: 'admin',
													inputDisplay: 'Админ',
													disabled: false
												},
												{
													value: 'user',
													inputDisplay: 'Пользователь',
													disabled: false
												},
												{
													value: 'manager',
													inputDisplay: 'Менеджер',
													disabled: false
												},
												{
													value: 'analytics',
													inputDisplay: 'Аналитик',
													disabled: false
												}
											]
										}
										valueOfSelected={_.get(config, 'role', '')}
										compressed={false}
										fullWidth={true}
										isInvalid={false}
										isLoading={false}
										isOpen={false}
										disabled={false}
										readOnly={false}
										hasDividers={false}
										className={null}
										prepend={null}
										append={null}
										size="m"
										itemLayoutAlign="center"
										itemClassName={null}
										data-test-subj={null}
									/>
								</EuiFormRow>
							</EuiFlexItem>
							<EuiFlexItem grow={false}>
								<div>
									<EuiButton
										key={uuidv4()}
										aria-label="submit"
										color={COLOR_PRIMARY}
										size="m"
										iconType={null}
										iconSide={null}
										fill={false}
										fullWidth={true}
										isDisabled={false}
										isLoading={false}
										onClick={() => handleMutate()}
										className={null}
										data-test-subj={null}
									>
										Изменить
									</EuiButton>
								</div>
							</EuiFlexItem>
						</EuiFlexGroup>
					</Response>
				</EuiModalBody>
			</EuiModal>
		</>
	)
}

export default memo(Modal)
