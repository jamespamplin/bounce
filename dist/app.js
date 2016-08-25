(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.app = factory());
}(this, (function () { 'use strict';

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();

/*global document */
//     

var SVG_NS = 'http://www.w3.org/2000/svg';

// Hardcoded radius for now
var defaultRadius = 6;

var Ball = function () {
  function Ball(x, y) {
    classCallCheck(this, Ball);

    this.elem = makeCircle(x, y, defaultRadius);
    this.stopped = false;
    this.currentTime = 0;

    this.initialCoords = [x, y];
    this.initialAngle = getRandomInt(0, 360);
    this.initialVelocity = getRandomInt(10, 200);
  }

  createClass(Ball, [{
    key: 'isMoving',
    value: function isMoving() {
      return !this.stopped;
    }
  }, {
    key: 'getCoords',
    value: function getCoords() {
      var cx = this.elem.cx.baseVal.value;
      var cy = this.elem.cy.baseVal.value;

      return [cx, cy];
    }
  }, {
    key: 'move',
    value: function move() {
      this.currentTime += 1;

      var _initialCoords = slicedToArray(this.initialCoords, 2);

      var initialX = _initialCoords[0];
      var initialY = _initialCoords[1];

      var _calcPosition = calcPosition(initialX, initialY, this.initialAngle, this.initialVelocity, this.currentTime);

      var _calcPosition2 = slicedToArray(_calcPosition, 2);

      var x = _calcPosition2[0];
      var y = _calcPosition2[1];


      this.moveTo(x, y);
    }
  }, {
    key: 'moveTo',
    value: function moveTo(cx, cy) {
      setCirclePosition(this.elem, cx, cy);
    }
  }]);
  return Ball;
}();

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
function calcPosition(initialX, initialY, angleDegrees, v, t) {
  // Math.cos and Math.sin require angle in radians
  var angleRadians = degreesToRadians(angleDegrees),
      vx = v * Math.cos(angleRadians),
      vy = v * Math.sin(angleRadians),
      x = vx * t,
      y = vy * t - 0.5 * 9.8 * t * t;

  return [initialX + x, initialY - y];
}

function degreesToRadians(angle) {
  return angle * (Math.PI / 180);
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function makeCircle(cx, cy, radius) {
  var circleElement = createSVGElement('circle');
  setCircleRadius(circleElement, radius);
  setCirclePosition(circleElement, cx, cy);
  circleElement.setAttribute('class', 'ball');
  return circleElement;
}

function createSVGElement(nodeName) {
  // Requires cast to any for return type T to work
  return document.createElementNS(SVG_NS, nodeName);
}

function setCircleRadius(circleElement, r) {
  circleElement.setAttribute('r', r.toString());
}

function setCirclePosition(circleElement, x, y) {
  circleElement.setAttribute('cx', x.toString());
  circleElement.setAttribute('cy', y.toString());
}

//     
/*global window*/

var WorldView = function () {
  function WorldView(elem) {
    classCallCheck(this, WorldView);

    this.elem = elem;
    this.allBalls = [];

    var clickHandler = this.worldClicked.bind(this);

    elem.addEventListener('click', clickHandler);

    window.setInterval(this.moveBalls.bind(this), 200);
  }

  createClass(WorldView, [{
    key: 'addBall',
    value: function addBall(x, y) {
      var newBall = new Ball(x, y);
      this.allBalls.push(newBall);
      this.elem.appendChild(newBall.elem);
    }
  }, {
    key: 'worldClicked',
    value: function worldClicked(event) {
      var offsetX = event.offsetX;
      var offsetY = event.offsetY;

      this.addBall(offsetX, offsetY);
    }
  }, {
    key: 'moveBalls',
    value: function moveBalls() {
      this.allBalls.filter(function (b) {
        return b.isMoving();
      }).forEach(function (b) {
        return b.move();
      });
    }
  }]);
  return WorldView;
}();

//     

function initialise(elem) {
  new WorldView(elem);
}

var app = {
  initialise: initialise
};

return app;

})));
//# sourceMappingURL=app.js.map
