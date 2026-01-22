import { useState } from 'react';

export function Footer() {
  const [showPrivacy, setShowPrivacy] = useState(false);

  return (
    <>
      <footer className="bg-white border-t border-gray-100 py-6 mt-8">
        <div className="max-w-2xl mx-auto px-4">
          {/* 면책 조항 */}
          <div className="bg-primary-50/50 rounded-xl p-4 mb-4">
            <p className="text-xs text-gray-600 leading-relaxed">
              <span className="font-semibold text-primary-700">※ 면책 조항:</span>{' '}
              본 계산 결과는 2026년 공인중개사법 시행규칙에 따른 법정 상한 요율을 기준으로 한 참고용 정보입니다.
              실제 중개수수료는 거래 상황, 협상, 지역 관행 등에 따라 달라질 수 있으며,
              최종 수수료는 반드시 해당 중개업소와 상의하시기 바랍니다.
            </p>
          </div>

          <div className="flex items-center justify-between text-xs text-gray-400">
            <p>© 2026 부동산 중개수수료 계산기</p>
            <button
              onClick={() => setShowPrivacy(true)}
              className="hover:text-primary-600 transition-colors"
            >
              개인정보처리방침
            </button>
          </div>
        </div>
      </footer>

      {/* 개인정보처리방침 모달 */}
      {showPrivacy && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[80vh] overflow-y-auto">
            <div className="sticky top-0 bg-white px-5 py-4 border-b border-gray-100 flex items-center justify-between">
              <h2 className="font-bold text-gray-900">개인정보처리방침</h2>
              <button
                onClick={() => setShowPrivacy(false)}
                className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-5 text-sm text-gray-600 space-y-4">
              <p>
                <strong>1. 수집하는 개인정보</strong><br />
                본 서비스는 별도의 개인정보를 수집하지 않습니다.
                입력하신 금액 정보는 브라우저의 로컬 스토리지에만 저장되며, 서버로 전송되지 않습니다.
              </p>
              <p>
                <strong>2. 쿠키 및 광고</strong><br />
                본 서비스는 Google AdSense를 통해 광고를 제공합니다.
                Google은 쿠키를 사용하여 이전 웹사이트 방문 기록을 기반으로 광고를 게재할 수 있습니다.
              </p>
              <p>
                <strong>3. 문의</strong><br />
                서비스 관련 문의사항은 이메일로 연락해 주시기 바랍니다.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
