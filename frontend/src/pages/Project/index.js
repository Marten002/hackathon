import React, { memo } from 'react'
import { EuiCard, EuiFlexGroup, EuiFlexItem, EuiIcon, EuiPanel, EuiText, EuiTitle } from '@elastic/eui'
import { COLOR_DEFAULT, COLOR_SUBDUED } from '../../constants/colors'
import Breadcrumbs from '../../components/Breadcrumbs'
import { Routs } from '../../routs'
import { Link } from 'react-router-dom'

const Project = () => {

	const breadcrumbs = [
		{
			text: 'Мероприятия',
			href: Routs.index
		},
		{
			text: 'Управление проектом',
			href: Routs.project.index
		}
	]

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
								<b>Управление проектом</b>
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
								Изменение настроек проекта, пользователей и других доступных для изменений вещей
							</EuiText>
						</EuiFlexItem>
					</EuiFlexGroup>
				</EuiFlexItem>
				<EuiFlexItem>
					<EuiPanel paddingSize="m" hasShadow={false} hasBorder={true}>
						<EuiFlexGroup gutterSize="m" direction="column">
							<EuiFlexItem>
								<EuiTitle size="xs">
									<b>Пользователи</b>
								</EuiTitle>
							</EuiFlexItem>
							<EuiFlexItem>
								<EuiFlexGroup gutterSize="m">
									<EuiFlexItem>
										<Link to={Routs.project.user.add.index}>
											<EuiCard
												layout="horizontal"
												display={COLOR_SUBDUED}
												icon={
													<EuiIcon
														aria-label="icon-listAdd"
														type="listAdd"
														size="l"
														color={COLOR_SUBDUED}
														onClick={null}
														style={null}
														className={null}
													/>
												}
												title="Добавление"
												titleSize="xs"
												isDisabled={false}
												hasBorder={true}
												description="Добавление новых пользователей на платформу"
												onClick={null}
											/>
										</Link>
									</EuiFlexItem>
									<EuiFlexItem>
										<Link to={Routs.project.user.change.index}>
											<EuiCard
												layout="horizontal"
												display={COLOR_SUBDUED}
												icon={
													<EuiIcon
														aria-label="icon-indexEdit"
														type="indexEdit"
														size="l"
														color={COLOR_SUBDUED}
														onClick={null}
														style={null}
														className={null}
													/>
												}
												title="Изменение"
												titleSize="xs"
												isDisabled={false}
												hasBorder={true}
												description="Изменение данные текущих пользователей платформы"
												onClick={null}
											/>
										</Link>
									</EuiFlexItem>
									<EuiFlexItem>
										<Link to={Routs.project.user.remove.index}>
											<EuiCard
												layout="horizontal"
												display={COLOR_SUBDUED}
												icon={
													<EuiIcon
														aria-label="icon-trash"
														type="trash"
														size="l"
														color={COLOR_SUBDUED}
														onClick={null}
														style={null}
														className={null}
													/>
												}
												title="Удаление"
												titleSize="xs"
												isDisabled={false}
												hasBorder={true}
												description="Удаление текущих пользователей платформы"
												onClick={null}
											/>
										</Link>
									</EuiFlexItem>
								</EuiFlexGroup>
							</EuiFlexItem>
						</EuiFlexGroup>
					</EuiPanel>
				</EuiFlexItem>
			</EuiFlexGroup>
		</>
	)
}

export default memo(Project)
