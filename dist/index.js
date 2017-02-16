/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Emitter = function () {
    function Emitter() {
        _classCallCheck(this, Emitter);

        this.functions = {};
    }

    _createClass(Emitter, [{
        key: "on",
        value: function on(eventName, func) {
            this.functions[eventName] = this.functions[eventName] || [];
            this.functions[eventName].push(func);
        }
    }, {
        key: "emit",
        value: function emit(eventName, param) {
            var funcArr = this.functions[eventName] || [];
            funcArr.forEach(function (func) {
                return func(param);
            });
        }
    }]);

    return Emitter;
}();

exports.default = Emitter;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ElWatcher = __webpack_require__(3);

var _ElWatcher2 = _interopRequireDefault(_ElWatcher);

var _ElVisible = __webpack_require__(2);

var _ElVisible2 = _interopRequireDefault(_ElVisible);

var _Emitter2 = __webpack_require__(0);

var _Emitter3 = _interopRequireDefault(_Emitter2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Pup = function (_Emitter) {
    _inherits(Pup, _Emitter);

    function Pup(start) {
        _classCallCheck(this, Pup);

        var _this = _possibleConstructorReturn(this, (Pup.__proto__ || Object.getPrototypeOf(Pup)).call(this));

        _this.nodeWatcher = new _ElWatcher2.default();
        _this.visWatcher = new _ElVisible2.default(0.01);
        _this.visWatcher.on('changeDetected', function (change) {
            return _this.handleVisChange(change);
        });
        _this.nodeWatcher.on('elAdded', function (el) {
            return _this.handleNodeAdded(el);
        });
        if (start) {
            _this.start();
        }
        _this.total = 0;
        _this.lastAreaPercent = 0;
        return _this;
    }

    _createClass(Pup, [{
        key: 'enableTracking',
        value: function enableTracking(target) {
            Object.defineProperty(target, 'pupTracking', {
                enumerable: false,
                value: { states: [] }
            });
        }
    }, {
        key: 'handleVisChange',
        value: function handleVisChange(change) {
            var newChange = {};
            var target = change.target;
            newChange.ratio = change.intersectionRatio;
            newChange.time = this.visWatcher.createdAt + change.time;
            newChange.area = change.intersectionRect.height * change.intersectionRect.width;
            if (!target.pupTracking) {
                this.enableTracking(target);
            }
            target.pupTracking.states.push(newChange);

            var state = target.pupTracking.states;
            var length = state.length;

            if (length > 1) {
                var delta = state[length - 1].area - state[length - 2].area;
                target.pupTracking.total += delta;
                if (target.pupTracking.total != 0) {
                    state[length - 1].percentChange = 100 * (delta / target.pupTracking.total);
                }
            } else {
                //First state instance
                state[length - 1].percentChange = 0;
                target.pupTracking.total = 0;
            }
            console.log(target.pupTracking);
        }
    }, {
        key: 'handleNodeAdded',
        value: function handleNodeAdded(el) {
            this.visWatcher.watch(el);
        }
    }, {
        key: 'start',
        value: function start() {
            this.visWatcher.watchCurrent();
            this.nodeWatcher.start();
        }
    }]);

    return Pup;
}(_Emitter3.default);

exports.default = Pup;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Emitter2 = __webpack_require__(0);

var _Emitter3 = _interopRequireDefault(_Emitter2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ElVisible = function (_Emitter) {
    _inherits(ElVisible, _Emitter);

    function ElVisible() {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        _classCallCheck(this, ElVisible);

        var _this = _possibleConstructorReturn(this, (ElVisible.__proto__ || Object.getPrototypeOf(ElVisible)).call(this));

        _this.intersectionObs = new IntersectionObserver(function (changes) {
            return changes.forEach(function (change) {
                return _this.emit('changeDetected', change);
            });
        }, { threshold: args });
        _this.createdAt = Date.now();
        return _this;
    }

    _createClass(ElVisible, [{
        key: 'watch',
        value: function watch(el) {
            this.intersectionObs.observe(el);
        }
    }, {
        key: 'watchCurrent',
        value: function watchCurrent() {
            var currentElements = document.body.getElementsByTagName('*');
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = currentElements[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var el = _step.value;

                    this.watch(el);
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
        }
    }]);

    return ElVisible;
}(_Emitter3.default);

exports.default = ElVisible;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Emitter2 = __webpack_require__(0);

var _Emitter3 = _interopRequireDefault(_Emitter2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ElWatcher = function (_Emitter) {
    _inherits(ElWatcher, _Emitter);

    function ElWatcher() {
        _classCallCheck(this, ElWatcher);

        var _this = _possibleConstructorReturn(this, (ElWatcher.__proto__ || Object.getPrototypeOf(ElWatcher)).call(this));

        _this.mutationObs = new MutationObserver(function (mutations) {
            mutations.forEach(function (mutation) {
                mutation.addedNodes.forEach(function (el) {
                    return el instanceof HTMLElement ? _this.emit('elAdded', el) : null;
                });
            });
        });
        return _this;
    }

    _createClass(ElWatcher, [{
        key: 'start',
        value: function start() {
            this.mutationObs.observe(document.body, { subtree: true, attributes: false, childList: true, characterData: false });
        }
    }]);

    return ElWatcher;
}(_Emitter3.default);

exports.default = ElWatcher;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Pup = __webpack_require__(1);

var _Pup2 = _interopRequireDefault(_Pup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.pup = new _Pup2.default(true);

/***/ })
/******/ ]);