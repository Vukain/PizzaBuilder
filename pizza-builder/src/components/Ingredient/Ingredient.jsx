import React, { Component, Suspense } from 'react';
import Hammer from 'react-hammerjs';
import gsap from 'gsap';

import './Ingredient.sass';

class Ingredient extends Component {

    constructor(props) {
        super(props);
        this.vertical = ['camembert half', 'basil', 'octopus'];
        this.verticalCounter = ['prosciutto', 'ham', 'camembert', 'rucola', 'mussel opened', 'mussel closed', 'shrimp shell'];
        this.ingred = this.props.imag[this.props.type];
        this.rotate = window.matchMedia('(orientation: landscape)').matches ? this.vertical.includes(this.props.type) ? 90 : this.verticalCounter.includes(this.props.type) ? -90 : 0 : 0;
        this.state = {
            x: 0, y: 0, relX: 0, relY: 0, scale: 1, touchRotate: false, rotate: this.rotate, cursor: 'grab',
            ingred: this.ingred.length === undefined ? this.ingred : this.ingred[Math.floor(Math.random() * this.ingred.length)]
        };
        this.onMouseMoveHandler = this.onMouseMoveHandler.bind(this);
    };

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
        this.setState((prevState) => ({ x: clientX - prevState.relX, y: clientY - prevState.relY }));
    };

    onScrollHandler = (e) => {
        const { deltaY } = e;
        if (deltaY > 0) {
            this.setState(prevState => ({ rotate: prevState.rotate + 5 }))
        } else {
            this.setState(prevState => ({ rotate: prevState.rotate - 5 }))
        };
    };

    onMouseDownHandler = (e) => {
        const { clientX, clientY } = e;
        this.setState({ relX: clientX - this.state.x, relY: clientY - this.state.y, scale: 1.2, cursor: 'grabbing' })
        window.addEventListener('mousemove', this.onMouseMoveHandler);
        window.addEventListener('wheel', this.onScrollHandler);
        window.addEventListener('mouseup', this.onMouseUpHandler);
    };

    onMouseUpHandler = (e) => {
        const { clientX, clientY } = e;
        this.setState({ scale: 1, cursor: 'grab' });
        window.removeEventListener('mousemove', this.onMouseMoveHandler);
        window.removeEventListener('wheel', this.onScrollHandler);
        window.removeEventListener('mouseup', this.onMouseUpHandler);
        const bin = document.querySelector('.ingred_dispencer__bin');
        if (clientX < bin.offsetWidth && clientY > document.body.offsetHeight - bin.offsetHeight) {
            const tl = gsap.timeline({ onComplete: () => { this.props.setIngreds(this.props.ingreds.filter(el => el.id !== this.props.id)) } });
            const item = document.getElementById(this.props.id);
            tl.to(item, { duration: 1, scale: .2, opacity: 0.7, transform: 'rotateZ(120deg)' });
        };
    };

    onTouchMoveHandler = (e) => {
        console.log(this.state.touchRotate)
        if (!this.state.touchRotate) {
            const clientX = e.touches[0].clientX;
            const clientY = e.touches[0].clientY;
            this.setState((prevState) => ({ x: clientX - prevState.relX, y: clientY - prevState.relY }));
        }
    };

    onTouchDownHandler = (e) => {
        const clientX = e.touches[0].clientX;
        const clientY = e.touches[0].clientY;
        this.setState({ relX: clientX - this.state.x, relY: clientY - this.state.y, scale: 1.2, cursor: 'grabbing' })
        window.addEventListener('touchmove', this.onTouchMoveHandler);
        window.addEventListener('touchend', this.onTouchUpHandler);
    };

    onTouchUpHandler = (e) => {
        const clientX = e.changedTouches[0].clientX;
        const clientY = e.changedTouches[0].clientY;
        this.setState({ scale: 1, cursor: 'grab', touchRotate: false });
        window.removeEventListener('touchmove', this.onTouchMoveHandler);
        window.removeEventListener('touchup', this.onTouchUpHandler);
        const bin = document.querySelector('.ingred_dispencer__bin');
        if (clientX < bin.offsetWidth && clientY > document.body.offsetHeight - bin.offsetHeight) {
            const tl = gsap.timeline({ onComplete: () => { this.props.setIngreds(this.props.ingreds.filter(el => el.id !== this.props.id)) } });
            const item = document.getElementById(this.props.id);
            tl.to(item, { duration: 1, scale: .2, opacity: 0.7, transform: 'rotateZ(120deg)' });
        };
    };

    onRotationHandler = (e) => {
        this.setState({ rotate: Math.round(e.rotation), touchRotate: true })
    };

    render() {

        let Io = this.state.ingred;
        const cls = `ingredient ingredient--${this.props.type.replace(' ', '_')}`;

        return (
            <Hammer options={{
                recognizers: {
                    rotate: { enable: true }
                }
            }}
                onRotate={this.onRotationHandler}>
                <div className={cls} id={this.props.id} onTouchStart={this.onTouchDownHandler} onMouseDown={this.onMouseDownHandler} style={{
                    top: `${this.state.y}px`,
                    left: `${this.state.x}px`,
                    transform: `scale(${this.state.scale}) rotateZ(${this.state.rotate}deg)`,
                    cursor: `${this.state.cursor}`,
                }}>

                    <Suspense fallback={<div></div>}>
                        < Io />
                    </Suspense>

                </div>
            </Hammer>);
    };
};

export default Ingredient;
