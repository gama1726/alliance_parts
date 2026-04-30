import React, { useMemo, useState } from "react";

const LOGO_SRC = "/alliance-logo.png";

const photos = {
  heroCar:
    "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1200&q=85",
  service: "/images/category-maintenance.jpg",
  brakes: "/images/category-brakes.jpg",
  suspension: "/images/category-suspension.jpg",
  optics: "/images/category-optics.jpg",
  vinBanner:
    "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1000&q=85",
  oil:
    "https://images.unsplash.com/photo-1625047509248-ec889cbff17f?auto=format&fit=crop&w=600&q=85",
  engine:
    "https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&w=600&q=85",
  partsShelf:
    "https://images.unsplash.com/photo-1606577924006-27d39b132ae2?auto=format&fit=crop&w=600&q=85",
};

const tabs = [
  { id: "article", label: "Поиск по артикулу" },
  { id: "vin", label: "VIN-запрос" },
  { id: "car", label: "Поиск по авто" },
];

function getSearchPlaceholder(tab) {
  if (tab === "vin") return "Введите VIN-номер автомобиля";
  if (tab === "car") return "Марка, модель, год — например Toyota Camry 2018";
  return "Введите артикул запчасти";
}

function getSearchExamples(tab) {
  if (tab === "vin") return "Например: XW8ZZZ61ZHG000001";
  if (tab === "car") return "Например: Hyundai Solaris 2019, 1.6 AT";
  return "Например: 04E 905 612  |  26300-35505  |  5Q0 698 151A";
}

function runTests() {
  const placeholderTests = [
    ["article", "Введите артикул запчасти"],
    ["vin", "Введите VIN-номер автомобиля"],
    ["car", "Марка, модель, год — например Toyota Camry 2018"],
    ["unknown", "Введите артикул запчасти"],
  ];

  const exampleTests = [
    ["article", "Например: 04E 905 612  |  26300-35505  |  5Q0 698 151A"],
    ["vin", "Например: XW8ZZZ61ZHG000001"],
    ["car", "Например: Hyundai Solaris 2019, 1.6 AT"],
    ["wrong", "Например: 04E 905 612  |  26300-35505  |  5Q0 698 151A"],
  ];

  placeholderTests.forEach(([tab, expected]) => {
    console.assert(
      getSearchPlaceholder(tab) === expected,
      `getSearchPlaceholder(${tab}) должен вернуть: ${expected}`,
    );
  });

  exampleTests.forEach(([tab, expected]) => {
    console.assert(
      getSearchExamples(tab) === expected,
      `getSearchExamples(${tab}) должен вернуть: ${expected}`,
    );
  });

  console.assert(tabs.length === 3, "В поисковом блоке должно быть 3 вкладки");
  console.assert(Boolean(LOGO_SRC), "Путь к логотипу должен быть задан");
  console.assert(Object.keys(photos).length >= 6, "Должно быть минимум 6 фото для дизайна");
}

runTests();

