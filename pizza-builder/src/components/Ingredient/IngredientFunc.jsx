import React, { useCallback, useState } from 'react';

import { TomatoImg } from '../../media';

import './Ingredient.sass';

const Ingredient = (props) => {

    const [posX, setPosX] = useState(100);
    const [posY, setPosY] = useState(100);
    const [relX, setRelX] = useState(50);
    const [relY, setRelY] = useState(50);

    const onMouseMoveHandler = useCallback((e, x, y) => {

        console.log(x, y)
        const { clientX, clientY } = e;
        setPosX(clientX - x);
        setPosY(clientY - y);
    }, [])

    const onMouseDownHandler = (e) => {
        // console.log(posX)
        // console.log(posX)
        const { clientX, clientY } = e;
        setRelX(clientX - posX);
        setRelY(clientY - posY);
        // console.log(clicked)
        window.addEventListener('mousemove', (e) => onMouseMoveHandler(e, relX, relY))
    }

    const onMouseUpHandler = (e) => {
        // console.log(3)
        window.removeEventListener('mousemove', onMouseMoveHandler)
    }

    return (
        <div className="ingred_portal" onMouseDown={onMouseDownHandler} onMouseUp={onMouseUpHandler}>
            <p>{posX}</p>
            <TomatoImg className='tomato' style={{
                transform: `translate(${posX}px, ${posY}px)`
            }} />
        </div>);
}

export default Ingredient;