/**
 * 2026년 부동산 중개수수료 요율표
 * 공인중개사법 시행규칙 기준
 */

// 매물 종류
export type PropertyType = 'house' | 'officetel' | 'commercial';

// 거래 유형
export type TransactionType = 'sale' | 'rent';

// 요율 브래킷 타입
export interface RateBracket {
  min: number;        // 최소 금액 (원)
  max: number;        // 최대 금액 (원, Infinity for no limit)
  rate: number;       // 요율 (%, 예: 0.4 = 0.4%)
  maxFee?: number;    // 최대 수수료 한도 (원, optional)
}

// 주택 매매/교환 요율표
export const HOUSE_SALE_RATES: RateBracket[] = [
  { min: 0, max: 50_000_000, rate: 0.6, maxFee: 250_000 },
  { min: 50_000_000, max: 200_000_000, rate: 0.5, maxFee: 800_000 },
  { min: 200_000_000, max: 600_000_000, rate: 0.4 },
  { min: 600_000_000, max: 900_000_000, rate: 0.5 },
  { min: 900_000_000, max: 1_200_000_000, rate: 0.6 },
  { min: 1_200_000_000, max: 1_500_000_000, rate: 0.7 },
  { min: 1_500_000_000, max: Infinity, rate: 0.7 },
];

// 주택 임대차(전/월세) 요율표
export const HOUSE_RENT_RATES: RateBracket[] = [
  { min: 0, max: 50_000_000, rate: 0.5, maxFee: 200_000 },
  { min: 50_000_000, max: 100_000_000, rate: 0.4, maxFee: 300_000 },
  { min: 100_000_000, max: 600_000_000, rate: 0.3 },
  { min: 600_000_000, max: 1_200_000_000, rate: 0.4 },
  { min: 1_200_000_000, max: 1_500_000_000, rate: 0.5 },
  { min: 1_500_000_000, max: Infinity, rate: 0.6 },
];

// 오피스텔 요율 (주거용 기준, 고정 요율)
export const OFFICETEL_RATES = {
  sale: 0.5,    // 매매 0.5%
  rent: 0.4,    // 임대차 0.4%
};

// 토지/상가 등 요율 (협의, 최대 0.9%)
export const COMMERCIAL_MAX_RATE = 0.9;

// 부가세율
export const VAT_RATE = 0.1; // 10%

// 간이과세자 부가세율 (업종별 부가가치율 적용)
export const SIMPLIFIED_VAT_RATE = 0.04; // 4% (부동산중개업 부가가치율 40% × 10%)

// 월세 환산보증금 계산 시 승수
export const MONTHLY_RENT_MULTIPLIER = 100;

/**
 * 거래금액에 따른 요율 조회
 */
export function getRateBracket(
  amount: number,
  propertyType: PropertyType,
  transactionType: TransactionType
): { rate: number; maxFee?: number } {
  // 오피스텔
  if (propertyType === 'officetel') {
    return {
      rate: transactionType === 'sale'
        ? OFFICETEL_RATES.sale
        : OFFICETEL_RATES.rent
    };
  }

  // 토지/상가
  if (propertyType === 'commercial') {
    return { rate: COMMERCIAL_MAX_RATE };
  }

  // 주택
  const rates = transactionType === 'sale'
    ? HOUSE_SALE_RATES
    : HOUSE_RENT_RATES;

  for (const bracket of rates) {
    if (amount >= bracket.min && amount < bracket.max) {
      return { rate: bracket.rate, maxFee: bracket.maxFee };
    }
  }

  // 기본값 (최고 요율)
  const lastBracket = rates[rates.length - 1];
  return { rate: lastBracket.rate, maxFee: lastBracket.maxFee };
}

/**
 * 월세 환산보증금 계산
 * 공식: 보증금 + (월세 × 100)
 */
export function calculateConvertedDeposit(
  deposit: number,
  monthlyRent: number
): number {
  return deposit + (monthlyRent * MONTHLY_RENT_MULTIPLIER);
}

/**
 * 중개수수료 계산
 */
export function calculateBrokerFee(
  amount: number,
  propertyType: PropertyType,
  transactionType: TransactionType
): {
  baseAmount: number;       // 계산 기준 금액
  rate: number;             // 적용 요율 (%)
  fee: number;              // 중개수수료 (부가세 전)
  maxFee?: number;          // 상한 금액
  isMaxApplied: boolean;    // 상한 적용 여부
  vatGeneral: number;       // 일반과세자 부가세
  vatSimplified: number;    // 간이과세자 부가세
  totalGeneral: number;     // 일반과세자 총액
  totalSimplified: number;  // 간이과세자 총액
} {
  const { rate, maxFee } = getRateBracket(amount, propertyType, transactionType);

  // 수수료 계산
  let fee = Math.floor(amount * (rate / 100));
  let isMaxApplied = false;

  // 상한 적용
  if (maxFee && fee > maxFee) {
    fee = maxFee;
    isMaxApplied = true;
  }

  // 부가세 계산
  const vatGeneral = Math.floor(fee * VAT_RATE);
  const vatSimplified = Math.floor(fee * SIMPLIFIED_VAT_RATE);

  return {
    baseAmount: amount,
    rate,
    fee,
    maxFee,
    isMaxApplied,
    vatGeneral,
    vatSimplified,
    totalGeneral: fee + vatGeneral,
    totalSimplified: fee + vatSimplified,
  };
}

// 매물 종류 레이블
export const PROPERTY_TYPE_LABELS: Record<PropertyType, string> = {
  house: '주택 (아파트, 빌라 등)',
  officetel: '오피스텔 (주거용)',
  commercial: '토지/상가/사무실',
};

// 거래 유형 레이블
export const TRANSACTION_TYPE_LABELS: Record<TransactionType, string> = {
  sale: '매매/교환',
  rent: '임대차 (전/월세)',
};
