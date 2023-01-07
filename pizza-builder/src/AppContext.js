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
const CucumberFresh = React.lazy(() => import('./media/cucumber_fresh.svg'));
const CucumberPickled = React.lazy(() => import('./media/cucumber_pickled.svg'));
const FetaImgA = React.lazy(() => import('./media/feta_a.svg'));
const FetaImgB = React.lazy(() => import('./media/feta_b.svg'));
const HamImgA = React.lazy(() => import('./media/ham_a.svg'));
const HamImgB = React.lazy(() => import('./media/ham_b.svg'));
const MusselImgA = React.lazy(() => import('./media/mussel_a.svg'));
const MusselImgB = React.lazy(() => import('./media/mussel_b.svg'));
const MusselClosedImg = React.lazy(() => import('./media/mussel_closed.svg'));
const MusselOpenImgA = React.lazy(() => import('./media/mussel_opened_a.svg'));
const MusselOpenImgB = React.lazy(() => import('./media/mussel_opened_b.svg'));
const OctopusImgA = React.lazy(() => import('./media/octopus_a.svg'));
const OctopusImgB = React.lazy(() => import('./media/octopus_b.svg'));
const OliveBlackImgA = React.lazy(() => import('./media/olive_black_sliced.svg'));
const OliveBlackImgB = React.lazy(() => import('./media/olive_black_whole.svg'));
const OliveGreenImgA = React.lazy(() => import('./media/olive_green_sliced.svg'));
const OliveGreenImgB = React.lazy(() => import('./media/olive_green_whole.svg'));
const OnionImg = React.lazy(() => import('./media/onion.svg'));
const OreganoImg = React.lazy(() => import('./media/oregano.svg'));
const PineappleImgA = React.lazy(() => import('./media/pineapple_a.svg'));
const PineappleImgB = React.lazy(() => import('./media/pineapple_b.svg'));
const PineappleImgC = React.lazy(() => import('./media/pineapple_c.svg'));
const ProsciuttoImgA = React.lazy(() => import('./media/prosciutto_a.svg'));
const ProsciuttoImgB = React.lazy(() => import('./media/prosciutto_b.svg'));
const RokpolBlueImg = React.lazy(() => import('./media/rokpol_blue.svg'));
const RokpolGoldImg = React.lazy(() => import('./media/rokpol_gold.svg'));
const RucolaImgA = React.lazy(() => import('./media/rucola_a.svg'));
const RucolaImgB = React.lazy(() => import('./media/rucola_b.svg'));
const RucolaImgC = React.lazy(() => import('./media/rucola_c.svg'));
const SalamiRedImg = React.lazy(() => import('./media/salami_red.svg'));
const SalamiAgedImg = React.lazy(() => import('./media/salami_aged.svg'));
const ShrimpImg = React.lazy(() => import('./media/shrimp.svg'));
const ShrimpShellImg = React.lazy(() => import('./media/shrimp_shell.svg'));
const ShroomLightImg = React.lazy(() => import('./media/shroom_light.svg'));
const ShroomDarkImg = React.lazy(() => import('./media/shroom_dark.svg'));
const TomatoBigImg = React.lazy(() => import('./media/tomato_big.svg'));
const TomatoSmallImg = React.lazy(() => import('./media/tomato_small.svg'));

const AppProvider = ({ children }) => {

    const [ingreds, setIngreds] = useState([]);
    const [currentIngred, setCurrentIngred] = useState(null);
    const [adders, setAdders] = useState({
        'cheese': ['camembert', 'camembert half', 'feta', 'roquefort blue', 'roquefort gold'],
        'herbs/other': ['basil', 'oregano', 'rucola', 'pineapple', 'shroom dark', 'shroom light'],
        'meat': ['ham', 'prosciutto', 'salami', 'salami aged'],
        'seafood': ['mussel', 'mussel opened', 'mussel closed', 'octopus', 'shrimp peeled', 'shrimp'],
        'veggies': ['cucumber', 'pickle', 'chilli green', 'chilli red', 'chilli yellow', 'olive black', 'olive green',
            'onion', 'tomato', 'cocktail tomato', ]
    });

    const [images, setImages] = useState({
        'basil': [BasilImgA, BasilImgB],
        'camembert': CamembertImg,
        'camembert half': CamembertHalfImg,
        'chilli green': [ChilliGreenImgA, ChilliGreenImgB],
        'chilli red': [ChilliRedImgA, ChilliRedImgB],
        'chilli yellow': [ChilliYellowImgA, ChilliYellowImgB],
        'feta': [FetaImgA, FetaImgB],
        'ham': [HamImgA, HamImgB],
        'mussel': [MusselImgA, MusselImgB],
        'mussel opened': [MusselOpenImgA, MusselOpenImgB],
        'mussel closed': MusselClosedImg,
        'octopus': [OctopusImgA, OctopusImgB],
        'olive black': [OliveBlackImgA, OliveBlackImgB],
        'olive green': [OliveGreenImgA, OliveGreenImgB],
        'onion': OnionImg,
        'oregano': OreganoImg,
        'pineapple': [PineappleImgA, PineappleImgB, PineappleImgC],
        'prosciutto': [ProsciuttoImgA, ProsciuttoImgB],
        'rokpol blue': RokpolBlueImg,
        'rokpol gold': RokpolGoldImg,
        'rucola': [RucolaImgA, RucolaImgB, RucolaImgC],
        'salami': SalamiRedImg,
        'salami aged': SalamiAgedImg,
        'shrimp': ShrimpImg,
        'shrimp shell': ShrimpShellImg,
        'shroom dark': ShroomDarkImg,
        'shroom light': ShroomLightImg,
        'tomato': TomatoBigImg,
        'cocktail tomato': TomatoSmallImg,
        'cucumber': CucumberFresh,
        'pickle': CucumberPickled,
    });

    return (
        <AppContext.Provider value={{ ingreds, setIngreds, adders, setAdders, images, setImages, currentIngred, setCurrentIngred }}>
            {children}
        </AppContext.Provider>
    );
}

export default AppProvider;