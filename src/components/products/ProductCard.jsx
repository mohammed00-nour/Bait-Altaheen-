
import { useState } from "react";
import { motion } from "motion/react";

import { ShoppingCart } from "lucide-react";

import { Button } from "../ui/Button";

//import for zustand
import { useCartStore } from "../../stores/cartStore";

export default function ProductCard({ product, index = 0 }) {
    const [imageError, setImageError] = useState(false);

    const formattedPrice = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: product.currencyCode || "USD",
    }).format(Number(product.price));

    const addToCart = useCartStore((state) => state.addToCart);

    return (
        <motion.article
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            whileHover={{ y: -7 }}
            transition={{
                duration: 0.55,
                delay: index * 0.08,
                ease: [0.22, 1, 0.36, 1],
            }}
            className="
                group
                overflow-hidden
                rounded-[24px]
                border border-[var(--border)]
                bg-[var(--bg-card)]
                shadow-[0_10px_30px_rgba(48,35,25,0.06)]
                transition-shadow duration-300
                hover:shadow-[0_20px_40px_rgba(48,35,25,0.13)]
            "
        >
            {/* Product Image */}
            <div className="
                relative
                aspect-[4/3]
                overflow-hidden
                bg-[var(--bg-primary)]
            ">

                {!imageError ? (
                    <motion.img
                        src={product.imageUrl}
                        alt={product.name}
                        loading="lazy"
                        decoding="async"
                        onError={() => setImageError(true)}
                        whileHover={{ scale: 1.1 }}
                        transition={{
                            duration: 0.6,
                            ease: "easeOut",
                        }}
                        className="
                            h-full w-full
                            object-cover
                        "
                    />
                ) : (
                    <div className="
                        flex h-full w-full
                        flex-col items-center justify-center
                        gap-2
                        text-[var(--text-secondary)]
                    ">
                        <span className="text-4xl">🥐</span>
                        <span className="text-xs">
                            الصورة غير متاحة
                        </span>
                    </div>
                )}

                {/* Featured Badge */}
                {product.isFeatured && (
                    <span className="
                        absolute top-4 right-4
                        rounded-full
                        bg-[var(--secondary)]
                        px-3 py-1.5
                        text-xs font-semibold
                        text-white
                        shadow-md
                    ">
                        اختيارنا المميز
                    </span>
                )}
            </div>

            {/* Product Information */}
            <div className="flex flex-col gap-3 p-5">

                <div className="flex items-start justify-between gap-3">

                    <h3 className="
                        text-lg font-bold
                        leading-8
                        text-[var(--text-primary)]
                        transition-colors duration-300
                        group-hover:text-[var(--secondary)]
                    ">
                        {product.name}
                    </h3>

                    <span className="
                        shrink-0
                        pt-1
                        text-sm font-bold
                        text-[var(--secondary)]
                        tabular-nums
                    ">
                        {formattedPrice}
                    </span>

                </div>

                <p className="
                    min-h-[52px]
                    line-clamp-2
                    text-sm
                    leading-7
                    text-[var(--text-secondary)]
                ">
                    {product.description || "محضّر بعناية من بيت الطحين."}
                </p>

                <div className="
                    mt-2
                    flex items-center justify-between
                    border-t border-[var(--border)]
                    pt-4
                ">

                    <span className="
                        text-xs
                        text-[var(--text-secondary)]
                    ">
                        مخبوز بعناية وحب
                    </span>

                    <Button className="
                        flex items-center gap-1
                        text-sm font-semibold
                        text-[var(--secondary)]
                        bg-[var(--bg-primary)]
                        px-3 py-1.5
                        rounded-full
                        transition-colors duration-300
                        hover:bg-[var(--secondary)]
                        hover:text-white
                        cursor-pointer
                    "
                        onClick={() => addToCart(product)}
                        type="button"
                    >
                        أضف إلى السلة
                        <ShoppingCart className="h-4 w-4" />
                    </Button>

                </div>

            </div>
        </motion.article>
    );
}
