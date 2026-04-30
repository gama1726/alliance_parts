/** Локальные демо-данные до подключения бэкенда */

export const garageCars = [
  {
    id: "g1",
    label: "SSANGYONG Kyron",
    subtitle: "2.0 Xdi 4x4 · D20DT · 2007",
    vin: "—",
    catalogHint: "Узлы: CHASSIS → FRT HUB & DISC",
  },
  {
    id: "g2",
    label: "PEUGEOT 3008",
    subtitle: "P84E · 1.6 THP · 2016",
    vin: "VF3MJAHXVGS314095",
    catalogHint: "Оригинальный каталог: тормозной диск задний",
  },
];

export const vinLookup = {
  VF3MJAHXVGS314095: {
    brand: "PEUGEOT",
    model: "3008",
    generation: "II (P84E)",
    year: "2016",
    engine: "1.6 THP",
  },
};

export const catalogGroups = [
  { id: "maint", title: "ТО и расходники", count: "24 675" },
  { id: "brake", title: "Тормозная система", count: "18 392" },
  { id: "susp", title: "Подвеска", count: "16 834" },
  { id: "body", title: "Кузов и оптика", count: "22 106" },
];

const placeholderImg =
  "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=800&q=80";

export const productsById = {
  oe31601: {
    id: "oe31601",
    article: "OE31601",
    brand: "AZUMI",
    name: "Фильтр масляный",
    line: "Сервисный интервал — по регламенту производителя",
    rating: 4.7,
    reviewsCount: 128,
    image: "https://images.unsplash.com/photo-1625047509248-ec889cbff17f?auto=format&fit=crop&w=720&q=80",
    badges: ["В наличии на складе", "Подбор по VIN"],
    recommended: [
      { id: "r1", title: "Наш склад · под заказ 1 день", price: 612, currency: "₽", delivery: "Завтра", highlight: true },
      { id: "r2", title: "Партнёр · Москва", price: 589, currency: "₽", delivery: "2–3 дня" },
      { id: "r3", title: "Партнёр · регион", price: 540, currency: "₽", delivery: "4–6 дней" },
    ],
    offers: [
      { id: "o1", supplier: "Alliance Север", price: 612, stock: "12 шт.", city: "СПб" },
      { id: "o2", supplier: "Alliance Юг", price: 598, stock: "8 шт.", city: "Краснодар" },
      { id: "o3", supplier: "Партнёр A", price: 575, stock: "Под заказ", city: "Москва" },
      { id: "o4", supplier: "Партнёр B", price: 560, stock: "Под заказ", city: "Казань" },
      { id: "o5", supplier: "Партнёр C", price: 548, stock: "Остаток уточняйте", city: "Екатеринбург" },
    ],
    analogs: [
      {
        id: "a1",
        brand: "PARTRA",
        article: "FO7028",
        name: "Фильтр масляный",
        offers: [
          { supplier: "Склад East", price: 499 },
          { supplier: "Партнёр", price: 521 },
        ],
      },
      {
        id: "a2",
        brand: "LECAR",
        article: "LECAR000162501",
        name: "Фильтр масляный",
        offers: [{ supplier: "Склад West", price: 512 }],
      },
      {
        id: "a3",
        brand: "SUFIX",
        article: "SP-1073",
        name: "Фильтр масляный",
        offers: [
          { supplier: "Партнёр", price: 505 },
          { supplier: "Регион", price: 488 },
        ],
      },
      {
        id: "a4",
        brand: "JAPANPARTS",
        article: "FO-ECO009",
        name: "Фильтр масляный",
        offers: [{ supplier: "Импорт", price: 534 }],
      },
    ],
  },
  "4144109100": {
    id: "4144109100",
    article: "4144109100",
    brand: "SSANGYONG",
    name: "Ступица передняя в сборе (пример из каталога)",
    line: "Оригинальная позиция по схеме FRT HUB & DISC",
    rating: 4.9,
    reviewsCount: 42,
    image: placeholderImg,
    badges: ["Оригинал", "Проверка по VIN"],
    recommended: [
      { id: "y1", title: "Alliance · оригинал", price: 18490, currency: "₽", delivery: "3 дня", highlight: true },
      { id: "y2", title: "Аналог премиум", price: 13250, currency: "₽", delivery: "1 день" },
    ],
    offers: [
      { id: "yo1", supplier: "Центральный склад", price: 18490, stock: "2 шт.", city: "Москва" },
      { id: "yo2", supplier: "Региональный", price: 18820, stock: "1 шт.", city: "СПб" },
    ],
    analogs: [
      {
        id: "ya1",
        brand: "PARTS MALL",
        article: "PXHB-001",
        name: "Ступица в сборе",
        offers: [{ supplier: "Партнёр", price: 11990 }],
      },
    ],
  },
};

/** Нормализация артикула для сопоставления с демо-ID */
export function normalizeArticle(q) {
  return String(q || "")
    .replace(/\s+/g, "")
    .replace(/-/g, "")
    .toUpperCase();
}

export function resolveProductIdFromQuery(query) {
  const n = normalizeArticle(query);
  if (n === "OE31601") return "oe31601";
  if (n === "4144109100") return "4144109100";
  return null;
}

/** Нормализация строки как VIN: убираем пробелы и типичные разделители. */
function stripVinSeparators(raw) {
  return String(raw || "")
    .replace(/[\s\u00A0\-–—._/\\|]+/g, "")
    .toUpperCase();
}

/**
 * Распознаёт 17-значный VIN (латиница + цифры, без I/O/Q по правилам ISO 3779).
 * Раньше использовался класс [A-HJ-NPR-Z0-9], в котором по ошибке выпали K, L, M —
 * из‑за этого не распознавались реальные номера вроде VF3MJAHXVGS314095.
 */
export function parseVin(query) {
  const t = stripVinSeparators(query);
  if (t.length !== 17) return null;
  if (!/^[A-Z0-9]{17}$/.test(t)) return null;
  if (/[IOQ]/.test(t)) return null;
  return t;
}

export function getProductById(id) {
  return productsById[id] || null;
}
