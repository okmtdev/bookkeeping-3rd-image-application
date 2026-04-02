'use client';

interface BalanceScaleProps {
  debitAmount: number;
  creditAmount: number;
}

export default function BalanceScale({ debitAmount, creditAmount }: BalanceScaleProps) {
  const diff = debitAmount - creditAmount;
  const maxTilt = 15;
  const tilt =
    debitAmount === 0 && creditAmount === 0
      ? 0
      : Math.max(-maxTilt, Math.min(maxTilt, (diff / Math.max(debitAmount, creditAmount, 1)) * maxTilt));
  const isBalanced = debitAmount > 0 && debitAmount === creditAmount;

  return (
    <div className="flex flex-col items-center py-4">
      <div className="text-sm font-medium mb-2">
        {isBalanced ? (
          <span className="text-green-600 font-bold">✨ バランス！ ✨</span>
        ) : debitAmount === 0 && creditAmount === 0 ? (
          <span className="text-gray-400">科目をドロップしてください</span>
        ) : (
          <span className="text-orange-500">
            差額: ¥{Math.abs(diff).toLocaleString()}
          </span>
        )}
      </div>

      <svg
        width="240"
        height="140"
        viewBox="0 0 240 140"
        className="transition-transform duration-300"
      >
        {/* Base */}
        <polygon points="100,130 140,130 120,100" fill="#6B7280" />
        <line x1="120" y1="100" x2="120" y2="30" stroke="#6B7280" strokeWidth="3" />

        {/* Beam */}
        <g
          style={{
            transform: `rotate(${-tilt}deg)`,
            transformOrigin: '120px 30px',
            transition: 'transform 0.4s ease-in-out',
          }}
        >
          <line x1="30" y1="30" x2="210" y2="30" stroke="#374151" strokeWidth="4" />

          {/* Left pan (debit) */}
          <line x1="30" y1="30" x2="20" y2="70" stroke="#9CA3AF" strokeWidth="1.5" />
          <line x1="30" y1="30" x2="80" y2="70" stroke="#9CA3AF" strokeWidth="1.5" />
          <rect
            x="10"
            y="70"
            width="80"
            height="8"
            rx="2"
            fill={debitAmount > 0 ? '#3B82F6' : '#D1D5DB'}
            className="transition-colors duration-300"
          />
          <text x="50" y="95" textAnchor="middle" fontSize="11" fill="#6B7280">
            借方
          </text>
          <text x="50" y="110" textAnchor="middle" fontSize="10" fill="#374151" fontWeight="bold">
            ¥{debitAmount.toLocaleString()}
          </text>

          {/* Right pan (credit) */}
          <line x1="210" y1="30" x2="160" y2="70" stroke="#9CA3AF" strokeWidth="1.5" />
          <line x1="210" y1="30" x2="220" y2="70" stroke="#9CA3AF" strokeWidth="1.5" />
          <rect
            x="150"
            y="70"
            width="80"
            height="8"
            rx="2"
            fill={creditAmount > 0 ? '#EF4444' : '#D1D5DB'}
            className="transition-colors duration-300"
          />
          <text x="190" y="95" textAnchor="middle" fontSize="11" fill="#6B7280">
            貸方
          </text>
          <text x="190" y="110" textAnchor="middle" fontSize="10" fill="#374151" fontWeight="bold">
            ¥{creditAmount.toLocaleString()}
          </text>

          {/* Center pivot */}
          <circle
            cx="120"
            cy="30"
            r="6"
            fill={isBalanced ? '#22C55E' : '#F59E0B'}
            className="transition-colors duration-300"
          />
        </g>
      </svg>
    </div>
  );
}
