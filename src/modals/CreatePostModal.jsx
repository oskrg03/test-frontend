import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import React, { useState } from 'react';

const CreatePostModal = ({ open, onClose, onPublish }) => {
    const [newContent, setNewContent] = useState('');

    const handleCreatePost = () => {
        if (newContent.trim()) {
            onPublish(newContent);
            setNewContent('');
            onClose();
        }
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth>
            <DialogTitle sx={{ backgroundColor: '#1a1a1a', color: '#fff', fontWeight: '500' }}>Crear Publicación</DialogTitle>
            <DialogContent sx={{ backgroundColor: '#1a1a1a', color: '#fff' }}>
                <TextField
                    fullWidth
                    multiline
                    rows={6}
                    value={newContent}
                    onChange={(e) => setNewContent(e.target.value)}
                    placeholder="¿Qué estás pensando?"
                    InputProps={{
                        sx: {
                            color: '#fff',
                            '&::placeholder': {
                                color: '#aaa',
                            },
                            border: '1px solid gray'
                        },
                    }}
                />
            </DialogContent>
            <DialogActions sx={{ backgroundColor: '#1a1a1a' }}>
                <Button sx={{
                    color: '#fff !important',
                    '&:hover': {
                        backgroundColor: '#444', // fondo gris al hacer hover
                    },
                }} onClick={onClose}>Cancelar</Button>
                <Button sx={{
                    color: '#fff !important',
                    '&:hover': {
                        backgroundColor: '#444', // fondo gris al hacer hover
                    },
                }} onClick={handleCreatePost}>Publicar</Button>
            </DialogActions>
        </Dialog >
    );
};

export default CreatePostModal;
