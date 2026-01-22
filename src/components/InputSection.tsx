import { FeeInput } from '../hooks/useFeeCalculator';
import {
  PropertyType,
  TransactionType,
  PROPERTY_TYPE_LABELS,
  TRANSACTION_TYPE_LABELS,
} from '../data/rates2026';

interface InputSectionProps {
  input: FeeInput;
  onPropertyTypeChange: (type: PropertyType) => void;
  onTransactionTypeChange: (type: TransactionType) => void;
  onSalePriceChange: (value: number) => void;
  onDepositChange: (value: number) => void;
  onMonthlyRentChange: (value: number) => void;
  onVatTypeChange: (type: FeeInput['vatType']) => void;
}

// 숫자 포맷팅 (1000 -> 1,000)
function formatNumber(value: number): string {
  if (value === 0) return '';
  return value.toLocaleString('ko-KR');
}

// 문자열을 숫자로 파싱 (1,000 -> 1000)
function parseNumber(value: string): number {
  const cleaned = value.replace(/[^0-9]/g, '');
  return cleaned ? parseInt(cleaned, 10) : 0;
}

// 원 -> 억/만원 변환
function formatKoreanCurrency(value: number): string {
  if (value === 0) return '';
  const eok = Math.floor(value / 100_000_000);
  const man = Math.floor((value % 100_000_000) / 10_000);

  const parts: string[] = [];
  if (eok > 0) parts.push(`${eok}억`);
  if (man > 0) parts.push(`${man.toLocaleString()}만`);
  if (parts.length === 0) return `${value.toLocaleString()}원`;
  return parts.join(' ') + '원';
}

