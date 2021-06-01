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
        this.tops = document.querySelector('.ingred_dispencer__plate').offsetHeight / 2;
        this.lefts = document.querySelector('.ingred_dispencer__plate').offsetWidth / 2;
        this.rotate = window.matchMedia('(orientation: landscape)').matches ? this.vertical.includes(this.props.type) ? 90 : this.verticalCounter.includes(this.props.type) ? -90 : 0 : 0;
        this.state = {
            x: this.lefts, y: this.tops, relX: 0, relY: 0, scale: 1, touchRotate: false, touchInitialRotate: 0, rotate: this.rotate, cursor: 'grab',
            ingred: this.ingred.length === undefined ? this.ingred : this.ingred[Math.floor(Math.random() * this.ingred.length)]
        };
        this.onMouseMoveHandler = this.onMouseMoveHandler.bind(this);
    };

    itemDeleter = (clientX, clientY) => {
        const bin = document.querySelector('.ingred_dispencer__bin');

        const binPositionCheck = window.matchMedia('(orientation: landscape)').matches ?
            clientX < bin.offsetWidth && clientY > document.body.offsetHeight - bin.offsetHeight :
            clientX < bin.offsetWidth && clientY < bin.offsetHeight;

        if (binPositionCheck) {
            const tl = gsap.timeline({ onComplete: () => { this.props.setIngreds(this.props.ingreds.filter(el => el.id !== this.props.id)) } });
            const item = document.getElementById(this.props.id);
            tl.to(item, { duration: 1, scale: .2, opacity: 0.7, transformOrigin: 'top left', transform: 'rotateZ(120deg)' });
        };
    }

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
        this.itemDeleter(clientX, clientY);
    };

    onTouchMoveHandler = (e) => {
        if (!this.state.touchRotate) {
            const clientX = e.touches[0].clientX;
            const clientY = e.touches[0].clientY;
            this.setState((prevState) => ({ x: clientX - prevState.relX, y: clientY - prevState.relY }));
        }
    };

    onTouchDownHandler = (e) => {
        const clientX = e.touches[0].clientX;
        const clientY = e.touches[0].clientY;
        this.setState({ relX: clientX - this.state.x, relY: clientY - this.state.y, scale: 1.2, cursor: 'grabbing', touchInitialRotate: this.state.rotate })
        window.addEventListener('touchmove', this.onTouchMoveHandler);
        window.addEventListener('touchend', this.onTouchUpHandler);
    };

    onTouchUpHandler = (e) => {
        const clientX = e.changedTouches[0].clientX;
        const clientY = e.changedTouches[0].clientY;
        this.setState({ scale: 1, cursor: 'grab', touchRotate: false });
        window.removeEventListener('touchmove', this.onTouchMoveHandler);
        window.removeEventListener('touchend', this.onTouchUpHandler);
        this.itemDeleter(clientX, clientY);
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
                    transform: ` translate(-50%, -50%) scale(${this.state.scale}) rotateZ(${this.state.rotate}deg)`,
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
