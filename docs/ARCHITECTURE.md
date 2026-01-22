# 프로젝트 아키텍처

## 기술 스택

| 카테고리 | 기술 | 버전 |
|---------|------|------|
| 프레임워크 | React | 19.x |
| 언어 | TypeScript | 5.7.x |
| 빌드 도구 | Vite | 6.x |
| 스타일링 | Tailwind CSS | 4.x |
| 배포 | Vercel | - |

## 디렉토리 구조

```
realestate-fee-calculator-2026/
├── docs/                          # 문서
│   ├── ARCHITECTURE.md           # 아키텍처 문서 (현재 파일)
│   ├── DEPLOYMENT.md             # 배포 가이드
│   └── SETUP.md                  # 설치 가이드
├── public/                        # 정적 파일
│   ├── ads.txt                   # Google AdSense 인증
│   └── favicon.svg               # 파비콘
├── src/
│   ├── components/               # React 컴포넌트
│   │   ├── Header.tsx           # 헤더 (로고, 초기화 버튼)
│   │   ├── InputSection.tsx     # 입력 폼 (매물/거래 유형, 금액)
│   │   ├── ResultCard.tsx       # 결과 표시 (수수료, 부가세)
│   │   ├── AdSlot.tsx           # Google AdSense 광고 슬롯
│   │   ├── SeoContent.tsx       # SEO 콘텐츠 (복비 절약 팁)
│   │   ├── Footer.tsx           # 푸터 (면책조항, 개인정보처리방침)
│   │   └── index.ts             # 컴포넌트 배럴 export
│   ├── data/
│   │   └── rates2026.ts         # 요율 데이터 (단일 진실 공급원)
│   ├── hooks/
│   │   └── useFeeCalculator.ts  # 수수료 계산 로직 훅
│   ├── App.tsx                   # 메인 앱 컴포넌트
│   ├── main.tsx                  # React DOM 진입점
│   ├── index.css                 # Tailwind + 커스텀 스타일
│   └── vite-env.d.ts            # Vite 타입 선언
├── index.html                    # HTML 진입점 (SEO 메타태그)
├── package.json                  # 의존성 정의
├── vite.config.ts               # Vite 설정
├── tailwind.config.js           # Tailwind 설정
├── postcss.config.js            # PostCSS 설정
├── tsconfig.json                # TypeScript 설정
└── vercel.json                  # Vercel 배포 설정
```

## 핵심 모듈

### 1. 요율 데이터 (`src/data/rates2026.ts`)

2026년 공인중개사법 시행규칙 기준 요율표를 관리합니다.

**주택 매매 요율:**
| 거래금액 | 요율 | 상한 |
|---------|------|------|
| 5천만 미만 | 0.6% | 25만원 |
| 5천만~2억 | 0.5% | 80만원 |
| 2억~6억 | 0.4% | - |
| 6억~9억 | 0.5% | - |
| 9억~12억 | 0.6% | - |
| 12억~15억 | 0.7% | - |
| 15억 이상 | 0.7% | - |

**주택 임대차 요율:**
| 거래금액 | 요율 | 상한 |
|---------|------|------|
| 5천만 미만 | 0.5% | 20만원 |
| 5천만~1억 | 0.4% | 30만원 |
| 1억~6억 | 0.3% | - |
| 6억~12억 | 0.4% | - |
| 12억~15억 | 0.5% | - |
| 15억 이상 | 0.6% | - |

**오피스텔 (주거용):**
- 매매: 0.5%
- 임대차: 0.4%

**토지/상가:**
- 최대 0.9% (협의)

### 2. 계산 훅 (`src/hooks/useFeeCalculator.ts`)

**입력 상태:**
```typescript
interface FeeInput {
  propertyType: 'house' | 'officetel' | 'commercial';
  transactionType: 'sale' | 'rent';
  salePrice: number;      // 매매가
  deposit: number;        // 보증금
  monthlyRent: number;    // 월세
  vatType: 'general' | 'simplified' | 'exempt';
}
```

**계산 결과:**
```typescript
interface CalculationResult {
  baseAmount: number;        // 기준 금액
  convertedDeposit?: number; // 환산보증금
  rate: number;              // 적용 요율
  fee: number;               // 수수료
  vat: number;               // 부가세
  total: number;             // 총액
}
```

**월세 환산보증금 공식:**
```
환산보증금 = 보증금 + (월세 × 100)
```

### 3. 컴포넌트 계층

```
App
├── Header (초기화 버튼)
├── InputSection (입력 폼)
│   ├── 매물 종류 선택
│   ├── 거래 유형 선택
│   ├── 금액 입력 (빠른 입력 버튼)
│   └── 부가세 유형 선택
├── ResultCard (결과가 있을 때만)
│   ├── 최종 수수료 하이라이트
│   ├── 계산 상세 테이블
│   └── 부가세 유형별 비교
├── AdSlot (result-bottom)
├── SeoContent (SEO 콘텐츠)
├── AdSlot (page-bottom)
└── Footer (면책조항)
```

## 데이터 흐름

```
사용자 입력 → useFeeCalculator 훅 → 계산 결과 → UI 렌더링
     ↓
localStorage 저장 (자동)
```

## 스타일링

**색상 테마 (오렌지/화이트):**
- Primary: `#f97316` (오렌지)
- Background: `#fff7ed` (연한 오렌지)
- Card: `#ffffff` (화이트)
- Text: `#1f2937` (다크 그레이)

**Tailwind CSS v4 설정:**
```css
@theme {
  --color-primary-500: #f97316;
  --color-primary-600: #ea580c;
  /* ... */
}
```

## 부가세 계산

| 유형 | 세율 | 설명 |
|------|------|------|
| 일반과세자 | 10% | 표준 부가세율 |
| 간이과세자 | 4% | 부가가치율 40% × 10% |
| 면세 | 0% | 부가세 없음 |
