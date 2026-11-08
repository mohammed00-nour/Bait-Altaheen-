import { useProducts } from '../../hooks/queries/useProducts'
import { useCategories } from '../../hooks/queries/useCategories'
import { useState } from 'react'

import ProductCard from '../products/ProductCard'

import { Button } from '../ui/Button';
import { Link } from 'react-router';

export default function ProductsSection() {

    const { data: products = [], isPending, isError, error, refetch, } = useProducts();
    const { data: categories = [] } = useCategories();

    const [filter, setFilter] = useState(null);
    const [showAll, setShowAll] = useState(false);
     
    //for filter by Category
    const filterProducts = products?.filter((product) => product.category === filter || filter === null).filter((product) => product.isAvailable);
    const visibleProducts = showAll
    ? filterProducts
    : filterProducts.slice(0, 8);

    if(window.innerWidth < 768 && !showAll){
        visibleProducts.splice(4);
    }

    return (
        <section dir='rtl' className="
            bg-[var(--bg-primary)]
            py-20 px-6
            transition-colors duration-300
        ">
            <div className="mx-auto max-w-[1280px]">

                {/* Section Heading */}
                <div className="
                    mb-12
                    flex flex-col items-center
                    text-center
                    gap-4
                ">

                    <span className="
                        text-sm font-semibold
                        tracking-[0.2em]
                        text-[var(--secondary)]
                    ">
                        FROM OUR BAKERY WITH LOVE
                    </span>

                    <h2 className="
                        text-3xl md:text-5xl
                        font-bold
                        text-[var(--text-primary)]
                    ">
                        نكهات تستحق التجربة
                    </h2>

                    <p className="
                        max-w-2xl
                        text-sm md:text-base
                        leading-8
                        text-[var(--text-secondary)]
                    ">
                        اخترنا لكم مجموعة من أشهى منتجاتنا،
                        نحضّرها يومياً بعناية لنقدم لكم
                        مذاقاً يحمل روح الأصالة.
                    </p>

                    <div className="
                        mt-2 h-[3px] w-16
                        rounded-full
                        bg-[var(--secondary)]
                    "/>

                </div>


                {/* Loading State */}
                {isPending && (
                    <div className="
                        grid grid-cols-1
                        sm:grid-cols-2
                        lg:grid-cols-4
                        gap-6
                    ">
                        {Array.from({ length: 4 }).map((_, index) => (
                            <div
                                key={index}
                                className="
                                    overflow-hidden
                                    rounded-[24px]
                                    border border-[var(--border)]
                                    bg-[var(--bg-card)]
                                    animate-pulse
                                "
                            >
                                <div className="
                                    aspect-[4/3]
                                    bg-[var(--border)]
                                "/>

                                <div className="space-y-4 p-5">
                                    <div className="
                                        h-5 w-3/4 rounded
                                        bg-[var(--border)]
                                    "/>

                                    <div className="
                                        h-4 w-full rounded
                                        bg-[var(--border)]
                                    "/>

                                    <div className="
                                        h-4 w-1/2 rounded
                                        bg-[var(--border)]
                                    "/>
                                </div>
                            </div>
                        ))}
                    </div>
                )}


                {/* Error State */}
                {isError && (
                    <div className="
                        flex flex-col items-center
                        gap-4 py-16 text-center
                    ">
                        <p className="text-red-500">
                            {error?.message || "تعذر تحميل المنتجات."}
                        </p>

                        <button
                            onClick={() => refetch()}
                            className="
                                rounded-xl
                                bg-[var(--secondary)]
                                px-6 py-3
                                font-semibold text-white
                            "
                        >
                            إعادة المحاولة
                        </button>
                    </div>
                )}
                <div className='flex gap-2 flex-wrap justify-start mb-8'>
                    {categories.map((category) => (
                        <Button key={category.$id} className="mb-8" onClick={() => {setFilter(category.$id); setShowAll(false)}}>
                            <span className={`
                            text-xl font-bold
                            text-[var(--text-primary)]
                            cursor-pointer
                            transition-colors duration-300
                            hover:text-[var(--text-secondary)]
                            bg-[var(--bg-card)]
                            px-4 py-2
                            rounded-full
                            ${filter === category.$id ? "bg-[var(--secondary)] text-[var(--text-primary)] " : ""}
                        `}>
                                {category.name}
                            </span>
                        </Button>
                    ))}
                </div>
                {/* Products Grid */}
                {!isPending && !isError && (
                    filterProducts.length > 0 ? (
                        <div className="
                            grid grid-cols-1
                            sm:grid-cols-2
                            lg:grid-cols-4
                            gap-6 lg:gap-7
                        ">
                            {visibleProducts
                                .map((product, index) => (
                                    <ProductCard
                                        key={product.$id}
                                        product={product}
                                        index={index}
                                    />
                                ))}
                        </div>
                    ) : (
                        <p className="
                            py-16 text-center
                            text-[var(--text-secondary)]
                        ">
                            لا توجد منتجات مميزة متاحة حالياً.
                        </p>
                    )
                )}
                <div className='text-center flex justify-center gap-2 items-center'>
                    <Button className="mb-8 mt-8 bg-[var(--bg-card)] text-[var(--text-primary)] px-6 py-2 rounded-lg text-xl font-bold cursor-pointer
                            transition-colors duration-300
                            hover:text-[var(--text-secondary)] " onClick={() => setShowAll(prev => !prev)}>
                        {"عرض " + (showAll ? " أقل" : "الكل")}
                    </Button>
                    <Link to="/products" className="mb-8 mt-8 bg-[var(--bg-card)] text-[var(--text-primary)] px-6 py-2 rounded-lg text-xl font-bold cursor-pointer
                            transition-colors duration-300
                            hover:text-[var(--text-secondary)] "
                        >
                        تصفح المنتجات
                    </Link>
                </div>
            </div>
        </section>
    )
}