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

export function downloadPrintExcel(listings) {
  const rentRows = listings.filter((listing) => listing.type === '임대').map(toRentPrintRow);
  const saleRows = listings.filter((listing) => listing.type === '매매').map(toSalePrintRow);
  const workbook = XLSX.utils.book_new();

  if (rentRows.length) {
    const sheet = XLSX.utils.json_to_sheet(rentRows);
    applyPrintLayout(sheet, [
      { wch: 10 },
      { wch: 18 },
      { wch: 14 },
      { wch: 24 },
      { wch: 18 },
      { wch: 12 },
      { wch: 8 },
      { wch: 8 },
      { wch: 12 },
      { wch: 14 },
      { wch: 10 },
      { wch: 24 },
    ]);
    XLSX.utils.book_append_sheet(workbook, sheet, '임대 인쇄용');
  }

  if (saleRows.length) {
    const sheet = XLSX.utils.json_to_sheet(saleRows);
    applyPrintLayout(sheet, [
      { wch: 10 },
      { wch: 18 },
      { wch: 14 },
      { wch: 24 },
      { wch: 14 },
      { wch: 14 },
      { wch: 8 },
      { wch: 8 },
      { wch: 10 },
      { wch: 14 },
      { wch: 10 },
      { wch: 28 },
    ]);
    XLSX.utils.book_append_sheet(workbook, sheet, '매매 인쇄용');
  }

  if (!rentRows.length && !saleRows.length) {
    XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet([{ 안내: '출력할 매물이 없습니다.' }]), '인쇄용');
  }

  XLSX.writeFile(workbook, `매물목록_인쇄용_${new Date().toISOString().slice(0, 10)}.xlsx`);
}

function formatDate(value) {
  if (!value) return '';
  return new Intl.DateTimeFormat('ko-KR').format(new Date(value));
}

function toRentPrintRow(listing) {
  return {
    상태: listing.status || '',
    상호: listing.businessName || '',
    지역: [listing.province, listing.region].filter(Boolean).join(' '),
    주소지: [listing.address, listing.detailLocation].filter(Boolean).join(' / '),
    임대조건: `${formatMoney(listing.deposit)} / ${formatMoney(listing.monthlyRent)}`,
    권리금: formatMoney(listing.premium),
    평수: listing.area ? `${listing.area}평` : '',
    층수: listing.floor || '',
    공용관리비: formatMoney(listing.maintenanceFee),
    연락처: listing.contact || '',
    담당자: listing.manager || '',
    메모: [listing.memo, listing.specialNote].filter(Boolean).join(' / '),
  };
}

function toSalePrintRow(listing) {
  return {
    상태: listing.status || '',
    매물명: listing.businessName || '',
    지역: [listing.province, listing.region].filter(Boolean).join(' '),
    주소지: [listing.address, listing.detailLocation].filter(Boolean).join(' / '),
    매매가: formatMoney(listing.price),
    '보증금/월세': `${formatMoney(listing.deposit)} / ${formatMoney(listing.monthlyRent)}`,
    평수: listing.area ? `${listing.area}평` : '',
    층수: listing.floor || '',
    수익률: listing.yieldRate ? `${listing.yieldRate}%` : '',
    연락처: listing.contact || '',
    담당자: listing.manager || '',
    임차조건: listing.tenantConditions || '',
  };
}

function formatMoney(value) {
  const number = Number(value || 0);
  return number ? `${number.toLocaleString('ko-KR')}만원` : '';
}

function applyPrintLayout(sheet, columnWidths) {
  sheet['!cols'] = columnWidths;
  sheet['!margins'] = {
    left: 0.3,
    right: 0.3,
    top: 0.5,
    bottom: 0.5,
    header: 0.2,
    footer: 0.2,
  };
  sheet['!pageSetup'] = {
    orientation: 'landscape',
    fitToWidth: 1,
    fitToHeight: 0,
  };
  sheet['!autofilter'] = sheet['!ref'] ? { ref: sheet['!ref'] } : undefined;
}
