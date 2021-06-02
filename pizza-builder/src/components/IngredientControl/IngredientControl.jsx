import React, { useContext } from 'react';

import './IngredientControl.sass';

import { AppContext } from '../../AppContext';

const IngredientControl = (props) => {
    console.log(props.styler)

    const { currentIngred } = useContext(AppContext);

    return (<button style={props.styler} className='ingredient_control__button' onClick={props.rotator}>CLICK</button>);
}

export default IngredientControl;