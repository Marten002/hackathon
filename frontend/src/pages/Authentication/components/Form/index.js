import React, { memo, useCallback, useState } from 'react'
import { EuiButton, EuiCallOut, EuiFlexGroup, EuiFlexItem, EuiPanel, EuiText, EuiTitle } from '@elastic/eui'
import { v4 as uuidv4 } from 'uuid'
import _ from 'lodash'

import { COLOR_DEFAULT, COLOR_PRIMARY, COLOR_SUCCESS } from '../../../../constants/colors'

import Modal from './components/Modal'
import { shallowEqual, useSelector } from 'react-redux'
import { userIsFetchingSelectorReselect, userSuccessSelectorReselect } from '../../../../redux/selectors/user'
import Response from '../../../../extensions/Response'

const Form = () => {

	const [isOpen, setIsOpen] = useState(false)

	const handleSetIsOpen = useCallback(() => {
		setIsOpen((prevState) => !prevState)
	}, [])

	const handleCallback = useCallback(() => {
		setIsOpen(false)
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
									<b>Настройка 2FA</b>
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
									Двухфакторная аутентификация с помощью почты
								</EuiText>
							</EuiFlexItem>
						</EuiFlexGroup>
					</EuiFlexItem>
					<EuiFlexItem>
						<Response
							isLoading={userIsFetching}
							error={null}
							data={null}
							callback={null}
							isSmall={true}
						>
							{
								_.get(userSuccess, 'isTwoFactorAuth', false) === true
									? <>
										<EuiCallOut
											title="У Вас уже подключена 2FA"
											color={COLOR_SUCCESS}
											iconType="check"
											size="s"
										/>
									</>
									: <>
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
												onClick={handleSetIsOpen}
												className={null}
												data-test-subj={null}
											>
												Подключить
											</EuiButton>
										</div>
									</>
							}
						</Response>
					</EuiFlexItem>
				</EuiFlexGroup>
			</EuiPanel>
			{
				isOpen
					? <>
						<Modal callback={handleCallback}/>
					</>
					: null
			}
		</>
	)
}

export default memo(Form)
