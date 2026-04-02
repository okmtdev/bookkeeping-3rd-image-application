import type { Metadata } from 'next';
import './globals.css';
import Navigation from '@/components/Navigation';

export const metadata: Metadata = {
  title: 'Boki-Visualizer | 簿記3級ビジュアル学習',
  description: '仕訳の「なぜ？」が図解でわかる。動く財務諸表でビジネスの流れを掴む簿記3級学習アプリ',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className="bg-gray-50 min-h-screen">
        <Navigation />
        <main className="md:ml-56 pb-20 md:pb-4">
          {children}
        </main>
      </body>
    </html>
  );
}
