/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/rxjs/dist/esm5/internal/NotificationFactories.js":
/*!***********************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/NotificationFactories.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "COMPLETE_NOTIFICATION": () => (/* binding */ COMPLETE_NOTIFICATION),
/* harmony export */   "createNotification": () => (/* binding */ createNotification),
/* harmony export */   "errorNotification": () => (/* binding */ errorNotification),
/* harmony export */   "nextNotification": () => (/* binding */ nextNotification)
/* harmony export */ });
var COMPLETE_NOTIFICATION = (function () { return createNotification('C', undefined, undefined); })();
function errorNotification(error) {
    return createNotification('E', undefined, error);
}
function nextNotification(value) {
    return createNotification('N', value, undefined);
}
function createNotification(kind, value, error) {
    return {
        kind: kind,
        value: value,
        error: error,
    };
}
//# sourceMappingURL=NotificationFactories.js.map

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/Observable.js":
/*!************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/Observable.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Observable": () => (/* binding */ Observable)
/* harmony export */ });
/* harmony import */ var _Subscriber__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Subscriber */ "./node_modules/rxjs/dist/esm5/internal/Subscriber.js");
/* harmony import */ var _Subscription__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Subscription */ "./node_modules/rxjs/dist/esm5/internal/Subscription.js");
/* harmony import */ var _symbol_observable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./symbol/observable */ "./node_modules/rxjs/dist/esm5/internal/symbol/observable.js");
/* harmony import */ var _util_pipe__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./util/pipe */ "./node_modules/rxjs/dist/esm5/internal/util/pipe.js");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./config */ "./node_modules/rxjs/dist/esm5/internal/config.js");
/* harmony import */ var _util_isFunction__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./util/isFunction */ "./node_modules/rxjs/dist/esm5/internal/util/isFunction.js");
/* harmony import */ var _util_errorContext__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util/errorContext */ "./node_modules/rxjs/dist/esm5/internal/util/errorContext.js");







var Observable = (function () {
    function Observable(subscribe) {
        if (subscribe) {
            this._subscribe = subscribe;
        }
    }
    Observable.prototype.lift = function (operator) {
        var observable = new Observable();
        observable.source = this;
        observable.operator = operator;
        return observable;
    };
    Observable.prototype.subscribe = function (observerOrNext, error, complete) {
        var _this = this;
        var subscriber = isSubscriber(observerOrNext) ? observerOrNext : new _Subscriber__WEBPACK_IMPORTED_MODULE_0__.SafeSubscriber(observerOrNext, error, complete);
        (0,_util_errorContext__WEBPACK_IMPORTED_MODULE_1__.errorContext)(function () {
            var _a = _this, operator = _a.operator, source = _a.source;
            subscriber.add(operator
                ?
                    operator.call(subscriber, source)
                : source
                    ?
                        _this._subscribe(subscriber)
                    :
                        _this._trySubscribe(subscriber));
        });
        return subscriber;
    };
    Observable.prototype._trySubscribe = function (sink) {
        try {
            return this._subscribe(sink);
        }
        catch (err) {
            sink.error(err);
        }
    };
    Observable.prototype.forEach = function (next, promiseCtor) {
        var _this = this;
        promiseCtor = getPromiseCtor(promiseCtor);
        return new promiseCtor(function (resolve, reject) {
            var subscriber = new _Subscriber__WEBPACK_IMPORTED_MODULE_0__.SafeSubscriber({
                next: function (value) {
                    try {
                        next(value);
                    }
                    catch (err) {
                        reject(err);
                        subscriber.unsubscribe();
                    }
                },
                error: reject,
                complete: resolve,
            });
            _this.subscribe(subscriber);
        });
    };
    Observable.prototype._subscribe = function (subscriber) {
        var _a;
        return (_a = this.source) === null || _a === void 0 ? void 0 : _a.subscribe(subscriber);
    };
    Observable.prototype[_symbol_observable__WEBPACK_IMPORTED_MODULE_2__.observable] = function () {
        return this;
    };
    Observable.prototype.pipe = function () {
        var operations = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            operations[_i] = arguments[_i];
        }
        return (0,_util_pipe__WEBPACK_IMPORTED_MODULE_3__.pipeFromArray)(operations)(this);
    };
    Observable.prototype.toPromise = function (promiseCtor) {
        var _this = this;
        promiseCtor = getPromiseCtor(promiseCtor);
        return new promiseCtor(function (resolve, reject) {
            var value;
            _this.subscribe(function (x) { return (value = x); }, function (err) { return reject(err); }, function () { return resolve(value); });
        });
    };
    Observable.create = function (subscribe) {
        return new Observable(subscribe);
    };
    return Observable;
}());

function getPromiseCtor(promiseCtor) {
    var _a;
    return (_a = promiseCtor !== null && promiseCtor !== void 0 ? promiseCtor : _config__WEBPACK_IMPORTED_MODULE_4__.config.Promise) !== null && _a !== void 0 ? _a : Promise;
}
function isObserver(value) {
    return value && (0,_util_isFunction__WEBPACK_IMPORTED_MODULE_5__.isFunction)(value.next) && (0,_util_isFunction__WEBPACK_IMPORTED_MODULE_5__.isFunction)(value.error) && (0,_util_isFunction__WEBPACK_IMPORTED_MODULE_5__.isFunction)(value.complete);
}
function isSubscriber(value) {
    return (value && value instanceof _Subscriber__WEBPACK_IMPORTED_MODULE_0__.Subscriber) || (isObserver(value) && (0,_Subscription__WEBPACK_IMPORTED_MODULE_6__.isSubscription)(value));
}
//# sourceMappingURL=Observable.js.map

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/ReplaySubject.js":
/*!***************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/ReplaySubject.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ReplaySubject": () => (/* binding */ ReplaySubject)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _Subject__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Subject */ "./node_modules/rxjs/dist/esm5/internal/Subject.js");
/* harmony import */ var _scheduler_dateTimestampProvider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./scheduler/dateTimestampProvider */ "./node_modules/rxjs/dist/esm5/internal/scheduler/dateTimestampProvider.js");



var ReplaySubject = (function (_super) {
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__extends)(ReplaySubject, _super);
    function ReplaySubject(_bufferSize, _windowTime, _timestampProvider) {
        if (_bufferSize === void 0) { _bufferSize = Infinity; }
        if (_windowTime === void 0) { _windowTime = Infinity; }
        if (_timestampProvider === void 0) { _timestampProvider = _scheduler_dateTimestampProvider__WEBPACK_IMPORTED_MODULE_1__.dateTimestampProvider; }
        var _this = _super.call(this) || this;
        _this._bufferSize = _bufferSize;
        _this._windowTime = _windowTime;
        _this._timestampProvider = _timestampProvider;
        _this._buffer = [];
        _this._infiniteTimeWindow = true;
        _this._infiniteTimeWindow = _windowTime === Infinity;
        _this._bufferSize = Math.max(1, _bufferSize);
        _this._windowTime = Math.max(1, _windowTime);
        return _this;
    }
    ReplaySubject.prototype.next = function (value) {
        var _a = this, isStopped = _a.isStopped, _buffer = _a._buffer, _infiniteTimeWindow = _a._infiniteTimeWindow, _timestampProvider = _a._timestampProvider, _windowTime = _a._windowTime;
        if (!isStopped) {
            _buffer.push(value);
            !_infiniteTimeWindow && _buffer.push(_timestampProvider.now() + _windowTime);
        }
        this._trimBuffer();
        _super.prototype.next.call(this, value);
    };
    ReplaySubject.prototype._subscribe = function (subscriber) {
        this._throwIfClosed();
        this._trimBuffer();
        var subscription = this._innerSubscribe(subscriber);
        var _a = this, _infiniteTimeWindow = _a._infiniteTimeWindow, _buffer = _a._buffer;
        var copy = _buffer.slice();
        for (var i = 0; i < copy.length && !subscriber.closed; i += _infiniteTimeWindow ? 1 : 2) {
            subscriber.next(copy[i]);
        }
        this._checkFinalizedStatuses(subscriber);
        return subscription;
    };
    ReplaySubject.prototype._trimBuffer = function () {
        var _a = this, _bufferSize = _a._bufferSize, _timestampProvider = _a._timestampProvider, _buffer = _a._buffer, _infiniteTimeWindow = _a._infiniteTimeWindow;
        var adjustedBufferSize = (_infiniteTimeWindow ? 1 : 2) * _bufferSize;
        _bufferSize < Infinity && adjustedBufferSize < _buffer.length && _buffer.splice(0, _buffer.length - adjustedBufferSize);
        if (!_infiniteTimeWindow) {
            var now = _timestampProvider.now();
            var last = 0;
            for (var i = 1; i < _buffer.length && _buffer[i] <= now; i += 2) {
                last = i;
            }
            last && _buffer.splice(0, last + 1);
        }
    };
    return ReplaySubject;
}(_Subject__WEBPACK_IMPORTED_MODULE_2__.Subject));

//# sourceMappingURL=ReplaySubject.js.map

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/Subject.js":
/*!*********************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/Subject.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AnonymousSubject": () => (/* binding */ AnonymousSubject),
/* harmony export */   "Subject": () => (/* binding */ Subject)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _Observable__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Observable */ "./node_modules/rxjs/dist/esm5/internal/Observable.js");
/* harmony import */ var _Subscription__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Subscription */ "./node_modules/rxjs/dist/esm5/internal/Subscription.js");
/* harmony import */ var _util_ObjectUnsubscribedError__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util/ObjectUnsubscribedError */ "./node_modules/rxjs/dist/esm5/internal/util/ObjectUnsubscribedError.js");
/* harmony import */ var _util_arrRemove__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./util/arrRemove */ "./node_modules/rxjs/dist/esm5/internal/util/arrRemove.js");
/* harmony import */ var _util_errorContext__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./util/errorContext */ "./node_modules/rxjs/dist/esm5/internal/util/errorContext.js");






var Subject = (function (_super) {
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__extends)(Subject, _super);
    function Subject() {
        var _this = _super.call(this) || this;
        _this.closed = false;
        _this.currentObservers = null;
        _this.observers = [];
        _this.isStopped = false;
        _this.hasError = false;
        _this.thrownError = null;
        return _this;
    }
    Subject.prototype.lift = function (operator) {
        var subject = new AnonymousSubject(this, this);
        subject.operator = operator;
        return subject;
    };
    Subject.prototype._throwIfClosed = function () {
        if (this.closed) {
            throw new _util_ObjectUnsubscribedError__WEBPACK_IMPORTED_MODULE_1__.ObjectUnsubscribedError();
        }
    };
    Subject.prototype.next = function (value) {
        var _this = this;
        (0,_util_errorContext__WEBPACK_IMPORTED_MODULE_2__.errorContext)(function () {
            var e_1, _a;
            _this._throwIfClosed();
            if (!_this.isStopped) {
                if (!_this.currentObservers) {
                    _this.currentObservers = Array.from(_this.observers);
                }
                try {
                    for (var _b = (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__values)(_this.currentObservers), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var observer = _c.value;
                        observer.next(value);
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            }
        });
    };
    Subject.prototype.error = function (err) {
        var _this = this;
        (0,_util_errorContext__WEBPACK_IMPORTED_MODULE_2__.errorContext)(function () {
            _this._throwIfClosed();
            if (!_this.isStopped) {
                _this.hasError = _this.isStopped = true;
                _this.thrownError = err;
                var observers = _this.observers;
                while (observers.length) {
                    observers.shift().error(err);
                }
            }
        });
    };
    Subject.prototype.complete = function () {
        var _this = this;
        (0,_util_errorContext__WEBPACK_IMPORTED_MODULE_2__.errorContext)(function () {
            _this._throwIfClosed();
            if (!_this.isStopped) {
                _this.isStopped = true;
                var observers = _this.observers;
                while (observers.length) {
                    observers.shift().complete();
                }
            }
        });
    };
    Subject.prototype.unsubscribe = function () {
        this.isStopped = this.closed = true;
        this.observers = this.currentObservers = null;
    };
    Object.defineProperty(Subject.prototype, "observed", {
        get: function () {
            var _a;
            return ((_a = this.observers) === null || _a === void 0 ? void 0 : _a.length) > 0;
        },
        enumerable: false,
        configurable: true
    });
    Subject.prototype._trySubscribe = function (subscriber) {
        this._throwIfClosed();
        return _super.prototype._trySubscribe.call(this, subscriber);
    };
    Subject.prototype._subscribe = function (subscriber) {
        this._throwIfClosed();
        this._checkFinalizedStatuses(subscriber);
        return this._innerSubscribe(subscriber);
    };
    Subject.prototype._innerSubscribe = function (subscriber) {
        var _this = this;
        var _a = this, hasError = _a.hasError, isStopped = _a.isStopped, observers = _a.observers;
        if (hasError || isStopped) {
            return _Subscription__WEBPACK_IMPORTED_MODULE_3__.EMPTY_SUBSCRIPTION;
        }
        this.currentObservers = null;
        observers.push(subscriber);
        return new _Subscription__WEBPACK_IMPORTED_MODULE_3__.Subscription(function () {
            _this.currentObservers = null;
            (0,_util_arrRemove__WEBPACK_IMPORTED_MODULE_4__.arrRemove)(observers, subscriber);
        });
    };
    Subject.prototype._checkFinalizedStatuses = function (subscriber) {
        var _a = this, hasError = _a.hasError, thrownError = _a.thrownError, isStopped = _a.isStopped;
        if (hasError) {
            subscriber.error(thrownError);
        }
        else if (isStopped) {
            subscriber.complete();
        }
    };
    Subject.prototype.asObservable = function () {
        var observable = new _Observable__WEBPACK_IMPORTED_MODULE_5__.Observable();
        observable.source = this;
        return observable;
    };
    Subject.create = function (destination, source) {
        return new AnonymousSubject(destination, source);
    };
    return Subject;
}(_Observable__WEBPACK_IMPORTED_MODULE_5__.Observable));

var AnonymousSubject = (function (_super) {
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__extends)(AnonymousSubject, _super);
    function AnonymousSubject(destination, source) {
        var _this = _super.call(this) || this;
        _this.destination = destination;
        _this.source = source;
        return _this;
    }
    AnonymousSubject.prototype.next = function (value) {
        var _a, _b;
        (_b = (_a = this.destination) === null || _a === void 0 ? void 0 : _a.next) === null || _b === void 0 ? void 0 : _b.call(_a, value);
    };
    AnonymousSubject.prototype.error = function (err) {
        var _a, _b;
        (_b = (_a = this.destination) === null || _a === void 0 ? void 0 : _a.error) === null || _b === void 0 ? void 0 : _b.call(_a, err);
    };
    AnonymousSubject.prototype.complete = function () {
        var _a, _b;
        (_b = (_a = this.destination) === null || _a === void 0 ? void 0 : _a.complete) === null || _b === void 0 ? void 0 : _b.call(_a);
    };
    AnonymousSubject.prototype._subscribe = function (subscriber) {
        var _a, _b;
        return (_b = (_a = this.source) === null || _a === void 0 ? void 0 : _a.subscribe(subscriber)) !== null && _b !== void 0 ? _b : _Subscription__WEBPACK_IMPORTED_MODULE_3__.EMPTY_SUBSCRIPTION;
    };
    return AnonymousSubject;
}(Subject));

//# sourceMappingURL=Subject.js.map

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/Subscriber.js":
/*!************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/Subscriber.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EMPTY_OBSERVER": () => (/* binding */ EMPTY_OBSERVER),
/* harmony export */   "SafeSubscriber": () => (/* binding */ SafeSubscriber),
/* harmony export */   "Subscriber": () => (/* binding */ Subscriber)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _util_isFunction__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./util/isFunction */ "./node_modules/rxjs/dist/esm5/internal/util/isFunction.js");
/* harmony import */ var _Subscription__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Subscription */ "./node_modules/rxjs/dist/esm5/internal/Subscription.js");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./config */ "./node_modules/rxjs/dist/esm5/internal/config.js");
/* harmony import */ var _util_reportUnhandledError__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./util/reportUnhandledError */ "./node_modules/rxjs/dist/esm5/internal/util/reportUnhandledError.js");
/* harmony import */ var _util_noop__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./util/noop */ "./node_modules/rxjs/dist/esm5/internal/util/noop.js");
/* harmony import */ var _NotificationFactories__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./NotificationFactories */ "./node_modules/rxjs/dist/esm5/internal/NotificationFactories.js");
/* harmony import */ var _scheduler_timeoutProvider__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./scheduler/timeoutProvider */ "./node_modules/rxjs/dist/esm5/internal/scheduler/timeoutProvider.js");
/* harmony import */ var _util_errorContext__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./util/errorContext */ "./node_modules/rxjs/dist/esm5/internal/util/errorContext.js");









var Subscriber = (function (_super) {
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__extends)(Subscriber, _super);
    function Subscriber(destination) {
        var _this = _super.call(this) || this;
        _this.isStopped = false;
        if (destination) {
            _this.destination = destination;
            if ((0,_Subscription__WEBPACK_IMPORTED_MODULE_1__.isSubscription)(destination)) {
                destination.add(_this);
            }
        }
        else {
            _this.destination = EMPTY_OBSERVER;
        }
        return _this;
    }
    Subscriber.create = function (next, error, complete) {
        return new SafeSubscriber(next, error, complete);
    };
    Subscriber.prototype.next = function (value) {
        if (this.isStopped) {
            handleStoppedNotification((0,_NotificationFactories__WEBPACK_IMPORTED_MODULE_2__.nextNotification)(value), this);
        }
        else {
            this._next(value);
        }
    };
    Subscriber.prototype.error = function (err) {
        if (this.isStopped) {
            handleStoppedNotification((0,_NotificationFactories__WEBPACK_IMPORTED_MODULE_2__.errorNotification)(err), this);
        }
        else {
            this.isStopped = true;
            this._error(err);
        }
    };
    Subscriber.prototype.complete = function () {
        if (this.isStopped) {
            handleStoppedNotification(_NotificationFactories__WEBPACK_IMPORTED_MODULE_2__.COMPLETE_NOTIFICATION, this);
        }
        else {
            this.isStopped = true;
            this._complete();
        }
    };
    Subscriber.prototype.unsubscribe = function () {
        if (!this.closed) {
            this.isStopped = true;
            _super.prototype.unsubscribe.call(this);
            this.destination = null;
        }
    };
    Subscriber.prototype._next = function (value) {
        this.destination.next(value);
    };
    Subscriber.prototype._error = function (err) {
        try {
            this.destination.error(err);
        }
        finally {
            this.unsubscribe();
        }
    };
    Subscriber.prototype._complete = function () {
        try {
            this.destination.complete();
        }
        finally {
            this.unsubscribe();
        }
    };
    return Subscriber;
}(_Subscription__WEBPACK_IMPORTED_MODULE_1__.Subscription));

var _bind = Function.prototype.bind;
function bind(fn, thisArg) {
    return _bind.call(fn, thisArg);
}
var ConsumerObserver = (function () {
    function ConsumerObserver(partialObserver) {
        this.partialObserver = partialObserver;
    }
    ConsumerObserver.prototype.next = function (value) {
        var partialObserver = this.partialObserver;
        if (partialObserver.next) {
            try {
                partialObserver.next(value);
            }
            catch (error) {
                handleUnhandledError(error);
            }
        }
    };
    ConsumerObserver.prototype.error = function (err) {
        var partialObserver = this.partialObserver;
        if (partialObserver.error) {
            try {
                partialObserver.error(err);
            }
            catch (error) {
                handleUnhandledError(error);
            }
        }
        else {
            handleUnhandledError(err);
        }
    };
    ConsumerObserver.prototype.complete = function () {
        var partialObserver = this.partialObserver;
        if (partialObserver.complete) {
            try {
                partialObserver.complete();
            }
            catch (error) {
                handleUnhandledError(error);
            }
        }
    };
    return ConsumerObserver;
}());
var SafeSubscriber = (function (_super) {
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__extends)(SafeSubscriber, _super);
    function SafeSubscriber(observerOrNext, error, complete) {
        var _this = _super.call(this) || this;
        var partialObserver;
        if ((0,_util_isFunction__WEBPACK_IMPORTED_MODULE_3__.isFunction)(observerOrNext) || !observerOrNext) {
            partialObserver = {
                next: observerOrNext !== null && observerOrNext !== void 0 ? observerOrNext : undefined,
                error: error !== null && error !== void 0 ? error : undefined,
                complete: complete !== null && complete !== void 0 ? complete : undefined,
            };
        }
        else {
            var context_1;
            if (_this && _config__WEBPACK_IMPORTED_MODULE_4__.config.useDeprecatedNextContext) {
                context_1 = Object.create(observerOrNext);
                context_1.unsubscribe = function () { return _this.unsubscribe(); };
                partialObserver = {
                    next: observerOrNext.next && bind(observerOrNext.next, context_1),
                    error: observerOrNext.error && bind(observerOrNext.error, context_1),
                    complete: observerOrNext.complete && bind(observerOrNext.complete, context_1),
                };
            }
            else {
                partialObserver = observerOrNext;
            }
        }
        _this.destination = new ConsumerObserver(partialObserver);
        return _this;
    }
    return SafeSubscriber;
}(Subscriber));

function handleUnhandledError(error) {
    if (_config__WEBPACK_IMPORTED_MODULE_4__.config.useDeprecatedSynchronousErrorHandling) {
        (0,_util_errorContext__WEBPACK_IMPORTED_MODULE_5__.captureError)(error);
    }
    else {
        (0,_util_reportUnhandledError__WEBPACK_IMPORTED_MODULE_6__.reportUnhandledError)(error);
    }
}
function defaultErrorHandler(err) {
    throw err;
}
function handleStoppedNotification(notification, subscriber) {
    var onStoppedNotification = _config__WEBPACK_IMPORTED_MODULE_4__.config.onStoppedNotification;
    onStoppedNotification && _scheduler_timeoutProvider__WEBPACK_IMPORTED_MODULE_7__.timeoutProvider.setTimeout(function () { return onStoppedNotification(notification, subscriber); });
}
var EMPTY_OBSERVER = {
    closed: true,
    next: _util_noop__WEBPACK_IMPORTED_MODULE_8__.noop,
    error: defaultErrorHandler,
    complete: _util_noop__WEBPACK_IMPORTED_MODULE_8__.noop,
};
//# sourceMappingURL=Subscriber.js.map

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/Subscription.js":
/*!**************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/Subscription.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EMPTY_SUBSCRIPTION": () => (/* binding */ EMPTY_SUBSCRIPTION),
/* harmony export */   "Subscription": () => (/* binding */ Subscription),
/* harmony export */   "isSubscription": () => (/* binding */ isSubscription)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _util_isFunction__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util/isFunction */ "./node_modules/rxjs/dist/esm5/internal/util/isFunction.js");
/* harmony import */ var _util_UnsubscriptionError__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./util/UnsubscriptionError */ "./node_modules/rxjs/dist/esm5/internal/util/UnsubscriptionError.js");
/* harmony import */ var _util_arrRemove__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./util/arrRemove */ "./node_modules/rxjs/dist/esm5/internal/util/arrRemove.js");




var Subscription = (function () {
    function Subscription(initialTeardown) {
        this.initialTeardown = initialTeardown;
        this.closed = false;
        this._parentage = null;
        this._finalizers = null;
    }
    Subscription.prototype.unsubscribe = function () {
        var e_1, _a, e_2, _b;
        var errors;
        if (!this.closed) {
            this.closed = true;
            var _parentage = this._parentage;
            if (_parentage) {
                this._parentage = null;
                if (Array.isArray(_parentage)) {
                    try {
                        for (var _parentage_1 = (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__values)(_parentage), _parentage_1_1 = _parentage_1.next(); !_parentage_1_1.done; _parentage_1_1 = _parentage_1.next()) {
                            var parent_1 = _parentage_1_1.value;
                            parent_1.remove(this);
                        }
                    }
                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
                    finally {
                        try {
                            if (_parentage_1_1 && !_parentage_1_1.done && (_a = _parentage_1.return)) _a.call(_parentage_1);
                        }
                        finally { if (e_1) throw e_1.error; }
                    }
                }
                else {
                    _parentage.remove(this);
                }
            }
            var initialFinalizer = this.initialTeardown;
            if ((0,_util_isFunction__WEBPACK_IMPORTED_MODULE_1__.isFunction)(initialFinalizer)) {
                try {
                    initialFinalizer();
                }
                catch (e) {
                    errors = e instanceof _util_UnsubscriptionError__WEBPACK_IMPORTED_MODULE_2__.UnsubscriptionError ? e.errors : [e];
                }
            }
            var _finalizers = this._finalizers;
            if (_finalizers) {
                this._finalizers = null;
                try {
                    for (var _finalizers_1 = (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__values)(_finalizers), _finalizers_1_1 = _finalizers_1.next(); !_finalizers_1_1.done; _finalizers_1_1 = _finalizers_1.next()) {
                        var finalizer = _finalizers_1_1.value;
                        try {
                            execFinalizer(finalizer);
                        }
                        catch (err) {
                            errors = errors !== null && errors !== void 0 ? errors : [];
                            if (err instanceof _util_UnsubscriptionError__WEBPACK_IMPORTED_MODULE_2__.UnsubscriptionError) {
                                errors = (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__spreadArray)((0,tslib__WEBPACK_IMPORTED_MODULE_0__.__spreadArray)([], (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__read)(errors)), (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__read)(err.errors));
                            }
                            else {
                                errors.push(err);
                            }
                        }
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (_finalizers_1_1 && !_finalizers_1_1.done && (_b = _finalizers_1.return)) _b.call(_finalizers_1);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
            }
            if (errors) {
                throw new _util_UnsubscriptionError__WEBPACK_IMPORTED_MODULE_2__.UnsubscriptionError(errors);
            }
        }
    };
    Subscription.prototype.add = function (teardown) {
        var _a;
        if (teardown && teardown !== this) {
            if (this.closed) {
                execFinalizer(teardown);
            }
            else {
                if (teardown instanceof Subscription) {
                    if (teardown.closed || teardown._hasParent(this)) {
                        return;
                    }
                    teardown._addParent(this);
                }
                (this._finalizers = (_a = this._finalizers) !== null && _a !== void 0 ? _a : []).push(teardown);
            }
        }
    };
    Subscription.prototype._hasParent = function (parent) {
        var _parentage = this._parentage;
        return _parentage === parent || (Array.isArray(_parentage) && _parentage.includes(parent));
    };
    Subscription.prototype._addParent = function (parent) {
        var _parentage = this._parentage;
        this._parentage = Array.isArray(_parentage) ? (_parentage.push(parent), _parentage) : _parentage ? [_parentage, parent] : parent;
    };
    Subscription.prototype._removeParent = function (parent) {
        var _parentage = this._parentage;
        if (_parentage === parent) {
            this._parentage = null;
        }
        else if (Array.isArray(_parentage)) {
            (0,_util_arrRemove__WEBPACK_IMPORTED_MODULE_3__.arrRemove)(_parentage, parent);
        }
    };
    Subscription.prototype.remove = function (teardown) {
        var _finalizers = this._finalizers;
        _finalizers && (0,_util_arrRemove__WEBPACK_IMPORTED_MODULE_3__.arrRemove)(_finalizers, teardown);
        if (teardown instanceof Subscription) {
            teardown._removeParent(this);
        }
    };
    Subscription.EMPTY = (function () {
        var empty = new Subscription();
        empty.closed = true;
        return empty;
    })();
    return Subscription;
}());

var EMPTY_SUBSCRIPTION = Subscription.EMPTY;
function isSubscription(value) {
    return (value instanceof Subscription ||
        (value && 'closed' in value && (0,_util_isFunction__WEBPACK_IMPORTED_MODULE_1__.isFunction)(value.remove) && (0,_util_isFunction__WEBPACK_IMPORTED_MODULE_1__.isFunction)(value.add) && (0,_util_isFunction__WEBPACK_IMPORTED_MODULE_1__.isFunction)(value.unsubscribe)));
}
function execFinalizer(finalizer) {
    if ((0,_util_isFunction__WEBPACK_IMPORTED_MODULE_1__.isFunction)(finalizer)) {
        finalizer();
    }
    else {
        finalizer.unsubscribe();
    }
}
//# sourceMappingURL=Subscription.js.map

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/config.js":
/*!********************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/config.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "config": () => (/* binding */ config)
/* harmony export */ });
var config = {
    onUnhandledError: null,
    onStoppedNotification: null,
    Promise: undefined,
    useDeprecatedSynchronousErrorHandling: false,
    useDeprecatedNextContext: false,
};
//# sourceMappingURL=config.js.map

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/scheduler/dateTimestampProvider.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/scheduler/dateTimestampProvider.js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "dateTimestampProvider": () => (/* binding */ dateTimestampProvider)
/* harmony export */ });
var dateTimestampProvider = {
    now: function () {
        return (dateTimestampProvider.delegate || Date).now();
    },
    delegate: undefined,
};
//# sourceMappingURL=dateTimestampProvider.js.map

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/scheduler/timeoutProvider.js":
/*!***************************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/scheduler/timeoutProvider.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "timeoutProvider": () => (/* binding */ timeoutProvider)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");

var timeoutProvider = {
    setTimeout: function (handler, timeout) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        var delegate = timeoutProvider.delegate;
        if (delegate === null || delegate === void 0 ? void 0 : delegate.setTimeout) {
            return delegate.setTimeout.apply(delegate, (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__spreadArray)([handler, timeout], (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__read)(args)));
        }
        return setTimeout.apply(void 0, (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__spreadArray)([handler, timeout], (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__read)(args)));
    },
    clearTimeout: function (handle) {
        var delegate = timeoutProvider.delegate;
        return ((delegate === null || delegate === void 0 ? void 0 : delegate.clearTimeout) || clearTimeout)(handle);
    },
    delegate: undefined,
};
//# sourceMappingURL=timeoutProvider.js.map

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/symbol/observable.js":
/*!*******************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/symbol/observable.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "observable": () => (/* binding */ observable)
/* harmony export */ });
var observable = (function () { return (typeof Symbol === 'function' && Symbol.observable) || '@@observable'; })();
//# sourceMappingURL=observable.js.map

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/util/ObjectUnsubscribedError.js":
/*!******************************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/util/ObjectUnsubscribedError.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ObjectUnsubscribedError": () => (/* binding */ ObjectUnsubscribedError)
/* harmony export */ });
/* harmony import */ var _createErrorClass__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./createErrorClass */ "./node_modules/rxjs/dist/esm5/internal/util/createErrorClass.js");

var ObjectUnsubscribedError = (0,_createErrorClass__WEBPACK_IMPORTED_MODULE_0__.createErrorClass)(function (_super) {
    return function ObjectUnsubscribedErrorImpl() {
        _super(this);
        this.name = 'ObjectUnsubscribedError';
        this.message = 'object unsubscribed';
    };
});
//# sourceMappingURL=ObjectUnsubscribedError.js.map

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/util/UnsubscriptionError.js":
/*!**************************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/util/UnsubscriptionError.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UnsubscriptionError": () => (/* binding */ UnsubscriptionError)
/* harmony export */ });
/* harmony import */ var _createErrorClass__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./createErrorClass */ "./node_modules/rxjs/dist/esm5/internal/util/createErrorClass.js");

var UnsubscriptionError = (0,_createErrorClass__WEBPACK_IMPORTED_MODULE_0__.createErrorClass)(function (_super) {
    return function UnsubscriptionErrorImpl(errors) {
        _super(this);
        this.message = errors
            ? errors.length + " errors occurred during unsubscription:\n" + errors.map(function (err, i) { return i + 1 + ") " + err.toString(); }).join('\n  ')
            : '';
        this.name = 'UnsubscriptionError';
        this.errors = errors;
    };
});
//# sourceMappingURL=UnsubscriptionError.js.map

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/util/arrRemove.js":
/*!****************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/util/arrRemove.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "arrRemove": () => (/* binding */ arrRemove)
/* harmony export */ });
function arrRemove(arr, item) {
    if (arr) {
        var index = arr.indexOf(item);
        0 <= index && arr.splice(index, 1);
    }
}
//# sourceMappingURL=arrRemove.js.map

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/util/createErrorClass.js":
/*!***********************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/util/createErrorClass.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createErrorClass": () => (/* binding */ createErrorClass)
/* harmony export */ });
function createErrorClass(createImpl) {
    var _super = function (instance) {
        Error.call(instance);
        instance.stack = new Error().stack;
    };
    var ctorFunc = createImpl(_super);
    ctorFunc.prototype = Object.create(Error.prototype);
    ctorFunc.prototype.constructor = ctorFunc;
    return ctorFunc;
}
//# sourceMappingURL=createErrorClass.js.map

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/util/errorContext.js":
/*!*******************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/util/errorContext.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "captureError": () => (/* binding */ captureError),
/* harmony export */   "errorContext": () => (/* binding */ errorContext)
/* harmony export */ });
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../config */ "./node_modules/rxjs/dist/esm5/internal/config.js");

var context = null;
function errorContext(cb) {
    if (_config__WEBPACK_IMPORTED_MODULE_0__.config.useDeprecatedSynchronousErrorHandling) {
        var isRoot = !context;
        if (isRoot) {
            context = { errorThrown: false, error: null };
        }
        cb();
        if (isRoot) {
            var _a = context, errorThrown = _a.errorThrown, error = _a.error;
            context = null;
            if (errorThrown) {
                throw error;
            }
        }
    }
    else {
        cb();
    }
}
function captureError(err) {
    if (_config__WEBPACK_IMPORTED_MODULE_0__.config.useDeprecatedSynchronousErrorHandling && context) {
        context.errorThrown = true;
        context.error = err;
    }
}
//# sourceMappingURL=errorContext.js.map

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/util/identity.js":
/*!***************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/util/identity.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "identity": () => (/* binding */ identity)
/* harmony export */ });
function identity(x) {
    return x;
}
//# sourceMappingURL=identity.js.map

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/util/isFunction.js":
/*!*****************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/util/isFunction.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isFunction": () => (/* binding */ isFunction)
/* harmony export */ });
function isFunction(value) {
    return typeof value === 'function';
}
//# sourceMappingURL=isFunction.js.map

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/util/noop.js":
/*!***********************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/util/noop.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "noop": () => (/* binding */ noop)
/* harmony export */ });
function noop() { }
//# sourceMappingURL=noop.js.map

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/util/pipe.js":
/*!***********************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/util/pipe.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "pipe": () => (/* binding */ pipe),
/* harmony export */   "pipeFromArray": () => (/* binding */ pipeFromArray)
/* harmony export */ });
/* harmony import */ var _identity__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./identity */ "./node_modules/rxjs/dist/esm5/internal/util/identity.js");

