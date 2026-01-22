# 설치 가이드

## 요구사항

- Node.js 18.x 이상
- npm 또는 yarn

## 설치

```bash
# 저장소 클론
git clone https://github.com/oh-namgyu/realestate-fee-calculator-2026.git
cd realestate-fee-calculator-2026

# 의존성 설치
npm install
```

## 개발 서버 실행

```bash
npm run dev
```

브라우저에서 `http://localhost:5173` 접속

## 빌드

```bash
npm run build
```

빌드 결과물은 `dist/` 폴더에 생성됩니다.

## 프리뷰

```bash
npm run preview
```

빌드된 결과물을 로컬에서 미리 확인할 수 있습니다.

## 린트

```bash
npm run lint
```

## 스크립트 요약

| 명령어 | 설명 |
|--------|------|
| `npm run dev` | 개발 서버 실행 |
| `npm run build` | 프로덕션 빌드 |
| `npm run preview` | 빌드 결과물 프리뷰 |
| `npm run lint` | ESLint 검사 |

## 환경 변수

현재 환경 변수는 사용하지 않습니다. 모든 설정은 코드 내에 포함되어 있습니다.

## 요율 데이터 수정

법률 변경 시 `src/data/rates2026.ts` 파일만 수정하면 됩니다:

```typescript
// 예: 주택 매매 요율 변경
export const HOUSE_SALE_RATES: RateBracket[] = [
  { min: 0, max: 50_000_000, rate: 0.6, maxFee: 250_000 },
  // ... 요율 수정
];
```

## 문제 해결

### Tailwind CSS 빌드 오류

```bash
# @tailwindcss/postcss 설치 확인
npm install @tailwindcss/postcss
```

`postcss.config.js` 확인:
```javascript
export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
}
```

### TypeScript 오류

```bash
# 타입 체크
npx tsc --noEmit
```
