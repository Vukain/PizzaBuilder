import React from 'react';
import gsap from 'gsap';

import './App.sass';

import { PizzaImg } from './media';

import AppProvider from './AppContext';

import AddPanel from './components/AddPanel/AddPanel';
import IngredientDispencer from './components/IngredientDispencer/IngredientDispencer';

function App() {

  return (
    <AppProvider>

      <div className="App" >

        <div className="pizza_building">
          <PizzaImg className="pizza" />
        </div>

        <IngredientDispencer />

        <AddPanel />

      </div>
    </AppProvider>
  );
}

export default App;
