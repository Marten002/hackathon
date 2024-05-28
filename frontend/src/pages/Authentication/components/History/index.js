import React, { memo, useCallback, useMemo, useState } from 'react'
import { EuiFlexGroup, EuiFlexItem, EuiInMemoryTable, EuiPanel, EuiText, EuiTitle } from '@elastic/eui'
import _ from 'lodash'

import { COLOR_DEFAULT } from '../../../../constants/colors'

const History = () => {
	const columns = useMemo(() => {
		return [
			{
				field: 'date',
				name: 'ДАТА',
				truncateText: true,
				sortable: true,
				width: 200
			},
			{
				field: 'ip',
				name: 'IP',
				sortable: true,
				truncateText: true,
				width: 200
			},
			{
				field: 'agent',
				name: 'АГЕНТ',
				sortable: true,
				truncateText: false
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
			<EuiPanel paddingSize="m" hasShadow={false} hasBorder={true}>
				<EuiFlexGroup gutterSize="m" direction="column">
					<EuiFlexItem>
						<EuiFlexGroup gutterSize="xs" direction="column">
							<EuiFlexItem>
								<EuiTitle size="m">
									<b>История авторизаций</b>
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
									История авторизаций пользователя на всех устройствах
								</EuiText>
							</EuiFlexItem>
						</EuiFlexGroup>
					</EuiFlexItem>
					<EuiFlexItem>
						<EuiInMemoryTable
							tableCaption="history"
							items={[]}
							itemId="id"
							noItemsMessage="История сессий пользователя не найдены"
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
					</EuiFlexItem>
				</EuiFlexGroup>
			</EuiPanel>
		</>
	)
}

export default memo(History)
