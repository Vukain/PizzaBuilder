import React, { useContext } from 'react';

import './PizzaBase.sass';

import { AppContext } from '../../AppContext';
import PizzaImg from '../../media/pizza_base.svg';

export const PizzaBase = () => {
  const { setCurrentIngred } = useContext(AppContext);

  return (
    <div
      className="pizza_building"
      onClick={() => {
        setCurrentIngred(null);
      }}
    >
      <PizzaImg className="pizza" />
    </div>
  );
};
