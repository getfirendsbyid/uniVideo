(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],{

/***/ 1:
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.createApp = createApp;exports.createComponent = createComponent;exports.createPage = createPage;exports.createPlugin = createPlugin;exports.createSubpackageApp = createSubpackageApp;exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}

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
/^\$|Window$|WindowStyle$|sendNativeEvent|restoreGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64/;

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


var UUID_KEY = '__DC_STAT_UUID';
var deviceId;
function addUuid(result) {
  deviceId = deviceId || wx.getStorageSync(UUID_KEY);
  if (!deviceId) {
    deviceId = Date.now() + '' + Math.floor(Math.random() * 1e7);
    wx.setStorage({
      key: UUID_KEY,
      data: deviceId });

  }
  result.deviceId = deviceId;
}

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

var getSystemInfo = {
  returnValue: function returnValue(result) {
    addUuid(result);
    addSafeAreaInsets(result);
  } };


// import navigateTo from 'uni-helpers/navigate-to'

var protocols = {
  redirectTo: redirectTo,
  // navigateTo,  // 由于在微信开发者工具的页面参数，会显示__id__参数，因此暂时关闭mp-weixin对于navigateTo的AOP
  previewImage: previewImage,
  getSystemInfo: getSystemInfo,
  getSystemInfoSync: getSystemInfo };

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
          console.warn("The '".concat(methodName, "' method of platform '\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F' does not support option '").concat(key, "'"));
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
        console.error("Platform '\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F' does not support '".concat(methodName, "'."));
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
      errMsg: "".concat(name, ":fail method '").concat(name, "' not supported") };

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
      errMsg: 'getProvider:fail service not found' };

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
    if (!wx.canIUse || !wx.canIUse('nextTick')) {
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
if (!MPPage.__$wrappered) {
  MPPage.__$wrappered = true;
  Page = function Page() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('onLoad', options);
    return MPPage(options);
  };
  Page.after = MPPage.after;

  Component = function Component() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('created', options);
    return MPComponent(options);
  };
}

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
      if (Object({"NODE_ENV":"development","VUE_APP_NAME":"smartCase","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
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

          params = Array.isArray(params) ? params : [];
          // 参数尾部增加原始事件对象用于复杂表达式内获取额外数据
          if (/=\s*\S+\.eventParams\s*\|\|\s*\S+\[['"]event-params['"]\]/.test(handler.toString())) {
            // eslint-disable-next-line no-sparse-arrays
            params = params.concat([,,,,,,,,,, event]);
          }
          ret.push(handler.apply(handlerCtx, params));
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

var hooks = [
'onShow',
'onHide',
'onError',
'onPageNotFound',
'onThemeChange',
'onUnhandledRejection'];


function initEventChannel() {
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
}

function initScopedSlotsParams() {
  var center = {};
  var parents = {};

  _vue.default.prototype.$hasScopedSlotsParams = function (vueId) {
    var has = center[vueId];
    if (!has) {
      parents[vueId] = this;
      this.$on('hook:destory', function () {
        delete parents[vueId];
      });
    }
    return has;
  };

  _vue.default.prototype.$getScopedSlotsParams = function (vueId, name, key) {
    var data = center[vueId];
    if (data) {
      var object = data[name] || {};
      return key ? object[key] : object;
    } else {
      parents[vueId] = this;
      this.$on('hook:destory', function () {
        delete parents[vueId];
      });
    }
  };

  _vue.default.prototype.$setScopedSlotsParams = function (name, value) {
    var vueId = this.$options.propsData.vueId;
    var object = center[vueId] = center[vueId] || {};
    object[name] = value;
    if (parents[vueId]) {
      parents[vueId].$forceUpdate();
    }
  };

  _vue.default.mixin({
    destroyed: function destroyed() {
      var propsData = this.$options.propsData;
      var vueId = propsData && propsData.vueId;
      if (vueId) {
        delete center[vueId];
        delete parents[vueId];
      }
    } });

}

function parseBaseApp(vm, _ref3)


{var mocks = _ref3.mocks,initRefs = _ref3.initRefs;
  initEventChannel();
  {
    initScopedSlotsParams();
  }
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
      if (this.mpType === 'page' && typeof getApp === 'function') {// hack vue-i18n
        var app = getApp();
        if (app.$vm && app.$vm.$i18n) {
          this._i18n = app.$vm.$i18n;
        }
      }
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
        if (wx.canIUse && !wx.canIUse('nextTick')) {// 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
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

function createApp(vm) {
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

function createSubpackageApp(vm) {
  var appOptions = parseApp(vm);
  var app = getApp({
    allowDefault: true });

  var globalData = app.globalData;
  if (globalData) {
    Object.keys(appOptions.globalData).forEach(function (name) {
      if (!hasOwn(globalData, name)) {
        globalData[name] = appOptions.globalData[name];
      }
    });
  }
  Object.keys(appOptions).forEach(function (name) {
    if (!hasOwn(app, name)) {
      app[name] = appOptions[name];
    }
  });
  if (isFn(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow(function () {for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {args[_key5] = arguments[_key5];}
      appOptions.onShow.apply(app, args);
    });
  }
  if (isFn(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide(function () {for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {args[_key6] = arguments[_key6];}
      appOptions.onHide.apply(app, args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    var args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    appOptions.onLaunch.call(app, args);
  }
  return vm;
}

function createPlugin(vm) {
  var appOptions = parseApp(vm);
  if (isFn(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow(function () {for (var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {args[_key7] = arguments[_key7];}
      appOptions.onShow.apply(vm, args);
    });
  }
  if (isFn(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide(function () {for (var _len8 = arguments.length, args = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {args[_key8] = arguments[_key8];}
      appOptions.onHide.apply(vm, args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    var args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    appOptions.onLaunch.call(vm, args);
  }
  return vm;
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
wx.createSubpackageApp = createSubpackageApp;
wx.createPlugin = createPlugin;

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

/***/ 106:
/*!*************************************************!*\
  !*** D:/WebCode/uniVideo/assets/img/avatar.jpg ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/assets/img/avatar.jpg";

/***/ }),

/***/ 11:
/*!**********************************************************!*\
  !*** D:/WebCode/uniVideo/node_modules/uview-ui/index.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;
var _mixin = _interopRequireDefault(__webpack_require__(/*! ./libs/mixin/mixin.js */ 12));



var _request = _interopRequireDefault(__webpack_require__(/*! ./libs/request */ 13));




















var _queryParams = _interopRequireDefault(__webpack_require__(/*! ./libs/function/queryParams.js */ 17));

var _route = _interopRequireDefault(__webpack_require__(/*! ./libs/function/route.js */ 18));

var _timeFormat = _interopRequireDefault(__webpack_require__(/*! ./libs/function/timeFormat.js */ 22));

var _timeFrom = _interopRequireDefault(__webpack_require__(/*! ./libs/function/timeFrom.js */ 23));

var _colorGradient = _interopRequireDefault(__webpack_require__(/*! ./libs/function/colorGradient.js */ 24));

var _guid = _interopRequireDefault(__webpack_require__(/*! ./libs/function/guid.js */ 25));

var _color = _interopRequireDefault(__webpack_require__(/*! ./libs/function/color.js */ 26));

var _type2icon = _interopRequireDefault(__webpack_require__(/*! ./libs/function/type2icon.js */ 27));

var _randomArray = _interopRequireDefault(__webpack_require__(/*! ./libs/function/randomArray.js */ 28));

var _deepClone = _interopRequireDefault(__webpack_require__(/*! ./libs/function/deepClone.js */ 15));

var _deepMerge = _interopRequireDefault(__webpack_require__(/*! ./libs/function/deepMerge.js */ 14));

var _addUnit = _interopRequireDefault(__webpack_require__(/*! ./libs/function/addUnit.js */ 29));


var _test = _interopRequireDefault(__webpack_require__(/*! ./libs/function/test.js */ 16));

var _random = _interopRequireDefault(__webpack_require__(/*! ./libs/function/random.js */ 30));

var _trim = _interopRequireDefault(__webpack_require__(/*! ./libs/function/trim.js */ 31));

var _toast = _interopRequireDefault(__webpack_require__(/*! ./libs/function/toast.js */ 32));

var _getParent = _interopRequireDefault(__webpack_require__(/*! ./libs/function/getParent.js */ 33));

var _$parent = _interopRequireDefault(__webpack_require__(/*! ./libs/function/$parent.js */ 34));



var _sys = __webpack_require__(/*! ./libs/function/sys.js */ 35);

var _debounce = _interopRequireDefault(__webpack_require__(/*! ./libs/function/debounce.js */ 36));

var _throttle = _interopRequireDefault(__webpack_require__(/*! ./libs/function/throttle.js */ 37));



var _config = _interopRequireDefault(__webpack_require__(/*! ./libs/config/config.js */ 38));

var _zIndex = _interopRequireDefault(__webpack_require__(/*! ./libs/config/zIndex.js */ 39));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} // 引入全局mixin
// 引入关于是否mixin集成小程序分享的配置
// import wxshare from './libs/mixin/mpShare.js'
// 全局挂载引入http相关请求拦截插件
function wranning(str) {// 开发环境进行信息输出,主要是一些报错信息
  // 这个环境的来由是在程序编写时候,点击hx编辑器运行调试代码的时候,详见:
  // 	https://uniapp.dcloud.io/frame?id=%e5%bc%80%e5%8f%91%e7%8e%af%e5%a2%83%e5%92%8c%e7%94%9f%e4%ba%a7%e7%8e%af%e5%a2%83
  if (true) {console.warn(str);}} // 尝试判断在根目录的/store中是否有$u.mixin.js，此文件uView默认为需要挂在到全局的vuex的state变量
// HX2.6.11版本,放到try中,控制台依然会警告,暂时不用此方式，
// let vuexStore = {};
// try {
// 	vuexStore = require("@/store/$u.mixin.js");
// } catch (e) {
// 	//TODO handle the exception
// }
// post类型对象参数转为get类型url参数
var $u = { queryParams: _queryParams.default, route: _route.default, timeFormat: _timeFormat.default, date: _timeFormat.default, // 另名date
  timeFrom: _timeFrom.default, colorGradient: _colorGradient.default.colorGradient, colorToRgba: _colorGradient.default.colorToRgba, guid: _guid.default, color: _color.default, sys: _sys.sys, os: _sys.os, type2icon: _type2icon.default, randomArray: _randomArray.default, wranning: wranning, get: _request.default.get,
  post: _request.default.post,
  put: _request.default.put,
  'delete': _request.default.delete,
  hexToRgb: _colorGradient.default.hexToRgb,
  rgbToHex: _colorGradient.default.rgbToHex,
  test: _test.default,
  random: _random.default,
  deepClone: _deepClone.default,
  deepMerge: _deepMerge.default,
  getParent: _getParent.default,
  $parent: _$parent.default,
  addUnit: _addUnit.default,
  trim: _trim.default,
  type: ['primary', 'success', 'error', 'warning', 'info'],
  http: _request.default,
  toast: _toast.default,
  config: _config.default, // uView配置信息相关，比如版本号
  zIndex: _zIndex.default,
  debounce: _debounce.default,
  throttle: _throttle.default };


// $u挂载到uni对象上
uni.$u = $u;

var install = function install(Vue) {
  Vue.mixin(_mixin.default);
  if (Vue.prototype.openShare) {
    Vue.mixin(mpShare);
  }
  // Vue.mixin(vuexStore);
  // 时间格式化，同时两个名称，date和timeFormat
  Vue.filter('timeFormat', function (timestamp, format) {
    return (0, _timeFormat.default)(timestamp, format);
  });
  Vue.filter('date', function (timestamp, format) {
    return (0, _timeFormat.default)(timestamp, format);
  });
  // 将多久以前的方法，注入到全局过滤器
  Vue.filter('timeFrom', function (timestamp, format) {
    return (0, _timeFrom.default)(timestamp, format);
  });
  Vue.prototype.$u = $u;
};var _default =

{
  install: install };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 114:
/*!***************************************************!*\
  !*** D:/WebCode/uniVideo/assets/img/icon/1-q.jpg ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/jpeg;base64,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"

/***/ }),

/***/ 115:
/*!***************************************************!*\
  !*** D:/WebCode/uniVideo/assets/img/icon/1-h.jpg ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gIoSUNDX1BST0ZJTEUAAQEAAAIYAAAAAAIQAABtbnRyUkdCIFhZWiAAAAAAAAAAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAAHRyWFlaAAABZAAAABRnWFlaAAABeAAAABRiWFlaAAABjAAAABRyVFJDAAABoAAAAChnVFJDAAABoAAAAChiVFJDAAABoAAAACh3dHB0AAAByAAAABRjcHJ0AAAB3AAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAFgAAAAcAHMAUgBHAEIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFhZWiAAAAAAAABvogAAOPUAAAOQWFlaIAAAAAAAAGKZAAC3hQAAGNpYWVogAAAAAAAAJKAAAA+EAAC2z3BhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABYWVogAAAAAAAA9tYAAQAAAADTLW1sdWMAAAAAAAAAAQAAAAxlblVTAAAAIAAAABwARwBvAG8AZwBsAGUAIABJAG4AYwAuACAAMgAwADEANv/bAEMAEAsMDgwKEA4NDhIREBMYKBoYFhYYMSMlHSg6Mz08OTM4N0BIXE5ARFdFNzhQbVFXX2JnaGc+TXF5cGR4XGVnY//bAEMBERISGBUYLxoaL2NCOEJjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY//AABEIAtAC0AMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAAAQUCBAYDB//EAE4QAAICAgECBAMFBQQGCAQEBwABAgMEEQUSIQYxQVETImEUMnGBkSNCUqGxM3LB0RUkQ2JjkgcWJVNz4fDxNDWCkxdEVFWDJjZForLC/8QAGQEBAAMBAQAAAAAAAAAAAAAAAAECAwQF/8QAJhEBAQACAgICAwEBAQEBAQAAAAECEQMhEjEyQRMiUQRCYXEUI//aAAwDAQACEQMRAD8A78AASAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQBIIAEggASAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAPDLzKMOp25NsKoL96b0gPfY2crn+OcGiXRi1WZMvf7sf59yru5/n+STjjY3wYPycU9/q2iFpjXe9S9x1R90fN3xPP5P9vlz799Tvf+BC8M8i1ueak/78mTqp8cf6+k9UfdDqXufN/wDqxn67Zy/5pELguZoe6Mzv/u3NE6qPHH+vpKeyTgsXP8S8f2nS8qPr1Prf8mb+P45ojNV8hh20TX3nHvr8n3K3o8f464k0cDlsHkU/smTC1pbaT7r8jd2FUggkkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIZJhOShCU5PUYrbYFdzvMU8PhSun81j2q4fxM4muXJeJ7W8u910R79KXy78uyNbLst5jxBdZKx20wtfTvyUN9ki8xprGnFwSUV26V5aL4YeS2WUwj0w+BwMOO1WrZ/x2d2WMUoxUYpJL0RMJxnBSi9pk6NvGRhcrUbIMtDRKGKJJI0DQm09ptP6EXYuBnJxz8Wqxy/2ijqX6oyI0VuMq0t+ldb4Rliv7RwmfZXYv3Zy7P6bX+J4Y/izP4u/7JzONKbT0rIrTa9/qXlNs6ZqUG/w9GbrhicnS68imuz3jNb1+Bhlh4+msz37bOJk1ZdEbqZxnCS2mns9jiM/hOT4TIlmcHZZKiPd09XVr37eq/mX3B+IMXlodEX8LIivnql2f119CpYuSSEwShIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAJIAEggASCNhASCCQAAAAAAaHOWOrhc2a9KZf0N8rueg7ODzYx83TL+gJ7fP+Bh01WS9W1/QtSr4OSdE4r0aLU6OL0z5vbZw8lU/JL7r9fYsk01tPaKM2sfLlVqEu8N/oaVnKsgRGSmtxaaKLmvEEsS9Y+HGNlnbcvva+mvczyymM7a443L0tczOxsGtzybFBeevVlJZ4qU5KvDxXOUnpdb8/yRucX4RnnuOZy11jcnv4Xun7+x1WHxWFgpLGxqq9eqj3/UxudvprJjPbj4VeKcyO4UQqi/4lFf1ezL/q/4nl3eTSt+nUv8jutEorunk4T/AEB4ngtrJok/ZT/zRMcTxZj/AOzrsS7/ALrO6BHZ5OJn4q5bAWs/jo9K7N76WVHI8pxnIXxy8eNuFmxe1J/NCT+uvJn0uVcZrUopr2a2VuX4f4vL/tsKnfvGPS/1Q7WmUV3hvxPXyCji5UlHL8lrys+qOlRy9ngbjuv4mPdk0TT3FxnvT/NHRYldtWNXXdZ8WyMdSnrXV9QrlrfT3ABKoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAEgEABs8crIrxaJ3XTUYQTbb9jjeU8cye6+NpSa/wBpZ3/REW6WxwuXp2OTm42HDryb66o/78tFBmeNuOpco48bciS/hWk/zZ8/yb7sy74uRN2WP96REYbKXNvjwf10WZ415G6X+rKNEd+ykV8vEnNSf/zC1fRJL/A0FUT8Ne5Tzbzg/wDG3/1h5n/9xu/l/kTHxJzMXv8A0ha/x0/8DUVaQcEPJa8P/i4xvGXK1P8AazhcvrFJl9ieOsOfSsrHuqfrKOpL/M4ZwR5yhplpmxy4sX13C5XCz0/smTXa15qL7r8jc2fGKLbMa+N9MnCyD2pI7XgPGUbejG5FKNj7RtitKX4r0LzJz5cdnp2QIT2tklmaQABB531/Fosrf78XH9UejAHy/jV9mzsvFl96E3H9G1/gWpo83iz43xRKXnDKs60/xff+ZvtdzfivWlOafaADxy71RjTsb00n0/Vmluoxkt6aufm2xksTDlN32NR1Dze/Q6fwr4fXG4/x8yqDzJN9/PpXbsV3gniZztny2R0tWJquP4PzO09Dlyu66/jNQSJAIVACQBBIAgEgCAAABCWn5mNt1dS3ZOMF/vPQGYNGXMcfCWpZlG//ABI/5mdXJYd71Xk0yfsrFsjadVtgjZJKAkgkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAABlLz/iHH4ipwTVmVKO4V9/5+x7c9y9fD4Lvmuucn0whvzf/pHy6+23KulddZKc5PbcmUyy014+Pyr35HlMzk7pTybZSTe4wT1GP4I1Y17fczhFI9F5mVrtwxjFV6M0kvQE7K2t8cZEPzJIfmSUaABOiVpGLWzzlE99ESj2JlZZ8W2s0YSX039Ge0lo85G0u3n5S4V1fhTxNbVdVgZ1idLXTXOXnF+ib9jvEz4s/wAdH0PwVy88/DnjXzcr6Hvbfdxfl+nkXlZZ4z3HTgAsyAABz3i/i45nHfao7V2InZFr1Xqv5b/I5zjslZWJCz19UfQbYRsqlCaTjJOLT9Uz59yHHT8P8pZZr/Ubnqtryi36f1L8d1SzyxbSRU5S+3czh4Wm4SmoyS+r7/yLaLTSe+3uavh2EZ+LJOXmu8fxNOW9K8M7rv8AGorxceuiqPTCuKjFfRHqQTswWAAAA2AgBDaittpL6mplcrgYf/xOZTW/ZzW/0CdNwbOYzfG/HUqSxoW5Ml5NLpi/zZzHKeKeRz+1djxYfw1Sff8AFldrzC32+h5nJ4WCv9Zyqq3rylLv+hzHJ+OYV/LxtStf8diaX5e5xEpTnNznJyk/Nvu/1BFq3jjPa1y/E/MZkemeTKuPtV8n9O5W2WWXz67ZznJ+spNv+Z5+Rkn2I7XmWM9RHT9EOkyRJC8y22cXluRwe+LlWx16OW1+jOm4vxxNyjXydcUuy+LWv6o5BaMnFPuvMeVi345m+t4edjZ1fXjX12x/3JbNk+N1WZGLb8XHtlVP+KD0zrOG8aqEVTycJvX+2it/qi0z2wz4bj6dwDXxM3GzalbjXQtg/WL3r8fY2C7FIIAEgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIPDMyYYmLbkWfcqg5vXsls9pyUYtt6S7nzfxRz9/I5M8SvUcWmzs4/vter+hFWxx8q0ee5ifN5rtfVClLprrfovX9TRS0Yxj38jPyRla7MZr0lDaRHUYsjW17npl1E9R5rzJJ8Yr+XJ6dZHWYbBHjD8uT1+IZxkma420yLhF8f9N322djezyhPt3PVa0ZWWOzDkxynTCS2eEvvG00a81qRphXN/owmtvPRd+DMl43iKtP7tsXB/ptf0KVkNpPzNY4ce+n1rN5fCwI7yL4x7b1vb/Qo7/HvHQbVNGRbrybSimfP+r3e/xNnHwcrJSdFE5xfql2J3fpb8WE9113/4hU//ALfZ/wDdX+QX/SBU/wD+32f/AHV/kc1Lg86H9pXCD9nNb/kI8Nfr5nFfgydZos4p9ul//ECnffj7Nf8Air/IwzPFHDczivFzqMild5Ra+bT9H2/E558NZ6SRi+Hy/RVv/wConxz/AIj/APn/AFZVuWEoUztWTTLvDIr7xS9n7M2K8O7E5/js2Heu22MJJfXtv+ZV4nESUv8AWO0V+7GXZnVY0I34Lpnvo10dnppfia44249sMssccv1dPbbCqDlZOMYrzcnpIqMrxVxOLPosyHJ/8OLkv1RyXJeH8uy3oxbZTx13jG61vRU5HGX4dmsyqcKtd5wSkjKzKNcccbO67v8A67cN/wB5c/8A+Ex/124b1su/+0zhauPx75tUZPX7bjps9LOFuX3JRl+LI/Za4cc+3V5Hj3BhLWPjXWr3k1D/ADK3L8eZNiaxceNX1n8xz0+Nyof7Lq/us1pRlCWpRal9URfKLY48f0ssrxFyuVFxszJ9L81FKK/kVkm5ycpNtvu37kb7mS8yu02a9IS0zIjtsnZLLK5faNDRIJ0qhoaJJ0NCESCSF8agzTMDKJWujjvbPzMLIJnprsYso6Mp09eN5TL4nJVmLbKMXJOcP3Z/ifQOA8TY/M2So+HKq+Eepp9015bTPm7XmTRdZi3Qupk4zg04te6NZXHnhjk+ygpvC/LT5filfb0/FjJwn0rSbX/uXJo5bNXSQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABABXc5ykOI4+eVOPU00ox3rqb9ASbUnjbm/slC4+nfxb47lJP7sd/49zg0un12e2ZlW5uXZk3zc7JNvz8k/RHkzO11YTxiU+w2QgRpOwkgMmKXJIMR39yVfJII2NkHnUokhMb2CVJ6Rl9TyHkytm2vHn41s7PG3zRl1djzsfsZ4zVdfLnMsWLLbguHjyLnZc5woi9bi/vP2NbieOnyWXGG2ql3nJe3t+J1tuVgcVRGEZVwjFdowfc6sJL7efnfH09cTj8TEr6KqI69W1tsjIya610VqPV9F5GpLlJ5CSx8eyKf78u36HlKMt7lvb9TqxmLkyyuyTcn3eyEPIGjM0eWTfHGolbLySPUr+b28SqK/etSK53UWwm698KVk8frt85Pf5F5hR6cda9e5UwSjWkuy0XGL/8ADQ/Aiei+3sRqL+9FSXs1sAjSZv6aGfw+Lmpvp+FP0lXpFWq8/hX1WUrNxV2cl5xXv3OjJklKLjJJprWmVuO15n9VpYl2FyFXVQoS6fvJLuvxPWWDjS3updyr5Di7cKz7ZxLdct6sqitxl9dG/wAXyNfIY0Zx+Wxdpw33TInXtbXW41Mrw7i3r5JSrfo0inzPDWXTL/V38dP27M7EbF45U48mWL5xfiZOLPpyKZ1P06keaa9z6PdRVkVuF1UJxfpKOykzfCuPYurEnKmX8Le4mOXFZ3G2PNMusnKIlnvnYGRgWuu6DSXlJLs/zNYz3rqrXCZdxkNmOyUJWdxs9siTEyIqcZ2GUDBmcClrq45uvRohoyfkYvzKSurKdPN+ZjLujJ+ZBpHHZq7W/hLklxvKxVkmqbYuEk32T9H+p9PR8Wm3FbT015M+v8XkfauNxr/WyqMn+Oi+LDlne22AC7EAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAInJRi5Sekltt+h8z8U82+WzeiicvstfaMX5N+rOo8Y8zDDwZ4lbUrr04tfwxa7s+eRWlr2KZVtx4/9BKDGyrS09CGS32IJZ3I2yURruSWV2EEgIDEyIYEGSZAKpZb7kEMhv2Ia4zbJS0QnGU11dT+kfM38Hhc3Mkn8P4dbfecn6e6XqdVxfE43H16Sdlj+9OaW/y9i+PHbU5csxmlPgYXIZ1NcJSWNh+fTBabX9f1LrE4nCw/mqpTm/3p/Mzefd7a7g6ccJHHnyXJD7rT8jHpjryX6GWiNF2VecqKp+cImhl1Rqt1Hya2Wf5FfyD3el7RJ2ixqlfzT1RQ/a1FiaXNY9k+NVkV2U13/UjPuLcc/ZtxacF+BZYEuqlxb24v+RT4VquxozXfskWGDaoW9L/fWicfRlNVZaARITAAEJEc9y2LZx2cuUxOy2vixXk9+fY6ExnCNkJVyW4zWmvoRZtOOWqwx768qpW0vqhJb/A9TnOJU+G5aWHf2pyH1VP677HR+REqcppBJBJZRjKEbIuM4qUX5praKHk/DNNsXZhfs7P4G+z/AAOgBW4yr453H0+b30W4snG+Dg17rsYeR9GycenKpdV1anD2ZynJeHMiibniR+LVrenJdS+mvU5suO4unHlxz6ql2ZGOpRk4yi1Jdmn6EpoztX8NdpR6x9DzR6xRTJ0cU7ZMxl6GTMGVjfL0wZiZMxNY4cqws8j6f4Ot+J4cxveHVF/kz5lPyPofgOfVwko7+7dL/Atipyd4x0pIBdzgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACDC2yNdUpzaUYptt+iMzl/G/KvEw44dbasyU09ekfX9SKmTdcTyedPk+SyMmfZTl8q9o+i/Q1tELzJM3T6gyCSF5ksrTyBLI8iUAI2BtCQRsbJGRA2R5vttkbXmFpsbIa0+/Y3uJ4yzkspRW41x7zlr0/wAyJLb008ZjN1r4+LkZc+jHrlOXrpeR1HH+GqceULcibuku/Q12TLPCwqcGhVUQUV5tr95+7Nk6ceKT258+a3qEdRWopJeyXYIEmv8A8Ye+wMegQSEEgI0jRUXtyum9+pcN6TZSyfzN+7ZKKRTlNR9zezcSM8CVK767nlg09UnOS7LyLB/Mmn6kUx6u3J8O/hRtx5/ejPa36os62o2xl7PZW8xB4HK13parS09G9W+qEZejW0Rjfpfkn/S9Uk0mvUk1sG1TpUf3o9jZLVSABBCdpBDY2EKrxHiytwY5FW1bjy+JFrz16mxw2b9v4yu6TXxEumX4m5OKnBxl3TWmihwZf6L5q/Bk+mq7U616Jspeq2l8sdL8kgF2SQY7JUtegNpG9epHV9BsG1Ty3A05sZWU/sbVt7ivvfichk4t2Ja6siuUJr3XZn0XZr5uDj51ahkQUtd0/VGOfHNbjfj5vHqvn8Zafc2F5HrynFXcddp/PW1tSinpL6mnXY4v6HJljY9Hjzmtx7NmO+5DlvyIbIkRnntD7saA2XctrCe9Hff9Hz/7LyV/xv8ABHAzfufQP+j+DXEXzf71z1+iJnsz+DqSSCTRzgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEEkAD5f4sy1meILmnuNP7KP5ef8AM+icrnR47j7sqWtVx339T5NZJ22Ttn3lOTk/xbK5NeOd7YgkxZVplRjZAHpjradkNg2sHAnmNvbjWuzkvcSW1t4TGbyeFVNlyk64OXStvRg1JPWjqaKIUVRhFLstN68zKVdbe+iP6HROCuW8uO3JpSflFmzXx+VYk41dn6t6OkUVHyil+RE5KuEpyaUYrbZP4de0/m/kU9HDzkm759CXfUXs18i+mhOvCTe/vWPzf6+h68hybyouquPTDq31J6cvb8PwNjheAlnV/HyXOur91Jd5GNkt1i6JdTeTy4rhrs9xtklHG3py33f4f5nZUU10Uwqqj0wgtJGVcI1VRrglGMVpJLRkdGOHi5eTkuQQT6EaLMUkkEaETtII7jbJTtkCNjYNom/kf4FPXB22KK9WXEu8X+B44mOqYt+bZKHtXFQrUF5IkEbYTtW81iLJrafk1r8yn4y96njWdp0vp7+qOoth8WuUH6nJ8ljyxMuOXDbUZasX4FMurtfG7ml3g2qvI0/KXYtChrsVlcbI+UltaLnHtV1Kl6+TL+5tn66erI0SCqAjyJIYgbKLxTjWTrqzKV89L/l5l6jGyqN9cq7FuM00yMpuNMLqvPDyI5WHTfHynHZ7nP8AAZEsbJu4uz/ZOTg35s6BrQxvRnj2jQ0SCzNGhokECNEgDYxnCM4uMluL817nJcxwNuNKzIxfno7ykm9OB15DSlFxkk01pp+pXLDyjXj5LjXzaMvUz6kzoOa8PdEJZOEpS77dSitJfQ5w5Ljca7plM8dxlsyPMyb7Bj36Y2M+l+CqXV4eqk/9pKU1+Gz5p0yn8sVuUuyR9f4rFWHxuNjr/Z1qL/H1JxW5L+sjcABdgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQwG9Act4/wAl18PXjxbTusW9eqXf/I4EvvGOfHO5Z11vcMeLr/8Aq29/0KLZnfbpwmsUEMl+RiwztQAbfH4Usq3cl+zj579Rrya4yYTdZ8bgfabOu1fsl/Nl7VVCqPTXFRXsjKEIwiowWkvJEnbx8fjHDyctzqQQJSUVtvSNbdRjESnGtdU5dKXqc/m8hZkWyrhKSg+yXuOTz/tM1Gpv4a9GtbZZcHwjtlXl5KXw1qUI7+99WvY5M87ndR3ceE455ZJ8P8L8Wf2nMqTqcfkhJPbe/M6iEIwj0xSSXkktaMn59vIg0xxmMYcmdyqUACzIAAAAAAAAAAAAACCQBCK7k8WFtb+X5ZJxl/mWRjKKlFp+T8x7TLr05Hj7J4uXLEul8i7QbOhwLNSdb8n3RVc3x8pV/IvmjLqjL6ex58XmTtr1ZLV0PNFZddNbjueUdQDzqsVlUZLvtGaLVikAAQPUkAjn+bolhZ1PJ09tSSs6V5+n9C+rsV0FZBpxktrXseeXRDKxLKJx2prX4FL4byra7LeOyXqdTfQn7Lsyk/Wt/lHQAJguwAAAAAAhkgCP/X4nPc9wMJweThQUZR+9XBfe+ujoSV2/8iuWMyjTDO43p81acW00015pryJa0u6aT8u3mdbznCVX02ZOPBQvW5S0/v8Ar+pylalOcKrJuCUtd/KO2cuWPi7sbjn26LwTxEczMll3QU6ak1FNfv8AY+iI0OGwMfjuPhj4r6ofe6t76m/XZYItIwzy3QkgklQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEGtyGTHDwb8ib+WuDkbJy3jnkFTxqxIT1O6S2l/D3/yITjN1wPW7ZSsl5ze3+IEeyJZR0W/TFmLJMqqpXWKuCbbHtXHH7r0w8WeVaopNQ380vY6OmuNNUa4rSS/U88TFhi1dEV39X7s9jr48PGdufm5LldRkmCESb7c2gpeXzlP9hW+y+81/Q3uSzFjY7in+0n2X0KriMF8lnKuTfSn1Tlo5+XO/GOvg45P3ybvh7hnmP7TctUwekv4vp+B160kkl2XZL2MKaa6KlXVBRivJIzLYY6jPlz8qNsgkklltCJAAAAAAAAAAAAAAAAAAAADC6qN1fRL8jmOY4+/Gyfj0fe9UvVe51RhdVC2OpraFm4vjlqqjhuSruio7S2+69mXRyfJcdfx2U8nDU3Fd2o+TLnh+Wrz6ultQuil1Rb0ysv1VssN9xZggIsyqSCQBGyk8QYlkfhclir9tT2kvRovCJRjKLjJJp+aZGU3F8ctNbjM2vPwoXw1trTXs/VG0c5Nz4LlHGCbwb3t9u1fudFGSlBSi00/JojG/VTnjruJBBJZmAAAAAAAAb0c54i4Xrg8zFg+vqcrIpLutef8jozGS3HT00+zT9SMsZlGmGdxqo8Fc9VVV/o7KsVfduqUn2f0O4T2fL/EfHPCy1kYtbjTJLXSu0ZHa+G+eq5bDirJRhlQ+WcN939V+JzerqujKbnlF4SQSSzAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAB8s8S5327nciyL3CD+HH8juvEvLx4rj3Jb+LbuFel668/yPmKXdvzb9Strbin2lshvsDGT7P6FTe6jzaXv5F9xuD9lXXPTsfqvRGhxeF8W2N018ke6+rL5+Z0cWH2pzZ6/WI2ADdyJ2JTUIuUnpIgq+byfhpUQeupKUt+xXLLxm1+PHyy0r7p2ZufqL27J9MN+h23F4EeOxIVai7NbnJerKnw5xPw4xzrluUknWvZe7Oh3vz8zLjx73W/Llr9YnYIBtXKkAEAAAAAAAAAAAAAAAAAAAAAAAACGl0tNbT80UfIcB12Rv4+UaLk+ru33L0CyWL45eLn8TnZYsvsvKQmrV/tEuzL6uyuyKlXJSTW+xq8hx1HI1xhkJ7j3jKL00znpY/IcLY40SU6VLai+7SKTeLTWObrWCm4zxBjZdiqs3Xa/JNdn9C4TTW0XllZ5Y2AJ2NkqvLJx68qidNsdwktMpsPJu4e+GFmvqok+mqyK7R/EvkzwzMSrOxpUXxbjLy09NP3K5T+L45fVe0Wmtppr6Mk5/GsyOBmqs2SnhNvpsiu8W/R/oX1c421xnCSlGS2mvUQyx+4yABLOgMdjYGRGxvsQwJ2GzHYYSiyuF0JQsipRktNM4vKxsjguVrtplrpfXXJL035f4HbI8MzErzcaVNv3X6rzTKZ4eU224+Tx6q54blKeVwoX1PUtfNBvvFlgfMuGy7vDXNyjkL9jP5bGl5x91+B9Ix8ivJoruql1V2RUov3TMF8pq9PUkgklUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQYW2QqhKdklGMVtt+SRmc145z/ALLw/wBnjLVmS+js/wB1ef8AkEybunJ+J+TfK8xJwn1Y9XyV6fZr1f5v/AqX27ERel39SG9mft0ZfrNQJhB2zVcd7l2HoW3D4yVTvkvml936Ithju6Z78cfJYU1RpqjXFdorR6EDZ3Sajit3dpAJIQhvS2/IpKaZczysYNNVvs2vSKN/lbXTh/L5yfSbfhTH+HgztcfmnLt2760ZZ93Tp45447XVdcaqoVw+7FaRkS4yXdxa/IguytpsnZiSmNqpGyNjsSnTJMkwJTIRpkCNjYQkEbGwJBGxsCQRsnYAgkxAmT6Yyl7dzxxp/FqVj/ebZOZPow8iftXJ/wAjx4tOPG46fn0Jj7W103AQNhVII2NgSCNjYAwtqjbW4TSe/X1MtjZKVByHE1Tj0zg1p9pQWjRj/pLjZ7w5zuh/DLv2/U6yajOPTJbTK/IxZVvqinKL9NeRW4StJyWRpY/ib5o152PKh+svT9C0hyvHz105lLb8l1FdOmqxPrrjL8UaN3FY81+zTrf0bI1lFvLDJ1Ufnj1Q+Zee0SkcJRDMWesKnNnW3LSbk+n6F19j5+t9uQjJen/rRScl/i14p/V9dTC6DhZCM4v0kkymsw8zirHPjoyvpk9ypk9tfgeXwfEHrlQf/wBJksPnrF3z66/wWv8AAne/omOvtZYnJ4+TFQdkYXrtKqT+aL9jce0c9X4cusvV2bmfEe9tQ2m/zL2quNNUa4JqMVpbe/5lsbb7Uzxn0zTI9QRsszSQSQAAJAAIkn0K7m+PhyGE4r+2h80Hr19vzNXwnzj4q2XGck3VDfyOx/cl7fgXE5qv5n5eT+hTc/wzztZOL0RtS3JJffX+Zjnj9xvx5bnjXeppra7pknE+FvFPQq+N5Fy60+mF02kvon/mdqnsyLNMgQCUJAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIJIAxnLpg5N6SW2z5V4g5ezmM92S7VV9UalrXy7/qdV405yNGNLj8ef7ezXxGv3Y/5nBLy+pStsJqbqX3IQAV3bXpj1O++NS9TpKYKuuMF5JaKrhat2Ts9tJFujq4cetsefL6iWQSDbTnETvsYic1Cqc/ZbIvUTJvpoX1WcjyleFDyitv8A9fmd9xnG14VCjrujlvAmNZkchk8jbF6cXBb93pncnLbuunLqSMZ1xnFxlFNexU5uMqJJw+6/IuDQ5b+zrX1YxvalnSrBOgbqIJBAEpjZAAyIBDJ2hI2QSNpNgAbDZOyCdjYbA2TtEjV5R64zJ/8ADZnhfLhUr/cR4czLp4u/+6e2F3wqf7pTfbT/AJe2xsgE7Z6TsbIJ7jYnZAAQBaIAEk+fYx2STtLWuw1JN19pe3oaDTi9SWmvcuDGVcLFqaTJRpxvKN4vKVXxen2n+aZ2kJ9dMJr95b/U5zxLgKGMroblGD7/AE2W3C2/G4jGbe3GHS+/t2MZ8nRl3jG/tjZBBqwqe3sgQCBAJAEAkARokdj2rxLrY9UYdvq9Deh4lph4dbqjZZFSk/LfoVdsJ1ScZx6ZfUu8KSli169imd6Tj7eeTgU3VOHQlta7HOQlLEz7ePk18q66m/WPt+R1xzHjTAndj15lG1bQ/Ne3n3/QzmVi8kqn5jgoZMbcnHXTkfecd9pe/wCZl4d8XXU2xxeUk516UYz6dSi/976G/wAbmRzsOu1NdaWpx9mePKcRRyFPdKFq7qUUv5k3Dc3Gkz/5ydlTbC6qNlclKEltNepmfLacvlvDljVfUq35KXzQkvp7HYcR4u4/PhCF1ix72u8Z9o7+jM9puOu46MGMZRmtxkmn6p7JJUSCCQAAAAAAAAAAAAAAAAAAAAEAAGyvr5nj7ZOKyq1JNpqUkmtAWANV8jhpbeVTr/xI/wCZW5nivisTfVdKb9FXHq2RtPjV5sovEPiXH4iCqr1dlS8q0/ur3Zz3J+ObroOvApVKe18Sb3LX0XkjlrbJ33Suuk52S7uUn5kWtceP7yRdZZdfO22bnOb3JvzZAGipllvqA33IPTHr+LkVw95E/auP9X2DV8DGjH113/E2ADuxmppx53eWzYALIPUr+TyOroxavmnOWmv8Dcyb449EpvzS7L3Z4eGcL/SHLLKu7QrsjJfV72jHly+o34sP+q7jw/x743iKMea/aLcp/i2WRBJgm9hTcjc7MmUU/lj2LW+z4VM5/wAK2UPU52dUvOT7mmE72pa2KMS2+DlHSXpv1PGcJQm4yWmi9rSjXFLy0VOfKLynr0WmWxy3RrAkguqhgkgaEkMAATsjQAnZGwSkAAAAHtVi23Q6oLt9TylFxemNmlfzv/yq78D14uang1pPvFNHnzi3xOR9I7NTgbf2VXU+04tFZ8ml+K5ZBLILaZhJBIgAAm0QASQI0SSia0nZFPybGhj39ix4yhNSskk/Yzy6KY4rlGKUl5HrgdKxo6/Mzyy3FpGtz2FHL4fKgoLr+G3F/Vdzh/DPJxqsWFdpRn3hJ+j9j6RZFTrlF+Uk0fGpJ15Euns4S7P20zHy8bt08ePlLH0drTMdFRw3NrNi671q2PqvUuE9rZ1S7jmyx8bpAGxslQBHUAbGyNgEI2mP3kdBXp1x15aOdZY4vIRrrULE/lWk0U5Jv0tjWXLVJxjYvNPT/Ajir0t0yfdvcTyzcyOQlCG+ld+5q1z+HbGaXeL2RJvHtO+3Q7MbK421yrmk1JNMxqthbBSi97W9C22NMHKT1r+Znpbb5rgOXF+IbMaxtRc3D6d/JnVtabRzPiil18jDOgnuTXb6rudDj3K+iu1eU4qX6l+Pq6X5ZuTJnKMZxalFST9H3RU5vAY17cqf2En/AAx2v0LfZDkoxcn2SWzTxl9qY5WenOfZuT4KqWRRyXTSn3ht9/yO38P5WRm8Nj5GUkrLI77eq9GcbdZLxFyFPHYrcak3KUn9F5/gd/i0RxsauiC1GuKivyOe6301t679vZEkIkKgAAAAAAAAAAAAAAAAAAAADFnz7xtwteFas6mtRrunqT35S17fqfQjW5DCqz8OzGuW4Ti1vXdfVfUipxunx7X4BJG9zPG3cTnPGu+bsnGa8pL3NFFGszqdAgkK22pRJCDJQg3OJrc8vqflFef1NJ+Rc8NCSolY4/ekXwm8k39casQAdjiADQ5XKVVPwYy+efmvZEZZeMWwx8rpq5s58hnV49G2m+nX135nX8dTHAqohFL5NdTS89epS+GuPddP2y2LVkv7P8PcvjHGeXdb8mWv1joarYXQUoSTRk5KK3JpL6nOKUovs9fh2Jc5N95Sf4sjwZeTazct32OMd/DT7L3NbyI2GaSaitr3hnXwj0qXZeWzwlKU5Nvu2QCeohv23Y7xFCMfn0vQ0t+5GwRJpO2SYMQWNsgQmeGZl14ePK6zyXZJer9iL0mdtgERe4p+W0TsaAyripT05JfiYgCWu/4Hvbjxrx4WKe3LzXsa4b2tbGqmaXmK4vHh0+Wisz9faX06MKcq2iLjBrT9zybcpOUntsrjjq7Ttp8st8Tl7/7pspeJl1cfS15rsXvJR6uLy1/wpf0OX4K9OMqX2a3JES/svreFrqsW5207fmuzPUrMa74M02/lfmWi04pryfc0rFAJ0NEJQCdAgQSOwJAyMN+ZOyTbJyk13bf5mxh5bobjNNwfsamxsiyUmSzu5GLi1UntrzZ8/wCJxa83msvGtSanGxL8d+Z10fvI5fw5/wD1VYvrb/U5+XGTTp/z5e1ZbVk8Nn9FsHGa81/En7HQYedKdKsqn1RfmvZ+xbeJuHfKYSVKisiDTi36r22cTiZVnHXyqtg0t6nF+aYwy8eqvyYec27KnKhYkm9S+pseRR12RsrjOEtpraNynNcEozW17rzOr3HDZpv7IMK7a7FuE0/p6mZUCTztthRFTtl0xb1v2+rPT0AgkgABsbIY9p0zjZKD3CUl+DE7Jz+/Jv8AFmBJGobVviCn4vE2tLbramV/A8tjU4fwsq5QlGXy9W/LReZMVbi3Q8+qLX8jn/CGFi8hmZGHmV76q+qLXmmn6MyztxvTp49ZY3bfs8R4Fa3Gc5v/AHY/5lesjlPEFroxKpqiT9tRX4s7HG8J8Tj2OaplY/ax9S/oXMKoVxUYQjGK8klpIpcrUy44+oquA4GjhqX0/PdP7835/gXAQCluwkgkAAAAAAAAAAAAAAAAAAAAAAEMkAVnL8Jh8vBLJr+ePaNke0l+fscPyXg/kMLrnS/tNS7roXzJfVH0oEWLTKx8XnCVb1OEov2ktGOz7NZRVb/aVwn/AHopmpbwvGXPdmDjyf8A4aI0v5z7j5JsmClZJRhGU5PyUVts+rx4DiovcePx0/7htUYWNj/2NFVf9yCX9Bo859R85w/Dlz4zIz85zprrg5Rg46lJ6+vkjYxIfDxa4e0Vs6bxl1f6H6Y/vWJP6rTOf1/I14p2x5crYAehpZnI14yaT6p68l5G+WUjHHC5Xp65mVHHpk9rrf3V6lfw+FLlM1zyeuVUU237v0WzzwcHI5TJU9Nw3uVkvLX0OxpoqxqlVRBRhHySMJvO7+nTdceOvtnFKMFGK1FLSS9ESQNmzm3tII2SSJBAIokAAAAEAAAmPn5b+hz1ts+T8QRxU94+NLckvKTX/uW/I5McPDstk9PTUfx9Cv8ADeN04byZr9pbJvqfsUyu7pthNTdXbWuxGiCTSMTyGwQRsZbGzEkkSRsbBBtjdH4mNbB+UotP9Dhsaz7Bmv6PoZ3nZrRyHLYM7eavrpj3lH4iXv27mXJ126eDvcq1Wmk15MscK52V9D84dl9Uc5w2Wp0umc9zT7L10WtVjrsjJM1wy8owzxuOWlvtkdTIjJTipJ9mgFU7J2YgCexKMQBhXJu62Htp/qeprw7Z8/rWvz7v/M9/QbTRkAlBCYvRzPhddfia2S9FN/zOkk1GLb9Ec94LTnzGRP8A4b7/AIsw5nV/n9V27OY8U8D9p3mYqSnGO7K0u8/qvqdZOrUVo8tGLeXb5ngZ08exVW94Ptp/usvE00mntP1R6eJvD3Up5uFUurvK6O/P6o5/js90S6LW3Vrt9Dbj5NdVny8Uym4votxe02n7o2K82yHaSUkasZKcVKLTT9USdXV9OHVnVWE505tEqpaSkmtNlbwXIWK2WBly3ZHbhJ+qJKjmITqyoZFba8l1J99mWc1224tXqux3sGpxeZHMwa5qW5RSU/73qbTZMu5tTKauqAbIffyZKEkNgglDJaOd8Mz+y+L/AIe+0pTr/E6D0OdbWJ4uxppaTujL9W0zDldHD6sfSwECgAkAQSAAAAAAAAAAAAAAAAAAAAAAAAAAIJAEAkgDwvy6MeUVdZGDk9LbPC/mePx1u3Kriv1Oc/6QMRyx8fIacoRn0te3ZlHi8DhZ2Orse+yO/Ndn0v2I72v4zW6u/E3P8bmYcacfJU5Ke3qL8tFBZy9SXyVyk/r2NteFq1/+Zs/5Ue1fhzCg11/Fs/vS1svMcoW8eu1BdnZOS1Wl0p+Sh6ljgeHbbOmzLn0Rb24R83+Zf4+Jj4v9hTCD90u577LeFvdUvLJNYsa4RrrjCEUoxWjLZDBr6c9uz1AAAlEEkiQQSAAYRCQEkDQkAAc54utblj48fdz/AB9EX2JV8DDpq/ggkzmOWm8nxHrzVbUdfgdYn8sfwMsfla25OsZA8su/7NiXXa24QckvdnqV3PWqrirt6+ZdP6pmmV1GeM3dMsLko5Ndc5R6VNenozfOO4jK/afAk+zW4nQ4+W6/ln3h/QYXcOTG4XVbttsao7l6mVc1ZBSj5GlnzU/h9L3FrZr1WyqluD/Fe5fTNbAwpvjdHcWt+xmRpKdlL4g/1SeLnR7SjYov6ouUV/P4zyuMlFecH1r8jPObxa8WWslV4lwZYeZXnYsemmxKXokpP0PXDyI5OPGaffyl9GW/h1w5bw86suCnGMnXJPz0tNHM52LkcFyUotS+BOW4eqlHf9THjy8b26eTDzjocG5qfwpPt6G8UdN0bYRsrlv6otsW741W3rqXZnXvc24bjcbqvYAFQCAQHi+3IRX/AAn/AFR7mtJ/9pR/8F/1RsJkRbICZAJQ8OSt+Dx2RZ7Vs8PAWFKNV+VLTjPUV+WzS8VZXwcWFMX/AGre/wAFo6vw1i/ZOCxINalKHXL8X3Oblvbqw/XBa67Ghy2TDAwbcqUXJVx3pepvnlkUVZVM6boKdc1qUX6ozRLqvnd/i/OsclXXTXF+S6W2UuTfPKvldYoqcvPpWl+h9CfgziHJtV2pfwqx6PO3wTxko/J8aD+lm/6oh0TlxcNhZs8V9LXVBl3j3wvrUoPe/T2PTkfBd9KcsO52L+Ga0/1OcnXlcfkOFsZ0zT8n23/ma8fJcfanJx45zcdKa+bR9px5Vr73mvxNXD5WNkui/pg/f3LFP1T+qZ0+UznTj8cuOqrgcyWHn/AmtxvkoP6P0Z1zOIz6ni5sbINpt9cX9TreOyll4NVu9ycV1fiZcd7025sdyZRsMAGrmAAAOc53VPMY1r8l0S/SR0ZzfivtkY7X/dv+plyTptwfJ9Ixp/Ex65rylFP+R6mlxD3xOI/emH9DdRlFr7SACQAAAAAAAAAAAAAAAAAAAAAAAAAAAAACCSANXksOvkMC7FtScbI67+j9H+p834/4/Bcu8fM6qoS7PflLvpSPqTRzPjfi68vipZbl0W4y2n6ST80QtjfphBqcFKDUotbTT2Dl+H5n7HX9nydupP5ZRXeP4/Q6halFST2pLaOjHLcY8mFxoACzIAASAAAAAAAAE7IAGS7gxJ2SMjGyarhKcvKMdjZqcvb8PisiXvW1+pXK6i+PdjncF/aORyL/AHbe/wAzrV92P4HJ8LFKmyfvJI6up9VUHv0K4Tra/Le0oqvE63xn/wDEj/RlsVPiZ645L/iL+jGfxRxfKKDExJ24FmVT9/FkpS15uL3/AELbFyYZdKnD300/Q9/BEI2V5tc1uMoxT/DuavI8fLw5mRabniXL5W/NNehjx5+NdXNj5Rs70tehXPkZxyGrK2qnLpjL3N2diePKyL2unaKbJ5KzJwKsR1wjXVJzUkvmbfn/AFNuTk8fTDg45dyr6Fmvmrf5pljj5cbElN9Mvr6nIYHISxvks+avz+qLmi+u+vqrltE4ckyZ8nFcKvyH37a2VtWXZWtP5o+zNqvMrk++4v6l7ipLpq+HrP8ARvJ3cbZtfGfxa36f+v8AIvs/CqzsSyi2KalFpNrfS/dHLc6rMbKo5Whxl8HUdP8AF/5nZYrWVhUZEPKyCnr8Vs5Mpqu3HPp89vxMvgMr9rFyx5PpU15S9fyZZYWZCaVlMtx3po6vMxKsuiVGRX1RktHI8h4dzeOtd3GydtWu8ZP5v/MthyXFGfHM4vFLripLun3JKPieZrnNY98XXNvS/EvO3obzKVy5YXFO+xCALKtZy/7Uh9KpL+aNk0Meas5GT9oy1+qN/ZXFbJJHqDQ5fN+wYTsj3sk+mPshbqbRjN3SnzIPmPE1OPVuUFKMG/RJPb/xPpUIqNcYxWklpI5PwHxzjiWchctzueofRL1/U61nJld3bpyv0EEkFUJRJCJ2ShDW/M1czjsXNpdWRTCcWvVd1+HsaHJ+KeK4y503WznavONcHLRXrx9xvUlLHyox/i6Y/wBN7JN6VfK+Ccihuzj3G6vf9m3qSX4+pQq7M4234WRGyvXnCyOj6XxnO8fyzaxLuuaXU4NNNI2MzBxs+p1ZNSnB+jE3O4vM/wCvmGZmU5dO2nCyD3FPyZ6+H77a8myEN9KXVpFt4l8LVcdjSzMGUuiLbshN70vp+Zy9F9lFqtqepJiZ6y3WvhMsdR3dNquh1JaM2U/H5nVUrop9MuzjvyZbxfVFSXdM7J3NvOs1dJAAA5vxZ/aUf3Jf1OkOb8W/2mP/AHJf1M+T034Pk7/hf/k+F/4EP6I3kaPC/wDyfC/8CH9EbyMom+0gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAGcx4uyPjzxOLi0/izVlqXn0I6LKvhjY1t1rShXFybfsjg+FdmbmZPJ373ZLph1Peot7Jk3T1NvTk+Hxb6etx+HOK0pR9de5T4fL5XGWqi9OdUe2peaX0Z0fIyXTGK99lbbRC+DrsinF+/oa3D+Ix5Z6yWuLm4+YnLHtjPXmvVfke5xWTiTwrq/gWylKXlrtJfmbNHM8lhLpsg7F/xE3/Mr+S/abw77ldWCgr8UxelbjSXu4y3/AFPf/rJhy2mrY/VpMtM4peHKLgFXHxBg9K1K1v6Vm9jZSyY9Ua7Ix9HNa2WlUuFj2ABKoAAAAAAAAVniSXTxE0u3VJIsym8Uy1x1cX62b/RFc/i04vk0uIhrA37ybOgxZbx4/oUnGLpwK/qtlxgyTrcH5p7LYfGI5L+zaRTeKmlg1x33dqa/JMuUc74usXVj1fjIpyX9VuGbzWfgSh/Cus9JtL9Nnt/0gZiqw6MVQg/iPqcpecUvY3fBWN8PgqrH/tHJr9WWHM8Li8zRGvJ2nB7jKOto5HTll+z5lj506KZ1a6oTTWm+6LbhPCmVyHRdkbpxpJST13mvp7HZcZ4d4/jF+yrVk97U7IptG9dm4uLF/HyKqkv4pJE0/Jr4q+PhfiI4/wAH7HBrz6m9y/U5/kvB2Riv4vFXTmvP4Umt/kzp48/xTeln47f/AIiNynKoyI7pursX+7JMSqbv2+ZyzMzCs+FnUTi09Pqi4/8AublGbRe9Qmt+z7H0K2iq+twuhGcX2aktooc/wbxuWv2aeM/+Elo0x5LEWY2KG2HxsedL30zWmi28G8hKUL8C+fzUS/ZJ+fR5Gt/1NzMeW8XkIyXtZFr+hFHhzlKOVw8pfB/Z2L4jhZ5x9ez/ADGefkjHGSadjKCkvI85UPzi+57jRmnag5DgMHNk5X4yjZr78PlZVWeHs7Ch18dn2S15VWpPf5nZtJ9mtnm8eD8tomXS3lL7cNLM5jEbWXx0ppfvQX+Wz2r5qmcWrIWVTa8pQfn+Ojsljx92S8eCXlsvOSxFmFcZx+vtspL/ALnf6ssjC7pfNZXT+7GMX9HtkZGRTix677FWvqb45dbY5Td6ZznGuuU7H0xj3bfoc3i1XeKOYjU+qONXttx/dj6fmzO23L8Q5axcGtxx9/fe9dvV/wCR2/D8RRxOKqau7enKWu8nox5M/Jrjj4Td9tvForxceumqKjXCKjFL2PVhsgxQkgAJG9Rb9jiPFXiW2d7weNucIw07Lq35v2/oXfizlFx3FTrj3tyd1RW9NbXd/kfPMerorRZMm2EceO9vbb77bPT4EWu6PZIkiVeYRrKl0zjZROdVkXtTi2mjs/CviqzJsWFyco/Gf9nb5Kf+6/qcvTTPItjVVFznN9KS9We/NeH8zj6I2XqDjJpbhLyfsTtTLGR9Iz8dZnH5GO3pW1uG/ba8z5Hk0Sxcm2ia1Kubi/yZ9H8KctHkeMjVLtfjKNc03tyWu0vzOe8ecbHHyIZ0FqNz6Z9v3tdv6Fc2nFdXSn4bI1OVDS6X80X679jpcKzcPht+XkcP5akvNNM6zEu3KqyPaMu/5HRwZbmmP+nDWW4tgS33INnMHNeK3+3oX/Df9TpTnebisnmsShLb+WL/ADkZ8vxb8Hyd9w61xOGv+BD+iN08sav4VFdaWumKX6I9UZRN9pAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIJIYHL+M+Q1j18bU/2uTJJ/SP/AKR50UQx6Y1QWlFaKpzfJeL8nIl3robhB+2u3+Zdeppxz7V5brpXZz3fr2Rr+h6Xy6r5v6mvkT+Hj2T/AIYtm1uoxxm7pXVTeXy0m18taaRaNKS1KOyr4OLfxLX5t6LbzekU45LO2vLlZdNZ4eM3t0Q2T9ixv+4ibKqnLyizYrw5uSdvZeyfcv44qed/rWw8On48XCmKS7+RbdtdlpGFVarWo9jNkaiu7QAAADwqudmVOK+5FdvqyR7gAgAABOjn/Fsn8DGi326pP+R0BzniuXVPGr15bZTk+Lbh+T0wlrEq/upm/iT6btfxLRp461RWvaCPauXTZGW/JmmM6ZZ39qtTkvE9vxeUlFPfwoqK/HzOrutVdM7X5Ri5foclgUT5bnoRfzRnb1ya7ajtGHNetOjgn/T6VxGOsXisWlfuVRT/AB13NtySXchdopHI+NOctonDjsKfTbKPXbLX3Y+i/MwT7qPEniyzGyHicbGE5pNStffpf0ORu+PmWu7LulbZLu3IV0xivLv6nqRteYvD7ND2PSieVhvqxMq2mXn8ktL9DMEbW8VzxfjPMouhVyUI3VOSTtj8rivd+53lF9eRXGymcZwl3jKL2mfK1jyvUuiEpaXfXoiw8J80+Izlj5NrjhT2lHp30yetP3S/kXjKvpOhoLuSEII2SyCokEIkkA/IBoD57l8tZTyOZHHod99lzUUu+km/Y2cLw3n8yo5HK5Dpr841RXf9PQ7aFFVbbhXGLfduMUtmZO+tLeTVweNxePojTjVKEV5+7+r9zaA2QrUaGiSGyEmgl3I2SSOA8cXu3lsen0rrctfVv/yKReZZ+LFvxJNevT/ia1GJK1+XYVpg1tMnTb8i5p4luK2jZjxMUu6/RlV1dwWVTx/JRvyKnOKWvl/dfuWHifmquQrhjYyk60+tya02/YzfGV67J/qeNnGwXlvZZFx2rPDWfbxvPU1x068qUap/m+38ztPFuBHO4S2LbUqU7Y690mcBmReBnU5Ee0qpqcdremns+l02/a8OuyWmra1L8doZemWM/bb5J6F9xVnxMNR33rfT/ianiPj4cby86aouNUkpwTe+z/8ANMy4Sf8AaQfrpk8N1k2555YbdVRPrpjL6dzM1cCfUpQflHTRtnbp5x6HI5111vNWW0/fofVHt5dL2dbJpQk36HPeG61fn5eTPv5x/V9zLkm+nRw3x7dn4a5V8txML5pK6L6LEv4kW6Pn+DmPw/4hdXeOLlOO156bf+B38XtGXpN/rIABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAg8cq1U41lkvKMWz3K3n7Ph8NkyX8OiKme3IeHYf6lO71tsk2W0nqLfstmhwC1w9C+jf8zdv7UTf0OjD0x5fkrJPbb93s0OWsccNx/jaRvopOYk3kwr9FEcl1E8M3k3eKrcMOO1rb2W+DWm3N+nZGlSummC9orsWuJHpx4/XuWx6ivJd5V66+gAJUAAQkAAHjk2qul+8uyNbB/tGYZVjsta9ImeD/aMsN8AFQRJBIA5nxS9ZND9l/ijpjl/FHfLqXtFmfLf1b8HeTbxZ9ePXJLs4noeHH//AAFP902Pqa4X9WOc3lXlzOZ08Mqt/PN9P5G7/wBH2G+nJzJLt2rj/V/4HM5ts87MjVVFv5uiK922fSfD2B/o3iacd/eS3Ptr5n3Zy55brsk8cNPTm8+PGcRk5ctbhD5E/WT7L+Z8sxlKSdlknKyT+Zye22dr/wBIN7XG4uPF9rb9y/BLZx9P3dGdUx9swToyjCT9GVbsCJfdNiONKX7rMnhz12T/AEA77gaa6ODxnHp+apTnLXm2tts4HxFKnL5TJnTrolPs0vM3acvkqMR4teRNUtdPTryXsistpnCO3HWi+2fj7dn4DzbcvgnG+TlOi117b29aTX9TpTg/AeTKnkL8P9y2HxPzXb/E7sMxmJkQyBA2CSEp2PMxJQQkgkgAAQEgYAAlEGUSRwHi+j4fiPHm+0ba97/+pljg0wjWtLubHjfjZ5OJVm0R6rMRtyX+55t/loqOE5KF9UU2k/xC+FXcY6J7GKkvclv6kNUNHlNJHo3peZX8jmRoi+/cIt1HO8zu/LVFfeyx9MV7tvWj6HhwlRg0VSWnCuMWvqkcZ4d46fJ8p9uubVONYpR2t9cl31+XY7Zvb2Mu1MMXO+M+P+04kcuqvqsqepa8+nv/AEbOV4ixRzFD+JM+lzhGyLhNKUZLTTPnEaPsXPSof+ztcV9V6DDqxpl8bHRYMtZGvdFgVmL2yYfiWZ315rU5W9Y/G3zb7uDUfq2eXCYbw8CKkvmnqT/Q1+Zn8W6jFX3epTkWmPLqpj37paKTutLdTSn8VY3xsSF0F81cu7Xsdl4ezFm8Li273LoUZfiuzKPLpV+NZW1vcWl+h4/9H+bJrJwZvtWlOP66f+BlyTVa494O0JIJKoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEFb4hg7OFyYr+HZZnjk1K/HnW/KS0Ez24vgJKXEUfRP8AqbeY9Y0iu8PyVVd+HLtZTZJOP0LDOf7DXuzfjvTLl+Suj5lFyj3yX5RRex7Moc/5uV19UiOb1F/8/ur2K8l9C3gumuK9kVuNHqugiyL/AExvtkyAAgAAAxssjVXKcvJIyNLlLXGEKklucv5DZJtqyl1ycvc2MH+1Zrmzgf2z/AuhvkAFEhLIAEnL+KO2ZX/cOoOX8U7+11/3Wv6GfL8W/wDn+TY4/wD+ApX+6Y8hkKjHlp6m1qKI42yMePrk2tRXd/mV0KruZ5WNNK7S7Jt+UfVkZZzHCRbHC3O1ceBuNeRyEs22O6qO0Hvzn/7Hdzt0tI08aivExa8elahXFJPXn9TPZzbdHju7rmvHsG8DFu12hd3/ADRzGLF2aUTv+bwnyPD5OMvvyjuG/wCJeRwfB/Lb0TWpJtNP3JjOzWSyxeOnNJuJZ1cbGOm0tm1jwSrWjYSIatWGJCL7I9fs8fY9tEhOmu8ePsaGfixVLlotit5i6NWM02t7CuWtK/wpFx8V1KO9fBns+hHJ+CMGPwreRmpdc5OFe/4fV/r/AEOsZLAIAIAAACWQCQABAAAJAASBkjHRKIRSUYzi4ySaa00cdzfhO6q/7TwiUer79Ll6+6b/AKHZmM/IsiPnsOTuwf2edVZVPf70dGx/pyjp31nX3Vxn2nFST9Gtmg+JwHJy+y07b39xFdtpLpzNnMfG+THU7J/wwj1MzxPD2bn2q3k/2eOm06t/PL9PJHV10VUx1VXCC/3Y6/oSRtMw/rGmquiiumqKjCuKjFfQzBBVeTTJPucL4hj0eKd61vol/I7lHFeLF089jyS864/1ZbH2X1W5S1G+LfZJ7bLGq2u2tWQkpQfqih5KXTg2NPXbRHh7kFHBsxpffT3Fe6Z23KS6cH47ZtsP9plW3yTcm9R/D8CwwHuuWnvv2NHv5m9x6/Zy/E00zt224+ZQeFZvG8XWU+UZ/Eh+PfaL+Pmc1gv4fjir2d/9UYcro4PVfTESQSZgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEEkAcNzGFPifESzopvFypJWPXaMm+/9CeSzceNcYu+HVvvp7OxzMSjNx5UZFanXL0fv7nPc/wAThcd4Yy3Rj1xtVa3Yo/NJ7XdstjlZ6TZMvanXfTXkUOb/APNX/eRc4b3jQ7/ur+hTch8vJ79+ll+TuRHDNZWOlwlu9P2RYGlx63ZJ/Q3TSemF9gACAAACu5V7yal29NfzLEquSe+Rrj/uJ/zZGS+DD1NnC/t/yNc9Md6vj+JoyWYAKLAAAlHOeK4pPHn6vaOiRR+LIN4uPPXZTa/kU5O8W3B81JTPIyMevEorlJtvbj5vbO64Th6uLx49lO+S+abXf8F9Cv8AA9NL426/oXxviuPX660ux0jOK3bt+0AArtJs5jxJxFldn+ksCuUp9lZVCPn/ALx05Kei0ulcsduV4nkFZX0T+WSetFzBqS2ma3JcBVky+Lg6xr+7elqM3v1Xv9SpWTl8fY6sqE30dnJRbi/zLbVnTodEMqY83S13ff8AFGNnMxk+mrcpvyUVtv8AIJ8os77o1Vyba2l5FViYs+dzJVTc66IrqdkVtS+iPfC47MzpwuzJdFG+p1yj3kvZo6TEprx4qumEa4J76YrsPSt7jbpqhTVGuuKjGK0klrRkI90AyADztyacfXxbIQ3/ABSS/qB6AiM4zipRe0/VEhIAAABIRtAAABEjRIwusVNUrJPUYrbNHiuWr5FS7KE4vXR1b7e5PO2qrirm2ltaWzjcG6dGZVZW2pKaX5bM8stXTfi4fPG19EIkRW91xfuZM1rnat60zw2bd0eqJqPzM66OO7hsgAjbRBIBGwRxXi9/9t43/hr+rO1Rx/jKGuSwrH5dLT/Jlseqixo8zZrEjWn3m1+hUVzdck4PUk+zRs5iyMiDynGax+rpi2uy9jTXkXzy3dxHHhJjqulxb1k0Qtj23vt7FvhwcKVv1ezk+JyHXkxpb+WzaS+p2MF0xUda0kjr48t4uHl4/DJmvM5j7vjTH1/+ogdOjlpS34zo+mRX/VFOb1F+D7fUCSCTMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQUvi/t4Zzf7i/qi6KXxem/DWZr+FP8AmgnH25DjpdWHX9I6KzlVrkFL/dRu8PPeK4/wv+TNfmK2pV2fTp/xL5d4xOPXJY6PjfmrcvojbNLhpdfH1z9Wlv8AQ3TWXcc+c1lQAEqgAAFNyc2ubrhvzpT/AJsuSg5V68Q079af8WVyrTje56VPVkX9UYEp6Zoz9LYEJ7SZJUAAARUeKVvi4P2tX9GW6K/xBV8XiLdecNT/AEZXP004rrOMvAs98dkw9rU/1X/kdKzk/Almq8yrffcZf4HVnBXoAAISAgkARKMbIShPvGS00NAmVGlTZ4Z4mx7+C63/ALk2jaweJwsDvj1al/FJ7f6m4SPJHjE7b82ZR7MwMo95DaLOm5X90kiH3TJF4wojkfFW3ykF/wANP+bOvKfxBxjzaFbSo/Hr8t/vL2Iy9L8WUxzlrHw3mfHw5UzluVL6V2/d12LrR87xMm3CzIWxcoyi9Sj5bXs0dvgcnjZ1addkevW3DfdEYZbna/PxXG7npuDRjK2uK3KWkV2ZzeJjppWKc1+7HuW3IymOWXUWbSXdlZyfM1YMuhbnZraS9PxKLM53KyY9MNUr3g3sq5OTbnJ7b7ttlMuT+Ovi/wAlt3mtsfxFmfaeq9RlU33jFd1+DL/G5fEyO0bNS9mtHK4vG5WTqUKn0v8Aefket3C50F8tPX+DKTPJfPh4b1Lp1rzaEt/Ej+poX+IcOrajKU5e0YnKTwc2EtSxbP8AlJrwcyXZYln/AC6J/Jl/ET/Nx+7WxynK3cjqM0o1p7SRPB8fLOy4vt8KqSc3v9NHrgcBlX2P7SnRDXo05M6jAwasDHVVK7ebfq37siS5XdOXmxww8MG3GPTFIkx2Nm7zyS32Na2vu2kbGwRYtLY0GDanSn5GtKEovTRSxvM5UAEpN+hC24hFNzfDy5bLxdyUKK1L4n8T3ryLyNUn6HvXRFPbLSK3ORX28RRk8e8KUGqOlJJPyOC8QcJZw2XGDl102bdcn569mfVDl/H0IviK5tfNG5af4pltKYcl8nA1zddsLF5wfUvyO+hNWRU0+0ltHz/R2vDz+JxlD3tqKX8jbhvaP9U623kcxgr7R42qa8vtG/0R0tk1XXKb7KKbZReCqXk+JLMmX+zhKb/FvRfmvqMuHrG19GJIRJmgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABBr5+NHMw7seS2rIOP6o2SAPleLCWFyV+JY+lwk46a1tpnvykOvCm9d46a/xNjxxiSw+crzI66b0pfXqXn/LQ3DIxt+cbI9i+HcsWy9zJPhS/rx7qn+5La/AvDkPD9/2LlHXa2lJOD/H/ANbOv1ovx3cZ80/bYyDDIn8LHss8uiLe/wAjHEvWTRG2Pk+35l2WutvUABAc34hn8Pm8eX/DX9WdIcv4s7Z9Ml5/C/xM8/TXh7qwi9xT9yTzx31Y9b94pnoaz0zy6qzx59dMX6+TPQ1sF7qf0ZsioAAQCIshGyuVc1uMk00SAmXV25/gbFxniG3Gl8sZtwXovPt/U7bzOC8SwePydOVHs5pNfjFnc410cjFquj92cVJHDnNV6ON3jK9ANAzWAAQkAHqSAAIQGUPvJGJ6UR3Z5dkXiMrqNuK7GSMUSizmT6ENJruSCUKHmeAhlRlbi6qtW20l2m/qcvPGysWUnOu6pp6b01/M+jIwnBSWmtoplhK6OPnyx6+nzxX3yWndY/xkzOFFs1uFNsv7sWzuVx+MpdSqipe57qtR8lor+Nt/+rXqOOweEzMrvKDpj7zRe4XBYtEP20I3S95RLYdi0wkYZ8+ef2xhCNcVGEVGK8kkZkbBdgiST80goxXogAntIIAEsgAJQSABO0Gk/NEAhCHCPsgox9iSQbOxIAQHIf8ASDf04mNjp952dbX0S/8AM6/Z8z8Z5323nZqD3Xjr4X5+oX45vJSbfpry9TtOHqlTx1Kl6xUu6012OPwqHlZtNCfectfl6neJJaS2klpbNuGX2n/TfpVeI8uWPhqEHqVj6fP013LjwRx0cbillyjq3I771+6m9HL8pTPmOerw6E306g9/j8zPpOPVGjHrqgtRhFRX5EZXdV+OEj0RkQSFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgkgCm8TcTHluOlBbVte5161568jg+Iydp40/llDekfVGfOPFHE2cXy8szHg/gWS61qOoxb80JddtMbueNV/L4rg/tFXZN/P38n6M6DhM6OZgpyf7Wv5Zx/xNKEq8mlNJThJd0+5VWLI4vL66HJV+elvTXszT13FfnPG+3R81e6ePlrzsfw/yZocPc8XOlhzeq5x64N+/sY8jyFGfxtEq2oz+LFyg33Xc8OTrkqVdSmrIS2nHz0N7u1fHU1XTAr+G5BZ2LubSth8rW+77LvosDWXcYZY3G6oc54rhvIol/uNfzOjKXxRWpY1c9d1LW9ehTkn6tOG6ya/G2qzDrS/dWjaKbiLuiyVT8pd0XD8i3Hd4nNj45NzBnqTh6PubpVUWfDsjJ+RaJ9k/ctWSSACAAAFfzeG83CfT9+v5kvc9vCPIRuwFiSkviUb0l/D7/zNpd/Ta9vc5mE5cJ4ljNbWPOXd+ScX/wCv5HPy477dnBn1p3pBl2aTXk/J+5BzadEAENhIAgQAGwAS29G5XDpikedVWtNmx6F5GGeWzRKRGxslkkjYIAnY2QSEp8iNkbAAAEpAAAAAAAAAAAAAAAEAZGJkggANbkM2nAxp33zjGMYt6ckm9eiJQrvFPLLi+KlKDXx7fkrX19X+SPmUpOybnJ7blt79Wzb5TlMjlsuV98pdLb6K+rtBeyJ4zjZ8ja4puFce85P+m/cjVt1HVhJx47q38O8ao1RzbN9UtqC+nuWnJ5KxMG2795LUV9T3qgqq1XBKMYrSSRWXwfMczi8dDvVCXXa13SS9GdOvGace7nltYeBeOmqLeRvT+Je9R/Dfd/qdckeePTXj0QpqioQgtJJaSPQyWt3UgAlAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAINXksGrkcK3GuScZrXf0fozbIZA+X/AGW/gc14mbpQs+aE15fibsoqcXGUU0+zR0ni7hny3HL4MW8mp7r763vzRxvHZTti6rGuuHZfXX+Jrhn9VOU3+0eF3FWK3qonHp3tJ9tFrpuGpa366BJrOORllyWqmxXcZmxyKW3XvbUV6ezOlwOQpz6eup6kluUW+8SusrVsHCS+Voo68i3j8+yWNLXRJrT9V9TLL9K1xk5Z/wCu37p9yu5+HXxN2vOOpfoxxXK18glW9QvS24L/AANvLpV+LbU/KUdF7ZlGeMuOU24iqTpvqk/Rp/kdHCSshGa8pLZRWVdeJ1RXeluMl9Dc4fI64fBl5wW0/oZ8d8bpvzY+c8lkWtEuqiD36FVs3MCxadb/ABR0VxtwMEMqJBGxsCUaHM4P2zBmoqPxId4t/wBDe2NlbjtbHKy7efg7lvttEsDJk3dTFdLfrHy/U6J47Xk9nCchVPhsyvk8FLtP54S8u/8AmdvwnJV8rx1eVX232kta1JeZy5Y6unX533CUHF60zHRYtL2MHCLfkimkzkrRGm/qb3woew6EvQjSfyNSNcpeSX5ntXQl592e6SBOlLnajWgjIaJV2ggkhgCd9iAAAICUgAkAAAAAAAAAAAAAAAEISNkACdghFXz/ADlHDYylP5rp7VcNeb+vsgTtt8jyWNxuNK/JsUIryXq39Pc+a8/zN3MZjm1OOPHtVW35L3/E8OW5O/lsxZGR0pqKioR8kvz/ABNLu3pd2w6MOOYzde2Jjzy8mNNSTlL37JI7DjcOGBhQqil1ec3/ABSNLguPjiwd8o7ul8re/JexbbOnjw13XNzcvldRhkXKnGttf7kdkeAsSTryuQsXz3S6E/p5v+q/Q0eft+Hxdi/jaR1nAY8cbh8WC/7uLf46RHJe0YdYrElDQKISAAkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgkAQcF4y4O2jLfJ4cJOt/NbrWoP3/M70xshGyEoTipRktNNbTITjdV83xcqGRXFprrS+aKZ7nlzvA38Hl/a8ZdWLKbaUE/kj56ZGLlV5VfXB912cfVG/Hyb6qvJh9x7rzKaxfA5bcl8tz9fLuW/qanI0fFpVkXqVXzL8C+eO4rw5arwzONcW7MXal/Cn3/ACNjA5u3ElHHzYOS/ifmkOPyPtGPGTfzL7y/xPa6qu+OpxT/ACM/Dc3F/PV1k1KHXbl5sIvdVsnKL902aFkJ4OTtJpJ9vqiyxsFY1spqacWtJa8j0zMVZNHTtKS7pkXjutpnLj5a+mdF0b6uuD36NezPeqbrsjL2KDHvnhW6nF69Yl1VZG2tTg9pmmGW52z5eO43c9LuFkZx3F7QZWY97ol3TcX5osoSU4qUXtMtYx2DYBCQI87rYUpOb6U3rqfkj0XfuvIGicY2QcJpOLWmmU1eTf4Y5F20Rc8O5pSU/Jd/T6lz6mFtddsHCyCkmtaZTLGWNMM9dOnxcqrMxq76Jqdc1tNHqcFg5GV4cynYnO/Ak9ThH9z2Z3OLlUZlEbseyNkJeUovsc1ljZ6bGwCoEkAGkjZAAAAAAAkAJCEAAlIAAAAAAAAAAAAAglAiTUIuUmopLbbfkQhJhffXj1StumoVx+9J+SOf5bxfh4L+Hjf61Z/uS0l+f+RxPJctm8nZ1ZV0pL0gu0V+SJaY8dydNz3jCDUsfjHCxNalc96X4f5nG2SlbJyslKcn5uTbbI0ZwrlZLUItv6Fe63mEwjzfZFtgYarjG2a+d90n6EY2BGiPXf0/Tb7J/wCJsVZVdtjhCW9HRx4Tfbn5eW2axXOC/wBj39We+zWw3+xPfZ0VwqzxH349L/iI7rj1rAx//Dj/AEOH52Ep8bNr9xqR2HBZMcriMWyLT/ZxT+j0c+ft04/FYkkElQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIJAHlkUQyKLKbY9VdkXGS90z5zz3EW+HcxX47c8Wz5V1Pun/C/0PpR4ZeJTmUSpyK1OuXmmQtjdPn1F0L6lOD7e3szN9+xr8pxuR4d5JTScsOT7S80035fRmxGUbKldS+quXk/b6HThn5TVZcmGv2xVl0f9H5fxa1qqS016fgWMJRnHqi+zIsqjdW4TXZ/yK+myWDb8G56rfdMiW4XtPWePXtZjZin1RUl5NbQNqw01s7EWQuqPaxLs9lZRkW4tvSuyT+Ze5eNv0Z45ONDIg9rUvcxzw+46MOXrWTOi+F8OqD17p+ZtY+TKh6feD8znJ0X4rU9Nd/vLyNvG5KMo6ven6SS8yMeT6pnw9bxdTGamk0+zJ2VOJmw7dMlKD89ehZxsUluPkX9sdWe0ZFSvqnVLymmjmKOUy8KfwJNThW3Fxa7/kzqUyj8QYO19rgu60p/h7mfJLrcbcOU341u4fM42VLobdM9fv8Al+pvKcJ94zUvwezhUl6r9S44nhLuVpbwsmuNkfv1uTj0/Xy8jKctbZ/55O3RtRlFqXdP3NXFzKvD96lVYljWS/aUtra+qPCvwRybl+1y4KPvGxv/AALziPCeJx16vtlPIuS7OetL8hlnuKeMn26CMlKKlHumtokhJJaS0kSZJAQSSAAAAAgAASAAIAAEgAAAAAAHndfXRW53TUIr1ZA9AVFvijhqk+rNrk16Q3J/pop8/wAcUqShx1Dm3+9amu/4EkxtdeaudyWJgVOeRfGGvTa3+hwOdyHO8o+mzrhDe4qCUF+vmaEuHzbH1T1KT9XPb/UnS0xn3XScl4384cfRJP8A7y3X/wDqc9n8/wAnyNfw8i+Pw++4xgkmaN1FuPP4dq1Jd/xPMrdx0Y4YybNd/YeSPbHxb8ltU1ylr1XoXPG8MqH8XKalNPtGL7L8SZhckZ8uOCi+Dc4qUapuL8mos9qXl1b+FTJb9ehnWp9K1HsvZCdqrg5Tl0xitts2/FpzX/RvrTmocfnZi+Lc3H0+bt/IzwowryLoQ9H23+BtXW5fM5TxOMTsjrcmu3579jzzMGXEc1LFbbi4pxk/Xt/nsiamS17xW+DNOpr1RsldhT6bXF+TXb8Te2zq24UZFauxrK3+/HRHgHNcLMnjrOzi+uO/0a/oZqTKrkoW4OZTyeItTre5e2vqY8k32348v+X0gFbwfL08xhRvqa60krIfwyLIyWSCCQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIBIA1ORwauQwrca+KcbItb15P3PnNlGR4f5OdGRCUseyTjGb8pL+L8e59QKrn+Hp5XBlCUf20E5VS3rUtf0I9drY36rkrIpJWVyVlUvuyXkzVvojkVuE/X113R58bZZRdLjc1KHQ2lvtqXt+Hsbltbqs6WjoxsznbHPG8eXSrovnhy+Den0LspfQsIyUkpRaafk0YX013wcbFv2+hoOd3HuKlLrq9BLcL2vqZzpZ7B5VXQuh1RZns1jCzV7JJNafdexrz4qvJm3TZGqz+Fr5WbDBXLCZLY8lxqqt47OxZNqubX8UHsyx+WycWffUl5dMzoMfK60oT7S8vxM7cXGs/tKK5fjExvHZ6rf80vyiqh4kekrMf8XGR7T5vCyap1WxshGS1tx3o95cVgv/8ALpfg2eUuFw29pWR/CRHjmmZcbnJJQk1GSkt9mvVHriZl2FkQvx5yjOLXk9b+j+hcS4Gh/dusX46ZVchgzwbel7lB/dlrzMbhcXTjyY5TT6LwviTC5WEYdaqyNfNVN99/T3LnR8YjOcJxnXJxlF7TT7ou+P8AFXKYb1ZcsqHtb5/qV2plw36fSwctieN8OyP+s49tMvL5fmRb43PcXkRTjmVR36TkoslncbFkDXhn4c/uZdMvwmn/AInor6H5XQ/5kEPQGHxqX/tYf8yJVtXpZH9UBkkToqcvnIVWOumtWa85N6Rpvnsnb1XWl+DNJhVPJ0WiDn4c/fv5662vZbRtVc9TJ6sqnB/TuLx2HlFsDl8rxth0znGvFyJuL85aimaN3jubWqcBJ/79u/6IyaTG307fRB88u8acpP8As40VL6Rb/qyuv8Q8vfvqz7Yp+kNR1+gWnFk+mX5+JjR6r8mmte8ppFZf4t4eiWllO1/8KLl/M+azstse7LJTl7y7juRtpOH+u8t8dYMXqqjIn+KUf8TRu8e3vfwMCC+s57/ochoE7XnDiuMzxTy2XJ/t3TF/u09v6lXZffdJyutsm3/FNs8w97Iq3hjGVdc7bFCuLlN+SRb0V08RQ7cpxdz7xhHuxx2OsGl5l++rXl7Ly/UzwMSXLXvLyf7KuXTGHv6l/hN1hllu9envi8XyfJ6yJXfZqX80PNvX4HjhWW1cjfjTu+LVVv5979jquUvr4zw/OyK1OyHw4aeultPy/A47Dg6sbT+9J9UmW4t5VllZJt58hCebmdda1CK6dv17+ZtcfxVS/aWfP7J+RPn2/kWVS6aor2R0fjk7Yfmy1p6JRitRSil6JaGzHZJbUZ7t9p3pN77Ips/JnyeRDAwoSnLr02n5v/I9eZz3TH7NWtysXza80jofBvh/7DV9vvl1XXQXTHX3V5/r5GOeX1HThjMZ5VY+GeEXC4Dqk4zulJynNL+S+hWeNOInkQhyNH38eOpRS7tb/wDc6wxsgpwlCS3GS00/VGeje6+ZUXK2EbIPZaY1ysr7/eXmeHN+G8jiJzy8Bu3G6u9ST6oL/FFZjcioT1JOEvVM3x5JrVUy499x0GyJJTi4ySafmn6nlVlUW1qStit+ja7GXxaf++h/zIm2M/HKNBY2bx2ZLK4u3W3uVW9J/T6ovIeMbKYL7fxttWl96Ek0/wACkzOYpofTWviy+j0l+ZtcV4fzeZnXlcnJ14z+b4WmpS+n0MspPp049z9nRcDzl3NSssWE6caPaNkp7cn+Bdo8cbGpxaY1UVxrrXlGK0j2KqJAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEBkkAch444b42Os/EqbyIySs6fWPfv+XYpuNvlyGG/iSi74Pp+rWu3+J9Hkk001tM+a8/h/9XudrnjqUqbI9aT/ABe0MbqryeU8WbTi2n2aIlFSjqSTXs/I2bYK+mOTD96Kk1+Jq77HXuVyd41oXYkqp9eK3H3jsyoz9y6L49M/LyNxnldRC+Oprv6SXmjO42dxtM8cprJ69W+68voNldi0Zcbr44tcro0d5dvJe57U8hVP5Z/LIY8m/aMuGzuNv1N3GyOt9E383o/c0l3W0Q3o09sr0ths1MbJ2uif5M2tkVBsicIWxcbIqcfZrZOyNka2mWz0o87hZwbsxE5R/gb7r8PcqpJxbjJNNejWjsdmvl4NGakrk015Sj5oxz4f46+P/RrrJyv0I6Yv03+JaZfDSoTsqs64rz6lpmn9ku1tRT/BmHjY6pyY5d7a6hH2Q6UvJHpKm2H3q5L8TFpx81oiyrS41CRnVJQsjJ7aUk/N+5jXGVs4wri5Sk9JLvtm7/ojkf8A9Df/AMhELIucu6z7JK3F+aT1pruU2Lbl5OSqq8qUbH5db82bWBTyuJ8n2HIcJPuuhmxl4atkrJ12UXL7r1rv9Ub3K5Tpy+MxvcYyhzWPLc6lbH6abMocpCL6MuuVE/aUWbfEchPInLGvWr6o7k15SXv+JZTrpyIuF9anF+67nP8AmyxuqZY43pVzqx8yHU4wsTX3l5lLyHGTxk7Ktyq9fdFzbwF+J8TK4234iiuqVU/P8vc8cPkYZc3TODhbp7i+6fub7x5IrLlhdz0538QbnL4X2O1Ti91zfb6Ff1Gdx103nPLHoN6MK1KVijFbfojoeI4ZXrc47l2b35IrekzkUOwfQ6+Oxa4pRrj/AMqRhmcRh5dPw5xcVve49minkXmj565aekZ4lnTm0SlpxU1vZd8p4UzMVO/GX2nHS6tx+9H8V/ic815muNjHO2zcdJzjlbj11QbcpzXb38y/4qiNX2enpSjHSa9zkuMyp5OZiVT03Cfn7o7LGfw8iuT9JIpzXdRjNYNPx1N9PH1JfLK1t/8Ar8yk8jofGuJZdh4+VVFzVE3KevSOu7/kc3VbG2tWRfZ+p0f59M+X02sWDlbvXZeZvGrgSTrk1329G0dNrm0Gvm5UcTHlZLz9F7s99opnVZ4g5avFxnqOu8vRa82Z5ZajXjw8ru+lh4S4eXJ58uQyVJV1T6o+0p73+iPoUVpJLyR4YGLHCwqceHlXBR3rW9LWzYMG2V2AAlVDSa7mhm8Jxue3LJw6pz/i1p/qiwANuas8EcRNvpjdD+7Z/mYR8C8WpbcsiS9utf5HUAjSfKqrA8P8Zgd6cSHX/FP5n+rLQkEoASAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEEgCCp8RcTDluNnVpK6K3XPXdMtzFkEurt814TJm5XYdvaVXZdX80e2VX8Kz5V8r8jV5ai3B8WTfdKy/rj9VJllnL9m/ZP+Rtx5I5cN3cVmRe6anPp6u+kt6POvMpnW25Ri9bcZPub3D8bPmuQrlFdWDVLdkmu0mv3fr5nbWcNx1zjK3ConJergtlcs7amYyTtzngTHlO/OzJwahbqMN+TW2XXJ+GeN5H5pVfBs/jq1Fv8fRlrTTXRXGuqEYQitKMVpI9DNNvb5vynA8nxFjeOp5WOlvcY71+JoY+bG3tNKEvxPq+im5jw5g8nVJumNd/fVsFp7+vuWmVnousvbi+2uzNvHyPKE/yZp8hwvJ8LZuUXfj/95WtrX1XoeVWVVcl0S0/Zm+PJMvbLLis7i7INXGyd/JY+/o2bRZkbGwCAaUlqS2n5lTl1PFtU4v8AZTeun2LY8smtW41sdbbi9fiRV8Lqq59K+9rRp4VP+kOVor18kprev4UeV1/VhxjJ/P1aaX0Ol8H4XRhTyrIasnLUG/4dHPyZy9O3h47j2v41VwSUa4rXlpIyaW/IyjCc3qKPeGHJ95P9DH22ucjX0vY8cnHryapQlFbflJ+jN2eHYn8skzwlCUdqSZM3EeWOTjYwlic3BLzlL4Uv/X5F7rRq8t8O/mMeqvp+LU/i2fhrRu10XW/cg39dGPJN3bHKabvHSfXXvz2U/izj6MC3G5HGgoTnd0WRS7PfqdJhYXwEpWfeXkjmfF+dXmZONg0TU3XPqnp7UfxNOHpRSeJJLopj69TZRJPaSN3m8uOVlpVvcIdkauMt3wX+8jbO7Vxna44rB6GrLFuxv5V7HY4FMcfGUUvmfdsq+MrU8ruvLRd77HLld1e0Y2QCqjYxruiSi+8H6M53xZ4cqjj2chgwcZJ7sriuzXukXaN/GtVtTrkt9tP6ovjVpXyPGunRbG2HacXtHdcdyGNnY0bFZCM9JTi5LaZS+LuCfH2/asaHTjT0tL91nNrs/wDzL3HyX3PT6ZfzeDTiTqunXd8vT8OL25fQ4+2FFl7sox/s9b8qlJtI8MF1yr+WKUl5m0dfDxyTbn5MtdNrAkluH5o3Ctol0XRbfYsfQ2YtLlsh4+J1R11T+U6DwTxP2PA+1X1JZFrepNd1Dtpf4lBTiS5bxDTh+dVTVti949v8z6JGKitLsjnzu66Z1jpkACiAEgkQSAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACCSH5dgPnnjO6uHiDHl1dq4/P/u/Ns9cXjc7xD06i8bB8/iv70/TsjoKvC2JLkLc7NnPJtsm5qMvux7+WvUvIVwriowioxXkktJETppcpprcdgUcdixx8aPTXH+ZtjQ0SzCSCQBBJAENJo4Dxhw+JhXQycaUoWX2JOH7q8+69jv29LZ8z5bOlzPiOUVLqx65dMEvZepC+DRpzJKfw7l067bLfGyV0qM3+DNHLx65uUdaafaSNSu6eLP4dr3B+TN8bcfbPKY59x0bJNXFvU0ouW/Z+5tF2FmukBd+zIJ9QmOdpwLM7kp41KSfnJv0SPoeFidNMKofchFRT/A5biYpeKmo9nZVo72uCrj0pHFlO3fc9YohBQikjIMEMgxnWrItMklA9Ofy+NtxsieXhutZM9KTsjuMkvT6ehry5rn61qXE0zfvC3sdDmRTq36o0CtbYyZTdUXJZvPZHH3yyIY+JR0PqUHuTOJjk2Q+JGEmlNdLfqzvfE10auGui3pz1FfqfPPqWxV5ZMZ0Gzhx3kV/3kaxucet5NS/3iaz4+3Z8Ot32P6di2KziNQdk5NJeRvTya4/dfUc19lj1BrPL9o/qetNjs9NCVGnqj0pl0Wxf17mrOdsZNRr2vcxcsl/7NE7NLfkMOrPxJY9y3CXc+W85xdnE57ol3T+aL90fRauRthHV1O0vWJX+IcTE5fGc4vWRXF9K8m/oaY5rRwWLe6rE/1LiM1Nbi9oorISrtlCa1KL019TYxcl1S03uPsdPHyaqueEyi1bZZVS6qYvfoVkWpx6ovaPfGt+HuMvuv8AkdO9xza1XrwuXPB5nJzVX8RNdDW/KO1vX17Hc4HJYvIV9eNappea8nH8UcTiwjFSl6ylvsevQ4z+JVKVVn8UHpmNwa3OO9ByWNznIY+oz6cmC8+r5Za/H1LnG57Cu1Gyz4M/axNLf4lLLEy7WhJ512wsj1VzjOPvF7MyEpBBIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIJAEEgAAAAAAEAGlyvIQ4zAtyre8YLsvd+iApfGXOf6PxPsdE/wDWL4tPXnCOvM5nhMWNdPxpR1KfZP6Gnk33c/ys7prp6mnr+GK8kXb6aaUl2UFpFuOW3a3JZhjr7aeV/bSfuzWuqjbHpkvwZ7Tm5ycn5swOmzpyzKy7aOPbLFv+HY3r0bOgovjdHaff1RUZNKuqa8mu6ZHE5TjNwl2cez/AynV1W2U855RdkkLTW0SXYx48St+Lqv8Awpf0O99ThfDqV/i+zTTVdDf9DuTky9uu+oAAqBKIARXjl/2LNAsMt/sWV0pqC6pPSXdkOji9ON8Y5fxMuvHi9quPzafbb/8AY5nRtchkPJzrrn+/NyS9ltmsTGXLd1CRYcUv9br+m3/I0EWnD17vlLXaMfMX0cf26Cv404dFSfnvaNmjjsiT6rJ6/M9J5WHxWJCdzcZSS7R7tmjZ4gy8l/6nRGuv+O17b/JGGkavtdLHrqj12yTS89vSRr3c3xlHZ5FbftD5v6FBdTZlycs2+dz9uyiZV001/LXCMfwHincWsvEuD+5Vkz/u19jH/rLT5/Ysv9EaUa5S0ops9fsl+vuNfiOkbjcx/FWHXb1WY2TFevybN+rxDwWW0nZCEm/K2HS0UUsa2K20n+DNa3EptX7SCb9yZpM02PFfDUzguQ49RnCX9r0PevqciuyOghjW4sLfsV8oKyLjOL8mvYo7qpVScZLTRpjYm4/cZU3ypluLaRY1ZtViSbafrsqNGcPPv5G0ysZ6mV7X9Vrg9wl5m1HMhr513+hlxXh2rlePhlYGXKm3bU67F1RT/EjJ8P8AMYcXJ01XxXrXPX8mazkn2yvH309IWwsXyyMtb3vuvqUn2uNdnRdCdU1/EvU3qcx6W/mj7mksvpTLG4rTElChvplZTv8Afqemvy8mdBVyFmLCCzE7K3rWTD7v/wBS9DmE1KO13Rd8TkRux3iW99bWn+9F+hTLGfSPOx0EWpJNPaZJR8XkW4fIS4u1qVSh1Y8vXS80/wANl4jFtLubSAAkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgADGyarg5SaUYrbb9D5l4k5u/mcv4NT/1aE9VqP7/ANWWvjLxCrJWcZiy3FL9tJPz7/dKfhsCVb+PYlrXyR9iJLldRpNYzyrd4zFWNjJSjqyXeTfp9DyyLnZNxj9xfzPbLu1+zi+/qah1Y4+PTlyyuV2gAksoaNKWqs5NdlJdzdNa1fEy4Qit9PdlM23H9rnGe6YmV0/h0WT392LZGPBwrin7Gjb8XluQhx+KpOPUuuSXZLem39CM8vGK4Y+VW/gPDlKeRyVifVNuuP1XZ/4HYnli4teHjwppiowgtJI9Tkro9gBBAkAlEjVzn+zj+JyvizPeNixormlZa1v3Uf8A0jo82xOb35RR838SZ8MzlJ2VvcYpQi/ov/cr9t8OsdqqT7sGJki7mt3UpFpgSapVdL/bTn3f8MfcrFsveKpUcf4nbcyuTXDqNivFhGSlLdk/4p92e2u2idkFFLQuMDEp+BGycFKTW+5T/Qu8DKpnRCvqSnFJafYrUNxKKWlFJDz9CD0oaV0N+SZUeOTj6rcpQ17Mr3p+aRdcxfFY3QpJybW0n5IpDPJaMXVXJNOK7+xQ87jxhBOK24vW/odBtJbfZHPeIM2m7ppr7uL+aS8i/HbtfGKR9nohheew020l5s6vTG3t0Hg3kVgcwo2T1Xkar032T32f9T6aj5fynFvE4TDvjHpt3qbX5tfod34b5NcpxML/AN6L+HP8UkMMpWnJPtvZWFjZlbhkUV2JrXzR2cR4i4evhbqbcVy+BfJxcH3UX9DvjkfG+TC1YuJW1KyNnxJpfurWlv8AU1x9sv8A6q8KW4OPt3LDAk4Z1El/Gl+vY0cSt11fMtNvZY8bS7cyt6+WElJv0Wu5vXNkseTn8Hl+JmvvO6UPyce5fnJ4uR/prxTXOhOWLgKW5+kpNaWjrEc9b4zWPaQQSQsAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEEkACh8Vc5Lh8KPwVGWRa9QUvJe70W+ZlVYeNZfdLUK4uTPlPKZuRzfJu57cpdox9IrRFrTDHfdMLGs5DMdt0nJdXVOT/AHmXuRYqYJQ7N+X0GJTDFx4Qj2SW3+JpWzdljlvt6HRx4aYcvJ5XUYttybfdsEEmjICB5ZNvwa213k/JC9Jk3dItuamq611WS9DcxMGOPJ3XzTk/X0Q43FVNSvsW7prb+iPLKslkS1JtVr91Gere2tsk0xzORtuk6sf5Y+Up/Q6TwVx0asazOk+qy1uCk/ZP/E5iaVdMuha0ux3XhZa8PYb94b/Vsy5Jq9r42ePS22QAYpAAEp8jGclGLZWeJciWLwOXZXNwmoajJPTTbNfisx28BjznY5PoUZSfn2S3shMx20PE3ITw+OlOv790nWn7Jp90fPZ7bLbxDnyzM+1Rm3VCXTBe3uyp8xIvyXU1EJGUPMhErsy7nZvszZxc63GaUe8P4WaoIsXxy0v6OQqyHr7j+rNpHLLfue1eTfUvltml7bK+K3VdIT3T2uzKKPKXprck/o0eq5ab84R/IrYnwX0M/KhHpja9fXue1fJZTklKSafbyOcfKz9IR/MwfK5G9x6I+3bZXxT4Ovk5TfU25M1snMoxU3bZFNfuprq/Q5S3kcu1ank2a9k9Gq5yb23v3b8ys4u1tSLjO566+Drogqq3tbfeT/yKZtyf+YGjbHCRnln9RPoe/HVfH5PFr9JWR3+GzXfZHReEMJSsty7IrUNRh+JGeXjFJNuj5LFjl4NtKSbcW479H6Ff/wBHua4q/AkkvO5P69k1/It/nk/k01H734HJWXz8P+IpXVR2umTS901/mY8OV326LPKadj4g59cU66Ka1Zk2/dTfaP1ZzSpsvyJ5WXLqum+qX0/yPPEpsnZLNyn15Fr6up9+n10vYyUcjk81YGF8kn81lntHyPQmse65b3dR63ZFVEHO2ail7+pnxr5HmYSowV9lxJdrMmSfVL+6X2D4V4+iSsyYPLuX71z2l+XkXcK4wiowioxXZJdkitztJjI1eM4zF4vHVOLBRSXeT85P3bN0aBVKQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIYK/nc3/R/E5GRF6nGGof3n2QJ25Hxzy9OW4YFMur4U27H3XzLskvfzZrcHgSxuOeXfFqy99NafpBeb/Ur+CwHzXLuF1m2m7rG15rfdfzOr5lwWXGmqKjXVHpSXkiePHd3U8ufjPCKvKko1NLzfZI0XCSW+l699FlKKbTaW0eWTPpr15uR1OVogAA3pbfkeWFR9ry5Xy/s63pezYypOONNr2Nzh61Xx8dectyZTLu6bY9Y+Tbtb+DL8CtLSSUoOL9UV1tfwpdL7loyeNy/Yz/AAO68LtPw9haflDT/FNnEPuXXhHlvg3y4y7UY95VSb89vy/mY80bcXp2RA9Qc7QAASovGj//AJdv2t7lBf8A+SORq5b7P4eWHWlK26U017J+p1XjefTwNi/isiv5/wDkcj4f437dlxts7U0yTe1vqfsRW3H8VLfXZTP4dkXFr0Z5nbc9w1eXX8iULI/dlrz+hxdtU6LXXbFxmvRomZT0xzl3tCDI2SWUSmZIwJTAzDITBAENexOhomG0aY0zLQ0DdYa7kk67khIgCHIhCeiU2oxTcm9JI+hcbQ8bjMaqUVGUa11L6677OY8L8d9ryPtVn9lVLWtfeejsq4N2Qjrab7nPy3yuo1wjLIyaOO4md+VNQTT1vzb12SOMrhZyuas7JSUYtJR9Hr0N/wAT8k+Rznx1aSpx5qTknvqev/NkYMUqGl2SkdfFxz2zzz8YnLvWPizm3ppdt+5deDOJniY0s25ftclKWn6R/wDPzObzIrI5bj8SSbjZaupe6bSPpFdcaq41wWoxSSX0LZ3dJ+uP/wBZEgFUABIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQz59465KV2fDCrm/h1R3NLycm/8D6CfJc2H2nxRfV3aty5Q+veWiuTTj92us8G8Z9kwHlzX7TISa/umvlzdmXZJ+rOorgqaYVryhFRX5I5Wx7sk17nRhNOG5eWdrznNQg5P0K2c5Te2/M9MmTldJPyXZHl6GiwACR5ZMHZRKK82jY4fIi6FRN9M4e/bsYHjdjV3d5J9S9UymU720xss8au9I87qVbHv2a8mVXFVchlZUsfAmrHWm9T0k/zZcLA52EumzAjPt5wmik5J9rZcWvTReNan2WzWupl1xnD5La5KUZa7pryLayOXT2vwb4a83raPD/SGPF9MnNS9U4vsWueNmlZjljeljxHi51L4PMqcZ77XKO0/wAUjqqb6b4KdVkZxa2tM4aN1OR8q3Je2jSWFTXkdeFfKm5Pa0/Uwywn01l37fSgcbjeIOYxYxWTj05FcfOSfTNr3LXG8XcXa1C6cqLH+7OL1+utFNVLW8ey1xEY+9kf8TQ8JL/stv8A4sv8D08e5Vc8fHqhJPqan29jHwmv+yX/AOJIhvj8VzbWrIdLKXk+Kx8uTVsNWJaU0/IuzGyuNnn5+5XPD7im99PnWfxOVhSe4dcPSUe5orfr2Z9JdcqppyXy7K/k/DmNm9dlW6rn36l3T/Ipjy66yVuDiNjyN/O4POwV12V9Vf8AEmmV7NZlKprTLZkvI8u5lElD02hsxLDG4LksumNtNK6H5OUkti2T2a20Rs3cvheQw6+u6n5F5uMk9GhsjcqdMtoNo3cbheQy6lZTT8j9ZNI187AyePujXlQ6JSW13T2vyG4h5eaJppnfbGqqLlNvSMF3aS8zrfC3FSxo/bbnqdkdQj7R9yM85jFsZtb8Zhw4/ChRBJPScnvzl6s37lLG4nMydrrVUpR+i0Y1Uu2fTp9PlJnpzS14fzlH/uH/AEMuLDf7Vpb9R8/wVKUZXWPc5vbfuW2E/wBnJfUrcTX2WvXsbePZ8Ke35ep6WE/Vx8l3k9MCKs8XYbl36Zdv5n0U+cUWrG8T8ffv5LJqO/x7f4n0fe0YZe299RkCCSEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACD5RBNeMkn/+v/8A+z6ufNeTxP8AR3jKqy16hZkxuUtdtOW3+hWtMPt3uRONVdllklGEYttv0ONx8iGXGVtX3erXc2eYyb+bnmV41k6sHErlKc15XP0jtenmU/h7/wCFsX+9v8DbHLvTm/FrHyZ3/wBtP8TA9sqOsiR5aOhmxDMiGgIPPIsVVTk/P0R6aNHlJLUa13fn/kZ53Ua8ePlk6zwJgqGNZmtblb8q/BM616NHhMZYnD4lOtNVpv8AF93/AFN4429u6jS9iHXB+cI/ojIAYfAq/wC7h/yowtwcW5atoql6d4raPYkbQ5zkeDWLTO/GnOcY/NKufft9GUjrozKVJxUoye09dzvZJSi1Lun6HE59McTn78erUanBTjBfus1wyluqpl1GiuEqyZxqWRZX1PUep7jF/gWfh/pxKrMC19N9dknprXUt+aM+OrdubUtdlLb/AARZ83j0R4+7L6Ixux4OcLF2a19f8C+WMnpXHnu/Gs9A88efxceqx+c4J/yPQxdA0mj2+zRurUoy09d0zxNjFnp9Df4FbhMvaN1q2Uyh2nHt+HZlRmeHuPzJubjKqT/7vsmdW0mtNbPGzGrnvUel+5llxZY/Gkyl9vnXI+GL8SPXjyeTH1UY6a/IqYUSdrrknCa9JLTPp9mNZD06l9DTvwMW+TldjVyn/E4/N+pX8tx6qfGOIwOP+LyGPCbTg7Fv6o6vnORv42qr7LXXJybXzLskl6Gpfwd9F32jDt6lF7jB/eX5+pvfbsbIhCOdQ6pe18e2/dbKZZ7u2sximr8SZ7sircWmcW+6imm/5lnXweFPJhnTqlVLSk6XpxT16o9vicTR+0h9n6l3+XTe/oV/+npfa3Lpbx9a6O2/xK+V+k+G3pnc9ZXc68OFcoRX3ppvb/kZc1RXyPFV5M0lKEer5frrY/0txjXfEb+rgj1jd/pWn4GPU66N6m2tdvZaI8rDxim4Ph6cnMVljkoValpd03vsjsNN9ox236JeR5U0149ca6oJLy1Fd3/mWWLR8NKya+d+X0RbGXkuqpnZPTOir4Mdb233bZGbVC/Bvosk1G2twbXn3R7Sko95PSK7JucpNbffyR23WEZSbu3CW028TfLHvT+FF/JZrsz1jOMl8rT/AAO0qxKcpKORTG2Ee+px2tmjneFMS2L+xTliS89Jtx3+Bbi5LrtXPCZOYuh8SvWu6+79GdB4a8S2fEjgcnKFcYRUa7pvvN+z+po5Ph3ksPHtveRTbXXFzfdp6S9iqxqreShJ047tcV3Ue8vx0u+i2VlqccbJp9UUk12aJPnOBl+JOOsSWNm307+5ZVJ/o9djseJ5a3O+W7jsvFkl3dsNR/UoXHS1JIRJKoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIKfxJw0eV4+UYdsiCbqe/X2LkgJl05vjcG2jwhZj2R1b8G1Na9dyOR8PS+W2G/JJn1CceqLT8mtM+YY9P2DnrsV+jcP5Jie197xsbuZH51L3RrG9kw6qn7o0UdkcQNghruSBr4GJPlOcqqj91SUpf3U1szyrPhY8pLz8kXf/AEfYfUsnNku71XHf6s5ea/Tp4cdTydolqKQAMFgEEkJADGdsaoOc5KMYrbbfZEoY5N0cfGtvnvpqg5y17JbOAWU+V5q/OhuNc1qCfZ9KXbaNrmOayOWyLcXF+XDhJqU4v76+v0NWrK4/CbTsdj1pQrW23/gjXCSdozxutSOn4OtRxZ3zety1uXZJFTynJrmcyHG4DcqFL/WJtdmt+Sf5M57muYzM+xV3RePXGKXwU2lrz7r1Ou4jEqxOOoVcFFzgpT+raIyy2Yf5/H9sm3CCrjGEPuxSSMmT6GJVolBPUk15ogkFb9Nishv1MjQqsdcto34yUopryZaKWJ2YTrhZ96Pf3MyCLJfaO2pPEkt9DTX1NLIpjdB13w6l6plyYyjGa1JJr6mGXBL6XmdcJyfDzxZStpXVT5rb20Vnb3PoF1dalqD2vUrXxWI8n43w47T21rszny3j1XTjmoeN4mzMfXNONO+78n+R01NcKK4V1LUY+S9WTGyqVyohOLsflGPn+hYY+L8OPVNfPr28mThjc6zzzRi4zhqyaW/3V7f+ZtA1cq/pXSnperO2YzBh7eeVkJ+X3fL8WeFFLsm9bfV5t+hhGMp2LUdv91fQtKK1XWku79X7mPfJf/FvjGcYqEVGK0l2RIB0SKbYX1LIxraZfdsi4P8ABo4Lh8j/AKv+KLKrP7OU/hP6JtNM+gHHeO8SMFj5UUk3Lpel+f8AgVyaYfx3RJQ+D8+zP4OErXuyqbrk/fXdfyZfImM7NXSDIAlAAAIJIJAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAA+ceMq/sniZXrsrYxnvXt2Z9HOP8A+kHDdmLj5i1+xk4S37S/80RV8PbXWpQT3tMrbYOuyUX5b7G3w0p5fHw6ITk6/ll0x2e2Xg5Flfy0W9S8vkZ1Y5zTmyxsqrDPf7Dla/8Ah7//ALUv8g8LJjFt496SW9/Da1/It5xWY1VcjJ6hXHbbe9I+heFsT7FwWNU49M5R65J+77nC8HQ+T8RUQbTjCfW/wj3Pp8Y9KSRx53ddetYyAJGimqhGgToaHZthNuMG1FyaXkvU4nmX4g5jIddWDkY+MvlcG9KX1l7nc6DfZk6qZlquDx/CuVCEftGe4Jpbqh/R+hbYfD4GJBKGNXKS/elFNllNTnZJ9Mu735HnanXXKXS+y33RR042PnvLSeZy9nS9uU+lfl2O+pWsamOvKCX8jguLh9o5qhLu529X+J9BhXZ8OPyS8v4WWxivLYjZB6fDn/BL/lZHw5/wS/5WWY7YAz+HP+CX/Kx8Of8ABL/lYPJie1Fzg1F/dZ5/Dn/BP/lY+HP+CX/KydFu1htEHhQ5p9MoT179Js9L9m/yLKoNXIu0+mD/ABZ7XOUYtRhJt/QrrI2t9EYT36vpZXPLUTiyc+779vcpuX5JUwlRTL9rLtJp/dLO/wCJi48pqi2bS7KMG22czjcbl5WeviUWx65dUpSg9HH3ld1rNNamWRGz4qdil6TSey84nn7cfdebKdsW+0pecS1hjfCrjXClqMfL5Sq5rjG4Rtoos3+8owfctjnd6hdV0X26i6lSx7Yz327PbRqT030y7r1KDgasqjOthKi9Kdfm62l59u7R0Hwp+bhLb83ovyZ3WlJI2KJwqq63pzf66POzKsk/l+RfQ8/hT/gl+h43XKl6lVkP+5TKX+Bh+TPWotqPdW2+lkkbWPk9fy2NJ+/uaNLd1fXCu1LetSraf6Mz+HNfuT/5WThyZS9osi0KnxRirL4icejqlFNx7d09MtKU/hQ2nvXfsRkVuVE10venrsdlu8VJdVxngHOdOdPCnN9FsHOEd9upa3/I+gHyjPjZwvOuVfy/CkpLXtr/ACPqePbG6iu2P3ZxUl+DIwu4tyTvb1BBJdkAAAAAAAAAAAAAAAAAAAAAAAAAAD//2Q=="

/***/ }),

/***/ 116:
/*!***************************************************!*\
  !*** D:/WebCode/uniVideo/assets/img/icon/2-q.jpg ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/jpeg;base64,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"

/***/ }),

/***/ 117:
/*!***************************************************!*\
  !*** D:/WebCode/uniVideo/assets/img/icon/2-h.jpg ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gIoSUNDX1BST0ZJTEUAAQEAAAIYAAAAAAIQAABtbnRyUkdCIFhZWiAAAAAAAAAAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAAHRyWFlaAAABZAAAABRnWFlaAAABeAAAABRiWFlaAAABjAAAABRyVFJDAAABoAAAAChnVFJDAAABoAAAAChiVFJDAAABoAAAACh3dHB0AAAByAAAABRjcHJ0AAAB3AAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAFgAAAAcAHMAUgBHAEIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFhZWiAAAAAAAABvogAAOPUAAAOQWFlaIAAAAAAAAGKZAAC3hQAAGNpYWVogAAAAAAAAJKAAAA+EAAC2z3BhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABYWVogAAAAAAAA9tYAAQAAAADTLW1sdWMAAAAAAAAAAQAAAAxlblVTAAAAIAAAABwARwBvAG8AZwBsAGUAIABJAG4AYwAuACAAMgAwADEANv/bAEMABgQFBgUEBgYFBgcHBggKEAoKCQkKFA4PDBAXFBgYFxQWFhodJR8aGyMcFhYgLCAjJicpKikZHy0wLSgwJSgpKP/bAEMBBwcHCggKEwoKEygaFhooKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKP/AABEIAi8CLwMBIgACEQEDEQH/xAAdAAEAAAcBAQAAAAAAAAAAAAAAAQIDBAUGBwgJ/8QAWRAAAQMDAgMEBQgECQcKBAcAAQACAwQFEQYSByExEyJBURQyUmFxCCNCYnKBgpEVM0OSFiQ0oaKxwcLSJVNjsrPh8BdEVnOTlNHi8fIYJjWENlRkdHWDo//EABoBAQADAQEBAAAAAAAAAAAAAAABAgMEBQb/xAAnEQEAAgICAgICAwEAAwAAAAAAAQIDEQQSITETIjJBBRRRQiNSYf/aAAwDAQACEQMRAD8A9UoiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIipyStjYXPOAEFTKxdxu1FbuVZURxuPqszlzvgFrM99rb/ADej6a2Moh3Za5/X8DfFXdp0/SW6d1S7fVVj/XnnO5zgubJyK0nTStNh1PVzguobVN2Q6vqHdmCqtHPea2BsnpVHC76TGRO5fvc1jL5XGsuMFtgf1dz9y2FluY1gELnNLemTnKy+butNdKbae5kf/Uxn/qeSm7C6taGiup5HeAfT/wDmUwqvRxtlByFA3aAdchT315R1UHXK40pxVW0SsHV9NJk/uqtb9R26rm7ESmGbxjmGwqZl0ppHhrXc1Quduo7mzFVDHJ8BlPmmE9WwKIXPG019029rrZM+6W5v/NJj860fVctrsV9pLxT9pSuLXN/WRv5Oj+IXRjyReNs7V0zQRAUWioiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiKQREQEREBERAREQEREBERAREQEREBERAREQERCEErnYWgVU82r6t1O14jsUBxLjrVO9n7KyOs6yeoqKey0B+dqf1pH0WK8ip4qGjigpmhkMTdrWgdFwcvkRSNQ2x02mYI6SFscTQ1gGGgLUtQ6vMJkpqE75PaBWN1PeJblVfo61kvySJJPNV36ehtWnKgvbul283BeNOff5OitdLnh3BLW1c9wqjuf0GT0XQN60zhvys7x9ZbeFMZ/8VvHlLVRidhHIO8CsVGyHtCyZuVmQsdc4WhplHguqnIi1dSppa1Nrjfl0J2u8FYfx2gdkkvYstQziaEHPMK5cA4YcMhUjNqdStELS33JlSdj+673q3vVm7WUV1qPotyZz3tP636rvNRraEY7Sn7rxz5KFquYkPYzjbIOQJ8VvXNH6RNNslpm/NuTHU9UOxuEXKSI/2LPrS9Q0BfsuFCezucBDoyDgSfVcs1pq9w3y2R1ULXRv6SRO6xu8QV6GDPGSNMbU0zKKAOVFdLORERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREEUREBERAREQEREBERAREQEREBERAREQEREBERAVOeVsMTnu9UdVUPRatxDr3UOmKgsPflcIm/es721G01jc6Y3SJfWu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"

/***/ }),

/***/ 118:
/*!***************************************************!*\
  !*** D:/WebCode/uniVideo/assets/img/icon/3-q.jpg ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/jpeg;base64,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"

/***/ }),

/***/ 119:
/*!***************************************************!*\
  !*** D:/WebCode/uniVideo/assets/img/icon/3-h.jpg ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gIoSUNDX1BST0ZJTEUAAQEAAAIYAAAAAAIQAABtbnRyUkdCIFhZWiAAAAAAAAAAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAAHRyWFlaAAABZAAAABRnWFlaAAABeAAAABRiWFlaAAABjAAAABRyVFJDAAABoAAAAChnVFJDAAABoAAAAChiVFJDAAABoAAAACh3dHB0AAAByAAAABRjcHJ0AAAB3AAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAFgAAAAcAHMAUgBHAEIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFhZWiAAAAAAAABvogAAOPUAAAOQWFlaIAAAAAAAAGKZAAC3hQAAGNpYWVogAAAAAAAAJKAAAA+EAAC2z3BhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABYWVogAAAAAAAA9tYAAQAAAADTLW1sdWMAAAAAAAAAAQAAAAxlblVTAAAAIAAAABwARwBvAG8AZwBsAGUAIABJAG4AYwAuACAAMgAwADEANv/bAEMAEAsMDgwKEA4NDhIREBMYKBoYFhYYMSMlHSg6Mz08OTM4N0BIXE5ARFdFNzhQbVFXX2JnaGc+TXF5cGR4XGVnY//bAEMBERISGBUYLxoaL2NCOEJjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY//AABEIAoACgAMBIgACEQEDEQH/xAAbAAEAAQUBAAAAAAAAAAAAAAAABgEDBAUHAv/EAEsQAAEDAwAGBgcEBwYGAQUBAAEAAgMEBREGEiExQVETFCIyYXEjQlKBkaHBYnKx0RUkM0NTY+E0NXOCkvEWJUSDsvCiByY2VJPC/8QAGQEBAQEBAQEAAAAAAAAAAAAAAAECAwQF/8QAIxEBAQACAgMBAAMBAQEAAAAAAAECERIxAyFBUQQTYSIyFP/aAAwDAQACEQMRAD8An6IiAiIgIiICIiAiKiCqIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiILcryyJ72jJa0kBQGl0xuEVUX1AbLETtZjGPIroJ3Lld8pOpXiphA7IflvkdoWa3hJXSbdcaa5Uwmpn6zeI4tPistcotdzqLXVCend4ObwcOS6TarnBdKQTwO8HNO9p5JLtMsdM9ERaZEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBc/05iDLxHIBskhHxBP8ART9Q3T+LbRy/eb+Claw7aZ1o6exRXClGSzLZm+XrLGs91ltVa2ePaw7Hs9oKSaDTa1NVU7tuHB2PNarSeyfo+pNRA39WlP8ApPJZdP8AE+o6qKtpmTwO1o3jIWQudaK3s26r6vO79WlO37Dua6IDkDC1K5WaVREVQREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAUV08Zm2U7+LZcfIqVKN6cNzZGnlK38CpVx7aLQiTVu8rOD4j8iFNaymirKWSnmbrMeMKB6HnF+j8WOC6EpHS9uV3Khkt1dJTy+qeyeY5qaaH3frtH1SZ3poB2c+s1NLrWKyg6zG300G3ZxbxULttbJbq6Kpj3sO0cxxCnVLNx1pFZpp2VNPHNEcskaHAq8tuQiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAo7pv8A3F/3GqRKL6dyatqhjztfL+AKlXHtHtEf7/i+678F0Nc/0NZrXwH2Y3FT5zw0tB9Y4UjpVSA4EEZBXNL/AG/9HXSSID0bu2zyK6Yo3ppQ9Nb21TR24Dt+6UpHjQe49JTyUMju1H22fd4hS1cqslab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"

/***/ }),

/***/ 12:
/*!*********************************************************************!*\
  !*** D:/WebCode/uniVideo/node_modules/uview-ui/libs/mixin/mixin.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(uni) {module.exports = {
  data: function data() {
    return {};
  },
  onLoad: function onLoad() {
    // getRect挂载到$u上，因为这方法需要使用in(this)，所以无法把它独立成一个单独的文件导出
    this.$u.getRect = this.$uGetRect;
  },
  methods: {
    // 查询节点信息
    // 目前此方法在支付宝小程序中无法获取组件跟接点的尺寸，为支付宝的bug(2020-07-21)
    // 解决办法为在组件根部再套一个没有任何作用的view元素
    $uGetRect: function $uGetRect(selector, all) {var _this = this;
      return new Promise(function (resolve) {
        uni.createSelectorQuery().
        in(_this)[all ? 'selectAll' : 'select'](selector).
        boundingClientRect(function (rect) {
          if (all && Array.isArray(rect) && rect.length) {
            resolve(rect);
          }
          if (!all && rect) {
            resolve(rect);
          }
        }).
        exec();
      });
    },
    getParentData: function getParentData() {var _this2 = this;var parentName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      // 避免在created中去定义parent变量
      if (!this.parent) this.parent = false;
      // 这里的本质原理是，通过获取父组件实例(也即u-radio-group的this)
      // 将父组件this中对应的参数，赋值给本组件(u-radio的this)的parentData对象中对应的属性
      // 之所以需要这么做，是因为所有端中，头条小程序不支持通过this.parent.xxx去监听父组件参数的变化
      this.parent = this.$u.$parent.call(this, parentName);
      if (this.parent) {
        // 历遍parentData中的属性，将parent中的同名属性赋值给parentData
        Object.keys(this.parentData).map(function (key) {
          _this2.parentData[key] = _this2.parent[key];
        });
      }
    },
    // 阻止事件冒泡
    preventEvent: function preventEvent(e) {
      e && e.stopPropagation && e.stopPropagation();
    } },

  onReachBottom: function onReachBottom() {
    uni.$emit('uOnReachBottom');
  },
  beforeDestroy: function beforeDestroy() {var _this3 = this;
    // 判断当前页面是否存在parent和chldren，一般在checkbox和checkbox-group父子联动的场景会有此情况
    // 组件销毁时，移除子组件在父组件children数组中的实例，释放资源，避免数据混乱
    if (this.parent && uni.$u.test.array(this.parent.children)) {
      // 组件销毁时，移除父组件中的children数组中对应的实例
      var childrenList = this.parent.children;
      childrenList.map(function (child, index) {
        // 如果相等，则移除
        if (child === _this3) {
          childrenList.splice(index, 1);
        }
      });
    }
  } };
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 120:
/*!***************************************************!*\
  !*** D:/WebCode/uniVideo/assets/img/icon/4-q.jpg ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/jpeg;base64,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"

/***/ }),

/***/ 121:
/*!***************************************************!*\
  !*** D:/WebCode/uniVideo/assets/img/icon/4-h.jpg ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/assets/img/icon/4-h.jpg";

/***/ }),

