import React, { useContext } from 'react';

import Ingredient from '../Ingredient/Ingredient';

import { AppContext } from '../../AppContext';

import './AddIngredient.sass';

const AddInredient = (props) => {

    const { ingreds, setIngreds } = useContext(AppContext);

    const onAddHandler = () => {
        setIngreds([...ingreds, { type: props.type, id: '_' + Math.random().toString(36).substr(2, 10) }])
    }

    return (
        <div>
            <button className='ingred_add__button' onClick={onAddHandler}>Add {props.type}</button>
        </div>);
}

export default AddInredient;