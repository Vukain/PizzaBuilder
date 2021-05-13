import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

import './App.sass';

import { PizzaImg } from './media';

import AppProvider from './AppContext';
import Ingredient from './components/Ingredient/Ingredient';
import AddIngredient from './components/AddIngredient/AddIngredient';

function App() {

  const resultWrapper = useRef(null);
  const inputWrapper = useRef(null);

  const [ingreds, setIngreds] = useState([]);

  let transformIngredients = Object.keys(ingreds)
  .map(igKey => {
      return [...Array(ingreds[igKey])]
          .map((_, i) => <Ingredient key={igKey + i} type={ingreds[igKey]} />);
  }).reduce((arr, el) => {
      return arr.concat(el)
  }, []);

  return (
    <AppProvider>

      <div className="App" >

        <div className="pizza_building" ref={resultWrapper}>
          <PizzaImg className="pizza" />
        </div>

        <div className="ingred_dispencer">
          {transformIngredients}
        </div>

        <div className="ingred_adder">
          <AddIngredient type='tomato' ingreds={ingreds} adder={setIngreds}/>
          <AddIngredient type='onion' ingreds={ingreds} adder={setIngreds}/>
          <AddIngredient type='pepper' ingreds={ingreds} adder={setIngreds}/>
        </div>


      </div>
    </AppProvider>
  );
}

export default App;
