import { X } from 'lucide-react';
import { useEffect, useState } from 'react';
import {
  districtsByProvince,
  emptyListing,
  listingStatuses,
  listingTypes,
  provinces,
} from '../constants/options';
import ActionButton from './ActionButton';

export default function ListingFormModal({ listing, onClose, onSubmit }) {
  const [form, setForm] = useState(emptyListing);

  useEffect(() => {
    setForm(listing ? { ...emptyListing, ...listing } : emptyListing);
  }, [listing]);

  const isEdit = Boolean(listing?.id);

  function updateField(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function updateType(value) {
    setForm((prev) => ({
      ...prev,
      type: value,
      ...(value === '임대'
        ? { price: '', yieldRate: '', tenantConditions: '' }
        : { premium: '', maintenanceFee: '' }),
    }));
  }

  function updateProvince(value) {
    setForm((prev) => ({ ...prev, province: value, region: '' }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!form.businessName.trim()) {
      alert('상호를 입력해주세요.');
      return;
    }
    if (!form.address.trim()) {
      alert('주소지를 입력해주세요.');
      return;
    }
    onSubmit({
      ...form,
      area: toNumber(form.area),
      price: toNumber(form.price),
      deposit: toNumber(form.deposit),
      monthlyRent: toNumber(form.monthlyRent),
      premium: toNumber(form.premium),
      maintenanceFee: toNumber(form.maintenanceFee),
      yieldRate: form.type === '매매' ? calculateYieldRate(form.price, form.deposit, form.monthlyRent) : '',
    });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#2d2530]/38 p-3 backdrop-blur-sm">
      <form
        onSubmit={handleSubmit}
        className="max-h-[94vh] w-full max-w-4xl overflow-y-auto rounded-2xl bg-[#fffaf7] p-5 shadow-2xl"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-bold text-[#b86562]">{isEdit ? 'Edit Listing' : 'New Listing'}</p>
            <h2 className="mt-1 text-2xl font-bold text-[#2d2530]">{isEdit ? '매물 수정' : '매물 등록'}</h2>
          </div>
          <button type="button" onClick={onClose} className="rounded-xl border border-[#ead8d1] bg-white p-2 text-[#6a5960] hover:bg-[#fff4ef]">
            <X size={20} />
          </button>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <Select label="구분" value={form.type} options={listingTypes} onChange={updateType} />
          <Select
            label="현재상태"
            value={form.status}
            options={listingStatuses}
            onChange={(value) => updateField('status', value)}
          />
          <Input
            label={form.type === '매매' ? '매물명' : '상호'}
            value={form.businessName}
            onChange={(value) => updateField('businessName', value)}
            placeholder={form.type === '매매' ? '예: 해운대 수익형 상가' : '예: 역세권 카페 자리'}
            required
          />
          <Input
            label="주소지"
            value={form.address}
            onChange={(value) => updateField('address', value)}
            placeholder="예: 부산 해운대구 우동"
            required
          />
          <Input
            label="상세위치"
            value={form.detailLocation}
            onChange={(value) => updateField('detailLocation', value)}
            placeholder="예: 센텀 메인 상권, 역 도보 3분"
          />
          <Select label="광역지역" value={form.province} options={provinces} onChange={updateProvince} />
          <Select
            label="세부지역"
            value={form.region}
            options={districtsByProvince[form.province] || []}
            onChange={(value) => updateField('region', value)}
          />
          <Input
            label="층수"
            value={form.floor}
            onChange={(value) => updateField('floor', value)}
            placeholder="예: 1층, 5층, 지하1층"
          />
          <Input label="평수" type="number" value={form.area} onChange={(value) => updateField('area', value)} />
          <Input label="담당자" value={form.manager} onChange={(value) => updateField('manager', value)} />
          <Input label="연락처" value={form.contact} onChange={(value) => updateField('contact', value)} />
        </div>

        <div className="mt-6 rounded-2xl border border-[#ead8d1] bg-white p-4">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-bold text-[#2d2530]">
                {form.type === '매매' ? '매매 조건' : '임대 조건'}
              </p>
              <p className="mt-1 text-xs font-medium text-[#6a5960]">
                {form.type === '매매'
                  ? '매매가와 수익률 중심으로 입력합니다.'
                  : '보증금, 월세, 권리금, 공용관리비 중심으로 입력합니다.'}
              </p>
            </div>
          </div>

          {form.type === '매매' ? (
            <div className="grid gap-4 md:grid-cols-5">
              <Input
                label="매매가(만원)"
                type="number"
                value={form.price}
                onChange={(value) => updateField('price', value)}
                placeholder="예: 185000"
              />
              <Input
                label="보증금(만원)"
                type="number"
                value={form.deposit}
                onChange={(value) => updateField('deposit', value)}
                placeholder="예: 5000"
              />
              <Input
                label="월세(만원)"
                type="number"
                value={form.monthlyRent}
                onChange={(value) => updateField('monthlyRent', value)}
                placeholder="예: 450"
              />
              <ReadOnlyField label="평단가" value={formatUnitPrice(form.price, form.area)} />
              <ReadOnlyField label="수익률" value={formatYieldRate(form.price, form.deposit, form.monthlyRent)} />
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-4">
              <Input
                label="보증금(만원)"
                type="number"
                value={form.deposit}
                onChange={(value) => updateField('deposit', value)}
                placeholder="예: 3000"
              />
              <Input
                label="월세(만원)"
                type="number"
                value={form.monthlyRent}
                onChange={(value) => updateField('monthlyRent', value)}
                placeholder="예: 210"
              />
              <Input
                label="권리금(만원)"
                type="number"
                value={form.premium}
                onChange={(value) => updateField('premium', value)}
                placeholder="예: 1200"
              />
              <Input
                label="공용관리비(만원)"
                type="number"
                value={form.maintenanceFee}
                onChange={(value) => updateField('maintenanceFee', value)}
                placeholder="예: 18"
              />
            </div>
          )}
        </div>

        {form.type === '매매' ? (
          <label className="mt-4 block text-sm font-bold text-[#5f4b52]">
            현재 임차조건
            <textarea
              value={form.tenantConditions}
              onChange={(event) => updateField('tenantConditions', event.target.value)}
              rows={4}
              className="mt-2 w-full resize-none rounded-2xl border border-[#ead8d1] bg-white px-4 py-3 text-sm font-medium text-[#2d2530] outline-none placeholder:text-[#9a8b91] focus:border-[#b86562] focus:ring-4 focus:ring-[#b86562]/15"
              placeholder="예: 1층 카페 보증금 5,000 / 월세 450, 2층 사무실 보증금 2,000 / 월세 180 등 전체 임차인 조건"
            />
          </label>
        ) : null}

        <label className="mt-4 block text-sm font-bold text-[#5f4b52]">
          메모
          <textarea
            value={form.memo}
            onChange={(event) => updateField('memo', event.target.value)}
            rows={4}
            className="mt-2 w-full resize-none rounded-2xl border border-[#ead8d1] bg-white px-4 py-3 text-sm font-medium text-[#2d2530] outline-none placeholder:text-[#9a8b91] focus:border-[#b86562] focus:ring-4 focus:ring-[#b86562]/15"
            placeholder="특이사항, 고객 요청사항, 확인할 내용 등을 기록하세요."
          />
        </label>

        <label className="mt-4 block text-sm font-bold text-[#5f4b52]">
          특이사항
          <textarea
            value={form.specialNote}
            onChange={(event) => updateField('specialNote', event.target.value)}
            rows={3}
            className="mt-2 w-full resize-none rounded-2xl border border-[#ead8d1] bg-white px-4 py-3 text-sm font-medium text-[#2d2530] outline-none placeholder:text-[#9a8b91] focus:border-[#b86562] focus:ring-4 focus:ring-[#b86562]/15"
            placeholder="가격 협의, 임차 조건, 현장 확인 포인트 등을 기록하세요."
          />
        </label>

        <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <ActionButton type="button" onClick={onClose}>
            취소
          </ActionButton>
          <ActionButton type="submit" variant="primary">
            {isEdit ? '수정 저장' : '등록 저장'}
          </ActionButton>
        </div>
      </form>
    </div>
  );
}

function Input({ label, value, onChange, type = 'text', placeholder, required }) {
  return (
    <label className="text-sm font-bold text-[#5f4b52]">
      {label}
      <input
        type={type}
        value={value ?? ''}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        required={required}
        className="mt-2 h-11 w-full rounded-xl border border-[#ead8d1] bg-white px-3 text-sm font-medium text-[#2d2530] outline-none placeholder:text-[#9a8b91] focus:border-[#b86562] focus:ring-4 focus:ring-[#b86562]/15"
      />
    </label>
  );
}

function Select({ label, value, options, onChange }) {
  return (
    <label className="text-sm font-bold text-[#5f4b52]">
      {label}
      <select
        value={value ?? ''}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 h-11 w-full rounded-xl border border-[#ead8d1] bg-white px-3 text-sm font-medium text-[#2d2530] outline-none focus:border-[#b86562] focus:ring-4 focus:ring-[#b86562]/15"
      >
        <option value="">선택</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

function ReadOnlyField({ label, value }) {
  return (
    <div className="text-sm font-bold text-[#5f4b52]">
      {label}
      <div className="mt-2 flex h-11 items-center rounded-xl border border-[#ead8d1] bg-[#fff4ef] px-3 text-sm font-bold text-[#6a5960]">
        {value}
      </div>
    </div>
  );
}

function toNumber(value) {
  if (value === '' || value === null || value === undefined) return '';
  return Number(value);
}

function formatUnitPrice(price, area) {
  const amount = Number(price || 0);
  const size = Number(area || 0);
  if (!amount || !size) return '평수와 매매가 입력 시 자동 계산';
  return `${Math.round(amount / size).toLocaleString('ko-KR')}만원 / 평`;
}

function calculateYieldRate(price, deposit, monthlyRent) {
  const salePrice = Number(price || 0);
  const leaseDeposit = Number(deposit || 0);
  const rent = Number(monthlyRent || 0);
  const investedAmount = salePrice - leaseDeposit;
  if (!salePrice || investedAmount <= 0 || !rent) return '';
  return Number(((rent * 12 * 100) / investedAmount).toFixed(2));
}

function formatYieldRate(price, deposit, monthlyRent) {
  const rate = calculateYieldRate(price, deposit, monthlyRent);
  return rate === '' ? '매매가, 보증금, 월세 입력 시 자동 계산' : `${rate}%`;
}
