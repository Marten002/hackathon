import React, { memo, useEffect, useState, useMemo } from 'react'
import { EuiButton, EuiFlexGrid, EuiFlexGroup, EuiFlexItem, EuiTitle, EuiSearchBar, EuiFieldSearch } from '@elastic/eui'
import useEventsAllQuery from './hooks/useEventsAllQuery'
import _ from 'lodash'
import Card from './components/Card'
import { Routs } from '../../routs'
import Breadcrumbs from '../../components/Breadcrumbs'
import { useNavigate } from 'react-router-dom'
import { shallowEqual, useSelector } from 'react-redux'
import { userSuccessSelectorReselect } from '../../redux/selectors/user'
import { ADMIN_ROLE, ANALYTIC_ROLE, MANAGER_ROLE } from '../../constants/roles'
import Response from '../../extensions/Response'

const Events = () => {
	const navigate = useNavigate()
	const { data, refetch, error, isLoading } = useEventsAllQuery()
	const [search, setSearch] = useState('')
	const [searchedData, setSearchedData] = useState([])
	const userSuccess = useSelector((state) => userSuccessSelectorReselect(state), shallowEqual)

	const filteredData = useMemo(() => {
		if (_.size(data) > 0) {
			if ([ADMIN_ROLE, MANAGER_ROLE, ANALYTIC_ROLE].includes(_.get(userSuccess, 'role', ''))) {
				return data
			}

			return data.filter(item => {
				if (_.get(item, 'isPrivate', false) === false) {
					return true
				} else {
					const participants = _.get(item, 'participants', [])

					const index = participants.findIndex(item => _.get(item, 'email', '') === _.get(userSuccess, 'email', ''))

					return index >= 0
				}
			})
		}

		return []
	}, [data, userSuccess])

	const breadcrumbs = [
		{
			text: 'Мероприятия',
			href: Routs.index
		}
	]

	useEffect(() => {
		if (search !== '') {
			try {
				setSearchedData(EuiSearchBar.Query.execute(search, filteredData))
			} catch (err) {
				setSearch('')
				setSearchedData(data || [])
			}
		} else {
			setSearchedData(filteredData)
		}
	}, [search, filteredData])

	return (
		<>
			<Breadcrumbs
				breadcrumbs={breadcrumbs}
			/>
			<EuiFlexGroup gutterSize="m" direction="column">
				<EuiFlexItem>
					<EuiFlexGroup>
						<EuiFlexItem grow={true}>
							<EuiTitle size="m">
								<b>Мероприятия</b>
							</EuiTitle>
						</EuiFlexItem>
						{
							[ADMIN_ROLE, MANAGER_ROLE].includes(_.get(userSuccess, 'role', ''))
								? <EuiFlexItem grow={false}>
									<EuiButton fill={true} onClick={() => navigate(Routs.events.add.index)}>Создать</EuiButton>
								</EuiFlexItem>
								: null
						}
					</EuiFlexGroup>
				</EuiFlexItem>
				<EuiFlexItem>
					<EuiFieldSearch
						value={search}
						onChange={(event) => setSearch(event.target.value)}
						fullWidth={true}
						placeholder="Поиск..."
					/>
				</EuiFlexItem>
				<EuiFlexItem className="min-h-400px">
					<Response
						data={null}
						error={error}
						isLoading={isLoading}
						isSmall={true}
						callback={null}
					>
						<EuiFlexGrid columns={2} gutterSize="m">
							{
								_.size(data) > 0
									? searchedData.map((item, i) => {
											return (
												<EuiFlexItem key={_.get(item, 'uuid', i)}>
													<Card data={item} refetch={refetch} />
												</EuiFlexItem>
											)
										}
									)
									: null
							}
						</EuiFlexGrid>
					</Response>
				</EuiFlexItem>
			</EuiFlexGroup>
		</>
	)
}

export default memo(Events)
