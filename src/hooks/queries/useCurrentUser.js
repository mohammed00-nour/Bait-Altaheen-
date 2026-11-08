
import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/authService.js";

export const CURRENT_USER_KEY = ["auth", "current-user"];

export function useCurrentUser() {
    return useQuery({
        queryKey: CURRENT_USER_KEY,
        queryFn: getCurrentUser,
        retry: false,
        staleTime: 5 * 60 * 1000,
    });
}
