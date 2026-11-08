import { Link } from 'react-router'
import { Logo } from './common/Logo'

import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaWhatsapp, FaInstagram, FaFacebook } from 'react-icons/fa'

const quickLinks = [
  { name: "الرئيسية", to: "/" },
  { name: "قصتنا", to: "/about" },
  { name: "منتجاتنا", to: "/products" },
]

const categories = [
  "المناقيش",
  "الخبز",
  "المعجنات",
  "الحلويات",
  "الكعك",
  "الكيك",
]

const contactInfo = [
  {
    icon: FaPhone,
    label: "اتصل بنا",
    value: "+963 9XX XXX XXX",
    href: "tel:+96398998989",
  },
  {
    icon: FaWhatsapp,
    label: "واتساب",
    value: "تواصل معنا مباشرة",
    href: "https://wa.me/96398998989",
  },
  {
    icon: FaEnvelope,
    label: "البريد الإلكتروني",
    value: "info@example.com",
    href: "mailto:info@example.com",
  },
  {
    icon: FaMapMarkerAlt,
    label: "موقعنا",
    value: "حلب، سوريا",
    href: "https://maps.google.com/",
  },
]

const socialLinks = [
  {
    icon: FaInstagram,
    href: "https://instagram.com/",
    label: "Instagram",
  },
  {
    icon: FaFacebook,
    href: "https://facebook.com/",
    label: "Facebook",
  },
]

export default function Footer() {
  return (
    <footer dir="rtl" className="relative overflow-hidden bg-[var(--bg-card)] text-[var(--text-primary)] border-t border-[var(--border)]">

      {/* Decorative Top Line */}
      <div className="h-1 w-full bg-gradient-to-l from-[var(--secondary)] via-[var(--secondary)]/40 to-transparent" />

      <div className="mx-auto max-w-[1280px] px-6 pt-16 pb-6">

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 pb-14">

          {/* Brand */}
          <div className="lg:col-span-4 flex flex-col items-start gap-5">

            <div className="flex items-center gap-3">
              <Logo className='' />
            </div>

            <p className="max-w-md text-sm md:text-base leading-8 text-[var(--text-secondary)]">
              من أول حبة قمح تبدأ الحكاية...
              نهتم بكل تفصيل لنقدم لكم مخبوزات
              طازجة تجمع بين أصالة الوصفات
              وجودة المكونات، ونخبز كل قطعة بحب.
            </p>

            {/* CTA */}
            <Link to="/products" className="group inline-flex items-center gap-3 px-6 py-3 rounded-full bg-[var(--secondary)] text-white font-semibold text-sm transition-all duration-300 hover:opacity-90 hover:-translate-y-1">
              اكتشف منتجاتنا
              <span className="transition-transform duration-300 group-hover:-translate-x-1">
                ←
              </span>
            </Link>

          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 flex flex-col gap-6">

            <h3 className="text-lg font-bold text-[var(--text-primary)]">
              روابط سريعة
            </h3>

            <div className="flex flex-col gap-4">
              {quickLinks.map((link) => (
                <Link key={link.name} to={link.to} className="w-fit text-sm text-[var(--text-secondary)] transition-all duration-300 hover:text-[var(--secondary)] hover:translate-x-[-4px]">
                  {link.name}
                </Link>
              ))}
            </div>

          </div>

          {/* Categories */}
          <div className="lg:col-span-3 flex flex-col gap-6">

            <h3 className="text-lg font-bold text-[var(--text-primary)]">
              أصنافنا
            </h3>

            <div className="grid grid-cols-2 gap-x-4 gap-y-4">
              {categories.map((category) => (
                <Link key={category} to="/products" className="w-fit text-sm text-[var(--text-secondary)] transition-colors duration-300 hover:text-[var(--secondary)]">
                  {category}
                </Link>
              ))}
            </div>

          </div>

          {/* Contact */}
          <div className="lg:col-span-3 flex flex-col gap-6">

            <h3 className="text-lg font-bold text-[var(--text-primary)]">
              تواصل معنا
            </h3>

            {/* Contact Information */}
            <div className="flex flex-col gap-5">

              {contactInfo.map((item) => {
                const Icon = item.icon

                return (
                  <a key={item.label} href={item.href} target={item.label === "موقعنا" || item.label === "واتساب" ? "_blank" : undefined} rel="noopener noreferrer" className="group flex items-center gap-3 w-fit">

                    <span className="flex items-center justify-center w-10 h-10 shrink-0 rounded-xl bg-[var(--secondary)]/10 text-[var(--secondary)] transition-all duration-300 group-hover:bg-[var(--secondary)] group-hover:text-white">
                      <Icon size={18} />
                    </span>

                    <span className="flex flex-col gap-1">
                      <span className="text-xs text-[var(--text-secondary)]">
                        {item.label}
                      </span>

                      <span className="text-sm font-medium text-[var(--text-primary)] transition-colors duration-300 group-hover:text-[var(--secondary)]">
                        {item.value}
                      </span>
                    </span>

                  </a>
                )
              })}

            </div>

            {/* Social Media */}
            <div className="flex items-center gap-3 mt-2">

              {socialLinks.map((social) => {
                const Icon = social.icon

                return (
                  <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label} className="w-10 h-10 flex items-center justify-center rounded-xl border border-[var(--border)] text-[var(--text-secondary)] transition-all duration-300 hover:bg-[var(--secondary)] hover:text-white hover:border-[var(--secondary)] hover:-translate-y-1">
                    <Icon size={18} />
                  </a>
                )
              })}

            </div>

          </div>

        </div>

        {/* Bottom Footer */}
        <div className="border-t border-[var(--border)] pt-6 flex flex-col md:flex-row items-center justify-between gap-4">

          <p className="text-xs sm:text-sm text-[var(--text-secondary)] text-center">
            © {new Date().getFullYear()} بيت الطحين. جميع الحقوق محفوظة.
          </p>

          <p className="text-xs sm:text-sm text-[var(--text-secondary)] flex items-center gap-2">
            صُنع بحب لعشاق المخبوزات
            <span className="text-[var(--secondary)]">
              ♥
            </span>
          </p>

        </div>

      </div>
    </footer>
  )
}