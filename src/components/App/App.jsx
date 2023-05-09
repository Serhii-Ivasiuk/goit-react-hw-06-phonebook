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

    if (!savedContacts) return;

    const parsedContacts = JSON.parse(savedContacts);

    if (parsedContacts.length) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate() {
    const { contacts } = this.state;

    const contactList = JSON.stringify(contacts);

    localStorage.setItem(LS_KEY_CONTACTS, contactList);
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
  getFilteredContacts = () => {
    const { contacts, filter } = this.state;

    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(item =>
      item.name.toLowerCase().includes(filter.toLowerCase(normalizedFilter))
    );
  };

  render() {
    const { contacts, filter } = this.state;
    const filteredContacts = this.getFilteredContacts();
    const sortedFilteredContscts = [...filteredContacts].sort((a, b) =>
      a.name.localeCompare(b.name)
    );

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
                  data={sortedFilteredContscts}
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
