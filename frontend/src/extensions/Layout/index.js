import React from 'react'
import { EuiFlexGroup, EuiFlexItem, EuiPage, EuiPanel } from '@elastic/eui'

import Header from '../../widgets/Header'
import Sidebar from '../../widgets/Sidebar'
import Footer from '../../widgets/Footer'

import classes from './index.module.scss'

const Layout = ({ children }) => {
	return (
		<>
			<EuiPage paddingSize="m">
				<EuiFlexGroup gutterSize="m" direction="column" justifyContent="flexStart" className="h-100p">
					<EuiFlexItem grow={false}>
						<Header/>
					</EuiFlexItem>
					<EuiFlexItem grow={true}>
						<EuiPanel paddingSize="none" grow={false}>
							<EuiFlexGroup>
								<EuiFlexItem grow={false} className={classes.sidebar}>
									<Sidebar/>
								</EuiFlexItem>
								<EuiFlexItem>
									<EuiPanel paddingSize="l" hasBorder={false} hasShadow={false}>
										{children}
									</EuiPanel>
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

export default Layout
