import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { doc, getDoc, deleteDoc } from 'firebase/firestore';
import db from './db';

const ContactDetails = () => {
    const { id } = useParams();
    const [contact, setContact] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchContact = async () => {
            try {
                const docRef = doc(db, 'contacts', id);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setContact({ id: docSnap.id, ...docSnap.data() });
                } else {
                    console.error('No such document!');
                }
            } catch (error) {
                console.error('Error fetching contact:', error);
            }
        };

        fetchContact();
    }, [id]);

    const handleDelete = async () => {
        try {
            await deleteDoc(doc(db, 'contacts', id));
            navigate('/');
        } catch (error) {
            console.error('Error deleting contact:', error);
        }
    };

    if (!contact) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h1>Contact Details</h1>
            <p>First Name: {contact.firstName}</p>
            <p>Last Name: {contact.lastName}</p>
            <p>Email: {contact.email}</p>
            <Link to={`/edit/${contact.id}`}>
                <button>Edit Contact</button>
            </Link>
            <button onClick={handleDelete}>Delete Contact</button>
            <Link to="/">Back to Contact List</Link>
        </div>
    );
};

export default ContactDetails;
