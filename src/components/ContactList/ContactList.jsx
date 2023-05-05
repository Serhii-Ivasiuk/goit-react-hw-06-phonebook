// Libs
import PropTypes from 'prop-types';
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

ContactList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  onRemoveContact: PropTypes.func.isRequired,
};
