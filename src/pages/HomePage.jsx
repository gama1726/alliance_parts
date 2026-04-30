import { useMemo, useState } from "react";
import { Icon } from "../components/Icon.jsx";
import { ImageWithFallback } from "../components/ImageWithFallback.jsx";

const photos = {
  heroCar:
    "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1200&q=85",
  service: "/images/category-maintenance.jpg",
  brakes: "/images/category-brakes.jpg",
  suspension: "/images/category-suspension.jpg",
  optics: "/images/category-optics.jpg",
  vinBanner:
    "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1000&q=85",
  oil: "https://images.unsplash.com/photo-1625047509248-ec889cbff17f?auto=format&fit=crop&w=600&q=85",
  engine: "https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&w=600&q=85",
  partsShelf: "https://images.unsplash.com/photo-1606577924006-27d39b132ae2?auto=format&fit=crop&w=600&q=85",
};

const tabs = [
  { id: "article", label: "По артикулу" },
  { id: "vin", label: "VIN / Frame" },
  { id: "car", label: "По авто" },
];

function getSearchPlaceholder(tab) {
  if (tab === "vin") return "17 знаков VIN — например VF3MJAHXVGS314095";
  if (tab === "car") return "Марка, модель, год — Toyota Camry 2018";
  return "Артикул — например OE31601, 4144109100";
}

function getSearchExamples(tab) {
  if (tab === "vin") return "Демо: VF3MJAHXVGS314095 распознаётся в поиске";
  if (tab === "car") return "Позже: интеграция с каталогом подбора";
  return "Демо-совпадения: OE31601 · 4144109100";
}

const categories = [
  { title: "ТО и расходники", count: "24 675 товаров", image: photos.service },
  { title: "Тормозная система", count: "18 392 товара", image: photos.brakes },
  { title: "Подвеска", count: "16 834 товара", image: photos.suspension },
  { title: "Кузов и оптика", count: "22 106 товаров", image: photos.optics },
];

const stats = [
  { label: "Кроссы проверены", value: "130k+", icon: "box", chip: "bg-teal-500" },
  { label: "Позиций в индексе", value: "94k+", icon: "chart", chip: "bg-cyan-500" },
  { label: "Средний чек (демо)", value: "2 650 ₽", icon: "wallet", chip: "bg-slate-400" },
  { label: "Логистика от", value: "1 дня", icon: "truck", chip: "bg-amber-500" },
];

const benefits = [
  { title: "Доставка по сети", text: "РФ и СНГ, от склада партнёра", icon: "truck" },
  { title: "Подбор по VIN", text: "Снижаем риск неверной детали", icon: "shield" },
  { title: "Менеджер онлайн", text: "Уточнение по каталогам OEM", icon: "headset" },
  { title: "Самовывоз", text: "250+ точек (витрина)", icon: "pin" },
];

const popularParts = [
  { title: "Масла и фильтры", text: "Допуски OEM, интервалы ТО", image: photos.oil },
  { title: "Двигатель", text: "Ремни, ролики, узлы", image: photos.engine },
  { title: "Склад в наличии", text: "Быстрые позиции", image: photos.partsShelf },
];

