import React, { Component, Suspense } from 'react';
import Hammer from 'react-hammerjs';
import gsap from 'gsap';

import './Ingredient.sass';

import { IngredControlPanel } from './IngredControlPanel/IngredControlPanel';

export class Ingredient extends Component {

    constructor(props) {
        super(props);
        this.vertical = ['camembert half', 'basil', 'octopus'];
        this.verticalCounter = ['prosciutto', 'ham', 'camembert', 'rucola', 'mussel opened', 'mussel closed', 'shrimp'];
        this.ingred = this.props.imag[this.props.type];
        this.tops = document.querySelector('.ingred_dispencer__plate').offsetHeight / 2;
        this.lefts = document.querySelector('.ingred_dispencer__plate').offsetWidth / 2;
        this.rotate = window.matchMedia('(orientation: landscape)').matches ? this.vertical.includes(this.props.type) ? 90 : this.verticalCounter.includes(this.props.type) ? -90 : 0 : 0;
        this.state = {
            x: this.lefts, y: this.tops, relX: 0, relY: 0, scale: 1, touchInitialScale: 1, rotate: this.rotate, touchInitialRotate: this.rotate, touchRotate: false, cursor: 'grab',
            ingred: this.ingred.length === undefined ? this.ingred : this.ingred[Math.floor(Math.random() * this.ingred.length)]
        };
    };

    componentDidMount() {
        this.props.setCurrent(this.props.id);
    }

    itemDeleter = (clientX, clientY) => {
        const bin = document.querySelector('.ingred_dispencer__bin');

        const binPositionCheck = window.matchMedia('(orientation: landscape)').matches ?
            clientX < bin.offsetWidth && clientY > document.body.offsetHeight - bin.offsetHeight :
            clientX > bin.offsetLeft && clientY < bin.offsetHeight;

        if (binPositionCheck) {
            const tl = gsap.timeline({ onComplete: () => { this.props.setIngreds(this.props.ingreds.filter(el => el.id !== this.props.id)) } });
            const item = document.getElementById(this.props.id);
            tl.to(item, { duration: 1, scale: .2, opacity: 0.7, transformOrigin: 'top left', transform: 'rotateZ(120deg)' });
        };
    };

    itemZChanger = (direction) => {
        let idxe = 0;

        this.props.ingreds.forEach((el, idx) => { if (el.id === this.props.id) { idxe = idx } })

        if (direction === 'higher') {
            if (idxe < this.props.ingreds.length - 1) {
                const newElems = [...this.props.ingreds];
                const el = newElems.splice(idxe, 1);
                newElems.splice(idxe + 1, 0, ...el);
                this.props.setIngreds(newElems)
            };
        } else {
            if (idxe > 0) {
                const newElems = [...this.props.ingreds];
                const el = newElems.splice(idxe, 1);
                newElems.splice(idxe - 1, 0, ...el);
                this.props.setIngreds(newElems)
            };
        };
    };

    ingredControl = (mode, value) => {
        switch (mode) {
            case 'rotate':
                this.setState((prevState) => ({ rotate: prevState.rotate + value, touchInitialRotate: prevState.touchInitialRotate + value }));
                break;
            case 'counter':
                this.setState((prevState) => ({ rotate: prevState.rotate - value, touchInitialRotate: prevState.touchInitialRotate - value }));
                break;
            case 'enlarge':
                if (this.state.scale < 6) {
                    this.setState((prevState) => ({ scale: prevState.scale + value / 100, touchInitialScale: prevState.touchInitialScale + value / 100 }));
                };
                break;
            case 'shrink':
                if (this.state.scale > 0.2) {
                    this.setState((prevState) => ({ scale: prevState.scale - value / 100, touchInitialScale: prevState.touchInitialScale - value / 100 }));
                };
                break;
            case 'up':
                this.setState((prevState) => ({ y: prevState.y - value }));
                break;
            case 'down':
                this.setState((prevState) => ({ y: prevState.y + value }));
                break;
            case 'left':
                this.setState((prevState) => ({ x: prevState.x - value }));
                break;
            case 'right':
                this.setState((prevState) => ({ x: prevState.x + value }));
                break;
            case 'higher':
                this.itemZChanger('higher');;
                break;
            case 'lower':
                this.itemZChanger('lower');;
                break;
            default:
                console.log(`Sorry`);
        };
    };

    onScrollHandler = (e) => {
        const { deltaY } = e;
        if (deltaY > 0) {
            this.ingredControl('rotate', 5);
        } else {
            this.ingredControl('counter', 5);
        };
    };