function pipe() {
    var fns = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        fns[_i] = arguments[_i];
    }
    return pipeFromArray(fns);
}
function pipeFromArray(fns) {
    if (fns.length === 0) {
        return _identity__WEBPACK_IMPORTED_MODULE_0__.identity;
    }
    if (fns.length === 1) {
        return fns[0];
    }
    return function piped(input) {
        return fns.reduce(function (prev, fn) { return fn(prev); }, input);
    };
}
//# sourceMappingURL=pipe.js.map

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/util/reportUnhandledError.js":
/*!***************************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/util/reportUnhandledError.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "reportUnhandledError": () => (/* binding */ reportUnhandledError)
/* harmony export */ });
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../config */ "./node_modules/rxjs/dist/esm5/internal/config.js");
/* harmony import */ var _scheduler_timeoutProvider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../scheduler/timeoutProvider */ "./node_modules/rxjs/dist/esm5/internal/scheduler/timeoutProvider.js");


function reportUnhandledError(err) {
    _scheduler_timeoutProvider__WEBPACK_IMPORTED_MODULE_0__.timeoutProvider.setTimeout(function () {
        var onUnhandledError = _config__WEBPACK_IMPORTED_MODULE_1__.config.onUnhandledError;
        if (onUnhandledError) {
            onUnhandledError(err);
        }
        else {
            throw err;
        }
    });
}
//# sourceMappingURL=reportUnhandledError.js.map

/***/ }),

/***/ "./src/bouncing_image.ts":
/*!*******************************!*\
  !*** ./src/bouncing_image.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BouncingImage": () => (/* binding */ BouncingImage)
/* harmony export */ });
/* harmony import */ var _stats__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./stats */ "./src/stats.ts");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util */ "./src/util.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};


class BouncingImage {
    constructor(imageData, settings, stats) {
        this.imageData = imageData;
        this.settings = settings;
        this.stats = stats;
        this.position = { x: 0, y: 0 };
        this.direction = 1;
        this.totalD = 0;
        this.currD = 0;
        this.canvasWidth = 0;
        this.canvasHeight = 0;
        this.colorBehaviors = {
            none: new NoneColorBehavior(this),
            rainbow: new RainbowColorBehavior(this),
            classic: new ClassicColorBehavior(this),
        };
    }
    tick(count) {
        const tickStateDelta = this.tickPosition(count);
        this.tickColor(count, tickStateDelta);
    }
    /**
     * This article helped me figure this out:
     *    http://lostmathlessons.blogspot.com/2016/03/bouncing-dvd-logo.html
     */
    tickPosition(count) {
        let tickStateDelta = {};
        const PIXELS_PER_MILLISECOND = this.settings.getSetting('speed');
        const MAX_TICK_COUNT = 10000;
        if (count > MAX_TICK_COUNT) {
            count = 1;
        }
        const prevD = this.currD;
        this.currD = prevD + (count * PIXELS_PER_MILLISECOND * this.direction);
        let hitCorner = false;
        // If we went far out of bounds, bounce back an equal amount.
        if (this.currD >= this.totalD) {
            const delta = this.currD - this.totalD;
            this.currD = this.totalD - delta;
            hitCorner = true;
        }
        if (this.currD <= 0) {
            const delta = Math.abs(this.currD);
            this.currD = delta;
            hitCorner = true;
        }
        if (hitCorner) {
            this.direction *= -1;
            this.settings.setPersistedSetting('cornersHit', ch => ch + 1);
            tickStateDelta.hitCorner = 1;
        }
        const prevUniverse = this.getUniverse(prevD);
        const universe = this.getUniverse(this.currD);
        const universeDelta = Math.abs(universe.x - prevUniverse.x) +
            Math.abs(universe.y - prevUniverse.y);
        if (!hitCorner && universeDelta) {
            this.settings.setPersistedSetting('wallsHit', wh => wh + universeDelta);
            tickStateDelta.hitWall = universeDelta;
        }
        const universeOffset = {
            x: universe.x * this.canvasWidth,
            y: universe.y * this.canvasHeight,
        };
        const delta = {
            x: this.currD - universeOffset.x,
            y: this.currD - universeOffset.y,
        };
        this.position = {
            x: universe.x % 2 === 0 ? delta.x : this.canvasWidth - delta.x,
            y: universe.y % 2 === 0 ? delta.y : this.canvasHeight - delta.y,
        };
        if (this.settings.getSetting('showTimeToCorner')) {
            const distanceToCorner = this.direction === 1 ?
                this.totalD - this.currD : this.currD;
            const pixelsPerSecond = PIXELS_PER_MILLISECOND * 1000;
            const timeToCorner = distanceToCorner / pixelsPerSecond;
            const formattedTimeToCorner = timeToCorner.toLocaleString('en-US', {
                style: 'unit',
                unit: 'second',
                maximumSignificantDigits: 3,
            });
            this.stats.quickUpdate(_stats__WEBPACK_IMPORTED_MODULE_0__.StatCategory.TIME_TO_CORNER, [['Time to corner', formattedTimeToCorner]]);
        }
        if (this.settings.getSetting('showDebugInfo')) {
            this.stats.quickUpdate(_stats__WEBPACK_IMPORTED_MODULE_0__.StatCategory.DEBUG, [
                ['X', this.position.x],
                ['Y', this.position.y],
                ['Universe X', universe.x],
                ['Universe Y', universe.y],
                ['Universe offset X', universeOffset.x],
                ['Universe offset Y', universeOffset.y],
                ['Delta X', delta.x],
                ['Delta Y', delta.y],
                ['D', this.currD],
                ['Total D', this.totalD],
                ['Direction', this.direction],
            ]);
        }
        return tickStateDelta;
    }
    getUniverse(d) {
        return {
            x: Math.floor(d / this.canvasWidth),
            y: Math.floor(d / this.canvasHeight),
        };
    }
    tickColor(count, tickStateDelta) {
        this.colorBehaviors[this.settings.getSetting('colorBehavior')]
            .tick(count, tickStateDelta);
    }
    draw(ctx) {
        if (this.imageData) {
            ctx.putImageData(this.imageData, this.position.x, this.position.y);
        }
    }
    resize(canvas) {
        const heightDelta = canvas.height - this.imageData.height;
        const widthDelta = canvas.width - this.imageData.width;
        this.canvasWidth = widthDelta;
        this.canvasHeight = heightDelta;
        this.totalD = (0,_util__WEBPACK_IMPORTED_MODULE_1__.lcm)(heightDelta, widthDelta);
    }
    static fromFile(fileName, settings, stats) {
        return __awaiter(this, void 0, void 0, function* () {
            const imageData = yield loadImageData(fileName);
            return new BouncingImage(imageData, settings, stats);
        });
    }
}
class ColorBehavior {
    constructor(image) {
        this.image = image;
    }
    colorEquals(a, b) {
        return a[0] === b[0] && a[1] === b[1] && a[2] === b[2];
    }
    setColor(color) {
        const { data } = this.image.imageData;
        for (let i = 0; i < data.length; i += 4) {
            const existing = [data[i], data[i + 1], data[i + 2], data[i + 3]];
            // We know we don't need to continue since our color was the same as
            // before.
            if (this.colorEquals(existing, color))
                return;
            const [r, g, b] = color;
            data[i] = r;
            data[i + 1] = g;
            data[i + 2] = b;
        }
    }
}
class RainbowColorBehavior extends ColorBehavior {
    constructor() {
        super(...arguments);
        this.hue = 0;
    }
    tick(count, tickStateDelta) {
        const COLOR_SPEED = this.image.settings.getSetting('rainbowSpeed');
        this.tickHue((count * COLOR_SPEED) + (50 * hitDelta(tickStateDelta)));
        this.setColor((0,_util__WEBPACK_IMPORTED_MODULE_1__.hslToRgb)(this.hue));
        const { data } = this.image.imageData;
        const [r, g, b] = (0,_util__WEBPACK_IMPORTED_MODULE_1__.hslToRgb)(this.hue);
        for (let i = 0; i < data.length; i += 4) {
            data[i] = r;
            data[i + 1] = g;
            data[i + 2] = b;
        }
    }
    tickHue(count) {
        let hue = this.hue * 360;
        hue += count;
        if (hue > 360) {
            hue %= 360;
        }
        this.hue = hue / 360;
    }
}
class NoneColorBehavior extends ColorBehavior {
    tick() {
        const color = this.image.settings.getSetting('noneColor');
        this.setColor(color);
    }
}
class ClassicColorBehavior extends ColorBehavior {
    constructor() {
        super(...arguments);
        this.currColor = 0;
        this.colors = [
            [255, 115, 0, 255],
            [254, 0, 0, 255],
            [44, 0, 181, 255],
            _util__WEBPACK_IMPORTED_MODULE_1__.WHITE,
            [255, 236, 10, 255],
            [255, 34, 138, 255], // pink
        ];
    }
    tick(count, tickStateDelta) {
        this.currColor = (this.currColor + hitDelta(tickStateDelta))
            % this.colors.length;
        this.setColor(this.colors[this.currColor]);
    }
}
function hitDelta(tickState, cornerCoefficient = 2) {
    var _a, _b;
    return ((_a = tickState.hitCorner) !== null && _a !== void 0 ? _a : 0 * cornerCoefficient) + ((_b = tickState.hitWall) !== null && _b !== void 0 ? _b : 0);
}
function loadImageData(fileName) {
    return __awaiter(this, void 0, void 0, function* () {
        const img = new Image();
        img.crossOrigin = 'Anonymous';
        img.src = fileName;
        return new Promise((resolve, reject) => {
            try {
                img.addEventListener('load', () => {
                    const canvas = document.createElement('canvas');
                    const width = img.naturalWidth;
                    const height = img.naturalHeight;
                    canvas.width = width;
                    canvas.height = height;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0, width, height);
                    const imageData = ctx.getImageData(0, 0, width, height);
                    resolve(imageData);
                });
            }
            catch (e) {
                reject(e);
            }
        });
    });
}


/***/ }),

/***/ "./src/canvas.ts":
/*!***********************!*\
  !*** ./src/canvas.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CANVAS_OBJECTS": () => (/* binding */ CANVAS_OBJECTS),
/* harmony export */   "Canvas": () => (/* binding */ Canvas)
/* harmony export */ });
/* harmony import */ var _di__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./di */ "./src/di.ts");
/* harmony import */ var _stats__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./stats */ "./src/stats.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (undefined && undefined.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};


const CANVAS_OBJECTS = new _di__WEBPACK_IMPORTED_MODULE_0__.InjectionToken('CanvasObjects');
let Canvas = class Canvas {
    constructor(stats, objects) {
        this.stats = stats;
        this.canvas = document.querySelector('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.currFrame = performance.now();
        this.objects = [];
        objects.then(objects => {
            objects.forEach(object => object.resize(this.canvas));
            this.objects.push(...objects);
        });
        this.resize();
        window.addEventListener('resize', () => {
            this.resize();
        });
    }
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        for (const object of this.objects) {
            object.resize(this.canvas);
        }
    }
    loop() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        const now = performance.now();
        const deltaTime = now - this.currFrame;
        for (const object of this.objects) {
            object.tick(deltaTime);
            object.draw(this.ctx);
        }
        this.stats.render();
        this.currFrame = now;
        this.frameId = requestAnimationFrame(() => this.loop());
    }
    start() {
        this.loop();
    }
    stop() {
        if (this.frameId) {
            cancelAnimationFrame(this.frameId);
        }
    }
};
Canvas = __decorate([
    __param(0, (0,_di__WEBPACK_IMPORTED_MODULE_0__.Inject)(_stats__WEBPACK_IMPORTED_MODULE_1__.Stats)),
    __param(1, (0,_di__WEBPACK_IMPORTED_MODULE_0__.Inject)(CANVAS_OBJECTS))
], Canvas);



/***/ }),

/***/ "./src/di.ts":
/*!*******************!*\
  !*** ./src/di.ts ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Inject": () => (/* binding */ Inject),
/* harmony export */   "InjectionToken": () => (/* binding */ InjectionToken),
/* harmony export */   "Injector": () => (/* binding */ Injector)
/* harmony export */ });
function Inject(token) {
    return function (target, propertyKey, parameterIndex) {
        var _a;
        console.log(token, target, propertyKey, parameterIndex);
        const deps = (_a = target[DEPS]) !== null && _a !== void 0 ? _a : [];
        deps[parameterIndex] = token;
        target[DEPS] = deps;
    };
}
class Injector {
    constructor(parent) {
        this.parent = parent;
        this.cache = new Map();
    }
    register(...injectables) {
        for (const injectable of injectables) {
            const token = this.getToken(injectable);
            const factory = this.createFactory(injectable);
            this.cache.set(token, {
                token,
                factory,
                cache: UNDEFINED,
            });
        }
    }
    getToken(injectable) {
        if (isValueProvidedToken(injectable) ||
            isFactoryProvidedToken(injectable)) {
            return injectable.provide;
        }
        return injectable;
    }
    get(token) {
        const dep = this.cache.get(token);
        if (dep) {
            if (dep.cache === CIRCULAR) {
                throw new Error('Circular dependency');
            }
            if (dep.cache === UNDEFINED) {
                dep.cache = CIRCULAR;
                dep.cache = dep.factory();
            }
            return dep.cache;
        }
        if (this.parent) {
            return this.parent.get(token);
        }
        console.error(token);
        throw new Error('Token not found');
    }
    createFactory(injectable) {
        return () => {
            var _a, _b;
            if (injectable instanceof InjectionToken) {
                throw new Error('InjectionToken tried to provide itself');
            }
            if (isValueProvidedToken(injectable)) {
                return injectable.useValue;
            }
            if (isFactoryProvidedToken(injectable)) {
                const deps = (_a = injectable.deps) !== null && _a !== void 0 ? _a : [];
                const args = deps.map(dep => this.get(dep));
                return injectable.useFactory(...args);
            }
            const token = injectable;
            const deps = (_b = token[DEPS]) !== null && _b !== void 0 ? _b : [];
            const args = deps.map(dep => this.get(dep));
            return new token(...args);
        };
    }
}
const UNDEFINED = Symbol('Not defined');
const CIRCULAR = Symbol('Circular');
const DEPS = Symbol('Deps');
function isValueProvidedToken(v) {
    return typeof v === 'object' && v !== null
        && 'useValue' in v;
}
function isFactoryProvidedToken(v) {
    return typeof v === 'object' && v !== null
        && 'useFactory' in v;
}
class InjectionToken {
    constructor(name) {
        this.name = name;
    }
    toString() {
        return `InjectionToken ${this.name}`;
    }
}


/***/ }),

/***/ "./src/settings.ts":
/*!*************************!*\
  !*** ./src/settings.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Settings": () => (/* binding */ Settings)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/dist/esm5/internal/ReplaySubject.js");
/* harmony import */ var _di__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./di */ "./src/di.ts");
/* harmony import */ var _stats__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./stats */ "./src/stats.ts");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util */ "./src/util.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (undefined && undefined.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};




const DEFAULT_WPE_SETTINGS = {
    showStats: false,
    showTimeToCorner: false,
    showDebugInfo: false,
    colorBehavior: 'rainbow',
    rainbowSpeed: 0.05,
    noneColor: _util__WEBPACK_IMPORTED_MODULE_0__.WHITE,
    speed: 0.25,
};
const parseNumberFactory = (parseFn) => (jsonString) => {
    if (jsonString === null) {
        return 0;
    }
    return parseFn(jsonString, 10) || 0;
};
const parseInt = parseNumberFactory(Number.parseInt);
const parseFloat = parseNumberFactory(Number.parseFloat);
const parseColor = (colorString) => {
    if (!colorString)
        return _util__WEBPACK_IMPORTED_MODULE_0__.WHITE;
    const [r, g, b] = colorString.split(' ').map(parseFloat);
    return [r * 255, g * 255, b * 255, 255];
};
// This happens here so we can listen as soon as possible. Idk if it matters.
listenToWpeProperties('showStats', 'showTimeToCorner', 'showDebugInfo', 'colorBehavior', ['rainbowSpeed', parseFloat], ['noneColor', parseColor], ['speed', parseFloat]);
const PERSISTENT_SETTINGS = [
    { key: 'cornersHit', statLabel: 'Corners hit', deserializer: parseInt },
    { key: 'wallsHit', statLabel: 'Walls hit', deserializer: parseInt },
];
const WPE_SETTING_TO_STAT_CATEGORY = {
    showStats: _stats__WEBPACK_IMPORTED_MODULE_1__.StatCategory.STATS,
    showTimeToCorner: _stats__WEBPACK_IMPORTED_MODULE_1__.StatCategory.TIME_TO_CORNER,
    showDebugInfo: _stats__WEBPACK_IMPORTED_MODULE_1__.StatCategory.DEBUG,
};
let Settings = class Settings {
    constructor(stats) {
        this.stats = stats;
        this.settings = this.initializeSettings();
        settingsSync.subscribe(partialWpeSettings => {
            // Update whether we should show some category of stats.
            for (const [setting, newValue] of Object.entries(partialWpeSettings)) {
                const statCategory = WPE_SETTING_TO_STAT_CATEGORY[setting];
                if (statCategory !== undefined) {
                    this.stats.muteCategory(statCategory, 
                    // !showX = shouldMuteCategory
                    !newValue);
                }
            }
            Object.assign(this.settings, partialWpeSettings);
        });
    }
    setPersistedSetting(key, value) {
        const oldValue = this.settings[key];
        if (typeof value === 'function') {
            value = value(oldValue);
        }
        if (value === oldValue)
            return;
        this.settings[key] = value;
        localStorage.setItem(key, value.toString());
        if (this.settings.showStats) {
            this.stats.updateStat(key, value);
        }
    }
    getSetting(key) {
        return this.settings[key];
    }
    initializeSettings() {
        const persistentSettings = Object.fromEntries(PERSISTENT_SETTINGS.map(({ key, statLabel, deserializer }) => {
            return [key, this.initPersistentSetting(key, statLabel, deserializer)];
        }));
        const wpeSettings = DEFAULT_WPE_SETTINGS;
        return Object.assign(Object.assign({}, persistentSettings), wpeSettings);
    }
    initPersistentSetting(key, label, deserialize) {
        const jsonString = localStorage.getItem(key);
        const deserilizedValue = deserialize(jsonString);
        this.stats.registerStat({
            category: _stats__WEBPACK_IMPORTED_MODULE_1__.StatCategory.STATS,
            id: key,
            label,
            value: deserilizedValue,
        });
        return deserilizedValue;
    }
};
Settings = __decorate([
    __param(0, (0,_di__WEBPACK_IMPORTED_MODULE_2__.Inject)(_stats__WEBPACK_IMPORTED_MODULE_1__.Stats))
], Settings);

const settingsSync = new rxjs__WEBPACK_IMPORTED_MODULE_3__.ReplaySubject(1);
function listenToWpeProperties(...keys) {
    window.wallpaperPropertyListener = {
        applyUserProperties(properties) {
            console.info('Property update', properties);
            const settingsToApply = {};
            for (let key of keys) {
                let formatter = undefined;
                if (Array.isArray(key)) {
                    formatter = key[1];
                    key = key[0];
                }
                const property = properties[key.toLowerCase()];
                if (property) {
                    settingsToApply[key] = formatter ? formatter(property.value) :
                        property.value;
                }
            }
            settingsSync.next(settingsToApply);
        },
    };
}


/***/ }),

/***/ "./src/stats.ts":
/*!**********************!*\
  !*** ./src/stats.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "STATS_ELEMENT": () => (/* binding */ STATS_ELEMENT),
/* harmony export */   "StatCategory": () => (/* binding */ StatCategory),
/* harmony export */   "Stats": () => (/* binding */ Stats)
/* harmony export */ });
/* harmony import */ var _di__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./di */ "./src/di.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (undefined && undefined.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};

const STATS_ELEMENT = new _di__WEBPACK_IMPORTED_MODULE_0__.InjectionToken('StatsElement');
/** Controls the statistical information displayed on screen. */
let Stats = class Stats {
    constructor(el) {
        this.el = el;
        this.statCategories = new Map();
        this.stats = new Map();
        this.mutedCategories = new Set();
        this.hasChanged = false;
    }
    registerStat(stat) {
        var _a;
        const statCategory = (_a = this.statCategories.get(stat.category)) !== null && _a !== void 0 ? _a : [];
        this.statCategories.set(stat.category, [...statCategory, stat.id]);
        this.stats.set(stat.id, stat);
    }
    isRegistered(statId) {
        return this.stats.has(statId);
    }
    quickUpdate(category, stats) {
        for (const [label, value] of stats) {
            const id = label; // label acts as id
            if (!this.isRegistered(id)) {
                this.registerStat({
                    id,
                    category,
                    label,
                    value,
                });
            }
            else {
                this.updateStat(id, value);
            }
        }
    }
    updateStat(id, value) {
        const savedStat = this.stats.get(id);
        if (!savedStat) {
            throw new Error(`Tried to update stat that hasn't been registered: ${id}`);
        }
        if (savedStat.value === value)
            return;
        this.stats.set(id, Object.assign(Object.assign({}, savedStat), { value }));
        if (!this.mutedCategories.has(savedStat.category)) {
            this.hasChanged = true;
        }
    }
    muteCategory(category, newIsMuted) {
        const oldIsMuted = this.mutedCategories.has(category);
        if (newIsMuted === oldIsMuted)
            return;
        this.hasChanged = true;
        if (newIsMuted) {
            this.mutedCategories.add(category);
        }
        else {
            this.mutedCategories.delete(category);
        }
    }
    render() {
        if (!this.hasChanged) {
            return;
        }
        const statsToDisplay = [];
        for (const [category, statIds] of this.statCategories) {
            if (this.mutedCategories.has(category))
                continue;
            for (const statId of statIds) {
                const stat = this.stats.get(statId);
                if (!stat) {
                    throw new Error(`Missing stat with ID "${statId}"`);
                }
                const { label, value } = stat;
                if (value === undefined)
                    continue;
                statsToDisplay.push(`${label}: ${value}`);
            }
        }
        this.el.innerText = statsToDisplay.join('\n');
        this.hasChanged = false;
    }
};
Stats = __decorate([
    __param(0, (0,_di__WEBPACK_IMPORTED_MODULE_0__.Inject)(STATS_ELEMENT))
], Stats);

var StatCategory;
(function (StatCategory) {
    StatCategory[StatCategory["STATS"] = 0] = "STATS";
    StatCategory[StatCategory["TIME_TO_CORNER"] = 1] = "TIME_TO_CORNER";
    StatCategory[StatCategory["DEBUG"] = 2] = "DEBUG";
})(StatCategory || (StatCategory = {}));


/***/ }),

/***/ "./src/util.ts":
/*!*********************!*\
  !*** ./src/util.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WHITE": () => (/* binding */ WHITE),
/* harmony export */   "arrayEqual": () => (/* binding */ arrayEqual),
/* harmony export */   "clamp": () => (/* binding */ clamp),
/* harmony export */   "flattenMapValues": () => (/* binding */ flattenMapValues),
/* harmony export */   "gcd": () => (/* binding */ gcd),
/* harmony export */   "hslToRgb": () => (/* binding */ hslToRgb),
/* harmony export */   "isEqual": () => (/* binding */ isEqual),
/* harmony export */   "lcm": () => (/* binding */ lcm),
/* harmony export */   "memoize": () => (/* binding */ memoize),
/* harmony export */   "objectEquals": () => (/* binding */ objectEquals)
/* harmony export */ });
const WHITE = [255, 255, 255, 255];
function flattenMapValues(map) {
    const valuesAsArray = Array.from(map.values());
    return valuesAsArray.flat();
}
/**
 * Converts an HSL color value to RGB. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes h, s, and l are contained in the set [0, 1] and
 * returns r, g, and b in the set [0, 255].
 *
 * @param   {number}  h       The hue
 * @param   {number}  s       The saturation
 * @param   {number}  l       The lightness
 * @return  {Array}           The RGB representation
 */
function hslToRgb(h, s = 0.5, l = 0.5) {
    var r, g, b;
    if (s == 0) {
        r = g = b = l; // achromatic
    }
    else {
        var hue2rgb = function hue2rgb(p, q, t) {
            if (t < 0)
                t += 1;
            if (t > 1)
                t -= 1;
            if (t < 1 / 6)
                return p + (q - p) * 6 * t;
            if (t < 1 / 2)
                return q;
            if (t < 2 / 3)
                return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        };
        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }
    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255), 255];
}
function gcd(a, b) {
    var t = 0;
    a < b && (t = b, b = a, a = t); // swap them if a < b
    t = a % b;
    return t ? gcd(b, t) : b;
}
function lcm(a, b) {
    return a / gcd(a, b) * b;
}
function isEqual(a, b) {
    return a === b;
}
function arrayEqual(a, b) {
    if (a.length !== b.length)
        return false;
    for (let i = 0; i < a.length; i++) {
        if (!isEqual(a[i], b[i]))
            return false;
    }
    return true;
}
function objectEquals(a, b) {
    if (a === b)
        return true;
    const aKeys = Object.keys(a);
    const bKeys = new Set(Object.keys(b));
    if (aKeys.length !== bKeys.size)
        return false;
    for (const aKey of aKeys) {
        const aValue = a[aKey];
        const bValue = b[aKey];
        if (aValue !== bValue)
            return false;
        bKeys.delete(aKey);
    }
    if (bKeys.size)
        return false;
    return true;
}
function clamp(num, min, max) {
    return Math.min(Math.max(num, min), max);
}
function memoize(fn) {
    let lastArgs;
    let lastValue;
    const memoized = ((...args) => {
        if (!lastArgs || !arrayEqual(lastArgs, args)) {
            lastArgs = args;
            lastValue = fn.apply(null, args);
        }
        return lastValue;
    });
    return memoized;
}


/***/ }),

/***/ "./node_modules/tslib/tslib.es6.js":
/*!*****************************************!*\
  !*** ./node_modules/tslib/tslib.es6.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "__assign": () => (/* binding */ __assign),
/* harmony export */   "__asyncDelegator": () => (/* binding */ __asyncDelegator),
/* harmony export */   "__asyncGenerator": () => (/* binding */ __asyncGenerator),
/* harmony export */   "__asyncValues": () => (/* binding */ __asyncValues),
/* harmony export */   "__await": () => (/* binding */ __await),
/* harmony export */   "__awaiter": () => (/* binding */ __awaiter),
/* harmony export */   "__classPrivateFieldGet": () => (/* binding */ __classPrivateFieldGet),
/* harmony export */   "__classPrivateFieldIn": () => (/* binding */ __classPrivateFieldIn),
/* harmony export */   "__classPrivateFieldSet": () => (/* binding */ __classPrivateFieldSet),
/* harmony export */   "__createBinding": () => (/* binding */ __createBinding),
/* harmony export */   "__decorate": () => (/* binding */ __decorate),
/* harmony export */   "__exportStar": () => (/* binding */ __exportStar),
/* harmony export */   "__extends": () => (/* binding */ __extends),
/* harmony export */   "__generator": () => (/* binding */ __generator),
/* harmony export */   "__importDefault": () => (/* binding */ __importDefault),
/* harmony export */   "__importStar": () => (/* binding */ __importStar),
/* harmony export */   "__makeTemplateObject": () => (/* binding */ __makeTemplateObject),
/* harmony export */   "__metadata": () => (/* binding */ __metadata),
/* harmony export */   "__param": () => (/* binding */ __param),
/* harmony export */   "__read": () => (/* binding */ __read),
/* harmony export */   "__rest": () => (/* binding */ __rest),
/* harmony export */   "__spread": () => (/* binding */ __spread),
/* harmony export */   "__spreadArray": () => (/* binding */ __spreadArray),
/* harmony export */   "__spreadArrays": () => (/* binding */ __spreadArrays),
/* harmony export */   "__values": () => (/* binding */ __values)
/* harmony export */ });
/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    }
    return __assign.apply(this, arguments);
}

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

var __createBinding = Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});

function __exportStar(m, o) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p)) __createBinding(o, m, p);
}

function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

/** @deprecated */
function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

/** @deprecated */
function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
}

function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}

function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
}

function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
}

function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};

var __setModuleDefault = Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
};

function __importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
}

function __importDefault(mod) {
    return (mod && mod.__esModule) ? mod : { default: mod };
}

function __classPrivateFieldGet(receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
}

function __classPrivateFieldSet(receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
}

function __classPrivateFieldIn(state, receiver) {
    if (receiver === null || (typeof receiver !== "object" && typeof receiver !== "function")) throw new TypeError("Cannot use 'in' operator on non-object");
    return typeof state === "function" ? receiver === state : state.has(receiver);
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _bouncing_image__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./bouncing_image */ "./src/bouncing_image.ts");
/* harmony import */ var _canvas__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./canvas */ "./src/canvas.ts");
/* harmony import */ var _di__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./di */ "./src/di.ts");
/* harmony import */ var _settings__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./settings */ "./src/settings.ts");
/* harmony import */ var _stats__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./stats */ "./src/stats.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};





