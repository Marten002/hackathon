import React, { memo, useCallback, useMemo, useState } from 'react'
import { EuiButton, EuiCallOut, EuiFlexGroup, EuiFlexItem, EuiInMemoryTable, EuiText, EuiTitle } from '@elastic/eui'
import { COLOR_DANGER, COLOR_DEFAULT, COLOR_WARNING } from '../../constants/colors'
import Breadcrumbs from '../../components/Breadcrumbs'
import { Routs } from '../../routs'
import _ from 'lodash'
import Response from '../../extensions/Response'
import useUsersAllQuery from './hooks/useUsersAllQuery'
import useUsersNormalize from './hooks/useUsersNormalize'
import Modal from './components/Modal'
import { v4 as uuidv4 } from 'uuid'
import Many from './components/Many'


const UserRemove = () => {

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
			text: 'Удаление пользователя',
			href: Routs.project.user.remove.index
		}
	]

	const {
		isLoading,
		data,
		error
	} = useUsersAllQuery()

	const dataNormalize = useUsersNormalize(data)

	const [item, setItem] = useState(null)

	const [isOpenModal, setIsOpenModal] = useState(false)

	const handleSetIsOpenModal = useCallback((item) => {
		setIsOpenModal((prevState) => !prevState)
		setItem(item)
	}, [])

	const handleCallbackModal = useCallback(() => {
		setIsOpenModal(false)
		setItem(null)
	}, [])

	const [isOpenMany, setIsOpenMany] = useState(false)

	const handleSetIsOpenMany = useCallback(() => {
		setIsOpenMany((prevState) => !prevState)
	}, [])

	const handleCallbackMany = useCallback(() => {
		setIsOpenMany(false)
		setSelections([])
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
						name: 'Delete',
						description: 'Удалить',
						type: 'icon',
						icon: 'trash',
						color: COLOR_DANGER,
						onClick: (item) => {
							handleSetIsOpenModal(item)
						}
					}
				]
			}
		]
	}, [])

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

	const [selections, setSelections] = useState([])

	const handleSetSelections = useCallback((value) => {
		setSelections(value)
	}, [])

	const selection = useMemo(() => {
		return {
			selectable: (item) => _.get(item, 'role', '') !== 'admin',
			onSelectionChange: (value) => handleSetSelections(value),
			initialSelected: selections
		}
	}, [selections])

	const search = useMemo(() => {
		return {
			box: {
				incremental: true,
				schema: true,
				placeholder: 'Поиск...',
				compressed: false
			},
			toolsRight: [
				<EuiButton
					key={uuidv4()}
					aria-label="remove"
					color={COLOR_DANGER}
					size="m"
					iconType={null}
					iconSide={null}
					fill={false}
					fullWidth={true}
					isDisabled={_.toInteger(_.size(selections)) <= 0}
					isLoading={false}
					onClick={handleSetIsOpenMany}
					className={null}
					data-test-subj={null}
				>
					Удаление
				</EuiButton>
			]
		}
	}, [selections])

	const selectionsMemoize = useMemo(() => {
		return selections
	}, [selections])

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
								<b>Удаление пользователя</b>
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
								Удаление пользователя зарегистрированного на платформе
							</EuiText>
						</EuiFlexItem>
					</EuiFlexGroup>
				</EuiFlexItem>
				<EuiFlexItem>
					<EuiCallOut
						title="Обратите внимание, удаление пользователей с ролью admin невозможно"
						color={COLOR_WARNING}
						iconType="alert"
						size="m"
					/>
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
							selection={selection}
							isExpandable={false}
							isSelectable={true}
							hasActions={true}
							compressed={false}
						/>
					</Response>
				</EuiFlexItem>
			</EuiFlexGroup>
			{
				isOpenModal
					? <>
						<Modal
							item={itemMemoize}
							callback={handleCallbackModal}
						/>
					</>
					: null
			}
			{
				isOpenMany
					? <>
						<Many
							selections={selectionsMemoize}
							callback={handleCallbackMany}
						/>
					</>
					: null
			}
		</>
	)
}

export default memo(UserRemove)