/***/ 13:
/*!***********************************************************************!*\
  !*** D:/WebCode/uniVideo/node_modules/uview-ui/libs/request/index.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _deepMerge = _interopRequireDefault(__webpack_require__(/*! ../function/deepMerge */ 14));
var _test = _interopRequireDefault(__webpack_require__(/*! ../function/test */ 16));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}var
Request = /*#__PURE__*/function () {_createClass(Request, [{ key: "setConfig",
    // 设置全局默认配置
    value: function setConfig(customConfig) {
      // 深度合并对象，否则会造成对象深层属性丢失
      this.config = (0, _deepMerge.default)(this.config, customConfig);
    }

    // 主要请求部分
  }, { key: "request", value: function request() {var _this = this;var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      // 检查请求拦截
      if (this.interceptor.request && typeof this.interceptor.request === 'function') {
        var tmpConfig = {};
        var interceptorRequest = this.interceptor.request(options);
        if (interceptorRequest === false) {
          // 返回一个处于pending状态中的Promise，来取消原promise，避免进入then()回调
          return new Promise(function () {});
        }
        this.options = interceptorRequest;
      }
      options.dataType = options.dataType || this.config.dataType;
      options.responseType = options.responseType || this.config.responseType;
      options.url = options.url || '';
      options.params = options.params || {};
      options.header = Object.assign({}, this.config.header, options.header);
      options.method = options.method || this.config.method;

      return new Promise(function (resolve, reject) {
        options.complete = function (response) {
          // 请求返回后，隐藏loading(如果请求返回快的话，可能会没有loading)
          uni.hideLoading();
          // 清除定时器，如果请求回来了，就无需loading
          clearTimeout(_this.config.timer);
          _this.config.timer = null;
          // 判断用户对拦截返回数据的要求，如果originalData为true，返回所有的数据(response)到拦截器，否则只返回response.data
          if (_this.config.originalData) {
            // 判断是否存在拦截器
            if (_this.interceptor.response && typeof _this.interceptor.response === 'function') {
              var resInterceptors = _this.interceptor.response(response);
              // 如果拦截器不返回false，就将拦截器返回的内容给this.$u.post的then回调
              if (resInterceptors !== false) {
                resolve(resInterceptors);
              } else {
                // 如果拦截器返回false，意味着拦截器定义者认为返回有问题，直接接入catch回调
                reject(response);
              }
            } else {
              // 如果要求返回原始数据，就算没有拦截器，也返回最原始的数据
              resolve(response);
            }
          } else {
            if (response.statusCode == 200) {
              if (_this.interceptor.response && typeof _this.interceptor.response === 'function') {
                var _resInterceptors = _this.interceptor.response(response.data);
                if (_resInterceptors !== false) {
                  resolve(_resInterceptors);
                } else {
                  reject(response.data);
                }
              } else {
                // 如果不是返回原始数据(originalData=false)，且没有拦截器的情况下，返回纯数据给then回调
                resolve(response.data);
              }
            } else {
              // 不返回原始数据的情况下，服务器状态码不为200，modal弹框提示
              // if(response.errMsg) {
              // 	uni.showModal({
              // 		title: response.errMsg
              // 	});
              // }
              reject(response);
            }
          }
        };

        // 判断用户传递的URL是否/开头,如果不是,加上/，这里使用了uView的test.js验证库的url()方法
        options.url = _test.default.url(options.url) ? options.url : _this.config.baseUrl + (options.url.indexOf('/') == 0 ?
        options.url : '/' + options.url);

        // 是否显示loading
        // 加一个是否已有timer定时器的判断，否则有两个同时请求的时候，后者会清除前者的定时器id
        // 而没有清除前者的定时器，导致前者超时，一直显示loading
        if (_this.config.showLoading && !_this.config.timer) {
          _this.config.timer = setTimeout(function () {
            uni.showLoading({
              title: _this.config.loadingText,
              mask: _this.config.loadingMask });

            _this.config.timer = null;
          }, _this.config.loadingTime);
        }
        uni.request(options);
      });
      // .catch(res => {
      // 	// 如果返回reject()，不让其进入this.$u.post().then().catch()后面的catct()
      // 	// 因为很多人都会忘了写后面的catch()，导致报错捕获不到catch
      // 	return new Promise(()=>{});
      // })
    } }]);

  function Request() {var _this2 = this;_classCallCheck(this, Request);
    this.config = {
      baseUrl: '', // 请求的根域名
      // 默认的请求头
      header: {},
      method: 'POST',
      // 设置为json，返回后uni.request会对数据进行一次JSON.parse
      dataType: 'json',
      // 此参数无需处理，因为5+和支付宝小程序不支持，默认为text即可
      responseType: 'text',
      showLoading: true, // 是否显示请求中的loading
      loadingText: '请求中...',
      loadingTime: 800, // 在此时间内，请求还没回来的话，就显示加载中动画，单位ms
      timer: null, // 定时器
      originalData: false, // 是否在拦截器中返回服务端的原始数据，见文档说明
      loadingMask: true // 展示loading的时候，是否给一个透明的蒙层，防止触摸穿透
    };

    // 拦截器
    this.interceptor = {
      // 请求前的拦截
      request: null,
      // 请求后的拦截
      response: null };


    // get请求
    this.get = function (url) {var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var header = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return _this2.request({
        method: 'GET',
        url: url,
        header: header,
        data: data });

    };

    // post请求
    this.post = function (url) {var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var header = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return _this2.request({
        url: url,
        method: 'POST',
        header: header,
        data: data });

    };

    // put请求，不支持支付宝小程序(HX2.6.15)
    this.put = function (url) {var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var header = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return _this2.request({
        url: url,
        method: 'PUT',
        header: header,
        data: data });

    };

    // delete请求，不支持支付宝和头条小程序(HX2.6.15)
    this.delete = function (url) {var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var header = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return _this2.request({
        url: url,
        method: 'DELETE',
        header: header,
        data: data });

    };
  }return Request;}();var _default =