const permLogEl = document.querySelector('#permLog');
function permLog(string) {
    const child = document.createElement('p');
    child.innerText = string;
    permLogEl.appendChild(child);
}
const injector = new _di__WEBPACK_IMPORTED_MODULE_0__.Injector();
injector.register(_canvas__WEBPACK_IMPORTED_MODULE_1__.Canvas, _settings__WEBPACK_IMPORTED_MODULE_2__.Settings, _stats__WEBPACK_IMPORTED_MODULE_3__.Stats, {
    provide: _stats__WEBPACK_IMPORTED_MODULE_3__.STATS_ELEMENT,
    useValue: document.querySelector('p'),
}, {
    provide: _canvas__WEBPACK_IMPORTED_MODULE_1__.CANVAS_OBJECTS,
    useFactory: (settings, stats) => __awaiter(void 0, void 0, void 0, function* () {
        const img = yield _bouncing_image__WEBPACK_IMPORTED_MODULE_4__.BouncingImage.fromFile('./dvd.svg', settings, stats);
        return [img];
    }),
    deps: [_settings__WEBPACK_IMPORTED_MODULE_2__.Settings, _stats__WEBPACK_IMPORTED_MODULE_3__.Stats],
});
document.addEventListener('DOMContentLoaded', () => {
    const canvas = injector.get(_canvas__WEBPACK_IMPORTED_MODULE_1__.Canvas);
    canvas.start();
    window.addEventListener('resize', () => {
        canvas.resize();
    });
});

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFPLDJDQUEyQyx1REFBdUQ7QUFDbEc7QUFDUDtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDZDBEO0FBQ1Y7QUFDc0I7QUFDMUI7QUFDVjtBQUNhO0FBQ0k7QUFDbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZFQUE2RSx1REFBYztBQUMzRixRQUFRLGdFQUFZO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDLHVEQUFjO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCLDBEQUFpQjtBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5Qix1QkFBdUI7QUFDaEQ7QUFDQTtBQUNBLGVBQWUseURBQWE7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkNBQTJDLHFCQUFxQixtQkFBbUIscUJBQXFCLGdCQUFnQix3QkFBd0I7QUFDaEosU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ3FCO0FBQ3RCO0FBQ0E7QUFDQSxnRkFBZ0YsbURBQWM7QUFDOUY7QUFDQTtBQUNBLG9CQUFvQiw0REFBVSxnQkFBZ0IsNERBQVUsaUJBQWlCLDREQUFVO0FBQ25GO0FBQ0E7QUFDQSxzQ0FBc0MsbURBQVUsMkJBQTJCLDZEQUFjO0FBQ3pGO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDckdrQztBQUNFO0FBQ3NDO0FBQzFFO0FBQ0EsSUFBSSxnREFBUztBQUNiO0FBQ0Esc0NBQXNDO0FBQ3RDLHNDQUFzQztBQUN0Qyw2Q0FBNkMscUJBQXFCLG1GQUFxQjtBQUN2RjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLHVDQUF1QztBQUMvRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIseUNBQXlDO0FBQ3JFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsQ0FBQyw2Q0FBTztBQUNnQjtBQUN6Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDekQ0QztBQUNGO0FBQ3dCO0FBQ087QUFDNUI7QUFDTTtBQUNuRDtBQUNBLElBQUksZ0RBQVM7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLGtGQUF1QjtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsZ0VBQVk7QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQ0FBa0MsK0NBQVEsMENBQTBDLFVBQVU7QUFDOUY7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQ0FBZ0MsUUFBUTtBQUN4QztBQUNBO0FBQ0E7QUFDQTtBQUNBLDhCQUE4QjtBQUM5QjtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFFBQVEsZ0VBQVk7QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFFBQVEsZ0VBQVk7QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQiw2REFBa0I7QUFDckM7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLHVEQUFZO0FBQy9CO0FBQ0EsWUFBWSwwREFBUztBQUNyQixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QixtREFBVTtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsQ0FBQyxtREFBVTtBQUNPO0FBQ25CO0FBQ0EsSUFBSSxnREFBUztBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3SUFBd0ksNkRBQWtCO0FBQzFKO0FBQ0E7QUFDQSxDQUFDO0FBQzJCO0FBQzVCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDaktrQztBQUNhO0FBQ2U7QUFDNUI7QUFDaUM7QUFDaEM7QUFDa0U7QUFDdkM7QUFDWDtBQUNuRDtBQUNBLElBQUksZ0RBQVM7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLDZEQUFjO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXNDLHdFQUFnQjtBQUN0RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFzQyx5RUFBaUI7QUFDdkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFzQyx5RUFBcUI7QUFDM0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxDQUFDLHVEQUFZO0FBQ1E7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0EsSUFBSSxnREFBUztBQUNiO0FBQ0E7QUFDQTtBQUNBLFlBQVksNERBQVU7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QixvRUFBK0I7QUFDeEQ7QUFDQSxzREFBc0Q7QUFDdEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDeUI7QUFDMUI7QUFDQSxRQUFRLGlGQUE0QztBQUNwRCxRQUFRLGdFQUFZO0FBQ3BCO0FBQ0E7QUFDQSxRQUFRLGdGQUFvQjtBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQ0FBZ0MsaUVBQTRCO0FBQzVELDZCQUE2QixrRkFBMEIsZUFBZSx5REFBeUQ7QUFDL0g7QUFDTztBQUNQO0FBQ0EsVUFBVSw0Q0FBSTtBQUNkO0FBQ0EsY0FBYyw0Q0FBSTtBQUNsQjtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3ZMd0Q7QUFDVDtBQUNrQjtBQUNwQjtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0RBQWdELCtDQUFRLG9EQUFvRCxzQkFBc0I7QUFDbEk7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQ0FBb0MsUUFBUTtBQUM1QztBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQiw0REFBVTtBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBDQUEwQywwRUFBbUI7QUFDN0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkNBQTZDLCtDQUFRLHVEQUF1RCx1QkFBdUI7QUFDbkk7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0NBQStDLDBFQUFtQjtBQUNsRSx5Q0FBeUMsb0RBQWEsQ0FBQyxvREFBYSxLQUFLLDZDQUFNLFdBQVcsNkNBQU07QUFDaEc7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQ0FBZ0MsUUFBUTtBQUN4QztBQUNBO0FBQ0E7QUFDQTtBQUNBLDhCQUE4QjtBQUM5QjtBQUNBO0FBQ0E7QUFDQSwwQkFBMEIsMEVBQW1CO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSwwREFBUztBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QiwwREFBUztBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsQ0FBQztBQUN1QjtBQUNqQjtBQUNBO0FBQ1A7QUFDQSx1Q0FBdUMsNERBQVUsa0JBQWtCLDREQUFVLGVBQWUsNERBQVU7QUFDdEc7QUFDQTtBQUNBLFFBQVEsNERBQVU7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FDOUlPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FDUE87QUFDUDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDTjhDO0FBQ3ZDO0FBQ1A7QUFDQTtBQUNBLHlCQUF5Qix1QkFBdUI7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1REFBdUQsb0RBQWEscUJBQXFCLDZDQUFNO0FBQy9GO0FBQ0Esd0NBQXdDLG9EQUFhLHFCQUFxQiw2Q0FBTTtBQUNoRixLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUNuQk8sZ0NBQWdDLCtFQUErRTtBQUN0SDs7Ozs7Ozs7Ozs7Ozs7O0FDRHNEO0FBQy9DLDhCQUE4QixtRUFBZ0I7QUFDckQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDs7Ozs7Ozs7Ozs7Ozs7O0FDUnNEO0FBQy9DLDBCQUEwQixtRUFBZ0I7QUFDakQ7QUFDQTtBQUNBO0FBQ0EsMkdBQTJHLHVDQUF1QztBQUNsSjtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDs7Ozs7Ozs7Ozs7Ozs7QUNYTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUNOTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDVm1DO0FBQ25DO0FBQ087QUFDUCxRQUFRLGlGQUE0QztBQUNwRDtBQUNBO0FBQ0Esd0JBQXdCO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQLFFBQVEsaUZBQTRDO0FBQ3BEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FDM0JPO0FBQ1A7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7OztBQ0hPO0FBQ1A7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7OztBQ0hPO0FBQ1A7Ozs7Ozs7Ozs7Ozs7Ozs7QUNEc0M7QUFDL0I7QUFDUDtBQUNBLHFCQUFxQix1QkFBdUI7QUFDNUM7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0EsZUFBZSwrQ0FBUTtBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0RBQWdELGtCQUFrQjtBQUNsRTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUNuQm1DO0FBQzRCO0FBQ3hEO0FBQ1AsSUFBSSxrRkFBMEI7QUFDOUIsK0JBQStCLDREQUF1QjtBQUN0RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ1g0QztBQUVBO0FBT3JDLE1BQU0sYUFBYTtJQWlCeEIsWUFDYSxTQUFvQixFQUNwQixRQUFrQixFQUNWLEtBQVk7UUFGcEIsY0FBUyxHQUFULFNBQVMsQ0FBVztRQUNwQixhQUFRLEdBQVIsUUFBUSxDQUFVO1FBQ1YsVUFBSyxHQUFMLEtBQUssQ0FBTztRQWxCekIsYUFBUSxHQUFVLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7UUFFakMsY0FBUyxHQUFTLENBQUMsQ0FBQztRQUNwQixXQUFNLEdBQUcsQ0FBQyxDQUFDO1FBQ1gsVUFBSyxHQUFHLENBQUMsQ0FBQztRQUNWLGdCQUFXLEdBQUcsQ0FBQyxDQUFDO1FBQ2hCLGlCQUFZLEdBQUcsQ0FBQyxDQUFDO1FBRVIsbUJBQWMsR0FDaUI7WUFDMUMsSUFBSSxFQUFFLElBQUksaUJBQWlCLENBQUMsSUFBSSxDQUFDO1lBQ2pDLE9BQU8sRUFBRSxJQUFJLG9CQUFvQixDQUFDLElBQUksQ0FBQztZQUN2QyxPQUFPLEVBQUUsSUFBSSxvQkFBb0IsQ0FBQyxJQUFJLENBQUM7U0FDeEMsQ0FBQztJQU1ELENBQUM7SUFFTixJQUFJLENBQUMsS0FBYTtRQUNoQixNQUFNLGNBQWMsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2hELElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLGNBQWMsQ0FBQyxDQUFDO0lBQ3hDLENBQUM7SUFFRDs7O09BR0c7SUFDSyxZQUFZLENBQUMsS0FBYTtRQUNoQyxJQUFJLGNBQWMsR0FBbUIsRUFBRSxDQUFDO1FBQ3hDLE1BQU0sc0JBQXNCLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDakUsTUFBTSxjQUFjLEdBQUcsS0FBSyxDQUFDO1FBQzdCLElBQUksS0FBSyxHQUFHLGNBQWMsRUFBRTtZQUMxQixLQUFLLEdBQUcsQ0FBQyxDQUFDO1NBQ1g7UUFFRCxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ3pCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxHQUFHLENBQUMsS0FBSyxHQUFHLHNCQUFzQixHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN2RSxJQUFJLFNBQVMsR0FBRyxLQUFLLENBQUM7UUFDdEIsNkRBQTZEO1FBQzdELElBQUksSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQzdCLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztZQUN2QyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1lBQ2pDLFNBQVMsR0FBRyxJQUFJLENBQUM7U0FDbEI7UUFDRCxJQUFJLElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQyxFQUFFO1lBQ25CLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ25DLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1lBQ25CLFNBQVMsR0FBRyxJQUFJLENBQUM7U0FDbEI7UUFDRCxJQUFJLFNBQVMsRUFBRTtZQUNiLElBQUksQ0FBQyxTQUFTLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDckIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQyxZQUFZLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDOUQsY0FBYyxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUM7U0FDOUI7UUFFRCxNQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzdDLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzlDLE1BQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxZQUFZLENBQUMsQ0FBQyxDQUFDO1lBQ3ZELElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDMUMsSUFBSSxDQUFDLFNBQVMsSUFBSSxhQUFhLEVBQUU7WUFDL0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQyxVQUFVLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsYUFBYSxDQUFDLENBQUM7WUFDeEUsY0FBYyxDQUFDLE9BQU8sR0FBRyxhQUFhLENBQUM7U0FDeEM7UUFFRCxNQUFNLGNBQWMsR0FBRztZQUNyQixDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsV0FBVztZQUNoQyxDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsWUFBWTtTQUNsQyxDQUFDO1FBQ0YsTUFBTSxLQUFLLEdBQUc7WUFDWixDQUFDLEVBQUUsSUFBSSxDQUFDLEtBQUssR0FBRyxjQUFjLENBQUMsQ0FBQztZQUNoQyxDQUFDLEVBQUUsSUFBSSxDQUFDLEtBQUssR0FBRyxjQUFjLENBQUMsQ0FBQztTQUNqQyxDQUFDO1FBQ0YsSUFBSSxDQUFDLFFBQVEsR0FBRztZQUNkLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDLENBQUM7WUFDOUQsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUMsQ0FBQztTQUNoRSxDQUFDO1FBRUYsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFO1lBQ2hELE1BQU0sZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLFNBQVMsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDM0MsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBQzFDLE1BQU0sZUFBZSxHQUFHLHNCQUFzQixHQUFHLElBQUksQ0FBQztZQUN0RCxNQUFNLFlBQVksR0FBRyxnQkFBZ0IsR0FBRyxlQUFlLENBQUM7WUFDeEQsTUFBTSxxQkFBcUIsR0FBRyxZQUFZLENBQUMsY0FBYyxDQUFDLE9BQU8sRUFBRTtnQkFDakUsS0FBSyxFQUFFLE1BQU07Z0JBQ2IsSUFBSSxFQUFFLFFBQVE7Z0JBQ2Qsd0JBQXdCLEVBQUUsQ0FBQzthQUM1QixDQUFDLENBQUM7WUFDSCxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQywrREFBMkIsRUFDOUMsQ0FBQyxDQUFDLGdCQUFnQixFQUFFLHFCQUFxQixDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ2xEO1FBRUQsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxlQUFlLENBQUMsRUFBRTtZQUM3QyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxzREFBa0IsRUFBRTtnQkFDekMsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7Z0JBQ3RCLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO2dCQUN0QixDQUFDLFlBQVksRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDO2dCQUMxQixDQUFDLFlBQVksRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDO2dCQUMxQixDQUFDLG1CQUFtQixFQUFFLGNBQWMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3ZDLENBQUMsbUJBQW1CLEVBQUUsY0FBYyxDQUFDLENBQUMsQ0FBQztnQkFDdkMsQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDcEIsQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDcEIsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQztnQkFDakIsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQztnQkFDeEIsQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQzthQUM5QixDQUFDLENBQUM7U0FDSjtRQUVELE9BQU8sY0FBYyxDQUFDO0lBQ3hCLENBQUM7SUFFTyxXQUFXLENBQUMsQ0FBUztRQUMzQixPQUFPO1lBQ0wsQ0FBQyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7WUFDbkMsQ0FBQyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUM7U0FDckMsQ0FBQztJQUNKLENBQUM7SUFFTyxTQUFTLENBQUMsS0FBYSxFQUFFLGNBQThCO1FBQzdELElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsZUFBZSxDQUFDLENBQUM7YUFDekQsSUFBSSxDQUFDLEtBQUssRUFBRSxjQUFjLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBRUQsSUFBSSxDQUFDLEdBQTZCO1FBQ2hDLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUNsQixHQUFHLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNwRTtJQUNILENBQUM7SUFFRCxNQUFNLENBQUMsTUFBeUI7UUFDOUIsTUFBTSxXQUFXLEdBQUcsTUFBTSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQztRQUMxRCxNQUFNLFVBQVUsR0FBRyxNQUFNLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDO1FBQ3ZELElBQUksQ0FBQyxXQUFXLEdBQUcsVUFBVSxDQUFDO1FBQzlCLElBQUksQ0FBQyxZQUFZLEdBQUcsV0FBVyxDQUFDO1FBQ2hDLElBQUksQ0FBQyxNQUFNLEdBQUcsMENBQUcsQ0FBQyxXQUFXLEVBQUUsVUFBVSxDQUFDLENBQUM7SUFDN0MsQ0FBQztJQUVELE1BQU0sQ0FBTyxRQUFRLENBQ2pCLFFBQWdCLEVBQ2hCLFFBQWtCLEVBQ2xCLEtBQVk7O1lBRVosTUFBTSxTQUFTLEdBQUcsTUFBTSxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDaEQsT0FBTyxJQUFJLGFBQWEsQ0FBQyxTQUFTLEVBQUUsUUFBUSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ3ZELENBQUM7S0FBQTtDQUNKO0FBT0QsTUFBZSxhQUFhO0lBQzFCLFlBQStCLEtBQW9CO1FBQXBCLFVBQUssR0FBTCxLQUFLLENBQWU7SUFBRyxDQUFDO0lBSS9DLFdBQVcsQ0FBQyxDQUFRLEVBQUUsQ0FBUTtRQUNwQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3pELENBQUM7SUFFUyxRQUFRLENBQUMsS0FBWTtRQUM3QixNQUFNLEVBQUMsSUFBSSxFQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUM7UUFDcEMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUN2QyxNQUFNLFFBQVEsR0FBVSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3pFLG9FQUFvRTtZQUNwRSxVQUFVO1lBQ1YsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUM7Z0JBQUUsT0FBTztZQUM5QyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUM7WUFDeEIsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFPLENBQUMsQ0FBQztZQUNoQixJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNoQixJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUNqQjtJQUNILENBQUM7Q0FDRjtBQUVELE1BQU0sb0JBQXFCLFNBQVEsYUFBYTtJQUFoRDs7UUFDVSxRQUFHLEdBQUcsQ0FBQyxDQUFDO0lBd0JsQixDQUFDO0lBdEJDLElBQUksQ0FBQyxLQUFhLEVBQUUsY0FBOEI7UUFDaEQsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQ25FLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLEdBQUcsV0FBVyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN0RSxJQUFJLENBQUMsUUFBUSxDQUFDLCtDQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFFbEMsTUFBTSxFQUFDLElBQUksRUFBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDO1FBQ3BDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLCtDQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3JDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDdkMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFPLENBQUMsQ0FBQztZQUNoQixJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNoQixJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUNqQjtJQUNILENBQUM7SUFFTyxPQUFPLENBQUMsS0FBYTtRQUMzQixJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUN6QixHQUFHLElBQUksS0FBSyxDQUFDO1FBQ2IsSUFBSSxHQUFHLEdBQUcsR0FBRyxFQUFFO1lBQ2IsR0FBRyxJQUFJLEdBQUcsQ0FBQztTQUNaO1FBQ0QsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO0lBQ3ZCLENBQUM7Q0FDRjtBQUVELE1BQU0saUJBQWtCLFNBQVEsYUFBYTtJQUMzQyxJQUFJO1FBQ0YsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQzFELElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDdkIsQ0FBQztDQUNGO0FBRUQsTUFBTSxvQkFBcUIsU0FBUSxhQUFhO0lBQWhEOztRQUNVLGNBQVMsR0FBRyxDQUFDLENBQUM7UUFFTCxXQUFNLEdBQXFCO1lBQzFDLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxDQUFDO1lBQ2xCLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxDQUFDO1lBQ2hCLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDO1lBQ2pCLHdDQUFLO1lBQ0wsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxHQUFHLENBQUM7WUFDbkIsQ0FBQyxHQUFHLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsRUFBRSxPQUFPO1NBQzdCLENBQUM7SUFPSixDQUFDO0lBTEMsSUFBSSxDQUFDLEtBQWEsRUFBRSxjQUE4QjtRQUNoRCxJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLENBQUM7Y0FDdEQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUM7UUFDekIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO0lBQzdDLENBQUM7Q0FDRjtBQUVELFNBQVMsUUFBUSxDQUFDLFNBQXlCLEVBQUUsaUJBQWlCLEdBQUcsQ0FBQzs7SUFDaEUsT0FBTyxDQUFDLGVBQVMsQ0FBQyxTQUFTLG1DQUFJLENBQUMsR0FBRyxpQkFBaUIsQ0FBQyxHQUFHLENBQUMsZUFBUyxDQUFDLE9BQU8sbUNBQUksQ0FBQyxDQUFDLENBQUM7QUFDbkYsQ0FBQztBQUVELFNBQWUsYUFBYSxDQUFDLFFBQWdCOztRQUMzQyxNQUFNLEdBQUcsR0FBRyxJQUFJLEtBQUssRUFBRSxDQUFDO1FBQ3hCLEdBQUcsQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO1FBQzlCLEdBQUcsQ0FBQyxHQUFHLEdBQUcsUUFBUSxDQUFDO1FBQ25CLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDckMsSUFBSTtnQkFDRixHQUFHLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRTtvQkFDaEMsTUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztvQkFDaEQsTUFBTSxLQUFLLEdBQUcsR0FBRyxDQUFDLFlBQVksQ0FBQztvQkFDL0IsTUFBTSxNQUFNLEdBQUcsR0FBRyxDQUFDLGFBQWEsQ0FBQztvQkFDakMsTUFBTSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7b0JBQ3JCLE1BQU0sQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO29CQUV2QixNQUFNLEdBQUcsR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBRSxDQUFDO29CQUNyQyxHQUFHLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQztvQkFFeEMsTUFBTSxTQUFTLEdBQUcsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQztvQkFDeEQsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUNyQixDQUFDLENBQUMsQ0FBQzthQUNKO1lBQUMsT0FBTyxDQUFDLEVBQUU7Z0JBQ1YsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ1g7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7Q0FBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDL1EyQztBQUNkO0FBRXZCLE1BQU0sY0FBYyxHQUFHLElBQUksK0NBQWMsQ0FDVixlQUFlLENBQUMsQ0FBQztBQVF2RCxJQUFhLE1BQU0sR0FBbkIsTUFBYSxNQUFNO0lBUWpCLFlBQ2tDLEtBQVksRUFDcEIsT0FBeUM7UUFEakMsVUFBSyxHQUFMLEtBQUssQ0FBTztRQVI3QixXQUFNLEdBQXNCLFFBQVEsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFFLENBQUM7UUFDOUQsUUFBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBRSxDQUFDO1FBRTdDLGNBQVMsR0FBRyxXQUFXLENBQUMsR0FBRyxFQUFFLENBQUM7UUFFckIsWUFBTyxHQUFtQixFQUFFLENBQUM7UUFNNUMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRTtZQUNyQixPQUFPLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUN0RCxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLE9BQU8sQ0FBQyxDQUFDO1FBQ2hDLENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ2QsTUFBTSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxHQUFHLEVBQUU7WUFDckMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ2hCLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELE1BQU07UUFDSixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDO1FBQ3RDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUM7UUFDeEMsS0FBSyxNQUFNLE1BQU0sSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ2pDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQzVCO0lBQ0gsQ0FBQztJQUVPLElBQUk7UUFDVixJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDaEUsTUFBTSxHQUFHLEdBQUcsV0FBVyxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQzlCLE1BQU0sU0FBUyxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQ3ZDLEtBQUssTUFBTSxNQUFNLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNqQyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ3ZCLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ3ZCO1FBQ0QsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUVwQixJQUFJLENBQUMsU0FBUyxHQUFHLEdBQUcsQ0FBQztRQUNyQixJQUFJLENBQUMsT0FBTyxHQUFHLHFCQUFxQixDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBQzFELENBQUM7SUFFRCxLQUFLO1FBQ0gsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ2QsQ0FBQztJQUVELElBQUk7UUFDRixJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDaEIsb0JBQW9CLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQ3BDO0lBQ0gsQ0FBQztDQUtGO0FBekRZLE1BQU07SUFTZCxzREFBTSxDQUFDLHlDQUFLLENBQUM7SUFDYixzREFBTSxDQUFDLGNBQWMsQ0FBQztHQVZkLE1BQU0sQ0F5RGxCO0FBekRrQjs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNWWixTQUFTLE1BQU0sQ0FBSSxLQUFlO0lBQ3ZDLE9BQU8sVUFBVSxNQUFnQixFQUFFLFdBQTRCLEVBQUUsY0FBc0I7O1FBQ3JGLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUUsY0FBYyxDQUFDLENBQUM7UUFDeEQsTUFBTSxJQUFJLEdBQUcsWUFBTSxDQUFDLElBQUksQ0FBQyxtQ0FBSSxFQUFFLENBQUM7UUFDaEMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLEtBQUssQ0FBQztRQUM1QixNQUE4QixDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQztJQUMvQyxDQUFDO0FBQ0gsQ0FBQztBQUVNLE1BQU0sUUFBUTtJQUluQixZQUNtQixNQUFpQjtRQUFqQixXQUFNLEdBQU4sTUFBTSxDQUFXO1FBSG5CLFVBQUssR0FBRyxJQUFJLEdBQUcsRUFBd0MsQ0FBQztJQUlwRSxDQUFDO0lBR04sUUFBUSxDQUFDLEdBQUcsV0FBMkM7UUFDckQsS0FBSyxNQUFNLFVBQVUsSUFBSSxXQUFXLEVBQUU7WUFDcEMsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUN4QyxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQy9DLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRTtnQkFDcEIsS0FBSztnQkFDTCxPQUFPO2dCQUNQLEtBQUssRUFBRSxTQUFTO2FBQ2pCLENBQUMsQ0FBQztTQUNKO0lBQ0gsQ0FBQztJQUVPLFFBQVEsQ0FBSSxVQUF5QjtRQUMzQyxJQUFJLG9CQUFvQixDQUFDLFVBQVUsQ0FBQztZQUNoQyxzQkFBc0IsQ0FBQyxVQUFVLENBQUMsRUFBRTtZQUN0QyxPQUFPLFVBQVUsQ0FBQyxPQUFPLENBQUM7U0FDM0I7UUFFRCxPQUFPLFVBQVUsQ0FBQztJQUNwQixDQUFDO0lBRUQsR0FBRyxDQUFJLEtBQWU7UUFDcEIsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDbEMsSUFBSSxHQUFHLEVBQUU7WUFDUCxJQUFJLEdBQUcsQ0FBQyxLQUFLLEtBQUssUUFBUSxFQUFFO2dCQUMxQixNQUFNLElBQUksS0FBSyxDQUFDLHFCQUFxQixDQUFDLENBQUM7YUFDeEM7WUFDRCxJQUFJLEdBQUcsQ0FBQyxLQUFLLEtBQUssU0FBUyxFQUFFO2dCQUMzQixHQUFHLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQztnQkFDckIsR0FBRyxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUMsT0FBTyxFQUFFLENBQUM7YUFDM0I7WUFDRCxPQUFPLEdBQUcsQ0FBQyxLQUFVLENBQUM7U0FDdkI7UUFDRCxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDZixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQy9CO1FBQ0QsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNyQixNQUFNLElBQUksS0FBSyxDQUFDLGlCQUFpQixDQUFDLENBQUM7SUFDckMsQ0FBQztJQUVPLGFBQWEsQ0FBSSxVQUF5QjtRQUNoRCxPQUFPLEdBQUcsRUFBRTs7WUFDVixJQUFJLFVBQVUsWUFBWSxjQUFjLEVBQUU7Z0JBQ3hDLE1BQU0sSUFBSSxLQUFLLENBQUMsd0NBQXdDLENBQUMsQ0FBQzthQUMzRDtZQUNELElBQUksb0JBQW9CLENBQUMsVUFBVSxDQUFDLEVBQUU7Z0JBQ3BDLE9BQU8sVUFBVSxDQUFDLFFBQVEsQ0FBQzthQUM1QjtZQUNELElBQUksc0JBQXNCLENBQUMsVUFBVSxDQUFDLEVBQUU7Z0JBQ3RDLE1BQU0sSUFBSSxHQUFHLGdCQUFVLENBQUMsSUFBSSxtQ0FBSSxFQUFFLENBQUM7Z0JBQ25DLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFxQixDQUFDO2dCQUNoRSxPQUFPLFVBQVUsQ0FBQyxVQUFVLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQzthQUN2QztZQUNELE1BQU0sS0FBSyxHQUFHLFVBQVUsQ0FBQztZQUN6QixNQUFNLElBQUksR0FBRyxXQUFLLENBQUMsSUFBSSxDQUFDLG1DQUFJLEVBQUUsQ0FBQztZQUMvQixNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQzVDLE9BQU8sSUFBSSxLQUFLLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQztRQUM1QixDQUFDLENBQUM7SUFDSixDQUFDO0NBQ0Y7QUFRRCxNQUFNLFNBQVMsR0FBRyxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUM7QUFDeEMsTUFBTSxRQUFRLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQ3BDLE1BQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztBQWE1QixTQUFTLG9CQUFvQixDQUFJLENBQVU7SUFDekMsT0FBTyxPQUFPLENBQUMsS0FBSyxRQUFRLElBQUksQ0FBQyxLQUFLLElBQUk7V0FDbkMsVUFBVSxJQUFJLENBQUMsQ0FBQztBQUN6QixDQUFDO0FBQ0QsU0FBUyxzQkFBc0IsQ0FBSSxDQUFVO0lBQzNDLE9BQU8sT0FBTyxDQUFDLEtBQUssUUFBUSxJQUFJLENBQUMsS0FBSyxJQUFJO1dBQ25DLFlBQVksSUFBSSxDQUFDLENBQUM7QUFDM0IsQ0FBQztBQVNNLE1BQU0sY0FBYztJQUN6QixZQUNxQixJQUFZO1FBQVosU0FBSSxHQUFKLElBQUksQ0FBUTtJQUM1QixDQUFDO0lBRU4sUUFBUTtRQUNOLE9BQU8sa0JBQWtCLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUN2QyxDQUFDO0NBQ0Y7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM5SGtDO0FBRVA7QUFDZ0I7QUFFZjtBQXFCN0IsTUFBTSxvQkFBb0IsR0FBZ0I7SUFDeEMsU0FBUyxFQUFFLEtBQUs7SUFDaEIsZ0JBQWdCLEVBQUUsS0FBSztJQUN2QixhQUFhLEVBQUUsS0FBSztJQUNwQixhQUFhLEVBQUUsU0FBUztJQUN4QixZQUFZLEVBQUUsSUFBSTtJQUNsQixTQUFTLEVBQUUsd0NBQUs7SUFDaEIsS0FBSyxFQUFFLElBQUk7Q0FDWixDQUFDO0FBRUYsTUFBTSxrQkFBa0IsR0FBRyxDQUN2QixPQUF3RCxFQUFFLEVBQUUsQ0FDeEQsQ0FBQyxVQUF1QixFQUFVLEVBQUU7SUFDbEMsSUFBSSxVQUFVLEtBQUssSUFBSSxFQUFFO1FBQ3ZCLE9BQU8sQ0FBQyxDQUFDO0tBQ1Y7SUFDRCxPQUFPLE9BQU8sQ0FBQyxVQUFVLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3RDLENBQUMsQ0FBQztBQUNWLE1BQU0sUUFBUSxHQUFHLGtCQUFrQixDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUNyRCxNQUFNLFVBQVUsR0FBRyxrQkFBa0IsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7QUFDekQsTUFBTSxVQUFVLEdBQUcsQ0FBQyxXQUF3QixFQUFTLEVBQUU7SUFDckQsSUFBSSxDQUFDLFdBQVc7UUFBRSxPQUFPLHdDQUFLLENBQUM7SUFDL0IsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsV0FBVyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDekQsT0FBTyxDQUFDLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLEdBQUcsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0FBQzFDLENBQUMsQ0FBQztBQUVGLDZFQUE2RTtBQUM3RSxxQkFBcUIsQ0FDbkIsV0FBVyxFQUNYLGtCQUFrQixFQUNsQixlQUFlLEVBQ2YsZUFBZSxFQUNmLENBQUMsY0FBYyxFQUFFLFVBQVUsQ0FBQyxFQUM1QixDQUFDLFdBQVcsRUFBRSxVQUFVLENBQUMsRUFDekIsQ0FBQyxPQUFPLEVBQUUsVUFBVSxDQUFDLENBQ3RCLENBQUM7QUFFRixNQUFNLG1CQUFtQixHQUFHO0lBQzFCLEVBQUMsR0FBRyxFQUFFLFlBQVksRUFBRSxTQUFTLEVBQUUsYUFBYSxFQUFFLFlBQVksRUFBRSxRQUFRLEVBQUM7SUFDckUsRUFBQyxHQUFHLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsWUFBWSxFQUFFLFFBQVEsRUFBQztDQUN6RCxDQUFDO0FBRVgsTUFBTSw0QkFBNEIsR0FBOEM7SUFDOUUsU0FBUyxFQUFFLHNEQUFrQjtJQUM3QixnQkFBZ0IsRUFBRSwrREFBMkI7SUFDN0MsYUFBYSxFQUFFLHNEQUFrQjtDQUNsQyxDQUFDO0FBRUYsSUFBYSxRQUFRLEdBQXJCLE1BQWEsUUFBUTtJQUduQixZQUNvQyxLQUFZO1FBQVosVUFBSyxHQUFMLEtBQUssQ0FBTztRQUgvQixhQUFRLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7UUFLbEQsWUFBWSxDQUFDLFNBQVMsQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFO1lBQzFDLHdEQUF3RDtZQUN4RCxLQUFLLE1BQU0sQ0FBQyxPQUFPLEVBQUUsUUFBUSxDQUFDLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFO2dCQUNwRSxNQUFNLFlBQVksR0FDZCw0QkFBNEIsQ0FBQyxPQUE0QixDQUFDLENBQUM7Z0JBQy9ELElBQUksWUFBWSxLQUFLLFNBQVMsRUFBRTtvQkFDOUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQ25CLFlBQVk7b0JBQ1osOEJBQThCO29CQUM5QixDQUFDLFFBQVEsQ0FBQyxDQUFDO2lCQUNoQjthQUNGO1lBQ0QsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLGtCQUFrQixDQUFDLENBQUM7UUFDbkQsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUgsbUJBQW1CLENBQ2YsR0FBTSxFQUNOLEtBQTREO1FBRTFELE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDcEMsSUFBSSxPQUFPLEtBQUssS0FBSyxVQUFVLEVBQUU7WUFDL0IsS0FBSyxHQUFHLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUN6QjtRQUNELElBQUksS0FBSyxLQUFLLFFBQVE7WUFBRSxPQUFPO1FBQy9CLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDO1FBQzNCLFlBQVksQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO1FBQzVDLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEVBQUU7WUFDM0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDO1NBQ25DO0lBQ0gsQ0FBQztJQUVMLFVBQVUsQ0FBZ0MsR0FBTTtRQUM5QyxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDNUIsQ0FBQztJQUVPLGtCQUFrQjtRQUN4QixNQUFNLGtCQUFrQixHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQ3pDLG1CQUFtQixDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUMsR0FBRyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUMsRUFBRSxFQUFFO1lBQ3pELE9BQU8sQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLHFCQUFxQixDQUFDLEdBQUcsRUFBRSxTQUFTLEVBQUUsWUFBWSxDQUFDLENBQUMsQ0FBQztRQUN6RSxDQUFDLENBQUMsQ0FBa0MsQ0FBQztRQUN6QyxNQUFNLFdBQVcsR0FBZ0Isb0JBQW9CLENBQUM7UUFDdEQsdUNBQ0ssa0JBQWtCLEdBQ2xCLFdBQVcsRUFDZDtJQUNKLENBQUM7SUFFTyxxQkFBcUIsQ0FDekIsR0FBTSxFQUNOLEtBQWEsRUFDYixXQUFnRDtRQUVoRCxNQUFNLFVBQVUsR0FBRyxZQUFZLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzdDLE1BQU0sZ0JBQWdCLEdBQUcsV0FBVyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ2pELElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDO1lBQ3RCLFFBQVEsRUFBRSxzREFBa0I7WUFDNUIsRUFBRSxFQUFFLEdBQUc7WUFDUCxLQUFLO1lBQ0wsS0FBSyxFQUFFLGdCQUFnQjtTQUN4QixDQUFDLENBQUM7UUFDSCxPQUFPLGdCQUFnQixDQUFDO0lBQzFCLENBQUM7Q0FDSjtBQXJFWSxRQUFRO0lBSWQsc0RBQU0sQ0FBQyx5Q0FBSyxDQUFDO0dBSlAsUUFBUSxDQXFFcEI7QUFyRW9CO0FBMEVyQixNQUFNLFlBQVksR0FBRyxJQUFJLCtDQUFhLENBQXVCLENBQUMsQ0FBQyxDQUFDO0FBUWhFLFNBQVMscUJBQXFCLENBQzFCLEdBQUcsSUFBNEM7SUFDNUMsTUFBbUMsQ0FBQyx5QkFBeUIsR0FBRztRQUMvRCxtQkFBbUIsQ0FBQyxVQUFVO1lBQzVCLE9BQU8sQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsVUFBVSxDQUFDLENBQUM7WUFDNUMsTUFBTSxlQUFlLEdBQXlCLEVBQUUsQ0FBQztZQUNqRCxLQUFLLElBQUksR0FBRyxJQUFJLElBQUksRUFBRTtnQkFDcEIsSUFBSSxTQUFTLEdBQTJDLFNBQVMsQ0FBQztnQkFDbEUsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFO29CQUN0QixTQUFTLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNuQixHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUNkO2dCQUNELE1BQU0sUUFBUSxHQUFHLFVBQVUsQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztnQkFDL0MsSUFBSSxRQUFRLEVBQUU7b0JBQ1osZUFBZSxDQUFDLEdBQUcsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO3dCQUMxRCxRQUFRLENBQUMsS0FBSyxDQUFDO2lCQUNwQjthQUNGO1lBQ0QsWUFBWSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUNyQyxDQUFDO0tBQ0YsQ0FBQztBQUNKLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2pMdUM7QUFFckMsTUFBTSxhQUFhLEdBQUcsSUFBSSwrQ0FBYyxDQUFjLGNBQWMsQ0FBQyxDQUFDO0FBRTdFLGdFQUFnRTtBQUNoRSxJQUFhLEtBQUssR0FBbEIsTUFBYSxLQUFLO0lBUWhCLFlBQzRDLEVBQWU7UUFBZixPQUFFLEdBQUYsRUFBRSxDQUFhO1FBUDFDLG1CQUFjLEdBQUcsSUFBSSxHQUFHLEVBQW1DLENBQUM7UUFDNUQsVUFBSyxHQUFHLElBQUksR0FBRyxFQUFnQixDQUFDO1FBQ2hDLG9CQUFlLEdBQUcsSUFBSSxHQUFHLEVBQWdCLENBQUM7UUFFbkQsZUFBVSxHQUFHLEtBQUssQ0FBQztJQUl0QixDQUFDO0lBRU4sWUFBWSxDQUFDLElBQVU7O1FBQ3JCLE1BQU0sWUFBWSxHQUFHLFVBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsbUNBQUksRUFBRSxDQUFDO1FBQ2xFLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxHQUFHLFlBQVksRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNuRSxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ2hDLENBQUM7SUFFTyxZQUFZLENBQUMsTUFBYztRQUNqQyxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ2hDLENBQUM7SUFFRCxXQUFXLENBQUMsUUFBc0IsRUFBRSxLQUFzQztRQUN4RSxLQUFLLE1BQU0sQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLElBQUksS0FBSyxFQUFFO1lBQ2xDLE1BQU0sRUFBRSxHQUFHLEtBQUssQ0FBQyxDQUFDLG1CQUFtQjtZQUNyQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsRUFBRTtnQkFDMUIsSUFBSSxDQUFDLFlBQVksQ0FBQztvQkFDaEIsRUFBRTtvQkFDRixRQUFRO29CQUNSLEtBQUs7b0JBQ0wsS0FBSztpQkFDTixDQUFDLENBQUM7YUFDSjtpQkFBTTtnQkFDTCxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQzthQUM1QjtTQUNGO0lBQ0gsQ0FBQztJQUVELFVBQVUsQ0FBQyxFQUFjLEVBQUUsS0FBb0I7UUFDN0MsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDckMsSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUNkLE1BQU0sSUFBSSxLQUFLLENBQUMscURBQXFELEVBQUUsRUFBRSxDQUFDLENBQUM7U0FDNUU7UUFDRCxJQUFJLFNBQVMsQ0FBQyxLQUFLLEtBQUssS0FBSztZQUFFLE9BQU87UUFDdEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxrQ0FDWixTQUFTLEtBQ1osS0FBSyxJQUNMLENBQUM7UUFDSCxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQ2pELElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO1NBQ3hCO0lBQ0gsQ0FBQztJQUVELFlBQVksQ0FBQyxRQUFzQixFQUFFLFVBQW1CO1FBQ3RELE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3RELElBQUksVUFBVSxLQUFLLFVBQVU7WUFBRSxPQUFPO1FBQ3RDLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO1FBQ3ZCLElBQUksVUFBVSxFQUFFO1lBQ2QsSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDcEM7YUFBTTtZQUNMLElBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQ3ZDO0lBQ0gsQ0FBQztJQUVELE1BQU07UUFDSixJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNwQixPQUFPO1NBQ1I7UUFDRCxNQUFNLGNBQWMsR0FBYSxFQUFFLENBQUM7UUFDcEMsS0FBSyxNQUFNLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxJQUFJLElBQUksQ0FBQyxjQUFjLEVBQUU7WUFDckQsSUFBSSxJQUFJLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUM7Z0JBQUUsU0FBUztZQUNqRCxLQUFLLE1BQU0sTUFBTSxJQUFJLE9BQU8sRUFBRTtnQkFDNUIsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ3BDLElBQUksQ0FBQyxJQUFJLEVBQUU7b0JBQ1QsTUFBTSxJQUFJLEtBQUssQ0FBQyx5QkFBeUIsTUFBTSxHQUFHLENBQUMsQ0FBQztpQkFDckQ7Z0JBQ0QsTUFBTSxFQUFDLEtBQUssRUFBRSxLQUFLLEVBQUMsR0FBRyxJQUFJLENBQUM7Z0JBQzVCLElBQUksS0FBSyxLQUFLLFNBQVM7b0JBQUUsU0FBUztnQkFDbEMsY0FBYyxDQUFDLElBQUksQ0FBQyxHQUFHLEtBQUssS0FBSyxLQUFLLEVBQUUsQ0FBQyxDQUFDO2FBQzNDO1NBQ0Y7UUFDRCxJQUFJLENBQUMsRUFBRSxDQUFDLFNBQVMsR0FBRyxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzlDLElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO0lBQzFCLENBQUM7Q0FDRjtBQXBGWSxLQUFLO0lBU1gsc0RBQU0sQ0FBQyxhQUFhLENBQUM7R0FUZixLQUFLLENBb0ZqQjtBQXBGaUI7QUE2RmxCLElBQVksWUFJWDtBQUpELFdBQVksWUFBWTtJQUN0QixpREFBSztJQUNMLG1FQUFjO0lBQ2QsaURBQUs7QUFDUCxDQUFDLEVBSlcsWUFBWSxLQUFaLFlBQVksUUFJdkI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3BHTSxNQUFNLEtBQUssR0FBVSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0FBRTFDLFNBQVMsZ0JBQWdCLENBQUksR0FBb0I7SUFDdEQsTUFBTSxhQUFhLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztJQUMvQyxPQUFPLGFBQWEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztBQUM5QixDQUFDO0FBQ0Q7Ozs7Ozs7Ozs7R0FVRztBQUNLLFNBQVMsUUFBUSxDQUFDLENBQVMsRUFBRSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsR0FBRyxHQUFHO0lBQ25ELElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7SUFFWixJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUM7UUFDUCxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxhQUFhO0tBQy9CO1NBQUs7UUFDRixJQUFJLE9BQU8sR0FBRyxTQUFTLE9BQU8sQ0FBQyxDQUFTLEVBQUUsQ0FBUyxFQUFFLENBQVM7WUFDMUQsSUFBRyxDQUFDLEdBQUcsQ0FBQztnQkFBRSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2pCLElBQUcsQ0FBQyxHQUFHLENBQUM7Z0JBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNqQixJQUFHLENBQUMsR0FBRyxDQUFDLEdBQUMsQ0FBQztnQkFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3ZDLElBQUcsQ0FBQyxHQUFHLENBQUMsR0FBQyxDQUFDO2dCQUFFLE9BQU8sQ0FBQyxDQUFDO1lBQ3JCLElBQUcsQ0FBQyxHQUFHLENBQUMsR0FBQyxDQUFDO2dCQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDL0MsT0FBTyxDQUFDLENBQUM7UUFDYixDQUFDO1FBRUQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDOUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDbEIsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUM7UUFDM0IsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3JCLENBQUMsR0FBRyxPQUFPLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDO0tBQzlCO0lBRUQsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0FBQzlFLENBQUM7QUFDTSxTQUFTLEdBQUcsQ0FBQyxDQUFTLEVBQUUsQ0FBUztJQUN0QyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDVixDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLHFCQUFxQjtJQUNyRCxDQUFDLEdBQUcsQ0FBQyxHQUFDLENBQUMsQ0FBQztJQUNSLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDMUIsQ0FBQztBQUNNLFNBQVMsR0FBRyxDQUFDLENBQVMsRUFB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LFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUN2RSxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDZixDQUFDO0lBQ0QsSUFBSSxFQUFFLENBQUMsK0NBQVEsRUFBRSx5Q0FBSyxDQUFDO0NBQ3hCLENBQ0YsQ0FBQztBQUlGLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxrQkFBa0IsRUFBRSxHQUFHLEVBQUU7SUFDakQsTUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQywyQ0FBTSxDQUFDLENBQUM7SUFDcEMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBRWYsTUFBTSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxHQUFHLEVBQUU7UUFDckMsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ2xCLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kdmQvLi9ub2RlX21vZHVsZXMvcnhqcy9kaXN0L2VzbTUvaW50ZXJuYWwvTm90aWZpY2F0aW9uRmFjdG9yaWVzLmpzIiwid2VicGFjazovL2R2ZC8uL25vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvZXNtNS9pbnRlcm5hbC9PYnNlcnZhYmxlLmpzIiwid2VicGFjazovL2R2ZC8uL25vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvZXNtNS9pbnRlcm5hbC9SZXBsYXlTdWJqZWN0LmpzIiwid2VicGFjazovL2R2ZC8uL25vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvZXNtNS9pbnRlcm5hbC9TdWJqZWN0LmpzIiwid2VicGFjazovL2R2ZC8uL25vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvZXNtNS9pbnRlcm5hbC9TdWJzY3JpYmVyLmpzIiwid2VicGFjazovL2R2ZC8uL25vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvZXNtNS9pbnRlcm5hbC9TdWJzY3JpcHRpb24uanMiLCJ3ZWJwYWNrOi8vZHZkLy4vbm9kZV9tb2R1bGVzL3J4anMvZGlzdC9lc201L2ludGVybmFsL2NvbmZpZy5qcyIsIndlYnBhY2s6Ly9kdmQvLi9ub2RlX21vZHVsZXMvcnhqcy9kaXN0L2VzbTUvaW50ZXJuYWwvc2NoZWR1bGVyL2RhdGVUaW1lc3RhbXBQcm92aWRlci5qcyIsIndlYnBhY2s6Ly9kdmQvLi9ub2RlX21vZHVsZXMvcnhqcy9kaXN0L2VzbTUvaW50ZXJuYWwvc2NoZWR1bGVyL3RpbWVvdXRQcm92aWRlci5qcyIsIndlYnBhY2s6Ly9kdmQvLi9ub2RlX21vZHVsZXMvcnhqcy9kaXN0L2VzbTUvaW50ZXJuYWwvc3ltYm9sL29ic2VydmFibGUuanMiLCJ3ZWJwYWNrOi8vZHZkLy4vbm9kZV9tb2R1bGVzL3J4anMvZGlzdC9lc201L2ludGVybmFsL3V0aWwvT2JqZWN0VW5zdWJzY3JpYmVkRXJyb3IuanMiLCJ3ZWJwYWNrOi8vZHZkLy4vbm9kZV9tb2R1bGVzL3J4anMvZGlzdC9lc201L2ludGVybmFsL3V0aWwvVW5zdWJzY3JpcHRpb25FcnJvci5qcyIsIndlYnBhY2s6Ly9kdmQvLi9ub2RlX21vZHVsZXMvcnhqcy9kaXN0L2VzbTUvaW50ZXJuYWwvdXRpbC9hcnJSZW1vdmUuanMiLCJ3ZWJwYWNrOi8vZHZkLy4vbm9kZV9tb2R1bGVzL3J4anMvZGlzdC9lc201L2ludGVybmFsL3V0aWwvY3JlYXRlRXJyb3JDbGFzcy5qcyIsIndlYnBhY2s6Ly9kdmQvLi9ub2RlX21vZHVsZXMvcnhqcy9kaXN0L2VzbTUvaW50ZXJuYWwvdXRpbC9lcnJvckNvbnRleHQuanMiLCJ3ZWJwYWNrOi8vZHZkLy4vbm9kZV9tb2R1bGVzL3J4anMvZGlzdC9lc201L2ludGVybmFsL3V0aWwvaWRlbnRpdHkuanMiLCJ3ZWJwYWNrOi8vZHZkLy4vbm9kZV9tb2R1bGVzL3J4anMvZGlzdC9lc201L2ludGVybmFsL3V0aWwvaXNGdW5jdGlvbi5qcyIsIndlYnBhY2s6Ly9kdmQvLi9ub2RlX21vZHVsZXMvcnhqcy9kaXN0L2VzbTUvaW50ZXJuYWwvdXRpbC9ub29wLmpzIiwid2VicGFjazovL2R2ZC8uL25vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvZXNtNS9pbnRlcm5hbC91dGlsL3BpcGUuanMiLCJ3ZWJwYWNrOi8vZHZkLy4vbm9kZV9tb2R1bGVzL3J4anMvZGlzdC9lc201L2ludGVybmFsL3V0aWwvcmVwb3J0VW5oYW5kbGVkRXJyb3IuanMiLCJ3ZWJwYWNrOi8vZHZkLy4vc3JjL2JvdW5jaW5nX2ltYWdlLnRzIiwid2VicGFjazovL2R2ZC8uL3NyYy9jYW52YXMudHMiLCJ3ZWJwYWNrOi8vZHZkLy4vc3JjL2RpLnRzIiwid2VicGFjazovL2R2ZC8uL3NyYy9zZXR0aW5ncy50cyIsIndlYnBhY2s6Ly9kdmQvLi9zcmMvc3RhdHMudHMiLCJ3ZWJwYWNrOi8vZHZkLy4vc3JjL3V0aWwudHMiLCJ3ZWJwYWNrOi8vZHZkLy4vbm9kZV9tb2R1bGVzL3RzbGliL3RzbGliLmVzNi5qcyIsIndlYnBhY2s6Ly9kdmQvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vZHZkL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9kdmQvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9kdmQvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9kdmQvLi9zcmMvbWFpbi50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgdmFyIENPTVBMRVRFX05PVElGSUNBVElPTiA9IChmdW5jdGlvbiAoKSB7IHJldHVybiBjcmVhdGVOb3RpZmljYXRpb24oJ0MnLCB1bmRlZmluZWQsIHVuZGVmaW5lZCk7IH0pKCk7XG5leHBvcnQgZnVuY3Rpb24gZXJyb3JOb3RpZmljYXRpb24oZXJyb3IpIHtcbiAgICByZXR1cm4gY3JlYXRlTm90aWZpY2F0aW9uKCdFJywgdW5kZWZpbmVkLCBlcnJvcik7XG59XG5leHBvcnQgZnVuY3Rpb24gbmV4dE5vdGlmaWNhdGlvbih2YWx1ZSkge1xuICAgIHJldHVybiBjcmVhdGVOb3RpZmljYXRpb24oJ04nLCB2YWx1ZSwgdW5kZWZpbmVkKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVOb3RpZmljYXRpb24oa2luZCwgdmFsdWUsIGVycm9yKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAga2luZDoga2luZCxcbiAgICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgICBlcnJvcjogZXJyb3IsXG4gICAgfTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPU5vdGlmaWNhdGlvbkZhY3Rvcmllcy5qcy5tYXAiLCJpbXBvcnQgeyBTYWZlU3Vic2NyaWJlciwgU3Vic2NyaWJlciB9IGZyb20gJy4vU3Vic2NyaWJlcic7XG5pbXBvcnQgeyBpc1N1YnNjcmlwdGlvbiB9IGZyb20gJy4vU3Vic2NyaXB0aW9uJztcbmltcG9ydCB7IG9ic2VydmFibGUgYXMgU3ltYm9sX29ic2VydmFibGUgfSBmcm9tICcuL3N5bWJvbC9vYnNlcnZhYmxlJztcbmltcG9ydCB7IHBpcGVGcm9tQXJyYXkgfSBmcm9tICcuL3V0aWwvcGlwZSc7XG5pbXBvcnQgeyBjb25maWcgfSBmcm9tICcuL2NvbmZpZyc7XG5pbXBvcnQgeyBpc0Z1bmN0aW9uIH0gZnJvbSAnLi91dGlsL2lzRnVuY3Rpb24nO1xuaW1wb3J0IHsgZXJyb3JDb250ZXh0IH0gZnJvbSAnLi91dGlsL2Vycm9yQ29udGV4dCc7XG52YXIgT2JzZXJ2YWJsZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gT2JzZXJ2YWJsZShzdWJzY3JpYmUpIHtcbiAgICAgICAgaWYgKHN1YnNjcmliZSkge1xuICAgICAgICAgICAgdGhpcy5fc3Vic2NyaWJlID0gc3Vic2NyaWJlO1xuICAgICAgICB9XG4gICAgfVxuICAgIE9ic2VydmFibGUucHJvdG90eXBlLmxpZnQgPSBmdW5jdGlvbiAob3BlcmF0b3IpIHtcbiAgICAgICAgdmFyIG9ic2VydmFibGUgPSBuZXcgT2JzZXJ2YWJsZSgpO1xuICAgICAgICBvYnNlcnZhYmxlLnNvdXJjZSA9IHRoaXM7XG4gICAgICAgIG9ic2VydmFibGUub3BlcmF0b3IgPSBvcGVyYXRvcjtcbiAgICAgICAgcmV0dXJuIG9ic2VydmFibGU7XG4gICAgfTtcbiAgICBPYnNlcnZhYmxlLnByb3RvdHlwZS5zdWJzY3JpYmUgPSBmdW5jdGlvbiAob2JzZXJ2ZXJPck5leHQsIGVycm9yLCBjb21wbGV0ZSkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB2YXIgc3Vic2NyaWJlciA9IGlzU3Vic2NyaWJlcihvYnNlcnZlck9yTmV4dCkgPyBvYnNlcnZlck9yTmV4dCA6IG5ldyBTYWZlU3Vic2NyaWJlcihvYnNlcnZlck9yTmV4dCwgZXJyb3IsIGNvbXBsZXRlKTtcbiAgICAgICAgZXJyb3JDb250ZXh0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBfYSA9IF90aGlzLCBvcGVyYXRvciA9IF9hLm9wZXJhdG9yLCBzb3VyY2UgPSBfYS5zb3VyY2U7XG4gICAgICAgICAgICBzdWJzY3JpYmVyLmFkZChvcGVyYXRvclxuICAgICAgICAgICAgICAgID9cbiAgICAgICAgICAgICAgICAgICAgb3BlcmF0b3IuY2FsbChzdWJzY3JpYmVyLCBzb3VyY2UpXG4gICAgICAgICAgICAgICAgOiBzb3VyY2VcbiAgICAgICAgICAgICAgICAgICAgP1xuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuX3N1YnNjcmliZShzdWJzY3JpYmVyKVxuICAgICAgICAgICAgICAgICAgICA6XG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5fdHJ5U3Vic2NyaWJlKHN1YnNjcmliZXIpKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBzdWJzY3JpYmVyO1xuICAgIH07XG4gICAgT2JzZXJ2YWJsZS5wcm90b3R5cGUuX3RyeVN1YnNjcmliZSA9IGZ1bmN0aW9uIChzaW5rKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fc3Vic2NyaWJlKHNpbmspO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIHNpbmsuZXJyb3IoZXJyKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgT2JzZXJ2YWJsZS5wcm90b3R5cGUuZm9yRWFjaCA9IGZ1bmN0aW9uIChuZXh0LCBwcm9taXNlQ3Rvcikge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICBwcm9taXNlQ3RvciA9IGdldFByb21pc2VDdG9yKHByb21pc2VDdG9yKTtcbiAgICAgICAgcmV0dXJuIG5ldyBwcm9taXNlQ3RvcihmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICB2YXIgc3Vic2NyaWJlciA9IG5ldyBTYWZlU3Vic2NyaWJlcih7XG4gICAgICAgICAgICAgICAgbmV4dDogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXh0KHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1YnNjcmliZXIudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZXJyb3I6IHJlamVjdCxcbiAgICAgICAgICAgICAgICBjb21wbGV0ZTogcmVzb2x2ZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgX3RoaXMuc3Vic2NyaWJlKHN1YnNjcmliZXIpO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIE9ic2VydmFibGUucHJvdG90eXBlLl9zdWJzY3JpYmUgPSBmdW5jdGlvbiAoc3Vic2NyaWJlcikge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIHJldHVybiAoX2EgPSB0aGlzLnNvdXJjZSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnN1YnNjcmliZShzdWJzY3JpYmVyKTtcbiAgICB9O1xuICAgIE9ic2VydmFibGUucHJvdG90eXBlW1N5bWJvbF9vYnNlcnZhYmxlXSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICBPYnNlcnZhYmxlLnByb3RvdHlwZS5waXBlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgb3BlcmF0aW9ucyA9IFtdO1xuICAgICAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgb3BlcmF0aW9uc1tfaV0gPSBhcmd1bWVudHNbX2ldO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBwaXBlRnJvbUFycmF5KG9wZXJhdGlvbnMpKHRoaXMpO1xuICAgIH07XG4gICAgT2JzZXJ2YWJsZS5wcm90b3R5cGUudG9Qcm9taXNlID0gZnVuY3Rpb24gKHByb21pc2VDdG9yKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHByb21pc2VDdG9yID0gZ2V0UHJvbWlzZUN0b3IocHJvbWlzZUN0b3IpO1xuICAgICAgICByZXR1cm4gbmV3IHByb21pc2VDdG9yKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgIHZhciB2YWx1ZTtcbiAgICAgICAgICAgIF90aGlzLnN1YnNjcmliZShmdW5jdGlvbiAoeCkgeyByZXR1cm4gKHZhbHVlID0geCk7IH0sIGZ1bmN0aW9uIChlcnIpIHsgcmV0dXJuIHJlamVjdChlcnIpOyB9LCBmdW5jdGlvbiAoKSB7IHJldHVybiByZXNvbHZlKHZhbHVlKTsgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgT2JzZXJ2YWJsZS5jcmVhdGUgPSBmdW5jdGlvbiAoc3Vic2NyaWJlKSB7XG4gICAgICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZShzdWJzY3JpYmUpO1xuICAgIH07XG4gICAgcmV0dXJuIE9ic2VydmFibGU7XG59KCkpO1xuZXhwb3J0IHsgT2JzZXJ2YWJsZSB9O1xuZnVuY3Rpb24gZ2V0UHJvbWlzZUN0b3IocHJvbWlzZUN0b3IpIHtcbiAgICB2YXIgX2E7XG4gICAgcmV0dXJuIChfYSA9IHByb21pc2VDdG9yICE9PSBudWxsICYmIHByb21pc2VDdG9yICE9PSB2b2lkIDAgPyBwcm9taXNlQ3RvciA6IGNvbmZpZy5Qcm9taXNlKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiBQcm9taXNlO1xufVxuZnVuY3Rpb24gaXNPYnNlcnZlcih2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZSAmJiBpc0Z1bmN0aW9uKHZhbHVlLm5leHQpICYmIGlzRnVuY3Rpb24odmFsdWUuZXJyb3IpICYmIGlzRnVuY3Rpb24odmFsdWUuY29tcGxldGUpO1xufVxuZnVuY3Rpb24gaXNTdWJzY3JpYmVyKHZhbHVlKSB7XG4gICAgcmV0dXJuICh2YWx1ZSAmJiB2YWx1ZSBpbnN0YW5jZW9mIFN1YnNjcmliZXIpIHx8IChpc09ic2VydmVyKHZhbHVlKSAmJiBpc1N1YnNjcmlwdGlvbih2YWx1ZSkpO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9T2JzZXJ2YWJsZS5qcy5tYXAiLCJpbXBvcnQgeyBfX2V4dGVuZHMgfSBmcm9tIFwidHNsaWJcIjtcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICcuL1N1YmplY3QnO1xuaW1wb3J0IHsgZGF0ZVRpbWVzdGFtcFByb3ZpZGVyIH0gZnJvbSAnLi9zY2hlZHVsZXIvZGF0ZVRpbWVzdGFtcFByb3ZpZGVyJztcbnZhciBSZXBsYXlTdWJqZWN0ID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoUmVwbGF5U3ViamVjdCwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBSZXBsYXlTdWJqZWN0KF9idWZmZXJTaXplLCBfd2luZG93VGltZSwgX3RpbWVzdGFtcFByb3ZpZGVyKSB7XG4gICAgICAgIGlmIChfYnVmZmVyU2l6ZSA9PT0gdm9pZCAwKSB7IF9idWZmZXJTaXplID0gSW5maW5pdHk7IH1cbiAgICAgICAgaWYgKF93aW5kb3dUaW1lID09PSB2b2lkIDApIHsgX3dpbmRvd1RpbWUgPSBJbmZpbml0eTsgfVxuICAgICAgICBpZiAoX3RpbWVzdGFtcFByb3ZpZGVyID09PSB2b2lkIDApIHsgX3RpbWVzdGFtcFByb3ZpZGVyID0gZGF0ZVRpbWVzdGFtcFByb3ZpZGVyOyB9XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMpIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLl9idWZmZXJTaXplID0gX2J1ZmZlclNpemU7XG4gICAgICAgIF90aGlzLl93aW5kb3dUaW1lID0gX3dpbmRvd1RpbWU7XG4gICAgICAgIF90aGlzLl90aW1lc3RhbXBQcm92aWRlciA9IF90aW1lc3RhbXBQcm92aWRlcjtcbiAgICAgICAgX3RoaXMuX2J1ZmZlciA9IFtdO1xuICAgICAgICBfdGhpcy5faW5maW5pdGVUaW1lV2luZG93ID0gdHJ1ZTtcbiAgICAgICAgX3RoaXMuX2luZmluaXRlVGltZVdpbmRvdyA9IF93aW5kb3dUaW1lID09PSBJbmZpbml0eTtcbiAgICAgICAgX3RoaXMuX2J1ZmZlclNpemUgPSBNYXRoLm1heCgxLCBfYnVmZmVyU2l6ZSk7XG4gICAgICAgIF90aGlzLl93aW5kb3dUaW1lID0gTWF0aC5tYXgoMSwgX3dpbmRvd1RpbWUpO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIFJlcGxheVN1YmplY3QucHJvdG90eXBlLm5leHQgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgdmFyIF9hID0gdGhpcywgaXNTdG9wcGVkID0gX2EuaXNTdG9wcGVkLCBfYnVmZmVyID0gX2EuX2J1ZmZlciwgX2luZmluaXRlVGltZVdpbmRvdyA9IF9hLl9pbmZpbml0ZVRpbWVXaW5kb3csIF90aW1lc3RhbXBQcm92aWRlciA9IF9hLl90aW1lc3RhbXBQcm92aWRlciwgX3dpbmRvd1RpbWUgPSBfYS5fd2luZG93VGltZTtcbiAgICAgICAgaWYgKCFpc1N0b3BwZWQpIHtcbiAgICAgICAgICAgIF9idWZmZXIucHVzaCh2YWx1ZSk7XG4gICAgICAgICAgICAhX2luZmluaXRlVGltZVdpbmRvdyAmJiBfYnVmZmVyLnB1c2goX3RpbWVzdGFtcFByb3ZpZGVyLm5vdygpICsgX3dpbmRvd1RpbWUpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3RyaW1CdWZmZXIoKTtcbiAgICAgICAgX3N1cGVyLnByb3RvdHlwZS5uZXh0LmNhbGwodGhpcywgdmFsdWUpO1xuICAgIH07XG4gICAgUmVwbGF5U3ViamVjdC5wcm90b3R5cGUuX3N1YnNjcmliZSA9IGZ1bmN0aW9uIChzdWJzY3JpYmVyKSB7XG4gICAgICAgIHRoaXMuX3Rocm93SWZDbG9zZWQoKTtcbiAgICAgICAgdGhpcy5fdHJpbUJ1ZmZlcigpO1xuICAgICAgICB2YXIgc3Vic2NyaXB0aW9uID0gdGhpcy5faW5uZXJTdWJzY3JpYmUoc3Vic2NyaWJlcik7XG4gICAgICAgIHZhciBfYSA9IHRoaXMsIF9pbmZpbml0ZVRpbWVXaW5kb3cgPSBfYS5faW5maW5pdGVUaW1lV2luZG93LCBfYnVmZmVyID0gX2EuX2J1ZmZlcjtcbiAgICAgICAgdmFyIGNvcHkgPSBfYnVmZmVyLnNsaWNlKCk7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY29weS5sZW5ndGggJiYgIXN1YnNjcmliZXIuY2xvc2VkOyBpICs9IF9pbmZpbml0ZVRpbWVXaW5kb3cgPyAxIDogMikge1xuICAgICAgICAgICAgc3Vic2NyaWJlci5uZXh0KGNvcHlbaV0pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2NoZWNrRmluYWxpemVkU3RhdHVzZXMoc3Vic2NyaWJlcik7XG4gICAgICAgIHJldHVybiBzdWJzY3JpcHRpb247XG4gICAgfTtcbiAgICBSZXBsYXlTdWJqZWN0LnByb3RvdHlwZS5fdHJpbUJ1ZmZlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF9hID0gdGhpcywgX2J1ZmZlclNpemUgPSBfYS5fYnVmZmVyU2l6ZSwgX3RpbWVzdGFtcFByb3ZpZGVyID0gX2EuX3RpbWVzdGFtcFByb3ZpZGVyLCBfYnVmZmVyID0gX2EuX2J1ZmZlciwgX2luZmluaXRlVGltZVdpbmRvdyA9IF9hLl9pbmZpbml0ZVRpbWVXaW5kb3c7XG4gICAgICAgIHZhciBhZGp1c3RlZEJ1ZmZlclNpemUgPSAoX2luZmluaXRlVGltZVdpbmRvdyA/IDEgOiAyKSAqIF9idWZmZXJTaXplO1xuICAgICAgICBfYnVmZmVyU2l6ZSA8IEluZmluaXR5ICYmIGFkanVzdGVkQnVmZmVyU2l6ZSA8IF9idWZmZXIubGVuZ3RoICYmIF9idWZmZXIuc3BsaWNlKDAsIF9idWZmZXIubGVuZ3RoIC0gYWRqdXN0ZWRCdWZmZXJTaXplKTtcbiAgICAgICAgaWYgKCFfaW5maW5pdGVUaW1lV2luZG93KSB7XG4gICAgICAgICAgICB2YXIgbm93ID0gX3RpbWVzdGFtcFByb3ZpZGVyLm5vdygpO1xuICAgICAgICAgICAgdmFyIGxhc3QgPSAwO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBfYnVmZmVyLmxlbmd0aCAmJiBfYnVmZmVyW2ldIDw9IG5vdzsgaSArPSAyKSB7XG4gICAgICAgICAgICAgICAgbGFzdCA9IGk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsYXN0ICYmIF9idWZmZXIuc3BsaWNlKDAsIGxhc3QgKyAxKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIFJlcGxheVN1YmplY3Q7XG59KFN1YmplY3QpKTtcbmV4cG9ydCB7IFJlcGxheVN1YmplY3QgfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVJlcGxheVN1YmplY3QuanMubWFwIiwiaW1wb3J0IHsgX19leHRlbmRzLCBfX3ZhbHVlcyB9IGZyb20gXCJ0c2xpYlwiO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJy4vT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24sIEVNUFRZX1NVQlNDUklQVElPTiB9IGZyb20gJy4vU3Vic2NyaXB0aW9uJztcbmltcG9ydCB7IE9iamVjdFVuc3Vic2NyaWJlZEVycm9yIH0gZnJvbSAnLi91dGlsL09iamVjdFVuc3Vic2NyaWJlZEVycm9yJztcbmltcG9ydCB7IGFyclJlbW92ZSB9IGZyb20gJy4vdXRpbC9hcnJSZW1vdmUnO1xuaW1wb3J0IHsgZXJyb3JDb250ZXh0IH0gZnJvbSAnLi91dGlsL2Vycm9yQ29udGV4dCc7XG52YXIgU3ViamVjdCA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKFN1YmplY3QsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gU3ViamVjdCgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcykgfHwgdGhpcztcbiAgICAgICAgX3RoaXMuY2xvc2VkID0gZmFsc2U7XG4gICAgICAgIF90aGlzLmN1cnJlbnRPYnNlcnZlcnMgPSBudWxsO1xuICAgICAgICBfdGhpcy5vYnNlcnZlcnMgPSBbXTtcbiAgICAgICAgX3RoaXMuaXNTdG9wcGVkID0gZmFsc2U7XG4gICAgICAgIF90aGlzLmhhc0Vycm9yID0gZmFsc2U7XG4gICAgICAgIF90aGlzLnRocm93bkVycm9yID0gbnVsbDtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICBTdWJqZWN0LnByb3RvdHlwZS5saWZ0ID0gZnVuY3Rpb24gKG9wZXJhdG9yKSB7XG4gICAgICAgIHZhciBzdWJqZWN0ID0gbmV3IEFub255bW91c1N1YmplY3QodGhpcywgdGhpcyk7XG4gICAgICAgIHN1YmplY3Qub3BlcmF0b3IgPSBvcGVyYXRvcjtcbiAgICAgICAgcmV0dXJuIHN1YmplY3Q7XG4gICAgfTtcbiAgICBTdWJqZWN0LnByb3RvdHlwZS5fdGhyb3dJZkNsb3NlZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMuY2xvc2VkKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgT2JqZWN0VW5zdWJzY3JpYmVkRXJyb3IoKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgU3ViamVjdC5wcm90b3R5cGUubmV4dCA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICBlcnJvckNvbnRleHQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGVfMSwgX2E7XG4gICAgICAgICAgICBfdGhpcy5fdGhyb3dJZkNsb3NlZCgpO1xuICAgICAgICAgICAgaWYgKCFfdGhpcy5pc1N0b3BwZWQpIHtcbiAgICAgICAgICAgICAgICBpZiAoIV90aGlzLmN1cnJlbnRPYnNlcnZlcnMpIHtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuY3VycmVudE9ic2VydmVycyA9IEFycmF5LmZyb20oX3RoaXMub2JzZXJ2ZXJzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgX2IgPSBfX3ZhbHVlcyhfdGhpcy5jdXJyZW50T2JzZXJ2ZXJzKSwgX2MgPSBfYi5uZXh0KCk7ICFfYy5kb25lOyBfYyA9IF9iLm5leHQoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG9ic2VydmVyID0gX2MudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBvYnNlcnZlci5uZXh0KHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYXRjaCAoZV8xXzEpIHsgZV8xID0geyBlcnJvcjogZV8xXzEgfTsgfVxuICAgICAgICAgICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKF9jICYmICFfYy5kb25lICYmIChfYSA9IF9iLnJldHVybikpIF9hLmNhbGwoX2IpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGZpbmFsbHkgeyBpZiAoZV8xKSB0aHJvdyBlXzEuZXJyb3I7IH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgU3ViamVjdC5wcm90b3R5cGUuZXJyb3IgPSBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIGVycm9yQ29udGV4dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBfdGhpcy5fdGhyb3dJZkNsb3NlZCgpO1xuICAgICAgICAgICAgaWYgKCFfdGhpcy5pc1N0b3BwZWQpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5oYXNFcnJvciA9IF90aGlzLmlzU3RvcHBlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgX3RoaXMudGhyb3duRXJyb3IgPSBlcnI7XG4gICAgICAgICAgICAgICAgdmFyIG9ic2VydmVycyA9IF90aGlzLm9ic2VydmVycztcbiAgICAgICAgICAgICAgICB3aGlsZSAob2JzZXJ2ZXJzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICBvYnNlcnZlcnMuc2hpZnQoKS5lcnJvcihlcnIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBTdWJqZWN0LnByb3RvdHlwZS5jb21wbGV0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgZXJyb3JDb250ZXh0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIF90aGlzLl90aHJvd0lmQ2xvc2VkKCk7XG4gICAgICAgICAgICBpZiAoIV90aGlzLmlzU3RvcHBlZCkge1xuICAgICAgICAgICAgICAgIF90aGlzLmlzU3RvcHBlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgdmFyIG9ic2VydmVycyA9IF90aGlzLm9ic2VydmVycztcbiAgICAgICAgICAgICAgICB3aGlsZSAob2JzZXJ2ZXJzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICBvYnNlcnZlcnMuc2hpZnQoKS5jb21wbGV0ZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBTdWJqZWN0LnByb3RvdHlwZS51bnN1YnNjcmliZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5pc1N0b3BwZWQgPSB0aGlzLmNsb3NlZCA9IHRydWU7XG4gICAgICAgIHRoaXMub2JzZXJ2ZXJzID0gdGhpcy5jdXJyZW50T2JzZXJ2ZXJzID0gbnVsbDtcbiAgICB9O1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShTdWJqZWN0LnByb3RvdHlwZSwgXCJvYnNlcnZlZFwiLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIF9hO1xuICAgICAgICAgICAgcmV0dXJuICgoX2EgPSB0aGlzLm9ic2VydmVycykgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmxlbmd0aCkgPiAwO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgU3ViamVjdC5wcm90b3R5cGUuX3RyeVN1YnNjcmliZSA9IGZ1bmN0aW9uIChzdWJzY3JpYmVyKSB7XG4gICAgICAgIHRoaXMuX3Rocm93SWZDbG9zZWQoKTtcbiAgICAgICAgcmV0dXJuIF9zdXBlci5wcm90b3R5cGUuX3RyeVN1YnNjcmliZS5jYWxsKHRoaXMsIHN1YnNjcmliZXIpO1xuICAgIH07XG4gICAgU3ViamVjdC5wcm90b3R5cGUuX3N1YnNjcmliZSA9IGZ1bmN0aW9uIChzdWJzY3JpYmVyKSB7XG4gICAgICAgIHRoaXMuX3Rocm93SWZDbG9zZWQoKTtcbiAgICAgICAgdGhpcy5fY2hlY2tGaW5hbGl6ZWRTdGF0dXNlcyhzdWJzY3JpYmVyKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lubmVyU3Vic2NyaWJlKHN1YnNjcmliZXIpO1xuICAgIH07XG4gICAgU3ViamVjdC5wcm90b3R5cGUuX2lubmVyU3Vic2NyaWJlID0gZnVuY3Rpb24gKHN1YnNjcmliZXIpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdmFyIF9hID0gdGhpcywgaGFzRXJyb3IgPSBfYS5oYXNFcnJvciwgaXNTdG9wcGVkID0gX2EuaXNTdG9wcGVkLCBvYnNlcnZlcnMgPSBfYS5vYnNlcnZlcnM7XG4gICAgICAgIGlmIChoYXNFcnJvciB8fCBpc1N0b3BwZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBFTVBUWV9TVUJTQ1JJUFRJT047XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jdXJyZW50T2JzZXJ2ZXJzID0gbnVsbDtcbiAgICAgICAgb2JzZXJ2ZXJzLnB1c2goc3Vic2NyaWJlcik7XG4gICAgICAgIHJldHVybiBuZXcgU3Vic2NyaXB0aW9uKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIF90aGlzLmN1cnJlbnRPYnNlcnZlcnMgPSBudWxsO1xuICAgICAgICAgICAgYXJyUmVtb3ZlKG9ic2VydmVycywgc3Vic2NyaWJlcik7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgU3ViamVjdC5wcm90b3R5cGUuX2NoZWNrRmluYWxpemVkU3RhdHVzZXMgPSBmdW5jdGlvbiAoc3Vic2NyaWJlcikge1xuICAgICAgICB2YXIgX2EgPSB0aGlzLCBoYXNFcnJvciA9IF9hLmhhc0Vycm9yLCB0aHJvd25FcnJvciA9IF9hLnRocm93bkVycm9yLCBpc1N0b3BwZWQgPSBfYS5pc1N0b3BwZWQ7XG4gICAgICAgIGlmIChoYXNFcnJvcikge1xuICAgICAgICAgICAgc3Vic2NyaWJlci5lcnJvcih0aHJvd25FcnJvcik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoaXNTdG9wcGVkKSB7XG4gICAgICAgICAgICBzdWJzY3JpYmVyLmNvbXBsZXRlKCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFN1YmplY3QucHJvdG90eXBlLmFzT2JzZXJ2YWJsZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIG9ic2VydmFibGUgPSBuZXcgT2JzZXJ2YWJsZSgpO1xuICAgICAgICBvYnNlcnZhYmxlLnNvdXJjZSA9IHRoaXM7XG4gICAgICAgIHJldHVybiBvYnNlcnZhYmxlO1xuICAgIH07XG4gICAgU3ViamVjdC5jcmVhdGUgPSBmdW5jdGlvbiAoZGVzdGluYXRpb24sIHNvdXJjZSkge1xuICAgICAgICByZXR1cm4gbmV3IEFub255bW91c1N1YmplY3QoZGVzdGluYXRpb24sIHNvdXJjZSk7XG4gICAgfTtcbiAgICByZXR1cm4gU3ViamVjdDtcbn0oT2JzZXJ2YWJsZSkpO1xuZXhwb3J0IHsgU3ViamVjdCB9O1xudmFyIEFub255bW91c1N1YmplY3QgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhBbm9ueW1vdXNTdWJqZWN0LCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIEFub255bW91c1N1YmplY3QoZGVzdGluYXRpb24sIHNvdXJjZSkge1xuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy5kZXN0aW5hdGlvbiA9IGRlc3RpbmF0aW9uO1xuICAgICAgICBfdGhpcy5zb3VyY2UgPSBzb3VyY2U7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgQW5vbnltb3VzU3ViamVjdC5wcm90b3R5cGUubmV4dCA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICB2YXIgX2EsIF9iO1xuICAgICAgICAoX2IgPSAoX2EgPSB0aGlzLmRlc3RpbmF0aW9uKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EubmV4dCkgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLmNhbGwoX2EsIHZhbHVlKTtcbiAgICB9O1xuICAgIEFub255bW91c1N1YmplY3QucHJvdG90eXBlLmVycm9yID0gZnVuY3Rpb24gKGVycikge1xuICAgICAgICB2YXIgX2EsIF9iO1xuICAgICAgICAoX2IgPSAoX2EgPSB0aGlzLmRlc3RpbmF0aW9uKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuZXJyb3IpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5jYWxsKF9hLCBlcnIpO1xuICAgIH07XG4gICAgQW5vbnltb3VzU3ViamVjdC5wcm90b3R5cGUuY29tcGxldGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfYSwgX2I7XG4gICAgICAgIChfYiA9IChfYSA9IHRoaXMuZGVzdGluYXRpb24pID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5jb21wbGV0ZSkgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLmNhbGwoX2EpO1xuICAgIH07XG4gICAgQW5vbnltb3VzU3ViamVjdC5wcm90b3R5cGUuX3N1YnNjcmliZSA9IGZ1bmN0aW9uIChzdWJzY3JpYmVyKSB7XG4gICAgICAgIHZhciBfYSwgX2I7XG4gICAgICAgIHJldHVybiAoX2IgPSAoX2EgPSB0aGlzLnNvdXJjZSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnN1YnNjcmliZShzdWJzY3JpYmVyKSkgIT09IG51bGwgJiYgX2IgIT09IHZvaWQgMCA/IF9iIDogRU1QVFlfU1VCU0NSSVBUSU9OO1xuICAgIH07XG4gICAgcmV0dXJuIEFub255bW91c1N1YmplY3Q7XG59KFN1YmplY3QpKTtcbmV4cG9ydCB7IEFub255bW91c1N1YmplY3QgfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVN1YmplY3QuanMubWFwIiwiaW1wb3J0IHsgX19leHRlbmRzIH0gZnJvbSBcInRzbGliXCI7XG5pbXBvcnQgeyBpc0Z1bmN0aW9uIH0gZnJvbSAnLi91dGlsL2lzRnVuY3Rpb24nO1xuaW1wb3J0IHsgaXNTdWJzY3JpcHRpb24sIFN1YnNjcmlwdGlvbiB9IGZyb20gJy4vU3Vic2NyaXB0aW9uJztcbmltcG9ydCB7IGNvbmZpZyB9IGZyb20gJy4vY29uZmlnJztcbmltcG9ydCB7IHJlcG9ydFVuaGFuZGxlZEVycm9yIH0gZnJvbSAnLi91dGlsL3JlcG9ydFVuaGFuZGxlZEVycm9yJztcbmltcG9ydCB7IG5vb3AgfSBmcm9tICcuL3V0aWwvbm9vcCc7XG5pbXBvcnQgeyBuZXh0Tm90aWZpY2F0aW9uLCBlcnJvck5vdGlmaWNhdGlvbiwgQ09NUExFVEVfTk9USUZJQ0FUSU9OIH0gZnJvbSAnLi9Ob3RpZmljYXRpb25GYWN0b3JpZXMnO1xuaW1wb3J0IHsgdGltZW91dFByb3ZpZGVyIH0gZnJvbSAnLi9zY2hlZHVsZXIvdGltZW91dFByb3ZpZGVyJztcbmltcG9ydCB7IGNhcHR1cmVFcnJvciB9IGZyb20gJy4vdXRpbC9lcnJvckNvbnRleHQnO1xudmFyIFN1YnNjcmliZXIgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhTdWJzY3JpYmVyLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIFN1YnNjcmliZXIoZGVzdGluYXRpb24pIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcykgfHwgdGhpcztcbiAgICAgICAgX3RoaXMuaXNTdG9wcGVkID0gZmFsc2U7XG4gICAgICAgIGlmIChkZXN0aW5hdGlvbikge1xuICAgICAgICAgICAgX3RoaXMuZGVzdGluYXRpb24gPSBkZXN0aW5hdGlvbjtcbiAgICAgICAgICAgIGlmIChpc1N1YnNjcmlwdGlvbihkZXN0aW5hdGlvbikpIHtcbiAgICAgICAgICAgICAgICBkZXN0aW5hdGlvbi5hZGQoX3RoaXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgX3RoaXMuZGVzdGluYXRpb24gPSBFTVBUWV9PQlNFUlZFUjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIFN1YnNjcmliZXIuY3JlYXRlID0gZnVuY3Rpb24gKG5leHQsIGVycm9yLCBjb21wbGV0ZSkge1xuICAgICAgICByZXR1cm4gbmV3IFNhZmVTdWJzY3JpYmVyKG5leHQsIGVycm9yLCBjb21wbGV0ZSk7XG4gICAgfTtcbiAgICBTdWJzY3JpYmVyLnByb3RvdHlwZS5uZXh0ID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIGlmICh0aGlzLmlzU3RvcHBlZCkge1xuICAgICAgICAgICAgaGFuZGxlU3RvcHBlZE5vdGlmaWNhdGlvbihuZXh0Tm90aWZpY2F0aW9uKHZhbHVlKSwgdGhpcyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9uZXh0KHZhbHVlKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgU3Vic2NyaWJlci5wcm90b3R5cGUuZXJyb3IgPSBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgIGlmICh0aGlzLmlzU3RvcHBlZCkge1xuICAgICAgICAgICAgaGFuZGxlU3RvcHBlZE5vdGlmaWNhdGlvbihlcnJvck5vdGlmaWNhdGlvbihlcnIpLCB0aGlzKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuaXNTdG9wcGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuX2Vycm9yKGVycik7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFN1YnNjcmliZXIucHJvdG90eXBlLmNvbXBsZXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy5pc1N0b3BwZWQpIHtcbiAgICAgICAgICAgIGhhbmRsZVN0b3BwZWROb3RpZmljYXRpb24oQ09NUExFVEVfTk9USUZJQ0FUSU9OLCB0aGlzKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuaXNTdG9wcGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuX2NvbXBsZXRlKCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFN1YnNjcmliZXIucHJvdG90eXBlLnVuc3Vic2NyaWJlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoIXRoaXMuY2xvc2VkKSB7XG4gICAgICAgICAgICB0aGlzLmlzU3RvcHBlZCA9IHRydWU7XG4gICAgICAgICAgICBfc3VwZXIucHJvdG90eXBlLnVuc3Vic2NyaWJlLmNhbGwodGhpcyk7XG4gICAgICAgICAgICB0aGlzLmRlc3RpbmF0aW9uID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH07XG4gICAgU3Vic2NyaWJlci5wcm90b3R5cGUuX25leHQgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgdGhpcy5kZXN0aW5hdGlvbi5uZXh0KHZhbHVlKTtcbiAgICB9O1xuICAgIFN1YnNjcmliZXIucHJvdG90eXBlLl9lcnJvciA9IGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHRoaXMuZGVzdGluYXRpb24uZXJyb3IoZXJyKTtcbiAgICAgICAgfVxuICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgIHRoaXMudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgU3Vic2NyaWJlci5wcm90b3R5cGUuX2NvbXBsZXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgdGhpcy5kZXN0aW5hdGlvbi5jb21wbGV0ZSgpO1xuICAgICAgICB9XG4gICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgdGhpcy51bnN1YnNjcmliZSgpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gU3Vic2NyaWJlcjtcbn0oU3Vic2NyaXB0aW9uKSk7XG5leHBvcnQgeyBTdWJzY3JpYmVyIH07XG52YXIgX2JpbmQgPSBGdW5jdGlvbi5wcm90b3R5cGUuYmluZDtcbmZ1bmN0aW9uIGJpbmQoZm4sIHRoaXNBcmcpIHtcbiAgICByZXR1cm4gX2JpbmQuY2FsbChmbiwgdGhpc0FyZyk7XG59XG52YXIgQ29uc3VtZXJPYnNlcnZlciA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQ29uc3VtZXJPYnNlcnZlcihwYXJ0aWFsT2JzZXJ2ZXIpIHtcbiAgICAgICAgdGhpcy5wYXJ0aWFsT2JzZXJ2ZXIgPSBwYXJ0aWFsT2JzZXJ2ZXI7XG4gICAgfVxuICAgIENvbnN1bWVyT2JzZXJ2ZXIucHJvdG90eXBlLm5leHQgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgdmFyIHBhcnRpYWxPYnNlcnZlciA9IHRoaXMucGFydGlhbE9ic2VydmVyO1xuICAgICAgICBpZiAocGFydGlhbE9ic2VydmVyLm5leHQpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgcGFydGlhbE9ic2VydmVyLm5leHQodmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgaGFuZGxlVW5oYW5kbGVkRXJyb3IoZXJyb3IpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICBDb25zdW1lck9ic2VydmVyLnByb3RvdHlwZS5lcnJvciA9IGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgdmFyIHBhcnRpYWxPYnNlcnZlciA9IHRoaXMucGFydGlhbE9ic2VydmVyO1xuICAgICAgICBpZiAocGFydGlhbE9ic2VydmVyLmVycm9yKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHBhcnRpYWxPYnNlcnZlci5lcnJvcihlcnIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgaGFuZGxlVW5oYW5kbGVkRXJyb3IoZXJyb3IpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaGFuZGxlVW5oYW5kbGVkRXJyb3IoZXJyKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgQ29uc3VtZXJPYnNlcnZlci5wcm90b3R5cGUuY29tcGxldGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBwYXJ0aWFsT2JzZXJ2ZXIgPSB0aGlzLnBhcnRpYWxPYnNlcnZlcjtcbiAgICAgICAgaWYgKHBhcnRpYWxPYnNlcnZlci5jb21wbGV0ZSkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBwYXJ0aWFsT2JzZXJ2ZXIuY29tcGxldGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgIGhhbmRsZVVuaGFuZGxlZEVycm9yKGVycm9yKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIENvbnN1bWVyT2JzZXJ2ZXI7XG59KCkpO1xudmFyIFNhZmVTdWJzY3JpYmVyID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoU2FmZVN1YnNjcmliZXIsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gU2FmZVN1YnNjcmliZXIob2JzZXJ2ZXJPck5leHQsIGVycm9yLCBjb21wbGV0ZSkge1xuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzKSB8fCB0aGlzO1xuICAgICAgICB2YXIgcGFydGlhbE9ic2VydmVyO1xuICAgICAgICBpZiAoaXNGdW5jdGlvbihvYnNlcnZlck9yTmV4dCkgfHwgIW9ic2VydmVyT3JOZXh0KSB7XG4gICAgICAgICAgICBwYXJ0aWFsT2JzZXJ2ZXIgPSB7XG4gICAgICAgICAgICAgICAgbmV4dDogb2JzZXJ2ZXJPck5leHQgIT09IG51bGwgJiYgb2JzZXJ2ZXJPck5leHQgIT09IHZvaWQgMCA/IG9ic2VydmVyT3JOZXh0IDogdW5kZWZpbmVkLFxuICAgICAgICAgICAgICAgIGVycm9yOiBlcnJvciAhPT0gbnVsbCAmJiBlcnJvciAhPT0gdm9pZCAwID8gZXJyb3IgOiB1bmRlZmluZWQsXG4gICAgICAgICAgICAgICAgY29tcGxldGU6IGNvbXBsZXRlICE9PSBudWxsICYmIGNvbXBsZXRlICE9PSB2b2lkIDAgPyBjb21wbGV0ZSA6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB2YXIgY29udGV4dF8xO1xuICAgICAgICAgICAgaWYgKF90aGlzICYmIGNvbmZpZy51c2VEZXByZWNhdGVkTmV4dENvbnRleHQpIHtcbiAgICAgICAgICAgICAgICBjb250ZXh0XzEgPSBPYmplY3QuY3JlYXRlKG9ic2VydmVyT3JOZXh0KTtcbiAgICAgICAgICAgICAgICBjb250ZXh0XzEudW5zdWJzY3JpYmUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBfdGhpcy51bnN1YnNjcmliZSgpOyB9O1xuICAgICAgICAgICAgICAgIHBhcnRpYWxPYnNlcnZlciA9IHtcbiAgICAgICAgICAgICAgICAgICAgbmV4dDogb2JzZXJ2ZXJPck5leHQubmV4dCAmJiBiaW5kKG9ic2VydmVyT3JOZXh0Lm5leHQsIGNvbnRleHRfMSksXG4gICAgICAgICAgICAgICAgICAgIGVycm9yOiBvYnNlcnZlck9yTmV4dC5lcnJvciAmJiBiaW5kKG9ic2VydmVyT3JOZXh0LmVycm9yLCBjb250ZXh0XzEpLFxuICAgICAgICAgICAgICAgICAgICBjb21wbGV0ZTogb2JzZXJ2ZXJPck5leHQuY29tcGxldGUgJiYgYmluZChvYnNlcnZlck9yTmV4dC5jb21wbGV0ZSwgY29udGV4dF8xKSxcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcGFydGlhbE9ic2VydmVyID0gb2JzZXJ2ZXJPck5leHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgX3RoaXMuZGVzdGluYXRpb24gPSBuZXcgQ29uc3VtZXJPYnNlcnZlcihwYXJ0aWFsT2JzZXJ2ZXIpO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIHJldHVybiBTYWZlU3Vic2NyaWJlcjtcbn0oU3Vic2NyaWJlcikpO1xuZXhwb3J0IHsgU2FmZVN1YnNjcmliZXIgfTtcbmZ1bmN0aW9uIGhhbmRsZVVuaGFuZGxlZEVycm9yKGVycm9yKSB7XG4gICAgaWYgKGNvbmZpZy51c2VEZXByZWNhdGVkU3luY2hyb25vdXNFcnJvckhhbmRsaW5nKSB7XG4gICAgICAgIGNhcHR1cmVFcnJvcihlcnJvcik7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXBvcnRVbmhhbmRsZWRFcnJvcihlcnJvcik7XG4gICAgfVxufVxuZnVuY3Rpb24gZGVmYXVsdEVycm9ySGFuZGxlcihlcnIpIHtcbiAgICB0aHJvdyBlcnI7XG59XG5mdW5jdGlvbiBoYW5kbGVTdG9wcGVkTm90aWZpY2F0aW9uKG5vdGlmaWNhdGlvbiwgc3Vic2NyaWJlcikge1xuICAgIHZhciBvblN0b3BwZWROb3RpZmljYXRpb24gPSBjb25maWcub25TdG9wcGVkTm90aWZpY2F0aW9uO1xuICAgIG9uU3RvcHBlZE5vdGlmaWNhdGlvbiAmJiB0aW1lb3V0UHJvdmlkZXIuc2V0VGltZW91dChmdW5jdGlvbiAoKSB7IHJldHVybiBvblN0b3BwZWROb3RpZmljYXRpb24obm90aWZpY2F0aW9uLCBzdWJzY3JpYmVyKTsgfSk7XG59XG5leHBvcnQgdmFyIEVNUFRZX09CU0VSVkVSID0ge1xuICAgIGNsb3NlZDogdHJ1ZSxcbiAgICBuZXh0OiBub29wLFxuICAgIGVycm9yOiBkZWZhdWx0RXJyb3JIYW5kbGVyLFxuICAgIGNvbXBsZXRlOiBub29wLFxufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVN1YnNjcmliZXIuanMubWFwIiwiaW1wb3J0IHsgX19yZWFkLCBfX3NwcmVhZEFycmF5LCBfX3ZhbHVlcyB9IGZyb20gXCJ0c2xpYlwiO1xuaW1wb3J0IHsgaXNGdW5jdGlvbiB9IGZyb20gJy4vdXRpbC9pc0Z1bmN0aW9uJztcbmltcG9ydCB7IFVuc3Vic2NyaXB0aW9uRXJyb3IgfSBmcm9tICcuL3V0aWwvVW5zdWJzY3JpcHRpb25FcnJvcic7XG5pbXBvcnQgeyBhcnJSZW1vdmUgfSBmcm9tICcuL3V0aWwvYXJyUmVtb3ZlJztcbnZhciBTdWJzY3JpcHRpb24gPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFN1YnNjcmlwdGlvbihpbml0aWFsVGVhcmRvd24pIHtcbiAgICAgICAgdGhpcy5pbml0aWFsVGVhcmRvd24gPSBpbml0aWFsVGVhcmRvd247XG4gICAgICAgIHRoaXMuY2xvc2VkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX3BhcmVudGFnZSA9IG51bGw7XG4gICAgICAgIHRoaXMuX2ZpbmFsaXplcnMgPSBudWxsO1xuICAgIH1cbiAgICBTdWJzY3JpcHRpb24ucHJvdG90eXBlLnVuc3Vic2NyaWJlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZV8xLCBfYSwgZV8yLCBfYjtcbiAgICAgICAgdmFyIGVycm9ycztcbiAgICAgICAgaWYgKCF0aGlzLmNsb3NlZCkge1xuICAgICAgICAgICAgdGhpcy5jbG9zZWQgPSB0cnVlO1xuICAgICAgICAgICAgdmFyIF9wYXJlbnRhZ2UgPSB0aGlzLl9wYXJlbnRhZ2U7XG4gICAgICAgICAgICBpZiAoX3BhcmVudGFnZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3BhcmVudGFnZSA9IG51bGw7XG4gICAgICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoX3BhcmVudGFnZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIF9wYXJlbnRhZ2VfMSA9IF9fdmFsdWVzKF9wYXJlbnRhZ2UpLCBfcGFyZW50YWdlXzFfMSA9IF9wYXJlbnRhZ2VfMS5uZXh0KCk7ICFfcGFyZW50YWdlXzFfMS5kb25lOyBfcGFyZW50YWdlXzFfMSA9IF9wYXJlbnRhZ2VfMS5uZXh0KCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcGFyZW50XzEgPSBfcGFyZW50YWdlXzFfMS52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJlbnRfMS5yZW1vdmUodGhpcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY2F0Y2ggKGVfMV8xKSB7IGVfMSA9IHsgZXJyb3I6IGVfMV8xIH07IH1cbiAgICAgICAgICAgICAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChfcGFyZW50YWdlXzFfMSAmJiAhX3BhcmVudGFnZV8xXzEuZG9uZSAmJiAoX2EgPSBfcGFyZW50YWdlXzEucmV0dXJuKSkgX2EuY2FsbChfcGFyZW50YWdlXzEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZmluYWxseSB7IGlmIChlXzEpIHRocm93IGVfMS5lcnJvcjsgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBfcGFyZW50YWdlLnJlbW92ZSh0aGlzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgaW5pdGlhbEZpbmFsaXplciA9IHRoaXMuaW5pdGlhbFRlYXJkb3duO1xuICAgICAgICAgICAgaWYgKGlzRnVuY3Rpb24oaW5pdGlhbEZpbmFsaXplcikpIHtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBpbml0aWFsRmluYWxpemVyKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgICAgIGVycm9ycyA9IGUgaW5zdGFuY2VvZiBVbnN1YnNjcmlwdGlvbkVycm9yID8gZS5lcnJvcnMgOiBbZV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIF9maW5hbGl6ZXJzID0gdGhpcy5fZmluYWxpemVycztcbiAgICAgICAgICAgIGlmIChfZmluYWxpemVycykge1xuICAgICAgICAgICAgICAgIHRoaXMuX2ZpbmFsaXplcnMgPSBudWxsO1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIF9maW5hbGl6ZXJzXzEgPSBfX3ZhbHVlcyhfZmluYWxpemVycyksIF9maW5hbGl6ZXJzXzFfMSA9IF9maW5hbGl6ZXJzXzEubmV4dCgpOyAhX2ZpbmFsaXplcnNfMV8xLmRvbmU7IF9maW5hbGl6ZXJzXzFfMSA9IF9maW5hbGl6ZXJzXzEubmV4dCgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZmluYWxpemVyID0gX2ZpbmFsaXplcnNfMV8xLnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBleGVjRmluYWxpemVyKGZpbmFsaXplcik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3JzID0gZXJyb3JzICE9PSBudWxsICYmIGVycm9ycyAhPT0gdm9pZCAwID8gZXJyb3JzIDogW107XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVyciBpbnN0YW5jZW9mIFVuc3Vic2NyaXB0aW9uRXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3JzID0gX19zcHJlYWRBcnJheShfX3NwcmVhZEFycmF5KFtdLCBfX3JlYWQoZXJyb3JzKSksIF9fcmVhZChlcnIuZXJyb3JzKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnJvcnMucHVzaChlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYXRjaCAoZV8yXzEpIHsgZV8yID0geyBlcnJvcjogZV8yXzEgfTsgfVxuICAgICAgICAgICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKF9maW5hbGl6ZXJzXzFfMSAmJiAhX2ZpbmFsaXplcnNfMV8xLmRvbmUgJiYgKF9iID0gX2ZpbmFsaXplcnNfMS5yZXR1cm4pKSBfYi5jYWxsKF9maW5hbGl6ZXJzXzEpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGZpbmFsbHkgeyBpZiAoZV8yKSB0aHJvdyBlXzIuZXJyb3I7IH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZXJyb3JzKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFVuc3Vic2NyaXB0aW9uRXJyb3IoZXJyb3JzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgU3Vic2NyaXB0aW9uLnByb3RvdHlwZS5hZGQgPSBmdW5jdGlvbiAodGVhcmRvd24pIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICBpZiAodGVhcmRvd24gJiYgdGVhcmRvd24gIT09IHRoaXMpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmNsb3NlZCkge1xuICAgICAgICAgICAgICAgIGV4ZWNGaW5hbGl6ZXIodGVhcmRvd24pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKHRlYXJkb3duIGluc3RhbmNlb2YgU3Vic2NyaXB0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0ZWFyZG93bi5jbG9zZWQgfHwgdGVhcmRvd24uX2hhc1BhcmVudCh0aGlzKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRlYXJkb3duLl9hZGRQYXJlbnQodGhpcyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICh0aGlzLl9maW5hbGl6ZXJzID0gKF9hID0gdGhpcy5fZmluYWxpemVycykgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogW10pLnB1c2godGVhcmRvd24pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICBTdWJzY3JpcHRpb24ucHJvdG90eXBlLl9oYXNQYXJlbnQgPSBmdW5jdGlvbiAocGFyZW50KSB7XG4gICAgICAgIHZhciBfcGFyZW50YWdlID0gdGhpcy5fcGFyZW50YWdlO1xuICAgICAgICByZXR1cm4gX3BhcmVudGFnZSA9PT0gcGFyZW50IHx8IChBcnJheS5pc0FycmF5KF9wYXJlbnRhZ2UpICYmIF9wYXJlbnRhZ2UuaW5jbHVkZXMocGFyZW50KSk7XG4gICAgfTtcbiAgICBTdWJzY3JpcHRpb24ucHJvdG90eXBlLl9hZGRQYXJlbnQgPSBmdW5jdGlvbiAocGFyZW50KSB7XG4gICAgICAgIHZhciBfcGFyZW50YWdlID0gdGhpcy5fcGFyZW50YWdlO1xuICAgICAgICB0aGlzLl9wYXJlbnRhZ2UgPSBBcnJheS5pc0FycmF5KF9wYXJlbnRhZ2UpID8gKF9wYXJlbnRhZ2UucHVzaChwYXJlbnQpLCBfcGFyZW50YWdlKSA6IF9wYXJlbnRhZ2UgPyBbX3BhcmVudGFnZSwgcGFyZW50XSA6IHBhcmVudDtcbiAgICB9O1xuICAgIFN1YnNjcmlwdGlvbi5wcm90b3R5cGUuX3JlbW92ZVBhcmVudCA9IGZ1bmN0aW9uIChwYXJlbnQpIHtcbiAgICAgICAgdmFyIF9wYXJlbnRhZ2UgPSB0aGlzLl9wYXJlbnRhZ2U7XG4gICAgICAgIGlmIChfcGFyZW50YWdlID09PSBwYXJlbnQpIHtcbiAgICAgICAgICAgIHRoaXMuX3BhcmVudGFnZSA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoQXJyYXkuaXNBcnJheShfcGFyZW50YWdlKSkge1xuICAgICAgICAgICAgYXJyUmVtb3ZlKF9wYXJlbnRhZ2UsIHBhcmVudCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFN1YnNjcmlwdGlvbi5wcm90b3R5cGUucmVtb3ZlID0gZnVuY3Rpb24gKHRlYXJkb3duKSB7XG4gICAgICAgIHZhciBfZmluYWxpemVycyA9IHRoaXMuX2ZpbmFsaXplcnM7XG4gICAgICAgIF9maW5hbGl6ZXJzICYmIGFyclJlbW92ZShfZmluYWxpemVycywgdGVhcmRvd24pO1xuICAgICAgICBpZiAodGVhcmRvd24gaW5zdGFuY2VvZiBTdWJzY3JpcHRpb24pIHtcbiAgICAgICAgICAgIHRlYXJkb3duLl9yZW1vdmVQYXJlbnQodGhpcyk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFN1YnNjcmlwdGlvbi5FTVBUWSA9IChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBlbXB0eSA9IG5ldyBTdWJzY3JpcHRpb24oKTtcbiAgICAgICAgZW1wdHkuY2xvc2VkID0gdHJ1ZTtcbiAgICAgICAgcmV0dXJuIGVtcHR5O1xuICAgIH0pKCk7XG4gICAgcmV0dXJuIFN1YnNjcmlwdGlvbjtcbn0oKSk7XG5leHBvcnQgeyBTdWJzY3JpcHRpb24gfTtcbmV4cG9ydCB2YXIgRU1QVFlfU1VCU0NSSVBUSU9OID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuZXhwb3J0IGZ1bmN0aW9uIGlzU3Vic2NyaXB0aW9uKHZhbHVlKSB7XG4gICAgcmV0dXJuICh2YWx1ZSBpbnN0YW5jZW9mIFN1YnNjcmlwdGlvbiB8fFxuICAgICAgICAodmFsdWUgJiYgJ2Nsb3NlZCcgaW4gdmFsdWUgJiYgaXNGdW5jdGlvbih2YWx1ZS5yZW1vdmUpICYmIGlzRnVuY3Rpb24odmFsdWUuYWRkKSAmJiBpc0Z1bmN0aW9uKHZhbHVlLnVuc3Vic2NyaWJlKSkpO1xufVxuZnVuY3Rpb24gZXhlY0ZpbmFsaXplcihmaW5hbGl6ZXIpIHtcbiAgICBpZiAoaXNGdW5jdGlvbihmaW5hbGl6ZXIpKSB7XG4gICAgICAgIGZpbmFsaXplcigpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgZmluYWxpemVyLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9U3Vic2NyaXB0aW9uLmpzLm1hcCIsImV4cG9ydCB2YXIgY29uZmlnID0ge1xuICAgIG9uVW5oYW5kbGVkRXJyb3I6IG51bGwsXG4gICAgb25TdG9wcGVkTm90aWZpY2F0aW9uOiBudWxsLFxuICAgIFByb21pc2U6IHVuZGVmaW5lZCxcbiAgICB1c2VEZXByZWNhdGVkU3luY2hyb25vdXNFcnJvckhhbmRsaW5nOiBmYWxzZSxcbiAgICB1c2VEZXByZWNhdGVkTmV4dENvbnRleHQ6IGZhbHNlLFxufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWNvbmZpZy5qcy5tYXAiLCJleHBvcnQgdmFyIGRhdGVUaW1lc3RhbXBQcm92aWRlciA9IHtcbiAgICBub3c6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIChkYXRlVGltZXN0YW1wUHJvdmlkZXIuZGVsZWdhdGUgfHwgRGF0ZSkubm93KCk7XG4gICAgfSxcbiAgICBkZWxlZ2F0ZTogdW5kZWZpbmVkLFxufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGVUaW1lc3RhbXBQcm92aWRlci5qcy5tYXAiLCJpbXBvcnQgeyBfX3JlYWQsIF9fc3ByZWFkQXJyYXkgfSBmcm9tIFwidHNsaWJcIjtcbmV4cG9ydCB2YXIgdGltZW91dFByb3ZpZGVyID0ge1xuICAgIHNldFRpbWVvdXQ6IGZ1bmN0aW9uIChoYW5kbGVyLCB0aW1lb3V0KSB7XG4gICAgICAgIHZhciBhcmdzID0gW107XG4gICAgICAgIGZvciAodmFyIF9pID0gMjsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgICAgICBhcmdzW19pIC0gMl0gPSBhcmd1bWVudHNbX2ldO1xuICAgICAgICB9XG4gICAgICAgIHZhciBkZWxlZ2F0ZSA9IHRpbWVvdXRQcm92aWRlci5kZWxlZ2F0ZTtcbiAgICAgICAgaWYgKGRlbGVnYXRlID09PSBudWxsIHx8IGRlbGVnYXRlID09PSB2b2lkIDAgPyB2b2lkIDAgOiBkZWxlZ2F0ZS5zZXRUaW1lb3V0KSB7XG4gICAgICAgICAgICByZXR1cm4gZGVsZWdhdGUuc2V0VGltZW91dC5hcHBseShkZWxlZ2F0ZSwgX19zcHJlYWRBcnJheShbaGFuZGxlciwgdGltZW91dF0sIF9fcmVhZChhcmdzKSkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0LmFwcGx5KHZvaWQgMCwgX19zcHJlYWRBcnJheShbaGFuZGxlciwgdGltZW91dF0sIF9fcmVhZChhcmdzKSkpO1xuICAgIH0sXG4gICAgY2xlYXJUaW1lb3V0OiBmdW5jdGlvbiAoaGFuZGxlKSB7XG4gICAgICAgIHZhciBkZWxlZ2F0ZSA9IHRpbWVvdXRQcm92aWRlci5kZWxlZ2F0ZTtcbiAgICAgICAgcmV0dXJuICgoZGVsZWdhdGUgPT09IG51bGwgfHwgZGVsZWdhdGUgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGRlbGVnYXRlLmNsZWFyVGltZW91dCkgfHwgY2xlYXJUaW1lb3V0KShoYW5kbGUpO1xuICAgIH0sXG4gICAgZGVsZWdhdGU6IHVuZGVmaW5lZCxcbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD10aW1lb3V0UHJvdmlkZXIuanMubWFwIiwiZXhwb3J0IHZhciBvYnNlcnZhYmxlID0gKGZ1bmN0aW9uICgpIHsgcmV0dXJuICh0eXBlb2YgU3ltYm9sID09PSAnZnVuY3Rpb24nICYmIFN5bWJvbC5vYnNlcnZhYmxlKSB8fCAnQEBvYnNlcnZhYmxlJzsgfSkoKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW9ic2VydmFibGUuanMubWFwIiwiaW1wb3J0IHsgY3JlYXRlRXJyb3JDbGFzcyB9IGZyb20gJy4vY3JlYXRlRXJyb3JDbGFzcyc7XG5leHBvcnQgdmFyIE9iamVjdFVuc3Vic2NyaWJlZEVycm9yID0gY3JlYXRlRXJyb3JDbGFzcyhmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIE9iamVjdFVuc3Vic2NyaWJlZEVycm9ySW1wbCgpIHtcbiAgICAgICAgX3N1cGVyKHRoaXMpO1xuICAgICAgICB0aGlzLm5hbWUgPSAnT2JqZWN0VW5zdWJzY3JpYmVkRXJyb3InO1xuICAgICAgICB0aGlzLm1lc3NhZ2UgPSAnb2JqZWN0IHVuc3Vic2NyaWJlZCc7XG4gICAgfTtcbn0pO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9T2JqZWN0VW5zdWJzY3JpYmVkRXJyb3IuanMubWFwIiwiaW1wb3J0IHsgY3JlYXRlRXJyb3JDbGFzcyB9IGZyb20gJy4vY3JlYXRlRXJyb3JDbGFzcyc7XG5leHBvcnQgdmFyIFVuc3Vic2NyaXB0aW9uRXJyb3IgPSBjcmVhdGVFcnJvckNsYXNzKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gVW5zdWJzY3JpcHRpb25FcnJvckltcGwoZXJyb3JzKSB7XG4gICAgICAgIF9zdXBlcih0aGlzKTtcbiAgICAgICAgdGhpcy5tZXNzYWdlID0gZXJyb3JzXG4gICAgICAgICAgICA/IGVycm9ycy5sZW5ndGggKyBcIiBlcnJvcnMgb2NjdXJyZWQgZHVyaW5nIHVuc3Vic2NyaXB0aW9uOlxcblwiICsgZXJyb3JzLm1hcChmdW5jdGlvbiAoZXJyLCBpKSB7IHJldHVybiBpICsgMSArIFwiKSBcIiArIGVyci50b1N0cmluZygpOyB9KS5qb2luKCdcXG4gICcpXG4gICAgICAgICAgICA6ICcnO1xuICAgICAgICB0aGlzLm5hbWUgPSAnVW5zdWJzY3JpcHRpb25FcnJvcic7XG4gICAgICAgIHRoaXMuZXJyb3JzID0gZXJyb3JzO1xuICAgIH07XG59KTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVVuc3Vic2NyaXB0aW9uRXJyb3IuanMubWFwIiwiZXhwb3J0IGZ1bmN0aW9uIGFyclJlbW92ZShhcnIsIGl0ZW0pIHtcbiAgICBpZiAoYXJyKSB7XG4gICAgICAgIHZhciBpbmRleCA9IGFyci5pbmRleE9mKGl0ZW0pO1xuICAgICAgICAwIDw9IGluZGV4ICYmIGFyci5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIH1cbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFyclJlbW92ZS5qcy5tYXAiLCJleHBvcnQgZnVuY3Rpb24gY3JlYXRlRXJyb3JDbGFzcyhjcmVhdGVJbXBsKSB7XG4gICAgdmFyIF9zdXBlciA9IGZ1bmN0aW9uIChpbnN0YW5jZSkge1xuICAgICAgICBFcnJvci5jYWxsKGluc3RhbmNlKTtcbiAgICAgICAgaW5zdGFuY2Uuc3RhY2sgPSBuZXcgRXJyb3IoKS5zdGFjaztcbiAgICB9O1xuICAgIHZhciBjdG9yRnVuYyA9IGNyZWF0ZUltcGwoX3N1cGVyKTtcbiAgICBjdG9yRnVuYy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEVycm9yLnByb3RvdHlwZSk7XG4gICAgY3RvckZ1bmMucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gY3RvckZ1bmM7XG4gICAgcmV0dXJuIGN0b3JGdW5jO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Y3JlYXRlRXJyb3JDbGFzcy5qcy5tYXAiLCJpbXBvcnQgeyBjb25maWcgfSBmcm9tICcuLi9jb25maWcnO1xudmFyIGNvbnRleHQgPSBudWxsO1xuZXhwb3J0IGZ1bmN0aW9uIGVycm9yQ29udGV4dChjYikge1xuICAgIGlmIChjb25maWcudXNlRGVwcmVjYXRlZFN5bmNocm9ub3VzRXJyb3JIYW5kbGluZykge1xuICAgICAgICB2YXIgaXNSb290ID0gIWNvbnRleHQ7XG4gICAgICAgIGlmIChpc1Jvb3QpIHtcbiAgICAgICAgICAgIGNvbnRleHQgPSB7IGVycm9yVGhyb3duOiBmYWxzZSwgZXJyb3I6IG51bGwgfTtcbiAgICAgICAgfVxuICAgICAgICBjYigpO1xuICAgICAgICBpZiAoaXNSb290KSB7XG4gICAgICAgICAgICB2YXIgX2EgPSBjb250ZXh0LCBlcnJvclRocm93biA9IF9hLmVycm9yVGhyb3duLCBlcnJvciA9IF9hLmVycm9yO1xuICAgICAgICAgICAgY29udGV4dCA9IG51bGw7XG4gICAgICAgICAgICBpZiAoZXJyb3JUaHJvd24pIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgY2IoKTtcbiAgICB9XG59XG5leHBvcnQgZnVuY3Rpb24gY2FwdHVyZUVycm9yKGVycikge1xuICAgIGlmIChjb25maWcudXNlRGVwcmVjYXRlZFN5bmNocm9ub3VzRXJyb3JIYW5kbGluZyAmJiBjb250ZXh0KSB7XG4gICAgICAgIGNvbnRleHQuZXJyb3JUaHJvd24gPSB0cnVlO1xuICAgICAgICBjb250ZXh0LmVycm9yID0gZXJyO1xuICAgIH1cbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWVycm9yQ29udGV4dC5qcy5tYXAiLCJleHBvcnQgZnVuY3Rpb24gaWRlbnRpdHkoeCkge1xuICAgIHJldHVybiB4O1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aWRlbnRpdHkuanMubWFwIiwiZXhwb3J0IGZ1bmN0aW9uIGlzRnVuY3Rpb24odmFsdWUpIHtcbiAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnZnVuY3Rpb24nO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aXNGdW5jdGlvbi5qcy5tYXAiLCJleHBvcnQgZnVuY3Rpb24gbm9vcCgpIHsgfVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bm9vcC5qcy5tYXAiLCJpbXBvcnQgeyBpZGVudGl0eSB9IGZyb20gJy4vaWRlbnRpdHknO1xuZXhwb3J0IGZ1bmN0aW9uIHBpcGUoKSB7XG4gICAgdmFyIGZucyA9IFtdO1xuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgIGZuc1tfaV0gPSBhcmd1bWVudHNbX2ldO1xuICAgIH1cbiAgICByZXR1cm4gcGlwZUZyb21BcnJheShmbnMpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIHBpcGVGcm9tQXJyYXkoZm5zKSB7XG4gICAgaWYgKGZucy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgcmV0dXJuIGlkZW50aXR5O1xuICAgIH1cbiAgICBpZiAoZm5zLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICByZXR1cm4gZm5zWzBdO1xuICAgIH1cbiAgICByZXR1cm4gZnVuY3Rpb24gcGlwZWQoaW5wdXQpIHtcbiAgICAgICAgcmV0dXJuIGZucy5yZWR1Y2UoZnVuY3Rpb24gKHByZXYsIGZuKSB7IHJldHVybiBmbihwcmV2KTsgfSwgaW5wdXQpO1xuICAgIH07XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1waXBlLmpzLm1hcCIsImltcG9ydCB7IGNvbmZpZyB9IGZyb20gJy4uL2NvbmZpZyc7XG5pbXBvcnQgeyB0aW1lb3V0UHJvdmlkZXIgfSBmcm9tICcuLi9zY2hlZHVsZXIvdGltZW91dFByb3ZpZGVyJztcbmV4cG9ydCBmdW5jdGlvbiByZXBvcnRVbmhhbmRsZWRFcnJvcihlcnIpIHtcbiAgICB0aW1lb3V0UHJvdmlkZXIuc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBvblVuaGFuZGxlZEVycm9yID0gY29uZmlnLm9uVW5oYW5kbGVkRXJyb3I7XG4gICAgICAgIGlmIChvblVuaGFuZGxlZEVycm9yKSB7XG4gICAgICAgICAgICBvblVuaGFuZGxlZEVycm9yKGVycik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXJlcG9ydFVuaGFuZGxlZEVycm9yLmpzLm1hcCIsImltcG9ydCB7Q2FudmFzT2JqZWN0fSBmcm9tICcuL2NhbnZhcyc7XHJcbmltcG9ydCB7U2V0dGluZ3MsIENvbG9yQmVoYXZpb3JLaW5kfSBmcm9tICcuL3NldHRpbmdzJztcclxuaW1wb3J0IHtTdGF0Q2F0ZWdvcnksIFN0YXRzfSBmcm9tICcuL3N0YXRzJztcclxuaW1wb3J0IHtDb2xvcn0gZnJvbSAnLi90eXBlcyc7XHJcbmltcG9ydCB7aHNsVG9SZ2IsIGxjbSwgV0hJVEV9IGZyb20gJy4vdXRpbCc7XHJcblxyXG5pbnRlcmZhY2UgQ29vcmQge1xyXG4gIHg6IG51bWJlcjtcclxuICB5OiBudW1iZXI7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBCb3VuY2luZ0ltYWdlIGltcGxlbWVudHMgQ2FudmFzT2JqZWN0IHtcclxuXHJcbiAgcHJpdmF0ZSBwb3NpdGlvbjogQ29vcmQgPSB7IHg6IDAsIHk6IDAgfTtcclxuXHJcbiAgcHJpdmF0ZSBkaXJlY3Rpb246IC0xfDEgPSAxO1xyXG4gIHByaXZhdGUgdG90YWxEID0gMDtcclxuICBwcml2YXRlIGN1cnJEID0gMDtcclxuICBwcml2YXRlIGNhbnZhc1dpZHRoID0gMDtcclxuICBwcml2YXRlIGNhbnZhc0hlaWdodCA9IDA7XHJcblxyXG4gIHByaXZhdGUgcmVhZG9ubHkgY29sb3JCZWhhdmlvcnM6XHJcbiAgICAgIHtbSyBpbiBDb2xvckJlaGF2aW9yS2luZF06IENvbG9yQmVoYXZpb3J9ID0ge1xyXG4gICAgICAgIG5vbmU6IG5ldyBOb25lQ29sb3JCZWhhdmlvcih0aGlzKSxcclxuICAgICAgICByYWluYm93OiBuZXcgUmFpbmJvd0NvbG9yQmVoYXZpb3IodGhpcyksXHJcbiAgICAgICAgY2xhc3NpYzogbmV3IENsYXNzaWNDb2xvckJlaGF2aW9yKHRoaXMpLFxyXG4gICAgICB9O1xyXG5cclxuICBwcml2YXRlIGNvbnN0cnVjdG9yKFxyXG4gICAgICByZWFkb25seSBpbWFnZURhdGE6IEltYWdlRGF0YSxcclxuICAgICAgcmVhZG9ubHkgc2V0dGluZ3M6IFNldHRpbmdzLFxyXG4gICAgICBwcml2YXRlIHJlYWRvbmx5IHN0YXRzOiBTdGF0cyxcclxuICAgICkge31cclxuXHJcbiAgdGljayhjb3VudDogbnVtYmVyKSB7XHJcbiAgICBjb25zdCB0aWNrU3RhdGVEZWx0YSA9IHRoaXMudGlja1Bvc2l0aW9uKGNvdW50KTtcclxuICAgIHRoaXMudGlja0NvbG9yKGNvdW50LCB0aWNrU3RhdGVEZWx0YSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBUaGlzIGFydGljbGUgaGVscGVkIG1lIGZpZ3VyZSB0aGlzIG91dDpcclxuICAgKiAgICBodHRwOi8vbG9zdG1hdGhsZXNzb25zLmJsb2dzcG90LmNvbS8yMDE2LzAzL2JvdW5jaW5nLWR2ZC1sb2dvLmh0bWxcclxuICAgKi9cclxuICBwcml2YXRlIHRpY2tQb3NpdGlvbihjb3VudDogbnVtYmVyKTogVGlja1N0YXRlRGVsdGEge1xyXG4gICAgbGV0IHRpY2tTdGF0ZURlbHRhOiBUaWNrU3RhdGVEZWx0YSA9IHt9O1xyXG4gICAgY29uc3QgUElYRUxTX1BFUl9NSUxMSVNFQ09ORCA9IHRoaXMuc2V0dGluZ3MuZ2V0U2V0dGluZygnc3BlZWQnKTtcclxuICAgIGNvbnN0IE1BWF9USUNLX0NPVU5UID0gMTAwMDA7XHJcbiAgICBpZiAoY291bnQgPiBNQVhfVElDS19DT1VOVCkge1xyXG4gICAgICBjb3VudCA9IDE7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGNvbnN0IHByZXZEID0gdGhpcy5jdXJyRDtcclxuICAgIHRoaXMuY3VyckQgPSBwcmV2RCArIChjb3VudCAqIFBJWEVMU19QRVJfTUlMTElTRUNPTkQgKiB0aGlzLmRpcmVjdGlvbik7XHJcbiAgICBsZXQgaGl0Q29ybmVyID0gZmFsc2U7XHJcbiAgICAvLyBJZiB3ZSB3ZW50IGZhciBvdXQgb2YgYm91bmRzLCBib3VuY2UgYmFjayBhbiBlcXVhbCBhbW91bnQuXHJcbiAgICBpZiAodGhpcy5jdXJyRCA+PSB0aGlzLnRvdGFsRCkge1xyXG4gICAgICBjb25zdCBkZWx0YSA9IHRoaXMuY3VyckQgLSB0aGlzLnRvdGFsRDtcclxuICAgICAgdGhpcy5jdXJyRCA9IHRoaXMudG90YWxEIC0gZGVsdGE7XHJcbiAgICAgIGhpdENvcm5lciA9IHRydWU7XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5jdXJyRCA8PSAwKSB7XHJcbiAgICAgIGNvbnN0IGRlbHRhID0gTWF0aC5hYnModGhpcy5jdXJyRCk7XHJcbiAgICAgIHRoaXMuY3VyckQgPSBkZWx0YTtcclxuICAgICAgaGl0Q29ybmVyID0gdHJ1ZTtcclxuICAgIH1cclxuICAgIGlmIChoaXRDb3JuZXIpIHtcclxuICAgICAgdGhpcy5kaXJlY3Rpb24gKj0gLTE7XHJcbiAgICAgIHRoaXMuc2V0dGluZ3Muc2V0UGVyc2lzdGVkU2V0dGluZygnY29ybmVyc0hpdCcsIGNoID0+IGNoICsgMSk7XHJcbiAgICAgIHRpY2tTdGF0ZURlbHRhLmhpdENvcm5lciA9IDE7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgcHJldlVuaXZlcnNlID0gdGhpcy5nZXRVbml2ZXJzZShwcmV2RCk7XHJcbiAgICBjb25zdCB1bml2ZXJzZSA9IHRoaXMuZ2V0VW5pdmVyc2UodGhpcy5jdXJyRCk7XHJcbiAgICBjb25zdCB1bml2ZXJzZURlbHRhID0gTWF0aC5hYnModW5pdmVyc2UueCAtIHByZXZVbml2ZXJzZS54KSArXHJcbiAgICAgICAgTWF0aC5hYnModW5pdmVyc2UueSAtIHByZXZVbml2ZXJzZS55KTtcclxuICAgIGlmICghaGl0Q29ybmVyICYmIHVuaXZlcnNlRGVsdGEpIHtcclxuICAgICAgdGhpcy5zZXR0aW5ncy5zZXRQZXJzaXN0ZWRTZXR0aW5nKCd3YWxsc0hpdCcsIHdoID0+IHdoICsgdW5pdmVyc2VEZWx0YSk7XHJcbiAgICAgIHRpY2tTdGF0ZURlbHRhLmhpdFdhbGwgPSB1bml2ZXJzZURlbHRhO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHVuaXZlcnNlT2Zmc2V0ID0ge1xyXG4gICAgICB4OiB1bml2ZXJzZS54ICogdGhpcy5jYW52YXNXaWR0aCxcclxuICAgICAgeTogdW5pdmVyc2UueSAqIHRoaXMuY2FudmFzSGVpZ2h0LFxyXG4gICAgfTtcclxuICAgIGNvbnN0IGRlbHRhID0ge1xyXG4gICAgICB4OiB0aGlzLmN1cnJEIC0gdW5pdmVyc2VPZmZzZXQueCxcclxuICAgICAgeTogdGhpcy5jdXJyRCAtIHVuaXZlcnNlT2Zmc2V0LnksXHJcbiAgICB9O1xyXG4gICAgdGhpcy5wb3NpdGlvbiA9IHtcclxuICAgICAgeDogdW5pdmVyc2UueCAlIDIgPT09IDAgPyBkZWx0YS54IDogdGhpcy5jYW52YXNXaWR0aCAtIGRlbHRhLngsXHJcbiAgICAgIHk6IHVuaXZlcnNlLnkgJSAyID09PSAwID8gZGVsdGEueSA6IHRoaXMuY2FudmFzSGVpZ2h0IC0gZGVsdGEueSxcclxuICAgIH07XHJcblxyXG4gICAgaWYgKHRoaXMuc2V0dGluZ3MuZ2V0U2V0dGluZygnc2hvd1RpbWVUb0Nvcm5lcicpKSB7XHJcbiAgICAgIGNvbnN0IGRpc3RhbmNlVG9Db3JuZXIgPSB0aGlzLmRpcmVjdGlvbiA9PT0gMSA/XHJcbiAgICAgICAgICB0aGlzLnRvdGFsRCAtIHRoaXMuY3VyckQgOiB0aGlzLmN1cnJEO1xyXG4gICAgICBjb25zdCBwaXhlbHNQZXJTZWNvbmQgPSBQSVhFTFNfUEVSX01JTExJU0VDT05EICogMTAwMDtcclxuICAgICAgY29uc3QgdGltZVRvQ29ybmVyID0gZGlzdGFuY2VUb0Nvcm5lciAvIHBpeGVsc1BlclNlY29uZDtcclxuICAgICAgY29uc3QgZm9ybWF0dGVkVGltZVRvQ29ybmVyID0gdGltZVRvQ29ybmVyLnRvTG9jYWxlU3RyaW5nKCdlbi1VUycsIHtcclxuICAgICAgICBzdHlsZTogJ3VuaXQnLFxyXG4gICAgICAgIHVuaXQ6ICdzZWNvbmQnLFxyXG4gICAgICAgIG1heGltdW1TaWduaWZpY2FudERpZ2l0czogMyxcclxuICAgICAgfSk7XHJcbiAgICAgIHRoaXMuc3RhdHMucXVpY2tVcGRhdGUoU3RhdENhdGVnb3J5LlRJTUVfVE9fQ09STkVSLFxyXG4gICAgICAgICAgW1snVGltZSB0byBjb3JuZXInLCBmb3JtYXR0ZWRUaW1lVG9Db3JuZXJdXSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuc2V0dGluZ3MuZ2V0U2V0dGluZygnc2hvd0RlYnVnSW5mbycpKSB7XHJcbiAgICAgIHRoaXMuc3RhdHMucXVpY2tVcGRhdGUoU3RhdENhdGVnb3J5LkRFQlVHLCBbXHJcbiAgICAgICAgWydYJywgdGhpcy5wb3NpdGlvbi54XSxcclxuICAgICAgICBbJ1knLCB0aGlzLnBvc2l0aW9uLnldLFxyXG4gICAgICAgIFsnVW5pdmVyc2UgWCcsIHVuaXZlcnNlLnhdLFxyXG4gICAgICAgIFsnVW5pdmVyc2UgWScsIHVuaXZlcnNlLnldLFxyXG4gICAgICAgIFsnVW5pdmVyc2Ugb2Zmc2V0IFgnLCB1bml2ZXJzZU9mZnNldC54XSxcclxuICAgICAgICBbJ1VuaXZlcnNlIG9mZnNldCBZJywgdW5pdmVyc2VPZmZzZXQueV0sXHJcbiAgICAgICAgWydEZWx0YSBYJywgZGVsdGEueF0sXHJcbiAgICAgICAgWydEZWx0YSBZJywgZGVsdGEueV0sXHJcbiAgICAgICAgWydEJywgdGhpcy5jdXJyRF0sXHJcbiAgICAgICAgWydUb3RhbCBEJywgdGhpcy50b3RhbERdLFxyXG4gICAgICAgIFsnRGlyZWN0aW9uJywgdGhpcy5kaXJlY3Rpb25dLFxyXG4gICAgICBdKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGlja1N0YXRlRGVsdGE7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGdldFVuaXZlcnNlKGQ6IG51bWJlcikge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgeDogTWF0aC5mbG9vcihkIC8gdGhpcy5jYW52YXNXaWR0aCksXHJcbiAgICAgIHk6IE1hdGguZmxvb3IoZCAvIHRoaXMuY2FudmFzSGVpZ2h0KSxcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHRpY2tDb2xvcihjb3VudDogbnVtYmVyLCB0aWNrU3RhdGVEZWx0YTogVGlja1N0YXRlRGVsdGEpIHtcclxuICAgIHRoaXMuY29sb3JCZWhhdmlvcnNbdGhpcy5zZXR0aW5ncy5nZXRTZXR0aW5nKCdjb2xvckJlaGF2aW9yJyldXHJcbiAgICAgICAgLnRpY2soY291bnQsIHRpY2tTdGF0ZURlbHRhKTtcclxuICB9XHJcblxyXG4gIGRyYXcoY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpIHtcclxuICAgIGlmICh0aGlzLmltYWdlRGF0YSkge1xyXG4gICAgICBjdHgucHV0SW1hZ2VEYXRhKHRoaXMuaW1hZ2VEYXRhLCB0aGlzLnBvc2l0aW9uLngsIHRoaXMucG9zaXRpb24ueSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZXNpemUoY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudCkge1xyXG4gICAgY29uc3QgaGVpZ2h0RGVsdGEgPSBjYW52YXMuaGVpZ2h0IC0gdGhpcy5pbWFnZURhdGEuaGVpZ2h0O1xyXG4gICAgY29uc3Qgd2lkdGhEZWx0YSA9IGNhbnZhcy53aWR0aCAtIHRoaXMuaW1hZ2VEYXRhLndpZHRoO1xyXG4gICAgdGhpcy5jYW52YXNXaWR0aCA9IHdpZHRoRGVsdGE7XHJcbiAgICB0aGlzLmNhbnZhc0hlaWdodCA9IGhlaWdodERlbHRhO1xyXG4gICAgdGhpcy50b3RhbEQgPSBsY20oaGVpZ2h0RGVsdGEsIHdpZHRoRGVsdGEpO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIGFzeW5jIGZyb21GaWxlKFxyXG4gICAgICBmaWxlTmFtZTogc3RyaW5nLFxyXG4gICAgICBzZXR0aW5nczogU2V0dGluZ3MsXHJcbiAgICAgIHN0YXRzOiBTdGF0cyxcclxuICAgICk6IFByb21pc2U8Qm91bmNpbmdJbWFnZT4ge1xyXG4gICAgICBjb25zdCBpbWFnZURhdGEgPSBhd2FpdCBsb2FkSW1hZ2VEYXRhKGZpbGVOYW1lKTtcclxuICAgICAgcmV0dXJuIG5ldyBCb3VuY2luZ0ltYWdlKGltYWdlRGF0YSwgc2V0dGluZ3MsIHN0YXRzKTtcclxuICAgIH1cclxufVxyXG5cclxuaW50ZXJmYWNlIFRpY2tTdGF0ZURlbHRhIHtcclxuICBoaXRDb3JuZXI/OiBudW1iZXI7XHJcbiAgaGl0V2FsbD86IG51bWJlcjtcclxufVxyXG5cclxuYWJzdHJhY3QgY2xhc3MgQ29sb3JCZWhhdmlvciB7XHJcbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIHJlYWRvbmx5IGltYWdlOiBCb3VuY2luZ0ltYWdlKSB7fVxyXG5cclxuICBhYnN0cmFjdCB0aWNrKGNvdW50OiBudW1iZXIsIHRpY2tTdGF0ZURlbHRhOiBUaWNrU3RhdGVEZWx0YSk6IHZvaWQ7XHJcblxyXG4gIHByaXZhdGUgY29sb3JFcXVhbHMoYTogQ29sb3IsIGI6IENvbG9yKSB7XHJcbiAgICByZXR1cm4gYVswXSA9PT0gYlswXSAmJiBhWzFdID09PSBiWzFdICYmIGFbMl0gPT09IGJbMl07XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgc2V0Q29sb3IoY29sb3I6IENvbG9yKSB7XHJcbiAgICBjb25zdCB7ZGF0YX0gPSB0aGlzLmltYWdlLmltYWdlRGF0YTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7IGkgKz0gNCkge1xyXG4gICAgICBjb25zdCBleGlzdGluZzogQ29sb3IgPSBbZGF0YVtpXSwgZGF0YVtpICsgMV0sIGRhdGFbaSArIDJdLCBkYXRhW2kgKyAzXV07XHJcbiAgICAgIC8vIFdlIGtub3cgd2UgZG9uJ3QgbmVlZCB0byBjb250aW51ZSBzaW5jZSBvdXIgY29sb3Igd2FzIHRoZSBzYW1lIGFzXHJcbiAgICAgIC8vIGJlZm9yZS5cclxuICAgICAgaWYgKHRoaXMuY29sb3JFcXVhbHMoZXhpc3RpbmcsIGNvbG9yKSkgcmV0dXJuO1xyXG4gICAgICBjb25zdCBbciwgZywgYl0gPSBjb2xvcjtcclxuICAgICAgZGF0YVtpXSAgICAgPSByO1xyXG4gICAgICBkYXRhW2kgKyAxXSA9IGc7XHJcbiAgICAgIGRhdGFbaSArIDJdID0gYjtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmNsYXNzIFJhaW5ib3dDb2xvckJlaGF2aW9yIGV4dGVuZHMgQ29sb3JCZWhhdmlvciB7XHJcbiAgcHJpdmF0ZSBodWUgPSAwO1xyXG5cclxuICB0aWNrKGNvdW50OiBudW1iZXIsIHRpY2tTdGF0ZURlbHRhOiBUaWNrU3RhdGVEZWx0YSkge1xyXG4gICAgY29uc3QgQ09MT1JfU1BFRUQgPSB0aGlzLmltYWdlLnNldHRpbmdzLmdldFNldHRpbmcoJ3JhaW5ib3dTcGVlZCcpO1xyXG4gICAgdGhpcy50aWNrSHVlKChjb3VudCAqIENPTE9SX1NQRUVEKSArICg1MCAqIGhpdERlbHRhKHRpY2tTdGF0ZURlbHRhKSkpO1xyXG4gICAgdGhpcy5zZXRDb2xvcihoc2xUb1JnYih0aGlzLmh1ZSkpO1xyXG5cclxuICAgIGNvbnN0IHtkYXRhfSA9IHRoaXMuaW1hZ2UuaW1hZ2VEYXRhO1xyXG4gICAgY29uc3QgW3IsIGcsIGJdID0gaHNsVG9SZ2IodGhpcy5odWUpO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSArPSA0KSB7XHJcbiAgICAgIGRhdGFbaV0gICAgID0gcjtcclxuICAgICAgZGF0YVtpICsgMV0gPSBnO1xyXG4gICAgICBkYXRhW2kgKyAyXSA9IGI7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHRpY2tIdWUoY291bnQ6IG51bWJlcikge1xyXG4gICAgbGV0IGh1ZSA9IHRoaXMuaHVlICogMzYwO1xyXG4gICAgaHVlICs9IGNvdW50O1xyXG4gICAgaWYgKGh1ZSA+IDM2MCkge1xyXG4gICAgICBodWUgJT0gMzYwO1xyXG4gICAgfVxyXG4gICAgdGhpcy5odWUgPSBodWUgLyAzNjA7XHJcbiAgfVxyXG59XHJcblxyXG5jbGFzcyBOb25lQ29sb3JCZWhhdmlvciBleHRlbmRzIENvbG9yQmVoYXZpb3Ige1xyXG4gIHRpY2soKSB7XHJcbiAgICBjb25zdCBjb2xvciA9IHRoaXMuaW1hZ2Uuc2V0dGluZ3MuZ2V0U2V0dGluZygnbm9uZUNvbG9yJyk7XHJcbiAgICB0aGlzLnNldENvbG9yKGNvbG9yKTtcclxuICB9XHJcbn1cclxuXHJcbmNsYXNzIENsYXNzaWNDb2xvckJlaGF2aW9yIGV4dGVuZHMgQ29sb3JCZWhhdmlvciB7XHJcbiAgcHJpdmF0ZSBjdXJyQ29sb3IgPSAwO1xyXG5cclxuICBwcml2YXRlIHJlYWRvbmx5IGNvbG9yczogcmVhZG9ubHkgQ29sb3JbXSA9IFtcclxuICAgIFsyNTUsIDExNSwgMCwgMjU1XSwgLy8gb3JhbmdlXHJcbiAgICBbMjU0LCAwLCAwLCAyNTVdLCAvLyByZWRcclxuICAgIFs0NCwgMCwgMTgxLCAyNTVdLCAvLyBibHVlXHJcbiAgICBXSElURSxcclxuICAgIFsyNTUsIDIzNiwgMTAsIDI1NV0sIC8vIHllbGxvd1xyXG4gICAgWzI1NSwgMzQsIDEzOCwgMjU1XSwgLy8gcGlua1xyXG4gIF07XHJcblxyXG4gIHRpY2soY291bnQ6IG51bWJlciwgdGlja1N0YXRlRGVsdGE6IFRpY2tTdGF0ZURlbHRhKSB7XHJcbiAgICB0aGlzLmN1cnJDb2xvciA9ICh0aGlzLmN1cnJDb2xvciArIGhpdERlbHRhKHRpY2tTdGF0ZURlbHRhKSlcclxuICAgICAgICAlIHRoaXMuY29sb3JzLmxlbmd0aDtcclxuICAgIHRoaXMuc2V0Q29sb3IodGhpcy5jb2xvcnNbdGhpcy5jdXJyQ29sb3JdKTtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGhpdERlbHRhKHRpY2tTdGF0ZTogVGlja1N0YXRlRGVsdGEsIGNvcm5lckNvZWZmaWNpZW50ID0gMik6IG51bWJlciB7XHJcbiAgcmV0dXJuICh0aWNrU3RhdGUuaGl0Q29ybmVyID8/IDAgKiBjb3JuZXJDb2VmZmljaWVudCkgKyAodGlja1N0YXRlLmhpdFdhbGwgPz8gMCk7XHJcbn1cclxuXHJcbmFzeW5jIGZ1bmN0aW9uIGxvYWRJbWFnZURhdGEoZmlsZU5hbWU6IHN0cmluZyk6IFByb21pc2U8SW1hZ2VEYXRhPiB7XHJcbiAgY29uc3QgaW1nID0gbmV3IEltYWdlKCk7XHJcbiAgaW1nLmNyb3NzT3JpZ2luID0gJ0Fub255bW91cyc7XHJcbiAgaW1nLnNyYyA9IGZpbGVOYW1lO1xyXG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICB0cnkge1xyXG4gICAgICBpbWcuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsICgpID0+IHtcclxuICAgICAgICBjb25zdCBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcclxuICAgICAgICBjb25zdCB3aWR0aCA9IGltZy5uYXR1cmFsV2lkdGg7XHJcbiAgICAgICAgY29uc3QgaGVpZ2h0ID0gaW1nLm5hdHVyYWxIZWlnaHQ7XHJcbiAgICAgICAgY2FudmFzLndpZHRoID0gd2lkdGg7XHJcbiAgICAgICAgY2FudmFzLmhlaWdodCA9IGhlaWdodDtcclxuXHJcbiAgICAgICAgY29uc3QgY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJykhO1xyXG4gICAgICAgIGN0eC5kcmF3SW1hZ2UoaW1nLCAwLCAwLCB3aWR0aCwgaGVpZ2h0KTtcclxuXHJcbiAgICAgICAgY29uc3QgaW1hZ2VEYXRhID0gY3R4LmdldEltYWdlRGF0YSgwLCAwLCB3aWR0aCwgaGVpZ2h0KTtcclxuICAgICAgICByZXNvbHZlKGltYWdlRGF0YSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICByZWplY3QoZSk7XHJcbiAgICB9XHJcbiAgfSk7XHJcbn0iLCJpbXBvcnQge0luamVjdCwgSW5qZWN0aW9uVG9rZW59IGZyb20gJy4vZGknO1xyXG5pbXBvcnQge1N0YXRzfSBmcm9tICcuL3N0YXRzJztcclxuXHJcbmV4cG9ydCBjb25zdCBDQU5WQVNfT0JKRUNUUyA9IG5ldyBJbmplY3Rpb25Ub2tlbjxcclxuICAgIFByb21pc2U8cmVhZG9ubHkgQ2FudmFzT2JqZWN0W10+PignQ2FudmFzT2JqZWN0cycpO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBDYW52YXNPYmplY3Qge1xyXG4gIHRpY2soZGVsdGFUaW1lOiBudW1iZXIpOiB2b2lkO1xyXG4gIGRyYXcoY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpOiB2b2lkO1xyXG4gIHJlc2l6ZShjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50KTogdm9pZDtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIENhbnZhcyB7XHJcbiAgcHJpdmF0ZSByZWFkb25seSBjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignY2FudmFzJykhO1xyXG4gIHByaXZhdGUgcmVhZG9ubHkgY3R4ID0gdGhpcy5jYW52YXMuZ2V0Q29udGV4dCgnMmQnKSE7XHJcblxyXG4gIHByaXZhdGUgY3VyckZyYW1lID0gcGVyZm9ybWFuY2Uubm93KCk7XHJcbiAgcHJpdmF0ZSBmcmFtZUlkPzogbnVtYmVyO1xyXG4gIHByaXZhdGUgcmVhZG9ubHkgb2JqZWN0czogQ2FudmFzT2JqZWN0W10gPSBbXTtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBASW5qZWN0KFN0YXRzKSBwcml2YXRlIHJlYWRvbmx5IHN0YXRzOiBTdGF0cyxcclxuICAgIEBJbmplY3QoQ0FOVkFTX09CSkVDVFMpIG9iamVjdHM6IFByb21pc2U8cmVhZG9ubHkgQ2FudmFzT2JqZWN0W10+LFxyXG4gICkge1xyXG4gICAgb2JqZWN0cy50aGVuKG9iamVjdHMgPT4ge1xyXG4gICAgICBvYmplY3RzLmZvckVhY2gob2JqZWN0ID0+IG9iamVjdC5yZXNpemUodGhpcy5jYW52YXMpKTtcclxuICAgICAgdGhpcy5vYmplY3RzLnB1c2goLi4ub2JqZWN0cyk7XHJcbiAgICB9KTtcclxuICAgIHRoaXMucmVzaXplKCk7XHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgKCkgPT4ge1xyXG4gICAgICB0aGlzLnJlc2l6ZSgpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICByZXNpemUoKSB7XHJcbiAgICB0aGlzLmNhbnZhcy53aWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xyXG4gICAgdGhpcy5jYW52YXMuaGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xyXG4gICAgZm9yIChjb25zdCBvYmplY3Qgb2YgdGhpcy5vYmplY3RzKSB7XHJcbiAgICAgIG9iamVjdC5yZXNpemUodGhpcy5jYW52YXMpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBsb29wKCkge1xyXG4gICAgdGhpcy5jdHguY2xlYXJSZWN0KDAsIDAsIHRoaXMuY2FudmFzLndpZHRoLCB0aGlzLmNhbnZhcy5oZWlnaHQpO1xyXG4gICAgY29uc3Qgbm93ID0gcGVyZm9ybWFuY2Uubm93KCk7XHJcbiAgICBjb25zdCBkZWx0YVRpbWUgPSBub3cgLSB0aGlzLmN1cnJGcmFtZTtcclxuICAgIGZvciAoY29uc3Qgb2JqZWN0IG9mIHRoaXMub2JqZWN0cykge1xyXG4gICAgICBvYmplY3QudGljayhkZWx0YVRpbWUpO1xyXG4gICAgICBvYmplY3QuZHJhdyh0aGlzLmN0eCk7XHJcbiAgICB9XHJcbiAgICB0aGlzLnN0YXRzLnJlbmRlcigpO1xyXG4gIFxyXG4gICAgdGhpcy5jdXJyRnJhbWUgPSBub3c7XHJcbiAgICB0aGlzLmZyYW1lSWQgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4gdGhpcy5sb29wKCkpO1xyXG4gIH1cclxuXHJcbiAgc3RhcnQoKSB7XHJcbiAgICB0aGlzLmxvb3AoKTtcclxuICB9XHJcblxyXG4gIHN0b3AoKSB7XHJcbiAgICBpZiAodGhpcy5mcmFtZUlkKSB7XHJcbiAgICAgIGNhbmNlbEFuaW1hdGlvbkZyYW1lKHRoaXMuZnJhbWVJZCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvLyBhZGRPYmplY3RzKC4uLm9iamVjdHM6IHJlYWRvbmx5IENhbnZhc09iamVjdFtdKSB7XHJcbiAgLy8gICB0aGlzLm9iamVjdHMucHVzaCguLi5vYmplY3RzKTtcclxuICAvLyB9XHJcbn0iLCJpbXBvcnQge1dyaXRlYWJsZX0gZnJvbSAnLi90eXBlcyc7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gSW5qZWN0PFQ+KHRva2VuOiBUb2tlbjxUPikge1xyXG4gIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0OiBDbGFzczxUPiwgcHJvcGVydHlLZXk6IHN0cmluZyB8IHN5bWJvbCwgcGFyYW1ldGVySW5kZXg6IG51bWJlcikge1xyXG4gICAgY29uc29sZS5sb2codG9rZW4sIHRhcmdldCwgcHJvcGVydHlLZXksIHBhcmFtZXRlckluZGV4KTtcclxuICAgIGNvbnN0IGRlcHMgPSB0YXJnZXRbREVQU10gPz8gW107XHJcbiAgICBkZXBzW3BhcmFtZXRlckluZGV4XSA9IHRva2VuO1xyXG4gICAgKHRhcmdldCBhcyBXcml0ZWFibGU8Q2xhc3M8VD4+KVtERVBTXSA9IGRlcHM7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgSW5qZWN0b3Ige1xyXG5cclxuICBwcml2YXRlIHJlYWRvbmx5IGNhY2hlID0gbmV3IE1hcDxUb2tlbjx1bmtub3duPiwgVG9rZW5SZWNvcmQ8dW5rbm93bj4+KCk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSByZWFkb25seSBwYXJlbnQ/OiBJbmplY3RvcixcclxuICAgICkge31cclxuXHJcblxyXG4gIHJlZ2lzdGVyKC4uLmluamVjdGFibGVzOiByZWFkb25seSBJbmplY3RhYmxlPHVua25vd24+W10pIHtcclxuICAgIGZvciAoY29uc3QgaW5qZWN0YWJsZSBvZiBpbmplY3RhYmxlcykge1xyXG4gICAgICBjb25zdCB0b2tlbiA9IHRoaXMuZ2V0VG9rZW4oaW5qZWN0YWJsZSk7XHJcbiAgICAgIGNvbnN0IGZhY3RvcnkgPSB0aGlzLmNyZWF0ZUZhY3RvcnkoaW5qZWN0YWJsZSk7XHJcbiAgICAgIHRoaXMuY2FjaGUuc2V0KHRva2VuLCB7XHJcbiAgICAgICAgdG9rZW4sXHJcbiAgICAgICAgZmFjdG9yeSxcclxuICAgICAgICBjYWNoZTogVU5ERUZJTkVELFxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgZ2V0VG9rZW48VD4oaW5qZWN0YWJsZTogSW5qZWN0YWJsZTxUPik6IFRva2VuPFQ+IHtcclxuICAgIGlmIChpc1ZhbHVlUHJvdmlkZWRUb2tlbihpbmplY3RhYmxlKSB8fFxyXG4gICAgICAgIGlzRmFjdG9yeVByb3ZpZGVkVG9rZW4oaW5qZWN0YWJsZSkpIHtcclxuICAgICAgcmV0dXJuIGluamVjdGFibGUucHJvdmlkZTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gaW5qZWN0YWJsZTtcclxuICB9XHJcblxyXG4gIGdldDxUPih0b2tlbjogVG9rZW48VD4pOiBUIHtcclxuICAgIGNvbnN0IGRlcCA9IHRoaXMuY2FjaGUuZ2V0KHRva2VuKTtcclxuICAgIGlmIChkZXApIHtcclxuICAgICAgaWYgKGRlcC5jYWNoZSA9PT0gQ0lSQ1VMQVIpIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NpcmN1bGFyIGRlcGVuZGVuY3knKTtcclxuICAgICAgfVxyXG4gICAgICBpZiAoZGVwLmNhY2hlID09PSBVTkRFRklORUQpIHtcclxuICAgICAgICBkZXAuY2FjaGUgPSBDSVJDVUxBUjtcclxuICAgICAgICBkZXAuY2FjaGUgPSBkZXAuZmFjdG9yeSgpO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBkZXAuY2FjaGUgYXMgVDtcclxuICAgIH1cclxuICAgIGlmICh0aGlzLnBhcmVudCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5wYXJlbnQuZ2V0KHRva2VuKTtcclxuICAgIH1cclxuICAgIGNvbnNvbGUuZXJyb3IodG9rZW4pO1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKCdUb2tlbiBub3QgZm91bmQnKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgY3JlYXRlRmFjdG9yeTxUPihpbmplY3RhYmxlOiBJbmplY3RhYmxlPFQ+KTogKCkgPT4gVCB7XHJcbiAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICBpZiAoaW5qZWN0YWJsZSBpbnN0YW5jZW9mIEluamVjdGlvblRva2VuKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbmplY3Rpb25Ub2tlbiB0cmllZCB0byBwcm92aWRlIGl0c2VsZicpO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChpc1ZhbHVlUHJvdmlkZWRUb2tlbihpbmplY3RhYmxlKSkge1xyXG4gICAgICAgIHJldHVybiBpbmplY3RhYmxlLnVzZVZhbHVlO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChpc0ZhY3RvcnlQcm92aWRlZFRva2VuKGluamVjdGFibGUpKSB7XHJcbiAgICAgICAgY29uc3QgZGVwcyA9IGluamVjdGFibGUuZGVwcyA/PyBbXTtcclxuICAgICAgICBjb25zdCBhcmdzID0gZGVwcy5tYXAoZGVwID0+IHRoaXMuZ2V0KGRlcCkpIGFzIFRva2VuPHVua25vd24+W107XHJcbiAgICAgICAgcmV0dXJuIGluamVjdGFibGUudXNlRmFjdG9yeSguLi5hcmdzKTtcclxuICAgICAgfVxyXG4gICAgICBjb25zdCB0b2tlbiA9IGluamVjdGFibGU7XHJcbiAgICAgIGNvbnN0IGRlcHMgPSB0b2tlbltERVBTXSA/PyBbXTtcclxuICAgICAgY29uc3QgYXJncyA9IGRlcHMubWFwKGRlcCA9PiB0aGlzLmdldChkZXApKTtcclxuICAgICAgcmV0dXJuIG5ldyB0b2tlbiguLi5hcmdzKTtcclxuICAgIH07XHJcbiAgfVxyXG59XHJcblxyXG5pbnRlcmZhY2UgVG9rZW5SZWNvcmQ8VD4ge1xyXG4gIHRva2VuOiBUb2tlbjxUPjtcclxuICBmYWN0b3J5OiBGdW5jdGlvbjtcclxuICBjYWNoZTogVHx0eXBlb2YgQ0lSQ1VMQVJ8dHlwZW9mIFVOREVGSU5FRDtcclxufVxyXG5cclxuY29uc3QgVU5ERUZJTkVEID0gU3ltYm9sKCdOb3QgZGVmaW5lZCcpO1xyXG5jb25zdCBDSVJDVUxBUiA9IFN5bWJvbCgnQ2lyY3VsYXInKTtcclxuY29uc3QgREVQUyA9IFN5bWJvbCgnRGVwcycpO1xyXG5cclxudHlwZSBJbmplY3RhYmxlPFQ+ID0gVG9rZW48VD58UHJvdmlkZWRUb2tlbjxUPjtcclxudHlwZSBQcm92aWRlZFRva2VuPFQ+ID0gVmFsdWVQcm92aWRlZFRva2VuPFQ+fEZhY3RvcnlQcm92aWRlZFRva2VuPFQ+O1xyXG5pbnRlcmZhY2UgVmFsdWVQcm92aWRlZFRva2VuPFQ+IHtcclxuICBwcm92aWRlOiBUb2tlbjxUPjtcclxuICB1c2VWYWx1ZTogVDtcclxufVxyXG5pbnRlcmZhY2UgRmFjdG9yeVByb3ZpZGVkVG9rZW48VD4ge1xyXG4gIHByb3ZpZGU6IFRva2VuPFQ+O1xyXG4gIHVzZUZhY3Rvcnk6ICguLi5hcmdzOiBhbnlbXSkgPT4gYW55O1xyXG4gIGRlcHM/OiBhbnlbXTtcclxufVxyXG5mdW5jdGlvbiBpc1ZhbHVlUHJvdmlkZWRUb2tlbjxUPih2OiB1bmtub3duKTogdiBpcyBWYWx1ZVByb3ZpZGVkVG9rZW48VD4ge1xyXG4gIHJldHVybiB0eXBlb2YgdiA9PT0gJ29iamVjdCcgJiYgdiAhPT0gbnVsbFxyXG4gICAgICAmJiAndXNlVmFsdWUnIGluIHY7XHJcbn1cclxuZnVuY3Rpb24gaXNGYWN0b3J5UHJvdmlkZWRUb2tlbjxUPih2OiB1bmtub3duKTogdiBpcyBGYWN0b3J5UHJvdmlkZWRUb2tlbjxUPiB7XHJcbiAgcmV0dXJuIHR5cGVvZiB2ID09PSAnb2JqZWN0JyAmJiB2ICE9PSBudWxsXHJcbiAgICAgICYmICd1c2VGYWN0b3J5JyBpbiB2O1xyXG59XHJcblxyXG50eXBlIFRva2VuPFQ+ID0gQ2xhc3M8VD58SW5qZWN0aW9uVG9rZW48VD47XHJcblxyXG5pbnRlcmZhY2UgQ2xhc3M8VD4ge1xyXG4gIG5ldyguLi5hcmdzOiBhbnlbXSk6IFQ7XHJcbiAgcmVhZG9ubHkgW0RFUFNdPzogVG9rZW48YW55PltdO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgSW5qZWN0aW9uVG9rZW48VD4ge1xyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgICBwcml2YXRlIHJlYWRvbmx5IG5hbWU6IHN0cmluZyxcclxuICAgICkge31cclxuXHJcbiAgdG9TdHJpbmcoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiBgSW5qZWN0aW9uVG9rZW4gJHt0aGlzLm5hbWV9YDtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHtSZXBsYXlTdWJqZWN0fSBmcm9tICdyeGpzJztcclxuXHJcbmltcG9ydCB7SW5qZWN0fSBmcm9tICcuL2RpJztcclxuaW1wb3J0IHtTdGF0cywgU3RhdENhdGVnb3J5fSBmcm9tICcuL3N0YXRzJztcclxuaW1wb3J0IHtDb2xvcn0gZnJvbSAnLi90eXBlcyc7XHJcbmltcG9ydCB7V0hJVEV9IGZyb20gJy4vdXRpbCc7XHJcblxyXG5pbnRlcmZhY2UgU2V0dGluZ3NTdGF0ZSBleHRlbmRzIFBlcnNpc3RlbnRTZXR0aW5ncywgV1BFU2V0dGluZ3Mge31cclxuXHJcbmludGVyZmFjZSBQZXJzaXN0ZW50U2V0dGluZ3Mge1xyXG4gIHdhbGxzSGl0OiBudW1iZXI7XHJcbiAgY29ybmVyc0hpdDogbnVtYmVyO1xyXG59XHJcblxyXG5leHBvcnQgdHlwZSBDb2xvckJlaGF2aW9yS2luZCA9ICdub25lJ3wncmFpbmJvdyd8J2NsYXNzaWMnO1xyXG5cclxuaW50ZXJmYWNlIFdQRVNldHRpbmdzIHtcclxuICBzaG93U3RhdHM6IGJvb2xlYW47XHJcbiAgc2hvd1RpbWVUb0Nvcm5lcjogYm9vbGVhbjtcclxuICBzaG93RGVidWdJbmZvOiBib29sZWFuO1xyXG4gIGNvbG9yQmVoYXZpb3I6IENvbG9yQmVoYXZpb3JLaW5kO1xyXG4gIHJhaW5ib3dTcGVlZDogbnVtYmVyO1xyXG4gIG5vbmVDb2xvcjogQ29sb3I7XHJcbiAgc3BlZWQ6IG51bWJlcjtcclxufVxyXG5cclxuY29uc3QgREVGQVVMVF9XUEVfU0VUVElOR1M6IFdQRVNldHRpbmdzID0ge1xyXG4gIHNob3dTdGF0czogZmFsc2UsXHJcbiAgc2hvd1RpbWVUb0Nvcm5lcjogZmFsc2UsXHJcbiAgc2hvd0RlYnVnSW5mbzogZmFsc2UsXHJcbiAgY29sb3JCZWhhdmlvcjogJ3JhaW5ib3cnLFxyXG4gIHJhaW5ib3dTcGVlZDogMC4wNSxcclxuICBub25lQ29sb3I6IFdISVRFLFxyXG4gIHNwZWVkOiAwLjI1LFxyXG59O1xyXG5cclxuY29uc3QgcGFyc2VOdW1iZXJGYWN0b3J5ID0gKFxyXG4gICAgcGFyc2VGbjogdHlwZW9mIE51bWJlci5wYXJzZUludHx0eXBlb2YgTnVtYmVyLnBhcnNlRmxvYXQpID0+XHJcbiAgICAgICAgKGpzb25TdHJpbmc6IHN0cmluZ3xudWxsKTogbnVtYmVyID0+IHtcclxuICAgICAgICAgIGlmIChqc29uU3RyaW5nID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgcmV0dXJuIHBhcnNlRm4oanNvblN0cmluZywgMTApIHx8IDA7XHJcbiAgICAgICAgfTtcclxuY29uc3QgcGFyc2VJbnQgPSBwYXJzZU51bWJlckZhY3RvcnkoTnVtYmVyLnBhcnNlSW50KTtcclxuY29uc3QgcGFyc2VGbG9hdCA9IHBhcnNlTnVtYmVyRmFjdG9yeShOdW1iZXIucGFyc2VGbG9hdCk7XHJcbmNvbnN0IHBhcnNlQ29sb3IgPSAoY29sb3JTdHJpbmc6IHN0cmluZ3xudWxsKTogQ29sb3IgPT4ge1xyXG4gIGlmICghY29sb3JTdHJpbmcpIHJldHVybiBXSElURTtcclxuICBjb25zdCBbciwgZywgYl0gPSBjb2xvclN0cmluZy5zcGxpdCgnICcpLm1hcChwYXJzZUZsb2F0KTtcclxuICByZXR1cm4gW3IgKiAyNTUsIGcgKiAyNTUsIGIgKiAyNTUsIDI1NV07XHJcbn07XHJcblxyXG4vLyBUaGlzIGhhcHBlbnMgaGVyZSBzbyB3ZSBjYW4gbGlzdGVuIGFzIHNvb24gYXMgcG9zc2libGUuIElkayBpZiBpdCBtYXR0ZXJzLlxyXG5saXN0ZW5Ub1dwZVByb3BlcnRpZXMoXHJcbiAgJ3Nob3dTdGF0cycsXHJcbiAgJ3Nob3dUaW1lVG9Db3JuZXInLFxyXG4gICdzaG93RGVidWdJbmZvJyxcclxuICAnY29sb3JCZWhhdmlvcicsXHJcbiAgWydyYWluYm93U3BlZWQnLCBwYXJzZUZsb2F0XSxcclxuICBbJ25vbmVDb2xvcicsIHBhcnNlQ29sb3JdLFxyXG4gIFsnc3BlZWQnLCBwYXJzZUZsb2F0XSxcclxuKTtcclxuXHJcbmNvbnN0IFBFUlNJU1RFTlRfU0VUVElOR1MgPSBbXHJcbiAge2tleTogJ2Nvcm5lcnNIaXQnLCBzdGF0TGFiZWw6ICdDb3JuZXJzIGhpdCcsIGRlc2VyaWFsaXplcjogcGFyc2VJbnR9LFxyXG4gIHtrZXk6ICd3YWxsc0hpdCcsIHN0YXRMYWJlbDogJ1dhbGxzIGhpdCcsIGRlc2VyaWFsaXplcjogcGFyc2VJbnR9LFxyXG5dIGFzIGNvbnN0O1xyXG5cclxuY29uc3QgV1BFX1NFVFRJTkdfVE9fU1RBVF9DQVRFR09SWToge1tLIGluIGtleW9mIFdQRVNldHRpbmdzXT86IFN0YXRDYXRlZ29yeX0gPSB7XHJcbiAgc2hvd1N0YXRzOiBTdGF0Q2F0ZWdvcnkuU1RBVFMsXHJcbiAgc2hvd1RpbWVUb0Nvcm5lcjogU3RhdENhdGVnb3J5LlRJTUVfVE9fQ09STkVSLFxyXG4gIHNob3dEZWJ1Z0luZm86IFN0YXRDYXRlZ29yeS5ERUJVRyxcclxufTtcclxuXHJcbmV4cG9ydCBjbGFzcyBTZXR0aW5ncyB7XHJcbiAgcHJpdmF0ZSByZWFkb25seSBzZXR0aW5ncyA9IHRoaXMuaW5pdGlhbGl6ZVNldHRpbmdzKCk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgICBASW5qZWN0KFN0YXRzKSBwcml2YXRlIHJlYWRvbmx5IHN0YXRzOiBTdGF0cyxcclxuICAgICkge1xyXG4gICAgICBzZXR0aW5nc1N5bmMuc3Vic2NyaWJlKHBhcnRpYWxXcGVTZXR0aW5ncyA9PiB7XHJcbiAgICAgICAgLy8gVXBkYXRlIHdoZXRoZXIgd2Ugc2hvdWxkIHNob3cgc29tZSBjYXRlZ29yeSBvZiBzdGF0cy5cclxuICAgICAgICBmb3IgKGNvbnN0IFtzZXR0aW5nLCBuZXdWYWx1ZV0gb2YgT2JqZWN0LmVudHJpZXMocGFydGlhbFdwZVNldHRpbmdzKSkge1xyXG4gICAgICAgICAgY29uc3Qgc3RhdENhdGVnb3J5ID1cclxuICAgICAgICAgICAgICBXUEVfU0VUVElOR19UT19TVEFUX0NBVEVHT1JZW3NldHRpbmcgYXMga2V5b2YgV1BFU2V0dGluZ3NdO1xyXG4gICAgICAgICAgaWYgKHN0YXRDYXRlZ29yeSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhdHMubXV0ZUNhdGVnb3J5KFxyXG4gICAgICAgICAgICAgICAgc3RhdENhdGVnb3J5LFxyXG4gICAgICAgICAgICAgICAgLy8gIXNob3dYID0gc2hvdWxkTXV0ZUNhdGVnb3J5XHJcbiAgICAgICAgICAgICAgICAhbmV3VmFsdWUpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMuc2V0dGluZ3MsIHBhcnRpYWxXcGVTZXR0aW5ncyk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICBzZXRQZXJzaXN0ZWRTZXR0aW5nPEsgZXh0ZW5kcyBrZXlvZiBQZXJzaXN0ZW50U2V0dGluZ3M+KFxyXG4gICAgICBrZXk6IEssXHJcbiAgICAgIHZhbHVlOiBQZXJzaXN0ZW50U2V0dGluZ3NbS118SWRlbnRpdHk8UGVyc2lzdGVudFNldHRpbmdzW0tdPixcclxuICAgICAgKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3Qgb2xkVmFsdWUgPSB0aGlzLnNldHRpbmdzW2tleV07XHJcbiAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgdmFsdWUgPSB2YWx1ZShvbGRWYWx1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh2YWx1ZSA9PT0gb2xkVmFsdWUpIHJldHVybjtcclxuICAgICAgICB0aGlzLnNldHRpbmdzW2tleV0gPSB2YWx1ZTtcclxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShrZXksIHZhbHVlLnRvU3RyaW5nKCkpO1xyXG4gICAgICAgIGlmICh0aGlzLnNldHRpbmdzLnNob3dTdGF0cykge1xyXG4gICAgICAgICAgdGhpcy5zdGF0cy51cGRhdGVTdGF0KGtleSwgdmFsdWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gIFxyXG4gIGdldFNldHRpbmc8SyBleHRlbmRzIGtleW9mIFNldHRpbmdzU3RhdGU+KGtleTogSyk6IFNldHRpbmdzU3RhdGVbS10ge1xyXG4gICAgcmV0dXJuIHRoaXMuc2V0dGluZ3Nba2V5XTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgaW5pdGlhbGl6ZVNldHRpbmdzKCk6IFNldHRpbmdzU3RhdGUge1xyXG4gICAgY29uc3QgcGVyc2lzdGVudFNldHRpbmdzID0gT2JqZWN0LmZyb21FbnRyaWVzKFxyXG4gICAgICAgIFBFUlNJU1RFTlRfU0VUVElOR1MubWFwKCh7a2V5LCBzdGF0TGFiZWwsIGRlc2VyaWFsaXplcn0pID0+IHtcclxuICAgICAgICAgIHJldHVybiBba2V5LCB0aGlzLmluaXRQZXJzaXN0ZW50U2V0dGluZyhrZXksIHN0YXRMYWJlbCwgZGVzZXJpYWxpemVyKV07XHJcbiAgICAgICAgfSkpIGFzIHVua25vd24gYXMgUGVyc2lzdGVudFNldHRpbmdzO1xyXG4gICAgY29uc3Qgd3BlU2V0dGluZ3M6IFdQRVNldHRpbmdzID0gREVGQVVMVF9XUEVfU0VUVElOR1M7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAuLi5wZXJzaXN0ZW50U2V0dGluZ3MsXHJcbiAgICAgIC4uLndwZVNldHRpbmdzLFxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgaW5pdFBlcnNpc3RlbnRTZXR0aW5nPEsgZXh0ZW5kcyBrZXlvZiBQZXJzaXN0ZW50U2V0dGluZ3M+KFxyXG4gICAgICBrZXk6IEssXHJcbiAgICAgIGxhYmVsOiBzdHJpbmcsXHJcbiAgICAgIGRlc2VyaWFsaXplOiBEZXNlcmlhbGl6ZXI8UGVyc2lzdGVudFNldHRpbmdzW0tdPixcclxuICAgICk6IFBlcnNpc3RlbnRTZXR0aW5nc1tLXSB7XHJcbiAgICAgIGNvbnN0IGpzb25TdHJpbmcgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShrZXkpO1xyXG4gICAgICBjb25zdCBkZXNlcmlsaXplZFZhbHVlID0gZGVzZXJpYWxpemUoanNvblN0cmluZyk7XHJcbiAgICAgIHRoaXMuc3RhdHMucmVnaXN0ZXJTdGF0KHtcclxuICAgICAgICBjYXRlZ29yeTogU3RhdENhdGVnb3J5LlNUQVRTLFxyXG4gICAgICAgIGlkOiBrZXksXHJcbiAgICAgICAgbGFiZWwsXHJcbiAgICAgICAgdmFsdWU6IGRlc2VyaWxpemVkVmFsdWUsXHJcbiAgICAgIH0pO1xyXG4gICAgICByZXR1cm4gZGVzZXJpbGl6ZWRWYWx1ZTtcclxuICAgIH1cclxufVxyXG5cclxudHlwZSBJZGVudGl0eTxUPiA9ICh0OiBUKSA9PiBUO1xyXG50eXBlIERlc2VyaWFsaXplcjxUPiA9IChqc29uU3RyaW5nOiBzdHJpbmd8bnVsbCkgPT4gVDtcclxuXHJcbmNvbnN0IHNldHRpbmdzU3luYyA9IG5ldyBSZXBsYXlTdWJqZWN0PFBhcnRpYWw8V1BFU2V0dGluZ3M+PigxKTtcclxuXHJcbmludGVyZmFjZSBXaW5kb3dXaXRoV1BFIGV4dGVuZHMgV2luZG93IHtcclxuICB3YWxscGFwZXJQcm9wZXJ0eUxpc3RlbmVyOiB7XHJcbiAgICBhcHBseVVzZXJQcm9wZXJ0aWVzOiAocHJvcGVydGllczoge1tpbmRleDogc3RyaW5nXToge3ZhbHVlOiBhbnl9fSkgPT4gdm9pZDtcclxuICB9O1xyXG59XHJcblxyXG5mdW5jdGlvbiBsaXN0ZW5Ub1dwZVByb3BlcnRpZXM8SyBleHRlbmRzIGtleW9mIFdQRVNldHRpbmdzPihcclxuICAgIC4uLmtleXM6IChLfFtLLERlc2VyaWFsaXplcjxXUEVTZXR0aW5nc1tLXT5dKVtdKSB7XHJcbiAgICAgICh3aW5kb3cgYXMgdW5rbm93biBhcyBXaW5kb3dXaXRoV1BFKS53YWxscGFwZXJQcm9wZXJ0eUxpc3RlbmVyID0ge1xyXG4gICAgICAgIGFwcGx5VXNlclByb3BlcnRpZXMocHJvcGVydGllcykge1xyXG4gICAgICAgICAgY29uc29sZS5pbmZvKCdQcm9wZXJ0eSB1cGRhdGUnLCBwcm9wZXJ0aWVzKTtcclxuICAgICAgICAgIGNvbnN0IHNldHRpbmdzVG9BcHBseTogUGFydGlhbDxXUEVTZXR0aW5ncz4gPSB7fTtcclxuICAgICAgICAgIGZvciAobGV0IGtleSBvZiBrZXlzKSB7XHJcbiAgICAgICAgICAgIGxldCBmb3JtYXR0ZXI6IERlc2VyaWFsaXplcjxXUEVTZXR0aW5nc1tLXT58dW5kZWZpbmVkID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShrZXkpKSB7XHJcbiAgICAgICAgICAgICAgZm9ybWF0dGVyID0ga2V5WzFdO1xyXG4gICAgICAgICAgICAgIGtleSA9IGtleVswXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zdCBwcm9wZXJ0eSA9IHByb3BlcnRpZXNba2V5LnRvTG93ZXJDYXNlKCldO1xyXG4gICAgICAgICAgICBpZiAocHJvcGVydHkpIHtcclxuICAgICAgICAgICAgICBzZXR0aW5nc1RvQXBwbHlba2V5XSA9IGZvcm1hdHRlciA/IGZvcm1hdHRlcihwcm9wZXJ0eS52YWx1ZSkgOlxyXG4gICAgICAgICAgICAgICAgICBwcm9wZXJ0eS52YWx1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgc2V0dGluZ3NTeW5jLm5leHQoc2V0dGluZ3NUb0FwcGx5KTtcclxuICAgICAgICB9LFxyXG4gICAgICB9O1xyXG4gICAgfVxyXG4iLCJpbXBvcnQge0luamVjdCwgSW5qZWN0aW9uVG9rZW59IGZyb20gJy4vZGknO1xyXG5cclxuZXhwb3J0IGNvbnN0IFNUQVRTX0VMRU1FTlQgPSBuZXcgSW5qZWN0aW9uVG9rZW48SFRNTEVsZW1lbnQ+KCdTdGF0c0VsZW1lbnQnKTtcclxuXHJcbi8qKiBDb250cm9scyB0aGUgc3RhdGlzdGljYWwgaW5mb3JtYXRpb24gZGlzcGxheWVkIG9uIHNjcmVlbi4gKi9cclxuZXhwb3J0IGNsYXNzIFN0YXRzIHtcclxuICBcclxuICBwcml2YXRlIHJlYWRvbmx5IHN0YXRDYXRlZ29yaWVzID0gbmV3IE1hcDxTdGF0Q2F0ZWdvcnksIHJlYWRvbmx5IHN0cmluZ1tdPigpO1xyXG4gIHByaXZhdGUgcmVhZG9ubHkgc3RhdHMgPSBuZXcgTWFwPHN0cmluZywgU3RhdD4oKTtcclxuICBwcml2YXRlIHJlYWRvbmx5IG11dGVkQ2F0ZWdvcmllcyA9IG5ldyBTZXQ8U3RhdENhdGVnb3J5PigpO1xyXG5cclxuICBwcml2YXRlIGhhc0NoYW5nZWQgPSBmYWxzZTtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICAgIEBJbmplY3QoU1RBVFNfRUxFTUVOVCkgcHJpdmF0ZSByZWFkb25seSBlbDogSFRNTEVsZW1lbnQsXHJcbiAgICApIHt9XHJcblxyXG4gIHJlZ2lzdGVyU3RhdChzdGF0OiBTdGF0KSB7XHJcbiAgICBjb25zdCBzdGF0Q2F0ZWdvcnkgPSB0aGlzLnN0YXRDYXRlZ29yaWVzLmdldChzdGF0LmNhdGVnb3J5KSA/PyBbXTtcclxuICAgIHRoaXMuc3RhdENhdGVnb3JpZXMuc2V0KHN0YXQuY2F0ZWdvcnksIFsuLi5zdGF0Q2F0ZWdvcnksIHN0YXQuaWRdKTtcclxuICAgIHRoaXMuc3RhdHMuc2V0KHN0YXQuaWQsIHN0YXQpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBpc1JlZ2lzdGVyZWQoc3RhdElkOiBzdHJpbmcpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLnN0YXRzLmhhcyhzdGF0SWQpO1xyXG4gIH1cclxuXHJcbiAgcXVpY2tVcGRhdGUoY2F0ZWdvcnk6IFN0YXRDYXRlZ29yeSwgc3RhdHM6W1N0YXRbJ2xhYmVsJ10sIFN0YXRbJ3ZhbHVlJ11dW10pIHtcclxuICAgIGZvciAoY29uc3QgW2xhYmVsLCB2YWx1ZV0gb2Ygc3RhdHMpIHtcclxuICAgICAgY29uc3QgaWQgPSBsYWJlbDsgLy8gbGFiZWwgYWN0cyBhcyBpZFxyXG4gICAgICBpZiAoIXRoaXMuaXNSZWdpc3RlcmVkKGlkKSkge1xyXG4gICAgICAgIHRoaXMucmVnaXN0ZXJTdGF0KHtcclxuICAgICAgICAgIGlkLFxyXG4gICAgICAgICAgY2F0ZWdvcnksXHJcbiAgICAgICAgICBsYWJlbCxcclxuICAgICAgICAgIHZhbHVlLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMudXBkYXRlU3RhdChpZCwgdmFsdWUpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICB1cGRhdGVTdGF0KGlkOiBTdGF0WydpZCddLCB2YWx1ZTogU3RhdFsndmFsdWUnXSkge1xyXG4gICAgY29uc3Qgc2F2ZWRTdGF0ID0gdGhpcy5zdGF0cy5nZXQoaWQpO1xyXG4gICAgaWYgKCFzYXZlZFN0YXQpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBUcmllZCB0byB1cGRhdGUgc3RhdCB0aGF0IGhhc24ndCBiZWVuIHJlZ2lzdGVyZWQ6ICR7aWR9YCk7XHJcbiAgICB9XHJcbiAgICBpZiAoc2F2ZWRTdGF0LnZhbHVlID09PSB2YWx1ZSkgcmV0dXJuO1xyXG4gICAgdGhpcy5zdGF0cy5zZXQoaWQsIHtcclxuICAgICAgLi4uc2F2ZWRTdGF0LFxyXG4gICAgICB2YWx1ZSxcclxuICAgIH0pO1xyXG4gICAgaWYgKCF0aGlzLm11dGVkQ2F0ZWdvcmllcy5oYXMoc2F2ZWRTdGF0LmNhdGVnb3J5KSkge1xyXG4gICAgICB0aGlzLmhhc0NoYW5nZWQgPSB0cnVlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbXV0ZUNhdGVnb3J5KGNhdGVnb3J5OiBTdGF0Q2F0ZWdvcnksIG5ld0lzTXV0ZWQ6IGJvb2xlYW4pIHtcclxuICAgIGNvbnN0IG9sZElzTXV0ZWQgPSB0aGlzLm11dGVkQ2F0ZWdvcmllcy5oYXMoY2F0ZWdvcnkpO1xyXG4gICAgaWYgKG5ld0lzTXV0ZWQgPT09IG9sZElzTXV0ZWQpIHJldHVybjtcclxuICAgIHRoaXMuaGFzQ2hhbmdlZCA9IHRydWU7XHJcbiAgICBpZiAobmV3SXNNdXRlZCkge1xyXG4gICAgICB0aGlzLm11dGVkQ2F0ZWdvcmllcy5hZGQoY2F0ZWdvcnkpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5tdXRlZENhdGVnb3JpZXMuZGVsZXRlKGNhdGVnb3J5KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJlbmRlcigpOiB2b2lkIHtcclxuICAgIGlmICghdGhpcy5oYXNDaGFuZ2VkKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGNvbnN0IHN0YXRzVG9EaXNwbGF5OiBzdHJpbmdbXSA9IFtdO1xyXG4gICAgZm9yIChjb25zdCBbY2F0ZWdvcnksIHN0YXRJZHNdIG9mIHRoaXMuc3RhdENhdGVnb3JpZXMpIHtcclxuICAgICAgaWYgKHRoaXMubXV0ZWRDYXRlZ29yaWVzLmhhcyhjYXRlZ29yeSkpIGNvbnRpbnVlO1xyXG4gICAgICBmb3IgKGNvbnN0IHN0YXRJZCBvZiBzdGF0SWRzKSB7XHJcbiAgICAgICAgY29uc3Qgc3RhdCA9IHRoaXMuc3RhdHMuZ2V0KHN0YXRJZCk7XHJcbiAgICAgICAgaWYgKCFzdGF0KSB7XHJcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYE1pc3Npbmcgc3RhdCB3aXRoIElEIFwiJHtzdGF0SWR9XCJgKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3Qge2xhYmVsLCB2YWx1ZX0gPSBzdGF0O1xyXG4gICAgICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkKSBjb250aW51ZTtcclxuICAgICAgICBzdGF0c1RvRGlzcGxheS5wdXNoKGAke2xhYmVsfTogJHt2YWx1ZX1gKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgdGhpcy5lbC5pbm5lclRleHQgPSBzdGF0c1RvRGlzcGxheS5qb2luKCdcXG4nKTtcclxuICAgIHRoaXMuaGFzQ2hhbmdlZCA9IGZhbHNlO1xyXG4gIH1cclxufVxyXG5cclxuaW50ZXJmYWNlIFN0YXQge1xyXG4gIGNhdGVnb3J5OiBTdGF0Q2F0ZWdvcnk7XHJcbiAgaWQ6IHN0cmluZztcclxuICBsYWJlbDogc3RyaW5nO1xyXG4gIHZhbHVlOiBIYXNUb1N0cmluZztcclxufVxyXG5cclxuZXhwb3J0IGVudW0gU3RhdENhdGVnb3J5IHtcclxuICBTVEFUUyxcclxuICBUSU1FX1RPX0NPUk5FUixcclxuICBERUJVRyxcclxufVxyXG5cclxudHlwZSBIYXNUb1N0cmluZyA9IHN0cmluZyB8IHt0b1N0cmluZygpOiBzdHJpbmc7fTtcclxuXHJcbiIsImltcG9ydCB7Q29sb3J9IGZyb20gJy4vdHlwZXMnO1xyXG5cclxuZXhwb3J0IGNvbnN0IFdISVRFOiBDb2xvciA9IFsyNTUsIDI1NSwgMjU1LCAyNTVdO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGZsYXR0ZW5NYXBWYWx1ZXM8Vj4obWFwOiBNYXA8dW5rbm93biwgVj4pOiBGbGF0QXJyYXk8VltdLCAxPltdIHtcclxuICBjb25zdCB2YWx1ZXNBc0FycmF5ID0gQXJyYXkuZnJvbShtYXAudmFsdWVzKCkpO1xyXG4gIHJldHVybiB2YWx1ZXNBc0FycmF5LmZsYXQoKTtcclxufVxyXG4vKipcclxuICogQ29udmVydHMgYW4gSFNMIGNvbG9yIHZhbHVlIHRvIFJHQi4gQ29udmVyc2lvbiBmb3JtdWxhXHJcbiAqIGFkYXB0ZWQgZnJvbSBodHRwOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0hTTF9jb2xvcl9zcGFjZS5cclxuICogQXNzdW1lcyBoLCBzLCBhbmQgbCBhcmUgY29udGFpbmVkIGluIHRoZSBzZXQgWzAsIDFdIGFuZFxyXG4gKiByZXR1cm5zIHIsIGcsIGFuZCBiIGluIHRoZSBzZXQgWzAsIDI1NV0uXHJcbiAqXHJcbiAqIEBwYXJhbSAgIHtudW1iZXJ9ICBoICAgICAgIFRoZSBodWVcclxuICogQHBhcmFtICAge251bWJlcn0gIHMgICAgICAgVGhlIHNhdHVyYXRpb25cclxuICogQHBhcmFtICAge251bWJlcn0gIGwgICAgICAgVGhlIGxpZ2h0bmVzc1xyXG4gKiBAcmV0dXJuICB7QXJyYXl9ICAgICAgICAgICBUaGUgUkdCIHJlcHJlc2VudGF0aW9uXHJcbiAqL1xyXG4gZXhwb3J0IGZ1bmN0aW9uIGhzbFRvUmdiKGg6IG51bWJlciwgcyA9IDAuNSwgbCA9IDAuNSk6IENvbG9yIHtcclxuICB2YXIgciwgZywgYjtcclxuXHJcbiAgaWYgKHMgPT0gMCl7XHJcbiAgICAgIHIgPSBnID0gYiA9IGw7IC8vIGFjaHJvbWF0aWNcclxuICB9IGVsc2V7XHJcbiAgICAgIHZhciBodWUycmdiID0gZnVuY3Rpb24gaHVlMnJnYihwOiBudW1iZXIsIHE6IG51bWJlciwgdDogbnVtYmVyKSB7XHJcbiAgICAgICAgICBpZih0IDwgMCkgdCArPSAxO1xyXG4gICAgICAgICAgaWYodCA+IDEpIHQgLT0gMTtcclxuICAgICAgICAgIGlmKHQgPCAxLzYpIHJldHVybiBwICsgKHEgLSBwKSAqIDYgKiB0O1xyXG4gICAgICAgICAgaWYodCA8IDEvMikgcmV0dXJuIHE7XHJcbiAgICAgICAgICBpZih0IDwgMi8zKSByZXR1cm4gcCArIChxIC0gcCkgKiAoMi8zIC0gdCkgKiA2O1xyXG4gICAgICAgICAgcmV0dXJuIHA7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHZhciBxID0gbCA8IDAuNSA/IGwgKiAoMSArIHMpIDogbCArIHMgLSBsICogcztcclxuICAgICAgdmFyIHAgPSAyICogbCAtIHE7XHJcbiAgICAgIHIgPSBodWUycmdiKHAsIHEsIGggKyAxLzMpO1xyXG4gICAgICBnID0gaHVlMnJnYihwLCBxLCBoKTtcclxuICAgICAgYiA9IGh1ZTJyZ2IocCwgcSwgaCAtIDEvMyk7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gW01hdGgucm91bmQociAqIDI1NSksIE1hdGgucm91bmQoZyAqIDI1NSksIE1hdGgucm91bmQoYiAqIDI1NSksIDI1NV07XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGdjZChhOiBudW1iZXIsIGI6IG51bWJlcik6IG51bWJlciB7XHJcbiAgdmFyIHQgPSAwO1xyXG4gIGEgPCBiICYmICh0ID0gYiwgYiA9IGEsIGEgPSB0KTsgLy8gc3dhcCB0aGVtIGlmIGEgPCBiXHJcbiAgdCA9IGElYjtcclxuICByZXR1cm4gdCA/IGdjZChiLHQpIDogYjtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gbGNtKGE6IG51bWJlciwgYjogbnVtYmVyKTogbnVtYmVyIHtcclxuICByZXR1cm4gYS9nY2QoYSxiKSpiO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBpc0VxdWFsKGE6IHVua25vd24sIGI6IHVua25vd24pIHtcclxuICByZXR1cm4gYSA9PT0gYjtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gYXJyYXlFcXVhbDxcclxuICAgIEEgZXh0ZW5kcyBBcnJheUxpa2U8dW5rbm93bj4sXHJcbiAgICBCIGV4dGVuZHMgQXJyYXlMaWtlPHVua25vd24+PihhOiBBLCBiOiBCKTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKGEubGVuZ3RoICE9PSBiLmxlbmd0aCkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgaWYgKCFpc0VxdWFsKGFbaV0sIGJbaV0pKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICB9XHJcbmV4cG9ydCBmdW5jdGlvbiBvYmplY3RFcXVhbHM8VCBleHRlbmRzIHtbaTogc3RyaW5nXTogdW5rbm93bn0+KGE6IFQsIGI6IFQpIHtcclxuICBpZiAoYSA9PT0gYikgcmV0dXJuIHRydWU7XHJcbiAgY29uc3QgYUtleXMgPSBPYmplY3Qua2V5cyhhKTtcclxuICBjb25zdCBiS2V5cyA9IG5ldyBTZXQoT2JqZWN0LmtleXMoYikpO1xyXG4gIGlmIChhS2V5cy5sZW5ndGggIT09IGJLZXlzLnNpemUpIHJldHVybiBmYWxzZTtcclxuICBmb3IgKGNvbnN0IGFLZXkgb2YgYUtleXMpIHtcclxuICAgIGNvbnN0IGFWYWx1ZSA9IGFbYUtleV07XHJcbiAgICBjb25zdCBiVmFsdWUgPSBiW2FLZXldO1xyXG4gICAgaWYgKGFWYWx1ZSAhPT0gYlZhbHVlKSByZXR1cm4gZmFsc2U7XHJcbiAgICBiS2V5cy5kZWxldGUoYUtleSk7XHJcbiAgfVxyXG4gIGlmIChiS2V5cy5zaXplKSByZXR1cm4gZmFsc2U7XHJcbiAgcmV0dXJuIHRydWU7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGNsYW1wKG51bTogbnVtYmVyLCBtaW46IG51bWJlciwgbWF4OiBudW1iZXIpOiBudW1iZXIge1xyXG4gIHJldHVybiBNYXRoLm1pbihNYXRoLm1heChudW0sIG1pbiksIG1heCk7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIG1lbW9pemU8RiBleHRlbmRzICguLi5hcmdzOiB1bmtub3duW10pID0+IHVua25vd24+KGZuOiBGKTogRiB7XHJcbiAgbGV0IGxhc3RBcmdzOiBQYXJhbWV0ZXJzPEY+O1xyXG4gIGxldCBsYXN0VmFsdWU6IFJldHVyblR5cGU8Rj47XHJcbiAgY29uc3QgbWVtb2l6ZWQgPSAoKC4uLmFyZ3M6IFBhcmFtZXRlcnM8Rj4pID0+IHtcclxuICAgIGlmICghbGFzdEFyZ3MgfHwgIWFycmF5RXF1YWwobGFzdEFyZ3MsIGFyZ3MpKSB7XHJcbiAgICAgIGxhc3RBcmdzID0gYXJncztcclxuICAgICAgbGFzdFZhbHVlID0gZm4uYXBwbHkobnVsbCwgYXJncykgYXMgUmV0dXJuVHlwZTxGPjtcclxuICAgIH1cclxuICAgIHJldHVybiBsYXN0VmFsdWU7XHJcbiAgfSkgYXMgRjtcclxuICByZXR1cm4gbWVtb2l6ZWQ7XHJcbn0iLCIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbkNvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLlxyXG5cclxuUGVybWlzc2lvbiB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kL29yIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZSBmb3IgYW55XHJcbnB1cnBvc2Ugd2l0aCBvciB3aXRob3V0IGZlZSBpcyBoZXJlYnkgZ3JhbnRlZC5cclxuXHJcblRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIgQU5EIFRIRSBBVVRIT1IgRElTQ0xBSU1TIEFMTCBXQVJSQU5USUVTIFdJVEhcclxuUkVHQVJEIFRPIFRISVMgU09GVFdBUkUgSU5DTFVESU5HIEFMTCBJTVBMSUVEIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZXHJcbkFORCBGSVRORVNTLiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SIEJFIExJQUJMRSBGT1IgQU5ZIFNQRUNJQUwsIERJUkVDVCxcclxuSU5ESVJFQ1QsIE9SIENPTlNFUVVFTlRJQUwgREFNQUdFUyBPUiBBTlkgREFNQUdFUyBXSEFUU09FVkVSIFJFU1VMVElORyBGUk9NXHJcbkxPU1MgT0YgVVNFLCBEQVRBIE9SIFBST0ZJVFMsIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBORUdMSUdFTkNFIE9SXHJcbk9USEVSIFRPUlRJT1VTIEFDVElPTiwgQVJJU0lORyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBVU0UgT1JcclxuUEVSRk9STUFOQ0UgT0YgVEhJUyBTT0ZUV0FSRS5cclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cclxuLyogZ2xvYmFsIFJlZmxlY3QsIFByb21pc2UgKi9cclxuXHJcbnZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24oZCwgYikge1xyXG4gICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYiwgcCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHRlbmRzKGQsIGIpIHtcclxuICAgIGlmICh0eXBlb2YgYiAhPT0gXCJmdW5jdGlvblwiICYmIGIgIT09IG51bGwpXHJcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNsYXNzIGV4dGVuZHMgdmFsdWUgXCIgKyBTdHJpbmcoYikgKyBcIiBpcyBub3QgYSBjb25zdHJ1Y3RvciBvciBudWxsXCIpO1xyXG4gICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG59XHJcblxyXG5leHBvcnQgdmFyIF9fYXNzaWduID0gZnVuY3Rpb24oKSB7XHJcbiAgICBfX2Fzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gX19hc3NpZ24odCkge1xyXG4gICAgICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xyXG4gICAgICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpIHRbcF0gPSBzW3BdO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdDtcclxuICAgIH1cclxuICAgIHJldHVybiBfX2Fzc2lnbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZXN0KHMsIGUpIHtcclxuICAgIHZhciB0ID0ge307XHJcbiAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkgJiYgZS5pbmRleE9mKHApIDwgMClcclxuICAgICAgICB0W3BdID0gc1twXTtcclxuICAgIGlmIChzICE9IG51bGwgJiYgdHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPT09IFwiZnVuY3Rpb25cIilcclxuICAgICAgICBmb3IgKHZhciBpID0gMCwgcCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMocyk7IGkgPCBwLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChlLmluZGV4T2YocFtpXSkgPCAwICYmIE9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGUuY2FsbChzLCBwW2ldKSlcclxuICAgICAgICAgICAgICAgIHRbcFtpXV0gPSBzW3BbaV1dO1xyXG4gICAgICAgIH1cclxuICAgIHJldHVybiB0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYykge1xyXG4gICAgdmFyIGMgPSBhcmd1bWVudHMubGVuZ3RoLCByID0gYyA8IDMgPyB0YXJnZXQgOiBkZXNjID09PSBudWxsID8gZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpIDogZGVzYywgZDtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5kZWNvcmF0ZSA9PT0gXCJmdW5jdGlvblwiKSByID0gUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYyk7XHJcbiAgICBlbHNlIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSBpZiAoZCA9IGRlY29yYXRvcnNbaV0pIHIgPSAoYyA8IDMgPyBkKHIpIDogYyA+IDMgPyBkKHRhcmdldCwga2V5LCByKSA6IGQodGFyZ2V0LCBrZXkpKSB8fCByO1xyXG4gICAgcmV0dXJuIGMgPiAzICYmIHIgJiYgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCByKSwgcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcGFyYW0ocGFyYW1JbmRleCwgZGVjb3JhdG9yKSB7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldCwga2V5KSB7IGRlY29yYXRvcih0YXJnZXQsIGtleSwgcGFyYW1JbmRleCk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpIHtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5tZXRhZGF0YSA9PT0gXCJmdW5jdGlvblwiKSByZXR1cm4gUmVmbGVjdC5tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0ZXIodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19nZW5lcmF0b3IodGhpc0FyZywgYm9keSkge1xyXG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZztcclxuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XHJcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xyXG4gICAgICAgIHdoaWxlIChfKSB0cnkge1xyXG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XHJcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcclxuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xyXG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XHJcbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB2YXIgX19jcmVhdGVCaW5kaW5nID0gT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xyXG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcclxuICAgIHZhciBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihtLCBrKTtcclxuICAgIGlmICghZGVzYyB8fCAoXCJnZXRcIiBpbiBkZXNjID8gIW0uX19lc01vZHVsZSA6IGRlc2Mud3JpdGFibGUgfHwgZGVzYy5jb25maWd1cmFibGUpKSB7XHJcbiAgICAgICAgZGVzYyA9IHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIG1ba107IH0gfTtcclxuICAgIH1cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBrMiwgZGVzYyk7XHJcbn0pIDogKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XHJcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xyXG4gICAgb1trMl0gPSBtW2tdO1xyXG59KTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4cG9ydFN0YXIobSwgbykge1xyXG4gICAgZm9yICh2YXIgcCBpbiBtKSBpZiAocCAhPT0gXCJkZWZhdWx0XCIgJiYgIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvLCBwKSkgX19jcmVhdGVCaW5kaW5nKG8sIG0sIHApO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX192YWx1ZXMobykge1xyXG4gICAgdmFyIHMgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgU3ltYm9sLml0ZXJhdG9yLCBtID0gcyAmJiBvW3NdLCBpID0gMDtcclxuICAgIGlmIChtKSByZXR1cm4gbS5jYWxsKG8pO1xyXG4gICAgaWYgKG8gJiYgdHlwZW9mIG8ubGVuZ3RoID09PSBcIm51bWJlclwiKSByZXR1cm4ge1xyXG4gICAgICAgIG5leHQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKG8gJiYgaSA+PSBvLmxlbmd0aCkgbyA9IHZvaWQgMDtcclxuICAgICAgICAgICAgcmV0dXJuIHsgdmFsdWU6IG8gJiYgb1tpKytdLCBkb25lOiAhbyB9O1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKHMgPyBcIk9iamVjdCBpcyBub3QgaXRlcmFibGUuXCIgOiBcIlN5bWJvbC5pdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3JlYWQobywgbikge1xyXG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdO1xyXG4gICAgaWYgKCFtKSByZXR1cm4gbztcclxuICAgIHZhciBpID0gbS5jYWxsKG8pLCByLCBhciA9IFtdLCBlO1xyXG4gICAgdHJ5IHtcclxuICAgICAgICB3aGlsZSAoKG4gPT09IHZvaWQgMCB8fCBuLS0gPiAwKSAmJiAhKHIgPSBpLm5leHQoKSkuZG9uZSkgYXIucHVzaChyLnZhbHVlKTtcclxuICAgIH1cclxuICAgIGNhdGNoIChlcnJvcikgeyBlID0geyBlcnJvcjogZXJyb3IgfTsgfVxyXG4gICAgZmluYWxseSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKHIgJiYgIXIuZG9uZSAmJiAobSA9IGlbXCJyZXR1cm5cIl0pKSBtLmNhbGwoaSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZpbmFsbHkgeyBpZiAoZSkgdGhyb3cgZS5lcnJvcjsgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG4vKiogQGRlcHJlY2F0ZWQgKi9cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkKCkge1xyXG4gICAgZm9yICh2YXIgYXIgPSBbXSwgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspXHJcbiAgICAgICAgYXIgPSBhci5jb25jYXQoX19yZWFkKGFyZ3VtZW50c1tpXSkpO1xyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG4vKiogQGRlcHJlY2F0ZWQgKi9cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkQXJyYXlzKCkge1xyXG4gICAgZm9yICh2YXIgcyA9IDAsIGkgPSAwLCBpbCA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBpbDsgaSsrKSBzICs9IGFyZ3VtZW50c1tpXS5sZW5ndGg7XHJcbiAgICBmb3IgKHZhciByID0gQXJyYXkocyksIGsgPSAwLCBpID0gMDsgaSA8IGlsOyBpKyspXHJcbiAgICAgICAgZm9yICh2YXIgYSA9IGFyZ3VtZW50c1tpXSwgaiA9IDAsIGpsID0gYS5sZW5ndGg7IGogPCBqbDsgaisrLCBrKyspXHJcbiAgICAgICAgICAgIHJba10gPSBhW2pdO1xyXG4gICAgcmV0dXJuIHI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZEFycmF5KHRvLCBmcm9tLCBwYWNrKSB7XHJcbiAgICBpZiAocGFjayB8fCBhcmd1bWVudHMubGVuZ3RoID09PSAyKSBmb3IgKHZhciBpID0gMCwgbCA9IGZyb20ubGVuZ3RoLCBhcjsgaSA8IGw7IGkrKykge1xyXG4gICAgICAgIGlmIChhciB8fCAhKGkgaW4gZnJvbSkpIHtcclxuICAgICAgICAgICAgaWYgKCFhcikgYXIgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChmcm9tLCAwLCBpKTtcclxuICAgICAgICAgICAgYXJbaV0gPSBmcm9tW2ldO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiB0by5jb25jYXQoYXIgfHwgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZnJvbSkpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdCh2KSB7XHJcbiAgICByZXR1cm4gdGhpcyBpbnN0YW5jZW9mIF9fYXdhaXQgPyAodGhpcy52ID0gdiwgdGhpcykgOiBuZXcgX19hd2FpdCh2KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNHZW5lcmF0b3IodGhpc0FyZywgX2FyZ3VtZW50cywgZ2VuZXJhdG9yKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIGcgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSksIGksIHEgPSBbXTtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpZiAoZ1tuXSkgaVtuXSA9IGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAoYSwgYikgeyBxLnB1c2goW24sIHYsIGEsIGJdKSA+IDEgfHwgcmVzdW1lKG4sIHYpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gcmVzdW1lKG4sIHYpIHsgdHJ5IHsgc3RlcChnW25dKHYpKTsgfSBjYXRjaCAoZSkgeyBzZXR0bGUocVswXVszXSwgZSk7IH0gfVxyXG4gICAgZnVuY3Rpb24gc3RlcChyKSB7IHIudmFsdWUgaW5zdGFuY2VvZiBfX2F3YWl0ID8gUHJvbWlzZS5yZXNvbHZlKHIudmFsdWUudikudGhlbihmdWxmaWxsLCByZWplY3QpIDogc2V0dGxlKHFbMF1bMl0sIHIpOyB9XHJcbiAgICBmdW5jdGlvbiBmdWxmaWxsKHZhbHVlKSB7IHJlc3VtZShcIm5leHRcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiByZWplY3QodmFsdWUpIHsgcmVzdW1lKFwidGhyb3dcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUoZiwgdikgeyBpZiAoZih2KSwgcS5zaGlmdCgpLCBxLmxlbmd0aCkgcmVzdW1lKHFbMF1bMF0sIHFbMF1bMV0pOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jRGVsZWdhdG9yKG8pIHtcclxuICAgIHZhciBpLCBwO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiLCBmdW5jdGlvbiAoZSkgeyB0aHJvdyBlOyB9KSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobiwgZikgeyBpW25dID0gb1tuXSA/IGZ1bmN0aW9uICh2KSB7IHJldHVybiAocCA9ICFwKSA/IHsgdmFsdWU6IF9fYXdhaXQob1tuXSh2KSksIGRvbmU6IG4gPT09IFwicmV0dXJuXCIgfSA6IGYgPyBmKHYpIDogdjsgfSA6IGY7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNWYWx1ZXMobykge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBtID0gb1tTeW1ib2wuYXN5bmNJdGVyYXRvcl0sIGk7XHJcbiAgICByZXR1cm4gbSA/IG0uY2FsbChvKSA6IChvID0gdHlwZW9mIF9fdmFsdWVzID09PSBcImZ1bmN0aW9uXCIgPyBfX3ZhbHVlcyhvKSA6IG9bU3ltYm9sLml0ZXJhdG9yXSgpLCBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaSk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaVtuXSA9IG9bbl0gJiYgZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHsgdiA9IG9bbl0odiksIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHYuZG9uZSwgdi52YWx1ZSk7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCBkLCB2KSB7IFByb21pc2UucmVzb2x2ZSh2KS50aGVuKGZ1bmN0aW9uKHYpIHsgcmVzb2x2ZSh7IHZhbHVlOiB2LCBkb25lOiBkIH0pOyB9LCByZWplY3QpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ha2VUZW1wbGF0ZU9iamVjdChjb29rZWQsIHJhdykge1xyXG4gICAgaWYgKE9iamVjdC5kZWZpbmVQcm9wZXJ0eSkgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkoY29va2VkLCBcInJhd1wiLCB7IHZhbHVlOiByYXcgfSk7IH0gZWxzZSB7IGNvb2tlZC5yYXcgPSByYXc7IH1cclxuICAgIHJldHVybiBjb29rZWQ7XHJcbn07XHJcblxyXG52YXIgX19zZXRNb2R1bGVEZWZhdWx0ID0gT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCB2KSB7XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgXCJkZWZhdWx0XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHYgfSk7XHJcbn0pIDogZnVuY3Rpb24obywgdikge1xyXG4gICAgb1tcImRlZmF1bHRcIl0gPSB2O1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0U3Rhcihtb2QpIHtcclxuICAgIGlmIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpIHJldHVybiBtb2Q7XHJcbiAgICB2YXIgcmVzdWx0ID0ge307XHJcbiAgICBpZiAobW9kICE9IG51bGwpIGZvciAodmFyIGsgaW4gbW9kKSBpZiAoayAhPT0gXCJkZWZhdWx0XCIgJiYgT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vZCwgaykpIF9fY3JlYXRlQmluZGluZyhyZXN1bHQsIG1vZCwgayk7XHJcbiAgICBfX3NldE1vZHVsZURlZmF1bHQocmVzdWx0LCBtb2QpO1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0RGVmYXVsdChtb2QpIHtcclxuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgZGVmYXVsdDogbW9kIH07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0KHJlY2VpdmVyLCBzdGF0ZSwga2luZCwgZikge1xyXG4gICAgaWYgKGtpbmQgPT09IFwiYVwiICYmICFmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiUHJpdmF0ZSBhY2Nlc3NvciB3YXMgZGVmaW5lZCB3aXRob3V0IGEgZ2V0dGVyXCIpO1xyXG4gICAgaWYgKHR5cGVvZiBzdGF0ZSA9PT0gXCJmdW5jdGlvblwiID8gcmVjZWl2ZXIgIT09IHN0YXRlIHx8ICFmIDogIXN0YXRlLmhhcyhyZWNlaXZlcikpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgcmVhZCBwcml2YXRlIG1lbWJlciBmcm9tIGFuIG9iamVjdCB3aG9zZSBjbGFzcyBkaWQgbm90IGRlY2xhcmUgaXRcIik7XHJcbiAgICByZXR1cm4ga2luZCA9PT0gXCJtXCIgPyBmIDoga2luZCA9PT0gXCJhXCIgPyBmLmNhbGwocmVjZWl2ZXIpIDogZiA/IGYudmFsdWUgOiBzdGF0ZS5nZXQocmVjZWl2ZXIpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19jbGFzc1ByaXZhdGVGaWVsZFNldChyZWNlaXZlciwgc3RhdGUsIHZhbHVlLCBraW5kLCBmKSB7XHJcbiAgICBpZiAoa2luZCA9PT0gXCJtXCIpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJQcml2YXRlIG1ldGhvZCBpcyBub3Qgd3JpdGFibGVcIik7XHJcbiAgICBpZiAoa2luZCA9PT0gXCJhXCIgJiYgIWYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJQcml2YXRlIGFjY2Vzc29yIHdhcyBkZWZpbmVkIHdpdGhvdXQgYSBzZXR0ZXJcIik7XHJcbiAgICBpZiAodHlwZW9mIHN0YXRlID09PSBcImZ1bmN0aW9uXCIgPyByZWNlaXZlciAhPT0gc3RhdGUgfHwgIWYgOiAhc3RhdGUuaGFzKHJlY2VpdmVyKSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCB3cml0ZSBwcml2YXRlIG1lbWJlciB0byBhbiBvYmplY3Qgd2hvc2UgY2xhc3MgZGlkIG5vdCBkZWNsYXJlIGl0XCIpO1xyXG4gICAgcmV0dXJuIChraW5kID09PSBcImFcIiA/IGYuY2FsbChyZWNlaXZlciwgdmFsdWUpIDogZiA/IGYudmFsdWUgPSB2YWx1ZSA6IHN0YXRlLnNldChyZWNlaXZlciwgdmFsdWUpKSwgdmFsdWU7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2NsYXNzUHJpdmF0ZUZpZWxkSW4oc3RhdGUsIHJlY2VpdmVyKSB7XHJcbiAgICBpZiAocmVjZWl2ZXIgPT09IG51bGwgfHwgKHR5cGVvZiByZWNlaXZlciAhPT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgcmVjZWl2ZXIgIT09IFwiZnVuY3Rpb25cIikpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgdXNlICdpbicgb3BlcmF0b3Igb24gbm9uLW9iamVjdFwiKTtcclxuICAgIHJldHVybiB0eXBlb2Ygc3RhdGUgPT09IFwiZnVuY3Rpb25cIiA/IHJlY2VpdmVyID09PSBzdGF0ZSA6IHN0YXRlLmhhcyhyZWNlaXZlcik7XHJcbn1cclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQge0JvdW5jaW5nSW1hZ2V9IGZyb20gJy4vYm91bmNpbmdfaW1hZ2UnO1xyXG5pbXBvcnQge0NhbnZhcywgQ0FOVkFTX09CSkVDVFN9IGZyb20gJy4vY2FudmFzJztcclxuaW1wb3J0IHtJbmplY3Rvcn0gZnJvbSAnLi9kaSc7XHJcbmltcG9ydCB7U2V0dGluZ3N9IGZyb20gJy4vc2V0dGluZ3MnO1xyXG5pbXBvcnQge1N0YXRzLCBTVEFUU19FTEVNRU5UfSBmcm9tICcuL3N0YXRzJztcclxuXHJcblxyXG5jb25zdCBwZXJtTG9nRWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcGVybUxvZycpITtcclxuZnVuY3Rpb24gcGVybUxvZyhzdHJpbmc6IHN0cmluZykge1xyXG4gIGNvbnN0IGNoaWxkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xyXG4gIGNoaWxkLmlubmVyVGV4dCA9IHN0cmluZztcclxuICBwZXJtTG9nRWwuYXBwZW5kQ2hpbGQoY2hpbGQpO1xyXG59XHJcblxyXG5jb25zdCBpbmplY3RvciA9IG5ldyBJbmplY3RvcigpO1xyXG5cclxuaW5qZWN0b3IucmVnaXN0ZXIoXHJcbiAgQ2FudmFzLFxyXG4gIFNldHRpbmdzLFxyXG4gIFN0YXRzLFxyXG4gIHtcclxuICAgIHByb3ZpZGU6IFNUQVRTX0VMRU1FTlQsXHJcbiAgICB1c2VWYWx1ZTogZG9jdW1lbnQucXVlcnlTZWxlY3RvcigncCcpISxcclxuICB9LFxyXG4gIHtcclxuICAgIHByb3ZpZGU6IENBTlZBU19PQkpFQ1RTLFxyXG4gICAgdXNlRmFjdG9yeTogYXN5bmMgKHNldHRpbmdzOiBTZXR0aW5ncywgc3RhdHM6IFN0YXRzKSA9PiB7XHJcbiAgICAgIGNvbnN0IGltZyA9IGF3YWl0IEJvdW5jaW5nSW1hZ2UuZnJvbUZpbGUoJy4vZHZkLnN2ZycsIHNldHRpbmdzLCBzdGF0cyk7XHJcbiAgICAgIHJldHVybiBbaW1nXTtcclxuICAgIH0sXHJcbiAgICBkZXBzOiBbU2V0dGluZ3MsIFN0YXRzXSxcclxuICB9LFxyXG4pO1xyXG5cclxuXHJcblxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgKCkgPT4ge1xyXG4gIGNvbnN0IGNhbnZhcyA9IGluamVjdG9yLmdldChDYW52YXMpO1xyXG4gIGNhbnZhcy5zdGFydCgpO1xyXG5cclxuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgKCkgPT4ge1xyXG4gICAgY2FudmFzLnJlc2l6ZSgpO1xyXG4gIH0pO1xyXG59KTtcclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9