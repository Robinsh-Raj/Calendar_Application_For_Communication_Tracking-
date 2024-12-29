import React, { useState } from 'react';

const CommunicationMethodManagement = () => {
    const [methods, setMethods] = useState([
        { name: 'LinkedIn Post', description: 'Post on LinkedIn', sequence: 1, mandatory: true },
        { name: 'LinkedIn Message', description: 'Message on LinkedIn', sequence: 2, mandatory: true },
        { name: 'Email', description: 'Send an email', sequence: 3, mandatory: true },
        { name: 'Phone Call', description: 'Call the company', sequence: 4, mandatory: false },
        { name: 'Other', description: 'Any other method', sequence: 5, mandatory: false },
    ]);

    return (
        <div>
            <h2>Communication Method Management</h2>
            <ul>
                {methods.map((method, index) => (
                    <li key={index}>
                        {method.name} - {method.description} (Sequence: {method.sequence}, Mandatory: {method.mandatory ? 'Yes' : 'No'})
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CommunicationMethodManagement;