class Maybe<T> {
  static just<S>(a: S) {
    return new Just(a);
  }
  static nothing() {
    return new Nothing();
  }
  static fromNullable<S>(a: S): Maybe<S> {
    return a !== null ? Maybe.just(a) : Maybe.nothing();
  }
  static of<S>(a: S) {
    return Maybe.just(a);
  }
  get isNothing() {
    return false;
  }
  get isJust() {
    return false;
  }
}

class Just<T> extends Maybe<T> {
  constructor(private _value: T) {
    super();
  }
  map<V>(fn: (val: T) => V): Maybe<T> {
    return Maybe.fromNullable(fn(this._value));
  }
  getOrElse<S>(_: S) {
    return this._value;
  }
  filter(fn: (val: T) => boolean): Maybe<T> {
    return Maybe.fromNullable(fn(this._value) ? this._value : null);
  }
  chain<V>(fn: (val: T) => Maybe<V>) {
    return fn(this._value);
  }
  get isNothing() {
    return false;
  }
  get isJust() {
    return true;
  }
}

class Nothing<T> extends Maybe<T> {
  constructor() {
    super();
  }
  map<V>(fn: (val: T) => V): Maybe<T> {
    return this;
  }
  getOrElse(els: Maybe<T>): Maybe<T> {
    return Maybe.fromNullable(els);
  }
  filter(fn: (val: T) => boolean): Maybe<T> {
    return this;
  }
  chain<V>(fn: (val: T) => Maybe<V>): Maybe<V> {
    return this;
  }
  get isNothing() {
    return true;
  }
  get isJust() {
    return false;
  }
}