'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const TABS = [
  { href: '/solve',      icon: '🔍', label: 'Vyriešiť'  },
  { href: '/collection', icon: '📚', label: 'Zbierka'   },
  { href: '/practice',   icon: '🏋️', label: 'Precvičiť' },
  { href: '/theory',     icon: '📖', label: 'Teória'    },
  { href: '/history',    icon: '🕐', label: 'História'  },
]

export default function BottomNav() {
  const pathname = usePathname()
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 shadow-[0_-2px_8px_rgba(0,0,0,0.06)]">
      <div className="max-w-2xl mx-auto flex justify-around">
        {TABS.map((tab) => {
          const isActive = pathname.startsWith(tab.href)
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`flex flex-col items-center flex-1 py-2 px-1 text-xs font-medium transition-colors ${
                isActive ? 'text-[#6D28D9]' : 'text-gray-500 hover:text-[#6D28D9]'
              }`}
            >
              <span className="text-2xl mb-1 leading-none">{tab.icon}</span>
              <span>{tab.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
