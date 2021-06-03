import React, { useContext, useEffect, useState } from 'react';

import './AddPanel.sass';

import { AppContext } from '../../AppContext';
import AddIngredient from '../AddIngredient/AddIngredient';
import Tab from '../Tab/Tab';

const AddPanel = (props) => {

    useEffect(() => {
        window.addEventListener('keydown', tabSwitcher);

        return () => {
            window.removeEventListener('keydown', tabSwitcher);
        };
    });

    const tabSwitcher = (e) => {
        const idx = panels.indexOf(activePanel);
        if (e.key === 'd') {
            const newActive = idx < panels.length - 1 ? idx + 1 : 0;
            setActivePanel(panels[newActive])
        } else if (e.key === 'a') {
            const newActive = idx !== 0 ? idx - 1 : panels.length - 1;
            setActivePanel(panels[newActive]);
        };
    }

    const { adders } = useContext(AppContext);
    const [activePanel, setActivePanel] = useState('veggies');

    const panels = ['cheese', 'herbs/other', 'meat', 'seafood', 'veggies'];
    const transformAdders = adders[activePanel].map((el, i) => <AddIngredient key={el + i} type={el} />);
    const transformTabs = Object.keys(adders).map((el, i) => <Tab title={el} key={el + i} active={activePanel} setActive={setActivePanel} />);

    return (
        <div className="ingred_adder">
            <div className='ingred_adder__tabs'>
                {transformTabs}
            </div>
            <div className='ingred_adder__buttons'>
                {transformAdders}
            </div>

        </div>);
}

export default AddPanel;