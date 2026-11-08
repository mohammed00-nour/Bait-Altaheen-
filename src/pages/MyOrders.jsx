import { useEffect, useState } from "react";
import { Link } from "react-router";
import { getMyOrders } from "../services/orderService";
import {
  ShoppingBag,
  RefreshCw,
  Package,
} from "lucide-react";

const statusLabels = {
  pending: "قيد الانتظار",
  confirmed: "تم تأكيد الطلب",
  preparing: "قيد التحضير",
  delivering: "قيد التوصيل",
  completed: "مكتمل",
  cancelled: "ملغي",
};

const formatPrice = (amount, currency = "USD") =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(Number(amount) || 0);

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadOrders() {
    try {
      setLoading(true);
      setError("");

      const result = await getMyOrders();
      setOrders(Array.isArray(result) ? result : []);
    } catch (err) {
      setError(err.message || "تعذّر تحميل طلباتك.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadOrders();
  }, []);

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-[var(--bg-primary)] px-4 py-10 md:px-8 md:py-14"
    >
      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-[var(--text-primary)]">
              طلباتي
            </h1>

            <p className="mt-3 text-[var(--text-secondary)]">
              تابع طلباتك وحالة تجهيزها من بيت الطحين.
            </p>
          </div>

          <button
            type="button"
            onClick={loadOrders}
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-xl border border-[var(--border)] px-4 py-3 text-sm font-semibold text-[var(--text-primary)] disabled:opacity-50"
          >
            <RefreshCw size={17} />
            تحديث الطلبات
          </button>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-12 text-center text-[var(--text-secondary)]">
            جارٍ تحميل طلباتك...
          </div>

        ) : error ? (

          /* Error */
          <div className="rounded-2xl border border-red-300 bg-[var(--bg-card)] p-8 text-center">
            <p className="text-red-500">{error}</p>

            <button
              type="button"
              onClick={loadOrders}
              className="mt-4 rounded-xl bg-[var(--secondary)] px-5 py-3 font-bold text-white"
            >
              إعادة المحاولة
            </button>
          </div>

        ) : orders.length === 0 ? (

          /* Empty */
          <div className="flex min-h-[350px] flex-col items-center justify-center rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-8 text-center">
            <ShoppingBag
              size={48}
              className="text-[var(--secondary)]"
            />

            <h2 className="mt-6 text-xl font-bold text-[var(--text-primary)]">
                لا توجد طلبات بعد
            </h2>

            <Link
              to="/products"
              className="mt-6 rounded-xl bg-[var(--secondary)] px-6 py-3 font-bold text-white"
            >
              تصفح المنتجات
            </Link>
          </div>

        ) : (

          /* Orders */
          <div className="flex flex-col gap-5">

            {orders.map((order) => {
              const orderStatus =
                order.status ||
                order.statusTest ||
                "pending";

              const orderType =
                order.orderType ||
                order.orderTypeTest;

              const items = Array.isArray(order.items)
                ? order.items
                : [];

              const productCount =
                order.productCount ??
                items.reduce(
                  (total, item) =>
                    total + Number(item.quantity || 0),
                  0
                );

              return (
                <article
                  key={order.$id}
                  className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-5 md:p-7"
                >

                  {/* Order Header */}
                  <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--border)] pb-5">

                    <div>
                      <p className="text-sm text-[var(--text-secondary)]">
                        رقم الطلب
                      </p>

                      <p className="mt-1 font-bold text-[var(--text-primary)]">
                        {order.$id}
                      </p>
                    </div>

                    <span className="rounded-full bg-[var(--bg-secondary)] px-4 py-2 text-sm font-bold text-[var(--secondary)]">
                      {statusLabels[orderStatus] || orderStatus}
                    </span>

                  </div>

                  {/* Order Information */}
                  <div className="mt-5 grid gap-4 sm:grid-cols-2">

                    <div>
                      <p className="text-sm text-[var(--text-secondary)]">
                        تاريخ الطلب
                      </p>

                      <p className="mt-1 font-semibold text-[var(--text-primary)]">
                        {order.$createdAt
                          ? new Date(order.$createdAt).toLocaleString("ar")
                          : "غير متوفر"}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-[var(--text-secondary)]">
                        طريقة الاستلام
                      </p>

                      <p className="mt-1 font-semibold text-[var(--text-primary)]">
                        {orderType === "delivery"
                          ? "توصيل"
                          : orderType === "pickup"
                            ? "استلام من الفرع"
                            : "غير محددة"}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-[var(--text-secondary)]">
                        إجمالي الطلب
                      </p>

                      <p className="mt-1 text-xl font-bold text-[var(--secondary)]">
                        {formatPrice(
                          order.total,
                          order.currencyCode
                        )}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-[var(--text-secondary)]">
                        عدد القطع
                      </p>

                      <p className="mt-1 font-semibold text-[var(--text-primary)]">
                        {productCount}
                      </p>
                    </div>

                  </div>

                  {/* Products */}
                  <div className="mt-6 border-t border-[var(--border)] pt-5">

                    <h3 className="mb-4 flex items-center gap-2 font-bold text-[var(--text-primary)]">
                      <Package size={19} />
                      المنتجات المطلوبة
                    </h3>

                    {items.length > 0 ? (

                      <div className="flex flex-col gap-3">

                        {items.map((item) => (
                          <div
                            key={item.$id}
                            className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-[var(--bg-secondary)] p-4"
                          >

                            <div>
                              <p className="font-semibold text-[var(--text-primary)]">
                                {item.productName || "منتج"}
                              </p>

                              <p className="mt-1 text-sm text-[var(--text-secondary)]">
                                الكمية: {item.quantity}
                              </p>
                            </div>

                            <p className="font-bold text-[var(--secondary)]">
                              {formatPrice(
                                item.lineTotal,
                                order.currencyCode
                              )}
                            </p>

                          </div>
                        ))}

                      </div>

                    ) : (

                      <p className="text-sm text-[var(--text-secondary)]">
                        لا توجد تفاصيل منتجات لهذا الطلب.
                      </p>

                    )}

                  </div>

                </article>
              );
            })}

          </div>
        )}
      </div>
    </main>
  );
}
