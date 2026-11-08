
import { Link, useNavigate } from "react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Wheat, Mail, Lock, ArrowLeft } from "lucide-react";

import { loginUser } from "../../services/authService";
import { CURRENT_USER_KEY } from "../../hooks/queries/useCurrentUser";

export default function Login() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const loginMutation = useMutation({
        mutationFn: loginUser,

        onSuccess: (user) => {
            queryClient.setQueryData(CURRENT_USER_KEY, user);

            navigate("/");
        },
    });

    function handleSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        const email = formData.get("email").trim();
        const password = formData.get("password");

        loginMutation.mutate({
            email,
            password,
        });
    }

    return (
        <main
            dir="rtl"
            className="
                min-h-screen
                flex items-center justify-center
                bg-[var(--bg-primary)]
                px-4 py-10
            "
        >
            <div
                className="
                    grid w-full max-w-5xl
                    overflow-hidden
                    rounded-3xl
                    border border-[var(--border)]
                    bg-[var(--bg-card)]
                    shadow-2xl
                    md:grid-cols-2
                "
            >

                {/* Brand Section */}
                <div
                    className="
                        relative hidden
                        flex-col items-center justify-center
                        overflow-hidden
                        bg-gradient-to-br
                        from-[var(--brand-gradient-from)]
                        via-[var(--brand-gradient-via)]
                        to-[var(--brand-gradient-to)]
                        p-12
                        text-center
                        md:flex
                    "
                >
                    <div
                        className="
                            absolute -left-20 -top-20
                            h-64 w-64
                            rounded-full
                            border border-[var(--border)]
                        "
                    />

                    <div
                        className="
                            absolute -bottom-24 -right-16
                            h-72 w-72
                            rounded-full
                            border border-[var(--border)]
                        "
                    />

                    <div
                        className="
                            relative z-10
                            flex h-20 w-20
                            items-center justify-center
                            rounded-full
                            border border-[var(--border)]/50
                            bg-[var(--bg-card)]/40
                            text-[var(--text)]
                        "
                    >
                        <Wheat size={42} strokeWidth={1.3} />
                    </div>

                    <h1
                        className="
                            relative z-10
                            mt-7
                            text-3xl font-bold
                            text-[var(--text-primary)]
                        "
                    >
                        بيت الطحين
                    </h1>

                    <p
                        className="
                            relative z-10
                            mt-5 max-w-sm
                            text-sm leading-8
                            text-[var(--text-secondary)]
                        "
                    >
                        يسعدنا عودتك إلى بيت الطحين.
                        اكتشف مخبوزاتنا واستمتع بتجربة
                        تجمع بين الأصالة والمذاق المميز.
                    </p>

                    <div
                        className="
                            relative z-10
                            mt-10 h-px w-20
                            bg-[var(--accent)]
                        "
                    />

                    <span
                        className="
                            relative z-10
                            mt-5 text-xs
                            tracking-widest
                            text-[var(--text-secondary)]
                        "
                    >
                        BAKED WITH LOVE
                    </span>
                </div>

                {/* Login Form */}
                <div className="p-6 sm:p-10 md:p-12">

                    {/* Mobile Brand */}
                    <div
                        className="
                            mb-8 flex flex-col items-center
                            md:hidden
                        "
                    >
                        <Wheat
                            size={38}
                            className="text-[var(--accent)]"
                        />

                        <h2
                            className="
                                mt-2 text-xl font-bold
                                text-[var(--text-primary)]
                            "
                        >
                            بيت الطحين
                        </h2>
                    </div>

                    {/* Heading */}
                    <div className="mb-10">

                        <span
                            className="
                                text-xs font-semibold
                                tracking-widest
                                text-[var(--accent)]
                            "
                        >
                            WELCOME BACK
                        </span>

                        <h2
                            className="
                                mt-3 text-3xl
                                font-bold
                                text-[var(--text-primary)]
                            "
                        >
                            أهلاً بعودتك
                        </h2>

                        <p
                            className="
                                mt-3 text-sm
                                leading-7
                                text-[var(--text-secondary)]
                            "
                        >
                            سجّل دخولك لمتابعة تجربتك في بيت الطحين.
                        </p>

                    </div>

                    {/* Login Form */}
                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col gap-6"
                    >

                        {/* Email */}
                        <div>

                            <label
                                className="
                                    mb-2 block
                                    text-sm font-semibold
                                    text-[var(--text-secondary)]
                                "
                            >
                                البريد الإلكتروني
                            </label>

                            <div
                                className="
                                    flex items-center gap-3
                                    rounded-xl
                                    border border-[var(--border)]
                                    bg-[var(--bg-card)]
                                    px-4 py-3
                                    transition-colors
                                    focus-within:border-[var(--accent)]
                                "
                            >
                                <Mail
                                    size={19}
                                    className="text-[var(--text-secondary)]"
                                />

                                <input
                                    type="email"
                                    name="email"
                                    autoComplete="email"
                                    placeholder="example@email.com"
                                    required
                                    className="
                                        w-full bg-transparent
                                        text-sm text-[var(--text-primary)]
                                        outline-none
                                        placeholder:text-[var(--text-secondary)]
                                    "
                                />

                            </div>
                        </div>

                        {/* Password */}
                        <div>

                            <label
                                className="
                                    mb-2 block
                                    text-sm font-semibold
                                    text-[var(--text-secondary)]
                                "
                            >
                                كلمة المرور
                            </label>

                            <div
                                className="
                                    flex items-center gap-3
                                    rounded-xl
                                    border border-[var(--border)]
                                    bg-[var(--bg-card)]
                                    px-4 py-3
                                    transition-colors
                                    focus-within:border-[var(--accent)]
                                "
                            >
                                <Lock
                                    size={19}
                                    className="text-[var(--text-secondary)]"
                                />

                                <input
                                    type="password"
                                    name="password"
                                    autoComplete="current-password"
                                    placeholder="أدخل كلمة المرور"
                                    required
                                    className="
                                        w-full bg-transparent
                                        text-sm text-[var(--text-primary)]
                                        outline-none
                                        placeholder:text-[var(--text-secondary)]
                                    "
                                />

                            </div>
                        </div>

                        {/* Remember Me */}
                        <div
                            className="
                                flex items-center justify-between gap-3
                            "
                        >
                            <label
                                className="
                                    flex items-center gap-2
                                    text-xs text-[var(--text-secondary)]
                                "
                            >
                                <input
                                    type="checkbox"
                                    className="accent-[var(--accent)]"
                                />

                                تذكرني
                            </label>

                            <span
                                className="
                                    text-xs text-[var(--text-secondary)]
                                "
                            >
                                استعادة كلمة المرور لاحقاً
                            </span>
                        </div>

                        {/* Error Message */}
                        {loginMutation.isError && (
                            <p
                                role="alert"
                                className="text-sm leading-6 text-red-500"
                            >
                                {loginMutation.error?.code === 401
                                    ? "البريد الإلكتروني أو كلمة المرور غير صحيحة"
                                    : loginMutation.error?.message ||
                                      "حدث خطأ أثناء تسجيل الدخول"}
                            </p>
                        )}

                        {/* Login Button */}
                        <button
                            type="submit"
                            disabled={loginMutation.isPending}
                            className="
                                mt-2 flex w-full
                                items-center justify-center gap-3
                                rounded-xl
                                bg-[var(--accent)]
                                px-5 py-3.5
                                font-bold text-white
                                transition-all duration-300
                                hover:bg-[var(--accent-hover)]
                                hover:shadow-lg
                                disabled:cursor-not-allowed
                                disabled:opacity-60
                            "
                        >
                            {loginMutation.isPending
                                ? "جاري تسجيل الدخول..."
                                : "تسجيل الدخول"
                            }

                            {!loginMutation.isPending && (
                                <ArrowLeft size={19} />
                            )}

                        </button>

                    </form>

                    {/* Register Link */}
                    <div
                        className="
                            mt-10 border-t border-[var(--border)]
                            pt-6 text-center
                        "
                    >
                        <p className="text-sm text-[var(--text-secondary)]">
                            ليس لديك حساب؟

                            <Link
                                to="/register"
                                className="
                                    mr-2 font-bold
                                    text-[var(--accent)]
                                    hover:underline
                                "
                            >
                                أنشئ حساباً
                            </Link>

                        </p>
                    </div>

                </div>
            </div>
        </main>
    );
}
