import { CalculationResult, FeeInput } from '../hooks/useFeeCalculator';

interface ResultCardProps {
  result: CalculationResult;
  input: FeeInput;
}

// 숫자 포맷팅
function formatCurrency(value: number): string {
  return value.toLocaleString('ko-KR');
}

// 원 -> 억/만원 변환
function formatKoreanCurrency(value: number): string {
  if (value === 0) return '0원';
  const eok = Math.floor(value / 100_000_000);
  const man = Math.floor((value % 100_000_000) / 10_000);
  const won = value % 10_000;

  const parts: string[] = [];
  if (eok > 0) parts.push(`${eok}억`);
  if (man > 0) parts.push(`${man.toLocaleString()}만`);
  if (won > 0 && eok === 0 && man === 0) parts.push(`${won.toLocaleString()}`);
  if (parts.length === 0) return `${value.toLocaleString()}원`;
  return parts.join(' ') + '원';
}

export function ResultCard({ result, input }: ResultCardProps) {
  const isRent = input.transactionType === 'rent';
  const hasMonthlyRent = isRent && input.monthlyRent > 0;

  return (
    <div className="space-y-4">
      {/* 최종 수수료 하이라이트 */}
      <div className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl p-5 text-white shadow-lg shadow-primary-500/30">
        <p className="text-sm text-primary-100 mb-1">최종 중개수수료 (부가세 포함)</p>
        <p className="text-3xl font-bold tracking-tight">
          {formatCurrency(result.total)}원
        </p>
        <p className="text-primary-200 text-sm mt-1">
          {formatKoreanCurrency(result.total)}
        </p>
      </div>

      {/* 상세 내역 */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-5 py-3 bg-gray-50 border-b border-gray-100">
          <h3 className="font-semibold text-gray-800">계산 상세</h3>
        </div>
        <div className="divide-y divide-gray-100">
          {/* 기준 금액 */}
          <div className="px-5 py-3 flex justify-between items-center">
            <span className="text-gray-600">
              {isRent ? (hasMonthlyRent ? '환산보증금' : '보증금') : '매매가'}
            </span>
            <span className="font-medium text-gray-900">
              {formatCurrency(result.baseAmount)}원
            </span>
          </div>

          {/* 월세 환산 설명 (월세인 경우) */}
          {hasMonthlyRent && (
            <div className="px-5 py-3 bg-primary-50/50">
              <p className="text-xs text-gray-500 mb-1">환산보증금 계산식</p>
              <p className="text-sm text-gray-700">
                {formatCurrency(input.deposit)}원 + ({formatCurrency(input.monthlyRent)}원 × 100)
              </p>
            </div>
          )}

          {/* 적용 요율 */}
          <div className="px-5 py-3 flex justify-between items-center">
            <span className="text-gray-600">적용 요율</span>
            <span className="font-medium text-primary-600">{result.rate}%</span>
          </div>

          {/* 중개수수료 (부가세 전) */}
          <div className="px-5 py-3 flex justify-between items-center">
            <div>
              <span className="text-gray-600">중개수수료</span>
              {result.isMaxApplied && (
                <span className="ml-2 text-xs text-primary-600 bg-primary-50 px-1.5 py-0.5 rounded">
                  상한 적용
                </span>
              )}
            </div>
            <span className="font-medium text-gray-900">
              {formatCurrency(result.fee)}원
            </span>
          </div>

          {/* 상한 금액 안내 */}
          {result.maxFee && (
            <div className="px-5 py-2 bg-gray-50">
              <p className="text-xs text-gray-500">
                ※ 법정 상한: {formatCurrency(result.maxFee)}원
              </p>
            </div>
          )}

          {/* 부가세 */}
          <div className="px-5 py-3 flex justify-between items-center">
            <span className="text-gray-600">
              부가세
              <span className="text-xs text-gray-400 ml-1">
                ({result.vatType === 'general' ? '10%' : result.vatType === 'simplified' ? '4%' : '면세'})
              </span>
            </span>
            <span className="font-medium text-gray-900">
              {result.vat > 0 ? `+${formatCurrency(result.vat)}원` : '0원'}
            </span>
          </div>

          {/* 합계 */}
          <div className="px-5 py-4 bg-gray-50 flex justify-between items-center">
            <span className="font-semibold text-gray-800">총 지불 금액</span>
            <span className="text-xl font-bold text-primary-600">
              {formatCurrency(result.total)}원
            </span>
          </div>
        </div>
      </div>

      {/* 부가세 비교 */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
        <h3 className="font-semibold text-gray-800 mb-3">부가세 유형별 비교</h3>
        <div className="grid grid-cols-3 gap-3">
          <div className={`p-3 rounded-xl text-center ${result.vatType === 'general' ? 'bg-primary-50 border-2 border-primary-500' : 'bg-gray-50'}`}>
            <p className="text-xs text-gray-500 mb-1">일반과세자</p>
            <p className={`font-semibold ${result.vatType === 'general' ? 'text-primary-700' : 'text-gray-700'}`}>
              {formatCurrency(result.totalGeneral)}원
            </p>
          </div>
          <div className={`p-3 rounded-xl text-center ${result.vatType === 'simplified' ? 'bg-primary-50 border-2 border-primary-500' : 'bg-gray-50'}`}>
            <p className="text-xs text-gray-500 mb-1">간이과세자</p>
            <p className={`font-semibold ${result.vatType === 'simplified' ? 'text-primary-700' : 'text-gray-700'}`}>
              {formatCurrency(result.totalSimplified)}원
            </p>
          </div>
          <div className={`p-3 rounded-xl text-center ${result.vatType === 'exempt' ? 'bg-primary-50 border-2 border-primary-500' : 'bg-gray-50'}`}>
            <p className="text-xs text-gray-500 mb-1">면세</p>
            <p className={`font-semibold ${result.vatType === 'exempt' ? 'text-primary-700' : 'text-gray-700'}`}>
              {formatCurrency(result.fee)}원
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
