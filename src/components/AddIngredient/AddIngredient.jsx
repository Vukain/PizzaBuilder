import React, { useContext } from 'react';

import { AppContext } from '../../AppContext';

const AddInredient = (props) => {

    const { ingreds, setIngreds } = useContext(AppContext);

    const onAddHandler = () => {
        setIngreds([...ingreds, { type: props.type, id: '_' + Math.random().toString(36).substr(2, 10) }])
    }

    return (
        <button className={`ingred_adder__button ${['cucumber', 'pickle'].includes(props.type) ? 'ingred_adder__button--wide' : null}`} onClick={onAddHandler}>{props.type}</button>);
}

export default AddInredient;