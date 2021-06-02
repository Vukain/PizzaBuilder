import React, { Component, Suspense } from 'react';
import Hammer from 'react-hammerjs';
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
            x: this.lefts, y: this.tops, relX: 0, relY: 0, scale: 1, touchRotate: false, touchInitialRotate: 0, rotate: this.rotate, cursor: 'grab',
            ingred: this.ingred.length === undefined ? this.ingred : this.ingred[Math.floor(Math.random() * this.ingred.length)]
        };
    };

    // componentDidMount() {
    //     const tlb = gsap.timeline();
    //     const buttons = document.querySelectorAll('.ingredient_control__button');
    //     tlb.to(buttons, { duration: 1, scale: 1.2 });
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

    ingredControl = (e, mode) => {
        switch (mode) {
            case 'rotate':
                this.setState((prevState) => ({ rotate: prevState.rotate + 15 }))
                break;
            case 'counter':
                this.setState((prevState) => ({ rotate: prevState.rotate - 15 }))
                break;
            case 'enlarge':
                this.setState((prevState) => ({ scale: prevState.scale + 0.15 }))
                break;
            case 'shrink':
                this.setState((prevState) => ({ scale: prevState.scale - 0.15 }))
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
            this.setState(prevState => ({ rotate: prevState.rotate + 5 }))
        } else {
            this.setState(prevState => ({ rotate: prevState.rotate - 5 }))
        };
    };

    onKeyHandler = (e) => {
        if (e.key === 'e') {
            this.setState(prevState => ({ scale: prevState.scale + 0.15 }))
        } else if (e.key === 's') {
            this.setState(prevState => ({ scale: prevState.scale - 0.15 }))
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
        this.setState((prevState) => ({ relX: clientX - prevState.x, relY: clientY - prevState.y, scale: prevState.scale + 0.2, cursor: 'grabbing', touchInitialRotate: prevState.rotate }));
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

    onRotationHandler = (e) => {
        this.setState({ rotate: Math.round(e.rotation), touchRotate: true });
    };

    render() {

        let Io = this.state.ingred;
        const cls = `ingredient ingredient--${this.props.type.replace(' ', '_')}`;
        const controls = ['rotate', 'counter', 'shrink', 'enlarge'].map(elem => <IngredientControl rotator={(e) => { this.ingredControl(e, elem) }} type={elem} />);
        const controlPanel = this.props.id === this.props.current ? controls : null;

        return (
            <Hammer options={{
                recognizers: {
                    rotate: { enable: true }, pinch: { enable: true }
                }
            }}
                onRotate={this.onRotationHandler}
                onPinch={(e) => { console.log(e) }}>
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
