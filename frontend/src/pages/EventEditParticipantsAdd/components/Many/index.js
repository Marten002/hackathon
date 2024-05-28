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
import { COLOR_PRIMARY, COLOR_WARNING } from '../../../../constants/colors'
import Response from '../../../../extensions/Response'
import useEventsJoinMutation from '../../hooks/useEventsJoinMutation'

const Many = ({ selections, callback, id, refresh }) => {
	const {
		isLoading,
		data,
		error,
		mutate,
		reset
	} = useEventsJoinMutation()

	const handleMutate = useCallback(() => {
		mutate({
			payload: {
				eventUuid: id,
				usersUuid: [
					..._.map(selections, (item) => {
						return _.get(item, 'uuid', '')
					})
				]
			}
		})
	}, [selections])

	const handleCallback = useCallback(() => {
		reset()
		refresh()
		callback()
	}, [])

	return (
		<>
			<EuiModal onClose={callback} className={classes.modal}>
				<EuiModalHeader>
					<EuiModalHeaderTitle>
						<b>Добавление участников</b>
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
									title="Вы действительно хотите добавить участников?"
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
									Добавить
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
