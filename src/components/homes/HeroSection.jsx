import { Link } from "react-router";
import { ArrowRight } from "lucide-react"

//import Motion for animations
import { motion } from "motion/react";
import { fadeUpVariants, imageVariants, textHover, useHeroScroll, } from "../../hooks/animations/heroVariants";


export default function HeroSection() {
    const { textX, textOpacity } = useHeroScroll();
    return (
        <section className="    relative isolate flex
                w-full min-w-0
                overflow-hidden
                min-h-screen
                overflow-hidden
                h-[calc(100vh-80px)]
                lg:h-[calc(100vh-100px)]">
            <motion.div variants={fadeUpVariants} initial="hidden" animate="visible" className="flex flex-col justify-center items-center gap-4 px-6 py-8 lg:px-16 absolute top-0 right-0 z-[10] w-full h-full lg:w-full lg:h-full bg-gradient-to-l from-[var(--bg-primary)]/75 via-[var(--bg-primary)]/50 to-[var(--bg-primary)]/5 text-center">
                <motion.div  style={{x: textX, opacity: textOpacity,}} className="flex flex-col gap-4 lg:gap-6 relative z-[40] justify-between items-center relative" >
                    <h1 className="text-[48px] font-bold text-[var(--text-primary)]">من فرننا إلى مائدتكم</h1>
                    <h2 className=" w-full max-w-xl
                    lg:w-full 
                    text-[18px] lg:text-[20px]
                    font-bold
                    text-[var(--text-primary)]
                    leading-8">أشهى أنواع الخبز والمعجنات، محضّرة بعناية لتمنحكم مذاقاً أصيلاً في كل لقمة.</h2>
                    <Link to="/products" className="bg-[var(--primary)] felx justify-center item-center text-[var(--text-primary)] py-2 px-14 rounded-[15px] hover:bg-[var(--accent)] w-[fit-content]"><ArrowRight className="inline-block text-[var(--text-primary)]" size={20} />اكتشف منتجاتنا  </Link>
                </motion.div>
            </motion.div>

            <motion.img variants={imageVariants}
                initial="hidden"
                animate="visible"
                src="https://res.cloudinary.com/dv6aotwvd/image/upload/v1793393036/XSNrVmbKpAMMyxjq0ix9JhCsnk7Jmw-5ozHYA14S3jSe7KPBGB_nJ0hrcIt3wNviCFmNcUXL-pNa7EGCLcHq7nybkN3MWlYkcYzGKUbYiGXg_CZmE920hiLNd_z65jOxrkFJRMJL1o-1Ymyjdo_pAncMdM_n1g2bzaA0Z4Ohc3E_lgbf4d.jpg"
                alt="بيت الطحين - مخبوزات طازجة"
                className="
                absolute inset-0
                w-full h-full
                object-cover object-center
                z-0" />

        </section>

    )
}