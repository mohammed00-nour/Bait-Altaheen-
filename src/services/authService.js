import { account, ID } from "../lib/appwrite.js";

// Get current logged-in user
export async function getCurrentUser() {
    try {
        return await account.get();
    } catch (error) {
        if (error?.code === 401) {
            return null;
        }

        throw error;
    }
}

// Register new account
export async function registerUser({ name, email, password }) {
    await account.create({
        userId: ID.unique(),
        name,
        email,
        password,
    });

    await account.createEmailPasswordSession({
        email,
        password,
    });

    return await account.get();
}

// Login
export async function loginUser({ email, password }) {
    await account.createEmailPasswordSession({
        email,
        password,
    });

    return await account.get();
}

// Logout
export async function logoutUser() {
    await account.deleteSession({
        sessionId: "current",
    });
}
