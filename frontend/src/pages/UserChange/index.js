import React, { memo, useCallback, useMemo, useState } from 'react'
import { EuiFlexGroup, EuiFlexItem, EuiInMemoryTable, EuiText, EuiTitle } from '@elastic/eui'
import { COLOR_DEFAULT } from '../../constants/colors'
import Breadcrumbs from '../../components/Breadcrumbs'
import { Routs } from '../../routs'
import _ from 'lodash'
import Response from '../../extensions/Response'
import useUsersAllQuery from './hooks/useUsersAllQuery'
import useUsersNormalize from './hooks/useUsersNormalize'
import Modal from './components/Modal'

const UserChange = () => {

	const breadcrumbs = [
		{
			text: 'Мероприятия',
			href: Routs.index
		},
		{
			text: 'Управление проектом',
			href: Routs.project.index
		},
		{
			text: 'Изменение данных пользователя',
			href: Routs.project.user.change.index
		}
	]

	const {
		isLoading,
		data,
		error
	} = useUsersAllQuery()

	const dataNormalize = useUsersNormalize(data)

	const [item, setItem] = useState(null)
	const [isOpen, setIsOpen] = useState(false)

	const handleSetIsOpen = useCallback((item) => {
		setIsOpen((prevState) => !prevState)
		setItem(item)
	}, [])

	const handleCallback = useCallback(() => {
		setIsOpen(false)
		setItem(null)
	}, [])

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
			},
			{
				name: 'Действия',
				width: 100,
				actions: [
					{
						name: 'Edit',
						description: 'Изменить',
						type: 'icon',
						icon: 'pencil',
						onClick: (item) => {
							handleSetIsOpen(item)
						}
					}
				]
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

	const itemMemoize = useMemo(() => {
		return item
	}, [item])

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
								<b>Изменение данных пользователя</b>
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
								Изменение данных пользователя зарегистрированного на платформе
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
							hasActions={true}
							compressed={false}
						/>
					</Response>
				</EuiFlexItem>
			</EuiFlexGroup>
			{
				isOpen
					? <>
						<Modal
							item={itemMemoize}
							callback={handleCallback}
						/>
					</>
					: null
			}
		</>
	)
}

export default memo(UserChange)
