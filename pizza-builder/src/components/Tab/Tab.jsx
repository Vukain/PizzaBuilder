import React from 'react';

const Tab = (props) => {
    const onClickHandler = () => {
        props.setActive(props.title);
    }
    const active = props.active === props.title ? 'ingred_adder__tab--active' : null;
    const cls = `ingred_adder__tab ${active}`
    return (
        <div className={cls} onClick={onClickHandler}>{props.title}</div>
    );
}

export default Tab;