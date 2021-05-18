import React, { Component, Suspense } from 'react';

// import { TomatoImg, OnionImgss } from '../../media';

import './Ingredient.sass';


class Ingredient extends Component {

    constructor(props) {
        super(props);

        this.sizes = { small: ['chili red'] };

        this.state = {
            x: 0, y: 0, relX: 0, relY: 0, scale: 1, rotate: 0, cursor: 'grab',
            ingred: this.props.imag[this.props.type].length === undefined ? this.props.imag[this.props.type] : this.props.imag[this.props.type][Math.floor(Math.random() * this.props.imag[this.props.type].length)],
            size: this.sizes['small'].includes(this.props.type) ? 'small' : 'regular'
        }
        this.onMouseMoveHandler = this.onMouseMoveHandler.bind(this);
    }

    // UNSAFE_componentWillMount() {
    //     const ingred = this.state.ingredients[this.props.type]
    //     let chosen;
    //     if (ingred.length === undefined) {
    //         chosen = ingred;
    //     } else {
    //         chosen = ingred[Math.floor(Math.random() * ingred.length)]
    //     }
    //     this.setState({ chosen: chosen })
    // }

    onMouseMoveHandler = (e) => {
        const { clientX, clientY } = e;
        this.setState((prevState) => ({ x: clientX - prevState.relX, y: clientY - prevState.relY }))
    }

    onScrollHandler = (e) => {
        const { deltaY } = e;
        if (deltaY > 0) {
            this.setState(prevState => ({ rotate: prevState.rotate + 5 }))
        } else {
            this.setState(prevState => ({ rotate: prevState.rotate - 5 }))
        }
    }

    onMouseDownHandler = (e) => {
        const { clientX, clientY } = e;
        this.setState({ relX: clientX - this.state.x, relY: clientY - this.state.y, scale: 1.2, cursor: 'grabbing' })
        window.addEventListener('mousemove', this.onMouseMoveHandler);
        window.addEventListener('wheel', this.onScrollHandler);
    }

    onMouseUpHandler = (e) => {
        const { clientX, clientY } = e;
        this.setState({ scale: 1, cursor: 'grab' })
        window.removeEventListener('mousemove', this.onMouseMoveHandler)
        window.removeEventListener('wheel', this.onScrollHandler);
        const bin = document.querySelector('.ingred_dispencer__bin');
        if (clientX < bin.offsetWidth && clientY > document.body.offsetHeight - bin.offsetHeight) {
            this.props.setIngreds(this.props.ingreds.filter(el => el.id !== this.props.id))
        }
    }

    render() {

        let Io = this.state.ingred;
        const cls = `ingredient ${this.props.type} ${this.state.size}`;

        return (
            <div className={cls} onMouseDown={this.onMouseDownHandler} onMouseUp={this.onMouseUpHandler} style={{
                top: `${this.state.y}px`,
                left: `${this.state.x}px`,
                transform: `scale(${this.state.scale})`,
                cursor: `${this.state.cursor}`,
            }}>

                <Suspense fallback={<div></div>}>
                    < Io style={{ transform: `rotateZ(${this.state.rotate}deg)` }} />
                </Suspense>

            </div>);
    }
}

export default Ingredient;

