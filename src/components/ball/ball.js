/*global document */
//@flow

const SVG_NS = 'http://www.w3.org/2000/svg';

// Hardcoded radius for now
const defaultRadius = 10;

declare class SVGCircleElement extends Element {
  cx: number;
  cy: number;
  r: number;
}

export class Ball {
  elem: SVGCircleElement;

  constructor( x: number, y: number ) {
    this.elem = makeCircle( x, y, defaultRadius );
  }
}

function makeCircle( cx: number, cy: number, radius: number ): SVGCircleElement {
  const circleElement: SVGCircleElement = createSVGElement( 'circle' );
  setCircleRadius( circleElement, radius );
  setCirclePosition( circleElement, cx, cy );
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
