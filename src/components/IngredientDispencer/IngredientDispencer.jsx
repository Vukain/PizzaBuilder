import React, { useContext } from 'react';

import './IngredientDispencer.sass';

import { AppContext } from '../../AppContext';
import { Ingredient } from './Ingredient/Ingredient';
import PlateImg from '../../media/dispencer_plate.svg';
import BinImg from '../../media/dispencer_bin.svg';

export const IngredientDispencer = () => {

    const { images, ingreds, setIngreds, currentIngred, setCurrentIngred } = useContext(AppContext);

    const ingredients = ingreds.map(elem => <Ingredient key={elem['id']} id={elem['id']} type={elem['type']} current={currentIngred} setCurrent={setCurrentIngred} ingreds={ingreds} setIngreds={setIngreds} imag={images} />);

    return (
        <div className="ingred_dispencer">
            <div className="ingred_dispencer__plate" >
                <div className="ingred_dispencer__plate_image"><PlateImg /></div>
                {ingredients}
            </div>

            <div className="ingred_dispencer__bin">
                <div className="ingred_dispencer__bin_image"><BinImg /></div>
            </div>
        </div>
    );
};
