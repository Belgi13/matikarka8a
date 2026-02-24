'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Activity, BookOpen, Clock, Grid, Search } from 'react-feather'

const TABS = [
  { href: '/solve', icon: Search, label: 'Vyriešiť' },
  { href: '/collection', icon: Grid, label: 'Zbierka' },
  { href: '/practice', icon: Activity, label: 'Precvičiť' },
  { href: '/theory', icon: BookOpen, label: 'Teória' },
  { href: '/history', icon: Clock, label: 'História' },
]

export default function BottomNav() {
  const pathname = usePathname()
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 px-3 pb-3 pt-2">
      <div className="max-w-2xl mx-auto rounded-[22px] border border-white/65 bg-white/85 backdrop-blur-md shadow-[var(--shadow-nav)]">
        <div className="flex justify-around">
        {TABS.map((tab) => {
          const isActive = pathname.startsWith(tab.href)
          const Icon = tab.icon
          return (
            <Link
              key={tab.href}
              href={tab.href}
              aria-label={tab.label}
              className={`relative flex flex-col items-center flex-1 py-2.5 px-1 text-[11px] font-semibold rounded-[18px] transition-all duration-200 ${
                isActive
                  ? 'text-[var(--brand-primary)]'
                  : 'text-[var(--text-muted)] hover:text-[var(--brand-primary)]'
              }`}
            >
              {isActive && (
                <span className="absolute inset-x-3 -top-0.5 h-0.5 rounded-full bg-[var(--brand-primary)]" />
              )}
              <span
                className={`mb-1 rounded-xl p-1.5 transition-all duration-200 ${
                  isActive
                    ? 'bg-[var(--bg-surface-2)] shadow-[var(--shadow-soft)]'
                    : 'bg-transparent'
                }`}
              >
                <Icon size={18} />
              </span>
              <span className="leading-none">{tab.label}</span>
            </Link>
          )
        })}
        </div>
      </div>
    </nav>
  )
}
