export type Pagination = {
    number: number,
    pages: number,
    size: number,
    total: number,
};

export type Result<Data> = {
    data: Data | [],
    meta: {
        pagination: Pagination,
    } | null,
    error: {
        name: string,
        level: string,
        status: number
    } | null,
}

export type Meta = {
    pagination : Pagination,
};

export type Error = {
    name: string,
    status: number,
    level: string,
}
