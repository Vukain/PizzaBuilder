import React, { Component, Suspense } from 'react';
import Hammer from 'react-hammerjs';
// import Hammor from 'hammerjs';

import gsap from 'gsap';

import './Ingredient.sass';

import IngredientControl from '../IngredientControl/IngredientControl';

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
            x: this.lefts, y: this.tops, relX: 0, relY: 0, scale: 1, touchInitialScale: 1, rotate: this.rotate, touchInitialRotate: this.rotate, touchRotate: false, cursor: 'grab',
            ingred: this.ingred.length === undefined ? this.ingred : this.ingred[Math.floor(Math.random() * this.ingred.length)]
        };
    };

    // componentDidMount() {
    //     const el = document.querySelector(`#${this.props.id}`);

    //     const hammertime = new Hammor(el);
    //     hammertime.get('rotate').set({ enable: true })
    //     hammertime.on('rotate', e => {
    //         console.log('hammoooor')
    //     })
    // }

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

    ingredControl = (mode, value) => {
        switch (mode) {
            case 'rotate':
                this.setState((prevState) => ({ rotate: prevState.rotate + value, touchInitialRotate: prevState.touchInitialRotate + value}))
                break;
            case 'counter':
                this.setState((prevState) => ({ rotate: prevState.rotate - value, touchInitialRotate: prevState.touchInitialRotate - value }))
                break;
            case 'enlarge':
                if (this.state.scale < 6) {
                    this.setState((prevState) => ({ scale: prevState.scale + value / 100, touchInitialScale: prevState.touchInitialScale + value / 100 }))
                };
                break;
            case 'shrink':
                if (this.state.scale > 0.2) {
                    this.setState((prevState) => ({ scale: prevState.scale - value / 100, touchInitialScale: prevState.touchInitialScale - value / 100 }))
                };
                break;
            default:
                console.log(`Sorry`);
        };
    };

    onMouseMoveHandler = (e) => {
        const { clientX, clientY } = e;
        this.setState((prevState) => ({ x: clientX - prevState.relX, y: clientY - prevState.relY }));
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
        if (e.key === 'e') {
            this.ingredControl('enlarge', 15);
        } else if (e.key === 's') {
            this.ingredControl('shrink', 15);
        };
    }

    onMouseDownHandler = (e) => {
        this.props.setCurrent(this.props.id);
        const { clientX, clientY } = e;
        this.setState((prevState) => ({ relX: clientX - prevState.x, relY: clientY - prevState.y, scale: prevState.scale + 0.2, cursor: 'grabbing' }))
        window.addEventListener('mousemove', this.onMouseMoveHandler);
        window.addEventListener('wheel', this.onScrollHandler);
        window.addEventListener('keydown', this.onKeyHandler);
        window.addEventListener('mouseup', this.onMouseUpHandler);
    };

    onMouseUpHandler = (e) => {
        const { clientX, clientY } = e;
        this.setState((prevState) => ({ scale: prevState.scale - 0.2, cursor: 'grab' }));
        window.removeEventListener('mousemove', this.onMouseMoveHandler);
        window.removeEventListener('wheel', this.onScrollHandler);
        window.removeEventListener('keydown', this.onKeyHandler);
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
        this.setState((prevState) => ({ scale: e.scale * prevState.touchInitialScale }));
    };

    onPinchEndHandler = (e) => {
        this.setState((prevState) => ({ touchInitialScale: prevState.scale }));
    };

    render() {

        const Io = this.state.ingred;
        const cls = `ingredient ingredient--${this.props.type.replace(' ', '_')}`;
        const controls = ['rotate', 'counter', 'shrink', 'enlarge'].map(elem => <IngredientControl key={elem} rotator={() => { this.ingredControl(elem, 15) }} type={elem} />);
        const controlPanel = this.props.id === this.props.current ? controls : null;

        return (
            <Hammer options={{
                recognizers: {
                    rotate: { enable: true }, pinch: { enable: true }
                }
            }}
                onRotateStart={this.onRotateStartHandler}
                onRotateMove={this.onRotateMoveHandler}
                onRotateEnd={this.onRotateEndHandler}
                onPinchIn={this.onPinchHandler}
                onPinchOut={this.onPinchHandler}
                onPinchEnd={this.onPinchEndHandler}>
                <div>
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

                    {controlPanel}
                </div>

            </Hammer>);
    };
};

export default Ingredient;
