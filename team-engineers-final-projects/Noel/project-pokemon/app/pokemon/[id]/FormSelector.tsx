"use client";

import Link from "next/link";

interface Form {
  id: string;
  name: string;
  img: string;
  isCurrent: boolean;
}

interface FormSelectorProps {
  forms: Form[];
  baseName: string;
  currentId: string;
}

export default function FormSelector({ forms, baseName, currentId }: FormSelectorProps) {
  const getFormDisplayName = (formName: string) => {
    if (formName === baseName) return "Default";
    const suffix = formName.replace(`${baseName}-`, "");
    return suffix
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <div className="glass rounded-lg p-2">
      <h3 className="font-display text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wider">
        Forms ({forms.length})
      </h3>
      <div className="flex gap-2 flex-wrap">
        {forms.map((form) => (
          <Link
            key={form.id}
            href={`/pokemon/${form.id}`}
            className="group relative flex flex-col items-center"
            title={getFormDisplayName(form.name)}
          >
            <div
              className={`
                w-12 h-12 rounded-lg overflow-hidden border-2 transition-all duration-200
                ${form.id === currentId
                  ? "border-cyan-400 shadow-[0_0_8px_rgba(0,212,255,0.4)] scale-105"
                  : "border-slate-600 hover:border-slate-400 hover:scale-105"
                }
              `}
            >
              <img
                src={form.img}
                alt={getFormDisplayName(form.name)}
                className="w-full h-full object-contain bg-slate-800/50 p-0.5"
                loading="lazy"
              />
            </div>
            
            {/* Form Name Label */}
            <span className={`
              mt-1 font-data text-[9px] whitespace-nowrap
              transition-colors
              ${form.id === currentId ? "text-cyan-400" : "text-slate-500 group-hover:text-slate-300"}
            `}>
              {getFormDisplayName(form.name)}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
