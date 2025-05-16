import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Card, CardContent, Typography, TextField, Button } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async () => {
        if (email.trim() && password.trim()) {
            await login(email, password);
            navigate('/posts');
        }
    };

    return (
        <Container maxWidth="sm">
            <Card sx={{ mt: 10, backgroundColor: '#1a1a1a', boxShadow: 'none', color: '#fff' }}>
                <CardContent>
                    <Typography variant="h5">Login</Typography>
                    <TextField
                        fullWidth
                        label="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        sx={{ mt: 2 }}
                        InputProps={{
                            sx: {
                                color: '#fff',
                                backgroundColor: '#1a1a1a',
                                '& .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'gray',
                                },
                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#ccc',
                                },
                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#fff',
                                },
                            },
                        }}
                        InputLabelProps={{
                            sx: {
                                color: '#fff',
                                '&.Mui-focused': {
                                    color: '#fff',
                                },
                            },
                        }}
                    />
                    <TextField
                        fullWidth
                        label="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        sx={{ mt: 2, }}
                        InputProps={{
                            sx: {
                                color: '#fff',
                                backgroundColor: '#1a1a1a',
                                '& .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'gray',
                                },
                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#ccc',
                                },
                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#fff',
                                },
                            },
                        }}
                        InputLabelProps={{
                            sx: {
                                color: '#fff',
                                '&.Mui-focused': {
                                    color: '#fff',
                                },
                            },
                        }}
                    />
                    <Button fullWidth variant="contained" onClick={handleLogin} sx={{ mt: 2, backgroundColor: '#fff', color: '#000', fontWeight: '500' }}>
                        Login
                    </Button>
                </CardContent>
            </Card>
        </Container>
    );
};

export default LoginPage;