// Libs
import React from 'react';
// React components
import { ContactListItem } from 'components/ContactListItem/ContactListItem';

export const ContactList = ({ data, onRemoveContact }) => {
  return (
    <ul>
      {data.map(({ id, name, number }) => {
        return (
          <ContactListItem
            key={id}
            id={id}
            contactName={name}
            contactNumber={number}
            onClick={() => onRemoveContact(id)}
          />
        );
      })}
    </ul>
  );
};
