import React from 'react';

const Notifications = ({ companies }) => {
    if (!companies) {
        return <div></div>;
    }

    const overdueCommunications = companies.filter(company => 
        company.nextCommunication && new Date(company.nextCommunication.date) < new Date()
    );

    const today = new Date().toISOString().split('T')[0]; 

    const todaysCommunications = companies.filter(company => 
        company.communications && company.communications.some(comm => comm.date === today)
    );

    return (
        <div className="notifications">
            <h2>Notifications</h2>
            <h3>Overdue Communications</h3>
            {overdueCommunications.length > 0 ? (
                <ul>
                    {overdueCommunications.map((company) => (
                        <li key={company.id}>
                            {company.name} - Next communication will be on {new Date(company.nextCommunication.date).toLocaleDateString()}
                            {company.communications && company.communications.length > 0 && (
                                <ul>
                                    {company.communications.map((comm, index) => (
                                        <li key={index} title={comm.notes}>
                                            {comm.type} on {new Date(comm.date).toLocaleDateString()}: {comm.notes}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No overdue communications.</p>
            )}
            <h3>Today's Communications</h3>
            {todaysCommunications.length > 0 ? (
                <ul>
                    {todaysCommunications.map(company => {
                        const nextCommunicationDate = company.nextCommunication 
                            ? new Date(company.nextCommunication.date).toLocaleDateString() 
                            : 'No upcoming communication';

                        return (
                            <li key={company.id}>
                                {company.name} - Next communication will be on {nextCommunicationDate}
                                <ul>
                                    {company.communications.filter(comm => comm.date === today).map((comm, index) => (
                                        <li key={index} title={comm.notes}>
                                            {comm.type} on {new Date(comm.date).toLocaleDateString()}: {comm.notes}
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        );
                    })}
                </ul>
            ) : (
                <p>No communications scheduled for today.</p>
            )}
        </div>
    );
};

export default Notifications;