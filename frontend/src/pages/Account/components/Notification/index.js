import React, { memo, useCallback, useState } from 'react'
import { EuiFlexGroup, EuiFlexItem, EuiHealth, EuiPanel, EuiSuperSelect, EuiText, EuiTitle } from '@elastic/eui'
import _ from 'lodash'

import { COLOR_DEFAULT, COLOR_SUBDUED, COLOR_SUCCESS, COLOR_WARNING } from '../../../../constants/colors'

import classes from './index.module.scss'

const Notification = () => {

	const [config, setConfig] = useState({
		all: 'on'
	})

	const handleSetConfig = useCallback((name, value) => {
		setConfig((prevState) => ({
			...prevState,
			[name]: value
		}))
	}, [])

	return (
		<>
			<EuiPanel paddingSize="m" hasShadow={false} hasBorder={true}>
				<EuiFlexGroup gutterSize="m" direction="column">
					<EuiFlexItem>
						<EuiFlexGroup gutterSize="xs" direction="column">
							<EuiFlexItem>
								<EuiTitle size="m">
									<b>Оповещения</b>
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
									Настройка оповещений
								</EuiText>
							</EuiFlexItem>
						</EuiFlexGroup>
					</EuiFlexItem>
					<EuiFlexItem>
						<EuiPanel color={COLOR_SUBDUED} hasShadow={false} hasBorder={false}>
							<EuiFlexGroup gutterSize="m" alignItems="center" justifyContent="flexBetween">
								<EuiFlexItem>
									<EuiText
										size="m"
										color={COLOR_DEFAULT}
										grow={false}
										onClick={null}
										className={null}
										style={null}
									>
										Все возможные уведомления
									</EuiText>
								</EuiFlexItem>
								<EuiFlexItem grow={false}>
									<EuiSuperSelect
										name="all"
										placeholder="Вкл/Выкл"
										value={_.get(config, 'all', '')}
										onChange={(event) => handleSetConfig('all', event)}
										options={
											[
												{
													value: 'on',
													inputDisplay: (
														<>
															<EuiFlexGroup gutterSize="xs" alignItems="center">
																<EuiFlexItem grow={false}>
																	<EuiHealth color={COLOR_SUCCESS}/>
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
																		Включены
																	</EuiText>
																</EuiFlexItem>
															</EuiFlexGroup>
														</>
													),
													disabled: false
												},
												{
													value: 'off',
													inputDisplay: (
														<>
															<EuiFlexGroup gutterSize="xs" alignItems="center">
																<EuiFlexItem grow={false}>
																	<EuiHealth color={COLOR_WARNING}/>
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
																		Отключены
																	</EuiText>
																</EuiFlexItem>
															</EuiFlexGroup>
														</>
													),
													disabled: false
												}
											]
										}
										valueOfSelected={_.get(config, 'all', '')}
										compressed={true}
										fullWidth={true}
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
								</EuiFlexItem>
							</EuiFlexGroup>
						</EuiPanel>
					</EuiFlexItem>
				</EuiFlexGroup>
			</EuiPanel>
		</>
	)
}

export default memo(Notification)
