import React from 'react';
import { useSelector } from 'react-redux';
import { StyledAppHeader, StyledNavLink } from './NavigationStyled';
import { ProgressBar } from 'react-loader-spinner';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import UserMenu from 'components/UserMenu';
import { useDispatch } from 'react-redux';
import { logoutThunk } from 'redux/AuthReducer';
import { useNavigate } from 'react-router-dom';


const Navigation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logOut = () => {
    dispatch(logoutThunk());
    navigate('/login');
  };
  const logined = useSelector(state => state.auth.authentification);
  return (
    <StyledAppHeader>
      <Suspense
        fallback={
          <div className="centered">
            <ProgressBar
              height="80"
              width="80"
              ariaLabel="progress-bar-loading"
              wrapperStyle={{}}
              wrapperClass="progress-bar-wrapper"
              borderColor="#F4442E"
              barColor="#51E5FF"
            />
          </div>
        }
      >
        <nav className="header-nav">
          {logined ? (
            <>
              <StyledNavLink to="/contacts" end>
                Contacts
              </StyledNavLink>  
              <UserMenu onClick={logOut}/>

            </>
          ) : (
            <>
              <StyledNavLink to="/login" end>
                Login
              </StyledNavLink>
              <StyledNavLink to="/registration">Registration</StyledNavLink>
            </>
          )}
        </nav>
        <Outlet />
      </Suspense>
    </StyledAppHeader>
  );
};
export default Navigation;
