import React, { useEffect } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Button, Typography, Box, IconButton, Tooltip } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';

const Layout = () => {
    const { jwt, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <>
            <AppBar position="static" sx={{
                backgroundColor: '#000', color: '#fff',
                borderBottom: '1px solid #333',
            }}>
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>

                    </Typography>
                    {jwt && (
                        <>

                            <Tooltip title="Publicaciones">
                                <IconButton color="inherit" component={Link} to="/posts">
                                    <Box display="flex" alignItems="center" gap={1}>
                                        <HomeIcon />
                                        <Typography fontSize="0.9rem">Publicaciones</Typography>
                                    </Box>
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Perfil">
                                <IconButton color="inherit" component={Link} to="/profile" >
                                    <Box display="flex" alignItems="center" gap={1}>
                                        <AccountCircleIcon /> <Typography fontSize="0.9rem">Perfil</Typography>
                                    </Box>
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Salir">
                                <IconButton color="inherit" onClick={handleLogout}>

                                    <Box display="flex" alignItems="center" gap={1}>
                                        <LogoutIcon /> <Typography fontSize="0.9rem">Salir</Typography>
                                    </Box>
                                </IconButton>
                            </Tooltip>
                        </>
                    )}
                </Toolbar>
            </AppBar>
            <Box sx={{ padding: 2 }}>
                <Outlet />
            </Box>
        </>
    );
};

export default Layout;
