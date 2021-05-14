import React, { createContext, useState } from 'react';

export const AppContext = createContext(null);

const AppProvider = ({ children }) => {

    const [ingreds, setIngreds] = useState([]);
    const [adders, setAdders] = useState({'veggies': ['onion', 'pepper', 'tomato'], 'meat': ['prosciutto', 'salami']});

    return (
    <AppContext.Provider value={{ingreds, setIngreds, adders, setAdders}}>
        {children}
    </AppContext.Provider>
    );
}

export default AppProvider;