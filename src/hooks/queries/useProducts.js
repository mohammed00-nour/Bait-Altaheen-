import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../../services/productService.js";

export function useProducts(categoryId = null) {
    return useQuery({
        queryKey: ["products", categoryId ?? "all"],
        queryFn: () => getProducts(categoryId),
    });
}