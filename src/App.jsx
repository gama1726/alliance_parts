import { useCallback, useEffect, useState } from "react";
import { Navigate, Route, Routes, useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Layout } from "./components/Layout.jsx";
import { HomePage } from "./pages/HomePage.jsx";
import { SearchPage } from "./pages/SearchPage.jsx";
import { ProductPage } from "./pages/ProductPage.jsx";
import { GaragePage } from "./pages/GaragePage.jsx";
import { CartPage } from "./pages/CartPage.jsx";
import { useAppStore } from "./store/AppStore.jsx";
import { fetchProductById } from "./api/mockApi.js";

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    cartCount,
    cartItems,
    recentSearches,
    addRecentSearch,
    addToCart,
    changeCartQty,
    removeFromCart,
    clearCart,
    toasts,
    pushToast,
    removeToast,
  } = useAppStore();

  const goSearch = useCallback((query) => {
    const q = String(query || "").trim();
    if (!q) return;
    addRecentSearch(q);
    navigate(`/search?q=${encodeURIComponent(q)}`);
  }, [addRecentSearch, navigate]);

  const addToCartWithToast = useCallback(
    (productId) => {
      addToCart(productId);
      pushToast({
        kind: "success",
        title: "Добавлено в корзину",
        text: `Позиция ${productId} добавлена.`,
      });
    },
    [addToCart, pushToast],
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname, location.search]);

  return (
    <Layout
      cartCount={cartCount}
      toasts={toasts}
      onDismissToast={removeToast}
      onGoHome={() => navigate("/")}
      onGoGarage={() => navigate("/garage")}
      onGoCart={() => navigate("/cart")}
      onSearchSubmit={goSearch}
    >
      <Routes>
        <Route
          path="/"
          element={<HomePage onSearchSubmit={goSearch} onGoGarage={() => navigate("/garage")} recentSearches={recentSearches} />}
        />
        <Route
          path="/search"
          element={
            <SearchRoute
              onOpenProduct={(id, ctx) => navigate(`/product/${id}`, { state: ctx })}
              onGoGarage={() => navigate("/garage")}
              onApiError={(message) => pushToast({ kind: "error", title: "Ошибка поиска", text: message })}
            />
          }
        />
        <Route
          path="/product/:id"
          element={<ProductRoute onAddToCart={addToCartWithToast} onSearchArticle={goSearch} onApiError={(message) => pushToast({ kind: "error", title: "Ошибка карточки", text: message })} />}
        />
        <Route
          path="/garage"
          element={
            <GaragePage
              onSearchVin={(vin) => goSearch(vin)}
              onOpenDemoProduct={(id) => navigate(`/product/${id}`, { state: { from: "garage" } })}
            />
          }
        />
        <Route
          path="/cart"
          element={
            <CartPage
              cartItems={cartItems}
              onGoHome={() => navigate("/")}
              onOpenProduct={(id) => navigate(`/product/${id}`, { state: { from: "cart" } })}
              onQtyChange={changeCartQty}
              onRemove={(id) => {
                removeFromCart(id);
                pushToast({ kind: "info", title: "Позиция удалена", text: `Товар ${id} удален из корзины.` });
              }}
              onClear={() => {
                clearCart();
                pushToast({ kind: "info", title: "Корзина очищена", text: "Все позиции удалены." });
              }}
            />
          }
        />
        <Route path="/not-found" element={<NotFoundPage />} />
        <Route path="*" element={<Navigate to="/not-found" replace />} />
      </Routes>
    </Layout>
  );
}

function SearchRoute({ onOpenProduct, onGoGarage, onApiError }) {
  const [params] = useSearchParams();
  const query = String(params.get("q") || "").trim();

  if (!query) return <Navigate to="/" replace />;

  return (
    <SearchPage
      query={query}
      onOpenProduct={(id) => onOpenProduct(id, { from: "search", query })}
      onGoGarage={onGoGarage}
      onApiError={onApiError}
    />
  );
}

function ProductRoute({ onAddToCart, onSearchArticle, onApiError }) {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [product, setProduct] = useState(undefined);

  useEffect(() => {
    let isActive = true;
    setProduct(undefined);
    fetchProductById(id).then((res) => {
      if (isActive) setProduct(res || null);
    }).catch((e) => {
      if (!isActive) return;
      const message = e?.message || "Не удалось загрузить карточку";
      onApiError?.(message);
      setProduct(null);
    });
    return () => {
      isActive = false;
    };
  }, [id]);

  const onBack = () => {
    const from = location.state?.from;
    const query = location.state?.query;
    if (from === "garage") return navigate("/garage");
    if (from === "cart") return navigate("/cart");
    if (query) return navigate(`/search?q=${encodeURIComponent(query)}`);
    return navigate("/");
  };

  return (
    <ProductPage product={product} onBack={onBack} onSearchArticle={onSearchArticle} onAddToCart={onAddToCart} />
  );
}

function NotFoundPage() {
  return (
    <main className="mx-auto max-w-[900px] px-4 py-16 sm:px-6">
      <div className="rounded-2xl border border-amber-200 bg-amber-50/70 p-6">
        <div className="text-xs font-bold uppercase tracking-wide text-amber-700">404</div>
        <h1 className="mt-2 text-2xl font-black text-amber-900">Страница не найдена</h1>
        <p className="mt-2 text-sm text-amber-900/80">Проверьте адрес или вернитесь на главную страницу витрины.</p>
      </div>
    </main>
  );
}
