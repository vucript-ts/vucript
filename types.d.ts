export type reactive<T> = T;
export type prop<T> = T;
export type computed<T> = { (): T };
export function importComponent(filepath: string, name: string): void;
export function watch<T>(
    item: T,
    func: (after: T, before: T) => void
): () => void;