export function HomePage({ onSearchSubmit, onGoGarage, recentSearches = [] }) {
  const [tab, setTab] = useState("article");
  const [q, setQ] = useState("");
  const placeholder = useMemo(() => getSearchPlaceholder(tab), [tab]);
  const examples = useMemo(() => getSearchExamples(tab), [tab]);

  const submit = (e) => {
    e.preventDefault();
    const t = q.trim();
    if (!t) return;
    onSearchSubmit(t, tab);
  };

  return (
    <main id="top">
      <section className="relative overflow-hidden bg-white">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_400px_at_15%_-10%,rgba(45,212,191,0.18),transparent),radial-gradient(700px_500px_at_100%_0%,rgba(14,165,233,0.12),transparent)]" />
        <div className="absolute right-0 top-0 hidden h-full w-1/2 lg:block">
          <ImageWithFallback
            src={photos.heroCar}
            alt=""
            className="h-full w-full object-cover opacity-35 grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/85 to-transparent" />
        </div>

        <div className="relative mx-auto grid max-w-[1400px] gap-8 px-4 pb-10 pt-10 sm:px-6 lg:grid-cols-[1fr_340px] lg:px-8 lg:pt-12">
          <div className="max-w-[720px]">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-4 py-2 text-xs font-bold uppercase tracking-wide text-teal-800">
              <span className="h-2 w-2 rounded-full bg-teal-500 shadow shadow-teal-500/50" />
              Alliance Parts · демо витрина
            </div>
            <h1 className="text-4xl font-black leading-[0.98] tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              Запчасти с ясной{" "}
              <span className="bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
                логикой подбора
              </span>
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate-600">
              Один поисковый поток для артикула, VIN и автомобиля — как на современных маркетплейсах, но с вашим брендом
              и локальными данными.
            </p>

            <form
              onSubmit={submit}
              id="select"
              className="mt-8 overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-[0_24px_80px_-24px_rgba(15,23,42,0.25)]"
            >
              <div className="grid grid-cols-1 bg-slate-900 sm:grid-cols-3">
                {tabs.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setTab(item.id)}
                    className={`flex items-center justify-center gap-2 border-b border-white/10 px-4 py-4 text-xs font-bold uppercase tracking-wide transition sm:border-b-0 sm:border-r sm:border-white/10 sm:last:border-r-0 ${
                      tab === item.id
                        ? "bg-gradient-to-br from-teal-500 to-cyan-600 text-white shadow-inner"
                        : "text-slate-300 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <Icon name={item.id === "article" ? "barcode" : "car"} className="h-4 w-4" />
                    {item.label}
                  </button>
                ))}
              </div>

              <div className="p-4 sm:p-5">
                <div className="flex flex-col gap-3 sm:flex-row">
                  <div className="flex min-h-[52px] flex-1 items-center rounded-xl border border-slate-200 bg-slate-50/80 px-4 ring-1 ring-transparent transition focus-within:border-teal-400 focus-within:ring-teal-400/20">
                    <input
                      value={q}
                      onChange={(e) => setQ(e.target.value)}
                      aria-label="Поиск запчастей"
                      className="w-full bg-transparent text-base font-medium text-slate-900 outline-none placeholder:text-slate-400"
                      placeholder={placeholder}
                    />
                  </div>
                  <button
                    type="submit"
                    className="rounded-xl bg-gradient-to-r from-teal-500 to-cyan-600 px-8 py-3.5 text-base font-bold text-white shadow-lg shadow-teal-900/20 transition hover:brightness-110"
                  >
                    Найти
                  </button>
                </div>
                <div className="mt-4 flex flex-col gap-2 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
                  <span>{examples}</span>
                  <button
                    type="button"
                    className="font-semibold text-teal-700 underline decoration-dotted underline-offset-4 hover:text-teal-900"
                  >
                    Подсказка по артикулу
                  </button>
                </div>
              {recentSearches.length ? (
                <div className="mt-4 border-t border-slate-100 pt-3">
                  <div className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-500">Недавние запросы</div>
                  <div className="flex flex-wrap gap-2">
                    {recentSearches.map((item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => onSearchSubmit(item)}
                        className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700 transition hover:border-teal-300 hover:text-teal-800"
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              ) : null}
              </div>
            </form>
          </div>

          <aside className="h-fit rounded-2xl border border-slate-200 bg-white/90 p-5 shadow-xl shadow-slate-900/5 backdrop-blur">
            <div className="flex items-center justify-between gap-3 border-b border-slate-200 pb-4">
              <h2 className="text-lg font-bold text-slate-900">Сводка</h2>
              <button
                type="button"
                onClick={onGoGarage}
                className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-bold text-slate-700 transition hover:border-teal-300 hover:text-teal-800"
              >
                <Icon name="garage" className="h-4 w-4" />
                Гараж
              </button>
            </div>
            <div className="divide-y divide-slate-100">
              {stats.map((item) => (
                <div key={item.label} className="flex items-center gap-3 py-4">
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-slate-100 text-slate-700">
                    <Icon name={item.icon} className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-xs font-medium text-slate-500">{item.label}</div>
                    <div className="text-xl font-black tracking-tight text-slate-900">{item.value}</div>
                  </div>
                  <span className={`h-2.5 w-2.5 rounded-full ${item.chip}`} />
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section id="catalog" className="mx-auto max-w-[1400px] px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">Категории</h2>
            <p className="mt-1 text-slate-600">Быстрый вход в разделы витрины</p>
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-teal-700">Локальные плейсхолдеры</span>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {categories.map((cat) => (
            <article
              key={cat.title}
              className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-slate-900/10"
            >
              <div className="relative h-40 overflow-hidden">
                <ImageWithFallback
                  src={cat.image}
                  alt={cat.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/20 to-transparent" />
                <div className="absolute bottom-3 left-4 right-4 text-white">
                  <h3 className="text-xl font-black leading-tight">{cat.title}</h3>
                  <p className="mt-1 text-xs font-medium text-white/80">{cat.count}</p>
                </div>
              </div>
              <div className="flex items-center justify-between px-4 py-3">
                <span className="text-xs font-semibold text-slate-500">Скоро: SEO-лендинг раздела</span>
                <div className="grid h-9 w-9 place-items-center rounded-full bg-teal-50 text-teal-700 transition group-hover:bg-teal-600 group-hover:text-white">
                  <Icon name="arrow" className="h-4 w-4" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-4 pb-8 sm:px-6 lg:px-8">
        <div className="grid gap-4 lg:grid-cols-3">
          {popularParts.map((item) => (
            <article
              key={item.title}
              className="group relative min-h-[200px] overflow-hidden rounded-2xl bg-slate-900 p-6 text-white shadow-lg"
            >
              <ImageWithFallback
                src={item.image}
                alt={item.title}
                className="absolute inset-0 h-full w-full object-cover opacity-40 transition duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/70 to-transparent" />
              <div className="relative z-10 max-w-xs">
                <div className="mb-2 inline-flex rounded-full bg-teal-500/90 px-3 py-1 text-[10px] font-black uppercase tracking-wide">
                  Раздел
                </div>
                <h3 className="text-2xl font-black">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/80">{item.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="grid overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm md:grid-cols-2 xl:grid-cols-4">
          {benefits.map((benefit, index) => (
            <div
              key={benefit.title}
              className={`flex items-start gap-3 p-5 ${
                index !== benefits.length - 1 ? "border-b border-slate-100 md:border-b-0 md:border-r xl:border-r-slate-100" : ""
              }`}
            >
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-teal-50 text-teal-700">
                <Icon name={benefit.icon} className="h-6 w-6" />
              </div>
              <div>
                <div className="font-bold text-slate-900">{benefit.title}</div>
                <div className="mt-1 text-sm text-slate-600">{benefit.text}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-4 py-10 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl border border-slate-800/50 bg-slate-900 p-7 text-white shadow-2xl lg:p-9">
          <ImageWithFallback
            src={photos.vinBanner}
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-30"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/95 to-teal-900/40" />

          <div className="relative z-10 grid gap-6 lg:grid-cols-[280px_1fr_440px] lg:items-center">
            <div>
              <h2 className="text-2xl font-black leading-tight md:text-3xl">
                VIN без лишних шагов
              </h2>
              <p className="mt-2 text-sm text-teal-100/90">Тот же запрос уйдёт в страницу результатов с расшифровкой.</p>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-slate-200">
              Введите VIN в блоке выше (вкладка «VIN / Frame») или в шапке сайта — демо распознаёт VF3MJAHXVGS314095.
            </p>
            <button
              type="button"
              onClick={() => {
                setTab("vin");
                document.getElementById("select")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="rounded-xl border border-white/20 bg-white/10 px-6 py-3.5 text-sm font-bold backdrop-blur transition hover:bg-white/20"
            >
              Перейти к полю VIN
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
