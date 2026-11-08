const menuItems = [
  {
    title: "طبق الفطور",
    description: "تشكيلة مختارة من المخبوزات الطازجة",
    price: "$8.5",
    image:
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=200",
  },
  {
    title: "ساندويتش الفطور",
    description: "ساندويتش طازج محضر من الخبز والبيض",
    price: "$7.5",
    image:
      "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=200",
  },
];

export default function brackfastSection() {
  return (
    <section
      dir="rtl"
      className="relative min-h-screen overflow-hidden  bg-[var(--bg-secondary)] px-5 py-10 text-[var(--text-primary)] md:px-10 md:py-14"
      style={{
        backgroundImage: `
          linear-gradient(var(--border) 1px, transparent 1px),
          linear-gradient(90deg, var(--border) 1px, transparent 1px)
        `,
        backgroundSize: "40px 40px",
      }}
    >
      {/* Decorative Circle */}
      <div className="absolute -left-4 -top-5 h-24 w-24 rounded-full border border-[#a96c4d]/30">
        <div className="absolute inset-3 rounded-full border border-[#a96c4d]/20" />
        <div className="absolute inset-5 rounded-full border border-[#a96c4d]/20" />
      </div>

      {/* Header */}
      <header className="relative mb-12 text-center">
        <p className="mb-2 text-[11px] text-[var(--text-secondary)]">
          صباح يبدأ من الفن
        </p>

        <h1 className="font-serif text-4xl font-bold">
          فطور شهي
        </h1>

        <div className="my-3 text-xs text-[var(--text-secondary)]">
          ───── ◆ ─────
        </div>

        <p className="mx-auto max-w-sm text-[18px] leading-7 text-[var(--text-secondary)]">
          من رائحة الخبز الخارج من الفرن إلى أول لقمة في صباحكم،
          نصنع فطوراً يحمل روح البيت والدفء.
        </p>
      </header>

      {/* Main Content */}
      <div
        dir="ltr"
        className="mx-auto flex max-w-[610px] items-center justify-center"
      >
        {/* Menu Card */}
        <div
          dir="rtl"
          className="relative z-10 min-h-[340px] w-[246px] shrink-0 bg-[var(--bg-primary)] p-6 text-[var(--text-primary)] max-sm:w-full max-sm:max-w-[320px]"
        >
          <div className="relative min-h-[290px] border border-[--border] p-4">
            <p className="text-center text-[8px] tracking-[3px] text-[--text-secondary]">
              BREAKFAST MENU
            </p>

            <h2 className="mt-2 text-center font-serif text-2xl font-bold">
              من خبزنا إلى مائدتكم
            </h2>

            <p className="mt-2 text-center text-[9px] leading-5 text-[--text-secondary]">
              اختيارات صباحية محضرة بعناية، لنصنع يومكم ببداية دافئة ولذيذة.
            </p>

            {/* Menu Items */}
            <div className="mt-3">
              {menuItems.map((item) => (
                <div
                  key={item.title}
                  className="flex items-center gap-2 border-b border-[--border] py-3 last:border-0"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-11 w-11 rounded-full object-cover"
                  />

                  <div className="min-w-0 flex-1">
                    <h3 className="font-serif text-sm font-bold">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-[8px] text-[var(--text-secondary)]">
                      {item.description}
                    </p>
                  </div>

                  <span className="text-[10px] text-[var(--text-secondary)]" dir="ltr">
                    {item.price}
                  </span>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="mt-4 flex items-center justify-between gap-2">
              <button className="bg-[var(--bg-secondary)] px-4 py-2 text-[10px] text-[var(--text-primary)] transition hover:bg-[#945b3e]">
                اكتشف القائمة
              </button>

              <span className="text-center text-[8px] leading-4 text-[var(--text-secondary)]">
                EVERY MORNING
                <br />
                تغيير كل يوم
              </span>
            </div>
          </div>
        </div>

        {/* Main Image */}
        <div className="relative h-[315px] w-[365px] max-sm:hidden">
          <img
            src="https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1000"
            alt="خبز طازج"
            className="h-full w-full object-cover"
          />

          <div className="absolute bottom-4 left-4 bg-black/70 px-4 py-3">
            <p className="text-[7px] tracking-[3px] text-[var(--text-secondary)]">
              BAKED WITH LOVE
            </p>
            <p className="mt-1 text-xs text-[var(--text-primary)] font-bold">
              طازج من الفرن
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Decoration */}
      <div className="mt-9 text-center text-[9px] text-[var(--text-secondary)]">
        ───── بيت الطحين ─────
      </div>
    </section>
  );
}
