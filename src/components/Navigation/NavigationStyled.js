import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const StyledAppHeader = styled.div`
  // display: flex;
  // flex-direction: row;

  // position: relative;
  // padding: 0 20px 20px 20px;
  width: 100%;
  box-shadow: 0 5px 10px gray;
  .header-nav {
    display: flex;
    gap: 40px;
    justify-content: space-between;
    font-size: 24px;
    // background-color: rgb(129 129 129);
  }
  .active {
    color: red;
  }
  .active::after {
    content: '';
    display: flex;
    height: 3px;
    background-color: red;
  }
`;
export const StyledNavLink = styled(NavLink)`
  // border: 1px solid #b3b3ef;
  // height: 50px;
  padding: 5px 15px;
  border-radius: 5px;
  text-decoration: none;
  // background-color: #b3b3ef;
  font-weight: 700;   
  line-height: 1.15;.
  &:hover {
    background-color: #9393da;
    border-color: #9393da;    
  }
  &:focus {
    background-color: #9393da;
    border-color: #9393da;
  }
`;
