import React from 'react';
import Ingredient from '../Ingredient/Ingredient';

import './AddIngredient.sass';

const AddInredient = (props) => {

    const onAddHandler = () => {
        props.adder([...props.ingreds, props.type])

    }

    return (
        <div>
            <h2>Add {props.type} </h2>
            <button className='ingred_add__button' onClick={onAddHandler}>+</button>
        </div>);
}

export default AddInredient;