new Request();exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 14:
/*!****************************************************************************!*\
  !*** D:/WebCode/uniVideo/node_modules/uview-ui/libs/function/deepMerge.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _deepClone = _interopRequireDefault(__webpack_require__(/*! ./deepClone */ 15));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

// JS对象深度合并
function deepMerge() {var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};var source = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  target = (0, _deepClone.default)(target);
  if (typeof target !== 'object' || typeof source !== 'object') return false;
  for (var prop in source) {
    if (!source.hasOwnProperty(prop)) continue;
    if (prop in target) {
      if (typeof target[prop] !== 'object') {
        target[prop] = source[prop];
      } else {
        if (typeof source[prop] !== 'object') {
          target[prop] = source[prop];
        } else {
          if (target[prop].concat && source[prop].concat) {
            target[prop] = target[prop].concat(source[prop]);
          } else {
            target[prop] = deepMerge(target[prop], source[prop]);
          }
        }
      }
    } else {
      target[prop] = source[prop];
    }
  }
  return target;
}var _default =

deepMerge;exports.default = _default;

/***/ }),

/***/ 15:
/*!****************************************************************************!*\
  !*** D:/WebCode/uniVideo/node_modules/uview-ui/libs/function/deepClone.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // 判断arr是否为一个数组，返回一个bool值
function isArray(arr) {
  return Object.prototype.toString.call(arr) === '[object Array]';
}

// 深度克隆
function deepClone(obj) {
  // 对常见的“非”值，直接返回原来值
  if ([null, undefined, NaN, false].includes(obj)) return obj;
  if (typeof obj !== "object" && typeof obj !== 'function') {
    //原始类型直接返回
    return obj;
  }
  var o = isArray(obj) ? [] : {};
  for (var i in obj) {
    if (obj.hasOwnProperty(i)) {
      o[i] = typeof obj[i] === "object" ? deepClone(obj[i]) : obj[i];
    }
  }
  return o;
}var _default =

deepClone;exports.default = _default;

/***/ }),

