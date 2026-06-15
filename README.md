# 상가 매물관리 마스터

지인들과 가볍게 사용할 수 있는 상가 매물관리 웹앱입니다. 복잡한 CRM 대신 매물 등록, 목록 확인, 상세보기, 수정, 삭제, 검색, 필터, 엑셀 다운로드, 백업/복원 기능에 집중합니다.

## 주요 기능

- 임대/매매 매물 등록 및 수정
- 실무형 리스트 테이블 UI
- 상세보기, 삭제, 복사
- 검색 및 지역/층수/평수/담당자 필터
- localStorage 기반 브라우저 저장
- 엑셀 다운로드
- JSON 백업/복원
- 반응형 화면

## 기술 스택

- React
- Vite
- Tailwind CSS
- lucide-react
- xlsx
- localStorage

## 실행 방법

```bash
npm install
npm run dev
```

브라우저에서 안내되는 로컬 주소를 열면 됩니다. 기본 Vite 주소는 보통 `http://localhost:5173/`입니다.

## 빌드

```bash
npm run build
```

빌드 결과물은 `dist/` 폴더에 생성됩니다.

## Vercel 배포

Vercel에서 GitHub 저장소를 연결한 뒤 아래 설정을 사용하면 됩니다.

- Framework Preset: `Vite`
- Install Command: `npm install`
- Build Command: `npm run build`
- Output Directory: `dist`

## 저장 방식 안내

매물 데이터는 서버가 아니라 현재 브라우저의 localStorage에 저장됩니다. 다른 기기나 다른 브라우저로 이동할 때는 앱의 백업/복원 기능을 사용해야 합니다.
