import { Download, FileDown, FileUp, Plus, Search } from 'lucide-react';
import ActionButton from './ActionButton';

export default function SearchAndActions({
  search,
  onSearchChange,
  onCreate,
  onExcel,
  onBackup,
  onRestoreClick,
}) {
  return (
    <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
      <div className="relative min-w-0 flex-1">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={19} />
        <input
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="상호, 주소지, 상세위치, 담당자, 메모, 특이사항 검색"
          className="h-12 w-full rounded-2xl border border-slate-200 bg-white pl-12 pr-4 text-sm outline-none transition focus:border-[#c8a24d] focus:ring-4 focus:ring-[#c8a24d]/10"
        />
      </div>
      <div className="grid grid-cols-2 gap-2 sm:flex">
        <ActionButton icon={Plus} variant="primary" onClick={onCreate}>
          매물 등록
        </ActionButton>
        <ActionButton icon={Download} onClick={onExcel}>
          엑셀 다운로드
        </ActionButton>
        <ActionButton icon={FileDown} onClick={onBackup}>
          백업
        </ActionButton>
        <ActionButton icon={FileUp} onClick={onRestoreClick}>
          복원
        </ActionButton>
      </div>
    </div>
  );
}
