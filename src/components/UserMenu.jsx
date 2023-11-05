import React from "react";
// import { useRef } from "react";
import { useSelector } from "react-redux";

export default function UserMenu( {onClick} ) {
    const user = useSelector((state) => state.auth.user);
        console.log(user)
    return (
        <div>
        <p>`{user}`</p>
        <button type="button" onClick={onClick}>Logout</button>
      </div>
    )
}