/***/ 16:
/*!***********************************************************************!*\
  !*** D:/WebCode/uniVideo/node_modules/uview-ui/libs/function/test.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * 验证电子邮箱格式
                                                                                                      */
function email(value) {
  return /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(value);
}

/**
   * 验证手机格式
   */
function mobile(value) {
  return /^1[3-9]\d{9}$/.test(value);
}

/**
   * 验证URL格式
   */
function url(value) {
  return /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w-.\/?%&=]*)?/.test(value);
}

/**
   * 验证日期格式
   */
function date(value) {
  return !/Invalid|NaN/.test(new Date(value).toString());
}

/**
   * 验证ISO类型的日期格式
   */
function dateISO(value) {
  return /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(value);
}

/**
   * 验证十进制数字
   */
function number(value) {
  return /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(value);
}

/**
   * 验证整数
   */
function digits(value) {
  return /^\d+$/.test(value);
}

/**
   * 验证身份证号码
   */
function idCard(value) {
  return /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(
  value);
}

/**
   * 是否车牌号
   */
function carNo(value) {
  // 新能源车牌
  var xreg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DF]$)|([DF][A-HJ-NP-Z0-9][0-9]{4}$))/;
  // 旧车牌
  var creg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]{1}$/;
  if (value.length === 7) {
    return creg.test(value);
  } else if (value.length === 8) {
    return xreg.test(value);
  } else {
    return false;
  }
}

