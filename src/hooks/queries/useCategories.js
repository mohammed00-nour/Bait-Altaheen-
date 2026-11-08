import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../../services/categoryService.js";

export function useCategories() {
    return useQuery({
        queryKey: ["categories"],
        queryFn: getCategories,
    });
}