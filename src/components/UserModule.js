import React, { useContext } from 'react';
import { AppContext } from '../AppContext';
import Dashboard from './Dashboard';
import Notifications from './Notifications';

const UserModule = () => {
    const { companies } = useContext(AppContext);

    return (
        <div>
            <h2>User Module</h2>
            <Dashboard companies={companies} />
            <Notifications />
        </div>
    );
};

export default UserModule;