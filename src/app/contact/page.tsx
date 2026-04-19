import { Clock3, FileText, Mail, MapPin, Phone, Sparkles } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { SITE_CONFIG } from '@/lib/site-config'
import { CONTACT_PAGE_OVERRIDE_ENABLED, ContactPageOverride } from '@/overrides/contact-page'

export default function ContactPage() {
  if (CONTACT_PAGE_OVERRIDE_ENABLED) {
    return <ContactPageOverride />
  }

  const tone = {
    shell: 'techmix-shell text-[#10231a]',
    panel: 'techmix-panel',
    soft: 'border border-[rgba(27,74,53,0.12)] bg-white/85',
    muted: 'text-[#3f5a4c]',
    action: 'techmix-btn',
  }
  const lanes = [
    { icon: FileText, title: 'Editorial submissions', body: 'Pitch technical explainers, growth breakdowns, and original case studies.' },
    { icon: Mail, title: 'Partnership requests', body: 'Collaborate on sponsored content, newsletter placements, or ecosystem campaigns.' },
    { icon: Sparkles, title: 'Contributor onboarding', body: 'Get support for publishing standards, author setup, and content workflows.' },
    { icon: Phone, title: 'Business support', body: 'Need account or publishing help? We will route your request to the right team.' },
    { icon: MapPin, title: 'Regional opportunities', body: 'Suggest local topics and business categories that deserve better coverage.' },
  ]
  const supportMeta = [
    { label: 'Email support', value: 'support@techmixbr.com', icon: Mail },
    { label: 'Editorial desk', value: 'editorial@techmixbr.com', icon: FileText },
    { label: 'Response window', value: 'Within 24 business hours', icon: Clock3 },
  ]

  return (
    <div className={`min-h-screen ${tone.shell}`}>
      <NavbarShell />
      <main className="mx-auto w-full max-w-[1450px] px-4 py-14 sm:px-6 lg:px-8">
        <section className={`${tone.panel} rounded-[2rem] p-6 sm:p-8`}>
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] opacity-70">Contact {SITE_CONFIG.name}</p>
              <h1 className="mt-4 text-5xl font-semibold tracking-[-0.05em] text-[#10263c]">
                Let us help you publish better and grow faster.
              </h1>
              <p className={`mt-5 max-w-2xl text-sm leading-8 ${tone.muted}`}>
                Tell us what you are building, where you are stuck, or how you want to collaborate.
                We route each request to editorial, partnerships, or support so you get a useful answer quickly.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {supportMeta.map((item) => (
                  <div key={item.label} className={`${tone.soft} rounded-[1.2rem] p-4`}>
                    <item.icon className="h-4 w-4 text-[#2b7244]" />
                    <p className="mt-2 text-xs uppercase tracking-[0.2em] text-[#2b7244]">{item.label}</p>
                    <p className="mt-1 text-sm font-semibold text-[#10263c]">{item.value}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8 space-y-4">
                {lanes.map((lane) => (
                  <div key={lane.title} className={`rounded-[1.2rem] p-5 ${tone.soft}`}>
                    <lane.icon className="h-5 w-5 text-[#2b7244]" />
                    <h2 className="mt-3 text-lg font-semibold text-[#10263c]">{lane.title}</h2>
                    <p className={`mt-2 text-sm leading-7 ${tone.muted}`}>{lane.body}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[1.6rem] border border-[rgba(27,74,53,0.12)] bg-white/90 p-7">
              <h2 className="text-2xl font-semibold text-[#10263c]">Send a message</h2>
              <p className="mt-2 text-sm text-[#3f5a4c]">
                Share clear details and links so our team can respond with specific next steps.
              </p>
              <form className="mt-6 grid gap-4">
                <input className="h-12 rounded-xl border border-[rgba(27,74,53,0.16)] bg-white px-4 text-sm" placeholder="Your name" />
                <input className="h-12 rounded-xl border border-[rgba(27,74,53,0.16)] bg-white px-4 text-sm" placeholder="Email address" />
                <input className="h-12 rounded-xl border border-[rgba(27,74,53,0.16)] bg-white px-4 text-sm" placeholder="Subject (e.g. Editorial pitch)" />
                <textarea className="min-h-[180px] rounded-2xl border border-[rgba(27,74,53,0.16)] bg-white px-4 py-3 text-sm" placeholder="Briefly explain your request, timeline, and preferred response format." />
                <button type="submit" className={`inline-flex h-12 items-center justify-center rounded-full px-6 text-sm font-semibold ${tone.action}`}>Send message</button>
              </form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
