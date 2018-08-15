import React, { createContext, Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

var _createContext = createContext('foo'),
    Provider = _createContext.Provider,
    Consumer = _createContext.Consumer;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function withStatext(Compo) {
  return function (_React$Component) {
    _inherits(WithStatextContext, _React$Component);

    function WithStatextContext() {
      _classCallCheck(this, WithStatextContext);

      return _possibleConstructorReturn(this, (WithStatextContext.__proto__ || Object.getPrototypeOf(WithStatextContext)).apply(this, arguments));
    }

    _createClass(WithStatextContext, [{
      key: 'render',
      value: function render() {
        var _this2 = this;

        return React.createElement(
          Consumer,
          null,
          function (context) {
            return React.createElement(Compo, _extends({}, _this2.props, { statext__: context }));
          }
        );
      }
    }]);

    return WithStatextContext;
  }(React.Component);
}
function withSharedState(Compo) {
  var _class, _temp;

  return _temp = _class = function (_Compo) {
    _inherits(RestateComponent, _Compo);

    function RestateComponent(props) {
      _classCallCheck(this, RestateComponent);

      var _this3 = _possibleConstructorReturn(this, (RestateComponent.__proto__ || Object.getPrototypeOf(RestateComponent)).call(this, props));

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

    _createClass(RestateComponent, [{
      key: 'shouldComponentUpdate',
      value: function shouldComponentUpdate(_ref) {
        var prevStore = _ref.statext__.store,
            prevprops = _objectWithoutProperties(_ref, ['statext__']);

        var _props = this.props,
            store = _props.statext__.store,
            props = _objectWithoutProperties(_props, ['statext__']);

        if (!prevStore || prevStore.get(Compo) !== store.get(Compo)) return true;
        for (var i in props) {
          if (!(i in prevprops)) return true;
        }for (var _i in prevprops) {
          if (props[_i] !== prevprops[_i]) return true;
        }return false;
      }
    }, {
      key: 'state',
      get: function get() {
        return this.props.statext__.store.get(Compo) || this._state;
      },
      set: function set(newState) {
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

var _extends$1 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass$1 = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck$1(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn$1(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits$1(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
  _inherits$1(StatextProvider, _Component);

  function StatextProvider(props) {
    _classCallCheck$1(this, StatextProvider);

    var _this = _possibleConstructorReturn$1(this, (StatextProvider.__proto__ || Object.getPrototypeOf(StatextProvider)).call(this, props));

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
            newStore.set(comp, _extends$1({}, oldVal, valAfterMiddleware));
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

  _createClass$1(StatextProvider, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        Provider,
        { value: this.state },
        this.props.children
      );
    }
  }]);

  return StatextProvider;
}(Component);

StatextProvider.propTypes = {
  children: PropTypes.node.isRequired,
  middleware: PropTypes.arrayOf(PropTypes.func.isRequired)
};
StatextProvider.defaultProps = { middleware: [] };

var withSharedState$1 = withSharedState_;
var Provider$1 = StatextProvider;

export { withSharedState$1 as withSharedState, Provider$1 as Provider };
