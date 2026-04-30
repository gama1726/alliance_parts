import { createContext, useContext, useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "alliance_front_store_v1";
const MAX_RECENT_SEARCHES = 8;

const AppStoreContext = createContext(null);

function readInitialState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { cartItems: [], recentSearches: [] };
    const parsed = JSON.parse(raw);
    return {
      cartItems: Array.isArray(parsed?.cartItems) ? parsed.cartItems : [],
      recentSearches: Array.isArray(parsed?.recentSearches) ? parsed.recentSearches : [],
    };
  } catch {
    return { cartItems: [], recentSearches: [] };
  }
}

export function AppStoreProvider({ children }) {
  const initial = readInitialState();
  const [cartItems, setCartItems] = useState(initial.cartItems);
  const [recentSearches, setRecentSearches] = useState(initial.recentSearches);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ cartItems, recentSearches }));
  }, [cartItems, recentSearches]);

  const value = useMemo(() => {
    const addRecentSearch = (query) => {
      const normalized = String(query || "").trim();
      if (!normalized) return;
      setRecentSearches((prev) => {
        const next = [normalized, ...prev.filter((x) => x.toLowerCase() !== normalized.toLowerCase())];
        return next.slice(0, MAX_RECENT_SEARCHES);
      });
    };

    const addToCart = (productId) => {
      setCartItems((prev) => {
        const idx = prev.findIndex((x) => x.productId === productId);
        if (idx === -1) return [...prev, { productId, qty: 1 }];
        return prev.map((x, i) => (i === idx ? { ...x, qty: x.qty + 1 } : x));
      });
    };

    const changeCartQty = (productId, nextQty) => {
      setCartItems((prev) => {
        if (nextQty <= 0) return prev.filter((x) => x.productId !== productId);
        return prev.map((x) => (x.productId === productId ? { ...x, qty: nextQty } : x));
      });
    };

    const removeFromCart = (productId) => {
      setCartItems((prev) => prev.filter((x) => x.productId !== productId));
    };

    const clearCart = () => setCartItems([]);

    const cartCount = cartItems.reduce((acc, item) => acc + (item.qty || 0), 0);

    return {
      cartItems,
      cartCount,
      recentSearches,
      addRecentSearch,
      addToCart,
      changeCartQty,
      removeFromCart,
      clearCart,
    };
  }, [cartItems, recentSearches]);

  return <AppStoreContext.Provider value={value}>{children}</AppStoreContext.Provider>;
}

export function useAppStore() {
  const value = useContext(AppStoreContext);
  if (!value) throw new Error("useAppStore must be used within AppStoreProvider");
  return value;
}
