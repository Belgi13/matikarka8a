import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'
import BottomNav from '@/components/BottomNav'

const poppins = Poppins({
  subsets: ['latin-ext'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
})

export const metadata: Metadata = {
  title: 'Matikárka | Pomocníčka z matematiky',
  description: 'Tvoja trpezlivá pomocníčka z matematiky',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sk">
      <body className={`${poppins.variable} font-poppins bg-[#FAFAFA] min-h-screen`}>
        <main className="max-w-2xl mx-auto px-4 pb-24 min-h-screen">
          {children}
        </main>
        <BottomNav />
      </body>
    </html>
  )
}
