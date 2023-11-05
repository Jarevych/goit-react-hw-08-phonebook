import React from 'react';
// import { useRef } from "react";
import { useSelector } from 'react-redux';
// import { ToastContainer } from 'react-toastify';

export default function UserMenu({ onClick }) {
  const user = useSelector(state => state.auth.user);
  console.log(user);
  return (
    <div className='user-menu'>
      <span className='user-email'>{user.email}</span>
      <button type="button" onClick={onClick}>
        Logout
      </button>
    </div>
  );
}
