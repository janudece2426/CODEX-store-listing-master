import { Copy, Edit3, Eye, Trash2 } from 'lucide-react';
import { formatCurrency, formatDate } from '../utils/format';
import { Badge } from './Badge';

const rentHeaders = ['상태', '상호', '지역', '주소지', '임대조건', '권리금', '평수', '층수', '공용관리비', '담당자', '등록일', '관리'];
const saleHeaders = ['상태', '매물명', '지역', '주소지', '매매가', '평수', '층수', '평단가', '수익률', '담당자', '등록일', '관리'];

const gridClass =
  'grid min-w-[1180px] grid-cols-[118px_150px_92px_minmax(210px,1fr)_132px_92px_72px_72px_92px_82px_92px_156px] items-center gap-3';

export function ListingHeader({ mode }) {
  const headers = mode === '매매' ? saleHeaders : rentHeaders;
  return (
    <div className={`${gridClass} rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs font-bold text-slate-500`}>
      {headers.map((header) => (
        <div key={header}>{header}</div>
      ))}
    </div>
  );
}

export default function ListingCard({ listing, onView, onEdit, onDelete, onCopy }) {
  const isSale = listing.type === '매매';

  return (
    <article className={`${gridClass} min-h-[92px] rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm transition hover:bg-[#fffdf8] hover:shadow-md`}>
      <div className="flex flex-col items-start gap-1.5">
        <Badge value={listing.type} kind="type" />
        <Badge value={listing.status} />
      </div>

      <div className="min-w-0">
        <button
          onClick={() => onView(listing)}
          className="block max-w-full truncate text-left text-sm font-bold text-slate-950 hover:text-[#9a762b]"
          title={listing.businessName || '상호 미입력'}
        >
          {listing.businessName || '상호 미입력'}
        </button>
        {listing.detailLocation ? <p className="mt-1 truncate text-xs text-slate-400">{listing.detailLocation}</p> : null}
      </div>

      <Cell value={formatRegion(listing)} strong />
      <Cell value={listing.address || '-'} title={listing.address} />

      {isSale ? (
        <>
          <Cell value={formatCurrency(listing.price)} strong />
          <Cell value={formatArea(listing.area)} />
          <Cell value={listing.floor || '-'} />
          <Cell value={formatUnitPrice(listing.price, listing.area)} />
          <Cell value={formatYield(listing.yieldRate)} />
        </>
      ) : (
        <>
          <Cell value={`${formatCurrency(listing.deposit)} / ${formatCurrency(listing.monthlyRent)}`} strong />
          <Cell value={formatCurrency(listing.premium)} />
          <Cell value={formatArea(listing.area)} />
          <Cell value={listing.floor || '-'} />
          <Cell value={formatCurrency(listing.maintenanceFee)} />
        </>
      )}

      <Cell value={listing.manager || '-'} />
      <Cell value={formatDate(listing.createdAt)} />

      <div className="flex flex-wrap gap-1.5">
        <MiniButton label="상세" icon={Eye} onClick={() => onView(listing)} />
        <MiniButton label="수정" icon={Edit3} onClick={() => onEdit(listing)} />
        <MiniButton label="복사" icon={Copy} onClick={() => onCopy(listing)} />
        <MiniButton label="삭제" icon={Trash2} danger onClick={() => onDelete(listing.id)} />
      </div>
    </article>
  );
}

export function MobileListingCard({ listing, onView, onEdit, onDelete, onCopy }) {
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="mb-2 flex flex-wrap gap-1.5">
            <Badge value={listing.type} kind="type" />
            <Badge value={listing.status} />
          </div>
          <button onClick={() => onView(listing)} className="truncate text-left text-lg font-extrabold text-slate-950">
            {listing.businessName || '상호 미입력'}
          </button>
          <p className="mt-1 text-sm text-slate-500">{formatRegion(listing)}</p>
        </div>
        <MiniButton label="상세" icon={Eye} onClick={() => onView(listing)} />
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
        <Compact label={listing.type === '매매' ? '매매가' : '임대조건'} value={listing.type === '매매' ? formatCurrency(listing.price) : `${formatCurrency(listing.deposit)} / ${formatCurrency(listing.monthlyRent)}`} />
        <Compact label={listing.type === '매매' ? '수익률' : '권리금'} value={listing.type === '매매' ? formatYield(listing.yieldRate) : formatCurrency(listing.premium)} />
        <Compact label="평수" value={formatArea(listing.area)} />
        <Compact label="층수" value={listing.floor || '-'} />
      </div>

      <div className="mt-3 flex gap-1.5">
        <MiniButton label="수정" icon={Edit3} onClick={() => onEdit(listing)} />
        <MiniButton label="복사" icon={Copy} onClick={() => onCopy(listing)} />
        <MiniButton label="삭제" icon={Trash2} danger onClick={() => onDelete(listing.id)} />
      </div>
    </article>
  );
}

function Cell({ value, strong, title }) {
  return (
    <div
      className={`min-w-0 truncate text-sm ${strong ? 'font-bold text-slate-900' : 'font-medium text-slate-600'}`}
      title={title || value}
    >
      {value || '-'}
    </div>
  );
}

function Compact({ label, value }) {
  return (
    <div className="rounded-xl bg-slate-50 p-3">
      <p className="text-xs font-semibold text-slate-400">{label}</p>
      <p className="mt-1 truncate text-sm font-bold text-slate-900">{value}</p>
    </div>
  );
}

function MiniButton({ label, icon, danger, onClick }) {
  const ButtonIcon = icon;
  return (
    <button
      onClick={onClick}
      className={`inline-flex h-8 items-center gap-1 rounded-lg border px-2 text-xs font-bold transition ${
        danger
          ? 'border-red-100 bg-white text-red-600 hover:bg-red-50'
          : 'border-slate-200 bg-white text-slate-600 hover:border-[#d6b36a] hover:text-[#9a762b]'
      }`}
      title={label}
    >
      <ButtonIcon size={13} />
      {label}
    </button>
  );
}

function formatRegion(listing) {
  return [listing.province, listing.region].filter(Boolean).join(' ') || '-';
}

function formatArea(area) {
  return area ? `${area}평` : '-';
}

function formatUnitPrice(price, area) {
  const amount = Number(price || 0);
  const size = Number(area || 0);
  if (!amount || !size) return '-';
  return `${Math.round(amount / size).toLocaleString('ko-KR')}만원`;
}

function formatYield(value) {
  const number = Number(value || 0);
  return number ? `${number}%` : '-';
}
