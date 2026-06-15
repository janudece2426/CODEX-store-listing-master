export default function ActionButton({
  children,
  icon: Icon,
  variant = 'secondary',
  className = '',
  ...props
}) {
  const variants = {
    primary: 'bg-[#c8a24d] text-white hover:bg-[#b6903d] border-[#c8a24d]',
    secondary: 'bg-white text-slate-700 hover:bg-slate-50 border-slate-200',
    dark: 'bg-[#10182b] text-white hover:bg-[#17233c] border-[#10182b]',
    danger: 'bg-white text-red-600 hover:bg-red-50 border-red-100',
  };

  return (
    <button
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl border px-4 text-sm font-semibold transition ${variants[variant]} ${className}`}
      {...props}
    >
      {Icon ? <Icon size={17} /> : null}
      {children}
    </button>
  );
}
