
import { Query } from "appwrite";

import {
    tablesDB,
    DATABASE_ID,
} from "../lib/appwrite.js";

const CATEGORIES_TABLE_ID = "categories";

export async function getCategories() {
    try {
        const response = await tablesDB.listRows({
            databaseId: DATABASE_ID,
            tableId: CATEGORIES_TABLE_ID,
            queries: [
                Query.limit(100),
            ],
        });

        // Return active categories only
        return response.rows.filter(
            (category) => category.isActive
        );

    } catch (error) {
        console.error("Error fetching categories:", error);
        throw error;
    }
}
