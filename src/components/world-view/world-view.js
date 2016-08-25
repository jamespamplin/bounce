//@flow

import { Ball } from '../ball/ball.js';

export class WorldView {
  allBalls: Array<Ball>;
  elem: HTMLElement;


  constructor( elem: HTMLElement ) {
    this.elem = elem;
    this.allBalls = [];

    const clickHandler: EventHandler = this.worldClicked.bind( this );

    elem.addEventListener( 'click', clickHandler );
  }

  addBall( x: number, y: number ) {
    const newBall = new Ball( x, y );
    this.allBalls.push( newBall );
    this.elem.appendChild( newBall.elem );
  }

  worldClicked( event: MouseEvent ) {
    const { offsetX, offsetY } = event;
    this.addBall( offsetX, offsetY );
  }
}
