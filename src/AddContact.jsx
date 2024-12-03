import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import db from './db';
import { useNavigate } from 'react-router-dom';
import './App.css';

const AddContact = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const newContact = {
                firstName,
                lastName,
                email,
            };
            const docRef = await addDoc(collection(db, 'contacts'), newContact);
            navigate(`/contact/${docRef.id}`);
        } catch (error) {
            console.error('Error adding contact:', error);
        }
    };

    return (
        <div>
            <h1>Add Contact</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button type="submit">Add Contact</button>
            </form>
        </div>
    );
};

export default AddContact;
