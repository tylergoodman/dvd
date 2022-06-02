import {Writeable} from './types';

export function Inject<T>(token: Token<T>) {
  return function (target: Class<T>, propertyKey: string | symbol, parameterIndex: number) {
    console.log(token, target, propertyKey, parameterIndex);
    const deps = target[DEPS] ?? [];
    deps[parameterIndex] = token;
    (target as Writeable<Class<T>>)[DEPS] = deps;
  }
}

export class Injector {

  private readonly cache = new Map<Token<unknown>, TokenRecord<unknown>>();

  constructor(
    private readonly parent?: Injector,
    ) {}


  register(...injectables: readonly Injectable<unknown>[]) {
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

  private getToken<T>(injectable: Injectable<T>): Token<T> {
    if (isValueProvidedToken(injectable) ||
        isFactoryProvidedToken(injectable)) {
      return injectable.provide;
    }

    return injectable;
  }

  get<T>(token: Token<T>): T {
    const dep = this.cache.get(token);
    if (dep) {
      if (dep.cache === CIRCULAR) {
        throw new Error('Circular dependency');
      }
      if (dep.cache === UNDEFINED) {
        dep.cache = CIRCULAR;
        dep.cache = dep.factory();
      }
      return dep.cache as T;
    }
    if (this.parent) {
      return this.parent.get(token);
    }
    console.error(token);
    throw new Error('Token not found');
  }

  private createFactory<T>(injectable: Injectable<T>): () => T {
    return () => {
      if (injectable instanceof InjectionToken) {
        throw new Error('InjectionToken tried to provide itself');
      }
      if (isValueProvidedToken(injectable)) {
        return injectable.useValue;
      }
      if (isFactoryProvidedToken(injectable)) {
        const deps = injectable.deps ?? [];
        const args = deps.map(dep => this.get(dep)) as Token<unknown>[];
        return injectable.useFactory(...args);
      }
      const token = injectable;
      const deps = token[DEPS] ?? [];
      const args = deps.map(dep => this.get(dep));
      return new token(...args);
    };
  }
}

interface TokenRecord<T> {
  token: Token<T>;
  factory: Function;
  cache: T|typeof CIRCULAR|typeof UNDEFINED;
}

const UNDEFINED = Symbol('Not defined');
const CIRCULAR = Symbol('Circular');
const DEPS = Symbol('Deps');

type Injectable<T> = Token<T>|ProvidedToken<T>;
type ProvidedToken<T> = ValueProvidedToken<T>|FactoryProvidedToken<T>;
interface ValueProvidedToken<T> {
  provide: Token<T>;
  useValue: T;
}
interface FactoryProvidedToken<T> {
  provide: Token<T>;
  useFactory: (...args: any[]) => any;
  deps?: any[];
}
function isValueProvidedToken<T>(v: unknown): v is ValueProvidedToken<T> {
  return typeof v === 'object' && v !== null
      && 'useValue' in v;
}
function isFactoryProvidedToken<T>(v: unknown): v is FactoryProvidedToken<T> {
  return typeof v === 'object' && v !== null
      && 'useFactory' in v;
}

type Token<T> = Class<T>|InjectionToken<T>;

interface Class<T> {
  new(...args: any[]): T;
  readonly [DEPS]?: Token<any>[];
}

export class InjectionToken<T> {
  constructor(
      private readonly name: string,
    ) {}

  toString(): string {
    return `InjectionToken ${this.name}`;
  }
}
