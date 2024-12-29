import React, { useContext } from 'react'; 
import { AppContext } from '../AppContext';
import CompanyManagement from './CompanyManagement';
import CommunicationMethodManagement from './CommunicationMethodManagement';

const AdminModule = () => {
    const { companies, setCompanies } = useContext(AppContext);

    return (
        <div>
            <h2>Admin Module</h2>
            <CompanyManagement />
            <CommunicationMethodManagement />
        </div>
    );
};

export default AdminModule;