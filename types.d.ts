export type reactive<T> = T;
export type prop<T> = T;
export type computed<T> = { (): T };
export function importComponent(filepath: string, name): void;
export function watch<T>(item: T, func: (value: T) => void): void;
