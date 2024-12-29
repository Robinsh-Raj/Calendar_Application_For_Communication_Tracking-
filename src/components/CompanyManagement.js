import React, { useContext, useState } from 'react';
import { AppContext } from '../AppContext';

const CompanyManagement = () => {
    const { companies, setCompanies } = useContext(AppContext);
    const [newCompany, setNewCompany] = useState({
        id: null, 
        name: '',
        location: '',
        linkedin: '',
        emails: [],
        phoneNumbers: [],
        comments: '',
        periodicity: 2,
        communications: [] 
    });

    const addOrUpdateCompany = () => {
        if (newCompany.id) {
            
            setCompanies(companies.map(company => 
                company.id === newCompany.id ? newCompany : company
            ));
        } else {
            
            setCompanies([...companies, { ...newCompany, id: Date.now() }]);
        }
        resetForm();
    };

    const resetForm = () => {
        setNewCompany({
            id: null, 
            name: '',
            location: '',
            linkedin: '',
            emails: [],
            phoneNumbers: [],
            comments: '',
            periodicity: 2,
            communications: [],
            nextCommunication: { type: '', date: '' }
        });
    };

    const handleDeleteCompany = (id) => {
        setCompanies(companies.filter(company => company.id !== id));
    };

    const handleEditCompany = (company) => {
        setNewCompany(company); 
    };

    return (
        <div>
            <h2>Company Management</h2>
            <input type="text" placeholder="Company Name" value={newCompany.name} onChange={(e) => setNewCompany({ ...newCompany, name: e.target.value })} />
            <input type="text" placeholder="Location" value={newCompany.location} onChange={(e) => setNewCompany({ ...newCompany, location: e.target.value })} />
            <input type="text" placeholder="LinkedIn Profile" value={newCompany.linkedin} onChange={(e) => setNewCompany({ ...newCompany, linkedin: e.target.value })} />
            <input type="text" placeholder="Emails (comma separated)" value={newCompany.emails.join(', ')} onChange={(e) => setNewCompany({ ...newCompany, emails: e.target.value.split(',').map(email => email.trim()) })} />
            <input type="text" placeholder="Phone Numbers (comma separated)" value={newCompany.phoneNumbers.join(', ')} onChange={(e) => setNewCompany({ ...newCompany, phoneNumbers: e.target.value.split(',').map(phone => phone.trim()) })} />
            <textarea placeholder="Comments" value={newCompany.comments} onChange={(e) => setNewCompany({ ...newCompany, comments: e.target.value })} />
            <input type="number" placeholder="Communication Periodicity (weeks)" value={newCompany.periodicity} onChange={(e) => setNewCompany({ ...newCompany, periodicity: e.target.value })} />
            <button onClick={addOrUpdateCompany}>{newCompany.id ? 'Update Company' : 'Add Company'}</button>
            <h3>Company List</h3>
            <ul className="company-list">
                {companies.map((company) => (
                    <li key={company.id}>
                        <span>{company.name} - {company.location}</span>
                        <button className="delete-button" onClick={() => handleDeleteCompany(company.id)}>Delete</button>
                        <button onClick={() => handleEditCompany(company)}>Edit</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CompanyManagement;