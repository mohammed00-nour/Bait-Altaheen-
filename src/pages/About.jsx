
import { Link } from "react-router";
import { motion } from "motion/react";

import {
    Wheat,
    Heart,
    ShieldCheck,
    Sparkles,
    ArrowLeft,
} from "lucide-react";

import { images } from "../data/imageData";

const values = [
    {
        id: 1,
        title: "الجودة",
        description: "نهتم باختيار المكونات والعناية بكل تفصيل.",
        icon: ShieldCheck,
    },
    {
        id: 2,
        title: "الطزاجة",
        description: "نحرص على تقديم مخبوزات طازجة وشهية.",
        icon: Wheat,
    },
    {
        id: 3,
        title: "الشغف",
        description: "نضع الحب والاهتمام في كل قطعة نقدمها.",
        icon: Heart,
    },
    {
        id: 4,
        title: "الإبداع",
        description: "نجمع بين الوصفات الأصيلة واللمسات المميزة.",
        icon: Sparkles,
    },
];

export default function About() {
    const storyImage = images[0];

    return (
        <main
            dir="rtl"
            className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]"
        >

            {/* Hero */}
            <section className="
                flex flex-col items-center justify-center
                px-5 py-14 md:py-20
                text-center
            ">
                <motion.span
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="
                        rounded-full
                        border border-[var(--secondary)]
                        bg-[var(--bg-secondary)]
                        px-4 py-1.5
                        text-xs font-semibold
                        text-[var(--text-secondary)]
                    "
                >
                    من نحن
                </motion.span>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="
                        mt-5
                        text-3xl md:text-5xl
                        font-bold
                        leading-relaxed
                        text-[var(--text-primary)]
                    "
                >
                    حكاية بدأت من حب الطحين
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="
                        mt-4 max-w-2xl
                        text-sm md:text-base
                        leading-8
                        text-[var(--text-secondary)]
                    "
                >
                    في بيت الطحين نؤمن أن الخبز أكثر من مجرد طعام،
                    إنه حكاية من الدفء والأصالة والتفاصيل الصغيرة
                    التي تصنع مذاقاً لا يُنسى.
                </motion.p>
            </section>

            {/* Our Story */}
            <section className="
                border-y border-[var(--border)]
                bg-[var(--bg-primary)]
                px-5 py-10 md:py-14
            ">
                <div
                    dir="ltr"
                    className="
                        mx-auto max-w-6xl
                        grid grid-cols-1
                        md:grid-cols-2
                        items-center
                        gap-8 md:gap-14
                    "
                >

                    {/* Story Image */}
                    <motion.div
                        initial={{ opacity: 0, x: -35 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{
                            duration: 0.7,
                            ease: "easeOut",
                        }}
                        className="
                            relative
                            overflow-hidden
                            rounded-2xl
                            border border-[var(--secondary)]
                            aspect-[4/3]
                        "
                    >
                        {storyImage?.src && (
                            <img
                                src={storyImage.src}
                                alt={storyImage.alt || "تفاصيل صناعة المخبوزات"}
                                loading="lazy"
                                decoding="async"
                                className="
                                    h-full w-full
                                    object-cover
                                    transition-transform duration-700
                                    hover:scale-105
                                "
                            />
                        )}

                        <div className="
                            absolute bottom-4 left-4
                            rounded-full
                            border border-[var(--secondary)]/50
                            bg-[var(--bg-primary)]/80
                            px-4 py-2
                            text-xs font-semibold
                            text-[var(--text-secondary)]
                            backdrop-blur-md
                        ">
                            BAIT AL TAHEEN
                        </div>
                    </motion.div>

                    {/* Story Content */}
                    <motion.div
                        dir="rtl"
                        initial={{ opacity: 0, x: 35 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{
                            duration: 0.7,
                            ease: "easeOut",
                        }}
                        className="flex flex-col items-start"
                    >
                        <span className="
                            text-xs font-semibold
                            tracking-widest
                            text-[var(--text-secondary)]
                        ">
                            OUR STORY
                        </span>

                        <h2 className="
                            mt-4
                            text-2xl md:text-3xl
                            font-bold leading-relaxed
                            text-[var(--text-primary)]
                        ">
                            نصنعها بحب،
                            <br />
                            ونقدمها بكل فخر
                        </h2>

                        <p className="
                            mt-5 max-w-lg
                            text-sm md:text-base
                            leading-8
                            text-[var(--text-secondary)]
                        ">
                            من اختيار المكونات إلى تفاصيل التحضير،
                            نهتم بكل خطوة لنقدم لكم تجربة تجمع
                            بين المذاق الأصيل والجودة والعناية.
                            نؤمن أن لكل قطعة حكاية تستحق أن تُروى.
                        </p>

                        <Link
                            to="/products"
                            className="
                                mt-6 inline-flex items-center gap-3
                                rounded-lg
                                border border-[var(--secondary)]
                                px-5 py-3
                                text-sm font-bold
                                text-[var(--text-secondary)]
                                transition-all duration-300
                                hover:bg-[var(--secondary)]
                                hover:text-white
                            "
                        >
                            اكتشف منتجاتنا
                            <ArrowLeft size={17} />
                        </Link>
                    </motion.div>

                </div>
            </section>

            {/* Our Values */}
            <section className="
                px-5 py-12 md:py-16
            ">
                <div className="mx-auto max-w-6xl">

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-9 text-center"
                    >
                        <span className="
                            text-xs font-semibold
                            text-[var(--secondary)]
                        ">
                            OUR VALUES
                        </span>

                        <h2 className="
                            mt-3 text-2xl md:text-3xl
                            font-bold text-[var(--text-primary)]
                        ">
                            قيمنا في كل قطعة
                        </h2>

                        <p className="
                            mt-3 text-sm
                            text-[var(--text-secondary)]
                        ">
                            مبادئ نحرص أن تكون حاضرة في كل ما نقدمه.
                        </p>
                    </motion.div>

                    <div className="
                        grid grid-cols-2
                        md:grid-cols-4
                        gap-3 md:gap-5
                    ">
                        {values.map((value, index) => {
                            const Icon = value.icon;

                            return (
                                <motion.article
                                    key={value.id}
                                    initial={{ opacity: 0, y: 25 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{
                                        duration: 0.5,
                                        delay: index * 0.1,
                                    }}
                                    whileHover={{ y: -5 }}
                                    className="
                                        flex flex-col items-center
                                        justify-center
                                        gap-3
                                        rounded-xl
                                        border border-[var(--border)]
                                        bg-[var(--bg-primary)]
                                        px-3 py-6 md:py-8
                                        text-center
                                        transition-colors duration-300
                                        hover:border-[var(--secondary)]
                                    "
                                >
                                    <div className="
                                        flex h-11 w-11
                                        items-center justify-center
                                        rounded-full
                                        bg-[var(--bg-secondary)]
                                        text-[var(--text-secondary)]
                                    ">
                                        <Icon size={21} strokeWidth={1.6} />
                                    </div>

                                    <h3 className="
                                        text-sm md:text-base
                                        font-bold text-[var(--text-primary)]
                                    ">
                                        {value.title}
                                    </h3>

                                    <p className="
                                        text-[11px] md:text-xs
                                        leading-6
                                        text-[var(--text-secondary)]
                                    ">
                                        {value.description}
                                    </p>
                                </motion.article>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Call To Action */}
            <section className="
                px-5 pb-12 md:pb-16
            ">
                <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="
                        mx-auto max-w-6xl
                        flex flex-col items-center
                        rounded-2xl
                        bg-[#D99A73]
                        px-5 py-10 md:py-12
                        text-center
                        shadow-[0_15px_40px_rgba(217,154,115,0.12)]
                    "
                >
                    <h2 className="
                        text-2xl md:text-3xl
                        font-bold text-[var(--text-primary)]
                    ">
                        جرّب طعم بيت الطحين
                    </h2>

                    <p className="
                        mt-3 max-w-lg
                        text-sm leading-7
                        text-[var(--text-secondary)]
                    ">
                        اكتشف تشكيلتنا واستمتع بتفاصيل
                        صُنعت بعناية لتصل إلى مائدتكم.
                    </p>

                    <Link
                        to="/products"
                        className="
                            mt-6 inline-flex items-center gap-2
                            rounded-lg
                            bg-[var(--bg-primary)]
                            px-6 py-3
                            text-sm font-bold
                            text-[var(--text-primary)]
                            transition-all duration-300
                            hover:bg-[var(--bg-secondary)]
                            hover:text-white
                        "
                    >
                        تسوّق الآن
                        <ArrowLeft size={17} />
                    </Link>
                </motion.div>
            </section>

        </main>
    );
}
