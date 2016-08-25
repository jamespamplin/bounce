/*global document */
//@flow

const SVG_NS = 'http://www.w3.org/2000/svg';

// Hardcoded radius for now
const defaultRadius = 10;

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

  constructor( x: number, y: number ) {
    this.elem = makeCircle( x, y, defaultRadius );
    this.stopped = false;
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
    const [ cx, cy ] = this.getCoords();
    const velocity = 10;
    const maxY = 400;

    if ( cy + velocity >= maxY ) {
      this.moveTo( cx + velocity, maxY );
      this.stopped = true;
    } else {
      this.moveTo( cx + velocity, cy + velocity );
    }
  }

  moveTo( cx: number, cy: number ) {
    setCirclePosition( this.elem, cx, cy );
  }
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
