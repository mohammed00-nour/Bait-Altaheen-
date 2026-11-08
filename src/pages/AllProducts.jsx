import { useProducts } from '../hooks/queries/useProducts.js';
import { useCategories } from '../hooks/queries/useCategories.js';

import ProductCard from '../components/products/ProductCard.jsx';
import { Button } from '../components/ui/Button.jsx';

import { useState } from 'react';

export default function AllProducts() {
    const [filter, setFilter] = useState(null);
    const { data: productsData, isPending, isError, error, refetch } = useProducts();
    const { data: categoriesData } = useCategories();

    const filteredProducts = (
        Array.isArray(productsData) ? productsData : []
    ).filter((product) => {
        return filter === null || product.category === filter;
    });

    const categories = Array.isArray(categoriesData)
        ? categoriesData
        : [];




    // Loading State
    if (isPending) {
        return (
            <main className="min-h-screen bg-[var(--bg-primary)] px-6 py-12">
                <div className="mx-auto max-w-7xl">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {Array.from({ length: 8 }).map((_, index) => (
                            <div
                                key={index}
                                className="overflow-hidden rounded-[24px] border border-[var(--border)] bg-[var(--bg-card)] animate-pulse"
                            >
                                <div className="aspect-[4/3] bg-[var(--border)]" />
                                <div className="space-y-4 p-5">
                                    <div className="h-5 w-3/4 rounded bg-[var(--border)]" />
                                    <div className="h-4 w-full rounded bg-[var(--border)]" />
                                    <div className="h-4 w-1/2 rounded bg-[var(--border)]" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        );
    }

    // Error State
    if (isError) {
        return (
            <main className="min-h-screen bg-[var(--bg-primary)] flex flex-col items-center justify-center gap-4 p-6 ">
                <p className="text-red-500">
                    {error?.message || "تعذر تحميل المنتجات."}
                </p>

                <button
                    type="button"
                    onClick={() => refetch()}
                    className="rounded-xl bg-[var(--secondary)] px-6 py-3 font-semibold text-white"
                >
                    إعادة المحاولة
                </button>
            </main>
        );
    }
    return (
        <main className="flex-1 bg-[var(--bg-primary)] flex flex-col items-center justify-center gap-6 py-20 px-6">
            <div className="flex flex-col gap-4 text-center">
                <p className="text-sm text-[var(--text-secondary)]">
                    المخبوزات التي نحبها
                </p>
                <h1 className="text-5xl font-bold text-[var(--text-primary)]">
                    قائمة الطعام
                </h1>
                <p className="text-sm text-[var(--text-secondary)]">
                    نخبز يوميًا بعناية لتختار من أجمل المخبوزات والحلويات الطازجة.
                </p>
            </div>
            <div className="flex flex-col items-center justify-center gap-4 w-full my-4 ">
                <div className="flex flex-col justify-center gap-4 bg-[var(--bg-secondary)] border-1 rounded-lg border-[var(--border)] w-full max-w-[1280px] p-4">
                    <div className='flex justify-between items-center'>
                        <p className='text-[var(--text-secondary)] font-bold'>تصفية المنتجات</p>
                        <p className='py-2 px-4 border-1 rounded-3xl border-[var(--border)] bg-[var(--bg-primary)]'>عدد المنتجات : {filteredProducts.length} </p>
                    </div>
                    <div className='flex gap-4 text-center items-center justify-evenly md:justify-center flex-wrap'>

                        <Button
                            onClick={() => setFilter(null)}
                            className={`text-xl font-bold
                            text-[var(--text-primary)]
                            cursor-pointer
                            transition-colors duration-300
                            hover:text-[var(--text-secondary)]
                            bg-[var(--bg-card)]
                            px-4 py-2
                            rounded-full
                            ${filter === null ? "bg-[var(--secondary)] text-[var(--text-primary)] " : ""}`}
                        >
                            الكل
                        </Button>
                        {categories?.map((category) => (
                            <Button
                                key={category.$id}
                                onClick={() => setFilter(category.$id)}
                                className={`text-xl font-bold
                                text-[var(--text-primary)]
                                cursor-pointer
                                transition-colors duration-300
                                hover:text-[var(--text-secondary)]
                                bg-[var(--bg-card)]
                                px-4 py-2
                                rounded-full
                                ${filter === category.$id ? "bg-[var(--secondary)] text-[var(--text-primary)] " : ""}`}
                            >
                                {category.name}
                            </Button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="w-[100%] max-w-[1280px] mx-auto">
                {/* Products Grid */}
                <div className="
                    grid grid-cols-1 mx-auto ">
                    {filteredProducts.length > 0 ? (
                        <div className="
                                grid grid-cols-1
                                sm:grid-cols-2
                                lg:grid-cols-4
                                gap-6 lg:gap-7
                            ">
                            {filteredProducts
                                .map((product, index) => (
                                    <ProductCard key={product.$id} product={product} index={index} />
                                ))}
                        </div>
                    ) : (
                        <p className="text-center text-[var(--text-secondary)] py-16">
                            لا توجد منتجات متاحة حالًا.
                        </p>
                    )}
                </div>
            </div>
        </main>
    )
}