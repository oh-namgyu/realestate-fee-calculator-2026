import { useEffect, useRef } from 'react';

// AdSense 활성화 여부
const ADSENSE_ENABLED = true;

interface AdSlotProps {
  slot: string;
  format?: 'auto' | 'horizontal' | 'vertical' | 'rectangle';
  className?: string;
}

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

export function AdSlot({ slot, format = 'auto', className = '' }: AdSlotProps) {
  const adRef = useRef<HTMLModElement>(null);
  const isLoaded = useRef(false);

  useEffect(() => {
    if (!ADSENSE_ENABLED || isLoaded.current) return;

    try {
      if (adRef.current && adRef.current.childNodes.length === 0) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        isLoaded.current = true;
      }
    } catch {
      // AdSense 에러 무시
    }
  }, []);

  if (!ADSENSE_ENABLED) {
    return (
      <div className={`bg-gray-100 rounded-xl p-4 text-center text-gray-400 text-sm ${className}`}>
        광고 영역
      </div>
    );
  }

  const getResponsiveStyle = () => {
    switch (format) {
      case 'horizontal':
        return { display: 'block', width: '100%', height: '90px' };
      case 'vertical':
        return { display: 'block', width: '160px', height: '600px' };
      case 'rectangle':
        return { display: 'block', width: '300px', height: '250px' };
      default:
        return { display: 'block' };
    }
  };

  return (
    <div className={`overflow-hidden ${className}`}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={getResponsiveStyle()}
        data-ad-client="ca-pub-2627121549841957"
        data-ad-slot={slot}
        data-ad-format={format === 'auto' ? 'auto' : undefined}
        data-full-width-responsive={format === 'auto' ? 'true' : undefined}
      />
    </div>
  );
}
