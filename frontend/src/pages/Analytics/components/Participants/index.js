import React, { memo, useEffect, useState } from 'react'
import { EuiCallOut, EuiFlexGroup, EuiFlexItem, EuiPanel, EuiText, EuiTitle } from '@elastic/eui'
import {
	BACKGROUND_DARK,
	BACKGROUND_LIGHT,
	BACKGROUND_SUBDUED,
	COLOR_DEFAULT,
	COLOR_SUBDUED,
	TEXT_DARK,
	TEXT_LIGHT
} from '../../../../constants/colors'
import _ from 'lodash'
import ReactECharts from 'echarts-for-react'
import useMonitoringParticipantsInEventsQuery from './hooks/useMonitoringParticipantsInEventsQuery'
import useParticipantsNormalize from './hooks/useParticipantsNormalize'

import Response from '../../../../extensions/Response'
import { getTheme } from '../../../../utils/theme/get'

import classes from './index.module.scss'
import { useLocalStorageEffect } from '../../../../hooks/useLocalStorageEffect'

const Participants = () => {
	const {
		isLoading,
		data,
		error
	} = useMonitoringParticipantsInEventsQuery()

	const dataNormalize = useParticipantsNormalize(data)

	const [theme, setTheme] = useState(getTheme())

	const [option, setOption] = useState({
		backgroundColor: theme === 'light' ? BACKGROUND_LIGHT : BACKGROUND_DARK,
		tooltip: {
			trigger: 'item',
			backgroundColor: theme === 'light' ? BACKGROUND_LIGHT : BACKGROUND_DARK,
			textStyle: {
				color: theme === 'light' ? TEXT_DARK : TEXT_LIGHT
			}
		},
		legend: {
			type: 'plain',
			show: true,
			z: 2,
			left: 0,
			top: 0,
			orient: 'horizontal',
			align: 'auto',
			icon: 'roundRect',
			textStyle: {
				color: theme === 'light' ? TEXT_DARK : TEXT_LIGHT
			},
			selectedMode: true,
			inactiveColor: BACKGROUND_SUBDUED,
			inactiveBorderColor: BACKGROUND_SUBDUED
		},
		toolbox: {
			show: false
		},
		grid: {
			top: '15%',
			right: '10',
			bottom: '10',
			left: '10',
			containLabel: true
		},
		xAxis: {
			type: 'value',
			axisLabel: {
				color: theme === 'light' ? TEXT_DARK : TEXT_LIGHT
			}
		},
		yAxis: [
			{
				type: 'category',
				boundaryGap: true,
				axisLabel: {
					color: theme === 'light' ? TEXT_DARK : TEXT_LIGHT
				},
				data: []
			}
		],
		series: []
	})

	useEffect(() => {
		if (!_.isEmpty(_.get(dataNormalize, 'series', [])) && !_.isEmpty(_.get(dataNormalize, 'names', []))) {
			setOption((prevState) => ({
				...prevState,
				yAxis: {
					..._.get(prevState, 'yAxis', {}),
					data: _.get(dataNormalize, 'names', [])
				},
				series: _.map(_.get(dataNormalize, 'series', []), (item) => {
					return {
						name: _.get(item, 'name', ''),
						type: 'bar',
						stack: 'total',
						label: {
							show: false
						},
						emphasis: {
							focus: 'series'
						},
						data: _.get(item, 'data', [])
					}
				})
			}))
		}
	}, [dataNormalize])

	useLocalStorageEffect((key, newValue) => {
		setTheme(newValue)
	}, ['theme'])

	return (
		<>
			<EuiPanel hasShadow={false} hasBorder={true}>
				<EuiFlexGroup gutterSize="m" direction="column">
					<EuiFlexItem>
						<EuiFlexGroup gutterSize="xs" direction="column">
							<EuiFlexItem>
								<EuiTitle size="xs">
									<b>Количество пользователей</b>
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
									Аналитика количества пользователей относительно каждого мероприятия
								</EuiText>
							</EuiFlexItem>
						</EuiFlexGroup>
					</EuiFlexItem>
					<EuiFlexItem>
						<Response
							isLoading={isLoading}
							error={error}
							data={null}
							callback={null}
							isSmall={true}
						>
							{
								_.isEmpty(dataNormalize)
									? <>
										<EuiCallOut
											title="Данные для отображения аналитики не найдены"
											color={COLOR_SUBDUED}
											iconType="alert"
											size="s"
										/>
									</>
									: <>
										<ReactECharts
											option={option}
											lazyUpdate={true}
											className={classes.bar}
										/>
									</>
							}
						</Response>
					</EuiFlexItem>
				</EuiFlexGroup>
			</EuiPanel>
		</>
	)
}

export default memo(Participants)
