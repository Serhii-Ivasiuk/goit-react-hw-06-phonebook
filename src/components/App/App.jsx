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
} from './App.styled';

const test = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

export class App extends Component {
  state = {
    contacts: [...test],
    filter: '',
  };

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

  getFilteredContacts = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(item =>
      item.name.toLowerCase().includes(filter.toLowerCase(normalizedFilter))
    );
  };

  render() {
    const { filter } = this.state;
    const filteredContacts = this.getFilteredContacts();

    return (
      <Container>
        <Section>
          <MainTitle>Phonebook</MainTitle>
          <ContactForm onSubmit={this.handleSubmit} />
        </Section>

        <Section>
          <SectionTitle>Contacts</SectionTitle>
          <ContactsWrapper>
            <Filter value={filter} onChange={this.handleFilterInput} />
            <ContactList
              data={filteredContacts}
              onRemoveContact={this.handleRemoveContact}
            />
          </ContactsWrapper>
        </Section>
      </Container>
    );
  }
}
