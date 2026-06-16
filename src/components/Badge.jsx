const typeStyles = {
  임대: 'bg-[#eef6ff] text-[#1f5f9e] border-[#cfe3f8]',
  매매: 'bg-[#eef8f2] text-[#24704a] border-[#cbe8d6]',
};

const statusStyles = {
  진행중: 'bg-[#fff2ed] text-[#a04f4b] border-[#f3c8bc]',
  계약완료: 'bg-[#f1ece9] text-[#5f4b52] border-[#e1d4cf]',
  보류: 'bg-[#fff8e4] text-[#8a6317] border-[#ecd89f]',
};

export function Badge({ value, kind = 'status' }) {
  const styles = kind === 'type' ? typeStyles : statusStyles;
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold ${
        styles[value] || 'border-[#ead8d1] bg-[#fff8f4] text-[#5f4b52]'
      }`}
    >
      {value || '-'}
    </span>
  );
}
