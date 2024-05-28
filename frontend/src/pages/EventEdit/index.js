import React, { memo, useCallback, useMemo, useState } from 'react'
import './index.scss'
import { useParams } from 'react-router-dom'
import { Routs } from '../../routs'
import Breadcrumbs from '../../components/Breadcrumbs'
import useTabs from './hooks/useTabs/useTabs'
import { EuiSpacer, EuiTab, EuiTabs } from '@elastic/eui'
import _ from 'lodash'
import useEventQuery from './hooks/useEventQuery'

const EventEdit = () => {
	const { id } = useParams()
	const { data, refetch } = useEventQuery({ query: { id: id } })
	const tabs = useTabs(data, refetch)
	const [selectedTabId, setSelectedTabId] = useState('info')
	const handleTabChange = useCallback((id) => () => setSelectedTabId(id), [])
	const selectedTabContent = useMemo(
		() => tabs.find((tab) => _.get(tab, 'id', 'info') === selectedTabId)?.content,
		[selectedTabId, data]
	)

	const breadcrumbs = [
		{
			text: 'Мероприятия',
			href: Routs.index
		},
		{
			text: `Просмотр мероприятия ${_.get(data, 'title', '')}`,
			href: `${Routs.events.edit.path}/${id}`
		}
	]

	return (
		<>
			<Breadcrumbs
				breadcrumbs={breadcrumbs}
			/>
			<EuiTabs style={{ width: '100%', borderRight: 'none' }}>
				{
					tabs.map((tab) => (
						<EuiTab
							key={tab.id}
							onClick={handleTabChange(tab.id)}
							isSelected={tab.id === selectedTabId}
						>
							{tab.name}
						</EuiTab>
					))
				}
			</EuiTabs>
			<EuiSpacer size="m"/>
			{selectedTabContent}
		</>
	)
}

export default memo(EventEdit)
