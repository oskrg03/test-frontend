import React, { createContext, useContext, useEffect, useState } from 'react';

import { useAuth } from './AuthContext';
import axios from 'axios';
import { useToast } from './ToastContext';

const DataContext = createContext();
const API_URL = import.meta.env.VITE_POSTS_API_URL;

export const DataProvider = ({ children }) => {
    const [posts, setPosts] = useState([]);
    const { jwt } = useAuth();
    const { showToast } = useToast();

    const createPost = async (content) => {
        try {
            const res = await axios.post(
                `${API_URL}/posts`,
                { content },
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                }
            );

            // Si la API devuelve el post creado, lo agregamos directamente
            if (res.data) {
                showToast('¡Publicación creada!', 'success');
            } else {
                showToast('Error al crear la publicación', 'error');
            }
        } catch (error) {
            console.error(error);
            showToast(error.response?.data?.message || 'Error inesperado', 'error');
        }
    };

    const fetchPosts = async () => {
        try {
            const res = await axios.get(`${API_URL}/posts`, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            });
            if (!res) {
                showToast('Error al obtener posts:', 'error');
            }

            const updatedPosts = res.data.map(post => ({
                ...post,
                likeCount: post.likes.length,
            }));
            setPosts(updatedPosts);
        } catch (error) {
            showToast(error.response.data.message || 'Error inesperado', 'error');
        }
    };

    useEffect(() => {
        if (jwt) {
            fetchPosts();
        }
    }, [jwt]);

    const likePost = async (id, likedPosts) => {
        try {
            const res = await axios.post(`${API_URL}/posts/${id}/like`, null, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            });

            if (res.data !== true) {
                showToast('No se pudo dar like', 'error');
            }

            setPosts(prevPosts =>
                prevPosts.map(post =>
                    post.id === id
                        ? {
                            ...post,
                            likeCount: likedPosts.includes(id)
                                ? post.likeCount - 1
                                : post.likeCount + 1,
                        }
                        : post
                )
            );

            return res.data;
        } catch (error) {
            showToast(
                error.response?.data?.message || error.message || 'Error al dar like',
                'error'
            );
        }
    };

    return (
        <DataContext.Provider value={{ posts, fetchPosts, createPost, likePost }}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => useContext(DataContext);