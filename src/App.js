import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import AdminModule from './components/AdminModule';
import UserModule from './components/UserModule';
import ReportingModule from './components/ReportingModule';
import './App.css'; 

const App = () => {
    return (
        <Router>
            <div>
                <h1>Communication Tracking Calendar Application</h1>
                <nav>
                    <ul>
                        <li><Link to="/admin">Admin Module</Link></li>
                        <li><Link to="/user">User  Module</Link></li>
                        <li><Link to="/reporting">Reporting Module</Link></li>
                    </ul>
                </nav>
                <Routes>
                    <Route path="/admin" element={<AdminModule />} />
                    <Route path="/user" element={<UserModule />} />
                    <Route path="/reporting" element={<ReportingModule />} />
                    <Route path="/" element={<h2>Welcome to the Communication Tracking App</h2>} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;