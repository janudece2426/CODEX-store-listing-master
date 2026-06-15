import { Trash2, X } from 'lucide-react';
import { formatCurrency, formatDate } from '../utils/format';
import ActionButton from './ActionButton';
import { Badge } from './Badge';

export default function ListingDetail({ listing, onClose, onEdit, onDelete }) {
  if (!listing) return null;

  return (
    <div className="fixed inset-0 z-40 flex justify-end bg-slate-950/30 p-0 backdrop-blur-sm sm:p-4">
      <aside className="h-full w-full overflow-y-auto bg-white p-5 shadow-2xl sm:max-w-xl sm:rounded-2xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex flex-wrap gap-2">
              <Badge value={listing.type} kind="type" />
              <Badge value={listing.status} />
            </div>
            <h2 className="mt-4 text-2xl font-bold text-slate-950">{listing.businessName || '상호 미입력'}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">{listing.address || '주소 미입력'}</p>
            {listing.detailLocation ? <p className="mt-1 text-sm text-slate-400">{listing.detailLocation}</p> : null}
          </div>
          <button onClick={onClose} className="rounded-xl border border-slate-200 p-2 text-slate-500 hover:bg-slate-50">
            <X size={20} />
          </button>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <Detail label="광역지역" value={listing.province} />
          <Detail label="세부지역" value={listing.region} />
          <Detail label="층수" value={listing.floor} />
          <Detail label="평수" value={listing.area ? `${listing.area}평` : ''} />
          <Detail label="담당자" value={listing.manager} />
          <Detail label="연락처" value={listing.contact} />
        </div>

        <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <h3 className="text-sm font-bold text-slate-900">금액 정보</h3>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <Detail label="매매가" value={formatCurrency(listing.price)} />
            <Detail label="보증금" value={formatCurrency(listing.deposit)} />
            <Detail label="월세" value={formatCurrency(listing.monthlyRent)} />
            <Detail label="권리금" value={formatCurrency(listing.premium)} />
            <Detail label="공용관리비" value={formatCurrency(listing.maintenanceFee)} />
            <Detail label="평단가" value={formatUnitPrice(listing.price, listing.area)} />
            <Detail label="수익률" value={formatYield(listing.yieldRate)} />
          </div>
        </div>

        {listing.type === '매매' ? (
          <div className="mt-6 rounded-2xl border border-slate-200 p-5">
            <h3 className="text-sm font-bold text-slate-900">현재 임차조건</h3>
            <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-slate-600">
              {listing.tenantConditions || '임차조건이 없습니다.'}
            </p>
          </div>
        ) : null}

        <div className="mt-6 rounded-2xl border border-slate-200 p-5">
          <h3 className="text-sm font-bold text-slate-900">메모</h3>
          <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-slate-600">{listing.memo || '메모가 없습니다.'}</p>
        </div>

        <div className="mt-6 rounded-2xl border border-slate-200 p-5">
          <h3 className="text-sm font-bold text-slate-900">특이사항</h3>
          <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-slate-600">
            {listing.specialNote || '특이사항이 없습니다.'}
          </p>
        </div>

        <div className="mt-6 grid gap-3 text-sm text-slate-500 sm:grid-cols-2">
          <Detail label="등록일" value={formatDate(listing.createdAt)} />
          <Detail label="수정일" value={formatDate(listing.updatedAt)} />
        </div>

        <div className="sticky bottom-0 mt-6 grid gap-2 bg-white pt-4 sm:grid-cols-[auto_1fr_auto]">
          <ActionButton onClick={onClose} className="w-full sm:w-auto">
            창 닫기
          </ActionButton>
          <ActionButton variant="primary" onClick={() => onEdit(listing)} className="w-full">
            이 매물 수정
          </ActionButton>
          <ActionButton icon={Trash2} variant="danger" onClick={() => onDelete(listing.id)} className="w-full sm:w-auto">
            삭제
          </ActionButton>
        </div>
      </aside>
    </div>
  );
}

function Detail({ label, value }) {
  return (
    <div>
      <p className="text-xs font-semibold text-slate-400">{label}</p>
      <p className="mt-1 font-semibold text-slate-800">{value || '-'}</p>
    </div>
  );
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
