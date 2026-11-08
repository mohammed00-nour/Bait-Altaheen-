import { Query } from "appwrite";
import { tablesDB, DATABASE_ID } from "../lib/appwrite.js";

const PRODUCTS_TABLE_ID = "products";

export async function getProducts(categoryId = null) {
    try {
        
        const queries = [
            Query.limit(100),
        ];

        if (categoryId) {
            queries.push(
                Query.equal("category", [categoryId])
            );
        }

        const response = await tablesDB.listRows({
            databaseId: DATABASE_ID,
            tableId: PRODUCTS_TABLE_ID,
            queries,
        });

        return response.rows;

    } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
    }
}