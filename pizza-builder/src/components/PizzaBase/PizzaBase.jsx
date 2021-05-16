import React from 'react';

import { PizzaImg } from '../../media';

import './PizzaBase.sass';

const PizzaBase = () => {
    return (
        <div className="pizza_building">
            <PizzaImg className="pizza" />
        </div>)
        ;
}

export default PizzaBase;