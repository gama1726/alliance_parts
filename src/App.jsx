import { useCallback, useEffect, useMemo, useState } from "react";
import { Layout } from "./components/Layout.jsx";
import { HomePage } from "./pages/HomePage.jsx";
import { SearchPage } from "./pages/SearchPage.jsx";
import { ProductPage } from "./pages/ProductPage.jsx";
import { GaragePage } from "./pages/GaragePage.jsx";
import { getProductById } from "./data/mockData.js";
import { CartPage } from "./pages/CartPage.jsx";

const STORAGE_KEY = "alliance_demo_state_v1";

function safeReadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return null;
    return parsed;
  } catch {
    return null;
  }
}

function sanitizeRoute(route) {
  if (!route || typeof route !== "object") return { name: "home" };
  if (route.name === "home") return { name: "home" };
  if (route.name === "garage") return { name: "garage" };
  if (route.name === "cart") return { name: "cart" };
  if (route.name === "search" && typeof route.query === "string") return { name: "search", query: route.query };
  if (route.name === "product" && typeof route.id === "string") {
    return { name: "product", id: route.id, from: route.from || "search" };
  }
  return { name: "not_found" };
}

export default function App() {
  const restored = safeReadState();
  const [route, setRoute] = useState(() => sanitizeRoute(restored?.route || { name: "home" }));
  const [lastSearchQuery, setLastSearchQuery] = useState(() => restored?.lastSearchQuery || "");
  const [cartItems, setCartItems] = useState(() =>
    Array.isArray(restored?.cartItems) ? restored.cartItems.filter((x) => x && typeof x.productId === "string") : [],
  );

  const goHome = useCallback(() => setRoute({ name: "home" }), []);
  const goGarage = useCallback(() => setRoute({ name: "garage" }), []);
  const goCart = useCallback(() => setRoute({ name: "cart" }), []);

  const goSearch = useCallback((query) => {
    const q = String(query || "").trim();
    if (!q) return;
    setLastSearchQuery(q);
    setRoute({ name: "search", query: q });
  }, []);

  const goProduct = useCallback((id, from = "search") => {
    setRoute({ name: "product", id, from });
  }, []);

  const handleProductBack = useCallback(() => {
    if (route.name !== "product") return;
    if (route.from === "garage") setRoute({ name: "garage" });
    else if (route.from === "cart") setRoute({ name: "cart" });
    else if (lastSearchQuery) setRoute({ name: "search", query: lastSearchQuery });
    else setRoute({ name: "home" });
  }, [route, lastSearchQuery]);

  const product = route.name === "product" ? getProductById(route.id) : null;
  const cartCount = useMemo(() => cartItems.reduce((acc, item) => acc + (item.qty || 0), 0), [cartItems]);

  const addToCart = useCallback((productId) => {
    setCartItems((prev) => {
      const idx = prev.findIndex((x) => x.productId === productId);
      if (idx === -1) return [...prev, { productId, qty: 1 }];
      return prev.map((x, i) => (i === idx ? { ...x, qty: x.qty + 1 } : x));
    });
  }, []);

  const changeCartQty = useCallback((productId, nextQty) => {
    setCartItems((prev) => {
      if (nextQty <= 0) return prev.filter((x) => x.productId !== productId);
      return prev.map((x) => (x.productId === productId ? { ...x, qty: nextQty } : x));
    });
  }, []);

  const removeFromCart = useCallback((productId) => {
    setCartItems((prev) => prev.filter((x) => x.productId !== productId));
  }, []);

  const clearCart = useCallback(() => setCartItems([]), []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [route]);

  useEffect(() => {
    const payload = { route: sanitizeRoute(route), lastSearchQuery, cartItems };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  }, [route, lastSearchQuery, cartItems]);

  return (
    <Layout
      cartCount={cartCount}
      onGoHome={goHome}
      onGoGarage={goGarage}
      onGoCart={goCart}
      onSearchSubmit={goSearch}
    >
      {route.name === "home" ? (
        <HomePage
          onSearchSubmit={(q) => goSearch(q)}
          onGoGarage={goGarage}
        />
      ) : null}

      {route.name === "search" ? (
        <SearchPage
          query={route.query}
          onOpenProduct={(id) => goProduct(id, "search")}
          onGoGarage={goGarage}
        />
      ) : null}

      {route.name === "product" ? (
        <ProductPage
          product={product}
          onBack={handleProductBack}
          onSearchArticle={(article) => goSearch(article)}
          onAddToCart={addToCart}
        />
      ) : null}

      {route.name === "garage" ? (
        <GaragePage
          onSearchVin={(vin) => goSearch(vin)}
          onOpenDemoProduct={(id) => goProduct(id, "garage")}
        />
      ) : null}

      {route.name === "cart" ? (
        <CartPage
          cartItems={cartItems}
          onGoHome={goHome}
          onOpenProduct={(id) => goProduct(id, "cart")}
          onQtyChange={changeCartQty}
          onRemove={removeFromCart}
          onClear={clearCart}
        />
      ) : null}

      {route.name === "not_found" ? (
        <main className="mx-auto max-w-[900px] px-4 py-16 sm:px-6">
          <div className="rounded-2xl border border-amber-200 bg-amber-50/70 p-6">
            <div className="text-xs font-bold uppercase tracking-wide text-amber-700">Неверный маршрут</div>
            <h1 className="mt-2 text-2xl font-black text-amber-900">Страница не найдена</h1>
            <p className="mt-2 text-sm text-amber-900/80">Маршрут в локальном хранилище повреждён или устарел.</p>
            <button
              type="button"
              onClick={goHome}
              className="mt-5 rounded-xl bg-amber-700 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-amber-800"
            >
              На главную
            </button>
          </div>
        </main>
      ) : null}
    </Layout>
  );
}
