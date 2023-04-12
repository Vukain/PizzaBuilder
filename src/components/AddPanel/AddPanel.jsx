import React, { useContext, useEffect, useState } from 'react';

import './AddPanel.sass';

import { AppContext } from '../../AppContext';
import { AddIngredient } from './AddIngredient/AddIngredient';
import { Tab } from './Tab/Tab';

export const AddPanel = () => {

    const { addButtonList } = useContext(AppContext);
    const [activePanel, setActivePanel] = useState('veggies');

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
    };

    const panels = ['cheese', 'herbs/other', 'meat', 'seafood', 'veggies'];
    const addbuttons = addButtonList[activePanel].map((elem, idx) => <AddIngredient key={elem + idx} type={elem} />);
    const tabs = Object.keys(addButtonList).map((elem, idx) => <Tab title={elem} key={elem + idx} active={activePanel} setActive={setActivePanel} />);

    return (
        <div className="ingred_adder">
            <div className='ingred_adder__tabs'>
                {tabs}
            </div>
            <div className='ingred_adder__buttons'>
                {addbuttons}
                <div className='ingred_adder__copy'>&copy; 2021 Vukain</div>
            </div>
        </div>);
};