/*global document */
//@flow

const SVG_NS = 'http://www.w3.org/2000/svg';

// Hardcoded radius for now
const defaultRadius = 6;

declare class SVGLength {
  value: number;
  valueAsString: string;
}

declare class SVGAnimatedLength {
  baseVal: SVGLength;
}

declare class SVGCircleElement extends Element {
  cx: SVGAnimatedLength;
  cy: SVGAnimatedLength;
  r: SVGAnimatedLength;
}

export class Ball {
  elem: SVGCircleElement;
  stopped: boolean;
  currentTime: number;
  initialCoords: [ number, number ];

  constructor( x: number, y: number ) {
    this.elem = makeCircle( x, y, defaultRadius );
    this.stopped = false;
    this.currentTime = 0;
    this.initialCoords = [ x, y ];
  }

  isMoving() {
    return !this.stopped;
  }

  getCoords(): [ number, number ] {
    const cx = this.elem.cx.baseVal.value;
    const cy = this.elem.cy.baseVal.value;

    return [ cx, cy ];
  }

  move() {
    this.currentTime += 1;

    const velocity = 50;
    const [ initialX, initialY ] = this.initialCoords;
    const [ x, y ] = calcPosition( 0, 0, velocity, this.currentTime );

    this.moveTo( initialX + x, initialY - y );
  }

  moveTo( cx: number, cy: number ) {
    setCirclePosition( this.elem, cx, cy );
  }
}


/**
 * Calculate position of ball at a given time, based on starting velocity.
 *
 * Formulas from: http://entertainment.howstuffworks.com/physics-of-football2.htm
 *
 * @param initialX: starting X coord
 * @param initialY: starting Y coord
 * @param v: velocity
 * @param t: current time
 * @returns tuple of [ x, y ] coord
 */
function calcPosition( initialX: number, initialY: number, v: number, t: number ): [ number, number ] {
  // Math.cos and Math.sin require angle in radians
  const angle = degreesToRadians( 80 ),
    vx = v * Math.cos( angle ),
    vy = v * Math.sin( angle ),
    x = vx * t,
    y = vy * t - 0.5 * 9.8 * t * t

  return [ x, y ];
}

function degreesToRadians( angle ) {
  return angle * ( Math.PI / 180 );
}


function makeCircle( cx: number, cy: number, radius: number ): SVGCircleElement {
  const circleElement: SVGCircleElement = createSVGElement( 'circle' );
  setCircleRadius( circleElement, radius );
  setCirclePosition( circleElement, cx, cy );
  circleElement.setAttribute( 'class', 'ball' );
  return circleElement;
}

function createSVGElement<T>( nodeName: string ): T {
  // Requires cast to any for return type T to work
  return ( document.createElementNS( SVG_NS, nodeName ): any );
}

function setCircleRadius( circleElement: SVGCircleElement, r: number ) {
  circleElement.setAttribute( 'r', r.toString() );
}

function setCirclePosition( circleElement: SVGCircleElement, x: number, y: number ) {
  circleElement.setAttribute( 'cx', x.toString() );
  circleElement.setAttribute( 'cy', y.toString() );
}
