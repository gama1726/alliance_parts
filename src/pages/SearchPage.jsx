import { useEffect, useMemo, useState } from "react";
import { catalogGroups, garageCars, getProductById, parseVin, resolveProductIdFromQuery, vinLookup } from "../data/mockData.js";
import { Icon } from "../components/Icon.jsx";
import { ImageWithFallback } from "../components/ImageWithFallback.jsx";

function detectQueryType(query) {
  const raw = String(query || "").trim();
  if (!raw) return "empty";
  const compact = raw.replace(/[\s\u00A0\-–—._/\\|]+/g, "").toUpperCase();
  if (compact.length === 17) return "vin";
  if (/[A-Z]/i.test(raw) && /\d/.test(raw)) return "article";
  if (raw.length < 3) return "too_short";
  return "text";
}

function getSearchHint(query, hasVinMatch, hasProductMatch) {
  const raw = String(query || "").trim();
  const compact = raw.replace(/[\s\u00A0\-–—._/\\|]+/g, "").toUpperCase();
  const type = detectQueryType(raw);

  if (!raw) {
    return {
      kind: "error",
      title: "Пустой запрос",
      text: "Введите артикул, VIN или текст запроса перед поиском.",
    };
  }

  if (hasVinMatch || hasProductMatch) {
    return {
      kind: "ok",
      title: "Результаты найдены",
      text: "Откройте карточку или используйте фильтры справа для следующего шага.",
    };
  }

  if (type === "vin") {
    if (!parseVin(raw)) {
      return {
        kind: "error",
        title: "VIN похож на некорректный",
        text: "VIN должен содержать 17 символов и не включать I, O, Q.",
      };
    }
    return {
      kind: "empty",
      title: "VIN не найден в демо-базе",
      text: "Для проверки используйте VF3MJAHXVGS314095.",
    };
  }

  if (type === "too_short") {
    return {
      kind: "error",
      title: "Слишком короткий запрос",
      text: "Введите минимум 3 символа или полный артикул.",
    };
  }

  if (type === "article") {
    return {
      kind: "empty",
      title: "Артикул не найден",
      text: "Попробуйте OE31601 или 4144109100.",
    };
  }

  return {
    kind: "empty",
    title: "Совпадений нет",
    text: `По запросу «${compact || raw}» ничего не найдено в локальных данных.`,
  };
}

