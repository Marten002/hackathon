import React, { memo } from 'react'
import { EuiFlexGroup, EuiFlexItem, EuiPage, EuiPanel, EuiText, EuiTitle } from '@elastic/eui'
import { COLOR_SUBDUED } from '../../constants/colors'
import Footer from '../../widgets/Footer'
import Logo from '../../components/Logo'

const Forbidden = () => {
	return (
		<>
			<EuiPage paddingSize="m" className="fs-h">
				<EuiFlexGroup gutterSize="m" direction="column" justifyContent="flexStart" className="h-100p">
					<EuiFlexItem grow={false}>
						<Logo/>
					</EuiFlexItem>
					<EuiFlexItem grow={true}>
						<EuiPanel paddingSize="l" grow={false}>
							<EuiFlexGroup gutterSize="m" direction="column">
								<EuiFlexItem>
									<EuiTitle size="m">
										<b>Ошибка доступа</b>
									</EuiTitle>
								</EuiFlexItem>
								<EuiFlexItem>
									<EuiText
										size="m"
										color={COLOR_SUBDUED}
										grow={false}
										onClick={null}
										className={null}
										style={null}
									>
										Информируем вас о том что доступ к данной странице закрыт, исходи из вашего
										ролевого доступа.
										Если это произошло по-ошибке, свяжитесь пожалуйста с вашим администратор
									</EuiText>
								</EuiFlexItem>
							</EuiFlexGroup>
						</EuiPanel>
					</EuiFlexItem>
					<EuiFlexItem grow={false}>
						<Footer/>
					</EuiFlexItem>
				</EuiFlexGroup>
			</EuiPage>
		</>
	)
}

export default memo(Forbidden)
