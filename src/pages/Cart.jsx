
import { Link, useNavigate  } from "react-router";

import { useState } from "react";

import { useCartStore, selectTotalQuantity, selectCartTotal } from "../stores/cartStore";

import ConfirmDialog from "../components/ui/ConfirmDialog";


import {
    ShoppingCart,
    Trash2,
    Plus,
    Minus,
    ArrowLeft,
    ArrowRight,
    ShoppingBag,
    Tag,
} from "lucide-react";

export default function Cart() {

    const cart = useCartStore((state) => state.cart);
    const onRemove = useCartStore((state) => state.removeFromCart);
    const onIncrease = useCartStore((state) => state.increaseQuantity);
    const onDecrease = useCartStore((state) => state.decreaseQuantity);
    const totalQuantity = useCartStore(selectTotalQuantity);
    const cartTotal = useCartStore(selectCartTotal);

    const navigate = useNavigate();

    const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const formatPrice = (amount, currency = "USD") =>
        new Intl.NumberFormat("en-US", {
            style: "currency",
            currency,
        }).format(Number(amount) || 0);

    return (
        <main
            dir="rtl"
            className="
                min-h-screen
                bg-[var(--bg-primary)]
                px-4 py-10
                md:px-8 md:py-14
            "
        >
            <div className="mx-auto max-w-7xl">

                {/* Page Heading */}
                <div className="mb-10">
                    <div className="mb-3 flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                        <Link to="/" className="hover:text-[var(--secondary)]">
                            الرئيسية
                        </Link>
                        <span>/</span>
                        <span>سلة المشتريات</span>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-[var(--text-primary)] md:text-4xl">
                                سلة المشتريات
                            </h1>

                            <p className="mt-3 text-sm text-[var(--text-secondary)] md:text-base">
                                اختياراتكم المفضلة أصبحت أقرب إلى مائدتكم.
                            </p>
                        </div>

                        <div className="
                            flex items-center gap-3
                            rounded-xl
                            border border-[var(--border)]
                            bg-[var(--bg-card)]
                            px-4 py-3
                        ">
                            <ShoppingBag
                                size={22}
                                className="text-[var(--secondary)]"
                            />

                            <span className="text-sm font-semibold text-[var(--text-primary)]">
                                {totalQuantity} قطعة
                            </span>
                        </div>
                    </div>
                </div>

                {/* Cart Content */}
                {cart.length === 0 ? (

                    /* Empty Cart */
                    <div className="
                        flex min-h-[420px]
                        flex-col items-center justify-center
                        rounded-3xl
                        border border-[var(--border)]
                        bg-[var(--bg-card)]
                        px-6 py-12
                        text-center
                    ">
                        <div className="
                            flex h-24 w-24
                            items-center justify-center
                            rounded-full
                            bg-[var(--bg-secondary)]
                            text-[var(--secondary)]
                        ">
                            <ShoppingCart size={42} strokeWidth={1.3} />
                        </div>

                        <h2 className="mt-7 text-2xl font-bold text-[var(--text-primary)]">
                            سلتك بانتظار اختياراتك
                        </h2>

                        <p className="mt-3 max-w-md text-sm leading-7 text-[var(--text-secondary)]">
                            يبدو أنك لم تضف أي منتجات بعد.
                            اكتشف تشكيلتنا من المخبوزات الطازجة.
                        </p>

                        <Link
                            to="/products"
                            className="
                                mt-8 inline-flex items-center gap-3
                                rounded-xl
                                bg-[var(--secondary)]
                                px-7 py-3
                                font-bold text-white
                                transition-all duration-300
                                hover:opacity-85
                            "
                        >
                            اكتشف منتجاتنا
                            <ArrowLeft size={18} />
                        </Link>
                    </div>

                ) : (

                    /* Cart Layout */
                    <div className="
                        grid grid-cols-1
                        gap-8
                        lg:grid-cols-[1fr_360px]
                        lg:items-start
                    ">

                        {/* Products */}
                        <section className="
                            rounded-2xl
                            border border-[var(--border)]
                            bg-[var(--bg-card)]
                            p-5 md:p-7
                        ">

                            <div className="
                                mb-7 flex items-center
                                justify-between
                                border-b border-[var(--border)]
                                pb-5
                            ">
                                <h2 className="text-xl font-bold text-[var(--text-primary)]">
                                    منتجاتك
                                </h2>

                                <span className="text-sm text-[var(--text-secondary)]">
                                    تفاصيل الطلب
                                </span>
                            </div>

                            <div className="flex flex-col gap-6">

                                {cart.map((product) => (
                                    <article
                                        key={product.$id}
                                        className="
                                            flex flex-col
                                            gap-4
                                            border-b border-[var(--border)]
                                            pb-6
                                            last:border-0
                                            last:pb-0
                                            sm:flex-row
                                            sm:items-center
                                        "
                                    >

                                        {/* Product Image */}
                                        <div className="
                                            h-32 w-full shrink-0
                                            overflow-hidden
                                            rounded-xl
                                            bg-[var(--bg-secondary)]
                                            sm:h-28 sm:w-32
                                        ">
                                            <img
                                                src={product.imageUrl}
                                                alt={product.name}
                                                className="
                                                    h-full w-full
                                                    object-cover
                                                "
                                            />
                                        </div>

                                        {/* Product Information */}
                                        <div className="
                                            flex flex-1
                                            flex-col
                                            justify-between
                                            gap-4
                                        ">

                                            <div className="
                                                flex items-start
                                                justify-between gap-3
                                            ">
                                                <div>
                                                    <h3 className="text-lg font-bold text-[var(--text-primary)]">
                                                        {product.name}
                                                    </h3>

                                                    <p className="mt-2 text-sm text-[var(--text-secondary)]">
                                                        {product.price} {product.currencyCode}
                                                    </p>
                                                </div>

                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setSelectedProduct(product);
                                                        setIsConfirmDialogOpen(true);
                                                    }}
                                                    aria-label="حذف المنتج"
                                                    className="
                                                        rounded-lg p-2
                                                        text-red-500
                                                        transition-colors
                                                        hover:bg-red-500/10
                                                    "
                                                >
                                                    <Trash2 size={19} />
                                                </button>
                                            </div>

                                            {/* Quantity & Price */}
                                            <div className="
                                                flex flex-wrap
                                                items-center
                                                justify-between
                                                gap-4
                                            ">

                                                {/* Quantity Controls */}
                                                <div className="
                                                    flex items-center gap-4
                                                    rounded-xl
                                                    border border-[var(--border)]
                                                    px-3 py-2
                                                ">
                                                    <button
                                                        type="button"
                                                        onClick={() => onIncrease?.(product.$id)}
                                                        aria-label="زيادة الكمية"
                                                        className="
                                                            text-[var(--text-primary)]
                                                            transition-colors
                                                            hover:text-[var(--secondary)]
                                                        "
                                                    >
                                                        <Plus size={17} />
                                                    </button>

                                                    <span className="
                                                        min-w-5 text-center
                                                        font-bold
                                                        tabular-nums
                                                        text-[var(--text-primary)]
                                                    ">
                                                        {product.quantity}
                                                    </span>

                                                    <button
                                                        type="button"
                                                        onClick={() => onDecrease?.(product.$id)}
                                                        aria-label="إنقاص الكمية"
                                                        className="
                                                            text-[var(--text-primary)]
                                                            transition-colors
                                                            hover:text-[var(--secondary)]
                                                        "
                                                    >
                                                        <Minus size={17} />
                                                    </button>
                                                </div>

                                                <span className="font-bold text-[var(--secondary)]">
                                                    {formatPrice(Number(product.price) * product.quantity, product.currencyCode)}
                                                </span>

                                            </div>
                                        </div>
                                    </article>
                                ))}

                            </div>

                            {/* Continue Shopping */}
                            <div className="
                                mt-7 border-t border-[var(--border)]
                                pt-6
                            ">
                                <Link
                                    to="/products"
                                    className="
                                        inline-flex items-center gap-2
                                        text-sm font-semibold
                                        text-[var(--text-secondary)]
                                        transition-colors
                                        hover:text-[var(--secondary)]
                                    "
                                >
                                    <ArrowRight size={17} />
                                    متابعة التسوق
                                </Link>
                            </div>
                        </section>

                        {/* Order Summary */}
                        <aside className="
                            sticky top-28
                            rounded-2xl
                            border border-[var(--border)]
                            bg-[var(--bg-card)]
                            p-6 md:p-7
                        ">

                            <h2 className="text-xl font-bold text-[var(--text-primary)]">
                                ملخص الطلب
                            </h2>

                            <div className="mt-7 flex flex-col gap-5">

                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-[var(--text-secondary)]">
                                        إجمالي القطع
                                    </span>

                                    <span className="font-semibold text-[var(--text-primary)]">
                                        {totalQuantity}
                                    </span>
                                </div>

                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-[var(--text-secondary)]">
                                        المجموع الفرعي
                                    </span>

                                    <span className="font-semibold text-[var(--text-primary)]">
                                        {cartTotal}
                                    </span>
                                </div>

                                <div className="border-t border-[var(--border)]" />

                                <div className="
                                    flex items-center
                                    justify-between gap-3
                                ">
                                    <span className="font-bold text-[var(--text-primary)]">
                                        الإجمالي
                                    </span>

                                    <span className="
                                        text-2xl font-bold
                                        text-[var(--secondary)]
                                    ">
                                        {formatPrice(cartTotal, cart[0]?.currencyCode)}
                                    </span>
                                </div>

                            </div>

                            {/* Promo Code Design */}
                            <div className="mt-7">
                                <label className="
                                    mb-3 block
                                    text-sm font-semibold
                                    text-[var(--text-primary)]
                                ">
                                    هل لديك كوبون خصم؟
                                </label>

                                <div className="
                                    flex items-center gap-2
                                    rounded-xl
                                    border border-[var(--border)]
                                    bg-[var(--bg-primary)]
                                    p-2
                                ">
                                    <Tag
                                        size={19}
                                        className="text-[var(--text-secondary)]"
                                    />

                                    <input
                                        type="text"
                                        placeholder="أدخل كود الخصم"
                                        className="
                                            min-w-0 flex-1
                                            bg-transparent
                                            px-2 py-2
                                            text-sm
                                            text-[var(--text-primary)]
                                            outline-none
                                        "
                                    />

                                    <button
                                        type="button"
                                        className="
                                            rounded-lg
                                            bg-[var(--bg-secondary)]
                                            px-4 py-2
                                            text-sm font-bold
                                            text-[var(--text-primary)]
                                        "
                                    >
                                        تطبيق
                                    </button>
                                </div>
                            </div>

                            {/* Checkout */}
                            <button
                                type="button"
                                onClick={() => navigate("/checkout")}
                                className="
                                    mt-7 flex w-full
                                    items-center justify-center
                                    gap-3
                                    rounded-xl
                                    bg-[var(--secondary)]
                                    px-5 py-4
                                    font-bold text-white
                                    transition-all duration-300
                                    hover:opacity-85
                                "
                            >
                                متابعة إتمام الطلب
                                <ArrowLeft size={19} />
                            </button>

                            <p className="
                                mt-5 text-center
                                text-xs leading-6
                                text-[var(--text-secondary)]
                            ">
                                شكراً لاختياركم بيت الطحين،
                                نتمنى لكم تجربة شهية.
                            </p>

                        </aside>
                    </div>
                )}
            </div>
            <ConfirmDialog
                isOpen={isConfirmDialogOpen}
                title="تأكيد الحذف"
                message={`هل أنت متأكد أنك تريد إزالة ${selectedProduct?.name ?? "هذا المنتج"} من سلة المشتريات؟`}
                confirmText="نعم، احذف"
                cancelText="إلغاء"
                onConfirm={() => {
                    if (selectedProduct) {
                        onRemove(selectedProduct.$id);
                    }

                    setIsConfirmDialogOpen(false);
                    setSelectedProduct(null);
                }}
                onCancel={() => {
                    setIsConfirmDialogOpen(false);
                    setSelectedProduct(null);
                }}
            />
        </main>
    );
}
