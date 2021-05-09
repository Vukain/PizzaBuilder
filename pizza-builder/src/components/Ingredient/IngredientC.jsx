import React, { Component } from 'react';

import { TomatoImg } from '../../media';

import './Ingredient.sass';

class Ingredient extends Component {

    constructor(props) {
        super(props);
        this.state = { x: 100, y: 100, relX: 0, relY: 0, scale: 1 }
        this.onMouseMoveHandler = this.onMouseMoveHandler.bind(this)
    }

    onMouseMoveHandler = (e) => {
        const { clientX, clientY } = e;
        this.setState((prevState) => ({ x: clientX - prevState.relX, y: clientY - prevState.relY }))
    }

    onMouseDownHandler = (e) => {
        // console.log(posX)

        const { clientX, clientY } = e;
        this.setState({ relX: clientX - this.state.x, relY: clientY - this.state.y, scale: 1.2 })
        window.addEventListener('mousemove', this.onMouseMoveHandler)
    }

    onMouseUpHandler = (e) => {
        console.log('die bastard')
        this.setState({ scale: 1 })
        window.removeEventListener('mousemove', this.onMouseMoveHandler)
    }

    render() {
        return (<div className="ingred_portal" onMouseDown={this.onMouseDownHandler} onMouseUp={this.onMouseUpHandler}>
            <TomatoImg className='tomato' style={{
                top: `${this.state.y}px`,
                left: `${this.state.x}px`,
                transform: `scale(${this.state.scale})`
            }} />
        </div>);
    }
}

export default Ingredient;

