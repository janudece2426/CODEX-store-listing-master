export const listingTypes = ['임대', '매매'];
export const listingStatuses = ['진행중', '계약완료', '보류'];
export const industries = ['카페', '음식점', '뷰티', '학원', '사무실', '일반상가', '기타'];
export const floors = ['지하', '1층', '2층', '3층', '4층 이상'];
export const provinces = ['부산', '경남'];

export const busanDistricts = [
  '강서구',
  '금정구',
  '기장군',
  '남구',
  '동구',
  '동래구',
  '부산진구',
  '북구',
  '사상구',
  '사하구',
  '서구',
  '수영구',
  '연제구',
  '영도구',
  '중구',
  '해운대구',
];

export const gyeongnamDistricts = [
  '거제시',
  '김해시',
  '양산시',
  '창원시',
  '진주시',
  '통영시',
  '사천시',
  '밀양시',
  '창녕군',
  '고성군',
  '함안군',
  '기타',
];

export const districtsByProvince = {
  부산: busanDistricts,
  경남: gyeongnamDistricts,
};

export const emptyListing = {
  type: '임대',
  status: '진행중',
  businessName: '',
  address: '',
  detailLocation: '',
  province: '부산',
  region: '',
  industry: '',
  floor: '',
  area: '',
  price: '',
  deposit: '',
  monthlyRent: '',
  premium: '',
  maintenanceFee: '',
  yieldRate: '',
  tenantConditions: '',
  manager: '',
  contact: '',
  memo: '',
  specialNote: '',
};
