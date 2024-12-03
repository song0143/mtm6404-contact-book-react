import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import db from './db';

const EditContact = () => {
    const { id } = useParams();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchContact = async () => {
            try {
                const docRef = doc(db, 'contacts', id);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const contact = docSnap.data();
                    setFirstName(contact.firstName);
                    setLastName(contact.lastName);
                    setEmail(contact.email);
                } else {
                    console.error('No such document!');
                }
            } catch (error) {
                console.error('Error fetching contact:', error);
            }
        };

        fetchContact();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const docRef = doc(db, 'contacts', id);
            await updateDoc(docRef, {
                firstName,
                lastName,
                email,
            });
            navigate(`/contact/${id}`);
        } catch (error) {
            console.error('Error updating contact:', error);
        }
    };

    return (
        <div>
            <h1>Edit Contact</h1>
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
                <button type="submit">Save Changes</button>
            </form>
            <button onClick={() => navigate(`/contact/${id}`)}>Cancel</button>
        </div>
    );
};

export default EditContact;
