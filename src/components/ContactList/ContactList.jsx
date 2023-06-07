// Libs
import { useDispatch, useSelector } from 'react-redux';
// React components
import { ContactListItem } from 'components/ContactListItem/ContactListItem';
// Redux selectors
import { getContacts, getFilter } from 'redux/selectors';
// Redux actions
import { removeContact } from 'redux/contactsSlice';
// Styled components
import { List } from './ContactList.styled';

export const ContactList = () => {
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();

  const handleRemoveContact = id => {
    dispatch(removeContact(id));
  };

  const filteredAndSortedContacts = contacts
    .filter(item => item.name.toLowerCase().includes(filter.toLowerCase()))
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <List>
      {filteredAndSortedContacts.map(({ id, name, number }) => {
        return (
          <ContactListItem
            key={id}
            contactName={name}
            contactNumber={number}
            onClick={() => handleRemoveContact(id)}
          />
        );
      })}
    </List>
  );
};
