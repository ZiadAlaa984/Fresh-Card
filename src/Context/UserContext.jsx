import axios from "axios";
import { useEffect, useState } from "react";
import { createContext } from "react";
export let UserContext = createContext(0);
export default function UserContextProvider(props) {
    const [user, setUser] = useState('');
    const [Token, setToken] = useState('');
    const headers = {
        token: localStorage.getItem('tokinUser')
    };
    useEffect(() => {
        if (localStorage.getItem('tokinUser')) {
            setToken(localStorage.getItem('tokinUser'))
        }
    }, []);

    return (
        <UserContext.Provider value={{ Token, setToken, user, setUser }}>
            {props.children}
        </UserContext.Provider>
    );

}

