type Constructor<T> = new (...args: any[]) => T;
type Relation<TA, TB> = (value: TA) => TB;

export const mapByConstructor = <TR>(value: any, constructors: Constructor<any>[], maps: Relation<any, TR>[]): TR | undefined => {
  for (let i = 0; i < constructors.length; i++) if (constructors[i] === value.constructor && maps[i]) return maps[i](value);
  return undefined;
}