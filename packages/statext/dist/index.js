'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var ReactDOM = _interopDefault(require('react-dom'));
var PropTypes = _interopDefault(require('prop-types'));

var _createContext = React.createContext('foo'),
    Provider = _createContext.Provider,
    Consumer = _createContext.Consumer;

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

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

var objectWithoutProperties = function (obj, keys) {
  var target = {};

  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }

  return target;
};

var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

var toArray = function (arr) {
  return Array.isArray(arr) ? arr : Array.from(arr);
};

var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

function withStatext(Compo) {
  return function (_React$Component) {
    inherits(WithStatextContext, _React$Component);

    function WithStatextContext() {
      classCallCheck(this, WithStatextContext);
      return possibleConstructorReturn(this, (WithStatextContext.__proto__ || Object.getPrototypeOf(WithStatextContext)).apply(this, arguments));
    }

    createClass(WithStatextContext, [{
      key: 'render',
      value: function render() {
        var _this2 = this;

        return React__default.createElement(
          Consumer,
          null,
          function (context) {
            return React__default.createElement(Compo, _extends({}, _this2.props, { statext__: context }));
          }
        );
      }
    }]);
    return WithStatextContext;
  }(React__default.Component);
}
function withSharedState(Compo) {
  var _class, _temp;

  return _temp = _class = function (_Compo) {
    inherits(RestateComponent, _Compo);

    function RestateComponent(props) {
      classCallCheck(this, RestateComponent);

      var _this3 = possibleConstructorReturn(this, (RestateComponent.__proto__ || Object.getPrototypeOf(RestateComponent)).call(this, props));

      _this3.setState = function (nextState, cb) {
        _this3.props.statext__.setState(nextState, cb, Compo);
      };

      _this3.unstable_deferredSetState = function (nextState, cb) {
        ReactDOM.unstable_deferredUpdates(function () {
          return _this3.props.statext__.setState(nextState, cb, Compo);
        });
      };

      if (!props.statext__.store.get(Compo)) {
        props.statext__.setState(_this3._state, null, Compo);
      }
      return _this3;
    }

    createClass(RestateComponent, [{
      key: 'shouldComponentUpdate',
      value: function shouldComponentUpdate(_ref) {
        var prevStore = _ref.statext__.store,
            prevprops = objectWithoutProperties(_ref, ['statext__']);
        var _props = this.props,
            store = _props.statext__.store,
            props = objectWithoutProperties(_props, ['statext__']);

        if (!prevStore || prevStore.get(Compo) !== store.get(Compo)) return true;
        for (var i in props) {
          if (!(i in prevprops)) return true;
        }for (var _i in prevprops) {
          if (props[_i] !== prevprops[_i]) return true;
        }return false;
      }
    }, {
      key: 'state',
      get: function get$$1() {
        return this.props.statext__.store.get(Compo) || this._state;
      },
      set: function set$$1(newState) {
        this._state = newState;
      }
    }]);
    return RestateComponent;
  }(Compo), _class.propTypes = {
    statext__: PropTypes.object.isRequired
  }, _temp;
}

var withSharedState_ = (function (compo) {
  return withStatext(withSharedState(compo));
});

var compose = function compose(fns, extra) {
  return fns.reduce(function (prevFn, nextFn) {
    return function (value) {
      return nextFn(prevFn(value, extra), extra);
    };
  }, function (value) {
    return value;
  });
};

var StatextProvider = function (_Component) {
  inherits(StatextProvider, _Component);

  function StatextProvider(props) {
    classCallCheck(this, StatextProvider);

    var _this = possibleConstructorReturn(this, (StatextProvider.__proto__ || Object.getPrototypeOf(StatextProvider)).call(this, props));

    function getStateSetter() {
      var wrapper = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function (a) {
        return a();
      };

      return function unboundSetState(newStateInput, cb, comp) {
        var _this2 = this;

        wrapper(function () {
          return _this2.setState(function (_ref) {
            var oldStore = _ref.store;

            var newStore = new Map(oldStore);
            var oldVal = newStore.get(comp);
            var val = typeof newStateInput === 'function' ? newStateInput(oldVal) : newStateInput;
            var valAfterMiddleware = compose(props.middleware, function (newVal) {
              var newCb = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : cb;
              return setState(newVal, newCb, comp);
            })(val);
            newStore.set(comp, _extends({}, oldVal, valAfterMiddleware));
            return { store: newStore };
          }, cb);
        });
      };
    }
    var setState = getStateSetter().bind(_this);
    _this.state = {
      store: new Map(),
      setState: setState,
      setStore: function setStore(store, cb) {
        _this.setState(function () {
          return { store: store };
        }, cb);
      }
    };
    return _this;
  }

  createClass(StatextProvider, [{
    key: 'render',
    value: function render() {
      return React__default.createElement(
        Provider,
        { value: this.state },
        this.props.children
      );
    }
  }]);
  return StatextProvider;
}(React.Component);

