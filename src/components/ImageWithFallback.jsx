import { useState } from "react";
import { Icon } from "./Icon.jsx";

export function ImageWithFallback({ src, alt, className, fallbackClassName = "", children, ...props }) {
  const [failed, setFailed] = useState(false);

  if (failed || !src) {
    return (
      <div
        className={`grid place-items-center overflow-hidden bg-gradient-to-br from-slate-200 via-slate-100 to-white ${
          fallbackClassName || className
        }`}
      >
        {children || <Icon name="car" className="h-10 w-10 text-slate-400" />}
      </div>
    );
  }

  return <img src={src} alt={alt} className={className} onError={() => setFailed(true)} {...props} />;
}