export function SearchPage({ query, onOpenProduct, onGoGarage }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 320);
    return () => clearTimeout(timer);
  }, [query]);

  const vin = useMemo(() => parseVin(query), [query]);
  const vehicle = useMemo(() => (vin ? vinLookup[vin] : null), [vin]);
  const productId = useMemo(() => resolveProductIdFromQuery(query), [query]);
  const product = useMemo(() => (productId ? getProductById(productId) : null), [productId]);
  const hint = useMemo(() => getSearchHint(query, Boolean(vehicle), Boolean(product)), [query, vehicle, product]);

  if (isLoading) {
    return (
      <main className="mx-auto max-w-[1400px] px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 h-5 w-56 animate-pulse rounded bg-slate-200" />
        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
          <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5">
            <div className="h-6 w-44 animate-pulse rounded bg-slate-200" />
            <div className="h-4 w-full animate-pulse rounded bg-slate-100" />
            <div className="h-4 w-5/6 animate-pulse rounded bg-slate-100" />
            <div className="mt-4 h-28 w-full animate-pulse rounded-xl bg-slate-100" />
          </div>
          <aside className="rounded-2xl border border-slate-200 bg-white p-5">
            <div className="h-4 w-24 animate-pulse rounded bg-slate-200" />
            <div className="mt-4 space-y-3">
              <div className="h-12 animate-pulse rounded bg-slate-100" />
              <div className="h-12 animate-pulse rounded bg-slate-100" />
              <div className="h-12 animate-pulse rounded bg-slate-100" />
            </div>
          </aside>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-[1400px] px-4 py-8 sm:px-6 lg:px-8">
      <nav aria-label="Навигация" className="mb-6 flex flex-wrap items-center gap-2 text-sm text-slate-500">
        <span className="font-medium text-slate-900">Результаты</span>
        <span className="text-slate-300">/</span>
        <span className="max-w-[min(100%,280px)] truncate">{query || "—"}</span>
      </nav>

      {vehicle ? (
        <div className="mb-8 flex flex-col gap-4 rounded-2xl border border-teal-200/80 bg-gradient-to-br from-teal-50 to-cyan-50 p-5 shadow-sm md:flex-row md:items-center md:justify-between">
          <div className="flex items-start gap-4">
            <div className="grid h-12 w-12 place-items-center rounded-xl bg-white text-teal-700 shadow-sm">
              <Icon name="car" className="h-6 w-6" />
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wide text-teal-800">Авто по VIN</div>
              <div className="mt-1 text-xl font-black text-slate-900">
                {vehicle.brand} {vehicle.model}{" "}
                <span className="text-base font-bold text-slate-600">({vehicle.generation})</span>
              </div>
              <div className="mt-1 text-sm text-slate-600">
                {vehicle.year} · {vehicle.engine}
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={onGoGarage}
            className="shrink-0 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-800 shadow-sm transition hover:bg-slate-50"
          >
            Открыть гараж
          </button>
        </div>
      ) : null}

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div>
          <h1 className="text-2xl font-black text-slate-900 sm:text-3xl">Что нашли</h1>
          <p className="mt-2 max-w-2xl text-slate-600">
            Сейчас показаны демо-совпадения из локального набора. После бэкенда здесь будет полноценная выдача,
            фильтры и сортировки как на крупных витринах.
          </p>

          <div
            className={`mt-4 rounded-xl border px-4 py-3 text-sm ${
              hint.kind === "ok"
                ? "border-emerald-200 bg-emerald-50 text-emerald-900"
                : hint.kind === "error"
                  ? "border-rose-200 bg-rose-50 text-rose-900"
                  : "border-amber-200 bg-amber-50 text-amber-900"
            }`}
          >
            <div className="font-bold">{hint.title}</div>
            <div className="mt-1">{hint.text}</div>
          </div>

          {product ? (
            <button
              type="button"
              onClick={() => onOpenProduct(product.id)}
              className="mt-6 w-full max-w-xl rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-md transition hover:border-teal-300 hover:shadow-lg"
            >
              <div className="flex gap-4">
                <div className="h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-slate-100">
                  <ImageWithFallback
                    src={product.image}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-lg bg-slate-900 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide text-white">
                      Совпадение
                    </span>
                    {product.badges.slice(0, 2).map((b) => (
                      <span
                        key={b}
                        className="rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-[11px] font-semibold text-slate-600"
                      >
                        {b}
                      </span>
                    ))}
                  </div>
                  <div className="mt-2 text-lg font-black text-slate-900">
                    {product.brand} · {product.name}
                  </div>
                  <div className="text-sm font-bold text-teal-700">Артикул {product.article}</div>
                  <div className="mt-2 flex items-center gap-2 text-sm text-slate-500">
                    <span className="text-amber-500" aria-hidden>
                      ★
                    </span>
                    {product.rating} · {product.reviewsCount} отзывов (демо)
                  </div>
                </div>
              </div>
            </button>
          ) : (
            <div className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center">
              <p className="font-semibold text-slate-800">Для этого запроса нет демо-карточки</p>
              <p className="mt-2 text-sm text-slate-600">
                Попробуйте <strong>OE31601</strong>, <strong>4144109100</strong> или VIN{" "}
                <strong>VF3MJAHXVGS314095</strong>.
              </p>
            </div>
          )}
        </div>

        <aside className="h-fit space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-sm font-bold uppercase tracking-wide text-slate-500">Ваш гараж</h2>
          <ul className="space-y-3">
            {garageCars.map((c) => (
              <li key={c.id} className="rounded-xl border border-slate-100 bg-slate-50 p-3 text-sm">
                <div className="font-bold text-slate-900">{c.label}</div>
                <div className="text-xs text-slate-600">{c.subtitle}</div>
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={onGoGarage}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 py-3 text-sm font-bold text-white transition hover:bg-slate-800"
          >
            <Icon name="garage" className="h-4 w-4" />
            Все автомобили
          </button>

          <h2 className="pt-2 text-sm font-bold uppercase tracking-wide text-slate-500">Категории (демо)</h2>
          <ul className="space-y-2 text-sm">
            {catalogGroups.map((g) => (
              <li
                key={g.id}
                className="flex items-center justify-between rounded-lg border border-transparent px-2 py-2 hover:border-slate-200 hover:bg-slate-50"
              >
                <span className="font-medium text-slate-800">{g.title}</span>
                <span className="text-xs text-slate-400">{g.count}</span>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </main>
  );
}
