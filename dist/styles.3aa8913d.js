// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"node_modules/ol/ImageState.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * @module ol/ImageState
 */

/**
 * @enum {number}
 */
var _default = {
  IDLE: 0,
  LOADING: 1,
  LOADED: 2,
  ERROR: 3,
  EMPTY: 4
};
exports.default = _default;
},{}],"node_modules/ol/util.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.abstract = abstract;
exports.getUid = getUid;
exports.VERSION = void 0;

/**
 * @module ol/util
 */

/**
 * @return {?} Any return.
 */
function abstract() {
  return (
    /** @type {?} */
    function () {
      throw new Error('Unimplemented abstract method.');
    }()
  );
}
/**
 * Counter for getUid.
 * @type {number}
 * @private
 */


var uidCounter_ = 0;
/**
 * Gets a unique ID for an object. This mutates the object so that further calls
 * with the same object as a parameter returns the same value. Unique IDs are generated
 * as a strictly increasing sequence. Adapted from goog.getUid.
 *
 * @param {Object} obj The object to get the unique ID for.
 * @return {string} The unique ID for the object.
 * @api
 */

function getUid(obj) {
  return obj.ol_uid || (obj.ol_uid = String(++uidCounter_));
}
/**
 * OpenLayers version.
 * @type {string}
 */


var VERSION = '6.4.3';
exports.VERSION = VERSION;
},{}],"node_modules/ol/size.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buffer = buffer;
exports.hasArea = hasArea;
exports.scale = scale;
exports.toSize = toSize;

/**
 * @module ol/size
 */

/**
 * An array of numbers representing a size: `[width, height]`.
 * @typedef {Array<number>} Size
 * @api
 */

/**
 * Returns a buffered size.
 * @param {Size} size Size.
 * @param {number} num The amount by which to buffer.
 * @param {Size=} opt_size Optional reusable size array.
 * @return {Size} The buffered size.
 */
function buffer(size, num, opt_size) {
  if (opt_size === undefined) {
    opt_size = [0, 0];
  }

  opt_size[0] = size[0] + 2 * num;
  opt_size[1] = size[1] + 2 * num;
  return opt_size;
}
/**
 * Determines if a size has a positive area.
 * @param {Size} size The size to test.
 * @return {boolean} The size has a positive area.
 */


function hasArea(size) {
  return size[0] > 0 && size[1] > 0;
}
/**
 * Returns a size scaled by a ratio. The result will be an array of integers.
 * @param {Size} size Size.
 * @param {number} ratio Ratio.
 * @param {Size=} opt_size Optional reusable size array.
 * @return {Size} The scaled size.
 */


function scale(size, ratio, opt_size) {
  if (opt_size === undefined) {
    opt_size = [0, 0];
  }

  opt_size[0] = size[0] * ratio + 0.5 | 0;
  opt_size[1] = size[1] * ratio + 0.5 | 0;
  return opt_size;
}
/**
 * Returns an `Size` array for the passed in number (meaning: square) or
 * `Size` array.
 * (meaning: non-square),
 * @param {number|Size} size Width and height.
 * @param {Size=} opt_size Optional reusable size array.
 * @return {Size} Size.
 * @api
 */


function toSize(size, opt_size) {
  if (Array.isArray(size)) {
    return size;
  } else {
    if (opt_size === undefined) {
      opt_size = [size, size];
    } else {
      opt_size[0] = size;
      opt_size[1] = size;
    }

    return opt_size;
  }
}
},{}],"node_modules/ol/style/Image.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _util = require("../util.js");

var _size = require("../size.js");

/**
 * @module ol/style/Image
 */

/**
 * @typedef {Object} Options
 * @property {number} opacity
 * @property {boolean} rotateWithView
 * @property {number} rotation
 * @property {number|import("../size.js").Size} scale
 * @property {Array<number>} displacement
 */

/**
 * @classdesc
 * A base class used for creating subclasses and not instantiated in
 * apps. Base class for {@link module:ol/style/Icon~Icon}, {@link module:ol/style/Circle~CircleStyle} and
 * {@link module:ol/style/RegularShape~RegularShape}.
 * @abstract
 * @api
 */
var ImageStyle =
/** @class */
function () {
  /**
   * @param {Options} options Options.
   */
  function ImageStyle(options) {
    /**
     * @private
     * @type {number}
     */
    this.opacity_ = options.opacity;
    /**
     * @private
     * @type {boolean}
     */

    this.rotateWithView_ = options.rotateWithView;
    /**
     * @private
     * @type {number}
     */

    this.rotation_ = options.rotation;
    /**
     * @private
     * @type {number|import("../size.js").Size}
     */

    this.scale_ = options.scale;
    /**
     * @private
     * @type {import("../size.js").Size}
     */

    this.scaleArray_ = (0, _size.toSize)(options.scale);
    /**
     * @private
     * @type {Array<number>}
     */

    this.displacement_ = options.displacement;
  }
  /**
   * Clones the style.
   * @return {ImageStyle} The cloned style.
   * @api
   */


  ImageStyle.prototype.clone = function () {
    var scale = this.getScale();
    return new ImageStyle({
      opacity: this.getOpacity(),
      scale: Array.isArray(scale) ? scale.slice() : scale,
      rotation: this.getRotation(),
      rotateWithView: this.getRotateWithView(),
      displacement: this.getDisplacement().slice()
    });
  };
  /**
   * Get the symbolizer opacity.
   * @return {number} Opacity.
   * @api
   */


  ImageStyle.prototype.getOpacity = function () {
    return this.opacity_;
  };
  /**
   * Determine whether the symbolizer rotates with the map.
   * @return {boolean} Rotate with map.
   * @api
   */


  ImageStyle.prototype.getRotateWithView = function () {
    return this.rotateWithView_;
  };
  /**
   * Get the symoblizer rotation.
   * @return {number} Rotation.
   * @api
   */


  ImageStyle.prototype.getRotation = function () {
    return this.rotation_;
  };
  /**
   * Get the symbolizer scale.
   * @return {number|import("../size.js").Size} Scale.
   * @api
   */


  ImageStyle.prototype.getScale = function () {
    return this.scale_;
  };
  /**
   * Get the symbolizer scale array.
   * @return {import("../size.js").Size} Scale array.
   */


  ImageStyle.prototype.getScaleArray = function () {
    return this.scaleArray_;
  };
  /**
   * Get the displacement of the shape
   * @return {Array<number>} Shape's center displacement
   * @api
   */


  ImageStyle.prototype.getDisplacement = function () {
    return this.displacement_;
  };
  /**
   * Get the anchor point in pixels. The anchor determines the center point for the
   * symbolizer.
   * @abstract
   * @return {Array<number>} Anchor.
   */


  ImageStyle.prototype.getAnchor = function () {
    return (0, _util.abstract)();
  };
  /**
   * Get the image element for the symbolizer.
   * @abstract
   * @param {number} pixelRatio Pixel ratio.
   * @return {HTMLCanvasElement|HTMLVideoElement|HTMLImageElement} Image element.
   */


  ImageStyle.prototype.getImage = function (pixelRatio) {
    return (0, _util.abstract)();
  };
  /**
   * @abstract
   * @return {HTMLCanvasElement|HTMLVideoElement|HTMLImageElement} Image element.
   */


  ImageStyle.prototype.getHitDetectionImage = function () {
    return (0, _util.abstract)();
  };
  /*
   * Get the image pixel ratio.
   * @param {number} pixelRatio Pixel ratio.
   * */


  ImageStyle.prototype.getPixelRatio = function (pixelRatio) {
    return 1;
  };
  /**
   * @abstract
   * @return {import("../ImageState.js").default} Image state.
   */


  ImageStyle.prototype.getImageState = function () {
    return (0, _util.abstract)();
  };
  /**
   * @abstract
   * @return {import("../size.js").Size} Image size.
   */


  ImageStyle.prototype.getImageSize = function () {
    return (0, _util.abstract)();
  };
  /**
   * @abstract
   * @return {import("../size.js").Size} Size of the hit-detection image.
   */


  ImageStyle.prototype.getHitDetectionImageSize = function () {
    return (0, _util.abstract)();
  };
  /**
   * Get the origin of the symbolizer.
   * @abstract
   * @return {Array<number>} Origin.
   */


  ImageStyle.prototype.getOrigin = function () {
    return (0, _util.abstract)();
  };
  /**
   * Get the size of the symbolizer (in pixels).
   * @abstract
   * @return {import("../size.js").Size} Size.
   */


  ImageStyle.prototype.getSize = function () {
    return (0, _util.abstract)();
  };
  /**
   * Set the opacity.
   *
   * @param {number} opacity Opacity.
   * @api
   */


  ImageStyle.prototype.setOpacity = function (opacity) {
    this.opacity_ = opacity;
  };
  /**
   * Set whether to rotate the style with the view.
   *
   * @param {boolean} rotateWithView Rotate with map.
   * @api
   */


  ImageStyle.prototype.setRotateWithView = function (rotateWithView) {
    this.rotateWithView_ = rotateWithView;
  };
  /**
   * Set the rotation.
   *
   * @param {number} rotation Rotation.
   * @api
   */


  ImageStyle.prototype.setRotation = function (rotation) {
    this.rotation_ = rotation;
  };
  /**
   * Set the scale.
   *
   * @param {number|import("../size.js").Size} scale Scale.
   * @api
   */


  ImageStyle.prototype.setScale = function (scale) {
    this.scale_ = scale;
    this.scaleArray_ = (0, _size.toSize)(scale);
  };
  /**
   * @abstract
   * @param {function(import("../events/Event.js").default): void} listener Listener function.
   */


  ImageStyle.prototype.listenImageChange = function (listener) {
    (0, _util.abstract)();
  };
  /**
   * Load not yet loaded URI.
   * @abstract
   */


  ImageStyle.prototype.load = function () {
    (0, _util.abstract)();
  };
  /**
   * @abstract
   * @param {function(import("../events/Event.js").default): void} listener Listener function.
   */


  ImageStyle.prototype.unlistenImageChange = function (listener) {
    (0, _util.abstract)();
  };

  return ImageStyle;
}();

var _default = ImageStyle;
exports.default = _default;
},{"../util.js":"node_modules/ol/util.js","../size.js":"node_modules/ol/size.js"}],"node_modules/ol/AssertionError.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _util = require("./util.js");

var __extends = void 0 && (void 0).__extends || function () {
  var extendStatics = function (d, b) {
    extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    };

    return extendStatics(d, b);
  };

  return function (d, b) {
    extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
/**
 * @module ol/AssertionError
 */


/**
 * Error object thrown when an assertion failed. This is an ECMA-262 Error,
 * extended with a `code` property.
 * See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error.
 */
var AssertionError =
/** @class */
function (_super) {
  __extends(AssertionError, _super);
  /**
   * @param {number} code Error code.
   */


  function AssertionError(code) {
    var _this = this;

    var path = _util.VERSION === 'latest' ? _util.VERSION : 'v' + _util.VERSION.split('-')[0];
    var message = 'Assertion failed. See https://openlayers.org/en/' + path + '/doc/errors/#' + code + ' for details.';
    _this = _super.call(this, message) || this;
    /**
     * Error code. The meaning of the code can be found on
     * https://openlayers.org/en/latest/doc/errors/ (replace `latest` with
     * the version found in the OpenLayers script's header comment if a version
     * other than the latest is used).
     * @type {number}
     * @api
     */

    _this.code = code;
    /**
     * @type {string}
     */

    _this.name = 'AssertionError'; // Re-assign message, see https://github.com/Rich-Harris/buble/issues/40

    _this.message = message;
    return _this;
  }

  return AssertionError;
}(Error);

var _default = AssertionError;
exports.default = _default;
},{"./util.js":"node_modules/ol/util.js"}],"node_modules/ol/asserts.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.assert = assert;

var _AssertionError = _interopRequireDefault(require("./AssertionError.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @module ol/asserts
 */

/**
 * @param {*} assertion Assertion we expected to be truthy.
 * @param {number} errorCode Error code.
 */
function assert(assertion, errorCode) {
  if (!assertion) {
    throw new _AssertionError.default(errorCode);
  }
}
},{"./AssertionError.js":"node_modules/ol/AssertionError.js"}],"node_modules/ol/math.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.clamp = clamp;
exports.squaredSegmentDistance = squaredSegmentDistance;
exports.squaredDistance = squaredDistance;
exports.solveLinearSystem = solveLinearSystem;
exports.toDegrees = toDegrees;
exports.toRadians = toRadians;
exports.modulo = modulo;
exports.lerp = lerp;
exports.log2 = exports.cosh = void 0;

/**
 * @module ol/math
 */

/**
 * Takes a number and clamps it to within the provided bounds.
 * @param {number} value The input number.
 * @param {number} min The minimum value to return.
 * @param {number} max The maximum value to return.
 * @return {number} The input number if it is within bounds, or the nearest
 *     number within the bounds.
 */
function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}
/**
 * Return the hyperbolic cosine of a given number. The method will use the
 * native `Math.cosh` function if it is available, otherwise the hyperbolic
 * cosine will be calculated via the reference implementation of the Mozilla
 * developer network.
 *
 * @param {number} x X.
 * @return {number} Hyperbolic cosine of x.
 */


var cosh = function () {
  // Wrapped in a iife, to save the overhead of checking for the native
  // implementation on every invocation.
  var cosh;

  if ('cosh' in Math) {
    // The environment supports the native Math.cosh function, use it…
    cosh = Math.cosh;
  } else {
    // … else, use the reference implementation of MDN:
    cosh = function (x) {
      var y =
      /** @type {Math} */
      Math.exp(x);
      return (y + 1 / y) / 2;
    };
  }

  return cosh;
}();
/**
 * Return the base 2 logarithm of a given number. The method will use the
 * native `Math.log2` function if it is available, otherwise the base 2
 * logarithm will be calculated via the reference implementation of the
 * Mozilla developer network.
 *
 * @param {number} x X.
 * @return {number} Base 2 logarithm of x.
 */


exports.cosh = cosh;

var log2 = function () {
  // Wrapped in a iife, to save the overhead of checking for the native
  // implementation on every invocation.
  var log2;

  if ('log2' in Math) {
    // The environment supports the native Math.log2 function, use it…
    log2 = Math.log2;
  } else {
    // … else, use the reference implementation of MDN:
    log2 = function (x) {
      return Math.log(x) * Math.LOG2E;
    };
  }

  return log2;
}();
/**
 * Returns the square of the closest distance between the point (x, y) and the
 * line segment (x1, y1) to (x2, y2).
 * @param {number} x X.
 * @param {number} y Y.
 * @param {number} x1 X1.
 * @param {number} y1 Y1.
 * @param {number} x2 X2.
 * @param {number} y2 Y2.
 * @return {number} Squared distance.
 */


exports.log2 = log2;

function squaredSegmentDistance(x, y, x1, y1, x2, y2) {
  var dx = x2 - x1;
  var dy = y2 - y1;

  if (dx !== 0 || dy !== 0) {
    var t = ((x - x1) * dx + (y - y1) * dy) / (dx * dx + dy * dy);

    if (t > 1) {
      x1 = x2;
      y1 = y2;
    } else if (t > 0) {
      x1 += dx * t;
      y1 += dy * t;
    }
  }

  return squaredDistance(x, y, x1, y1);
}
/**
 * Returns the square of the distance between the points (x1, y1) and (x2, y2).
 * @param {number} x1 X1.
 * @param {number} y1 Y1.
 * @param {number} x2 X2.
 * @param {number} y2 Y2.
 * @return {number} Squared distance.
 */


function squaredDistance(x1, y1, x2, y2) {
  var dx = x2 - x1;
  var dy = y2 - y1;
  return dx * dx + dy * dy;
}
/**
 * Solves system of linear equations using Gaussian elimination method.
 *
 * @param {Array<Array<number>>} mat Augmented matrix (n x n + 1 column)
 *                                     in row-major order.
 * @return {Array<number>} The resulting vector.
 */


function solveLinearSystem(mat) {
  var n = mat.length;

  for (var i = 0; i < n; i++) {
    // Find max in the i-th column (ignoring i - 1 first rows)
    var maxRow = i;
    var maxEl = Math.abs(mat[i][i]);

    for (var r = i + 1; r < n; r++) {
      var absValue = Math.abs(mat[r][i]);

      if (absValue > maxEl) {
        maxEl = absValue;
        maxRow = r;
      }
    }

    if (maxEl === 0) {
      return null; // matrix is singular
    } // Swap max row with i-th (current) row


    var tmp = mat[maxRow];
    mat[maxRow] = mat[i];
    mat[i] = tmp; // Subtract the i-th row to make all the remaining rows 0 in the i-th column

    for (var j = i + 1; j < n; j++) {
      var coef = -mat[j][i] / mat[i][i];

      for (var k = i; k < n + 1; k++) {
        if (i == k) {
          mat[j][k] = 0;
        } else {
          mat[j][k] += coef * mat[i][k];
        }
      }
    }
  } // Solve Ax=b for upper triangular matrix A (mat)


  var x = new Array(n);

  for (var l = n - 1; l >= 0; l--) {
    x[l] = mat[l][n] / mat[l][l];

    for (var m = l - 1; m >= 0; m--) {
      mat[m][n] -= mat[m][l] * x[l];
    }
  }

  return x;
}
/**
 * Converts radians to to degrees.
 *
 * @param {number} angleInRadians Angle in radians.
 * @return {number} Angle in degrees.
 */


function toDegrees(angleInRadians) {
  return angleInRadians * 180 / Math.PI;
}
/**
 * Converts degrees to radians.
 *
 * @param {number} angleInDegrees Angle in degrees.
 * @return {number} Angle in radians.
 */


function toRadians(angleInDegrees) {
  return angleInDegrees * Math.PI / 180;
}
/**
 * Returns the modulo of a / b, depending on the sign of b.
 *
 * @param {number} a Dividend.
 * @param {number} b Divisor.
 * @return {number} Modulo.
 */


function modulo(a, b) {
  var r = a % b;
  return r * b < 0 ? r + b : r;
}
/**
 * Calculates the linearly interpolated value of x between a and b.
 *
 * @param {number} a Number
 * @param {number} b Number
 * @param {number} x Value to be interpolated.
 * @return {number} Interpolated value.
 */


function lerp(a, b, x) {
  return a + x * (b - a);
}
},{}],"node_modules/ol/color.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.asString = asString;
exports.asArray = asArray;
exports.normalize = normalize;
exports.toString = toString;
exports.isStringColor = isStringColor;
exports.fromString = void 0;

var _asserts = require("./asserts.js");

var _math = require("./math.js");

/**
 * @module ol/color
 */

/**
 * A color represented as a short array [red, green, blue, alpha].
 * red, green, and blue should be integers in the range 0..255 inclusive.
 * alpha should be a float in the range 0..1 inclusive. If no alpha value is
 * given then `1` will be used.
 * @typedef {Array<number>} Color
 * @api
 */

/**
 * This RegExp matches # followed by 3, 4, 6, or 8 hex digits.
 * @const
 * @type {RegExp}
 * @private
 */
var HEX_COLOR_RE_ = /^#([a-f0-9]{3}|[a-f0-9]{4}(?:[a-f0-9]{2}){0,2})$/i;
/**
 * Regular expression for matching potential named color style strings.
 * @const
 * @type {RegExp}
 * @private
 */

var NAMED_COLOR_RE_ = /^([a-z]*)$|^hsla?\(.*\)$/i;
/**
 * Return the color as an rgba string.
 * @param {Color|string} color Color.
 * @return {string} Rgba string.
 * @api
 */

function asString(color) {
  if (typeof color === 'string') {
    return color;
  } else {
    return toString(color);
  }
}
/**
 * Return named color as an rgba string.
 * @param {string} color Named color.
 * @return {string} Rgb string.
 */


function fromNamed(color) {
  var el = document.createElement('div');
  el.style.color = color;

  if (el.style.color !== '') {
    document.body.appendChild(el);
    var rgb = getComputedStyle(el).color;
    document.body.removeChild(el);
    return rgb;
  } else {
    return '';
  }
}
/**
 * @param {string} s String.
 * @return {Color} Color.
 */


var fromString = function () {
  // We maintain a small cache of parsed strings.  To provide cheap LRU-like
  // semantics, whenever the cache grows too large we simply delete an
  // arbitrary 25% of the entries.

  /**
   * @const
   * @type {number}
   */
  var MAX_CACHE_SIZE = 1024;
  /**
   * @type {Object<string, Color>}
   */

  var cache = {};
  /**
   * @type {number}
   */

  var cacheSize = 0;
  return (
    /**
     * @param {string} s String.
     * @return {Color} Color.
     */
    function (s) {
      var color;

      if (cache.hasOwnProperty(s)) {
        color = cache[s];
      } else {
        if (cacheSize >= MAX_CACHE_SIZE) {
          var i = 0;

          for (var key in cache) {
            if ((i++ & 3) === 0) {
              delete cache[key];
              --cacheSize;
            }
          }
        }

        color = fromStringInternal_(s);
        cache[s] = color;
        ++cacheSize;
      }

      return color;
    }
  );
}();
/**
 * Return the color as an array. This function maintains a cache of calculated
 * arrays which means the result should not be modified.
 * @param {Color|string} color Color.
 * @return {Color} Color.
 * @api
 */


exports.fromString = fromString;

function asArray(color) {
  if (Array.isArray(color)) {
    return color;
  } else {
    return fromString(color);
  }
}
/**
 * @param {string} s String.
 * @private
 * @return {Color} Color.
 */


function fromStringInternal_(s) {
  var r, g, b, a, color;

  if (NAMED_COLOR_RE_.exec(s)) {
    s = fromNamed(s);
  }

  if (HEX_COLOR_RE_.exec(s)) {
    // hex
    var n = s.length - 1; // number of hex digits

    var d = // number of digits per channel
    void 0; // number of digits per channel

    if (n <= 4) {
      d = 1;
    } else {
      d = 2;
    }

    var hasAlpha = n === 4 || n === 8;
    r = parseInt(s.substr(1 + 0 * d, d), 16);
    g = parseInt(s.substr(1 + 1 * d, d), 16);
    b = parseInt(s.substr(1 + 2 * d, d), 16);

    if (hasAlpha) {
      a = parseInt(s.substr(1 + 3 * d, d), 16);
    } else {
      a = 255;
    }

    if (d == 1) {
      r = (r << 4) + r;
      g = (g << 4) + g;
      b = (b << 4) + b;

      if (hasAlpha) {
        a = (a << 4) + a;
      }
    }

    color = [r, g, b, a / 255];
  } else if (s.indexOf('rgba(') == 0) {
    // rgba()
    color = s.slice(5, -1).split(',').map(Number);
    normalize(color);
  } else if (s.indexOf('rgb(') == 0) {
    // rgb()
    color = s.slice(4, -1).split(',').map(Number);
    color.push(1);
    normalize(color);
  } else {
    (0, _asserts.assert)(false, 14); // Invalid color
  }

  return color;
}
/**
 * TODO this function is only used in the test, we probably shouldn't export it
 * @param {Color} color Color.
 * @return {Color} Clamped color.
 */


function normalize(color) {
  color[0] = (0, _math.clamp)(color[0] + 0.5 | 0, 0, 255);
  color[1] = (0, _math.clamp)(color[1] + 0.5 | 0, 0, 255);
  color[2] = (0, _math.clamp)(color[2] + 0.5 | 0, 0, 255);
  color[3] = (0, _math.clamp)(color[3], 0, 1);
  return color;
}
/**
 * @param {Color} color Color.
 * @return {string} String.
 */


function toString(color) {
  var r = color[0];

  if (r != (r | 0)) {
    r = r + 0.5 | 0;
  }

  var g = color[1];

  if (g != (g | 0)) {
    g = g + 0.5 | 0;
  }

  var b = color[2];

  if (b != (b | 0)) {
    b = b + 0.5 | 0;
  }

  var a = color[3] === undefined ? 1 : color[3];
  return 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
}
/**
 * @param {string} s String.
 * @return {boolean} Whether the string is actually a valid color
 */


function isStringColor(s) {
  if (NAMED_COLOR_RE_.test(s)) {
    s = fromNamed(s);
  }

  return HEX_COLOR_RE_.test(s) || s.indexOf('rgba(') === 0 || s.indexOf('rgb(') === 0;
}
},{"./asserts.js":"node_modules/ol/asserts.js","./math.js":"node_modules/ol/math.js"}],"node_modules/ol/colorlike.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.asColorLike = asColorLike;

var _color = require("./color.js");

/**
 * @module ol/colorlike
 */

/**
 * A type accepted by CanvasRenderingContext2D.fillStyle
 * or CanvasRenderingContext2D.strokeStyle.
 * Represents a color, pattern, or gradient. The origin for patterns and
 * gradients as fill style is an increment of 512 css pixels from map coordinate
 * `[0, 0]`. For seamless repeat patterns, width and height of the pattern image
 * must be a factor of two (2, 4, 8, ..., 512).
 *
 * @typedef {string|CanvasPattern|CanvasGradient} ColorLike
 * @api
 */

/**
 * @param {import("./color.js").Color|ColorLike} color Color.
 * @return {ColorLike} The color as an {@link ol/colorlike~ColorLike}.
 * @api
 */
function asColorLike(color) {
  if (Array.isArray(color)) {
    return (0, _color.toString)(color);
  } else {
    return color;
  }
}
},{"./color.js":"node_modules/ol/color.js"}],"node_modules/ol/has.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PASSIVE_EVENT_LISTENERS = exports.IMAGE_DECODE = exports.WORKER_OFFSCREEN_CANVAS = exports.DEVICE_PIXEL_RATIO = exports.MAC = exports.WEBKIT = exports.SAFARI = exports.FIREFOX = void 0;

/**
 * @module ol/has
 */
var ua = typeof navigator !== 'undefined' && typeof navigator.userAgent !== 'undefined' ? navigator.userAgent.toLowerCase() : '';
/**
 * User agent string says we are dealing with Firefox as browser.
 * @type {boolean}
 */

var FIREFOX = ua.indexOf('firefox') !== -1;
/**
 * User agent string says we are dealing with Safari as browser.
 * @type {boolean}
 */

exports.FIREFOX = FIREFOX;
var SAFARI = ua.indexOf('safari') !== -1 && ua.indexOf('chrom') == -1;
/**
 * User agent string says we are dealing with a WebKit engine.
 * @type {boolean}
 */

exports.SAFARI = SAFARI;
var WEBKIT = ua.indexOf('webkit') !== -1 && ua.indexOf('edge') == -1;
/**
 * User agent string says we are dealing with a Mac as platform.
 * @type {boolean}
 */

exports.WEBKIT = WEBKIT;
var MAC = ua.indexOf('macintosh') !== -1;
/**
 * The ratio between physical pixels and device-independent pixels
 * (dips) on the device (`window.devicePixelRatio`).
 * @const
 * @type {number}
 * @api
 */

exports.MAC = MAC;
var DEVICE_PIXEL_RATIO = typeof devicePixelRatio !== 'undefined' ? devicePixelRatio : 1;
/**
 * The execution context is a worker with OffscreenCanvas available.
 * @const
 * @type {boolean}
 */

exports.DEVICE_PIXEL_RATIO = DEVICE_PIXEL_RATIO;
var WORKER_OFFSCREEN_CANVAS = typeof WorkerGlobalScope !== 'undefined' && typeof OffscreenCanvas !== 'undefined' && self instanceof WorkerGlobalScope; //eslint-disable-line

/**
 * Image.prototype.decode() is supported.
 * @type {boolean}
 */

