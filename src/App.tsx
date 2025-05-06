import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import { theme } from './theme';
import './App.scss';
import HeaderMenu from './pages/landing/Header';
import FooterCont from './pages/landing/Footer';

export default function App() {
	const { pathname } = useLocation();
    const test = localStorage.getItem('auth')
	
	useEffect(() => {
		window.scrollTo(0, 0);
		
	}, [pathname, test]);

	return (
		<MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
			<div className='wrapper'>
				<HeaderMenu />
				<Outlet />
				<FooterCont />
			</div>
		</MantineProvider>
	);
}
