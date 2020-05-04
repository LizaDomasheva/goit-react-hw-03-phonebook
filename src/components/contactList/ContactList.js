import React from 'react';
import { ContactListItem } from './contactListItem/ContactListItem';
import styles from './contactList.module.css';
import PropTypes from 'prop-types';

export const ContactList = ({ contacts, deleteContact }) => (
  <ul className={styles.list}>
    {contacts.map(contact => (
      <ContactListItem
        key={contact.id}
        contact={contact}
        deleteContact={deleteContact}
      />
    ))}
  </ul>
);

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.object),
  filter: PropTypes.string,
  deleteContact: PropTypes.func,
};
