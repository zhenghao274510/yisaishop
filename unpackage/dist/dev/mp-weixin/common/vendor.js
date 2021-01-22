(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],{

/***/ 1:
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.createApp = createApp;exports.createComponent = createComponent;exports.createPage = createPage;exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}

var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn(fn) {
  return typeof fn === 'function';
}

function isStr(str) {
  return typeof str === 'string';
}

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function noop() {}

/**
                    * Create a cached version of a pure function.
                    */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
   * Camelize a hyphen-delimited string.
   */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {return c ? c.toUpperCase() : '';});
});

var HOOKS = [
'invoke',
'success',
'fail',
'complete',
'returnValue'];


var globalInterceptors = {};
var scopedInterceptors = {};

function mergeHook(parentVal, childVal) {
  var res = childVal ?
  parentVal ?
  parentVal.concat(childVal) :
  Array.isArray(childVal) ?
  childVal : [childVal] :
  parentVal;
  return res ?
  dedupeHooks(res) :
  res;
}

function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}

function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}

function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}

function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}

function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}

function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}

function wrapperHook(hook) {
  return function (data) {
    return hook(data) || data;
  };
}

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

function queue(hooks, data) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.resolve(wrapperHook(hook));
    } else {
      var res = hook(data);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {} };

      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    } };

}

function wrapperOptions(interceptor) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}

function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(interceptor.returnValue));
  }
  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}

function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}

function invokeApi(method, api, options) {for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {params[_key - 3] = arguments[_key];}
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }
  return api.apply(void 0, [options].concat(params));
}

var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return res.then(function (res) {
      return res[1];
    }).catch(function (res) {
      return res[0];
    });
  } };


var SYNC_API_RE =
/^\$|sendNativeEvent|restoreGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64/;

var CONTEXT_API_RE = /^create|Manager$/;

// Context例外情况
var CONTEXT_API_RE_EXC = ['createBLEConnection'];

// 同步例外情况
var ASYNC_API = ['createBLEConnection'];

var CALLBACK_API_RE = /^on|^off/;

function isContextApi(name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}

function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== 'onPush';
}

function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).
  catch(function (err) {return [err];});
}

function shouldPromise(name) {
  if (
  isContextApi(name) ||
  isSyncApi(name) ||
  isCallbackApi(name))
  {
    return false;
  }
  return true;
}

/* eslint-disable no-extend-native */
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    var promise = this.constructor;
    return this.then(
    function (value) {return promise.resolve(callback()).then(function () {return value;});},
    function (reason) {return promise.resolve(callback()).then(function () {
        throw reason;
      });});

  };
}

function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  return function promiseApi() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {params[_key2 - 1] = arguments[_key2];}
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject })].concat(
      params));
    })));
  };
}

var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;

function checkDeviceWidth() {var _wx$getSystemInfoSync =




  wx.getSystemInfoSync(),platform = _wx$getSystemInfoSync.platform,pixelRatio = _wx$getSystemInfoSync.pixelRatio,windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}

function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }

  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      result = 1;
    } else {
      result = 0.5;
    }
  }
  return number < 0 ? -result : result;
}

var interceptors = {
  promiseInterceptor: promiseInterceptor };


var baseApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  upx2px: upx2px,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor,
  interceptors: interceptors });


function findExistsPageIndex(url) {
  var pages = getCurrentPages();
  var len = pages.length;
  while (len--) {
    var page = pages[len];
    if (page.$page && page.$page.fullPath === url) {
      return len;
    }
  }
  return -1;
}

var redirectTo = {
  name: function name(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.delta) {
      return 'navigateBack';
    }
    return 'redirectTo';
  },
  args: function args(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.url) {
      var existsPageIndex = findExistsPageIndex(fromArgs.url);
      if (existsPageIndex !== -1) {
        var delta = getCurrentPages().length - 1 - existsPageIndex;
        if (delta > 0) {
          fromArgs.delta = delta;
        }
      }
    }
  } };


var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(
      function (item, index) {return index < currentIndex ? item !== urls[currentIndex] : true;});

    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false };

  } };


// import navigateTo from 'uni-helpers/navigate-to'

function addSafeAreaInsets(result) {
  if (result.safeArea) {
    var safeArea = result.safeArea;
    result.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: result.windowWidth - safeArea.right,
      bottom: result.windowHeight - safeArea.bottom };

  }
}
var protocols = {
  redirectTo: redirectTo,
  // navigateTo,  // 由于在微信开发者工具的页面参数，会显示__id__参数，因此暂时关闭mp-weixin对于navigateTo的AOP
  previewImage: previewImage,
  getSystemInfo: {
    returnValue: addSafeAreaInsets },

  getSystemInfoSync: {
    returnValue: addSafeAreaInsets } };


var todos = [
'vibrate',
'preloadPage',
'unPreloadPage',
'loadSubPackage'];

var canIUses = [];

var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];

function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}

function processArgs(methodName, fromArgs) {var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {// 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {// 不支持的参数
          console.warn("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F ".concat(methodName, "\u6682\u4E0D\u652F\u6301").concat(key));
        } else if (isStr(keyOption)) {// 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {// {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        if (isFn(fromArgs[key])) {
          toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
        }
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}

function processReturnValue(methodName, res, returnValue) {var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {// 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}

function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {// 暂不支持的 api
      return function () {
        console.error("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F \u6682\u4E0D\u652F\u6301".concat(methodName));
      };
    }
    return function (arg1, arg2) {// 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);

      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      if (isFn(options.name)) {
        methodName = options.name(arg1);
      } else if (isStr(options.name)) {
        methodName = options.name;
      }
      var returnValue = wx[methodName].apply(wx, args);
      if (isSyncApi(methodName)) {// 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}

var todoApis = Object.create(null);

var TODOS = [
'onTabBarMidButtonTap',
'subscribePush',
'unsubscribePush',
'onPush',
'offPush',
'share'];


function createTodoApi(name) {
  return function todoApi(_ref)


  {var fail = _ref.fail,complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail:\u6682\u4E0D\u652F\u6301 ").concat(name, " \u65B9\u6CD5") };

    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}

TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});

var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin'] };


function getProvider(_ref2)




{var service = _ref2.service,success = _ref2.success,fail = _ref2.fail,complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service] };

    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail:服务[' + service + ']不存在' };

    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}

var extraApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getProvider: getProvider });


var getEmitter = function () {
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();

function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}

function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}

var eventApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit });


var api = /*#__PURE__*/Object.freeze({
  __proto__: null });


var MPPage = Page;
var MPComponent = Component;

var customizeRE = /:/g;

var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});

function initTriggerEvent(mpInstance) {
  {
    if (!wx.canIUse('nextTick')) {
      return;
    }
  }
  var oldTriggerEvent = mpInstance.triggerEvent;
  mpInstance.triggerEvent = function (event) {for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {args[_key3 - 1] = arguments[_key3];}
    return oldTriggerEvent.apply(mpInstance, [customize(event)].concat(args));
  };
}

function initHook(name, options) {
  var oldHook = options[name];
  if (!oldHook) {
    options[name] = function () {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function () {
      initTriggerEvent(this);for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {args[_key4] = arguments[_key4];}
      return oldHook.apply(this, args);
    };
  }
}

Page = function Page() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('onLoad', options);
  return MPPage(options);
};

Component = function Component() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('created', options);
  return MPComponent(options);
};

var PAGE_EVENT_HOOKS = [
'onPullDownRefresh',
'onReachBottom',
'onAddToFavorites',
'onShareTimeline',
'onShareAppMessage',
'onPageScroll',
'onResize',
'onTabItemTap'];


function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}

function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }

  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }

  vueOptions = vueOptions.default || vueOptions;

  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super &&
    vueOptions.super.options &&
    Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }

  if (isFn(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {return hasHook(hook, mixin);});
  }
}

function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}

function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
  vueOptions = VueComponent.options;
  return [VueComponent, vueOptions];
}

function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}

function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;

  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}

function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};

  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"VUE_APP_NAME":"伊赛新零售","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }

  if (!isPlainObject(data)) {
    data = {};
  }

  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });

  return data;
}

var PROP_TYPES = [String, Number, Boolean, Object, Array, null];

function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions.behaviors;
  var vueExtends = vueOptions.extends;
  var vueMixins = vueOptions.mixins;

  var vueProps = vueOptions.props;

  if (!vueProps) {
    vueOptions.props = vueProps = [];
  }

  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps.name = {
            type: String,
            default: '' };

          vueProps.value = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: '' };

        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(
    initBehavior({
      properties: initProperties(vueExtends.props, true) }));


  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(
        initBehavior({
          properties: initProperties(vueMixin.props, true) }));


      }
    });
  }
  return behaviors;
}

function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}

function initProperties(props) {var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: '' };

    // 用于字节跳动小程序模拟抽象节点
    properties.generic = {
      type: Object,
      value: null };

    properties.vueSlots = { // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots });

      } };

  }
  if (Array.isArray(props)) {// ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key) };

    });
  } else if (isPlainObject(props)) {// {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {// title:{type:String,default:''}
        var value = opts.default;
        if (isFn(value)) {
          value = value();
        }

        opts.type = parsePropType(key, opts.type);

        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key) };

      } else {// content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key) };

      }
    });
  }
  return properties;
}

function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}

  event.stopPropagation = noop;
  event.preventDefault = noop;

  event.target = event.target || {};

  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }

  if (hasOwn(event, 'markerId')) {
    event.detail = typeof event.detail === 'object' ? event.detail : {};
    event.detail.markerId = event.markerId;
  }

  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }

  return event;
}

function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {// ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];

      var vFor;
      if (Number.isInteger(dataPath)) {
        vFor = dataPath;
      } else if (!dataPath) {
        vFor = context;
      } else if (typeof dataPath === 'string' && dataPath) {
        if (dataPath.indexOf('#s#') === 0) {
          vFor = dataPath.substr(3);
        } else {
          vFor = vm.__get_value(dataPath, context);
        }
      }

      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }

      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}

function processEventExtra(vm, extra, event) {
  var extraObj = {};

  if (Array.isArray(extra) && extra.length) {
    /**
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *'test'
                                              */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {// model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {// $event
            extraObj['$' + index] = event;
          } else if (dataPath === 'arguments') {
            if (event.detail && event.detail.__args__) {
              extraObj['$' + index] = event.detail.__args__;
            } else {
              extraObj['$' + index] = [event];
            }
          } else if (dataPath.indexOf('$event.') === 0) {// $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }

  return extraObj;
}

function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}

function processEventArgs(vm, event) {var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];var isCustom = arguments.length > 4 ? arguments[4] : undefined;var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象
  if (isCustom) {// 自定义事件
    isCustomMPEvent = event.currentTarget &&
    event.currentTarget.dataset &&
    event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {// 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return event.detail.__args__ || event.detail;
    }
  }

  var extraObj = processEventExtra(vm, extra, event);

  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {// input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(event.detail.__args__[0]);
        } else {// wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });

  return ret;
}

var ONCE = '~';
var CUSTOM = '^';

function isMatchEventType(eventType, optType) {
  return eventType === optType ||

  optType === 'regionchange' && (

  eventType === 'begin' ||
  eventType === 'end');


}

function getContextVm(vm) {
  var $parent = vm.$parent;
  // 父组件是 scoped slots 或者其他自定义组件时继续查找
  while ($parent && $parent.$parent && ($parent.$options.generic || $parent.$parent.$options.generic || $parent.$scope._$vuePid)) {
    $parent = $parent.$parent;
  }
  return $parent && $parent.$parent;
}

function handleEvent(event) {var _this = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn('事件信息不存在');
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰
  if (!eventOpts) {
    return console.warn('事件信息不存在');
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;

  var ret = [];

  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];

    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;

    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this.$vm;
          if (handlerCtx.$options.generic) {// mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = getContextVm(handlerCtx) || handlerCtx;
          }
          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx,
            processEventArgs(
            _this.$vm,
            event,
            eventArray[1],
            eventArray[2],
            isCustom,
            methodName));

            return;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            throw new Error(" _vm.".concat(methodName, " is not a function"));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          var params = processEventArgs(
          _this.$vm,
          event,
          eventArray[1],
          eventArray[2],
          isCustom,
          methodName);

          // 参数尾部增加原始事件对象用于复杂表达式内获取额外数据
          // eslint-disable-next-line no-sparse-arrays
          ret.push(handler.apply(handlerCtx, (Array.isArray(params) ? params : []).concat([,,,,,,,,,, event])));
        }
      });
    }
  });

  if (
  eventType === 'input' &&
  ret.length === 1 &&
  typeof ret[0] !== 'undefined')
  {
    return ret[0];
  }
}

var hooks = [
'onShow',
'onHide',
'onError',
'onPageNotFound',
'onThemeChange',
'onUnhandledRejection'];


function parseBaseApp(vm, _ref3)


{var mocks = _ref3.mocks,initRefs = _ref3.initRefs;
  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }

  _vue.default.prototype.mpHost = "mp-weixin";

  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }

      this.mpType = this.$options.mpType;

      this.$mp = _defineProperty({
        data: {} },
      this.mpType, this.$options.mpInstance);


      this.$scope = this.$options.mpInstance;

      delete this.$options.mpType;
      delete this.$options.mpInstance;

      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    } });


  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {// 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return;
      }
      {
        if (!wx.canIUse('nextTick')) {// 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
          console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上');
        }
      }

      this.$vm = vm;

      this.$vm.$mp = {
        app: this };


      this.$vm.$scope = this;
      // vm 上也挂载 globalData
      this.$vm.globalData = this.globalData;

      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);

      this.$vm.__call_hook('onLaunch', args);
    } };


  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};
  // 将 methods 中的方法挂在 getApp() 中
  var methods = vm.$options.methods;
  if (methods) {
    Object.keys(methods).forEach(function (name) {
      appOptions[name] = methods[name];
    });
  }

  initHooks(appOptions, hooks);

  return appOptions;
}

var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];

function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // 优先查找直属(反向查找:https://github.com/dcloudio/uni-app/issues/1200)
  for (var i = $children.length - 1; i >= 0; i--) {
    var childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  // 反向递归查找
  var parentVm;
  for (var _i = $children.length - 1; _i >= 0; _i--) {
    parentVm = findVmByVueId($children[_i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}

function initBehavior(options) {
  return Behavior(options);
}

function isPage() {
  return !!this.route;
}

function initRelation(detail) {
  this.triggerEvent('__l', detail);
}

function selectAllComponents(mpInstance, selector, $refs) {
  var components = mpInstance.selectAllComponents(selector);
  components.forEach(function (component) {
    var ref = component.dataset.ref;
    $refs[ref] = component.$vm || component;
    {
      if (component.dataset.vueGeneric === 'scoped') {
        component.selectAllComponents('.scoped-ref').forEach(function (scopedComponent) {
          selectAllComponents(scopedComponent, selector, $refs);
        });
      }
    }
  });
}

function initRefs(vm) {
  var mpInstance = vm.$scope;
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      selectAllComponents(mpInstance, '.vue-ref', $refs);
      // TODO 暂不考虑 for 中的 scoped
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for');
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || component);
      });
      return $refs;
    } });

}

function handleLink(event) {var _ref4 =



  event.detail || event.value,vuePid = _ref4.vuePid,vueOptions = _ref4.vueOptions; // detail 是微信,value 是百度(dipatch)

  var parentVm;

  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }

  if (!parentVm) {
    parentVm = this.$vm;
  }

  vueOptions.parent = parentVm;
}

function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs });

}

var eventChannels = {};

var eventChannelStack = [];

function getEventChannel(id) {
  if (id) {
    var eventChannel = eventChannels[id];
    delete eventChannels[id];
    return eventChannel;
  }
  return eventChannelStack.shift();
}

function createApp(vm) {
  _vue.default.prototype.getOpenerEventChannel = function () {
    // 微信小程序使用自身getOpenerEventChannel
    {
      return this.$scope.getOpenerEventChannel();
    }
  };
  var callHook = _vue.default.prototype.__call_hook;
  _vue.default.prototype.__call_hook = function (hook, args) {
    if (hook === 'onLoad' && args && args.__id__) {
      this.__eventChannel__ = getEventChannel(args.__id__);
      delete args.__id__;
    }
    return callHook.call(this, hook, args);
  };
  App(parseApp(vm));
  return vm;
}

var encodeReserveRE = /[!'()*]/g;
var encodeReserveReplacer = function encodeReserveReplacer(c) {return '%' + c.charCodeAt(0).toString(16);};
var commaRE = /%2C/g;

// fixed encodeURIComponent which is more conformant to RFC3986:
// - escapes [!'()*]
// - preserve commas
var encode = function encode(str) {return encodeURIComponent(str).
  replace(encodeReserveRE, encodeReserveReplacer).
  replace(commaRE, ',');};

function stringifyQuery(obj) {var encodeStr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : encode;
  var res = obj ? Object.keys(obj).map(function (key) {
    var val = obj[key];

    if (val === undefined) {
      return '';
    }

    if (val === null) {
      return encodeStr(key);
    }

    if (Array.isArray(val)) {
      var result = [];
      val.forEach(function (val2) {
        if (val2 === undefined) {
          return;
        }
        if (val2 === null) {
          result.push(encodeStr(key));
        } else {
          result.push(encodeStr(key) + '=' + encodeStr(val2));
        }
      });
      return result.join('&');
    }

    return encodeStr(key) + '=' + encodeStr(val);
  }).filter(function (x) {return x.length > 0;}).join('&') : null;
  return res ? "?".concat(res) : '';
}

function parseBaseComponent(vueComponentOptions)


{var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},isPage = _ref5.isPage,initRelation = _ref5.initRelation;var _initVueComponent =
  initVueComponent(_vue.default, vueComponentOptions),_initVueComponent2 = _slicedToArray(_initVueComponent, 2),VueComponent = _initVueComponent2[0],vueOptions = _initVueComponent2[1];

  var options = _objectSpread({
    multipleSlots: true,
    addGlobalClass: true },
  vueOptions.options || {});


  {
    // 微信 multipleSlots 部分情况有 bug，导致内容顺序错乱 如 u-list，提供覆盖选项
    if (vueOptions['mp-weixin'] && vueOptions['mp-weixin'].options) {
      Object.assign(options, vueOptions['mp-weixin'].options);
    }
  }

  var componentOptions = {
    options: options,
    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;

        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties };


        initVueIds(properties.vueId, this);

        // 处理父子关系
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options });


        // 初始化 vue 实例
        this.$vm = new VueComponent(options);

        // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
        initSlots(this.$vm, properties.vueSlots);

        // 触发首次 setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm && this.$vm.$destroy();
      } },

    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      } },

    methods: {
      __l: handleLink,
      __e: handleEvent } };


  // externalClasses
  if (vueOptions.externalClasses) {
    componentOptions.externalClasses = vueOptions.externalClasses;
  }

  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }

  if (isPage) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}

function parseComponent(vueComponentOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

var hooks$1 = [
'onShow',
'onHide',
'onUnload'];


hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);

function parseBasePage(vuePageOptions, _ref6)


{var isPage = _ref6.isPage,initRelation = _ref6.initRelation;
  var pageOptions = parseComponent(vuePageOptions);

  initHooks(pageOptions.methods, hooks$1, vuePageOptions);

  pageOptions.methods.onLoad = function (query) {
    this.options = query;
    var copyQuery = Object.assign({}, query);
    delete copyQuery.__id__;
    this.$page = {
      fullPath: '/' + (this.route || this.is) + stringifyQuery(copyQuery) };

    this.$vm.$mp.query = query; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', query);
  };

  return pageOptions;
}

function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}

function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}

todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});

canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name :
  canIUseApi;
  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});

var uni = {};

if (typeof Proxy !== 'undefined' && "mp-weixin" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (hasOwn(target, name)) {
        return target[name];
      }
      if (baseApi[name]) {
        return baseApi[name];
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      if (!hasOwn(wx, name) && !hasOwn(protocols, name)) {
        return;
      }
      return promisify(name, wrapper(name, wx[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    } });

} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });

  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
  }

  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });

  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });

  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}

wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;

var uni$1 = uni;var _default =

uni$1;exports.default = _default;

/***/ }),

/***/ 10:
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    if (!options.components) {
      options.components = {}
    }
    var hasOwn = Object.prototype.hasOwnProperty
    for (var name in components) {
      if (hasOwn.call(components, name) && !hasOwn.call(options.components, name)) {
        options.components[name] = components[name]
      }
    }
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 11:
/*!***********************************************************!*\
  !*** D:/lixindom/2020/伊籭商城/beefShop/common/js/request.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(uni) {function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;} /**
                                                                                                                                                                                                            * @Method Description
                                                                                                                                                                                                            * @Author: hao zheng@
                                                                                                                                                                                                            * @Description: 数据请求整合 处理
                                                                                                                                                                                                            * @bassUrl server 
                                                                                                                                                                                                            * @param {a===Object||file} 传给后台参数    m===Method 请求方法   t===url  所请求的接口路径
                                                                                                                                                                                                            * @iget  m==="GET"
                                                                                                                                                                                                            * @ipost m==="POST"
                                                                                                                                                                                                            * @iupfile  文件上传使用  
                                                                                                                                                                                                            * @return  Promise对象  所有数据信息
                                                                                                                                                                                                            * @createTime: 2020-7-7 15:05:06
                                                                                                                                                                                                            */
var bassUrl = __webpack_require__(/*! ./config.js */ 12).bass;
// const mid='/shouwanghuhui/api/'
var mid = '/api/service';

function request(a, m) {
  return a || (a = {}), new Promise(function (e, n) {
    uni.request({
      url: encodeURI(bassUrl + mid + "?json=".concat(JSON.stringify(a))),
      method: m,






      success: function success(res) {
        200 == res.statusCode ? e(res.data) : uni.showToast({
          title: "\u9519\u8BEF\u7801:".concat(res.statusCode),
          icon: "none",
          duration: 1500 });

      },
      fail: function fail(res) {
        "request:fail " === res.errMsg && uni.showToast({
          title: "请求数据失败！",
          icon: "none",
          duration: 1500 }),
        n(res.data);
      } });

  });
}
function iupfile() {var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  uni.showLoading({
    title: "上传中..." });

  return new Promise(function (e, n) {
    uni.uploadFile({
      url: encodeURI(bassUrl + '/api/addimg'),
      filePath: t.path,
      name: 'file',
      method: "POST",
      headers: _defineProperty({
        'Content-Type': 'application/json' }, "Content-Type",
      'multipart/form-data;'),

      success: function success(res) {
        uni.hideLoading();
        200 == res.statusCode ? e(res.data) : uni.showToast({
          title: "\u9519\u8BEF\u7801:".concat(res.statusCode),
          icon: "none",
          duration: 1500 });

      },
      fail: function fail(res) {
        uni.hideLoading();
        "request:fail " === res.errMsg && uni.showToast({
          title: "请求数据失败！",
          icon: "none",
          duration: 1500 }),
        n(res.data);
      } });

  });
}

function ipost(a, t) {
  return request(a, "POST", t);
}
module.exports = {
  post: ipost,
  upflie: iupfile };
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 12:
/*!**********************************************************!*\
  !*** D:/lixindom/2020/伊籭商城/beefShop/common/js/config.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
  bass: "https://xcx.yisai.work"
  // bass:'http://192.168.0.116/yisai'
};

/***/ }),

/***/ 13:
/*!*******************************************************!*\
  !*** D:/lixindom/2020/伊籭商城/beefShop/common/js/api.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;

var _qqmapWxJssdk = _interopRequireDefault(__webpack_require__(/*! @/common/js/qqmap-wx-jssdk.js */ 14));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var bassUrl = __webpack_require__(/*! @/common/js/config.js */ 12).bass;

var api = {
  tip: function tip(a) {
    typeof a === 'string' ?
    uni.showToast({
      title: a,
      icon: "none",
      duration: 1500 }) :
    console.log(a);
  },
  reLaunch: function reLaunch(url) {
    typeof url === 'string' ?
    uni.reLaunch({
      url: url }) :
    console.log(a);
  },
  switchTab: function switchTab(url) {
    typeof url === 'string' ?
    uni.switchTab({
      url: url }) :
    console.log(url);
  },
  redirectTo: function redirectTo(url) {
    typeof url === 'string' ?
    uni.redirectTo({
      url: url }) :
    console.log(url);
  },
  navTo: function navTo(url) {
    typeof url === 'string' ?
    uni.navigateTo({
      url: url }) :
    console.log(url);
  },
  back: function back() {
    setTimeout(function () {
      uni.navigateBack();
    }, 500);

  },
  setNav: function setNav(e) {
    typeof e === 'string' ?
    uni.setNavigationBarTitle({
      title: e }) :
    console.log(url);
  },
  prePage: function prePage() {
    var pages = getCurrentPages();
    var prePage = pages[pages.length - 2];
    return prePage.$vm;
  },
  loading: function loading(e) {
    uni.showLoading({
      mask: false,
      title: e });

  },
  showTip: function showTip(t, c) {
    uni.showModal({
      content: t,
      confirmColor: "#006F2F",
      cancelText: '取消',
      confirmText: '确定',
      success: function success(res) {
        c(res);
      } });

  },
  regPhone: function regPhone(v) {
    var re = new RegExp(/^[1][3456789]\d{9}$/);
    if (re.test(v)) {
      return true;
    } else {
      return false;
    }

  },




































  PayBywx: function PayBywx(data, callback) {
    console.log(data);
    uni.requestPayment({
      timeStamp: data.timeStamp,
      nonceStr: data.nonceStr,
      package: data.package,
      signType: data.signType,
      paySign: data.paySign,
      success: function success(res) {
        callback(res);
      },
      fail: function fail(res) {

      } });

  },
  getLocation: function getLocation(c) {
    uni.getLocation({
      type: 'gcj02',
      success: function success(res) {
        c(res);
      } });

  },
  // 逆地址解析(坐标位置描述)  经纬度转地址
  localEncal: function localEncal(p, c) {
    var qqmapsdk = new _qqmapWxJssdk.default({
      key: 'GQZBZ-3CECD-BP443-PBQEY-4R3M6-QMFBO' });

    qqmapsdk.reverseGeocoder({
      location: {
        latitude: p.latitude,
        longitude: p.longitude },

      success: function success(res) {
        c(res.result);
      } });

  },
  // 地址解析(地址转坐标)  地址转经纬度
  addressToLocation: function addressToLocation(l, c) {
    var qqmapsdk = new _qqmapWxJssdk.default({
      key: 'GQZBZ-3CECD-BP443-PBQEY-4R3M6-QMFBO' });

    qqmapsdk.geocoder({
      address: l,
      success: function success(res) {
        c(res.result);
      } });

  },

  callPhone: function callPhone(num) {
    uni.makePhoneCall({
      phoneNumber: num });

  },
  formText: function formText(str) {
    var s = "";
    var width = uni.getSystemInfoSync().screenWidth;
    s = str.replace(/&amp;/g, "&");
    s = s.replace(/&lt;/g, "<");
    s = s.replace(/&gt;/g, ">");
    s = s.replace(/&nbsp;/g, " ");
    s = s.replace(/&#39;/g, "'");
    s = s.replace(/&quot;/g, '"');
    s = s.replace(/<br\/>/g, "\n");
    s = s.replace(/style="[^"]+"/gi, '');
    s = s.replace(/width="[^"]+"/gi, '');
    s = s.replace(/height="[^"]+"/gi, '');
    s = s.replace(/\<img/gi, '<img style=width:' + width + "px;height:auto;display:block;");
    return s;
  },
  formatTime: function formatTime(unixtime) {
    if (typeof unixtime == undefined) {
      return;
    } else {
      var date = new Date(unixtime);
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      m = m < 10 ? "0" + m : m;
      var d = date.getDate();
      d = d < 10 ? "0" + d : d;
      var h = date.getHours();
      h = h < 10 ? "0" + h : h;
      var minute = date.getMinutes();
      var second = date.getSeconds();
      minute = minute < 10 ? "0" + minute : minute;
      second = second < 10 ? "0" + second : second;
      return y + "-" + m + "-" + d;
    }
  },
  parsePrice: function parsePrice(money) {
    var n = 2;
    money = parseFloat((money + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
    var l = money.split(".")[0].split("");
    var r = money.split(".")[1];
    var t = "";
    for (var i = 0; i < l.length; i++) {
      t += l[i];
    }
    return t + "." + r;
  },
  formCard: function formCard(val) {
    var isIdCard2 = /^[1-9]\d{5}(19\d{2}|[2-9]\d{3})((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])(\d{4}|\d{3}X)$/i;
    if (isIdCard2.test(val)) {
      return true;
    } else {
      return false;
    }
  },
  //   日期   间距
  datedifference: function datedifference(sDate1, sDate2) {//sDate1和sDate2是2006-12-18格式 
    var dateSpan,
    tempDate,
    iDays;
    sDate1 = Date.parse(sDate1);
    sDate2 = Date.parse(sDate2);
    dateSpan = sDate2 - sDate1;
    dateSpan = Math.abs(dateSpan);
    iDays = Math.floor(dateSpan / (24 * 3600 * 1000));
    return iDays;
  },
  uniUpimg: function uniUpimg(n, c) {
    uni.chooseImage({
      count: n,
      sizeType: ["original", "compressed"],
      sourceType: ["album", "camera"],
      success: function success(result) {
        // tempFilePath可以作为img标签的src属性显示图片
        console.log(result);
        c(result);
      } });

  } };var _default =

api;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 14:
/*!******************************************************************!*\
  !*** D:/lixindom/2020/伊籭商城/beefShop/common/js/qqmap-wx-jssdk.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;} /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               * 微信小程序JavaScriptSDK
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               * 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               * @version 1.2
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               * @date 2019-03-06
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               * @author v_ylyue@tencent.com
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               */

var ERROR_CONF = {
  KEY_ERR: 311,
  KEY_ERR_MSG: 'key格式错误',
  PARAM_ERR: 310,
  PARAM_ERR_MSG: '请求参数信息有误',
  SYSTEM_ERR: 600,
  SYSTEM_ERR_MSG: '系统错误',
  WX_ERR_CODE: 1000,
  WX_OK_CODE: 200 };

var BASE_URL = 'https://apis.map.qq.com/ws/';
var URL_SEARCH = BASE_URL + 'place/v1/search';
var URL_SUGGESTION = BASE_URL + 'place/v1/suggestion';
var URL_GET_GEOCODER = BASE_URL + 'geocoder/v1/';
var URL_CITY_LIST = BASE_URL + 'district/v1/list';
var URL_AREA_LIST = BASE_URL + 'district/v1/getchildren';
var URL_DISTANCE = BASE_URL + 'distance/v1/';
var URL_DIRECTION = BASE_URL + 'direction/v1/';
var MODE = {
  driving: 'driving',
  transit: 'transit' };

var EARTH_RADIUS = 6378136.49;
var Utils = {
  /**
              * md5加密方法
              * 版权所有©2011 Sebastian Tschan，https：//blueimp.net
              */
  safeAdd: function safeAdd(x, y) {
    var lsw = (x & 0xffff) + (y & 0xffff);
    var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
    return msw << 16 | lsw & 0xffff;
  },
  bitRotateLeft: function bitRotateLeft(num, cnt) {
    return num << cnt | num >>> 32 - cnt;
  },
  md5cmn: function md5cmn(q, a, b, x, s, t) {
    return this.safeAdd(this.bitRotateLeft(this.safeAdd(this.safeAdd(a, q), this.safeAdd(x, t)), s), b);
  },
  md5ff: function md5ff(a, b, c, d, x, s, t) {
    return this.md5cmn(b & c | ~b & d, a, b, x, s, t);
  },
  md5gg: function md5gg(a, b, c, d, x, s, t) {
    return this.md5cmn(b & d | c & ~d, a, b, x, s, t);
  },
  md5hh: function md5hh(a, b, c, d, x, s, t) {
    return this.md5cmn(b ^ c ^ d, a, b, x, s, t);
  },
  md5ii: function md5ii(a, b, c, d, x, s, t) {
    return this.md5cmn(c ^ (b | ~d), a, b, x, s, t);
  },
  binlMD5: function binlMD5(x, len) {
    /* append padding */
    x[len >> 5] |= 0x80 << len % 32;
    x[(len + 64 >>> 9 << 4) + 14] = len;

    var i;
    var olda;
    var oldb;
    var oldc;
    var oldd;
    var a = 1732584193;
    var b = -271733879;
    var c = -1732584194;
    var d = 271733878;

    for (i = 0; i < x.length; i += 16) {
      olda = a;
      oldb = b;
      oldc = c;
      oldd = d;

      a = this.md5ff(a, b, c, d, x[i], 7, -680876936);
      d = this.md5ff(d, a, b, c, x[i + 1], 12, -389564586);
      c = this.md5ff(c, d, a, b, x[i + 2], 17, 606105819);
      b = this.md5ff(b, c, d, a, x[i + 3], 22, -1044525330);
      a = this.md5ff(a, b, c, d, x[i + 4], 7, -176418897);
      d = this.md5ff(d, a, b, c, x[i + 5], 12, 1200080426);
      c = this.md5ff(c, d, a, b, x[i + 6], 17, -1473231341);
      b = this.md5ff(b, c, d, a, x[i + 7], 22, -45705983);
      a = this.md5ff(a, b, c, d, x[i + 8], 7, 1770035416);
      d = this.md5ff(d, a, b, c, x[i + 9], 12, -1958414417);
      c = this.md5ff(c, d, a, b, x[i + 10], 17, -42063);
      b = this.md5ff(b, c, d, a, x[i + 11], 22, -1990404162);
      a = this.md5ff(a, b, c, d, x[i + 12], 7, 1804603682);
      d = this.md5ff(d, a, b, c, x[i + 13], 12, -40341101);
      c = this.md5ff(c, d, a, b, x[i + 14], 17, -1502002290);
      b = this.md5ff(b, c, d, a, x[i + 15], 22, 1236535329);

      a = this.md5gg(a, b, c, d, x[i + 1], 5, -165796510);
      d = this.md5gg(d, a, b, c, x[i + 6], 9, -1069501632);
      c = this.md5gg(c, d, a, b, x[i + 11], 14, 643717713);
      b = this.md5gg(b, c, d, a, x[i], 20, -373897302);
      a = this.md5gg(a, b, c, d, x[i + 5], 5, -701558691);
      d = this.md5gg(d, a, b, c, x[i + 10], 9, 38016083);
      c = this.md5gg(c, d, a, b, x[i + 15], 14, -660478335);
      b = this.md5gg(b, c, d, a, x[i + 4], 20, -405537848);
      a = this.md5gg(a, b, c, d, x[i + 9], 5, 568446438);
      d = this.md5gg(d, a, b, c, x[i + 14], 9, -1019803690);
      c = this.md5gg(c, d, a, b, x[i + 3], 14, -187363961);
      b = this.md5gg(b, c, d, a, x[i + 8], 20, 1163531501);
      a = this.md5gg(a, b, c, d, x[i + 13], 5, -1444681467);
      d = this.md5gg(d, a, b, c, x[i + 2], 9, -51403784);
      c = this.md5gg(c, d, a, b, x[i + 7], 14, 1735328473);
      b = this.md5gg(b, c, d, a, x[i + 12], 20, -1926607734);

      a = this.md5hh(a, b, c, d, x[i + 5], 4, -378558);
      d = this.md5hh(d, a, b, c, x[i + 8], 11, -2022574463);
      c = this.md5hh(c, d, a, b, x[i + 11], 16, 1839030562);
      b = this.md5hh(b, c, d, a, x[i + 14], 23, -35309556);
      a = this.md5hh(a, b, c, d, x[i + 1], 4, -1530992060);
      d = this.md5hh(d, a, b, c, x[i + 4], 11, 1272893353);
      c = this.md5hh(c, d, a, b, x[i + 7], 16, -155497632);
      b = this.md5hh(b, c, d, a, x[i + 10], 23, -1094730640);
      a = this.md5hh(a, b, c, d, x[i + 13], 4, 681279174);
      d = this.md5hh(d, a, b, c, x[i], 11, -358537222);
      c = this.md5hh(c, d, a, b, x[i + 3], 16, -722521979);
      b = this.md5hh(b, c, d, a, x[i + 6], 23, 76029189);
      a = this.md5hh(a, b, c, d, x[i + 9], 4, -640364487);
      d = this.md5hh(d, a, b, c, x[i + 12], 11, -421815835);
      c = this.md5hh(c, d, a, b, x[i + 15], 16, 530742520);
      b = this.md5hh(b, c, d, a, x[i + 2], 23, -995338651);

      a = this.md5ii(a, b, c, d, x[i], 6, -198630844);
      d = this.md5ii(d, a, b, c, x[i + 7], 10, 1126891415);
      c = this.md5ii(c, d, a, b, x[i + 14], 15, -1416354905);
      b = this.md5ii(b, c, d, a, x[i + 5], 21, -57434055);
      a = this.md5ii(a, b, c, d, x[i + 12], 6, 1700485571);
      d = this.md5ii(d, a, b, c, x[i + 3], 10, -1894986606);
      c = this.md5ii(c, d, a, b, x[i + 10], 15, -1051523);
      b = this.md5ii(b, c, d, a, x[i + 1], 21, -2054922799);
      a = this.md5ii(a, b, c, d, x[i + 8], 6, 1873313359);
      d = this.md5ii(d, a, b, c, x[i + 15], 10, -30611744);
      c = this.md5ii(c, d, a, b, x[i + 6], 15, -1560198380);
      b = this.md5ii(b, c, d, a, x[i + 13], 21, 1309151649);
      a = this.md5ii(a, b, c, d, x[i + 4], 6, -145523070);
      d = this.md5ii(d, a, b, c, x[i + 11], 10, -1120210379);
      c = this.md5ii(c, d, a, b, x[i + 2], 15, 718787259);
      b = this.md5ii(b, c, d, a, x[i + 9], 21, -343485551);

      a = this.safeAdd(a, olda);
      b = this.safeAdd(b, oldb);
      c = this.safeAdd(c, oldc);
      d = this.safeAdd(d, oldd);
    }
    return [a, b, c, d];
  },
  binl2rstr: function binl2rstr(input) {
    var i;
    var output = '';
    var length32 = input.length * 32;
    for (i = 0; i < length32; i += 8) {
      output += String.fromCharCode(input[i >> 5] >>> i % 32 & 0xff);
    }
    return output;
  },
  rstr2binl: function rstr2binl(input) {
    var i;
    var output = [];
    output[(input.length >> 2) - 1] = undefined;
    for (i = 0; i < output.length; i += 1) {
      output[i] = 0;
    }
    var length8 = input.length * 8;
    for (i = 0; i < length8; i += 8) {
      output[i >> 5] |= (input.charCodeAt(i / 8) & 0xff) << i % 32;
    }
    return output;
  },
  rstrMD5: function rstrMD5(s) {
    return this.binl2rstr(this.binlMD5(this.rstr2binl(s), s.length * 8));
  },
  rstrHMACMD5: function rstrHMACMD5(key, data) {
    var i;
    var bkey = this.rstr2binl(key);
    var ipad = [];
    var opad = [];
    var hash;
    ipad[15] = opad[15] = undefined;
    if (bkey.length > 16) {
      bkey = this.binlMD5(bkey, key.length * 8);
    }
    for (i = 0; i < 16; i += 1) {
      ipad[i] = bkey[i] ^ 0x36363636;
      opad[i] = bkey[i] ^ 0x5c5c5c5c;
    }
    hash = this.binlMD5(ipad.concat(this.rstr2binl(data)), 512 + data.length * 8);
    return this.binl2rstr(this.binlMD5(opad.concat(hash), 512 + 128));
  },
  rstr2hex: function rstr2hex(input) {
    var hexTab = '0123456789abcdef';
    var output = '';
    var x;
    var i;
    for (i = 0; i < input.length; i += 1) {
      x = input.charCodeAt(i);
      output += hexTab.charAt(x >>> 4 & 0x0f) + hexTab.charAt(x & 0x0f);
    }
    return output;
  },
  str2rstrUTF8: function str2rstrUTF8(input) {
    return unescape(encodeURIComponent(input));
  },
  rawMD5: function rawMD5(s) {
    return this.rstrMD5(this.str2rstrUTF8(s));
  },
  hexMD5: function hexMD5(s) {
    return this.rstr2hex(this.rawMD5(s));
  },
  rawHMACMD5: function rawHMACMD5(k, d) {
    return this.rstrHMACMD5(this.str2rstrUTF8(k), str2rstrUTF8(d));
  },
  hexHMACMD5: function hexHMACMD5(k, d) {
    return this.rstr2hex(this.rawHMACMD5(k, d));
  },

  md5: function md5(string, key, raw) {
    if (!key) {
      if (!raw) {
        return this.hexMD5(string);
      }
      return this.rawMD5(string);
    }
    if (!raw) {
      return this.hexHMACMD5(key, string);
    }
    return this.rawHMACMD5(key, string);
  },
  /**
      * 得到md5加密后的sig参数
      * @param {Object} requestParam 接口参数
      * @param {String} sk签名字符串
      * @param {String} featrue 方法名
      * @return 返回加密后的sig参数
      */
  getSig: function getSig(requestParam, sk, feature, mode) {
    var sig = null;
    var requestArr = [];
    Object.keys(requestParam).sort().forEach(function (key) {
      requestArr.push(key + '=' + requestParam[key]);
    });
    if (feature == 'search') {
      sig = '/ws/place/v1/search?' + requestArr.join('&') + sk;
    }
    if (feature == 'suggest') {
      sig = '/ws/place/v1/suggestion?' + requestArr.join('&') + sk;
    }
    if (feature == 'reverseGeocoder') {
      sig = '/ws/geocoder/v1/?' + requestArr.join('&') + sk;
    }
    if (feature == 'geocoder') {
      sig = '/ws/geocoder/v1/?' + requestArr.join('&') + sk;
    }
    if (feature == 'getCityList') {
      sig = '/ws/district/v1/list?' + requestArr.join('&') + sk;
    }
    if (feature == 'getDistrictByCityId') {
      sig = '/ws/district/v1/getchildren?' + requestArr.join('&') + sk;
    }
    if (feature == 'calculateDistance') {
      sig = '/ws/distance/v1/?' + requestArr.join('&') + sk;
    }
    if (feature == 'direction') {
      sig = '/ws/direction/v1/' + mode + '?' + requestArr.join('&') + sk;
    }
    sig = this.md5(sig);
    return sig;
  },
  /**
      * 得到终点query字符串
      * @param {Array|String} 检索数据
      */
  location2query: function location2query(data) {
    if (typeof data == 'string') {
      return data;
    }
    var query = '';
    for (var i = 0; i < data.length; i++) {
      var d = data[i];
      if (!!query) {
        query += ';';
      }
      if (d.location) {
        query = query + d.location.lat + ',' + d.location.lng;
      }
      if (d.latitude && d.longitude) {
        query = query + d.latitude + ',' + d.longitude;
      }
    }
    return query;
  },

  /**
      * 计算角度
      */
  rad: function rad(d) {
    return d * Math.PI / 180.0;
  },
  /**
      * 处理终点location数组
      * @return 返回终点数组
      */
  getEndLocation: function getEndLocation(location) {
    var to = location.split(';');
    var endLocation = [];
    for (var i = 0; i < to.length; i++) {
      endLocation.push({
        lat: parseFloat(to[i].split(',')[0]),
        lng: parseFloat(to[i].split(',')[1]) });

    }
    return endLocation;
  },

  /**
      * 计算两点间直线距离
      * @param a 表示纬度差
      * @param b 表示经度差
      * @return 返回的是距离，单位m
      */
  getDistance: function getDistance(latFrom, lngFrom, latTo, lngTo) {
    var radLatFrom = this.rad(latFrom);
    var radLatTo = this.rad(latTo);
    var a = radLatFrom - radLatTo;
    var b = this.rad(lngFrom) - this.rad(lngTo);
    var distance = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLatFrom) * Math.cos(radLatTo) * Math.pow(Math.sin(b / 2), 2)));
    distance = distance * EARTH_RADIUS;
    distance = Math.round(distance * 10000) / 10000;
    return parseFloat(distance.toFixed(0));
  },
  /**
      * 使用微信接口进行定位
      */
  getWXLocation: function getWXLocation(success, fail, complete) {
    wx.getLocation({
      type: 'gcj02',
      success: success,
      fail: fail,
      complete: complete });

  },

  /**
      * 获取location参数
      */
  getLocationParam: function getLocationParam(location) {
    if (typeof location == 'string') {
      var locationArr = location.split(',');
      if (locationArr.length === 2) {
        location = {
          latitude: location.split(',')[0],
          longitude: location.split(',')[1] };

      } else {
        location = {};
      }
    }
    return location;
  },

  /**
      * 回调函数默认处理
      */
  polyfillParam: function polyfillParam(param) {
    param.success = param.success || function () {};
    param.fail = param.fail || function () {};
    param.complete = param.complete || function () {};
  },

  /**
      * 验证param对应的key值是否为空
      * 
      * @param {Object} param 接口参数
      * @param {String} key 对应参数的key
      */
  checkParamKeyEmpty: function checkParamKeyEmpty(param, key) {
    if (!param[key]) {
      var errconf = this.buildErrorConfig(ERROR_CONF.PARAM_ERR, ERROR_CONF.PARAM_ERR_MSG + key + '参数格式有误');
      param.fail(errconf);
      param.complete(errconf);
      return true;
    }
    return false;
  },

  /**
      * 验证参数中是否存在检索词keyword
      * 
      * @param {Object} param 接口参数
      */
  checkKeyword: function checkKeyword(param) {
    return !this.checkParamKeyEmpty(param, 'keyword');
  },

  /**
      * 验证location值
      * 
      * @param {Object} param 接口参数
      */
  checkLocation: function checkLocation(param) {
    var location = this.getLocationParam(param.location);
    if (!location || !location.latitude || !location.longitude) {
      var errconf = this.buildErrorConfig(ERROR_CONF.PARAM_ERR, ERROR_CONF.PARAM_ERR_MSG + ' location参数格式有误');
      param.fail(errconf);
      param.complete(errconf);
      return false;
    }
    return true;
  },

  /**
      * 构造错误数据结构
      * @param {Number} errCode 错误码
      * @param {Number} errMsg 错误描述
      */
  buildErrorConfig: function buildErrorConfig(errCode, errMsg) {
    return {
      status: errCode,
      message: errMsg };

  },

  /**
      * 
      * 数据处理函数
      * 根据传入参数不同处理不同数据
      * @param {String} feature 功能名称
      * search 地点搜索
      * suggest关键词提示
      * reverseGeocoder逆地址解析
      * geocoder地址解析
      * getCityList获取城市列表：父集
      * getDistrictByCityId获取区县列表：子集
      * calculateDistance距离计算
      * @param {Object} param 接口参数
      * @param {Object} data 数据
      */
  handleData: function handleData(param, data, feature) {
    if (feature == 'search') {
      var searchResult = data.data;
      var searchSimplify = [];
      for (var i = 0; i < searchResult.length; i++) {
        searchSimplify.push({
          id: searchResult[i].id || null,
          title: searchResult[i].title || null,
          latitude: searchResult[i].location && searchResult[i].location.lat || null,
          longitude: searchResult[i].location && searchResult[i].location.lng || null,
          address: searchResult[i].address || null,
          category: searchResult[i].category || null,
          tel: searchResult[i].tel || null,
          adcode: searchResult[i].ad_info && searchResult[i].ad_info.adcode || null,
          city: searchResult[i].ad_info && searchResult[i].ad_info.city || null,
          district: searchResult[i].ad_info && searchResult[i].ad_info.district || null,
          province: searchResult[i].ad_info && searchResult[i].ad_info.province || null });

      }
      param.success(data, {
        searchResult: searchResult,
        searchSimplify: searchSimplify });

    } else if (feature == 'suggest') {
      var suggestResult = data.data;
      var suggestSimplify = [];
      for (var i = 0; i < suggestResult.length; i++) {
        suggestSimplify.push({
          adcode: suggestResult[i].adcode || null,
          address: suggestResult[i].address || null,
          category: suggestResult[i].category || null,
          city: suggestResult[i].city || null,
          district: suggestResult[i].district || null,
          id: suggestResult[i].id || null,
          latitude: suggestResult[i].location && suggestResult[i].location.lat || null,
          longitude: suggestResult[i].location && suggestResult[i].location.lng || null,
          province: suggestResult[i].province || null,
          title: suggestResult[i].title || null,
          type: suggestResult[i].type || null });

      }
      param.success(data, {
        suggestResult: suggestResult,
        suggestSimplify: suggestSimplify });

    } else if (feature == 'reverseGeocoder') {
      var reverseGeocoderResult = data.result;
      var reverseGeocoderSimplify = {
        address: reverseGeocoderResult.address || null,
        latitude: reverseGeocoderResult.location && reverseGeocoderResult.location.lat || null,
        longitude: reverseGeocoderResult.location && reverseGeocoderResult.location.lng || null,
        adcode: reverseGeocoderResult.ad_info && reverseGeocoderResult.ad_info.adcode || null,
        city: reverseGeocoderResult.address_component && reverseGeocoderResult.address_component.city || null,
        district: reverseGeocoderResult.address_component && reverseGeocoderResult.address_component.district || null,
        nation: reverseGeocoderResult.address_component && reverseGeocoderResult.address_component.nation || null,
        province: reverseGeocoderResult.address_component && reverseGeocoderResult.address_component.province || null,
        street: reverseGeocoderResult.address_component && reverseGeocoderResult.address_component.street || null,
        street_number: reverseGeocoderResult.address_component && reverseGeocoderResult.address_component.street_number || null,
        recommend: reverseGeocoderResult.formatted_addresses && reverseGeocoderResult.formatted_addresses.recommend || null,
        rough: reverseGeocoderResult.formatted_addresses && reverseGeocoderResult.formatted_addresses.rough || null };

      if (reverseGeocoderResult.pois) {//判断是否返回周边poi
        var pois = reverseGeocoderResult.pois;
        var poisSimplify = [];
        for (var i = 0; i < pois.length; i++) {
          poisSimplify.push({
            id: pois[i].id || null,
            title: pois[i].title || null,
            latitude: pois[i].location && pois[i].location.lat || null,
            longitude: pois[i].location && pois[i].location.lng || null,
            address: pois[i].address || null,
            category: pois[i].category || null,
            adcode: pois[i].ad_info && pois[i].ad_info.adcode || null,
            city: pois[i].ad_info && pois[i].ad_info.city || null,
            district: pois[i].ad_info && pois[i].ad_info.district || null,
            province: pois[i].ad_info && pois[i].ad_info.province || null });

        }
        param.success(data, {
          reverseGeocoderResult: reverseGeocoderResult,
          reverseGeocoderSimplify: reverseGeocoderSimplify,
          pois: pois,
          poisSimplify: poisSimplify });

      } else {
        param.success(data, {
          reverseGeocoderResult: reverseGeocoderResult,
          reverseGeocoderSimplify: reverseGeocoderSimplify });

      }
    } else if (feature == 'geocoder') {
      var geocoderResult = data.result;
      var geocoderSimplify = {
        title: geocoderResult.title || null,
        latitude: geocoderResult.location && geocoderResult.location.lat || null,
        longitude: geocoderResult.location && geocoderResult.location.lng || null,
        adcode: geocoderResult.ad_info && geocoderResult.ad_info.adcode || null,
        province: geocoderResult.address_components && geocoderResult.address_components.province || null,
        city: geocoderResult.address_components && geocoderResult.address_components.city || null,
        district: geocoderResult.address_components && geocoderResult.address_components.district || null,
        street: geocoderResult.address_components && geocoderResult.address_components.street || null,
        street_number: geocoderResult.address_components && geocoderResult.address_components.street_number || null,
        level: geocoderResult.level || null };

      param.success(data, {
        geocoderResult: geocoderResult,
        geocoderSimplify: geocoderSimplify });

    } else if (feature == 'getCityList') {
      var provinceResult = data.result[0];
      var cityResult = data.result[1];
      var districtResult = data.result[2];
      param.success(data, {
        provinceResult: provinceResult,
        cityResult: cityResult,
        districtResult: districtResult });

    } else if (feature == 'getDistrictByCityId') {
      var districtByCity = data.result[0];
      param.success(data, districtByCity);
    } else if (feature == 'calculateDistance') {
      var calculateDistanceResult = data.result.elements;
      var distance = [];
      for (var i = 0; i < calculateDistanceResult.length; i++) {
        distance.push(calculateDistanceResult[i].distance);
      }
      param.success(data, {
        calculateDistanceResult: calculateDistanceResult,
        distance: distance });

    } else if (feature == 'direction') {
      var direction = data.result.routes;
      param.success(data, direction);
    } else {
      param.success(data);
    }
  },

  /**
      * 构造微信请求参数，公共属性处理
      * 
      * @param {Object} param 接口参数
      * @param {Object} param 配置项
      * @param {String} feature 方法名
      */
  buildWxRequestConfig: function buildWxRequestConfig(param, options, feature) {
    var that = this;
    options.header = { "content-type": "application/json" };
    options.method = 'GET';
    options.success = function (res) {
      var data = res.data;
      if (data.status === 0) {
        that.handleData(param, data, feature);
      } else {
        param.fail(data);
      }
    };
    options.fail = function (res) {
      res.statusCode = ERROR_CONF.WX_ERR_CODE;
      param.fail(that.buildErrorConfig(ERROR_CONF.WX_ERR_CODE, res.errMsg));
    };
    options.complete = function (res) {
      var statusCode = +res.statusCode;
      switch (statusCode) {
        case ERROR_CONF.WX_ERR_CODE:{
            param.complete(that.buildErrorConfig(ERROR_CONF.WX_ERR_CODE, res.errMsg));
            break;
          }
        case ERROR_CONF.WX_OK_CODE:{
            var data = res.data;
            if (data.status === 0) {
              param.complete(data);
            } else {
              param.complete(that.buildErrorConfig(data.status, data.message));
            }
            break;
          }
        default:{
            param.complete(that.buildErrorConfig(ERROR_CONF.SYSTEM_ERR, ERROR_CONF.SYSTEM_ERR_MSG));
          }}


    };
    return options;
  },

  /**
      * 处理用户参数是否传入坐标进行不同的处理
      */
  locationProcess: function locationProcess(param, locationsuccess, locationfail, locationcomplete) {
    var that = this;
    locationfail = locationfail || function (res) {
      res.statusCode = ERROR_CONF.WX_ERR_CODE;
      param.fail(that.buildErrorConfig(ERROR_CONF.WX_ERR_CODE, res.errMsg));
    };
    locationcomplete = locationcomplete || function (res) {
      if (res.statusCode == ERROR_CONF.WX_ERR_CODE) {
        param.complete(that.buildErrorConfig(ERROR_CONF.WX_ERR_CODE, res.errMsg));
      }
    };
    if (!param.location) {
      that.getWXLocation(locationsuccess, locationfail, locationcomplete);
    } else if (that.checkLocation(param)) {
      var location = Utils.getLocationParam(param.location);
      locationsuccess(location);
    }
  } };var



QQMapWX = /*#__PURE__*/function () {"use strict";

  /**
                                                   * 构造函数
                                                   * 
                                                   * @param {Object} options 接口参数,key 为必选参数
                                                   */
  function QQMapWX(options) {_classCallCheck(this, QQMapWX);
    if (!options.key) {
      throw Error('key值不能为空');
    }
    this.key = options.key;
  }_createClass(QQMapWX, [{ key: "search",

    /**
                                            * POI周边检索
                                            *
                                            * @param {Object} options 接口参数对象
                                            * 
                                            * 参数对象结构可以参考
                                            * @see http://lbs.qq.com/webservice_v1/guide-search.html
                                            */value: function search(
    options) {
      var that = this;
      options = options || {};

      Utils.polyfillParam(options);

      if (!Utils.checkKeyword(options)) {
        return;
      }

      var requestParam = {
        keyword: options.keyword,
        orderby: options.orderby || '_distance',
        page_size: options.page_size || 10,
        page_index: options.page_index || 1,
        output: 'json',
        key: that.key };


      if (options.address_format) {
        requestParam.address_format = options.address_format;
      }

      if (options.filter) {
        requestParam.filter = options.filter;
      }

      var distance = options.distance || "1000";
      var auto_extend = options.auto_extend || 1;
      var region = null;
      var rectangle = null;

      //判断城市限定参数
      if (options.region) {
        region = options.region;
      }

      //矩形限定坐标(暂时只支持字符串格式)
      if (options.rectangle) {
        rectangle = options.rectangle;
      }

      var locationsuccess = function locationsuccess(result) {
        if (region && !rectangle) {
          //城市限定参数拼接
          requestParam.boundary = "region(" + region + "," + auto_extend + "," + result.latitude + "," + result.longitude + ")";
          if (options.sig) {
            requestParam.sig = Utils.getSig(requestParam, options.sig, 'search');
          }
        } else if (rectangle && !region) {
          //矩形搜索
          requestParam.boundary = "rectangle(" + rectangle + ")";
          if (options.sig) {
            requestParam.sig = Utils.getSig(requestParam, options.sig, 'search');
          }
        } else {
          requestParam.boundary = "nearby(" + result.latitude + "," + result.longitude + "," + distance + "," + auto_extend + ")";
          if (options.sig) {
            requestParam.sig = Utils.getSig(requestParam, options.sig, 'search');
          }
        }
        wx.request(Utils.buildWxRequestConfig(options, {
          url: URL_SEARCH,
          data: requestParam },
        'search'));
      };
      Utils.locationProcess(options, locationsuccess);
    } }, { key: "getSuggestion",

    /**
                                  * sug模糊检索
                                  *
                                  * @param {Object} options 接口参数对象
                                  * 
                                  * 参数对象结构可以参考
                                  * http://lbs.qq.com/webservice_v1/guide-suggestion.html
                                  */value: function getSuggestion(
    options) {
      var that = this;
      options = options || {};
      Utils.polyfillParam(options);

      if (!Utils.checkKeyword(options)) {
        return;
      }

      var requestParam = {
        keyword: options.keyword,
        region: options.region || '全国',
        region_fix: options.region_fix || 0,
        policy: options.policy || 0,
        page_size: options.page_size || 10, //控制显示条数
        page_index: options.page_index || 1, //控制页数
        get_subpois: options.get_subpois || 0, //返回子地点
        output: 'json',
        key: that.key };

      //长地址
      if (options.address_format) {
        requestParam.address_format = options.address_format;
      }
      //过滤
      if (options.filter) {
        requestParam.filter = options.filter;
      }
      //排序
      if (options.location) {
        var locationsuccess = function locationsuccess(result) {
          requestParam.location = result.latitude + ',' + result.longitude;
          if (options.sig) {
            requestParam.sig = Utils.getSig(requestParam, options.sig, 'suggest');
          }
          wx.request(Utils.buildWxRequestConfig(options, {
            url: URL_SUGGESTION,
            data: requestParam },
          "suggest"));
        };
        Utils.locationProcess(options, locationsuccess);
      } else {
        if (options.sig) {
          requestParam.sig = Utils.getSig(requestParam, options.sig, 'suggest');
        }
        wx.request(Utils.buildWxRequestConfig(options, {
          url: URL_SUGGESTION,
          data: requestParam },
        "suggest"));
      }
    } }, { key: "reverseGeocoder",

    /**
                                    * 逆地址解析
                                    *
                                    * @param {Object} options 接口参数对象
                                    * 
                                    * 请求参数结构可以参考
                                    * http://lbs.qq.com/webservice_v1/guide-gcoder.html
                                    */value: function reverseGeocoder(
    options) {
      var that = this;
      options = options || {};
      Utils.polyfillParam(options);
      var requestParam = {
        coord_type: options.coord_type || 5,
        get_poi: options.get_poi || 0,
        output: 'json',
        key: that.key };

      if (options.poi_options) {
        requestParam.poi_options = options.poi_options;
      }

      var locationsuccess = function locationsuccess(result) {
        requestParam.location = result.latitude + ',' + result.longitude;
        if (options.sig) {
          requestParam.sig = Utils.getSig(requestParam, options.sig, 'reverseGeocoder');
        }
        wx.request(Utils.buildWxRequestConfig(options, {
          url: URL_GET_GEOCODER,
          data: requestParam },
        'reverseGeocoder'));
      };
      Utils.locationProcess(options, locationsuccess);
    } }, { key: "geocoder",

    /**
                             * 地址解析
                             *
                             * @param {Object} options 接口参数对象
                             * 
                             * 请求参数结构可以参考
                             * http://lbs.qq.com/webservice_v1/guide-geocoder.html
                             */value: function geocoder(
    options) {
      var that = this;
      options = options || {};
      Utils.polyfillParam(options);

      if (Utils.checkParamKeyEmpty(options, 'address')) {
        return;
      }

      var requestParam = {
        address: options.address,
        output: 'json',
        key: that.key };


      //城市限定
      if (options.region) {
        requestParam.region = options.region;
      }

      if (options.sig) {
        requestParam.sig = Utils.getSig(requestParam, options.sig, 'geocoder');
      }

      wx.request(Utils.buildWxRequestConfig(options, {
        url: URL_GET_GEOCODER,
        data: requestParam },
      'geocoder'));
    } }, { key: "getCityList",


    /**
                                * 获取城市列表
                                *
                                * @param {Object} options 接口参数对象
                                * 
                                * 请求参数结构可以参考
                                * http://lbs.qq.com/webservice_v1/guide-region.html
                                */value: function getCityList(
    options) {
      var that = this;
      options = options || {};
      Utils.polyfillParam(options);
      var requestParam = {
        output: 'json',
        key: that.key };


      if (options.sig) {
        requestParam.sig = Utils.getSig(requestParam, options.sig, 'getCityList');
      }

      wx.request(Utils.buildWxRequestConfig(options, {
        url: URL_CITY_LIST,
        data: requestParam },
      'getCityList'));
    } }, { key: "getDistrictByCityId",

    /**
                                        * 获取对应城市ID的区县列表
                                        *
                                        * @param {Object} options 接口参数对象
                                        * 
                                        * 请求参数结构可以参考
                                        * http://lbs.qq.com/webservice_v1/guide-region.html
                                        */value: function getDistrictByCityId(
    options) {
      var that = this;
      options = options || {};
      Utils.polyfillParam(options);

      if (Utils.checkParamKeyEmpty(options, 'id')) {
        return;
      }

      var requestParam = {
        id: options.id || '',
        output: 'json',
        key: that.key };


      if (options.sig) {
        requestParam.sig = Utils.getSig(requestParam, options.sig, 'getDistrictByCityId');
      }

      wx.request(Utils.buildWxRequestConfig(options, {
        url: URL_AREA_LIST,
        data: requestParam },
      'getDistrictByCityId'));
    } }, { key: "calculateDistance",

    /**
                                      * 用于单起点到多终点的路线距离(非直线距离)计算：
                                      * 支持两种距离计算方式：步行和驾车。
                                      * 起点到终点最大限制直线距离10公里。
                                      *
                                      * 新增直线距离计算。
                                      * 
                                      * @param {Object} options 接口参数对象
                                      * 
                                      * 请求参数结构可以参考
                                      * http://lbs.qq.com/webservice_v1/guide-distance.html
                                      */value: function calculateDistance(
    options) {
      var that = this;
      options = options || {};
      Utils.polyfillParam(options);

      if (Utils.checkParamKeyEmpty(options, 'to')) {
        return;
      }

      var requestParam = {
        mode: options.mode || 'walking',
        to: Utils.location2query(options.to),
        output: 'json',
        key: that.key };


      if (options.from) {
        options.location = options.from;
      }

      //计算直线距离
      if (requestParam.mode == 'straight') {
        var locationsuccess = function locationsuccess(result) {
          var locationTo = Utils.getEndLocation(requestParam.to); //处理终点坐标
          var data = {
            message: "query ok",
            result: {
              elements: [] },

            status: 0 };

          for (var i = 0; i < locationTo.length; i++) {
            data.result.elements.push({ //将坐标存入
              distance: Utils.getDistance(result.latitude, result.longitude, locationTo[i].lat, locationTo[i].lng),
              duration: 0,
              from: {
                lat: result.latitude,
                lng: result.longitude },

              to: {
                lat: locationTo[i].lat,
                lng: locationTo[i].lng } });


          }
          var calculateResult = data.result.elements;
          var distanceResult = [];
          for (var i = 0; i < calculateResult.length; i++) {
            distanceResult.push(calculateResult[i].distance);
          }
          return options.success(data, {
            calculateResult: calculateResult,
            distanceResult: distanceResult });

        };

        Utils.locationProcess(options, locationsuccess);
      } else {
        var locationsuccess = function locationsuccess(result) {
          requestParam.from = result.latitude + ',' + result.longitude;
          if (options.sig) {
            requestParam.sig = Utils.getSig(requestParam, options.sig, 'calculateDistance');
          }
          wx.request(Utils.buildWxRequestConfig(options, {
            url: URL_DISTANCE,
            data: requestParam },
          'calculateDistance'));
        };

        Utils.locationProcess(options, locationsuccess);
      }
    } }, { key: "direction",

    /**
                              * 路线规划：
                              * 
                              * @param {Object} options 接口参数对象
                              * 
                              * 请求参数结构可以参考
                              * https://lbs.qq.com/webservice_v1/guide-road.html
                              */value: function direction(
    options) {
      var that = this;
      options = options || {};
      Utils.polyfillParam(options);

      if (Utils.checkParamKeyEmpty(options, 'to')) {
        return;
      }

      var requestParam = {
        output: 'json',
        key: that.key };


      //to格式处理
      if (typeof options.to == 'string') {
        requestParam.to = options.to;
      } else {
        requestParam.to = options.to.latitude + ',' + options.to.longitude;
      }
      //初始化局部请求域名
      var SET_URL_DIRECTION = null;
      //设置默认mode属性
      options.mode = options.mode || MODE.driving;

      //设置请求域名
      SET_URL_DIRECTION = URL_DIRECTION + options.mode;

      if (options.from) {
        options.location = options.from;
      }

      if (options.mode == MODE.driving) {
        if (options.from_poi) {
          requestParam.from_poi = options.from_poi;
        }
        if (options.heading) {
          requestParam.heading = options.heading;
        }
        if (options.speed) {
          requestParam.speed = options.speed;
        }
        if (options.accuracy) {
          requestParam.accuracy = options.accuracy;
        }
        if (options.road_type) {
          requestParam.road_type = options.road_type;
        }
        if (options.to_poi) {
          requestParam.to_poi = options.to_poi;
        }
        if (options.from_track) {
          requestParam.from_track = options.from_track;
        }
        if (options.waypoints) {
          requestParam.waypoints = options.waypoints;
        }
        if (options.policy) {
          requestParam.policy = options.policy;
        }
        if (options.plate_number) {
          requestParam.plate_number = options.plate_number;
        }
      }

      if (options.mode == MODE.transit) {
        if (options.departure_time) {
          requestParam.departure_time = options.departure_time;
        }
        if (options.policy) {
          requestParam.policy = options.policy;
        }
      }

      var locationsuccess = function locationsuccess(result) {
        requestParam.from = result.latitude + ',' + result.longitude;
        if (options.sig) {
          requestParam.sig = Utils.getSig(requestParam, options.sig, 'direction', options.mode);
        }
        wx.request(Utils.buildWxRequestConfig(options, {
          url: SET_URL_DIRECTION,
          data: requestParam },
        'direction'));
      };

      Utils.locationProcess(options, locationsuccess);
    } }]);return QQMapWX;}();
;

module.exports = QQMapWX;

/***/ }),

/***/ 15:
/*!*****************************************************!*\
  !*** D:/lixindom/2020/伊籭商城/beefShop/mixin/mixin.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ 16));
var _qqmapWxJssdk = _interopRequireDefault(__webpack_require__(/*! @/common/js/qqmap-wx-jssdk.js */ 14));

var _request = __webpack_require__(/*! @/common/js/request.js */ 11);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}


var _throttleRunning = false;var _default =
{
  data: function data() {
    return {
      city: '' };

  },
  methods: {
    /**
              * 节流
              * @param {Function} 执行函数
              * @param {Number} delay 延时ms  
              */
    throttle: function throttle(fn) {var delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;
      if (_throttleRunning) {
        return;
      }
      _throttleRunning = true;
      fn();
      setTimeout(function () {
        _throttleRunning = false;
      }, delay);
    },
    log: function log(data) {
      console.log(JSON.parse(JSON.stringify(data)));
    },
    imageOnLoad: function imageOnLoad(data, key) {var _this = this;
      setTimeout(function () {
        _this.$set(data, 'loaded', true);
      }, 80);
    },
    getCartNum: function getCartNum() {var _this2 = this;return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee() {var type, e, res;return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:
                type = 0;if (!
                uni.getStorageSync('uid')) {_context.next = 9;break;}
                if (uni.getStorageSync('open') == 2) {
                  type = 3;
                } else {
                  if (uni.getStorageSync('defaultValue')) {
                    uni.getStorageSync('defaultValue') == 0 ? type = 2 : type = 1;
                  }
                }
                // 1：自提2：外卖3：邮寄
                e = {
                  cmd: 'getCartNumber',
                  uid: uni.getStorageSync('uid'),
                  merchant_id: uni.getStorageSync('merchantId'),
                  type: type };

                console.log(e);_context.next = 7;return (
                  _this2._reqw.post(e));case 7:res = _context.sent;
                if (res.body.number != 0) {
                  uni.setTabBarBadge({
                    index: 2,
                    text: res.body.number + '' });

                } else {
                  uni.removeTabBarBadge({
                    index: 2 });

                }case 9:case "end":return _context.stop();}}}, _callee);}))();

    },
    getUserLocation: function getUserLocation() {
      var point = {};
      return new Promise(function (resolve, reject) {

        uni.getLocation({
          type: 'gcj02',
          success: function success(res) {
            point = res;
            var qqmapsdk = new _qqmapWxJssdk.default({
              key: 'GQZBZ-3CECD-BP443-PBQEY-4R3M6-QMFBO' });

            qqmapsdk.reverseGeocoder({
              location: {
                latitude: res.latitude,
                longitude: res.longitude },

              success: function success(options) {
                this.city = options.result.address_component.city;
                uni.setStorageSync('city', this.city);
                uni.setStorageSync('province', options.result.address_component.province);
                uni.setStorageSync('point', point);
                resolve(point);
              } });

          },
          fail: function fail() {
            resolve();
          } });





















      });

    } } };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 16:
/*!**********************************************************!*\
  !*** ./node_modules/@babel/runtime/regenerator/index.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! regenerator-runtime */ 17);

/***/ }),

/***/ 17:
/*!************************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime-module.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g = (function() {
  return this || (typeof self === "object" && self);
})() || Function("return this")();

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime &&
  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

module.exports = __webpack_require__(/*! ./runtime */ 18);

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch(e) {
    g.regeneratorRuntime = undefined;
  }
}


/***/ }),

/***/ 18:
/*!*****************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // In sloppy mode, unbound `this` refers to the global object, fallback to
  // Function constructor if we're in global strict mode. That is sadly a form
  // of indirect eval which violates Content Security Policy.
  (function() {
    return this || (typeof self === "object" && self);
  })() || Function("return this")()
);


/***/ }),

/***/ 19:
/*!********************************************************!*\
  !*** D:/lixindom/2020/伊籭商城/beefShop/utils/ald-stat.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

!function (t, e) { true ? module.exports = e() : undefined;}(this, function () {function t() {this.concurrency = 4, this.queue = [], this.tasks = [], this.activeCount = 0;var t = this;this.push = function (e) {this.tasks.push(new Promise(function (n, o) {var r = function r() {t.activeCount++, e().then(function (t) {n(t);}).then(function () {t.next();});};t.activeCount < t.concurrency ? r() : t.queue.push(r);}));}, this.all = function () {return Promise.all(this.tasks);}, this.next = function () {t.activeCount--, t.queue.length > 0 && t.queue.shift()();};}function e() {this.request = [], this.updata = !1, this.push = function (t) {if (this.request.length >= 8 && !this.updata && (this.updata = !0, n()), this.request.length >= 10) {var _e = this.request.shift();_e().then(function (t) {}).catch(function (t) {}), this.request.push(t);} else this.request.push(t);}, this.concat = function () {this.request.map(function (t) {wx.Queue.push(t);}), this.request = [];};}function n() {"function" == typeof St && "" === K && St().then(function (t) {28 === t.length && (K = t, wx.setStorageSync("aldstat_op", t));});}function o(t) {this.app = t;}function r(t) {function e(t) {return Object.prototype.toString.call(t);}var n = {};return "Boolean Number String Function Array Date RegExp Object Error Symbol".split(" ").forEach(function (t, e) {n["[object " + t + "]"] = t.toLowerCase();}), function () {return null == t ? t : "object" == typeof t || "function" == typeof t ? n[e.call(t)] || "object" : typeof t;}();}function a(t) {T = x(), F = t, ht = t.scene, this.aldstat = new o(this);}function i(t) {n();var e;if (e = t.scene != ht, ht = t.scene, z = 0, F = t, X = t.query.ald_share_src, Y = t.query.aldsrc || "", Z = t.query.ald_share_src, lt || dt || xt || (W = !1), lt = !1, (0 !== J && Date.now() - J > 3e4 || e) && (dt || (B = x(), Q = Date.now(), vt = 0)), 0 !== J && Date.now() - J < 3e4 && (at = !0), t.query.ald_share_src && "1044" == t.scene && t.shareTicket ? wx.getShareInfo({ shareTicket: t.shareTicket, success: function success(t) {et = t, D("event", "ald_share_click", JSON.stringify(t));} }) : t.query.ald_share_src && D("event", "ald_share_click", 1), "" === nt && wx.getSetting({ withCredentials: !0, success: function success(t) {if (t.authSetting["scope.userInfo"]) {pt && (pt = !1, wx.getUserInfo({ withCredentials: !0, success: function success(t) {var e = v();nt = t, e.ufo = S(t);try {gt = S(t).userInfo.gender;} catch (t) {gt = "";}G = y(t.userInfo.avatarUrl.split("/")), m(e);} }));}} }), O("app", "show"), "" === K) {var _t2 = wx.getAccountInfoSync().miniProgram.appId;wx.login({ success: function success(e) {wx.request({ url: "https://log.aldwx.com/authorize/mini_program_openid", data: { ai: _t2, uuid: $, jc: e.code, reqid: "1" }, success: function success(t) {t.data.code || (K = t.data.data.openid, wx.setStorageSync("aldstat_op", t.data.data.openid));} });}, fail: function fail(t) {} });}}function c() {n(), J = Date.now(), "" === nt && wx.getSetting({ success: function success(t) {t.authSetting["scope.userInfo"] && pt && (pt = !1, wx.getUserInfo({ withCredentials: !0, success: function success(t) {nt = t, G = y(t.userInfo.avatarUrl.split("/"));var e = v();e.ufo = S(t);try {gt = S(t).userInfo.gender;} catch (t) {gt = "";}m(e);} }));} }), O("app", "hide");}function s(t) {tt++, D("event", "ald_error_message", t);}function u(t) {st = t;}function l() {mt = Date.now(), it = H ? this.$mp.page.route : this.route, "" === nt && wx.getSetting({ success: function success(t) {t.authSetting["scope.userInfo"] && pt && (pt = !1, wx.getUserInfo({ withCredentials: !0, success: function success(t) {nt = t, G = y(t.userInfo.avatarUrl.split("/"));var e = v();e.ufo = S(t);try {gt = S(t).userInfo.gender;} catch (t) {gt = "";}m(e);} }));} }), I("page", "show"), at = !1;}function d() {ct = it, vt = Date.now() - mt;}function h() {ct = it, vt = Date.now() - mt;}function f() {D("event", "ald_pulldownrefresh", 1);}function p() {D("event", "ald_reachbottom", 1);}function g(t) {dt = !0;var e = _(t.path),n = {};for (var o in F.query) {"ald_share_src" !== o && "ald_share_op" !== o || (n[o] = F.query[o]);}var r = "";if (r = t.path.indexOf("?") == -1 ? t.path + "?" : t.path.substr(0, t.path.indexOf("?")) + "?", "" !== e) for (var o in e) {n[o] = e[o];}n.ald_share_src ? n.ald_share_src.indexOf($) == -1 && n.ald_share_src.length < 200 && (n.ald_share_src = n.ald_share_src + "," + $) : n.ald_share_src = $, L.useOpen && (n.ald_share_op ? n.ald_share_op.indexOf(K) == -1 && n.ald_share_op.length < 200 && (n.ald_share_op = n.ald_share_op + "," + K) : n.ald_share_op = K);for (var a in n) {a.indexOf("ald") == -1 && (r += a + "=" + n[a] + "&");}return t.path = r + (L.useOpen ? "ald_share_op=" + n.ald_share_op + "&" : "") + "ald_share_src=" + n.ald_share_src, D("event", "ald_share_status", t), t;}function w() {function t() {return Math.floor(65536 * (1 + Math.random())).toString(16).substring(1);}return t() + t() + t() + t() + t() + t() + t() + t();}function m(t) {function e() {return new Promise(function (e, n) {var o = { AldStat: "MiniApp-Stat", se: V || "", op: K || "", img: G };"" === U || (o.ai = U), wx.request({ url: "https://" + C + ".aldwx.com/d.html", data: t, header: o, method: "GET", success: function success(t) {e(200 == t.statusCode ? "" : "status error");}, fail: function fail() {e("fail");} });});}z++, t.at = B, t.uu = $, t.v = R, t.ak = L.app_key.replace(/(\t)|(\s)/g, ""), t.wsr = F, t.ifo = W, t.rq_c = z, t.ls = T, t.te = E, t.et = Date.now(), t.st = Date.now(), t.ge = gt, L.useOpen ? "" === K ? ft.push(e) : (wx.Queue.push(e), ft.concat()) : wx.Queue.push(e);}function v() {var t = {};for (var e in ot) {t[e] = ot[e];}return t;}function y(t) {for (var e = "", n = 0; n < t.length; n++) {t[n].length > e.length && (e = t[n]);}return e;}function x() {return "" + Date.now() + Math.floor(1e7 * Math.random());}function S(t) {var e = {};for (var n in t) {"rawData" != n && "errMsg" != n && (e[n] = t[n]);}return e;}function _(t) {if (t.indexOf("?") == -1) return "";var e = {};return t.split("?")[1].split("&").forEach(function (t) {var n = t.split("=")[1];e[t.split("=")[0]] = n;}), e;}function b(t) {for (var e in t) {if ("object" == typeof t[e] && null !== t[e]) return !0;}return !1;}function O(t, e) {var n = v();n.ev = t, n.life = e, n.ec = tt, n.dr = Date.now() - Q, "show" == e && (n.uo = L.useOpen), Y && (n.qr = Y, n.sr = Y), X && (n.usr = X), m(n);}function I(t, e) {var n = v();n.ev = t, n.life = e, n.pp = it, n.pc = ct, n.dr = Date.now() - Q, (dt || xt) && (n.so = 1), xt = !1, dt = !1, st && "{}" != JSON.stringify(st) && (n.ag = st), Y && (n.qr = Y, n.sr = Y), X && (n.usr = X), at && (n.ps = 1), rt ? n.pdr = vt : (ut = it, rt = !0, n.ifp = rt, n.fp = it, n.pdr = 0), m(n);}function D(t, e, n) {var o = v();o.ev = t, o.tp = e, o.dr = Date.now() - Q, n && (o.ct = n), m(o);}function q(t, e, n) {if (t[e]) {var o = t[e];t[e] = function (t) {n.call(this, t, e), o.call(this, t);};} else t[e] = function (t) {n.call(this, t, e);};}function A(t) {var e = {};for (var n in t) {"onLaunch" !== n && "onShow" !== n && "onHide" !== n && "onError" !== n && (e[n] = t[n]);}return e.onLaunch = function (e) {a.call(this, e), "function" == typeof t.onLaunch && t.onLaunch.call(this, e);}, e.onShow = function (e) {i.call(this, e), t.onShow && "function" == typeof t.onShow && t.onShow.call(this, e);}, e.onHide = function () {c.call(this), t.onHide && "function" == typeof t.onHide && t.onHide.call(this);}, e.onError = function (e) {s.call(this, e), t.onError && "function" == typeof t.onError && t.onError.call(this, e);}, e;}function j(t) {var e = {};for (var n in t) {"onLoad" !== n && "onShow" !== n && "onHide" !== n && "onUnload" !== n && "onPullDownRefresh" !== n && "onReachBottom" !== n && "onShareAppMessage" !== n && (e[n] = t[n]);}return e.onLoad = function (e) {u.call(this, e), "function" == typeof t.onLoad && t.onLoad.call(this, e);}, e.onShow = function (e) {l.call(this), "function" == typeof t.onShow && t.onShow.call(this, e);}, e.onHide = function (e) {d.call(this), "function" == typeof t.onHide && t.onHide.call(this, e);}, e.onUnload = function (e) {h.call(this), "function" == typeof t.onUnload && t.onUnload.call(this, e);}, e.onReachBottom = function (e) {p(), t.onReachBottom && "function" == typeof t.onReachBottom && t.onReachBottom.call(this, e);}, e.onPullDownRefresh = function (e) {f(), t.onPullDownRefresh && "function" == typeof t.onPullDownRefresh && t.onPullDownRefresh.call(this, e);}, t.onShareAppMessage && "function" == typeof t.onShareAppMessage && (e.onShareAppMessage = function (e) {var n = t.onShareAppMessage.call(this, e);return void 0 === n ? (n = {}, n.path = this.route) : void 0 === n.path && (n.path = this.route), g.call(this, n);}), e;}function P(t) {return App(A(t));}function N(t) {return Page(j(t));}function M(t) {return H = !0, A(t);}function k(t) {return j(t);}var L = __webpack_require__(/*! ./ald-stat-conf */ 20);void 0 === wx.Queue && (wx.Queue = new t(), wx.Queue.all()), "" === L.app_key && console.error("请在ald-stat-conf.js文件中填写小程序统计/广告监测平台创建小程序后生成的app_key，请参考接入文档 http://doc.aldwx.com 小程序统计平台-快速接入指南！"), L.useOpen && console.warn("提示：开启了useOpen配置后，如果不上传用户OpendID则不会上报数据，上传方式：http://doc.aldwx.com 小程序统计/广告监测平台-快速接入指南-上传OpenID！");var R = "7.4.0",C = "log",E = "wx",U = function () {return void 0 === wx.getAccountInfoSync ? "" : wx.getAccountInfoSync().miniProgram.appId.split("").map(function (t) {return t.charCodeAt(0) + 9;}).join("-");}(),H = !1,B = x(),T = "",Q = Date.now(),J = 0,V = "",K = function () {var t = "";try {t = wx.getStorageSync("aldstat_op");} catch (t) {}return t;}(),G = "",z = 0,F = "",W = "",$ = function () {var t = "";try {t = wx.getStorageSync("aldstat_uuid");} catch (e) {t = "uuid_getstoragesync";}if (t) W = !1;else {t = w();try {wx.setStorageSync("aldstat_uuid", t), W = !0;} catch (t) {wx.setStorageSync("aldstat_uuid", "uuid_getstoragesync");}}return t;}(),X = "",Y = "",Z = "",tt = 0,et = "",nt = "",ot = {},rt = !1,at = !1,it = "",ct = "",st = "",ut = "",lt = !0,dt = !1,ht = "",ft = new e(),pt = !0,gt = "",wt = ["aldVisit", "aldPayOrder"],mt = 0,vt = 0,yt = [{ name: "scanCode" }, { name: "chooseAddress" }, { name: "chooseImage" }, { name: "previewImage" }, { name: "chooseInvoiceTitle" }, { name: "chooseInvoice" }],xt = !1;!function () {yt.forEach(function (t) {t.fn = wx[t.name];var e = t.name;try {Object.defineProperty(wx, e, { get: function get() {return xt = !0, t.fn;} });} catch (t) {}});}();var St = "";!function () {wx.request({ url: "https://" + C + ".aldwx.com/config/app.json", header: { AldStat: "MiniApp-Stat" }, method: "GET", success: function success(t) {200 === t.statusCode && (R < t.data.version && console.warn("您的SDK不是最新版本，部分功能不可用，请尽快前往 http://tj.aldwx.com/downSDK 升级"), t.data.warn && console.warn(t.data.warn), t.data.error && console.error(t.data.error));} });}(), wx.aldstat = new o("");try {var _t = wx.getSystemInfoSync();ot.br = _t.brand, ot.pm = _t.model, ot.pr = _t.pixelRatio, ot.ww = _t.windowWidth, ot.wh = _t.windowHeight, ot.lang = _t.language, ot.wv = _t.version, ot.wvv = _t.platform, ot.wsdk = _t.SDKVersion, ot.sv = _t.system;} catch (t) {}wx.getNetworkType({ success: function success(t) {ot.nt = t.networkType;} }), wx.getSetting({ success: function success(t) {t.authSetting["scope.userLocation"] ? wx.getLocation({ type: "wgs84", success: function success(t) {ot.lat = t.latitude, ot.lng = t.longitude, ot.spd = t.speed;} }) : L.getLocation && wx.getLocation({ type: "wgs84", success: function success(t) {ot.lat = t.latitude, ot.lng = t.longitude, ot.spd = t.speed;} });} }), o.prototype.sendEvent = function (t, e) {if ("" !== t && "string" == typeof t && t.length <= 255) {if ("string" == typeof e && e.length <= 255) D("event", t, e);else if ("object" == typeof e) {if (JSON.stringify(e).length >= 255) return void console.error("自定义事件参数不能超过255个字符，请参考接入文档 http://doc.aldwx.com 小程序统计平台-快速接入指南-自定义事件！");if (b(e)) return void console.error("事件参数内部只支持Number、String等类型，请参考接入文档 http://doc.aldwx.com 小程序统计平台-快速接入指南-自定义事件！");D("event", t, JSON.stringify(e));} else void 0 === e ? D("event", t, !1) : console.error("事件参数必须为String、Object类型，且参数长度不能超过255个字符，请参考接入文档 http://doc.aldwx.com 小程序统计平台-快速接入指南-自定义事件！");} else console.error("事件名称必须为String类型且不能超过255个字符，请参考接入文档 http://doc.aldwx.com 小程序统计平台-快速接入指南-自定义事件！");}, o.prototype.sendSession = function (t) {if ("" === t || !t) return void console.error("请传入从后台获取的session_key");V = t;var e = v();e.tp = "session", e.ct = "session", e.ev = "event", "" === nt ? wx.getSetting({ success: function success(t) {t.authSetting["scope.userInfo"] ? wx.getUserInfo({ success: function success(t) {e.ufo = S(t);try {gt = S(t).userInfo.gender;} catch (t) {gt = "";}G = y(t.userInfo.avatarUrl.split("/")), "" !== et && (e.gid = et), m(e);} }) : "" !== et && (e.gid = et, m(e));} }) : (e.ufo = nt, "" !== et && (e.gid = et), m(e));}, o.prototype.sendOpenid = function (t) {if ("" === t || !t || 28 !== t.length) return void console.error("OpenID不符合规则，请参考接入文档 http://doc.aldwx.com 小程序统计/广告监测平台-快速接入指南！");K = t, wx.setStorageSync("aldstat_op", t);var e = v();e.tp = "openid", e.ev = "event", e.ct = "openid", m(e);}, o.prototype.setOpenid = function (t) {"function" == typeof t && (St = t, n());};for (var bt = { aldVisit: function aldVisit(t) {if ("[object Object]" !== Object.prototype.toString.call(t)) return void console.error("wx.aldVisit()传参不符合规则，请参考接入文档 http://doc.aldwx.com 小程序统计平台-快速接入指南-智慧零售分析！");var category = t.category,id = t.id,name = t.name;if (!category || 0 !== id && !id || !name) return void console.error("category、id、name为必传字段且数据类型必须符合规则,请参考接入文档 http://doc.aldwx.com 小程序统计平台-快速接入指南-智慧零售分析！");if (function (t, e, n) {return "string" !== r(t) || t.length > 32 ? (console.error("category字段(商品类别)只支持String类型，且长度小于32个字符，请参考接入文档 http://doc.aldwx.com 小程序统计平台-快速接入指南-智慧零售分析！"), !1) : "number" !== r(e) && "string" !== r(e) ? (console.error("id字段(商品唯一id)只支持Number类型和String类型，请参考接入文档 http://doc.aldwx.com 小程序统计平台-快速接入指南-智慧零售分析！"), !1) : !("string" !== r(n) || n.length > 32) || (console.error("name字段(商品名称)只支持String类型，且长度小于32个字符，请参考接入文档 http://doc.aldwx.com 小程序统计平台-快速接入指南-智慧零售分析！"), !1);}(category, id, name)) {D("visit", null, { category: t.category, id: t.id, name: t.name });}}, aldPayOrder: function aldPayOrder(t) {if ("[object Object]" !== Object.prototype.toString.call(t)) return void console.error("wx.aldPayOrder()传参不符合规则，请参考接入文档 http://doc.aldwx.com 小程序统计平台-快速接入指南-智慧零售分析！");var price = t.price,details = t.details;if (0 !== price && !price || !details) return void console.error("price、details为必传字段且数据类型必须符合规则,请参考接入文档 http://doc.aldwx.com 小程序统计平台-快速接入指南-智慧零售分析！");if (function (t, e) {return 1 == t && 1 != t ? (console.error("price字段(付费金额)只支持Number类型和数字字符串，且不能小于0，请参考接入文档 http://doc.aldwx.com 小程序统计平台-快速接入指南-智慧零售分析！"), !1) : (t = Number(t), "number" !== r(t) || t < 0 || isNaN(t) ? (console.error("price字段(付费金额)只支持Number类型和数字字符串，且不能小于0，请参考接入文档 http://doc.aldwx.com 小程序统计平台-快速接入指南-智慧零售分析！"), !1) : !("[object Array]" !== Object.prototype.toString.call(e) || e.length < 1) || (console.error("details字段(订单详细信息)为Array类型，且长度不能小于1，请参考接入文档 http://doc.aldwx.com 小程序统计平台-快速接入指南-智慧零售分析！"), !1));}(price, details)) {for (var e = 0; e < details.length; e++) {if (!function (t) {var amount = t.amount,category = t.category,id = t.id,name = t.name;return 0 == amount ? (console.error("details参数下amount字段值(商品数量)只支持Number类型和数字字符串，且不能小于或等于0，请参考接入文档 http://doc.aldwx.com 小程序统计平台-快速接入指南-智慧零售分析！"), !1) : amount && category && (0 === id || id) && name ? 1 == amount && 1 != amount ? (console.error("details参数下amount字段值(商品数量)只支持Number类型和数字字符串，且不能小于或等于0，请参考接入文档 http://doc.aldwx.com 小程序统计平台-快速接入指南-智慧零售分析！"), !1) : (amount = Number(amount), "number" !== r(amount) || amount <= 0 || isNaN(amount) ? (console.error("details参数下amount字段值(商品数量)只支持Number类型和数字字符串，且不能小于或等于0，请参考接入文档 http://doc.aldwx.com 小程序统计平台-快速接入指南-智慧零售分析！"), !1) : "number" !== r(id) && "string" !== r(id) ? (console.error("id字段(商品唯一id)只支持Number类型和String类型，请参考接入文档 http://doc.aldwx.com 小程序统计平台-快速接入指南-智慧零售分析！"), !1) : "string" !== r(category) || category.length > 32 ? (console.error("details参数下category字段值(商品类别)只支持String类型，且长度小于32个字符，请参考接入文档 http://doc.aldwx.com 小程序统计平台-快速接入指南-智慧零售分析！"), !1) : !("string" !== r(name) || name.length > 32) || (console.error("details参数下name字段值(商品类别)只支持String类型，且长度小于32个字符，请参考接入文档 http://doc.aldwx.com 小程序统计平台-快速接入指南-智慧零售分析！"), !1)) : (console.error("amount、category、id、name为必传字段且数据类型必须符合规则,请参考接入文档 http://doc.aldwx.com 小程序统计平台-快速接入指南-智慧零售分析！"), !1);}(details[e])) return;}D("pay", null, { price: t.price, details: t.details });}} }, Ot = 0; Ot < wt.length; Ot++) {!function (t, e) {Object.defineProperty(wx, t, { value: e, writable: !1, enumerable: !0, configurable: !0 });}(wt[Ot], bt[wt[Ot]]);}return L.plugin ? { App: P, Page: N, MpvueApp: M, MpvuePage: k } : function (t) {!function () {var t = App,e = Page,n = Component;App = function App(e) {q(e, "onLaunch", a), q(e, "onShow", i), q(e, "onHide", c), q(e, "onError", s), t(e);}, Page = function Page(t) {var n = t.onShareAppMessage;q(t, "onLoad", u), q(t, "onUnload", h), q(t, "onShow", l), q(t, "onHide", d), q(t, "onReachBottom", p), q(t, "onPullDownRefresh", f), void 0 !== n && null !== n && (t.onShareAppMessage = function (t) {if (void 0 !== n) {var e = n.call(this, t);return void 0 === e ? (e = {}, e.path = it) : void 0 === e.path && (e.path = it), g(e);}}), e(t);}, Component = function Component(t) {try {var e = t.methods.onShareAppMessage;q(t.methods, "onLoad", u), q(t.methods, "onUnload", h), q(t.methods, "onShow", l), q(t.methods, "onHide", d), q(t.methods, "onReachBottom", p), q(t.methods, "onPullDownRefresh", f), void 0 !== e && null !== e && (t.methods.onShareAppMessage = function (t) {if (void 0 !== e) {var n = e.call(this, t);return void 0 === n ? (n = {}, n.path = it) : void 0 === n.path && (n.path = it), g(n);}}), n(t);} catch (e) {n(t);}};}();}();});

/***/ }),

/***/ 2:
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2020 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      if (vm.$options && vm.$options.__file) { // fixed by xxxxxx
        return ('') + vm.$options.__file
      }
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm && vm.$options.name !== 'PageBody') {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        !vm.$options.isReserved && tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
  Dep.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
  Dep.target = Dep.SharedObject.target;
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      {// fixed by xxxxxx 微信小程序使用 plugins 之后，数组方法被直接挂载到了数组对象上，需要执行 copyAugment 逻辑
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.SharedObject.target) { // fixed by xxxxxx
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

// fixed by xxxxxx (mp properties)
function extractPropertiesFromVNodeData(data, Ctor, res, context) {
  var propOptions = Ctor.options.mpOptions && Ctor.options.mpOptions.properties;
  if (isUndef(propOptions)) {
    return res
  }
  var externalClasses = Ctor.options.mpOptions.externalClasses || [];
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      var result = checkProp(res, props, key, altKey, true) ||
          checkProp(res, attrs, key, altKey, false);
      // externalClass
      if (
        result &&
        res[key] &&
        externalClasses.indexOf(altKey) !== -1 &&
        context[camelize(res[key])]
      ) {
        // 赋值 externalClass 真正的值(模板里 externalClass 的值可能是字符串)
        res[key] = context[camelize(res[key])];
      }
    }
  }
  return res
}

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag,
  context// fixed by xxxxxx
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    // fixed by xxxxxx
    return extractPropertiesFromVNodeData(data, Ctor, {}, context)
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  // fixed by xxxxxx
  return extractPropertiesFromVNodeData(data, Ctor, res, context)
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      // fixed by xxxxxx 临时 hack 掉 uni-app 中的异步 name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i, i, i); // fixed by xxxxxx
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i, i, i); // fixed by xxxxxx
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length, i++, i)); // fixed by xxxxxx
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i, i); // fixed by xxxxxx
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    // fixed by xxxxxx app-plus scopedSlot
    nodes = scopedSlotFn(props, this, props._i) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      callHook(componentInstance, 'onServiceCreated');
      callHook(componentInstance, 'onServiceAttached');
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag, context); // fixed by xxxxxx

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ( true && isDef(data) && isDef(data.nativeOn)) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }
  
  // fixed by xxxxxx update properties(mp runtime)
  vm._$updateProperties && vm._$updateProperties(vm);
  
  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu'){//百度 observer 在 setData callback 之后触发，直接忽略该 warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
            if(
                key === 'value' && 
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return  
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.SharedObject.target) {// fixed by xxxxxx
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    !vm._$fallback && initInjections(vm); // resolve injections before data/props  
    initState(vm);
    !vm._$fallback && initProvide(vm); // resolve provide after data/props
    !vm._$fallback && callHook(vm, 'created');      

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.11';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    if (currentValue != pre[key]) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"VUE_APP_NAME":"伊赛新零售","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"VUE_APP_NAME":"伊赛新零售","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"VUE_APP_NAME":"伊赛新零售","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function cloneWithData(vm) {
  // 确保当前 vm 所有数据被同步
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);

  // vue-composition-api
  var compositionApiState = vm.__composition_api_state__ || vm.__secret_vfa_state__;
  var rawBindings = compositionApiState && compositionApiState.rawBindings;
  if (rawBindings) {
    Object.keys(rawBindings).forEach(function (key) {
      ret[key] = vm[key];
    });
  }

  //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
      mpData[key] = mpInstance.data[key];
    });
    var diffData = this.$shouldDiffData === false ? data : diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"VUE_APP_NAME":"伊赛新零售","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']差量更新',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  
  !vm._$fallback && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

  Vue.config.errorHandler = function(err, vm, info) {
    Vue.util.warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
    console.error(err);
    /* eslint-disable no-undef */
    var app = getApp();
    if (app && app.onError) {
      app.onError(err);
    }
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      this.$scope['triggerEvent'](event, {
        __args__: toArray(arguments, 1)
      });
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope && this.$scope[method]) {
        return this.$scope[method](args)
      }
      // mp-alipay
      if (typeof my === 'undefined') {
        return
      }
      if (method === 'createSelectorQuery') {
        /* eslint-disable no-undef */
        return my.createSelectorQuery(args)
      } else if (method === 'createIntersectionObserver') {
        /* eslint-disable no-undef */
        return my.createIntersectionObserver(args)
      }
      // TODO mp-alipay 暂不支持 selectAllComponents,selectComponent
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook, args);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO 暂不考虑 string
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    } else if (typeof val === 'number') {
      ret = new Array(val);
      for (i = 0, l = val; i < l; i++) {
        // 第一个参数暂时仍和小程序一致
        ret[i] = iteratee(i, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onPageNotFound',
    'onThemeChange',
    'onError',
    'onUnhandledRejection',
    //Page
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onAddToFavorites',
    'onShareTimeline',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 3)))

/***/ }),

/***/ 20:
/*!*************************************************************!*\
  !*** D:/lixindom/2020/伊籭商城/beefShop/utils/ald-stat-conf.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// 当前为微信小程序SDK，版本号V7.4.0
// 具体配置项填写方式可参考doc.aldwx.com-小程序统计平台或广告监测平台-快速接入指南
exports.app_key = "e8b4725d6e26aa442e9438ee03214d76"; // 在此处填写小程序统计/广告监测平台创建小程序后生成的app_key。必填项
exports.plugin = false; // 您的小程序中是否使用了插件。根据是否启用插件会有不同的接入方式，请参考文档。默认不更改
exports.useOpen = false; // 开启OpenID上报选项，需要额外进行配置，具体参考文档。默认不更改

/***/ }),

/***/ 248:
/*!*********************************************************************************!*\
  !*** D:/lixindom/2020/伊籭商城/beefShop/components/jyf-parser/libs/MpHtmlParser.js ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(uni) {function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;} /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               * html 解析器
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               * @tutorial https://github.com/jin-yufeng/Parser
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               * @version 20200513
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               * @author JinYufeng
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               * @listens MIT
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               */
var cfg = __webpack_require__(/*! ./config.js */ 249),
blankChar = cfg.blankChar,
CssHandler = __webpack_require__(/*! ./CssHandler.js */ 250),
windowWidth = uni.getSystemInfoSync().windowWidth;
var emoji;var
MpHtmlParser = /*#__PURE__*/function () {"use strict";
  function MpHtmlParser(data) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};_classCallCheck(this, MpHtmlParser);
    this.attrs = {};
    this.CssHandler = new CssHandler(options.tagStyle, windowWidth);
    this.data = data;
    this.domain = options.domain;
    this.DOM = [];
    this.i = this.start = this.audioNum = this.imgNum = this.videoNum = 0;
    options.prot = (this.domain || '').includes('://') ? this.domain.split('://')[0] : 'http';
    this.options = options;
    this.state = this.Text;
    this.STACK = [];
  }_createClass(MpHtmlParser, [{ key: "parse", value: function parse()
    {
      if (emoji) this.data = emoji.parseEmoji(this.data);
      for (var c; c = this.data[this.i]; this.i++) {
        this.state(c);}
      if (this.state == this.Text) this.setText();
      while (this.STACK.length) {this.popNode(this.STACK.pop());}
      if (this.DOM.length) {
        this.DOM[0].PoweredBy = 'Parser';
        if (this.title) this.DOM[0].title = this.title;
      }
      return this.DOM;
    }
    // 设置属性
  }, { key: "setAttr", value: function setAttr() {
      var name = this.attrName.toLowerCase();
      if (cfg.trustAttrs[name]) {
        var val = this.attrVal;
        if (val) {
          if (name == 'src') this.attrs[name] = this.getUrl(this.decode(val, 'amp'));else
          if (name == 'href' || name == 'style') this.attrs[name] = this.decode(val, 'amp');else
          this.attrs[name] = val;
        } else if (cfg.boolAttrs[name]) this.attrs[name] = 'T';
      }
      this.attrVal = '';
      while (blankChar[this.data[this.i]]) {this.i++;}
      if (this.isClose()) this.setNode();else
      {
        this.start = this.i;
        this.state = this.AttrName;
      }
    }
    // 设置文本节点
  }, { key: "setText", value: function setText() {
      var back,text = this.section();
      if (!text) return;
      text = cfg.onText && cfg.onText(text, function () {return back = true;}) || text;
      if (back) {
        this.data = this.data.substr(0, this.start) + text + this.data.substr(this.i);
        var j = this.start + text.length;
        for (this.i = this.start; this.i < j; this.i++) {this.state(this.data[this.i]);}
        return;
      }
      if (!this.pre) {
        // 合并空白符
        var tmp = [];
        for (var i = text.length, c; c = text[--i];) {
          if (!blankChar[c] || !blankChar[tmp[0]] && (c = ' ')) tmp.unshift(c);}
        text = tmp.join('');
      }
      this.siblings().push({
        type: 'text',
        text: this.decode(text) });

    }
    // 设置元素节点
  }, { key: "setNode", value: function setNode() {
      var node = {
        name: this.tagName.toLowerCase(),
        attrs: this.attrs },

      close = cfg.selfClosingTags[node.name];
      this.attrs = {};
      if (!cfg.ignoreTags[node.name]) {
        this.matchAttr(node);
        if (!close) {
          node.children = [];
          if (node.name == 'pre' && cfg.highlight) {
            this.remove(node);
            this.pre = node.pre = true;
          }
          this.siblings().push(node);
          this.STACK.push(node);
        } else if (!cfg.filter || cfg.filter(node, this) != false)
        this.siblings().push(node);
      } else {
        if (!close) this.remove(node);else
        if (node.name == 'source') {
          var parent = this.parent();
          if (parent && (parent.name == 'video' || parent.name == 'audio') && node.attrs.src)
          parent.attrs.source.push(node.attrs.src);
        } else if (node.name == 'base' && !this.domain) this.domain = node.attrs.href;
      }
      if (this.data[this.i] == '/') this.i++;
      this.start = this.i + 1;
      this.state = this.Text;
    }
    // 移除标签
  }, { key: "remove", value: function remove(node) {var _this = this;
      var name = node.name,
      j = this.i;
      // 处理 svg
      var handleSvg = function handleSvg() {
        var src = _this.data.substring(j, _this.i + 1);
        if (!node.attrs.xmlns) src = ' xmlns="http://www.w3.org/2000/svg"' + src;
        var i = j;
        while (_this.data[j] != '<') {j--;}
        src = _this.data.substring(j, i) + src;
        var parent = _this.parent();
        if (node.attrs.width == '100%' && parent && (parent.attrs.style || '').includes('inline'))
        parent.attrs.style = 'width:300px;max-width:100%;' + parent.attrs.style;
        _this.siblings().push({
          name: 'img',
          attrs: {
            src: 'data:image/svg+xml;utf8,' + src.replace(/#/g, '%23'),
            ignore: 'T' } });


      };
      if (node.name == 'svg' && this.data[j] == '/') return handleSvg(this.i++);
      while (1) {
        if ((this.i = this.data.indexOf('</', this.i + 1)) == -1) {
          if (name == 'pre' || name == 'svg') this.i = j;else
          this.i = this.data.length;
          return;
        }
        this.start = this.i += 2;
        while (!blankChar[this.data[this.i]] && !this.isClose()) {this.i++;}
        if (this.section().toLowerCase() == name) {
          // 代码块高亮
          if (name == 'pre') {
            this.data = this.data.substr(0, j + 1) + cfg.highlight(this.data.substring(j + 1, this.i - 5), node.attrs) +
            this.data.substr(this.i - 5);
            return this.i = j;
          } else if (name == 'style')
          this.CssHandler.getStyle(this.data.substring(j + 1, this.i - 7));else
          if (name == 'title')
          this.title = this.data.substring(j + 1, this.i - 7);
          if ((this.i = this.data.indexOf('>', this.i)) == -1) this.i = this.data.length;
          if (name == 'svg') handleSvg();
          return;
        }
      }
    }
    // 处理属性
  }, { key: "matchAttr", value: function matchAttr(node) {
      var attrs = node.attrs,
      style = this.CssHandler.match(node.name, attrs, node) + (attrs.style || ''),
      styleObj = {};
      if (attrs.id) {
        if (this.options.compress & 1) attrs.id = void 0;else
        if (this.options.useAnchor) this.bubble();
      }
      if (this.options.compress & 2 && attrs.class) attrs.class = void 0;
      switch (node.name) {
        case 'a':
        case 'ad':
          this.bubble();
          break;






        case 'font':
          if (attrs.color) {
            styleObj['color'] = attrs.color;
            attrs.color = void 0;
          }
          if (attrs.face) {
            styleObj['font-family'] = attrs.face;
            attrs.face = void 0;
          }
          if (attrs.size) {
            var size = parseInt(attrs.size);
            if (size < 1) size = 1;else
            if (size > 7) size = 7;
            var map = ['xx-small', 'x-small', 'small', 'medium', 'large', 'x-large', 'xx-large'];
            styleObj['font-size'] = map[size - 1];
            attrs.size = void 0;
          }
          break;
        case 'video':
        case 'audio':
          if (!attrs.id) attrs.id = node.name + ++this["".concat(node.name, "Num")];else
          this["".concat(node.name, "Num")]++;
          if (node.name == 'video') {
            if (this.videoNum > 3)
            node.lazyLoad = 1;
            if (attrs.width) {
              styleObj.width = parseFloat(attrs.width) + (attrs.width.includes('%') ? '%' : 'px');
              attrs.width = void 0;
            }
            if (attrs.height) {
              styleObj.height = parseFloat(attrs.height) + (attrs.height.includes('%') ? '%' : 'px');
              attrs.height = void 0;
            }
          }
          attrs.source = [];
          if (attrs.src) attrs.source.push(attrs.src);
          if (!attrs.controls && !attrs.autoplay)
          console.warn("\u5B58\u5728\u6CA1\u6709 controls \u5C5E\u6027\u7684 ".concat(node.name, " \u6807\u7B7E\uFF0C\u53EF\u80FD\u5BFC\u81F4\u65E0\u6CD5\u64AD\u653E"), node);
          this.bubble();
          break;
        case 'td':
        case 'th':
          if (attrs.colspan || attrs.rowspan)
          for (var k = this.STACK.length, item; item = this.STACK[--k];) {
            if (item.name == 'table') {
              item.c = void 0;
              break;
            }}}

      if (attrs.align) {
        styleObj['text-align'] = attrs.align;
        attrs.align = void 0;
      }
      // 压缩 style
      var styles = style.split(';');
      style = '';
      for (var i = 0, len = styles.length; i < len; i++) {
        var info = styles[i].split(':');
        if (info.length < 2) continue;
        var _key = info[0].trim().toLowerCase(),
        _value = info.slice(1).join(':').trim();
        if (_value.includes('-webkit') || _value.includes('-moz') || _value.includes('-ms') || _value.includes('-o') || _value.
        includes(
        'safe'))
        style += ";".concat(_key, ":").concat(_value);else
        if (!styleObj[_key] || _value.includes('import') || !styleObj[_key].includes('import'))
        styleObj[_key] = _value;
      }
      if (node.name == 'img') {
        if (attrs['data-src']) {
          attrs.src = attrs.src || attrs['data-src'];
          attrs['data-src'] = void 0;
        }
        if (attrs.src && !attrs.ignore) {
          if (this.bubble())
          attrs.i = (this.imgNum++).toString();else
          attrs.ignore = 'T';
        }
        if (attrs.ignore) styleObj['max-width'] = '100%';
        var width;
        if (styleObj.width) width = styleObj.width;else
        if (attrs.width) width = attrs.width.includes('%') ? attrs.width : attrs.width + 'px';
        if (width) {
          styleObj.width = width;
          attrs.width = '100%';
          if (parseInt(width) > windowWidth) {
            styleObj.height = '';
            if (attrs.height) attrs.height = void 0;
          }
        }
        if (styleObj.height) {
          attrs.height = styleObj.height;
          styleObj.height = '';
        } else if (attrs.height && !attrs.height.includes('%'))
        attrs.height += 'px';
      }
      for (var key in styleObj) {
        var value = styleObj[key];
        if (key.includes('flex') || key == 'order' || key == 'self-align') node.c = 1;
        // 填充链接
        if (value.includes('url')) {
          var j = value.indexOf('(');
          if (j++ != -1) {
            while (value[j] == '"' || value[j] == "'" || blankChar[value[j]]) {j++;}
            value = value.substr(0, j) + this.getUrl(value.substr(j));
          }
        }
        // 转换 rpx
        else if (value.includes('rpx'))
          value = value.replace(/[0-9.]+\s*rpx/g, function ($) {return parseFloat($) * windowWidth / 750 + 'px';});else
          if (key == 'white-space' && value.includes('pre'))
          this.pre = node.pre = true;
        style += ";".concat(key, ":").concat(value);
      }
      style = style.substr(1);
      if (style) attrs.style = style;
    }
    // 节点出栈处理
  }, { key: "popNode", value: function popNode(node) {
      // 空白符处理
      if (node.pre) {
        node.pre = this.pre = void 0;
        for (var i = this.STACK.length; i--;) {
          if (this.STACK[i].pre)
          this.pre = true;}
      }
      var siblings = this.siblings(),
      len = siblings.length,
      childs = node.children;
      if (node.name == 'head' || cfg.filter && cfg.filter(node, this) == false)
      return siblings.pop();
      var attrs = node.attrs;
      // 替换一些标签名
      if (cfg.blockTags[node.name]) node.name = 'div';else
      if (!cfg.trustTags[node.name]) node.name = 'span';
      // 去除块标签前后空串
      if (node.name == 'div' || node.name == 'p' || node.name[0] == 't') {
        if (len > 1 && siblings[len - 2].text == ' ')
        siblings.splice(--len - 1, 1);
        if (childs.length && childs[childs.length - 1].text == ' ')
        childs.pop();
      }
      // 处理列表
      if (node.c && (node.name == 'ul' || node.name == 'ol')) {
        if ((node.attrs.style || '').includes('list-style:none')) {
          for (var _i = 0, child; child = childs[_i++];) {
            if (child.name == 'li')
            child.name = 'div';}
        } else if (node.name == 'ul') {
          var floor = 1;
          for (var _i2 = this.STACK.length; _i2--;) {
            if (this.STACK[_i2].name == 'ul') floor++;}
          if (floor != 1)
          for (var _i3 = childs.length; _i3--;) {
            childs[_i3].floor = floor;}
        } else {
          for (var _i4 = 0, num = 1, _child; _child = childs[_i4++];) {
            if (_child.name == 'li') {
              _child.type = 'ol';
              _child.num = function (num, type) {
                if (type == 'a') return String.fromCharCode(97 + (num - 1) % 26);
                if (type == 'A') return String.fromCharCode(65 + (num - 1) % 26);
                if (type == 'i' || type == 'I') {
                  num = (num - 1) % 99 + 1;
                  var one = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX'],
                  ten = ['X', 'XX', 'XXX', 'XL', 'L', 'LX', 'LXX', 'LXXX', 'XC'],
                  res = (ten[Math.floor(num / 10) - 1] || '') + (one[num % 10 - 1] || '');
                  if (type == 'i') return res.toLowerCase();
                  return res;
                }
                return num;
              }(num++, attrs.type) + '.';
            }}
        }
      }
      // 处理表格的边框
      if (node.name == 'table') {
        var padding = attrs.cellpadding,
        spacing = attrs.cellspacing,
        border = attrs.border;
        if (node.c) {
          this.bubble();
          if (!padding) padding = 2;
          if (!spacing) spacing = 2;
        }
        if (border) attrs.style = "border:".concat(border, "px solid gray;").concat(attrs.style || '');
        if (spacing) attrs.style = "border-spacing:".concat(spacing, "px;").concat(attrs.style || '');
        if (border || padding)
        (function f(ns) {
          for (var i = 0, n; n = ns[i]; i++) {
            if (n.name == 'th' || n.name == 'td') {
              if (border) n.attrs.style = "border:".concat(border, "px solid gray;").concat(n.attrs.style);
              if (padding) n.attrs.style = "padding:".concat(padding, "px;").concat(n.attrs.style);
            } else f(n.children || []);
          }
        })(childs);
        if (this.options.autoscroll) {
          var table = Object.assign({}, node);
          node.name = 'div';
          node.attrs = {
            style: 'overflow:scroll' };

          node.children = [table];
        }
      }
      this.CssHandler.pop && this.CssHandler.pop(node);
      // 自动压缩
      if (node.name == 'div' && !Object.keys(attrs).length && childs.length == 1 && childs[0].name == 'div')
      siblings[len - 1] = childs[0];
    }
    // 工具函数
  }, { key: "bubble", value: function bubble() {
      for (var i = this.STACK.length, item; item = this.STACK[--i];) {
        if (cfg.richOnlyTags[item.name]) {
          if (item.name == 'table' && !Object.hasOwnProperty.call(item, 'c')) item.c = 1;
          return false;
        }
        item.c = 1;
      }
      return true;
    } }, { key: "decode", value: function decode(
    val, amp) {
      var i = -1,
      j,en;
      while (1) {
        if ((i = val.indexOf('&', i + 1)) == -1) break;
        if ((j = val.indexOf(';', i + 2)) == -1) break;
        if (val[i + 1] == '#') {
          en = parseInt((val[i + 2] == 'x' ? '0' : '') + val.substring(i + 2, j));
          if (!isNaN(en)) val = val.substr(0, i) + String.fromCharCode(en) + val.substr(j + 1);
        } else {
          en = val.substring(i + 1, j);
          if (cfg.entities[en] || en == amp)
          val = val.substr(0, i) + (cfg.entities[en] || '&') + val.substr(j + 1);
        }
      }
      return val;
    } }, { key: "getUrl", value: function getUrl(
    url) {
      if (url[0] == '/') {
        if (url[1] == '/') url = this.options.prot + ':' + url;else
        if (this.domain) url = this.domain + url;
      } else if (this.domain && url.indexOf('data:') != 0 && !url.includes('://'))
      url = this.domain + '/' + url;
      return url;
    } }, { key: "isClose", value: function isClose()
    {
      return this.data[this.i] == '>' || this.data[this.i] == '/' && this.data[this.i + 1] == '>';
    } }, { key: "section", value: function section()
    {
      return this.data.substring(this.start, this.i);
    } }, { key: "parent", value: function parent()
    {
      return this.STACK[this.STACK.length - 1];
    } }, { key: "siblings", value: function siblings()
    {
      return this.STACK.length ? this.parent().children : this.DOM;
    }
    // 状态机
  }, { key: "Text", value: function Text(c) {
      if (c == '<') {
        var next = this.data[this.i + 1],
        isLetter = function isLetter(c) {return c >= 'a' && c <= 'z' || c >= 'A' && c <= 'Z';};
        if (isLetter(next)) {
          this.setText();
          this.start = this.i + 1;
          this.state = this.TagName;
        } else if (next == '/') {
          this.setText();
          if (isLetter(this.data[++this.i + 1])) {
            this.start = this.i + 1;
            this.state = this.EndTag;
          } else
          this.Comment();
        } else if (next == '!') {
          this.setText();
          this.Comment();
        }
      }
    } }, { key: "Comment", value: function Comment()
    {
      var key;
      if (this.data.substring(this.i + 2, this.i + 4) == '--') key = '-->';else
      if (this.data.substring(this.i + 2, this.i + 9) == '[CDATA[') key = ']]>';else
      key = '>';
      if ((this.i = this.data.indexOf(key, this.i + 2)) == -1) this.i = this.data.length;else
      this.i += key.length - 1;
      this.start = this.i + 1;
      this.state = this.Text;
    } }, { key: "TagName", value: function TagName(
    c) {
      if (blankChar[c]) {
        this.tagName = this.section();
        while (blankChar[this.data[this.i]]) {this.i++;}
        if (this.isClose()) this.setNode();else
        {
          this.start = this.i;
          this.state = this.AttrName;
        }
      } else if (this.isClose()) {
        this.tagName = this.section();
        this.setNode();
      }
    } }, { key: "AttrName", value: function AttrName(
    c) {
      var blank = blankChar[c];
      if (blank) {
        this.attrName = this.section();
        c = this.data[this.i];
      }
      if (c == '=') {
        if (!blank) this.attrName = this.section();
        while (blankChar[this.data[++this.i]]) {;}
        this.start = this.i--;
        this.state = this.AttrValue;
      } else if (blank) this.setAttr();else
      if (this.isClose()) {
        this.attrName = this.section();
        this.setAttr();
      }
    } }, { key: "AttrValue", value: function AttrValue(
    c) {
      if (c == '"' || c == "'") {
        this.start++;
        if ((this.i = this.data.indexOf(c, this.i + 1)) == -1) return this.i = this.data.length;
        this.attrVal = this.section();
        this.i++;
      } else {
        for (; !blankChar[this.data[this.i]] && !this.isClose(); this.i++) {;}
        this.attrVal = this.section();
      }
      this.setAttr();
    } }, { key: "EndTag", value: function EndTag(
    c) {
      if (blankChar[c] || c == '>' || c == '/') {
        var name = this.section().toLowerCase();
        for (var i = this.STACK.length; i--;) {
          if (this.STACK[i].name == name) break;}
        if (i != -1) {
          var node;
          while ((node = this.STACK.pop()).name != name) {;}
          this.popNode(node);
        } else if (name == 'p' || name == 'br')
        this.siblings().push({
          name: name,
          attrs: {} });

        this.i = this.data.indexOf('>', this.i);
        this.start = this.i + 1;
        if (this.i == -1) this.i = this.data.length;else
        this.state = this.Text;
      }
    } }]);return MpHtmlParser;}();

module.exports = MpHtmlParser;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 249:
/*!***************************************************************************!*\
  !*** D:/lixindom/2020/伊籭商城/beefShop/components/jyf-parser/libs/config.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* 配置文件 */

var canIUse = wx.canIUse('editor'); // 高基础库标识，用于兼容

module.exports = {
  // 过滤器函数
  filter: null,
  // 代码高亮函数
  highlight: null,
  // 文本处理函数
  onText: null,
  // 实体编码列表
  entities: {
    quot: '"',
    apos: "'",
    semi: ';',
    nbsp: '\xA0',
    ensp: "\u2002",
    emsp: "\u2003",
    ndash: '–',
    mdash: '—',
    middot: '·',
    lsquo: '‘',
    rsquo: '’',
    ldquo: '“',
    rdquo: '”',
    bull: '•',
    hellip: '…' },

  blankChar: makeMap(' ,\xA0,\t,\r,\n,\f'),
  // 块级标签，将被转为 div
  blockTags: makeMap('address,article,aside,body,caption,center,cite,footer,header,html,nav,section' + (

  canIUse ? '' :

  ',pre')),
  // 将被移除的标签
  ignoreTags: makeMap(
  'area,base,basefont,canvas,command,frame,input,isindex,keygen,link,map,meta,param,script,source,style,svg,textarea,title,track,use,wbr' + (

  canIUse ? ',rp' : '') +


  ',embed,iframe'),


  // 只能被 rich-text 显示的标签
  richOnlyTags: makeMap('a,colgroup,fieldset,legend,picture,table' + (

  canIUse ? ',bdi,bdo,caption,rt,ruby' : '')),


  // 自闭合的标签
  selfClosingTags: makeMap(
  'area,base,basefont,br,col,circle,ellipse,embed,frame,hr,img,input,isindex,keygen,line,link,meta,param,path,polygon,rect,source,track,use,wbr'),

  // 信任的属性
  trustAttrs: makeMap(
  'align,alt,app-id,author,autoplay,border,cellpadding,cellspacing,class,color,colspan,controls,data-src,dir,face,height,href,id,ignore,loop,media,muted,name,path,poster,rowspan,size,span,src,start,style,type,unit-id,width,xmlns'),

  // bool 型的属性
  boolAttrs: makeMap('autoplay,controls,ignore,loop,muted'),
  // 信任的标签
  trustTags: makeMap(
  'a,abbr,ad,audio,b,blockquote,br,code,col,colgroup,dd,del,dl,dt,div,em,fieldset,h1,h2,h3,h4,h5,h6,hr,i,img,ins,label,legend,li,ol,p,q,source,span,strong,sub,sup,table,tbody,td,tfoot,th,thead,tr,title,ul,video' + (

  canIUse ? ',bdi,bdo,caption,pre,rt,ruby' : '')),





  // 默认的标签样式
  userAgentStyles: {
    address: 'font-style:italic',
    big: 'display:inline;font-size:1.2em',
    blockquote: 'background-color:#f6f6f6;border-left:3px solid #dbdbdb;color:#6c6c6c;padding:5px 0 5px 10px',
    caption: 'display:table-caption;text-align:center',
    center: 'text-align:center',
    cite: 'font-style:italic',
    dd: 'margin-left:40px',
    mark: 'background-color:yellow',
    pre: 'font-family:monospace;white-space:pre;overflow:scroll',
    s: 'text-decoration:line-through',
    small: 'display:inline;font-size:0.8em',
    u: 'text-decoration:underline' } };



function makeMap(str) {
  var map = {},
  list = str.split(',');
  for (var i = list.length; i--;) {
    map[list[i]] = true;}
  return map;
}

/***/ }),

/***/ 250:
/*!*******************************************************************************!*\
  !*** D:/lixindom/2020/伊籭商城/beefShop/components/jyf-parser/libs/CssHandler.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}var cfg = __webpack_require__(/*! ./config.js */ 249),
isLetter = function isLetter(c) {return c >= 'a' && c <= 'z' || c >= 'A' && c <= 'Z';};var
CssHandler = /*#__PURE__*/function () {"use strict";
  function CssHandler(tagStyle) {_classCallCheck(this, CssHandler);
    var styles = Object.assign({}, cfg.userAgentStyles);
    for (var item in tagStyle) {
      styles[item] = (styles[item] ? styles[item] + ';' : '') + tagStyle[item];}
    this.styles = styles;
  }_createClass(CssHandler, [{ key: "getStyle", value: function getStyle(
    data) {
      this.styles = new CssParser(data, this.styles).parse();
    } }, { key: "match", value: function match(
    name, attrs) {
      var tmp,matched = (tmp = this.styles[name]) ? tmp + ';' : '';
      if (attrs.class) {
        var items = attrs.class.split(' ');
        for (var i = 0, item; item = items[i]; i++) {
          if (tmp = this.styles['.' + item])
          matched += tmp + ';';}
      }
      if (tmp = this.styles['#' + attrs.id])
      matched += tmp + ';';
      return matched;
    } }]);return CssHandler;}();

module.exports = CssHandler;var
CssParser = /*#__PURE__*/function () {"use strict";
  function CssParser(data, init) {_classCallCheck(this, CssParser);
    this.data = data;
    this.floor = 0;
    this.i = 0;
    this.list = [];
    this.res = init;
    this.state = this.Space;
  }_createClass(CssParser, [{ key: "parse", value: function parse()
    {
      for (var c; c = this.data[this.i]; this.i++) {
        this.state(c);}
      return this.res;
    } }, { key: "section", value: function section()
    {
      return this.data.substring(this.start, this.i);
    }
    // 状态机
  }, { key: "Space", value: function Space(c) {
      if (c == '.' || c == '#' || isLetter(c)) {
        this.start = this.i;
        this.state = this.Name;
      } else if (c == '/' && this.data[this.i + 1] == '*')
      this.Comment();else
      if (!cfg.blankChar[c] && c != ';')
      this.state = this.Ignore;
    } }, { key: "Comment", value: function Comment()
    {
      this.i = this.data.indexOf('*/', this.i) + 1;
      if (!this.i) this.i = this.data.length;
      this.state = this.Space;
    } }, { key: "Ignore", value: function Ignore(
    c) {
      if (c == '{') this.floor++;else
      if (c == '}' && ! --this.floor) this.state = this.Space;
    } }, { key: "Name", value: function Name(
    c) {
      if (cfg.blankChar[c]) {
        this.list.push(this.section());
        this.state = this.NameSpace;
      } else if (c == '{') {
        this.list.push(this.section());
        this.Content();
      } else if (c == ',') {
        this.list.push(this.section());
        this.Comma();
      } else if (!isLetter(c) && (c < '0' || c > '9') && c != '-' && c != '_')
      this.state = this.Ignore;
    } }, { key: "NameSpace", value: function NameSpace(
    c) {
      if (c == '{') this.Content();else
      if (c == ',') this.Comma();else
      if (!cfg.blankChar[c]) this.state = this.Ignore;
    } }, { key: "Comma", value: function Comma()
    {
      while (cfg.blankChar[this.data[++this.i]]) {;}
      if (this.data[this.i] == '{') this.Content();else
      {
        this.start = this.i--;
        this.state = this.Name;
      }
    } }, { key: "Content", value: function Content()
    {
      this.start = ++this.i;
      if ((this.i = this.data.indexOf('}', this.i)) == -1) this.i = this.data.length;
      var content = this.section();
      for (var i = 0, item; item = this.list[i++];) {
        if (this.res[item]) this.res[item] += ';' + content;else
        this.res[item] = content;}
      this.list = [];
      this.state = this.Space;
    } }]);return CssParser;}();

/***/ }),

/***/ 261:
/*!*********************************************************************!*\
  !*** D:/lixindom/2020/伊籭商城/beefShop/node_modules/js-md5/src/md5.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process, global) {var __WEBPACK_AMD_DEFINE_RESULT__;/**
 * [js-md5]{@link https://github.com/emn178/js-md5}
 *
 * @namespace md5
 * @version 0.7.3
 * @author Chen, Yi-Cyuan [emn178@gmail.com]
 * @copyright Chen, Yi-Cyuan 2014-2017
 * @license MIT
 */
(function () {
  'use strict';

  var ERROR = 'input is invalid type';
  var WINDOW = typeof window === 'object';
  var root = WINDOW ? window : {};
  if (root.JS_MD5_NO_WINDOW) {
    WINDOW = false;
  }
  var WEB_WORKER = !WINDOW && typeof self === 'object';
  var NODE_JS = !root.JS_MD5_NO_NODE_JS && typeof process === 'object' && process.versions && process.versions.node;
  if (NODE_JS) {
    root = global;
  } else if (WEB_WORKER) {
    root = self;
  }
  var COMMON_JS = !root.JS_MD5_NO_COMMON_JS && typeof module === 'object' && module.exports;
  var AMD =  true && __webpack_require__(/*! !webpack amd options */ 264);
  var ARRAY_BUFFER = !root.JS_MD5_NO_ARRAY_BUFFER && typeof ArrayBuffer !== 'undefined';
  var HEX_CHARS = '0123456789abcdef'.split('');
  var EXTRA = [128, 32768, 8388608, -2147483648];
  var SHIFT = [0, 8, 16, 24];
  var OUTPUT_TYPES = ['hex', 'array', 'digest', 'buffer', 'arrayBuffer', 'base64'];
  var BASE64_ENCODE_CHAR = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'.split('');

  var blocks = [],buffer8;
  if (ARRAY_BUFFER) {
    var buffer = new ArrayBuffer(68);
    buffer8 = new Uint8Array(buffer);
    blocks = new Uint32Array(buffer);
  }

  if (root.JS_MD5_NO_NODE_JS || !Array.isArray) {
    Array.isArray = function (obj) {
      return Object.prototype.toString.call(obj) === '[object Array]';
    };
  }

  if (ARRAY_BUFFER && (root.JS_MD5_NO_ARRAY_BUFFER_IS_VIEW || !ArrayBuffer.isView)) {
    ArrayBuffer.isView = function (obj) {
      return typeof obj === 'object' && obj.buffer && obj.buffer.constructor === ArrayBuffer;
    };
  }

  /**
     * @method hex
     * @memberof md5
     * @description Output hash as hex string
     * @param {String|Array|Uint8Array|ArrayBuffer} message message to hash
     * @returns {String} Hex string
     * @example
     * md5.hex('The quick brown fox jumps over the lazy dog');
     * // equal to
     * md5('The quick brown fox jumps over the lazy dog');
     */
  /**
         * @method digest
         * @memberof md5
         * @description Output hash as bytes array
         * @param {String|Array|Uint8Array|ArrayBuffer} message message to hash
         * @returns {Array} Bytes array
         * @example
         * md5.digest('The quick brown fox jumps over the lazy dog');
         */
  /**
             * @method array
             * @memberof md5
             * @description Output hash as bytes array
             * @param {String|Array|Uint8Array|ArrayBuffer} message message to hash
             * @returns {Array} Bytes array
             * @example
             * md5.array('The quick brown fox jumps over the lazy dog');
             */
  /**
                 * @method arrayBuffer
                 * @memberof md5
                 * @description Output hash as ArrayBuffer
                 * @param {String|Array|Uint8Array|ArrayBuffer} message message to hash
                 * @returns {ArrayBuffer} ArrayBuffer
                 * @example
                 * md5.arrayBuffer('The quick brown fox jumps over the lazy dog');
                 */
  /**
                     * @method buffer
                     * @deprecated This maybe confuse with Buffer in node.js. Please use arrayBuffer instead.
                     * @memberof md5
                     * @description Output hash as ArrayBuffer
                     * @param {String|Array|Uint8Array|ArrayBuffer} message message to hash
                     * @returns {ArrayBuffer} ArrayBuffer
                     * @example
                     * md5.buffer('The quick brown fox jumps over the lazy dog');
                     */
  /**
                         * @method base64
                         * @memberof md5
                         * @description Output hash as base64 string
                         * @param {String|Array|Uint8Array|ArrayBuffer} message message to hash
                         * @returns {String} base64 string
                         * @example
                         * md5.base64('The quick brown fox jumps over the lazy dog');
                         */
  var createOutputMethod = function createOutputMethod(outputType) {
    return function (message) {
      return new Md5(true).update(message)[outputType]();
    };
  };

  /**
      * @method create
      * @memberof md5
      * @description Create Md5 object
      * @returns {Md5} Md5 object.
      * @example
      * var hash = md5.create();
      */
  /**
          * @method update
          * @memberof md5
          * @description Create and update Md5 object
          * @param {String|Array|Uint8Array|ArrayBuffer} message message to hash
          * @returns {Md5} Md5 object.
          * @example
          * var hash = md5.update('The quick brown fox jumps over the lazy dog');
          * // equal to
          * var hash = md5.create();
          * hash.update('The quick brown fox jumps over the lazy dog');
          */
  var createMethod = function createMethod() {
    var method = createOutputMethod('hex');
    if (NODE_JS) {
      method = nodeWrap(method);
    }
    method.create = function () {
      return new Md5();
    };
    method.update = function (message) {
      return method.create().update(message);
    };
    for (var i = 0; i < OUTPUT_TYPES.length; ++i) {
      var type = OUTPUT_TYPES[i];
      method[type] = createOutputMethod(type);
    }
    return method;
  };

  var nodeWrap = function nodeWrap(method) {
    var crypto = eval("require('crypto')");
    var Buffer = eval("require('buffer').Buffer");
    var nodeMethod = function nodeMethod(message) {
      if (typeof message === 'string') {
        return crypto.createHash('md5').update(message, 'utf8').digest('hex');
      } else {
        if (message === null || message === undefined) {
          throw ERROR;
        } else if (message.constructor === ArrayBuffer) {
          message = new Uint8Array(message);
        }
      }
      if (Array.isArray(message) || ArrayBuffer.isView(message) ||
      message.constructor === Buffer) {
        return crypto.createHash('md5').update(new Buffer(message)).digest('hex');
      } else {
        return method(message);
      }
    };
    return nodeMethod;
  };

  /**
      * Md5 class
      * @class Md5
      * @description This is internal class.
      * @see {@link md5.create}
      */
  function Md5(sharedMemory) {
    if (sharedMemory) {
      blocks[0] = blocks[16] = blocks[1] = blocks[2] = blocks[3] =
      blocks[4] = blocks[5] = blocks[6] = blocks[7] =
      blocks[8] = blocks[9] = blocks[10] = blocks[11] =
      blocks[12] = blocks[13] = blocks[14] = blocks[15] = 0;
      this.blocks = blocks;
      this.buffer8 = buffer8;
    } else {
      if (ARRAY_BUFFER) {
        var buffer = new ArrayBuffer(68);
        this.buffer8 = new Uint8Array(buffer);
        this.blocks = new Uint32Array(buffer);
      } else {
        this.blocks = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      }
    }
    this.h0 = this.h1 = this.h2 = this.h3 = this.start = this.bytes = this.hBytes = 0;
    this.finalized = this.hashed = false;
    this.first = true;
  }

  /**
     * @method update
     * @memberof Md5
     * @instance
     * @description Update hash
     * @param {String|Array|Uint8Array|ArrayBuffer} message message to hash
     * @returns {Md5} Md5 object.
     * @see {@link md5.update}
     */
  Md5.prototype.update = function (message) {
    if (this.finalized) {
      return;
    }

    var notString,type = typeof message;
    if (type !== 'string') {
      if (type === 'object') {
        if (message === null) {
          throw ERROR;
        } else if (ARRAY_BUFFER && message.constructor === ArrayBuffer) {
          message = new Uint8Array(message);
        } else if (!Array.isArray(message)) {
          if (!ARRAY_BUFFER || !ArrayBuffer.isView(message)) {
            throw ERROR;
          }
        }
      } else {
        throw ERROR;
      }
      notString = true;
    }
    var code,index = 0,i,length = message.length,blocks = this.blocks;
    var buffer8 = this.buffer8;

    while (index < length) {
      if (this.hashed) {
        this.hashed = false;
        blocks[0] = blocks[16];
        blocks[16] = blocks[1] = blocks[2] = blocks[3] =
        blocks[4] = blocks[5] = blocks[6] = blocks[7] =
        blocks[8] = blocks[9] = blocks[10] = blocks[11] =
        blocks[12] = blocks[13] = blocks[14] = blocks[15] = 0;
      }

      if (notString) {
        if (ARRAY_BUFFER) {
          for (i = this.start; index < length && i < 64; ++index) {
            buffer8[i++] = message[index];
          }
        } else {
          for (i = this.start; index < length && i < 64; ++index) {
            blocks[i >> 2] |= message[index] << SHIFT[i++ & 3];
          }
        }
      } else {
        if (ARRAY_BUFFER) {
          for (i = this.start; index < length && i < 64; ++index) {
            code = message.charCodeAt(index);
            if (code < 0x80) {
              buffer8[i++] = code;
            } else if (code < 0x800) {
              buffer8[i++] = 0xc0 | code >> 6;
              buffer8[i++] = 0x80 | code & 0x3f;
            } else if (code < 0xd800 || code >= 0xe000) {
              buffer8[i++] = 0xe0 | code >> 12;
              buffer8[i++] = 0x80 | code >> 6 & 0x3f;
              buffer8[i++] = 0x80 | code & 0x3f;
            } else {
              code = 0x10000 + ((code & 0x3ff) << 10 | message.charCodeAt(++index) & 0x3ff);
              buffer8[i++] = 0xf0 | code >> 18;
              buffer8[i++] = 0x80 | code >> 12 & 0x3f;
              buffer8[i++] = 0x80 | code >> 6 & 0x3f;
              buffer8[i++] = 0x80 | code & 0x3f;
            }
          }
        } else {
          for (i = this.start; index < length && i < 64; ++index) {
            code = message.charCodeAt(index);
            if (code < 0x80) {
              blocks[i >> 2] |= code << SHIFT[i++ & 3];
            } else if (code < 0x800) {
              blocks[i >> 2] |= (0xc0 | code >> 6) << SHIFT[i++ & 3];
              blocks[i >> 2] |= (0x80 | code & 0x3f) << SHIFT[i++ & 3];
            } else if (code < 0xd800 || code >= 0xe000) {
              blocks[i >> 2] |= (0xe0 | code >> 12) << SHIFT[i++ & 3];
              blocks[i >> 2] |= (0x80 | code >> 6 & 0x3f) << SHIFT[i++ & 3];
              blocks[i >> 2] |= (0x80 | code & 0x3f) << SHIFT[i++ & 3];
            } else {
              code = 0x10000 + ((code & 0x3ff) << 10 | message.charCodeAt(++index) & 0x3ff);
              blocks[i >> 2] |= (0xf0 | code >> 18) << SHIFT[i++ & 3];
              blocks[i >> 2] |= (0x80 | code >> 12 & 0x3f) << SHIFT[i++ & 3];
              blocks[i >> 2] |= (0x80 | code >> 6 & 0x3f) << SHIFT[i++ & 3];
              blocks[i >> 2] |= (0x80 | code & 0x3f) << SHIFT[i++ & 3];
            }
          }
        }
      }
      this.lastByteIndex = i;
      this.bytes += i - this.start;
      if (i >= 64) {
        this.start = i - 64;
        this.hash();
        this.hashed = true;
      } else {
        this.start = i;
      }
    }
    if (this.bytes > 4294967295) {
      this.hBytes += this.bytes / 4294967296 << 0;
      this.bytes = this.bytes % 4294967296;
    }
    return this;
  };

  Md5.prototype.finalize = function () {
    if (this.finalized) {
      return;
    }
    this.finalized = true;
    var blocks = this.blocks,i = this.lastByteIndex;
    blocks[i >> 2] |= EXTRA[i & 3];
    if (i >= 56) {
      if (!this.hashed) {
        this.hash();
      }
      blocks[0] = blocks[16];
      blocks[16] = blocks[1] = blocks[2] = blocks[3] =
      blocks[4] = blocks[5] = blocks[6] = blocks[7] =
      blocks[8] = blocks[9] = blocks[10] = blocks[11] =
      blocks[12] = blocks[13] = blocks[14] = blocks[15] = 0;
    }
    blocks[14] = this.bytes << 3;
    blocks[15] = this.hBytes << 3 | this.bytes >>> 29;
    this.hash();
  };

  Md5.prototype.hash = function () {
    var a,b,c,d,bc,da,blocks = this.blocks;

    if (this.first) {
      a = blocks[0] - 680876937;
      a = (a << 7 | a >>> 25) - 271733879 << 0;
      d = (-1732584194 ^ a & 2004318071) + blocks[1] - 117830708;
      d = (d << 12 | d >>> 20) + a << 0;
      c = (-271733879 ^ d & (a ^ -271733879)) + blocks[2] - 1126478375;
      c = (c << 17 | c >>> 15) + d << 0;
      b = (a ^ c & (d ^ a)) + blocks[3] - 1316259209;
      b = (b << 22 | b >>> 10) + c << 0;
    } else {
      a = this.h0;
      b = this.h1;
      c = this.h2;
      d = this.h3;
      a += (d ^ b & (c ^ d)) + blocks[0] - 680876936;
      a = (a << 7 | a >>> 25) + b << 0;
      d += (c ^ a & (b ^ c)) + blocks[1] - 389564586;
      d = (d << 12 | d >>> 20) + a << 0;
      c += (b ^ d & (a ^ b)) + blocks[2] + 606105819;
      c = (c << 17 | c >>> 15) + d << 0;
      b += (a ^ c & (d ^ a)) + blocks[3] - 1044525330;
      b = (b << 22 | b >>> 10) + c << 0;
    }

    a += (d ^ b & (c ^ d)) + blocks[4] - 176418897;
    a = (a << 7 | a >>> 25) + b << 0;
    d += (c ^ a & (b ^ c)) + blocks[5] + 1200080426;
    d = (d << 12 | d >>> 20) + a << 0;
    c += (b ^ d & (a ^ b)) + blocks[6] - 1473231341;
    c = (c << 17 | c >>> 15) + d << 0;
    b += (a ^ c & (d ^ a)) + blocks[7] - 45705983;
    b = (b << 22 | b >>> 10) + c << 0;
    a += (d ^ b & (c ^ d)) + blocks[8] + 1770035416;
    a = (a << 7 | a >>> 25) + b << 0;
    d += (c ^ a & (b ^ c)) + blocks[9] - 1958414417;
    d = (d << 12 | d >>> 20) + a << 0;
    c += (b ^ d & (a ^ b)) + blocks[10] - 42063;
    c = (c << 17 | c >>> 15) + d << 0;
    b += (a ^ c & (d ^ a)) + blocks[11] - 1990404162;
    b = (b << 22 | b >>> 10) + c << 0;
    a += (d ^ b & (c ^ d)) + blocks[12] + 1804603682;
    a = (a << 7 | a >>> 25) + b << 0;
    d += (c ^ a & (b ^ c)) + blocks[13] - 40341101;
    d = (d << 12 | d >>> 20) + a << 0;
    c += (b ^ d & (a ^ b)) + blocks[14] - 1502002290;
    c = (c << 17 | c >>> 15) + d << 0;
    b += (a ^ c & (d ^ a)) + blocks[15] + 1236535329;
    b = (b << 22 | b >>> 10) + c << 0;
    a += (c ^ d & (b ^ c)) + blocks[1] - 165796510;
    a = (a << 5 | a >>> 27) + b << 0;
    d += (b ^ c & (a ^ b)) + blocks[6] - 1069501632;
    d = (d << 9 | d >>> 23) + a << 0;
    c += (a ^ b & (d ^ a)) + blocks[11] + 643717713;
    c = (c << 14 | c >>> 18) + d << 0;
    b += (d ^ a & (c ^ d)) + blocks[0] - 373897302;
    b = (b << 20 | b >>> 12) + c << 0;
    a += (c ^ d & (b ^ c)) + blocks[5] - 701558691;
    a = (a << 5 | a >>> 27) + b << 0;
    d += (b ^ c & (a ^ b)) + blocks[10] + 38016083;
    d = (d << 9 | d >>> 23) + a << 0;
    c += (a ^ b & (d ^ a)) + blocks[15] - 660478335;
    c = (c << 14 | c >>> 18) + d << 0;
    b += (d ^ a & (c ^ d)) + blocks[4] - 405537848;
    b = (b << 20 | b >>> 12) + c << 0;
    a += (c ^ d & (b ^ c)) + blocks[9] + 568446438;
    a = (a << 5 | a >>> 27) + b << 0;
    d += (b ^ c & (a ^ b)) + blocks[14] - 1019803690;
    d = (d << 9 | d >>> 23) + a << 0;
    c += (a ^ b & (d ^ a)) + blocks[3] - 187363961;
    c = (c << 14 | c >>> 18) + d << 0;
    b += (d ^ a & (c ^ d)) + blocks[8] + 1163531501;
    b = (b << 20 | b >>> 12) + c << 0;
    a += (c ^ d & (b ^ c)) + blocks[13] - 1444681467;
    a = (a << 5 | a >>> 27) + b << 0;
    d += (b ^ c & (a ^ b)) + blocks[2] - 51403784;
    d = (d << 9 | d >>> 23) + a << 0;
    c += (a ^ b & (d ^ a)) + blocks[7] + 1735328473;
    c = (c << 14 | c >>> 18) + d << 0;
    b += (d ^ a & (c ^ d)) + blocks[12] - 1926607734;
    b = (b << 20 | b >>> 12) + c << 0;
    bc = b ^ c;
    a += (bc ^ d) + blocks[5] - 378558;
    a = (a << 4 | a >>> 28) + b << 0;
    d += (bc ^ a) + blocks[8] - 2022574463;
    d = (d << 11 | d >>> 21) + a << 0;
    da = d ^ a;
    c += (da ^ b) + blocks[11] + 1839030562;
    c = (c << 16 | c >>> 16) + d << 0;
    b += (da ^ c) + blocks[14] - 35309556;
    b = (b << 23 | b >>> 9) + c << 0;
    bc = b ^ c;
    a += (bc ^ d) + blocks[1] - 1530992060;
    a = (a << 4 | a >>> 28) + b << 0;
    d += (bc ^ a) + blocks[4] + 1272893353;
    d = (d << 11 | d >>> 21) + a << 0;
    da = d ^ a;
    c += (da ^ b) + blocks[7] - 155497632;
    c = (c << 16 | c >>> 16) + d << 0;
    b += (da ^ c) + blocks[10] - 1094730640;
    b = (b << 23 | b >>> 9) + c << 0;
    bc = b ^ c;
    a += (bc ^ d) + blocks[13] + 681279174;
    a = (a << 4 | a >>> 28) + b << 0;
    d += (bc ^ a) + blocks[0] - 358537222;
    d = (d << 11 | d >>> 21) + a << 0;
    da = d ^ a;
    c += (da ^ b) + blocks[3] - 722521979;
    c = (c << 16 | c >>> 16) + d << 0;
    b += (da ^ c) + blocks[6] + 76029189;
    b = (b << 23 | b >>> 9) + c << 0;
    bc = b ^ c;
    a += (bc ^ d) + blocks[9] - 640364487;
    a = (a << 4 | a >>> 28) + b << 0;
    d += (bc ^ a) + blocks[12] - 421815835;
    d = (d << 11 | d >>> 21) + a << 0;
    da = d ^ a;
    c += (da ^ b) + blocks[15] + 530742520;
    c = (c << 16 | c >>> 16) + d << 0;
    b += (da ^ c) + blocks[2] - 995338651;
    b = (b << 23 | b >>> 9) + c << 0;
    a += (c ^ (b | ~d)) + blocks[0] - 198630844;
    a = (a << 6 | a >>> 26) + b << 0;
    d += (b ^ (a | ~c)) + blocks[7] + 1126891415;
    d = (d << 10 | d >>> 22) + a << 0;
    c += (a ^ (d | ~b)) + blocks[14] - 1416354905;
    c = (c << 15 | c >>> 17) + d << 0;
    b += (d ^ (c | ~a)) + blocks[5] - 57434055;
    b = (b << 21 | b >>> 11) + c << 0;
    a += (c ^ (b | ~d)) + blocks[12] + 1700485571;
    a = (a << 6 | a >>> 26) + b << 0;
    d += (b ^ (a | ~c)) + blocks[3] - 1894986606;
    d = (d << 10 | d >>> 22) + a << 0;
    c += (a ^ (d | ~b)) + blocks[10] - 1051523;
    c = (c << 15 | c >>> 17) + d << 0;
    b += (d ^ (c | ~a)) + blocks[1] - 2054922799;
    b = (b << 21 | b >>> 11) + c << 0;
    a += (c ^ (b | ~d)) + blocks[8] + 1873313359;
    a = (a << 6 | a >>> 26) + b << 0;
    d += (b ^ (a | ~c)) + blocks[15] - 30611744;
    d = (d << 10 | d >>> 22) + a << 0;
    c += (a ^ (d | ~b)) + blocks[6] - 1560198380;
    c = (c << 15 | c >>> 17) + d << 0;
    b += (d ^ (c | ~a)) + blocks[13] + 1309151649;
    b = (b << 21 | b >>> 11) + c << 0;
    a += (c ^ (b | ~d)) + blocks[4] - 145523070;
    a = (a << 6 | a >>> 26) + b << 0;
    d += (b ^ (a | ~c)) + blocks[11] - 1120210379;
    d = (d << 10 | d >>> 22) + a << 0;
    c += (a ^ (d | ~b)) + blocks[2] + 718787259;
    c = (c << 15 | c >>> 17) + d << 0;
    b += (d ^ (c | ~a)) + blocks[9] - 343485551;
    b = (b << 21 | b >>> 11) + c << 0;

    if (this.first) {
      this.h0 = a + 1732584193 << 0;
      this.h1 = b - 271733879 << 0;
      this.h2 = c - 1732584194 << 0;
      this.h3 = d + 271733878 << 0;
      this.first = false;
    } else {
      this.h0 = this.h0 + a << 0;
      this.h1 = this.h1 + b << 0;
      this.h2 = this.h2 + c << 0;
      this.h3 = this.h3 + d << 0;
    }
  };

  /**
      * @method hex
      * @memberof Md5
      * @instance
      * @description Output hash as hex string
      * @returns {String} Hex string
      * @see {@link md5.hex}
      * @example
      * hash.hex();
      */
  Md5.prototype.hex = function () {
    this.finalize();

    var h0 = this.h0,h1 = this.h1,h2 = this.h2,h3 = this.h3;

    return HEX_CHARS[h0 >> 4 & 0x0F] + HEX_CHARS[h0 & 0x0F] +
    HEX_CHARS[h0 >> 12 & 0x0F] + HEX_CHARS[h0 >> 8 & 0x0F] +
    HEX_CHARS[h0 >> 20 & 0x0F] + HEX_CHARS[h0 >> 16 & 0x0F] +
    HEX_CHARS[h0 >> 28 & 0x0F] + HEX_CHARS[h0 >> 24 & 0x0F] +
    HEX_CHARS[h1 >> 4 & 0x0F] + HEX_CHARS[h1 & 0x0F] +
    HEX_CHARS[h1 >> 12 & 0x0F] + HEX_CHARS[h1 >> 8 & 0x0F] +
    HEX_CHARS[h1 >> 20 & 0x0F] + HEX_CHARS[h1 >> 16 & 0x0F] +
    HEX_CHARS[h1 >> 28 & 0x0F] + HEX_CHARS[h1 >> 24 & 0x0F] +
    HEX_CHARS[h2 >> 4 & 0x0F] + HEX_CHARS[h2 & 0x0F] +
    HEX_CHARS[h2 >> 12 & 0x0F] + HEX_CHARS[h2 >> 8 & 0x0F] +
    HEX_CHARS[h2 >> 20 & 0x0F] + HEX_CHARS[h2 >> 16 & 0x0F] +
    HEX_CHARS[h2 >> 28 & 0x0F] + HEX_CHARS[h2 >> 24 & 0x0F] +
    HEX_CHARS[h3 >> 4 & 0x0F] + HEX_CHARS[h3 & 0x0F] +
    HEX_CHARS[h3 >> 12 & 0x0F] + HEX_CHARS[h3 >> 8 & 0x0F] +
    HEX_CHARS[h3 >> 20 & 0x0F] + HEX_CHARS[h3 >> 16 & 0x0F] +
    HEX_CHARS[h3 >> 28 & 0x0F] + HEX_CHARS[h3 >> 24 & 0x0F];
  };

  /**
      * @method toString
      * @memberof Md5
      * @instance
      * @description Output hash as hex string
      * @returns {String} Hex string
      * @see {@link md5.hex}
      * @example
      * hash.toString();
      */
  Md5.prototype.toString = Md5.prototype.hex;

  /**
                                               * @method digest
                                               * @memberof Md5
                                               * @instance
                                               * @description Output hash as bytes array
                                               * @returns {Array} Bytes array
                                               * @see {@link md5.digest}
                                               * @example
                                               * hash.digest();
                                               */
  Md5.prototype.digest = function () {
    this.finalize();

    var h0 = this.h0,h1 = this.h1,h2 = this.h2,h3 = this.h3;
    return [
    h0 & 0xFF, h0 >> 8 & 0xFF, h0 >> 16 & 0xFF, h0 >> 24 & 0xFF,
    h1 & 0xFF, h1 >> 8 & 0xFF, h1 >> 16 & 0xFF, h1 >> 24 & 0xFF,
    h2 & 0xFF, h2 >> 8 & 0xFF, h2 >> 16 & 0xFF, h2 >> 24 & 0xFF,
    h3 & 0xFF, h3 >> 8 & 0xFF, h3 >> 16 & 0xFF, h3 >> 24 & 0xFF];

  };

  /**
      * @method array
      * @memberof Md5
      * @instance
      * @description Output hash as bytes array
      * @returns {Array} Bytes array
      * @see {@link md5.array}
      * @example
      * hash.array();
      */
  Md5.prototype.array = Md5.prototype.digest;

  /**
                                               * @method arrayBuffer
                                               * @memberof Md5
                                               * @instance
                                               * @description Output hash as ArrayBuffer
                                               * @returns {ArrayBuffer} ArrayBuffer
                                               * @see {@link md5.arrayBuffer}
                                               * @example
                                               * hash.arrayBuffer();
                                               */
  Md5.prototype.arrayBuffer = function () {
    this.finalize();

    var buffer = new ArrayBuffer(16);
    var blocks = new Uint32Array(buffer);
    blocks[0] = this.h0;
    blocks[1] = this.h1;
    blocks[2] = this.h2;
    blocks[3] = this.h3;
    return buffer;
  };

  /**
      * @method buffer
      * @deprecated This maybe confuse with Buffer in node.js. Please use arrayBuffer instead.
      * @memberof Md5
      * @instance
      * @description Output hash as ArrayBuffer
      * @returns {ArrayBuffer} ArrayBuffer
      * @see {@link md5.buffer}
      * @example
      * hash.buffer();
      */
  Md5.prototype.buffer = Md5.prototype.arrayBuffer;

  /**
                                                     * @method base64
                                                     * @memberof Md5
                                                     * @instance
                                                     * @description Output hash as base64 string
                                                     * @returns {String} base64 string
                                                     * @see {@link md5.base64}
                                                     * @example
                                                     * hash.base64();
                                                     */
  Md5.prototype.base64 = function () {
    var v1,v2,v3,base64Str = '',bytes = this.array();
    for (var i = 0; i < 15;) {
      v1 = bytes[i++];
      v2 = bytes[i++];
      v3 = bytes[i++];
      base64Str += BASE64_ENCODE_CHAR[v1 >>> 2] +
      BASE64_ENCODE_CHAR[(v1 << 4 | v2 >>> 4) & 63] +
      BASE64_ENCODE_CHAR[(v2 << 2 | v3 >>> 6) & 63] +
      BASE64_ENCODE_CHAR[v3 & 63];
    }
    v1 = bytes[i];
    base64Str += BASE64_ENCODE_CHAR[v1 >>> 2] +
    BASE64_ENCODE_CHAR[v1 << 4 & 63] +
    '==';
    return base64Str;
  };

  var exports = createMethod();

  if (COMMON_JS) {
    module.exports = exports;
  } else {
    /**
           * @method md5
           * @description Md5 hash function, export to global in browsers.
           * @param {String|Array|Uint8Array|ArrayBuffer} message message to hash
           * @returns {String} md5 hashes
           * @example
           * md5(''); // d41d8cd98f00b204e9800998ecf8427e
           * md5('The quick brown fox jumps over the lazy dog'); // 9e107d9d372bb6826bd81d3542a419d6
           * md5('The quick brown fox jumps over the lazy dog.'); // e4d909c290d0fb1ca068ffaddf22cbd0
           *
           * // It also supports UTF-8 encoding
           * md5('中文'); // a7bac2239fcdcb3a067903d8077c4a07
           *
           * // It also supports byte `Array`, `Uint8Array`, `ArrayBuffer`
           * md5([]); // d41d8cd98f00b204e9800998ecf8427e
           * md5(new Uint8Array([])); // d41d8cd98f00b204e9800998ecf8427e
           */
    root.md5 = exports;
    if (AMD) {
      !(__WEBPACK_AMD_DEFINE_RESULT__ = (function () {
        return exports;
      }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    }
  }
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../../../迅雷下载/HBuilderX/plugins/uniapp-cli/node_modules/node-libs-browser/mock/process.js */ 262), __webpack_require__(/*! ./../../../../../../../迅雷下载/HBuilderX/plugins/uniapp-cli/node_modules/webpack/buildin/global.js */ 3)))

/***/ }),

/***/ 262:
/*!********************************************************!*\
  !*** ./node_modules/node-libs-browser/mock/process.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports.nextTick = function nextTick(fn) {
    var args = Array.prototype.slice.call(arguments);
    args.shift();
    setTimeout(function () {
        fn.apply(null, args);
    }, 0);
};

exports.platform = exports.arch = 
exports.execPath = exports.title = 'browser';
exports.pid = 1;
exports.browser = true;
exports.env = {};
exports.argv = [];

exports.binding = function (name) {
	throw new Error('No such module. (Possibly not yet loaded)')
};

(function () {
    var cwd = '/';
    var path;
    exports.cwd = function () { return cwd };
    exports.chdir = function (dir) {
        if (!path) path = __webpack_require__(/*! path */ 263);
        cwd = path.resolve(dir, cwd);
    };
})();

exports.exit = exports.kill = 
exports.umask = exports.dlopen = 
exports.uptime = exports.memoryUsage = 
exports.uvCounters = function() {};
exports.features = {};


/***/ }),

/***/ 263:
/*!***********************************************!*\
  !*** ./node_modules/path-browserify/index.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {// .dirname, .basename, and .extname methods are extracted from Node.js v8.11.1,
// backported and transplited with Babel, with backwards-compat fixes

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
    var last = parts[i];
    if (last === '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

// path.resolve([from ...], to)
// posix version
exports.resolve = function() {
  var resolvedPath = '',
      resolvedAbsolute = false;

  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path = (i >= 0) ? arguments[i] : process.cwd();

    // Skip empty and invalid entries
    if (typeof path !== 'string') {
      throw new TypeError('Arguments to path.resolve must be strings');
    } else if (!path) {
      continue;
    }

    resolvedPath = path + '/' + resolvedPath;
    resolvedAbsolute = path.charAt(0) === '/';
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
};

// path.normalize(path)
// posix version
exports.normalize = function(path) {
  var isAbsolute = exports.isAbsolute(path),
      trailingSlash = substr(path, -1) === '/';

  // Normalize the path
  path = normalizeArray(filter(path.split('/'), function(p) {
    return !!p;
  }), !isAbsolute).join('/');

  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }

  return (isAbsolute ? '/' : '') + path;
};

// posix version
exports.isAbsolute = function(path) {
  return path.charAt(0) === '/';
};

// posix version
exports.join = function() {
  var paths = Array.prototype.slice.call(arguments, 0);
  return exports.normalize(filter(paths, function(p, index) {
    if (typeof p !== 'string') {
      throw new TypeError('Arguments to path.join must be strings');
    }
    return p;
  }).join('/'));
};


// path.relative(from, to)
// posix version
exports.relative = function(from, to) {
  from = exports.resolve(from).substr(1);
  to = exports.resolve(to).substr(1);

  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== '') break;
    }

    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== '') break;
    }

    if (start > end) return [];
    return arr.slice(start, end - start + 1);
  }

  var fromParts = trim(from.split('/'));
  var toParts = trim(to.split('/'));

  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('/');
};

exports.sep = '/';
exports.delimiter = ':';

exports.dirname = function (path) {
  if (typeof path !== 'string') path = path + '';
  if (path.length === 0) return '.';
  var code = path.charCodeAt(0);
  var hasRoot = code === 47 /*/*/;
  var end = -1;
  var matchedSlash = true;
  for (var i = path.length - 1; i >= 1; --i) {
    code = path.charCodeAt(i);
    if (code === 47 /*/*/) {
        if (!matchedSlash) {
          end = i;
          break;
        }
      } else {
      // We saw the first non-path separator
      matchedSlash = false;
    }
  }

  if (end === -1) return hasRoot ? '/' : '.';
  if (hasRoot && end === 1) {
    // return '//';
    // Backwards-compat fix:
    return '/';
  }
  return path.slice(0, end);
};

function basename(path) {
  if (typeof path !== 'string') path = path + '';

  var start = 0;
  var end = -1;
  var matchedSlash = true;
  var i;

  for (i = path.length - 1; i >= 0; --i) {
    if (path.charCodeAt(i) === 47 /*/*/) {
        // If we reached a path separator that was not part of a set of path
        // separators at the end of the string, stop now
        if (!matchedSlash) {
          start = i + 1;
          break;
        }
      } else if (end === -1) {
      // We saw the first non-path separator, mark this as the end of our
      // path component
      matchedSlash = false;
      end = i + 1;
    }
  }

  if (end === -1) return '';
  return path.slice(start, end);
}

// Uses a mixed approach for backwards-compatibility, as ext behavior changed
// in new Node.js versions, so only basename() above is backported here
exports.basename = function (path, ext) {
  var f = basename(path);
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};

exports.extname = function (path) {
  if (typeof path !== 'string') path = path + '';
  var startDot = -1;
  var startPart = 0;
  var end = -1;
  var matchedSlash = true;
  // Track the state of characters (if any) we see before our first dot and
  // after any path separator we find
  var preDotState = 0;
  for (var i = path.length - 1; i >= 0; --i) {
    var code = path.charCodeAt(i);
    if (code === 47 /*/*/) {
        // If we reached a path separator that was not part of a set of path
        // separators at the end of the string, stop now
        if (!matchedSlash) {
          startPart = i + 1;
          break;
        }
        continue;
      }
    if (end === -1) {
      // We saw the first non-path separator, mark this as the end of our
      // extension
      matchedSlash = false;
      end = i + 1;
    }
    if (code === 46 /*.*/) {
        // If this is our first dot, mark it as the start of our extension
        if (startDot === -1)
          startDot = i;
        else if (preDotState !== 1)
          preDotState = 1;
    } else if (startDot !== -1) {
      // We saw a non-dot and non-path separator before our dot, so we should
      // have a good chance at having a non-empty extension
      preDotState = -1;
    }
  }

  if (startDot === -1 || end === -1 ||
      // We saw a non-dot character immediately before the dot
      preDotState === 0 ||
      // The (right-most) trimmed path component is exactly '..'
      preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
    return '';
  }
  return path.slice(startDot, end);
};

function filter (xs, f) {
    if (xs.filter) return xs.filter(f);
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        if (f(xs[i], i, xs)) res.push(xs[i]);
    }
    return res;
}

// String.prototype.substr - negative index don't work in IE8
var substr = 'ab'.substr(-1) === 'b'
    ? function (str, start, len) { return str.substr(start, len) }
    : function (str, start, len) {
        if (start < 0) start = str.length + start;
        return str.substr(start, len);
    }
;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node-libs-browser/mock/process.js */ 262)))

/***/ }),

/***/ 264:
/*!****************************************!*\
  !*** (webpack)/buildin/amd-options.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {/* globals __webpack_amd_options__ */
module.exports = __webpack_amd_options__;

/* WEBPACK VAR INJECTION */}.call(this, {}))

/***/ }),

/***/ 3:
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ 4:
/*!*************************************************!*\
  !*** D:/lixindom/2020/伊籭商城/beefShop/pages.json ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ 439:
/*!***********************************************************!*\
  !*** D:/lixindom/2020/伊籭商城/beefShop/common/js/uqrcode.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; //---------------------------------------------------------------------
// github https://github.com/Sansnn/uQRCode
//---------------------------------------------------------------------

var uQRCode = {};

(function () {
  //---------------------------------------------------------------------
  // QRCode for JavaScript
  //
  // Copyright (c) 2009 Kazuhiko Arase
  //
  // URL: http://www.d-project.com/
  //
  // Licensed under the MIT license:
  //   http://www.opensource.org/licenses/mit-license.php
  //
  // The word "QR Code" is registered trademark of 
  // DENSO WAVE INCORPORATED
  //   http://www.denso-wave.com/qrcode/faqpatent-e.html
  //
  //---------------------------------------------------------------------

  //---------------------------------------------------------------------
  // QR8bitByte
  //---------------------------------------------------------------------

  function QR8bitByte(data) {
    this.mode = QRMode.MODE_8BIT_BYTE;
    this.data = data;
  }

  QR8bitByte.prototype = {

    getLength: function getLength(buffer) {
      return this.data.length;
    },

    write: function write(buffer) {
      for (var i = 0; i < this.data.length; i++) {
        // not JIS ...
        buffer.put(this.data.charCodeAt(i), 8);
      }
    } };


  //---------------------------------------------------------------------
  // QRCode
  //---------------------------------------------------------------------

  function QRCode(typeNumber, errorCorrectLevel) {
    this.typeNumber = typeNumber;
    this.errorCorrectLevel = errorCorrectLevel;
    this.modules = null;
    this.moduleCount = 0;
    this.dataCache = null;
    this.dataList = new Array();
  }

  QRCode.prototype = {

    addData: function addData(data) {
      var newData = new QR8bitByte(data);
      this.dataList.push(newData);
      this.dataCache = null;
    },

    isDark: function isDark(row, col) {
      if (row < 0 || this.moduleCount <= row || col < 0 || this.moduleCount <= col) {
        throw new Error(row + "," + col);
      }
      return this.modules[row][col];
    },

    getModuleCount: function getModuleCount() {
      return this.moduleCount;
    },

    make: function make() {
      // Calculate automatically typeNumber if provided is < 1
      if (this.typeNumber < 1) {
        var typeNumber = 1;
        for (typeNumber = 1; typeNumber < 40; typeNumber++) {
          var rsBlocks = QRRSBlock.getRSBlocks(typeNumber, this.errorCorrectLevel);

          var buffer = new QRBitBuffer();
          var totalDataCount = 0;
          for (var i = 0; i < rsBlocks.length; i++) {
            totalDataCount += rsBlocks[i].dataCount;
          }

          for (var i = 0; i < this.dataList.length; i++) {
            var data = this.dataList[i];
            buffer.put(data.mode, 4);
            buffer.put(data.getLength(), QRUtil.getLengthInBits(data.mode, typeNumber));
            data.write(buffer);
          }
          if (buffer.getLengthInBits() <= totalDataCount * 8)
          break;
        }
        this.typeNumber = typeNumber;
      }
      this.makeImpl(false, this.getBestMaskPattern());
    },

    makeImpl: function makeImpl(test, maskPattern) {

      this.moduleCount = this.typeNumber * 4 + 17;
      this.modules = new Array(this.moduleCount);

      for (var row = 0; row < this.moduleCount; row++) {

        this.modules[row] = new Array(this.moduleCount);

        for (var col = 0; col < this.moduleCount; col++) {
          this.modules[row][col] = null; //(col + row) % 3;
        }
      }

      this.setupPositionProbePattern(0, 0);
      this.setupPositionProbePattern(this.moduleCount - 7, 0);
      this.setupPositionProbePattern(0, this.moduleCount - 7);
      this.setupPositionAdjustPattern();
      this.setupTimingPattern();
      this.setupTypeInfo(test, maskPattern);

      if (this.typeNumber >= 7) {
        this.setupTypeNumber(test);
      }

      if (this.dataCache == null) {
        this.dataCache = QRCode.createData(this.typeNumber, this.errorCorrectLevel, this.dataList);
      }

      this.mapData(this.dataCache, maskPattern);
    },

    setupPositionProbePattern: function setupPositionProbePattern(row, col) {

      for (var r = -1; r <= 7; r++) {

        if (row + r <= -1 || this.moduleCount <= row + r) continue;

        for (var c = -1; c <= 7; c++) {

          if (col + c <= -1 || this.moduleCount <= col + c) continue;

          if (0 <= r && r <= 6 && (c == 0 || c == 6) ||
          0 <= c && c <= 6 && (r == 0 || r == 6) ||
          2 <= r && r <= 4 && 2 <= c && c <= 4) {
            this.modules[row + r][col + c] = true;
          } else {
            this.modules[row + r][col + c] = false;
          }
        }
      }
    },

    getBestMaskPattern: function getBestMaskPattern() {

      var minLostPoint = 0;
      var pattern = 0;

      for (var i = 0; i < 8; i++) {

        this.makeImpl(true, i);

        var lostPoint = QRUtil.getLostPoint(this);

        if (i == 0 || minLostPoint > lostPoint) {
          minLostPoint = lostPoint;
          pattern = i;
        }
      }

      return pattern;
    },

    createMovieClip: function createMovieClip(target_mc, instance_name, depth) {

      var qr_mc = target_mc.createEmptyMovieClip(instance_name, depth);
      var cs = 1;

      this.make();

      for (var row = 0; row < this.modules.length; row++) {

        var y = row * cs;

        for (var col = 0; col < this.modules[row].length; col++) {

          var x = col * cs;
          var dark = this.modules[row][col];

          if (dark) {
            qr_mc.beginFill(0, 100);
            qr_mc.moveTo(x, y);
            qr_mc.lineTo(x + cs, y);
            qr_mc.lineTo(x + cs, y + cs);
            qr_mc.lineTo(x, y + cs);
            qr_mc.endFill();
          }
        }
      }

      return qr_mc;
    },

    setupTimingPattern: function setupTimingPattern() {

      for (var r = 8; r < this.moduleCount - 8; r++) {
        if (this.modules[r][6] != null) {
          continue;
        }
        this.modules[r][6] = r % 2 == 0;
      }

      for (var c = 8; c < this.moduleCount - 8; c++) {
        if (this.modules[6][c] != null) {
          continue;
        }
        this.modules[6][c] = c % 2 == 0;
      }
    },

    setupPositionAdjustPattern: function setupPositionAdjustPattern() {

      var pos = QRUtil.getPatternPosition(this.typeNumber);

      for (var i = 0; i < pos.length; i++) {

        for (var j = 0; j < pos.length; j++) {

          var row = pos[i];
          var col = pos[j];

          if (this.modules[row][col] != null) {
            continue;
          }

          for (var r = -2; r <= 2; r++) {

            for (var c = -2; c <= 2; c++) {

              if (r == -2 || r == 2 || c == -2 || c == 2 ||
              r == 0 && c == 0) {
                this.modules[row + r][col + c] = true;
              } else {
                this.modules[row + r][col + c] = false;
              }
            }
          }
        }
      }
    },

    setupTypeNumber: function setupTypeNumber(test) {

      var bits = QRUtil.getBCHTypeNumber(this.typeNumber);

      for (var i = 0; i < 18; i++) {
        var mod = !test && (bits >> i & 1) == 1;
        this.modules[Math.floor(i / 3)][i % 3 + this.moduleCount - 8 - 3] = mod;
      }

      for (var i = 0; i < 18; i++) {
        var mod = !test && (bits >> i & 1) == 1;
        this.modules[i % 3 + this.moduleCount - 8 - 3][Math.floor(i / 3)] = mod;
      }
    },

    setupTypeInfo: function setupTypeInfo(test, maskPattern) {

      var data = this.errorCorrectLevel << 3 | maskPattern;
      var bits = QRUtil.getBCHTypeInfo(data);

      // vertical		
      for (var i = 0; i < 15; i++) {

        var mod = !test && (bits >> i & 1) == 1;

        if (i < 6) {
          this.modules[i][8] = mod;
        } else if (i < 8) {
          this.modules[i + 1][8] = mod;
        } else {
          this.modules[this.moduleCount - 15 + i][8] = mod;
        }
      }

      // horizontal
      for (var i = 0; i < 15; i++) {

        var mod = !test && (bits >> i & 1) == 1;

        if (i < 8) {
          this.modules[8][this.moduleCount - i - 1] = mod;
        } else if (i < 9) {
          this.modules[8][15 - i - 1 + 1] = mod;
        } else {
          this.modules[8][15 - i - 1] = mod;
        }
      }

      // fixed module
      this.modules[this.moduleCount - 8][8] = !test;

    },

    mapData: function mapData(data, maskPattern) {

      var inc = -1;
      var row = this.moduleCount - 1;
      var bitIndex = 7;
      var byteIndex = 0;

      for (var col = this.moduleCount - 1; col > 0; col -= 2) {

        if (col == 6) col--;

        while (true) {

          for (var c = 0; c < 2; c++) {

            if (this.modules[row][col - c] == null) {

              var dark = false;

              if (byteIndex < data.length) {
                dark = (data[byteIndex] >>> bitIndex & 1) == 1;
              }

              var mask = QRUtil.getMask(maskPattern, row, col - c);

              if (mask) {
                dark = !dark;
              }

              this.modules[row][col - c] = dark;
              bitIndex--;

              if (bitIndex == -1) {
                byteIndex++;
                bitIndex = 7;
              }
            }
          }

          row += inc;

          if (row < 0 || this.moduleCount <= row) {
            row -= inc;
            inc = -inc;
            break;
          }
        }
      }

    } };



  QRCode.PAD0 = 0xEC;
  QRCode.PAD1 = 0x11;

  QRCode.createData = function (typeNumber, errorCorrectLevel, dataList) {

    var rsBlocks = QRRSBlock.getRSBlocks(typeNumber, errorCorrectLevel);

    var buffer = new QRBitBuffer();

    for (var i = 0; i < dataList.length; i++) {
      var data = dataList[i];
      buffer.put(data.mode, 4);
      buffer.put(data.getLength(), QRUtil.getLengthInBits(data.mode, typeNumber));
      data.write(buffer);
    }

    // calc num max data.
    var totalDataCount = 0;
    for (var i = 0; i < rsBlocks.length; i++) {
      totalDataCount += rsBlocks[i].dataCount;
    }

    if (buffer.getLengthInBits() > totalDataCount * 8) {
      throw new Error("code length overflow. (" +
      buffer.getLengthInBits() +
      ">" +
      totalDataCount * 8 +
      ")");
    }

    // end code
    if (buffer.getLengthInBits() + 4 <= totalDataCount * 8) {
      buffer.put(0, 4);
    }

    // padding
    while (buffer.getLengthInBits() % 8 != 0) {
      buffer.putBit(false);
    }

    // padding
    while (true) {

      if (buffer.getLengthInBits() >= totalDataCount * 8) {
        break;
      }
      buffer.put(QRCode.PAD0, 8);

      if (buffer.getLengthInBits() >= totalDataCount * 8) {
        break;
      }
      buffer.put(QRCode.PAD1, 8);
    }

    return QRCode.createBytes(buffer, rsBlocks);
  };

  QRCode.createBytes = function (buffer, rsBlocks) {

    var offset = 0;

    var maxDcCount = 0;
    var maxEcCount = 0;

    var dcdata = new Array(rsBlocks.length);
    var ecdata = new Array(rsBlocks.length);

    for (var r = 0; r < rsBlocks.length; r++) {

      var dcCount = rsBlocks[r].dataCount;
      var ecCount = rsBlocks[r].totalCount - dcCount;

      maxDcCount = Math.max(maxDcCount, dcCount);
      maxEcCount = Math.max(maxEcCount, ecCount);

      dcdata[r] = new Array(dcCount);

      for (var i = 0; i < dcdata[r].length; i++) {
        dcdata[r][i] = 0xff & buffer.buffer[i + offset];
      }
      offset += dcCount;

      var rsPoly = QRUtil.getErrorCorrectPolynomial(ecCount);
      var rawPoly = new QRPolynomial(dcdata[r], rsPoly.getLength() - 1);

      var modPoly = rawPoly.mod(rsPoly);
      ecdata[r] = new Array(rsPoly.getLength() - 1);
      for (var i = 0; i < ecdata[r].length; i++) {
        var modIndex = i + modPoly.getLength() - ecdata[r].length;
        ecdata[r][i] = modIndex >= 0 ? modPoly.get(modIndex) : 0;
      }

    }

    var totalCodeCount = 0;
    for (var i = 0; i < rsBlocks.length; i++) {
      totalCodeCount += rsBlocks[i].totalCount;
    }

    var data = new Array(totalCodeCount);
    var index = 0;

    for (var i = 0; i < maxDcCount; i++) {
      for (var r = 0; r < rsBlocks.length; r++) {
        if (i < dcdata[r].length) {
          data[index++] = dcdata[r][i];
        }
      }
    }

    for (var i = 0; i < maxEcCount; i++) {
      for (var r = 0; r < rsBlocks.length; r++) {
        if (i < ecdata[r].length) {
          data[index++] = ecdata[r][i];
        }
      }
    }

    return data;

  };

  //---------------------------------------------------------------------
  // QRMode
  //---------------------------------------------------------------------

  var QRMode = {
    MODE_NUMBER: 1 << 0,
    MODE_ALPHA_NUM: 1 << 1,
    MODE_8BIT_BYTE: 1 << 2,
    MODE_KANJI: 1 << 3 };


  //---------------------------------------------------------------------
  // QRErrorCorrectLevel
  //---------------------------------------------------------------------

  var QRErrorCorrectLevel = {
    L: 1,
    M: 0,
    Q: 3,
    H: 2 };


  //---------------------------------------------------------------------
  // QRMaskPattern
  //---------------------------------------------------------------------

  var QRMaskPattern = {
    PATTERN000: 0,
    PATTERN001: 1,
    PATTERN010: 2,
    PATTERN011: 3,
    PATTERN100: 4,
    PATTERN101: 5,
    PATTERN110: 6,
    PATTERN111: 7 };


  //---------------------------------------------------------------------
  // QRUtil
  //---------------------------------------------------------------------

  var QRUtil = {

    PATTERN_POSITION_TABLE: [
    [],
    [6, 18],
    [6, 22],
    [6, 26],
    [6, 30],
    [6, 34],
    [6, 22, 38],
    [6, 24, 42],
    [6, 26, 46],
    [6, 28, 50],
    [6, 30, 54],
    [6, 32, 58],
    [6, 34, 62],
    [6, 26, 46, 66],
    [6, 26, 48, 70],
    [6, 26, 50, 74],
    [6, 30, 54, 78],
    [6, 30, 56, 82],
    [6, 30, 58, 86],
    [6, 34, 62, 90],
    [6, 28, 50, 72, 94],
    [6, 26, 50, 74, 98],
    [6, 30, 54, 78, 102],
    [6, 28, 54, 80, 106],
    [6, 32, 58, 84, 110],
    [6, 30, 58, 86, 114],
    [6, 34, 62, 90, 118],
    [6, 26, 50, 74, 98, 122],
    [6, 30, 54, 78, 102, 126],
    [6, 26, 52, 78, 104, 130],
    [6, 30, 56, 82, 108, 134],
    [6, 34, 60, 86, 112, 138],
    [6, 30, 58, 86, 114, 142],
    [6, 34, 62, 90, 118, 146],
    [6, 30, 54, 78, 102, 126, 150],
    [6, 24, 50, 76, 102, 128, 154],
    [6, 28, 54, 80, 106, 132, 158],
    [6, 32, 58, 84, 110, 136, 162],
    [6, 26, 54, 82, 110, 138, 166],
    [6, 30, 58, 86, 114, 142, 170]],


    G15: 1 << 10 | 1 << 8 | 1 << 5 | 1 << 4 | 1 << 2 | 1 << 1 | 1 << 0,
    G18: 1 << 12 | 1 << 11 | 1 << 10 | 1 << 9 | 1 << 8 | 1 << 5 | 1 << 2 | 1 << 0,
    G15_MASK: 1 << 14 | 1 << 12 | 1 << 10 | 1 << 4 | 1 << 1,

    getBCHTypeInfo: function getBCHTypeInfo(data) {
      var d = data << 10;
      while (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G15) >= 0) {
        d ^= QRUtil.G15 << QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G15);
      }
      return (data << 10 | d) ^ QRUtil.G15_MASK;
    },

    getBCHTypeNumber: function getBCHTypeNumber(data) {
      var d = data << 12;
      while (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G18) >= 0) {
        d ^= QRUtil.G18 << QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G18);
      }
      return data << 12 | d;
    },

    getBCHDigit: function getBCHDigit(data) {

      var digit = 0;

      while (data != 0) {
        digit++;
        data >>>= 1;
      }

      return digit;
    },

    getPatternPosition: function getPatternPosition(typeNumber) {
      return QRUtil.PATTERN_POSITION_TABLE[typeNumber - 1];
    },

    getMask: function getMask(maskPattern, i, j) {

      switch (maskPattern) {

        case QRMaskPattern.PATTERN000:
          return (i + j) % 2 == 0;
        case QRMaskPattern.PATTERN001:
          return i % 2 == 0;
        case QRMaskPattern.PATTERN010:
          return j % 3 == 0;
        case QRMaskPattern.PATTERN011:
          return (i + j) % 3 == 0;
        case QRMaskPattern.PATTERN100:
          return (Math.floor(i / 2) + Math.floor(j / 3)) % 2 == 0;
        case QRMaskPattern.PATTERN101:
          return i * j % 2 + i * j % 3 == 0;
        case QRMaskPattern.PATTERN110:
          return (i * j % 2 + i * j % 3) % 2 == 0;
        case QRMaskPattern.PATTERN111:
          return (i * j % 3 + (i + j) % 2) % 2 == 0;

        default:
          throw new Error("bad maskPattern:" + maskPattern);}

    },

    getErrorCorrectPolynomial: function getErrorCorrectPolynomial(errorCorrectLength) {

      var a = new QRPolynomial([1], 0);

      for (var i = 0; i < errorCorrectLength; i++) {
        a = a.multiply(new QRPolynomial([1, QRMath.gexp(i)], 0));
      }

      return a;
    },

    getLengthInBits: function getLengthInBits(mode, type) {

      if (1 <= type && type < 10) {

        // 1 - 9

        switch (mode) {
          case QRMode.MODE_NUMBER:
            return 10;
          case QRMode.MODE_ALPHA_NUM:
            return 9;
          case QRMode.MODE_8BIT_BYTE:
            return 8;
          case QRMode.MODE_KANJI:
            return 8;
          default:
            throw new Error("mode:" + mode);}


      } else if (type < 27) {

        // 10 - 26

        switch (mode) {
          case QRMode.MODE_NUMBER:
            return 12;
          case QRMode.MODE_ALPHA_NUM:
            return 11;
          case QRMode.MODE_8BIT_BYTE:
            return 16;
          case QRMode.MODE_KANJI:
            return 10;
          default:
            throw new Error("mode:" + mode);}


      } else if (type < 41) {

        // 27 - 40

        switch (mode) {
          case QRMode.MODE_NUMBER:
            return 14;
          case QRMode.MODE_ALPHA_NUM:
            return 13;
          case QRMode.MODE_8BIT_BYTE:
            return 16;
          case QRMode.MODE_KANJI:
            return 12;
          default:
            throw new Error("mode:" + mode);}


      } else {
        throw new Error("type:" + type);
      }
    },

    getLostPoint: function getLostPoint(qrCode) {

      var moduleCount = qrCode.getModuleCount();

      var lostPoint = 0;

      // LEVEL1

      for (var row = 0; row < moduleCount; row++) {

        for (var col = 0; col < moduleCount; col++) {

          var sameCount = 0;
          var dark = qrCode.isDark(row, col);

          for (var r = -1; r <= 1; r++) {

            if (row + r < 0 || moduleCount <= row + r) {
              continue;
            }

            for (var c = -1; c <= 1; c++) {

              if (col + c < 0 || moduleCount <= col + c) {
                continue;
              }

              if (r == 0 && c == 0) {
                continue;
              }

              if (dark == qrCode.isDark(row + r, col + c)) {
                sameCount++;
              }
            }
          }

          if (sameCount > 5) {
            lostPoint += 3 + sameCount - 5;
          }
        }
      }

      // LEVEL2

      for (var row = 0; row < moduleCount - 1; row++) {
        for (var col = 0; col < moduleCount - 1; col++) {
          var count = 0;
          if (qrCode.isDark(row, col)) count++;
          if (qrCode.isDark(row + 1, col)) count++;
          if (qrCode.isDark(row, col + 1)) count++;
          if (qrCode.isDark(row + 1, col + 1)) count++;
          if (count == 0 || count == 4) {
            lostPoint += 3;
          }
        }
      }

      // LEVEL3

      for (var row = 0; row < moduleCount; row++) {
        for (var col = 0; col < moduleCount - 6; col++) {
          if (qrCode.isDark(row, col) &&
          !qrCode.isDark(row, col + 1) &&
          qrCode.isDark(row, col + 2) &&
          qrCode.isDark(row, col + 3) &&
          qrCode.isDark(row, col + 4) &&
          !qrCode.isDark(row, col + 5) &&
          qrCode.isDark(row, col + 6)) {
            lostPoint += 40;
          }
        }
      }

      for (var col = 0; col < moduleCount; col++) {
        for (var row = 0; row < moduleCount - 6; row++) {
          if (qrCode.isDark(row, col) &&
          !qrCode.isDark(row + 1, col) &&
          qrCode.isDark(row + 2, col) &&
          qrCode.isDark(row + 3, col) &&
          qrCode.isDark(row + 4, col) &&
          !qrCode.isDark(row + 5, col) &&
          qrCode.isDark(row + 6, col)) {
            lostPoint += 40;
          }
        }
      }

      // LEVEL4

      var darkCount = 0;

      for (var col = 0; col < moduleCount; col++) {
        for (var row = 0; row < moduleCount; row++) {
          if (qrCode.isDark(row, col)) {
            darkCount++;
          }
        }
      }

      var ratio = Math.abs(100 * darkCount / moduleCount / moduleCount - 50) / 5;
      lostPoint += ratio * 10;

      return lostPoint;
    } };




  //---------------------------------------------------------------------
  // QRMath
  //---------------------------------------------------------------------

  var QRMath = {

    glog: function glog(n) {

      if (n < 1) {
        throw new Error("glog(" + n + ")");
      }

      return QRMath.LOG_TABLE[n];
    },

    gexp: function gexp(n) {

      while (n < 0) {
        n += 255;
      }

      while (n >= 256) {
        n -= 255;
      }

      return QRMath.EXP_TABLE[n];
    },

    EXP_TABLE: new Array(256),

    LOG_TABLE: new Array(256) };



  for (var i = 0; i < 8; i++) {
    QRMath.EXP_TABLE[i] = 1 << i;
  }
  for (var i = 8; i < 256; i++) {
    QRMath.EXP_TABLE[i] = QRMath.EXP_TABLE[i - 4] ^
    QRMath.EXP_TABLE[i - 5] ^
    QRMath.EXP_TABLE[i - 6] ^
    QRMath.EXP_TABLE[i - 8];
  }
  for (var i = 0; i < 255; i++) {
    QRMath.LOG_TABLE[QRMath.EXP_TABLE[i]] = i;
  }

  //---------------------------------------------------------------------
  // QRPolynomial
  //---------------------------------------------------------------------

  function QRPolynomial(num, shift) {

    if (num.length == undefined) {
      throw new Error(num.length + "/" + shift);
    }

    var offset = 0;

    while (offset < num.length && num[offset] == 0) {
      offset++;
    }

    this.num = new Array(num.length - offset + shift);
    for (var i = 0; i < num.length - offset; i++) {
      this.num[i] = num[i + offset];
    }
  }

  QRPolynomial.prototype = {

    get: function get(index) {
      return this.num[index];
    },

    getLength: function getLength() {
      return this.num.length;
    },

    multiply: function multiply(e) {

      var num = new Array(this.getLength() + e.getLength() - 1);

      for (var i = 0; i < this.getLength(); i++) {
        for (var j = 0; j < e.getLength(); j++) {
          num[i + j] ^= QRMath.gexp(QRMath.glog(this.get(i)) + QRMath.glog(e.get(j)));
        }
      }

      return new QRPolynomial(num, 0);
    },

    mod: function mod(e) {

      if (this.getLength() - e.getLength() < 0) {
        return this;
      }

      var ratio = QRMath.glog(this.get(0)) - QRMath.glog(e.get(0));

      var num = new Array(this.getLength());

      for (var i = 0; i < this.getLength(); i++) {
        num[i] = this.get(i);
      }

      for (var i = 0; i < e.getLength(); i++) {
        num[i] ^= QRMath.gexp(QRMath.glog(e.get(i)) + ratio);
      }

      // recursive call
      return new QRPolynomial(num, 0).mod(e);
    } };


  //---------------------------------------------------------------------
  // QRRSBlock
  //---------------------------------------------------------------------

  function QRRSBlock(totalCount, dataCount) {
    this.totalCount = totalCount;
    this.dataCount = dataCount;
  }

  QRRSBlock.RS_BLOCK_TABLE = [

  // L
  // M
  // Q
  // H

  // 1
  [1, 26, 19],
  [1, 26, 16],
  [1, 26, 13],
  [1, 26, 9],

  // 2
  [1, 44, 34],
  [1, 44, 28],
  [1, 44, 22],
  [1, 44, 16],

  // 3
  [1, 70, 55],
  [1, 70, 44],
  [2, 35, 17],
  [2, 35, 13],

  // 4		
  [1, 100, 80],
  [2, 50, 32],
  [2, 50, 24],
  [4, 25, 9],

  // 5
  [1, 134, 108],
  [2, 67, 43],
  [2, 33, 15, 2, 34, 16],
  [2, 33, 11, 2, 34, 12],

  // 6
  [2, 86, 68],
  [4, 43, 27],
  [4, 43, 19],
  [4, 43, 15],

  // 7		
  [2, 98, 78],
  [4, 49, 31],
  [2, 32, 14, 4, 33, 15],
  [4, 39, 13, 1, 40, 14],

  // 8
  [2, 121, 97],
  [2, 60, 38, 2, 61, 39],
  [4, 40, 18, 2, 41, 19],
  [4, 40, 14, 2, 41, 15],

  // 9
  [2, 146, 116],
  [3, 58, 36, 2, 59, 37],
  [4, 36, 16, 4, 37, 17],
  [4, 36, 12, 4, 37, 13],

  // 10		
  [2, 86, 68, 2, 87, 69],
  [4, 69, 43, 1, 70, 44],
  [6, 43, 19, 2, 44, 20],
  [6, 43, 15, 2, 44, 16],

  // 11
  [4, 101, 81],
  [1, 80, 50, 4, 81, 51],
  [4, 50, 22, 4, 51, 23],
  [3, 36, 12, 8, 37, 13],

  // 12
  [2, 116, 92, 2, 117, 93],
  [6, 58, 36, 2, 59, 37],
  [4, 46, 20, 6, 47, 21],
  [7, 42, 14, 4, 43, 15],

  // 13
  [4, 133, 107],
  [8, 59, 37, 1, 60, 38],
  [8, 44, 20, 4, 45, 21],
  [12, 33, 11, 4, 34, 12],

  // 14
  [3, 145, 115, 1, 146, 116],
  [4, 64, 40, 5, 65, 41],
  [11, 36, 16, 5, 37, 17],
  [11, 36, 12, 5, 37, 13],

  // 15
  [5, 109, 87, 1, 110, 88],
  [5, 65, 41, 5, 66, 42],
  [5, 54, 24, 7, 55, 25],
  [11, 36, 12],

  // 16
  [5, 122, 98, 1, 123, 99],
  [7, 73, 45, 3, 74, 46],
  [15, 43, 19, 2, 44, 20],
  [3, 45, 15, 13, 46, 16],

  // 17
  [1, 135, 107, 5, 136, 108],
  [10, 74, 46, 1, 75, 47],
  [1, 50, 22, 15, 51, 23],
  [2, 42, 14, 17, 43, 15],

  // 18
  [5, 150, 120, 1, 151, 121],
  [9, 69, 43, 4, 70, 44],
  [17, 50, 22, 1, 51, 23],
  [2, 42, 14, 19, 43, 15],

  // 19
  [3, 141, 113, 4, 142, 114],
  [3, 70, 44, 11, 71, 45],
  [17, 47, 21, 4, 48, 22],
  [9, 39, 13, 16, 40, 14],

  // 20
  [3, 135, 107, 5, 136, 108],
  [3, 67, 41, 13, 68, 42],
  [15, 54, 24, 5, 55, 25],
  [15, 43, 15, 10, 44, 16],

  // 21
  [4, 144, 116, 4, 145, 117],
  [17, 68, 42],
  [17, 50, 22, 6, 51, 23],
  [19, 46, 16, 6, 47, 17],

  // 22
  [2, 139, 111, 7, 140, 112],
  [17, 74, 46],
  [7, 54, 24, 16, 55, 25],
  [34, 37, 13],

  // 23
  [4, 151, 121, 5, 152, 122],
  [4, 75, 47, 14, 76, 48],
  [11, 54, 24, 14, 55, 25],
  [16, 45, 15, 14, 46, 16],

  // 24
  [6, 147, 117, 4, 148, 118],
  [6, 73, 45, 14, 74, 46],
  [11, 54, 24, 16, 55, 25],
  [30, 46, 16, 2, 47, 17],

  // 25
  [8, 132, 106, 4, 133, 107],
  [8, 75, 47, 13, 76, 48],
  [7, 54, 24, 22, 55, 25],
  [22, 45, 15, 13, 46, 16],

  // 26
  [10, 142, 114, 2, 143, 115],
  [19, 74, 46, 4, 75, 47],
  [28, 50, 22, 6, 51, 23],
  [33, 46, 16, 4, 47, 17],

  // 27
  [8, 152, 122, 4, 153, 123],
  [22, 73, 45, 3, 74, 46],
  [8, 53, 23, 26, 54, 24],
  [12, 45, 15, 28, 46, 16],

  // 28
  [3, 147, 117, 10, 148, 118],
  [3, 73, 45, 23, 74, 46],
  [4, 54, 24, 31, 55, 25],
  [11, 45, 15, 31, 46, 16],

  // 29
  [7, 146, 116, 7, 147, 117],
  [21, 73, 45, 7, 74, 46],
  [1, 53, 23, 37, 54, 24],
  [19, 45, 15, 26, 46, 16],

  // 30
  [5, 145, 115, 10, 146, 116],
  [19, 75, 47, 10, 76, 48],
  [15, 54, 24, 25, 55, 25],
  [23, 45, 15, 25, 46, 16],

  // 31
  [13, 145, 115, 3, 146, 116],
  [2, 74, 46, 29, 75, 47],
  [42, 54, 24, 1, 55, 25],
  [23, 45, 15, 28, 46, 16],

  // 32
  [17, 145, 115],
  [10, 74, 46, 23, 75, 47],
  [10, 54, 24, 35, 55, 25],
  [19, 45, 15, 35, 46, 16],

  // 33
  [17, 145, 115, 1, 146, 116],
  [14, 74, 46, 21, 75, 47],
  [29, 54, 24, 19, 55, 25],
  [11, 45, 15, 46, 46, 16],

  // 34
  [13, 145, 115, 6, 146, 116],
  [14, 74, 46, 23, 75, 47],
  [44, 54, 24, 7, 55, 25],
  [59, 46, 16, 1, 47, 17],

  // 35
  [12, 151, 121, 7, 152, 122],
  [12, 75, 47, 26, 76, 48],
  [39, 54, 24, 14, 55, 25],
  [22, 45, 15, 41, 46, 16],

  // 36
  [6, 151, 121, 14, 152, 122],
  [6, 75, 47, 34, 76, 48],
  [46, 54, 24, 10, 55, 25],
  [2, 45, 15, 64, 46, 16],

  // 37
  [17, 152, 122, 4, 153, 123],
  [29, 74, 46, 14, 75, 47],
  [49, 54, 24, 10, 55, 25],
  [24, 45, 15, 46, 46, 16],

  // 38
  [4, 152, 122, 18, 153, 123],
  [13, 74, 46, 32, 75, 47],
  [48, 54, 24, 14, 55, 25],
  [42, 45, 15, 32, 46, 16],

  // 39
  [20, 147, 117, 4, 148, 118],
  [40, 75, 47, 7, 76, 48],
  [43, 54, 24, 22, 55, 25],
  [10, 45, 15, 67, 46, 16],

  // 40
  [19, 148, 118, 6, 149, 119],
  [18, 75, 47, 31, 76, 48],
  [34, 54, 24, 34, 55, 25],
  [20, 45, 15, 61, 46, 16]];


  QRRSBlock.getRSBlocks = function (typeNumber, errorCorrectLevel) {

    var rsBlock = QRRSBlock.getRsBlockTable(typeNumber, errorCorrectLevel);

    if (rsBlock == undefined) {
      throw new Error("bad rs block @ typeNumber:" + typeNumber + "/errorCorrectLevel:" + errorCorrectLevel);
    }

    var length = rsBlock.length / 3;

    var list = new Array();

    for (var i = 0; i < length; i++) {

      var count = rsBlock[i * 3 + 0];
      var totalCount = rsBlock[i * 3 + 1];
      var dataCount = rsBlock[i * 3 + 2];

      for (var j = 0; j < count; j++) {
        list.push(new QRRSBlock(totalCount, dataCount));
      }
    }

    return list;
  };

  QRRSBlock.getRsBlockTable = function (typeNumber, errorCorrectLevel) {

    switch (errorCorrectLevel) {
      case QRErrorCorrectLevel.L:
        return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 0];
      case QRErrorCorrectLevel.M:
        return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 1];
      case QRErrorCorrectLevel.Q:
        return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 2];
      case QRErrorCorrectLevel.H:
        return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 3];
      default:
        return undefined;}

  };

  //---------------------------------------------------------------------
  // QRBitBuffer
  //---------------------------------------------------------------------

  function QRBitBuffer() {
    this.buffer = new Array();
    this.length = 0;
  }

  QRBitBuffer.prototype = {

    get: function get(index) {
      var bufIndex = Math.floor(index / 8);
      return (this.buffer[bufIndex] >>> 7 - index % 8 & 1) == 1;
    },

    put: function put(num, length) {
      for (var i = 0; i < length; i++) {
        this.putBit((num >>> length - i - 1 & 1) == 1);
      }
    },

    getLengthInBits: function getLengthInBits() {
      return this.length;
    },

    putBit: function putBit(bit) {

      var bufIndex = Math.floor(this.length / 8);
      if (this.buffer.length <= bufIndex) {
        this.buffer.push(0);
      }

      if (bit) {
        this.buffer[bufIndex] |= 0x80 >>> this.length % 8;
      }

      this.length++;
    } };


  //---------------------------------------------------------------------
  // Support Chinese
  //---------------------------------------------------------------------
  function utf16To8(text) {
    var result = '';
    var c;
    for (var i = 0; i < text.length; i++) {
      c = text.charCodeAt(i);
      if (c >= 0x0001 && c <= 0x007F) {
        result += text.charAt(i);
      } else if (c > 0x07FF) {
        result += String.fromCharCode(0xE0 | c >> 12 & 0x0F);
        result += String.fromCharCode(0x80 | c >> 6 & 0x3F);
        result += String.fromCharCode(0x80 | c >> 0 & 0x3F);
      } else {
        result += String.fromCharCode(0xC0 | c >> 6 & 0x1F);
        result += String.fromCharCode(0x80 | c >> 0 & 0x3F);
      }
    }
    return result;
  }

  uQRCode = {

    errorCorrectLevel: QRErrorCorrectLevel,

    defaults: {
      size: 354,
      margin: 0,
      backgroundColor: '#ffffff',
      foregroundColor: '#000000',
      fileType: 'png', // 'jpg', 'png'
      errorCorrectLevel: QRErrorCorrectLevel.H,
      typeNumber: -1 },


    make: function make(options) {var _this = this;
      return new Promise(function (reslove, reject) {
        var defaultOptions = {
          canvasId: options.canvasId,
          componentInstance: options.componentInstance,
          text: options.text,
          size: _this.defaults.size,
          margin: _this.defaults.margin,
          backgroundColor: _this.defaults.backgroundColor,
          foregroundColor: _this.defaults.foregroundColor,
          fileType: _this.defaults.fileType,
          errorCorrectLevel: _this.defaults.errorCorrectLevel,
          typeNumber: _this.defaults.typeNumber };

        if (options) {
          for (var i in options) {
            defaultOptions[i] = options[i];
          }
        }
        options = defaultOptions;
        if (!options.canvasId) {
          console.error('uQRCode: Please set canvasId!');
          return;
        }

        function createCanvas() {
          var qrcode = new QRCode(options.typeNumber, options.errorCorrectLevel);
          qrcode.addData(utf16To8(options.text));
          qrcode.make();

          var ctx = uni.createCanvasContext(options.canvasId, options.componentInstance);
          ctx.setFillStyle(options.backgroundColor);
          ctx.fillRect(0, 0, options.size, options.size);

          var tileW = (options.size - options.margin * 2) / qrcode.getModuleCount();
          var tileH = tileW;

          for (var row = 0; row < qrcode.getModuleCount(); row++) {
            for (var col = 0; col < qrcode.getModuleCount(); col++) {
              var style = qrcode.isDark(row, col) ? options.foregroundColor : options.backgroundColor;
              ctx.setFillStyle(style);
              var x = Math.round(col * tileW) + options.margin;
              var y = Math.round(row * tileH) + options.margin;
              var w = Math.ceil((col + 1) * tileW) - Math.floor(col * tileW);
              var h = Math.ceil((row + 1) * tileW) - Math.floor(row * tileW);
              ctx.fillRect(x, y, w, h);
            }
          }

          setTimeout(function () {
            ctx.draw(false, function () {
              setTimeout(function () {
                uni.canvasToTempFilePath({
                  canvasId: options.canvasId,
                  fileType: options.fileType,
                  width: options.size,
                  height: options.size,
                  destWidth: options.size,
                  destHeight: options.size,
                  success: function success(res) {
                    var resData; // 将统一为base64格式
                    var tempFilePath = res.tempFilePath; // H5为base64，其他为相对路径



















                    uni.getFileSystemManager().readFile({
                      filePath: tempFilePath,
                      encoding: 'base64',
                      success: function success(res) {
                        resData = 'data:image/png;base64,' + res.data;
                        options.success && options.success(resData);
                        reslove(resData);
                      } });


























                  },
                  fail: function fail(error) {
                    options.fail && options.fail(error);
                    reject(error);
                  },
                  complete: function complete(res) {
                    options.complete && options.complete(res);
                  } },
                options.componentInstance);
              }, options.text.length + 100);
            }());
          }, 150);
        }

        createCanvas();
      });
    } };


})();var _default =

uQRCode;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 677:
/*!*************************************************************************!*\
  !*** D:/lixindom/2020/伊籭商城/beefShop/components/s-pull-scroll/empty.png ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAACKEAYAAAC/WNm6AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAAZiS0dEAAAAAAAA+UO7fwAAAAlwSFlzAAAASAAAAEgARslrPgAAJXZJREFUeNrt3XlcVOX6APDnOTNASLiA5VUkl1kEIXHDfRdBbdMyyzIzAzdETOynldrNLb1JimJueN2uYqip1xRFVFLRi+IlFQNnzmiuJQVqhgjMzPP743jwBo6yKGeQ5/sPn5l55/C8KDxz3uV5ARhjjDHGGGOMMcYYY4wxxhhjjDHGGCuOiIhIEOSvSsfDmD1DpQNgTEkZzhnOGc716ztMdJjoMDE6Gk7BKTj16qsggggiEVyH63B9xw5VjipHlRMW1gSbYBP89Vel42bMHnACYdWScZxxnHFczZrQHJpD8zNnoA/0gT4vvGDzDb/AL/CLKLqsd1nvst7Pr8HKBisbrLxzR+l+MKYkvkVn1RI2xsbYeNKkRyYOWX2oD/W12tw9uXty94wbp3T8jNkDTiCseroCV+BK69ZlfRsOw2E4rH17pcNnzB5wAmHVEo2gETRCrS7z+w7QATrwzDNKx1/VGNwMbgY3Dw9DR0NHQ8euXaUhxOeeUzouVjGcQKoY+RdRzBazxex+/cRAMVAM9PGRVg0hz2kxu3CBLtAFql1b7CZ2E7vt3IkpmIIpV67gOlyH6w4dgv7QH/pfvy42EhuJjVatkhKKk5PScbOy4QRi5w7SQTpIarXxW+O3xm9XrsR/4b/wX5cvUw7lUM7u3bSEltCS9HSxu9hd7J6SIm4Tt4nbPD2VjptVT/LiBMtgy2DL4L17aRWtolUvv1yioQ50oEOkREqkxBEjYBbMgllffql0/KxsOIHYOc8gzyDPoGnToDW0htbBwfIvXomGq2AVrPL3h1EwCkYlJUm/yA0bKh0/qx5ORZyKOBXh4iI92r2b5tAcmtOuXWnfj/WwHtYLDub9N1UL/0PZORpAA2jA8OGlbp9MyZTctCn4gA/4HDiQGZMZkxnToIHS/WBPp8uRlyMvRzo71/Cp4VPDZ+dOCIdwCO/cuazXoXRKp3RXV6O70d3oXr++0v1ipcMJxE4VjQk3hsbQuBxDUgEQAAE6nTpOHaeO27///IrzK86vqFdP6X6xp4P8//Nun7t97vbZtg26Qlfo2rNnuS8YD/EQn5eny9Zl67J5o2ZVwQnETumiddG66Px8cAZncL5ypbzXkeZIvLwsZCELJSaeW3Zu2blldesq3T9WNaWeSD2ResLBAcbCWBgbFyf9/wwKquh18Rgew2ObNiEiIlosSveTlQ4nEDuH7uiO7mvXVvhCvaAX9PL1Vc1TzVPN27fv7KCzg84OcnNTun+sapDmJlSqWrVq1apVa8MGcAAHcHj11Qpf+CAchIMnT5I7uZP7hAlK95OVDScQO3cz/2b+zfwZM2AYDINhu3dX9HqUQAmU0LKl498c/+b4t7175eWWSveT2Sd5Ulv8WfxZ/HnNGkBAwDffrPCFQyAEQk6fNueb8835QUHSHfcffyjdX1Y2nEDsXFv/tv5t/QsLCzwKPAo8Bg7EJbgEl+zaVeELh0M4hLdtay4wF5gL4uOLakMxBnLiQDStNa01rf3mGzCDGcxDh1b4wlEQBVEGg/qg+qD6YFCQd5h3mHdYdrbS/WXlwwmkivDZ4rPFZ0tBgZOnk6eT55tvSr+IBw5U+MKX4BJc6tABWkJLaBkfL63acnVVur9MGXLiELeKW8WtixdTZ+pMnUeNqvCF7xWjtLS0tLS07NmTqxo/HTiBVDGeEZ4RnhF5eS75Lvku+a+8ArfhNtxOSqrwhbtDd+jeqZNqjWqNas3u3X9d18+qC1MXUxdTly+/BD/wA7/Q0Apf8ApcgSuXL5u7mruau/bp4xXsFewVfO2a0v1kjwcnkCpKLid+Z8OdDXc2vPwyzsSZOPPw4QpfeDWshtVdurj86fKny5/bt0tzJFz76Wln1Bl1Rt2sWbSG1tCayZMrej1sh+2w3dWrsBW2wtaePb3RG73x55+V7id7vDiBVHF+kX6RfpG5uTgdp+P0V17BT/FT/PT48YpelybRJJoUEGBxsDhYHHbs4ETydDKcNZw1nJ06FXbDbtj92WcVvuAluASXsrLoXXqX3g0MlCbHTSal+8meDE4gTwmNVqPVaG/dUsWp4lRxQUHSHElqakWvSxmUQRmBgeYwc5g57LvvuOjd00H6d5wwAR3RER1nzqzo9bAVtsJWv/8uDBGGCEN695YSx08/Kd1P9mRxAnnKSJOTN29afa2+Vt9+/aREcuZMhS8cDuEQ3q8fGtCAhg0b5CKPSveXlY3oJXqJXsHBUjXcr7+u8AWjIAqibtyg4TSchgcGarI0WZqs9HSl+8kqByeQp1Sz0c1GNxv9++9CnBAnxAUEYA/sgT0yMip6XWln+xtveEZ7RntGr1ypdD9Z6cgbRymAAiggKspmUc7ScgRHcPzjD9pIG2lj377SHUdamtL9ZJWLE8hTTvpEmJVVmFOYU5jTu7e8Dr+i16W+1Jf6Dh8ujaF366Z0P9nDOS13Wu60vH176U6yRo3yXgen4BSckpsrFAqFQuFLL+lz9Dn6nIrPubGqiRNINeGd553nnffLL9Kj3r2xM3bGzufPP56rcwKxd9Za1lrWWuVPHHKxQzyMh/Hwq69Kc25HjijdL6YsTiDVjDTUcOWK8LPws/Bzr17SHcnFi+W9nmARLIKlCk6qp0M6pGdllfl9baANtLl9W+nwy0pdoC5QF6SmSqutrNZSv1EFKlDl5+N5PI/nX39duqN9DBtY2VOBE0g11bRG0xpNa1y8SNmUTdm9eoEruIJr2av+YjRGY/SxY0r3p8xxiyiiWPZ9M5iIiZiYmKh0/GUl/3uDEYxg/OabR/bTC73Qq6AAP8PP8LO33tIu1C7ULtyzR+l+MPvCZ2gzAAAwjTSNNI3U6egMnaEzSUm0jtbROtsHUaE3eqN3QoKmUFOoKezXTyrDXYZPtgqTV5E1TG2Y2jD10CGoDbWhdseONvt7b6OmZq1mrWZtz55Vtex4UXHEJDFJTAoPlxLKu+9CIRRCYcOGkAEZkPHf/2Jv7I29Z83SDtQO1A48elTpuJl94gTC/qLoKNyu0BW6fv45rsJVuKpLF9KTnvR//omNsTE2jo9XRagiVBFz5kjLhu/eVTru8pI3SFrOWM5Yznz2GR2jY3RswAA4A2fgDJG0bHnbNqn/c+YUndPCGGOMMcYYY4wxxhhjjDHGGGOMMcYYY4wxxhhjjDHGGGOMMcYYY4wxxhhjjDHGGGOMMcYYY4wxxqoBLudu5+TzG0wfmT4yfRQYCONgHIx74QWl42KsQjbCRthIBAtgASxIT9fe0N7Q3qh6B5NVd5xA7JzRz+hn9Fu+HLbAFtgycqTS8TD2RERBFER99JF03srChUqHw0qHE4idEreJ28RtnTqREzmR05EjoAMd6JD/vdjTKR7iIT4vz7reut663sen2YlmJ5qduHBB6bDYw9n9mehioBgoBn7xhThMHCYOO3TI9LzpedPzb7+tdFxPijRkpVJRIAVSYHQ0Jw5WLfSDftDP2VkIE8KEsAULlA6HlY7d/mEykpGM1KMHiCCCePBgUcBe6IVeBQXm5ebl5uV163oFewV7Bd++rXS8j4voIXqIHqGhlERJlBQdrXQ8jCkB3dAN3fr317pr3bXu8fFKx8MeTK10ALZge2yP7T09aQNtoA33n6dMyqRMR0f1EvUS9ZJ69aRnq34Ckc4if+45AgKCmTNtNoyCKIiyWPB9fB/fHzQI6kAdqHP5stLxM1Ya1sbWxtbGjRvjElyCS+LioD/0h/5CiZEQiqM4iouKkn4vDhzgs+jtk90mkOoGd+JO3Dl3LiVSIiXWqWOzYRIkQdI332ijtdHa6O3blY6bsbI7eVJcI64R16xcKX1gGjWqRJMACIAAnQ4d0REdJ02Snpw9W+nIy0pKgE5O0qPFi6EltISWPj4wCAbBoBkzdLV1tXW19+5VOs7ysvs5kKed9B+sQweaSBNp4vDhttrhMByGw65dE7YL24Xt06YpHTdjFeHQ06GnQ89PPoFLcAkuZWXZakdplEZpn35qEk2iSayqy9dHjIBwCIfwkBDoDt2he6dOMBWmwtTly5WOrKIUuwMRRVEUxTZtyEpWsjZtWvx1WkSLaFG7djYv0AyaQbNOncQT4gnxhK8v1aJaVMvBQX7ZrDPrzLoTJ7zRG73x55+V6qct8v4OcaW4UlwZHQ09oSf0FGwn9P+D/4P/mzhRo9VoNdpbt5SOn7GKaNSoUaNGjW7cENuJ7cR2kyZJQ9Xr1pVoGA7hEF6jBq2m1bRanlx/4w2l4y+1QAiEQE/P4k/jUlyKS+vXVzq8iqr0SXTpE/egQdLYZ1zcE1tlFAVREHXnjvSgRQtpDNVkquz+2vw5uBndjG6jR0MKpEDK0qU2G+ZBHuTt3atroWuha9G3r9JxM/Y4SR+kEMU0MU1MO3AAXMEVXHv0sPmGKIiCqKAg6fc5IUHp+B/F+G/jv43/njMHvMEbvD/5RH5eXgyktWgtWos8xFX1VPoQFiZiIib26vXEl6fe++SCx/E4Hu/UqbL7aUvG4ozFGYvd3TEIgzDoIWO699bFwwpYAStCQ5WOm7EnARERkYgSKIESxo6V/7DabK9GNaoXLTo76Oygs4McHZWOv7qr9DsQwxDDEMOQgAAhTogT4nbtkldVPfZvlAAJkHD9usXJ4mRxat1aWu577Vpl97e40u4spwIqoIJp0/Q+eh+9z6xZSsfNWGWw9Ym9hAtwAS588okuUBeoC5w7t7LjlO+cjIeNh42H27WDpbAUlrq6Fm+HRjSi8cMPIRZiIfb+/jX8CD/Cj8xmq6vV1erar1/x9wlthDZCG4sFB+AAHPDf/9rr0LVi+0AMbgY3g5uHBwRBEAR5exd/XbgkXBIuBQTQGlpDayZPLhF4IiZi4vvvWw9ZD1kP3U8MuBE34kazWTAJJsGUlmYvP/jzfuf9zvv5+1tGWEZYRvznP7aWL2IohmJoZmZ+zfya+TX9/Hy2+Gzx2WL7ExljT5NrIddCroXUqHHHcMdwx5CeTjEUQzFNmhRvh1NwCk7JzYWhMBSGentrB2oHagdW3nJ2cYI4QZywcCGFUiiFhoc/sW+0D/bBvkuXHF9yfMnxpZYt5bmjyurnoyg2ia7P0efoc65elTLz1avFX5cm1x4yyXQOzsG5o0f1sfpYfawoFj0fC7EQq1SvSioqhjjYNNg0ODraVuIAIxjBSCRNuo0d6zPJZ5LPJE4crHppsLLBygYr79wxRBgiDBFhYQgICN9/X7wdzaW5NNfFBQgIKDJSenbw4MqKk8xkJnPJO4fHrg/0gT4vvJC/KH9R/iJ5KH7Xrsrq56PwMt4nzORt8jZ5jxhBc2gOzXnIqrLdsBt2r1+vnaSdpJ10f+c9Y9WRPlIfqY/ctUu6w9i2zWZDBAR8803TStNK08revSsrPkzDNEx7SFyPSxREQdSNGw7zHeY7zD958kl/O3luSfxA/ED8ICLC2N7Y3tj+u++MW4xbjFuiow1zDXMNc++PGNlvKZPTxtPG00OHgjM4g/P69cVfl3ay6nTahdqF2oX/cwdiJ6R/CDc3pz1Oe5z2nDsnrWevW7dEP6bjdJyek4P7cT/u9/bWZGmyNFm218UzVp1IRUU9PWE6TIfpP/1E39F39N2zzxZvhz2wB/bIyLi5/eb2m9v9/Nr6t/Vv619Y+KTjM3Q0dDR07NoV1+JaXPu3v5VosAgWwaJ33pEW9QwYUBTvvTkQ+pq+pq/feaf424QPhA+ED8xm4YhwRDhy7FgTbIJN8Ndfn1Q/irYVpIlpYtr+/TZXw5nABKa7dzEP8zCvd2+73YlON+km3TQa0Rmd0fn+8+iLvuh7+7bTHKc5TnNKDn3ZC6d0p3Sn9FmzbCWOIt7gDd5TpmhiNbGaWE4cjP0veW5DSiRffCE9+9VXxdtJteO8vWveqnmr5q0JE2y1e9z0x/TH9McOHwY96EFf8nVpUUCrVtKj+wlEWmVpteq+132v+37zZpvfQBrDe+KM84zzjPMGDMA38A18o0cP6c5n+3ZLS0tLS8spU1TdVN1U3Vq0kPq5fj15kAd5REba7RCWvpu+m75bSgq+gq/gKyEhOAkn4aSNG2E2zIbZr73mGeEZ4RmRl6d0nMWJXqKX6NW6NQVQAAU85PyOH+AH+OHoUc00zTTNtFWrlI6bMXt2ecDlAZcHLFwo/WE7c8ZWO6Gz0FnoPG1a0SIdViq4Clfhqtat5ceqy6rLqsuTJ0urV8+d0+l1ep1+82ap3a5d6Id+6Nemjd0mEJk2U5upzYyJ0e7Q7tDuePdde50jkJf10XpaT+ujo6VbVpWqeDv51lVlVVlV1jFjpHXwVqvS8TNmz3piT+yJZrMgCqIgjhlTtOikGEqndEp3dcWm2BSbzp+vdNxVRjZkQ/aVK/JD8zrzOvM6fdE9VdHft0bUiBo1aiTd8V2/bvcJpKoQXUVX0XX4cKgNtaF2x4622pGJTGRauLDpyKYjm448fVrpuBmrSjR7NHs0e5KToQW0gBb//KfNhvf2XRQdC6GUkTASRl6/XuJ5d3AH9/t/sJVmnWOdY52zZYu8fw5TMAVT/vUvsZXYSmy1YIFptGm0aXRCglRyqU0byqZsyl6+nBNIBV2gC3SBateGHbADdjxkQ9O99dx3+t/pf6f/3/+udNyMVWXmbeZt5m2TJ2MrbIWtfv/dZsOjcBSORkennkg9kXrifq28ylLQpaBLQZdVq2AIDIEhmzbBQTgIB0+epOt0na5/+KGiP8T/0Wx0s9HNRv/+u7WftZ+1X1AQzIJZMMtgoNk0m2aHh9On9Cl92q4dZEAGZHz55R93/rjzx51585SOu8qTanstXmw0Go1GI5Gtr+IQcYg45LXXlI6XsaeJ9Ps3YsQjf//qiHXEOhMnKh1vVSOtJn32WXmVVvHX7XYZr72Tjtb19aV21I7apaXRAlpAC9QlV7UNg2EwbPdu3THdMd2xl15SOm7GnialLcYor940LzEvMS/x8rKX0kZVnd0u47VXRf9hQQQRoqOlI3cfkDjuVQM2HzUfNR8NDa2s5XiMVSdyMUYxUAwUA8eNk84XSUujnbSTdt4fspIn11VqlVqllode3ntP6firOp4DKSPTMtMy07L33pMSR/futtphb+yNvT//3F7PI2HsaaJN0CZoE86ehWWwDJYtXGizYQZkQMa778obAJWO+3GThvS6dzfeNN403jx7tuj4jCeEE0gpSSei1apFZ+ksnX3I5FEIhEDI6dNF69YZY5Umd2fuztydX3whL1op0eDeMRLohE7oFB19kA7SQVI/NSMx0gfX11+H3+A3+K15czSgAQ33qwA/bpxASomiKZqiv/hC2t/xgJIFu2E37LZaMRzDMXzMGHndutJxM1ad+EX6RfpF5uaiP/qj/0Oq5K6ElbCyRQuPwx6HPQ6PHat03I8LTaNpNO3+OUt0i27RLeGJ/Z3nBPII0p3Hiy9KQ1YPOdjJCEYwrlollV44elTpuBmrzrT+Wn+t//bt0o7pnTtttcO7eBfvzphxfsX5FedX1KundNylJS3ief55+Xwl+Sv0gB7Q4/4RupiFWZjVpIl0hPjIkfJXqb8tWlQ0jqfm1u1xkyfLTX4mP5NfdDRtpa209QG3upfgElzKyir4teDXgl+nTFE6bsbYfYW5hbmFuePHq8PUYeqw3r3lk0qLGjSBJtCkVi3LFMsUyxR5aHr4cKXjfhTrFusW65bkZKyP9bG+VmurnXTSY8uWUtn75cvl5y2nLactp+/ckfaxubtLxRrv3i1rHHwHYoMYJoaJYe+8IyWObt1stZPGGD/+WDr4KSdH6bgZY/cVLWJ5FV6FV2fOtNlwFsyCWcOGmfqa+pr6du6sdNyPghtwA2549OIcqZZgYaFcFl7+istwGS47cqQxNIbGkJ9f7jge1UC+tbO0srSytHr5ZVgLa2Gtt7c0WePgACNgBIy4eNE62TrZOjk+Xj9FP0U/JSND6R9weWXGZMZkxri6qpPVyerkc+ekHZgPONjqNtyG20lJ2lbaVtpWvXrJywmVjp8xVpJ8zoVjjGOMY0xamjzJXLwdBmIgBv74o+a85rzmfNu20u+1xaJ0/LZcvHjx4sWLderIjwu+Kviq4Kt586Q7rZAQ+TwVXYouRZfy+uuP+/uXuAORbmmeeUZa/jV/vnWMdYx1zKVLUo2nmBgpsIgI8iVf8h0/no7TcToeGSmVAf7pJ+M64zrjuu3bpfc3bKj0D7isVD+qflT9+PnnthIHeqEXehUUWI9bj1uPy8UQOXEwZs/ko6HpKl2lqw8pxnhvyMfU0NTQ1HD0aKXjfhT5iNuio26TIAmSyj4UVV5FCeRUxKmIUxEuLuYwc5g5LDGxKFFkUiZlOjqW+oodoSN0fO01PIkn8WRKSvETrOyVtBHJx0c6a338eJsN0yAN0v7xD6l2TGam0nEzxkpP76P30fscOgRTYSpMXbfOVjsaSANp4MyZ8mS10nGX2gk4ASdyc+WHOBSH4tBbt57UtytKIC7uLu4u7itXSomj4mOAtI7W0boGDfAKXsEr27fLCerJ/wTLGe/b9Da9vXhx8R2sRepAHahjMjntc9rntG/OHKXjZYxVQCfoBJ0+/lg+EbTE6+EQDuF16pAzOZPzl18qHW5pOWY5Zjlm/eMfeB2v4/Xx41XjVONU4z755El9P5SWqXbpYiUrWenwYZst742l0Yf0IX24eTP2x/7YPzcX5+N8nN+rl7zM1WZNqAtwAS588okuUBeoC3xI1dpKJn3CePtta7I12ZocG2uz4XPwHDzXt6+utq62rvbevUrHzRirOHlZq7Tq8v4qpSL39ndJQ16dO+uiddG66P/8R+m47QWKi8XF4uLVq6kv9aW+D1i+pgUtaL/4Qoc61KHtMuTS1vmgIKl8cny8vOOzqMG9T/C6urq6urq2l51VFrnKpNN+p/1O+zMzpbmcB5xglgIpkBIXpxuqG6ob+tZbSsfNGHt8is4CLxALxILkZGlZfocOJRreK8OuDdGGaEPat7f3yfXKIsAW2AJbHlDT6V4pgCtwBa7ArFmPulDRJ/McyIGcB5zxewNuwA2NRjrb+P5GF6U4NXdq7tR82jSbicMRHMHxjz8sdy13LXc/+kjpeBljj598Iqj1qvWq9ero0fKJoSUa3jtISXQX3UX3kBCl47YXaNxj3GPck5cHGtCA5plnil4IxVAM3bpVKlJW+mJchkOGQ4ZD48dLG1yiooq/Tr/QL/RLhw7ymeeV3eFzy84tO7fMy0sVqgpVhZ46VeZFAqxy3FslgwmYgAkGgzXFmmJNCQnRH9Mf0x97yFBrFSOtVgwMhL/D3+Hv33wjf9BSOi72YPKciaW7pbule7Nm8kFMSselFAHX4lpce+dOiVcOwAE44Opa5gtGCVFC1LPP2npd1UDVQNXgAd+vsjrcTegmdJs3jxOHnbs3BEqhFEqhzZoJvwq/Cr8uWqR0WI8bxmEcxi1dyomjaqAZNINmuLkJ9YR6Qr0nNzldVQg0kSbSxHPnir8gnd3doUNpa8TIY4m0kTbSxldeKf66vCPy7pS7U+5OuXBBsR43gAbQQPk5GFY2tJ/2035vb7nEjNLxVNTlyMuRlyOdnWkNraE1TZooHQ8rG/wn/hP/2bu30nEoTZB2lu/YUeKVAiiAgpo1rWOtY61j160rOvu7GOkXWqUS74p3xbuzZ9uchKoJNaFmUpK0oefPP5XuOKtiLGABi5NTZnRmdGa0m5vS4VRUXmpeal5q/folFpuwKoFu0226zf9uamGCMEGYsGwZvUVv0Vsff0ybaBNtcneXG1AGZVBGYKBlhGWEZcRPPxlbG1sbWyckwKfwKXz655/iUfGoeLRHD3genofnfXxsfqfBMBgGf/klHIfjcFzpbj9EFERBVHIypmEaph05onQ41UY2ZEN2zZrSPpwxY2w1c5zpONNxplwhIDtb6bDLSzVTNVM1s0EDafm87XaYjumYvmgRzIf5MD8vT+m4q41syIbsHj2k/4/t2ysdjr1Sa7QarUZ765a0DPfdd6Udmrt2SRtpVCq54V9Le7z/fmm/AS7BJbgkKkq7ULtQu/DgQaU7/EiLYTEsTkzUoha1D1m2zB6vouWU+8R94r533pGrpBZvZ91l3WXd1b49+IM/+KenKx13uft7hs7QmQ4dwBd8wbfk6/g6vo6v//mn5rTmtOb0hAk4EAfiQC6ZU1nE6eJ0cbpcnZcTiC1FO9GLluGOh/EwfsgQ+Uzv8l5YThyaBZoFmgUREUp3lNk3eTklbsWtuPXECZsNXcAFXF59Vel4K4oG0AAa8PLLNl9fS2tpbWoq11pj9qxEMUWdXqfX6TdvlqrtennhPJyH85YtA2dwBufffitxhXiIh/i8PCiEQij8978FFFDArl2lO44JE3jDDSuTC3ABLjzkQK5v4Bv4JiBA2gha9eZCDG4GN4Obh4e0qMR2ySCcjbNx9r59SsfL2MPYPA9EOlnv8mVtjDZGGzNmjK6hrqGu4fPPm/eY95j31K1r+cHyg+UHDw9tmDZMG+bqqmuua65r/tpr0pAYzx2wcmoOzaH5+vVFJSSKu3cgkLQRdPJkpcMtK+Fr4Wvh62nTbJb8iYIoiLJYpNJB69crHS9jD1PmA6W8w7zDvMOys72CvYK9gq9d4zsM9jhJd66iCLWgFtRKSLDVjupSXaobFibVcnvhBaXjfhR5A6tU+eHDD202bAftoN3338sf4JSOm7GH4RMJmV0SjgpHhaOLF9ts0A/6QT9nZ6un1dPq+e230o5uJyel4y5OrkItpAvpQnpcnM07D7nf+UK+kP+QfjNmRziBMLukWaFZoVmxezf6oR/67dxps+G9fUeYjdmYvXSpvWw0lPdH1RhVY1SNUatXS0NvL75oq71cOkgTognRhOzfr3T8jJUGJxBm18yLzIvMi0aPlibXbR+MI5WY+OADU5ApyBS0efO1kGsh10Jq1KjseOUqzyYXk4vJZds2QEDAN9+0+YZ7/bKmWlOtqeHhlR0vYxXBCYTZtaK5tqk4FaeGhdk6ilRGS2gJLXnjjdxzuedyzyUlSUNbrVo96TilKtOdOjn2cezj2OfYMTpFp+hUyZI+ReRikbmYi7mjRulz9Dn6nKtXFfoxM1YunEBYlaA9rj2uPS6vzipFEbtVsApW+ftLpUJSU+Vzb0Qv0Uv0at26vHHIQ2RS1en27aUEtWkTOZETOR05Ar2gF/Ty9X3khZzBGZwjIqTJ8m+/Vfrny1h5qCt+CcYqj3Qi3Lx5YpqYJqbVqSMVI3zIct7+0B/6CwIBAcHw4dAX+kLf4cPFYDFYDL5wAa7Ddbi+Zw8FUAAFXLwII2EkjLx6FYMxGIMR4RScglMNG1IIhVBIkyZikpgkJvXtiw2xITb09JTmNkofP+7AHbhj5kztJO0k7aQFC5T+eTJWEZxAWJWkTdYma5OnTDF6G72N3qdP42v4Gr62YgXNpbk018XlUe+nGIqhGLkKbsnaW7SBNtCGiscplySBGTADZgQHS4mD7zjY04GHsFiVpjPrzDrzxo14GA/j4Q4dpB3elX9QWQkfwAfwwZEj5nBzuDm8bVseqmJPI04g7KmgydJkabLS07WZ2kxtZocONJ2m0/Q+faTzX9LSnngAURAFUWfOAAEBDR6sO6I7ojvStau0CKDkeTuMPQ3sLoFkxmTGZMY0a2aYa5hrmOvtrXQ8rGrSx+pj9bGJidoa2hraGm3aCGFCmBDWpQs8B8/BcwsWYCAGYuCPP8oHnT3qeuiFXuhVUCAlitRUvIpX8epXX8lHNEtzMy1ayLXklO4/Y5XBbuZApMTh6qqOV8er40+epO7UnboLwsWLFy9evOjh0ahRo0aNGt24oXScrGr5azXb5GSoDbWhdnKy/PpBOkgHSa1ulNcor1Geh4d5p3mneWedOuRP/uRPpLaqrWrrjRtNzU3NTc1XrxaV7omGaIhWuneMKctuEojaXe2udq9du/gkaOGCwgWFC+QDrjiBsMerJ/bEnmg2S48uXvzrV8bYw9jdEBZjjLGqodITiFQ99cUXjW2NbY1tY2ONBqPBaIiLgx/gB/hh6dLi7clMZjIvWiS3k9937vy58+fO+/kp/QNkjLHqqtKHsKSjPIODIRZiIfbtt4ueD6VQCn3AG8IhHML79St6HAuxEAugmqOao5pz86b0pO0ztBljjD0ZlX4HQvtpP+1ftAin43Scvnq1tOxx82bpCNxdu0q8IQqiICo+vqjdHtyDe9asEX4TfhN+4528jDGmlEq/A5GWO5pM0qMRI+Q7CqkYnaen9PylS3J7VKMa1ePHa/VavVYvikr/wBhjjEl4Ep0xxli52E0CyT2SeyT3SE4O7IW9sPfmTfRFX/S9fVuaRM/KUjo+xhhjf2U3+0D8Iv0i/SJzcw1uBjeDm68vbsJNuEkQdAN1A3UD//hD6fgYY4z9ld0kEFnRwToDYSAMVDoaxhhjttjNEBZjjLGqhRMIY4yxcuEEwhhjrFw4gTDGGCsXTiCMMcbKhRMIY4yxcuEEwhhjrFw4gTDGGCsXTiCMMcbKhRMIY4yxcuEEwhhjrFw4gTDGGCsXTiCMMcbKxe6q8SouDMIgLCBA7Cx2Fjs/84zS4TDGFBAHcRDXvTu8B+/Be0oHY784gRQXDuEQ3rkzAQFB585Kh8MYY/aq+g1hTYWpMNViUToMxlgVtgt2wS7+O1LtEghuwS245fRppeNgjFVd2BybY/O0NKXjUFq1G8IqvFV4q/DWxx87dHXo6tAVgGbQDJrh5aV0XIyxKmAZLINl6emYh3mY98knSofDGGOMMcYYY4wxxhhjjDHGGGOMMTvx/67gRurpLATkAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIwLTAzLTA3VDE5OjE1OjMzKzA4OjAwFd3SpQAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMC0wMy0wN1QxOToxNTozMyswODowMGSAahkAAABMdEVYdHN2ZzpiYXNlLXVyaQBmaWxlOi8vL2hvbWUvYWRtaW4vaWNvbi1mb250L3RtcC9pY29uX2hoamJsdW9neGIvemFud3VzaHVqdS5zdmcoH56kAAAAAElFTkSuQmCC"

/***/ }),

/***/ 678:
/*!****************************************************************************!*\
  !*** D:/lixindom/2020/伊籭商城/beefShop/components/s-pull-scroll/back-top.png ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABIBAMAAACnw650AAAAJ1BMVEUAAACGhobFxcX6+vpubm6qqqqZmZng4ODY2Ni4uLguLi5SUlL///8JT6i7AAAADHRSTlNNeqb1b5CFx72bWGN+OwvvAAAAnElEQVRIx+3MsQ2CUBSF4WOChVbGxAG0cAEtKV7iAtpYWTmHI1gwAiOwAyFQ3KE4eaGABO7tSCD3r/988Dxv0E/61RgtHUwlRjte+p0xS8ktwOwhdxtKpQw2JKQsqJE/KQN6yYmUDlUbOXxIqdCT05aUCoETSKlQnEipUJxIFZhoRyhOpDJMtL+im/DNoRUn5tNKp0QC7N7wvIXUAut4SPYhibFYAAAAAElFTkSuQmCC"

/***/ }),

/***/ 786:
/*!************************************************************************!*\
  !*** D:/lixindom/2020/伊籭商城/beefShop/components/nyn-city-list/citys.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = {
  "hotCities": [{
    "id": 1,
    "spell": "beijing",
    "name": "北京" },
  {
    "id": 3,
    "spell": "shanghai",
    "name": "上海" },
  {
    "id": 47,
    "spell": "xian",
    "name": "西安" },
  {
    "id": 239,
    "spell": "sanya",
    "name": "三亚" },
  {
    "id": 188,
    "spell": "lijiang",
    "name": "丽江" },
  {
    "id": 125,
    "spell": "guilin",
    "name": "桂林" }],

  "cities": {
    "A": [{
      "id": 56,
      "spell": "aba",
      "name": "阿坝" },
    {
      "id": 57,
      "spell": "akesu",
      "name": "阿克苏" },
    {
      "id": 58,
      "spell": "alashanmeng",
      "name": "阿拉善盟" },
    {
      "id": 59,
      "spell": "aletai",
      "name": "阿勒泰" },
    {
      "id": 60,
      "spell": "ali",
      "name": "阿里" },
    {
      "id": 61,
      "spell": "ankang",
      "name": "安康" },
    {
      "id": 62,
      "spell": "anqing",
      "name": "安庆" },
    {
      "id": 63,
      "spell": "anshan",
      "name": "鞍山" },
    {
      "id": 64,
      "spell": "anshun",
      "name": "安顺" },
    {
      "id": 65,
      "spell": "anyang",
      "name": "安阳" },
    {
      "id": 338,
      "spell": "acheng",
      "name": "阿城" },
    {
      "id": 339,
      "spell": "anfu",
      "name": "安福" },
    {
      "id": 340,
      "spell": "anji",
      "name": "安吉" },
    {
      "id": 341,
      "spell": "anning",
      "name": "安宁" },
    {
      "id": 342,
      "spell": "anqiu",
      "name": "安丘" },
    {
      "id": 343,
      "spell": "anxi",
      "name": "安溪" },
    {
      "id": 344,
      "spell": "anyi",
      "name": "安义" },
    {
      "id": 345,
      "spell": "anyuan",
      "name": "安远" }],

    "B": [{
      "id": 1,
      "spell": "beijing",
      "name": "北京" },
    {
      "id": 66,
      "spell": "baicheng",
      "name": "白城" },
    {
      "id": 67,
      "spell": "baise",
      "name": "百色" },
    {
      "id": 68,
      "spell": "baishan",
      "name": "白山" },
    {
      "id": 69,
      "spell": "baiyin",
      "name": "白银" },
    {
      "id": 70,
      "spell": "bangbu",
      "name": "蚌埠" },
    {
      "id": 71,
      "spell": "baoding",
      "name": "保定" },
    {
      "id": 72,
      "spell": "baoji",
      "name": "宝鸡" },
    {
      "id": 73,
      "spell": "baoshan",
      "name": "保山" },
    {
      "id": 74,
      "spell": "baotou",
      "name": "包头" },
    {
      "id": 75,
      "spell": "bayannaoer",
      "name": "巴彦淖尔" },
    {
      "id": 76,
      "spell": "bayinguoleng",
      "name": "巴音郭楞" },
    {
      "id": 77,
      "spell": "bazhong",
      "name": "巴中" },
    {
      "id": 78,
      "spell": "beihai",
      "name": "北海" },
    {
      "id": 79,
      "spell": "benxi",
      "name": "本溪" },
    {
      "id": 80,
      "spell": "bijie",
      "name": "毕节" },
    {
      "id": 81,
      "spell": "binzhou",
      "name": "滨州" },
    {
      "id": 82,
      "spell": "boertala",
      "name": "博尔塔拉" },
    {
      "id": 83,
      "spell": "bozhou",
      "name": "亳州" },
    {
      "id": 346,
      "spell": "baoying",
      "name": "宝应" },
    {
      "id": 347,
      "spell": "bayan",
      "name": "巴彦" },
    {
      "id": 348,
      "spell": "binhai",
      "name": "滨海" },
    {
      "id": 349,
      "spell": "binxian",
      "name": "宾县" },
    {
      "id": 350,
      "spell": "binyang",
      "name": "宾阳" },
    {
      "id": 351,
      "spell": "bishan",
      "name": "璧山" },
    {
      "id": 352,
      "spell": "boai",
      "name": "博爱" },
    {
      "id": 353,
      "spell": "boluo",
      "name": "博罗" },
    {
      "id": 354,
      "spell": "boxing",
      "name": "博兴" }],

    "C": [{
      "id": 2,
      "spell": "chongqing",
      "name": "重庆" },
    {
      "id": 5,
      "spell": "changchun",
      "name": "长春" },
    {
      "id": 6,
      "spell": "changsha",
      "name": "长沙" },
    {
      "id": 7,
      "spell": "changzhou",
      "name": "常州" },
    {
      "id": 8,
      "spell": "chengdu",
      "name": "成都" },
    {
      "id": 84,
      "spell": "cangzhou",
      "name": "沧州" },
    {
      "id": 85,
      "spell": "changde",
      "name": "常德" },
    {
      "id": 86,
      "spell": "changdu",
      "name": "昌都" },
    {
      "id": 87,
      "spell": "changji",
      "name": "昌吉" },
    {
      "id": 88,
      "spell": "changzhi",
      "name": "长治" },
    {
      "id": 89,
      "spell": "chaohu",
      "name": "巢湖" },
    {
      "id": 90,
      "spell": "chaoyang",
      "name": "朝阳" },
    {
      "id": 91,
      "spell": "chaozhou",
      "name": "潮州" },
    {
      "id": 92,
      "spell": "chengde",
      "name": "承德" },
    {
      "id": 93,
      "spell": "chenzhou",
      "name": "郴州" },
    {
      "id": 94,
      "spell": "chifeng",
      "name": "赤峰" },
    {
      "id": 95,
      "spell": "chizhou",
      "name": "池州" },
    {
      "id": 96,
      "spell": "chongzuo",
      "name": "崇左" },
    {
      "id": 97,
      "spell": "chuxiong",
      "name": "楚雄" },
    {
      "id": 98,
      "spell": "chuzhou",
      "name": "滁州" },
    {
      "id": 355,
      "spell": "cangnan",
      "name": "苍南" },
    {
      "id": 356,
      "spell": "cangshan",
      "name": "苍山" },
    {
      "id": 357,
      "spell": "caoxian",
      "name": "曹县" },
    {
      "id": 358,
      "spell": "changdao",
      "name": "长岛" },
    {
      "id": 359,
      "spell": "changfeng",
      "name": "长丰" },
    {
      "id": 360,
      "spell": "changhai",
      "name": "长海" },
    {
      "id": 361,
      "spell": "changle",
      "name": "长乐" },
    {
      "id": 362,
      "spell": "changle",
      "name": "昌乐" },
    {
      "id": 363,
      "spell": "changshan",
      "name": "常山" },
    {
      "id": 364,
      "spell": "changshu",
      "name": "常熟" },
    {
      "id": 365,
      "spell": "changtai",
      "name": "长泰" },
    {
      "id": 366,
      "spell": "changting",
      "name": "长汀" },
    {
      "id": 367,
      "spell": "changxing",
      "name": "长兴" },
    {
      "id": 368,
      "spell": "changyi",
      "name": "昌邑" },
    {
      "id": 369,
      "spell": "chaoan",
      "name": "潮安" },
    {
      "id": 370,
      "spell": "chenggong",
      "name": "呈贡" },
    {
      "id": 371,
      "spell": "chengkou",
      "name": "城口" },
    {
      "id": 372,
      "spell": "chengwu",
      "name": "成武" },
    {
      "id": 373,
      "spell": "chiping",
      "name": "茌平" },
    {
      "id": 374,
      "spell": "chongren",
      "name": "崇仁" },
    {
      "id": 375,
      "spell": "chongyi",
      "name": "崇义" },
    {
      "id": 376,
      "spell": "chongzhou",
      "name": "崇州" },
    {
      "id": 377,
      "spell": "chunan",
      "name": "淳安" },
    {
      "id": 378,
      "spell": "cixi",
      "name": "慈溪" },
    {
      "id": 379,
      "spell": "conghua",
      "name": "从化" },
    {
      "id": 380,
      "spell": "congyang",
      "name": "枞阳" }],

    "D": [{
      "id": 9,
      "spell": "dalian",
      "name": "大连" },
    {
      "id": 10,
      "spell": "dongguan",
      "name": "东莞" },
    {
      "id": 99,
      "spell": "dali",
      "name": "大理" },
    {
      "id": 100,
      "spell": "dandong",
      "name": "丹东" },
    {
      "id": 101,
      "spell": "daqing",
      "name": "大庆" },
    {
      "id": 102,
      "spell": "datong",
      "name": "大同" },
    {
      "id": 103,
      "spell": "daxinganling",
      "name": "大兴安岭" },
    {
      "id": 104,
      "spell": "dazhou",
      "name": "达州" },
    {
      "id": 105,
      "spell": "dehong",
      "name": "德宏" },
    {
      "id": 106,
      "spell": "deyang",
      "name": "德阳" },
    {
      "id": 107,
      "spell": "dezhou",
      "name": "德州" },
    {
      "id": 108,
      "spell": "dingxi",
      "name": "定西" },
    {
      "id": 109,
      "spell": "diqing",
      "name": "迪庆" },
    {
      "id": 110,
      "spell": "dongying",
      "name": "东营" },
    {
      "id": 381,
      "spell": "dafeng",
      "name": "大丰" },
    {
      "id": 382,
      "spell": "daishan",
      "name": "岱山" },
    {
      "id": 383,
      "spell": "dangshan",
      "name": "砀山" },
    {
      "id": 384,
      "spell": "dangtu",
      "name": "当涂" },
    {
      "id": 385,
      "spell": "danxian",
      "name": "单县" },
    {
      "id": 386,
      "spell": "danyang",
      "name": "丹阳" },
    {
      "id": 387,
      "spell": "dapu",
      "name": "大埔" },
    {
      "id": 388,
      "spell": "datian",
      "name": "大田" },
    {
      "id": 389,
      "spell": "dayi",
      "name": "大邑" },
    {
      "id": 390,
      "spell": "dayu",
      "name": "大余" },
    {
      "id": 391,
      "spell": "dazu",
      "name": "大足" },
    {
      "id": 392,
      "spell": "dean",
      "name": "德安" },
    {
      "id": 393,
      "spell": "dehua",
      "name": "德化" },
    {
      "id": 394,
      "spell": "dehui",
      "name": "德惠" },
    {
      "id": 395,
      "spell": "dengfeng",
      "name": "登封" },
    {
      "id": 396,
      "spell": "deqing",
      "name": "德清" },
    {
      "id": 397,
      "spell": "deqing",
      "name": "德庆" },
    {
      "id": 398,
      "spell": "dexing",
      "name": "德兴" },
    {
      "id": 399,
      "spell": "dianbai",
      "name": "电白" },
    {
      "id": 400,
      "spell": "dianjiang",
      "name": "垫江" },
    {
      "id": 401,
      "spell": "dingnan",
      "name": "定南" },
    {
      "id": 402,
      "spell": "dingtao",
      "name": "定陶" },
    {
      "id": 403,
      "spell": "dingyuan",
      "name": "定远" },
    {
      "id": 404,
      "spell": "donga",
      "name": "东阿" },
    {
      "id": 405,
      "spell": "donghai",
      "name": "东海" },
    {
      "id": 406,
      "spell": "dongming",
      "name": "东明" },
    {
      "id": 407,
      "spell": "dongping",
      "name": "东平" },
    {
      "id": 408,
      "spell": "dongshan",
      "name": "东山" },
    {
      "id": 409,
      "spell": "dongtai",
      "name": "东台" },
    {
      "id": 410,
      "spell": "dongtou",
      "name": "洞头" },
    {
      "id": 411,
      "spell": "dongxiang",
      "name": "东乡" },
    {
      "id": 412,
      "spell": "dongyang",
      "name": "东阳" },
    {
      "id": 413,
      "spell": "dongyuan",
      "name": "东源" },
    {
      "id": 414,
      "spell": "dongzhi",
      "name": "东至" },
    {
      "id": 415,
      "spell": "duchang",
      "name": "都昌" },
    {
      "id": 416,
      "spell": "dujiangyan",
      "name": "都江堰" }],

    "E": [{
      "id": 111,
      "spell": "eerduosi",
      "name": "鄂尔多斯" },
    {
      "id": 112,
      "spell": "enshi",
      "name": "恩施" },
    {
      "id": 113,
      "spell": "ezhou",
      "name": "鄂州" },
    {
      "id": 417,
      "spell": "enping",
      "name": "恩平" }],

    "F": [{
      "id": 11,
      "spell": "foshan",
      "name": "佛山" },
    {
      "id": 12,
      "spell": "fuzhou",
      "name": "福州" },
    {
      "id": 114,
      "spell": "fangchenggang",
      "name": "防城港" },
    {
      "id": 115,
      "spell": "fushun",
      "name": "抚顺" },
    {
      "id": 116,
      "spell": "fuxin",
      "name": "阜新" },
    {
      "id": 117,
      "spell": "fuyang",
      "name": "阜阳" },
    {
      "id": 118,
      "spell": "fuzhou",
      "name": "抚州" },
    {
      "id": 418,
      "spell": "faku",
      "name": "法库" },
    {
      "id": 419,
      "spell": "fanchang",
      "name": "繁昌" },
    {
      "id": 420,
      "spell": "fangzheng",
      "name": "方正" },
    {
      "id": 421,
      "spell": "feicheng",
      "name": "肥城" },
    {
      "id": 422,
      "spell": "feidong",
      "name": "肥东" },
    {
      "id": 423,
      "spell": "feixi",
      "name": "肥西" },
    {
      "id": 424,
      "spell": "feixian",
      "name": "费县" },
    {
      "id": 425,
      "spell": "fengcheng",
      "name": "丰城" },
    {
      "id": 426,
      "spell": "fengdu",
      "name": "丰都" },
    {
      "id": 427,
      "spell": "fenghua",
      "name": "奉化" },
    {
      "id": 428,
      "spell": "fengjie",
      "name": "奉节" },
    {
      "id": 429,
      "spell": "fengkai",
      "name": "封开" },
    {
      "id": 430,
      "spell": "fengshun",
      "name": "丰顺" },
    {
      "id": 431,
      "spell": "fengtai",
      "name": "凤台" },
    {
      "id": 432,
      "spell": "fengxian",
      "name": "丰县" },
    {
      "id": 433,
      "spell": "fengxin",
      "name": "奉新" },
    {
      "id": 434,
      "spell": "fengyang",
      "name": "凤阳" },
    {
      "id": 435,
      "spell": "fenyi",
      "name": "分宜" },
    {
      "id": 436,
      "spell": "fogang",
      "name": "佛冈" },
    {
      "id": 437,
      "spell": "fuan",
      "name": "福安" },
    {
      "id": 438,
      "spell": "fuding",
      "name": "福鼎" },
    {
      "id": 439,
      "spell": "fuliang",
      "name": "浮梁" },
    {
      "id": 440,
      "spell": "fumin",
      "name": "富民" },
    {
      "id": 441,
      "spell": "funan",
      "name": "阜南" },
    {
      "id": 442,
      "spell": "funing",
      "name": "阜宁" },
    {
      "id": 443,
      "spell": "fuqing",
      "name": "福清" },
    {
      "id": 444,
      "spell": "fuyang",
      "name": "富阳" }],

    "G": [{
      "id": 13,
      "spell": "guangzhou",
      "name": "广州" },
    {
      "id": 14,
      "spell": "guiyang",
      "name": "贵阳" },
    {
      "id": 119,
      "spell": "gannan",
      "name": "甘南" },
    {
      "id": 120,
      "spell": "ganzhou",
      "name": "赣州" },
    {
      "id": 121,
      "spell": "ganzi",
      "name": "甘孜" },
    {
      "id": 122,
      "spell": "guangan",
      "name": "广安" },
    {
      "id": 123,
      "spell": "guangyuan",
      "name": "广元" },
    {
      "id": 124,
      "spell": "guigang",
      "name": "贵港" },
    {
      "id": 125,
      "spell": "guilin",
      "name": "桂林" },
    {
      "id": 126,
      "spell": "guoluo",
      "name": "果洛" },
    {
      "id": 127,
      "spell": "guyuan",
      "name": "固原" },
    {
      "id": 445,
      "spell": "ganxian",
      "name": "赣县" },
    {
      "id": 446,
      "spell": "ganyu",
      "name": "赣榆" },
    {
      "id": 447,
      "spell": "gaoan",
      "name": "高安" },
    {
      "id": 448,
      "spell": "gaocheng",
      "name": "藁城" },
    {
      "id": 449,
      "spell": "gaochun",
      "name": "高淳" },
    {
      "id": 450,
      "spell": "gaolan",
      "name": "皋兰" },
    {
      "id": 451,
      "spell": "gaoling",
      "name": "高陵" },
    {
      "id": 452,
      "spell": "gaomi",
      "name": "高密" },
    {
      "id": 453,
      "spell": "gaoqing",
      "name": "高青" },
    {
      "id": 454,
      "spell": "gaotang",
      "name": "高唐" },
    {
      "id": 455,
      "spell": "gaoyao",
      "name": "高要" },
    {
      "id": 456,
      "spell": "gaoyi",
      "name": "高邑" },
    {
      "id": 457,
      "spell": "gaoyou",
      "name": "高邮" },
    {
      "id": 458,
      "spell": "gaozhou",
      "name": "高州" },
    {
      "id": 459,
      "spell": "gongyi",
      "name": "巩义" },
    {
      "id": 460,
      "spell": "guangchang",
      "name": "广昌" },
    {
      "id": 461,
      "spell": "guangde",
      "name": "广德" },
    {
      "id": 462,
      "spell": "guangfeng",
      "name": "广丰" },
    {
      "id": 463,
      "spell": "guangning",
      "name": "广宁" },
    {
      "id": 464,
      "spell": "guangrao",
      "name": "广饶" },
    {
      "id": 465,
      "spell": "guangze",
      "name": "光泽" },
    {
      "id": 466,
      "spell": "guannan",
      "name": "灌南" },
    {
      "id": 467,
      "spell": "guanxian",
      "name": "冠县" },
    {
      "id": 468,
      "spell": "guanyun",
      "name": "灌云" },
    {
      "id": 469,
      "spell": "guixi",
      "name": "贵溪" },
    {
      "id": 470,
      "spell": "gutian",
      "name": "古田" },
    {
      "id": 471,
      "spell": "guzhen",
      "name": "固镇" }],

    "H": [{
      "id": 15,
      "spell": "haerbin",
      "name": "哈尔滨" },
    {
      "id": 16,
      "spell": "haikou",
      "name": "海口" },
    {
      "id": 17,
      "spell": "handan",
      "name": "邯郸" },
    {
      "id": 18,
      "spell": "hangzhou",
      "name": "杭州" },
    {
      "id": 19,
      "spell": "hefei",
      "name": "合肥" },
    {
      "id": 20,
      "spell": "huizhou",
      "name": "惠州" },
    {
      "id": 128,
      "spell": "haibei",
      "name": "海北" },
    {
      "id": 129,
      "spell": "haidong",
      "name": "海东" },
    {
      "id": 130,
      "spell": "hainan",
      "name": "海南" },
    {
      "id": 131,
      "spell": "haixi",
      "name": "海西" },
    {
      "id": 132,
      "spell": "hami",
      "name": "哈密" },
    {
      "id": 133,
      "spell": "hanzhong",
      "name": "汉中" },
    {
      "id": 134,
      "spell": "hebi",
      "name": "鹤壁" },
    {
      "id": 135,
      "spell": "hechi",
      "name": "河池" },
    {
      "id": 136,
      "spell": "hegang",
      "name": "鹤岗" },
    {
      "id": 137,
      "spell": "heihe",
      "name": "黑河" },
    {
      "id": 138,
      "spell": "hengshui",
      "name": "衡水" },
    {
      "id": 139,
      "spell": "hengyang",
      "name": "衡阳" },
    {
      "id": 140,
      "spell": "hetiandi",
      "name": "和田地" },
    {
      "id": 141,
      "spell": "heyuan",
      "name": "河源" },
    {
      "id": 142,
      "spell": "heze",
      "name": "菏泽" },
    {
      "id": 143,
      "spell": "hezhou",
      "name": "贺州" },
    {
      "id": 144,
      "spell": "honghe",
      "name": "红河" },
    {
      "id": 145,
      "spell": "huaian",
      "name": "淮安" },
    {
      "id": 146,
      "spell": "huaibei",
      "name": "淮北" },
    {
      "id": 147,
      "spell": "huaihua",
      "name": "怀化" },
    {
      "id": 148,
      "spell": "huainan",
      "name": "淮南" },
    {
      "id": 149,
      "spell": "huanggang",
      "name": "黄冈" },
    {
      "id": 150,
      "spell": "huangnan",
      "name": "黄南" },
    {
      "id": 151,
      "spell": "huangshan",
      "name": "黄山" },
    {
      "id": 152,
      "spell": "huangshi",
      "name": "黄石" },
    {
      "id": 153,
      "spell": "huhehaote",
      "name": "呼和浩特" },
    {
      "id": 154,
      "spell": "huludao",
      "name": "葫芦岛" },
    {
      "id": 155,
      "spell": "hulunbeier",
      "name": "呼伦贝尔" },
    {
      "id": 156,
      "spell": "huzhou",
      "name": "湖州" },
    {
      "id": 472,
      "spell": "haian",
      "name": "海安" },
    {
      "id": 473,
      "spell": "haifeng",
      "name": "海丰" },
    {
      "id": 474,
      "spell": "haimen",
      "name": "海门" },
    {
      "id": 475,
      "spell": "haining",
      "name": "海宁" },
    {
      "id": 476,
      "spell": "haiyan",
      "name": "海盐" },
    {
      "id": 477,
      "spell": "haiyang",
      "name": "海阳" },
    {
      "id": 478,
      "spell": "hanshan",
      "name": "含山" },
    {
      "id": 479,
      "spell": "hechuan",
      "name": "合川" },
    {
      "id": 480,
      "spell": "hengfeng",
      "name": "横峰" },
    {
      "id": 481,
      "spell": "hengxian",
      "name": "横县" },
    {
      "id": 482,
      "spell": "heping",
      "name": "和平" },
    {
      "id": 483,
      "spell": "heshan",
      "name": "鹤山" },
    {
      "id": 484,
      "spell": "hexian",
      "name": "和县" },
    {
      "id": 485,
      "spell": "hongze",
      "name": "洪泽" },
    {
      "id": 486,
      "spell": "huaan",
      "name": "华安" },
    {
      "id": 487,
      "spell": "huadian",
      "name": "桦甸" },
    {
      "id": 488,
      "spell": "huaiji",
      "name": "怀集" },
    {
      "id": 489,
      "spell": "huaining",
      "name": "怀宁" },
    {
      "id": 490,
      "spell": "huaiyuan",
      "name": "怀远" },
    {
      "id": 491,
      "spell": "huantai",
      "name": "桓台" },
    {
      "id": 492,
      "spell": "huazhou",
      "name": "化州" },
    {
      "id": 493,
      "spell": "huian",
      "name": "惠安" },
    {
      "id": 494,
      "spell": "huichang",
      "name": "会昌" },
    {
      "id": 495,
      "spell": "huidong",
      "name": "惠东" },
    {
      "id": 496,
      "spell": "huilai",
      "name": "惠来" },
    {
      "id": 497,
      "spell": "huimin",
      "name": "惠民" },
    {
      "id": 498,
      "spell": "hukou",
      "name": "湖口" },
    {
      "id": 499,
      "spell": "hulan",
      "name": "呼兰" },
    {
      "id": 500,
      "spell": "huoqiu",
      "name": "霍邱" },
    {
      "id": 501,
      "spell": "huoshan",
      "name": "霍山" },
    {
      "id": 502,
      "spell": "huxian",
      "name": "户县" }],

    "J": [{
      "id": 21,
      "spell": "jiaozuo",
      "name": "焦作" },
    {
      "id": 22,
      "spell": "jiaxing",
      "name": "嘉兴" },
    {
      "id": 23,
      "spell": "jilin",
      "name": "吉林" },
    {
      "id": 24,
      "spell": "jinan",
      "name": "济南" },
    {
      "id": 157,
      "spell": "jiamusi",
      "name": "佳木斯" },
    {
      "id": 158,
      "spell": "jiangmen",
      "name": "江门" },
    {
      "id": 159,
      "spell": "jian",
      "name": "吉安" },
    {
      "id": 160,
      "spell": "jiayuguan",
      "name": "嘉峪关" },
    {
      "id": 161,
      "spell": "jieyang",
      "name": "揭阳" },
    {
      "id": 162,
      "spell": "jinchang",
      "name": "金昌" },
    {
      "id": 163,
      "spell": "jincheng",
      "name": "晋城" },
    {
      "id": 164,
      "spell": "jingdezhen",
      "name": "景德镇" },
    {
      "id": 165,
      "spell": "jingmen",
      "name": "荆门" },
    {
      "id": 166,
      "spell": "jingzhou",
      "name": "荆州" },
    {
      "id": 167,
      "spell": "jinhua",
      "name": "金华" },
    {
      "id": 168,
      "spell": "jining",
      "name": "济宁" },
    {
      "id": 169,
      "spell": "jinzhong",
      "name": "晋中" },
    {
      "id": 170,
      "spell": "jinzhou",
      "name": "锦州" },
    {
      "id": 171,
      "spell": "jiujiang",
      "name": "九江" },
    {
      "id": 172,
      "spell": "jiuquan",
      "name": "酒泉" },
    {
      "id": 173,
      "spell": "jixi",
      "name": "鸡西" },
    {
      "id": 503,
      "spell": "jiande",
      "name": "建德" },
    {
      "id": 504,
      "spell": "jiangdu",
      "name": "江都" },
    {
      "id": 505,
      "spell": "jiangjin",
      "name": "江津" },
    {
      "id": 506,
      "spell": "jiangle",
      "name": "将乐" },
    {
      "id": 507,
      "spell": "jiangshan",
      "name": "江山" },
    {
      "id": 508,
      "spell": "jiangyan",
      "name": "姜堰" },
    {
      "id": 509,
      "spell": "jiangyin",
      "name": "江阴" },
    {
      "id": 510,
      "spell": "jianhu",
      "name": "建湖" },
    {
      "id": 511,
      "spell": "jianning",
      "name": "建宁" },
    {
      "id": 512,
      "spell": "jianou",
      "name": "建瓯" },
    {
      "id": 513,
      "spell": "jianyang",
      "name": "建阳" },
    {
      "id": 514,
      "spell": "jian",
      "name": "吉安" },
    {
      "id": 515,
      "spell": "jiaohe",
      "name": "蛟河" },
    {
      "id": 516,
      "spell": "jiaoling",
      "name": "蕉岭" },
    {
      "id": 517,
      "spell": "jiaonan",
      "name": "胶南" },
    {
      "id": 518,
      "spell": "jiaozhou",
      "name": "胶州" },
    {
      "id": 519,
      "spell": "jiashan",
      "name": "嘉善" },
    {
      "id": 520,
      "spell": "jiaxiang",
      "name": "嘉祥" },
    {
      "id": 521,
      "spell": "jiedong",
      "name": "揭东" },
    {
      "id": 522,
      "spell": "jieshou",
      "name": "界首" },
    {
      "id": 523,
      "spell": "jiexi",
      "name": "揭西" },
    {
      "id": 524,
      "spell": "jimo",
      "name": "即墨" },
    {
      "id": 525,
      "spell": "jingan",
      "name": "靖安" },
    {
      "id": 526,
      "spell": "jingde",
      "name": "旌德" },
    {
      "id": 527,
      "spell": "jinggangshan",
      "name": "井冈山" },
    {
      "id": 528,
      "spell": "jingjiang",
      "name": "靖江" },
    {
      "id": 529,
      "spell": "jingning",
      "name": "景宁" },
    {
      "id": 530,
      "spell": "jingxian",
      "name": "泾县" },
    {
      "id": 531,
      "spell": "jingxing",
      "name": "井陉" },
    {
      "id": 532,
      "spell": "jinhu",
      "name": "金湖" },
    {
      "id": 533,
      "spell": "jinjiang",
      "name": "晋江" },
    {
      "id": 534,
      "spell": "jinmen",
      "name": "金门" },
    {
      "id": 535,
      "spell": "jinning",
      "name": "晋宁" },
    {
      "id": 536,
      "spell": "jintan",
      "name": "金坛" },
    {
      "id": 537,
      "spell": "jintang",
      "name": "金堂" },
    {
      "id": 538,
      "spell": "jinxian",
      "name": "进贤" },
    {
      "id": 539,
      "spell": "jinxi",
      "name": "金溪" },
    {
      "id": 540,
      "spell": "jinxiang",
      "name": "金乡" },
    {
      "id": 541,
      "spell": "jinyun",
      "name": "缙云" },
    {
      "id": 542,
      "spell": "jinzhai",
      "name": "金寨" },
    {
      "id": 543,
      "spell": "jinzhou",
      "name": "晋州" },
    {
      "id": 544,
      "spell": "jishui",
      "name": "吉水" },
    {
      "id": 545,
      "spell": "jiujiang",
      "name": "九江" },
    {
      "id": 546,
      "spell": "jiutai",
      "name": "九台" },
    {
      "id": 547,
      "spell": "jixi",
      "name": "绩溪" },
    {
      "id": 548,
      "spell": "jiyang",
      "name": "济阳" },
    {
      "id": 549,
      "spell": "jiyuan",
      "name": "济源" },
    {
      "id": 550,
      "spell": "juancheng",
      "name": "鄄城" },
    {
      "id": 551,
      "spell": "junan",
      "name": "莒南" },
    {
      "id": 552,
      "spell": "jurong",
      "name": "句容" },
    {
      "id": 553,
      "spell": "juxian",
      "name": "莒县" },
    {
      "id": 554,
      "spell": "juye",
      "name": "巨野" }],

    "K": [{
      "id": 25,
      "spell": "kunming",
      "name": "昆明" },
    {
      "id": 174,
      "spell": "kaifeng",
      "name": "开封" },
    {
      "id": 175,
      "spell": "kashidi",
      "name": "喀什地" },
    {
      "id": 176,
      "spell": "kelamayi",
      "name": "克拉玛依" },
    {
      "id": 177,
      "spell": "kezile",
      "name": "克孜勒" },
    {
      "id": 555,
      "spell": "kaihua",
      "name": "开化" },
    {
      "id": 556,
      "spell": "kaiping",
      "name": "开平" },
    {
      "id": 557,
      "spell": "kaixian",
      "name": "开县" },
    {
      "id": 558,
      "spell": "kaiyang",
      "name": "开阳" },
    {
      "id": 559,
      "spell": "kangping",
      "name": "康平" },
    {
      "id": 560,
      "spell": "kenli",
      "name": "垦利" },
    {
      "id": 561,
      "spell": "kunshan",
      "name": "昆山" }],

    "L": [{
      "id": 26,
      "spell": "lanzhou",
      "name": "兰州" },
    {
      "id": 27,
      "spell": "liuzhou",
      "name": "柳州" },
    {
      "id": 28,
      "spell": "luoyang",
      "name": "洛阳" },
    {
      "id": 178,
      "spell": "laibin",
      "name": "来宾" },
    {
      "id": 180,
      "spell": "langfang",
      "name": "廊坊" },
    {
      "id": 181,
      "spell": "lasa",
      "name": "拉萨" },
    {
      "id": 182,
      "spell": "leshan",
      "name": "乐山" },
    {
      "id": 183,
      "spell": "liangshan",
      "name": "凉山" },
    {
      "id": 184,
      "spell": "lianyungang",
      "name": "连云港" },
    {
      "id": 185,
      "spell": "liaocheng",
      "name": "聊城" },
    {
      "id": 186,
      "spell": "liaoyang",
      "name": "辽阳" },
    {
      "id": 187,
      "spell": "liaoyuan",
      "name": "辽源" },
    {
      "id": 188,
      "spell": "lijiang",
      "name": "丽江" },
    {
      "id": 189,
      "spell": "lincang",
      "name": "临沧" },
    {
      "id": 190,
      "spell": "linfen",
      "name": "临汾" },
    {
      "id": 191,
      "spell": "linxia",
      "name": "临夏" },
    {
      "id": 192,
      "spell": "linyi",
      "name": "临沂" },
    {
      "id": 193,
      "spell": "linzhi",
      "name": "林芝" },
    {
      "id": 194,
      "spell": "lishui",
      "name": "丽水" },
    {
      "id": 195,
      "spell": "liuan",
      "name": "六安" },
    {
      "id": 196,
      "spell": "liupanshui",
      "name": "六盘水" },
    {
      "id": 197,
      "spell": "longnan",
      "name": "陇南" },
    {
      "id": 198,
      "spell": "longyan",
      "name": "龙岩" },
    {
      "id": 199,
      "spell": "loudi",
      "name": "娄底" },
    {
      "id": 200,
      "spell": "luohe",
      "name": "漯河" },
    {
      "id": 201,
      "spell": "luzhou",
      "name": "泸州" },
    {
      "id": 202,
      "spell": "lvliang",
      "name": "吕梁" },
    {
      "id": 562,
      "spell": "laian",
      "name": "来安" },
    {
      "id": 563,
      "spell": "laixi",
      "name": "莱西" },
    {
      "id": 564,
      "spell": "laiyang",
      "name": "莱阳" },
    {
      "id": 565,
      "spell": "laizhou",
      "name": "莱州" },
    {
      "id": 566,
      "spell": "langxi",
      "name": "郎溪" },
    {
      "id": 567,
      "spell": "lantian",
      "name": "蓝田" },
    {
      "id": 568,
      "spell": "lanxi",
      "name": "兰溪" },
    {
      "id": 569,
      "spell": "lean",
      "name": "乐安" },
    {
      "id": 570,
      "spell": "lechang",
      "name": "乐昌" },
    {
      "id": 571,
      "spell": "leizhou",
      "name": "雷州" },
    {
      "id": 572,
      "spell": "leling",
      "name": "乐陵" },
    {
      "id": 573,
      "spell": "leping",
      "name": "乐平" },
    {
      "id": 574,
      "spell": "leqing",
      "name": "乐清" },
    {
      "id": 575,
      "spell": "leting",
      "name": "乐亭" },
    {
      "id": 576,
      "spell": "liancheng",
      "name": "连城" },
    {
      "id": 577,
      "spell": "liangping",
      "name": "梁平" },
    {
      "id": 578,
      "spell": "liangshan",
      "name": "梁山" },
    {
      "id": 579,
      "spell": "lianhua",
      "name": "莲花" },
    {
      "id": 580,
      "spell": "lianjiang",
      "name": "连江" },
    {
      "id": 581,
      "spell": "lianjiang",
      "name": "廉江" },
    {
      "id": 582,
      "spell": "liannan",
      "name": "连南" },
    {
      "id": 583,
      "spell": "lianping",
      "name": "连平" },
    {
      "id": 584,
      "spell": "lianshan",
      "name": "连山" },
    {
      "id": 585,
      "spell": "lianshui",
      "name": "涟水" },
    {
      "id": 586,
      "spell": "lianzhou",
      "name": "连州" },
    {
      "id": 587,
      "spell": "liaozhong",
      "name": "辽中" },
    {
      "id": 588,
      "spell": "lichuan",
      "name": "黎川" },
    {
      "id": 589,
      "spell": "lijin",
      "name": "利津" },
    {
      "id": 590,
      "spell": "linan",
      "name": "临安" },
    {
      "id": 591,
      "spell": "lingbi",
      "name": "灵璧" },
    {
      "id": 592,
      "spell": "lingshou",
      "name": "灵寿" },
    {
      "id": 593,
      "spell": "lingxian",
      "name": "陵县" },
    {
      "id": 594,
      "spell": "linhai",
      "name": "临海" },
    {
      "id": 595,
      "spell": "linqing",
      "name": "临清" },
    {
      "id": 596,
      "spell": "linquan",
      "name": "临泉" },
    {
      "id": 597,
      "spell": "linqu",
      "name": "临朐" },
    {
      "id": 598,
      "spell": "linshu",
      "name": "临沭" },
    {
      "id": 599,
      "spell": "linyi",
      "name": "临邑" },
    {
      "id": 600,
      "spell": "lishui",
      "name": "溧水" },
    {
      "id": 601,
      "spell": "liucheng",
      "name": "柳城" },
    {
      "id": 602,
      "spell": "liujiang",
      "name": "柳江" },
    {
      "id": 603,
      "spell": "liuyang",
      "name": "浏阳" },
    {
      "id": 604,
      "spell": "lixin",
      "name": "利辛" },
    {
      "id": 605,
      "spell": "liyang",
      "name": "溧阳" },
    {
      "id": 606,
      "spell": "longan",
      "name": "隆安" },
    {
      "id": 607,
      "spell": "longchuan",
      "name": "龙川" },
    {
      "id": 608,
      "spell": "longhai",
      "name": "龙海" },
    {
      "id": 609,
      "spell": "longkou",
      "name": "龙口" },
    {
      "id": 610,
      "spell": "longmen",
      "name": "龙门" },
    {
      "id": 611,
      "spell": "longnan",
      "name": "龙南" },
    {
      "id": 612,
      "spell": "longquan",
      "name": "龙泉" },
    {
      "id": 613,
      "spell": "longyou",
      "name": "龙游" },
    {
      "id": 614,
      "spell": "luancheng",
      "name": "栾城" },
    {
      "id": 615,
      "spell": "luanchuan",
      "name": "栾川" },
    {
      "id": 616,
      "spell": "luannan",
      "name": "滦南" },
    {
      "id": 617,
      "spell": "luanxian",
      "name": "滦县" },
    {
      "id": 618,
      "spell": "lufeng",
      "name": "陆丰" },
    {
      "id": 619,
      "spell": "luhe",
      "name": "陆河" },
    {
      "id": 620,
      "spell": "lujiang",
      "name": "庐江" },
    {
      "id": 621,
      "spell": "luoding",
      "name": "罗定" },
    {
      "id": 622,
      "spell": "luoning",
      "name": "洛宁" },
    {
      "id": 623,
      "spell": "luoyuan",
      "name": "罗源" },
    {
      "id": 624,
      "spell": "luquan",
      "name": "鹿泉" },
    {
      "id": 625,
      "spell": "luquan",
      "name": "禄劝" },
    {
      "id": 626,
      "spell": "luxi",
      "name": "芦溪" },
    {
      "id": 627,
      "spell": "luzhai",
      "name": "鹿寨" }],

    "M": [{
      "id": 203,
      "spell": "maanshan",
      "name": "马鞍山" },
    {
      "id": 204,
      "spell": "maoming",
      "name": "茂名" },
    {
      "id": 205,
      "spell": "meishan",
      "name": "眉山" },
    {
      "id": 206,
      "spell": "meizhou",
      "name": "梅州" },
    {
      "id": 207,
      "spell": "mianyang",
      "name": "绵阳" },
    {
      "id": 208,
      "spell": "mudanjiang",
      "name": "牡丹江" },
    {
      "id": 628,
      "spell": "mashan",
      "name": "马山" },
    {
      "id": 629,
      "spell": "meixian",
      "name": "梅县" },
    {
      "id": 630,
      "spell": "mengcheng",
      "name": "蒙城" },
    {
      "id": 631,
      "spell": "mengjin",
      "name": "孟津" },
    {
      "id": 632,
      "spell": "mengyin",
      "name": "蒙阴" },
    {
      "id": 633,
      "spell": "mengzhou",
      "name": "孟州" },
    {
      "id": 634,
      "spell": "mingguang",
      "name": "明光" },
    {
      "id": 635,
      "spell": "mingxi",
      "name": "明溪" },
    {
      "id": 636,
      "spell": "minhou",
      "name": "闽侯" },
    {
      "id": 637,
      "spell": "minqing",
      "name": "闽清" },
    {
      "id": 638,
      "spell": "mulan",
      "name": "木兰" }],

    "N": [{
      "id": 29,
      "spell": "nanchang",
      "name": "南昌" },
    {
      "id": 30,
      "spell": "nanjing",
      "name": "南京" },
    {
      "id": 31,
      "spell": "nanning",
      "name": "南宁" },
    {
      "id": 32,
      "spell": "nantong",
      "name": "南通" },
    {
      "id": 33,
      "spell": "ningbo",
      "name": "宁波" },
    {
      "id": 209,
      "spell": "nanchong",
      "name": "南充" },
    {
      "id": 210,
      "spell": "nanping",
      "name": "南平" },
    {
      "id": 211,
      "spell": "nanyang",
      "name": "南阳" },
    {
      "id": 212,
      "spell": "naqu",
      "name": "那曲" },
    {
      "id": 213,
      "spell": "neijiang",
      "name": "内江" },
    {
      "id": 214,
      "spell": "ningde",
      "name": "宁德" },
    {
      "id": 215,
      "spell": "nujiang",
      "name": "怒江" },
    {
      "id": 639,
      "spell": "nanan",
      "name": "南安" },
    {
      "id": 640,
      "spell": "nanao",
      "name": "南澳" },
    {
      "id": 641,
      "spell": "nancheng",
      "name": "南城" },
    {
      "id": 642,
      "spell": "nanchuan",
      "name": "南川" },
    {
      "id": 643,
      "spell": "nanfeng",
      "name": "南丰" },
    {
      "id": 644,
      "spell": "nanjing",
      "name": "南靖" },
    {
      "id": 645,
      "spell": "nankang",
      "name": "南康" },
    {
      "id": 646,
      "spell": "nanling",
      "name": "南陵" },
    {
      "id": 647,
      "spell": "nanxiong",
      "name": "南雄" },
    {
      "id": 648,
      "spell": "ningdu",
      "name": "宁都" },
    {
      "id": 649,
      "spell": "ningguo",
      "name": "宁国" },
    {
      "id": 650,
      "spell": "ninghai",
      "name": "宁海" },
    {
      "id": 651,
      "spell": "ninghua",
      "name": "宁化" },
    {
      "id": 652,
      "spell": "ningjin",
      "name": "宁津" },
    {
      "id": 653,
      "spell": "ningxiang",
      "name": "宁乡" },
    {
      "id": 654,
      "spell": "ningyang",
      "name": "宁阳" },
    {
      "id": 655,
      "spell": "nongan",
      "name": "农安" }],

    "P": [{
      "id": 216,
      "spell": "panjin",
      "name": "盘锦" },
    {
      "id": 217,
      "spell": "panzhihua",
      "name": "攀枝花" },
    {
      "id": 218,
      "spell": "pingdingshan",
      "name": "平顶山" },
    {
      "id": 219,
      "spell": "pingliang",
      "name": "平凉" },
    {
      "id": 220,
      "spell": "pingxiang",
      "name": "萍乡" },
    {
      "id": 221,
      "spell": "puer",
      "name": "普洱" },
    {
      "id": 222,
      "spell": "putian",
      "name": "莆田" },
    {
      "id": 223,
      "spell": "puyang",
      "name": "濮阳" },
    {
      "id": 656,
      "spell": "panan",
      "name": "磐安" },
    {
      "id": 657,
      "spell": "panshi",
      "name": "磐石" },
    {
      "id": 658,
      "spell": "peixian",
      "name": "沛县" },
    {
      "id": 659,
      "spell": "penglai",
      "name": "蓬莱" },
    {
      "id": 660,
      "spell": "pengshui",
      "name": "彭水" },
    {
      "id": 661,
      "spell": "pengze",
      "name": "彭泽" },
    {
      "id": 662,
      "spell": "pengzhou",
      "name": "彭州" },
    {
      "id": 663,
      "spell": "pingdu",
      "name": "平度" },
    {
      "id": 664,
      "spell": "pinghe",
      "name": "平和" },
    {
      "id": 665,
      "spell": "pinghu",
      "name": "平湖" },
    {
      "id": 666,
      "spell": "pingnan",
      "name": "屏南" },
    {
      "id": 667,
      "spell": "pingshan",
      "name": "平山" },
    {
      "id": 668,
      "spell": "pingtan",
      "name": "平潭" },
    {
      "id": 669,
      "spell": "pingyang",
      "name": "平阳" },
    {
      "id": 670,
      "spell": "pingyin",
      "name": "平阴" },
    {
      "id": 671,
      "spell": "pingyi",
      "name": "平邑" },
    {
      "id": 672,
      "spell": "pingyuan",
      "name": "平原" },
    {
      "id": 673,
      "spell": "pingyuan",
      "name": "平远" },
    {
      "id": 674,
      "spell": "pixian",
      "name": "郫县" },
    {
      "id": 675,
      "spell": "pizhou",
      "name": "邳州" },
    {
      "id": 676,
      "spell": "poyang",
      "name": "鄱阳" },
    {
      "id": 677,
      "spell": "pucheng",
      "name": "浦城" },
    {
      "id": 678,
      "spell": "pujiang",
      "name": "浦江" },
    {
      "id": 679,
      "spell": "pujiang",
      "name": "蒲江" },
    {
      "id": 680,
      "spell": "pulandian",
      "name": "普兰店" },
    {
      "id": 681,
      "spell": "puning",
      "name": "普宁" }],

    "Q": [{
      "id": 34,
      "spell": "qingdao",
      "name": "青岛" },
    {
      "id": 35,
      "spell": "quanzhou",
      "name": "泉州" },
    {
      "id": 224,
      "spell": "qiandong",
      "name": "黔东" },
    {
      "id": 225,
      "spell": "qiannan",
      "name": "黔南" },
    {
      "id": 226,
      "spell": "qianxinan",
      "name": "黔西南" },
    {
      "id": 227,
      "spell": "qingyang",
      "name": "庆阳" },
    {
      "id": 228,
      "spell": "qingyuan",
      "name": "清远" },
    {
      "id": 229,
      "spell": "qinhuangdao",
      "name": "秦皇岛" },
    {
      "id": 230,
      "spell": "qinzhou",
      "name": "钦州" },
    {
      "id": 231,
      "spell": "qiqihaer",
      "name": "齐齐哈尔" },
    {
      "id": 232,
      "spell": "qitaihe",
      "name": "七台河" },
    {
      "id": 233,
      "spell": "qujing",
      "name": "曲靖" },
    {
      "id": 234,
      "spell": "quzhou",
      "name": "衢州" },
    {
      "id": 682,
      "spell": "qianan",
      "name": "迁安" },
    {
      "id": 683,
      "spell": "qianshan",
      "name": "潜山" },
    {
      "id": 684,
      "spell": "qianshan",
      "name": "铅山" },
    {
      "id": 685,
      "spell": "qianxi",
      "name": "迁西" },
    {
      "id": 686,
      "spell": "qidong",
      "name": "启东" },
    {
      "id": 687,
      "spell": "qihe",
      "name": "齐河" },
    {
      "id": 688,
      "spell": "qijiang",
      "name": "綦江" },
    {
      "id": 689,
      "spell": "qimen",
      "name": "祁门" },
    {
      "id": 690,
      "spell": "qingliu",
      "name": "清流" },
    {
      "id": 691,
      "spell": "qingtian",
      "name": "青田" },
    {
      "id": 692,
      "spell": "qingxin",
      "name": "清新" },
    {
      "id": 693,
      "spell": "qingyang",
      "name": "青阳" },
    {
      "id": 694,
      "spell": "qingyuan",
      "name": "庆元" },
    {
      "id": 695,
      "spell": "qingyun",
      "name": "庆云" },
    {
      "id": 696,
      "spell": "qingzhen",
      "name": "清镇" },
    {
      "id": 697,
      "spell": "qingzhou",
      "name": "青州" },
    {
      "id": 698,
      "spell": "qinyang",
      "name": "沁阳" },
    {
      "id": 699,
      "spell": "qionglai",
      "name": "邛崃" },
    {
      "id": 700,
      "spell": "qixia",
      "name": "栖霞" },
    {
      "id": 701,
      "spell": "quanjiao",
      "name": "全椒" },
    {
      "id": 702,
      "spell": "quannan",
      "name": "全南" },
    {
      "id": 703,
      "spell": "qufu",
      "name": "曲阜" },
    {
      "id": 704,
      "spell": "qujiang",
      "name": "曲江" }],

    "R": [{
      "id": 235,
      "spell": "rikaze",
      "name": "日喀则" },
    {
      "id": 236,
      "spell": "rizhao",
      "name": "日照" },
    {
      "id": 705,
      "spell": "raoping",
      "name": "饶平" },
    {
      "id": 706,
      "spell": "renhua",
      "name": "仁化" },
    {
      "id": 707,
      "spell": "rongan",
      "name": "融安" },
    {
      "id": 708,
      "spell": "rongchang",
      "name": "荣昌" },
    {
      "id": 709,
      "spell": "rongcheng",
      "name": "荣成" },
    {
      "id": 710,
      "spell": "rongshui",
      "name": "融水" },
    {
      "id": 711,
      "spell": "rudong",
      "name": "如东" },
    {
      "id": 712,
      "spell": "rugao",
      "name": "如皋" },
    {
      "id": 713,
      "spell": "ruian",
      "name": "瑞安" },
    {
      "id": 714,
      "spell": "ruichang",
      "name": "瑞昌" },
    {
      "id": 715,
      "spell": "ruijin",
      "name": "瑞金" },
    {
      "id": 716,
      "spell": "rushan",
      "name": "乳山" },
    {
      "id": 717,
      "spell": "ruyang",
      "name": "汝阳" },
    {
      "id": 718,
      "spell": "ruyuan",
      "name": "乳源" }],

    "S": [{
      "id": 3,
      "spell": "shanghai",
      "name": "上海" },
    {
      "id": 36,
      "spell": "shenyang",
      "name": "沈阳" },
    {
      "id": 37,
      "spell": "shenzhen",
      "name": "深圳" },
    {
      "id": 38,
      "spell": "shijiazhuang",
      "name": "石家庄" },
    {
      "id": 39,
      "spell": "suzhou",
      "name": "苏州" },
    {
      "id": 237,
      "spell": "sanmenxia",
      "name": "三门峡" },
    {
      "id": 238,
      "spell": "sanming",
      "name": "三明" },
    {
      "id": 239,
      "spell": "sanya",
      "name": "三亚" },
    {
      "id": 240,
      "spell": "shangluo",
      "name": "商洛" },
    {
      "id": 241,
      "spell": "shangqiu",
      "name": "商丘" },
    {
      "id": 242,
      "spell": "shangrao",
      "name": "上饶" },
    {
      "id": 243,
      "spell": "shannan",
      "name": "山南" },
    {
      "id": 244,
      "spell": "shantou",
      "name": "汕头" },
    {
      "id": 245,
      "spell": "shanwei",
      "name": "汕尾" },
    {
      "id": 246,
      "spell": "shaoguan",
      "name": "韶关" },
    {
      "id": 247,
      "spell": "shaoxing",
      "name": "绍兴" },
    {
      "id": 248,
      "spell": "shaoyang",
      "name": "邵阳" },
    {
      "id": 249,
      "spell": "shiyan",
      "name": "十堰" },
    {
      "id": 250,
      "spell": "shizuishan",
      "name": "石嘴山" },
    {
      "id": 251,
      "spell": "shuangyashan",
      "name": "双鸭山" },
    {
      "id": 252,
      "spell": "shuozhou",
      "name": "朔州" },
    {
      "id": 253,
      "spell": "siping",
      "name": "四平" },
    {
      "id": 254,
      "spell": "songyuan",
      "name": "松原" },
    {
      "id": 255,
      "spell": "suihua",
      "name": "绥化" },
    {
      "id": 256,
      "spell": "suining",
      "name": "遂宁" },
    {
      "id": 257,
      "spell": "suizhou",
      "name": "随州" },
    {
      "id": 258,
      "spell": "suqian",
      "name": "宿迁" },
    {
      "id": 259,
      "spell": "suzhou",
      "name": "宿州" },
    {
      "id": 719,
      "spell": "sanjiang",
      "name": "三江" },
    {
      "id": 720,
      "spell": "sanmen",
      "name": "三门" },
    {
      "id": 721,
      "spell": "saoan",
      "name": "诏安" },
    {
      "id": 722,
      "spell": "shanggao",
      "name": "上高" },
    {
      "id": 723,
      "spell": "shanghang",
      "name": "上杭" },
    {
      "id": 724,
      "spell": "shanghe",
      "name": "商河" },
    {
      "id": 725,
      "spell": "shangli",
      "name": "上栗" },
    {
      "id": 726,
      "spell": "shanglin",
      "name": "上林" },
    {
      "id": 727,
      "spell": "shangrao",
      "name": "上饶" },
    {
      "id": 728,
      "spell": "shangyou",
      "name": "上犹" },
    {
      "id": 729,
      "spell": "shangyu",
      "name": "上虞" },
    {
      "id": 730,
      "spell": "shangzhi",
      "name": "尚志" },
    {
      "id": 731,
      "spell": "shaowu",
      "name": "邵武" },
    {
      "id": 732,
      "spell": "shaoxing",
      "name": "绍兴" },
    {
      "id": 733,
      "spell": "shaxian",
      "name": "沙县" },
    {
      "id": 734,
      "spell": "shengsi",
      "name": "嵊泗" },
    {
      "id": 735,
      "spell": "shengzhou",
      "name": "嵊州" },
    {
      "id": 736,
      "spell": "shenxian",
      "name": "莘县" },
    {
      "id": 737,
      "spell": "shenze",
      "name": "深泽" },
    {
      "id": 738,
      "spell": "shexian",
      "name": "歙县" },
    {
      "id": 739,
      "spell": "sheyang",
      "name": "射阳" },
    {
      "id": 740,
      "spell": "shicheng",
      "name": "石城" },
    {
      "id": 741,
      "spell": "shilin",
      "name": "石林" },
    {
      "id": 742,
      "spell": "shishi",
      "name": "石狮" },
    {
      "id": 743,
      "spell": "shitai",
      "name": "石台" },
    {
      "id": 744,
      "spell": "shixing",
      "name": "始兴" },
    {
      "id": 745,
      "spell": "shizhu",
      "name": "石柱" },
    {
      "id": 746,
      "spell": "shouguang",
      "name": "寿光" },
    {
      "id": 747,
      "spell": "shouning",
      "name": "寿宁" },
    {
      "id": 748,
      "spell": "shouxian",
      "name": "寿县" },
    {
      "id": 749,
      "spell": "shuangcheng",
      "name": "双城" },
    {
      "id": 750,
      "spell": "shuangliu",
      "name": "双流" },
    {
      "id": 751,
      "spell": "shucheng",
      "name": "舒城" },
    {
      "id": 752,
      "spell": "shulan",
      "name": "舒兰" },
    {
      "id": 753,
      "spell": "shunchang",
      "name": "顺昌" },
    {
      "id": 754,
      "spell": "shuyang",
      "name": "沭阳" },
    {
      "id": 755,
      "spell": "sihong",
      "name": "泗洪" },
    {
      "id": 756,
      "spell": "sihui",
      "name": "四会" },
    {
      "id": 757,
      "spell": "sishui",
      "name": "泗水" },
    {
      "id": 758,
      "spell": "sixian",
      "name": "泗县" },
    {
      "id": 759,
      "spell": "siyang",
      "name": "泗阳" },
    {
      "id": 760,
      "spell": "songming",
      "name": "嵩明" },
    {
      "id": 761,
      "spell": "songxi",
      "name": "松溪" },
    {
      "id": 762,
      "spell": "songxian",
      "name": "嵩县" },
    {
      "id": 763,
      "spell": "songyang",
      "name": "松阳" },
    {
      "id": 764,
      "spell": "suichang",
      "name": "遂昌" },
    {
      "id": 765,
      "spell": "suichuan",
      "name": "遂川" },
    {
      "id": 766,
      "spell": "suining",
      "name": "睢宁" },
    {
      "id": 767,
      "spell": "suixi",
      "name": "濉溪" },
    {
      "id": 768,
      "spell": "suixi",
      "name": "遂溪" },
    {
      "id": 769,
      "spell": "susong",
      "name": "宿松" },
    {
      "id": 770,
      "spell": "suyu",
      "name": "宿豫" }],

    "T": [{
      "id": 4,
      "spell": "tianjin",
      "name": "天津" },
    {
      "id": 40,
      "spell": "taizhou",
      "name": "台州" },
    {
      "id": 41,
      "spell": "tangshan",
      "name": "唐山" },
    {
      "id": 260,
      "spell": "tachengdi",
      "name": "塔城地" },
    {
      "id": 261,
      "spell": "taian",
      "name": "泰安" },
    {
      "id": 262,
      "spell": "taiyuan",
      "name": "太原" },
    {
      "id": 263,
      "spell": "taizhou",
      "name": "泰州" },
    {
      "id": 264,
      "spell": "tianshui",
      "name": "天水" },
    {
      "id": 265,
      "spell": "tieling",
      "name": "铁岭" },
    {
      "id": 266,
      "spell": "tongchuan",
      "name": "铜川" },
    {
      "id": 267,
      "spell": "tonghua",
      "name": "通化" },
    {
      "id": 268,
      "spell": "tongliao",
      "name": "通辽" },
    {
      "id": 269,
      "spell": "tongling",
      "name": "铜陵" },
    {
      "id": 270,
      "spell": "tongren",
      "name": "铜仁" },
    {
      "id": 271,
      "spell": "tulufan",
      "name": "吐鲁番" },
    {
      "id": 771,
      "spell": "taicang",
      "name": "太仓" },
    {
      "id": 772,
      "spell": "taihe",
      "name": "太和" },
    {
      "id": 773,
      "spell": "taihe",
      "name": "泰和" },
    {
      "id": 774,
      "spell": "taihu",
      "name": "太湖" },
    {
      "id": 775,
      "spell": "taining",
      "name": "泰宁" },
    {
      "id": 776,
      "spell": "taishan",
      "name": "台山" },
    {
      "id": 777,
      "spell": "taishun",
      "name": "泰顺" },
    {
      "id": 778,
      "spell": "taixing",
      "name": "泰兴" },
    {
      "id": 779,
      "spell": "tancheng",
      "name": "郯城" },
    {
      "id": 780,
      "spell": "tanghai",
      "name": "唐海" },
    {
      "id": 781,
      "spell": "tengzhou",
      "name": "滕州" },
    {
      "id": 782,
      "spell": "tianchang",
      "name": "天长" },
    {
      "id": 783,
      "spell": "tiantai",
      "name": "天台" },
    {
      "id": 784,
      "spell": "tongcheng",
      "name": "桐城" },
    {
      "id": 785,
      "spell": "tonggu",
      "name": "铜鼓" },
    {
      "id": 786,
      "spell": "tonghe",
      "name": "通河" },
    {
      "id": 787,
      "spell": "tongliang",
      "name": "铜梁" },
    {
      "id": 788,
      "spell": "tongling",
      "name": "铜陵" },
    {
      "id": 789,
      "spell": "tonglu",
      "name": "桐庐" },
    {
      "id": 790,
      "spell": "tongnan",
      "name": "潼南" },
    {
      "id": 791,
      "spell": "tongshan",
      "name": "铜山" },
    {
      "id": 792,
      "spell": "tongxiang",
      "name": "桐乡" },
    {
      "id": 793,
      "spell": "tongzhou",
      "name": "通州" }],

    "W": [{
      "id": 42,
      "spell": "weifang",
      "name": "潍坊" },
    {
      "id": 43,
      "spell": "weihai",
      "name": "威海" },
    {
      "id": 44,
      "spell": "wuhan",
      "name": "武汉" },
    {
      "id": 45,
      "spell": "wuxi",
      "name": "无锡" },
    {
      "id": 272,
      "spell": "weinan",
      "name": "渭南" },
    {
      "id": 273,
      "spell": "wenshan",
      "name": "文山" },
    {
      "id": 274,
      "spell": "wenzhou",
      "name": "温州" },
    {
      "id": 275,
      "spell": "wuhai",
      "name": "乌海" },
    {
      "id": 276,
      "spell": "wuhu",
      "name": "芜湖" },
    {
      "id": 277,
      "spell": "wulanchabu",
      "name": "乌兰察布" },
    {
      "id": 278,
      "spell": "wulumuqi",
      "name": "乌鲁木齐" },
    {
      "id": 279,
      "spell": "wuwei",
      "name": "武威" },
    {
      "id": 280,
      "spell": "wuzhong",
      "name": "吴忠" },
    {
      "id": 281,
      "spell": "wuzhou",
      "name": "梧州" },
    {
      "id": 794,
      "spell": "wafangdian",
      "name": "瓦房店" },
    {
      "id": 795,
      "spell": "wanan",
      "name": "万安" },
    {
      "id": 796,
      "spell": "wangcheng",
      "name": "望城" },
    {
      "id": 797,
      "spell": "wangjiang",
      "name": "望江" },
    {
      "id": 798,
      "spell": "wannian",
      "name": "万年" },
    {
      "id": 799,
      "spell": "wanzai",
      "name": "万载" },
    {
      "id": 800,
      "spell": "weishan",
      "name": "微山" },
    {
      "id": 801,
      "spell": "wencheng",
      "name": "文成" },
    {
      "id": 802,
      "spell": "wendeng",
      "name": "文登" },
    {
      "id": 803,
      "spell": "wengyuan",
      "name": "翁源" },
    {
      "id": 804,
      "spell": "wenling",
      "name": "温岭" },
    {
      "id": 805,
      "spell": "wenshang",
      "name": "汶上" },
    {
      "id": 806,
      "spell": "wenxian",
      "name": "温县" },
    {
      "id": 807,
      "spell": "woyang",
      "name": "涡阳" },
    {
      "id": 808,
      "spell": "wuchang",
      "name": "五常" },
    {
      "id": 809,
      "spell": "wucheng",
      "name": "武城" },
    {
      "id": 810,
      "spell": "wuchuan",
      "name": "吴川" },
    {
      "id": 811,
      "spell": "wudi",
      "name": "无棣" },
    {
      "id": 812,
      "spell": "wuhe",
      "name": "五河" },
    {
      "id": 813,
      "spell": "wuhu",
      "name": "芜湖" },
    {
      "id": 814,
      "spell": "wuhua",
      "name": "五华" },
    {
      "id": 815,
      "spell": "wuji",
      "name": "无极" },
    {
      "id": 816,
      "spell": "wujiang",
      "name": "吴江" },
    {
      "id": 817,
      "spell": "wulian",
      "name": "五莲" },
    {
      "id": 818,
      "spell": "wulong",
      "name": "武隆" },
    {
      "id": 819,
      "spell": "wuming",
      "name": "武鸣" },
    {
      "id": 820,
      "spell": "wuning",
      "name": "武宁" },
    {
      "id": 821,
      "spell": "wuping",
      "name": "武平" },
    {
      "id": 822,
      "spell": "wushan",
      "name": "巫山" },
    {
      "id": 823,
      "spell": "wuwei",
      "name": "无为" },
    {
      "id": 824,
      "spell": "wuxi",
      "name": "巫溪" },
    {
      "id": 825,
      "spell": "wuyi",
      "name": "武义" },
    {
      "id": 826,
      "spell": "wuyishan",
      "name": "武夷山" },
    {
      "id": 827,
      "spell": "wuyuan",
      "name": "婺源" },
    {
      "id": 828,
      "spell": "wuzhi",
      "name": "武陟" }],

    "X": [{
      "id": 46,
      "spell": "xiamen",
      "name": "厦门" },
    {
      "id": 47,
      "spell": "xian",
      "name": "西安" },
    {
      "id": 48,
      "spell": "xuchang",
      "name": "许昌" },
    {
      "id": 49,
      "spell": "xuzhou",
      "name": "徐州" },
    {
      "id": 282,
      "spell": "xiangfan",
      "name": "襄樊" },
    {
      "id": 283,
      "spell": "xiangtan",
      "name": "湘潭" },
    {
      "id": 284,
      "spell": "xiangxi",
      "name": "湘西" },
    {
      "id": 285,
      "spell": "xianning",
      "name": "咸宁" },
    {
      "id": 286,
      "spell": "xianyang",
      "name": "咸阳" },
    {
      "id": 287,
      "spell": "xiaogan",
      "name": "孝感" },
    {
      "id": 288,
      "spell": "xilinguolemeng",
      "name": "锡林郭勒盟" },
    {
      "id": 289,
      "spell": "xinganmeng",
      "name": "兴安盟" },
    {
      "id": 290,
      "spell": "xingtai",
      "name": "邢台" },
    {
      "id": 291,
      "spell": "xining",
      "name": "西宁" },
    {
      "id": 292,
      "spell": "xinxiang",
      "name": "新乡" },
    {
      "id": 293,
      "spell": "xinyang",
      "name": "信阳" },
    {
      "id": 294,
      "spell": "xinyu",
      "name": "新余" },
    {
      "id": 295,
      "spell": "xinzhou",
      "name": "忻州" },
    {
      "id": 296,
      "spell": "xishuangbanna",
      "name": "西双版纳" },
    {
      "id": 297,
      "spell": "xuancheng",
      "name": "宣城" },
    {
      "id": 829,
      "spell": "xiajiang",
      "name": "峡江" },
    {
      "id": 830,
      "spell": "xiajin",
      "name": "夏津" },
    {
      "id": 831,
      "spell": "xiangshan",
      "name": "象山" },
    {
      "id": 832,
      "spell": "xiangshui",
      "name": "响水" },
    {
      "id": 833,
      "spell": "xianju",
      "name": "仙居" },
    {
      "id": 834,
      "spell": "xianyou",
      "name": "仙游" },
    {
      "id": 835,
      "spell": "xiaoxian",
      "name": "萧县" },
    {
      "id": 836,
      "spell": "xiapu",
      "name": "霞浦" },
    {
      "id": 837,
      "spell": "xifeng",
      "name": "息烽" },
    {
      "id": 838,
      "spell": "xinan",
      "name": "新安" },
    {
      "id": 839,
      "spell": "xinchang",
      "name": "新昌" },
    {
      "id": 840,
      "spell": "xinfeng",
      "name": "信丰" },
    {
      "id": 841,
      "spell": "xinfeng",
      "name": "新丰" },
    {
      "id": 842,
      "spell": "xingan",
      "name": "新干" },
    {
      "id": 843,
      "spell": "xingguo",
      "name": "兴国" },
    {
      "id": 844,
      "spell": "xinghua",
      "name": "兴化" },
    {
      "id": 845,
      "spell": "xingning",
      "name": "兴宁" },
    {
      "id": 846,
      "spell": "xingtang",
      "name": "行唐" },
    {
      "id": 847,
      "spell": "xingyang",
      "name": "荥阳" },
    {
      "id": 848,
      "spell": "xingzi",
      "name": "星子" },
    {
      "id": 849,
      "spell": "xinji",
      "name": "辛集" },
    {
      "id": 850,
      "spell": "xinjian",
      "name": "新建" },
    {
      "id": 851,
      "spell": "xinjin",
      "name": "新津" },
    {
      "id": 852,
      "spell": "xinle",
      "name": "新乐" },
    {
      "id": 853,
      "spell": "xinmin",
      "name": "新民" },
    {
      "id": 854,
      "spell": "xinmi",
      "name": "新密" },
    {
      "id": 855,
      "spell": "xintai",
      "name": "新泰" },
    {
      "id": 856,
      "spell": "xinxing",
      "name": "新兴" },
    {
      "id": 857,
      "spell": "xinyi",
      "name": "新沂" },
    {
      "id": 858,
      "spell": "xinyi",
      "name": "信宜" },
    {
      "id": 859,
      "spell": "xinzheng",
      "name": "新郑" },
    {
      "id": 860,
      "spell": "xiuning",
      "name": "休宁" },
    {
      "id": 861,
      "spell": "xiushan",
      "name": "秀山" },
    {
      "id": 862,
      "spell": "xiushui",
      "name": "修水" },
    {
      "id": 863,
      "spell": "xiuwen",
      "name": "修文" },
    {
      "id": 864,
      "spell": "xiuwu",
      "name": "修武" },
    {
      "id": 865,
      "spell": "xundian",
      "name": "寻甸" },
    {
      "id": 866,
      "spell": "xunwu",
      "name": "寻乌" },
    {
      "id": 867,
      "spell": "xuwen",
      "name": "徐闻" },
    {
      "id": 868,
      "spell": "xuyi",
      "name": "盱眙" }],

    "Y": [{
      "id": 50,
      "spell": "yangzhou",
      "name": "扬州" },
    {
      "id": 51,
      "spell": "yantai",
      "name": "烟台" },
    {
      "id": 298,
      "spell": "yaan",
      "name": "雅安" },
    {
      "id": 299,
      "spell": "yanan",
      "name": "延安" },
    {
      "id": 300,
      "spell": "yanbian",
      "name": "延边" },
    {
      "id": 301,
      "spell": "yancheng",
      "name": "盐城" },
    {
      "id": 302,
      "spell": "yangjiang",
      "name": "阳江" },
    {
      "id": 303,
      "spell": "yangquan",
      "name": "阳泉" },
    {
      "id": 304,
      "spell": "yibin",
      "name": "宜宾" },
    {
      "id": 305,
      "spell": "yichang",
      "name": "宜昌" },
    {
      "id": 306,
      "spell": "yichun",
      "name": "伊春" },
    {
      "id": 307,
      "spell": "yichun",
      "name": "宜春" },
    {
      "id": 308,
      "spell": "yilihasake",
      "name": "伊犁哈萨克" },
    {
      "id": 309,
      "spell": "yinchuan",
      "name": "银川" },
    {
      "id": 310,
      "spell": "yingkou",
      "name": "营口" },
    {
      "id": 311,
      "spell": "yingtan",
      "name": "鹰潭" },
    {
      "id": 312,
      "spell": "yiyang",
      "name": "益阳" },
    {
      "id": 313,
      "spell": "yongzhou",
      "name": "永州" },
    {
      "id": 314,
      "spell": "yueyang",
      "name": "岳阳" },
    {
      "id": 315,
      "spell": "yulin",
      "name": "玉林" },
    {
      "id": 316,
      "spell": "yulin",
      "name": "榆林" },
    {
      "id": 317,
      "spell": "yuncheng",
      "name": "运城" },
    {
      "id": 318,
      "spell": "yunfu",
      "name": "云浮" },
    {
      "id": 319,
      "spell": "yushu",
      "name": "玉树" },
    {
      "id": 320,
      "spell": "yuxi",
      "name": "玉溪" },
    {
      "id": 869,
      "spell": "yangchun",
      "name": "阳春" },
    {
      "id": 870,
      "spell": "yangdong",
      "name": "阳东" },
    {
      "id": 871,
      "spell": "yanggu",
      "name": "阳谷" },
    {
      "id": 872,
      "spell": "yangshan",
      "name": "阳山" },
    {
      "id": 873,
      "spell": "yangxin",
      "name": "阳信" },
    {
      "id": 874,
      "spell": "yangxi",
      "name": "阳西" },
    {
      "id": 875,
      "spell": "yangzhong",
      "name": "扬中" },
    {
      "id": 876,
      "spell": "yanshi",
      "name": "偃师" },
    {
      "id": 877,
      "spell": "yanshou",
      "name": "延寿" },
    {
      "id": 878,
      "spell": "yanzhou",
      "name": "兖州" },
    {
      "id": 879,
      "spell": "yichuan",
      "name": "伊川" },
    {
      "id": 880,
      "spell": "yifeng",
      "name": "宜丰" },
    {
      "id": 881,
      "spell": "yihuang",
      "name": "宜黄" },
    {
      "id": 882,
      "spell": "yilan",
      "name": "依兰" },
    {
      "id": 883,
      "spell": "yiliang",
      "name": "宜良" },
    {
      "id": 884,
      "spell": "yinan",
      "name": "沂南" },
    {
      "id": 885,
      "spell": "yingde",
      "name": "英德" },
    {
      "id": 886,
      "spell": "yingshang",
      "name": "颍上" },
    {
      "id": 887,
      "spell": "yishui",
      "name": "沂水" },
    {
      "id": 888,
      "spell": "yiwu",
      "name": "义乌" },
    {
      "id": 889,
      "spell": "yixian",
      "name": "黟县" },
    {
      "id": 890,
      "spell": "yixing",
      "name": "宜兴" },
    {
      "id": 891,
      "spell": "yiyang",
      "name": "弋阳" },
    {
      "id": 892,
      "spell": "yiyang",
      "name": "宜阳" },
    {
      "id": 893,
      "spell": "yiyuan",
      "name": "沂源" },
    {
      "id": 894,
      "spell": "yizheng",
      "name": "仪征" },
    {
      "id": 895,
      "spell": "yongan",
      "name": "永安" },
    {
      "id": 896,
      "spell": "yongchuan",
      "name": "永川" },
    {
      "id": 897,
      "spell": "yongchun",
      "name": "永春" },
    {
      "id": 898,
      "spell": "yongdeng",
      "name": "永登" },
    {
      "id": 899,
      "spell": "yongding",
      "name": "永定" },
    {
      "id": 900,
      "spell": "yongfeng",
      "name": "永丰" },
    {
      "id": 901,
      "spell": "yongji",
      "name": "永吉" },
    {
      "id": 902,
      "spell": "yongjia",
      "name": "永嘉" },
    {
      "id": 903,
      "spell": "yongkang",
      "name": "永康" },
    {
      "id": 904,
      "spell": "yongning",
      "name": "邕宁" },
    {
      "id": 905,
      "spell": "yongtai",
      "name": "永泰" },
    {
      "id": 906,
      "spell": "yongxin",
      "name": "永新" },
    {
      "id": 907,
      "spell": "yongxiu",
      "name": "永修" },
    {
      "id": 908,
      "spell": "youxi",
      "name": "尤溪" },
    {
      "id": 909,
      "spell": "youyang",
      "name": "酉阳" },
    {
      "id": 910,
      "spell": "yuanshi",
      "name": "元氏" },
    {
      "id": 911,
      "spell": "yucheng",
      "name": "禹城" },
    {
      "id": 912,
      "spell": "yudu",
      "name": "于都" },
    {
      "id": 913,
      "spell": "yuexi",
      "name": "岳西" },
    {
      "id": 914,
      "spell": "yugan",
      "name": "余干" },
    {
      "id": 915,
      "spell": "yuhuan",
      "name": "玉环" },
    {
      "id": 916,
      "spell": "yujiang",
      "name": "余江" },
    {
      "id": 917,
      "spell": "yunan",
      "name": "郁南" },
    {
      "id": 918,
      "spell": "yunan",
      "name": "云安" },
    {
      "id": 919,
      "spell": "yuncheng",
      "name": "郓城" },
    {
      "id": 920,
      "spell": "yunhe",
      "name": "云和" },
    {
      "id": 921,
      "spell": "yunxiao",
      "name": "云霄" },
    {
      "id": 922,
      "spell": "yunyang",
      "name": "云阳" },
    {
      "id": 923,
      "spell": "yushan",
      "name": "玉山" },
    {
      "id": 924,
      "spell": "yushu",
      "name": "榆树" },
    {
      "id": 925,
      "spell": "yutai",
      "name": "鱼台" },
    {
      "id": 926,
      "spell": "yutian",
      "name": "玉田" },
    {
      "id": 927,
      "spell": "yuyao",
      "name": "余姚" },
    {
      "id": 928,
      "spell": "yuzhong",
      "name": "榆中" }],

    "Z": [{
      "id": 52,
      "spell": "zhangzhou",
      "name": "漳州" },
    {
      "id": 53,
      "spell": "zhengzhou",
      "name": "郑州" },
    {
      "id": 54,
      "spell": "zhongshan",
      "name": "中山" },
    {
      "id": 55,
      "spell": "zhuhai",
      "name": "珠海" },
    {
      "id": 321,
      "spell": "zaozhuang",
      "name": "枣庄" },
    {
      "id": 322,
      "spell": "zhangjiajie",
      "name": "张家界" },
    {
      "id": 323,
      "spell": "zhangjiakou",
      "name": "张家口" },
    {
      "id": 324,
      "spell": "zhangye",
      "name": "张掖" },
    {
      "id": 325,
      "spell": "zhanjiang",
      "name": "湛江" },
    {
      "id": 326,
      "spell": "zhaoqing",
      "name": "肇庆" },
    {
      "id": 327,
      "spell": "zhaotong",
      "name": "昭通" },
    {
      "id": 328,
      "spell": "zhenjiang",
      "name": "镇江" },
    {
      "id": 329,
      "spell": "zhongwei",
      "name": "中卫" },
    {
      "id": 330,
      "spell": "zhoukou",
      "name": "周口" },
    {
      "id": 331,
      "spell": "zhoushan",
      "name": "舟山" },
    {
      "id": 332,
      "spell": "zhumadian",
      "name": "驻马店" },
    {
      "id": 333,
      "spell": "zhuzhou",
      "name": "株洲" },
    {
      "id": 334,
      "spell": "zibo",
      "name": "淄博" },
    {
      "id": 335,
      "spell": "zigong",
      "name": "自贡" },
    {
      "id": 336,
      "spell": "ziyang",
      "name": "资阳" },
    {
      "id": 337,
      "spell": "zunyi",
      "name": "遵义" },
    {
      "id": 929,
      "spell": "zanhuang",
      "name": "赞皇" },
    {
      "id": 930,
      "spell": "zengcheng",
      "name": "增城" },
    {
      "id": 931,
      "spell": "zhangjiagang",
      "name": "张家港" },
    {
      "id": 932,
      "spell": "zhangping",
      "name": "漳平" },
    {
      "id": 933,
      "spell": "zhangpu",
      "name": "漳浦" },
    {
      "id": 934,
      "spell": "zhangqiu",
      "name": "章丘" },
    {
      "id": 935,
      "spell": "zhangshu",
      "name": "樟树" },
    {
      "id": 936,
      "spell": "zhanhua",
      "name": "沾化" },
    {
      "id": 937,
      "spell": "zhaoxian",
      "name": "赵县" },
    {
      "id": 938,
      "spell": "zhaoyuan",
      "name": "招远" },
    {
      "id": 939,
      "spell": "zhengding",
      "name": "正定" },
    {
      "id": 940,
      "spell": "zhenghe",
      "name": "政和" },
    {
      "id": 941,
      "spell": "zherong",
      "name": "柘荣" },
    {
      "id": 942,
      "spell": "zhongmou",
      "name": "中牟" },
    {
      "id": 943,
      "spell": "zhongxian",
      "name": "忠县" },
    {
      "id": 944,
      "spell": "zhouning",
      "name": "周宁" },
    {
      "id": 945,
      "spell": "zhouzhi",
      "name": "周至" },
    {
      "id": 946,
      "spell": "zhuanghe",
      "name": "庄河" },
    {
      "id": 947,
      "spell": "zhucheng",
      "name": "诸城" },
    {
      "id": 948,
      "spell": "zhuji",
      "name": "诸暨" },
    {
      "id": 949,
      "spell": "zijin",
      "name": "紫金" },
    {
      "id": 950,
      "spell": "zixi",
      "name": "资溪" },
    {
      "id": 951,
      "spell": "zoucheng",
      "name": "邹城" },
    {
      "id": 952,
      "spell": "zouping",
      "name": "邹平" },
    {
      "id": 953,
      "spell": "zunhua",
      "name": "遵化" }] } };exports.default = _default;

/***/ }),

/***/ 794:
/*!********************************************************************************!*\
  !*** D:/lixindom/2020/伊籭商城/beefShop/components/bazaar-city_list/citylist.json ***!
  \********************************************************************************/
/*! exports provided: hotcity, city, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"hotcity\":{\"title\":\"热门城市\",\"lists\":[\"上海\",\"北京\",\"广州\",\"深圳\",\"武汉\",\"天津\",\"西安\",\"南京\",\"杭州\",\"成都\",\"重庆\"]},\"city\":[{\"title\":\"A\",\"lists\":[\"阿坝\",\"阿拉善\",\"阿里\",\"安康\",\"安庆\",\"鞍山\",\"安顺\",\"安阳\",\"澳门\"]},{\"title\":\"B\",\"lists\":[\"北京\",\"白银\",\"保定\",\"宝鸡\",\"保山\",\"包头\",\"巴中\",\"北海\",\"蚌埠\",\"本溪\",\"毕节\",\"滨州\",\"百色\",\"亳州\"]},{\"title\":\"C\",\"lists\":[\"重庆\",\"成都\",\"长沙\",\"长春\",\"沧州\",\"常德\",\"昌都\",\"长治\",\"常州\",\"巢湖\",\"潮州\",\"承德\",\"郴州\",\"赤峰\",\"池州\",\"崇左\",\"楚雄\",\"滁州\",\"朝阳\"]},{\"title\":\"D\",\"lists\":[\"大连\",\"东莞\",\"大理\",\"丹东\",\"大庆\",\"大同\",\"大兴安岭\",\"德宏\",\"德阳\",\"德州\",\"定西\",\"迪庆\",\"东营\"]},{\"title\":\"E\",\"lists\":[\"鄂尔多斯\",\"恩施\",\"鄂州\"]},{\"title\":\"F\",\"lists\":[\"福州\",\"防城港\",\"佛山\",\"抚顺\",\"抚州\",\"阜新\",\"阜阳\"]},{\"title\":\"G\",\"lists\":[\"广州\",\"桂林\",\"贵阳\",\"甘南\",\"赣州\",\"甘孜\",\"广安\",\"广元\",\"贵港\",\"果洛\"]},{\"title\":\"H\",\"lists\":[\"杭州\",\"哈尔滨\",\"合肥\",\"海口\",\"呼和浩特\",\"海北\",\"海东\",\"海南\",\"海西\",\"邯郸\",\"汉中\",\"鹤壁\",\"河池\",\"鹤岗\",\"黑河\",\"衡水\",\"衡阳\",\"河源\",\"贺州\",\"红河\",\"淮安\",\"淮北\",\"怀化\",\"淮南\",\"黄冈\",\"黄南\",\"黄山\",\"黄石\",\"惠州\",\"葫芦岛\",\"呼伦贝尔\",\"湖州\",\"菏泽\"]},{\"title\":\"J\",\"lists\":[\"济南\",\"佳木斯\",\"吉安\",\"江门\",\"焦作\",\"嘉兴\",\"嘉峪关\",\"揭阳\",\"吉林\",\"金昌\",\"晋城\",\"景德镇\",\"荆门\",\"荆州\",\"金华\",\"济宁\",\"晋中\",\"锦州\",\"九江\",\"酒泉\"]},{\"title\":\"K\",\"lists\":[\"昆明\",\"开封\"]},{\"title\":\"L\",\"lists\":[\"兰州\",\"拉萨\",\"来宾\",\"莱芜\",\"廊坊\",\"乐山\",\"凉山\",\"连云港\",\"聊城\",\"辽阳\",\"辽源\",\"丽江\",\"临沧\",\"临汾\",\"临夏\",\"临沂\",\"林芝\",\"丽水\",\"六安\",\"六盘水\",\"柳州\",\"陇南\",\"龙岩\",\"娄底\",\"漯河\",\"洛阳\",\"泸州\",\"吕梁\"]},{\"title\":\"M\",\"lists\":[\"马鞍山\",\"茂名\",\"眉山\",\"梅州\",\"绵阳\",\"牡丹江\"]},{\"title\":\"N\",\"lists\":[\"南京\",\"南昌\",\"南宁\",\"宁波\",\"南充\",\"南平\",\"南通\",\"南阳\",\"那曲\",\"内江\",\"宁德\",\"怒江\"]},{\"title\":\"P\",\"lists\":[\"盘锦\",\"攀枝花\",\"平顶山\",\"平凉\",\"萍乡\",\"莆田\",\"濮阳\"]},{\"title\":\"Q\",\"lists\":[\"青岛\",\"黔东南\",\"黔南\",\"黔西南\",\"庆阳\",\"清远\",\"秦皇岛\",\"钦州\",\"齐齐哈尔\",\"泉州\",\"曲靖\",\"衢州\"]},{\"title\":\"R\",\"lists\":[\"日喀则\",\"日照\"]},{\"title\":\"S\",\"lists\":[\"上海\",\"深圳\",\"苏州\",\"沈阳\",\"石家庄\",\"三门峡\",\"三明\",\"三亚\",\"商洛\",\"商丘\",\"上饶\",\"山南\",\"汕头\",\"汕尾\",\"韶关\",\"绍兴\",\"邵阳\",\"十堰\",\"朔州\",\"四平\",\"绥化\",\"遂宁\",\"随州\",\"宿迁\",\"宿州\"]},{\"title\":\"T\",\"lists\":[\"天津\",\"太原\",\"泰安\",\"泰州\",\"台州\",\"唐山\",\"天水\",\"铁岭\",\"铜川\",\"通化\",\"通辽\",\"铜陵\",\"铜仁\",\"台湾\"]},{\"title\":\"W\",\"lists\":[\"武汉\",\"乌鲁木齐\",\"无锡\",\"威海\",\"潍坊\",\"文山\",\"温州\",\"乌海\",\"芜湖\",\"乌兰察布\",\"武威\",\"梧州\"]},{\"title\":\"X\",\"lists\":[\"厦门\",\"西安\",\"西宁\",\"襄樊\",\"湘潭\",\"湘西\",\"咸宁\",\"咸阳\",\"孝感\",\"邢台\",\"新乡\",\"信阳\",\"新余\",\"忻州\",\"西双版纳\",\"宣城\",\"许昌\",\"徐州\",\"香港\",\"锡林郭勒\",\"兴安\"]},{\"title\":\"Y\",\"lists\":[\"银川\",\"雅安\",\"延安\",\"延边\",\"盐城\",\"阳江\",\"阳泉\",\"扬州\",\"烟台\",\"宜宾\",\"宜昌\",\"宜春\",\"营口\",\"益阳\",\"永州\",\"岳阳\",\"榆林\",\"运城\",\"云浮\",\"玉树\",\"玉溪\",\"玉林\"]},{\"title\":\"Z\",\"lists\":[\"杂多县\",\"赞皇县\",\"枣强县\",\"枣阳市\",\"枣庄\",\"泽库县\",\"增城市\",\"曾都区\",\"泽普县\",\"泽州县\",\"札达县\",\"扎赉特旗\",\"扎兰屯市\",\"扎鲁特旗\",\"扎囊县\",\"张北县\",\"张店区\",\"章贡区\",\"张家港\",\"张家界\",\"张家口\",\"漳平市\",\"漳浦县\",\"章丘市\",\"樟树市\",\"张湾区\",\"彰武县\",\"漳县\",\"张掖\",\"漳州\",\"长子县\",\"湛河区\",\"湛江\",\"站前区\",\"沾益县\",\"诏安县\",\"召陵区\",\"昭平县\",\"肇庆\",\"昭通\",\"赵县\",\"昭阳区\",\"招远市\",\"肇源县\",\"肇州县\",\"柞水县\",\"柘城县\",\"浙江\",\"镇安县\",\"振安区\",\"镇巴县\",\"正安县\",\"正定县\",\"正定新区\",\"正蓝旗\",\"正宁县\",\"蒸湘区\",\"正镶白旗\",\"正阳县\",\"郑州\",\"镇海区\",\"镇江\",\"浈江区\",\"镇康县\",\"镇赉县\",\"镇平县\",\"振兴区\",\"镇雄县\",\"镇原县\",\"志丹县\",\"治多县\",\"芝罘区\",\"枝江市\",\"芷江侗族自治县\",\"织金县\",\"中方县\",\"中江县\",\"钟楼区\",\"中牟县\",\"中宁县\",\"中山\",\"中山区\",\"钟山区\",\"钟山县\",\"中卫\",\"钟祥市\",\"中阳县\",\"中原区\",\"周村区\",\"周口\",\"周宁县\",\"舟曲县\",\"舟山\",\"周至县\",\"庄河市\",\"诸城市\",\"珠海\",\"珠晖区\",\"诸暨市\",\"驻马店\",\"准格尔旗\",\"涿鹿县\",\"卓尼\",\"涿州市\",\"卓资县\",\"珠山区\",\"竹山县\",\"竹溪县\",\"株洲\",\"株洲县\",\"淄博\",\"子长县\",\"淄川区\",\"自贡\",\"秭归县\",\"紫金县\",\"自流井区\",\"资溪县\",\"资兴市\",\"资阳\"]}]}");

/***/ }),

/***/ 828:
/*!********************************************************************************!*\
  !*** D:/lixindom/2020/伊籭商城/beefShop/components/uni-swipe-action-item/mpwxs.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = {
  data: function data() {
    return {
      position: [],
      button: {},
      btn: "[]" };

  },
  // computed: {
  // 	pos() {
  // 		return JSON.stringify(this.position)
  // 	},
  // 	btn() {
  // 		return JSON.stringify(this.button)
  // 	}
  // },
  watch: {
    button: {
      handler: function handler(newVal) {
        this.btn = JSON.stringify(newVal);
      },
      deep: true },

    show: function show(newVal) {
      if (this.autoClose) return;
      if (!this.button) {
        this.init();
        return;
      }
      this.button.show = newVal;
    },
    leftOptions: function leftOptions() {
      this.init();
    },
    rightOptions: function rightOptions() {
      this.init();
    } },

  created: function created() {
    if (this.swipeaction.children !== undefined) {
      this.swipeaction.children.push(this);
    }
  },
  mounted: function mounted() {
    this.init();
  },
  beforeDestroy: function beforeDestroy() {var _this = this;
    this.swipeaction.children.forEach(function (item, index) {
      if (item === _this) {
        _this.swipeaction.children.splice(index, 1);
      }
    });
  },
  methods: {
    init: function init() {var _this2 = this;
      clearTimeout(this.swipetimer);
      this.swipetimer = setTimeout(function () {
        _this2.getButtonSize();
      }, 50);
    },
    closeSwipe: function closeSwipe(e) {
      if (!this.autoClose) return;
      this.swipeaction.closeOther(this);
    },

    change: function change(e) {
      this.$emit('change', e.open);
      var show = this.button.show;
      if (show !== e.open) {
        this.button.show = e.open;
      }

    },

    appTouchStart: function appTouchStart(e) {var

      clientX =
      e.changedTouches[0].clientX;
      this.clientX = clientX;
      this.timestamp = new Date().getTime();
    },
    appTouchEnd: function appTouchEnd(e, index, item, position) {var

      clientX =
      e.changedTouches[0].clientX;
      // fixed by xxxx 模拟点击事件，解决 ios 13 点击区域错位的问题
      var diff = Math.abs(this.clientX - clientX);
      var time = new Date().getTime() - this.timestamp;
      if (diff < 40 && time < 300) {
        this.$emit('click', {
          content: item,
          index: index,
          position: position });

      }
    },
    getButtonSize: function getButtonSize() {var _this3 = this;
      var views = uni.createSelectorQuery().in(this);
      views.
      selectAll('.uni-swipe_button-group').
      boundingClientRect(function (data) {
        var show = 'none';
        if (_this3.autoClose) {
          show = 'none';
        } else {
          show = _this3.show;
        }
        _this3.button = {
          data: data,
          show: show };

      }).
      exec();
    } } };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 931:
/*!*****************************************************************************************!*\
  !*** D:/lixindom/2020/伊籭商城/beefShop/components/poster/QS-SharePoster/QS-SharePoster.js ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ 16));var _app2 = _interopRequireDefault(__webpack_require__(/*! ./app.js */ 932));
var _QRCodeAlg = _interopRequireDefault(__webpack_require__(/*! ./QRCodeAlg.js */ 933));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}
var ShreUserPosterBackgroundKey = 'ShrePosterBackground_'; // 背景图片缓存名称前缀
var idKey = 'QSSHAREPOSTER_IDKEY'; //drawArray自动生成的idkey
var isMp = false;

isMp = true;



// export default 
function getSharePoster(obj) {
  return new Promise( /*#__PURE__*/function () {var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee(resolve, reject) {var result1, result2;return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:_context.prev = 0;_context.next = 3;return (

                returnPromise(obj));case 3:result1 = _context.sent;
              resolve(result1);_context.next = 21;break;case 7:_context.prev = 7;_context.t0 = _context["catch"](0);

              //TODO handle the exception
              removePosterStorage(obj.type);_context.prev = 10;

              _app2.default.log('------------清除缓存后, 开始第二次尝试------------');_context.next = 14;return (
                returnPromise(obj));case 14:result2 = _context.sent;
              resolve(result2);_context.next = 21;break;case 18:_context.prev = 18;_context.t1 = _context["catch"](10);

              //TODO handle the exception
              reject(_context.t1);case 21:case "end":return _context.stop();}}}, _callee, null, [[0, 7], [10, 18]]);}));return function (_x, _x2) {return _ref.apply(this, arguments);};}());




}

function returnPromise(obj) {var

  type =

















  obj.type,formData = obj.formData,background = obj.background,posterCanvasId = obj.posterCanvasId,backgroundImage = obj.backgroundImage,reserve = obj.reserve,textArray = obj.textArray,drawArray = obj.drawArray,qrCodeArray = obj.qrCodeArray,imagesArray = obj.imagesArray,setCanvasWH = obj.setCanvasWH,setCanvasToTempFilePath = obj.setCanvasToTempFilePath,setDraw = obj.setDraw,bgScale = obj.bgScale,Context = obj.Context,_this = obj._this,delayTimeScale = obj.delayTimeScale,drawDelayTime = obj.drawDelayTime;
  return new Promise( /*#__PURE__*/function () {var _ref2 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee2(rs, rj) {var bgObj, params, i, hasAllInfoCallback, _i, drawArrayItem, newData, drawArray_copy, _i2, item, _newData, item_idKey, poster;return _regenerator.default.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:_context2.prev = 0;

              // _app.showLoading('正在准备海报数据');
              if (!Context) {
                _app2.default.log('没有画布对象,创建画布对象');
                Context = uni.createCanvasContext(posterCanvasId, _this || null);
              }if (!(

              background && background.width && background.height)) {_context2.next = 6;break;}
              bgObj = background;_context2.next = 9;break;case 6:_context2.next = 8;return (

                getShreUserPosterBackground({
                  backgroundImage: backgroundImage,
                  type: type,
                  formData: formData }));case 8:bgObj = _context2.sent;case 9:


              // 为了ios 缩放一些
              bgScale = bgScale || .55;
              bgObj.width = bgObj.width * bgScale;
              bgObj.height = bgObj.height * bgScale;

              _app2.default.log('获取背景图信息对象成功:' + JSON.stringify(bgObj));
              params = {
                bgObj: bgObj,
                type: type,
                bgScale: bgScale };

              if (setCanvasWH && typeof setCanvasWH == 'function') setCanvasWH(params);if (!
              imagesArray) {_context2.next = 23;break;}
              if (typeof imagesArray == 'function')
              imagesArray = imagesArray(params);
              _app2.default.showLoading('正在生成需绘制图片的临时路径');
              _app2.default.log('准备设置图片');_context2.next = 21;return (
                setImage(imagesArray));case 21:imagesArray = _context2.sent;
              _app2.default.hideLoading();case 23:

              if (textArray) {
                if (typeof textArray == 'function')
                textArray = textArray(params);
                textArray = setText(Context, textArray);

              }if (!
              qrCodeArray) {_context2.next = 37;break;}
              if (typeof qrCodeArray == 'function')
              qrCodeArray = qrCodeArray(params);
              // _app.showLoading('正在生成需绘制图片的临时路径');
              i = 0;case 27:if (!(i < qrCodeArray.length)) {_context2.next = 36;break;}
              _app2.default.log(i);if (!
              qrCodeArray[i].image) {_context2.next = 33;break;}_context2.next = 32;return (
                _app2.default.downloadFile_PromiseFc(qrCodeArray[i].image));case 32:qrCodeArray[i].image = _context2.sent;case 33:i++;_context2.next = 27;break;case 36:

              _app2.default.hideLoading();case 37:if (!

              drawArray) {_context2.next = 92;break;}
              if (typeof drawArray == 'function') {
                drawArray = drawArray(params);
              }if (!
              _app2.default.isPromise(drawArray)) {_context2.next = 43;break;}_context2.next = 42;return (
                drawArray);case 42:drawArray = _context2.sent;case 43:if (!(


              _app2.default.isArray(drawArray) && drawArray.length > 0)) {_context2.next = 92;break;}
              hasAllInfoCallback = false;
              _i = 0;case 46:if (!(_i < drawArray.length)) {_context2.next = 74;break;}
              drawArrayItem = drawArray[_i];
              if (_app2.default.isFn(drawArrayItem.allInfoCallback) && !hasAllInfoCallback) hasAllInfoCallback = true;
              drawArrayItem[idKey] = _i;
              newData = void 0;_context2.t0 =
              drawArrayItem.type;_context2.next = _context2.t0 ===
              'image' ? 54 : _context2.t0 ===


              'text' ? 58 : _context2.t0 ===


              'qrcode' ? 60 : _context2.t0 ===





              'custom' ? 66 : 67;break;case 54:_context2.next = 56;return setImage(drawArrayItem);case 56:newData = _context2.sent;return _context2.abrupt("break", 69);case 58:newData = setText(Context, drawArrayItem);return _context2.abrupt("break", 69);case 60:if (!drawArrayItem.image) {_context2.next = 65;break;}_context2.next = 63;return _app2.default.downloadFile_PromiseFc(drawArrayItem.image);case 63:_context2.t1 = _context2.sent;newData = { image: _context2.t1 };case 65:return _context2.abrupt("break", 69);case 66:return _context2.abrupt("break", 69);case 67:


              _app2.default.log('未识别的类型');return _context2.abrupt("break", 69);case 69:


              if (newData && _app2.default.isObject(newData)) {
                drawArray[_i] = _objectSpread(_objectSpread({}, drawArrayItem),
                newData);

              };case 71:_i++;_context2.next = 46;break;case 74:if (!


              hasAllInfoCallback) {_context2.next = 92;break;}
              _app2.default.log('----------------hasAllInfoCallback----------------');
              drawArray_copy = _toConsumableArray(drawArray);
              drawArray_copy.sort(function (a, b) {
                var a_serialNum = !_app2.default.isUndef(a.serialNum) && !_app2.default.isNull(a.serialNum) ? Number(a.serialNum) : Number.NEGATIVE_INFINITY;
                var b_serialNum = !_app2.default.isUndef(b.serialNum) && !_app2.default.isNull(b.serialNum) ? Number(b.serialNum) : Number.NEGATIVE_INFINITY;
                return a_serialNum - b_serialNum;
              });

              _i2 = 0;case 79:if (!(_i2 < drawArray_copy.length)) {_context2.next = 92;break;}
              item = _objectSpread({}, drawArray_copy[_i2]);if (!

              _app2.default.isFn(item.allInfoCallback)) {_context2.next = 89;break;}
              _newData = item.allInfoCallback({
                drawArray: drawArray_copy });if (!

              _app2.default.isPromise(_newData)) {_context2.next = 87;break;}_context2.next = 86;return _newData;case 86:_newData = _context2.sent;case 87:
              item_idKey = item[idKey];
              if (!_app2.default.isUndef(item_idKey)) {
                drawArray[item[idKey]] = _objectSpread(_objectSpread({}, item),
                _newData);

              } else {
                console.log('程序错误 找不到idKey!!!	...这不应该啊');
              }case 89:_i2++;_context2.next = 79;break;case 92:_context2.next = 94;return (





                drawShareImage({
                  Context: Context,
                  type: type,
                  posterCanvasId: posterCanvasId,
                  reserve: reserve,
                  drawArray: drawArray,
                  textArray: textArray,
                  imagesArray: imagesArray,
                  bgObj: bgObj,
                  qrCodeArray: qrCodeArray,
                  setCanvasToTempFilePath: setCanvasToTempFilePath,
                  setDraw: setDraw,
                  bgScale: bgScale,
                  _this: _this,
                  delayTimeScale: delayTimeScale,
                  drawDelayTime: drawDelayTime }));case 94:poster = _context2.sent;

              _app2.default.hideLoading();
              rs({
                bgObj: bgObj,
                poster: poster,
                type: type });_context2.next = 102;break;case 99:_context2.prev = 99;_context2.t2 = _context2["catch"](0);


              //TODO handle the exception
              rj(_context2.t2);case 102:case "end":return _context2.stop();}}}, _callee2, null, [[0, 99]]);}));return function (_x3, _x4) {return _ref2.apply(this, arguments);};}());


}

function drawShareImage(obj) {//绘制海报方法
  var
  Context =














  obj.Context,type = obj.type,posterCanvasId = obj.posterCanvasId,reserve = obj.reserve,bgObj = obj.bgObj,drawArray = obj.drawArray,textArray = obj.textArray,qrCodeArray = obj.qrCodeArray,imagesArray = obj.imagesArray,setCanvasToTempFilePath = obj.setCanvasToTempFilePath,setDraw = obj.setDraw,bgScale = obj.bgScale,_this = obj._this,delayTimeScale = obj.delayTimeScale,drawDelayTime = obj.drawDelayTime;
  var params = {
    Context: Context,
    bgObj: bgObj,
    type: type,
    bgScale: bgScale };

  delayTimeScale = delayTimeScale !== undefined ? delayTimeScale : 15;
  drawDelayTime = drawDelayTime !== undefined ? drawDelayTime : 100;
  return new Promise(function (rs, rj) {
    try {
      // _app.showLoading('正在绘制海报');
      _app2.default.log('背景对象:' + JSON.stringify(bgObj));
      if (bgObj && bgObj.path) {
        _app2.default.log('背景有图片路径');
        Context.drawImage(bgObj.path, 0, 0, bgObj.width, bgObj.height);
      } else {
        _app2.default.log('背景没有图片路径');
        if (bgObj.backgroundColor) {
          _app2.default.log('背景有背景颜色:' + bgObj.backgroundColor);
          Context.setFillStyle(bgObj.backgroundColor);
          Context.fillRect(0, 0, bgObj.width, bgObj.height);
        } else {
          _app2.default.log('背景没有背景颜色');
        }
      }

      // _app.showLoading('绘制图片');
      if (imagesArray && imagesArray.length > 0)
      drawImage(Context, imagesArray);

      // _app.showLoading('绘制自定义内容');
      if (setDraw && typeof setDraw == 'function') setDraw(params);

      // _app.showLoading('绘制文本');
      if (textArray && textArray.length > 0)
      drawText(Context, textArray, bgObj);

      // _app.showLoading('绘制二维码');
      if (qrCodeArray && qrCodeArray.length > 0) {
        for (var i = 0; i < qrCodeArray.length; i++) {
          drawQrCode(Context, qrCodeArray[i]);
        }
      }

      // _app.showLoading('绘制可控层级序列');
      if (drawArray && drawArray.length > 0) {
        for (var _i3 = 0; _i3 < drawArray.length; _i3++) {
          var drawArrayItem = drawArray[_i3];
          _app2.default.log('绘制可控层级序列, drawArrayItem:' + JSON.stringify(drawArrayItem));
          switch (drawArrayItem.type) {
            case 'image':
              _app2.default.log('绘制可控层级序列, 绘制图片');
              drawImage(Context, drawArrayItem);
              break;
            case 'text':
              _app2.default.log('绘制可控层级序列, 绘制文本');
              drawText(Context, drawArrayItem, bgObj);
              break;
            case 'qrcode':
              _app2.default.log('绘制可控层级序列, 绘制二维码');
              drawQrCode(Context, drawArrayItem);
              break;
            case 'custom':
              _app2.default.log('绘制可控层级序列, 绘制自定义内容');
              if (drawArrayItem.setDraw && typeof drawArrayItem.setDraw === 'function')
              drawArrayItem.setDraw(Context);
              break;
            default:
              _app2.default.log('未识别的类型');
              break;}

        }
      }
      _app2.default.showLoading('绘制中');
      setTimeout(function () {
        Context.draw(typeof reserve == 'boolean' ? reserve : false, function () {
          _app2.default.showLoading('正在输出图片');
          var setObj = setCanvasToTempFilePath || {};
          if (setObj && typeof setObj == 'function')
          setObj = setCanvasToTempFilePath(bgObj, type);
          var canvasToTempFilePathFn;










          var data = _objectSpread({
            x: 0,
            y: 0,
            width: bgObj.width,
            height: bgObj.height,
            destWidth: bgObj.width * 2, // 若H5使用这里请不要乘以二
            destHeight: bgObj.height * 2, // 若H5使用这里请不要乘以二
            quality: .8,
            fileType: 'jpg' },
          setObj);

          _app2.default.log('canvasToTempFilePath的data对象:' + JSON.stringify(data));
          canvasToTempFilePathFn = function canvasToTempFilePathFn() {
            var toTempFilePathObj = _objectSpread(_objectSpread({},
            data), {}, {
              canvasId: posterCanvasId,
              success: function success(res) {
                _app2.default.hideLoading();
                rs(res);
              },
              fail: function fail(err) {
                _app2.default.hideLoading();
                _app2.default.log('输出图片失败:' + JSON.stringify(err));
                rj('输出图片失败:' + JSON.stringify(err));
              } });

            uni.canvasToTempFilePath(toTempFilePathObj, _this || null);
          };

          var delayTime = 0;
          if (qrCodeArray) {
            qrCodeArray.forEach(function (item) {
              if (item.text) {
                delayTime += Number(item.text.length);
              }
            });
          }
          if (imagesArray) {
            imagesArray.forEach(function () {
              delayTime += delayTimeScale;
            });
          }
          if (textArray) {
            textArray.forEach(function () {
              delayTime += delayTimeScale;
            });
          }
          if (drawArray) {
            drawArray.forEach(function (item) {
              switch (item.type) {
                case 'text':
                  if (item.text) {
                    delayTime += item.text.length;
                  }
                  break;
                default:
                  delayTime += delayTimeScale;
                  break;}

            });
          }
          _app2.default.log('延时系数:' + delayTimeScale);
          _app2.default.log('总计延时:' + delayTime);
          setTimeout(canvasToTempFilePathFn, delayTime);
        });
      }, drawDelayTime);
    } catch (e) {
      //TODO handle the exception
      _app2.default.hideLoading();
      rj(e);
    }
  });
}

// export 
function setText(Context, texts) {// 设置文本数据
  _app2.default.log('进入设置文字方法, texts:' + JSON.stringify(texts));
  if (texts && _app2.default.isArray(texts)) {
    _app2.default.log('texts是数组');
    if (texts.length > 0) {
      for (var i = 0; i < texts.length; i++) {
        _app2.default.log('字符串信息-初始化之前:' + JSON.stringify(texts[i]));
        texts[i] = setTextFn(Context, texts[i]);
      }
    }
  } else {
    _app2.default.log('texts是对象');
    texts = setTextFn(Context, texts);
  }
  _app2.default.log('返回texts:' + JSON.stringify(texts));
  return texts;
}

function setTextFn(Context, textItem) {
  _app2.default.log('进入设置文字方法, textItem:' + JSON.stringify(textItem));
  if (_app2.default.isNotNull_string(textItem.text)) {
    textItem.text = String(textItem.text);
    textItem.alpha = textItem.alpha !== undefined ? textItem.alpha : 1;
    textItem.color = textItem.color || 'black';
    textItem.size = textItem.size !== undefined ? textItem.size : 10;
    textItem.textAlign = textItem.textAlign || 'left';
    textItem.textBaseline = textItem.textBaseline || 'middle';
    textItem.dx = textItem.dx || 0;
    textItem.dy = textItem.dy || 0;
    textItem.size = Math.ceil(Number(textItem.size));
    _app2.default.log('字符串信息-初始化默认值后:' + JSON.stringify(textItem));
    var textLength = countTextLength(Context, {
      text: textItem.text,
      size: textItem.size });

    _app2.default.log('字符串信息-初始化时的文本长度:' + textLength);
    var infoCallBackObj = {};
    if (textItem.infoCallBack && typeof textItem.infoCallBack === 'function') {
      infoCallBackObj = textItem.infoCallBack(textLength);
    }
    textItem = _objectSpread(_objectSpread({},
    textItem), {}, {
      textLength: textLength },
    infoCallBackObj);

    _app2.default.log('字符串信息-infoCallBack后:' + JSON.stringify(textItem));
  }
  return textItem;
}

function countTextLength(Context, obj) {
  _app2.default.log('计算文字长度, obj:' + JSON.stringify(obj));var

  text =

  obj.text,size = obj.size;
  Context.setFontSize(size);
  var textLength;
  /* try{
                  	textLength = Context.measureText(text); // 官方文档说 App端自定义组件编译模式暂时不可用measureText方法
                  }catch(e){
                  	//TODO handle the exception
                  	textLength = {};
                  } */
  textLength = {};
  _app2.default.log('measureText计算文字长度, textLength:' + JSON.stringify(textLength));
  textLength = textLength && textLength.width ? textLength.width : 0;
  if (!textLength) {
    var l = 0;
    for (var j = 0; j < text.length; j++) {
      var t = text.substr(j, 1);
      var countL = countStrLength(t);
      _app2.default.log('计算文字宽度系数:' + countL);
      l += countL;
    }
    _app2.default.log('文字宽度总系数:' + l);
    textLength = l * size;
  }
  return textLength;
}

//计算字符长度系数
function countStrLength(t) {
  var l;
  if (/a/.test(t)) {
    l = 0.552734375;
  } else if (/b/.test(t)) {
    l = 0.638671875;
  } else if (/c/.test(t)) {
    l = 0.50146484375;
  } else if (/d/.test(t)) {
    l = 0.6396484375;
  } else if (/e/.test(t)) {
    l = 0.5673828125;
  } else if (/f/.test(t)) {
    l = 0.3466796875;
  } else if (/g/.test(t)) {
    l = 0.6396484375;
  } else if (/h/.test(t)) {
    l = 0.61572265625;
  } else if (/i/.test(t)) {
    l = 0.26611328125;
  } else if (/j/.test(t)) {
    l = 0.26708984375;
  } else if (/k/.test(t)) {
    l = 0.54443359375;
  } else if (/l/.test(t)) {
    l = 0.26611328125;
  } else if (/m/.test(t)) {
    l = 0.93701171875;
  } else if (/n/.test(t)) {
    l = 0.6162109375;
  } else if (/o/.test(t)) {
    l = 0.6357421875;
  } else if (/p/.test(t)) {
    l = 0.638671875;
  } else if (/q/.test(t)) {
    l = 0.6396484375;
  } else if (/r/.test(t)) {
    l = 0.3818359375;
  } else if (/s/.test(t)) {
    l = 0.462890625;
  } else if (/t/.test(t)) {
    l = 0.37255859375;
  } else if (/u/.test(t)) {
    l = 0.6162109375;
  } else if (/v/.test(t)) {
    l = 0.52490234375;
  } else if (/w/.test(t)) {
    l = 0.78955078125;
  } else if (/x/.test(t)) {
    l = 0.5068359375;
  } else if (/y/.test(t)) {
    l = 0.529296875;
  } else if (/z/.test(t)) {
    l = 0.49169921875;
  } else if (/A/.test(t)) {
    l = 0.70361328125;
  } else if (/B/.test(t)) {
    l = 0.62744140625;
  } else if (/C/.test(t)) {
    l = 0.6689453125;
  } else if (/D/.test(t)) {
    l = 0.76171875;
  } else if (/E/.test(t)) {
    l = 0.5498046875;
  } else if (/F/.test(t)) {
    l = 0.53125;
  } else if (/G/.test(t)) {
    l = 0.74365234375;
  } else if (/H/.test(t)) {
    l = 0.7734375;
  } else if (/I/.test(t)) {
    l = 0.2939453125;
  } else if (/J/.test(t)) {
    l = 0.39599609375;
  } else if (/K/.test(t)) {
    l = 0.634765625;
  } else if (/L/.test(t)) {
    l = 0.51318359375;
  } else if (/M/.test(t)) {
    l = 0.97705078125;
  } else if (/N/.test(t)) {
    l = 0.81298828125;
  } else if (/O/.test(t)) {
    l = 0.81494140625;
  } else if (/P/.test(t)) {
    l = 0.61181640625;
  } else if (/Q/.test(t)) {
    l = 0.81494140625;
  } else if (/R/.test(t)) {
    l = 0.65283203125;
  } else if (/S/.test(t)) {
    l = 0.5771484375;
  } else if (/T/.test(t)) {
    l = 0.5732421875;
  } else if (/U/.test(t)) {
    l = 0.74658203125;
  } else if (/V/.test(t)) {
    l = 0.67626953125;
  } else if (/W/.test(t)) {
    l = 1.017578125;
  } else if (/X/.test(t)) {
    l = 0.64501953125;
  } else if (/Y/.test(t)) {
    l = 0.603515625;
  } else if (/Z/.test(t)) {
    l = 0.6201171875;
  } else if (/[0-9]/.test(t)) {
    l = 0.58642578125;
  } else if (/[\u4e00-\u9fa5]/.test(t)) {
    l = 1;
  } else if (/ /.test(t)) {
    l = 0.2958984375;
  } else if (/\`/.test(t)) {
    l = 0.294921875;
  } else if (/\~/.test(t)) {
    l = 0.74169921875;
  } else if (/\!/.test(t)) {
    l = 0.3125;
  } else if (/\@/.test(t)) {
    l = 1.03125;
  } else if (/\#/.test(t)) {
    l = 0.63818359375;
  } else if (/\$/.test(t)) {
    l = 0.58642578125;
  } else if (/\%/.test(t)) {
    l = 0.8896484375;
  } else if (/\^/.test(t)) {
    l = 0.74169921875;
  } else if (/\&/.test(t)) {
    l = 0.8701171875;
  } else if (/\*/.test(t)) {
    l = 0.455078125;
  } else if (/\(/.test(t)) {
    l = 0.333984375;
  } else if (/\)/.test(t)) {
    l = 0.333984375;
  } else if (/\_/.test(t)) {
    l = 0.4482421875;
  } else if (/\-/.test(t)) {
    l = 0.4326171875;
  } else if (/\+/.test(t)) {
    l = 0.74169921875;
  } else if (/\=/.test(t)) {
    l = 0.74169921875;
  } else if (/\|/.test(t)) {
    l = 0.26904296875;
  } else if (/\\/.test(t)) {
    l = 0.416015625;
  } else if (/\[/.test(t)) {
    l = 0.333984375;
  } else if (/\]/.test(t)) {
    l = 0.333984375;
  } else if (/\;/.test(t)) {
    l = 0.24072265625;
  } else if (/\'/.test(t)) {
    l = 0.25634765625;
  } else if (/\,/.test(t)) {
    l = 0.24072265625;
  } else if (/\./.test(t)) {
    l = 0.24072265625;
  } else if (/\//.test(t)) {
    l = 0.42724609375;
  } else if (/\{/.test(t)) {
    l = 0.333984375;
  } else if (/\}/.test(t)) {
    l = 0.333984375;
  } else if (/\:/.test(t)) {
    l = 0.24072265625;
  } else if (/\"/.test(t)) {
    l = 0.435546875;
  } else if (/\</.test(t)) {
    l = 0.74169921875;
  } else if (/\>/.test(t)) {
    l = 0.74169921875;
  } else if (/\?/.test(t)) {
    l = 0.48291015625;
  } else {
    l = 1;
  }
  return l;
}

// export 
function setImage(images) {// 设置图片数据
  _app2.default.log('进入设置图片数据方法');
  return new Promise( /*#__PURE__*/function () {var _ref3 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee3(resolve, rejcet) {var i;return _regenerator.default.wrap(function _callee3$(_context3) {while (1) {switch (_context3.prev = _context3.next) {case 0:_context3.prev = 0;if (!(

              images && _app2.default.isArray(images))) {_context3.next = 14;break;}
              _app2.default.log('images是一个数组');
              i = 0;case 4:if (!(i < images.length)) {_context3.next = 12;break;}
              _app2.default.log('设置图片数据循环中:' + i);_context3.next = 8;return (
                setImageFn(images[i]));case 8:images[i] = _context3.sent;case 9:i++;_context3.next = 4;break;case 12:_context3.next = 18;break;case 14:


              _app2.default.log('images是一个对象');_context3.next = 17;return (
                setImageFn(images));case 17:images = _context3.sent;case 18:

              resolve(images);_context3.next = 24;break;case 21:_context3.prev = 21;_context3.t0 = _context3["catch"](0);

              //TODO handle the exception
              rejcet(_context3.t0);case 24:case "end":return _context3.stop();}}}, _callee3, null, [[0, 21]]);}));return function (_x5, _x6) {return _ref3.apply(this, arguments);};}());


}

function setImageFn(image) {
  return new Promise( /*#__PURE__*/function () {var _ref4 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee4(resolve, reject) {var imgUrl, hasinfoCallBack, imageInfo;return _regenerator.default.wrap(function _callee4$(_context4) {while (1) {switch (_context4.prev = _context4.next) {case 0:if (!
              image.url) {_context4.next = 17;break;}
              imgUrl = image.url;_context4.next = 4;return (
                _app2.default.downloadFile_PromiseFc(imgUrl));case 4:imgUrl = _context4.sent;
              image.url = imgUrl;
              hasinfoCallBack = image.infoCallBack && typeof image.infoCallBack === 'function';
              imageInfo = {};_context4.next = 10;return (
                _app2.default.getImageInfo_PromiseFc(imgUrl));case 10:imageInfo = _context4.sent;
              if (hasinfoCallBack) {
                image = _objectSpread(_objectSpread({},
                image),
                image.infoCallBack(imageInfo));

              }
              image.dx = image.dx || 0;
              image.dy = image.dy || 0;
              image.dWidth = image.dWidth || imageInfo.width;
              image.dHeight = image.dHeight || imageInfo.height;
              image = _objectSpread(_objectSpread({},
              image), {}, {
                imageInfo: imageInfo });case 17:


              resolve(image);case 18:case "end":return _context4.stop();}}}, _callee4);}));return function (_x7, _x8) {return _ref4.apply(this, arguments);};}());

}

// export 
function drawText(Context, textArray, bgObj) {// 先遍历换行再绘制
  if (!_app2.default.isArray(textArray)) {
    _app2.default.log('遍历文本方法, 不是数组');
    textArray = [textArray];
  } else {
    _app2.default.log('遍历文本方法, 是数组');
  }
  _app2.default.log('遍历文本方法, textArray:' + JSON.stringify(textArray));
  var newArr = [];
  if (textArray && textArray.length > 0) {
    for (var j = 0; j < textArray.length; j++) {
      var textItem = textArray[j];
      if (textItem.text && textItem.lineFeed) {
        var lineNum = -1,
        maxWidth = bgObj.width,
        lineHeight = textItem.size,
        dx = textItem.dx;
        if (_app2.default.isObject(textItem.lineFeed)) {
          var lineFeed = textItem.lineFeed;
          lineNum = lineFeed.lineNum !== undefined && typeof lineFeed.lineNum === 'number' && lineFeed.lineNum >= 0 ?
          lineFeed.lineNum : lineNum;
          maxWidth = lineFeed.maxWidth !== undefined && typeof lineFeed.maxWidth === 'number' ? lineFeed.maxWidth :
          maxWidth;
          lineHeight = lineFeed.lineHeight !== undefined && typeof lineFeed.lineHeight === 'number' ? lineFeed.lineHeight :
          lineHeight;
          dx = lineFeed.dx !== undefined && typeof lineFeed.dx === 'number' ? lineFeed.dx : dx;
        }
        var chr = textItem.text.split("");
        var temp = "";
        var row = [];
        //循环出几行文字组成数组
        for (var a = 0, len = chr.length; a < len; a++) {
          if (countTextLength(Context, {
            text: temp,
            size: textItem.size }) <=
          maxWidth && countTextLength(Context, {
            text: temp + chr[a],
            size: textItem.size }) <=
          maxWidth) {
            temp += chr[a];
            if (a == chr.length - 1) {
              row.push(temp);
            }
          } else {
            row.push(temp);
            temp = chr[a];
          }
        }
        _app2.default.log('循环出的文本数组:' + JSON.stringify(row));
        //只显示几行 变量间距lineHeight  变量行数lineNum
        var allNum = lineNum >= 0 && lineNum < row.length ? lineNum : row.length;

        for (var i = 0; i < allNum; i++) {
          var str = row[i];
          if (i == allNum - 1 && allNum < row.length) {
            str = str.substring(0, str.length - 1) + '...';
          }
          var obj = _objectSpread(_objectSpread({}, textItem), {}, {
            text: str,
            dx: i === 0 ? textItem.dx : dx >= 0 ? dx : textItem.dx,
            dy: textItem.dy + i * lineHeight,
            textLength: countTextLength(Context, {
              text: str,
              size: textItem.size }) });


          _app2.default.log('重新组成的文本对象:' + JSON.stringify(obj));
          newArr.push(obj);
        }
      } else {
        newArr.push(textItem);
      }
    }
  }
  _app2.default.log('绘制文本新数组:' + JSON.stringify(newArr));
  drawTexts(Context, newArr);
}

function setFont() {var textItem = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  if (textItem.font && typeof textItem.font === 'string') {
    _app2.default.log(textItem.font);
    return textItem.font;
  } else {
    var fontStyle = 'normal';
    var fontVariant = 'normal';
    var fontWeight = 'normal';
    var fontSize = textItem.size || 10;
    var fontFamily = 'sans-serif';
    fontSize = Math.ceil(Number(fontSize));
    if (textItem.fontStyle && typeof textItem.fontStyle === 'string')
    fontStyle = textItem.fontStyle.trim();
    if (textItem.fontVariant && typeof textItem.fontVariant === 'string')
    fontVariant = textItem.fontVariant.trim();
    if (textItem.fontWeight && (typeof textItem.fontWeight === 'string' || typeof textItem.fontWeight === 'number'))
    fontWeight = textItem.fontWeight.trim();
    if (textItem.fontFamily && typeof textItem.fontFamily === 'string')
    fontFamily = textItem.fontFamily.trim();
    return fontStyle + ' ' +
    fontVariant + ' ' +
    fontWeight + ' ' +
    fontSize + 'px' + ' ' +
    fontFamily;
  }
}

function drawTexts(Context, texts) {// 绘制文本
  _app2.default.log('准备绘制文本方法, texts:' + JSON.stringify(texts));
  if (texts && _app2.default.isArray(texts)) {
    _app2.default.log('准备绘制文本方法, 是数组');
    if (texts.length > 0) {
      for (var i = 0; i < texts.length; i++) {
        drawTextFn(Context, texts[i]);
      }
    }
  } else {
    _app2.default.log('准备绘制文本方法, 不是数组');
    drawTextFn(Context, texts);
  }
}

function drawTextFn(Context, textItem) {
  _app2.default.log('进入绘制文本方法, textItem:' + JSON.stringify(textItem));
  if (textItem && _app2.default.isObject(textItem) && textItem.text) {
    Context.font = setFont(textItem);
    Context.setFillStyle(textItem.color);
    Context.setGlobalAlpha(textItem.alpha);
    Context.setTextAlign(textItem.textAlign);
    Context.setTextBaseline(textItem.textBaseline);
    Context.fillText(textItem.text, textItem.dx, textItem.dy);
    if (textItem.lineThrough && _app2.default.isObject(textItem.lineThrough)) {
      _app2.default.log('有删除线');
      var lineThrough = textItem.lineThrough;
      lineThrough.alpha = lineThrough.alpha !== undefined ? lineThrough.alpha : textItem.alpha;
      lineThrough.style = lineThrough.style || textItem.color;
      lineThrough.width = lineThrough.width !== undefined ? lineThrough.width : textItem.size / 10;
      lineThrough.cap = lineThrough.cap !== undefined ? lineThrough.cap : 'butt';
      _app2.default.log('删除线对象:' + JSON.stringify(lineThrough));
      Context.setGlobalAlpha(lineThrough.alpha);
      Context.setStrokeStyle(lineThrough.style);
      Context.setLineWidth(lineThrough.width);
      Context.setLineCap(lineThrough.cap);
      var mx, my;
      switch (textItem.textAlign) {
        case 'left':
          mx = textItem.dx;
          break;
        case 'center':
          mx = textItem.dx - textItem.textLength / 2;
          break;
        default:
          mx = textItem.dx - textItem.textLength;
          break;}

      switch (textItem.textBaseline) {
        case 'top':
          my = textItem.dy + textItem.size * .5;
          break;
        case 'middle':
          my = textItem.dy;
          break;
        default:
          my = textItem.dy - textItem.size * .5;
          break;}

      Context.beginPath();
      Context.moveTo(mx, my);
      Context.lineTo(mx + textItem.textLength, my);
      Context.stroke();
      Context.closePath();
      _app2.default.log('删除线完毕');
    }
    Context.setGlobalAlpha(1);
    Context.font = '10px sans-serif';
  }
}
// export 
function drawImage(Context, images) {// 绘制图片
  _app2.default.log('判断图片数据类型:' + JSON.stringify(images));
  if (images && _app2.default.isArray(images)) {
    if (images.length > 0) {
      for (var i = 0; i < images.length; i++) {
        readyDrawImageFn(Context, images[i]);
      }
    }
  } else {
    readyDrawImageFn(Context, images);
  }

}

function readyDrawImageFn(Context, img) {
  _app2.default.log('判断绘制图片形状, img:' + JSON.stringify(img));
  if (img.url) {
    if (img.circleSet) {
      drawCircleImage(Context, img);
    } else if (img.roundRectSet) {
      drawRoundRectImage(Context, img);
    } else {
      drawImageFn(Context, img);
    }
  }
}

function drawImageFn(Context, img) {
  _app2.default.log('进入绘制默认图片方法, img:' + JSON.stringify(img));
  if (img.url) {
    var hasAlpha = !_app2.default.isUndef(img.alpha);
    img.alpha = Number(!_app2.default.isUndef(img.alpha) ? img.alpha : 1);
    Context.setGlobalAlpha(img.alpha);
    _app2.default.log('绘制默认图片方法, 有url');
    if (img.dWidth && img.dHeight && img.sx && img.sy && img.sWidth && img.sHeight) {
      _app2.default.log('绘制默认图片方法, 绘制第一种方案');
      Context.drawImage(img.url, img.dx || 0, img.dy || 0,
      img.dWidth || false, img.dHeight || false,
      img.sx || false, img.sy || false,
      img.sWidth || false, img.sHeight || false);
    } else if (img.dWidth && img.dHeight) {
      _app2.default.log('绘制默认图片方法, 绘制第二种方案');
      Context.drawImage(img.url, img.dx || 0, img.dy || 0,
      img.dWidth || false, img.dHeight || false);
    } else {
      _app2.default.log('绘制默认图片方法, 绘制第三种方案');
      Context.drawImage(img.url, img.dx || 0, img.dy || 0);
    }
    if (hasAlpha) {
      Context.setGlobalAlpha(1);
    }
  }
  _app2.default.log('绘制默认图片方法, 绘制完毕');
}

function drawCircleImage(Context, obj) {
  _app2.default.log('进入绘制圆形图片方法, obj:' + JSON.stringify(obj));var

  dx =





  obj.dx,dy = obj.dy,dWidth = obj.dWidth,dHeight = obj.dHeight,circleSet = obj.circleSet,imageInfo = obj.imageInfo;
  var x, y, r;
  if (typeof circleSet === 'object') {
    x = circleSet.x;
    y = circleSet.y;
    r = circleSet.r;
  }
  if (!r) {
    var d;
    d = dWidth > dHeight ? dHeight : dWidth;
    r = d / 2;
  }

  x = x ? dx + x : (dx || 0) + r;
  y = y ? dy + y : (dy || 0) + r;
  Context.save();
  Context.beginPath();
  Context.arc(x, y, r, 0, 2 * Math.PI, false);
  Context.closePath();
  Context.setGlobalAlpha(0);
  Context.fillStyle = '#FFFFFF';
  Context.fill();
  Context.setGlobalAlpha(1);
  Context.clip();
  drawImageFn(Context, obj);
  _app2.default.log('默认图片绘制完毕');
  Context.restore();
}

function drawRoundRectImage(Context, obj) {// 绘制矩形
  _app2.default.log('进入绘制矩形图片方法, obj:' + JSON.stringify(obj));
  Context.save();var

  dx =





  obj.dx,dy = obj.dy,dWidth = obj.dWidth,dHeight = obj.dHeight,roundRectSet = obj.roundRectSet,imageInfo = obj.imageInfo;
  var r;
  if (typeof roundRectSet === 'object') {
    r = roundRectSet.r;
  }
  r = r || dWidth * .1;

  if (dWidth < 2 * r) {
    r = dWidth / 2;
  }
  if (dHeight < 2 * r) {
    r = dHeight / 2;
  }
  Context.beginPath();
  Context.moveTo(dx + r, dy);
  Context.arcTo(dx + dWidth, dy, dx + dWidth, dy + dHeight, r);
  Context.arcTo(dx + dWidth, dy + dHeight, dx, dy + dHeight, r);
  Context.arcTo(dx, dy + dHeight, dx, dy, r);
  Context.arcTo(dx, dy, dx + dWidth, dy, r);
  Context.closePath();
  Context.setGlobalAlpha(0);
  Context.fillStyle = '#FFFFFF';
  Context.fill();
  Context.setGlobalAlpha(1);
  Context.clip();
  drawImageFn(Context, obj);
  Context.restore();
  _app2.default.log('进入绘制矩形图片方法, 绘制完毕');
}

// export 
function drawQrCode(Context, qrCodeObj) {//生成二维码方法， 参考了 诗小柒 的二维码生成器代码
  _app2.default.log('进入绘制二维码方法');
  _app2.default.showLoading('正在生成二维码');
  var qrcodeAlgObjCache = [];
  var options = {
    text: String(qrCodeObj.text || '') || '', // 生成内容
    size: Number(qrCodeObj.size || 0) || 200, // 二维码大小
    background: String(qrCodeObj.background || '') || '#ffffff', // 背景色
    foreground: String(qrCodeObj.foreground || '') || '#000000', // 前景色
    pdground: String(qrCodeObj.pdground || '') || '#000000', // 定位角点颜色
    correctLevel: Number(qrCodeObj.correctLevel || 0) || 3, // 容错级别
    image: String(qrCodeObj.image || '') || '', // 二维码图标
    imageSize: Number(qrCodeObj.imageSize || 0) || 40, // 二维码图标大小
    dx: Number(qrCodeObj.dx || 0) || 0, // x轴距离
    dy: Number(qrCodeObj.dy || 0) || 0 // y轴距离
  };
  var qrCodeAlg = null;
  var d = 0;
  for (var i = 0, l = qrcodeAlgObjCache.length; i < l; i++) {
    d = i;
    if (qrcodeAlgObjCache[i].text == options.text && qrcodeAlgObjCache[i].text.correctLevel == options.correctLevel) {
      qrCodeAlg = qrcodeAlgObjCache[i].obj;
      break;
    }
  }
  if (d == l) {
    qrCodeAlg = new _QRCodeAlg.default(options.text, options.correctLevel);
    qrcodeAlgObjCache.push({
      text: options.text,
      correctLevel: options.correctLevel,
      obj: qrCodeAlg });

  }
  var getForeGround = function getForeGround(config) {
    var options = config.options;
    if (options.pdground && (
    config.row > 1 && config.row < 5 && config.col > 1 && config.col < 5 ||
    config.row > config.count - 6 && config.row < config.count - 2 && config.col > 1 && config.col < 5 ||
    config.row > 1 && config.row < 5 && config.col > config.count - 6 && config.col < config.count - 2))
    {
      return options.pdground;
    }
    return options.foreground;
  };
  var count = qrCodeAlg.getModuleCount();
  var ratioSize = options.size;
  var ratioImgSize = options.imageSize;
  //计算每个点的长宽
  var tileW = (ratioSize / count).toPrecision(4);
  var tileH = (ratioSize / count).toPrecision(4);
  //绘制
  for (var row = 0; row < count; row++) {
    for (var col = 0; col < count; col++) {
      var w = Math.ceil((col + 1) * tileW) - Math.floor(col * tileW);
      var h = Math.ceil((row + 1) * tileW) - Math.floor(row * tileW);
      var foreground = getForeGround({
        row: row,
        col: col,
        count: count,
        options: options });

      Context.setFillStyle(qrCodeAlg.modules[row][col] ? foreground : options.background);
      Context.fillRect(options.dx + Math.round(col * tileW), options.dy + Math.round(row * tileH), w, h);
    }
  }
  if (options.image) {




    // 画圆角矩形
    var drawRoundedRect = function drawRoundedRect(ctxi, x, y, width, height, r, lineWidth, fill, stroke) {
      ctxi.setLineWidth(lineWidth);
      ctxi.setFillStyle(options.background);
      ctxi.setStrokeStyle(options.background);
      ctxi.beginPath(); // draw top and top right corner 
      ctxi.moveTo(x + r, y);
      ctxi.arcTo(x + width, y, x + width, y + r, r); // draw right side and bottom right corner 
      ctxi.arcTo(x + width, y + height, x + width - r, y + height, r); // draw bottom and bottom left corner 
      ctxi.arcTo(x, y + height, x, y + height - r, r); // draw left and top left corner 
      ctxi.arcTo(x, y, x + r, y, r);
      ctxi.closePath();
      if (fill) {
        ctxi.fill();
      }
      if (stroke) {
        ctxi.stroke();
      }
    };var x = options.dx + Number(((ratioSize - ratioImgSize) / 2).toFixed(2));var y = options.dy + Number(((ratioSize - ratioImgSize) / 2).toFixed(2));drawRoundedRect(Context, x, y, ratioImgSize, ratioImgSize, 2, 6, true, true);Context.drawImage(options.image, x, y, ratioImgSize, ratioImgSize);
  }
  _app2.default.hideLoading();
}


function getShreUserPosterBackground(objs) {//检查背景图是否存在于本地， 若存在直接返回， 否则调用getShreUserPosterBackgroundFc方法
  var
  backgroundImage =

  objs.backgroundImage,type = objs.type;
  return new Promise( /*#__PURE__*/function () {var _ref5 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee5(resolve, reject) {var pbg, image, index, imageObj, obj, savedFilePath, _savedFilePath, _savedFilePath2, _savedFilePath3;return _regenerator.default.wrap(function _callee5$(_context5) {while (1) {switch (_context5.prev = _context5.next) {case 0:_context5.prev = 0;

              _app2.default.showLoading('正在获取海报背景图');


              pbg = getPosterStorage(type);




              _app2.default.log('获取的缓存:' + JSON.stringify(pbg));if (!(
              pbg && pbg.path && pbg.name)) {_context5.next = 53;break;}
              _app2.default.log('海报有缓存, 准备获取后端背景图进行对比');_context5.next = 8;return (
                _app2.default.getPosterUrl(objs));case 8:image = _context5.sent;
              _app2.default.log('准备对比name是否相同');if (!(
              pbg.name === _app2.default.fileNameInPath(image))) {_context5.next = 45;break;}
              _app2.default.log('name相同, 判断该背景图是否存在于本地');_context5.next = 14;return (
                _app2.default.checkFile_PromiseFc(pbg.path));case 14:index = _context5.sent;if (!(
              index >= 0)) {_context5.next = 37;break;}
              _app2.default.log('海报save路径存在, 对比宽高信息, 存储并输出');_context5.next = 19;return (
                _app2.default.getImageInfo_PromiseFc(pbg.path));case 19:imageObj = _context5.sent;
              obj = _objectSpread({}, pbg);if (!(

              !pbg.width || !pbg.height || pbg.width !== imageObj.width || pbg.height !== imageObj.height)) {_context5.next = 30;break;}
              _app2.default.log('宽高对比不通过， 重新获取');_context5.next = 25;return (
                getShreUserPosterBackgroundFc(objs, image));case 25:savedFilePath = _context5.sent;
              _app2.default.hideLoading();
              resolve(savedFilePath);_context5.next = 35;break;case 30:

              _app2.default.log('宽高对比通过, 再次存储, 并返回路径');
              obj = _objectSpread(_objectSpread({},
              pbg), {}, {
                width: imageObj.width,
                height: imageObj.height });


              setPosterStorage(type, _objectSpread({}, obj));


              _app2.default.hideLoading();
              resolve(obj);case 35:_context5.next = 43;break;case 37:


              _app2.default.log('海报save路径不存在, 重新获取海报');_context5.next = 40;return (
                getShreUserPosterBackgroundFc(objs, image));case 40:_savedFilePath = _context5.sent;
              _app2.default.hideLoading();
              resolve(_savedFilePath);case 43:_context5.next = 51;break;case 45:


              _app2.default.log('name不相同, 重新获取海报');_context5.next = 48;return (
                getShreUserPosterBackgroundFc(objs, image));case 48:_savedFilePath2 = _context5.sent;
              _app2.default.hideLoading();
              resolve(_savedFilePath2);case 51:_context5.next = 59;break;case 53:


              _app2.default.log('海报背景图没有缓存, 准备获取海报背景图');_context5.next = 56;return (
                getShreUserPosterBackgroundFc(objs));case 56:_savedFilePath3 = _context5.sent;
              _app2.default.hideLoading();
              resolve(_savedFilePath3);case 59:_context5.next = 67;break;case 61:_context5.prev = 61;_context5.t0 = _context5["catch"](0);


              _app2.default.hideLoading();
              _app2.default.showToast('获取分享用户背景图失败:' + JSON.stringify(_context5.t0));
              _app2.default.log(JSON.stringify(_context5.t0));
              reject(_context5.t0);case 67:case "end":return _context5.stop();}}}, _callee5, null, [[0, 61]]);}));return function (_x9, _x10) {return _ref5.apply(this, arguments);};}());


}

function getPosterStorage(type) {
  return _app2.default.getStorageSync(getStorageKey(type));
}

function removePosterStorage(type) {
  var ShreUserPosterBackgroundKey = getStorageKey(type);
  var pbg = _app2.default.getStorageSync(ShreUserPosterBackgroundKey);
  if (pbg && pbg.path) {
    _app2.default.removeSavedFile(pbg.path);
    _app2.default.removeStorageSync(ShreUserPosterBackgroundKey);
  }
}

function setPosterStorage(type, data) {
  _app2.default.setStorage(getStorageKey(type), data);
}

function getStorageKey(type) {
  return ShreUserPosterBackgroundKey + (type || 'default');
}

function getShreUserPosterBackgroundFc(objs, upimage) {//下载并保存背景图方法
  var
  backgroundImage =

  objs.backgroundImage,type = objs.type;
  _app2.default.log('获取分享背景图, 尝试清空本地数据');
  removePosterStorage(type);
  return new Promise( /*#__PURE__*/function () {var _ref6 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee6(resolve, reject) {var name, savedFilePath, imageObj, returnObj, image, _savedFilePath4, _imageObj, _returnObj;return _regenerator.default.wrap(function _callee6$(_context6) {while (1) {switch (_context6.prev = _context6.next) {case 0:_context6.prev = 0;

              _app2.default.showLoading('正在下载海报背景图');if (!
              upimage) {_context6.next = 24;break;}
              _app2.default.log('有从后端获取的背景图片路径');
              _app2.default.log('尝试下载并保存背景图');
              name = _app2.default.fileNameInPath(upimage);_context6.next = 8;return (
                _app2.default.downLoadAndSaveFile_PromiseFc(upimage));case 8:savedFilePath = _context6.sent;if (!
              savedFilePath) {_context6.next = 20;break;}
              _app2.default.log('下载并保存背景图成功:' + savedFilePath);_context6.next = 13;return (
                _app2.default.getImageInfo_PromiseFc(savedFilePath));case 13:imageObj = _context6.sent;
              returnObj = {
                path: savedFilePath,
                width: imageObj.width,
                height: imageObj.height,
                name: name };


              setPosterStorage(type, _objectSpread({}, returnObj));


              _app2.default.hideLoading();
              resolve(returnObj);_context6.next = 22;break;case 20:

              _app2.default.hideLoading();
              reject('not find savedFilePath');case 22:_context6.next = 48;break;case 24:


              _app2.default.log('没有从后端获取的背景图片路径, 尝试从后端获取背景图片路径');_context6.next = 27;return (
                _app2.default.getPosterUrl(objs));case 27:image = _context6.sent;
              _app2.default.log('尝试下载并保存背景图:' + image);_context6.next = 31;return (
                _app2.default.downLoadAndSaveFile_PromiseFc(image));case 31:_savedFilePath4 = _context6.sent;if (!
              _savedFilePath4) {_context6.next = 46;break;}
              _app2.default.log('下载并保存背景图成功:' + _savedFilePath4);_context6.next = 36;return (
                _app2.default.getImageInfo_PromiseFc(_savedFilePath4));case 36:_imageObj = _context6.sent;
              _app2.default.log('获取图片信息成功');
              _returnObj = {
                path: _savedFilePath4,
                width: _imageObj.width,
                height: _imageObj.height,
                name: _app2.default.fileNameInPath(image) };

              _app2.default.log('拼接背景图信息对象成功:' + JSON.stringify(_returnObj));


              setPosterStorage(type, _objectSpread({}, _returnObj));



              _app2.default.hideLoading();
              _app2.default.log('返回背景图信息对象');
              resolve(_objectSpread({}, _returnObj));_context6.next = 48;break;case 46:


              _app2.default.hideLoading();
              reject('not find savedFilePath');case 48:_context6.next = 53;break;case 50:_context6.prev = 50;_context6.t0 = _context6["catch"](0);



              //TODO handle the exception
              reject(_context6.t0);case 53:case "end":return _context6.stop();}}}, _callee6, null, [[0, 50]]);}));return function (_x11, _x12) {return _ref6.apply(this, arguments);};}());


}


module.exports = {
  getSharePoster: getSharePoster,
  setText: setText,
  setImage: setImage,
  drawText: drawText,
  drawImage: drawImage,
  drawQrCode: drawQrCode };
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 932:
/*!******************************************************************************!*\
  !*** D:/lixindom/2020/伊籭商城/beefShop/components/poster/QS-SharePoster/app.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(uni) {var _log = console.log; // 如果在项目的APP.vue文件中的onlaunch中设置 console.log = ()=> {} 则在此也不会有打印信息
_log = function log() {}; // 打开注释则该插件不会打印任何信息
var _app = {
  //交互控制
  log: function log(t) {
    _log(t);
  }, // 打印控制,
  showLoading: function showLoading(msg, ifmask) {
    uni.showLoading({
      title: msg,
      mask: ifmask || false });

  },
  hideLoading: function hideLoading() {
    uni.hideLoading();
  },
  showToast: function showToast(msg, icon) {
    uni.showToast({
      title: msg,
      icon: icon || 'none' });

  },
  getPosterUrl: function getPosterUrl(objs) {// 后端获取背景图的url路径方法
    var
    backgroundImage =


    objs.backgroundImage,type = objs.type,formData = objs.formData;
    return new Promise(function (rs, rj) {
      // let image='/static/img/invite_poster.png';
      if (backgroundImage) {
        image = backgroundImage;
      } else {
        switch (type) {//根据type获取背景图, 一般要改成request获取
          case 'invitePoster':
            image = '/static/img/invite_bg.png';
            break;
          case 'goodsPoster':
            image = '/static/imgs/poster/goods_poster.png';
            break;
          case 'grouponPoster':
            image = '/static/imgs/poster/groupon_poster.png';
            break;
          default:
            image = '';
            break;}

      }
      if (image) {
        rs(image); // resolve图片的路径
      } else {
        rj('背景图片路径不存在');
      }
    });
  },






  //下面一般不用动他
  shareTypeListSheetArray: {
    array: [0, 1, 2, 3, 4, 5] },
  // 分享类型 0-图文链接 1-纯文字 2-纯图片 3-音乐 4-视频 5-小程序
  isArray: function isArray(arg) {
    return Object.prototype.toString.call(arg) === '[object Array]';
  },
  isObject: function isObject(arg) {
    return Object.prototype.toString.call(arg) === '[object Object]';
  },
  isPromise: function isPromise(obj) {
    return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
  },
  isNull: function isNull(arg) {
    return arg === null;
  },
  isUndefined: function isUndefined(arg) {
    return arg === undefined;
  },
  isUndef: function isUndef(arg) {
    return arg === undefined;
  },
  isNotNull_string: function isNotNull_string(arg) {
    return arg !== null && arg !== undefined && arg !== '';
  },
  isFn: function isFn(fn) {
    return fn && typeof fn === 'function';
  },
  getStorage: function getStorage(key, scb, fcb) {
    uni.getStorage({
      key: key,
      success: function success(res) {
        if (res.data && res.data != "") {
          if (scb) scb(res.data);
        } else {
          if (fcb) fcb();
        }
      },
      fail: function fail() {
        if (fcb) fcb();
      } });

  },
  setStorage: function setStorage(key, data) {
    _log('设置缓存');
    _log('key：' + key);
    _log('data：' + JSON.stringify(data));
    uni.setStorage({
      key: key,
      data: data });

  },
  setStorageSync: function setStorageSync(key, data) {
    uni.setStorageSync(key, data);
  },
  getStorageSync: function getStorageSync(key) {
    return uni.getStorageSync(key);
  },
  clearStorageSync: function clearStorageSync() {
    uni.clearStorageSync();
  },
  removeStorageSync: function removeStorageSync(key) {
    uni.removeStorageSync(key);
  },
  getImageInfo: function getImageInfo(url, cb, fcb) {
    url = checkMPUrl(url);
    uni.getImageInfo({
      src: url,
      success: function success(res) {
        if (cb && typeof cb == 'function') cb(res);
      },
      fail: function fail(err) {
        if (fcb && typeof fcb == 'function') fcb(err);
      } });

  },
  downloadFile: function downloadFile(url, cb) {
    url = checkMPUrl(url);
    uni.downloadFile({
      url: url,
      success: function success(res) {
        if (cb && typeof cb == 'function') cb(res);
      } });

  },
  downloadFile_PromiseFc: function downloadFile_PromiseFc(url) {
    return new Promise(function (rs, rj) {
      if (url.substring(0, 4) !== 'http') {
        rs(url);
      } else {
        url = checkMPUrl(url);
        _log('url:' + url);
        uni.downloadFile({
          url: url,
          success: function success(res) {
            if (res && res.tempFilePath)
            rs(res.tempFilePath);else

            rj('not find tempFilePath');
          },
          fail: function fail(err) {
            rj(err);
          } });

      }
    });
  },
  saveFile: function saveFile(url) {
    uni.saveFile({
      tempFilePath: url,
      success: function success(res) {
        _log('保存成功:' + JSON.stringify(res));
      } });

  },
  downLoadAndSaveFile_PromiseFc: function downLoadAndSaveFile_PromiseFc(url) {
    return new Promise(function (rs, rj) {
      _log('准备下载并保存图片:' + url);
      if (url.substring(0, 4) === 'http') {
        url = checkMPUrl(url);
        uni.downloadFile({
          url: url,
          success: function success(d_res) {
            _log('下载背景图成功：' + JSON.stringify(d_res));
            if (d_res && d_res.tempFilePath) {






              uni.saveFile({
                tempFilePath: d_res.tempFilePath,
                success: function success(s_res) {
                  _log('保存背景图成功:' + JSON.stringify(s_res));
                  if (s_res && s_res.savedFilePath)
                  rs(s_res.savedFilePath);else

                  rs(d_res.tempFilePath);
                },
                fail: function fail(err) {
                  rs(d_res.tempFilePath);
                } });



            } else {
              rj('not find tempFilePath');
            }
          },
          fail: function fail(err) {
            rj(err);
          } });

      } else {
        rs(url);
      }
    });
  },
  checkFile_PromiseFc: function checkFile_PromiseFc(url) {
    return new Promise(function (rs, rj) {
      uni.getSavedFileList({
        success: function success(res) {
          var d = res.fileList;
          var index = d.findIndex(function (item) {
            return item.filePath === url;
          });
          rs(index);
        },
        fail: function fail(err) {
          rj(err);
        } });

    });
  },
  removeSavedFile: function removeSavedFile(path) {
    uni.getSavedFileList({
      success: function success(res) {
        var d = res.fileList;
        var index = d.findIndex(function (item) {
          return item.filePath === path;
        });
        if (index >= 0)
        uni.removeSavedFile({
          filePath: path });

      } });

  },
  fileNameInPath: function fileNameInPath(path) {
    var s = path.split("/");
    return s[s.length - 1];
  },
  getImageInfo_PromiseFc: function getImageInfo_PromiseFc(imgPath) {

    return new Promise(function (rs, rj) {
      _log('准备获取图片信息:' + imgPath);
      imgPath = checkMPUrl(imgPath);
      uni.getImageInfo({
        src: imgPath,
        success: function success(res) {
          _log('获取图片信息成功:' + JSON.stringify(res));
          rs(res);
        },
        fail: function fail(err) {
          _log('获取图片信息失败:' + JSON.stringify(err));
          rj(err);
        } });

    });
  },
  previewImage: function previewImage(urls) {
    if (typeof urls == 'string')
    urls = [urls];
    uni.previewImage({
      urls: urls });

  },
  actionSheet: function actionSheet(obj, cb) {
    var sheetArray = [];
    for (var i = 0; i < obj.array.length; i++) {
      switch (obj.array[i]) {
        case 'sinaweibo':
          sheetArray[i] = '新浪微博';
          break;
        case 'qq':
          sheetArray[i] = 'QQ';
          break;
        case 'weixin':
          sheetArray[i] = '微信';
          break;
        case 'WXSceneSession':
          sheetArray[i] = '微信好友';
          break;
        case 'WXSenceTimeline':
          sheetArray[i] = '微信朋友圈';
          break;
        case 'WXSceneFavorite':
          sheetArray[i] = '微信收藏';
          break;
        case 0:
          sheetArray[i] = '图文链接';
          break;
        case 1:
          sheetArray[i] = '纯文字';
          break;
        case 2:
          sheetArray[i] = '纯图片';
          break;
        case 3:
          sheetArray[i] = '音乐';
          break;
        case 4:
          sheetArray[i] = '视频';
          break;
        case 5:
          sheetArray[i] = '小程序';
          break;
        default:
          break;}

    }
    this.showActionSheet(sheetArray, cb);
  },
  showActionSheet: function showActionSheet(sheetArray, cb) {
    uni.showActionSheet({
      itemList: sheetArray,
      success: function success(e) {
        if (cb && typeof cb == 'function') cb(e.tapIndex);
      } });

  },
  getProvider: function getProvider(type, cb, sheet) {
    var _this = this;
    uni.getProvider({
      service: type,
      success: function success(res) {
        if (sheet) {
          var obj = {};
          obj.array = res.provider;
          _this.actionSheet(obj, function (index) {
            if (cb && typeof cb == "function") cb(res.provider[index]);
          });
        } else {
          if (type == 'payment') {
            var providers = res.provider;
            var payTypeArray = [];
            for (var i = 0; i < providers.length; i++) {
              if (providers[i] == 'wxpay') {
                payTypeArray[i] = {
                  name: '微信支付',
                  value: providers[i],
                  img: '/static/image/wei.png' };

              } else if (providers[i] == 'alipay') {
                payTypeArray[i] = {
                  name: "支付宝支付",
                  value: providers[i],
                  img: '/static/image/ali.png' };

              }
            }
            if (cb && typeof cb == "function") cb(payTypeArray);
          } else {
            if (cb && typeof cb == "function") cb(res);
          }
        }
      } });

  } };



















































































































































































function checkMPUrl(url) {

  if (
  url.substring(0, 4) === 'http' &&
  url.substring(0, 12) !== 'http://store' &&
  url.substring(0, 10) !== 'http://tmp' &&
  url.substring(0, 5) !== 'https')
  {
    url = 'https' + url.substring(4, url.length);
  }

  return url;
}

module.exports = _app;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 933:
/*!************************************************************************************!*\
  !*** D:/lixindom/2020/伊籭商城/beefShop/components/poster/QS-SharePoster/QRCodeAlg.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = QRCodeAlg; /**
                                                                                                            * 获取单个字符的utf8编码
                                                                                                            * unicode BMP平面约65535个字符
                                                                                                            * @param {num} code
                                                                                                            * return {array}
                                                                                                            */
function unicodeFormat8(code) {
  // 1 byte
  var c0, c1, c2;
  if (code < 128) {
    return [code];
    // 2 bytes
  } else if (code < 2048) {
    c0 = 192 + (code >> 6);
    c1 = 128 + (code & 63);
    return [c0, c1];
    // 3 bytes
  } else {
    c0 = 224 + (code >> 12);
    c1 = 128 + (code >> 6 & 63);
    c2 = 128 + (code & 63);
    return [c0, c1, c2];
  }
}
/**
   * 获取字符串的utf8编码字节串
   * @param {string} string
   * @return {array}
   */
function getUTF8Bytes(string) {
  var utf8codes = [];
  for (var i = 0; i < string.length; i++) {
    var code = string.charCodeAt(i);
    var utf8 = unicodeFormat8(code);
    for (var j = 0; j < utf8.length; j++) {
      utf8codes.push(utf8[j]);
    }
  }
  return utf8codes;
}
/**
   * 二维码算法实现
   * @param {string} data              要编码的信息字符串
   * @param {num} errorCorrectLevel 纠错等级
   */
function QRCodeAlg(data, errorCorrectLevel) {
  this.typeNumber = -1; //版本
  this.errorCorrectLevel = errorCorrectLevel;
  this.modules = null; //二维矩阵，存放最终结果
  this.moduleCount = 0; //矩阵大小
  this.dataCache = null; //数据缓存
  this.rsBlocks = null; //版本数据信息
  this.totalDataCount = -1; //可使用的数据量
  this.data = data;
  this.utf8bytes = getUTF8Bytes(data);
  this.make();
}
QRCodeAlg.prototype = {
  constructor: QRCodeAlg,
  /**
                           * 获取二维码矩阵大小
                           * @return {num} 矩阵大小
                           */
  getModuleCount: function getModuleCount() {
    return this.moduleCount;
  },
  /**
      * 编码
      */
  make: function make() {
    this.getRightType();
    this.dataCache = this.createData();
    this.createQrcode();
  },
  /**
      * 设置二位矩阵功能图形
      * @param  {bool} test 表示是否在寻找最好掩膜阶段
      * @param  {num} maskPattern 掩膜的版本
      */
  makeImpl: function makeImpl(maskPattern) {
    this.moduleCount = this.typeNumber * 4 + 17;
    this.modules = new Array(this.moduleCount);
    for (var row = 0; row < this.moduleCount; row++) {
      this.modules[row] = new Array(this.moduleCount);
    }
    this.setupPositionProbePattern(0, 0);
    this.setupPositionProbePattern(this.moduleCount - 7, 0);
    this.setupPositionProbePattern(0, this.moduleCount - 7);
    this.setupPositionAdjustPattern();
    this.setupTimingPattern();
    this.setupTypeInfo(true, maskPattern);
    if (this.typeNumber >= 7) {
      this.setupTypeNumber(true);
    }
    this.mapData(this.dataCache, maskPattern);
  },
  /**
      * 设置二维码的位置探测图形
      * @param  {num} row 探测图形的中心横坐标
      * @param  {num} col 探测图形的中心纵坐标
      */
  setupPositionProbePattern: function setupPositionProbePattern(row, col) {
    for (var r = -1; r <= 7; r++) {
      if (row + r <= -1 || this.moduleCount <= row + r) continue;
      for (var c = -1; c <= 7; c++) {
        if (col + c <= -1 || this.moduleCount <= col + c) continue;
        if (0 <= r && r <= 6 && (c == 0 || c == 6) || 0 <= c && c <= 6 && (r == 0 || r == 6) || 2 <= r && r <= 4 && 2 <= c && c <= 4) {
          this.modules[row + r][col + c] = true;
        } else {
          this.modules[row + r][col + c] = false;
        }
      }
    }
  },
  /**
      * 创建二维码
      * @return {[type]} [description]
      */
  createQrcode: function createQrcode() {
    var minLostPoint = 0;
    var pattern = 0;
    var bestModules = null;
    for (var i = 0; i < 8; i++) {
      this.makeImpl(i);
      var lostPoint = QRUtil.getLostPoint(this);
      if (i == 0 || minLostPoint > lostPoint) {
        minLostPoint = lostPoint;
        pattern = i;
        bestModules = this.modules;
      }
    }
    this.modules = bestModules;
    this.setupTypeInfo(false, pattern);
    if (this.typeNumber >= 7) {
      this.setupTypeNumber(false);
    }
  },
  /**
      * 设置定位图形
      * @return {[type]} [description]
      */
  setupTimingPattern: function setupTimingPattern() {
    for (var r = 8; r < this.moduleCount - 8; r++) {
      if (this.modules[r][6] != null) {
        continue;
      }
      this.modules[r][6] = r % 2 == 0;
      if (this.modules[6][r] != null) {
        continue;
      }
      this.modules[6][r] = r % 2 == 0;
    }
  },
  /**
      * 设置矫正图形
      * @return {[type]} [description]
      */
  setupPositionAdjustPattern: function setupPositionAdjustPattern() {
    var pos = QRUtil.getPatternPosition(this.typeNumber);
    for (var i = 0; i < pos.length; i++) {
      for (var j = 0; j < pos.length; j++) {
        var row = pos[i];
        var col = pos[j];
        if (this.modules[row][col] != null) {
          continue;
        }
        for (var r = -2; r <= 2; r++) {
          for (var c = -2; c <= 2; c++) {
            if (r == -2 || r == 2 || c == -2 || c == 2 || r == 0 && c == 0) {
              this.modules[row + r][col + c] = true;
            } else {
              this.modules[row + r][col + c] = false;
            }
          }
        }
      }
    }
  },
  /**
      * 设置版本信息（7以上版本才有）
      * @param  {bool} test 是否处于判断最佳掩膜阶段
      * @return {[type]}      [description]
      */
  setupTypeNumber: function setupTypeNumber(test) {
    var bits = QRUtil.getBCHTypeNumber(this.typeNumber);
    for (var i = 0; i < 18; i++) {
      var mod = !test && (bits >> i & 1) == 1;
      this.modules[Math.floor(i / 3)][i % 3 + this.moduleCount - 8 - 3] = mod;
      this.modules[i % 3 + this.moduleCount - 8 - 3][Math.floor(i / 3)] = mod;
    }
  },
  /**
      * 设置格式信息（纠错等级和掩膜版本）
      * @param  {bool} test
      * @param  {num} maskPattern 掩膜版本
      * @return {}
      */
  setupTypeInfo: function setupTypeInfo(test, maskPattern) {
    var data = QRErrorCorrectLevel[this.errorCorrectLevel] << 3 | maskPattern;
    var bits = QRUtil.getBCHTypeInfo(data);
    // vertical
    for (var i = 0; i < 15; i++) {
      var mod = !test && (bits >> i & 1) == 1;
      if (i < 6) {
        this.modules[i][8] = mod;
      } else if (i < 8) {
        this.modules[i + 1][8] = mod;
      } else {
        this.modules[this.moduleCount - 15 + i][8] = mod;
      }
      // horizontal
      var mod = !test && (bits >> i & 1) == 1;
      if (i < 8) {
        this.modules[8][this.moduleCount - i - 1] = mod;
      } else if (i < 9) {
        this.modules[8][15 - i - 1 + 1] = mod;
      } else {
        this.modules[8][15 - i - 1] = mod;
      }
    }
    // fixed module
    this.modules[this.moduleCount - 8][8] = !test;
  },
  /**
      * 数据编码
      * @return {[type]} [description]
      */
  createData: function createData() {
    var buffer = new QRBitBuffer();
    var lengthBits = this.typeNumber > 9 ? 16 : 8;
    buffer.put(4, 4); //添加模式
    buffer.put(this.utf8bytes.length, lengthBits);
    for (var i = 0, l = this.utf8bytes.length; i < l; i++) {
      buffer.put(this.utf8bytes[i], 8);
    }
    if (buffer.length + 4 <= this.totalDataCount * 8) {
      buffer.put(0, 4);
    }
    // padding
    while (buffer.length % 8 != 0) {
      buffer.putBit(false);
    }
    // padding
    while (true) {
      if (buffer.length >= this.totalDataCount * 8) {
        break;
      }
      buffer.put(QRCodeAlg.PAD0, 8);
      if (buffer.length >= this.totalDataCount * 8) {
        break;
      }
      buffer.put(QRCodeAlg.PAD1, 8);
    }
    return this.createBytes(buffer);
  },
  /**
      * 纠错码编码
      * @param  {buffer} buffer 数据编码
      * @return {[type]}
      */
  createBytes: function createBytes(buffer) {
    var offset = 0;
    var maxDcCount = 0;
    var maxEcCount = 0;
    var length = this.rsBlock.length / 3;
    var rsBlocks = new Array();
    for (var i = 0; i < length; i++) {
      var count = this.rsBlock[i * 3 + 0];
      var totalCount = this.rsBlock[i * 3 + 1];
      var dataCount = this.rsBlock[i * 3 + 2];
      for (var j = 0; j < count; j++) {
        rsBlocks.push([dataCount, totalCount]);
      }
    }
    var dcdata = new Array(rsBlocks.length);
    var ecdata = new Array(rsBlocks.length);
    for (var r = 0; r < rsBlocks.length; r++) {
      var dcCount = rsBlocks[r][0];
      var ecCount = rsBlocks[r][1] - dcCount;
      maxDcCount = Math.max(maxDcCount, dcCount);
      maxEcCount = Math.max(maxEcCount, ecCount);
      dcdata[r] = new Array(dcCount);
      for (var i = 0; i < dcdata[r].length; i++) {
        dcdata[r][i] = 0xff & buffer.buffer[i + offset];
      }
      offset += dcCount;
      var rsPoly = QRUtil.getErrorCorrectPolynomial(ecCount);
      var rawPoly = new QRPolynomial(dcdata[r], rsPoly.getLength() - 1);
      var modPoly = rawPoly.mod(rsPoly);
      ecdata[r] = new Array(rsPoly.getLength() - 1);
      for (var i = 0; i < ecdata[r].length; i++) {
        var modIndex = i + modPoly.getLength() - ecdata[r].length;
        ecdata[r][i] = modIndex >= 0 ? modPoly.get(modIndex) : 0;
      }
    }
    var data = new Array(this.totalDataCount);
    var index = 0;
    for (var i = 0; i < maxDcCount; i++) {
      for (var r = 0; r < rsBlocks.length; r++) {
        if (i < dcdata[r].length) {
          data[index++] = dcdata[r][i];
        }
      }
    }
    for (var i = 0; i < maxEcCount; i++) {
      for (var r = 0; r < rsBlocks.length; r++) {
        if (i < ecdata[r].length) {
          data[index++] = ecdata[r][i];
        }
      }
    }
    return data;

  },
  /**
      * 布置模块，构建最终信息
      * @param  {} data
      * @param  {} maskPattern
      * @return {}
      */
  mapData: function mapData(data, maskPattern) {
    var inc = -1;
    var row = this.moduleCount - 1;
    var bitIndex = 7;
    var byteIndex = 0;
    for (var col = this.moduleCount - 1; col > 0; col -= 2) {
      if (col == 6) col--;
      while (true) {
        for (var c = 0; c < 2; c++) {
          if (this.modules[row][col - c] == null) {
            var dark = false;
            if (byteIndex < data.length) {
              dark = (data[byteIndex] >>> bitIndex & 1) == 1;
            }
            var mask = QRUtil.getMask(maskPattern, row, col - c);
            if (mask) {
              dark = !dark;
            }
            this.modules[row][col - c] = dark;
            bitIndex--;
            if (bitIndex == -1) {
              byteIndex++;
              bitIndex = 7;
            }
          }
        }
        row += inc;
        if (row < 0 || this.moduleCount <= row) {
          row -= inc;
          inc = -inc;
          break;
        }
      }
    }
  } };

/**
        * 填充字段
        */
QRCodeAlg.PAD0 = 0xEC;
QRCodeAlg.PAD1 = 0x11;
//---------------------------------------------------------------------
// 纠错等级对应的编码
//---------------------------------------------------------------------
var QRErrorCorrectLevel = [1, 0, 3, 2];
//---------------------------------------------------------------------
// 掩膜版本
//---------------------------------------------------------------------
var QRMaskPattern = {
  PATTERN000: 0,
  PATTERN001: 1,
  PATTERN010: 2,
  PATTERN011: 3,
  PATTERN100: 4,
  PATTERN101: 5,
  PATTERN110: 6,
  PATTERN111: 7 };

//---------------------------------------------------------------------
// 工具类
//---------------------------------------------------------------------
var QRUtil = {
  /*
               每个版本矫正图形的位置
                */
  PATTERN_POSITION_TABLE: [
  [],
  [6, 18],
  [6, 22],
  [6, 26],
  [6, 30],
  [6, 34],
  [6, 22, 38],
  [6, 24, 42],
  [6, 26, 46],
  [6, 28, 50],
  [6, 30, 54],
  [6, 32, 58],
  [6, 34, 62],
  [6, 26, 46, 66],
  [6, 26, 48, 70],
  [6, 26, 50, 74],
  [6, 30, 54, 78],
  [6, 30, 56, 82],
  [6, 30, 58, 86],
  [6, 34, 62, 90],
  [6, 28, 50, 72, 94],
  [6, 26, 50, 74, 98],
  [6, 30, 54, 78, 102],
  [6, 28, 54, 80, 106],
  [6, 32, 58, 84, 110],
  [6, 30, 58, 86, 114],
  [6, 34, 62, 90, 118],
  [6, 26, 50, 74, 98, 122],
  [6, 30, 54, 78, 102, 126],
  [6, 26, 52, 78, 104, 130],
  [6, 30, 56, 82, 108, 134],
  [6, 34, 60, 86, 112, 138],
  [6, 30, 58, 86, 114, 142],
  [6, 34, 62, 90, 118, 146],
  [6, 30, 54, 78, 102, 126, 150],
  [6, 24, 50, 76, 102, 128, 154],
  [6, 28, 54, 80, 106, 132, 158],
  [6, 32, 58, 84, 110, 136, 162],
  [6, 26, 54, 82, 110, 138, 166],
  [6, 30, 58, 86, 114, 142, 170]],

  G15: 1 << 10 | 1 << 8 | 1 << 5 | 1 << 4 | 1 << 2 | 1 << 1 | 1 << 0,
  G18: 1 << 12 | 1 << 11 | 1 << 10 | 1 << 9 | 1 << 8 | 1 << 5 | 1 << 2 | 1 << 0,
  G15_MASK: 1 << 14 | 1 << 12 | 1 << 10 | 1 << 4 | 1 << 1,
  /*
                                                           BCH编码格式信息
                                                            */
  getBCHTypeInfo: function getBCHTypeInfo(data) {
    var d = data << 10;
    while (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G15) >= 0) {
      d ^= QRUtil.G15 << QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G15);
    }
    return (data << 10 | d) ^ QRUtil.G15_MASK;
  },
  /*
     BCH编码版本信息
      */
  getBCHTypeNumber: function getBCHTypeNumber(data) {
    var d = data << 12;
    while (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G18) >= 0) {
      d ^= QRUtil.G18 << QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G18);
    }
    return data << 12 | d;
  },
  /*
     获取BCH位信息
      */
  getBCHDigit: function getBCHDigit(data) {
    var digit = 0;
    while (data != 0) {
      digit++;
      data >>>= 1;
    }
    return digit;
  },
  /*
     获取版本对应的矫正图形位置
      */
  getPatternPosition: function getPatternPosition(typeNumber) {
    return QRUtil.PATTERN_POSITION_TABLE[typeNumber - 1];
  },
  /*
     掩膜算法
      */
  getMask: function getMask(maskPattern, i, j) {
    switch (maskPattern) {
      case QRMaskPattern.PATTERN000:
        return (i + j) % 2 == 0;
      case QRMaskPattern.PATTERN001:
        return i % 2 == 0;
      case QRMaskPattern.PATTERN010:
        return j % 3 == 0;
      case QRMaskPattern.PATTERN011:
        return (i + j) % 3 == 0;
      case QRMaskPattern.PATTERN100:
        return (Math.floor(i / 2) + Math.floor(j / 3)) % 2 == 0;
      case QRMaskPattern.PATTERN101:
        return i * j % 2 + i * j % 3 == 0;
      case QRMaskPattern.PATTERN110:
        return (i * j % 2 + i * j % 3) % 2 == 0;
      case QRMaskPattern.PATTERN111:
        return (i * j % 3 + (i + j) % 2) % 2 == 0;
      default:
        throw new Error("bad maskPattern:" + maskPattern);}

  },
  /*
     获取RS的纠错多项式
      */
  getErrorCorrectPolynomial: function getErrorCorrectPolynomial(errorCorrectLength) {
    var a = new QRPolynomial([1], 0);
    for (var i = 0; i < errorCorrectLength; i++) {
      a = a.multiply(new QRPolynomial([1, QRMath.gexp(i)], 0));
    }
    return a;
  },
  /*
     获取评价
      */
  getLostPoint: function getLostPoint(qrCode) {
    var moduleCount = qrCode.getModuleCount(),
    lostPoint = 0,
    darkCount = 0;
    for (var row = 0; row < moduleCount; row++) {
      var sameCount = 0;
      var head = qrCode.modules[row][0];
      for (var col = 0; col < moduleCount; col++) {
        var current = qrCode.modules[row][col];
        //level 3 评价
        if (col < moduleCount - 6) {
          if (current && !qrCode.modules[row][col + 1] && qrCode.modules[row][col + 2] && qrCode.modules[row][col + 3] && qrCode.modules[row][col + 4] && !qrCode.modules[row][col + 5] && qrCode.modules[row][col + 6]) {
            if (col < moduleCount - 10) {
              if (qrCode.modules[row][col + 7] && qrCode.modules[row][col + 8] && qrCode.modules[row][col + 9] && qrCode.modules[row][col + 10]) {
                lostPoint += 40;
              }
            } else if (col > 3) {
              if (qrCode.modules[row][col - 1] && qrCode.modules[row][col - 2] && qrCode.modules[row][col - 3] && qrCode.modules[row][col - 4]) {
                lostPoint += 40;
              }
            }
          }
        }
        //level 2 评价
        if (row < moduleCount - 1 && col < moduleCount - 1) {
          var count = 0;
          if (current) count++;
          if (qrCode.modules[row + 1][col]) count++;
          if (qrCode.modules[row][col + 1]) count++;
          if (qrCode.modules[row + 1][col + 1]) count++;
          if (count == 0 || count == 4) {
            lostPoint += 3;
          }
        }
        //level 1 评价
        if (head ^ current) {
          sameCount++;
        } else {
          head = current;
          if (sameCount >= 5) {
            lostPoint += 3 + sameCount - 5;
          }
          sameCount = 1;
        }
        //level 4 评价
        if (current) {
          darkCount++;
        }
      }
    }
    for (var col = 0; col < moduleCount; col++) {
      var sameCount = 0;
      var head = qrCode.modules[0][col];
      for (var row = 0; row < moduleCount; row++) {
        var current = qrCode.modules[row][col];
        //level 3 评价
        if (row < moduleCount - 6) {
          if (current && !qrCode.modules[row + 1][col] && qrCode.modules[row + 2][col] && qrCode.modules[row + 3][col] && qrCode.modules[row + 4][col] && !qrCode.modules[row + 5][col] && qrCode.modules[row + 6][col]) {
            if (row < moduleCount - 10) {
              if (qrCode.modules[row + 7][col] && qrCode.modules[row + 8][col] && qrCode.modules[row + 9][col] && qrCode.modules[row + 10][col]) {
                lostPoint += 40;
              }
            } else if (row > 3) {
              if (qrCode.modules[row - 1][col] && qrCode.modules[row - 2][col] && qrCode.modules[row - 3][col] && qrCode.modules[row - 4][col]) {
                lostPoint += 40;
              }
            }
          }
        }
        //level 1 评价
        if (head ^ current) {
          sameCount++;
        } else {
          head = current;
          if (sameCount >= 5) {
            lostPoint += 3 + sameCount - 5;
          }
          sameCount = 1;
        }
      }
    }
    // LEVEL4
    var ratio = Math.abs(100 * darkCount / moduleCount / moduleCount - 50) / 5;
    lostPoint += ratio * 10;
    return lostPoint;
  } };


//---------------------------------------------------------------------
// QRMath使用的数学工具
//---------------------------------------------------------------------
var QRMath = {
  /*
               将n转化为a^m
                */
  glog: function glog(n) {
    if (n < 1) {
      throw new Error("glog(" + n + ")");
    }
    return QRMath.LOG_TABLE[n];
  },
  /*
     将a^m转化为n
      */
  gexp: function gexp(n) {
    while (n < 0) {
      n += 255;
    }
    while (n >= 256) {
      n -= 255;
    }
    return QRMath.EXP_TABLE[n];
  },
  EXP_TABLE: new Array(256),
  LOG_TABLE: new Array(256) };


for (var i = 0; i < 8; i++) {
  QRMath.EXP_TABLE[i] = 1 << i;
}
for (var i = 8; i < 256; i++) {
  QRMath.EXP_TABLE[i] = QRMath.EXP_TABLE[i - 4] ^ QRMath.EXP_TABLE[i - 5] ^ QRMath.EXP_TABLE[i - 6] ^ QRMath.EXP_TABLE[i - 8];
}
for (var i = 0; i < 255; i++) {
  QRMath.LOG_TABLE[QRMath.EXP_TABLE[i]] = i;
}
//---------------------------------------------------------------------
// QRPolynomial 多项式
//---------------------------------------------------------------------
/**
 * 多项式类
 * @param {Array} num   系数
 * @param {num} shift a^shift
 */
function QRPolynomial(num, shift) {
  if (num.length == undefined) {
    throw new Error(num.length + "/" + shift);
  }
  var offset = 0;
  while (offset < num.length && num[offset] == 0) {
    offset++;
  }
  this.num = new Array(num.length - offset + shift);
  for (var i = 0; i < num.length - offset; i++) {
    this.num[i] = num[i + offset];
  }
}
QRPolynomial.prototype = {
  get: function get(index) {
    return this.num[index];
  },
  getLength: function getLength() {
    return this.num.length;
  },
  /**
      * 多项式乘法
      * @param  {QRPolynomial} e 被乘多项式
      * @return {[type]}   [description]
      */
  multiply: function multiply(e) {
    var num = new Array(this.getLength() + e.getLength() - 1);
    for (var i = 0; i < this.getLength(); i++) {
      for (var j = 0; j < e.getLength(); j++) {
        num[i + j] ^= QRMath.gexp(QRMath.glog(this.get(i)) + QRMath.glog(e.get(j)));
      }
    }
    return new QRPolynomial(num, 0);
  },
  /**
      * 多项式模运算
      * @param  {QRPolynomial} e 模多项式
      * @return {}
      */
  mod: function mod(e) {
    var tl = this.getLength(),
    el = e.getLength();
    if (tl - el < 0) {
      return this;
    }
    var num = new Array(tl);
    for (var i = 0; i < tl; i++) {
      num[i] = this.get(i);
    }
    while (num.length >= el) {
      var ratio = QRMath.glog(num[0]) - QRMath.glog(e.get(0));

      for (var i = 0; i < e.getLength(); i++) {
        num[i] ^= QRMath.gexp(QRMath.glog(e.get(i)) + ratio);
      }
      while (num[0] == 0) {
        num.shift();
      }
    }
    return new QRPolynomial(num, 0);
  } };


//---------------------------------------------------------------------
// RS_BLOCK_TABLE
//---------------------------------------------------------------------
/*
二维码各个版本信息[块数, 每块中的数据块数, 每块中的信息块数]
 */
var RS_BLOCK_TABLE = [
// L
// M
// Q
// H
// 1
[1, 26, 19],
[1, 26, 16],
[1, 26, 13],
[1, 26, 9],

// 2
[1, 44, 34],
[1, 44, 28],
[1, 44, 22],
[1, 44, 16],

// 3
[1, 70, 55],
[1, 70, 44],
[2, 35, 17],
[2, 35, 13],

// 4
[1, 100, 80],
[2, 50, 32],
[2, 50, 24],
[4, 25, 9],

// 5
[1, 134, 108],
[2, 67, 43],
[2, 33, 15, 2, 34, 16],
[2, 33, 11, 2, 34, 12],

// 6
[2, 86, 68],
[4, 43, 27],
[4, 43, 19],
[4, 43, 15],

// 7
[2, 98, 78],
[4, 49, 31],
[2, 32, 14, 4, 33, 15],
[4, 39, 13, 1, 40, 14],

// 8
[2, 121, 97],
[2, 60, 38, 2, 61, 39],
[4, 40, 18, 2, 41, 19],
[4, 40, 14, 2, 41, 15],

// 9
[2, 146, 116],
[3, 58, 36, 2, 59, 37],
[4, 36, 16, 4, 37, 17],
[4, 36, 12, 4, 37, 13],

// 10
[2, 86, 68, 2, 87, 69],
[4, 69, 43, 1, 70, 44],
[6, 43, 19, 2, 44, 20],
[6, 43, 15, 2, 44, 16],

// 11
[4, 101, 81],
[1, 80, 50, 4, 81, 51],
[4, 50, 22, 4, 51, 23],
[3, 36, 12, 8, 37, 13],

// 12
[2, 116, 92, 2, 117, 93],
[6, 58, 36, 2, 59, 37],
[4, 46, 20, 6, 47, 21],
[7, 42, 14, 4, 43, 15],

// 13
[4, 133, 107],
[8, 59, 37, 1, 60, 38],
[8, 44, 20, 4, 45, 21],
[12, 33, 11, 4, 34, 12],

// 14
[3, 145, 115, 1, 146, 116],
[4, 64, 40, 5, 65, 41],
[11, 36, 16, 5, 37, 17],
[11, 36, 12, 5, 37, 13],

// 15
[5, 109, 87, 1, 110, 88],
[5, 65, 41, 5, 66, 42],
[5, 54, 24, 7, 55, 25],
[11, 36, 12],

// 16
[5, 122, 98, 1, 123, 99],
[7, 73, 45, 3, 74, 46],
[15, 43, 19, 2, 44, 20],
[3, 45, 15, 13, 46, 16],

// 17
[1, 135, 107, 5, 136, 108],
[10, 74, 46, 1, 75, 47],
[1, 50, 22, 15, 51, 23],
[2, 42, 14, 17, 43, 15],

// 18
[5, 150, 120, 1, 151, 121],
[9, 69, 43, 4, 70, 44],
[17, 50, 22, 1, 51, 23],
[2, 42, 14, 19, 43, 15],

// 19
[3, 141, 113, 4, 142, 114],
[3, 70, 44, 11, 71, 45],
[17, 47, 21, 4, 48, 22],
[9, 39, 13, 16, 40, 14],

// 20
[3, 135, 107, 5, 136, 108],
[3, 67, 41, 13, 68, 42],
[15, 54, 24, 5, 55, 25],
[15, 43, 15, 10, 44, 16],

// 21
[4, 144, 116, 4, 145, 117],
[17, 68, 42],
[17, 50, 22, 6, 51, 23],
[19, 46, 16, 6, 47, 17],

// 22
[2, 139, 111, 7, 140, 112],
[17, 74, 46],
[7, 54, 24, 16, 55, 25],
[34, 37, 13],

// 23
[4, 151, 121, 5, 152, 122],
[4, 75, 47, 14, 76, 48],
[11, 54, 24, 14, 55, 25],
[16, 45, 15, 14, 46, 16],

// 24
[6, 147, 117, 4, 148, 118],
[6, 73, 45, 14, 74, 46],
[11, 54, 24, 16, 55, 25],
[30, 46, 16, 2, 47, 17],

// 25
[8, 132, 106, 4, 133, 107],
[8, 75, 47, 13, 76, 48],
[7, 54, 24, 22, 55, 25],
[22, 45, 15, 13, 46, 16],

// 26
[10, 142, 114, 2, 143, 115],
[19, 74, 46, 4, 75, 47],
[28, 50, 22, 6, 51, 23],
[33, 46, 16, 4, 47, 17],

// 27
[8, 152, 122, 4, 153, 123],
[22, 73, 45, 3, 74, 46],
[8, 53, 23, 26, 54, 24],
[12, 45, 15, 28, 46, 16],

// 28
[3, 147, 117, 10, 148, 118],
[3, 73, 45, 23, 74, 46],
[4, 54, 24, 31, 55, 25],
[11, 45, 15, 31, 46, 16],

// 29
[7, 146, 116, 7, 147, 117],
[21, 73, 45, 7, 74, 46],
[1, 53, 23, 37, 54, 24],
[19, 45, 15, 26, 46, 16],

// 30
[5, 145, 115, 10, 146, 116],
[19, 75, 47, 10, 76, 48],
[15, 54, 24, 25, 55, 25],
[23, 45, 15, 25, 46, 16],

// 31
[13, 145, 115, 3, 146, 116],
[2, 74, 46, 29, 75, 47],
[42, 54, 24, 1, 55, 25],
[23, 45, 15, 28, 46, 16],

// 32
[17, 145, 115],
[10, 74, 46, 23, 75, 47],
[10, 54, 24, 35, 55, 25],
[19, 45, 15, 35, 46, 16],

// 33
[17, 145, 115, 1, 146, 116],
[14, 74, 46, 21, 75, 47],
[29, 54, 24, 19, 55, 25],
[11, 45, 15, 46, 46, 16],

// 34
[13, 145, 115, 6, 146, 116],
[14, 74, 46, 23, 75, 47],
[44, 54, 24, 7, 55, 25],
[59, 46, 16, 1, 47, 17],

// 35
[12, 151, 121, 7, 152, 122],
[12, 75, 47, 26, 76, 48],
[39, 54, 24, 14, 55, 25],
[22, 45, 15, 41, 46, 16],

// 36
[6, 151, 121, 14, 152, 122],
[6, 75, 47, 34, 76, 48],
[46, 54, 24, 10, 55, 25],
[2, 45, 15, 64, 46, 16],

// 37
[17, 152, 122, 4, 153, 123],
[29, 74, 46, 14, 75, 47],
[49, 54, 24, 10, 55, 25],
[24, 45, 15, 46, 46, 16],

// 38
[4, 152, 122, 18, 153, 123],
[13, 74, 46, 32, 75, 47],
[48, 54, 24, 14, 55, 25],
[42, 45, 15, 32, 46, 16],

// 39
[20, 147, 117, 4, 148, 118],
[40, 75, 47, 7, 76, 48],
[43, 54, 24, 22, 55, 25],
[10, 45, 15, 67, 46, 16],

// 40
[19, 148, 118, 6, 149, 119],
[18, 75, 47, 31, 76, 48],
[34, 54, 24, 34, 55, 25],
[20, 45, 15, 61, 46, 16]];


/**
                            * 根据数据获取对应版本
                            * @return {[type]} [description]
                            */
QRCodeAlg.prototype.getRightType = function () {
  for (var typeNumber = 1; typeNumber < 41; typeNumber++) {
    var rsBlock = RS_BLOCK_TABLE[(typeNumber - 1) * 4 + this.errorCorrectLevel];
    if (rsBlock == undefined) {
      throw new Error("bad rs block @ typeNumber:" + typeNumber + "/errorCorrectLevel:" + this.errorCorrectLevel);
    }
    var length = rsBlock.length / 3;
    var totalDataCount = 0;
    for (var i = 0; i < length; i++) {
      var count = rsBlock[i * 3 + 0];
      var dataCount = rsBlock[i * 3 + 2];
      totalDataCount += dataCount * count;
    }
    var lengthBytes = typeNumber > 9 ? 2 : 1;
    if (this.utf8bytes.length + lengthBytes < totalDataCount || typeNumber == 40) {
      this.typeNumber = typeNumber;
      this.rsBlock = rsBlock;
      this.totalDataCount = totalDataCount;
      break;
    }
  }
};

//---------------------------------------------------------------------
// QRBitBuffer
//---------------------------------------------------------------------
function QRBitBuffer() {
  this.buffer = new Array();
  this.length = 0;
}
QRBitBuffer.prototype = {
  get: function get(index) {
    var bufIndex = Math.floor(index / 8);
    return this.buffer[bufIndex] >>> 7 - index % 8 & 1;
  },
  put: function put(num, length) {
    for (var i = 0; i < length; i++) {
      this.putBit(num >>> length - i - 1 & 1);
    }
  },
  putBit: function putBit(bit) {
    var bufIndex = Math.floor(this.length / 8);
    if (this.buffer.length <= bufIndex) {
      this.buffer.push(0);
    }
    if (bit) {
      this.buffer[bufIndex] |= 0x80 >>> this.length % 8;
    }
    this.length++;
  } };

/***/ }),

/***/ 997:
/*!********************************************************************!*\
  !*** D:/lixindom/2020/伊籭商城/beefShop/components/uni-icons/icons.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = {
  'contact': "\uE100",
  'person': "\uE101",
  'personadd': "\uE102",
  'contact-filled': "\uE130",
  'person-filled': "\uE131",
  'personadd-filled': "\uE132",
  'phone': "\uE200",
  'email': "\uE201",
  'chatbubble': "\uE202",
  'chatboxes': "\uE203",
  'phone-filled': "\uE230",
  'email-filled': "\uE231",
  'chatbubble-filled': "\uE232",
  'chatboxes-filled': "\uE233",
  'weibo': "\uE260",
  'weixin': "\uE261",
  'pengyouquan': "\uE262",
  'chat': "\uE263",
  'qq': "\uE264",
  'videocam': "\uE300",
  'camera': "\uE301",
  'mic': "\uE302",
  'location': "\uE303",
  'mic-filled': "\uE332",
  'speech': "\uE332",
  'location-filled': "\uE333",
  'micoff': "\uE360",
  'image': "\uE363",
  'map': "\uE364",
  'compose': "\uE400",
  'trash': "\uE401",
  'upload': "\uE402",
  'download': "\uE403",
  'close': "\uE404",
  'redo': "\uE405",
  'undo': "\uE406",
  'refresh': "\uE407",
  'star': "\uE408",
  'plus': "\uE409",
  'minus': "\uE410",
  'circle': "\uE411",
  'checkbox': "\uE411",
  'close-filled': "\uE434",
  'clear': "\uE434",
  'refresh-filled': "\uE437",
  'star-filled': "\uE438",
  'plus-filled': "\uE439",
  'minus-filled': "\uE440",
  'circle-filled': "\uE441",
  'checkbox-filled': "\uE442",
  'closeempty': "\uE460",
  'refreshempty': "\uE461",
  'reload': "\uE462",
  'starhalf': "\uE463",
  'spinner': "\uE464",
  'spinner-cycle': "\uE465",
  'search': "\uE466",
  'plusempty': "\uE468",
  'forward': "\uE470",
  'back': "\uE471",
  'left-nav': "\uE471",
  'checkmarkempty': "\uE472",
  'home': "\uE500",
  'navigate': "\uE501",
  'gear': "\uE502",
  'paperplane': "\uE503",
  'info': "\uE504",
  'help': "\uE505",
  'locked': "\uE506",
  'more': "\uE507",
  'flag': "\uE508",
  'home-filled': "\uE530",
  'gear-filled': "\uE532",
  'info-filled': "\uE534",
  'help-filled': "\uE535",
  'more-filled': "\uE537",
  'settings': "\uE560",
  'list': "\uE562",
  'bars': "\uE563",
  'loop': "\uE565",
  'paperclip': "\uE567",
  'eye': "\uE568",
  'arrowup': "\uE580",
  'arrowdown': "\uE581",
  'arrowleft': "\uE582",
  'arrowright': "\uE583",
  'arrowthinup': "\uE584",
  'arrowthindown': "\uE585",
  'arrowthinleft': "\uE586",
  'arrowthinright': "\uE587",
  'pulldown': "\uE588",
  'closefill': "\uE589",
  'sound': "\uE590",
  'scan': "\uE612" };exports.default = _default;

/***/ })

}]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map