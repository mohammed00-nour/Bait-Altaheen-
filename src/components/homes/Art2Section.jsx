
import { useState } from "react";
import { images } from "../../data/imageData";
import { Link } from "react-router";
import { motion, AnimatePresence } from "motion/react";

export default function Art2Section() {
    const [selectedImageId, setSelectedImageId] = useState(
        images[0]?.id ?? null
    );

    const selectedImage = images.find(
        (image) => image.id === selectedImageId
    );

    const mainImage =
        selectedImage?.src ??
        images[0]?.src ??
        "https://images.pexels.com/photos/33593099/pexels-photo-33593099/free-photo-of-hands-kneading-dough-in-artisan-bakery.jpeg?auto=compress&dpr=1&h=750&w=1260";

    return (
        <section
            dir="ltr"
            className="
                art-grid-background
                px-5 py-10 md:py-12
                overflow-hidden
            "
        >
            {/* Main Card */}
            <motion.div
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                    duration: 0.7,
                    ease: "easeOut",
                }}
                className="
                    mx-auto max-w-[1050px]
                    overflow-hidden
                    rounded-xl
                    border border-[#A68D72]
                    shadow-[0_20px_50px_rgba(73,55,43,0.12)]
                "
            >
                <div
                    className="
                        grid grid-cols-1
                        md:grid-cols-2
                        gap-px
                        bg-[#A68D72]
                    "
                >
                    {/* Main Image */}
                    <div
                        className="
                            relative
                            min-h-[280px]
                            md:min-h-[390px]
                            overflow-hidden
                            bg-[#D8C3A5]
                        "
                    >
                        <AnimatePresence mode="wait">
                            <motion.img
                                key={selectedImage?.id ?? "fallback"}
                                src={mainImage}
                                alt={
                                    selectedImage?.alt ??
                                    "صورة من مخبز بيت الطحين"
                                }
                                initial={{
                                    opacity: 0,
                                    scale: 1.04,
                                }}
                                animate={{
                                    opacity: 1,
                                    scale: 1,
                                }}
                                exit={{
                                    opacity: 0,
                                    scale: 0.98,
                                }}
                                transition={{
                                    duration: 0.35,
                                    ease: "easeInOut",
                                }}
                                className="
                                    absolute inset-0
                                    w-full h-full
                                    object-cover
                                "
                            />
                        </AnimatePresence>

                        {/* Floating Badge */}
                        <motion.div
                            animate={{ y: [0, -5, 0] }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                            className="
                                absolute top-5 right-5
                                w-[76px] h-[85px]
                                bg-[#FFFDF9]
                                border border-[#D8C3B0]
                                shadow-lg
                                flex flex-col
                                items-center justify-center
                                gap-1
                            "
                        >
                            <span className="text-[9px] text-[#A17B51]">
                                BAIT AL TAHEEN
                            </span>

                            <span
                                className="
                                    text-xl font-bold
                                    text-[#B58A55]
                                "
                            >
                                LOVE
                            </span>

                            <span className="text-[9px] text-[#A17B51]">
                                EVERY DAY
                            </span>
                        </motion.div>
                    </div>

                    {/* Content Panel */}
                    <div
                        dir="rtl"
                        className="
                            flex flex-col justify-between
                            bg-[#FFFDF9]
                            p-6 md:p-8
                            min-h-[390px]
                        "
                    >
                        {/* Header */}
                        <div
                            className="
                                flex items-center gap-3
                                border-b border-[#D8C3B0]
                                pb-4
                            "
                        >
                            <span
                                className="
                                    text-xs font-semibold
                                    tracking-[0.15em]
                                    text-[#A17B51]
                                "
                            >
                                BAIT AL TAHEEN
                            </span>

                            <div className="h-px flex-1 bg-[#D8C3B0]" />

                            <span className="text-xs text-[#A17B51]">
                                OUR STORY
                            </span>
                        </div>

                        {/* Title & Description */}
                        <div className="py-5">
                            <span
                                className="
                                    text-sm font-medium
                                    text-[#A17B51]
                                "
                            >
                                فنّ الخَبز
                            </span>

                            <h2
                                className="
                                    mt-3
                                    text-2xl md:text-3xl
                                    font-bold leading-tight
                                    text-[#49372B]
                                "
                            >
                                الحكاية تبدأ
                                <br />
                                من حبة قمح
                            </h2>

                            <p
                                className="
                                    mt-4
                                    max-w-md
                                    text-sm md:text-base
                                    leading-7
                                    text-[#806F5E]
                                "
                            >
                                من اختيار المكونات إلى تفاصيل التحضير،
                                نصنع كل قطعة بعناية وحب لنقدم لكم
                                مذاقاً يجمع بين الأصالة والجودة.
                            </p>

                            <motion.div
                                whileHover={{ x: -4 }}
                                transition={{
                                    duration: 0.2,
                                }}
                                className="mt-5"
                            >
                                <Link
                                    className="
                                        inline-flex items-center gap-2
                                        bg-[var(--bg-card)]
                                        text-[var(--text-secondary)]
                                        px-5 py-2
                                        rounded-lg
                                        text-base md:text-lg
                                        font-bold
                                        transition-colors duration-300
                                        hover:text-[var(--text-primary)]
                                    "
                                    to="/about"
                                >
                                    اكتشف عالمنا
                                    <span className="font-bold">
                                        ←
                                    </span>
                                </Link>
                            </motion.div>
                        </div>

                        {/* Pagination Images */}
                        <div
                            className="
                                border-t border-[#D8C3B0]
                                pt-5
                            "
                        >
                            <div className="mb-4">
                                <span
                                    className="
                                        text-sm font-semibold
                                        text-[#49372B]
                                    "
                                >
                                    تفاصيل نصنعها بحب
                                </span>
                            </div>

                            {/* Circular Images */}
                            <div
                                className="
                                    flex items-center
                                    justify-center
                                    gap-5
                                "
                            >
                                {images.map((image) => (
                                    <motion.button
                                        key={image.id}
                                        type="button"
                                        onClick={() =>
                                            setSelectedImageId(image.id)
                                        }
                                        aria-pressed={
                                            selectedImageId === image.id
                                        }
                                        aria-label={`عرض صورة ${image.alt}`}
                                        whileHover={{ scale: 1.08 }}
                                        whileTap={{ scale: 0.94 }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 350,
                                            damping: 20,
                                        }}
                                        className="
                                            flex flex-col items-center
                                            gap-2
                                            border-0
                                            bg-transparent
                                            p-0
                                            cursor-pointer
                                        "
                                    >

                                        <span className="relative block w-14 h-14 rounded-full">

                                            <span className="
                                                    block w-full h-full
                                                    rounded-full
                                                    border border-[#D8C3B0]
                                                    p-[2px]
                                                ">
                                                <img
                                                    src={image.src}
                                                    alt={image.alt}
                                                    className="
                                                    w-full h-full
                                                    object-cover
                                                    rounded-full
                                                "
                                                />
                                            </span>

                                            {selectedImageId === image.id && (
                                                <motion.span
                                                    layoutId="selected-image-ring"
                                                    transition={{
                                                        type: "spring",
                                                        stiffness: 380,
                                                        damping: 28,
                                                    }}
                                                    className="
                                                    absolute inset-0
                                                    rounded-full
                                                    border-[3px]
                                                    border-[#49372B]
                                                    pointer-events-none
                                                "
                                                />
                                            )}

                                        </span>


                                        <span
                                            className="
                                                text-[10px]
                                                font-semibold
                                                text-[#49372B]
                                            "
                                        >
                                            {image.alt}
                                        </span>
                                    </motion.button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
