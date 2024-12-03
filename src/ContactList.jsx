import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import db from './db';

const ContactList = () => {
    const [contacts, setContacts] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'contacts'));
                const contactsData = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                // 按姓氏排序联系人
                contactsData.sort((a, b) => a.lastName.localeCompare(b.lastName));
                setContacts(contactsData);
            } catch (error) {
                console.error('Error fetching contacts:', error);
            }
        };

        fetchContacts();
    }, []);

    const filteredContacts = contacts.filter(
        (contact) =>
            contact.firstName.toLowerCase().includes(search.toLowerCase()) ||
            contact.lastName.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div>
            <h1>Contact List</h1>
            <Link to="/add">
                <button>Add New Contact</button>
            </Link>
            <input
                type="text"
                placeholder="Search by name"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <ul>
                {filteredContacts.map((contact) => (
                    <li key={contact.id}>
                        <Link to={`/contact/${contact.id}`}>
                            {contact.firstName} {contact.lastName} - {contact.email}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ContactList;
