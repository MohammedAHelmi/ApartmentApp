function limitOffsetBuilder(paramsOffset: number, limit?: number, offset?: number): [string, number[]]{
    let statement = ``;
    const values: number[] = [];
    
    if(limit != null){
        statement = `LIMIT $${paramsOffset}`;
        values.push(limit);
    }
    
    if(offset != null){
        statement = `${statement} OFFSET $${paramsOffset+1}`;
        values.push(offset);
    }

    return [statement, values];
}

export default limitOffsetBuilder;