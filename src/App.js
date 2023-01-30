import React from 'react';

import './App.sass';

import AppProvider from './AppContext';
import AddPanel from './components/AddPanel/AddPanel';
import IngredientDispencer from './components/IngredientDispencer/IngredientDispencer';
import Pizza from './components/PizzaBase/PizzaBase';

function App() {

  return (
    <AppProvider>

      <div className="App" >

        <Pizza />
        <IngredientDispencer />
        <AddPanel />
        
      </div>
      
    </AppProvider>
  );
}

export default App;
