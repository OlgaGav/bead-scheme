import React, { createContext, useState, useEffect } from 'react';
import Auth from './../utils/Auth';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [loggedIn, setLoggedIn] = useState(Auth.loggedIn());
    const [currentUser, setCurrentUser] = useState(Auth.getProfile().data);

    const updateAuth = (state) => {
        setLoggedIn(state);
    };

    const updateCurrentUser = (data) => {
        setCurrentUser(data);
    }

    return (
        <AuthContext.Provider value={{ loggedIn, updateAuth, currentUser, updateCurrentUser }}>
            {children}
        </AuthContext.Provider>
    );
};