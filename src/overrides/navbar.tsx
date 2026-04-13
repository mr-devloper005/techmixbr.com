'use client'

import { useMemo, useState } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BookOpen, Menu, Search, Sparkles, X } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { useAuth } from '@/lib/auth-context'

const NavbarAuthControls = dynamic(() => import('@/components/shared/navbar-auth-controls').then((mod) => mod.NavbarAuthControls), {
  ssr: false,
  loading: () => null,
})

export const NAVBAR_OVERRIDE_ENABLED = true

export function NavbarOverride() {
  const pathname = usePathname()
  const { isAuthenticated } = useAuth()
  const [open, setOpen] = useState(false)

  const primaryLinks = useMemo(
    () => [
      { label: 'Articles', href: '/articles' },
      { label: 'Guides', href: '/blog' },
      { label: 'News', href: '/community' },
      { label: 'Insights', href: '/developers' },
    ],
    [],
  )

  return (
    <header className="sticky top-0 z-50 border-b border-[#d6e8dd] bg-[rgba(248,252,249,0.88)] backdrop-blur-xl">
      <nav className="mx-auto flex max-w-[1450px] items-center gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3 rounded-full bg-white px-3 py-2 shadow-[0_12px_24px_rgba(18,54,39,0.08)]">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#45b76b] text-white">
            <BookOpen className="h-4 w-4" />
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-[#112418]">{SITE_CONFIG.name}</p>
            <p className="text-[11px] uppercase tracking-[0.22em] text-[#3d8f57]">Tech and growth journal</p>
          </div>
        </Link>

        <div className="hidden min-w-0 flex-1 items-center gap-3 lg:flex">
          <Link href="/search" className="flex min-w-0 flex-1 items-center gap-3 rounded-full bg-white px-5 py-3 text-sm text-[#3e5848] shadow-[0_10px_18px_rgba(18,54,39,0.06)]">
            <Search className="h-4 w-4 text-[#45b76b]" />
            <span className="truncate">Search AI tools, marketing tactics, software reviews, and guides</span>
          </Link>
          <div className="flex items-center gap-1 rounded-full bg-white p-1.5 shadow-[0_10px_18px_rgba(18,54,39,0.05)]">
            {primaryLinks.map((item) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={
                    active
                      ? 'rounded-full bg-[#0f2237] px-4 py-2.5 text-sm font-semibold text-white'
                      : 'rounded-full px-4 py-2.5 text-sm font-semibold text-[#2a3b31] hover:bg-[#edf6ef]'
                  }
                >
                  {item.label}
                </Link>
              )
            })}
          </div>
        </div>

        <div className="hidden items-center gap-2 lg:flex">
          <Link href="/create/article" className="techmix-btn">Write post</Link>
          {isAuthenticated ? (
            <NavbarAuthControls />
          ) : (
            <Link href="/register" className="techmix-btn-soft">
              Join
            </Link>
          )}
        </div>

        <button type="button" onClick={() => setOpen((value) => !value)} className="ml-auto inline-flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#112418] lg:hidden">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open ? (
        <div className="border-t border-[#d6e8dd] bg-[rgba(248,252,249,0.98)] px-4 py-4 lg:hidden">
          <div className="mb-4 flex items-center gap-2 rounded-full bg-white px-4 py-3 text-sm text-[#3e5848]">
            <Search className="h-4 w-4 text-[#45b76b]" />
            Search articles and tools
          </div>
          <div className="grid gap-2">
            {primaryLinks.map((item) => (
              <Link key={item.href} href={item.href} className="rounded-[1rem] bg-white px-4 py-3 text-sm font-semibold text-[#13253a]">
                {item.label}
              </Link>
            ))}
          </div>
          <div className="mt-4 flex gap-2">
            <Link href="/create/article" className="techmix-btn flex-1">
              Write
            </Link>
            <Link href="/register" className="techmix-btn-soft flex-1 justify-center">
              <Sparkles className="h-4 w-4" />
              Join
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  )
}
