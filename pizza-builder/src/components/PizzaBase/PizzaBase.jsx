import React, { useContext } from 'react';

import './PizzaBase.sass';

import PizzaImg from '../../media/pizza_base.svg';
import { AppContext } from '../../AppContext';

const PizzaBase = () => {

    const { currentIngred, setCurrentIngred } = useContext(AppContext);

    return (
        <div className="pizza_building" onClick={() => { setCurrentIngred(null) }}>
            <PizzaImg className="pizza" />
        </div>)
        ;
}

export default PizzaBase;