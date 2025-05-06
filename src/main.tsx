import {StrictMode} from 'react'
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App';
import Landing from './pages/landing/Landing';
import Login from './pages/Login';
import PrivateRoute from './components/PrivateRoute';
import LaunchDetail from './pages/LaunchDetail';
import LaunchesList from './pages/LaunchesList';

export const routes = [
	{
		path: '/',
		element: <App />,
		children: [
			{
				path: '/',
				element: <Landing />
			},
			{
				path:'/login',
				element: <Login />
			},
			{
				path:'/launches',
				element:<PrivateRoute><LaunchesList /></PrivateRoute>
			},
			{
				path:'/launches/:id',
				element:<PrivateRoute><LaunchDetail /></PrivateRoute>
			}
		]
	}
];

const router = createBrowserRouter(routes);

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			retry: false,
			cacheTime: 1000 * 60 * 15
		}
	}
});
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={router} />
		</QueryClientProvider>
	</StrictMode>
);
