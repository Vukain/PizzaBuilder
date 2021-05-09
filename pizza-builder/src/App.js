import { useEffect, useRef } from 'react';
import gsap from 'gsap';

import './App.sass';

import { PizzaImg } from './media';
import { TomatoImg } from './media';

import AppProvider from './AppContext';
import Ingredient from './components/Ingredient/IngredientC';
import Test from './components/Ingredient/test';

function App() {

  const resultWrapper = useRef(null);
  const inputWrapper = useRef(null);

  return (
    <AppProvider>

      <div className="App" >

        <div className="pizza_building" ref={resultWrapper}>
          <PizzaImg className='pizza' />
        </div>

        <Ingredient />

      </div>
    </AppProvider>
  );
}

export default App;
