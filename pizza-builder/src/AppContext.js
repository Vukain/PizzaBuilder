import React, { createContext, useState } from 'react';

export const AppContext = createContext(null);

const BasilImgA = React.lazy(() => import('./media/basil_a.svg'));
const BasilImgB = React.lazy(() => import('./media/basil_b.svg'));
const CamembertImg = React.lazy(() => import('./media/camembert.svg'));
const CamembertHalfImg = React.lazy(() => import('./media/camembert_half.svg'));
const ChilliRedImgA = React.lazy(() => import('./media/chilli_red_a.svg'));
const ChilliRedImgB = React.lazy(() => import('./media/chilli_red_b.svg'));
const ChilliYellowImgA = React.lazy(() => import('./media/chilli_yellow_a.svg'));
const ChilliYellowImgB = React.lazy(() => import('./media/chilli_yellow_b.svg'));
const ChilliGreenImgA = React.lazy(() => import('./media/chilli_green_a.svg'));
const ChilliGreenImgB = React.lazy(() => import('./media/chilli_green_b.svg'));
const FetaImgA = React.lazy(() => import('./media/feta_a.svg'));
const FetaImgB = React.lazy(() => import('./media/feta_b.svg'));
const HamImgA = React.lazy(() => import('./media/ham_a.svg'));
const HamImgB = React.lazy(() => import('./media/ham_b.svg'));
const MusselImgA = React.lazy(() => import('./media/mussel_a.svg'));
const MusselImgB = React.lazy(() => import('./media/mussel_b.svg'));
const MusselClosedImg = React.lazy(() => import('./media/mussel_closed.svg'));
const MusselOpenImgA = React.lazy(() => import('./media/mussel_opened_a.svg'));
const MusselOpenImgB = React.lazy(() => import('./media/mussel_opened_a.svg'));


const OnionImg = React.lazy(() => import('./media/onion.svg'));
const TomatoImg = React.lazy(() => import('./media/tomato_big.svg'));

const AppProvider = ({ children }) => {

    const [ingreds, setIngreds] = useState([]);
    const [adders, setAdders] = useState({
        'veggies': ['chili green', 'chilli red', 'chili yellow', 'onion', 'tomato'],
        'meat': ['ham'],
        'cheese': ['camembert', 'camembert half', 'feta'],
        'seafood': ['mussel', 'mussel opened', 'mussel closed'],
        'herbs': ['basil']
    });
    const [images, setImages] = useState({
        'basil': [BasilImgA, BasilImgB],
        'camembert': CamembertImg,
        'camembert half': CamembertHalfImg,
        'chili green': [ChilliGreenImgA, ChilliGreenImgB],
        'chilli red': [ChilliRedImgA, ChilliRedImgB],
        'chili yellow': [ChilliYellowImgA, ChilliYellowImgB],
        'feta': [FetaImgA, FetaImgB],
        'ham': [HamImgA, HamImgB],
        'mussel': [MusselImgA, MusselImgB],
        'mussel opened': [MusselOpenImgA, MusselOpenImgB],
        'mussel closed': MusselClosedImg,
        tomato: TomatoImg,
        onion: OnionImg
    })

    return (
        <AppContext.Provider value={{ ingreds, setIngreds, adders, setAdders, images, setImages }} >
            {children}
        </AppContext.Provider>
    );
}

export default AppProvider;