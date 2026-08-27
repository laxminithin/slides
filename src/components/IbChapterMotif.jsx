export default function IbChapterMotif({ motif, className = '' }) {
  return (
    <div className={`ib-chapter-motif motif-${motif} ${className}`.trim()} aria-hidden="true">
      {motif === 'trade-routes' && (
        <svg viewBox="0 0 160 96" fill="none">
          <path d="M12 58 C42 22, 78 24, 108 48 C128 62, 142 56, 150 40" stroke="currentColor" strokeWidth="1.6" strokeDasharray="4 4" />
          <path d="M18 72 C54 78, 88 50, 148 62" stroke="currentColor" strokeWidth="1.4" opacity=".55" />
          <circle cx="24" cy="60" r="3.2" fill="currentColor" />
          <circle cx="108" cy="48" r="3.2" fill="currentColor" />
          <circle cx="148" cy="62" r="3.2" fill="currentColor" />
        </svg>
      )}
      {motif === 'climate-scan' && (
        <svg viewBox="0 0 160 96" fill="none">
          <circle cx="80" cy="48" r="28" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="80" cy="48" r="18" stroke="currentColor" strokeWidth="1.2" opacity=".55" />
          <path d="M80 14 V26 M80 70 V82 M30 48 H42 M118 48 H130" stroke="currentColor" strokeWidth="1.4" />
          <circle cx="118" cy="28" r="5" stroke="currentColor" strokeWidth="1.3" />
          <circle cx="42" cy="70" r="5" stroke="currentColor" strokeWidth="1.3" />
        </svg>
      )}
      {motif === 'strategy-room' && (
        <svg viewBox="0 0 160 96" fill="none">
          <rect x="28" y="34" width="104" height="36" rx="2" stroke="currentColor" strokeWidth="1.5" />
          <path d="M40 34 V26 H120 V34" stroke="currentColor" strokeWidth="1.3" />
          <circle cx="48" cy="52" r="3" fill="currentColor" />
          <circle cx="80" cy="52" r="3" fill="currentColor" />
          <circle cx="112" cy="52" r="3" fill="currentColor" />
          <path d="M56 20 H104" stroke="currentColor" strokeWidth="1.2" opacity=".5" />
        </svg>
      )}
      {motif === 'command-center' && (
        <svg viewBox="0 0 160 96" fill="none">
          <rect x="18" y="22" width="46" height="28" rx="2" stroke="currentColor" strokeWidth="1.4" />
          <rect x="72" y="22" width="46" height="28" rx="2" stroke="currentColor" strokeWidth="1.4" />
          <rect x="45" y="58" width="70" height="22" rx="2" stroke="currentColor" strokeWidth="1.4" />
          <path d="M41 36 H72 M95 36 H118 M80 50 V58" stroke="currentColor" strokeWidth="1.2" opacity=".55" />
        </svg>
      )}
      {motif === 'company-expand' && (
        <svg viewBox="0 0 160 96" fill="none">
          <rect x="18" y="42" width="28" height="30" stroke="currentColor" strokeWidth="1.4" />
          <rect x="56" y="30" width="28" height="42" stroke="currentColor" strokeWidth="1.4" />
          <rect x="94" y="18" width="36" height="54" stroke="currentColor" strokeWidth="1.5" />
          <path d="M46 56 H56 M84 48 H94" stroke="currentColor" strokeWidth="1.3" />
        </svg>
      )}
      {motif === 'ops-machine' && (
        <svg viewBox="0 0 160 96" fill="none">
          <circle cx="32" cy="48" r="10" stroke="currentColor" strokeWidth="1.4" />
          <circle cx="80" cy="48" r="10" stroke="currentColor" strokeWidth="1.4" />
          <circle cx="128" cy="48" r="10" stroke="currentColor" strokeWidth="1.4" />
          <path d="M42 48 H70 M90 48 H118" stroke="currentColor" strokeWidth="1.4" />
          <path d="M80 20 V38 M80 58 V76" stroke="currentColor" strokeWidth="1.2" opacity=".5" />
        </svg>
      )}
    </div>
  )
}
