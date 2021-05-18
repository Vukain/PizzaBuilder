import React, { createContext, useState } from 'react';

export const AppContext = createContext(null);

const OnionImg = React.lazy(() => import('./media/onion.svg'));
const TomatoImg = React.lazy(() => import('./media/tomato_big.svg'));
const ChilliRedImgA = React.lazy(() => import('./media/chilli_red_a.svg'));
const ChilliRedImgB = React.lazy(() => import('./media/chilli_red_b.svg'));
const ChilliYellowImgA = React.lazy(() => import('./media/chilli_yellow_a.svg'));
const ChilliYellowImgB = React.lazy(() => import('./media/chilli_yellow_b.svg'));
const ChilliGreenImgA = React.lazy(() => import('./media/chilli_green_a.svg'));
const ChilliGreenImgB = React.lazy(() => import('./media/chilli_green_b.svg'));

const AppProvider = ({ children }) => {

    const [ingreds, setIngreds] = useState([]);
    const [adders, setAdders] = useState({'veggies': ['onion', 'chilli red', 'chili yellow', 'chili green', 'tomato'], 'meat': ['prosciutto', 'salami']});
    const [images, setImages] = useState({'chilli red': [ChilliRedImgA, ChilliRedImgB],
    'chili yellow': [ChilliYellowImgA, ChilliYellowImgB],
    'chili green': [ChilliGreenImgA, ChilliGreenImgB],
    tomato: TomatoImg, onion: OnionImg})

    return (
    <AppContext.Provider value={{ingreds, setIngreds, adders, setAdders, images, setImages}}>
        {children}
    </AppContext.Provider>
    );
}

export default AppProvider;