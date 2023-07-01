import React, { useContext } from 'react';

import { AppContext } from '../../../AppContext';

export const AddIngredient = ({ type }) => {
  const { ingreds, setIngreds } = useContext(AppContext);

  const onAddHandler = () => {
    setIngreds([...ingreds, { type: type, id: '_' + Math.random().toString(36).substr(2, 10) }]);
  };

  return (
    <button
      className={`ingred_adder__button ${['cucumber', 'pickle'].includes(type) ? 'ingred_adder__button--wide' : null}`}
      onClick={onAddHandler}
    >
      {type}
    </button>
  );
};
