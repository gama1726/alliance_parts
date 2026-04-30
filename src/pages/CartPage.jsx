import { getProductById } from "../data/mockData.js";
import { Icon } from "../components/Icon.jsx";

function formatPrice(n) {
  return new Intl.NumberFormat("ru-RU").format(n);
}

export function CartPage({ cartItems, onGoHome, onOpenProduct, onQtyChange, onRemove, onClear }) {
  const rows = cartItems
    .map((item) => {
      const product = getProductById(item.productId);
      if (!product) return null;
      return {
        id: item.productId,
        product,
        qty: item.qty,
        sum: product.recommended?.[0]?.price ? product.recommended[0].price * item.qty : 0,
      };
    })
    .filter(Boolean);

  const totalQty = rows.reduce((acc, row) => acc + row.qty, 0);
  const totalSum = rows.reduce((acc, row) => acc + row.sum, 0);

  return (
    <main className="mx-auto max-w-[1400px] px-4 py-8 sm:px-6 lg:px-8" data-testid="cart-page">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900">Корзина</h1>
          <p className="mt-2 text-sm text-slate-600">Локальная демо-корзина в браузере (без отправки заказа).</p>
        </div>
        {rows.length ? (
          <button
            type="button"
            onClick={onClear}
            className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-bold text-slate-700 transition hover:border-rose-400 hover:text-rose-700"
          >
            Очистить
          </button>
        ) : null}
      </div>

      {!rows.length ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
          <p className="text-lg font-bold text-slate-800">Корзина пуста</p>
          <p className="mt-2 text-sm text-slate-600">Добавьте товар из карточки в разделе поиска.</p>
          <button
            type="button"
            onClick={onGoHome}
            className="mt-5 rounded-xl bg-slate-900 px-5 py-3 text-sm font-bold text-white transition hover:bg-slate-800"
          >
            К каталогу
          </button>
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="space-y-3">
            {rows.map((row) => (
              <article
                key={row.id}
                className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <button
                    type="button"
                    onClick={() => onOpenProduct(row.id)}
                    className="text-left transition hover:text-teal-800"
                  >
                    <div className="text-xs font-bold uppercase tracking-wide text-slate-500">
                      {row.product.brand}
                    </div>
                    <h2 className="text-lg font-black text-slate-900">{row.product.name}</h2>
                    <div className="text-sm font-bold text-teal-700">Артикул {row.product.article}</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => onRemove(row.id)}
                    className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-bold text-slate-500 transition hover:border-rose-400 hover:text-rose-700"
                  >
                    Удалить
                  </button>
                </div>
                <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                  <div className="inline-flex items-center overflow-hidden rounded-xl border border-slate-200">
                    <button
                      type="button"
                      onClick={() => onQtyChange(row.id, row.qty - 1)}
                      className="px-3 py-2 text-lg font-bold text-slate-700 hover:bg-slate-50"
                      aria-label="Уменьшить количество"
                    >
                      -
                    </button>
                    <span className="border-x border-slate-200 px-4 py-2 text-sm font-bold text-slate-900">
                      {row.qty}
                    </span>
                    <button
                      type="button"
                      onClick={() => onQtyChange(row.id, row.qty + 1)}
                      className="px-3 py-2 text-lg font-bold text-slate-700 hover:bg-slate-50"
                      aria-label="Увеличить количество"
                    >
                      +
                    </button>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-slate-500">Ориентировочно</div>
                    <div className="text-2xl font-black text-slate-900">{formatPrice(row.sum)} ₽</div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-sm font-bold uppercase tracking-wide text-slate-500">Итог</h2>
            <div className="mt-4 space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Позиций</span>
                <span className="font-bold text-slate-900">{totalQty}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Сумма</span>
                <span className="text-xl font-black text-slate-900">{formatPrice(totalSum)} ₽</span>
              </div>
            </div>
            <button
              type="button"
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-600 py-3 text-sm font-bold text-white shadow-md shadow-teal-900/25 transition hover:brightness-110"
            >
              <Icon name="cart" className="h-4 w-4" />
              Оформить (скоро)
            </button>
          </aside>
        </div>
      )}
    </main>
  );
}
