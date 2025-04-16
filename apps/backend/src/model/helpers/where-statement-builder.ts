import { Filter } from "../../types/dal-options.types.js";

function whereBuilder(filters: Filter[], paramsOffset: number = 1): [string, any[]]{
    const conditions: string[] = [];
    const values: any[] = [];
    
    for(const filter of filters){
        conditions.push(`${filter.column} ${filter.comparator} $${paramsOffset++}`);
        values.push(filter.value);
    }

    const whereStatement = conditions.length === 0? '': `WHERE ${conditions.join(' AND ')}` 
    
    return [whereStatement, values];
}

export default whereBuilder;