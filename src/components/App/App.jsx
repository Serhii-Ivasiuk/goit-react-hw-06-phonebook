// Libs
import React, { Component } from 'react';
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

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  // Lifecycle methods
  componentDidMount() {
    const savedContacts = localStorage.getItem(LS_KEY_CONTACTS);

    if (savedContacts) {
      this.setState({ contacts: JSON.parse(savedContacts) });
    }
  }

  componentDidUpdate(_, prevState) {
    const { contacts } = this.state;

    if (prevState.contacts.length !== contacts.length) {
      localStorage.setItem(LS_KEY_CONTACTS, JSON.stringify(contacts));
    }
  }

  // Handlers
  handleSubmit = (values, actions) => {
    const { name, number } = values;
    const { resetForm } = actions;
    const { contacts } = this.state;

    const isExistName = contacts.some(item => item.name === name);
    const isExistNumber = contacts.find(item => item.number === number);

    if (isExistName) {
      return alert(`Contact with name "${name}" is already in contacts`);
    } else if (isExistNumber) {
      return alert(
        `Number "${number}" is already in contacts with name "${isExistNumber.name}"`
      );
    }

    this.addNewContact(name, number);

    resetForm();
  };

  handleFilterInput = event => {
    const filterValue = event.target.value;

    this.setState({
      filter: filterValue,
    });
  };

  handleRemoveContact = id => {
    this.setState(prevState => {
      return { contacts: prevState.contacts.filter(item => item.id !== id) };
    });
  };

  // Functions for handlers
  addNewContact = (name, number) => {
    const contact = {
      id: nanoid(),
      name,
      number,
    };

    this.setState(prevState => {
      return { contacts: [contact, ...prevState.contacts] };
    });
  };

  // Сomputed properties
  filterContacts = () => {
    const { contacts, filter } = this.state;

    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(item =>
      item.name.toLowerCase().includes(filter.toLowerCase(normalizedFilter))
    );
  };

  sortContacts = contactsList => {
    return [...contactsList].sort((a, b) => a.name.localeCompare(b.name));
  };

  render() {
    const { contacts, filter } = this.state;

    const filteredContscts = this.filterContacts();
    const sortedContacts = this.sortContacts(filteredContscts);

    return (
      <Container>
        <Section>
          <MainTitle>Phonebook</MainTitle>
          <ContactForm onSubmit={this.handleSubmit} />
        </Section>

        <Section>
          <SectionTitle>Contacts</SectionTitle>
          <ContactsWrapper>
            {contacts.length !== 0 && (
              <>
                <Filter value={filter} onChange={this.handleFilterInput} />
                <ContactList
                  data={sortedContacts}
                  onRemoveContact={this.handleRemoveContact}
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
}
