// Libs
import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
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

const LS_KEY_CONTACTS = 'phonebook_contact_list';

export function App() {
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(localStorage.getItem(LS_KEY_CONTACTS)) ?? [];
  });
  const [filter, setFilter] = useState('');

  // Effects
  useEffect(() => {
    if (contacts.length === 0) {
      localStorage.removeItem(LS_KEY_CONTACTS);
    } else {
      localStorage.setItem(LS_KEY_CONTACTS, JSON.stringify(contacts));
    }
  }, [contacts]);

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

    const contact = {
      id: nanoid(),
      name,
      number,
    };

    setContacts(prevState => [contact, ...prevState]);

    resetForm();
  };

  const handleFilterInput = event => {
    setFilter(event.target.value);
  };

  const handleRemoveContact = id => {
    setContacts(prevState => prevState.filter(item => item.id !== id));
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