function Icon({ name, className = "h-5 w-5" }) {
  const common = {
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className,
    "aria-hidden": "true",
  };

  const icons = {
    menu: (
      <svg {...common}>
        <path d="M4 7h16" />
        <path d="M4 12h16" />
        <path d="M4 17h16" />
      </svg>
    ),
    search: (
      <svg {...common}>
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-3.5-3.5" />
      </svg>
    ),
    car: (
      <svg {...common}>
        <path d="M5 17h14" />
        <path d="M6 17v2" />
        <path d="M18 17v2" />
        <path d="M4 13l2-5a3 3 0 0 1 2.8-2h6.4A3 3 0 0 1 18 8l2 5" />
        <path d="M5 13h14v4H5z" />
        <circle cx="8" cy="15" r="1" />
        <circle cx="16" cy="15" r="1" />
      </svg>
    ),
    barcode: (
      <svg {...common}>
        <path d="M4 6v12" />
        <path d="M7 6v12" />
        <path d="M11 6v12" />
        <path d="M14 6v12" />
        <path d="M20 6v12" />
        <path d="M17 6v12" />
      </svg>
    ),
    phone: (
      <svg {...common}>
        <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.7.6 2.5a2 2 0 0 1-.5 2.1L8 9.5a16 16 0 0 0 6.5 6.5l1.2-1.2a2 2 0 0 1 2.1-.5c.8.3 1.6.5 2.5.6A2 2 0 0 1 22 16.9z" />
      </svg>
    ),
    user: (
      <svg {...common}>
        <path d="M20 21a8 8 0 0 0-16 0" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
    cart: (
      <svg {...common}>
        <path d="M6 6h15l-1.6 8.2a2 2 0 0 1-2 1.6H8.4a2 2 0 0 1-2-1.7L5 3H2" />
        <circle cx="9" cy="20" r="1" />
        <circle cx="18" cy="20" r="1" />
      </svg>
    ),
    truck: (
      <svg {...common}>
        <path d="M3 7h11v10H3z" />
        <path d="M14 10h4l3 3v4h-7" />
        <circle cx="7" cy="18" r="2" />
        <circle cx="17" cy="18" r="2" />
      </svg>
    ),
    shield: (
      <svg {...common}>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="m9 12 2 2 4-5" />
      </svg>
    ),
    headset: (
      <svg {...common}>
        <path d="M4 14v-2a8 8 0 0 1 16 0v2" />
        <path d="M4 14a2 2 0 0 1 2-2h1v6H6a2 2 0 0 1-2-2v-2z" />
        <path d="M20 14a2 2 0 0 0-2-2h-1v6h1a2 2 0 0 0 2-2v-2z" />
        <path d="M16 20c-1 .7-2.3 1-4 1" />
      </svg>
    ),
    pin: (
      <svg {...common}>
        <path d="M12 21s7-5.2 7-11a7 7 0 1 0-14 0c0 5.8 7 11 7 11z" />
        <circle cx="12" cy="10" r="2.5" />
      </svg>
    ),
    chart: (
      <svg {...common}>
        <path d="M4 19V5" />
        <path d="M4 19h16" />
        <path d="M8 15v-4" />
        <path d="M12 15V8" />
        <path d="M16 15v-7" />
        <path d="M20 7l-4 4-3-3-5 5" />
      </svg>
    ),
    wallet: (
      <svg {...common}>
        <path d="M4 7h16v12H4z" />
        <path d="M4 7V5a2 2 0 0 1 2-2h12" />
        <path d="M16 13h4" />
      </svg>
    ),
    box: (
      <svg {...common}>
        <path d="m21 8-9-5-9 5 9 5 9-5z" />
        <path d="M3 8v8l9 5 9-5V8" />
        <path d="M12 13v8" />
      </svg>
    ),
    arrow: (
      <svg {...common}>
        <path d="M5 12h14" />
        <path d="m13 6 6 6-6 6" />
      </svg>
    ),
    mail: (
      <svg {...common}>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </svg>
    ),
    clock: (
      <svg {...common}>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </svg>
    ),
    send: (
      <svg {...common}>
        <path d="m22 2-7 20-4-9-9-4 20-7z" />
        <path d="M22 2 11 13" />
      </svg>
    ),
  };

  return icons[name] || icons.car;
}

function ImageWithFallback({ src, alt, className, fallbackClassName = "", children, ...props }) {
  const [failed, setFailed] = useState(false);

  if (failed || !src) {
    return (
      <div
        className={`grid place-items-center overflow-hidden bg-gradient-to-br from-zinc-200 via-zinc-100 to-white ${
          fallbackClassName || className
        }`}
      >
        {children || <Icon name="car" className="h-10 w-10 text-zinc-400" />}
      </div>
    );
  }

  return <img src={src} alt={alt} className={className} onError={() => setFailed(true)} {...props} />;
}

function AllianceLogo({ footer = false }) {
  return (
    <div className="flex items-center gap-3">
      <ImageWithFallback
        src={LOGO_SRC}
        alt="ALLIANCE"
        className={footer ? "h-20 w-auto object-contain" : "h-16 w-auto object-contain"}
        fallbackClassName={
          footer ? "h-20 w-56 rounded-xl bg-transparent" : "h-16 w-48 rounded-xl bg-transparent"
        }
      >
        <div className="flex items-center gap-3">
          <div className="relative h-12 w-14 shrink-0">
            <div className="absolute left-0 top-6 h-5 w-12 -rotate-[28deg] rounded-l-full rounded-r-md bg-gradient-to-r from-[#8b0013] via-[#d3132d] to-[#f04a5c]" />
            <div className="absolute left-[23px] top-1 h-10 w-8 rounded-t-[18px] bg-gradient-to-br from-zinc-300 via-zinc-900 to-black" />
            <div className="absolute left-[18px] top-7 h-4 w-24 -rotate-[16deg] rounded-full bg-white/90" />
          </div>
          <div className="text-2xl font-black uppercase tracking-[0.18em] text-white">Alliance</div>
        </div>
      </ImageWithFallback>
    </div>
  );
}

const categories = [
  { title: "ТО и расходники", count: "24 675 товаров", image: photos.service },
  { title: "Тормозная система", count: "18 392 товара", image: photos.brakes },
  { title: "Подвеска", count: "16 834 товара", image: photos.suspension },
  { title: "Кузов и оптика", count: "22 106 товаров", image: photos.optics },
];

const stats = [
  { label: "Товары в наличии", value: "128 547", icon: "box", accent: "bg-emerald-500" },
  { label: "Популярные запчасти", value: "2 345", icon: "chart", accent: "bg-red-600" },
  { label: "Средняя цена", value: "2 650 ₽", icon: "wallet", accent: "bg-zinc-400" },
  { label: "Доставка от", value: "1 дня", icon: "truck", accent: "bg-red-600" },
];

const benefits = [
  { title: "Быстрая доставка", text: "По всей России и СНГ", icon: "truck" },
  { title: "Проверка совместимости", text: "Подбор по VIN и параметрам", icon: "shield" },
  { title: "Помощь менеджера", text: "Подскажем и подберём", icon: "headset" },
  { title: "Самовывоз", text: "Из 250+ пунктов выдачи", icon: "pin" },
];

const popularParts = [
  { title: "Моторные масла", text: "Синтетика, полусинтетика, допуски OEM", image: photos.oil },
  { title: "Детали двигателя", text: "Ремни, ролики, прокладки, датчики", image: photos.engine },
  { title: "Склад в наличии", text: "Быстрая выдача популярных позиций", image: photos.partsShelf },
];

export default function AllianceAutoPartsLanding() {
  const [tab, setTab] = useState("article");
  const placeholder = useMemo(() => getSearchPlaceholder(tab), [tab]);
  const examples = useMemo(() => getSearchExamples(tab), [tab]);

  return (
    <div className="min-h-screen bg-[#f4f5f7] text-[#111318]">
      <header className="sticky top-0 z-50 border-b border-black/10 bg-[#11151b] text-white shadow-xl shadow-black/10">
        <div className="mx-auto flex h-[86px] max-w-[1540px] items-center px-4 sm:px-6 lg:px-10">
          <a href="#top" className="mr-7 flex min-w-max items-center" aria-label="Alliance — главная">
            <AllianceLogo />
          </a>

          <nav className="hidden h-full items-center text-sm font-bold lg:flex">
            <a
              href="#catalog"
              className="flex h-full items-center gap-2 bg-[#cf1028] px-7 transition hover:bg-[#e21b34]"
            >
              <Icon name="menu" className="h-5 w-5" />
              Каталог
            </a>
            <a href="#brands" className="flex h-full items-center px-6 text-white/80 transition hover:text-white">
              Бренды
            </a>
            <a href="#select" className="flex h-full items-center px-6 text-white/80 transition hover:text-white">
              Подбор по авто
            </a>
            <a href="#suppliers" className="flex h-full items-center px-6 text-white/80 transition hover:text-white">
              Поставщикам
            </a>
            <a href="#about" className="flex h-full items-center px-6 text-white/80 transition hover:text-white">
              О компании
            </a>
            <a href="#contacts" className="flex h-full items-center px-6 text-white/80 transition hover:text-white">
              Контакты
            </a>
          </nav>

          <div className="ml-auto hidden items-center gap-4 xl:flex">
            <div className="flex items-center gap-3 border-r border-white/15 pr-5">
              <Icon name="phone" className="h-5 w-5 text-white/75" />
              <div>
                <div className="text-lg font-black tracking-wide">8 800 555-29-19</div>
                <div className="text-xs text-white/50">Ежедневно с 9:00 до 20:00</div>
              </div>
            </div>
            <button
              className="flex items-center gap-3 rounded border border-white/25 px-6 py-3 font-black transition hover:bg-white hover:text-[#11151b]"
              type="button"
            >
              <Icon name="user" />
              Войти
            </button>
            <button
              className="relative flex items-center gap-3 rounded border border-[#cf1028] px-6 py-3 font-black text-[#ff4055] transition hover:bg-[#cf1028] hover:text-white"
              type="button"
            >
              <Icon name="cart" />
              Корзина
              <span className="absolute -right-2 -top-2 grid h-5 w-5 place-items-center rounded-full bg-[#ff243a] text-xs text-white">
                0
              </span>
            </button>
          </div>

          <button className="ml-auto rounded border border-white/20 p-3 lg:hidden" aria-label="Открыть меню" type="button">
            <Icon name="menu" />
          </button>
        </div>
      </header>

      <main id="top">
        <section className="relative overflow-hidden bg-white">
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(207,16,40,0.07)_0%,transparent_28%,transparent_60%,rgba(17,21,27,0.08)_100%)]" />
          <div className="absolute right-0 top-0 hidden h-full w-[52%] overflow-hidden lg:block">
            <ImageWithFallback
              src={photos.heroCar}
              alt="Автомобиль на фоне главного экрана"
              className="h-full w-full object-cover opacity-75 grayscale"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-white via-white/65 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-white/20" />
            <div className="absolute left-[25%] top-0 h-full w-24 -rotate-45 bg-[#cf1028]/85" />
          </div>

          <div className="relative mx-auto grid max-w-[1540px] gap-7 px-4 pb-8 pt-10 sm:px-6 lg:grid-cols-[1fr_360px] lg:px-10 lg:pt-11">
            <div className="max-w-[900px]">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-4 py-2 text-sm font-bold text-[#cf1028]">
                <span className="h-2 w-2 rounded-full bg-[#cf1028]" />
                Оригинальные запчасти и качественные аналоги
              </div>
              <h1 className="text-[42px] font-black leading-[0.95] tracking-[-0.04em] text-black sm:text-6xl lg:text-[72px]">
                Запчасти без <br />
                <span className="text-[#cf1028]">долгих поисков</span>
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-7 text-zinc-600">
                Подбор по артикулу, VIN или автомобилю. Проверяем совместимость и предлагаем надёжные аналоги под ваш
                бюджет.
              </p>

              <div id="select" className="mt-7 overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-2xl shadow-zinc-900/10">
                <div className="grid grid-cols-1 bg-[#161a20] sm:grid-cols-3">
                  {tabs.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setTab(item.id)}
                      className={`flex items-center justify-center gap-3 border-b border-white/10 px-4 py-5 text-sm font-black transition sm:border-b-0 sm:border-r ${
                        tab === item.id
                          ? "bg-gradient-to-br from-[#df122d] to-[#b80820] text-white"
                          : "text-white/80 hover:bg-white/5 hover:text-white"
                      }`}
                      type="button"
                    >
                      <Icon name={item.id === "article" ? "barcode" : "car"} className="h-5 w-5" />
                      {item.label}
                    </button>
                  ))}
                </div>

                <div className="p-4 sm:p-5">
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <div className="flex min-h-[56px] flex-1 items-center rounded border border-zinc-200 bg-white px-4 ring-1 ring-transparent transition focus-within:border-[#cf1028] focus-within:ring-[#cf1028]/20">
                      <input
                        aria-label="Поиск запчастей"
                        className="w-full bg-transparent text-base font-medium outline-none placeholder:text-zinc-400"
                        placeholder={placeholder}
                      />
                    </div>
                    <button
                      className="rounded bg-gradient-to-b from-[#e31a34] to-[#b9071f] px-10 py-4 text-lg font-black text-white shadow-lg shadow-red-900/20 transition hover:brightness-110"
                      type="button"
                    >
                      Найти
                    </button>
                  </div>
                  <div className="mt-4 flex flex-col gap-2 text-sm text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
                    <span>{examples}</span>
                    <button
                      className="font-bold text-zinc-500 underline decoration-dotted underline-offset-4 hover:text-[#cf1028]"
                      type="button"
                    >
                      Как найти артикул?
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <aside className="rounded-xl border border-zinc-200 bg-white/95 p-5 shadow-2xl shadow-zinc-900/10 backdrop-blur">
              <h2 className="border-b border-zinc-200 pb-4 text-xl font-black">Актуально на сегодня</h2>
              <div className="divide-y divide-zinc-200">
                {stats.map((item) => (
                  <div key={item.label} className="flex items-center gap-4 py-4">
                    <div className="grid h-10 w-10 place-items-center rounded-lg bg-zinc-100 text-zinc-700">
                      <Icon name={item.icon} className="h-5 w-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-sm text-zinc-500">{item.label}</div>
                      <div className="text-2xl font-black tracking-tight">{item.value}</div>
                    </div>
                    <span className={`h-3 w-3 rounded-full ${item.accent}`} />
                  </div>
                ))}
              </div>
              <button
                className="mt-2 w-full rounded border border-zinc-400 px-5 py-4 font-black transition hover:border-[#cf1028] hover:bg-[#cf1028] hover:text-white"
                type="button"
              >
                Подробнее о доставке
              </button>
            </aside>
          </div>
        </section>

        <section id="catalog" className="mx-auto max-w-[1540px] px-4 py-5 sm:px-6 lg:px-10">
          <div className="mb-4 flex items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl font-black tracking-tight">Каталог запчастей</h2>
              <p className="mt-1 text-zinc-500">Основные направления для быстрого выбора</p>
            </div>
            <button className="hidden items-center gap-2 text-sm font-black text-[#cf1028] md:flex" type="button">
              Все категории <Icon name="arrow" className="h-4 w-4" />
            </button>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {categories.map((cat) => (
              <article
                key={cat.title}
                className="group overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-zinc-900/10"
              >
                <div className="relative h-44 overflow-hidden">
                  <ImageWithFallback
                    src={cat.image}
                    alt={cat.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="text-2xl font-black leading-tight">{cat.title}</h3>
                    <p className="mt-1 text-sm font-medium text-white/75">{cat.count}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4">
                  <span className="text-sm font-bold text-zinc-500">Перейти в раздел</span>
                  <div className="grid h-9 w-9 place-items-center rounded-full text-[#cf1028] transition group-hover:bg-[#cf1028] group-hover:text-white">
                    <Icon name="arrow" className="h-5 w-5" />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-[1540px] px-4 pb-5 sm:px-6 lg:px-10">
          <div className="grid gap-4 lg:grid-cols-3">
            {popularParts.map((item) => (
              <article
                key={item.title}
                className="group relative min-h-[230px] overflow-hidden rounded-2xl bg-[#11151b] p-6 text-white shadow-xl shadow-zinc-900/10"
              >
                <ImageWithFallback
                  src={item.image}
                  alt={item.title}
                  className="absolute inset-0 h-full w-full object-cover opacity-55 transition duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-transparent" />
                <div className="relative z-10 max-w-xs">
                  <div className="mb-3 inline-flex rounded-full bg-[#cf1028] px-3 py-1 text-xs font-black uppercase tracking-wide">
                    Фото-раздел
                  </div>
                  <h3 className="text-3xl font-black">{item.title}</h3>
                  <p className="mt-3 leading-6 text-white/75">{item.text}</p>
                  <button className="mt-6 inline-flex items-center gap-2 font-black text-white" type="button">
                    Смотреть <Icon name="arrow" className="h-4 w-4" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-[1540px] px-4 sm:px-6 lg:px-10">
          <div className="grid overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm md:grid-cols-2 xl:grid-cols-4">
            {benefits.map((benefit, index) => (
              <div
                key={benefit.title}
                className={`flex items-center gap-4 p-5 ${
                  index !== benefits.length - 1 ? "border-b border-zinc-200 md:border-r xl:border-b-0" : ""
                }`}
              >
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-red-50 text-[#cf1028]">
                  <Icon name={benefit.icon} className="h-7 w-7" />
                </div>
                <div>
                  <div className="font-black">{benefit.title}</div>
                  <div className="mt-1 text-sm text-zinc-500">{benefit.text}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-[1540px] px-4 py-7 sm:px-6 lg:px-10">
          <div className="relative overflow-hidden rounded-2xl bg-[#12171e] p-7 text-white shadow-2xl shadow-zinc-900/20 lg:p-9">
            <ImageWithFallback
              src={photos.vinBanner}
              alt="Спортивный автомобиль"
              className="absolute inset-0 h-full w-full object-cover opacity-35"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#11151b] via-[#11151b]/92 to-[#cf1028]/35" />
            <div className="absolute right-0 top-0 h-full w-1/3 bg-[#cf1028]/25 blur-3xl" />

            <div className="relative z-10 grid gap-6 lg:grid-cols-[320px_1fr_520px] lg:items-center">
              <div>
                <h2 className="text-3xl font-black leading-tight md:text-4xl">
                  Не знаете артикул? <br />
                  <span className="text-[#ff3148]">Отправьте VIN</span>
                </h2>
              </div>
              <p className="max-w-sm text-lg leading-7 text-white/80">
                Мы подберём запчасти точно для вашего автомобиля и предложим варианты по цене и срокам.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <div className="flex min-h-[58px] flex-1 items-center gap-3 rounded bg-white px-4 text-zinc-900">
                  <span className="rounded border border-zinc-300 px-2 py-1 text-xs font-black text-zinc-500">VIN</span>
                  <input className="w-full bg-transparent outline-none placeholder:text-zinc-400" placeholder="Введите VIN-номер автомобиля" />
                </div>
                <button
                  className="flex items-center justify-center gap-3 rounded bg-gradient-to-b from-[#e31a34] to-[#b9071f] px-8 py-4 font-black text-white transition hover:brightness-110"
                  type="button"
                >
                  <Icon name="send" />
                  Отправить
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer id="contacts" className="bg-[#11151b] text-white">
        <div className="mx-auto grid max-w-[1540px] gap-8 px-4 py-9 sm:px-6 md:grid-cols-2 lg:grid-cols-[1.4fr_0.8fr_0.9fr_0.8fr_1.1fr] lg:px-10">
          <div>
            <AllianceLogo footer />
            <p className="mt-4 max-w-xs text-sm leading-6 text-white/55">
              Надёжные автозапчасти, проверенные аналоги и подбор под ваш автомобиль.
            </p>
            <div className="mt-5 flex gap-3">
              {["VK", "TG", "YT"].map((social) => (
                <button
                  key={social}
                  className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-xs font-black transition hover:bg-[#cf1028]"
                  type="button"
                >
                  {social}
                </button>
              ))}
            </div>
          </div>

          <FooterColumn title="Каталог" links={["ТО и расходники", "Тормозная система", "Подвеска", "Кузов и оптика", "Все категории"]} />
          <FooterColumn title="Покупателям" links={["Доставка и оплата", "Гарантия и возврат", "Как подобрать запчасть", "Вопросы и ответы", "Новости и акции"]} />
          <FooterColumn title="Компания" links={["О компании", "Поставщикам", "Вакансии", "Контакты"]} />

          <div>
            <h3 className="mb-4 font-black">Контакты</h3>
            <div className="space-y-3 text-sm text-white/65">
              <p className="flex items-center gap-3">
                <Icon name="phone" className="h-4 w-4" /> 8 800 555-29-19
              </p>
              <p className="flex items-center gap-3">
                <Icon name="mail" className="h-4 w-4" /> info@alliance-parts.ru
              </p>
              <p className="flex items-center gap-3">
                <Icon name="pin" className="h-4 w-4" /> г. Москва, ул. Автомобильная, 10
              </p>
              <p className="flex items-center gap-3">
                <Icon name="clock" className="h-4 w-4" /> Ежедневно с 9:00 до 20:00
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FooterColumn({ title, links }) {
  return (
    <div>
      <h3 className="mb-4 font-black">{title}</h3>
      <ul className="space-y-2 text-sm text-white/60">
        {links.map((link) => (
          <li key={link}>
            <a href="#top" className="transition hover:text-white">
              {link}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
