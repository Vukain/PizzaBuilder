import React from 'react';

import './PizzaBase.sass';

import PizzaImg from '../../media/pizza_base.svg';

const PizzaBase = () => {
    return (
        <div className="pizza_building">
            <PizzaImg className="pizza" />
        </div>)
        ;
}

export default PizzaBase;