StatextProvider.propTypes = {
  children: PropTypes.node.isRequired,
  middleware: PropTypes.arrayOf(PropTypes.func.isRequired)
};
StatextProvider.defaultProps = { middleware: [] };

var Logger = function (_React$Component) {
  inherits(Logger, _React$Component);

  function Logger() {
    classCallCheck(this, Logger);
    return possibleConstructorReturn(this, (Logger.__proto__ || Object.getPrototypeOf(Logger)).apply(this, arguments));
  }

  createClass(Logger, [{
    key: 'componentDidUpdate',
    value: function componentDidUpdate(_ref) {
      var store = _ref.statext__.store;

      this.props.statext__.store.forEach(function (v, k) {
        if (v !== store.get(k)) {
          /* eslint-disable no-console */
          console.group(k.name);
          console.log('From', store.get(k));
          console.log('To', v);
          console.groupEnd();
          /* eslint-enable no-console */
        }
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return null;
    }
  }]);
  return Logger;
}(React__default.Component);

Logger.propTypes = {
  statext__: PropTypes.object.isRequired
};


var Logger_ = withStatext(Logger);

var buttonStyle = {
  width: '30px',
  height: '30px',
  border: 0,
  backgroundColor: 'rgba(0,0,0,0.2)',
  color: '#fff',
  appearence: 'none',
  fontWeight: 900
};

var TimeTravel = function (_React$Component) {
  inherits(TimeTravel, _React$Component);

  function TimeTravel() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, TimeTravel);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = TimeTravel.__proto__ || Object.getPrototypeOf(TimeTravel)).call.apply(_ref, [this].concat(args))), _this), _this.state = { past: _this.props.statext__.store ? [_this.props.statext__.store] : [], future: [] }, _temp), possibleConstructorReturn(_this, _ret);
  }

  createClass(TimeTravel, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      return React__default.createElement(
        'div',
        {
          style: {
            position: 'fixed',
            bottom: 0,
            left: 0,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            translateZ: 0,
            zIndex: 2000
          }
        },
        React__default.createElement(
          'button',
          {
            disabled: this.state.past.length < 2,
            onClick: function onClick() {
              var previousStore = _this2.state.past[_this2.state.past.length - 2];
              previousStore && previousStore.size && _this2.setState(function (_ref2) {
                var past = _ref2.past,
                    future = _ref2.future;

                var newpast = [].concat(toConsumableArray(past));
                var a = newpast.pop();
                var newfuture = [a].concat(toConsumableArray(future));
                return { past: newpast, future: newfuture, iDidThis: true };
              }, function () {
                return _this2.props.statext__.setStore(previousStore);
              });
            },
            style: buttonStyle
          },
          '<'
        ),
        React__default.createElement(
          'button',
          {
            disabled: this.state.future.length === 0,
            onClick: function onClick() {
              var nextStore = void 0;
              _this2.setState(function (_ref3) {
                var future = _ref3.future;

                var _future = toArray(future),
                    next = _future[0],
                    newfuture = _future.slice(1);

                nextStore = next;
                return { future: newfuture, iDidThis: true };
              }, function () {
                return _this2.props.statext__.setStore(nextStore);
              });
            },
            style: buttonStyle
          },
          '>'
        )
      );
    }
  }], [{
    key: 'getDerivedStateFromProps',
    value: function getDerivedStateFromProps(_ref4, _ref5) {
      var store = _ref4.statext__.store;
      var past = _ref5.past,
          future = _ref5.future,
          iDidThis = _ref5.iDidThis;

      if (store && store !== past[past.length - 1]) return { past: [].concat(toConsumableArray(past), [store]), iDidThis: false, future: iDidThis ? future : [] };
      return null;
    }
  }]);
  return TimeTravel;
}(React__default.Component);

TimeTravel.propTypes = {
  statext__: PropTypes.shape({
    store: PropTypes.object.isRequired,
    setStore: PropTypes.func.isRequired
  })
};


var TimeTravel_ = withStatext(TimeTravel);

var withSharedState$1 = withSharedState_;
var Provider$1 = StatextProvider;
var Logger$1 = Logger_;
var TimeTravel$1 = TimeTravel_;

exports.withSharedState = withSharedState$1;
exports.Provider = Provider$1;
exports.Logger = Logger$1;
exports.TimeTravel = TimeTravel$1;
