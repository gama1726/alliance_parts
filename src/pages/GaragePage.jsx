import { garageCars } from "../data/mockData.js";
import { Icon } from "../components/Icon.jsx";

export function GaragePage({ onSearchVin, onOpenDemoProduct }) {
  return (
    <main className="mx-auto max-w-[1400px] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-black text-slate-900">Гараж</h1>
          <p className="mt-2 max-w-xl text-slate-600">
            Сохранённые автомобили из демо-набора. Позже сюда подтянем API: каталоги OEM по схемам, история VIN и
            привязка заказов.
          </p>
        </div>
        <span className="rounded-full bg-slate-200/80 px-3 py-1 text-xs font-bold uppercase tracking-wide text-slate-700">
          {garageCars.length} авто
        </span>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {garageCars.map((car) => (
          <article
            key={car.id}
            className="flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-teal-200 hover:shadow-md"
          >
            <div className="flex items-start gap-4">
              <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-slate-900 text-white">
                <Icon name="car" className="h-7 w-7" />
              </div>
              <div className="min-w-0">
                <h2 className="text-xl font-black text-slate-900">{car.label}</h2>
                <p className="text-sm text-slate-600">{car.subtitle}</p>
                <p className="mt-2 text-xs font-mono text-slate-500">VIN: {car.vin}</p>
              </div>
            </div>
            <p className="mt-4 flex-1 rounded-xl bg-slate-50 px-4 py-3 text-sm text-slate-700">{car.catalogHint}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {car.vin !== "—" ? (
                <button
                  type="button"
                  onClick={() => onSearchVin(car.vin)}
                  className="rounded-xl bg-gradient-to-r from-teal-500 to-cyan-600 px-4 py-2.5 text-sm font-bold text-white shadow-md transition hover:brightness-110"
                >
                  Поиск по VIN
                </button>
              ) : null}
              <button
                type="button"
                onClick={() => onOpenDemoProduct(car.id === "g1" ? "4144109100" : "oe31601")}
                className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-bold text-slate-800 transition hover:border-teal-400 hover:text-teal-900"
              >
                Демо-карточка запчасти
              </button>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
