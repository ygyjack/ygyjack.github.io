import { useNavigate } from 'react-router-dom';
import Auth from "./auth";
import Toaster from "./../components/ui/toastify";


export default function ApiIssue(err) {
    console.warn("ERR", err);
    const navigate = useNavigate();
    if (err === "Unauthorized" || err === "Network Error") {
        Auth.logout();
        navigate('/login', { replace: true });
        window.location.reload();
    } else {
        Toaster.error(err);
    }
}
