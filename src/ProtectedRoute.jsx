import { useEffect } from 'react';
import { useNavigate } from 'react-router';

const ProtectedRoute = ({ children }) => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!token) {
            navigate('/login');
        }
    }, [navigate]);

    // Se há token, renderiza o componente filho
    const token = localStorage.getItem('token');

    if (!token) {
        return null; // ou um componente de loading
    }

    return children;
};

export default ProtectedRoute;