/**
   * 金额,只允许2位小数
   */
function amount(value) {
  //金额，只允许保留两位小数
  return /^[1-9]\d*(,\d{3})*(\.\d{1,2})?$|^0\.\d{1,2}$/.test(value);
}

/**
   * 中文
   */
function chinese(value) {
  var reg = /^[\u4e00-\u9fa5]+$/gi;
  return reg.test(value);
}

/**
   * 只能输入字母
   */
function letter(value) {
  return /^[a-zA-Z]*$/.test(value);
}

/**
   * 只能是字母或者数字
   */
function enOrNum(value) {
  //英文或者数字
  var reg = /^[0-9a-zA-Z]*$/g;
  return reg.test(value);
}

/**
   * 验证是否包含某个值
   */
function contains(value, param) {
  return value.indexOf(param) >= 0;
}

/**
   * 验证一个值范围[min, max]
   */
function range(value, param) {
  return value >= param[0] && value <= param[1];
}

/**
   * 验证一个长度范围[min, max]
   */
function rangeLength(value, param) {
  return value.length >= param[0] && value.length <= param[1];
}

/**
   * 是否固定电话
   */
function landline(value) {
  var reg = /^\d{3,4}-\d{7,8}(-\d{3,4})?$/;
  return reg.test(value);
}

