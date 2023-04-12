import React, { useEffect } from 'react';

import { IngredientControl } from './IngredientControl/IngredientControl';

export const IngredControlPanel = ({ listener, ingredControl }) => {

    useEffect(() => {
        window.addEventListener('keydown', listener);

        return () => {
            window.removeEventListener('keydown', listener);
        };
    });

    const controls = ['counter', 'rotate', 'shrink', 'enlarge', 'higher', 'lower'].map((elem, idx) =>
        <IngredientControl key={idx + elem} controller={() => { ingredControl(elem, 15) }} type={elem} />
    );

    return (
        <>
            {controls}
        </>
    );
};