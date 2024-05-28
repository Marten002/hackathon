import React, { memo, useCallback, useState } from 'react'
import { Routs } from '../../routs'
import Breadcrumbs from '../../components/Breadcrumbs'
import {
	EuiButton,
	EuiCheckbox,
	EuiComboBox,
	EuiDatePicker,
	EuiFieldText,
	EuiFlexGroup,
	EuiFlexItem,
	EuiFormRow,
	EuiText,
	EuiTextArea
} from '@elastic/eui'
import moment from 'moment'
import useEventCreateMutation from './useEventCreateMutation'
import Response from '../../extensions/Response'
import { useNavigate } from 'react-router-dom'

const EventAdd = () => {
	const navigate = useNavigate()
	const { data, error, isLoading, mutate } = useEventCreateMutation()

	const [config, setConfig] = useState({
		title: '',
		description: '',
		isPrivate: false,
		tags: [],
		startDate: moment().unix(),
		endDate: moment().add('1d').unix()
	})

	const handleChangeConfig = useCallback((name, value) => {
		setConfig((prevState) => ({
			...prevState,
			[name]: value
		}))
	}, [])

	const onCreateOption = (searchValue) => {
		const normalizedSearchValue = searchValue.trim()

		if (!normalizedSearchValue) {
			return
		}

		handleChangeConfig('tags', [...config.tags, normalizedSearchValue])
	}

	const handleMutate = useCallback(() => {
		mutate({
			payload: config
		})
	}, [config])

	const breadcrumbs = [
		{
			text: 'Мероприятия',
			href: Routs.index
		},
		{
			text: 'Новое мероприятие',
			href: `${Routs.events.add.index}`
		}
	]

	return (
		<>
			<Breadcrumbs
				breadcrumbs={breadcrumbs}
			/>
			<Response
				error={error}
				data={data}
				isLoading={false}
				isSmall={false}
				callback={() => navigate(Routs.index)}
			>
				<EuiFlexGroup direction="column" gutterSize="s">
					<EuiFlexItem>
						<EuiFormRow label="Название" fullWidth={true}>
							<EuiFieldText
								value={config.title}
								fullWidth={true}
								onChange={(event) => handleChangeConfig('title', event.target.value)}
							/>
						</EuiFormRow>
					</EuiFlexItem>
					<EuiFlexItem>
						<EuiFormRow label="Тэги мероприятия" fullWidth={true}>
							<EuiComboBox
								onCreateOption={onCreateOption}
								selectedOptions={config.tags.map((item) => ({ label: item, value: item }))}
								onChange={(selectedOptions) => handleChangeConfig('tags', selectedOptions.map(item => item.value))}
								customOptionText="Нажмите Enter чтобы добавить тэг {searchValue}"
							/>
						</EuiFormRow>
					</EuiFlexItem>
					<EuiFlexItem>
						<EuiFormRow label="Описание" fullWidth={true}>
							<EuiTextArea
								value={config.description}
								fullWidth={true}
								onChange={(event) => handleChangeConfig('description', event.target.value)}
							/>
						</EuiFormRow>
					</EuiFlexItem>
					<EuiFlexItem>
						<EuiFormRow label="Приватное мероприятие" fullWidth={true}>
							<EuiFlexGroup alignItems="center" justifyContent="flexStart" gutterSize="s">
								<EuiFlexItem grow={false}>
									<EuiCheckbox
										checked={config.isPrivate}
										fullWidth={false}
										onChange={() => handleChangeConfig('isPrivate', !config.isPrivate)}
									/>
								</EuiFlexItem>
								<EuiFlexItem grow={false}>
									<EuiText size="s">
										{
											config.isPrivate
												? 'Приватное'
												: 'Публичное'
										}
									</EuiText>
								</EuiFlexItem>
							</EuiFlexGroup>
						</EuiFormRow>
					</EuiFlexItem>
					<EuiFlexItem>
						<EuiFormRow label="Дата начала" fullWidth={true}>
							<EuiDatePicker
								selected={moment(config.startDate * 1000)}
								dateFormat="LL, HH:mm:ss"
								timeFormat="HH:mm"
								timeIntervals={60}
								showTimeSelect={true}
								onChange={(date) => handleChangeConfig('startDate', date.unix())}
							/>
						</EuiFormRow>
					</EuiFlexItem>
					<EuiFlexItem>
						<EuiFormRow label="Дата начала" fullWidth={true}>
							<EuiDatePicker
								selected={moment(config.endDate * 1000)}
								dateFormat="LL, HH:mm:ss"
								timeFormat="HH:mm"
								timeIntervals={60}
								showTimeSelect={true}
								onChange={(date) => handleChangeConfig('endDate', date.unix())}
							/>
						</EuiFormRow>
					</EuiFlexItem>
					<EuiFlexItem>
						<EuiFlexGroup justifyContent="flexEnd">
							<EuiFlexItem grow={false}>
								<EuiButton
									isLoading={isLoading}
									fill={true}
									onClick={handleMutate}
								>
									Создать
								</EuiButton>
							</EuiFlexItem>
						</EuiFlexGroup>
					</EuiFlexItem>
				</EuiFlexGroup>
			</Response>
		</>
	)
}

export default memo(EventAdd)
