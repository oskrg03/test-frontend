import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useToast } from '../contexts/ToastContext';

const AuthContext = createContext();
const API_URL = import.meta.env.VITE_AUTH_API_URL;

export const AuthProvider = ({ children }) => {
    const [jwt, setJwt] = useState(null);
    const { showToast } = useToast();

    useEffect(() => {
        const storedJwt = localStorage.getItem('jwt');
        if (storedJwt) {
            setJwt(JSON.parse(storedJwt));
        }
    }, []);

    const login = async (email, password) => {
        try {
            const res = await axios.post(`${API_URL}/auth/login`,
                {
                    'email': email,
                    'password': password,
                },
                {
                    headers: {
                        'email': email,
                        'password': password,
                    },
                }
            );
            if (!res) {
                showToast('Credenciales inválidas', 'error');
            }

            setJwt(res.data.access_token);
            localStorage.setItem('jwt', JSON.stringify(res.data.access_token));
        } catch (error) {

            showToast(error.response.data.message || 'Error inesperado', 'error');

        }
    };

    const getProfile = async () => {
        try {
            const res = await axios.get(`${API_URL}/users/profile`, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            });
            return res.data;
        } catch (error) {
            showToast(error.response.data.message || 'Error inesperado', 'error');
        }
    };

    const logout = () => { setJwt(null); localStorage.removeItem('jwt'); };

    return (
        <AuthContext.Provider value={{ jwt, login, getProfile, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);