import { useState, useMemo, useEffect } from 'react';
import {
  PropertyType,
  TransactionType,
  calculateBrokerFee,
  calculateConvertedDeposit,
} from '../data/rates2026';

// 입력 상태 타입
export interface FeeInput {
  propertyType: PropertyType;
  transactionType: TransactionType;
  // 매매용
  salePrice: number;
  // 임대차용
  deposit: number;       // 보증금
  monthlyRent: number;   // 월세
  // 부가세 유형
  vatType: 'general' | 'simplified' | 'exempt'; // 일반과세자/간이과세자/면세
}

// 계산 결과 타입
export interface CalculationResult {
  // 기본 정보
  baseAmount: number;           // 계산 기준 금액
  convertedDeposit?: number;    // 환산보증금 (월세인 경우)
  // 수수료 정보
  rate: number;                 // 적용 요율 (%)
  fee: number;                  // 중개수수료 (부가세 전)
  maxFee?: number;              // 상한 금액
  isMaxApplied: boolean;        // 상한 적용 여부
  // 부가세
  vat: number;                  // 적용된 부가세
  vatType: FeeInput['vatType']; // 부가세 유형
  // 총액
  total: number;                // 최종 지불 금액
  // 참고용 (일반/간이 비교)
  vatGeneral: number;
  vatSimplified: number;
  totalGeneral: number;
  totalSimplified: number;
}

const STORAGE_KEY = 'realestate-fee-calculator-2026-data';

const DEFAULT_INPUT: FeeInput = {
  propertyType: 'house',
  transactionType: 'sale',
  salePrice: 0,
  deposit: 0,
  monthlyRent: 0,
  vatType: 'general',
};

// localStorage에서 데이터 로드
function loadFromStorage(): FeeInput {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return { ...DEFAULT_INPUT, ...parsed };
    }
  } catch {
    // ignore
  }
  return DEFAULT_INPUT;
}

// localStorage에 데이터 저장
function saveToStorage(input: FeeInput): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(input));
  } catch {
    // ignore
  }
}

export function useFeeCalculator() {
  const [input, setInput] = useState<FeeInput>(loadFromStorage);

  // 입력값 변경 시 저장
  useEffect(() => {
    saveToStorage(input);
  }, [input]);

  // 계산 결과
  const result = useMemo<CalculationResult | null>(() => {
    let baseAmount: number;
    let convertedDeposit: number | undefined;

    if (input.transactionType === 'sale') {
      // 매매의 경우
      baseAmount = input.salePrice;
    } else {
      // 임대차의 경우
      if (input.monthlyRent > 0) {
        // 월세가 있으면 환산보증금 계산
        convertedDeposit = calculateConvertedDeposit(input.deposit, input.monthlyRent);
        baseAmount = convertedDeposit;
      } else {
        // 전세의 경우 보증금 그대로
        baseAmount = input.deposit;
      }
    }

    // 금액이 0이면 계산하지 않음
    if (baseAmount <= 0) {
      return null;
    }

    // 수수료 계산
    const feeResult = calculateBrokerFee(
      baseAmount,
      input.propertyType,
      input.transactionType
    );

    // 부가세 유형에 따른 최종 금액
    let vat: number;
    let total: number;

    switch (input.vatType) {
      case 'general':
        vat = feeResult.vatGeneral;
        total = feeResult.totalGeneral;
        break;
      case 'simplified':
        vat = feeResult.vatSimplified;
        total = feeResult.totalSimplified;
        break;
      case 'exempt':
      default:
        vat = 0;
        total = feeResult.fee;
        break;
    }

    return {
      baseAmount,
      convertedDeposit,
      rate: feeResult.rate,
      fee: feeResult.fee,
      maxFee: feeResult.maxFee,
      isMaxApplied: feeResult.isMaxApplied,
      vat,
      vatType: input.vatType,
      total,
      vatGeneral: feeResult.vatGeneral,
      vatSimplified: feeResult.vatSimplified,
      totalGeneral: feeResult.totalGeneral,
      totalSimplified: feeResult.totalSimplified,
    };
  }, [input]);

  // 입력값 업데이트 함수들
  const updateInput = (updates: Partial<FeeInput>) => {
    setInput(prev => ({ ...prev, ...updates }));
  };

  const setPropertyType = (propertyType: PropertyType) => {
    updateInput({ propertyType });
  };

  const setTransactionType = (transactionType: TransactionType) => {
    updateInput({ transactionType });
  };

  const setSalePrice = (salePrice: number) => {
    updateInput({ salePrice });
  };

  const setDeposit = (deposit: number) => {
    updateInput({ deposit });
  };

  const setMonthlyRent = (monthlyRent: number) => {
    updateInput({ monthlyRent });
  };

  const setVatType = (vatType: FeeInput['vatType']) => {
    updateInput({ vatType });
  };

  const reset = () => {
    setInput(DEFAULT_INPUT);
    localStorage.removeItem(STORAGE_KEY);
  };

  return {
    input,
    result,
    updateInput,
    setPropertyType,
    setTransactionType,
    setSalePrice,
    setDeposit,
    setMonthlyRent,
    setVatType,
    reset,
  };
}
