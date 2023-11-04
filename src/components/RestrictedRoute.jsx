import { useSelector } from "react-redux";
import { Navigate } from 'react-router-dom';


const RestrictedRoute = ({children, redirectTo = '/login'}) => {
    const authentificated = useSelector(state => state.auth.authentification);
    return authentificated ?  <Navigate to={redirectTo}/> : children; 
}

export default RestrictedRoute;