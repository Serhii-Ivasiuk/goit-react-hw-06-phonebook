// Libs
import React, { Component } from 'react';
import { nanoid } from 'nanoid';
// React components
import { ContactForm } from '../ContactForm/ContactForm';
import { ContactList } from '../ContactList/ContactList';
import { Filter } from '../Filter/Filter';
// Styled components
import { Container } from './App.styled';

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

  checkExistContact = (name, number) => {
    const { contacts } = this.state;

    const isExistName = contacts.some(item => item.name === name);
    const isExistNumber = contacts.find(item => item.number === number);

    if (isExistName) {
      alert(`Contact with name "${name}" is already in contacts`);
      return true;
    } else if (isExistNumber) {
      alert(
        `Number "${number}" is already in contacts with name "${isExistNumber.name}"`
      );
      return true;
    }
  };

  handleAddContact = ({ name, number }) => {
    const isExist = this.checkExistContact(name, number);

    if (isExist) {
      return;
    }

    const contact = {
      id: nanoid(),
      name,
      number,
    };

    this.setState(prevState => {
      return { contacts: [contact, ...prevState.contacts] };
    });
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
        <h1>Phonebook</h1>
        <ContactForm onAddContact={this.handleAddContact} />

        <h2>Contacts</h2>
        <Filter value={filter} onChange={this.handleFilterInput} />
        <ContactList
          data={filteredContacts}
          onRemoveContact={this.handleRemoveContact}
        />
      </Container>
    );
  }
}
