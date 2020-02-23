import React from 'react';
import { Link } from 'react-router-dom';

export default () => (
    <header className="header">
        <strong>Book Library</strong>
        <Link to="/">Home</Link>
        <Link to="/list">List</Link>
    </header>
)