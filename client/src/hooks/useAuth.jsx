import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Auth from "./../services/auth";

const useAuth = () => {
    const token = Auth.checkToken();
    const navigate = useNavigate();
    useEffect(() => {
        if (token === null) {
            navigate('/login');
            window.location.reload();
        }
    }, [token, navigate]);
    return true;
}

export default useAuth;