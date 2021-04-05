export type reactive<T> = T;
export type prop<T> = T;
export type computed<T> = { (): T };
export function importComponent(filepath: string, name): void;
