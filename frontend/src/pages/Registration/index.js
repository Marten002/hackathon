import React, { memo, useCallback, useEffect, useState } from 'react'
import {
	EuiButton,
	EuiFieldPassword,
	EuiFieldText,
	EuiFlexGroup,
	EuiFlexItem,
	EuiFormRow,
	EuiPage,
	EuiPanel,
	EuiText,
	EuiTitle
} from '@elastic/eui'
import Logo from '../../components/Logo'
import Footer from '../../widgets/Footer'

import classes from './index.module.scss'
import { Link, useNavigate } from 'react-router-dom'
import { Routs } from '../../routs'
import { COLOR_DEFAULT, COLOR_PRIMARY } from '../../constants/colors'
import _ from 'lodash'
import { v4 as uuidv4 } from 'uuid'
import Response from '../../extensions/Response'
import useSingUpMutation from './hooks/useSingUpMutation'
import { get, set } from '../../utils/localStorage'

const Registration = () => {
	const {
		isLoading,
		data,
		error,
		mutate,
		reset
	} = useSingUpMutation()

	const navigate = useNavigate()

	useEffect(() => {
		if (!_.isNil(get('token', null))) {
			navigate(Routs.index)
		}
	}, [])

	const [config, setConfig] = useState({
		email: '',
		password: '',
		username: ''
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
			password: _.get(config, 'password', ''),
			username: _.get(config, 'username', '')
		})
	}, [config])

	useEffect(() => {
		if (!_.isNil(data)) {
			reset()
			const token = _.get(data, 'data.accessToken', null)

			if (token) {
				set({ key: 'token', value: token, withEvent: true })
				navigate(Routs.index)
			}
		}
	}, [data])

	return (
		<>
			<EuiPage paddingSize="m" className="fs-h">
				<EuiFlexGroup gutterSize="m" direction="column" justifyContent="flexStart" className="h-100p">
					<EuiFlexItem grow={false}>
						<Logo route={Routs.auth.registration.index}/>
					</EuiFlexItem>
					<EuiFlexItem grow={true}>
						<EuiPanel className={classes.container} paddingSize="l" grow={false}>
							<EuiFlexGroup gutterSize="m" direction="column">
								<EuiFlexItem>
									<EuiTitle size="m">
										<b>Регистрация</b>
									</EuiTitle>
								</EuiFlexItem>
								<EuiFlexItem>
									<Response
										isLoading={isLoading}
										error={error}
										data={null}
										callback={null}
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
														Регистрация
													</EuiButton>
												</div>
											</EuiFlexItem>
										</EuiFlexGroup>
									</Response>
								</EuiFlexItem>
								<EuiFlexItem grow={false} style={{ textAlign: 'center' }}>
									<span>
										Вы имеете аккаунт?
										<Link to={Routs.auth.authorization.index}>
											<EuiText
												size="xs"
												color={COLOR_DEFAULT}
												grow={false}
												onClick={null}
												className={null}
												style={null}
											>
												Войти
											</EuiText>
										</Link>
									</span>
								</EuiFlexItem>
							</EuiFlexGroup>
						</EuiPanel>
					</EuiFlexItem>
					<EuiFlexItem grow={false}>
						<Footer/>
					</EuiFlexItem>
				</EuiFlexGroup>
			</EuiPage>
		</>
	)
}

export default memo(Registration)
