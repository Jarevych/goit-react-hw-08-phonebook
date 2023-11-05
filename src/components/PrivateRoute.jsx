import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, redirectTo = '/contacts' }) => {
  const authentificated = useSelector(state => state.auth.authentification);
  return authentificated ? children : <Navigate to={redirectTo} replace />;
};

export default PrivateRoute;
