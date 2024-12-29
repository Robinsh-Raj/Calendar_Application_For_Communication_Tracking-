import React, { createContext, useState } from 'react';


export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [companies, setCompanies] = useState([]);
    const [communicationMethods, setCommunicationMethods] = useState([
        { name: 'LinkedIn Post', description: 'Post on LinkedIn', sequence: 1, mandatory: true },
        { name: 'LinkedIn Message', description: 'Message on LinkedIn', sequence: 2, mandatory: true },
        { name: 'Email', description: 'Send an email', sequence: 3, mandatory: true },
        { name: 'Phone Call', description: 'Call the company', sequence: 4, mandatory: false },
        { name: 'Other', description: 'Any other method', sequence: 5, mandatory: false },
    ]);

    return (
        <AppContext.Provider value={{ companies, setCompanies }}>
            {children}
        </AppContext.Provider>
    );
};