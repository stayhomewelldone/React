import React from 'react';
import { Link } from 'react-router-dom';
import './Error.css';

export function Error() {
    return (
        <div className="error-container">
            <h1 className="error-title">404</h1>
            <h2 className="error-subtitle">Page not found</h2>
            <Link to="/" className="error-link">Go back to home</Link>
        </div>
    );
}