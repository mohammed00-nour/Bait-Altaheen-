
import { Link, useLocation } from "react-router";
import { CheckCircle2, ClipboardList, Home } from "lucide-react";

export default function OrderSuccess() {
  const location = useLocation();
  const orderId = location.state?.orderId;

  return (
    <main
      dir="rtl"
      className="flex min-h-screen items-center justify-center bg-[var(--bg-primary)] px-4 py-10"
    >
      <section className="w-full max-w-xl rounded-3xl border border-[var(--border)] bg-[var(--bg-card)] p-7 text-center shadow-sm md:p-10">
        <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-green-100">
          <CheckCircle2 size={58} className="text-green-600" />
        </div>

        <h1 className="text-3xl font-bold text-[var(--text-primary)]">
          تم استلام طلبك بنجاح!
        </h1>

        <p className="mt-4 leading-8 text-[var(--text-secondary)]">
          شكراً لثقتك ببيت الطحين ❤️
          <br />
          وصلنا طلبك، ويمكنك متابعة حالته من صفحة طلباتي.
        </p>

        {orderId && (
          <div className="mt-7 rounded-2xl border border-[var(--border)] bg-[var(--bg-primary)] p-4">
            <p className="text-sm text-[var(--text-secondary)]">
              رقم الطلب
            </p>
            <p className="mt-2 break-all font-bold text-[var(--text-primary)]">
              {orderId}
            </p>
          </div>
        )}

        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          <Link
            to="/my-orders"
            className="flex items-center justify-center gap-2 rounded-xl bg-[var(--secondary)] px-5 py-4 font-bold text-white transition-opacity hover:opacity-85"
          >
            <ClipboardList size={19} />
            عرض طلباتي
          </Link>

          <Link
            to="/"
            className="flex items-center justify-center gap-2 rounded-xl border border-[var(--border)] px-5 py-4 font-bold text-[var(--text-primary)] transition-colors hover:bg-[var(--bg-primary)]"
          >
            <Home size={19} />
            العودة للرئيسية
          </Link>
        </div>
      </section>
    </main>
  );
}
