import {
  catalogGroups,
  garageCars,
  getProductById,
  parseVin,
  resolveProductIdFromQuery,
  vinLookup,
} from "../data/mockData.js";

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function fetchProductById(id) {
  await wait(120);
  return getProductById(id);
}

export async function fetchGarageCars() {
  await wait(120);
  return garageCars;
}

function detectQueryType(query) {
  const raw = String(query || "").trim();
  if (!raw) return "empty";
  const compact = raw.replace(/[\s\u00A0\-–—._/\\|]+/g, "").toUpperCase();
  if (compact.length === 17) return "vin";
  if (/[A-Z]/i.test(raw) && /\d/.test(raw)) return "article";
  if (raw.length < 3) return "too_short";
  return "text";
}

function buildHint(query, vehicle, product) {
  const raw = String(query || "").trim();
  const type = detectQueryType(raw);

  if (!raw) {
    return {
      kind: "error",
      title: "Пустой запрос",
      text: "Введите артикул, VIN или текст запроса перед поиском.",
    };
  }

  if (vehicle || product) {
    return {
      kind: "ok",
      title: "Результаты найдены",
      text: "Откройте карточку или продолжите уточнение в фильтрах.",
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
    text: `По запросу «${raw}» ничего не найдено в локальных данных.`,
  };
}

/**
 * Unified DTO for search page.
 * @returns {{
 *   query: string,
 *   type: string,
 *   status: "ok" | "empty" | "error",
 *   vehicle: object | null,
 *   product: object | null,
 *   hint: { kind: string, title: string, text: string },
 *   sidebar: { garageCars: Array, catalogGroups: Array }
 * }}
 */
export async function searchCatalog(query) {
  await wait(260);
  const cleanQuery = String(query || "").trim();

  // Controlled demo failure path for error-state checks.
  if (cleanQuery.toLowerCase() === "simulate-error") {
    throw new Error("Демо-ошибка API поиска");
  }

  const vin = parseVin(cleanQuery);
  const vehicle = vin ? vinLookup[vin] || null : null;
  const productId = resolveProductIdFromQuery(cleanQuery);
  const product = productId ? getProductById(productId) : null;
  const hint = buildHint(cleanQuery, vehicle, product);

  return {
    query: cleanQuery,
    type: detectQueryType(cleanQuery),
    status: hint.kind === "ok" ? "ok" : hint.kind === "error" ? "error" : "empty",
    vehicle,
    product,
    hint,
    sidebar: {
      garageCars,
      catalogGroups,
    },
  };
}
