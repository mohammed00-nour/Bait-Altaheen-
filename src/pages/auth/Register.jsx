import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
    Wheat,
    User,
    Mail,
    Lock,
    ArrowLeft,
} from "lucide-react";

import { registerUser } from "../../services/authService";
import { CURRENT_USER_KEY } from "../../hooks/queries/useCurrentUser";

export default function Register() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const [validationError, setValidationError] = useState("");

    // Register Mutation
    const registerMutation = useMutation({
        mutationFn: registerUser,

        onSuccess: (user) => {
            // Update current user in React Query
            queryClient.setQueryData(CURRENT_USER_KEY, user);

            // Redirect to Home
            navigate("/");
        },
    });

    // Handle Form Submit
    function handleSubmit(event) {
        event.preventDefault();

        setValidationError("");

        const formData = new FormData(event.currentTarget);

        const name = formData.get("name").trim();
        const email = formData.get("email").trim();
        const password = formData.get("password");
        const confirmPassword = formData.get("confirmPassword");

        // Validate Password Match
        if (password !== confirmPassword) {
            setValidationError("كلمتا المرور غير متطابقتين");
            return;
        }

        // Validate Password Length
        if (password.length < 8) {
            setValidationError(
                "كلمة المرور يجب أن تتكون من 8 أحرف على الأقل"
            );
            return;
        }

        // Send Data to Appwrite
        registerMutation.mutate({
            name,
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
                        from-[var(--primary)]
                        via-[var(--secondary)]
                        to-[var(--tertiary)]
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
                            border border-[var(--border)]/20
                        "
                    />

                    <div
                        className="
                            absolute -bottom-24 -right-16
                            h-72 w-72
                            rounded-full
                            border border-[var(--border)]/20
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
                            text-[var(--text)]
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
                        نرحب بك في عالم يجمع بين أصالة المخبوزات
                        ودفء التفاصيل. أنشئ حسابك واكتشف
                        تشكيلتنا المميزة.
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
                            text-[var(--accent)]
                        "
                    >
                        BAKED WITH LOVE
                    </span>
                </div>

                {/* Register Form */}
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
                                text-[var(--text)]
                            "
                        >
                            بيت الطحين
                        </h2>
                    </div>

                    {/* Heading */}
                    <div className="mb-8">

                        <span
                            className="
                                text-xs font-semibold
                                tracking-widest
                                text-[var(--accent)]
                            "
                        >
                            CREATE ACCOUNT
                        </span>

                        <h2
                            className="
                                mt-3 text-3xl
                                font-bold
                                text-[var(--text)]
                            "
                        >
                            إنشاء حساب جديد
                        </h2>

                        <p
                            className="
                                mt-3 text-sm
                                leading-7
                                text-[var(--text-secondary)]
                            "
                        >
                            أنشئ حسابك وكن جزءاً من عائلة بيت الطحين.
                        </p>

                    </div>

                    {/* Register Form */}
                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col gap-5"
                    >

                        {/* Full Name */}
                        <div>

                            <label
                                className="
                                    mb-3 block
                                    text-sm font-semibold
                                    text-[var(--text-secondary)]
                                "
                            >
                                الاسم الكامل
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
                                <User
                                    size={19}
                                    className="text-[var(--text-secondary)]"
                                />

                                <input
                                    type="text"
                                    name="name"
                                    autoComplete="name"
                                    placeholder="أدخل اسمك الكامل"
                                    required
                                    minLength={2}
                                    className="
                                        w-full bg-transparent
                                        text-sm text-[var(--text)]
                                        outline-none
                                        placeholder:text-[var(--text-secondary)]
                                    "
                                />

                            </div>
                        </div>

                        {/* Email */}
                        <div>

                            <label
                                className="
                                    mb-3 block
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
                                        text-sm text-[var(--text)]
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
                                    mb-3 block
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
                                    autoComplete="new-password"
                                    placeholder="أدخل كلمة المرور"
                                    required
                                    minLength={8}
                                    className="
                                        w-full bg-transparent
                                        text-sm text-[var(--text)]
                                        outline-none
                                        placeholder:text-[var(--text-secondary)]
                                    "
                                />

                            </div>
                        </div>

                        {/* Confirm Password */}
                        <div>

                            <label
                                className="
                                    mb-3 block
                                    text-sm font-semibold
                                    text-[var(--text-secondary)]
                                "
                            >
                                تأكيد كلمة المرور
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
                                    name="confirmPassword"
                                    autoComplete="new-password"
                                    placeholder="أعد إدخال كلمة المرور"
                                    required
                                    minLength={8}
                                    className="
                                        w-full bg-transparent
                                        text-sm text-[var(--text)]
                                        outline-none
                                        placeholder:text-[var(--text-secondary)]
                                    "
                                />

                            </div>
                        </div>

                        {/* Terms */}
                        <label
                            className="
                                flex items-center gap-3
                                cursor-pointer
                                text-xs leading-6
                                text-[var(--text-secondary)]
                            "
                        >
                            <input
                                type="checkbox"
                                name="terms"
                                required
                                className="
                                    mt-1 accent-[var(--accent)]
                                    h-4 w-4
                                "
                            />

                            <span>
                                أوافق على

                                <Link
                                    to="/terms"
                                    className="
                                        mx-1
                                        text-[var(--accent)]
                                        hover:underline
                                    "
                                >
                                    الشروط والأحكام
                                </Link>

                                وسياسة الخصوصية.
                            </span>

                        </label>

                        {/* Validation Error */}
                        {(validationError || registerMutation.isError) && (
                            <p
                                role="alert"
                                className="text-sm leading-6 text-red-500"
                            >
                                {validationError ||
                                    (registerMutation.error?.code === 409
                                        ? "هذا البريد الإلكتروني مستخدم مسبقاً"
                                        : registerMutation.error?.message ||
                                          "حدث خطأ أثناء إنشاء الحساب")}
                            </p>
                        )}

                        {/* Register Button */}
                        <button
                            type="submit"
                            disabled={registerMutation.isPending}
                            className="
                                mt-2 flex w-full
                                items-center justify-center gap-3
                                rounded-xl
                                bg-[var(--accent)]
                                px-5 py-3.5
                                font-bold text-[var(--text-primary)]
                                transition-all duration-300
                                hover:bg-[var(--accent-hover)]
                                hover:shadow-lg
                                disabled:cursor-not-allowed
                                disabled:opacity-60
                            "
                        >
                            {registerMutation.isPending
                                ? "جاري إنشاء الحساب..."
                                : "إنشاء حساب"
                            }

                            {!registerMutation.isPending && (
                                <ArrowLeft size={19} />
                            )}

                        </button>

                    </form>

                    {/* Login Link */}
                    <div
                        className="
                            mt-8 border-t border-[var(--border)]
                            pt-6 text-center
                        "
                    >
                        <p className="text-sm text-[var(--text-secondary)]">
                            لديك حساب بالفعل؟

                            <Link
                                to="/login"
                                className="
                                    mr-2 font-bold
                                    text-[var(--accent)]
                                    hover:underline
                                "
                            >
                                تسجيل الدخول
                            </Link>

                        </p>
                    </div>

                </div>
            </div>
        </main>
    );
}