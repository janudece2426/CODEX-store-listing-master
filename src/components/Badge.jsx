const typeStyles = {
  임대: 'bg-blue-50 text-blue-700 border-blue-100',
  매매: 'bg-emerald-50 text-emerald-700 border-emerald-100',
};

const statusStyles = {
  진행중: 'bg-[#fff8e8] text-[#9a6b11] border-[#f2dfaa]',
  계약완료: 'bg-slate-100 text-slate-600 border-slate-200',
  보류: 'bg-amber-50 text-amber-700 border-amber-100',
};

export function Badge({ value, kind = 'status' }) {
  const styles = kind === 'type' ? typeStyles : statusStyles;
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold ${
        styles[value] || 'border-slate-200 bg-slate-50 text-slate-600'
      }`}
    >
      {value || '-'}
    </span>
  );
}
