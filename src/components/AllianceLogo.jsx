import { ImageWithFallback } from "./ImageWithFallback.jsx";

const LOGO_SRC = "/alliance-logo.png";

export function AllianceLogo({ footer = false }) {
  return (
    <div className="flex items-center gap-3">
      <ImageWithFallback
        src={LOGO_SRC}
        alt="ALLIANCE"
        className={footer ? "h-20 w-auto object-contain" : "h-14 w-auto object-contain sm:h-16"}
        fallbackClassName={footer ? "h-20 w-56 rounded-xl bg-transparent" : "h-14 w-48 rounded-xl bg-transparent sm:h-16"}
      >
        <div className="flex items-center gap-3">
          <div className="relative h-12 w-14 shrink-0">
            <div className="absolute left-0 top-6 h-5 w-12 -rotate-[28deg] rounded-l-full rounded-r-md bg-gradient-to-r from-teal-800 via-teal-600 to-cyan-500" />
            <div className="absolute left-[23px] top-1 h-10 w-8 rounded-t-[18px] bg-gradient-to-br from-slate-600 via-slate-900 to-black" />
            <div className="absolute left-[18px] top-7 h-4 w-24 -rotate-[16deg] rounded-full bg-white/90" />
          </div>
          <div className="text-xl font-black uppercase tracking-[0.18em] text-white sm:text-2xl">Alliance</div>
        </div>
      </ImageWithFallback>
    </div>
  );
}
