import React, { memo, useCallback } from 'react'
import {
	EuiButton,
	EuiCallOut,
	EuiFlexGroup,
	EuiFlexItem,
	EuiModal,
	EuiModalBody,
	EuiModalHeader,
	EuiModalHeaderTitle
} from '@elastic/eui'

import classes from './index.module.scss'
import _ from 'lodash'
import { v4 as uuidv4 } from 'uuid'
import { COLOR_DANGER, COLOR_WARNING } from '../../../../constants/colors'
import Response from '../../../../extensions/Response'
import useUserDeleteManyMutation from './hooks/useUserDeleteManyMutation'

const Many = ({ selections, callback }) => {
	const {
		isLoading,
		data,
		error,
		mutate,
		reset
	} = useUserDeleteManyMutation()

	const handleMutate = useCallback(() => {
		mutate({
			uuids: [
				..._.map(selections, (item) => {
					return _.get(item, 'uuid', '')
				})
			]
		})
	}, [selections])

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
								<EuiCallOut
									title="Вы действительно хотите удалить пользователей"
									color={COLOR_WARNING}
									iconType="alert"
									size="s"
								>
									<EuiCallOut
										title={`Количество: ${_.size(selections)}`}
										color={COLOR_WARNING}
										iconType={null}
										size="s"
									/>
								</EuiCallOut>
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

export default memo(Many)
