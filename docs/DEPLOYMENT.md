# 배포 가이드

## 배포 정보

| 항목 | 값 |
|------|-----|
| 플랫폼 | Vercel |
| 프로덕션 URL | https://realestate-fee-calculator-2026.vercel.app |
| GitHub 저장소 | https://github.com/oh-namgyu/realestate-fee-calculator-2026 |
| 프레임워크 | Vite |

## Vercel 배포

### CLI를 통한 배포

```bash
# Vercel CLI 설치 (선택)
npm i -g vercel

# 배포
npx vercel --prod
```

### GitHub 연동 자동 배포

1. Vercel 대시보드 접속: https://vercel.com
2. "Import Project" 클릭
3. GitHub 저장소 연결: `oh-namgyu/realestate-fee-calculator-2026`
4. 프레임워크: Vite (자동 감지)
5. Deploy 클릭

**자동 배포 트리거:**
- `main` 브랜치에 push 시 자동으로 프로덕션 배포
- PR 생성 시 프리뷰 배포 생성

## 빌드 설정

`vercel.json`:
```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "framework": "vite"
}
```

**Vercel 자동 설정:**
- Build Command: `vite build`
- Output Directory: `dist`
- Install Command: `npm install`

## Google AdSense 설정

### 필요 파일

1. **index.html** - 스크립트 및 메타 태그:
```html
<!-- Google AdSense -->
<meta name="google-adsense-account" content="ca-pub-2627121549841957">
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2627121549841957"
 crossorigin="anonymous"></script>
```

2. **public/ads.txt** - 사이트 인증:
```
google.com, pub-2627121549841957, DIRECT, f08c47fec0942fa0
```

### ads.txt 확인

배포 후 아래 URL로 접속하여 확인:
```
https://realestate-fee-calculator-2026.vercel.app/ads.txt
```

### AdSense 승인 절차

1. Google AdSense 콘솔 접속
2. 사이트 추가: `realestate-fee-calculator-2026.vercel.app`
3. ads.txt 상태 확인 (24-48시간 소요)
4. 사이트 검토 대기 (수일 소요)

## 도메인 연결 (선택)

커스텀 도메인을 연결하려면:

1. Vercel 대시보드 → Project Settings → Domains
2. 도메인 추가
3. DNS 설정:
   - CNAME: `cname.vercel-dns.com`
   - 또는 A 레코드: `76.76.21.21`

## 배포 체크리스트

- [ ] `npm run build` 성공 확인
- [ ] `npm run lint` 오류 없음
- [ ] AdSense 스크립트/메타 태그 포함
- [ ] ads.txt 파일 존재
- [ ] SEO 메타 태그 확인
- [ ] 파비콘 확인
- [ ] 모바일 반응형 테스트

## 롤백

문제 발생 시 Vercel 대시보드에서 이전 배포로 롤백:

1. Vercel 대시보드 → Deployments
2. 이전 배포 선택
3. "Promote to Production" 클릭

## 모니터링

- Vercel Analytics: 대시보드에서 트래픽 확인
- Google Search Console: SEO 성능 모니터링
- Google AdSense: 광고 수익 확인