/**
   * 判断是否为空
   */
function empty(value) {
  switch (typeof value) {
    case 'undefined':
      return true;
    case 'string':
      if (value.replace(/(^[ \t\n\r]*)|([ \t\n\r]*$)/g, '').length == 0) return true;
      break;
    case 'boolean':
      if (!value) return true;
      break;
    case 'number':
      if (0 === value || isNaN(value)) return true;
      break;
    case 'object':
      if (null === value || value.length === 0) return true;
      for (var i in value) {
        return false;
      }
      return true;}

  return false;
}

/**
   * 是否json字符串
   */
function jsonString(value) {
  if (typeof value == 'string') {
    try {
      var obj = JSON.parse(value);
      if (typeof obj == 'object' && obj) {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      return false;
    }
  }
  return false;
}


/**
   * 是否数组
   */
function array(value) {
  if (typeof Array.isArray === "function") {
    return Array.isArray(value);
  } else {
    return Object.prototype.toString.call(value) === "[object Array]";
  }
}

/**
   * 是否对象
   */
function object(value) {
  return Object.prototype.toString.call(value) === '[object Object]';
}

/**
   * 是否短信验证码
   */
function code(value) {var len = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 6;
  return new RegExp("^\\d{".concat(len, "}$")).test(value);
}var _default =


{
  email: email,
  mobile: mobile,
  url: url,
  date: date,
  dateISO: dateISO,
  number: number,
  digits: digits,
  idCard: idCard,
  carNo: carNo,
  amount: amount,
  chinese: chinese,
  letter: letter,
  enOrNum: enOrNum,
  contains: contains,
  range: range,
  rangeLength: rangeLength,
  empty: empty,
  isEmpty: empty,
  jsonString: jsonString,
  landline: landline,
  object: object,
  array: array,
  code: code };exports.default = _default;

/***/ }),

