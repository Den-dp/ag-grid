export type Comparator<T> = (a: T, b: T) => number;
export type LiteralOrFn<T> = T | (() => T);

export function ascendingStringNumberUndefined(
    a: number | string | undefined | null,
    b: number | string | undefined | null
): number {
    let diff = 0;
    if (typeof a === 'number' && typeof b === 'number') {
        diff = a - b;
    } else if (typeof a === 'string' && typeof b === 'string') {
        diff = a.localeCompare(b);
    } else if (a == null && b == null) {
        // Equal.
    } else if (a == null) {
        diff = -1;
    } else if (b == null) {
        diff = 1;
    } else {
        diff = String(a).localeCompare(String(b));
    }

    return diff;
}

export function compoundAscending<E>(a: LiteralOrFn<E>[], b: LiteralOrFn<E>[], comparator: Comparator<E>): number {
    const toLiteral = <T, F extends LiteralOrFn<T>>(v: F) => {
        if (typeof v === 'function') {
            return v();
        }
        return v;
    };
    for (const idx in a) {
        const diff = comparator(toLiteral(a[idx]), toLiteral(b[idx]));

        if (diff !== 0) {
            return diff;
        }
    }

    return 0;
}
