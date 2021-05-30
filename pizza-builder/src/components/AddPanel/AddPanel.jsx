import React, { useContext, useState } from 'react';
import Hammer from 'react-hammerjs';

import './AddPanel.sass';

import { AppContext } from '../../AppContext';

import AddIngredient from '../AddIngredient/AddIngredient';
import Tab from '../Tab/Tab';

const AddPanel = (props) => {

    const { adders } = useContext(AppContext);
    const [activePanel, setActivePanel] = useState('veggies');
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