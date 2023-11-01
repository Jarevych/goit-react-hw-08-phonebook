import React, { useState } from 'react';
import InputName from './InputName';
import InputNumber from './InputNumber';
import { useDispatch, useSelector } from 'react-redux';
import { FetchContacts, addContact } from 'redux/ApiHandler';
import { nanoid } from 'nanoid';


export default function FormInput() {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const contacts = useSelector(state => state.contacts.contacts)
  const dispatch = useDispatch();
  const contactsArr = Array.isArray(contacts) ? contacts : [];


  const handleSubmit = event => {
    event.preventDefault();
    const newContact = {  id: nanoid(), name, number };
    const contactExists = contactsArr.some((contact) => contact.name.toLowerCase() === name.toLowerCase() || contact.number === number);

        if (contactExists) {
          alert(`"${name}" is already in contacts`);
          return;
        }

      dispatch(addContact(newContact)).then(()=>{
        dispatch(FetchContacts());
      });
    setName('');
    setNumber('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <InputName name={name} onChange={setName} />
      <InputNumber number={number} onChange={setNumber} />
      <div>
        <button type="submit">Додати</button>
      </div>
    </form>
  );
}
