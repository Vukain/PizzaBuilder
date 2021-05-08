import React, { useCallback, useState } from 'react';

import { TomatoImg } from '../../media';

import './Ingredient.sass';

const Ingredient = (props) => {
    console.log('mount')
    const [posX, setPosX] = useState(100);
    const [posY, setPosY] = useState(100);
    console.log(posX)
    const onMouseMoveHandler = useCallback((e) => {
        console.log(1)
        const { clientX, clientY } = e;
        // const centerX = window.innerWidth / 2;
        // const centerY = window.innerHeight / 2;

        // const posX = clientX - centerX;
        // const posY = clientY - centerY;
        console.log(posX)
        setPosX(clientX - posX);
        setPosY(clientY - posY);
    }, [])

    const onMouseDownHandler = (e) => {
        console.log(2)
        window.addEventListener('mousemove', onMouseMoveHandler)
    }

    const onMouseUpHandler = (e) => {
        console.log(3)
        window.removeEventListener('mousemove', onMouseMoveHandler)
    }

    return (
        <div className="ingred_portal" onMouseDown={onMouseDownHandler} onMouseUp={onMouseUpHandler}>
            <TomatoImg className='tomato' style={{
                transform: `translate(${posX}px, ${posY}px)`
            }} />
        </div>);
}

export default Ingredient;