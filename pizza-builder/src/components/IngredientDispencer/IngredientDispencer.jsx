import React, { useContext } from 'react';

import './IngredientDispencer.sass';

import { AppContext } from '../../AppContext';

import Ingredient from '../Ingredient/Ingredient';

const AddPanel = (props) => {

    const { ingreds, setIngreds } = useContext(AppContext);
    const { images, setImages } = useContext(AppContext);
    // let transformIngredients = Object.keys(ingreds)
    // .map(igKey => {
    //     return [...Array(ingreds[igKey])]
    //         .map((_, i) => <Ingredient key={igKey + i} type={ingreds[igKey]} />);
    // }).reduce((arr, el) => {
    //     return arr.concat(el)
    // }, []);

    // const transformIngredients = [];
    // ingreds.forEach(el => transformIngredients2.push(<Ingredient type={el} />));

    let transformIngredients = ingreds.map((el, i) => <Ingredient key={el['id']} type={el['type']} ingreds={ingreds} setIngreds={setIngreds} id={el['id']} imag={images} />);

    return (
        <div className="ingred_dispencer">
            <div className="ingred_dispencer__plate">
                {transformIngredients}
            </div>

            <div className="ingred_dispencer__bin">
            </div>

        </div>
    )
}

export default AddPanel;