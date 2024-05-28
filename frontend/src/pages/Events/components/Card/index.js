import React, { memo } from 'react'
import { EuiBadge, EuiButton, EuiFlexGroup, EuiFlexItem, EuiIcon, EuiPanel, EuiText } from '@elastic/eui'
import _ from 'lodash'
import { COLOR_DANGER, COLOR_PRIMARY, COLOR_WARNING } from '../../../../constants/colors'
import { useNavigate } from 'react-router-dom'
import { Routs } from '../../../../routs'
import ParticipateButton from './components/ParticipateButton'

const Card = ({ data, refetch }) => {
	const navigate = useNavigate()

    return (
	<>
		<EuiPanel grow={false} hasShadow={false} hasBorder={true} className="h-100p">
			<EuiFlexGroup direction="column" gutterSize="s">
				<EuiFlexItem grow={false}>
					<EuiFlexGroup alignItems="center" justifyContent="spaceBetween">
						<EuiFlexItem>
							<EuiText size="m">
								<b>{_.get(data, 'title', '')}</b>
							</EuiText>
						</EuiFlexItem>
						{
							_.get(data, 'isPrivate', false)
								? <EuiFlexGroup alignItems="center" gutterSize="s" justifyContent="flexEnd">
									<EuiFlexItem grow={false}>
										<EuiIcon
											type="lock"
											size="s"
											color={COLOR_WARNING}
										/>
									</EuiFlexItem>
									<EuiFlexItem grow={false}>
										<EuiText size="s" color={COLOR_WARNING}>Private</EuiText>
									</EuiFlexItem>
								</EuiFlexGroup>
								: null
						}
					</EuiFlexGroup>

				</EuiFlexItem>
				<EuiFlexItem>
					<EuiFlexGroup alignItems="center" justifyContent="flexStart" gutterSize="s">
						{
							_.size(_.get(data, 'tags', [])) > 0
								? _.get(data, 'tags', []).map(item => (
									<EuiFlexItem key={item} grow={false}>
										<EuiBadge key={item}>
											{item}
										</EuiBadge>
									</EuiFlexItem>
								))
								: null
						}
					</EuiFlexGroup>
				</EuiFlexItem>
				<EuiFlexItem grow={true}>
					<EuiText size="s">
						{_.truncate(_.get(data, 'description', ''), { length: 50 })}
					</EuiText>
				</EuiFlexItem>
				<EuiFlexItem grow={false}>
					<EuiFlexGroup justifyContent="spaceBetween">
						<EuiFlexItem grow={false}>
							<EuiFlexGroup gutterSize="m">
								<EuiFlexItem>
									<EuiFlexGroup alignItems="center" gutterSize="s">
										<EuiFlexItem>
											<EuiIcon
												type="userAvatar"
											/>
										</EuiFlexItem>
										<EuiFlexItem>
											<EuiText size="s">
												{_.size(_.get(data, 'participants', []))}
											</EuiText>
										</EuiFlexItem>
									</EuiFlexGroup>
								</EuiFlexItem>
								<EuiFlexItem>
									<EuiFlexGroup alignItems="center" gutterSize="s">
										<EuiFlexItem>
											<EuiIcon
												type="heart"
												color={COLOR_DANGER}
											/>
										</EuiFlexItem>
										<EuiFlexItem>
											<EuiText size="s" color={COLOR_DANGER}>
												{_.size(_.get(data, 'likes', []))}
											</EuiText>
										</EuiFlexItem>
									</EuiFlexGroup>
								</EuiFlexItem>
								<EuiFlexItem>
									<EuiFlexGroup alignItems="center" gutterSize="s">
										<EuiFlexItem>
											<EuiIcon
												type="editorComment"
												color={COLOR_PRIMARY}
											/>
										</EuiFlexItem>
										<EuiFlexItem>
											<EuiText size="s" color={COLOR_PRIMARY}>
												{_.size(_.get(data, 'comments', []))}
											</EuiText>
										</EuiFlexItem>
									</EuiFlexGroup>
								</EuiFlexItem>
							</EuiFlexGroup>
						</EuiFlexItem>
						<EuiFlexItem grow={false}>
							<EuiFlexGroup gutterSize="s" alignItems="center">
								<EuiFlexItem>
									<ParticipateButton config={data} refetch={refetch} />
								</EuiFlexItem>
								<EuiFlexItem>
									<EuiButton size="s" onClick={() => navigate(`${Routs.events.edit.path}/${_.get(data, 'uuid', '')}`)}>Открыть</EuiButton>
								</EuiFlexItem>
							</EuiFlexGroup>
						</EuiFlexItem>
					</EuiFlexGroup>
				</EuiFlexItem>
			</EuiFlexGroup>

		</EuiPanel>
	</>
    )
}

export default memo(Card)