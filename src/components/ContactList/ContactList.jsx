// Libs
import React from 'react';

export const ContactList = ({ data, onRemoveContact }) => {
  return (
    <ul>
      {data.map(({ id, name, number }) => {
        return (
          <li key={id}>
            <span>
              {name}: {number}
            </span>
            <button type="button" onClick={() => onRemoveContact(id)}>
              Remove
            </button>
          </li>
        );
      })}
    </ul>
  );
};
