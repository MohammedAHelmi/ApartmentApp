function whereBuilder(filters, paramsOffset = 1) {
    const conditions = [];
    const values = [];
    for (const filter of filters) {
        conditions.push(`${filter.column}::TEXT ${filter.comparator} $${paramsOffset++}`);
        values.push(filter.value);
    }
    const whereStatement = conditions.length === 0 ? '' : `WHERE ${conditions.join(' AND ')}`;
    return [whereStatement, values];
}
export default whereBuilder;
