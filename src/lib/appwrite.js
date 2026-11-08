
import {
  Client,
  TablesDB,
  Account,
  ID,
  Functions
} from "appwrite";

const client = new Client()
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

export const account = new Account(client);
export const tablesDB = new TablesDB(client);
export const functions = new Functions(client);

export const DATABASE_ID =
  import.meta.env.VITE_APPWRITE_DATABASE_ID;

export const CREATE_ORDER_FUNCTION_ID = "create-order";

export { ID };
