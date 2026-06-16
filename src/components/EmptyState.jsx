import { SearchX } from 'lucide-react';

export default function EmptyState() {
  return (
    <div className="rounded-2xl border border-dashed border-[#e6b9ad] bg-white px-6 py-14 text-center shadow-[0_8px_24px_rgba(74,45,54,0.05)]">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#fff4ef] text-[#b86562]">
        <SearchX size={26} />
      </div>
      <h3 className="mt-4 text-lg font-bold text-[#2d2530]">조건에 맞는 매물이 없습니다</h3>
      <p className="mt-2 text-sm font-medium text-[#6a5960]">검색어나 필터를 조정하거나 새 매물을 등록해보세요.</p>
    </div>
  );
}