exports.WORKER_OFFSCREEN_CANVAS = WORKER_OFFSCREEN_CANVAS;
var IMAGE_DECODE = typeof Image !== 'undefined' && Image.prototype.decode;
/**
 * @type {boolean}
 */

exports.IMAGE_DECODE = IMAGE_DECODE;

var PASSIVE_EVENT_LISTENERS = function () {
  var passive = false;

  try {
    var options = Object.defineProperty({}, 'passive', {
      get: function () {
        passive = true;
      }
    });
    window.addEventListener('_', null, options);
    window.removeEventListener('_', null, options);
  } catch (error) {// passive not supported
  }

  return passive;
}();

exports.PASSIVE_EVENT_LISTENERS = PASSIVE_EVENT_LISTENERS;
},{}],"node_modules/ol/dom.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createCanvasContext2D = createCanvasContext2D;
exports.outerWidth = outerWidth;
exports.outerHeight = outerHeight;
exports.replaceNode = replaceNode;
exports.removeNode = removeNode;
exports.removeChildren = removeChildren;
exports.replaceChildren = replaceChildren;

var _has = require("./has.js");

/**
 * @module ol/dom
 */
//FIXME Move this function to the canvas module

/**
 * Create an html canvas element and returns its 2d context.
 * @param {number=} opt_width Canvas width.
 * @param {number=} opt_height Canvas height.
 * @param {Array<HTMLCanvasElement>=} opt_canvasPool Canvas pool to take existing canvas from.
 * @return {CanvasRenderingContext2D} The context.
 */
function createCanvasContext2D(opt_width, opt_height, opt_canvasPool) {
  var canvas = opt_canvasPool && opt_canvasPool.length ? opt_canvasPool.shift() : _has.WORKER_OFFSCREEN_CANVAS ? new OffscreenCanvas(opt_width || 300, opt_height || 300) : document.createElement('canvas');

  if (opt_width) {
    canvas.width = opt_width;
  }

  if (opt_height) {
    canvas.height = opt_height;
  } //FIXME Allow OffscreenCanvasRenderingContext2D as return type


  return (
    /** @type {CanvasRenderingContext2D} */
    canvas.getContext('2d')
  );
}
/**
 * Get the current computed width for the given element including margin,
 * padding and border.
 * Equivalent to jQuery's `$(el).outerWidth(true)`.
 * @param {!HTMLElement} element Element.
 * @return {number} The width.
 */


function outerWidth(element) {
  var width = element.offsetWidth;
  var style = getComputedStyle(element);
  width += parseInt(style.marginLeft, 10) + parseInt(style.marginRight, 10);
  return width;
}
/**
 * Get the current computed height for the given element including margin,
 * padding and border.
 * Equivalent to jQuery's `$(el).outerHeight(true)`.
 * @param {!HTMLElement} element Element.
 * @return {number} The height.
 */


function outerHeight(element) {
  var height = element.offsetHeight;
  var style = getComputedStyle(element);
  height += parseInt(style.marginTop, 10) + parseInt(style.marginBottom, 10);
  return height;
}
/**
 * @param {Node} newNode Node to replace old node
 * @param {Node} oldNode The node to be replaced
 */


function replaceNode(newNode, oldNode) {
  var parent = oldNode.parentNode;

  if (parent) {
    parent.replaceChild(newNode, oldNode);
  }
}
/**
 * @param {Node} node The node to remove.
 * @returns {Node} The node that was removed or null.
 */


function removeNode(node) {
  return node && node.parentNode ? node.parentNode.removeChild(node) : null;
}
/**
 * @param {Node} node The node to remove the children from.
 */


function removeChildren(node) {
  while (node.lastChild) {
    node.removeChild(node.lastChild);
  }
}
/**
 * Transform the children of a parent node so they match the
 * provided list of children.  This function aims to efficiently
 * remove, add, and reorder child nodes while maintaining a simple
 * implementation (it is not guaranteed to minimize DOM operations).
 * @param {Node} node The parent node whose children need reworking.
 * @param {Array<Node>} children The desired children.
 */


function replaceChildren(node, children) {
  var oldChildren = node.childNodes;

  for (var i = 0; true; ++i) {
    var oldChild = oldChildren[i];
    var newChild = children[i]; // check if our work is done

    if (!oldChild && !newChild) {
      break;
    } // check if children match


    if (oldChild === newChild) {
      continue;
    } // check if a new child needs to be added


    if (!oldChild) {
      node.appendChild(newChild);
      continue;
    } // check if an old child needs to be removed


    if (!newChild) {
      node.removeChild(oldChild);
      --i;
      continue;
    } // reorder


    node.insertBefore(newChild, oldChild);
  }
}
},{"./has.js":"node_modules/ol/has.js"}],"node_modules/ol/events/Event.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.stopPropagation = stopPropagation;
exports.preventDefault = preventDefault;
exports.default = void 0;

/**
 * @module ol/events/Event
 */

/**
 * @classdesc
 * Stripped down implementation of the W3C DOM Level 2 Event interface.
 * See https://www.w3.org/TR/DOM-Level-2-Events/events.html#Events-interface.
 *
 * This implementation only provides `type` and `target` properties, and
 * `stopPropagation` and `preventDefault` methods. It is meant as base class
 * for higher level events defined in the library, and works with
 * {@link module:ol/events/Target~Target}.
 */
var BaseEvent =
/** @class */
function () {
  /**
   * @param {string} type Type.
   */
  function BaseEvent(type) {
    /**
     * @type {boolean}
     */
    this.propagationStopped;
    /**
     * The event type.
     * @type {string}
     * @api
     */

    this.type = type;
    /**
     * The event target.
     * @type {Object}
     * @api
     */

    this.target = null;
  }
  /**
   * Stop event propagation.
   * @api
   */


  BaseEvent.prototype.preventDefault = function () {
    this.propagationStopped = true;
  };
  /**
   * Stop event propagation.
   * @api
   */


  BaseEvent.prototype.stopPropagation = function () {
    this.propagationStopped = true;
  };

  return BaseEvent;
}();
/**
 * @param {Event|import("./Event.js").default} evt Event
 */


function stopPropagation(evt) {
  evt.stopPropagation();
}
/**
 * @param {Event|import("./Event.js").default} evt Event
 */


function preventDefault(evt) {
  evt.preventDefault();
}

var _default = BaseEvent;
exports.default = _default;
},{}],"node_modules/ol/ObjectEventType.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * @module ol/ObjectEventType
 */

/**
 * @enum {string}
 */
var _default = {
  /**
   * Triggered when a property is changed.
   * @event module:ol/Object.ObjectEvent#propertychange
   * @api
   */
  PROPERTYCHANGE: 'propertychange'
};
exports.default = _default;
},{}],"node_modules/ol/Disposable.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * @module ol/Disposable
 */

/**
 * @classdesc
 * Objects that need to clean up after themselves.
 */
var Disposable =
/** @class */
function () {
  function Disposable() {
    /**
     * The object has already been disposed.
     * @type {boolean}
     * @protected
     */
    this.disposed = false;
  }
  /**
   * Clean up.
   */


  Disposable.prototype.dispose = function () {
    if (!this.disposed) {
      this.disposed = true;
      this.disposeInternal();
    }
  };
  /**
   * Extension point for disposable objects.
   * @protected
   */


  Disposable.prototype.disposeInternal = function () {};

  return Disposable;
}();

var _default = Disposable;
exports.default = _default;
},{}],"node_modules/ol/array.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.binarySearch = binarySearch;
exports.numberSafeCompareFunction = numberSafeCompareFunction;
exports.includes = includes;
exports.linearFindNearest = linearFindNearest;
exports.reverseSubArray = reverseSubArray;
exports.extend = extend;
exports.remove = remove;
exports.find = find;
exports.equals = equals;
exports.stableSort = stableSort;
exports.findIndex = findIndex;
exports.isSorted = isSorted;

/**
 * @module ol/array
 */

/**
 * Performs a binary search on the provided sorted list and returns the index of the item if found. If it can't be found it'll return -1.
 * https://github.com/darkskyapp/binary-search
 *
 * @param {Array<*>} haystack Items to search through.
 * @param {*} needle The item to look for.
 * @param {Function=} opt_comparator Comparator function.
 * @return {number} The index of the item if found, -1 if not.
 */
function binarySearch(haystack, needle, opt_comparator) {
  var mid, cmp;
  var comparator = opt_comparator || numberSafeCompareFunction;
  var low = 0;
  var high = haystack.length;
  var found = false;

  while (low < high) {
    /* Note that "(low + high) >>> 1" may overflow, and results in a typecast
     * to double (which gives the wrong results). */
    mid = low + (high - low >> 1);
    cmp = +comparator(haystack[mid], needle);

    if (cmp < 0.0) {
      /* Too low. */
      low = mid + 1;
    } else {
      /* Key found or too high */
      high = mid;
      found = !cmp;
    }
  }
  /* Key not found. */


  return found ? low : ~low;
}
/**
 * Compare function for array sort that is safe for numbers.
 * @param {*} a The first object to be compared.
 * @param {*} b The second object to be compared.
 * @return {number} A negative number, zero, or a positive number as the first
 *     argument is less than, equal to, or greater than the second.
 */


function numberSafeCompareFunction(a, b) {
  return a > b ? 1 : a < b ? -1 : 0;
}
/**
 * Whether the array contains the given object.
 * @param {Array<*>} arr The array to test for the presence of the element.
 * @param {*} obj The object for which to test.
 * @return {boolean} The object is in the array.
 */


function includes(arr, obj) {
  return arr.indexOf(obj) >= 0;
}
/**
 * @param {Array<number>} arr Array.
 * @param {number} target Target.
 * @param {number} direction 0 means return the nearest, > 0
 *    means return the largest nearest, < 0 means return the
 *    smallest nearest.
 * @return {number} Index.
 */


function linearFindNearest(arr, target, direction) {
  var n = arr.length;

  if (arr[0] <= target) {
    return 0;
  } else if (target <= arr[n - 1]) {
    return n - 1;
  } else {
    var i = void 0;

    if (direction > 0) {
      for (i = 1; i < n; ++i) {
        if (arr[i] < target) {
          return i - 1;
        }
      }
    } else if (direction < 0) {
      for (i = 1; i < n; ++i) {
        if (arr[i] <= target) {
          return i;
        }
      }
    } else {
      for (i = 1; i < n; ++i) {
        if (arr[i] == target) {
          return i;
        } else if (arr[i] < target) {
          if (arr[i - 1] - target < target - arr[i]) {
            return i - 1;
          } else {
            return i;
          }
        }
      }
    }

    return n - 1;
  }
}
/**
 * @param {Array<*>} arr Array.
 * @param {number} begin Begin index.
 * @param {number} end End index.
 */


function reverseSubArray(arr, begin, end) {
  while (begin < end) {
    var tmp = arr[begin];
    arr[begin] = arr[end];
    arr[end] = tmp;
    ++begin;
    --end;
  }
}
/**
 * @param {Array<VALUE>} arr The array to modify.
 * @param {!Array<VALUE>|VALUE} data The elements or arrays of elements to add to arr.
 * @template VALUE
 */


function extend(arr, data) {
  var extension = Array.isArray(data) ? data : [data];
  var length = extension.length;

  for (var i = 0; i < length; i++) {
    arr[arr.length] = extension[i];
  }
}
/**
 * @param {Array<VALUE>} arr The array to modify.
 * @param {VALUE} obj The element to remove.
 * @template VALUE
 * @return {boolean} If the element was removed.
 */


function remove(arr, obj) {
  var i = arr.indexOf(obj);
  var found = i > -1;

  if (found) {
    arr.splice(i, 1);
  }

  return found;
}
/**
 * @param {Array<VALUE>} arr The array to search in.
 * @param {function(VALUE, number, ?) : boolean} func The function to compare.
 * @template VALUE
 * @return {VALUE|null} The element found or null.
 */


function find(arr, func) {
  var length = arr.length >>> 0;
  var value;

  for (var i = 0; i < length; i++) {
    value = arr[i];

    if (func(value, i, arr)) {
      return value;
    }
  }

  return null;
}
/**
 * @param {Array|Uint8ClampedArray} arr1 The first array to compare.
 * @param {Array|Uint8ClampedArray} arr2 The second array to compare.
 * @return {boolean} Whether the two arrays are equal.
 */


function equals(arr1, arr2) {
  var len1 = arr1.length;

  if (len1 !== arr2.length) {
    return false;
  }

  for (var i = 0; i < len1; i++) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }

  return true;
}
/**
 * Sort the passed array such that the relative order of equal elements is preverved.
 * See https://en.wikipedia.org/wiki/Sorting_algorithm#Stability for details.
 * @param {Array<*>} arr The array to sort (modifies original).
 * @param {!function(*, *): number} compareFnc Comparison function.
 * @api
 */


function stableSort(arr, compareFnc) {
  var length = arr.length;
  var tmp = Array(arr.length);
  var i;

  for (i = 0; i < length; i++) {
    tmp[i] = {
      index: i,
      value: arr[i]
    };
  }

  tmp.sort(function (a, b) {
    return compareFnc(a.value, b.value) || a.index - b.index;
  });

  for (i = 0; i < arr.length; i++) {
    arr[i] = tmp[i].value;
  }
}
/**
 * @param {Array<*>} arr The array to search in.
 * @param {Function} func Comparison function.
 * @return {number} Return index.
 */


function findIndex(arr, func) {
  var index;
  var found = !arr.every(function (el, idx) {
    index = idx;
    return !func(el, idx, arr);
  });
  return found ? index : -1;
}
/**
 * @param {Array<*>} arr The array to test.
 * @param {Function=} opt_func Comparison function.
 * @param {boolean=} opt_strict Strictly sorted (default false).
 * @return {boolean} Return index.
 */


function isSorted(arr, opt_func, opt_strict) {
  var compare = opt_func || numberSafeCompareFunction;
  return arr.every(function (currentVal, index) {
    if (index === 0) {
      return true;
    }

    var res = compare(arr[index - 1], currentVal);
    return !(res > 0 || opt_strict && res === 0);
  });
}
},{}],"node_modules/ol/functions.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TRUE = TRUE;
exports.FALSE = FALSE;
exports.VOID = VOID;
exports.memoizeOne = memoizeOne;

var _array = require("./array.js");

/**
 * @module ol/functions
 */

/**
 * Always returns true.
 * @returns {boolean} true.
 */
function TRUE() {
  return true;
}
/**
 * Always returns false.
 * @returns {boolean} false.
 */


function FALSE() {
  return false;
}
/**
 * A reusable function, used e.g. as a default for callbacks.
 *
 * @return {void} Nothing.
 */


function VOID() {}
/**
 * Wrap a function in another function that remembers the last return.  If the
 * returned function is called twice in a row with the same arguments and the same
 * this object, it will return the value from the first call in the second call.
 *
 * @param {function(...any): ReturnType} fn The function to memoize.
 * @return {function(...any): ReturnType} The memoized function.
 * @template ReturnType
 */


function memoizeOne(fn) {
  var called = false;
  /** @type {ReturnType} */

  var lastResult;
  /** @type {Array<any>} */

  var lastArgs;
  var lastThis;
  return function () {
    var nextArgs = Array.prototype.slice.call(arguments);

    if (!called || this !== lastThis || !(0, _array.equals)(nextArgs, lastArgs)) {
      called = true;
      lastThis = this;
      lastArgs = nextArgs;
      lastResult = fn.apply(this, arguments);
    }

    return lastResult;
  };
}
},{"./array.js":"node_modules/ol/array.js"}],"node_modules/ol/obj.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.clear = clear;
exports.isEmpty = isEmpty;
exports.getValues = exports.assign = void 0;

/**
 * @module ol/obj
 */

/**
 * Polyfill for Object.assign().  Assigns enumerable and own properties from
 * one or more source objects to a target object.
 * See https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/assign.
 *
 * @param {!Object} target The target object.
 * @param {...Object} var_sources The source object(s).
 * @return {!Object} The modified target object.
 */
var assign = typeof Object.assign === 'function' ? Object.assign : function (target, var_sources) {
  if (target === undefined || target === null) {
    throw new TypeError('Cannot convert undefined or null to object');
  }

  var output = Object(target);

  for (var i = 1, ii = arguments.length; i < ii; ++i) {
    var source = arguments[i];

    if (source !== undefined && source !== null) {
      for (var key in source) {
        if (source.hasOwnProperty(key)) {
          output[key] = source[key];
        }
      }
    }
  }

  return output;
};
/**
 * Removes all properties from an object.
 * @param {Object} object The object to clear.
 */

exports.assign = assign;

function clear(object) {
  for (var property in object) {
    delete object[property];
  }
}
/**
 * Polyfill for Object.values().  Get an array of property values from an object.
 * See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/values
 *
 * @param {!Object<K,V>} object The object from which to get the values.
 * @return {!Array<V>} The property values.
 * @template K,V
 */


var getValues = typeof Object.values === 'function' ? Object.values : function (object) {
  var values = [];

  for (var property in object) {
    values.push(object[property]);
  }

  return values;
};
/**
 * Determine if an object has any properties.
 * @param {Object} object The object to check.
 * @return {boolean} The object is empty.
 */

exports.getValues = getValues;

function isEmpty(object) {
  var property;

  for (property in object) {
    return false;
  }

  return !property;
}
},{}],"node_modules/ol/events/Target.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Disposable = _interopRequireDefault(require("../Disposable.js"));

var _Event = _interopRequireDefault(require("./Event.js"));

var _functions = require("../functions.js");

var _obj = require("../obj.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var __extends = void 0 && (void 0).__extends || function () {
  var extendStatics = function (d, b) {
    extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    };

    return extendStatics(d, b);
  };

  return function (d, b) {
    extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
/**
 * @module ol/events/Target
 */


/**
 * @typedef {EventTarget|Target} EventTargetLike
 */

/**
 * @classdesc
 * A simplified implementation of the W3C DOM Level 2 EventTarget interface.
 * See https://www.w3.org/TR/2000/REC-DOM-Level-2-Events-20001113/events.html#Events-EventTarget.
 *
 * There are two important simplifications compared to the specification:
 *
 * 1. The handling of `useCapture` in `addEventListener` and
 *    `removeEventListener`. There is no real capture model.
 * 2. The handling of `stopPropagation` and `preventDefault` on `dispatchEvent`.
 *    There is no event target hierarchy. When a listener calls
 *    `stopPropagation` or `preventDefault` on an event object, it means that no
 *    more listeners after this one will be called. Same as when the listener
 *    returns false.
 */
var Target =
/** @class */
function (_super) {
  __extends(Target, _super);
  /**
   * @param {*=} opt_target Default event target for dispatched events.
   */


  function Target(opt_target) {
    var _this = _super.call(this) || this;
    /**
     * @private
     * @type {*}
     */


    _this.eventTarget_ = opt_target;
    /**
     * @private
     * @type {Object<string, number>}
     */

    _this.pendingRemovals_ = null;
    /**
     * @private
     * @type {Object<string, number>}
     */

    _this.dispatching_ = null;
    /**
     * @private
     * @type {Object<string, Array<import("../events.js").Listener>>}
     */

    _this.listeners_ = null;
    return _this;
  }
  /**
   * @param {string} type Type.
   * @param {import("../events.js").Listener} listener Listener.
   */


  Target.prototype.addEventListener = function (type, listener) {
    if (!type || !listener) {
      return;
    }

    var listeners = this.listeners_ || (this.listeners_ = {});
    var listenersForType = listeners[type] || (listeners[type] = []);

    if (listenersForType.indexOf(listener) === -1) {
      listenersForType.push(listener);
    }
  };
  /**
   * Dispatches an event and calls all listeners listening for events
   * of this type. The event parameter can either be a string or an
   * Object with a `type` property.
   *
   * @param {import("./Event.js").default|string} event Event object.
   * @return {boolean|undefined} `false` if anyone called preventDefault on the
   *     event object or if any of the listeners returned false.
   * @api
   */


  Target.prototype.dispatchEvent = function (event) {
    /** @type {import("./Event.js").default|Event} */
    var evt = typeof event === 'string' ? new _Event.default(event) : event;
    var type = evt.type;

    if (!evt.target) {
      evt.target = this.eventTarget_ || this;
    }

    var listeners = this.listeners_ && this.listeners_[type];
    var propagate;

    if (listeners) {
      var dispatching = this.dispatching_ || (this.dispatching_ = {});
      var pendingRemovals = this.pendingRemovals_ || (this.pendingRemovals_ = {});

      if (!(type in dispatching)) {
        dispatching[type] = 0;
        pendingRemovals[type] = 0;
      }

      ++dispatching[type];

      for (var i = 0, ii = listeners.length; i < ii; ++i) {
        if ('handleEvent' in listeners[i]) {
          propagate =
          /** @type {import("../events.js").ListenerObject} */
          listeners[i].handleEvent(evt);
        } else {
          propagate =
          /** @type {import("../events.js").ListenerFunction} */
          listeners[i].call(this, evt);
        }

        if (propagate === false || evt.propagationStopped) {
          propagate = false;
          break;
        }
      }

      --dispatching[type];

      if (dispatching[type] === 0) {
        var pr = pendingRemovals[type];
        delete pendingRemovals[type];

        while (pr--) {
          this.removeEventListener(type, _functions.VOID);
        }

        delete dispatching[type];
      }

      return propagate;
    }
  };
  /**
   * Clean up.
   */


  Target.prototype.disposeInternal = function () {
    this.listeners_ && (0, _obj.clear)(this.listeners_);
  };
  /**
   * Get the listeners for a specified event type. Listeners are returned in the
   * order that they will be called in.
   *
   * @param {string} type Type.
   * @return {Array<import("../events.js").Listener>|undefined} Listeners.
   */


  Target.prototype.getListeners = function (type) {
    return this.listeners_ && this.listeners_[type] || undefined;
  };
  /**
   * @param {string=} opt_type Type. If not provided,
   *     `true` will be returned if this event target has any listeners.
   * @return {boolean} Has listeners.
   */


  Target.prototype.hasListener = function (opt_type) {
    if (!this.listeners_) {
      return false;
    }

    return opt_type ? opt_type in this.listeners_ : Object.keys(this.listeners_).length > 0;
  };
  /**
   * @param {string} type Type.
   * @param {import("../events.js").Listener} listener Listener.
   */


  Target.prototype.removeEventListener = function (type, listener) {
    var listeners = this.listeners_ && this.listeners_[type];

    if (listeners) {
      var index = listeners.indexOf(listener);

      if (index !== -1) {
        if (this.pendingRemovals_ && type in this.pendingRemovals_) {
          // make listener a no-op, and remove later in #dispatchEvent()
          listeners[index] = _functions.VOID;
          ++this.pendingRemovals_[type];
        } else {
          listeners.splice(index, 1);

          if (listeners.length === 0) {
            delete this.listeners_[type];
          }
        }
      }
    }
  };

  return Target;
}(_Disposable.default);

var _default = Target;
exports.default = _default;
},{"../Disposable.js":"node_modules/ol/Disposable.js","./Event.js":"node_modules/ol/events/Event.js","../functions.js":"node_modules/ol/functions.js","../obj.js":"node_modules/ol/obj.js"}],"node_modules/ol/events/EventType.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * @module ol/events/EventType
 */

/**
 * @enum {string}
 * @const
 */
var _default = {
  /**
   * Generic change event. Triggered when the revision counter is increased.
   * @event module:ol/events/Event~BaseEvent#change
   * @api
   */
  CHANGE: 'change',

  /**
   * Generic error event. Triggered when an error occurs.
   * @event module:ol/events/Event~BaseEvent#error
   * @api
   */
  ERROR: 'error',
  BLUR: 'blur',
  CLEAR: 'clear',
  CONTEXTMENU: 'contextmenu',
  CLICK: 'click',
  DBLCLICK: 'dblclick',
  DRAGENTER: 'dragenter',
  DRAGOVER: 'dragover',
  DROP: 'drop',
  FOCUS: 'focus',
  KEYDOWN: 'keydown',
  KEYPRESS: 'keypress',
  LOAD: 'load',
  RESIZE: 'resize',
  TOUCHMOVE: 'touchmove',
  WHEEL: 'wheel'
};
exports.default = _default;
},{}],"node_modules/ol/events.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.listen = listen;
exports.listenOnce = listenOnce;
exports.unlistenByKey = unlistenByKey;

var _obj = require("./obj.js");

/**
 * @module ol/events
 */

/**
 * Key to use with {@link module:ol/Observable~Observable#unByKey}.
 * @typedef {Object} EventsKey
 * @property {ListenerFunction} listener
 * @property {import("./events/Target.js").EventTargetLike} target
 * @property {string} type
 * @api
 */

/**
 * Listener function. This function is called with an event object as argument.
 * When the function returns `false`, event propagation will stop.
 *
 * @typedef {function((Event|import("./events/Event.js").default)): (void|boolean)} ListenerFunction
 * @api
 */

/**
 * @typedef {Object} ListenerObject
 * @property {ListenerFunction} handleEvent
 */

/**
 * @typedef {ListenerFunction|ListenerObject} Listener
 */

/**
 * Registers an event listener on an event target. Inspired by
 * https://google.github.io/closure-library/api/source/closure/goog/events/events.js.src.html
 *
 * This function efficiently binds a `listener` to a `this` object, and returns
 * a key for use with {@link module:ol/events~unlistenByKey}.
 *
 * @param {import("./events/Target.js").EventTargetLike} target Event target.
 * @param {string} type Event type.
 * @param {ListenerFunction} listener Listener.
 * @param {Object=} opt_this Object referenced by the `this` keyword in the
 *     listener. Default is the `target`.
 * @param {boolean=} opt_once If true, add the listener as one-off listener.
 * @return {EventsKey} Unique key for the listener.
 */
function listen(target, type, listener, opt_this, opt_once) {
  if (opt_this && opt_this !== target) {
    listener = listener.bind(opt_this);
  }

  if (opt_once) {
    var originalListener_1 = listener;

    listener = function () {
      target.removeEventListener(type, listener);
      originalListener_1.apply(this, arguments);
    };
  }

  var eventsKey = {
    target: target,
    type: type,
    listener: listener
  };
  target.addEventListener(type, listener);
  return eventsKey;
}
/**
 * Registers a one-off event listener on an event target. Inspired by
 * https://google.github.io/closure-library/api/source/closure/goog/events/events.js.src.html
 *
 * This function efficiently binds a `listener` as self-unregistering listener
 * to a `this` object, and returns a key for use with
 * {@link module:ol/events~unlistenByKey} in case the listener needs to be
 * unregistered before it is called.
 *
 * When {@link module:ol/events~listen} is called with the same arguments after this
 * function, the self-unregistering listener will be turned into a permanent
 * listener.
 *
 * @param {import("./events/Target.js").EventTargetLike} target Event target.
 * @param {string} type Event type.
 * @param {ListenerFunction} listener Listener.
 * @param {Object=} opt_this Object referenced by the `this` keyword in the
 *     listener. Default is the `target`.
 * @return {EventsKey} Key for unlistenByKey.
 */


function listenOnce(target, type, listener, opt_this) {
  return listen(target, type, listener, opt_this, true);
}
/**
 * Unregisters event listeners on an event target. Inspired by
 * https://google.github.io/closure-library/api/source/closure/goog/events/events.js.src.html
 *
 * The argument passed to this function is the key returned from
 * {@link module:ol/events~listen} or {@link module:ol/events~listenOnce}.
 *
 * @param {EventsKey} key The key.
 */


function unlistenByKey(key) {
  if (key && key.target) {
    key.target.removeEventListener(key.type, key.listener);
    (0, _obj.clear)(key);
  }
}
},{"./obj.js":"node_modules/ol/obj.js"}],"node_modules/ol/Observable.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.unByKey = unByKey;
exports.default = void 0;

