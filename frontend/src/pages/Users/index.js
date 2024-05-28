import React, { memo, useCallback, useMemo, useState } from 'react'
import { Routs } from '../../routs'
import Breadcrumbs from '../../components/Breadcrumbs'
import { EuiFlexGroup, EuiFlexItem, EuiInMemoryTable, EuiText, EuiTitle } from '@elastic/eui'
import { COLOR_DEFAULT } from '../../constants/colors'
import _ from 'lodash'
import useUsersAllQuery from './hooks/useUsersAllQuery'
import useUsersNormalize from './hooks/useUsersNormalize'

import Response from '../../extensions/Response'

const Users = () => {
	const breadcrumbs = [
		{
			text: 'Мероприятия',
			href: Routs.index
		},
		{
			text: 'Пользователи',
			href: Routs.users.index
		}
	]

	const {
		isLoading,
		data,
		error
	} = useUsersAllQuery()

	const dataNormalize = useUsersNormalize(data)

	const columns = useMemo(() => {
		return [
			{
				field: 'username',
				name: 'Имя',
				truncateText: true,
				sortable: true,
				width: 150
			},
			{
				field: 'createdAt',
				name: 'Дата создания',
				truncateText: true,
				sortable: true,
				width: 250
			},
			{
				field: 'updatedAt',
				name: 'Дата обновления',
				truncateText: true,
				sortable: true,
				width: 250
			},
			{
				field: 'role',
				name: 'Роль',
				truncateText: true,
				sortable: true,
				width: 150
			},
			{
				field: 'isTwoFactorAuth',
				name: '2FA',
				truncateText: true,
				sortable: true,
				width: 50
			}
		]
	}, [])

	const search = {
		box: {
			incremental: true,
			schema: true,
			placeholder: 'Поиск...',
			compressed: true
		}
	}

	const sorting = useMemo(() => {
		return {
			sort: {
				field: 'name',
				direction: 'asc'
			}
		}
	}, [])

	const [pagination, setPagination] = useState({
		pageIndex: 0,
		pageSize: 10,
		totalItemCount: _.toInteger(_.size([])),
		pageSizeOptions: [10, 20, 50, 100, 200, 500, 1000]
	})

	const handleSetPagination = useCallback((data) => {
		setPagination({
			...pagination,
			pageIndex: _.get(data, 'page.index', 0),
			pageSize: _.get(data, 'page.size', 10)
		})
	}, [])

	return (
		<>
			<Breadcrumbs
				breadcrumbs={breadcrumbs}
			/>
			<EuiFlexGroup gutterSize="m" direction="column">
				<EuiFlexItem>
					<EuiFlexGroup gutterSize="xs" direction="column">
						<EuiFlexItem>
							<EuiTitle size="m">
								<b>Пользователи</b>
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
								Все пользователи платформы
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
						<EuiInMemoryTable
							tableCaption="users"
							items={dataNormalize}
							itemId="uuid"
							noItemsMessage="Пользователи не найдены"
							columns={columns}
							search={search}
							sorting={sorting}
							loading={false}
							onTableChange={handleSetPagination}
							pagination={pagination}
							itemIdToExpandedRowMap={{}}
							rowProps={null}
							selection={null}
							isExpandable={false}
							isSelectable={false}
							hasActions={false}
							compressed={false}
						/>
					</Response>
				</EuiFlexItem>
			</EuiFlexGroup>
		</>
	)
}

export default memo(Users)
