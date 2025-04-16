function limitOffsetBuilder(paramsOffset, limit, offset) {
    let statement = ``;
    const values = [];
    if (limit != null) {
        statement = `LIMIT $${paramsOffset}`;
        values.push(limit);
    }
    if (offset != null) {
        statement = `${statement} OFFSET $${paramsOffset + 1}`;
        values.push(offset);
    }
    return [statement, values];
}
export default limitOffsetBuilder;
