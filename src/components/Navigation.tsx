'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/', label: 'ダッシュボード', icon: '🏠' },
  { href: '/story', label: 'ストーリー', icon: '📖' },
  { href: '/practice', label: '第一問 仕訳', icon: '✏️' },
  { href: '/exam2', label: '第二問 勘定記入', icon: '📝' },
  { href: '/exam3', label: '第三問 精算表', icon: '📋' },
  { href: '/statements', label: '財務諸表', icon: '📊' },
  { href: '/guide', label: '勘定科目ガイド', icon: '📚' },
];

export default function Navigation() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Desktop sidebar */}
      <nav className="hidden md:flex md:flex-col md:w-56 bg-slate-800 text-white min-h-screen p-4 fixed left-0 top-0 z-30">
        <div className="mb-8">
          <h1 className="text-xl font-bold text-center">
            <span className="text-2xl">⚖️</span>
            <br />
            Boki-Visualizer
          </h1>
          <p className="text-xs text-slate-400 text-center mt-1">
            簿記3級 ビジュアル学習
          </p>
        </div>
        <ul className="space-y-1 flex-1">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  pathname === item.href
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-300 hover:bg-slate-700'
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-30 safe-area-bottom">
        <ul className="flex justify-around py-1">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`flex flex-col items-center py-1.5 px-2 text-xs transition-colors ${
                  pathname === item.href
                    ? 'text-blue-600'
                    : 'text-gray-500'
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                <span className="mt-0.5 leading-none">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
