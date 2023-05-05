// Libs
import React from 'react';

export const ContactListItem = ({ contactName, contactNumber, onClick }) => {
  return (
    <li>
      <span>
        {contactName}: {contactNumber}
      </span>
      <button type="button" onClick={onClick}>
        Remove
      </button>
    </li>
  );
};
