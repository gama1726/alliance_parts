import { useState } from "react";
import { Icon } from "../components/Icon.jsx";
import { ImageWithFallback } from "../components/ImageWithFallback.jsx";

function formatPrice(n) {
  return new Intl.NumberFormat("ru-RU").format(n);
}

export function ProductPage({ product, onBack, onSearchArticle, onAddToCart }) {
  const [tab, setTab] = useState("offers");
  const [openAnalog, setOpenAnalog] = useState(null);

  if (product === undefined) {
    return (
      <main className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6 lg:px-8">
        <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6">
          <div className="h-6 w-56 animate-pulse rounded bg-slate-200" />
          <div className="h-4 w-full animate-pulse rounded bg-slate-100" />
          <div className="h-4 w-4/5 animate-pulse rounded bg-slate-100" />
          <div className="h-36 animate-pulse rounded-xl bg-slate-100" />
        </div>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6 lg:px-8">
        <p className="text-slate-600">Товар не найден в демо-данных.</p>
        <button
          type="button"
          onClick={onBack}
          className="mt-4 rounded-xl bg-slate-900 px-5 py-3 text-sm font-bold text-white"
        >
          Назад
        </button>
      </main>
    );
  }

  const toggleAnalog = (id) => {
    setOpenAnalog((x) => (x === id ? null : id));
  };

  return (
    <main className="mx-auto max-w-[1400px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
      <button
        type="button"
        onClick={onBack}
        className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-teal-800 transition hover:text-teal-950"
      >
        <span className="inline-block rotate-180">
          <Icon name="arrow" className="h-4 w-4" />
        </span>
        К результатам
      </button>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_380px]">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-2xl font-black text-slate-900 sm:text-3xl lg:text-4xl">
              {product.name}
            </h1>
          </div>
          <div className="mt-2 flex flex-wrap items-center gap-3 text-sm">
            <span className="font-bold text-slate-700">{product.brand}</span>
            <button
              type="button"
              onClick={() => onSearchArticle(product.article)}
              className="rounded-lg bg-slate-900 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white transition hover:bg-slate-800"
            >
              Артикул {product.article}
            </button>
            <span className="flex items-center gap-1 text-slate-500">
              <span className="text-amber-500">★</span>
              {product.rating} · {product.reviewsCount} отзывов
            </span>
          </div>
          <p className="mt-3 max-w-3xl text-slate-600">{product.line}</p>

          <div className="mt-4 flex flex-wrap gap-2">
            {product.badges.map((b) => (
              <span
                key={b}
                className="rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-900"
              >
                {b}
              </span>
            ))}
          </div>

          <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="flex border-b border-slate-200 bg-slate-50/80">
              {[
                { id: "offers", label: "Предложения" },
                { id: "analogs", label: "Аналоги" },
              ].map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTab(t.id)}
                  className={`flex-1 px-4 py-3 text-sm font-bold transition sm:flex-none sm:px-8 ${
                    tab === t.id
                      ? "border-b-2 border-teal-500 bg-white text-slate-900"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {tab === "offers" ? (
              <div className="divide-y divide-slate-100">
                {product.offers.map((o) => (
                  <div
                    key={o.id}
                    className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div>
                      <div className="font-semibold text-slate-900">{o.supplier}</div>
                      <div className="text-xs text-slate-500">
                        {o.city} · {o.stock}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-xl font-black text-slate-900">
                        {formatPrice(o.price)} ₽
                      </div>
                      <button
                        type="button"
                        onClick={() => onAddToCart(product.id)}
                        className="rounded-lg border border-teal-300 bg-teal-50 px-3 py-2 text-xs font-bold text-teal-800 transition hover:border-teal-500 hover:bg-teal-100"
                      >
                        В корзину
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-2">
                {product.analogs.map((a) => {
                  const open = openAnalog === a.id;
                  return (
                    <div key={a.id} className="mb-2 rounded-xl border border-slate-100 bg-slate-50/50">
                      <button
                        type="button"
                        onClick={() => toggleAnalog(a.id)}
                        className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left"
                      >
                        <div>
                          <div className="text-sm font-black text-slate-900">
                            {a.brand} {a.article}
                          </div>
                          <div className="text-xs text-slate-600">{a.name}</div>
                        </div>
                        <Icon
                          name="chevronDown"
                          className={`h-5 w-5 shrink-0 text-slate-400 transition ${open ? "rotate-180" : ""}`}
                        />
                      </button>
                      {open ? (
                        <div className="border-t border-slate-100 bg-white px-4 py-3">
                          <div className="text-[11px] font-bold uppercase tracking-wide text-slate-400">
                            Предложения
                          </div>
                          <ul className="mt-2 space-y-2">
                            {a.offers.map((o, i) => (
                              <li
                                key={`${a.id}-${i}`}
                                className="flex items-center justify-between rounded-lg border border-slate-100 px-3 py-2 text-sm"
                              >
                                <span className="text-slate-600">{o.supplier}</span>
                                <span className="font-black text-slate-900">{formatPrice(o.price)} ₽</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        <aside className="space-y-4">
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-md">
            <div className="aspect-square bg-slate-100">
              <ImageWithFallback src={product.image} alt={product.name} className="h-full w-full object-cover" />
            </div>
          </div>

          <div className="rounded-2xl border border-teal-200/80 bg-gradient-to-br from-teal-50 to-white p-5 shadow-sm">
            <h2 className="text-sm font-bold uppercase tracking-wide text-teal-900">Рекомендуем</h2>
            <p className="mt-1 text-xs text-teal-900/70">Как на витрине: приоритет склада и сроков.</p>
            <ul className="mt-4 space-y-3">
              {product.recommended.map((r) => (
                <li
                  key={r.id}
                  className={`rounded-xl border px-4 py-3 ${
                    r.highlight
                      ? "border-teal-400 bg-white shadow-sm"
                      : "border-slate-200 bg-white/60"
                  }`}
                >
                  <div className="text-xs font-semibold text-slate-500">{r.title}</div>
                  <div className="mt-1 flex items-baseline justify-between gap-2">
                    <span className="text-2xl font-black text-slate-900">
                      {formatPrice(r.price)}
                      {r.currency}
                    </span>
                    <span className="text-xs font-bold text-slate-500">{r.delivery}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => onAddToCart(product.id)}
                    className="mt-2 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-[11px] font-bold uppercase tracking-wide text-slate-600 transition hover:border-teal-400 hover:text-teal-900"
                  >
                    Добавить в корзину
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </main>
  );
}
