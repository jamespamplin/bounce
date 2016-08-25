//@flow

import { WorldView } from './components/world-view/world-view.js';

function initialise( elem: HTMLElement ) {
  new WorldView( elem );
}

export default {
  initialise
};
