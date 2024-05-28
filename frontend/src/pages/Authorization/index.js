import React, { memo, useCallback, useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import {
	EuiButton,
	EuiCallOut,
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
import _ from 'lodash'

import { postAsyncSignIn } from '../../redux/actions/auth'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'

import {
	authFailureSelectorReselect,
	authIsFetchingSelectorReselect,
	authSuccessSelectorReselect
} from '../../redux/selectors/auth'

import { get, set } from '../../utils/localStorage'

import { Routs } from '../../routs'

import { COLOR_DANGER, COLOR_DEFAULT, COLOR_PRIMARY } from '../../constants/colors'
import useAuthSendCodeMutation
	from '../Authentication/components/Form/components/Modal/components/Submit/hooks/useAuthSendCodeMutation'
import { v4 as uuidv4 } from 'uuid'
import Logo from '../../components/Logo'
import classes from './index.module.scss'
import Footer from '../../widgets/Footer'


const Authorization = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const [searchParams] = useSearchParams()
	const { data, isLoading: isLoadingMutation, mutate } = useAuthSendCodeMutation()

	useEffect(() => {
		if (!_.isNil(get('token', null))) {
			navigate(Routs.index)
		}
	}, [])

	const authIsFetching = useSelector((state) => authIsFetchingSelectorReselect(state), shallowEqual)
	const authSuccess = useSelector((state) => authSuccessSelectorReselect(state), shallowEqual)
	const authFailure = useSelector((state) => authFailureSelectorReselect(state), shallowEqual)

	const [pageOffset, setPageOffset] = useState(0)
	const [error, setError] = useState('')
	const [isLoading, setIsLoading] = useState(false)
	const [isCodeSend, setIsCodeSend] = useState(false)

	const [config, setConfig] = useState({
		email: '',
		password: '',
		code: ''
	})

	const handleSetConfig = useCallback((name, value) => {
		setConfig((prevState) => ({
			...prevState,
			[name]: value
		}))
	}, [])

	useEffect(() => {
		setIsLoading(authIsFetching)
	}, [authIsFetching])

	useEffect(() => {
		setIsLoading(isLoadingMutation)
	}, [isLoadingMutation])

	useEffect(() => {
		if (authFailure) {
			if (_.get(authFailure, 'message', '') === 'Некорректный код подтверждения' && !isCodeSend) {
				setIsCodeSend(true)
				setError('')
				mutate({
					email: config.email
				})
			} else {
				setError(_.get(authFailure, 'message', ''))
			}
		} else {
			setError('')
		}
	}, [authFailure])

	useEffect(() => {
		if (data) {
			setPageOffset(374)
		}
	}, [data])

	useEffect(() => {
		if (authSuccess) {
			const token = _.get(authSuccess, 'body.accessToken', '')

			if (token) {
				set({ key: 'token', value: token, withEvent: true })

				if (searchParams.has('next')) {
					return navigate(searchParams.get('next'))
				}

				navigate(Routs.index)
			}
		}
	}, [authSuccess, navigate, searchParams])

	const handlePostConfig = useCallback((config) => {
		const data = {
			...config,
			code: _.toInteger(config.code)
		}
		dispatch(postAsyncSignIn(data))
	}, [dispatch])

	return (
		<>
			<EuiPage paddingSize="m" className="fs-h">
				<EuiFlexGroup gutterSize="m" direction="column" justifyContent="flexStart" className="h-100p">
					<EuiFlexItem grow={false}>
						<Logo route={Routs.auth.authorization.index}/>
					</EuiFlexItem>
					<EuiFlexItem grow={true}>
						<EuiPanel className={classes.container} paddingSize="l" grow={false}>
							<EuiFlexGroup gutterSize="m" direction="column">
								<EuiFlexItem>
									<EuiTitle size="m">
										<b>Авторизация</b>
									</EuiTitle>
								</EuiFlexItem>
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
								</EuiFlexItem>
								<EuiFlexItem>
									<EuiFlexGroup style={{ overflow: 'hidden' }}>
										<EuiFlexItem className="transition"
											style={{ transform: `translateX(-${pageOffset}px)` }}>
											<EuiFlexGroup className="w-350" direction="column" gutterSize="m"
												justifyContent="center">
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
															isLoading={isLoading}
															onClick={() => handlePostConfig(config)}
															className={null}
															data-test-subj={null}
														>
															Войти
														</EuiButton>
													</div>
												</EuiFlexItem>
												<EuiFlexItem grow={false} style={{ textAlign: 'center' }}>
													<span>
														<Link to={Routs.auth.registration.index}>
															<EuiText
																size="xs"
																color={COLOR_DEFAULT}
																grow={false}
																onClick={null}
																className={null}
																style={null}
															>
																Зарегистрироваться
															</EuiText>
														</Link>
													</span>
												</EuiFlexItem>
											</EuiFlexGroup>
										</EuiFlexItem>
										<EuiFlexItem className="transition"
											style={{ transform: `translateX(-${pageOffset}px)` }}
											grow={false}>
											<EuiFlexGroup className="w-350" direction="column"
												justifyContent="flexBetween"
												gutterSize="l">
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
															isLoading={isLoading}
															onClick={() => handlePostConfig(config)}
															className={null}
															data-test-subj={null}
														>
															Войти
														</EuiButton>
													</div>
												</EuiFlexItem>
											</EuiFlexGroup>
										</EuiFlexItem>
									</EuiFlexGroup>
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

export default memo(Authorization)
