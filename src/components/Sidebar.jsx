import { Building2, Database, LayoutDashboard, ShieldCheck, Sparkles } from 'lucide-react';

export default function Sidebar({ totalCount, onHome }) {
  return (
    <aside className="bg-[#10182b] text-white lg:fixed lg:inset-y-0 lg:left-0 lg:w-72">
      <div className="flex h-full flex-col px-5 py-5">
        <button
          type="button"
          onClick={onHome}
          className="flex items-center gap-3 rounded-2xl text-left transition hover:bg-white/5"
          title="홈으로 돌아가기"
        >
          <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[#e8c77a]/30 bg-[#e2bc68] shadow-[0_10px_24px_rgba(0,0,0,0.22)]">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#10182b] text-[#f0cc79]">
              <Building2 size={20} strokeWidth={2.2} />
            </div>
            <div className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full border border-[#10182b] bg-white text-[#b88b35]">
              <Sparkles size={11} strokeWidth={2.4} />
            </div>
          </div>
          <div className="min-w-0">
            <p className="truncate text-lg font-bold tracking-normal">상가 매물관리 마스터</p>
            <p className="text-xs font-medium text-[#e6c77c]">Premium Store CRM</p>
          </div>
        </button>

        <nav className="mt-8 space-y-2">
          <button
            type="button"
            onClick={onHome}
            className="flex w-full items-center gap-3 rounded-2xl bg-white/10 px-4 py-3 text-left text-sm font-medium"
          >
            <LayoutDashboard size={18} />
            매물 목록
          </button>
          <div className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm text-slate-300">
            <Database size={18} />
            로컬 저장소
          </div>
          <div className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm text-slate-300">
            <ShieldCheck size={18} />
            백업 관리
          </div>
        </nav>

        <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-4">
          <p className="text-sm text-slate-300">등록 매물</p>
          <p className="mt-1 text-3xl font-semibold text-[#e6c77c]">{totalCount}</p>
          <p className="mt-2 text-xs leading-5 text-slate-400">
            사진 없이 핵심 정보만 빠르게 관리하는 가벼운 내부용 앱
          </p>
        </div>

        <div className="mt-auto hidden rounded-2xl border border-white/10 bg-[#0b1222] p-4 text-xs leading-5 text-slate-400 lg:block">
          데이터는 이 브라우저의 localStorage에 저장됩니다.
        </div>
      </div>
    </aside>
  );
}
