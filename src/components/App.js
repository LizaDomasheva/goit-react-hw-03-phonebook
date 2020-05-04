import React, { Component } from 'react';
import { ContactForm } from '../components/contactForm/ContactForm';
import { ContactList } from '../components/contactList/ContactList';
import { Filter } from '../components/filter/Filter';
import styles from '../components/App.module.css';

const filterContacts = (filter, contacts) => {
  return contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase()),
  );
};

export default class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const persistedContacts = localStorage.getItem('contacts');
    if(persistedContacts) {
      this.setState({contacts: JSON.parse(persistedContacts)})
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  getContactInfo = newContact => {
    this.setState(prev => ({
      contacts: [...prev.contacts, newContact],
    }));
  };

  searchFilter = e => {
    this.setState({ filter: e.target.value });
  };

  deleteContact = e => {
    const { contacts, filter } = this.state;
    const filteredContacts = filterContacts(filter, contacts);
    const id = e.target.id;
    this.setState(prev => ({
      contacts: [...prev.contacts.filter(contact => contact.id !== id)],
    }));
    if (filteredContacts.length === 1) {
      this.setState({ filter: '' });
    }
  };

  render() {
    const { contacts, filter } = this.state;
    const filteredContacts = filterContacts(filter, contacts);
    return (
      <>
        <h2 className={styles.title}>Phonebook</h2>
        <ContactForm getContactInfo={this.getContactInfo} contacts={contacts} />
        <h2 className={styles.title}>Contacts</h2>
        {(contacts.length >= 2 || filter.length !== 0) && (
          <Filter filter={filter} searchFilter={this.searchFilter} />
        )}
        <ContactList
          contacts={filteredContacts}
          filter={filter}
          deleteContact={this.deleteContact}
        />
      </>
    );
  }
}
