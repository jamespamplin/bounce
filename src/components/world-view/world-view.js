//@flow
/*global window*/

import { Ball } from '../ball/ball.js';

export class WorldView {
  allBalls: Array<Ball>;
  elem: HTMLElement;


  constructor( elem: HTMLElement ) {
    this.elem = elem;
    this.allBalls = [];

    const clickHandler: EventHandler = this.worldClicked.bind( this );

    elem.addEventListener( 'click', clickHandler );

    window.setInterval( this.moveBalls.bind( this ), 200 );
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

  moveBalls() {
    this.allBalls
      .filter( b => b.isMoving() )
      .forEach( b => b.move() );
  }
}