export function InputSection({
  input,
  onPropertyTypeChange,
  onTransactionTypeChange,
  onSalePriceChange,
  onDepositChange,
  onMonthlyRentChange,
  onVatTypeChange,
}: InputSectionProps) {
  const isSale = input.transactionType === 'sale';

  // 빠른 입력 버튼 (매매용)
  const salePresets = [
    { label: '3억', value: 300_000_000 },
    { label: '5억', value: 500_000_000 },
    { label: '7억', value: 700_000_000 },
    { label: '10억', value: 1_000_000_000 },
  ];

  // 빠른 입력 버튼 (보증금용)
  const depositPresets = [
    { label: '5천만', value: 50_000_000 },
    { label: '1억', value: 100_000_000 },
    { label: '3억', value: 300_000_000 },
    { label: '5억', value: 500_000_000 },
  ];

  // 빠른 입력 버튼 (월세용)
  const rentPresets = [
    { label: '50만', value: 500_000 },
    { label: '100만', value: 1_000_000 },
    { label: '150만', value: 1_500_000 },
    { label: '200만', value: 2_000_000 },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 space-y-5">
      {/* 매물 종류 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          매물 종류
        </label>
        <div className="grid grid-cols-3 gap-2">
          {(Object.keys(PROPERTY_TYPE_LABELS) as PropertyType[]).map((type) => (
            <button
              key={type}
              onClick={() => onPropertyTypeChange(type)}
              className={`px-3 py-2.5 text-sm font-medium rounded-xl border-2 transition-all ${
                input.propertyType === type
                  ? 'border-primary-500 bg-primary-50 text-primary-700'
                  : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
              }`}
            >
              {type === 'house' && '주택'}
              {type === 'officetel' && '오피스텔'}
              {type === 'commercial' && '상가/토지'}
            </button>
          ))}
        </div>
        <p className="mt-1.5 text-xs text-gray-400">
          {PROPERTY_TYPE_LABELS[input.propertyType]}
        </p>
      </div>

      {/* 거래 유형 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          거래 유형
        </label>
        <div className="grid grid-cols-2 gap-2">
          {(Object.keys(TRANSACTION_TYPE_LABELS) as TransactionType[]).map((type) => (
            <button
              key={type}
              onClick={() => onTransactionTypeChange(type)}
              className={`px-4 py-2.5 text-sm font-medium rounded-xl border-2 transition-all ${
                input.transactionType === type
                  ? 'border-primary-500 bg-primary-50 text-primary-700'
                  : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
              }`}
            >
              {TRANSACTION_TYPE_LABELS[type]}
            </button>
          ))}
        </div>
      </div>

      {/* 금액 입력 */}
      {isSale ? (
        // 매매가 입력
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            매매가
          </label>
          <div className="relative">
            <input
              type="text"
              inputMode="numeric"
              value={formatNumber(input.salePrice)}
              onChange={(e) => onSalePriceChange(parseNumber(e.target.value))}
              placeholder="매매가를 입력하세요"
              className="w-full px-4 py-3 pr-12 text-lg font-medium bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:bg-white focus:outline-none transition-all"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
              원
            </span>
          </div>
          {input.salePrice > 0 && (
            <p className="mt-1.5 text-sm text-primary-600 font-medium">
              {formatKoreanCurrency(input.salePrice)}
            </p>
          )}
          <div className="flex gap-2 mt-2">
            {salePresets.map((preset) => (
              <button
                key={preset.value}
                onClick={() => onSalePriceChange(preset.value)}
                className="flex-1 py-1.5 text-xs font-medium text-gray-500 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>
      ) : (
        // 보증금/월세 입력
        <>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              보증금
            </label>
            <div className="relative">
              <input
                type="text"
                inputMode="numeric"
                value={formatNumber(input.deposit)}
                onChange={(e) => onDepositChange(parseNumber(e.target.value))}
                placeholder="보증금을 입력하세요"
                className="w-full px-4 py-3 pr-12 text-lg font-medium bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:bg-white focus:outline-none transition-all"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                원
              </span>
            </div>
            {input.deposit > 0 && (
              <p className="mt-1.5 text-sm text-primary-600 font-medium">
                {formatKoreanCurrency(input.deposit)}
              </p>
            )}
            <div className="flex gap-2 mt-2">
              {depositPresets.map((preset) => (
                <button
                  key={preset.value}
                  onClick={() => onDepositChange(preset.value)}
                  className="flex-1 py-1.5 text-xs font-medium text-gray-500 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              월세 <span className="text-gray-400 font-normal">(없으면 전세)</span>
            </label>
            <div className="relative">
              <input
                type="text"
                inputMode="numeric"
                value={formatNumber(input.monthlyRent)}
                onChange={(e) => onMonthlyRentChange(parseNumber(e.target.value))}
                placeholder="월세를 입력하세요 (전세는 0)"
                className="w-full px-4 py-3 pr-12 text-lg font-medium bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:bg-white focus:outline-none transition-all"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                원
              </span>
            </div>
            {input.monthlyRent > 0 && (
              <p className="mt-1.5 text-sm text-primary-600 font-medium">
                {formatKoreanCurrency(input.monthlyRent)}
              </p>
            )}
            <div className="flex gap-2 mt-2">
              {rentPresets.map((preset) => (
                <button
                  key={preset.value}
                  onClick={() => onMonthlyRentChange(preset.value)}
                  className="flex-1 py-1.5 text-xs font-medium text-gray-500 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>
        </>
      )}

      {/* 부가세 유형 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          중개사 사업자 유형
        </label>
        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={() => onVatTypeChange('general')}
            className={`px-3 py-2 text-sm font-medium rounded-xl border-2 transition-all ${
              input.vatType === 'general'
                ? 'border-primary-500 bg-primary-50 text-primary-700'
                : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
            }`}
          >
            일반과세자
          </button>
          <button
            onClick={() => onVatTypeChange('simplified')}
            className={`px-3 py-2 text-sm font-medium rounded-xl border-2 transition-all ${
              input.vatType === 'simplified'
                ? 'border-primary-500 bg-primary-50 text-primary-700'
                : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
            }`}
          >
            간이과세자
          </button>
          <button
            onClick={() => onVatTypeChange('exempt')}
            className={`px-3 py-2 text-sm font-medium rounded-xl border-2 transition-all ${
              input.vatType === 'exempt'
                ? 'border-primary-500 bg-primary-50 text-primary-700'
                : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
            }`}
          >
            면세
          </button>
        </div>
        <p className="mt-1.5 text-xs text-gray-400">
          {input.vatType === 'general' && '일반과세자: 부가세 10% 별도'}
          {input.vatType === 'simplified' && '간이과세자: 부가세 4% 별도'}
          {input.vatType === 'exempt' && '면세: 부가세 없음'}
        </p>
      </div>
    </div>
  );
}
