// Libs
import { useSelector, useDispatch } from 'react-redux';
// Redux actions
import { addContact, removeContact } from 'redux/contactsSlice';
import { filterContacts } from 'redux/filterSlice';
// Redux selectors
import { getContacts, getFilter } from 'redux/selectors';
// React components
import { ContactForm } from '../ContactForm/ContactForm';
import { ContactList } from '../ContactList/ContactList';
import { Filter } from '../Filter/Filter';
// Styled components
import {
  Container,
  Section,
  MainTitle,
  SectionTitle,
  ContactsWrapper,
  NoContactsMessage,
} from './App.styled';

export function App() {
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();

  // Handlers
  const handleSubmit = (values, actions) => {
    const { name, number } = values;
    const { resetForm } = actions;

    const isExistName = contacts.some(item => item.name === name);
    const isExistNumber = contacts.find(item => item.number === number);

    if (isExistName) {
      return alert(`Contact with name "${name}" is already in contacts`);
    } else if (isExistNumber) {
      return alert(
        `Number "${number}" is already in contacts with name "${isExistNumber.name}"`
      );
    }

    dispatch(addContact(name, number));

    resetForm();
  };

  const handleFilterInput = event => {
    dispatch(filterContacts(event.target.value));
  };

  const handleRemoveContact = id => {
    dispatch(removeContact(id));
  };

  // Сomputed properties
  const filteredAndSortedContacts = (() => {
    return contacts
      .filter(item => item.name.toLowerCase().includes(filter.toLowerCase()))
      .sort((a, b) => a.name.localeCompare(b.name));
  })();

  return (
    <Container>
      <Section>
        <MainTitle>Phonebook</MainTitle>
        <ContactForm onSubmit={handleSubmit} />
      </Section>

      <Section>
        <SectionTitle>Contacts</SectionTitle>
        <ContactsWrapper>
          {contacts.length !== 0 && (
            <>
              <Filter value={filter} onChange={handleFilterInput} />
              <ContactList
                data={filteredAndSortedContacts}
                onRemoveContact={handleRemoveContact}
              />
            </>
          )}
          {contacts.length === 0 && (
            <NoContactsMessage>
              There is no contacts yet. Use the form above to add your first
              contact.
            </NoContactsMessage>
          )}
        </ContactsWrapper>
      </Section>
    </Container>
  );
}
