export type FilterFirstElement<T extends unknown[]> = T extends [unknown, ...(infer R)]
    ? R
    : [];

export type MayBe<T> = T | undefined