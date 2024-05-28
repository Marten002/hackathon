import React, { memo, useCallback, useState } from 'react'
import {
	EuiButton,
	EuiFieldText,
	EuiFlexGroup,
	EuiFlexItem,
	EuiFormRow,
	EuiSuperSelect,
	EuiText,
	EuiTitle
} from '@elastic/eui'
import { COLOR_DEFAULT, COLOR_PRIMARY } from '../../constants/colors'
import Breadcrumbs from '../../components/Breadcrumbs'
import { Routs } from '../../routs'
import _ from 'lodash'
import Response from '../../extensions/Response'
import useUserCreateMutation from './hooks/useUserCreateMutation'
import classes from '../Account/components/Notification/index.module.scss'
import { v4 as uuidv4 } from 'uuid'

const UserAdd = () => {

	const breadcrumbs = [
		{
			text: 'Мероприятия',
			href: Routs.index
		},
		{
			text: 'Управление проектом',
			href: Routs.project.index
		},
		{
			text: 'Добавление пользователей',
			href: Routs.project.user.add.index
		}
	]

	const {
		isLoading,
		data,
		error,
		mutate,
		reset
	} = useUserCreateMutation()

	const [config, setConfig] = useState({
		email: '',
		username: '',
		role: ''
	})

	const handleSetConfig = useCallback((name, value) => {
		setConfig((prevState) => ({
			...prevState,
			[name]: value
		}))
	}, [])

	const handleMutate = useCallback(() => {
		mutate({
			email: _.get(config, 'email', ''),
			username: _.get(config, 'username', ''),
			role: _.get(config, 'role', '')
		})
	}, [config])

	const handleCallback = useCallback(() => {
		reset()
	}, [])

	return (
		<>
			<Breadcrumbs
				breadcrumbs={breadcrumbs}
			/>
			<EuiFlexGroup gutterSize="m" direction="column">
				<EuiFlexItem>
					<EuiFlexGroup gutterSize="xs" direction="column">
						<EuiFlexItem>
							<EuiTitle size="m">
								<b>Добавление пользователей</b>
							</EuiTitle>
						</EuiFlexItem>
						<EuiFlexItem>
							<EuiText
								size="m"
								color={COLOR_DEFAULT}
								grow={false}
								onClick={null}
								className={null}
								style={null}
							>
								Добавление новых пользователей на платформу
							</EuiText>
						</EuiFlexItem>
					</EuiFlexGroup>
				</EuiFlexItem>
				<EuiFlexItem>
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
									label="E-Mail"
									display="rowCompressed"
									fullWidth={false}
									error={null}
									isInvalid={false}
									className={null}
								>
									<EuiFieldText
										name="email"
										placeholder="example@example.ru"
										value={_.get(config, 'email', '')}
										onChange={(event) => handleSetConfig('email', _.get(event, 'target.value', ''))}
										readOnly={isLoading}
										disabled={false}
										compressed={false}
										fullWidth={false}
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
									fullWidth={false}
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
										fullWidth={false}
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
									fullWidth={false}
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
										fullWidth={false}
										isInvalid={false}
										isLoading={false}
										isOpen={false}
										disabled={false}
										readOnly={false}
										hasDividers={false}
										className={classes.select}
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
										fullWidth={false}
										isDisabled={false}
										isLoading={false}
										onClick={() => handleMutate()}
										className={null}
										data-test-subj={null}
									>
										Добавить
									</EuiButton>
								</div>
							</EuiFlexItem>
						</EuiFlexGroup>
					</Response>
				</EuiFlexItem>
			</EuiFlexGroup>
		</>
	)
}

export default memo(UserAdd)
