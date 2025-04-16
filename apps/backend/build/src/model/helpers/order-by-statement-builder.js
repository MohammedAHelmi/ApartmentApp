function orderByBuilder(sortOpts) {
    return `ORDER BY ${sortOpts.column} ${sortOpts.direction}`;
}
export default orderByBuilder;
