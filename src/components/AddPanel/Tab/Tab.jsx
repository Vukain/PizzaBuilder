import React from 'react';

export const Tab = ({ setActive, active, title }) => {

    const onClickHandler = () => {
        setActive(title);
    };

    const activeTab = active === title ? 'ingred_adder__tab--active' : null;
    const cls = `ingred_adder__tab ${activeTab}`;

    return (
        <div className={cls} onClick={onClickHandler}><p>{title}</p></div>
    );
};