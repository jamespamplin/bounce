//@flow
/*global document*/

const SVG_NS = 'http://www.w3.org/2000/svg';

function initialise( elem: HTMLElement ) {
  const handler: EventHandler = worldClicked.bind( null, elem );

  elem.addEventListener( 'click', handler );
}

function worldClicked( elem: HTMLElement, event: MouseEvent ) {
  const circleElement = makeCircle( event.clientX, event.clientY, 10 );
  elem.appendChild( circleElement );
}

function makeCircle( cx: number, cy: number, radius: number ): Node {
  const circleElement = document.createElementNS( SVG_NS, 'circle' );
  circleElement.setAttribute( 'cx', cx.toString() );
  circleElement.setAttribute( 'cy', cy.toString() );
  circleElement.setAttribute( 'r', radius.toString() );
  return circleElement;
}

export default {
  initialise
};