/***/ 17:
/*!******************************************************************************!*\
  !*** D:/WebCode/uniVideo/node_modules/uview-ui/libs/function/queryParams.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * 对象转url参数
                                                                                                      * @param {*} data,对象
                                                                                                      * @param {*} isPrefix,是否自动加上"?"
                                                                                                      */
function queryParams() {var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};var isPrefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;var arrayFormat = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'brackets';
  var prefix = isPrefix ? '?' : '';
  var _result = [];
  if (['indices', 'brackets', 'repeat', 'comma'].indexOf(arrayFormat) == -1) arrayFormat = 'brackets';var _loop = function _loop(
  key) {
    var value = data[key];
    // 去掉为空的参数
    if (['', undefined, null].indexOf(value) >= 0) {
      return "continue";
    }
    // 如果值为数组，另行处理
    if (value.constructor === Array) {
      // e.g. {ids: [1, 2, 3]}
      switch (arrayFormat) {
        case 'indices':
          // 结果: ids[0]=1&ids[1]=2&ids[2]=3
          for (var i = 0; i < value.length; i++) {
            _result.push(key + '[' + i + ']=' + value[i]);
          }
          break;
        case 'brackets':
          // 结果: ids[]=1&ids[]=2&ids[]=3
          value.forEach(function (_value) {
            _result.push(key + '[]=' + _value);
          });
          break;
        case 'repeat':
          // 结果: ids=1&ids=2&ids=3
          value.forEach(function (_value) {
            _result.push(key + '=' + _value);
          });
          break;
        case 'comma':
          // 结果: ids=1,2,3
          var commaStr = "";
          value.forEach(function (_value) {
            commaStr += (commaStr ? "," : "") + _value;
          });
          _result.push(key + '=' + commaStr);
          break;
        default:
          value.forEach(function (_value) {
            _result.push(key + '[]=' + _value);
          });}

    } else {
      _result.push(key + '=' + value);
    }};for (var key in data) {var _ret = _loop(key);if (_ret === "continue") continue;
  }
  return _result.length ? prefix + _result.join('&') : '';
}var _default =

queryParams;exports.default = _default;

/***/ }),

/***/ 18:
/*!************************************************************************!*\
  !*** D:/WebCode/uniVideo/node_modules/uview-ui/libs/function/route.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ 19));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;} /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * 路由跳转方法，该方法相对于直接使用uni.xxx的好处是使用更加简单快捷
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * 并且带有路由拦截功能
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */var

Router = /*#__PURE__*/function () {
  function Router() {_classCallCheck(this, Router);
    // 原始属性定义
    this.config = {
      type: 'navigateTo',
      url: '',
      delta: 1, // navigateBack页面后退时,回退的层数
      params: {}, // 传递的参数
      animationType: 'pop-in', // 窗口动画,只在APP有效
      animationDuration: 300, // 窗口动画持续时间,单位毫秒,只在APP有效
      intercept: false // 是否需要拦截
    };
    // 因为route方法是需要对外赋值给另外的对象使用，同时route内部有使用this，会导致route失去上下文
    // 这里在构造函数中进行this绑定
    this.route = this.route.bind(this);
  }

  // 判断url前面是否有"/"，如果没有则加上，否则无法跳转
  _createClass(Router, [{ key: "addRootPath", value: function addRootPath(url) {
      return url[0] === '/' ? url : "/".concat(url);
    }

    // 整合路由参数
  }, { key: "mixinParam", value: function mixinParam(url, params) {
      url = url && this.addRootPath(url);

      // 使用正则匹配，主要依据是判断是否有"/","?","="等，如“/page/index/index?name=mary"
      // 如果有url中有get参数，转换后无需带上"?"
      var query = '';
      if (/.*\/.*\?.*=.*/.test(url)) {
        // object对象转为get类型的参数
        query = uni.$u.queryParams(params, false);
        // 因为已有get参数,所以后面拼接的参数需要带上"&"隔开
        return url += "&" + query;
      } else {
        // 直接拼接参数，因为此处url中没有后面的query参数，也就没有"?/&"之类的符号
        query = uni.$u.queryParams(params);
        return url += query;
      }
    }

    // 对外的方法名称
  }, { key: "route", value: function () {var _route = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee() {var options,params,mergeConfig,isNext,_args = arguments;return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:options = _args.length > 0 && _args[0] !== undefined ? _args[0] : {};params = _args.length > 1 && _args[1] !== undefined ? _args[1] : {};
                // 合并用户的配置和内部的默认配置
                mergeConfig = {};

                if (typeof options === 'string') {
                  // 如果options为字符串，则为route(url, params)的形式
                  mergeConfig.url = this.mixinParam(options, params);
                  mergeConfig.type = 'navigateTo';
                } else {
                  mergeConfig = uni.$u.deepClone(options, this.config);
                  // 否则正常使用mergeConfig中的url和params进行拼接
                  mergeConfig.url = this.mixinParam(options.url, options.params);
                }

                if (params.intercept) {
                  this.config.intercept = params.intercept;
                }
                // params参数也带给拦截器
                mergeConfig.params = params;
                // 合并内外部参数
                mergeConfig = uni.$u.deepMerge(this.config, mergeConfig);
                // 判断用户是否定义了拦截器
                if (!(typeof uni.$u.routeIntercept === 'function')) {_context.next = 14;break;}_context.next = 10;return (

                  new Promise(function (resolve, reject) {
                    uni.$u.routeIntercept(mergeConfig, resolve);
                  }));case 10:isNext = _context.sent;
                // 如果isNext为true，则执行路由跳转
                isNext && this.openPage(mergeConfig);_context.next = 15;break;case 14:

                this.openPage(mergeConfig);case 15:case "end":return _context.stop();}}}, _callee, this);}));function route() {return _route.apply(this, arguments);}return route;}()



    // 执行路由跳转
  }, { key: "openPage", value: function openPage(config) {
      // 解构参数
      var
      url =




      config.url,type = config.type,delta = config.delta,animationType = config.animationType,animationDuration = config.animationDuration;
      if (config.type == 'navigateTo' || config.type == 'to') {
        uni.navigateTo({
          url: url,
          animationType: animationType,
          animationDuration: animationDuration });

      }
      if (config.type == 'redirectTo' || config.type == 'redirect') {
        uni.redirectTo({
          url: url });

      }
      if (config.type == 'switchTab' || config.type == 'tab') {
        uni.switchTab({
          url: url });

      }
      if (config.type == 'reLaunch' || config.type == 'launch') {
        uni.reLaunch({
          url: url });

      }
      if (config.type == 'navigateBack' || config.type == 'back') {
        uni.navigateBack({
          delta: delta });

      }
    } }]);return Router;}();var _default =


new Router().route;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 19:
/*!**********************************************************!*\
  !*** ./node_modules/@babel/runtime/regenerator/index.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! regenerator-runtime */ 20);

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
 * (c) 2014-2021 Evan You
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
        ret.push(render(result.value, ret.length, i, i++)); // fixed by xxxxxx
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
        if (Object({"NODE_ENV":"development","VUE_APP_NAME":"smartCase","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
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
        if(Object({"NODE_ENV":"development","VUE_APP_NAME":"smartCase","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"NODE_ENV":"development","VUE_APP_NAME":"smartCase","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
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
      if (Object({"NODE_ENV":"development","VUE_APP_NAME":"smartCase","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
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
    var app = typeof getApp === 'function' && getApp();
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
    'onInit',
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

module.exports = __webpack_require__(/*! ./runtime */ 21);

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

/***/ 21:
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

/***/ 22:
/*!*****************************************************************************!*\
  !*** D:/WebCode/uniVideo/node_modules/uview-ui/libs/function/timeFormat.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // padStart 的 polyfill，因为某些机型或情况，还无法支持es7的padStart，比如电脑版的微信小程序
// 所以这里做一个兼容polyfill的兼容处理
if (!String.prototype.padStart) {
  // 为了方便表示这里 fillString 用了ES6 的默认参数，不影响理解
  String.prototype.padStart = function (maxLength) {var fillString = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ' ';
    if (Object.prototype.toString.call(fillString) !== "[object String]") throw new TypeError(
    'fillString must be String');
    var str = this;
    // 返回 String(str) 这里是为了使返回的值是字符串字面量，在控制台中更符合直觉
    if (str.length >= maxLength) return String(str);

    var fillLength = maxLength - str.length,
    times = Math.ceil(fillLength / fillString.length);
    while (times >>= 1) {
      fillString += fillString;
      if (times === 1) {
        fillString += fillString;
      }
    }
    return fillString.slice(0, fillLength) + str;
  };
}

// 其他更多是格式化有如下:
// yyyy:mm:dd|yyyy:mm|yyyy年mm月dd日|yyyy年mm月dd日 hh时MM分等,可自定义组合
function timeFormat() {var dateTime = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;var fmt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'yyyy-mm-dd';
  // 如果为null,则格式化当前时间
  if (!dateTime) dateTime = Number(new Date());
  // 如果dateTime长度为10或者13，则为秒和毫秒的时间戳，如果超过13位，则为其他的时间格式
  if (dateTime.toString().length == 10) dateTime *= 1000;
  var date = new Date(dateTime);
  var ret;
  var opt = {
    "y+": date.getFullYear().toString(), // 年
    "m+": (date.getMonth() + 1).toString(), // 月
    "d+": date.getDate().toString(), // 日
    "h+": date.getHours().toString(), // 时
    "M+": date.getMinutes().toString(), // 分
    "s+": date.getSeconds().toString() // 秒
    // 有其他格式化字符需求可以继续添加，必须转化成字符串
  };
  for (var k in opt) {
    ret = new RegExp("(" + k + ")").exec(fmt);
    if (ret) {
      fmt = fmt.replace(ret[1], ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, "0"));
    };
  };
  return fmt;
}var _default =

timeFormat;exports.default = _default;

/***/ }),

/***/ 23:
/*!***************************************************************************!*\
  !*** D:/WebCode/uniVideo/node_modules/uview-ui/libs/function/timeFrom.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _timeFormat = _interopRequireDefault(__webpack_require__(/*! ../../libs/function/timeFormat.js */ 22));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

/**
                                                                                                                                                                                                                                                                                          * 时间戳转为多久之前
                                                                                                                                                                                                                                                                                          * @param String timestamp 时间戳
                                                                                                                                                                                                                                                                                          * @param String | Boolean format 如果为时间格式字符串，超出一定时间范围，返回固定的时间格式；
                                                                                                                                                                                                                                                                                          * 如果为布尔值false，无论什么时间，都返回多久以前的格式
                                                                                                                                                                                                                                                                                          */
function timeFrom() {var dateTime = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'yyyy-mm-dd';
  // 如果为null,则格式化当前时间
  if (!dateTime) dateTime = Number(new Date());
  // 如果dateTime长度为10或者13，则为秒和毫秒的时间戳，如果超过13位，则为其他的时间格式
  if (dateTime.toString().length == 10) dateTime *= 1000;
  var timestamp = +new Date(Number(dateTime));

  var timer = (Number(new Date()) - timestamp) / 1000;
  // 如果小于5分钟,则返回"刚刚",其他以此类推
  var tips = '';
  switch (true) {
    case timer < 300:
      tips = '刚刚';
      break;
    case timer >= 300 && timer < 3600:
      tips = parseInt(timer / 60) + '分钟前';
      break;
    case timer >= 3600 && timer < 86400:
      tips = parseInt(timer / 3600) + '小时前';
      break;
    case timer >= 86400 && timer < 2592000:
      tips = parseInt(timer / 86400) + '天前';
      break;
    default:
      // 如果format为false，则无论什么时间戳，都显示xx之前
      if (format === false) {
        if (timer >= 2592000 && timer < 365 * 86400) {
          tips = parseInt(timer / (86400 * 30)) + '个月前';
        } else {
          tips = parseInt(timer / (86400 * 365)) + '年前';
        }
      } else {
        tips = (0, _timeFormat.default)(timestamp, format);
      }}

  return tips;
}var _default =

timeFrom;exports.default = _default;

/***/ }),

/***/ 24:
/*!********************************************************************************!*\
  !*** D:/WebCode/uniVideo/node_modules/uview-ui/libs/function/colorGradient.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * 求两个颜色之间的渐变值
                                                                                                      * @param {string} startColor 开始的颜色
                                                                                                      * @param {string} endColor 结束的颜色
                                                                                                      * @param {number} step 颜色等分的份额
                                                                                                      * */
function colorGradient() {var startColor = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'rgb(0, 0, 0)';var endColor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'rgb(255, 255, 255)';var step = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 10;
  var startRGB = hexToRgb(startColor, false); //转换为rgb数组模式
  var startR = startRGB[0];
  var startG = startRGB[1];
  var startB = startRGB[2];

  var endRGB = hexToRgb(endColor, false);
  var endR = endRGB[0];
  var endG = endRGB[1];
  var endB = endRGB[2];

  var sR = (endR - startR) / step; //总差值
  var sG = (endG - startG) / step;
  var sB = (endB - startB) / step;
  var colorArr = [];
  for (var i = 0; i < step; i++) {
    //计算每一步的hex值 
    var hex = rgbToHex('rgb(' + Math.round(sR * i + startR) + ',' + Math.round(sG * i + startG) + ',' + Math.round(sB *
    i + startB) + ')');
    colorArr.push(hex);
  }
  return colorArr;
}

// 将hex表示方式转换为rgb表示方式(这里返回rgb数组模式)
function hexToRgb(sColor) {var str = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  sColor = sColor.toLowerCase();
  if (sColor && reg.test(sColor)) {
    if (sColor.length === 4) {
      var sColorNew = "#";
      for (var i = 1; i < 4; i += 1) {
        sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
      }
      sColor = sColorNew;
    }
    //处理六位的颜色值
    var sColorChange = [];
    for (var _i = 1; _i < 7; _i += 2) {
      sColorChange.push(parseInt("0x" + sColor.slice(_i, _i + 2)));
    }
    if (!str) {
      return sColorChange;
    } else {
      return "rgb(".concat(sColorChange[0], ",").concat(sColorChange[1], ",").concat(sColorChange[2], ")");
    }
  } else if (/^(rgb|RGB)/.test(sColor)) {
    var arr = sColor.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
    return arr.map(function (val) {return Number(val);});
  } else {
    return sColor;
  }
};

// 将rgb表示方式转换为hex表示方式
function rgbToHex(rgb) {
  var _this = rgb;
  var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  if (/^(rgb|RGB)/.test(_this)) {
    var aColor = _this.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
    var strHex = "#";
    for (var i = 0; i < aColor.length; i++) {
      var hex = Number(aColor[i]).toString(16);
      hex = String(hex).length == 1 ? 0 + '' + hex : hex; // 保证每个rgb的值为2位
      if (hex === "0") {
        hex += hex;
      }
      strHex += hex;
    }
    if (strHex.length !== 7) {
      strHex = _this;
    }
    return strHex;
  } else if (reg.test(_this)) {
    var aNum = _this.replace(/#/, "").split("");
    if (aNum.length === 6) {
      return _this;
    } else if (aNum.length === 3) {
      var numHex = "#";
      for (var _i2 = 0; _i2 < aNum.length; _i2 += 1) {
        numHex += aNum[_i2] + aNum[_i2];
      }
      return numHex;
    }
  } else {
    return _this;
  }
}


/**
  * JS颜色十六进制转换为rgb或rgba,返回的格式为 rgba（255，255，255，0.5）字符串
  * sHex为传入的十六进制的色值
  * alpha为rgba的透明度
  */
function colorToRgba(color) {var alpha = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0.3;
  color = rgbToHex(color);
  // 十六进制颜色值的正则表达式
  var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  /* 16进制颜色转为RGB格式 */
  var sColor = color.toLowerCase();
  if (sColor && reg.test(sColor)) {
    if (sColor.length === 4) {
      var sColorNew = '#';
      for (var i = 1; i < 4; i += 1) {
        sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
      }
      sColor = sColorNew;
    }
    // 处理六位的颜色值
    var sColorChange = [];
    for (var _i3 = 1; _i3 < 7; _i3 += 2) {
      sColorChange.push(parseInt('0x' + sColor.slice(_i3, _i3 + 2)));
    }
    // return sColorChange.join(',')
    return 'rgba(' + sColorChange.join(',') + ',' + alpha + ')';
  } else
  {
    return sColor;
  }
}var _default =

{
  colorGradient: colorGradient,
  hexToRgb: hexToRgb,
  rgbToHex: rgbToHex,
  colorToRgba: colorToRgba };exports.default = _default;

/***/ }),

/***/ 25:
/*!***********************************************************************!*\
  !*** D:/WebCode/uniVideo/node_modules/uview-ui/libs/function/guid.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * 本算法来源于简书开源代码，详见：https://www.jianshu.com/p/fdbf293d0a85
                                                                                                      * 全局唯一标识符（uuid，Globally Unique Identifier）,也称作 uuid(Universally Unique IDentifier) 
                                                                                                      * 一般用于多个组件之间,给它一个唯一的标识符,或者v-for循环的时候,如果使用数组的index可能会导致更新列表出现问题
                                                                                                      * 最可能的情况是左滑删除item或者对某条信息流"不喜欢"并去掉它的时候,会导致组件内的数据可能出现错乱
                                                                                                      * v-for的时候,推荐使用后端返回的id而不是循环的index
                                                                                                      * @param {Number} len uuid的长度
                                                                                                      * @param {Boolean} firstU 将返回的首字母置为"u"
                                                                                                      * @param {Nubmer} radix 生成uuid的基数(意味着返回的字符串都是这个基数),2-二进制,8-八进制,10-十进制,16-十六进制
                                                                                                      */
function guid() {var len = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 32;var firstU = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;var radix = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
  var uuid = [];
  radix = radix || chars.length;

  if (len) {
    // 如果指定uuid长度,只是取随机的字符,0|x为位运算,能去掉x的小数位,返回整数位
    for (var i = 0; i < len; i++) {uuid[i] = chars[0 | Math.random() * radix];}
  } else {
    var r;
    // rfc4122标准要求返回的uuid中,某些位为固定的字符
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
    uuid[14] = '4';

    for (var _i = 0; _i < 36; _i++) {
      if (!uuid[_i]) {
        r = 0 | Math.random() * 16;
        uuid[_i] = chars[_i == 19 ? r & 0x3 | 0x8 : r];
      }
    }
  }
  // 移除第一个字符,并用u替代,因为第一个字符为数值时,该guuid不能用作id或者class
  if (firstU) {
    uuid.shift();
    return 'u' + uuid.join('');
  } else {
    return uuid.join('');
  }
}var _default =

guid;exports.default = _default;

/***/ }),

