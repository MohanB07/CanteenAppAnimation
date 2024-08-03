import axios from 'axios';
import React, { createContext, useContext, useState } from 'react';


const BASE_URL = "http://192.168.1.4:5000/FOOD-ZONE/";

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
    const [error, setError] = useState(null);

    const login = async (regno, pwd) => {
        try {
            const response = await axios.get(`${BASE_URL}signin`, {
            params: { regno, pwd }
        });
    
            if (response.data.response == true) {
                return true;
            }
            else if(response.data.response == 'invalidPWD'){
                return 'invalidPWD';
            }
            else {
                return false;
            }
    
        } catch (error) {
        console.error('Network Error:', error);
        setError('There was a network error. Please try again later.');
        }
    }
    

    return (
        <GlobalContext.Provider value={{
            login,
            error
        }}>
        {children}
        </GlobalContext.Provider>
    );

};

export const useGlobalContext = () => useContext(GlobalContext);
