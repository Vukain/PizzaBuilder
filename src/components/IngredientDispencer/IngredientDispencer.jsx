import React, { useContext } from 'react';

import './IngredientDispencer.sass';

import { AppContext } from '../../AppContext';

import Ingredient from '../Ingredient/Ingredient';

import PlateImg from '../../media/dispencer_plate.svg';
import BinImg from '../../media/dispencer_bin.svg';

const AddPanel = (props) => {

    const { ingreds, setIngreds } = useContext(AppContext);
    const { images } = useContext(AppContext);
    const { currentIngred, setCurrentIngred } = useContext(AppContext);

    // let transformIngredients = Object.keys(ingreds)
    // .map(igKey => {
    //     return [...Array(ingreds[igKey])]
    //         .map((_, i) => <Ingredient key={igKey + i} type={ingreds[igKey]} />);
    // }).reduce((arr, el) => {
    //     return arr.concat(el)
    // }, []);

    // const transformIngredients = [];
    // ingreds.forEach(el => transformIngredients2.push(<Ingredient type={el} />));

    let transformIngredients = ingreds.map((el, i) => <Ingredient key={el['id']} id={el['id']} type={el['type']} current={currentIngred} setCurrent={setCurrentIngred} ingreds={ingreds} setIngreds={setIngreds} imag={images} />);

    return (
        <div className="ingred_dispencer">
            <div className="ingred_dispencer__plate" >
                <div className="ingred_dispencer__plate_image"><PlateImg /></div>

                {transformIngredients}
            </div>

            <div className="ingred_dispencer__bin">
                <div className="ingred_dispencer__bin_image"><BinImg /></div>
            </div>

        </div>
    )
}

export default AddPanel;