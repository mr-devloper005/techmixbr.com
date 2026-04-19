import Link from 'next/link'
import { Sparkles } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { REGISTER_PAGE_OVERRIDE_ENABLED, RegisterPageOverride } from '@/overrides/register-page'

export default function RegisterPage() {
  if (REGISTER_PAGE_OVERRIDE_ENABLED) {
    return <RegisterPageOverride />
  }

  const config = {
    shell: 'techmix-shell text-[#10231a]',
    panel: 'techmix-panel',
    side: 'border border-[rgba(27,74,53,0.12)] bg-white/85',
    muted: 'text-[#3f5a4c]',
    action: 'techmix-btn',
    title: 'Create your Techmix account',
    body: 'Get one unified workspace for publishing articles, managing profile data, and growing your content presence.',
  }

  return (
    <div className={`min-h-screen ${config.shell}`}>
      <NavbarShell />
      <main className="mx-auto w-full max-w-[1450px] px-4 py-14 sm:px-6 lg:px-8">
        <section className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch">
          <div className={`rounded-[2rem] p-8 ${config.side}`}>
            <Sparkles className="h-8 w-8" />
            <h1 className="mt-5 text-4xl font-semibold tracking-[-0.05em]">{config.title}</h1>
            <p className={`mt-5 text-sm leading-8 ${config.muted}`}>{config.body}</p>
            <div className="mt-8 grid gap-4">
              {['Different onboarding per product family', 'No repeated one-size-fits-all shell', 'Profile, publishing, and discovery aligned'].map((item) => (
                <div key={item} className="rounded-[1.5rem] border border-current/10 px-4 py-4 text-sm">{item}</div>
              ))}
            </div>
          </div>

          <div className={`rounded-[2rem] p-8 ${config.panel}`}>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] opacity-70">Create account</p>
            <form className="mt-6 grid gap-4">
              <input className="h-12 rounded-xl border border-[rgba(27,74,53,0.16)] bg-white px-4 text-sm" placeholder="Full name" />
              <input className="h-12 rounded-xl border border-[rgba(27,74,53,0.16)] bg-white px-4 text-sm" placeholder="Email address" />
              <input className="h-12 rounded-xl border border-[rgba(27,74,53,0.16)] bg-white px-4 text-sm" placeholder="Password" type="password" />
              <input className="h-12 rounded-xl border border-[rgba(27,74,53,0.16)] bg-white px-4 text-sm" placeholder="What are you creating or publishing?" />
              <button type="submit" className={`inline-flex h-12 items-center justify-center rounded-full px-6 text-sm font-semibold ${config.action}`}>Create account</button>
            </form>
            <div className={`mt-6 flex items-center justify-between text-sm ${config.muted}`}>
              <span>Already have an account?</span>
              <Link href="/login" className="inline-flex items-center gap-2 font-semibold hover:underline">
                <Sparkles className="h-4 w-4" />
                Sign in
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
