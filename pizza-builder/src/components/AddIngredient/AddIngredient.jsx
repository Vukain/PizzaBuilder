import React from 'react';
import Ingredient from '../Ingredient/Ingredient';

import './AddIngredient.sass';

const AddInredient = (props) => {

    const onAddHandler = () => {
        props.adder([...props.ingreds, props.type])
    }

    return (
        <div>
            <button className='ingred_add__button' onClick={onAddHandler}>Add {props.type}</button>
        </div>);
}

export default AddInredient;