import Link from 'next/link'
import { BookOpen } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'

export const FOOTER_OVERRIDE_ENABLED = true

export function FooterOverride() {
  return (
    <footer className="border-t border-[#d6e8dd] bg-[#0f1e31] text-[#dbe7f0]">
      <div className="mx-auto grid w-full max-w-[1450px] gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.05fr_0.95fr_0.95fr] lg:px-8">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-[#17334f] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#7fd49a]">
            <img src="/favicon.png" alt={`${SITE_CONFIG.name} logo`} width={18} height={18} className="h-[18px] w-[18px] shrink-0 object-contain" />
            {SITE_CONFIG.name}
          </div>
          <h2 className="mt-4 text-3xl font-semibold tracking-[-0.05em] text-white">Technology, marketing, and software content that stays actionable.</h2>
          <p className="mt-4 max-w-lg text-sm leading-7 text-[#b9cad8]">
            Article-first publishing with clearer sections for analysis, guides, and community updates. Clean structure, strong readability, and practical insights.
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#7fd49a]">Main sections</p>
          <div className="mt-4 grid gap-3 text-sm font-semibold text-[#e8f1f6]">
            <Link href="/articles" className="inline-flex items-center gap-2 hover:text-[#7fd49a]"><BookOpen className="h-4 w-4" />Articles</Link>
            <Link href="/blog" className="hover:text-[#7fd49a]">Guides</Link>
            <Link href="/community" className="hover:text-[#7fd49a]">Community</Link>
            <Link href="/search" className="hover:text-[#7fd49a]">Search</Link>
          </div>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#7fd49a]">Company</p>
          <div className="mt-4 grid gap-3 text-sm font-semibold text-[#e8f1f6]">
            <Link href="/about" className="hover:text-[#7fd49a]">About</Link>
            <Link href="/contact" className="hover:text-[#7fd49a]">Contact</Link>
            <Link href="/privacy" className="hover:text-[#7fd49a]">Privacy</Link>
            <Link href="/terms" className="hover:text-[#7fd49a]">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
