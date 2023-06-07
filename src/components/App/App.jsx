// Libs
import { useSelector } from 'react-redux';
// React components
import { ContactForm } from '../ContactForm/ContactForm';
import { ContactList } from '../ContactList/ContactList';
import { Filter } from '../Filter/Filter';
// Redux selectors
import { getContacts } from 'redux/selectors';
// Styled components
import {
  Container,
  Section,
  MainTitle,
  SectionTitle,
  ContactsWrapper,
  NoContactsMessage,
} from './App.styled';

export const App = () => {
  const contacts = useSelector(getContacts);

  return (
    <Container>
      <Section>
        <MainTitle>Phonebook</MainTitle>
        <ContactForm />
      </Section>

      <Section>
        <SectionTitle>Contacts</SectionTitle>
        <ContactsWrapper>
          {contacts.length !== 0 && (
            <>
              <Filter />
              <ContactList />
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
};
