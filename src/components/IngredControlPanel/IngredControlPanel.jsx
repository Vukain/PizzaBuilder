import React, { useEffect } from 'react';

import IngredientControl from '../IngredientControl/IngredientControl';

const IngredControlPanel = (props) => {

    useEffect(() => {
        window.addEventListener('keydown', props.listener);

        return () => {
            window.removeEventListener('keydown', props.listener);
        };
    });

    const controls = ['counter', 'rotate', 'shrink', 'enlarge', 'higher', 'lower'].map(elem => <IngredientControl key={elem} controller={() => { props.control(elem, 15) }} type={elem} />);

    return (
        <>
            {controls}
        </>
    );
}

export default IngredControlPanel;