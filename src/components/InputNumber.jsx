import React from 'react';

export default function InputNumber({ number, onChange }) {
  return (
    <label>
      Number
      <input
        type="text"
        name="number"
        value={number}
        pattern="\+?[0-9\s\-\(\)]+"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
        onChange={event => onChange(event.target.value)}
      />
    </label>
  );
}
