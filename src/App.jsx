import React from 'react';

import './App.sass';

import AppProvider from './AppContext';
import { AddPanel } from './components/AddPanel/AddPanel';
import { IngredientDispencer } from './components/IngredientDispencer/IngredientDispencer';
import { PizzaBase } from './components/PizzaBase/PizzaBase';

export const App = () => {
  return (
    <AppProvider>
      <div className="App">
        <PizzaBase />
        <IngredientDispencer />
        <AddPanel />
      </div>
    </AppProvider>
  );
};
