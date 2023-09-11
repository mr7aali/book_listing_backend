import { PrismaClient } from "@prisma/client";
import app from "./app";



const prisma = new PrismaClient();

async function main() {
    const port = 5000 || process.env.PORT;
    app.listen(port, () => {
        console.log(`Server is runing at ${port}`);
    })
};
main();