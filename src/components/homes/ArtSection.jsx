import { storyImages } from "../../data/storyImages";
import { imageVariants } from "../../hooks/animations/heroVariants";

import {
    motion,
    useScroll,
    useTransform,
    useSpring,
} from "motion/react";

import { useRef } from "react";


export default function ArtSection() {
    const sectionRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    });

    const rotation = useTransform(
        scrollYProgress,
        [0, 1],
        [0, 360]
    );
    const smoothRotation = useSpring(rotation, {
        stiffness: 110,
        damping: 25,
        mass: 0.25,
    });
    const counterRotation = useTransform(
        smoothRotation,
        (value) => -value
    );

    const positions = {
        top: "top-[20px] left-1/2 -translate-x-1/2",

        right: "right-[-30px] top-1/2 -translate-y-1/2",

        bottom: "bottom-[20px] left-1/2 -translate-x-1/2",

        left: "left-[-30px] top-1/2 -translate-y-1/2",
    };

    return (
        <section ref={sectionRef} className="
        bg-[var(--bg-primary)]
        py-5 px-6
        overflow-x-clip
        transition-colors duration-300

    ">
            <div className="
                    max-w-[1200px]
                    flex flex-col md:flex-col
                    sm:flex-col
                    lg:flex-row
                    2xl:flex-row
                    items-center
                    justify-evenly
                    mx-auto
                    gap-20
                    px-6
                    py-20">

                {/* Images Orbit */}
                <div className="
                    relative
                    md:w-[90%]
                    xl:w-[60%]
                    w-[100%]
                    max-w-[900px]
                    aspect-square
                    ">


                    {/* Orbit Path */}
                    <div className="
                    absolute inset-[12%]
                    rounded-full
                    border border-dashed
                    border-[var(--secondary)]/40
                "/>

                    {/* Rotating Images Group */}
                    <motion.div
                        className="absolute inset-0 z-10"
                        style={{ rotate: smoothRotation }}
                    >

                        {storyImages.map((image) => (
                            <motion.div
                                key={image.id}
                                // className="w-full h-full"
                                style={{ rotate: counterRotation }}
                                className={`
                                    absolute
                                    w-[150px] h-[100px]
                                    sm:w-[250px] sm:h-[160px]
                                    md:w-[240px] lg:h-[150px]
                                    overflow-hidden
                                    rounded-2xl
                                    border border-[var(--border)]
                                    shadow-xl
                                    ${positions[image.position]}
                                    `}
                            >
                                <motion.div
                                    variants={imageVariants}
                                    initial="hidden"
                                    whileInView="visible">

                                    <img
                                        src={image.urlImage}
                                        alt={image.altText}
                                        loading="lazy"
                                        className="w-full h-full object-cover"
                                    />
                                </motion.div>
                            </motion.div>
                        ))}

                    </motion.div>

                    {/* Fixed Center Circle */}
                    <div className="
                        absolute top-1/2 left-1/2
                        -translate-x-1/2 -translate-y-1/2
                        z-20
                        w-[30%] aspect-square
                        rounded-full
                        bg-[var(--bg-card)]
                        border-2 border-[var(--secondary)]
                        shadow-xl
                        flex flex-col items-center justify-center
                        text-center
                        ">
                        <h3 className="
                            text-lg sm:text-xl
                            font-bold
                            text-[var(--text-primary)]
                            ">
                            بيت الطحين
                        </h3>

                        <span className="
                                text-xs
                                text-[var(--text-secondary)]
                                ">
                            نخبز بحب
                        </span>
                    </div>

                </div>

                {/* Text Content */}
                <article className="
                    flex flex-col items-center 
                    justify-center
                    gap-10
                    ">
                    <div className="
                        w-full
                        max-w-xl
                        flex
                        flex-col
                        gap-5
                        text-right
                        ">

                        <span className="text-sm font-semibold tracking-widest text-[var(--secondary)]">
                            THE ART OF BAKING
                        </span>

                        <h2 className="
                            text-3xl md:text-5xl
                            font-bold
                            text-[var(--text-primary)]
                        ">
                            كل قطعة إلها حكاية...
                        </h2>

                        <p className="
                            text-base md:text-lg
                            leading-9
                            text-[var(--text-secondary)]
                        ">
                            من حبة القمح الأولى إلى رائحة الخبز الطازج،
                            نهتم بكل تفصيل لنقدم لكم مذاقاً يحمل روح الأصالة.
                        </p>

                    </div>
                    <div className="flex flex-col gap-10 justify-center items-center ">
                        <p className="text-[20px] font-bold ">صُنّاع السعادة</p>
                        <div className="flex flex-row gap-10 items-center font-bold text-[var(--text-secondary)]">
                            <div className="flex flex-col gap-3 justify-center items-center txet-center">
                                <p className="text-center border-1 w-[80px] text-[var(--text-secondary)]"></p>
                                <p className="text-center text-[var(--text-primary)]">بنّيتو</p>
                                <p className="text-center border-1 w-[80px] text-[var(--text-secondary)]"></p>
                                
                            </div>
                            <img src="https://res.cloudinary.com/dv6aotwvd/image/upload/v1793792112/9e14d075-8a3a-42aa-b1ea-49bb6cad5ee5_pfdmlf.png" alt="Chef" className="w-[80px] h-[80px] object-cover rounded-full"></img>
                            <div className="flex flex-col gap-3 justify-center items-center txet-center">
                                <p className="text-center border-1 w-[80px] text-[var(--text-secondary)]"></p>
                                <p className="text-center text-[var(--text-primary)]">غاسبار</p>
                                <p className="text-center border-1 w-[80px] text-[var(--text-secondary)]"></p>
                                
                            </div>
                        </div>
                        <div calssName="flex flex-col gap-2 justify-center items-center txet-center">
                            <h4 className="text-center text-[30px] txet-[var(--text-secondary)]"><em>نصنعها بحب</em></h4>
                            <p>منذ البداية وحتى آخر لقمة</p>
                        </div>
                    </div>
                </article>

            </div>
        </section >
    );
}