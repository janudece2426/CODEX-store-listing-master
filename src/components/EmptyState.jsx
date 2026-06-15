import { SearchX } from 'lucide-react';

export default function EmptyState() {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center shadow-sm">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-500">
        <SearchX size={26} />
      </div>
      <h3 className="mt-4 text-lg font-bold text-slate-900">조건에 맞는 매물이 없습니다</h3>
      <p className="mt-2 text-sm text-slate-500">검색어나 필터를 조정하거나 새 매물을 등록해보세요.</p>
    </div>
  );
}