var _Target = _interopRequireDefault(require("./events/Target.js"));

var _EventType = _interopRequireDefault(require("./events/EventType.js"));

var _events = require("./events.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var __extends = void 0 && (void 0).__extends || function () {
  var extendStatics = function (d, b) {
    extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    };

    return extendStatics(d, b);
  };

  return function (d, b) {
    extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
/**
 * @module ol/Observable
 */


/**
 * @classdesc
 * Abstract base class; normally only used for creating subclasses and not
 * instantiated in apps.
 * An event target providing convenient methods for listener registration
 * and unregistration. A generic `change` event is always available through
 * {@link module:ol/Observable~Observable#changed}.
 *
 * @fires import("./events/Event.js").default
 * @api
 */
var Observable =
/** @class */
function (_super) {
  __extends(Observable, _super);

  function Observable() {
    var _this = _super.call(this) || this;
    /**
     * @private
     * @type {number}
     */


    _this.revision_ = 0;
    return _this;
  }
  /**
   * Increases the revision counter and dispatches a 'change' event.
   * @api
   */


  Observable.prototype.changed = function () {
    ++this.revision_;
    this.dispatchEvent(_EventType.default.CHANGE);
  };
  /**
   * Get the version number for this object.  Each time the object is modified,
   * its version number will be incremented.
   * @return {number} Revision.
   * @api
   */


  Observable.prototype.getRevision = function () {
    return this.revision_;
  };
  /**
   * Listen for a certain type of event.
   * @param {string|Array<string>} type The event type or array of event types.
   * @param {function(?): ?} listener The listener function.
   * @return {import("./events.js").EventsKey|Array<import("./events.js").EventsKey>} Unique key for the listener. If
   *     called with an array of event types as the first argument, the return
   *     will be an array of keys.
   * @api
   */


  Observable.prototype.on = function (type, listener) {
    if (Array.isArray(type)) {
      var len = type.length;
      var keys = new Array(len);

      for (var i = 0; i < len; ++i) {
        keys[i] = (0, _events.listen)(this, type[i], listener);
      }

      return keys;
    } else {
      return (0, _events.listen)(this,
      /** @type {string} */
      type, listener);
    }
  };
  /**
   * Listen once for a certain type of event.
   * @param {string|Array<string>} type The event type or array of event types.
   * @param {function(?): ?} listener The listener function.
   * @return {import("./events.js").EventsKey|Array<import("./events.js").EventsKey>} Unique key for the listener. If
   *     called with an array of event types as the first argument, the return
   *     will be an array of keys.
   * @api
   */


  Observable.prototype.once = function (type, listener) {
    var key;

    if (Array.isArray(type)) {
      var len = type.length;
      key = new Array(len);

      for (var i = 0; i < len; ++i) {
        key[i] = (0, _events.listenOnce)(this, type[i], listener);
      }
    } else {
      key = (0, _events.listenOnce)(this,
      /** @type {string} */
      type, listener);
    }
    /** @type {Object} */


    listener.ol_key = key;
    return key;
  };
  /**
   * Unlisten for a certain type of event.
   * @param {string|Array<string>} type The event type or array of event types.
   * @param {function(?): ?} listener The listener function.
   * @api
   */


  Observable.prototype.un = function (type, listener) {
    var key =
    /** @type {Object} */
    listener.ol_key;

    if (key) {
      unByKey(key);
    } else if (Array.isArray(type)) {
      for (var i = 0, ii = type.length; i < ii; ++i) {
        this.removeEventListener(type[i], listener);
      }
    } else {
      this.removeEventListener(type, listener);
    }
  };

  return Observable;
}(_Target.default);
/**
 * Removes an event listener using the key returned by `on()` or `once()`.
 * @param {import("./events.js").EventsKey|Array<import("./events.js").EventsKey>} key The key returned by `on()`
 *     or `once()` (or an array of keys).
 * @api
 */


function unByKey(key) {
  if (Array.isArray(key)) {
    for (var i = 0, ii = key.length; i < ii; ++i) {
      (0, _events.unlistenByKey)(key[i]);
    }
  } else {
    (0, _events.unlistenByKey)(
    /** @type {import("./events.js").EventsKey} */
    key);
  }
}

var _default = Observable;
exports.default = _default;
},{"./events/Target.js":"node_modules/ol/events/Target.js","./events/EventType.js":"node_modules/ol/events/EventType.js","./events.js":"node_modules/ol/events.js"}],"node_modules/ol/Object.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getChangeEventType = getChangeEventType;
exports.default = exports.ObjectEvent = void 0;

var _Event = _interopRequireDefault(require("./events/Event.js"));

var _ObjectEventType = _interopRequireDefault(require("./ObjectEventType.js"));

var _Observable = _interopRequireDefault(require("./Observable.js"));

var _obj = require("./obj.js");

var _util = require("./util.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var __extends = void 0 && (void 0).__extends || function () {
  var extendStatics = function (d, b) {
    extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    };

    return extendStatics(d, b);
  };

  return function (d, b) {
    extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
/**
 * @module ol/Object
 */


/**
 * @classdesc
 * Events emitted by {@link module:ol/Object~BaseObject} instances are instances of this type.
 */
var ObjectEvent =
/** @class */
function (_super) {
  __extends(ObjectEvent, _super);
  /**
   * @param {string} type The event type.
   * @param {string} key The property name.
   * @param {*} oldValue The old value for `key`.
   */


  function ObjectEvent(type, key, oldValue) {
    var _this = _super.call(this, type) || this;
    /**
     * The name of the property whose value is changing.
     * @type {string}
     * @api
     */


    _this.key = key;
    /**
     * The old value. To get the new value use `e.target.get(e.key)` where
     * `e` is the event object.
     * @type {*}
     * @api
     */

    _this.oldValue = oldValue;
    return _this;
  }

  return ObjectEvent;
}(_Event.default);

exports.ObjectEvent = ObjectEvent;

/**
 * @classdesc
 * Abstract base class; normally only used for creating subclasses and not
 * instantiated in apps.
 * Most non-trivial classes inherit from this.
 *
 * This extends {@link module:ol/Observable} with observable
 * properties, where each property is observable as well as the object as a
 * whole.
 *
 * Classes that inherit from this have pre-defined properties, to which you can
 * add your owns. The pre-defined properties are listed in this documentation as
 * 'Observable Properties', and have their own accessors; for example,
 * {@link module:ol/Map~Map} has a `target` property, accessed with
 * `getTarget()` and changed with `setTarget()`. Not all properties are however
 * settable. There are also general-purpose accessors `get()` and `set()`. For
 * example, `get('target')` is equivalent to `getTarget()`.
 *
 * The `set` accessors trigger a change event, and you can monitor this by
 * registering a listener. For example, {@link module:ol/View~View} has a
 * `center` property, so `view.on('change:center', function(evt) {...});` would
 * call the function whenever the value of the center property changes. Within
 * the function, `evt.target` would be the view, so `evt.target.getCenter()`
 * would return the new center.
 *
 * You can add your own observable properties with
 * `object.set('prop', 'value')`, and retrieve that with `object.get('prop')`.
 * You can listen for changes on that property value with
 * `object.on('change:prop', listener)`. You can get a list of all
 * properties with {@link module:ol/Object~BaseObject#getProperties}.
 *
 * Note that the observable properties are separate from standard JS properties.
 * You can, for example, give your map object a title with
 * `map.title='New title'` and with `map.set('title', 'Another title')`. The
 * first will be a `hasOwnProperty`; the second will appear in
 * `getProperties()`. Only the second is observable.
 *
 * Properties can be deleted by using the unset method. E.g.
 * object.unset('foo').
 *
 * @fires ObjectEvent
 * @api
 */
var BaseObject =
/** @class */
function (_super) {
  __extends(BaseObject, _super);
  /**
   * @param {Object<string, *>=} opt_values An object with key-value pairs.
   */


  function BaseObject(opt_values) {
    var _this = _super.call(this) || this; // Call {@link module:ol/util~getUid} to ensure that the order of objects' ids is
    // the same as the order in which they were created.  This also helps to
    // ensure that object properties are always added in the same order, which
    // helps many JavaScript engines generate faster code.


    (0, _util.getUid)(_this);
    /**
     * @private
     * @type {Object<string, *>}
     */

    _this.values_ = null;

    if (opt_values !== undefined) {
      _this.setProperties(opt_values);
    }

    return _this;
  }
  /**
   * Gets a value.
   * @param {string} key Key name.
   * @return {*} Value.
   * @api
   */


  BaseObject.prototype.get = function (key) {
    var value;

    if (this.values_ && this.values_.hasOwnProperty(key)) {
      value = this.values_[key];
    }

    return value;
  };
  /**
   * Get a list of object property names.
   * @return {Array<string>} List of property names.
   * @api
   */


  BaseObject.prototype.getKeys = function () {
    return this.values_ && Object.keys(this.values_) || [];
  };
  /**
   * Get an object of all property names and values.
   * @return {Object<string, *>} Object.
   * @api
   */


  BaseObject.prototype.getProperties = function () {
    return this.values_ && (0, _obj.assign)({}, this.values_) || {};
  };
  /**
   * @return {boolean} The object has properties.
   */


  BaseObject.prototype.hasProperties = function () {
    return !!this.values_;
  };
  /**
   * @param {string} key Key name.
   * @param {*} oldValue Old value.
   */


  BaseObject.prototype.notify = function (key, oldValue) {
    var eventType;
    eventType = getChangeEventType(key);
    this.dispatchEvent(new ObjectEvent(eventType, key, oldValue));
    eventType = _ObjectEventType.default.PROPERTYCHANGE;
    this.dispatchEvent(new ObjectEvent(eventType, key, oldValue));
  };
  /**
   * Sets a value.
   * @param {string} key Key name.
   * @param {*} value Value.
   * @param {boolean=} opt_silent Update without triggering an event.
   * @api
   */


  BaseObject.prototype.set = function (key, value, opt_silent) {
    var values = this.values_ || (this.values_ = {});

    if (opt_silent) {
      values[key] = value;
    } else {
      var oldValue = values[key];
      values[key] = value;

      if (oldValue !== value) {
        this.notify(key, oldValue);
      }
    }
  };
  /**
   * Sets a collection of key-value pairs.  Note that this changes any existing
   * properties and adds new ones (it does not remove any existing properties).
   * @param {Object<string, *>} values Values.
   * @param {boolean=} opt_silent Update without triggering an event.
   * @api
   */


  BaseObject.prototype.setProperties = function (values, opt_silent) {
    for (var key in values) {
      this.set(key, values[key], opt_silent);
    }
  };
  /**
   * Unsets a property.
   * @param {string} key Key name.
   * @param {boolean=} opt_silent Unset without triggering an event.
   * @api
   */


  BaseObject.prototype.unset = function (key, opt_silent) {
    if (this.values_ && key in this.values_) {
      var oldValue = this.values_[key];
      delete this.values_[key];

      if ((0, _obj.isEmpty)(this.values_)) {
        this.values_ = null;
      }

      if (!opt_silent) {
        this.notify(key, oldValue);
      }
    }
  };

  return BaseObject;
}(_Observable.default);
/**
 * @type {Object<string, string>}
 */


var changeEventTypeCache = {};
/**
 * @param {string} key Key name.
 * @return {string} Change name.
 */

function getChangeEventType(key) {
  return changeEventTypeCache.hasOwnProperty(key) ? changeEventTypeCache[key] : changeEventTypeCache[key] = 'change:' + key;
}

var _default = BaseObject;
exports.default = _default;
},{"./events/Event.js":"node_modules/ol/events/Event.js","./ObjectEventType.js":"node_modules/ol/ObjectEventType.js","./Observable.js":"node_modules/ol/Observable.js","./obj.js":"node_modules/ol/obj.js","./util.js":"node_modules/ol/util.js"}],"node_modules/ol/css.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFontParameters = exports.CLASS_COLLAPSED = exports.CLASS_CONTROL = exports.CLASS_UNSUPPORTED = exports.CLASS_UNSELECTABLE = exports.CLASS_SELECTABLE = exports.CLASS_HIDDEN = void 0;

/**
 * @module ol/css
 */

/**
 * @typedef {Object} FontParameters
 * @property {string} style
 * @property {string} variant
 * @property {string} weight
 * @property {string} size
 * @property {string} lineHeight
 * @property {string} family
 * @property {Array<string>} families
 */

/**
 * The CSS class for hidden feature.
 *
 * @const
 * @type {string}
 */
var CLASS_HIDDEN = 'ol-hidden';
/**
 * The CSS class that we'll give the DOM elements to have them selectable.
 *
 * @const
 * @type {string}
 */

exports.CLASS_HIDDEN = CLASS_HIDDEN;
var CLASS_SELECTABLE = 'ol-selectable';
/**
 * The CSS class that we'll give the DOM elements to have them unselectable.
 *
 * @const
 * @type {string}
 */

exports.CLASS_SELECTABLE = CLASS_SELECTABLE;
var CLASS_UNSELECTABLE = 'ol-unselectable';
/**
 * The CSS class for unsupported feature.
 *
 * @const
 * @type {string}
 */

exports.CLASS_UNSELECTABLE = CLASS_UNSELECTABLE;
var CLASS_UNSUPPORTED = 'ol-unsupported';
/**
 * The CSS class for controls.
 *
 * @const
 * @type {string}
 */

exports.CLASS_UNSUPPORTED = CLASS_UNSUPPORTED;
var CLASS_CONTROL = 'ol-control';
/**
 * The CSS class that we'll give the DOM elements that are collapsed, i.e.
 * to those elements which usually can be expanded.
 *
 * @const
 * @type {string}
 */

exports.CLASS_CONTROL = CLASS_CONTROL;
var CLASS_COLLAPSED = 'ol-collapsed';
/**
 * From http://stackoverflow.com/questions/10135697/regex-to-parse-any-css-font
 * @type {RegExp}
 */

exports.CLASS_COLLAPSED = CLASS_COLLAPSED;
var fontRegEx = new RegExp(['^\\s*(?=(?:(?:[-a-z]+\\s*){0,2}(italic|oblique))?)', '(?=(?:(?:[-a-z]+\\s*){0,2}(small-caps))?)', '(?=(?:(?:[-a-z]+\\s*){0,2}(bold(?:er)?|lighter|[1-9]00 ))?)', '(?:(?:normal|\\1|\\2|\\3)\\s*){0,3}((?:xx?-)?', '(?:small|large)|medium|smaller|larger|[\\.\\d]+(?:\\%|in|[cem]m|ex|p[ctx]))', '(?:\\s*\\/\\s*(normal|[\\.\\d]+(?:\\%|in|[cem]m|ex|p[ctx])?))', '?\\s*([-,\\"\\\'\\sa-z]+?)\\s*$'].join(''), 'i');
var fontRegExMatchIndex = ['style', 'variant', 'weight', 'size', 'lineHeight', 'family'];
/**
 * Get the list of font families from a font spec.  Note that this doesn't work
 * for font families that have commas in them.
 * @param {string} fontSpec The CSS font property.
 * @return {FontParameters} The font parameters (or null if the input spec is invalid).
 */

var getFontParameters = function (fontSpec) {
  var match = fontSpec.match(fontRegEx);

  if (!match) {
    return null;
  }

  var style =
  /** @type {FontParameters} */
  {
    lineHeight: 'normal',
    size: '1.2em',
    style: 'normal',
    weight: 'normal',
    variant: 'normal'
  };

  for (var i = 0, ii = fontRegExMatchIndex.length; i < ii; ++i) {
    var value = match[i + 1];

    if (value !== undefined) {
      style[fontRegExMatchIndex[i]] = value;
    }
  }

  style.families = style.family.split(/,\s?/);
  return style;
};

exports.getFontParameters = getFontParameters;
},{}],"node_modules/ol/transform.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create = create;
exports.reset = reset;
exports.multiply = multiply;
exports.set = set;
exports.setFromArray = setFromArray;
exports.apply = apply;
exports.rotate = rotate;
exports.scale = scale;
exports.makeScale = makeScale;
exports.translate = translate;
exports.compose = compose;
exports.composeCssTransform = composeCssTransform;
exports.invert = invert;
exports.makeInverse = makeInverse;
exports.determinant = determinant;
exports.toString = toString;

var _asserts = require("./asserts.js");

/**
 * @module ol/transform
 */

/**
 * An array representing an affine 2d transformation for use with
 * {@link module:ol/transform} functions. The array has 6 elements.
 * @typedef {!Array<number>} Transform
 * @api
 */

/**
 * Collection of affine 2d transformation functions. The functions work on an
 * array of 6 elements. The element order is compatible with the [SVGMatrix
 * interface](https://developer.mozilla.org/en-US/docs/Web/API/SVGMatrix) and is
 * a subset (elements a to f) of a 3×3 matrix:
 * ```
 * [ a c e ]
 * [ b d f ]
 * [ 0 0 1 ]
 * ```
 */

/**
 * @private
 * @type {Transform}
 */
var tmp_ = new Array(6);
/**
 * Create an identity transform.
 * @return {!Transform} Identity transform.
 */

function create() {
  return [1, 0, 0, 1, 0, 0];
}
/**
 * Resets the given transform to an identity transform.
 * @param {!Transform} transform Transform.
 * @return {!Transform} Transform.
 */


function reset(transform) {
  return set(transform, 1, 0, 0, 1, 0, 0);
}
/**
 * Multiply the underlying matrices of two transforms and return the result in
 * the first transform.
 * @param {!Transform} transform1 Transform parameters of matrix 1.
 * @param {!Transform} transform2 Transform parameters of matrix 2.
 * @return {!Transform} transform1 multiplied with transform2.
 */


function multiply(transform1, transform2) {
  var a1 = transform1[0];
  var b1 = transform1[1];
  var c1 = transform1[2];
  var d1 = transform1[3];
  var e1 = transform1[4];
  var f1 = transform1[5];
  var a2 = transform2[0];
  var b2 = transform2[1];
  var c2 = transform2[2];
  var d2 = transform2[3];
  var e2 = transform2[4];
  var f2 = transform2[5];
  transform1[0] = a1 * a2 + c1 * b2;
  transform1[1] = b1 * a2 + d1 * b2;
  transform1[2] = a1 * c2 + c1 * d2;
  transform1[3] = b1 * c2 + d1 * d2;
  transform1[4] = a1 * e2 + c1 * f2 + e1;
  transform1[5] = b1 * e2 + d1 * f2 + f1;
  return transform1;
}
/**
 * Set the transform components a-f on a given transform.
 * @param {!Transform} transform Transform.
 * @param {number} a The a component of the transform.
 * @param {number} b The b component of the transform.
 * @param {number} c The c component of the transform.
 * @param {number} d The d component of the transform.
 * @param {number} e The e component of the transform.
 * @param {number} f The f component of the transform.
 * @return {!Transform} Matrix with transform applied.
 */


function set(transform, a, b, c, d, e, f) {
  transform[0] = a;
  transform[1] = b;
  transform[2] = c;
  transform[3] = d;
  transform[4] = e;
  transform[5] = f;
  return transform;
}
/**
 * Set transform on one matrix from another matrix.
 * @param {!Transform} transform1 Matrix to set transform to.
 * @param {!Transform} transform2 Matrix to set transform from.
 * @return {!Transform} transform1 with transform from transform2 applied.
 */


function setFromArray(transform1, transform2) {
  transform1[0] = transform2[0];
  transform1[1] = transform2[1];
  transform1[2] = transform2[2];
  transform1[3] = transform2[3];
  transform1[4] = transform2[4];
  transform1[5] = transform2[5];
  return transform1;
}
/**
 * Transforms the given coordinate with the given transform returning the
 * resulting, transformed coordinate. The coordinate will be modified in-place.
 *
 * @param {Transform} transform The transformation.
 * @param {import("./coordinate.js").Coordinate|import("./pixel.js").Pixel} coordinate The coordinate to transform.
 * @return {import("./coordinate.js").Coordinate|import("./pixel.js").Pixel} return coordinate so that operations can be
 *     chained together.
 */


function apply(transform, coordinate) {
  var x = coordinate[0];
  var y = coordinate[1];
  coordinate[0] = transform[0] * x + transform[2] * y + transform[4];
  coordinate[1] = transform[1] * x + transform[3] * y + transform[5];
  return coordinate;
}
/**
 * Applies rotation to the given transform.
 * @param {!Transform} transform Transform.
 * @param {number} angle Angle in radians.
 * @return {!Transform} The rotated transform.
 */


function rotate(transform, angle) {
  var cos = Math.cos(angle);
  var sin = Math.sin(angle);
  return multiply(transform, set(tmp_, cos, sin, -sin, cos, 0, 0));
}
/**
 * Applies scale to a given transform.
 * @param {!Transform} transform Transform.
 * @param {number} x Scale factor x.
 * @param {number} y Scale factor y.
 * @return {!Transform} The scaled transform.
 */


function scale(transform, x, y) {
  return multiply(transform, set(tmp_, x, 0, 0, y, 0, 0));
}
/**
 * Creates a scale transform.
 * @param {!Transform} target Transform to overwrite.
 * @param {number} x Scale factor x.
 * @param {number} y Scale factor y.
 * @return {!Transform} The scale transform.
 */


function makeScale(target, x, y) {
  return set(target, x, 0, 0, y, 0, 0);
}
/**
 * Applies translation to the given transform.
 * @param {!Transform} transform Transform.
 * @param {number} dx Translation x.
 * @param {number} dy Translation y.
 * @return {!Transform} The translated transform.
 */


function translate(transform, dx, dy) {
  return multiply(transform, set(tmp_, 1, 0, 0, 1, dx, dy));
}
/**
 * Creates a composite transform given an initial translation, scale, rotation, and
 * final translation (in that order only, not commutative).
 * @param {!Transform} transform The transform (will be modified in place).
 * @param {number} dx1 Initial translation x.
 * @param {number} dy1 Initial translation y.
 * @param {number} sx Scale factor x.
 * @param {number} sy Scale factor y.
 * @param {number} angle Rotation (in counter-clockwise radians).
 * @param {number} dx2 Final translation x.
 * @param {number} dy2 Final translation y.
 * @return {!Transform} The composite transform.
 */


function compose(transform, dx1, dy1, sx, sy, angle, dx2, dy2) {
  var sin = Math.sin(angle);
  var cos = Math.cos(angle);
  transform[0] = sx * cos;
  transform[1] = sy * sin;
  transform[2] = -sx * sin;
  transform[3] = sy * cos;
  transform[4] = dx2 * sx * cos - dy2 * sx * sin + dx1;
  transform[5] = dx2 * sy * sin + dy2 * sy * cos + dy1;
  return transform;
}
/**
 * Creates a composite transform given an initial translation, scale, rotation, and
 * final translation (in that order only, not commutative). The resulting transform
 * string can be applied as `transform` porperty of an HTMLElement's style.
 * @param {number} dx1 Initial translation x.
 * @param {number} dy1 Initial translation y.
 * @param {number} sx Scale factor x.
 * @param {number} sy Scale factor y.
 * @param {number} angle Rotation (in counter-clockwise radians).
 * @param {number} dx2 Final translation x.
 * @param {number} dy2 Final translation y.
 * @return {string} The composite css transform.
 * @api
 */


function composeCssTransform(dx1, dy1, sx, sy, angle, dx2, dy2) {
  return toString(compose(create(), dx1, dy1, sx, sy, angle, dx2, dy2));
}
/**
 * Invert the given transform.
 * @param {!Transform} source The source transform to invert.
 * @return {!Transform} The inverted (source) transform.
 */


function invert(source) {
  return makeInverse(source, source);
}
/**
 * Invert the given transform.
 * @param {!Transform} target Transform to be set as the inverse of
 *     the source transform.
 * @param {!Transform} source The source transform to invert.
 * @return {!Transform} The inverted (target) transform.
 */


function makeInverse(target, source) {
  var det = determinant(source);
  (0, _asserts.assert)(det !== 0, 32); // Transformation matrix cannot be inverted

  var a = source[0];
  var b = source[1];
  var c = source[2];
  var d = source[3];
  var e = source[4];
  var f = source[5];
  target[0] = d / det;
  target[1] = -b / det;
  target[2] = -c / det;
  target[3] = a / det;
  target[4] = (c * f - d * e) / det;
  target[5] = -(a * f - b * e) / det;
  return target;
}
/**
 * Returns the determinant of the given matrix.
 * @param {!Transform} mat Matrix.
 * @return {number} Determinant.
 */


function determinant(mat) {
  return mat[0] * mat[3] - mat[1] * mat[2];
}
/**
 * A string version of the transform.  This can be used
 * for CSS transforms.
 * @param {!Transform} mat Matrix.
 * @return {string} The transform as a string.
 */


function toString(mat) {
  return 'matrix(' + mat.join(', ') + ')';
}
},{"./asserts.js":"node_modules/ol/asserts.js"}],"node_modules/ol/render/canvas.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.measureTextWidth = measureTextWidth;
exports.measureAndCacheTextWidth = measureAndCacheTextWidth;
exports.measureTextWidths = measureTextWidths;
exports.rotateAtOffset = rotateAtOffset;
exports.drawImageOrLabel = drawImageOrLabel;
exports.createTransformString = createTransformString;
exports.measureTextHeight = exports.registerFont = exports.textHeights = exports.labelCache = exports.checkedFonts = exports.defaultLineWidth = exports.defaultPadding = exports.defaultTextBaseline = exports.defaultTextAlign = exports.defaultStrokeStyle = exports.defaultMiterLimit = exports.defaultLineJoin = exports.defaultLineDashOffset = exports.defaultLineDash = exports.defaultLineCap = exports.defaultFillStyle = exports.defaultFont = void 0;

var _Object = _interopRequireDefault(require("../Object.js"));

var _Target = _interopRequireDefault(require("../events/Target.js"));

var _has = require("../has.js");

var _obj = require("../obj.js");

var _dom = require("../dom.js");

var _css = require("../css.js");