/***/ 26:
/*!************************************************************************!*\
  !*** D:/WebCode/uniVideo/node_modules/uview-ui/libs/function/color.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // 为了让用户能够自定义主题，会逐步弃用此文件，各颜色通过css提供
// 为了给某些特殊场景使用和向后兼容，无需删除此文件(2020-06-20)
var color = {
  primary: "#2979ff",
  primaryDark: "#2b85e4",
  primaryDisabled: "#a0cfff",
  primaryLight: "#ecf5ff",
  bgColor: "#f3f4f6",

  info: "#909399",
  infoDark: "#82848a",
  infoDisabled: "#c8c9cc",
  infoLight: "#f4f4f5",

  warning: "#ff9900",
  warningDark: "#f29100",
  warningDisabled: "#fcbd71",
  warningLight: "#fdf6ec",

  error: "#fa3534",
  errorDark: "#dd6161",
  errorDisabled: "#fab6b6",
  errorLight: "#fef0f0",

  success: "#19be6b",
  successDark: "#18b566",
  successDisabled: "#71d5a1",
  successLight: "#dbf1e1",

  mainColor: "#303133",
  contentColor: "#606266",
  tipsColor: "#909399",
  lightColor: "#c0c4cc",
  borderColor: "#e4e7ed" };var _default =


color;exports.default = _default;

/***/ }),

/***/ 27:
/*!****************************************************************************!*\
  !*** D:/WebCode/uniVideo/node_modules/uview-ui/libs/function/type2icon.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * 根据主题type值,获取对应的图标
                                                                                                      * @param String type 主题名称,primary|info|error|warning|success
                                                                                                      * @param String fill 是否使用fill填充实体的图标  
                                                                                                      */
function type2icon() {var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'success';var fill = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  // 如果非预置值,默认为success
  if (['primary', 'info', 'error', 'warning', 'success'].indexOf(type) == -1) type = 'success';
  var iconName = '';
  // 目前(2019-12-12),info和primary使用同一个图标
  switch (type) {
    case 'primary':
      iconName = 'info-circle';
      break;
    case 'info':
      iconName = 'info-circle';
      break;
    case 'error':
      iconName = 'close-circle';
      break;
    case 'warning':
      iconName = 'error-circle';
      break;
    case 'success':
      iconName = 'checkmark-circle';
      break;
    default:
      iconName = 'checkmark-circle';}

  // 是否是实体类型,加上-fill,在icon组件库中,实体的类名是后面加-fill的
  if (fill) iconName += '-fill';
  return iconName;
}var _default =

type2icon;exports.default = _default;

/***/ }),

/***/ 28:
/*!******************************************************************************!*\
  !*** D:/WebCode/uniVideo/node_modules/uview-ui/libs/function/randomArray.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // 打乱数组
function randomArray() {var array = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  // 原理是sort排序,Math.random()产生0<= x < 1之间的数,会导致x-0.05大于或者小于0
  return array.sort(function () {return Math.random() - 0.5;});
}var _default =

randomArray;exports.default = _default;

/***/ }),

/***/ 29:
/*!**************************************************************************!*\
  !*** D:/WebCode/uniVideo/node_modules/uview-ui/libs/function/addUnit.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = addUnit;var _test = _interopRequireDefault(__webpack_require__(/*! ./test.js */ 16));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

// 添加单位，如果有rpx，%，px等单位结尾或者值为auto，直接返回，否则加上rpx单位结尾
function addUnit() {var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'auto';var unit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'rpx';
  value = String(value);
  // 用uView内置验证规则中的number判断是否为数值
  return _test.default.number(value) ? "".concat(value).concat(unit) : value;
}

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

/***/ 30:
/*!*************************************************************************!*\
  !*** D:/WebCode/uniVideo/node_modules/uview-ui/libs/function/random.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;function random(min, max) {
  if (min >= 0 && max > 0 && max >= min) {
    var gab = max - min + 1;
    return Math.floor(Math.random() * gab + min);
  } else {
    return 0;
  }
}var _default =

random;exports.default = _default;

/***/ }),

/***/ 302:
/*!*******************************************!*\
  !*** D:/WebCode/uniVideo/api/classify.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var _request = _interopRequireDefault(__webpack_require__(/*! @/common/request.js */ 41));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
module.exports = {
  // 登录
  getTag: function getTag() {
    return (0, _request.default)('classify/getTag', 'post', "");
  } };

/***/ }),

/***/ 31:
/*!***********************************************************************!*\
  !*** D:/WebCode/uniVideo/node_modules/uview-ui/libs/function/trim.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;function trim(str) {var pos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'both';
  if (pos == 'both') {
    return str.replace(/^\s+|\s+$/g, "");
  } else if (pos == "left") {
    return str.replace(/^\s*/, '');
  } else if (pos == 'right') {
    return str.replace(/(\s*$)/g, "");
  } else if (pos == 'all') {
    return str.replace(/\s+/g, "");
  } else {
    return str;
  }
}var _default =

trim;exports.default = _default;

/***/ }),

/***/ 32:
/*!************************************************************************!*\
  !*** D:/WebCode/uniVideo/node_modules/uview-ui/libs/function/toast.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;function toast(title) {var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1500;
  uni.showToast({
    title: title,
    icon: 'none',
    duration: duration });

}var _default =

toast;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 33:
/*!****************************************************************************!*\
  !*** D:/WebCode/uniVideo/node_modules/uview-ui/libs/function/getParent.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = getParent; // 获取父组件的参数，因为支付宝小程序不支持provide/inject的写法
// this.$parent在非H5中，可以准确获取到父组件，但是在H5中，需要多次this.$parent.$parent.xxx
function getParent(name, keys) {
  var parent = this.$parent;
  // 通过while历遍，这里主要是为了H5需要多层解析的问题
  while (parent) {
    // 父组件
    if (parent.$options.name !== name) {
      // 如果组件的name不相等，继续上一级寻找
      parent = parent.$parent;
    } else {var _ret = function () {
        var data = {};
        // 判断keys是否数组，如果传过来的是一个数组，那么直接使用数组元素值当做键值去父组件寻找
        if (Array.isArray(keys)) {
          keys.map(function (val) {
            data[val] = parent[val] ? parent[val] : '';
          });
        } else {
          // 历遍传过来的对象参数
          for (var i in keys) {
            // 如果子组件有此值则用，无此值则用父组件的值
            // 判断是否空数组，如果是，则用父组件的值，否则用子组件的值
            if (Array.isArray(keys[i])) {
              if (keys[i].length) {
                data[i] = keys[i];
              } else {
                data[i] = parent[i];
              }
            } else if (keys[i].constructor === Object) {
              // 判断是否对象，如果是对象，且有属性，那么使用子组件的值，否则使用父组件的值
              if (Object.keys(keys[i]).length) {
                data[i] = keys[i];
              } else {
                data[i] = parent[i];
              }
            } else {
              // 只要子组件有传值，即使是false值，也是“传值”了，也需要覆盖父组件的同名参数
              data[i] = keys[i] || keys[i] === false ? keys[i] : parent[i];
            }
          }
        }
        return { v: data };}();if (typeof _ret === "object") return _ret.v;
    }
  }

  return {};
}

/***/ }),

/***/ 34:
/*!**************************************************************************!*\
  !*** D:/WebCode/uniVideo/node_modules/uview-ui/libs/function/$parent.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = $parent; // 获取父组件的参数，因为支付宝小程序不支持provide/inject的写法
// this.$parent在非H5中，可以准确获取到父组件，但是在H5中，需要多次this.$parent.$parent.xxx
// 这里默认值等于undefined有它的含义，因为最顶层元素(组件)的$parent就是undefined，意味着不传name
// 值(默认为undefined)，就是查找最顶层的$parent
function $parent() {var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;
  var parent = this.$parent;
  // 通过while历遍，这里主要是为了H5需要多层解析的问题
  while (parent) {
    // 父组件
    if (parent.$options && parent.$options.name !== name) {
      // 如果组件的name不相等，继续上一级寻找
      parent = parent.$parent;
    } else {
      return parent;
    }
  }
  return false;
}

/***/ }),

/***/ 35:
/*!**********************************************************************!*\
  !*** D:/WebCode/uniVideo/node_modules/uview-ui/libs/function/sys.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.os = os;exports.sys = sys;function os() {
  return uni.getSystemInfoSync().platform;
};

function sys() {
  return uni.getSystemInfoSync();
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 36:
/*!***************************************************************************!*\
  !*** D:/WebCode/uniVideo/node_modules/uview-ui/libs/function/debounce.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var timeout = null;

/**
                                                                                                                         * 防抖原理：一定时间内，只有最后一次操作，再过wait毫秒后才执行函数
                                                                                                                         * 
                                                                                                                         * @param {Function} func 要执行的回调函数 
                                                                                                                         * @param {Number} wait 延时的时间
                                                                                                                         * @param {Boolean} immediate 是否立即执行 
                                                                                                                         * @return null
                                                                                                                         */
function debounce(func) {var wait = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;var immediate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  // 清除定时器
  if (timeout !== null) clearTimeout(timeout);
  // 立即执行，此类情况一般用不到
  if (immediate) {
    var callNow = !timeout;
    timeout = setTimeout(function () {
      timeout = null;
    }, wait);
    if (callNow) typeof func === 'function' && func();
  } else {
    // 设置定时器，当最后一次操作后，timeout不会再被清除，所以在延时wait毫秒后执行func回调方法
    timeout = setTimeout(function () {
      typeof func === 'function' && func();
    }, wait);
  }
}var _default =

debounce;exports.default = _default;

/***/ }),

/***/ 37:
/*!***************************************************************************!*\
  !*** D:/WebCode/uniVideo/node_modules/uview-ui/libs/function/throttle.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var timer, flag;
/**
                                                                                                                      * 节流原理：在一定时间内，只能触发一次
                                                                                                                      * 
                                                                                                                      * @param {Function} func 要执行的回调函数 
                                                                                                                      * @param {Number} wait 延时的时间
                                                                                                                      * @param {Boolean} immediate 是否立即执行
                                                                                                                      * @return null
                                                                                                                      */
function throttle(func) {var wait = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;var immediate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  if (immediate) {
    if (!flag) {
      flag = true;
      // 如果是立即执行，则在wait毫秒内开始时执行
      typeof func === 'function' && func();
      timer = setTimeout(function () {
        flag = false;
      }, wait);
    }
  } else {
    if (!flag) {
      flag = true;
      // 如果是非立即执行，则在wait毫秒内的结束处执行
      timer = setTimeout(function () {
        flag = false;
        typeof func === 'function' && func();
      }, wait);
    }

  }
};var _default =
throttle;exports.default = _default;

/***/ }),

/***/ 38:
/*!***********************************************************************!*\
  !*** D:/WebCode/uniVideo/node_modules/uview-ui/libs/config/config.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // 此版本发布于2020-12-17
var version = '1.8.3';var _default =

{
  v: version,
  version: version,
  // 主题名称
  type: [
  'primary',
  'success',
  'info',
  'error',
  'warning'] };exports.default = _default;

/***/ }),

/***/ 39:
/*!***********************************************************************!*\
  !*** D:/WebCode/uniVideo/node_modules/uview-ui/libs/config/zIndex.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // uniapp在H5中各API的z-index值如下：
/**
 * actionsheet: 999
 * modal: 999
 * navigate: 998
 * tabbar: 998
 * toast: 999
 */var _default =

{
  toast: 10090,
  noNetwork: 10080,
  // popup包含popup，actionsheet，keyboard，picker的值
  popup: 10075,
  mask: 10070,
  navbar: 980,
  topTips: 975,
  sticky: 970,
  indexListSticky: 965 };exports.default = _default;

/***/ }),

/***/ 4:
/*!**************************************!*\
  !*** D:/WebCode/uniVideo/pages.json ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ 40:
/*!****************************************!*\
  !*** D:/WebCode/uniVideo/api/index.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var _request = _interopRequireDefault(__webpack_require__(/*! @/common/request.js */ 41));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
module.exports = {
  // 登录
  banner: function banner() {
    return (0, _request.default)('home/banner', 'post', "");
  },
  videoList: function videoList() {
    return (0, _request.default)('home/videoList', 'post', "");
  } };

/***/ }),

/***/ 41:
/*!*********************************************!*\
  !*** D:/WebCode/uniVideo/common/request.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _config = _interopRequireDefault(__webpack_require__(/*! ./config.js */ 42));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}
var header = {};
var request = function request() {var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';var method = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'POST';var data = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  header['content-type'] = "application/x-www-form-urlencoded";
  return new Promise(function (resolve, reject) {
    uni.request({
      method: 'post',
      url: _config.default + url,
      data: data,
      header: header,
      dataType: 'json' }).
    then(function (response) {var _response = _slicedToArray(
      response, 2),error = _response[0],res = _response[1];
      // 登录过期
      if (res.code == 10086) {
        uni.showToast({
          title: '登录过期,请重新登录',
          duration: 2000 });

      };
      resolve(res.data);
    }).catch(function (error) {var _error = _slicedToArray(
      error, 2),err = _error[0],res = _error[1];
      reject(err);
    });
  });
};var _default =
request;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 42:
/*!********************************************!*\
  !*** D:/WebCode/uniVideo/common/config.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var url_config = "";

if (true) {
  // 开发环境
  url_config = 'http://localhost:9999/';
} else {}var _default =

url_config;exports.default = _default;

/***/ }),

/***/ 43:
/*!**********************************************!*\
  !*** D:/WebCode/uniVideo/utils/httpUtils.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {var _config = _interopRequireDefault(__webpack_require__(/*! @/utils/config.js */ 44));
var _tools = _interopRequireDefault(__webpack_require__(/*! @/utils/tools.js */ 45));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

function sendHttpRequest(command, argument, sucallback, failcallback) {
  var token = uni.getStorageSync('loginInfo').token || '';
  // let Access-Control-Allow-Origin = '*'
  var projectId = uni.getStorageSync('loginInfo').defaultPrjId || '';
  var jsonData = JSON.stringify(argument);
  var domainUrl = _config.default.serveData.apiServerUrl;

  switch (command) {
    case '1001':
      domainUrl += '/appLogin/captcha'; // 获取验证码
      break;}


  uni.request({
    url: domainUrl,
    method: "POST",
    header: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "token": token },

    data: jsonData,
    success: function success(res) {
      if (sucallback && sucallback !== null) {
        sucallback(res);
        if (res.data.code != 0) {
          _tools.default.showErrorToast(res.data.msg);
        }
      }
    },
    fail: function fail(res) {
      uni.hideToast();
      if (failcallback && failcallback !== null) {
        failcallback(res);
      }
    } });

}
module.exports = {
  sendHttpRequest: sendHttpRequest };
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 44:
/*!*******************************************!*\
  !*** D:/WebCode/uniVideo/utils/config.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var serveData = {
  // apiServerUrl: 'http://192.168.0.58:8066', // 服务器
  apiServerUrl: 'http://192.168.0.57:8081' // 演示服务器
  // apiServerUrl: 'http://192.168.0.162', // 尤奕
  // apiServerUrl: 'http://192.168.0.226', // 刘超
  // apiServerUrl: 'http://192.168.0.225', // 周宇
  // apiServerUrl: 'http://192.168.0.126', // 盛文
  // apiServerUrl: 'http://192.168.0.169', // 张川
  // apiServerUrl: 'http://192.168.0.157', // 刁武隆
  // apiServerUrl: 'http://192.168.0.218', // 王生旺
  // apiServerUrl: 'http://192.168.0.208', // 余威
  // apiServerUrl: 'https://zjthjyhf.yangfanqichu.com', // 外网
  // apiServerUrl: 'http://yfqc.synology.me:8088', // 57测试环境映射到外网的地址（在家可用）
};
module.exports = {
  serveData: serveData };

/***/ }),

/***/ 45:
/*!******************************************!*\
  !*** D:/WebCode/uniVideo/utils/tools.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(uni) {// 加载...显示
function showLoading(msg) {
  uni.showLoading({
    title: msg,
    mask: true });

}

// 加载...隐藏
function hideLoading() {
  uni.hideLoading();
}

// 对话框
function showModal(title, content, confirmText, cancelText, confirmColor, cancelColor, showCancel, successcallback, failcallback) {
  uni.showModal({
    title: title,
    content: content,
    confirmText: confirmText,
    cancelText: cancelText,
    confirmColor: confirmColor,
    cancelColor: cancelColor,
    showCancel: showCancel,
    success: function success(res) {
      if (res.confirm) {
        successcallback();
      } else {
        failcallback();
      }
    },
    fail: function fail(res) {
      if (res.confirm) {
        failcallback();
      }
    } });

}

//操作成功
function showSuccessToast(msg) {
  uni.showToast({
    title: msg,
    duration: 2000,
    icon: 'success' });

}

//操作失败
function showErrorToast(msg) {
  uni.showToast({
    title: msg,
    duration: 3000,
    icon: 'none',
    image: '' });

}

module.exports = {
  showLoading: showLoading,
  hideLoading: hideLoading,
  showModal: showModal,
  showErrorToast: showErrorToast,
  showSuccessToast: showSuccessToast };
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 88:
/*!***************************************************!*\
  !*** D:/WebCode/uniVideo/static/img/loginBg1.png ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 89:
/*!***************************************************!*\
  !*** D:/WebCode/uniVideo/static/img/loginBg2.png ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/static/img/loginBg2.png";

/***/ }),

/***/ 90:
/*!****************************************************!*\
  !*** D:/WebCode/uniVideo/static/moreIcon/myBg.png ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ })

}]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map