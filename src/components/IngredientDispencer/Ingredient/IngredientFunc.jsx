import React, { useCallback, useState } from 'react';

import { TomatoImg } from '../../media';

import './Ingredient.sass';

const Ingredient = (props) => {
  const [posX, setPosX] = useState(100);
  const [posY, setPosY] = useState(100);
  const [relX, setRelX] = useState(0);
  const [relY, setRelY] = useState(0);

  // problem with frozen status or relX and relY
  const onMouseMoveHandler = useCallback((e) => {
    const { clientX, clientY } = e;
    console.log(`clientX: ${clientX} | relX: ${relX} | cX-rX: ${clientX - relX}`);
    setPosX(clientX - relX);
    setPosY(clientY - relY);
  }, []);

  const onMouseDownHandler = (e) => {
    // console.log(posX)
    // console.log(posX)
    const { clientX, clientY } = e;
    setRelX(clientX - posX);
    setRelY(clientY - posY);
    // console.log(clicked)
    window.addEventListener('mousemove', onMouseMoveHandler);
  };

  const onMouseUpHandler = (e) => {
    // console.log(3)
    window.removeEventListener('mousemove', onMouseMoveHandler);
  };

  return (
    <div className="ingred_portal" onMouseDown={onMouseDownHandler} onMouseUp={onMouseUpHandler}>
      <p>X - {relX}</p>
      <p>Y - {relY}</p>
      <TomatoImg
        className="tomato"
        style={{
          transform: `translate(${posX}px, ${posY}px)`,
        }}
      />
    </div>
  );
};

export default Ingredient;
