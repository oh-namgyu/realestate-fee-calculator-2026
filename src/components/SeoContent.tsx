export function SeoContent() {
  return (
    <article className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mt-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">
        복덕비 아끼는 법 & 부동산 계약 시 주의사항
      </h2>

      <div className="prose prose-sm prose-gray max-w-none">
        <section className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            1. 부동산 중개수수료, 얼마가 적정한가요?
          </h3>
          <p className="text-gray-600 leading-relaxed">
            부동산 거래 시 지불하는 중개수수료(복비)는 공인중개사법에 따라 법정 상한 요율이 정해져 있습니다.
            2026년 현재 주택 매매의 경우 거래금액에 따라 0.4%~0.7%의 요율이 적용되며,
            임대차(전월세)는 0.3%~0.6%가 적용됩니다. 중요한 점은 이 요율이 '상한'이라는 것입니다.
            즉, 협상을 통해 더 낮은 수수료를 지불할 수 있습니다.
            특히 매물이 잘 나가는 시기나 급매물의 경우, 협상의 여지가 더 큽니다.
          </p>
        </section>

        <section className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            2. 복덕비(중개수수료) 절약하는 5가지 팁
          </h3>
          <ul className="text-gray-600 space-y-2 list-disc list-inside">
            <li>
              <strong>여러 중개업소 비교하기:</strong> 같은 매물이라도 중개업소마다 수수료가 다를 수 있습니다.
              3곳 이상 비교 후 결정하세요.
            </li>
            <li>
              <strong>협상은 필수:</strong> 법정 상한 요율은 말 그대로 '상한'입니다.
              특히 고가 매물일수록 협상 여지가 큽니다.
            </li>
            <li>
              <strong>직거래 플랫폼 활용:</strong> 당근마켓, 피터팬의 좋은방 구하기 등 직거래 플랫폼을 통해
              중개수수료를 완전히 절약할 수도 있습니다. 단, 계약서 작성에 주의가 필요합니다.
            </li>
            <li>
              <strong>부가세 확인:</strong> 일반과세자 중개업소는 10%의 부가세가 추가됩니다.
              간이과세자나 면세사업자 중개업소를 이용하면 절약할 수 있습니다.
            </li>
            <li>
              <strong>계약서에 수수료 명시:</strong> 구두 약속이 아닌 계약서에 수수료를 명확히 기재하세요.
            </li>
          </ul>
        </section>

        <section className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            3. 부동산 계약 시 반드시 확인해야 할 사항
          </h3>
          <p className="text-gray-600 leading-relaxed mb-3">
            부동산 거래는 큰 금액이 오가는 만큼 신중해야 합니다. 계약 전 다음 사항을 반드시 확인하세요.
          </p>
          <ul className="text-gray-600 space-y-2 list-disc list-inside">
            <li>
              <strong>등기부등본 열람:</strong> 소유권, 근저당권, 가압류 등 권리관계를 확인합니다.
              계약 당일에도 다시 한번 확인하는 것이 안전합니다.
            </li>
            <li>
              <strong>건축물대장 확인:</strong> 불법 증축이나 용도 변경 여부를 확인할 수 있습니다.
            </li>
            <li>
              <strong>실제 소유자 확인:</strong> 등기부등본상 소유자와 계약 상대방이 동일인인지,
              대리인이라면 위임장과 인감증명서를 확인합니다.
            </li>
            <li>
              <strong>전입세대 열람:</strong> 주민센터에서 전입세대 열람원을 발급받아
              선순위 임차인 여부를 확인합니다.
            </li>
            <li>
              <strong>국세/지방세 완납 증명:</strong> 매도인(임대인)의 세금 체납 여부를 확인합니다.
            </li>
          </ul>
        </section>

        <section className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            4. 전세 사기 예방하는 방법
          </h3>
          <p className="text-gray-600 leading-relaxed">
            최근 전세 사기가 사회적 문제로 대두되고 있습니다. 안전한 전세 계약을 위해 다음을 확인하세요.
            첫째, 전세가율(매매가 대비 전세가 비율)이 80%를 넘으면 위험 신호입니다.
            둘째, 등기부등본에 근저당이 많이 설정되어 있다면 피하는 것이 좋습니다.
            셋째, 전세보증보험(HUG, SGI)에 가입 가능한 매물인지 확인하세요.
            넷째, 임대인의 세금 체납 여부를 확인하고, 가능하다면 확정일자와 전입신고를 당일에 완료하세요.
          </p>
        </section>

        <section>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            5. 2026년 달라진 부동산 제도
          </h3>
          <p className="text-gray-600 leading-relaxed">
            2026년부터 달라진 주요 부동산 제도를 알아두면 거래에 도움이 됩니다.
            임대차 3법(계약갱신청구권, 전월세상한제, 전월세신고제)은 계속 유지되고 있으며,
            전월세신고제의 경우 보증금 6천만원 또는 월세 30만원 초과 시 30일 이내 신고 의무가 있습니다.
            또한 부동산 거래 시 자금조달계획서 제출 대상이 확대되었으니,
            투기과열지구나 조정대상지역에서 거래 시 미리 준비하시기 바랍니다.
            중개수수료 요율은 2021년 개정 이후 동일하게 유지되고 있으나,
            향후 변경 가능성이 있으므로 계약 전 최신 요율을 확인하시기 바랍니다.
          </p>
        </section>
      </div>

      {/* 해시태그 */}
      <div className="mt-6 pt-4 border-t border-gray-100">
        <div className="flex flex-wrap gap-2">
          {[
            '부동산중개수수료',
            '복비계산',
            '전세계약',
            '월세계약',
            '부동산계약주의사항',
            '중개보수',
            '2026부동산',
          ].map((tag) => (
            <span
              key={tag}
              className="text-xs text-primary-600 bg-primary-50 px-2 py-1 rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