    onKeyHandler = (e) => {
        if (e.key === 'w' || e.key === 'W') {
            this.ingredControl('enlarge', 15);
        } else if (e.key === 's' || e.key === 'S') {
            this.ingredControl('shrink', 15);
        } else if (e.key === 'e' || e.key === 'E') {
            this.ingredControl('rotate', 15);
        } else if (e.key === 'q' || e.key === 'Q') {
            this.ingredControl('counter', 15);
        } else if (e.key === 'x' || e.key === 'X') {
            const tl = gsap.timeline({ onComplete: () => { this.props.setIngreds(this.props.ingreds.filter(el => el.id !== this.props.id)) } });
            const item = document.getElementById(this.props.id);
            tl.to(item, { duration: 1, scale: .2, opacity: 0.7, transformOrigin: 'top left', transform: 'rotateZ(120deg)' });
        } else if (e.key === 'c' || e.key === 'C') {
            this.itemZChanger('higher');
        } else if (e.key === 'z' || e.key === 'Z') {
            this.itemZChanger('lower');
        } else if (e.key === 'ArrowUp' && this.state.y > 0) {
            this.ingredControl('up', 10);
        } else if (e.key === 'ArrowDown' && this.state.y < window.innerHeight) {
            this.ingredControl('down', 10);
        } else if (e.key === 'ArrowLeft' && this.state.x > 0) {
            this.ingredControl('left', 10);
        } else if (e.key === 'ArrowRight' && this.state.x < window.innerWidth) {
            this.ingredControl('right', 10);
        };
    };

    onMouseDownHandler = (e) => {
        this.props.setCurrent(this.props.id);
        const { clientX, clientY } = e;
        this.setState((prevState) => ({ relX: clientX - prevState.x, relY: clientY - prevState.y, scale: prevState.scale + 0.2, cursor: 'grabbing' }))
        window.addEventListener('mousemove', this.onMouseMoveHandler);
        window.addEventListener('wheel', this.onScrollHandler);
        window.addEventListener('mouseup', this.onMouseUpHandler);
    };

    onMouseMoveHandler = (e) => {
        const { clientX, clientY } = e;
        this.setState((prevState) => ({ x: clientX - prevState.relX, y: clientY - prevState.relY }));
    };

    onMouseUpHandler = (e) => {
        const { clientX, clientY } = e;
        this.setState((prevState) => ({ scale: prevState.scale - 0.2, cursor: 'grab' }));
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
        };
    };

    onTouchDownHandler = (e) => {
        this.props.setCurrent(this.props.id);
        const clientX = e.touches[0].clientX;
        const clientY = e.touches[0].clientY;
        this.setState((prevState) => ({ relX: clientX - prevState.x, relY: clientY - prevState.y, scale: prevState.scale + 0.2, cursor: 'grabbing' }));
        window.addEventListener('touchmove', this.onTouchMoveHandler);
        window.addEventListener('touchend', this.onTouchUpHandler);
    };

    onTouchUpHandler = (e) => {
        const clientX = e.changedTouches[0].clientX;
        const clientY = e.changedTouches[0].clientY;
        const scaler = this.state.touchRotate ? 0.4 : 0.2;
        this.setState((prevState) => ({ scale: this.state.scale - scaler, cursor: 'grab', touchRotate: false }));
        window.removeEventListener('touchmove', this.onTouchMoveHandler);
        window.removeEventListener('touchend', this.onTouchUpHandler);
        this.itemDeleter(clientX, clientY);
    };

    onRotateStartHandler = (e) => {
        console.log('initial' + Math.round(e.rotation))
        this.setState((prevState) => ({ touchInitialRotate: prevState.touchInitialRotate - Math.round(e.rotation), touchRotate: true }));
    };

    onRotateMoveHandler = (e) => {
        console.log(this.state.touchInitialRotate + Math.round(e.rotation))
        this.setState((prevState) => ({ rotate: prevState.touchInitialRotate + Math.round(e.rotation) }));
    };

    onRotateEndHandler = (e) => {
        console.log('end')
        this.setState((prevState) => ({ touchInitialRotate: prevState.rotate }));
    };

    onPinchHandler = (e) => {
        if (this.state.scale < 6 || e.scale < 1) {
            this.setState((prevState) => ({ scale: e.scale * prevState.touchInitialScale }));
        };
    };

    onPinchEndHandler = (e) => {
        this.setState((prevState) => ({ touchInitialScale: prevState.scale }));
    };

    onFocusHandler = (e) => {
        this.props.setCurrent(this.props.id);
    };

    render() {

        const IngredientImage = this.state.ingred;
        const active = this.props.id === this.props.current ? 'ingredient--active' : null;
        const cls = `ingredient ingredient--${this.props.type.replace(' ', '_')} ${active}`;

        return (
            <Hammer options={{
                recognizers: { rotate: { enable: true }, pinch: { enable: true } }
            }}
                onRotateStart={this.onRotateStartHandler}
                onRotateMove={this.onRotateMoveHandler}
                onRotateEnd={this.onRotateEndHandler}
                onPinchIn={this.onPinchHandler}
                onPinchOut={this.onPinchHandler}
                onPinchEnd={this.onPinchEndHandler}>
                <div>
                    <div tabIndex='1' className={cls} id={this.props.id} onFocus={this.onFocusHandler} onTouchStart={this.onTouchDownHandler} onMouseDown={this.onMouseDownHandler} style={{
                        top: `${this.state.y}px`,
                        left: `${this.state.x}px`,
                        transform: ` translate(-50%, -50%) scale(${this.state.scale}) rotateZ(${this.state.rotate}deg)`,
                        cursor: `${this.state.cursor}`,
                    }}>
                        <Suspense fallback={<div />}>
                            < IngredientImage />
                        </Suspense>
                    </div>
                    {this.props.id === this.props.current ? <IngredControlPanel listener={this.onKeyHandler} ingredControl={this.ingredControl} /> : null}
                </div>

            </Hammer>);
    };
};