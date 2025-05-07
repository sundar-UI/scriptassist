
import {
    Header,
    Container,
    Group,
    Burger,
    Text,
    Paper,
    Transition,
    Button
} from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { Link } from 'react-router-dom';
import { useAppStore } from '../../store/app.store';
import { useEffect } from 'react';


export default function HeaderMenu() {

    const { isAuthenticated } = useAppStore()
    const logout = useAppStore(state => state.logout)
    const links = [
        { label: 'Home', link: '/' },
        !isAuthenticated
        ? { label: 'Login', link: '/login' }
        : { label: 'Launches', link: '/launches' }
    ];
    const [opened, { toggle, close }] = useDisclosure(false);
    const isMobile = useMediaQuery('(max-width: 768px)');

    useEffect(() => {
        if (opened) {
          document.body.classList.add('menu-open');
        } else {
          document.body.classList.remove('menu-open');
        }
        return () => {
          document.body.classList.remove('menu-open');
        };
      }, [opened]);

    const handleLogout = () => {
        logout()
    }
   
    return (
        <Header height={60} px="md"  bg="black" withBorder={false}  style={{position: 'sticky' }}>
            <Container
                size="lg"
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    height: '100%',
                    justifyContent: 'space-between',
                }}
            >
                <Text fw={700} size="lg">
                    <Link to="/" style={{color:'#fff', textDecoration:'none'}}>MyBrand</Link>
                </Text>
                {!isMobile && (
                    <Group spacing="md">
                        {links.map((item) => (
                            <Link key={item.label} to={item.link} style={{ textDecoration: 'none', color: '#fff' }}>{item.label}</Link>
                        ))}
                        {isAuthenticated && <Button onClick={handleLogout}>Logout</Button>}
                    </Group>
                )}
                {isMobile && <Burger color={opened ? "#000" : '#fff'}  style={{ zIndex: 1000 }} opened={opened} onClick={toggle} />}
                {isMobile && (
                    <Transition transition="pop-top-right" duration={200} mounted={opened}>
                        {(styles) => (
                            <Paper
                            withBorder
                            p="md"
                            style={{
                              ...styles,
                              position: 'absolute',
                              top: 0,
                              right: 0,
                              zIndex: 10,
                              height: '100vh',
                              width:'200px'
                            }}
                          >
                                {links.map((item) => (
                                    <Link key={item.label} to={item.link} style={{display: 'block', width:"auto", textDecoration: 'none', color: '#000' }}>{item.label}</Link>
                                ))}
                            </Paper>
                        )}
                    </Transition>
                )}
            </Container>
        </Header>
    );
}
