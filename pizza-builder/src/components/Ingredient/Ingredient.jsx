import React, { Component, Suspense } from 'react';

// import { TomatoImg, OnionImgss } from '../../media';

import './Ingredient.sass';

const OnionImg = React.lazy(() => import('../../media/onion.svg'));
const TomatoImg = React.lazy(() => import('../../media/tomato.svg'));
const PepperImg = React.lazy(() => import('../../media/pepper.svg'));

class Ingredient extends Component {

    constructor(props) {
        super(props);
        this.state = { x: 100, y: 100, relX: 0, relY: 0, scale: 1, rotate: 0, cursor: 'grab', ingredients: { pepper: PepperImg, tomato: TomatoImg, onion: OnionImg } }
        this.onMouseMoveHandler = this.onMouseMoveHandler.bind(this)
    }

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
        this.setState({ scale: 1, cursor: 'grab' })
        window.removeEventListener('mousemove', this.onMouseMoveHandler)
        window.removeEventListener('wheel', this.onScrollHandler);
    }

    render() {

        const Io = this.state.ingredients[this.props.type]

        return (
            <div className="ingredient" onMouseDown={this.onMouseDownHandler} onMouseUp={this.onMouseUpHandler} style={{
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

