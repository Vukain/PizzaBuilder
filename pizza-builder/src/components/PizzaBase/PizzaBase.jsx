import React from 'react';

import PizzaImg from '../../media/pizza_base.svg';

import './PizzaBase.sass';

const PizzaBase = () => {
    return (
        <div className="pizza_building">
            <PizzaImg className="pizza" />
        </div>)
        ;
}

export default PizzaBase;