var _transform = require("../transform.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @module ol/render/canvas
 */

/**
 * @typedef {Object} FillState
 * @property {import("../colorlike.js").ColorLike} fillStyle
 */

/**
 * @typedef Label
 * @property {number} width
 * @property {number} height
 * @property {Array<string|number>} contextInstructions
 */

/**
 * @typedef {Object} FillStrokeState
 * @property {import("../colorlike.js").ColorLike} [currentFillStyle]
 * @property {import("../colorlike.js").ColorLike} [currentStrokeStyle]
 * @property {CanvasLineCap} [currentLineCap]
 * @property {Array<number>} currentLineDash
 * @property {number} [currentLineDashOffset]
 * @property {CanvasLineJoin} [currentLineJoin]
 * @property {number} [currentLineWidth]
 * @property {number} [currentMiterLimit]
 * @property {number} [lastStroke]
 * @property {import("../colorlike.js").ColorLike} [fillStyle]
 * @property {import("../colorlike.js").ColorLike} [strokeStyle]
 * @property {CanvasLineCap} [lineCap]
 * @property {Array<number>} lineDash
 * @property {number} [lineDashOffset]
 * @property {CanvasLineJoin} [lineJoin]
 * @property {number} [lineWidth]
 * @property {number} [miterLimit]
 */

/**
 * @typedef {Object} StrokeState
 * @property {CanvasLineCap} lineCap
 * @property {Array<number>} lineDash
 * @property {number} lineDashOffset
 * @property {CanvasLineJoin} lineJoin
 * @property {number} lineWidth
 * @property {number} miterLimit
 * @property {import("../colorlike.js").ColorLike} strokeStyle
 */

/**
 * @typedef {Object} TextState
 * @property {string} font
 * @property {string} [textAlign]
 * @property {string} textBaseline
 * @property {string} [placement]
 * @property {number} [maxAngle]
 * @property {boolean} [overflow]
 * @property {import("../style/Fill.js").default} [backgroundFill]
 * @property {import("../style/Stroke.js").default} [backgroundStroke]
 * @property {import("../size.js").Size} [scale]
 * @property {Array<number>} [padding]
 */

/**
 * Container for decluttered replay instructions that need to be rendered or
 * omitted together, i.e. when styles render both an image and text, or for the
 * characters that form text along lines. The basic elements of this array are
 * `[minX, minY, maxX, maxY, count]`, where the first four entries are the
 * rendered extent of the group in pixel space. `count` is the number of styles
 * in the group, i.e. 2 when an image and a text are grouped, or 1 otherwise.
 * In addition to these four elements, declutter instruction arrays (i.e. the
 * arguments to {@link module:ol/render/canvas~drawImage} are appended to the array.
 * @typedef {Array<*>} DeclutterGroup
 */

/**
 * Declutter groups for support of multi geometries.
 * @typedef {Array<DeclutterGroup>} DeclutterGroups
 */

/**
 * @const
 * @type {string}
 */
var defaultFont = '10px sans-serif';
/**
 * @const
 * @type {import("../colorlike.js").ColorLike}
 */

exports.defaultFont = defaultFont;
var defaultFillStyle = '#000';
/**
 * @const
 * @type {CanvasLineCap}
 */

exports.defaultFillStyle = defaultFillStyle;
var defaultLineCap = 'round';
/**
 * @const
 * @type {Array<number>}
 */

exports.defaultLineCap = defaultLineCap;
var defaultLineDash = [];
/**
 * @const
 * @type {number}
 */

exports.defaultLineDash = defaultLineDash;
var defaultLineDashOffset = 0;
/**
 * @const
 * @type {CanvasLineJoin}
 */

exports.defaultLineDashOffset = defaultLineDashOffset;
var defaultLineJoin = 'round';
/**
 * @const
 * @type {number}
 */

exports.defaultLineJoin = defaultLineJoin;
var defaultMiterLimit = 10;
/**
 * @const
 * @type {import("../colorlike.js").ColorLike}
 */

exports.defaultMiterLimit = defaultMiterLimit;
var defaultStrokeStyle = '#000';
/**
 * @const
 * @type {string}
 */

exports.defaultStrokeStyle = defaultStrokeStyle;
var defaultTextAlign = 'center';
/**
 * @const
 * @type {string}
 */

exports.defaultTextAlign = defaultTextAlign;
var defaultTextBaseline = 'middle';
/**
 * @const
 * @type {Array<number>}
 */

exports.defaultTextBaseline = defaultTextBaseline;
var defaultPadding = [0, 0, 0, 0];
/**
 * @const
 * @type {number}
 */

exports.defaultPadding = defaultPadding;
var defaultLineWidth = 1;
/**
 * @type {BaseObject}
 */

exports.defaultLineWidth = defaultLineWidth;
var checkedFonts = new _Object.default();
/**
 * The label cache for text rendering. To change the default cache size of 2048
 * entries, use {@link module:ol/structs/LRUCache#setSize}.
 * Deprecated - there is no label cache any more.
 * @type {?}
 * @api
 * @deprecated
 */

exports.checkedFonts = checkedFonts;
var labelCache = new _Target.default();
exports.labelCache = labelCache;

labelCache.setSize = function () {
  console.warn('labelCache is deprecated.'); //eslint-disable-line
};
/**
 * @type {CanvasRenderingContext2D}
 */


var measureContext = null;
/**
 * @type {string}
 */

var measureFont;
/**
 * @type {!Object<string, number>}
 */

var textHeights = {};
/**
 * Clears the label cache when a font becomes available.
 * @param {string} fontSpec CSS font spec.
 */

exports.textHeights = textHeights;

var registerFont = function () {
  var retries = 100;
  var size = '32px ';
  var referenceFonts = ['monospace', 'serif'];
  var len = referenceFonts.length;
  var text = 'wmytzilWMYTZIL@#/&?$%10\uF013';
  var interval, referenceWidth;
  /**
   * @param {string} fontStyle Css font-style
   * @param {string} fontWeight Css font-weight
   * @param {*} fontFamily Css font-family
   * @return {boolean} Font with style and weight is available
   */

  function isAvailable(fontStyle, fontWeight, fontFamily) {
    var available = true;

    for (var i = 0; i < len; ++i) {
      var referenceFont = referenceFonts[i];
      referenceWidth = measureTextWidth(fontStyle + ' ' + fontWeight + ' ' + size + referenceFont, text);

      if (fontFamily != referenceFont) {
        var width = measureTextWidth(fontStyle + ' ' + fontWeight + ' ' + size + fontFamily + ',' + referenceFont, text); // If width and referenceWidth are the same, then the fallback was used
        // instead of the font we wanted, so the font is not available.

        available = available && width != referenceWidth;
      }
    }

    if (available) {
      return true;
    }

    return false;
  }

  function check() {
    var done = true;
    var fonts = checkedFonts.getKeys();

    for (var i = 0, ii = fonts.length; i < ii; ++i) {
      var font = fonts[i];

      if (checkedFonts.get(font) < retries) {
        if (isAvailable.apply(this, font.split('\n'))) {
          (0, _obj.clear)(textHeights); // Make sure that loaded fonts are picked up by Safari

          measureContext = null;
          measureFont = undefined;
          checkedFonts.set(font, retries);
        } else {
          checkedFonts.set(font, checkedFonts.get(font) + 1, true);
          done = false;
        }
      }
    }

    if (done) {
      clearInterval(interval);
      interval = undefined;
    }
  }

  return function (fontSpec) {
    var font = (0, _css.getFontParameters)(fontSpec);

    if (!font) {
      return;
    }

    var families = font.families;

    for (var i = 0, ii = families.length; i < ii; ++i) {
      var family = families[i];
      var key = font.style + '\n' + font.weight + '\n' + family;

      if (checkedFonts.get(key) === undefined) {
        checkedFonts.set(key, retries, true);

        if (!isAvailable(font.style, font.weight, family)) {
          checkedFonts.set(key, 0, true);

          if (interval === undefined) {
            interval = setInterval(check, 32);
          }
        }
      }
    }
  };
}();
/**
 * @param {string} font Font to use for measuring.
 * @return {import("../size.js").Size} Measurement.
 */


exports.registerFont = registerFont;

var measureTextHeight = function () {
  /**
   * @type {HTMLDivElement}
   */
  var div;
  var heights = textHeights;
  return function (fontSpec) {
    var height = heights[fontSpec];

    if (height == undefined) {
      if (_has.WORKER_OFFSCREEN_CANVAS) {
        var font = (0, _css.getFontParameters)(fontSpec);
        var metrics = measureText(fontSpec, 'Žg');
        var lineHeight = isNaN(Number(font.lineHeight)) ? 1.2 : Number(font.lineHeight);
        textHeights[fontSpec] = lineHeight * (metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent);
      } else {
        if (!div) {
          div = document.createElement('div');
          div.innerHTML = 'M';
          div.style.margin = '0 !important';
          div.style.padding = '0 !important';
          div.style.position = 'absolute !important';
          div.style.left = '-99999px !important';
        }

        div.style.font = fontSpec;
        document.body.appendChild(div);
        height = div.offsetHeight;
        heights[fontSpec] = height;
        document.body.removeChild(div);
      }
    }

    return height;
  };
}();
/**
 * @param {string} font Font.
 * @param {string} text Text.
 * @return {TextMetrics} Text metrics.
 */


exports.measureTextHeight = measureTextHeight;

function measureText(font, text) {
  if (!measureContext) {
    measureContext = (0, _dom.createCanvasContext2D)(1, 1);
  }

  if (font != measureFont) {
    measureContext.font = font;
    measureFont = measureContext.font;
  }

  return measureContext.measureText(text);
}
/**
 * @param {string} font Font.
 * @param {string} text Text.
 * @return {number} Width.
 */


function measureTextWidth(font, text) {
  return measureText(font, text).width;
}
/**
 * Measure text width using a cache.
 * @param {string} font The font.
 * @param {string} text The text to measure.
 * @param {Object<string, number>} cache A lookup of cached widths by text.
 * @returns {number} The text width.
 */


function measureAndCacheTextWidth(font, text, cache) {
  if (text in cache) {
    return cache[text];
  }

  var width = measureTextWidth(font, text);
  cache[text] = width;
  return width;
}
/**
 * @param {string} font Font to use for measuring.
 * @param {Array<string>} lines Lines to measure.
 * @param {Array<number>} widths Array will be populated with the widths of
 * each line.
 * @return {number} Width of the whole text.
 */


function measureTextWidths(font, lines, widths) {
  var numLines = lines.length;
  var width = 0;

  for (var i = 0; i < numLines; ++i) {
    var currentWidth = measureTextWidth(font, lines[i]);
    width = Math.max(width, currentWidth);
    widths.push(currentWidth);
  }

  return width;
}
/**
 * @param {CanvasRenderingContext2D} context Context.
 * @param {number} rotation Rotation.
 * @param {number} offsetX X offset.
 * @param {number} offsetY Y offset.
 */


function rotateAtOffset(context, rotation, offsetX, offsetY) {
  if (rotation !== 0) {
    context.translate(offsetX, offsetY);
    context.rotate(rotation);
    context.translate(-offsetX, -offsetY);
  }
}
/**
 * @param {CanvasRenderingContext2D} context Context.
 * @param {import("../transform.js").Transform|null} transform Transform.
 * @param {number} opacity Opacity.
 * @param {Label|HTMLCanvasElement|HTMLImageElement|HTMLVideoElement} labelOrImage Label.
 * @param {number} originX Origin X.
 * @param {number} originY Origin Y.
 * @param {number} w Width.
 * @param {number} h Height.
 * @param {number} x X.
 * @param {number} y Y.
 * @param {import("../size.js").Size} scale Scale.
 */


function drawImageOrLabel(context, transform, opacity, labelOrImage, originX, originY, w, h, x, y, scale) {
  context.save();

  if (opacity !== 1) {
    context.globalAlpha *= opacity;
  }

  if (transform) {
    context.setTransform.apply(context, transform);
  }

  if (
  /** @type {*} */
  labelOrImage.contextInstructions) {
    // label
    context.translate(x, y);
    context.scale(scale[0], scale[1]);
    executeLabelInstructions(
    /** @type {Label} */
    labelOrImage, context);
  } else if (scale[0] < 0 || scale[1] < 0) {
    // flipped image
    context.translate(x, y);
    context.scale(scale[0], scale[1]);
    context.drawImage(
    /** @type {HTMLCanvasElement|HTMLImageElement|HTMLVideoElement} */
    labelOrImage, originX, originY, w, h, 0, 0, w, h);
  } else {
    // if image not flipped translate and scale can be avoided
    context.drawImage(
    /** @type {HTMLCanvasElement|HTMLImageElement|HTMLVideoElement} */
    labelOrImage, originX, originY, w, h, x, y, w * scale[0], h * scale[1]);
  }

  context.restore();
}
/**
 * @param {Label} label Label.
 * @param {CanvasRenderingContext2D} context Context.
 */


function executeLabelInstructions(label, context) {
  var contextInstructions = label.contextInstructions;

  for (var i = 0, ii = contextInstructions.length; i < ii; i += 2) {
    if (Array.isArray(contextInstructions[i + 1])) {
      context[contextInstructions[i]].apply(context, contextInstructions[i + 1]);
    } else {
      context[contextInstructions[i]] = contextInstructions[i + 1];
    }
  }
}
/**
 * @type {HTMLCanvasElement}
 * @private
 */


var createTransformStringCanvas = null;
/**
 * @param {import("../transform.js").Transform} transform Transform.
 * @return {string} CSS transform.
 */

function createTransformString(transform) {
  if (_has.WORKER_OFFSCREEN_CANVAS) {
    return (0, _transform.toString)(transform);
  } else {
    if (!createTransformStringCanvas) {
      createTransformStringCanvas = (0, _dom.createCanvasContext2D)(1, 1).canvas;
    }

    createTransformStringCanvas.style.transform = (0, _transform.toString)(transform);
    return createTransformStringCanvas.style.transform;
  }
}
},{"../Object.js":"node_modules/ol/Object.js","../events/Target.js":"node_modules/ol/events/Target.js","../has.js":"node_modules/ol/has.js","../obj.js":"node_modules/ol/obj.js","../dom.js":"node_modules/ol/dom.js","../css.js":"node_modules/ol/css.js","../transform.js":"node_modules/ol/transform.js"}],"node_modules/ol/style/RegularShape.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ImageState = _interopRequireDefault(require("../ImageState.js"));

var _Image = _interopRequireDefault(require("./Image.js"));

var _color = require("../color.js");

var _colorlike = require("../colorlike.js");

var _dom = require("../dom.js");

var _canvas = require("../render/canvas.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @module ol/style/RegularShape
 */
var __extends = void 0 && (void 0).__extends || function () {
  var extendStatics = function (d, b) {
    extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    };

    return extendStatics(d, b);
  };

  return function (d, b) {
    extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

/**
 * Specify radius for regular polygons, or radius1 and radius2 for stars.
 * @typedef {Object} Options
 * @property {import("./Fill.js").default} [fill] Fill style.
 * @property {number} points Number of points for stars and regular polygons. In case of a polygon, the number of points
 * is the number of sides.
 * @property {number} [radius] Radius of a regular polygon.
 * @property {number} [radius1] Outer radius of a star.
 * @property {number} [radius2] Inner radius of a star.
 * @property {number} [angle=0] Shape's angle in radians. A value of 0 will have one of the shape's point facing up.
 * @property {Array<number>} [displacement=[0,0]] Displacement of the shape
 * @property {import("./Stroke.js").default} [stroke] Stroke style.
 * @property {number} [rotation=0] Rotation in radians (positive rotation clockwise).
 * @property {boolean} [rotateWithView=false] Whether to rotate the shape with the view.
 */

/**
 * @typedef {Object} RenderOptions
 * @property {import("../colorlike.js").ColorLike} [strokeStyle]
 * @property {number} strokeWidth
 * @property {number} size
 * @property {CanvasLineCap} lineCap
 * @property {Array<number>} lineDash
 * @property {number} lineDashOffset
 * @property {CanvasLineJoin} lineJoin
 * @property {number} miterLimit
 */

/**
 * @classdesc
 * Set regular shape style for vector features. The resulting shape will be
 * a regular polygon when `radius` is provided, or a star when `radius1` and
 * `radius2` are provided.
 * @api
 */
var RegularShape =
/** @class */
function (_super) {
  __extends(RegularShape, _super);
  /**
   * @param {Options} options Options.
   */


  function RegularShape(options) {
    var _this = this;
    /**
     * @type {boolean}
     */


    var rotateWithView = options.rotateWithView !== undefined ? options.rotateWithView : false;
    _this = _super.call(this, {
      opacity: 1,
      rotateWithView: rotateWithView,
      rotation: options.rotation !== undefined ? options.rotation : 0,
      scale: 1,
      displacement: options.displacement !== undefined ? options.displacement : [0, 0]
    }) || this;
    /**
     * @private
     * @type {Object<number, HTMLCanvasElement>}
     */

    _this.canvas_ = {};
    /**
     * @private
     * @type {HTMLCanvasElement}
     */

    _this.hitDetectionCanvas_ = null;
    /**
     * @private
     * @type {import("./Fill.js").default}
     */

    _this.fill_ = options.fill !== undefined ? options.fill : null;
    /**
     * @private
     * @type {Array<number>}
     */

    _this.origin_ = [0, 0];
    /**
     * @private
     * @type {number}
     */

    _this.points_ = options.points;
    /**
     * @protected
     * @type {number}
     */

    _this.radius_ = options.radius !== undefined ? options.radius : options.radius1;
    /**
     * @private
     * @type {number|undefined}
     */

    _this.radius2_ = options.radius2;
    /**
     * @private
     * @type {number}
     */

    _this.angle_ = options.angle !== undefined ? options.angle : 0;
    /**
     * @private
     * @type {import("./Stroke.js").default}
     */

    _this.stroke_ = options.stroke !== undefined ? options.stroke : null;
    /**
     * @private
     * @type {Array<number>}
     */

    _this.anchor_ = null;
    /**
     * @private
     * @type {import("../size.js").Size}
     */

    _this.size_ = null;
    /**
     * @private
     * @type {import("../size.js").Size}
     */

    _this.imageSize_ = null;
    /**
     * @private
     * @type {import("../size.js").Size}
     */

    _this.hitDetectionImageSize_ = null;

    _this.render();

    return _this;
  }
  /**
   * Clones the style.
   * @return {RegularShape} The cloned style.
   * @api
   */


  RegularShape.prototype.clone = function () {
    var style = new RegularShape({
      fill: this.getFill() ? this.getFill().clone() : undefined,
      points: this.getPoints(),
      radius: this.getRadius(),
      radius2: this.getRadius2(),
      angle: this.getAngle(),
      stroke: this.getStroke() ? this.getStroke().clone() : undefined,
      rotation: this.getRotation(),
      rotateWithView: this.getRotateWithView(),
      displacement: this.getDisplacement().slice()
    });
    style.setOpacity(this.getOpacity());
    style.setScale(this.getScale());
    return style;
  };
  /**
   * Get the anchor point in pixels. The anchor determines the center point for the
   * symbolizer.
   * @return {Array<number>} Anchor.
   * @api
   */


  RegularShape.prototype.getAnchor = function () {
    return this.anchor_;
  };
  /**
   * Get the angle used in generating the shape.
   * @return {number} Shape's rotation in radians.
   * @api
   */


  RegularShape.prototype.getAngle = function () {
    return this.angle_;
  };
  /**
   * Get the fill style for the shape.
   * @return {import("./Fill.js").default} Fill style.
   * @api
   */


  RegularShape.prototype.getFill = function () {
    return this.fill_;
  };
  /**
   * @return {HTMLCanvasElement} Image element.
   */


  RegularShape.prototype.getHitDetectionImage = function () {
    if (!this.hitDetectionCanvas_) {
      var renderOptions = this.createRenderOptions();
      this.createHitDetectionCanvas_(renderOptions);
    }

    return this.hitDetectionCanvas_;
  };
  /**
   * Get the image icon.
   * @param {number} pixelRatio Pixel ratio.
   * @return {HTMLCanvasElement} Image or Canvas element.
   * @api
   */


  RegularShape.prototype.getImage = function (pixelRatio) {
    if (!this.canvas_[pixelRatio || 1]) {
      var renderOptions = this.createRenderOptions();
      var context = (0, _dom.createCanvasContext2D)(renderOptions.size * pixelRatio || 1, renderOptions.size * pixelRatio || 1);
      this.draw_(renderOptions, context, 0, 0, pixelRatio || 1);
      this.canvas_[pixelRatio || 1] = context.canvas;
    }

    return this.canvas_[pixelRatio || 1];
  };
  /*
   * Get the image pixel ratio.
   * @param {number} pixelRatio Pixel ratio.
   * */


  RegularShape.prototype.getPixelRatio = function (pixelRatio) {
    return pixelRatio;
  };
  /**
   * @return {import("../size.js").Size} Image size.
   */


  RegularShape.prototype.getImageSize = function () {
    return this.imageSize_;
  };
  /**
   * @return {import("../size.js").Size} Size of the hit-detection image.
   */


  RegularShape.prototype.getHitDetectionImageSize = function () {
    return this.hitDetectionImageSize_;
  };
  /**
   * @return {import("../ImageState.js").default} Image state.
   */


  RegularShape.prototype.getImageState = function () {
    return _ImageState.default.LOADED;
  };
  /**
   * Get the origin of the symbolizer.
   * @return {Array<number>} Origin.
   * @api
   */


  RegularShape.prototype.getOrigin = function () {
    return this.origin_;
  };
  /**
   * Get the number of points for generating the shape.
   * @return {number} Number of points for stars and regular polygons.
   * @api
   */


  RegularShape.prototype.getPoints = function () {
    return this.points_;
  };
  /**
   * Get the (primary) radius for the shape.
   * @return {number} Radius.
   * @api
   */


  RegularShape.prototype.getRadius = function () {
    return this.radius_;
  };
  /**
   * Get the secondary radius for the shape.
   * @return {number|undefined} Radius2.
   * @api
   */


  RegularShape.prototype.getRadius2 = function () {
    return this.radius2_;
  };
  /**
   * Get the size of the symbolizer (in pixels).
   * @return {import("../size.js").Size} Size.
   * @api
   */


  RegularShape.prototype.getSize = function () {
    return this.size_;
  };
  /**
   * Get the stroke style for the shape.
   * @return {import("./Stroke.js").default} Stroke style.
   * @api
   */


  RegularShape.prototype.getStroke = function () {
    return this.stroke_;
  };
  /**
   * @param {function(import("../events/Event.js").default): void} listener Listener function.
   */


  RegularShape.prototype.listenImageChange = function (listener) {};
  /**
   * Load not yet loaded URI.
   */


  RegularShape.prototype.load = function () {};
  /**
   * @param {function(import("../events/Event.js").default): void} listener Listener function.
   */


  RegularShape.prototype.unlistenImageChange = function (listener) {};
  /**
   * @returns {RenderOptions}  The render options
   * @protected
   */


  RegularShape.prototype.createRenderOptions = function () {
    var lineCap = _canvas.defaultLineCap;
    var lineJoin = _canvas.defaultLineJoin;
    var miterLimit = 0;
    var lineDash = null;
    var lineDashOffset = 0;
    var strokeStyle;
    var strokeWidth = 0;

    if (this.stroke_) {
      strokeStyle = this.stroke_.getColor();

      if (strokeStyle === null) {
        strokeStyle = _canvas.defaultStrokeStyle;
      }

      strokeStyle = (0, _colorlike.asColorLike)(strokeStyle);
      strokeWidth = this.stroke_.getWidth();

      if (strokeWidth === undefined) {
        strokeWidth = _canvas.defaultLineWidth;
      }

      lineDash = this.stroke_.getLineDash();
      lineDashOffset = this.stroke_.getLineDashOffset();
      lineJoin = this.stroke_.getLineJoin();

      if (lineJoin === undefined) {
        lineJoin = _canvas.defaultLineJoin;
      }

      lineCap = this.stroke_.getLineCap();

      if (lineCap === undefined) {
        lineCap = _canvas.defaultLineCap;
      }

      miterLimit = this.stroke_.getMiterLimit();

      if (miterLimit === undefined) {
        miterLimit = _canvas.defaultMiterLimit;
      }
    }

    var size = 2 * (this.radius_ + strokeWidth) + 1;
    return {
      strokeStyle: strokeStyle,
      strokeWidth: strokeWidth,
      size: size,
      lineCap: lineCap,
      lineDash: lineDash,
      lineDashOffset: lineDashOffset,
      lineJoin: lineJoin,
      miterLimit: miterLimit
    };
  };
  /**
   * @protected
   */


  RegularShape.prototype.render = function () {
    var renderOptions = this.createRenderOptions();
    var context = (0, _dom.createCanvasContext2D)(renderOptions.size, renderOptions.size);
    this.draw_(renderOptions, context, 0, 0, 1);
    this.canvas_[1] = context.canvas; // canvas.width and height are rounded to the closest integer

    var size = context.canvas.width;
    var imageSize = size;
    var displacement = this.getDisplacement();
    this.hitDetectionImageSize_ = [renderOptions.size, renderOptions.size];
    this.createHitDetectionCanvas_(renderOptions);
    this.anchor_ = [size / 2 - displacement[0], size / 2 + displacement[1]];
    this.size_ = [size, size];
    this.imageSize_ = [imageSize, imageSize];
  };
  /**
   * @private
   * @param {RenderOptions} renderOptions Render options.
   * @param {CanvasRenderingContext2D} context The rendering context.
   * @param {number} x The origin for the symbol (x).
   * @param {number} y The origin for the symbol (y).
   * @param {number} pixelRatio The pixel ratio.
   */


  RegularShape.prototype.draw_ = function (renderOptions, context, x, y, pixelRatio) {
    var i, angle0, radiusC; // reset transform

    context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0); // then move to (x, y)

    context.translate(x, y);
    context.beginPath();
    var points = this.points_;

    if (points === Infinity) {
      context.arc(renderOptions.size / 2, renderOptions.size / 2, this.radius_, 0, 2 * Math.PI, true);
    } else {
      var radius2 = this.radius2_ !== undefined ? this.radius2_ : this.radius_;

      if (radius2 !== this.radius_) {
        points = 2 * points;
      }

      for (i = 0; i <= points; i++) {
        angle0 = i * 2 * Math.PI / points - Math.PI / 2 + this.angle_;
        radiusC = i % 2 === 0 ? this.radius_ : radius2;
        context.lineTo(renderOptions.size / 2 + radiusC * Math.cos(angle0), renderOptions.size / 2 + radiusC * Math.sin(angle0));
      }
    }

    if (this.fill_) {
      var color = this.fill_.getColor();

      if (color === null) {
        color = _canvas.defaultFillStyle;
      }

      context.fillStyle = (0, _colorlike.asColorLike)(color);
      context.fill();
    }

    if (this.stroke_) {
      context.strokeStyle = renderOptions.strokeStyle;
      context.lineWidth = renderOptions.strokeWidth;

      if (context.setLineDash && renderOptions.lineDash) {
        context.setLineDash(renderOptions.lineDash);
        context.lineDashOffset = renderOptions.lineDashOffset;
      }

      context.lineCap = renderOptions.lineCap;
      context.lineJoin = renderOptions.lineJoin;
      context.miterLimit = renderOptions.miterLimit;
      context.stroke();
    }

    context.closePath();
  };
  /**
   * @private
   * @param {RenderOptions} renderOptions Render options.
   */


  RegularShape.prototype.createHitDetectionCanvas_ = function (renderOptions) {
    this.hitDetectionCanvas_ = this.getImage(1);

    if (this.fill_) {
      var color = this.fill_.getColor(); // determine if fill is transparent (or pattern or gradient)

      var opacity = 0;

      if (typeof color === 'string') {
        color = (0, _color.asArray)(color);
      }

      if (color === null) {
        opacity = 1;
      } else if (Array.isArray(color)) {
        opacity = color.length === 4 ? color[3] : 1;
      }

      if (opacity === 0) {
        // if a transparent fill style is set, create an extra hit-detection image
        // with a default fill style
        var context = (0, _dom.createCanvasContext2D)(renderOptions.size, renderOptions.size);
        this.hitDetectionCanvas_ = context.canvas;
        this.drawHitDetectionCanvas_(renderOptions, context, 0, 0);
      }
    }
  };
  /**
   * @private
   * @param {RenderOptions} renderOptions Render options.
   * @param {CanvasRenderingContext2D} context The context.
   * @param {number} x The origin for the symbol (x).
   * @param {number} y The origin for the symbol (y).
   */


  RegularShape.prototype.drawHitDetectionCanvas_ = function (renderOptions, context, x, y) {
    // move to (x, y)
    context.translate(x, y);
    context.beginPath();
    var points = this.points_;

    if (points === Infinity) {
      context.arc(renderOptions.size / 2, renderOptions.size / 2, this.radius_, 0, 2 * Math.PI, true);
    } else {
      var radius2 = this.radius2_ !== undefined ? this.radius2_ : this.radius_;

      if (radius2 !== this.radius_) {
        points = 2 * points;
      }

      var i = void 0,
          radiusC = void 0,
          angle0 = void 0;

      for (i = 0; i <= points; i++) {
        angle0 = i * 2 * Math.PI / points - Math.PI / 2 + this.angle_;
        radiusC = i % 2 === 0 ? this.radius_ : radius2;
        context.lineTo(renderOptions.size / 2 + radiusC * Math.cos(angle0), renderOptions.size / 2 + radiusC * Math.sin(angle0));
      }
    }

    context.fillStyle = _canvas.defaultFillStyle;
    context.fill();

    if (this.stroke_) {
      context.strokeStyle = renderOptions.strokeStyle;
      context.lineWidth = renderOptions.strokeWidth;

      if (renderOptions.lineDash) {
        context.setLineDash(renderOptions.lineDash);
        context.lineDashOffset = renderOptions.lineDashOffset;
      }

      context.stroke();
    }

    context.closePath();
  };

  return RegularShape;
}(_Image.default);

var _default = RegularShape;
exports.default = _default;
},{"../ImageState.js":"node_modules/ol/ImageState.js","./Image.js":"node_modules/ol/style/Image.js","../color.js":"node_modules/ol/color.js","../colorlike.js":"node_modules/ol/colorlike.js","../dom.js":"node_modules/ol/dom.js","../render/canvas.js":"node_modules/ol/render/canvas.js"}],"node_modules/ol/style/Circle.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _RegularShape = _interopRequireDefault(require("./RegularShape.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @module ol/style/Circle
 */
