
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { ArrowRight, ShoppingBag, CheckCircle2 } from "lucide-react";
import { createOrder } from "../services/orderService.js";
import {
    useCartStore,
    selectCartTotal,
} from "../stores/cartStore.js";

export default function Checkout() {
    const navigate = useNavigate();

    const cart = useCartStore((state) => state.cart);
    const clearCart = useCartStore((state) => state.clearCart);
    const total = useCartStore(selectCartTotal);

    const [form, setForm] = useState({
        customerName: "",
        phone: "",
        orderType: "delivery",
        address: "",
        notes: "",
    });

    const [step, setStep] = useState("form");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (event) => {
        const { name, value } = event.target;

        setForm((current) => ({
            ...current,
            [name]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setError("");

        if (cart.length === 0) {
            setError("السلة فارغة. أضف منتجات أولاً.");
            return;
        }

        setStep("review");
    };

    const handleConfirmOrder = async () => {
        if (isSubmitting || cart.length === 0) return;

        setIsSubmitting(true);
        setError("");

        try {
            const orderData = {
                ...form,
                orderType: form.orderType === "pickup" ? "pickup" : "delivery",
                items: cart.map((item) => ({
                    productId: item.$id,
                    quantity: item.quantity,
                })),
            };

            const result = await createOrder(orderData);

            const orderId =
                result.orderId ||
                result.order?.$id ||
                result.$id ||
                null;

            clearCart();

            navigate("/order-success", {
                state: { orderId },
            });
        } catch (err) {
            console.error("Create order error:", err);
            setError(
                err?.message || "تعذّر إنشاء الطلب. يرجى المحاولة مرة أخرى."
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    if (cart.length === 0 && step === "form") {
        return (
            <main dir="rtl" className="flex min-h-screen items-center justify-center bg-[var(--bg-primary)] px-4 py-10">
                <section className="w-full max-w-xl rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-8 text-center">
                    <ShoppingBag className="mx-auto mb-4 text-[var(--secondary)]" size={42} />
                    <h1 className="text-2xl font-bold text-[var(--text-primary)]">
                        سلتك فارغة
                    </h1>
                    <p className="mt-3 text-[var(--text-secondary)]">
                        أضف منتجات أولاً حتى تتمكن من إتمام الطلب.
                    </p>
                    <Link
                        to="/products"
                        className="mt-6 inline-block rounded-xl bg-[var(--secondary)] px-6 py-3 font-bold text-white"
                    >
                        تصفح المنتجات
                    </Link>
                </section>
            </main>
        );
    }

    return (
        <main dir="rtl" className="min-h-screen bg-[var(--bg-primary)] px-4 py-10 md:px-8 md:py-14">
            <div className="mx-auto max-w-4xl">
                <Link
                    to="/cart"
                    className="inline-flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--secondary)]"
                >
                    <ArrowRight size={17} />
                    العودة إلى السلة
                </Link>

                <h1 className="mt-6 text-3xl font-bold text-[var(--text-primary)]">
                    {step === "form" ? "إتمام الطلب" : "مراجعة الطلب"}
                </h1>

                <p className="mt-3 text-[var(--text-secondary)]">
                    {step === "form"
                        ? "أدخل بياناتك لنجهّز طلبك من بيت الطحين."
                        : "راجع بياناتك والمنتجات قبل تأكيد الطلب."}
                </p>

                {error && (
                    <div role="alert" className="mt-6 rounded-xl border border-red-300 bg-red-50 p-4 text-red-700">
                        {error}
                    </div>
                )}

                {step === "form" ? (
                    <form
                        onSubmit={handleSubmit}
                        className="mt-8 rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-5 md:p-8"
                    >
                        <div className="mb-7 flex items-center gap-3">
                            <ShoppingBag className="text-[var(--secondary)]" size={23} />
                            <h2 className="text-xl font-bold text-[var(--text-primary)]">
                                بيانات الطلب
                            </h2>
                        </div>

                        <div className="grid gap-6 md:grid-cols-2">
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-[var(--text-primary)]">
                                    الاسم الكامل
                                </label>
                                <input
                                    name="customerName"
                                    value={form.customerName}
                                    onChange={handleChange}
                                    required
                                    maxLength={150}
                                    autoComplete="name"
                                    placeholder="أدخل اسمك الكامل"
                                    className="w-full rounded-xl border border-[var(--border)] bg-[var(--bg-primary)] p-3 text-[var(--text-primary)] outline-none focus:border-[var(--secondary)]"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-semibold text-[var(--text-primary)]">
                                    رقم الهاتف
                                </label>
                                <input
                                    name="phone"
                                    type="tel"
                                    value={form.phone}
                                    onChange={handleChange}
                                    required
                                    maxLength={30}
                                    autoComplete="tel"
                                    placeholder="أدخل رقم هاتفك"
                                    className="w-full rounded-xl border border-[var(--border)] bg-[var(--bg-primary)] p-3 text-[var(--text-primary)] outline-none focus:border-[var(--secondary)]"
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="mb-2 block text-sm font-semibold text-[var(--text-primary)]">
                                    طريقة استلام الطلب
                                </label>

                                <div className="grid grid-cols-2 gap-3">
                                    <label className="flex cursor-pointer items-center gap-2 rounded-xl border border-[var(--border)] p-4 text-[var(--text-primary)]">
                                        <input
                                            type="radio"
                                            name="orderType"
                                            value="delivery"
                                            checked={form.orderType === "delivery"}
                                            onChange={handleChange}
                                        />
                                        توصيل
                                    </label>

                                    <label className="flex cursor-pointer items-center gap-2 rounded-xl border border-[var(--border)] p-4 text-[var(--text-primary)]">
                                        <input
                                            type="radio"
                                            name="orderType"
                                            value="pickup"
                                            checked={form.orderType === "pickup"}
                                            onChange={handleChange}
                                        />
                                        استلام من الفرع
                                    </label>
                                </div>
                            </div>

                            {form.orderType === "delivery" && (
                                <div className="md:col-span-2">
                                    <label className="mb-2 block text-sm font-semibold text-[var(--text-primary)]">
                                        عنوان التوصيل
                                    </label>
                                    <textarea
                                        name="address"
                                        value={form.address}
                                        onChange={handleChange}
                                        required
                                        rows={3}
                                        placeholder="أدخل عنوان التوصيل بالتفصيل"
                                        className="w-full rounded-xl border border-[var(--border)] bg-[var(--bg-primary)] p-3 text-[var(--text-primary)] outline-none focus:border-[var(--secondary)]"
                                    />
                                </div>
                            )}

                            <div className="md:col-span-2">
                                <label className="mb-2 block text-sm font-semibold text-[var(--text-primary)]">
                                    ملاحظات إضافية (اختياري)
                                </label>
                                <textarea
                                    name="notes"
                                    value={form.notes}
                                    onChange={handleChange}
                                    rows={3}
                                    placeholder="أي تفاصيل إضافية حول طلبك..."
                                    className="w-full rounded-xl border border-[var(--border)] bg-[var(--bg-primary)] p-3 text-[var(--text-primary)] outline-none focus:border-[var(--secondary)]"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="mt-8 w-full rounded-xl bg-[var(--secondary)] px-5 py-4 font-bold text-white transition-opacity hover:opacity-85"
                        >
                            مراجعة الطلب
                        </button>
                    </form>
                ) : (
                    <section className="mt-8 rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-5 md:p-8">
                        <div className="mb-6 flex items-center gap-3">
                            <CheckCircle2 className="text-[var(--secondary)]" size={24} />
                            <h2 className="text-xl font-bold text-[var(--text-primary)]">
                                ملخص الطلب
                            </h2>
                        </div>

                        <div className="space-y-3 text-[var(--text-primary)]">
                            <p><strong>الاسم:</strong> {form.customerName}</p>
                            <p><strong>الهاتف:</strong> {form.phone}</p>
                            <p>
                                <strong>طريقة الاستلام:</strong>{" "}
                                {form.orderType === "delivery" ? "توصيل" : "استلام من الفرع"}
                            </p>
                            {form.orderType === "delivery" && (
                                <p><strong>العنوان:</strong> {form.address}</p>
                            )}
                            {form.notes && <p><strong>ملاحظات:</strong> {form.notes}</p>}
                        </div>

                        <div className="my-6 border-t border-[var(--border)] pt-5">
                            <h3 className="mb-4 font-bold text-[var(--text-primary)]">
                                المنتجات
                            </h3>

                            <div className="space-y-3">
                                {cart.map((item) => (
                                    <div
                                        key={item.$id}
                                        className="flex justify-between gap-4 text-sm text-[var(--text-primary)]"
                                    >
                                        <span>{item.name} × {item.quantity}</span>
                                        <span>{(item.price * item.quantity).toFixed(2)}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-5 flex justify-between border-t border-[var(--border)] pt-4 text-lg font-bold text-[var(--text-primary)]">
                                <span>الإجمالي التقريبي</span>
                                <span>{total.toFixed(2)}</span>
                            </div>
                        </div>

                        <div className="mt-7 grid gap-3 sm:grid-cols-2">
                            <button
                                type="button"
                                onClick={() => {
                                    setError("");
                                    setStep("form");
                                }}
                                disabled={isSubmitting}
                                className="rounded-xl border border-[var(--border)] px-5 py-4 font-bold text-[var(--text-primary)] disabled:opacity-50"
                            >
                                تعديل البيانات
                            </button>

                            <button
                                type="button"
                                onClick={handleConfirmOrder}
                                disabled={isSubmitting}
                                className="rounded-xl bg-[var(--secondary)] px-5 py-4 font-bold text-white disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {isSubmitting ? "جارٍ إرسال الطلب..." : "تأكيد الطلب النهائي"}
                            </button>
                        </div>
                    </section>
                )}
            </div>
        </main>
    );
}
