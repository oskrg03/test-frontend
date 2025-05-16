// src/pages/PostsPage.jsx
import { useData } from '../contexts/DataContext';
import {
    Card, CardContent,
    IconButton, Typography,
    Box,
    Button
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useEffect, useState } from 'react';
import CreatePostModal from '../modals/CreatePostModal';

import { getTimeAgoShort } from '../utils/common';

const PostsPage = () => {
    const { posts, likePost, createPost } = useData();
    const [likedPosts, setLikedPosts] = useState([]);
    const [openModal, setOpenModal] = useState(false);

    const handleLike = async (postId) => {
        try {
            if (likedPosts.includes(postId)) {
                setLikedPosts((prev) => prev.filter((id) => id !== postId));
                await likePost(postId, likedPosts);
            } else {
                setLikedPosts((prev) => [...prev, postId]);
                await likePost(postId, likedPosts);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handlePublish = (content) => {
        createPost(content);
    };

    useEffect(() => {
        if (!posts) return;

        const likedIds = posts
            .filter(post => post.likeCount > 0)
            .map(post => post.id);

        setLikedPosts(likedIds);
    }, [posts]);


    return (
        <><Box
            sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center',
                mb: 2,
            }}
        >
            <Button
                variant="contained"
                sx={{
                    borderRadius: '20px',
                    fontWeight: '500',
                    backgroundColor: '#fff',
                    color: '#000'
                }}
                onClick={() => setOpenModal(true)}
            >
                Crear publicación
            </Button>
        </Box>

            <CreatePostModal
                open={openModal}
                onClose={() => setOpenModal(false)}
                onPublish={handlePublish}
            />

            <Box
                sx={{
                    columnCount: [1, 2, 3],
                    columnGap: '1rem',
                    padding: '1rem',
                    boxShadow: 'none !important',
                }}
            >
                {posts.map((post, index) => (
                    <Box
                        key={index}
                        sx={{
                            breakInside: 'avoid',
                            marginBottom: '1rem',
                            borderRadius: 2,
                            boxShadow: 'none !important',
                            backgroundColor: '#000',
                            overflow: 'hidden',
                            '&:hover .like-button': {
                                visibility: 'visible',
                            }
                        }}
                    >
                        <Card sx={{ backgroundColor: '#1a1a1a', boxShadow: 'none', color: '#fff' }}>
                            <Box sx={{ padding: ' 5px 15px' }} display={'flex'} justifyContent={'flex-end'} margin={'5px'}>
                                <Typography variant="caption" color="#aaa" >
                                    {getTimeAgoShort(post.createdAt)}
                                </Typography>
                            </Box>
                            <CardContent sx={{ padding: '5px 15px' }}>
                                <Typography variant="body1" gutterBottom>
                                    {post.content}
                                </Typography>
                                <Box display="flex" alignItems="center" justifyContent="end" gap={1}>
                                    <IconButton
                                        className="like-button"
                                        aria-label="like"
                                        onClick={() => handleLike(post.id)}
                                        sx={{
                                            visibility: 'visible',
                                            color: post.likeCount > 0 || likedPosts.includes(post.id) ? 'error.main' : 'gray',
                                            transition: 'visibility 0.2s ease-in-out',
                                            border: '1px gray solid',
                                            borderRadius: '25px',
                                            padding: ' 5px 12px',
                                            ":hover": {
                                                border: '1px gray solid',
                                            }
                                        }}
                                    >
                                        <FavoriteIcon />
                                        {post.likeCount > 0 && <Typography color='black' variant="caption" sx={{ fontWeight: '600', marginLeft: '5px', color: '#fff' }}>{post.likeCount}</Typography>}

                                    </IconButton>
                                </Box>
                            </CardContent>
                        </Card>
                    </Box>
                ))}
            </Box>
        </>
    );
};


export default PostsPage;
