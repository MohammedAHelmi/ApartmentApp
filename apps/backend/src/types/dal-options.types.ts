export interface DALOptions {
    filters?: Filter[],
    sort?: Sort,
    limit?: number,
    offset?: number
}

export interface Sort {
    column: string,
    direction: "asc" | "desc"
}

export interface Filter {
    column: string,
    comparator: Comparator,
    value: any
}

export enum Comparator {
    eq = "=",
    ltEq = "<=",
    gtEq = ">=",
    lk = "ILIKE"
}