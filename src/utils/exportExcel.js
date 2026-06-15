import * as XLSX from 'xlsx';

const headers = {
  type: '구분',
  status: '현재상태',
  businessName: '상호',
  province: '광역지역',
  region: '세부지역',
  address: '주소지',
  detailLocation: '상세위치',
  floor: '층수',
  area: '평수',
  price: '매매가',
  deposit: '보증금',
  monthlyRent: '월세',
  premium: '권리금',
  maintenanceFee: '공용관리비',
  yieldRate: '수익률',
  tenantConditions: '현재 임차조건',
  manager: '담당자',
  contact: '연락처',
  memo: '메모',
  specialNote: '특이사항',
  createdAt: '등록일',
  updatedAt: '수정일',
};

export function downloadListingsExcel(listings) {
  const rows = listings.map((listing) =>
    Object.fromEntries(
      Object.entries(headers).map(([key, label]) => [
        label,
        key === 'updatedAt' || key === 'createdAt' ? formatDate(listing[key]) : listing[key] ?? '',
      ]),
    ),
  );
  const sheet = XLSX.utils.json_to_sheet(rows);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, sheet, '매물목록');
  XLSX.writeFile(workbook, `매물목록_${new Date().toISOString().slice(0, 10)}.xlsx`);
}

function formatDate(value) {
  if (!value) return '';
  return new Intl.DateTimeFormat('ko-KR').format(new Date(value));
}
