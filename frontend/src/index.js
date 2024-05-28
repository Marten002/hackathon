import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { EuiProvider } from '@elastic/eui'
import { Provider } from 'react-redux'

import App from './App'

import store from './redux'

import './i18n'
import './index.scss'
import './scss/_helpers.scss'

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchInterval: 5 * 1000,
			refetchIntervalInBackground: false,
			refetchOnMount: 'always'
		},
		mutations: {
			retry: false
		}
	}
})

const container = document.getElementById('root')

if (container === null) {
	throw new Error('Root container is not found')
}

const root = createRoot(container)

root.render(
	<BrowserRouter>
		<QueryClientProvider client={queryClient}>
			<Provider store={store}>
				<EuiProvider>
					<App/>
				</EuiProvider>
			</Provider>
		</QueryClientProvider>
	</BrowserRouter>
)
