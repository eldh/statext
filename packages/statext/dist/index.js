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
      // eslint-disable-next-line camelcase

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
            var oldVal = newStore.get(comp) || {};
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

var withSharedState$1 = withSharedState_;
var Provider$1 = StatextProvider;

exports.withSharedState = withSharedState$1;
exports.Provider = Provider$1;
