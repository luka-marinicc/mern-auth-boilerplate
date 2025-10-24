import type { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    loading?: boolean;
}

export default function Button({ children, loading, className = "", ...props }: ButtonProps) {
    return (
        <button
            {...props}
            disabled={props.disabled || loading}
            className={`p-2 rounded bg-green-600 hover:bg-green-500 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
        >
            {loading ? "Loading..." : children}
        </button>
    );
}
