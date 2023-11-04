import { useSelector } from "react-redux";
import { Navigate } from 'react-router-dom';


const PublicRoute = ({children, redirectTo = '/login'}) => {
    const authentificated = useSelector(state => state.auth.authentification);
    return authentificated ?  <Navigate to={redirectTo}/> : children; 
}

export default PublicRoute;