var __extends = void 0 && (void 0).__extends || function () {
  var extendStatics = function (d, b) {
    extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    };

    return extendStatics(d, b);
  };

  return function (d, b) {
    extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

/**
 * @typedef {Object} Options
 * @property {import("./Fill.js").default} [fill] Fill style.
 * @property {number} radius Circle radius.
 * @property {import("./Stroke.js").default} [stroke] Stroke style.
 * @property {Array<number>} [displacement=[0,0]] displacement
 */

/**
 * @classdesc
 * Set circle style for vector features.
 * @api
 */
var CircleStyle =
/** @class */
function (_super) {
  __extends(CircleStyle, _super);
  /**
   * @param {Options=} opt_options Options.
   */


  function CircleStyle(opt_options) {
    var _this = this;

    var options = opt_options ? opt_options : {};
    _this = _super.call(this, {
      points: Infinity,
      fill: options.fill,
      radius: options.radius,
      stroke: options.stroke,
      displacement: options.displacement !== undefined ? options.displacement : [0, 0]
    }) || this;
    return _this;
  }
  /**
   * Clones the style.
   * @return {CircleStyle} The cloned style.
   * @api
   */


  CircleStyle.prototype.clone = function () {
    var style = new CircleStyle({
      fill: this.getFill() ? this.getFill().clone() : undefined,
      stroke: this.getStroke() ? this.getStroke().clone() : undefined,
      radius: this.getRadius(),
      displacement: this.getDisplacement().slice()
    });
    style.setOpacity(this.getOpacity());
    style.setScale(this.getScale());
    return style;
  };
  /**
   * Set the circle radius.
   *
   * @param {number} radius Circle radius.
   * @api
   */


  CircleStyle.prototype.setRadius = function (radius) {
    this.radius_ = radius;
    this.render();
  };

  return CircleStyle;
}(_RegularShape.default);

var _default = CircleStyle;
exports.default = _default;
},{"./RegularShape.js":"node_modules/ol/style/RegularShape.js"}],"node_modules/ol/style/Fill.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * @module ol/style/Fill
 */

/**
 * @typedef {Object} Options
 * @property {import("../color.js").Color|import("../colorlike.js").ColorLike} [color=null] A color, gradient or pattern.
 * See {@link module:ol/color~Color} and {@link module:ol/colorlike~ColorLike} for possible formats.
 * Default null; if null, the Canvas/renderer default black will be used.
 */

/**
 * @classdesc
 * Set fill style for vector features.
 * @api
 */
var Fill =
/** @class */
function () {
  /**
   * @param {Options=} opt_options Options.
   */
  function Fill(opt_options) {
    var options = opt_options || {};
    /**
     * @private
     * @type {import("../color.js").Color|import("../colorlike.js").ColorLike}
     */

    this.color_ = options.color !== undefined ? options.color : null;
  }
  /**
   * Clones the style. The color is not cloned if it is an {@link module:ol/colorlike~ColorLike}.
   * @return {Fill} The cloned style.
   * @api
   */


  Fill.prototype.clone = function () {
    var color = this.getColor();
    return new Fill({
      color: Array.isArray(color) ? color.slice() : color || undefined
    });
  };
  /**
   * Get the fill color.
   * @return {import("../color.js").Color|import("../colorlike.js").ColorLike} Color.
   * @api
   */


  Fill.prototype.getColor = function () {
    return this.color_;
  };
  /**
   * Set the color.
   *
   * @param {import("../color.js").Color|import("../colorlike.js").ColorLike} color Color.
   * @api
   */


  Fill.prototype.setColor = function (color) {
    this.color_ = color;
  };

  return Fill;
}();

var _default = Fill;
exports.default = _default;
},{}],"node_modules/ol/style/IconAnchorUnits.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * @module ol/style/IconAnchorUnits
 */

/**
 * Icon anchor units. One of 'fraction', 'pixels'.
 * @enum {string}
 */
var _default = {
  /**
   * Anchor is a fraction
   * @api
   */
  FRACTION: 'fraction',

  /**
   * Anchor is in pixels
   * @api
   */
  PIXELS: 'pixels'
};
exports.default = _default;
},{}],"node_modules/ol/style/IconOrigin.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * @module ol/style/IconOrigin
 */

/**
 * Icon origin. One of 'bottom-left', 'bottom-right', 'top-left', 'top-right'.
 * @enum {string}
 */
var _default = {
  /**
   * Origin is at bottom left
   * @api
   */
  BOTTOM_LEFT: 'bottom-left',

  /**
   * Origin is at bottom right
   * @api
   */
  BOTTOM_RIGHT: 'bottom-right',

  /**
   * Origin is at top left
   * @api
   */
  TOP_LEFT: 'top-left',

  /**
   * Origin is at top right
   * @api
   */
  TOP_RIGHT: 'top-right'
};
exports.default = _default;
},{}],"node_modules/ol/style/IconImageCache.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.shared = exports.default = void 0;

var _color = require("../color.js");

/**
 * @module ol/style/IconImageCache
 */

/**
 * @classdesc
 * Singleton class. Available through {@link module:ol/style/IconImageCache~shared}.
 */
var IconImageCache =
/** @class */
function () {
  function IconImageCache() {
    /**
     * @type {!Object<string, import("./IconImage.js").default>}
     * @private
     */
    this.cache_ = {};
    /**
     * @type {number}
     * @private
     */

    this.cacheSize_ = 0;
    /**
     * @type {number}
     * @private
     */

    this.maxCacheSize_ = 32;
  }
  /**
   * FIXME empty description for jsdoc
   */


  IconImageCache.prototype.clear = function () {
    this.cache_ = {};
    this.cacheSize_ = 0;
  };
  /**
   * @return {boolean} Can expire cache.
   */


  IconImageCache.prototype.canExpireCache = function () {
    return this.cacheSize_ > this.maxCacheSize_;
  };
  /**
   * FIXME empty description for jsdoc
   */


  IconImageCache.prototype.expire = function () {
    if (this.canExpireCache()) {
      var i = 0;

      for (var key in this.cache_) {
        var iconImage = this.cache_[key];

        if ((i++ & 3) === 0 && !iconImage.hasListener()) {
          delete this.cache_[key];
          --this.cacheSize_;
        }
      }
    }
  };
  /**
   * @param {string} src Src.
   * @param {?string} crossOrigin Cross origin.
   * @param {import("../color.js").Color} color Color.
   * @return {import("./IconImage.js").default} Icon image.
   */


  IconImageCache.prototype.get = function (src, crossOrigin, color) {
    var key = getKey(src, crossOrigin, color);
    return key in this.cache_ ? this.cache_[key] : null;
  };
  /**
   * @param {string} src Src.
   * @param {?string} crossOrigin Cross origin.
   * @param {import("../color.js").Color} color Color.
   * @param {import("./IconImage.js").default} iconImage Icon image.
   */


  IconImageCache.prototype.set = function (src, crossOrigin, color, iconImage) {
    var key = getKey(src, crossOrigin, color);
    this.cache_[key] = iconImage;
    ++this.cacheSize_;
  };
  /**
   * Set the cache size of the icon cache. Default is `32`. Change this value when
   * your map uses more than 32 different icon images and you are not caching icon
   * styles on the application level.
   * @param {number} maxCacheSize Cache max size.
   * @api
   */


  IconImageCache.prototype.setSize = function (maxCacheSize) {
    this.maxCacheSize_ = maxCacheSize;
    this.expire();
  };

  return IconImageCache;
}();
/**
 * @param {string} src Src.
 * @param {?string} crossOrigin Cross origin.
 * @param {import("../color.js").Color} color Color.
 * @return {string} Cache key.
 */


function getKey(src, crossOrigin, color) {
  var colorString = color ? (0, _color.asString)(color) : 'null';
  return crossOrigin + ':' + src + ':' + colorString;
}

var _default = IconImageCache;
/**
 * The {@link module:ol/style/IconImageCache~IconImageCache} for
 * {@link module:ol/style/Icon~Icon} images.
 * @api
 */

exports.default = _default;
var shared = new IconImageCache();
exports.shared = shared;
},{"../color.js":"node_modules/ol/color.js"}],"node_modules/ol/ImageBase.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Target = _interopRequireDefault(require("./events/Target.js"));

var _EventType = _interopRequireDefault(require("./events/EventType.js"));

var _util = require("./util.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var __extends = void 0 && (void 0).__extends || function () {
  var extendStatics = function (d, b) {
    extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    };

    return extendStatics(d, b);
  };

  return function (d, b) {
    extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
/**
 * @module ol/ImageBase
 */


/**
 * @abstract
 */
var ImageBase =
/** @class */
function (_super) {
  __extends(ImageBase, _super);
  /**
   * @param {import("./extent.js").Extent} extent Extent.
   * @param {number|undefined} resolution Resolution.
   * @param {number} pixelRatio Pixel ratio.
   * @param {import("./ImageState.js").default} state State.
   */


  function ImageBase(extent, resolution, pixelRatio, state) {
    var _this = _super.call(this) || this;
    /**
     * @protected
     * @type {import("./extent.js").Extent}
     */


    _this.extent = extent;
    /**
     * @private
     * @type {number}
     */

    _this.pixelRatio_ = pixelRatio;
    /**
     * @protected
     * @type {number|undefined}
     */

    _this.resolution = resolution;
    /**
     * @protected
     * @type {import("./ImageState.js").default}
     */

    _this.state = state;
    return _this;
  }
  /**
   * @protected
   */


  ImageBase.prototype.changed = function () {
    this.dispatchEvent(_EventType.default.CHANGE);
  };
  /**
   * @return {import("./extent.js").Extent} Extent.
   */


  ImageBase.prototype.getExtent = function () {
    return this.extent;
  };
  /**
   * @abstract
   * @return {HTMLCanvasElement|HTMLImageElement|HTMLVideoElement} Image.
   */


  ImageBase.prototype.getImage = function () {
    return (0, _util.abstract)();
  };
  /**
   * @return {number} PixelRatio.
   */


  ImageBase.prototype.getPixelRatio = function () {
    return this.pixelRatio_;
  };
  /**
   * @return {number} Resolution.
   */


  ImageBase.prototype.getResolution = function () {
    return (
      /** @type {number} */
      this.resolution
    );
  };
  /**
   * @return {import("./ImageState.js").default} State.
   */


  ImageBase.prototype.getState = function () {
    return this.state;
  };
  /**
   * Load not yet loaded URI.
   * @abstract
   */


  ImageBase.prototype.load = function () {
    (0, _util.abstract)();
  };

  return ImageBase;
}(_Target.default);

var _default = ImageBase;
exports.default = _default;
},{"./events/Target.js":"node_modules/ol/events/Target.js","./events/EventType.js":"node_modules/ol/events/EventType.js","./util.js":"node_modules/ol/util.js"}],"node_modules/ol/extent/Corner.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * @module ol/extent/Corner
 */

/**
 * Extent corner.
 * @enum {string}
 */
var _default = {
  BOTTOM_LEFT: 'bottom-left',
  BOTTOM_RIGHT: 'bottom-right',
  TOP_LEFT: 'top-left',
  TOP_RIGHT: 'top-right'
};
exports.default = _default;
},{}],"node_modules/ol/extent/Relationship.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * @module ol/extent/Relationship
 */

/**
 * Relationship to an extent.
 * @enum {number}
 */
var _default = {
  UNKNOWN: 0,
  INTERSECTING: 1,
  ABOVE: 2,
  RIGHT: 4,
  BELOW: 8,
  LEFT: 16
};
exports.default = _default;
},{}],"node_modules/ol/extent.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.boundingExtent = boundingExtent;
exports.buffer = buffer;
exports.clone = clone;
exports.closestSquaredDistanceXY = closestSquaredDistanceXY;
exports.containsCoordinate = containsCoordinate;
exports.containsExtent = containsExtent;
exports.containsXY = containsXY;
exports.coordinateRelationship = coordinateRelationship;
exports.createEmpty = createEmpty;
exports.createOrUpdate = createOrUpdate;
exports.createOrUpdateEmpty = createOrUpdateEmpty;
exports.createOrUpdateFromCoordinate = createOrUpdateFromCoordinate;
exports.createOrUpdateFromCoordinates = createOrUpdateFromCoordinates;
exports.createOrUpdateFromFlatCoordinates = createOrUpdateFromFlatCoordinates;
exports.createOrUpdateFromRings = createOrUpdateFromRings;
exports.equals = equals;
exports.approximatelyEquals = approximatelyEquals;
exports.extend = extend;
exports.extendCoordinate = extendCoordinate;
exports.extendCoordinates = extendCoordinates;
exports.extendFlatCoordinates = extendFlatCoordinates;
exports.extendRings = extendRings;
exports.extendXY = extendXY;
exports.forEachCorner = forEachCorner;
exports.getArea = getArea;
exports.getBottomLeft = getBottomLeft;
exports.getBottomRight = getBottomRight;
exports.getCenter = getCenter;
exports.getCorner = getCorner;
exports.getEnlargedArea = getEnlargedArea;
exports.getForViewAndSize = getForViewAndSize;
exports.getHeight = getHeight;
exports.getIntersectionArea = getIntersectionArea;
exports.getIntersection = getIntersection;
exports.getMargin = getMargin;
exports.getSize = getSize;
exports.getTopLeft = getTopLeft;
exports.getTopRight = getTopRight;
exports.getWidth = getWidth;
exports.intersects = intersects;
exports.isEmpty = isEmpty;
exports.returnOrUpdate = returnOrUpdate;
exports.scaleFromCenter = scaleFromCenter;
exports.intersectsSegment = intersectsSegment;
exports.applyTransform = applyTransform;
exports.wrapX = wrapX;

var _Corner = _interopRequireDefault(require("./extent/Corner.js"));

var _Relationship = _interopRequireDefault(require("./extent/Relationship.js"));

var _asserts = require("./asserts.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @module ol/extent
 */

/**
 * An array of numbers representing an extent: `[minx, miny, maxx, maxy]`.
 * @typedef {Array<number>} Extent
 * @api
 */

/**
 * Build an extent that includes all given coordinates.
 *
 * @param {Array<import("./coordinate.js").Coordinate>} coordinates Coordinates.
 * @return {Extent} Bounding extent.
 * @api
 */
function boundingExtent(coordinates) {
  var extent = createEmpty();

  for (var i = 0, ii = coordinates.length; i < ii; ++i) {
    extendCoordinate(extent, coordinates[i]);
  }

  return extent;
}
/**
 * @param {Array<number>} xs Xs.
 * @param {Array<number>} ys Ys.
 * @param {Extent=} opt_extent Destination extent.
 * @private
 * @return {Extent} Extent.
 */


function _boundingExtentXYs(xs, ys, opt_extent) {
  var minX = Math.min.apply(null, xs);
  var minY = Math.min.apply(null, ys);
  var maxX = Math.max.apply(null, xs);
  var maxY = Math.max.apply(null, ys);
  return createOrUpdate(minX, minY, maxX, maxY, opt_extent);
}
/**
 * Return extent increased by the provided value.
 * @param {Extent} extent Extent.
 * @param {number} value The amount by which the extent should be buffered.
 * @param {Extent=} opt_extent Extent.
 * @return {Extent} Extent.
 * @api
 */


function buffer(extent, value, opt_extent) {
  if (opt_extent) {
    opt_extent[0] = extent[0] - value;
    opt_extent[1] = extent[1] - value;
    opt_extent[2] = extent[2] + value;
    opt_extent[3] = extent[3] + value;
    return opt_extent;
  } else {
    return [extent[0] - value, extent[1] - value, extent[2] + value, extent[3] + value];
  }
}
/**
 * Creates a clone of an extent.
 *
 * @param {Extent} extent Extent to clone.
 * @param {Extent=} opt_extent Extent.
 * @return {Extent} The clone.
 */


function clone(extent, opt_extent) {
  if (opt_extent) {
    opt_extent[0] = extent[0];
    opt_extent[1] = extent[1];
    opt_extent[2] = extent[2];
    opt_extent[3] = extent[3];
    return opt_extent;
  } else {
    return extent.slice();
  }
}
/**
 * @param {Extent} extent Extent.
 * @param {number} x X.
 * @param {number} y Y.
 * @return {number} Closest squared distance.
 */


function closestSquaredDistanceXY(extent, x, y) {
  var dx, dy;

  if (x < extent[0]) {
    dx = extent[0] - x;
  } else if (extent[2] < x) {
    dx = x - extent[2];
  } else {
    dx = 0;
  }

  if (y < extent[1]) {
    dy = extent[1] - y;
  } else if (extent[3] < y) {
    dy = y - extent[3];
  } else {
    dy = 0;
  }

  return dx * dx + dy * dy;
}
/**
 * Check if the passed coordinate is contained or on the edge of the extent.
 *
 * @param {Extent} extent Extent.
 * @param {import("./coordinate.js").Coordinate} coordinate Coordinate.
 * @return {boolean} The coordinate is contained in the extent.
 * @api
 */


function containsCoordinate(extent, coordinate) {
  return containsXY(extent, coordinate[0], coordinate[1]);
}
/**
 * Check if one extent contains another.
 *
 * An extent is deemed contained if it lies completely within the other extent,
 * including if they share one or more edges.
 *
 * @param {Extent} extent1 Extent 1.
 * @param {Extent} extent2 Extent 2.
 * @return {boolean} The second extent is contained by or on the edge of the
 *     first.
 * @api
 */


function containsExtent(extent1, extent2) {
  return extent1[0] <= extent2[0] && extent2[2] <= extent1[2] && extent1[1] <= extent2[1] && extent2[3] <= extent1[3];
}
/**
 * Check if the passed coordinate is contained or on the edge of the extent.
 *
 * @param {Extent} extent Extent.
 * @param {number} x X coordinate.
 * @param {number} y Y coordinate.
 * @return {boolean} The x, y values are contained in the extent.
 * @api
 */


function containsXY(extent, x, y) {
  return extent[0] <= x && x <= extent[2] && extent[1] <= y && y <= extent[3];
}
/**
 * Get the relationship between a coordinate and extent.
 * @param {Extent} extent The extent.
 * @param {import("./coordinate.js").Coordinate} coordinate The coordinate.
 * @return {import("./extent/Relationship.js").default} The relationship (bitwise compare with
 *     import("./extent/Relationship.js").Relationship).
 */


function coordinateRelationship(extent, coordinate) {
  var minX = extent[0];
  var minY = extent[1];
  var maxX = extent[2];
  var maxY = extent[3];
  var x = coordinate[0];
  var y = coordinate[1];
  var relationship = _Relationship.default.UNKNOWN;

  if (x < minX) {
    relationship = relationship | _Relationship.default.LEFT;
  } else if (x > maxX) {
    relationship = relationship | _Relationship.default.RIGHT;
  }

  if (y < minY) {
    relationship = relationship | _Relationship.default.BELOW;
  } else if (y > maxY) {
    relationship = relationship | _Relationship.default.ABOVE;
  }

  if (relationship === _Relationship.default.UNKNOWN) {
    relationship = _Relationship.default.INTERSECTING;
  }

  return relationship;
}
/**
 * Create an empty extent.
 * @return {Extent} Empty extent.
 * @api
 */


function createEmpty() {
  return [Infinity, Infinity, -Infinity, -Infinity];
}
/**
 * Create a new extent or update the provided extent.
 * @param {number} minX Minimum X.
 * @param {number} minY Minimum Y.
 * @param {number} maxX Maximum X.
 * @param {number} maxY Maximum Y.
 * @param {Extent=} opt_extent Destination extent.
 * @return {Extent} Extent.
 */


function createOrUpdate(minX, minY, maxX, maxY, opt_extent) {
  if (opt_extent) {
    opt_extent[0] = minX;
    opt_extent[1] = minY;
    opt_extent[2] = maxX;
    opt_extent[3] = maxY;
    return opt_extent;
  } else {
    return [minX, minY, maxX, maxY];
  }
}
/**
 * Create a new empty extent or make the provided one empty.
 * @param {Extent=} opt_extent Extent.
 * @return {Extent} Extent.
 */


function createOrUpdateEmpty(opt_extent) {
  return createOrUpdate(Infinity, Infinity, -Infinity, -Infinity, opt_extent);
}
/**
 * @param {import("./coordinate.js").Coordinate} coordinate Coordinate.
 * @param {Extent=} opt_extent Extent.
 * @return {Extent} Extent.
 */


function createOrUpdateFromCoordinate(coordinate, opt_extent) {
  var x = coordinate[0];
  var y = coordinate[1];
  return createOrUpdate(x, y, x, y, opt_extent);
}
/**
 * @param {Array<import("./coordinate.js").Coordinate>} coordinates Coordinates.
 * @param {Extent=} opt_extent Extent.
 * @return {Extent} Extent.
 */


function createOrUpdateFromCoordinates(coordinates, opt_extent) {
  var extent = createOrUpdateEmpty(opt_extent);
  return extendCoordinates(extent, coordinates);
}
/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {number} end End.
 * @param {number} stride Stride.
 * @param {Extent=} opt_extent Extent.
 * @return {Extent} Extent.
 */


function createOrUpdateFromFlatCoordinates(flatCoordinates, offset, end, stride, opt_extent) {
  var extent = createOrUpdateEmpty(opt_extent);
  return extendFlatCoordinates(extent, flatCoordinates, offset, end, stride);
}
/**
 * @param {Array<Array<import("./coordinate.js").Coordinate>>} rings Rings.
 * @param {Extent=} opt_extent Extent.
 * @return {Extent} Extent.
 */


function createOrUpdateFromRings(rings, opt_extent) {
  var extent = createOrUpdateEmpty(opt_extent);
  return extendRings(extent, rings);
}
/**
 * Determine if two extents are equivalent.
 * @param {Extent} extent1 Extent 1.
 * @param {Extent} extent2 Extent 2.
 * @return {boolean} The two extents are equivalent.
 * @api
 */


function equals(extent1, extent2) {
  return extent1[0] == extent2[0] && extent1[2] == extent2[2] && extent1[1] == extent2[1] && extent1[3] == extent2[3];
}
/**
 * Determine if two extents are approximately equivalent.
 * @param {Extent} extent1 Extent 1.
 * @param {Extent} extent2 Extent 2.
 * @param {number} tolerance Tolerance in extent coordinate units.
 * @return {boolean} The two extents differ by less than the tolerance.
 */


function approximatelyEquals(extent1, extent2, tolerance) {
  return Math.abs(extent1[0] - extent2[0]) < tolerance && Math.abs(extent1[2] - extent2[2]) < tolerance && Math.abs(extent1[1] - extent2[1]) < tolerance && Math.abs(extent1[3] - extent2[3]) < tolerance;
}
/**
 * Modify an extent to include another extent.
 * @param {Extent} extent1 The extent to be modified.
 * @param {Extent} extent2 The extent that will be included in the first.
 * @return {Extent} A reference to the first (extended) extent.
 * @api
 */


function extend(extent1, extent2) {
  if (extent2[0] < extent1[0]) {
    extent1[0] = extent2[0];
  }

  if (extent2[2] > extent1[2]) {
    extent1[2] = extent2[2];
  }

  if (extent2[1] < extent1[1]) {
    extent1[1] = extent2[1];
  }

  if (extent2[3] > extent1[3]) {
    extent1[3] = extent2[3];
  }

  return extent1;
}
/**
 * @param {Extent} extent Extent.
 * @param {import("./coordinate.js").Coordinate} coordinate Coordinate.
 */


function extendCoordinate(extent, coordinate) {
  if (coordinate[0] < extent[0]) {
    extent[0] = coordinate[0];
  }

  if (coordinate[0] > extent[2]) {
    extent[2] = coordinate[0];
  }

  if (coordinate[1] < extent[1]) {
    extent[1] = coordinate[1];
  }

  if (coordinate[1] > extent[3]) {
    extent[3] = coordinate[1];
  }
}
/**
 * @param {Extent} extent Extent.
 * @param {Array<import("./coordinate.js").Coordinate>} coordinates Coordinates.
 * @return {Extent} Extent.
 */


function extendCoordinates(extent, coordinates) {
  for (var i = 0, ii = coordinates.length; i < ii; ++i) {
    extendCoordinate(extent, coordinates[i]);
  }

  return extent;
}
/**
 * @param {Extent} extent Extent.
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {number} end End.
 * @param {number} stride Stride.
 * @return {Extent} Extent.
 */


function extendFlatCoordinates(extent, flatCoordinates, offset, end, stride) {
  for (; offset < end; offset += stride) {
    extendXY(extent, flatCoordinates[offset], flatCoordinates[offset + 1]);
  }

  return extent;
}
/**
 * @param {Extent} extent Extent.
 * @param {Array<Array<import("./coordinate.js").Coordinate>>} rings Rings.
 * @return {Extent} Extent.
 */


function extendRings(extent, rings) {
  for (var i = 0, ii = rings.length; i < ii; ++i) {
    extendCoordinates(extent, rings[i]);
  }

  return extent;
}
/**
 * @param {Extent} extent Extent.
 * @param {number} x X.
 * @param {number} y Y.
 */


function extendXY(extent, x, y) {
  extent[0] = Math.min(extent[0], x);
  extent[1] = Math.min(extent[1], y);
  extent[2] = Math.max(extent[2], x);
  extent[3] = Math.max(extent[3], y);
}
/**
 * This function calls `callback` for each corner of the extent. If the
 * callback returns a truthy value the function returns that value
 * immediately. Otherwise the function returns `false`.
 * @param {Extent} extent Extent.
 * @param {function(import("./coordinate.js").Coordinate): S} callback Callback.
 * @return {S|boolean} Value.
 * @template S
 */


function forEachCorner(extent, callback) {
  var val;
  val = callback(getBottomLeft(extent));

  if (val) {
    return val;
  }

  val = callback(getBottomRight(extent));

  if (val) {
    return val;
  }

  val = callback(getTopRight(extent));

  if (val) {
    return val;
  }

  val = callback(getTopLeft(extent));

  if (val) {
    return val;
  }

  return false;
}
/**
 * Get the size of an extent.
 * @param {Extent} extent Extent.
 * @return {number} Area.
 * @api
 */


function getArea(extent) {
  var area = 0;

  if (!isEmpty(extent)) {
    area = getWidth(extent) * getHeight(extent);
  }

  return area;
}
/**
 * Get the bottom left coordinate of an extent.
 * @param {Extent} extent Extent.
 * @return {import("./coordinate.js").Coordinate} Bottom left coordinate.
 * @api
 */


function getBottomLeft(extent) {
  return [extent[0], extent[1]];
}
/**
 * Get the bottom right coordinate of an extent.
 * @param {Extent} extent Extent.
 * @return {import("./coordinate.js").Coordinate} Bottom right coordinate.
 * @api
 */


function getBottomRight(extent) {
  return [extent[2], extent[1]];
}
/**
 * Get the center coordinate of an extent.
 * @param {Extent} extent Extent.
 * @return {import("./coordinate.js").Coordinate} Center.
 * @api
 */


function getCenter(extent) {
  return [(extent[0] + extent[2]) / 2, (extent[1] + extent[3]) / 2];
}
/**
 * Get a corner coordinate of an extent.
 * @param {Extent} extent Extent.
 * @param {import("./extent/Corner.js").default} corner Corner.
 * @return {import("./coordinate.js").Coordinate} Corner coordinate.
 */


function getCorner(extent, corner) {
  var coordinate;

  if (corner === _Corner.default.BOTTOM_LEFT) {
    coordinate = getBottomLeft(extent);
  } else if (corner === _Corner.default.BOTTOM_RIGHT) {
    coordinate = getBottomRight(extent);
  } else if (corner === _Corner.default.TOP_LEFT) {
    coordinate = getTopLeft(extent);
  } else if (corner === _Corner.default.TOP_RIGHT) {
    coordinate = getTopRight(extent);
  } else {
    (0, _asserts.assert)(false, 13); // Invalid corner
  }

  return coordinate;
}
/**
 * @param {Extent} extent1 Extent 1.
 * @param {Extent} extent2 Extent 2.
 * @return {number} Enlarged area.
 */


function getEnlargedArea(extent1, extent2) {
  var minX = Math.min(extent1[0], extent2[0]);
  var minY = Math.min(extent1[1], extent2[1]);
  var maxX = Math.max(extent1[2], extent2[2]);
  var maxY = Math.max(extent1[3], extent2[3]);
  return (maxX - minX) * (maxY - minY);
}
/**
 * @param {import("./coordinate.js").Coordinate} center Center.
 * @param {number} resolution Resolution.
 * @param {number} rotation Rotation.
 * @param {import("./size.js").Size} size Size.
 * @param {Extent=} opt_extent Destination extent.
 * @return {Extent} Extent.
 */


function getForViewAndSize(center, resolution, rotation, size, opt_extent) {
  var dx = resolution * size[0] / 2;
  var dy = resolution * size[1] / 2;
  var cosRotation = Math.cos(rotation);
  var sinRotation = Math.sin(rotation);
  var xCos = dx * cosRotation;
  var xSin = dx * sinRotation;
  var yCos = dy * cosRotation;
  var ySin = dy * sinRotation;
  var x = center[0];
  var y = center[1];
  var x0 = x - xCos + ySin;
  var x1 = x - xCos - ySin;
  var x2 = x + xCos - ySin;
  var x3 = x + xCos + ySin;
  var y0 = y - xSin - yCos;
  var y1 = y - xSin + yCos;
  var y2 = y + xSin + yCos;
  var y3 = y + xSin - yCos;
  return createOrUpdate(Math.min(x0, x1, x2, x3), Math.min(y0, y1, y2, y3), Math.max(x0, x1, x2, x3), Math.max(y0, y1, y2, y3), opt_extent);
}
/**
 * Get the height of an extent.
 * @param {Extent} extent Extent.
 * @return {number} Height.
 * @api
 */


function getHeight(extent) {
  return extent[3] - extent[1];
}
/**
 * @param {Extent} extent1 Extent 1.
 * @param {Extent} extent2 Extent 2.
 * @return {number} Intersection area.
 */


function getIntersectionArea(extent1, extent2) {
  var intersection = getIntersection(extent1, extent2);
  return getArea(intersection);
}
/**
 * Get the intersection of two extents.
 * @param {Extent} extent1 Extent 1.
 * @param {Extent} extent2 Extent 2.
 * @param {Extent=} opt_extent Optional extent to populate with intersection.
 * @return {Extent} Intersecting extent.
 * @api
 */


function getIntersection(extent1, extent2, opt_extent) {
  var intersection = opt_extent ? opt_extent : createEmpty();

  if (intersects(extent1, extent2)) {
    if (extent1[0] > extent2[0]) {
      intersection[0] = extent1[0];
    } else {
      intersection[0] = extent2[0];
    }

    if (extent1[1] > extent2[1]) {
      intersection[1] = extent1[1];
    } else {
      intersection[1] = extent2[1];
    }

    if (extent1[2] < extent2[2]) {
      intersection[2] = extent1[2];
    } else {
      intersection[2] = extent2[2];
    }

    if (extent1[3] < extent2[3]) {
      intersection[3] = extent1[3];
    } else {
      intersection[3] = extent2[3];
    }
  } else {
    createOrUpdateEmpty(intersection);
  }

  return intersection;
}
/**
 * @param {Extent} extent Extent.
 * @return {number} Margin.
 */


function getMargin(extent) {
  return getWidth(extent) + getHeight(extent);
}
/**
 * Get the size (width, height) of an extent.
 * @param {Extent} extent The extent.
 * @return {import("./size.js").Size} The extent size.
 * @api
 */


function getSize(extent) {
  return [extent[2] - extent[0], extent[3] - extent[1]];
}
/**
 * Get the top left coordinate of an extent.
 * @param {Extent} extent Extent.
 * @return {import("./coordinate.js").Coordinate} Top left coordinate.
 * @api
 */


function getTopLeft(extent) {
  return [extent[0], extent[3]];
}
/**
 * Get the top right coordinate of an extent.
 * @param {Extent} extent Extent.
 * @return {import("./coordinate.js").Coordinate} Top right coordinate.
 * @api
 */


function getTopRight(extent) {
  return [extent[2], extent[3]];
}
/**
 * Get the width of an extent.
 * @param {Extent} extent Extent.
 * @return {number} Width.
 * @api
 */


function getWidth(extent) {
  return extent[2] - extent[0];
}
/**
 * Determine if one extent intersects another.
 * @param {Extent} extent1 Extent 1.
 * @param {Extent} extent2 Extent.
 * @return {boolean} The two extents intersect.
 * @api
 */


function intersects(extent1, extent2) {
  return extent1[0] <= extent2[2] && extent1[2] >= extent2[0] && extent1[1] <= extent2[3] && extent1[3] >= extent2[1];
}
/**
 * Determine if an extent is empty.
 * @param {Extent} extent Extent.
 * @return {boolean} Is empty.
 * @api
 */


function isEmpty(extent) {
  return extent[2] < extent[0] || extent[3] < extent[1];
}
/**
 * @param {Extent} extent Extent.
 * @param {Extent=} opt_extent Extent.
 * @return {Extent} Extent.
 */


function returnOrUpdate(extent, opt_extent) {
  if (opt_extent) {
    opt_extent[0] = extent[0];
    opt_extent[1] = extent[1];
    opt_extent[2] = extent[2];
    opt_extent[3] = extent[3];
    return opt_extent;
  } else {
    return extent;
  }
}
/**
 * @param {Extent} extent Extent.
 * @param {number} value Value.
 */


function scaleFromCenter(extent, value) {
  var deltaX = (extent[2] - extent[0]) / 2 * (value - 1);
  var deltaY = (extent[3] - extent[1]) / 2 * (value - 1);
  extent[0] -= deltaX;
  extent[2] += deltaX;
  extent[1] -= deltaY;
  extent[3] += deltaY;
}
/**
 * Determine if the segment between two coordinates intersects (crosses,
 * touches, or is contained by) the provided extent.
 * @param {Extent} extent The extent.
 * @param {import("./coordinate.js").Coordinate} start Segment start coordinate.
 * @param {import("./coordinate.js").Coordinate} end Segment end coordinate.
 * @return {boolean} The segment intersects the extent.
 */


function intersectsSegment(extent, start, end) {
  var intersects = false;
  var startRel = coordinateRelationship(extent, start);
  var endRel = coordinateRelationship(extent, end);

  if (startRel === _Relationship.default.INTERSECTING || endRel === _Relationship.default.INTERSECTING) {
    intersects = true;
  } else {
    var minX = extent[0];
    var minY = extent[1];
    var maxX = extent[2];
    var maxY = extent[3];
    var startX = start[0];
    var startY = start[1];
    var endX = end[0];
    var endY = end[1];
    var slope = (endY - startY) / (endX - startX);
    var x = void 0,
        y = void 0;

    if (!!(endRel & _Relationship.default.ABOVE) && !(startRel & _Relationship.default.ABOVE)) {
      // potentially intersects top
      x = endX - (endY - maxY) / slope;
      intersects = x >= minX && x <= maxX;
    }

    if (!intersects && !!(endRel & _Relationship.default.RIGHT) && !(startRel & _Relationship.default.RIGHT)) {
      // potentially intersects right
      y = endY - (endX - maxX) * slope;
      intersects = y >= minY && y <= maxY;
    }

    if (!intersects && !!(endRel & _Relationship.default.BELOW) && !(startRel & _Relationship.default.BELOW)) {
      // potentially intersects bottom
      x = endX - (endY - minY) / slope;
      intersects = x >= minX && x <= maxX;
    }

    if (!intersects && !!(endRel & _Relationship.default.LEFT) && !(startRel & _Relationship.default.LEFT)) {
      // potentially intersects left
      y = endY - (endX - minX) * slope;
      intersects = y >= minY && y <= maxY;
    }
  }

  return intersects;
}
/**
 * Apply a transform function to the extent.
 * @param {Extent} extent Extent.
 * @param {import("./proj.js").TransformFunction} transformFn Transform function.
 * Called with `[minX, minY, maxX, maxY]` extent coordinates.
 * @param {Extent=} opt_extent Destination extent.
 * @param {number=} opt_stops Number of stops per side used for the transform.
 * By default only the corners are used.
 * @return {Extent} Extent.
 * @api
 */


function applyTransform(extent, transformFn, opt_extent, opt_stops) {
  var coordinates = [];

  if (opt_stops > 1) {
    var width = extent[2] - extent[0];
    var height = extent[3] - extent[1];

    for (var i = 0; i < opt_stops; ++i) {
      coordinates.push(extent[0] + width * i / opt_stops, extent[1], extent[2], extent[1] + height * i / opt_stops, extent[2] - width * i / opt_stops, extent[3], extent[0], extent[3] - height * i / opt_stops);
    }
  } else {
    coordinates = [extent[0], extent[1], extent[2], extent[1], extent[2], extent[3], extent[0], extent[3]];
  }

  transformFn(coordinates, coordinates, 2);
  var xs = [];
  var ys = [];

  for (var i = 0, l = coordinates.length; i < l; i += 2) {
    xs.push(coordinates[i]);
    ys.push(coordinates[i + 1]);
  }

  return _boundingExtentXYs(xs, ys, opt_extent);
}
/**
 * Modifies the provided extent in-place to be within the real world
 * extent.
 *
 * @param {Extent} extent Extent.
 * @param {import("./proj/Projection.js").default} projection Projection
 * @return {Extent} The extent within the real world extent.
 */


function wrapX(extent, projection) {
  var projectionExtent = projection.getExtent();
  var center = getCenter(extent);

  if (projection.canWrapX() && (center[0] < projectionExtent[0] || center[0] >= projectionExtent[2])) {
    var worldWidth = getWidth(projectionExtent);
    var worldsAway = Math.floor((center[0] - projectionExtent[0]) / worldWidth);
    var offset = worldsAway * worldWidth;
    extent[0] -= offset;
    extent[2] -= offset;
  }

  return extent;
}
},{"./extent/Corner.js":"node_modules/ol/extent/Corner.js","./extent/Relationship.js":"node_modules/ol/extent/Relationship.js","./asserts.js":"node_modules/ol/asserts.js"}],"node_modules/ol/Image.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.listenImage = listenImage;
exports.default = void 0;

