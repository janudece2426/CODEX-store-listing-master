export default function ActionButton({
  children,
  icon: Icon,
  variant = 'secondary',
  className = '',
  ...props
}) {
  const variants = {
    primary: 'bg-[#b86562] text-white hover:bg-[#a95653] border-[#b86562] shadow-[0_8px_18px_rgba(184,101,98,0.18)]',
    secondary: 'bg-white text-[#4a3a3f] hover:bg-[#fff4ef] border-[#ead8d1]',
    dark: 'bg-[#4a2d36] text-white hover:bg-[#5b3843] border-[#4a2d36]',
    danger: 'bg-white text-red-700 hover:bg-red-50 border-red-100',
  };

  return (
    <button
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl border px-4 text-sm font-bold transition ${variants[variant]} ${className}`}
      {...props}
    >
      {Icon ? <Icon size={17} /> : null}
      {children}
    </button>
  );
}
