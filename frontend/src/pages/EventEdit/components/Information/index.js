import React, { memo, useCallback, useEffect, useState } from 'react'
import { EuiFlexGroup, EuiFlexItem, EuiIcon, EuiText, EuiToolTip } from '@elastic/eui'
import EditableField from './components/EditableField'
import _ from 'lodash'
import EditableTextarea from './components/EditableTextarea'
import EditableDate from './components/EditableDate'
import Like from './components/Like'
import EditableCombobox from './components/EditableCombobox'
import ParticipateButton from './components/ParticipateButton'

const Information = ({ data, refetch }) => {
    const [config, setConfig] = useState({
        uuid: '',
        title: ''
    })

    useEffect(() => {
        if (data) {
            setConfig({
                uuid: _.get(data, 'uuid', ''),
                title: _.get(data, 'title', ''),
                tags: _.get(data, 'tags', []),
                description: _.get(data, 'description', ''),
                isPrivate: _.get(data, 'isPrivate', ''),
                startDate: _.get(data, 'startDate', ''),
                endDate: _.get(data, 'endDate', ''),
				user: _.get(data, 'user', {})
            })
        }
    }, [data])

    const handleChangeConfig = useCallback((name, value) => {
        setConfig((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }, [])

    return (
	<>
		<EuiFlexGroup direction="column">
			<EuiFlexItem>
				<EditableField
					config={config}
					name="title"
					label="Название"
					callback={handleChangeConfig}
                    />
			</EuiFlexItem>
			<EuiFlexItem>
				<EditableCombobox
					config={config}
					name="tags"
					label="Тэги мероприятия"
					callback={handleChangeConfig}
				/>
			</EuiFlexItem>
			<EuiFlexItem>
				<EditableTextarea
					config={config}
					name="description"
					label="Описание"
					callback={handleChangeConfig}
                    />
			</EuiFlexItem>
			<EuiFlexItem grow={false}>
				<EuiToolTip position="right" content="Автор мероприятия">
					<EuiFlexGroup alignItems="center" gutterSize="s">
						<EuiFlexItem grow={false}>
							<EuiIcon
								type="userAvatar"
                        />
						</EuiFlexItem>
						<EuiFlexItem grow={false}>
							<EuiText size="s">
								{_.get(data, 'user.username', '')}
							</EuiText>
						</EuiFlexItem>
					</EuiFlexGroup>
				</EuiToolTip>
			</EuiFlexItem>
			<EuiFlexItem>
				<EditableDate
					config={config}
					name="startDate"
					label="Дата начала"
					callback={handleChangeConfig}
				/>
			</EuiFlexItem>
			<EuiFlexItem>
				<EditableDate
					config={config}
					name="endDate"
					label="Дата окончания"
					callback={handleChangeConfig}
				/>
			</EuiFlexItem>
			<EuiFlexItem>
				<Like config={data} refetch={refetch} />
			</EuiFlexItem>
			<EuiFlexItem>
				<EuiFlexGroup justifyContent="flexEnd">
					<EuiFlexItem grow={false}>
						<ParticipateButton config={data} refetch={refetch} />
					</EuiFlexItem>
				</EuiFlexGroup>
			</EuiFlexItem>
		</EuiFlexGroup>
	</>
    )
}

export default memo(Information)