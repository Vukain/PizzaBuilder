import React, { useContext } from 'react';

import { AppContext } from '../../AppContext';

import AddIngredient from '../AddIngredient/AddIngredient';

const AddPanel = (props) => {

    const { adders } = useContext(AppContext);
    const { ingreds, setIngreds } = useContext(AppContext);

    let transformAdders = adders['veggies'].map((el, i) => <AddIngredient key={el + i} type={el} ingreds={ingreds} adder={setIngreds} />);

    return (
        <div className="ingred_adder">
            {transformAdders}
        </div>);
}

export default AddPanel;