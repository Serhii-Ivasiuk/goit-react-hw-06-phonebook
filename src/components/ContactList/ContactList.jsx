// Libs
import React from 'react';

export const ContactList = ({ data }) => {
  return data.map(({ id, name, number }) => {
    return (
      <li key={id}>
        {name}: {number}
      </li>
    );
  });
};
