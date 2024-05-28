import React, { memo, useState } from 'react'
import { EuiCallOut, EuiFlexGroup, EuiFlexItem, EuiPanel, EuiText, EuiTitle } from '@elastic/eui'
import {
	BACKGROUND_DARK,
	BACKGROUND_LIGHT,
	BACKGROUND_PRIMARY,
	BACKGROUND_SUBDUED,
	BACKGROUND_SUCCESS,
	COLOR_DEFAULT,
	COLOR_SUBDUED,
	TEXT_DARK,
	TEXT_LIGHT
} from '../../../../constants/colors'
import _ from 'lodash'
import ReactECharts from 'echarts-for-react'
import useMonitoringUserInEventsQuery from './hooks/useMonitoringUserInEventsQuery'
import useUserNormalize from './hooks/useUserNormalize'

import Response from '../../../../extensions/Response'
import { getTheme } from '../../../../utils/theme/get'

import classes from './index.module.scss'
import { useLocalStorageEffect } from '../../../../hooks/useLocalStorageEffect'

const User = () => {
	const {
		isLoading,
		data,
		error
	} = useMonitoringUserInEventsQuery()

	const dataNormalize = useUserNormalize(data)

	const [theme, setTheme] = useState(getTheme())

	const option = {
		backgroundColor: theme === 'light' ? BACKGROUND_LIGHT : BACKGROUND_DARK,
		tooltip: {
			trigger: 'item',
			backgroundColor: theme === 'light' ? BACKGROUND_LIGHT : BACKGROUND_DARK,
			textStyle: {
				color: theme === 'light' ? TEXT_DARK : TEXT_LIGHT
			}
		},
		legend: {
			top: 'center',
			left: '0',
			z: 4,
			show: true,
			orient: 'vertical',
			align: 'left',
			textStyle: {
				color: theme === 'light' ? TEXT_DARK : TEXT_LIGHT
			},
			selectedMode: _.toInteger(_.get(dataNormalize, 'likes', 0)) === 0 && _.toInteger(_.get(dataNormalize, 'comments', 0)) === 0 ? false : true,
			inactiveColor: BACKGROUND_SUBDUED,
			inactiveBorderColor: BACKGROUND_SUBDUED
		},
		series: [
			{
				name: `Пользователь: ${_.get(dataNormalize, 'username', '')}`,
				type: 'pie',
				radius: ['40%', '70%'],
				right: '-25%',
				label: {
					show: false
				},
				showEmptyCircle: true,
				emptyCircleStyle: {
					color: BACKGROUND_SUBDUED
				},
				data: [
					{
						value: _.get(dataNormalize, 'likes', 0),
						name: 'Кол-во лайков',
						itemStyle: {
							color: _.toInteger(_.get(dataNormalize, 'likes', 0)) === 0 && _.toInteger(_.get(dataNormalize, 'comments', 0)) === 0 ? BACKGROUND_SUBDUED : BACKGROUND_SUCCESS
						}
					},
					{
						value: _.get(dataNormalize, 'comments', 0),
						name: 'Кол-во комментов',
						itemStyle: {
							color: _.toInteger(_.get(dataNormalize, 'likes', 0)) === 0 && _.toInteger(_.get(dataNormalize, 'comments', 0)) === 0 ? BACKGROUND_SUBDUED : BACKGROUND_PRIMARY
						}
					}
				]
			}
		]
	}

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
									<b>Активный пользователь</b>
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
									Аналитика самого активного пользователя
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

export default memo(User)
