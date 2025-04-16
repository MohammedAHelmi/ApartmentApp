import { Sort } from "../../types/dal-options.types.js";

function orderByBuilder(sortOpts: Sort) : string{
    return `ORDER BY ${sortOpts.column} ${sortOpts.direction}`;
}

export default orderByBuilder;