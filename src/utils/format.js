export function formatCurrency(value) {
  const number = Number(value || 0);
  if (!number) return '-';
  return `${number.toLocaleString('ko-KR')}만원`;
}

export function formatDate(value) {
  if (!value) return '-';
  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date(value));
}