var _EventType = _interopRequireDefault(require("./events/EventType.js"));

var _ImageBase = _interopRequireDefault(require("./ImageBase.js"));

var _ImageState = _interopRequireDefault(require("./ImageState.js"));

var _has = require("./has.js");

var _extent = require("./extent.js");

var _events = require("./events.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var __extends = void 0 && (void 0).__extends || function () {
  var extendStatics = function (d, b) {
    extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    };

    return extendStatics(d, b);
  };

  return function (d, b) {
    extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
/**
 * @module ol/Image
 */


/**
 * A function that takes an {@link module:ol/Image~Image} for the image and a
 * `{string}` for the src as arguments. It is supposed to make it so the
 * underlying image {@link module:ol/Image~Image#getImage} is assigned the
 * content specified by the src. If not specified, the default is
 *
 *     function(image, src) {
 *       image.getImage().src = src;
 *     }
 *
 * Providing a custom `imageLoadFunction` can be useful to load images with
 * post requests or - in general - through XHR requests, where the src of the
 * image element would be set to a data URI when the content is loaded.
 *
 * @typedef {function(ImageWrapper, string): void} LoadFunction
 * @api
 */
var ImageWrapper =
/** @class */
function (_super) {
  __extends(ImageWrapper, _super);
  /**
   * @param {import("./extent.js").Extent} extent Extent.
   * @param {number|undefined} resolution Resolution.
   * @param {number} pixelRatio Pixel ratio.
   * @param {string} src Image source URI.
   * @param {?string} crossOrigin Cross origin.
   * @param {LoadFunction} imageLoadFunction Image load function.
   */


  function ImageWrapper(extent, resolution, pixelRatio, src, crossOrigin, imageLoadFunction) {
    var _this = _super.call(this, extent, resolution, pixelRatio, _ImageState.default.IDLE) || this;
    /**
     * @private
     * @type {string}
     */


    _this.src_ = src;
    /**
     * @private
     * @type {HTMLCanvasElement|HTMLImageElement|HTMLVideoElement}
     */

    _this.image_ = new Image();

    if (crossOrigin !== null) {
      _this.image_.crossOrigin = crossOrigin;
    }
    /**
     * @private
     * @type {?function():void}
     */


    _this.unlisten_ = null;
    /**
     * @protected
     * @type {import("./ImageState.js").default}
     */

    _this.state = _ImageState.default.IDLE;
    /**
     * @private
     * @type {LoadFunction}
     */

    _this.imageLoadFunction_ = imageLoadFunction;
    return _this;
  }
  /**
   * @return {HTMLCanvasElement|HTMLImageElement|HTMLVideoElement} Image.
   * @api
   */


  ImageWrapper.prototype.getImage = function () {
    return this.image_;
  };
  /**
   * Tracks loading or read errors.
   *
   * @private
   */


  ImageWrapper.prototype.handleImageError_ = function () {
    this.state = _ImageState.default.ERROR;
    this.unlistenImage_();
    this.changed();
  };
  /**
   * Tracks successful image load.
   *
   * @private
   */


  ImageWrapper.prototype.handleImageLoad_ = function () {
    if (this.resolution === undefined) {
      this.resolution = (0, _extent.getHeight)(this.extent) / this.image_.height;
    }

    this.state = _ImageState.default.LOADED;
    this.unlistenImage_();
    this.changed();
  };
  /**
   * Load the image or retry if loading previously failed.
   * Loading is taken care of by the tile queue, and calling this method is
   * only needed for preloading or for reloading in case of an error.
   * @api
   */


  ImageWrapper.prototype.load = function () {
    if (this.state == _ImageState.default.IDLE || this.state == _ImageState.default.ERROR) {
      this.state = _ImageState.default.LOADING;
      this.changed();
      this.imageLoadFunction_(this, this.src_);
      this.unlisten_ = listenImage(this.image_, this.handleImageLoad_.bind(this), this.handleImageError_.bind(this));
    }
  };
  /**
   * @param {HTMLCanvasElement|HTMLImageElement|HTMLVideoElement} image Image.
   */


  ImageWrapper.prototype.setImage = function (image) {
    this.image_ = image;
  };
  /**
   * Discards event handlers which listen for load completion or errors.
   *
   * @private
   */


  ImageWrapper.prototype.unlistenImage_ = function () {
    if (this.unlisten_) {
      this.unlisten_();
      this.unlisten_ = null;
    }
  };

  return ImageWrapper;
}(_ImageBase.default);
/**
 * @param {HTMLCanvasElement|HTMLImageElement|HTMLVideoElement} image Image element.
 * @param {function():any} loadHandler Load callback function.
 * @param {function():any} errorHandler Error callback function.
 * @return {function():void} Callback to stop listening.
 */


function listenImage(image, loadHandler, errorHandler) {
  var img =
  /** @type {HTMLImageElement} */
  image;

  if (img.src && _has.IMAGE_DECODE) {
    var promise = img.decode();
    var listening_1 = true;

    var unlisten = function () {
      listening_1 = false;
    };

    promise.then(function () {
      if (listening_1) {
        loadHandler();
      }
    }).catch(function (error) {
      if (listening_1) {
        // FIXME: Unconditionally call errorHandler() when this bug is fixed upstream:
        //        https://bugs.webkit.org/show_bug.cgi?id=198527
        if (error.name === 'EncodingError' && error.message === 'Invalid image type.') {
          loadHandler();
        } else {
          errorHandler();
        }
      }
    });
    return unlisten;
  }

  var listenerKeys = [(0, _events.listenOnce)(img, _EventType.default.LOAD, loadHandler), (0, _events.listenOnce)(img, _EventType.default.ERROR, errorHandler)];
  return function unlisten() {
    listenerKeys.forEach(_events.unlistenByKey);
  };
}

var _default = ImageWrapper;
exports.default = _default;
},{"./events/EventType.js":"node_modules/ol/events/EventType.js","./ImageBase.js":"node_modules/ol/ImageBase.js","./ImageState.js":"node_modules/ol/ImageState.js","./has.js":"node_modules/ol/has.js","./extent.js":"node_modules/ol/extent.js","./events.js":"node_modules/ol/events.js"}],"node_modules/ol/style/IconImage.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.get = get;
exports.default = void 0;

var _Target = _interopRequireDefault(require("../events/Target.js"));

var _EventType = _interopRequireDefault(require("../events/EventType.js"));

var _ImageState = _interopRequireDefault(require("../ImageState.js"));

var _dom = require("../dom.js");

var _IconImageCache = require("./IconImageCache.js");

var _Image = require("../Image.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @module ol/style/IconImage
 */
var __extends = void 0 && (void 0).__extends || function () {
  var extendStatics = function (d, b) {
    extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    };

    return extendStatics(d, b);
  };

  return function (d, b) {
    extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

/**
 * @type {CanvasRenderingContext2D}
 */
var taintedTestContext = null;

var IconImage =
/** @class */
function (_super) {
  __extends(IconImage, _super);
  /**
   * @param {HTMLImageElement|HTMLCanvasElement} image Image.
   * @param {string|undefined} src Src.
   * @param {import("../size.js").Size} size Size.
   * @param {?string} crossOrigin Cross origin.
   * @param {import("../ImageState.js").default} imageState Image state.
   * @param {import("../color.js").Color} color Color.
   */


  function IconImage(image, src, size, crossOrigin, imageState, color) {
    var _this = _super.call(this) || this;
    /**
     * @private
     * @type {HTMLImageElement|HTMLCanvasElement}
     */


    _this.hitDetectionImage_ = null;
    /**
     * @private
     * @type {HTMLImageElement|HTMLCanvasElement}
     */

    _this.image_ = !image ? new Image() : image;

    if (crossOrigin !== null) {
      /** @type {HTMLImageElement} */
      _this.image_.crossOrigin = crossOrigin;
    }
    /**
     * @private
     * @type {Object<number, HTMLCanvasElement>}
     */


    _this.canvas_ = {};
    /**
     * @private
     * @type {import("../color.js").Color}
     */

    _this.color_ = color;
    /**
     * @private
     * @type {?function():void}
     */

    _this.unlisten_ = null;
    /**
     * @private
     * @type {import("../ImageState.js").default}
     */

    _this.imageState_ = imageState;
    /**
     * @private
     * @type {import("../size.js").Size}
     */

    _this.size_ = size;
    /**
     * @private
     * @type {string|undefined}
     */

    _this.src_ = src;
    /**
     * @private
     */

    _this.tainted_;
    return _this;
  }
  /**
   * @private
   * @return {boolean} The image canvas is tainted.
   */


  IconImage.prototype.isTainted_ = function () {
    if (this.tainted_ === undefined && this.imageState_ === _ImageState.default.LOADED) {
      if (!taintedTestContext) {
        taintedTestContext = (0, _dom.createCanvasContext2D)(1, 1);
      }

      taintedTestContext.drawImage(this.image_, 0, 0);

      try {
        taintedTestContext.getImageData(0, 0, 1, 1);
        this.tainted_ = false;
      } catch (e) {
        taintedTestContext = null;
        this.tainted_ = true;
      }
    }

    return this.tainted_ === true;
  };
  /**
   * @private
   */


  IconImage.prototype.dispatchChangeEvent_ = function () {
    this.dispatchEvent(_EventType.default.CHANGE);
  };
  /**
   * @private
   */


  IconImage.prototype.handleImageError_ = function () {
    this.imageState_ = _ImageState.default.ERROR;
    this.unlistenImage_();
    this.dispatchChangeEvent_();
  };
  /**
   * @private
   */


  IconImage.prototype.handleImageLoad_ = function () {
    this.imageState_ = _ImageState.default.LOADED;

    if (this.size_) {
      this.image_.width = this.size_[0];
      this.image_.height = this.size_[1];
    } else {
      this.size_ = [this.image_.width, this.image_.height];
    }

    this.unlistenImage_();
    this.dispatchChangeEvent_();
  };
  /**
   * @param {number} pixelRatio Pixel ratio.
   * @return {HTMLImageElement|HTMLCanvasElement} Image or Canvas element.
   */


  IconImage.prototype.getImage = function (pixelRatio) {
    this.replaceColor_(pixelRatio);
    return this.canvas_[pixelRatio] ? this.canvas_[pixelRatio] : this.image_;
  };
  /**
   * @param {number} pixelRatio Pixel ratio.
   * @return {number} Image or Canvas element.
   */


  IconImage.prototype.getPixelRatio = function (pixelRatio) {
    this.replaceColor_(pixelRatio);
    return this.canvas_[pixelRatio] ? pixelRatio : 1;
  };
  /**
   * @return {import("../ImageState.js").default} Image state.
   */


  IconImage.prototype.getImageState = function () {
    return this.imageState_;
  };
  /**
   * @return {HTMLImageElement|HTMLCanvasElement} Image element.
   */


  IconImage.prototype.getHitDetectionImage = function () {
    if (!this.hitDetectionImage_) {
      if (this.isTainted_()) {
        var width = this.size_[0];
        var height = this.size_[1];
        var context = (0, _dom.createCanvasContext2D)(width, height);
        context.fillRect(0, 0, width, height);
        this.hitDetectionImage_ = context.canvas;
      } else {
        this.hitDetectionImage_ = this.image_;
      }
    }

    return this.hitDetectionImage_;
  };
  /**
   * Get the size of the icon (in pixels).
   * @return {import("../size.js").Size} Image size.
   */


  IconImage.prototype.getSize = function () {
    return this.size_;
  };
  /**
   * @return {string|undefined} Image src.
   */


  IconImage.prototype.getSrc = function () {
    return this.src_;
  };
  /**
   * Load not yet loaded URI.
   */


  IconImage.prototype.load = function () {
    if (this.imageState_ == _ImageState.default.IDLE) {
      this.imageState_ = _ImageState.default.LOADING;

      try {
        /** @type {HTMLImageElement} */
        this.image_.src = this.src_;
      } catch (e) {
        this.handleImageError_();
      }

      this.unlisten_ = (0, _Image.listenImage)(this.image_, this.handleImageLoad_.bind(this), this.handleImageError_.bind(this));
    }
  };
  /**
   * @param {number} pixelRatio Pixel ratio.
   * @private
   */


  IconImage.prototype.replaceColor_ = function (pixelRatio) {
    if (!this.color_ || this.canvas_[pixelRatio]) {
      return;
    }

    var canvas = document.createElement('canvas');
    this.canvas_[pixelRatio] = canvas;
    canvas.width = Math.ceil(this.image_.width * pixelRatio);
    canvas.height = Math.ceil(this.image_.height * pixelRatio);
    var ctx = canvas.getContext('2d');
    ctx.scale(pixelRatio, pixelRatio);
    ctx.drawImage(this.image_, 0, 0);

    if (this.isTainted_()) {
      // If reading from the canvas throws a SecurityError the same effect can be
      // achieved with globalCompositeOperation.
      // This could be used as the default, but it is not fully supported by all
      // browsers. E. g. Internet Explorer 11 does not support the multiply
      // operation and the resulting image shape will be completelly filled with
      // the provided color.
      // So this is only used as a fallback. It is still better than having no icon
      // at all.
      var c = this.color_;
      ctx.globalCompositeOperation = 'multiply';
      ctx.fillStyle = 'rgb(' + c[0] + ',' + c[1] + ',' + c[2] + ')';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = 'destination-in';
      ctx.drawImage(this.image_, 0, 0);
      return;
    }

    var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    var data = imgData.data;
    var r = this.color_[0] / 255.0;
    var g = this.color_[1] / 255.0;
    var b = this.color_[2] / 255.0;

    for (var i = 0, ii = data.length; i < ii; i += 4) {
      data[i] *= r;
      data[i + 1] *= g;
      data[i + 2] *= b;
    }

    ctx.putImageData(imgData, 0, 0);
  };
  /**
   * Discards event handlers which listen for load completion or errors.
   *
   * @private
   */


  IconImage.prototype.unlistenImage_ = function () {
    if (this.unlisten_) {
      this.unlisten_();
      this.unlisten_ = null;
    }
  };

  return IconImage;
}(_Target.default);
/**
 * @param {HTMLImageElement|HTMLCanvasElement} image Image.
 * @param {string} src Src.
 * @param {import("../size.js").Size} size Size.
 * @param {?string} crossOrigin Cross origin.
 * @param {import("../ImageState.js").default} imageState Image state.
 * @param {import("../color.js").Color} color Color.
 * @return {IconImage} Icon image.
 */


function get(image, src, size, crossOrigin, imageState, color) {
  var iconImage = _IconImageCache.shared.get(src, crossOrigin, color);

  if (!iconImage) {
    iconImage = new IconImage(image, src, size, crossOrigin, imageState, color);

    _IconImageCache.shared.set(src, crossOrigin, color, iconImage);
  }

  return iconImage;
}

var _default = IconImage;
exports.default = _default;
},{"../events/Target.js":"node_modules/ol/events/Target.js","../events/EventType.js":"node_modules/ol/events/EventType.js","../ImageState.js":"node_modules/ol/ImageState.js","../dom.js":"node_modules/ol/dom.js","./IconImageCache.js":"node_modules/ol/style/IconImageCache.js","../Image.js":"node_modules/ol/Image.js"}],"node_modules/ol/style/Icon.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _EventType = _interopRequireDefault(require("../events/EventType.js"));

var _IconAnchorUnits = _interopRequireDefault(require("./IconAnchorUnits.js"));

var _IconOrigin = _interopRequireDefault(require("./IconOrigin.js"));

var _ImageState = _interopRequireDefault(require("../ImageState.js"));

var _Image = _interopRequireDefault(require("./Image.js"));

var _color = require("../color.js");

var _asserts = require("../asserts.js");

var _IconImage = require("./IconImage.js");

