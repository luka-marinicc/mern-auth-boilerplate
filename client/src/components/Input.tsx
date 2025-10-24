import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

export default function Input({ label, error, className = "", ...props }: InputProps) {
    return (
        <div className="flex flex-col gap-1">
            {label && <label className="text-sm text-neutral-300">{label}</label>}
            <input
                {...props}
                className={`p-2 rounded bg-neutral-700 text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-green-500 ${className}`}
            />
            {error && <p className="text-sm text-red-400">{error}</p>}
        </div>
    );
}
