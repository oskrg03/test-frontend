import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Avatar, Box, Container, Grid, TextField, Typography } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';

const ProfilePage = () => {
    const { getProfile } = useAuth();
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const data = await getProfile();
                setProfile(data);
            } catch (error) {
                console.error(error.message);
            }
        };

        fetchProfile();
    }, []);

    if (!profile) return <Grid><Typography>Error al cargar el perfil.</Typography></Grid>;
    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap={2}
            maxWidth={400}
            margin="auto"
            mt={4}
        >
            <Avatar sx={{ width: 90, height: 90 }} src={profile.profile.avatar || undefined}>
                {!profile.profile.Avatar && profile.profile.name?.charAt(0).toUpperCase()}
            </Avatar>

            <TextField
                label="Nombre"
                value={profile.profile.name}
                InputProps={{
                    readOnly: true,
                    sx: {
                        color: '#fff', // color del texto
                        '& .MuiInputBase-input.Mui-disabled': {
                            WebkitTextFillColor: '#ddd', // color del texto cuando está deshabilitado
                        },
                        border: '1px solid gray',
                        backgroundColor: '#1a1a1a'
                    },
                }}
                fullWidth
                disabled
            />
            <TextField
                label="Correo electrónico"
                value={profile.email}
                InputProps={{
                    readOnly: true,
                    sx: {
                        color: '#fff', // color del texto
                        '& .MuiInputBase-input.Mui-disabled': {
                            WebkitTextFillColor: '#ddd', // color del texto cuando está deshabilitado
                        },
                        border: '1px solid gray',
                        backgroundColor: '#1a1a1a'
                    },
                }}
                fullWidth
                disabled
            />
        </Box>
    );

};

export default ProfilePage;