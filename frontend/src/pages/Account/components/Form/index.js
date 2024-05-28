import React, { memo, useCallback, useState } from 'react'
import {
	EuiCallOut,
	EuiFlexGroup,
	EuiFlexItem,
	EuiHorizontalRule,
	EuiIcon,
	EuiLink,
	EuiPanel,
	EuiText,
	EuiTitle
} from '@elastic/eui'
import _ from 'lodash'

import { COLOR_DEFAULT, COLOR_PRIMARY, COLOR_SUBDUED, COLOR_WARNING } from '../../../../constants/colors'

import Name from './components/Name'
import { shallowEqual, useSelector } from 'react-redux'
import { userIsFetchingSelectorReselect, userSuccessSelectorReselect } from '../../../../redux/selectors/user'
import Response from '../../../../extensions/Response'

const Form = () => {

	const [isOpenName, setIsOpenName] = useState(false)

	const handleSetIsOpenName = useCallback(() => {
		setIsOpenName((prevState) => !prevState)
	}, [])

	const handleCallback = useCallback(() => {
		setIsOpenName(false)
	}, [])

	const userIsFetching = useSelector((state) => userIsFetchingSelectorReselect(state), shallowEqual)
	const userSuccess = useSelector((state) => userSuccessSelectorReselect(state), shallowEqual)

	return (
		<>
			<EuiPanel paddingSize="m" hasShadow={false} hasBorder={true}>
				<EuiFlexGroup gutterSize="m" direction="column">
					<EuiFlexItem>
						<EuiFlexGroup gutterSize="xs" direction="column">
							<EuiFlexItem>
								<EuiTitle size="m">
									<b>Изменение персональных данных</b>
								</EuiTitle>
							</EuiFlexItem>
							<EuiFlexItem>
								<EuiCallOut
									title="Предупреждение!"
									color={COLOR_WARNING}
									iconType="alert"
									size="m"
								>
									<EuiText
										size="s"
										color={COLOR_DEFAULT}
										grow={false}
										onClick={null}
										className={null}
										style={null}
									>
										Вы можете изменить только имя, так как изменение других данных запрещено
										администратором
									</EuiText>
								</EuiCallOut>
							</EuiFlexItem>
						</EuiFlexGroup>
					</EuiFlexItem>
					<EuiFlexItem>
						<EuiPanel color={COLOR_SUBDUED} hasShadow={false} hasBorder={false}>
							<Response
								isLoading={userIsFetching}
								error={null}
								data={null}
								callback={null}
								isSmall={true}
							>
								<EuiFlexGroup gutterSize="m" direction="column">
									<EuiFlexItem>
										<EuiFlexGroup gutterSize="m" alignItems="center">
											<EuiFlexItem>
												<EuiText
													size="xs"
													color={COLOR_SUBDUED}
													grow={false}
													onClick={null}
													className={null}
													style={null}
												>
													Логин
												</EuiText>
											</EuiFlexItem>
											<EuiFlexItem>
												<EuiText
													size="xs"
													color={COLOR_DEFAULT}
													grow={false}
													onClick={null}
													className={null}
													style={null}
												>
													{_.get(userSuccess, 'email', '')}
												</EuiText>
											</EuiFlexItem>
										</EuiFlexGroup>
									</EuiFlexItem>
									<EuiFlexItem>
										<EuiHorizontalRule size="full" margin="none"/>
									</EuiFlexItem>
									<EuiFlexItem>
										<EuiFlexGroup gutterSize="m" alignItems="center">
											<EuiFlexItem>
												<EuiText
													size="xs"
													color={COLOR_SUBDUED}
													grow={false}
													onClick={null}
													className={null}
													style={null}
												>
													Ваше имя
												</EuiText>
											</EuiFlexItem>
											<EuiFlexItem>
												<EuiLink
													type="button"
													color={COLOR_PRIMARY}
													onClick={() => handleSetIsOpenName()}
												>
													<EuiFlexGroup gutterSize="xs" alignItems="center">
														<EuiFlexItem grow={false}>
															<EuiText
																size="xs"
																color={null}
																grow={false}
																onClick={null}
																className={null}
																style={null}
															>
																{_.get(userSuccess, 'username', '')}
															</EuiText>
														</EuiFlexItem>
														<EuiFlexItem grow={false}>
															<EuiIcon
																aria-label="icon-indexEdit"
																type="indexEdit"
																size="s"
																color={null}
																onClick={null}
																style={null}
																className={null}
															/>
														</EuiFlexItem>
													</EuiFlexGroup>
												</EuiLink>
											</EuiFlexItem>
										</EuiFlexGroup>
									</EuiFlexItem>
									<EuiFlexItem>
										<EuiHorizontalRule size="full" margin="none"/>
									</EuiFlexItem>
									<EuiFlexItem>
										<EuiFlexGroup gutterSize="m" alignItems="center">
											<EuiFlexItem>
												<EuiText
													size="xs"
													color={COLOR_SUBDUED}
													grow={false}
													onClick={null}
													className={null}
													style={null}
												>
													Роли
												</EuiText>
											</EuiFlexItem>
											<EuiFlexItem>
												<EuiText
													size="xs"
													color={COLOR_DEFAULT}
													grow={false}
													onClick={null}
													className={null}
													style={null}
												>
													{_.get(userSuccess, 'role', '')}
												</EuiText>
											</EuiFlexItem>
										</EuiFlexGroup>
									</EuiFlexItem>
								</EuiFlexGroup>
							</Response>
						</EuiPanel>
					</EuiFlexItem>
				</EuiFlexGroup>
			</EuiPanel>
			{
				isOpenName
					? <>
						<Name callback={handleCallback}/>
					</>
					: null
			}
		</>
	)
}

export default memo(Form)
