import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const PublicRoute = ({ children }) => {
    const { jwt, loading } = useAuth();

    if (loading) return null;

    return jwt ? <Navigate to="/posts" replace /> : children;
};

export default PublicRoute;
