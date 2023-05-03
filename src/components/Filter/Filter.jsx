// Libs
import React from 'react';

export const Filter = ({ value, onChange }) => {
  return (
    <label>
      Find contscts by name
      <input
        type="text"
        name="filter"
        title="Please enter a name to find your contacts"
        value={value}
        onChange={onChange}
      />
    </label>
  );
};