var _util = require("../util.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var __extends = void 0 && (void 0).__extends || function () {
  var extendStatics = function (d, b) {
    extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    };

    return extendStatics(d, b);
  };

  return function (d, b) {
    extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
/**
 * @module ol/style/Icon
 */


/**
 * @typedef {Object} Options
 * @property {Array<number>} [anchor=[0.5, 0.5]] Anchor. Default value is the icon center.
 * @property {import("./IconOrigin.js").default} [anchorOrigin='top-left'] Origin of the anchor: `bottom-left`, `bottom-right`,
 * `top-left` or `top-right`.
 * @property {import("./IconAnchorUnits.js").default} [anchorXUnits='fraction'] Units in which the anchor x value is
 * specified. A value of `'fraction'` indicates the x value is a fraction of the icon. A value of `'pixels'` indicates
 * the x value in pixels.
 * @property {import("./IconAnchorUnits.js").default} [anchorYUnits='fraction'] Units in which the anchor y value is
 * specified. A value of `'fraction'` indicates the y value is a fraction of the icon. A value of `'pixels'` indicates
 * the y value in pixels.
 * @property {import("../color.js").Color|string} [color] Color to tint the icon. If not specified,
 * the icon will be left as is.
 * @property {null|string} [crossOrigin] The `crossOrigin` attribute for loaded images. Note that you must provide a
 * `crossOrigin` value if you want to access pixel data with the Canvas renderer.
 * See https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image for more detail.
 * @property {HTMLImageElement|HTMLCanvasElement} [img] Image object for the icon. If the `src` option is not provided then the
 * provided image must already be loaded. And in that case, it is required
 * to provide the size of the image, with the `imgSize` option.
 * @property {Array<number>} [offset=[0, 0]] Offset, which, together with the size and the offset origin, define the
 * sub-rectangle to use from the original icon image.
 * @property {Array<number>} [displacement=[0,0]] Displacement the icon
 * @property {import("./IconOrigin.js").default} [offsetOrigin='top-left'] Origin of the offset: `bottom-left`, `bottom-right`,
 * `top-left` or `top-right`.
 * @property {number} [opacity=1] Opacity of the icon.
 * @property {number|import("../size.js").Size} [scale=1] Scale.
 * @property {boolean} [rotateWithView=false] Whether to rotate the icon with the view.
 * @property {number} [rotation=0] Rotation in radians (positive rotation clockwise).
 * @property {import("../size.js").Size} [size] Icon size in pixel. Can be used together with `offset` to define the
 * sub-rectangle to use from the origin (sprite) icon image.
 * @property {import("../size.js").Size} [imgSize] Image size in pixels. Only required if `img` is set and `src` is not, and
 * for SVG images in Internet Explorer 11. The provided `imgSize` needs to match the actual size of the image.
 * @property {string} [src] Image source URI.
 */

/**
 * @classdesc
 * Set icon style for vector features.
 * @api
 */
var Icon =
/** @class */
function (_super) {
  __extends(Icon, _super);
  /**
   * @param {Options=} opt_options Options.
   */


  function Icon(opt_options) {
    var _this = this;

    var options = opt_options || {};
    /**
     * @type {number}
     */

    var opacity = options.opacity !== undefined ? options.opacity : 1;
    /**
     * @type {number}
     */

    var rotation = options.rotation !== undefined ? options.rotation : 0;
    /**
     * @type {number|import("../size.js").Size}
     */

    var scale = options.scale !== undefined ? options.scale : 1;
    /**
     * @type {boolean}
     */

    var rotateWithView = options.rotateWithView !== undefined ? options.rotateWithView : false;
    _this = _super.call(this, {
      opacity: opacity,
      rotation: rotation,
      scale: scale,
      displacement: options.displacement !== undefined ? options.displacement : [0, 0],
      rotateWithView: rotateWithView
    }) || this;
    /**
     * @private
     * @type {Array<number>}
     */

    _this.anchor_ = options.anchor !== undefined ? options.anchor : [0.5, 0.5];
    /**
     * @private
     * @type {Array<number>}
     */

    _this.normalizedAnchor_ = null;
    /**
     * @private
     * @type {import("./IconOrigin.js").default}
     */

    _this.anchorOrigin_ = options.anchorOrigin !== undefined ? options.anchorOrigin : _IconOrigin.default.TOP_LEFT;
    /**
     * @private
     * @type {import("./IconAnchorUnits.js").default}
     */

    _this.anchorXUnits_ = options.anchorXUnits !== undefined ? options.anchorXUnits : _IconAnchorUnits.default.FRACTION;
    /**
     * @private
     * @type {import("./IconAnchorUnits.js").default}
     */

    _this.anchorYUnits_ = options.anchorYUnits !== undefined ? options.anchorYUnits : _IconAnchorUnits.default.FRACTION;
    /**
     * @private
     * @type {?string}
     */

    _this.crossOrigin_ = options.crossOrigin !== undefined ? options.crossOrigin : null;
    /**
     * @type {HTMLImageElement|HTMLCanvasElement}
     */

    var image = options.img !== undefined ? options.img : null;
    /**
     * @type {import("../size.js").Size}
     */

    var imgSize = options.imgSize !== undefined ? options.imgSize : null;
    /**
     * @type {string|undefined}
     */

    var src = options.src;
    (0, _asserts.assert)(!(src !== undefined && image), 4); // `image` and `src` cannot be provided at the same time

    (0, _asserts.assert)(!image || image && imgSize, 5); // `imgSize` must be set when `image` is provided

    if ((src === undefined || src.length === 0) && image) {
      src =
      /** @type {HTMLImageElement} */
      image.src || (0, _util.getUid)(image);
    }

    (0, _asserts.assert)(src !== undefined && src.length > 0, 6); // A defined and non-empty `src` or `image` must be provided

    /**
     * @type {import("../ImageState.js").default}
     */

    var imageState = options.src !== undefined ? _ImageState.default.IDLE : _ImageState.default.LOADED;
    /**
     * @private
     * @type {import("../color.js").Color}
     */

    _this.color_ = options.color !== undefined ? (0, _color.asArray)(options.color) : null;
    /**
     * @private
     * @type {import("./IconImage.js").default}
     */

    _this.iconImage_ = (0, _IconImage.get)(image,
    /** @type {string} */
    src, imgSize, _this.crossOrigin_, imageState, _this.color_);
    /**
     * @private
     * @type {Array<number>}
     */

    _this.offset_ = options.offset !== undefined ? options.offset : [0, 0];
    /**
     * @private
     * @type {import("./IconOrigin.js").default}
     */

    _this.offsetOrigin_ = options.offsetOrigin !== undefined ? options.offsetOrigin : _IconOrigin.default.TOP_LEFT;
    /**
     * @private
     * @type {Array<number>}
     */

    _this.origin_ = null;
    /**
     * @private
     * @type {import("../size.js").Size}
     */

    _this.size_ = options.size !== undefined ? options.size : null;
    return _this;
  }
  /**
   * Clones the style. The underlying Image/HTMLCanvasElement is not cloned.
   * @return {Icon} The cloned style.
   * @api
   */


  Icon.prototype.clone = function () {
    var scale = this.getScale();
    return new Icon({
      anchor: this.anchor_.slice(),
      anchorOrigin: this.anchorOrigin_,
      anchorXUnits: this.anchorXUnits_,
      anchorYUnits: this.anchorYUnits_,
      crossOrigin: this.crossOrigin_,
      color: this.color_ && this.color_.slice ? this.color_.slice() : this.color_ || undefined,
      src: this.getSrc(),
      offset: this.offset_.slice(),
      offsetOrigin: this.offsetOrigin_,
      size: this.size_ !== null ? this.size_.slice() : undefined,
      opacity: this.getOpacity(),
      scale: Array.isArray(scale) ? scale.slice() : scale,
      rotation: this.getRotation(),
      rotateWithView: this.getRotateWithView()
    });
  };
  /**
   * Get the anchor point in pixels. The anchor determines the center point for the
   * symbolizer.
   * @return {Array<number>} Anchor.
   * @api
   */


  Icon.prototype.getAnchor = function () {
    if (this.normalizedAnchor_) {
      return this.normalizedAnchor_;
    }

    var anchor = this.anchor_;
    var size = this.getSize();

    if (this.anchorXUnits_ == _IconAnchorUnits.default.FRACTION || this.anchorYUnits_ == _IconAnchorUnits.default.FRACTION) {
      if (!size) {
        return null;
      }

      anchor = this.anchor_.slice();

      if (this.anchorXUnits_ == _IconAnchorUnits.default.FRACTION) {
        anchor[0] *= size[0];
      }

      if (this.anchorYUnits_ == _IconAnchorUnits.default.FRACTION) {
        anchor[1] *= size[1];
      }
    }

    if (this.anchorOrigin_ != _IconOrigin.default.TOP_LEFT) {
      if (!size) {
        return null;
      }

      if (anchor === this.anchor_) {
        anchor = this.anchor_.slice();
      }

      if (this.anchorOrigin_ == _IconOrigin.default.TOP_RIGHT || this.anchorOrigin_ == _IconOrigin.default.BOTTOM_RIGHT) {
        anchor[0] = -anchor[0] + size[0];
      }

      if (this.anchorOrigin_ == _IconOrigin.default.BOTTOM_LEFT || this.anchorOrigin_ == _IconOrigin.default.BOTTOM_RIGHT) {
        anchor[1] = -anchor[1] + size[1];
      }
    }

    this.normalizedAnchor_ = anchor;
    return this.normalizedAnchor_;
  };
  /**
   * Set the anchor point. The anchor determines the center point for the
   * symbolizer.
   *
   * @param {Array<number>} anchor Anchor.
   * @api
   */


  Icon.prototype.setAnchor = function (anchor) {
    this.anchor_ = anchor;
    this.normalizedAnchor_ = null;
  };
  /**
   * Get the icon color.
   * @return {import("../color.js").Color} Color.
   * @api
   */


  Icon.prototype.getColor = function () {
    return this.color_;
  };
  /**
   * Get the image icon.
   * @param {number} pixelRatio Pixel ratio.
   * @return {HTMLImageElement|HTMLCanvasElement} Image or Canvas element.
   * @api
   */


  Icon.prototype.getImage = function (pixelRatio) {
    return this.iconImage_.getImage(pixelRatio);
  };
  /**
   * Get the pixel ratio.
   * @param {number} pixelRatio Pixel ratio.
   * @return {number} The pixel ration of the image.
   * @api
   */


  Icon.prototype.getPixelRatio = function (pixelRatio) {
    return this.iconImage_.getPixelRatio(pixelRatio);
  };
  /**
   * @return {import("../size.js").Size} Image size.
   */


  Icon.prototype.getImageSize = function () {
    return this.iconImage_.getSize();
  };
  /**
   * @return {import("../size.js").Size} Size of the hit-detection image.
   */


  Icon.prototype.getHitDetectionImageSize = function () {
    return this.getImageSize();
  };
  /**
   * @return {import("../ImageState.js").default} Image state.
   */


  Icon.prototype.getImageState = function () {
    return this.iconImage_.getImageState();
  };
  /**
   * @return {HTMLImageElement|HTMLCanvasElement} Image element.
   */


  Icon.prototype.getHitDetectionImage = function () {
    return this.iconImage_.getHitDetectionImage();
  };
  /**
   * Get the origin of the symbolizer.
   * @return {Array<number>} Origin.
   * @api
   */


  Icon.prototype.getOrigin = function () {
    if (this.origin_) {
      return this.origin_;
    }

    var offset = this.offset_;
    var displacement = this.getDisplacement();

    if (this.offsetOrigin_ != _IconOrigin.default.TOP_LEFT) {
      var size = this.getSize();
      var iconImageSize = this.iconImage_.getSize();

      if (!size || !iconImageSize) {
        return null;
      }

      offset = offset.slice();

      if (this.offsetOrigin_ == _IconOrigin.default.TOP_RIGHT || this.offsetOrigin_ == _IconOrigin.default.BOTTOM_RIGHT) {
        offset[0] = iconImageSize[0] - size[0] - offset[0];
      }

      if (this.offsetOrigin_ == _IconOrigin.default.BOTTOM_LEFT || this.offsetOrigin_ == _IconOrigin.default.BOTTOM_RIGHT) {
        offset[1] = iconImageSize[1] - size[1] - offset[1];
      }
    }

    offset[0] += displacement[0];
    offset[1] += displacement[1];
    this.origin_ = offset;
    return this.origin_;
  };
  /**
   * Get the image URL.
   * @return {string|undefined} Image src.
   * @api
   */


  Icon.prototype.getSrc = function () {
    return this.iconImage_.getSrc();
  };
  /**
   * Get the size of the icon (in pixels).
   * @return {import("../size.js").Size} Image size.
   * @api
   */


  Icon.prototype.getSize = function () {
    return !this.size_ ? this.iconImage_.getSize() : this.size_;
  };
  /**
   * @param {function(import("../events/Event.js").default): void} listener Listener function.
   */


  Icon.prototype.listenImageChange = function (listener) {
    this.iconImage_.addEventListener(_EventType.default.CHANGE, listener);
  };
  /**
   * Load not yet loaded URI.
   * When rendering a feature with an icon style, the vector renderer will
   * automatically call this method. However, you might want to call this
   * method yourself for preloading or other purposes.
   * @api
   */


  Icon.prototype.load = function () {
    this.iconImage_.load();
  };
  /**
   * @param {function(import("../events/Event.js").default): void} listener Listener function.
   */


  Icon.prototype.unlistenImageChange = function (listener) {
    this.iconImage_.removeEventListener(_EventType.default.CHANGE, listener);
  };

  return Icon;
}(_Image.default);

var _default = Icon;
exports.default = _default;
},{"../events/EventType.js":"node_modules/ol/events/EventType.js","./IconAnchorUnits.js":"node_modules/ol/style/IconAnchorUnits.js","./IconOrigin.js":"node_modules/ol/style/IconOrigin.js","../ImageState.js":"node_modules/ol/ImageState.js","./Image.js":"node_modules/ol/style/Image.js","../color.js":"node_modules/ol/color.js","../asserts.js":"node_modules/ol/asserts.js","./IconImage.js":"node_modules/ol/style/IconImage.js","../util.js":"node_modules/ol/util.js"}],"node_modules/ol/style/Stroke.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * @module ol/style/Stroke
 */

/**
 * @typedef {Object} Options
 * @property {import("../color.js").Color|import("../colorlike.js").ColorLike} [color] A color, gradient or pattern.
 * See {@link module:ol/color~Color} and {@link module:ol/colorlike~ColorLike} for possible formats.
 * Default null; if null, the Canvas/renderer default black will be used.
 * @property {CanvasLineCap} [lineCap='round'] Line cap style: `butt`, `round`, or `square`.
 * @property {CanvasLineJoin} [lineJoin='round'] Line join style: `bevel`, `round`, or `miter`.
 * @property {Array<number>} [lineDash] Line dash pattern. Default is `null` (no dash).
 * Please note that Internet Explorer 10 and lower do not support the `setLineDash` method on
 * the `CanvasRenderingContext2D` and therefore this option will have no visual effect in these browsers.
 * @property {number} [lineDashOffset=0] Line dash offset.
 * @property {number} [miterLimit=10] Miter limit.
 * @property {number} [width] Width.
 */

/**
 * @classdesc
 * Set stroke style for vector features.
 * Note that the defaults given are the Canvas defaults, which will be used if
 * option is not defined. The `get` functions return whatever was entered in
 * the options; they will not return the default.
 * @api
 */
var Stroke =
/** @class */
function () {
  /**
   * @param {Options=} opt_options Options.
   */
  function Stroke(opt_options) {
    var options = opt_options || {};
    /**
     * @private
     * @type {import("../color.js").Color|import("../colorlike.js").ColorLike}
     */

    this.color_ = options.color !== undefined ? options.color : null;
    /**
     * @private
     * @type {CanvasLineCap|undefined}
     */

    this.lineCap_ = options.lineCap;
    /**
     * @private
     * @type {Array<number>}
     */

    this.lineDash_ = options.lineDash !== undefined ? options.lineDash : null;
    /**
     * @private
     * @type {number|undefined}
     */

    this.lineDashOffset_ = options.lineDashOffset;
    /**
     * @private
     * @type {CanvasLineJoin|undefined}
     */

    this.lineJoin_ = options.lineJoin;
    /**
     * @private
     * @type {number|undefined}
     */

    this.miterLimit_ = options.miterLimit;
    /**
     * @private
     * @type {number|undefined}
     */

    this.width_ = options.width;
  }
  /**
   * Clones the style.
   * @return {Stroke} The cloned style.
   * @api
   */


  Stroke.prototype.clone = function () {
    var color = this.getColor();
    return new Stroke({
      color: Array.isArray(color) ? color.slice() : color || undefined,
      lineCap: this.getLineCap(),
      lineDash: this.getLineDash() ? this.getLineDash().slice() : undefined,
      lineDashOffset: this.getLineDashOffset(),
      lineJoin: this.getLineJoin(),
      miterLimit: this.getMiterLimit(),
      width: this.getWidth()
    });
  };
  /**
   * Get the stroke color.
   * @return {import("../color.js").Color|import("../colorlike.js").ColorLike} Color.
   * @api
   */


  Stroke.prototype.getColor = function () {
    return this.color_;
  };
  /**
   * Get the line cap type for the stroke.
   * @return {CanvasLineCap|undefined} Line cap.
   * @api
   */


  Stroke.prototype.getLineCap = function () {
    return this.lineCap_;
  };
  /**
   * Get the line dash style for the stroke.
   * @return {Array<number>} Line dash.
   * @api
   */


  Stroke.prototype.getLineDash = function () {
    return this.lineDash_;
  };
  /**
   * Get the line dash offset for the stroke.
   * @return {number|undefined} Line dash offset.
   * @api
   */


  Stroke.prototype.getLineDashOffset = function () {
    return this.lineDashOffset_;
  };
  /**
   * Get the line join type for the stroke.
   * @return {CanvasLineJoin|undefined} Line join.
   * @api
   */


  Stroke.prototype.getLineJoin = function () {
    return this.lineJoin_;
  };
  /**
   * Get the miter limit for the stroke.
   * @return {number|undefined} Miter limit.
   * @api
   */


  Stroke.prototype.getMiterLimit = function () {
    return this.miterLimit_;
  };
  /**
   * Get the stroke width.
   * @return {number|undefined} Width.
   * @api
   */


  Stroke.prototype.getWidth = function () {
    return this.width_;
  };
  /**
   * Set the color.
   *
   * @param {import("../color.js").Color|import("../colorlike.js").ColorLike} color Color.
   * @api
   */


  Stroke.prototype.setColor = function (color) {
    this.color_ = color;
  };
  /**
   * Set the line cap.
   *
   * @param {CanvasLineCap|undefined} lineCap Line cap.
   * @api
   */


  Stroke.prototype.setLineCap = function (lineCap) {
    this.lineCap_ = lineCap;
  };
  /**
   * Set the line dash.
   *
   * Please note that Internet Explorer 10 and lower [do not support][mdn] the
   * `setLineDash` method on the `CanvasRenderingContext2D` and therefore this
   * property will have no visual effect in these browsers.
   *
   * [mdn]: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/setLineDash#Browser_compatibility
   *
   * @param {Array<number>} lineDash Line dash.
   * @api
   */


  Stroke.prototype.setLineDash = function (lineDash) {
    this.lineDash_ = lineDash;
  };
  /**
   * Set the line dash offset.
   *
   * @param {number|undefined} lineDashOffset Line dash offset.
   * @api
   */


  Stroke.prototype.setLineDashOffset = function (lineDashOffset) {
    this.lineDashOffset_ = lineDashOffset;
  };
  /**
   * Set the line join.
   *
   * @param {CanvasLineJoin|undefined} lineJoin Line join.
   * @api
   */


  Stroke.prototype.setLineJoin = function (lineJoin) {
    this.lineJoin_ = lineJoin;
  };
  /**
   * Set the miter limit.
   *
   * @param {number|undefined} miterLimit Miter limit.
   * @api
   */


  Stroke.prototype.setMiterLimit = function (miterLimit) {
    this.miterLimit_ = miterLimit;
  };
  /**
   * Set the width.
   *
   * @param {number|undefined} width Width.
   * @api
   */


  Stroke.prototype.setWidth = function (width) {
    this.width_ = width;
  };

  return Stroke;
}();

var _default = Stroke;
exports.default = _default;
},{}],"node_modules/ol/geom/GeometryType.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * @module ol/geom/GeometryType
 */

/**
 * The geometry type. One of `'Point'`, `'LineString'`, `'LinearRing'`,
 * `'Polygon'`, `'MultiPoint'`, `'MultiLineString'`, `'MultiPolygon'`,
 * `'GeometryCollection'`, `'Circle'`.
 * @enum {string}
 */
var _default = {
  POINT: 'Point',
  LINE_STRING: 'LineString',
  LINEAR_RING: 'LinearRing',
  POLYGON: 'Polygon',
  MULTI_POINT: 'MultiPoint',
  MULTI_LINE_STRING: 'MultiLineString',
  MULTI_POLYGON: 'MultiPolygon',
  GEOMETRY_COLLECTION: 'GeometryCollection',
  CIRCLE: 'Circle'
};
exports.default = _default;
},{}],"node_modules/ol/style/Style.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toFunction = toFunction;
exports.createDefaultStyle = createDefaultStyle;
exports.createEditingStyle = createEditingStyle;
exports.default = void 0;

var _Circle = _interopRequireDefault(require("./Circle.js"));

var _Fill = _interopRequireDefault(require("./Fill.js"));

var _GeometryType = _interopRequireDefault(require("../geom/GeometryType.js"));

var _Stroke = _interopRequireDefault(require("./Stroke.js"));

