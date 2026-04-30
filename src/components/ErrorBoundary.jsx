import React from "react";

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, message: "" };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, message: error?.message || "Unknown error" };
  }

  componentDidCatch(error) {
    console.error("UI crash:", error);
  }

  handleReset = () => {
    this.setState({ hasError: false, message: "" });
    this.props.onReset?.();
  };

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <main className="mx-auto max-w-[900px] px-4 py-16 sm:px-6">
        <div className="rounded-2xl border border-rose-200 bg-rose-50/70 p-6">
          <div className="text-xs font-bold uppercase tracking-wide text-rose-700">Ошибка интерфейса</div>
          <h1 className="mt-2 text-2xl font-black text-rose-900">Экран упал, но приложение живо</h1>
          <p className="mt-2 text-sm text-rose-900/80">
            Мы перехватили ошибку рендера и показали безопасный экран вместо белой страницы.
          </p>
          <p className="mt-3 rounded-lg bg-white px-3 py-2 text-xs text-rose-700">
            {this.state.message}
          </p>
          <button
            type="button"
            onClick={this.handleReset}
            className="mt-5 rounded-xl bg-rose-700 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-rose-800"
          >
            Сбросить и вернуться на главную
          </button>
        </div>
      </main>
    );
  }
}
