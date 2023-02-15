import client from "./config";

async function connectDatabase(): Promise<void> {
    await client.connect();
    console.log("Database connected!");
}

export default connectDatabase;