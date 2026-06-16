import { Download, FileDown, FileSpreadsheet, FileUp, Plus, Search, Upload } from 'lucide-react';
import ActionButton from './ActionButton';

export default function SearchAndActions({
  search,
  onSearchChange,
  onCreate,
  onExcel,
  onPrintExcel,
  onBackup,
  onImportClick,
  onRestoreClick,
}) {
  return (
    <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
      <div className="relative min-w-0 flex-1">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#b86562]" size={19} />
        <input
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="상호, 주소지, 상세위치, 담당자, 메모, 특이사항 검색"
          className="h-12 w-full rounded-2xl border border-[#ead8d1] bg-white pl-12 pr-4 text-sm font-medium text-[#2d2530] outline-none shadow-sm transition placeholder:text-[#9a8b91] focus:border-[#b86562] focus:ring-4 focus:ring-[#b86562]/15"
        />
      </div>
      <div className="grid grid-cols-2 gap-2 sm:flex">
        <ActionButton icon={Plus} variant="primary" onClick={onCreate}>
          매물 등록
        </ActionButton>
        <ActionButton icon={Download} onClick={onExcel}>
          엑셀 다운로드
        </ActionButton>
        <ActionButton icon={FileSpreadsheet} onClick={onPrintExcel}>
          인쇄용 엑셀
        </ActionButton>
        <ActionButton icon={FileDown} onClick={onBackup}>
          백업
        </ActionButton>
        <ActionButton icon={Upload} onClick={onImportClick}>
          가져오기
        </ActionButton>
        <ActionButton icon={FileUp} onClick={onRestoreClick}>
          복원
        </ActionButton>
      </div>
    </div>
  );
}
