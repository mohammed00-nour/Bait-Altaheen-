import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create(
    persist(
        (set) => ({
            cart: [],

            addToCart: (product) =>
                set((state) => {
                    if (product.isAvailable === false) {
                        return state;
                    }
                    const existingProduct = state.cart.find(
                        (item) => item.$id === product.$id
                    );

                    if (existingProduct) {
                        return {
                            cart: state.cart.map((item) =>
                                item.$id === product.$id
                                    ? { ...item, quantity: item.quantity + 1 }
                                    : item
                            ),
                        };
                    }

                    return {
                        cart: [
                            ...state.cart,
                            { ...product, quantity: 1 },
                        ],
                    };
                }),

            removeFromCart: (productId) => {
                set((state) => ({
                    cart: state.cart.filter((item) => item.$id !== productId),
                }));
            },

            increaseQuantity: (productId) => {
                set((state) => ({
                    cart: state.cart.map((item) =>
                        item.$id === productId
                            ? { ...item, quantity: item.quantity + 1 }
                            : item
                    ),
                }));
            },
            decreaseQuantity: (productId) => {
                set((state) => ({
                    cart: state.cart.map((item) =>
                        item.$id === productId && item.quantity > 1
                            ? { ...item, quantity: item.quantity - 1 }
                            : item
                    ),
                }));
            },
            clearCart: () => set({ cart: [] }),

        }),
        {
            name: "bait-altaheen-cart",
            partialize: (state) => ({
                cart: state.cart,
            }),
        }
    ));
export const selectTotalQuantity = (state) =>
    state.cart.reduce(
        (total, item) => total + item.quantity,
        0
    );

export const selectCartTotal = (state) =>
    state.cart.reduce(
        (total, item) =>
            total + Math.round(item.price * 100) * item.quantity,
        0
    ) / 100;