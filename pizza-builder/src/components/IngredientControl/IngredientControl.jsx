import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

import './IngredientControl.sass';


const IngredientControl = (props) => {

    const buttonWrapper = useRef(null);

    useEffect(() => {
        const tlb = gsap.timeline();
        const [elementsButton] = buttonWrapper.current.children;
        const el = elementsButton.querySelector('.ingredient_control__button');

        // tlb.fromTo(el, { scale: 0.3 }, { duration: 1, scale: 1, autoAlpha: 1, ease: 'back.out(3)' })
    });

    return (
        <div ref={buttonWrapper}>
            <div>
                <button className={`ingredient_control__button ingredient_control__button--${props.type}`} onClick={props.controller}>{props.type}</button>
            </div>
        </div>
    );
}

export default IngredientControl;