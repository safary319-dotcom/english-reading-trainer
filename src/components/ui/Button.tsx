import type { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'success';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children: ReactNode;
}

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary:
    'bg-brand-500 text-white shadow-[0_6px_0_0_#1d76cc] hover:bg-brand-400 active:translate-y-1 active:shadow-[0_2px_0_0_#1d76cc]',
  secondary:
    'bg-white text-brand-700 border-2 border-brand-200 shadow-[0_6px_0_0_#bce2ff] hover:border-brand-400 active:translate-y-1 active:shadow-[0_2px_0_0_#bce2ff]',
  success:
    'bg-mint-600 text-white shadow-[0_6px_0_0_#065f46] hover:bg-mint-700 active:translate-y-1 active:shadow-[0_2px_0_0_#065f46]',
};

export default function Button({ variant = 'primary', className = '', children, disabled, ...rest }: ButtonProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      className={`inline-flex items-center justify-center gap-3 rounded-3xl px-8 py-4 text-xl font-extrabold transition-all duration-150 focus:outline-none focus-visible:ring-4 focus-visible:ring-brand-300 disabled:cursor-not-allowed disabled:opacity-50 ${VARIANT_CLASSES[variant]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
