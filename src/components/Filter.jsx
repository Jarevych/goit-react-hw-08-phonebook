import React from 'react';
import { useDispatch } from "react-redux";
import { filterContact } from '../redux/filterSlice';

export default function Filter() {
  const dispatch = useDispatch();
  console.log()
  return (
    <label>
      Filter
      <input
        type="search"
        name="filter"
        onInput={event => dispatch(filterContact(event.target.value.toLowerCase()))}      />
    </label>
  );
}
