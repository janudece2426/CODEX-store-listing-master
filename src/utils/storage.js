import { sampleListings } from '../data/sampleListings';

const STORAGE_KEY = 'real-estate-listings-v1';

export function loadListings() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      const normalizedSamples = sampleListings.map(normalizeListing);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(normalizedSamples));
      return normalizedSamples;
    }
    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) ? parsed.map(normalizeListing) : sampleListings.map(normalizeListing);
  } catch {
    return sampleListings.map(normalizeListing);
  }
}

export function saveListings(listings) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(listings));
}

export function exportBackup(listings) {
  const blob = new Blob([JSON.stringify(listings, null, 2)], {
    type: 'application/json',
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `매물관리_백업_${new Date().toISOString().slice(0, 10)}.json`;
  link.click();
  URL.revokeObjectURL(url);
}

export function readBackupFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(reader.result);
        if (!Array.isArray(parsed)) {
          reject(new Error('백업 파일 형식이 올바르지 않습니다.'));
          return;
        }
        resolve(parsed);
      } catch {
        reject(new Error('백업 파일을 읽을 수 없습니다.'));
      }
    };
    reader.onerror = () => reject(new Error('파일 읽기에 실패했습니다.'));
    reader.readAsText(file);
  });
}

export function normalizeListing(listing) {
  const province = listing.province || inferProvince(listing.region);
  const normalized = {
    detailLocation: '',
    province: '부산',
    maintenanceFee: '',
    yieldRate: '',
    tenantConditions: '',
    specialNote: '',
    ...listing,
  };
  normalized.province = province;
  return normalized;
}

function inferProvince(region) {
  const gyeongnam = ['거제시', '김해시', '양산시', '창원시', '진주시', '통영시', '사천시', '밀양시', '창녕군', '고성군', '함안군'];
  return gyeongnam.includes(region) ? '경남' : '부산';
}
