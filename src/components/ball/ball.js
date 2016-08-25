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
  initialVelocity: number;
  initialAngle: number;


  constructor( x: number, y: number ) {
    this.elem = makeCircle( x, y, defaultRadius );
    this.stopped = false;
    this.currentTime = 0;

    this.initialCoords = [ x, y ];
    this.initialAngle = getRandomInt( 0, 360 );
    this.initialVelocity = getRandomInt( 10, 200 );
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

    const [ initialX, initialY ] = this.initialCoords;
    const [ x, y ] = calcPosition( initialX, initialY, this.initialAngle, this.initialVelocity, this.currentTime );

    this.moveTo( x, y );
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
 * @param angleDegrees: starting angle in degrees
 * @param v: velocity
 * @param t: current time
 * @returns tuple of [ x, y ] coord
 */
function calcPosition( initialX: number, initialY: number, angleDegrees: number, v: number, t: number ): [ number, number ] {
  // Math.cos and Math.sin require angle in radians
  const angleRadians = degreesToRadians( angleDegrees ),
    vx = v * Math.cos( angleRadians ),
    vy = v * Math.sin( angleRadians ),
    x = vx * t,
    y = vy * t - 0.5 * 9.8 * t * t

  return [ initialX + x, initialY - y ];
}

function degreesToRadians( angle ) {
  return angle * ( Math.PI / 180 );
}

function getRandomInt( min: number, max: number ) {
  return Math.floor( Math.random() * ( max - min ) ) + min;
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
