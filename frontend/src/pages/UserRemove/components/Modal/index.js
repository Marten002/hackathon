import React, { memo, useCallback } from 'react'
import {
	EuiButton,
	EuiFlexGroup,
	EuiFlexItem,
	EuiHorizontalRule,
	EuiModal,
	EuiModalBody,
	EuiModalHeader,
	EuiModalHeaderTitle,
	EuiPanel,
	EuiText
} from '@elastic/eui'

import classes from './index.module.scss'
import _ from 'lodash'
import { v4 as uuidv4 } from 'uuid'
import { COLOR_DANGER, COLOR_DEFAULT, COLOR_SUBDUED } from '../../../../constants/colors'
import Response from '../../../../extensions/Response'
import useUserDeleteMutation from './hooks/useUserDeleteMutation'

const Modal = ({ item, callback }) => {
	const {
		isLoading,
		data,
		error,
		mutate,
		reset
	} = useUserDeleteMutation()

	const handleMutate = useCallback(() => {
		mutate({
			uuid: _.get(item, 'uuid', '')
		})
	}, [item])

	const handleCallback = useCallback(() => {
		reset()
		callback()
	}, [])

	return (
		<>
			<EuiModal onClose={callback} className={classes.modal}>
				<EuiModalHeader>
					<EuiModalHeaderTitle>
						<b>Удаление пользователя</b>
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
								<EuiPanel color={COLOR_SUBDUED} hasShadow={false} hasBorder={false}>
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
														{_.get(item, 'email', '')}
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
														Имя
													</EuiText>
												</EuiFlexItem>
												<EuiFlexItem>
													<EuiText
														size="xs"
														color={null}
														grow={false}
														onClick={null}
														className={null}
														style={null}
													>
														{_.get(item, 'username', '')}
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
														{_.get(item, 'role', '')}
													</EuiText>
												</EuiFlexItem>
											</EuiFlexGroup>
										</EuiFlexItem>
									</EuiFlexGroup>
								</EuiPanel>
							</EuiFlexItem>
							<EuiFlexItem>
								<EuiButton
									key={uuidv4()}
									aria-label="submit"
									color={COLOR_DANGER}
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
									Удалить
								</EuiButton>
							</EuiFlexItem>
						</EuiFlexGroup>
					</Response>
				</EuiModalBody>
			</EuiModal>
		</>
	)
}

export default memo(Modal)
