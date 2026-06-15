import { RotateCcw } from 'lucide-react';
import { districtsByProvince, floors as defaultFloors } from '../constants/options';
import ActionButton from './ActionButton';

const filterFields = [
  { key: 'status', label: '현재상태', options: ['진행중', '계약완료', '보류'] },
  { key: 'floor', label: '층수', options: [] },
  { key: 'area', label: '평수', options: ['10평 이하', '10-30평', '30-50평', '50평 이상'] },
  { key: 'manager', label: '담당자', options: [] },
];

export default function Filters({ activeTab, filters, managers, floors, onTabChange, onFilterChange, onReset }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap gap-2">
          {['전체', '임대', '매매'].map((tab) => (
            <button
              key={tab}
              onClick={() => onTabChange(tab)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                activeTab === tab
                  ? 'bg-[#10182b] text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-6">
          <label className="text-xs font-semibold text-slate-500">
            광역지역
            <select
              value={filters.province}
              onChange={(event) => {
                onFilterChange('province', event.target.value);
                onFilterChange('region', '');
              }}
              className="mt-1 h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 outline-none focus:border-[#c8a24d] focus:ring-4 focus:ring-[#c8a24d]/10"
            >
              <option value="">전체</option>
              <option value="부산">부산</option>
              <option value="경남">경남</option>
            </select>
          </label>

          <label className="text-xs font-semibold text-slate-500">
            세부지역
            <select
              value={filters.region}
              onChange={(event) => onFilterChange('region', event.target.value)}
              className="mt-1 h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 outline-none focus:border-[#c8a24d] focus:ring-4 focus:ring-[#c8a24d]/10"
            >
              <option value="">전체</option>
              {(filters.province ? districtsByProvince[filters.province] : Object.values(districtsByProvince).flat()).map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>

          {filterFields.map((field) => {
            const options =
              field.key === 'manager'
                ? managers
                : field.key === 'floor'
                  ? [...new Set([...defaultFloors, ...floors])]
                  : field.options;
            return (
              <label key={field.key} className="text-xs font-semibold text-slate-500">
                {field.label}
                <select
                  value={filters[field.key]}
                  onChange={(event) => onFilterChange(field.key, event.target.value)}
                  className="mt-1 h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 outline-none focus:border-[#c8a24d] focus:ring-4 focus:ring-[#c8a24d]/10"
                >
                  <option value="">전체</option>
                  {options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>
            );
          })}
        </div>

        <div className="flex justify-end">
          <ActionButton icon={RotateCcw} onClick={onReset} className="w-full sm:w-auto">
            필터 초기화
          </ActionButton>
        </div>
      </div>
    </section>
  );
}