var _asserts = require("../asserts.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @module ol/style/Style
 */

/**
 * A function that takes an {@link module:ol/Feature} and a `{number}`
 * representing the view's resolution. The function should return a
 * {@link module:ol/style/Style} or an array of them. This way e.g. a
 * vector layer can be styled. If the function returns `undefined`, the
 * feature will not be rendered.
 *
 * @typedef {function(import("../Feature.js").FeatureLike, number):(Style|Array<Style>|void)} StyleFunction
 */

/**
 * A {@link Style}, an array of {@link Style}, or a {@link StyleFunction}.
 * @typedef {Style|Array<Style>|StyleFunction} StyleLike
 */

/**
 * A function that takes an {@link module:ol/Feature} as argument and returns an
 * {@link module:ol/geom/Geometry} that will be rendered and styled for the feature.
 *
 * @typedef {function(import("../Feature.js").FeatureLike):
 *     (import("../geom/Geometry.js").default|import("../render/Feature.js").default|undefined)} GeometryFunction
 */

/**
 * Custom renderer function. Takes two arguments:
 *
 * 1. The pixel coordinates of the geometry in GeoJSON notation.
 * 2. The {@link module:ol/render~State} of the layer renderer.
 *
 * @typedef {function((import("../coordinate.js").Coordinate|Array<import("../coordinate.js").Coordinate>|Array<Array<import("../coordinate.js").Coordinate>>),import("../render.js").State): void}
 * RenderFunction
 */

/**
 * @typedef {Object} Options
 * @property {string|import("../geom/Geometry.js").default|GeometryFunction} [geometry] Feature property or geometry
 * or function returning a geometry to render for this style.
 * @property {import("./Fill.js").default} [fill] Fill style.
 * @property {import("./Image.js").default} [image] Image style.
 * @property {RenderFunction} [renderer] Custom renderer. When configured, `fill`, `stroke` and `image` will be
 * ignored, and the provided function will be called with each render frame for each geometry.
 * @property {import("./Stroke.js").default} [stroke] Stroke style.
 * @property {import("./Text.js").default} [text] Text style.
 * @property {number} [zIndex] Z index.
 */

/**
 * @classdesc
 * Container for vector feature rendering styles. Any changes made to the style
 * or its children through `set*()` methods will not take effect until the
 * feature or layer that uses the style is re-rendered.
 *
 * ## Feature styles
 *
 * If no style is defined, the following default style is used:
 * ```js
 *  import {Fill, Stroke, Circle, Style} from 'ol/style';
 *
 *  var fill = new Fill({
 *    color: 'rgba(255,255,255,0.4)'
 *  });
 *  var stroke = new Stroke({
 *    color: '#3399CC',
 *    width: 1.25
 *  });
 *  var styles = [
 *    new Style({
 *      image: new Circle({
 *        fill: fill,
 *        stroke: stroke,
 *        radius: 5
 *      }),
 *      fill: fill,
 *      stroke: stroke
 *    })
 *  ];
 * ```
 *
 * A separate editing style has the following defaults:
 * ```js
 *  import {Fill, Stroke, Circle, Style} from 'ol/style';
 *  import GeometryType from 'ol/geom/GeometryType';
 *
 *  var white = [255, 255, 255, 1];
 *  var blue = [0, 153, 255, 1];
 *  var width = 3;
 *  styles[GeometryType.POLYGON] = [
 *    new Style({
 *      fill: new Fill({
 *        color: [255, 255, 255, 0.5]
 *      })
 *    })
 *  ];
 *  styles[GeometryType.MULTI_POLYGON] =
 *      styles[GeometryType.POLYGON];
 *  styles[GeometryType.LINE_STRING] = [
 *    new Style({
 *      stroke: new Stroke({
 *        color: white,
 *        width: width + 2
 *      })
 *    }),
 *    new Style({
 *      stroke: new Stroke({
 *        color: blue,
 *        width: width
 *      })
 *    })
 *  ];
 *  styles[GeometryType.MULTI_LINE_STRING] =
 *      styles[GeometryType.LINE_STRING];
 *  styles[GeometryType.POINT] = [
 *    new Style({
 *      image: new Circle({
 *        radius: width * 2,
 *        fill: new Fill({
 *          color: blue
 *        }),
 *        stroke: new Stroke({
 *          color: white,
 *          width: width / 2
 *        })
 *      }),
 *      zIndex: Infinity
 *    })
 *  ];
 *  styles[GeometryType.MULTI_POINT] =
 *      styles[GeometryType.POINT];
 *  styles[GeometryType.GEOMETRY_COLLECTION] =
 *      styles[GeometryType.POLYGON].concat(
 *          styles[GeometryType.LINE_STRING],
 *          styles[GeometryType.POINT]
 *      );
 * ```
 *
 * @api
 */
var Style =
/** @class */
function () {
  /**
   * @param {Options=} opt_options Style options.
   */
  function Style(opt_options) {
    var options = opt_options || {};
    /**
     * @private
     * @type {string|import("../geom/Geometry.js").default|GeometryFunction}
     */

    this.geometry_ = null;
    /**
     * @private
     * @type {!GeometryFunction}
     */

    this.geometryFunction_ = defaultGeometryFunction;

    if (options.geometry !== undefined) {
      this.setGeometry(options.geometry);
    }
    /**
     * @private
     * @type {import("./Fill.js").default}
     */


    this.fill_ = options.fill !== undefined ? options.fill : null;
    /**
     * @private
     * @type {import("./Image.js").default}
     */

    this.image_ = options.image !== undefined ? options.image : null;
    /**
     * @private
     * @type {RenderFunction|null}
     */

    this.renderer_ = options.renderer !== undefined ? options.renderer : null;
    /**
     * @private
     * @type {import("./Stroke.js").default}
     */

    this.stroke_ = options.stroke !== undefined ? options.stroke : null;
    /**
     * @private
     * @type {import("./Text.js").default}
     */

    this.text_ = options.text !== undefined ? options.text : null;
    /**
     * @private
     * @type {number|undefined}
     */

    this.zIndex_ = options.zIndex;
  }
  /**
   * Clones the style.
   * @return {Style} The cloned style.
   * @api
   */


  Style.prototype.clone = function () {
    var geometry = this.getGeometry();

    if (geometry && typeof geometry === 'object') {
      geometry =
      /** @type {import("../geom/Geometry.js").default} */
      geometry.clone();
    }

    return new Style({
      geometry: geometry,
      fill: this.getFill() ? this.getFill().clone() : undefined,
      image: this.getImage() ? this.getImage().clone() : undefined,
      stroke: this.getStroke() ? this.getStroke().clone() : undefined,
      text: this.getText() ? this.getText().clone() : undefined,
      zIndex: this.getZIndex()
    });
  };
  /**
   * Get the custom renderer function that was configured with
   * {@link #setRenderer} or the `renderer` constructor option.
   * @return {RenderFunction|null} Custom renderer function.
   * @api
   */


  Style.prototype.getRenderer = function () {
    return this.renderer_;
  };
  /**
   * Sets a custom renderer function for this style. When set, `fill`, `stroke`
   * and `image` options of the style will be ignored.
   * @param {RenderFunction|null} renderer Custom renderer function.
   * @api
   */


  Style.prototype.setRenderer = function (renderer) {
    this.renderer_ = renderer;
  };
  /**
   * Get the geometry to be rendered.
   * @return {string|import("../geom/Geometry.js").default|GeometryFunction}
   * Feature property or geometry or function that returns the geometry that will
   * be rendered with this style.
   * @api
   */


  Style.prototype.getGeometry = function () {
    return this.geometry_;
  };
  /**
   * Get the function used to generate a geometry for rendering.
   * @return {!GeometryFunction} Function that is called with a feature
   * and returns the geometry to render instead of the feature's geometry.
   * @api
   */


  Style.prototype.getGeometryFunction = function () {
    return this.geometryFunction_;
  };
  /**
   * Get the fill style.
   * @return {import("./Fill.js").default} Fill style.
   * @api
   */


  Style.prototype.getFill = function () {
    return this.fill_;
  };
  /**
   * Set the fill style.
   * @param {import("./Fill.js").default} fill Fill style.
   * @api
   */


  Style.prototype.setFill = function (fill) {
    this.fill_ = fill;
  };
  /**
   * Get the image style.
   * @return {import("./Image.js").default} Image style.
   * @api
   */


  Style.prototype.getImage = function () {
    return this.image_;
  };
  /**
   * Set the image style.
   * @param {import("./Image.js").default} image Image style.
   * @api
   */


  Style.prototype.setImage = function (image) {
    this.image_ = image;
  };
  /**
   * Get the stroke style.
   * @return {import("./Stroke.js").default} Stroke style.
   * @api
   */


  Style.prototype.getStroke = function () {
    return this.stroke_;
  };
  /**
   * Set the stroke style.
   * @param {import("./Stroke.js").default} stroke Stroke style.
   * @api
   */


  Style.prototype.setStroke = function (stroke) {
    this.stroke_ = stroke;
  };
  /**
   * Get the text style.
   * @return {import("./Text.js").default} Text style.
   * @api
   */


  Style.prototype.getText = function () {
    return this.text_;
  };
  /**
   * Set the text style.
   * @param {import("./Text.js").default} text Text style.
   * @api
   */


  Style.prototype.setText = function (text) {
    this.text_ = text;
  };
  /**
   * Get the z-index for the style.
   * @return {number|undefined} ZIndex.
   * @api
   */


  Style.prototype.getZIndex = function () {
    return this.zIndex_;
  };
  /**
   * Set a geometry that is rendered instead of the feature's geometry.
   *
   * @param {string|import("../geom/Geometry.js").default|GeometryFunction} geometry
   *     Feature property or geometry or function returning a geometry to render
   *     for this style.
   * @api
   */


  Style.prototype.setGeometry = function (geometry) {
    if (typeof geometry === 'function') {
      this.geometryFunction_ = geometry;
    } else if (typeof geometry === 'string') {
      this.geometryFunction_ = function (feature) {
        return (
          /** @type {import("../geom/Geometry.js").default} */
          feature.get(geometry)
        );
      };
    } else if (!geometry) {
      this.geometryFunction_ = defaultGeometryFunction;
    } else if (geometry !== undefined) {
      this.geometryFunction_ = function () {
        return (
          /** @type {import("../geom/Geometry.js").default} */
          geometry
        );
      };
    }

    this.geometry_ = geometry;
  };
  /**
   * Set the z-index.
   *
   * @param {number|undefined} zIndex ZIndex.
   * @api
   */


  Style.prototype.setZIndex = function (zIndex) {
    this.zIndex_ = zIndex;
  };

  return Style;
}();
/**
 * Convert the provided object into a style function.  Functions passed through
 * unchanged.  Arrays of Style or single style objects wrapped in a
 * new style function.
 * @param {StyleFunction|Array<Style>|Style} obj
 *     A style function, a single style, or an array of styles.
 * @return {StyleFunction} A style function.
 */


function toFunction(obj) {
  var styleFunction;

  if (typeof obj === 'function') {
    styleFunction = obj;
  } else {
    /**
     * @type {Array<Style>}
     */
    var styles_1;

    if (Array.isArray(obj)) {
      styles_1 = obj;
    } else {
      (0, _asserts.assert)(typeof
      /** @type {?} */
      obj.getZIndex === 'function', 41); // Expected an `Style` or an array of `Style`

      var style =
      /** @type {Style} */
      obj;
      styles_1 = [style];
    }

    styleFunction = function () {
      return styles_1;
    };
  }

  return styleFunction;
}
/**
 * @type {Array<Style>}
 */


var defaultStyles = null;
/**
 * @param {import("../Feature.js").FeatureLike} feature Feature.
 * @param {number} resolution Resolution.
 * @return {Array<Style>} Style.
 */

function createDefaultStyle(feature, resolution) {
  // We don't use an immediately-invoked function
  // and a closure so we don't get an error at script evaluation time in
  // browsers that do not support Canvas. (import("./Circle.js").CircleStyle does
  // canvas.getContext('2d') at construction time, which will cause an.error
  // in such browsers.)
  if (!defaultStyles) {
    var fill = new _Fill.default({
      color: 'rgba(255,255,255,0.4)'
    });
    var stroke = new _Stroke.default({
      color: '#3399CC',
      width: 1.25
    });
    defaultStyles = [new Style({
      image: new _Circle.default({
        fill: fill,
        stroke: stroke,
        radius: 5
      }),
      fill: fill,
      stroke: stroke
    })];
  }

  return defaultStyles;
}
/**
 * Default styles for editing features.
 * @return {Object<import("../geom/GeometryType.js").default, Array<Style>>} Styles
 */


function createEditingStyle() {
  /** @type {Object<import("../geom/GeometryType.js").default, Array<Style>>} */
  var styles = {};
  var white = [255, 255, 255, 1];
  var blue = [0, 153, 255, 1];
  var width = 3;
  styles[_GeometryType.default.POLYGON] = [new Style({
    fill: new _Fill.default({
      color: [255, 255, 255, 0.5]
    })
  })];
  styles[_GeometryType.default.MULTI_POLYGON] = styles[_GeometryType.default.POLYGON];
  styles[_GeometryType.default.LINE_STRING] = [new Style({
    stroke: new _Stroke.default({
      color: white,
      width: width + 2
    })
  }), new Style({
    stroke: new _Stroke.default({
      color: blue,
      width: width
    })
  })];
  styles[_GeometryType.default.MULTI_LINE_STRING] = styles[_GeometryType.default.LINE_STRING];
  styles[_GeometryType.default.CIRCLE] = styles[_GeometryType.default.POLYGON].concat(styles[_GeometryType.default.LINE_STRING]);
  styles[_GeometryType.default.POINT] = [new Style({
    image: new _Circle.default({
      radius: width * 2,
      fill: new _Fill.default({
        color: blue
      }),
      stroke: new _Stroke.default({
        color: white,
        width: width / 2
      })
    }),
    zIndex: Infinity
  })];
  styles[_GeometryType.default.MULTI_POINT] = styles[_GeometryType.default.POINT];
  styles[_GeometryType.default.GEOMETRY_COLLECTION] = styles[_GeometryType.default.POLYGON].concat(styles[_GeometryType.default.LINE_STRING], styles[_GeometryType.default.POINT]);
  return styles;
}
/**
 * Function that is called with a feature and returns its default geometry.
 * @param {import("../Feature.js").FeatureLike} feature Feature to get the geometry for.
 * @return {import("../geom/Geometry.js").default|import("../render/Feature.js").default|undefined} Geometry to render.
 */


function defaultGeometryFunction(feature) {
  return feature.getGeometry();
}

var _default = Style;
exports.default = _default;
},{"./Circle.js":"node_modules/ol/style/Circle.js","./Fill.js":"node_modules/ol/style/Fill.js","../geom/GeometryType.js":"node_modules/ol/geom/GeometryType.js","./Stroke.js":"node_modules/ol/style/Stroke.js","../asserts.js":"node_modules/ol/asserts.js"}],"node_modules/ol/style/TextPlacement.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * @module ol/style/TextPlacement
 */

/**
 * Text placement. One of `'point'`, `'line'`. Default is `'point'`. Note that
 * `'line'` requires the underlying geometry to be a {@link module:ol/geom/LineString~LineString},
 * {@link module:ol/geom/Polygon~Polygon}, {@link module:ol/geom/MultiLineString~MultiLineString} or
 * {@link module:ol/geom/MultiPolygon~MultiPolygon}.
 * @enum {string}
 */
var _default = {
  POINT: 'point',
  LINE: 'line'
};
exports.default = _default;
},{}],"node_modules/ol/style/Text.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Fill = _interopRequireDefault(require("./Fill.js"));

var _TextPlacement = _interopRequireDefault(require("./TextPlacement.js"));

var _size = require("../size.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @module ol/style/Text
 */

/**
 * The default fill color to use if no fill was set at construction time; a
 * blackish `#333`.
 *
 * @const {string}
 */
var DEFAULT_FILL_COLOR = '#333';
/**
 * @typedef {Object} Options
 * @property {string} [font] Font style as CSS 'font' value, see:
 * https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/font. Default is '10px sans-serif'
 * @property {number} [maxAngle=Math.PI/4] When `placement` is set to `'line'`, allow a maximum angle between adjacent characters.
 * The expected value is in radians, and the default is 45° (`Math.PI / 4`).
 * @property {number} [offsetX=0] Horizontal text offset in pixels. A positive will shift the text right.
 * @property {number} [offsetY=0] Vertical text offset in pixels. A positive will shift the text down.
 * @property {boolean} [overflow=false] For polygon labels or when `placement` is set to `'line'`, allow text to exceed
 * the width of the polygon at the label position or the length of the path that it follows.
 * @property {import("./TextPlacement.js").default|string} [placement='point'] Text placement.
 * @property {number|import("../size.js").Size} [scale] Scale.
 * @property {boolean} [rotateWithView=false] Whether to rotate the text with the view.
 * @property {number} [rotation=0] Rotation in radians (positive rotation clockwise).
 * @property {string} [text] Text content.
 * @property {string} [textAlign] Text alignment. Possible values: 'left', 'right', 'center', 'end' or 'start'.
 * Default is 'center' for `placement: 'point'`. For `placement: 'line'`, the default is to let the renderer choose a
 * placement where `maxAngle` is not exceeded.
 * @property {string} [textBaseline='middle'] Text base line. Possible values: 'bottom', 'top', 'middle', 'alphabetic',
 * 'hanging', 'ideographic'.
 * @property {import("./Fill.js").default} [fill] Fill style. If none is provided, we'll use a dark fill-style (#333).
 * @property {import("./Stroke.js").default} [stroke] Stroke style.
 * @property {import("./Fill.js").default} [backgroundFill] Fill style for the text background when `placement` is
 * `'point'`. Default is no fill.
 * @property {import("./Stroke.js").default} [backgroundStroke] Stroke style for the text background  when `placement`
 * is `'point'`. Default is no stroke.
 * @property {Array<number>} [padding=[0, 0, 0, 0]] Padding in pixels around the text for decluttering and background. The order of
 * values in the array is `[top, right, bottom, left]`.
 */

/**
 * @classdesc
 * Set text style for vector features.
 * @api
 */

var Text =
/** @class */
function () {
  /**
   * @param {Options=} opt_options Options.
   */
  function Text(opt_options) {
    var options = opt_options || {};
    /**
     * @private
     * @type {string|undefined}
     */

    this.font_ = options.font;
    /**
     * @private
     * @type {number|undefined}
     */

    this.rotation_ = options.rotation;
    /**
     * @private
     * @type {boolean|undefined}
     */

    this.rotateWithView_ = options.rotateWithView;
    /**
     * @private
     * @type {number|import("../size.js").Size|undefined}
     */

    this.scale_ = options.scale;
    /**
     * @private
     * @type {import("../size.js").Size}
     */

    this.scaleArray_ = (0, _size.toSize)(options.scale !== undefined ? options.scale : 1);
    /**
     * @private
     * @type {string|undefined}
     */

    this.text_ = options.text;
    /**
     * @private
     * @type {string|undefined}
     */

    this.textAlign_ = options.textAlign;
    /**
     * @private
     * @type {string|undefined}
     */

    this.textBaseline_ = options.textBaseline;
    /**
     * @private
     * @type {import("./Fill.js").default}
     */

    this.fill_ = options.fill !== undefined ? options.fill : new _Fill.default({
      color: DEFAULT_FILL_COLOR
    });
    /**
     * @private
     * @type {number}
     */

    this.maxAngle_ = options.maxAngle !== undefined ? options.maxAngle : Math.PI / 4;
    /**
     * @private
     * @type {import("./TextPlacement.js").default|string}
     */

    this.placement_ = options.placement !== undefined ? options.placement : _TextPlacement.default.POINT;
    /**
     * @private
     * @type {boolean}
     */

    this.overflow_ = !!options.overflow;
    /**
     * @private
     * @type {import("./Stroke.js").default}
     */

    this.stroke_ = options.stroke !== undefined ? options.stroke : null;
    /**
     * @private
     * @type {number}
     */

    this.offsetX_ = options.offsetX !== undefined ? options.offsetX : 0;
    /**
     * @private
     * @type {number}
     */

    this.offsetY_ = options.offsetY !== undefined ? options.offsetY : 0;
    /**
     * @private
     * @type {import("./Fill.js").default}
     */

    this.backgroundFill_ = options.backgroundFill ? options.backgroundFill : null;
    /**
     * @private
     * @type {import("./Stroke.js").default}
     */

    this.backgroundStroke_ = options.backgroundStroke ? options.backgroundStroke : null;
    /**
     * @private
     * @type {Array<number>}
     */

    this.padding_ = options.padding === undefined ? null : options.padding;
  }
  /**
   * Clones the style.
   * @return {Text} The cloned style.
   * @api
   */


  Text.prototype.clone = function () {
    var scale = this.getScale();
    return new Text({
      font: this.getFont(),
      placement: this.getPlacement(),
      maxAngle: this.getMaxAngle(),
      overflow: this.getOverflow(),
      rotation: this.getRotation(),
      rotateWithView: this.getRotateWithView(),
      scale: Array.isArray(scale) ? scale.slice() : scale,
      text: this.getText(),
      textAlign: this.getTextAlign(),
      textBaseline: this.getTextBaseline(),
      fill: this.getFill() ? this.getFill().clone() : undefined,
      stroke: this.getStroke() ? this.getStroke().clone() : undefined,
      offsetX: this.getOffsetX(),
      offsetY: this.getOffsetY(),
      backgroundFill: this.getBackgroundFill() ? this.getBackgroundFill().clone() : undefined,
      backgroundStroke: this.getBackgroundStroke() ? this.getBackgroundStroke().clone() : undefined,
      padding: this.getPadding()
    });
  };
  /**
   * Get the `overflow` configuration.
   * @return {boolean} Let text overflow the length of the path they follow.
   * @api
   */


  Text.prototype.getOverflow = function () {
    return this.overflow_;
  };
  /**
   * Get the font name.
   * @return {string|undefined} Font.
   * @api
   */


  Text.prototype.getFont = function () {
    return this.font_;
  };
  /**
   * Get the maximum angle between adjacent characters.
   * @return {number} Angle in radians.
   * @api
   */


  Text.prototype.getMaxAngle = function () {
    return this.maxAngle_;
  };
  /**
   * Get the label placement.
   * @return {import("./TextPlacement.js").default|string} Text placement.
   * @api
   */


  Text.prototype.getPlacement = function () {
    return this.placement_;
  };
  /**
   * Get the x-offset for the text.
   * @return {number} Horizontal text offset.
   * @api
   */


  Text.prototype.getOffsetX = function () {
    return this.offsetX_;
  };
  /**
   * Get the y-offset for the text.
   * @return {number} Vertical text offset.
   * @api
   */


  Text.prototype.getOffsetY = function () {
    return this.offsetY_;
  };
  /**
   * Get the fill style for the text.
   * @return {import("./Fill.js").default} Fill style.
   * @api
   */


  Text.prototype.getFill = function () {
    return this.fill_;
  };
  /**
   * Determine whether the text rotates with the map.
   * @return {boolean|undefined} Rotate with map.
   * @api
   */


  Text.prototype.getRotateWithView = function () {
    return this.rotateWithView_;
  };
  /**
   * Get the text rotation.
   * @return {number|undefined} Rotation.
   * @api
   */


  Text.prototype.getRotation = function () {
    return this.rotation_;
  };
  /**
   * Get the text scale.
   * @return {number|import("../size.js").Size|undefined} Scale.
   * @api
   */


  Text.prototype.getScale = function () {
    return this.scale_;
  };
  /**
   * Get the symbolizer scale array.
   * @return {import("../size.js").Size} Scale array.
   */


  Text.prototype.getScaleArray = function () {
    return this.scaleArray_;
  };
  /**
   * Get the stroke style for the text.
   * @return {import("./Stroke.js").default} Stroke style.
   * @api
   */


  Text.prototype.getStroke = function () {
    return this.stroke_;
  };
  /**
   * Get the text to be rendered.
   * @return {string|undefined} Text.
   * @api
   */


  Text.prototype.getText = function () {
    return this.text_;
  };
  /**
   * Get the text alignment.
   * @return {string|undefined} Text align.
   * @api
   */


  Text.prototype.getTextAlign = function () {
    return this.textAlign_;
  };
  /**
   * Get the text baseline.
   * @return {string|undefined} Text baseline.
   * @api
   */


  Text.prototype.getTextBaseline = function () {
    return this.textBaseline_;
  };
  /**
   * Get the background fill style for the text.
   * @return {import("./Fill.js").default} Fill style.
   * @api
   */


  Text.prototype.getBackgroundFill = function () {
    return this.backgroundFill_;
  };
  /**
   * Get the background stroke style for the text.
   * @return {import("./Stroke.js").default} Stroke style.
   * @api
   */


  Text.prototype.getBackgroundStroke = function () {
    return this.backgroundStroke_;
  };
  /**
   * Get the padding for the text.
   * @return {Array<number>} Padding.
   * @api
   */


  Text.prototype.getPadding = function () {
    return this.padding_;
  };
  /**
   * Set the `overflow` property.
   *
   * @param {boolean} overflow Let text overflow the path that it follows.
   * @api
   */


  Text.prototype.setOverflow = function (overflow) {
    this.overflow_ = overflow;
  };
  /**
   * Set the font.
   *
   * @param {string|undefined} font Font.
   * @api
   */


  Text.prototype.setFont = function (font) {
    this.font_ = font;
  };
  /**
   * Set the maximum angle between adjacent characters.
   *
   * @param {number} maxAngle Angle in radians.
   * @api
   */


  Text.prototype.setMaxAngle = function (maxAngle) {
    this.maxAngle_ = maxAngle;
  };
  /**
   * Set the x offset.
   *
   * @param {number} offsetX Horizontal text offset.
   * @api
   */


  Text.prototype.setOffsetX = function (offsetX) {
    this.offsetX_ = offsetX;
  };
  /**
   * Set the y offset.
   *
   * @param {number} offsetY Vertical text offset.
   * @api
   */


  Text.prototype.setOffsetY = function (offsetY) {
    this.offsetY_ = offsetY;
  };
  /**
   * Set the text placement.
   *
   * @param {import("./TextPlacement.js").default|string} placement Placement.
   * @api
   */


  Text.prototype.setPlacement = function (placement) {
    this.placement_ = placement;
  };
  /**
   * Set whether to rotate the text with the view.
   *
   * @param {boolean} rotateWithView Rotate with map.
   * @api
   */


  Text.prototype.setRotateWithView = function (rotateWithView) {
    this.rotateWithView_ = rotateWithView;
  };
  /**
   * Set the fill.
   *
   * @param {import("./Fill.js").default} fill Fill style.
   * @api
   */


  Text.prototype.setFill = function (fill) {
    this.fill_ = fill;
  };
  /**
   * Set the rotation.
   *
   * @param {number|undefined} rotation Rotation.
   * @api
   */


  Text.prototype.setRotation = function (rotation) {
    this.rotation_ = rotation;
  };
  /**
   * Set the scale.
   *
   * @param {number|import("../size.js").Size|undefined} scale Scale.
   * @api
   */


  Text.prototype.setScale = function (scale) {
    this.scale_ = scale;
    this.scaleArray_ = (0, _size.toSize)(scale !== undefined ? scale : 1);
  };
  /**
   * Set the stroke.
   *
   * @param {import("./Stroke.js").default} stroke Stroke style.
   * @api
   */


  Text.prototype.setStroke = function (stroke) {
    this.stroke_ = stroke;
  };
  /**
   * Set the text.
   *
   * @param {string|undefined} text Text.
   * @api
   */


  Text.prototype.setText = function (text) {
    this.text_ = text;
  };
  /**
   * Set the text alignment.
   *
   * @param {string|undefined} textAlign Text align.
   * @api
   */


  Text.prototype.setTextAlign = function (textAlign) {
    this.textAlign_ = textAlign;
  };
  /**
   * Set the text baseline.
   *
   * @param {string|undefined} textBaseline Text baseline.
   * @api
   */


  Text.prototype.setTextBaseline = function (textBaseline) {
    this.textBaseline_ = textBaseline;
  };
  /**
   * Set the background fill.
   *
   * @param {import("./Fill.js").default} fill Fill style.
   * @api
   */


  Text.prototype.setBackgroundFill = function (fill) {
    this.backgroundFill_ = fill;
  };
  /**
   * Set the background stroke.
   *
   * @param {import("./Stroke.js").default} stroke Stroke style.
   * @api
   */


  Text.prototype.setBackgroundStroke = function (stroke) {
    this.backgroundStroke_ = stroke;
  };
  /**
   * Set the padding (`[top, right, bottom, left]`).
   *
   * @param {!Array<number>} padding Padding.
   * @api
   */


  Text.prototype.setPadding = function (padding) {
    this.padding_ = padding;
  };

  return Text;
}();

var _default = Text;
exports.default = _default;
},{"./Fill.js":"node_modules/ol/style/Fill.js","./TextPlacement.js":"node_modules/ol/style/TextPlacement.js","../size.js":"node_modules/ol/size.js"}],"node_modules/ol/style.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Circle", {
  enumerable: true,
  get: function () {
    return _Circle.default;
  }
});
Object.defineProperty(exports, "Fill", {
  enumerable: true,
  get: function () {
    return _Fill.default;
  }
});
Object.defineProperty(exports, "Icon", {
  enumerable: true,
  get: function () {
    return _Icon.default;
  }
});
Object.defineProperty(exports, "IconImage", {
  enumerable: true,
  get: function () {
    return _IconImage.default;
  }
});
Object.defineProperty(exports, "Image", {
  enumerable: true,
  get: function () {
    return _Image.default;
  }
});
Object.defineProperty(exports, "RegularShape", {
  enumerable: true,
  get: function () {
    return _RegularShape.default;
  }
});
Object.defineProperty(exports, "Stroke", {
  enumerable: true,
  get: function () {
    return _Stroke.default;
  }
});
Object.defineProperty(exports, "Style", {
  enumerable: true,
  get: function () {
    return _Style.default;
  }
});
Object.defineProperty(exports, "Text", {
  enumerable: true,
  get: function () {
    return _Text.default;
  }
});

var _Circle = _interopRequireDefault(require("./style/Circle.js"));

var _Fill = _interopRequireDefault(require("./style/Fill.js"));

var _Icon = _interopRequireDefault(require("./style/Icon.js"));

var _IconImage = _interopRequireDefault(require("./style/IconImage.js"));

var _Image = _interopRequireDefault(require("./style/Image.js"));

var _RegularShape = _interopRequireDefault(require("./style/RegularShape.js"));

var _Stroke = _interopRequireDefault(require("./style/Stroke.js"));

var _Style = _interopRequireDefault(require("./style/Style.js"));

var _Text = _interopRequireDefault(require("./style/Text.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
},{"./style/Circle.js":"node_modules/ol/style/Circle.js","./style/Fill.js":"node_modules/ol/style/Fill.js","./style/Icon.js":"node_modules/ol/style/Icon.js","./style/IconImage.js":"node_modules/ol/style/IconImage.js","./style/Image.js":"node_modules/ol/style/Image.js","./style/RegularShape.js":"node_modules/ol/style/RegularShape.js","./style/Stroke.js":"node_modules/ol/style/Stroke.js","./style/Style.js":"node_modules/ol/style/Style.js","./style/Text.js":"node_modules/ol/style/Text.js"}],"styles.js":[function(require,module,exports) {
"use strict";

var _style = require("ol/style");

//======= Styles
var styleSalles = new _style.Style({
  stroke: new _style.Stroke({
    color: 'blue',
    width: 1
  }),
  fill: new _style.Fill({
    color: 'rgba(0, 0, 255, 0.1)'
  })
});
var stylePortes = new _style.Style({
  stroke: new _style.Stroke({
    color: 'blue',
    lineDash: [4],
    width: 3
  })
});
var styleSalles2 = new _style.Style({
  stroke: new _style.Stroke({
    color: 'green',
    width: 2
  }),
  fill: new _style.Fill({
    color: 'rgba(0, 0, 255, 0.1)'
  })
});
var stylePortes2 = new _style.Style({
  stroke: new _style.Stroke({
    color: 'green',
    lineDash: [4],
    width: 3
  }),
  fill: new _style.Fill({
    color: 'rgba(0, 0, 255, 0.1)'
  })
});
var styleEscaliers = new _style.Style({
  stroke: new _style.Stroke({
    color: 'brown',
    lineDash: [4],
    width: 2
  }),
  fill: new _style.Fill({
    color: 'rgba(0, 0, 255, 0.1)'
  })
});
var stylePoint = new _style.Style({
  image: new _style.Circle({
    radius: 5,
    fill: new _style.Fill({
      color: 'red'
    }),
    stroke: new _style.Stroke({
      color: 'red',
      width: 1
    })
  })
});
var stylePath = new _style.Style({
  stroke: new _style.Stroke({
    color: 'red',
    lineDash: [4],
    width: 2
  }),
  fill: new _style.Fill({
    color: 'rgba(0, 0, 255, 0.1)'
  })
});

function getStyleLayerById(idLayer) {
  switch (idLayer) {
    case "salles":
      return styleSalles;

    case "portes":
      return stylePortes;

    case "escaliers":
      return styleEscaliers;

    case "position":
      return stylePoint;

    case "path":
      return stylePath;
  }
}
},{"ol/style":"node_modules/ol/style.js"}],"../../../../../../AppData/Roaming/npm-cache/_npx/15648/node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "58944" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../../../AppData/Roaming/npm-cache/_npx/15648/node_modules/parcel/src/builtins/hmr-runtime.js","styles.js"], null)
//# sourceMappingURL=/styles.3aa8913d.js.map