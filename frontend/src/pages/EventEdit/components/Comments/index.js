import React, { memo, useCallback, useEffect, useState } from 'react'
import { EuiButton, EuiCommentList, EuiFieldText, EuiFlexGroup, EuiFlexItem, EuiFormRow } from '@elastic/eui'
import _ from 'lodash'
import useCommentsNormalize from './hooks/useCommentsNormalize'
import useAddCommentMutation from './hooks/useAddCommentMutation'

const Comments = ({ data, refetch }) => {
	const { data: dataMutate, isLoading, mutate, reset } = useAddCommentMutation()
    const dataNormalized = useCommentsNormalize(_.get(data, 'comments', []), refetch)
	const [config, setConfig] = useState({
		message: '',
		eventUuid: ''
	})

	const handleChangeConfig = useCallback((name, value) => {
		setConfig((prevState) => ({
			...prevState,
			[name]: value
		}))
	}, [])

	useEffect(() => {
		if (data) {
			handleChangeConfig('eventUuid', _.get(data, 'uuid', ''))
		}
	}, [data])

	useEffect(() => {
		if (dataMutate) {
			handleChangeConfig('message', '')
			reset()
			refetch()
		}
	}, [dataMutate])

	const handleMutate = useCallback(() => {
		mutate({
			payload: config
		})
	}, [config])
    
    return (
	<>
		<EuiFlexGroup direction="column">
			<EuiFlexItem>
				<EuiCommentList
					comments={dataNormalized}
					aria-label="Comment list event" />
			</EuiFlexItem>
			<EuiFlexItem>
				<EuiFormRow label="Новый комментарий" fullWidth={true}>
					<EuiFlexGroup alignItems="center" gutterSize="s">
						<EuiFlexItem grow={true}>
							<EuiFieldText
								value={config.message}
								fullWidth={true}
								onChange={(event) => handleChangeConfig('message', event.target.value)}
							/>
						</EuiFlexItem>
						<EuiFlexItem grow={false}>
							<EuiButton onClick={handleMutate} isLoading={isLoading} size="m" fill={true}>Отправить</EuiButton>
						</EuiFlexItem>
					</EuiFlexGroup>
				</EuiFormRow>
			</EuiFlexItem>
		</EuiFlexGroup>
	</>
    )
}

export default memo(Comments)