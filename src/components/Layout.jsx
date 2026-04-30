import { useState } from "react";
import { AllianceLogo } from "./AllianceLogo.jsx";
import { Icon } from "./Icon.jsx";

function FooterColumn({ title, links, onNavigateHome }) {
  return (
    <div>
      <h3 className="mb-4 font-bold text-slate-100">{title}</h3>
      <ul className="space-y-2 text-sm text-slate-400">
        {links.map((link) => (
          <li key={link}>
            <button
              type="button"
              onClick={onNavigateHome}
              className="text-left transition hover:text-white"
            >
              {link}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Layout({
  children,
  cartCount = 0,
  toasts = [],
  onDismissToast,
  onGoHome,
  onGoGarage,
  onGoCart,
  onSearchSubmit,
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [headerQ, setHeaderQ] = useState("");

  const submitHeader = (e) => {
    e?.preventDefault?.();
    const t = headerQ.trim();
    if (!t) return;
    onSearchSubmit(t);
    setMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-50 border-b border-slate-800/80 bg-slate-900 text-white shadow-lg shadow-slate-900/20">
        <div className="mx-auto flex max-w-[1400px] flex-wrap items-center gap-3 px-4 py-3 sm:px-6 lg:gap-4 lg:px-8">
          <button
            type="button"
            onClick={onGoHome}
            className="mr-1 shrink-0 rounded-lg outline-none ring-teal-400/0 transition hover:bg-white/5 focus-visible:ring-2"
            aria-label="На главную"
          >
            <AllianceLogo />
          </button>

          <form
            onSubmit={submitHeader}
            className="order-3 flex w-full min-w-0 flex-1 items-center gap-2 rounded-2xl border border-slate-700/80 bg-slate-800/80 px-3 py-2 shadow-inner shadow-black/20 lg:order-none lg:max-w-xl xl:max-w-2xl"
          >
            <Icon name="search" className="h-5 w-5 shrink-0 text-teal-300/90" />
            <input
              value={headerQ}
              onChange={(e) => setHeaderQ(e.target.value)}
              data-testid="header-search-input"
              className="min-w-0 flex-1 bg-transparent text-sm font-medium text-white outline-none placeholder:text-slate-500"
              placeholder="Артикул, VIN или название запчасти"
              aria-label="Поиск по сайту"
            />
            <button
              type="submit"
              data-testid="header-search-submit"
              className="hidden shrink-0 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-600 px-4 py-2 text-sm font-bold text-white shadow-md shadow-teal-900/30 transition hover:brightness-110 sm:inline"
            >
              Найти
            </button>
          </form>

          <nav className="ml-auto hidden items-center gap-1 lg:flex">
            <button
              type="button"
              onClick={onGoHome}
              className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-300 transition hover:bg-white/10 hover:text-white"
            >
              Каталог
            </button>
            <button
              type="button"
              onClick={onGoGarage}
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-slate-300 transition hover:bg-white/10 hover:text-white"
            >
              <Icon name="garage" className="h-4 w-4" />
              Гараж
            </button>
          </nav>

          <div className="ml-auto flex items-center gap-2 sm:ml-0 lg:ml-2">
            <div className="hidden items-center gap-2 border-r border-slate-700 pr-4 xl:flex">
              <Icon name="phone" className="h-4 w-4 text-teal-300/80" />
              <div className="text-left">
                <div className="text-sm font-bold tracking-wide">8 800 555-29-19</div>
                <div className="text-[11px] text-slate-500">9:00–20:00</div>
              </div>
            </div>
            <button
              type="button"
              className="hidden items-center gap-2 rounded-xl border border-slate-600 px-3 py-2 text-sm font-bold transition hover:border-teal-400 hover:text-teal-200 sm:flex"
            >
              <Icon name="user" className="h-4 w-4" />
              Войти
            </button>
            <button
              type="button"
              onClick={onGoCart}
              data-testid="header-cart-button"
              className="relative flex items-center gap-2 rounded-xl border border-teal-500/50 bg-teal-500/10 px-3 py-2 text-sm font-bold text-teal-100 transition hover:bg-teal-500/20"
            >
              <Icon name="cart" className="h-4 w-4" />
              <span className="hidden sm:inline">Корзина</span>
              <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-gradient-to-br from-amber-400 to-orange-500 px-1 text-[10px] font-black text-slate-900">
                {cartCount}
              </span>
            </button>
            <button
              type="button"
              className="rounded-lg border border-slate-600 p-2 lg:hidden"
              aria-expanded={menuOpen}
              aria-label="Меню"
              onClick={() => setMenuOpen((v) => !v)}
            >
              <Icon name="menu" />
            </button>
          </div>
        </div>

        {menuOpen ? (
          <div className="border-t border-slate-800 bg-slate-900 px-4 py-3 lg:hidden">
            <button
              type="button"
              onClick={() => {
                onGoHome();
                setMenuOpen(false);
              }}
              className="block w-full rounded-lg px-3 py-3 text-left font-semibold text-slate-200"
            >
              Каталог
            </button>
            <button
              type="button"
              onClick={() => {
                onGoGarage();
                setMenuOpen(false);
              }}
              className="mt-1 flex w-full items-center gap-2 rounded-lg px-3 py-3 text-left font-semibold text-slate-200"
            >
              <Icon name="garage" className="h-4 w-4" />
              Гараж
            </button>
          </div>
        ) : null}
      </header>

      {toasts.length ? (
        <div className="pointer-events-none fixed right-4 top-24 z-[70] flex w-[min(92vw,360px)] flex-col gap-2">
          {toasts.map((toast) => (
            <div
              key={toast.id}
              className={`pointer-events-auto rounded-xl border bg-white p-3 shadow-lg ${
                toast.kind === "error"
                  ? "border-rose-200"
                  : toast.kind === "success"
                    ? "border-emerald-200"
                    : "border-slate-200"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-sm font-bold text-slate-900">{toast.title}</div>
                  {toast.text ? <div className="mt-1 text-xs text-slate-600">{toast.text}</div> : null}
                </div>
                <button
                  type="button"
                  onClick={() => onDismissToast?.(toast.id)}
                  className="text-slate-400 transition hover:text-slate-700"
                  aria-label="Закрыть уведомление"
                >
                  ×
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : null}

      {children}

      <footer className="mt-auto border-t border-slate-800 bg-slate-900 text-white">
        <div className="mx-auto grid max-w-[1400px] gap-8 px-4 py-10 sm:px-6 md:grid-cols-2 lg:grid-cols-[1.2fr_0.9fr_0.9fr_0.9fr_1fr] lg:px-8">
          <div>
            <AllianceLogo footer />
            <p className="mt-4 max-w-xs text-sm leading-6 text-slate-400">
              Демо-интерфейс витрины: данные локальные, бэкенд подключим позже.
            </p>
            <div className="mt-5 flex gap-3">
              {["VK", "TG", "YT"].map((social) => (
                <button
                  key={social}
                  type="button"
                  className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-xs font-bold transition hover:bg-teal-600"
                >
                  {social}
                </button>
              ))}
            </div>
          </div>

          <FooterColumn
            title="Каталог"
            links={["ТО и расходники", "Тормозная система", "Подвеска", "Кузов и оптика"]}
            onNavigateHome={onGoHome}
          />
          <FooterColumn
            title="Покупателям"
            links={["Доставка", "Гарантия", "Подбор запчасти", "FAQ"]}
            onNavigateHome={onGoHome}
          />
          <FooterColumn
            title="Компания"
            links={["О нас", "Поставщикам", "Контакты"]}
            onNavigateHome={onGoHome}
          />

          <div>
            <h3 className="mb-4 font-bold text-slate-100">Контакты</h3>
            <div className="space-y-3 text-sm text-slate-400">
              <p className="flex items-center gap-3">
                <Icon name="phone" className="h-4 w-4 shrink-0" /> 8 800 555-29-19
              </p>
              <p className="flex items-center gap-3">
                <Icon name="mail" className="h-4 w-4 shrink-0" /> info@alliance-parts.ru
              </p>
              <p className="flex items-center gap-3">
                <Icon name="pin" className="h-4 w-4 shrink-0" /> Москва, ул. Автомобильная, 10
              </p>
              <p className="flex items-center gap-3">
                <Icon name="clock" className="h-4 w-4 shrink-0" /> Ежедневно 9:00–20:00
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
