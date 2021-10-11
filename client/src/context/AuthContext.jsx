import {createContext} from 'react';

export const AuthContext = createContext({
    token:null,
    userId:null,
    login: Function.prototype,
    logout: Function.prototype,
    isAuthenticated: false,
});