import build from "./app.js";
import dotenv from 'dotenv';

dotenv.config();

const app = await build({
    logger: {
        level: 'warn',
    }
});

const host = process.env.HOST;
const port = Number(process.env.PORT);
app.listen({ host, port }, (err, address) =>{
    if(err)
        throw err;

    console.log(`server is listening on ${address}`);
});