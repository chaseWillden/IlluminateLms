interface IPromiseConstructor<T> {
  new (init: (resolve: (value: T | IPromise<T>) => void, reject: (reason: any) => void) => void): IPromise<T>;
}

interface IPromise<T> {
  then<TResult>(onfulfilled: (value: T) => TResult | IPromise<TResult>, onrejected: (reason: any) => TResult | IPromise<TResult>): IPromise<TResult>;
}