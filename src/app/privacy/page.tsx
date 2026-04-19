import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { Card, CardContent } from '@/components/ui/card'

const sections = [
  {
    title: 'Data We Collect',
    points: [
      'Account profile details such as name, email, and login metadata.',
      'Content submissions, drafts, media links, and editorial notes.',
      'Product analytics used to understand page performance and user flows.',
    ],
  },
  {
    title: 'How We Use Data',
    points: [
      'Deliver personalized discovery experiences and relevant recommendations.',
      'Protect the platform against abuse, spam, and suspicious behavior.',
      'Improve search quality, content ranking, and platform reliability.',
    ],
  },
  {
    title: 'Data Controls',
    points: [
      'Request account export and review of stored profile information.',
      'Update, correct, or delete account-level content data.',
      'Manage email communications and notification preferences.',
    ],
  },
]

const commitments = [
  { label: 'No sale of personal data', value: 'Committed' },
  { label: 'Data deletion requests', value: 'Handled in 7 days' },
  { label: 'Security monitoring', value: 'Continuous' },
  { label: 'Incident notification', value: 'Prompt reporting' },
]

export default function PrivacyPage() {
  return (
    <div className="techmix-shell min-h-screen text-[#10231a]">
      <NavbarShell />
      <main className="mx-auto w-full max-w-[1450px] px-4 py-12 sm:px-6 lg:px-8">
        <section className="techmix-panel rounded-[2rem] p-6 sm:p-8">
          <h1 className="text-3xl font-semibold tracking-[-0.04em] text-[#10263c]">Privacy Policy</h1>
          <p className="mt-2 text-sm text-[#3f5a4c]">
            How we collect, use, protect, and process your information across the platform.
          </p>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <Card className="techmix-panel">
            <CardContent className="space-y-5 p-6">
              <p className="text-xs uppercase tracking-[0.2em] text-[#2b7244]">Last updated: April 15, 2026</p>
              {sections.map((section) => (
                <div key={section.title} className="rounded-xl border border-[rgba(27,74,53,0.12)] bg-white/70 p-4">
                  <h3 className="text-base font-semibold text-[#10263c]">{section.title}</h3>
                  <ul className="mt-3 space-y-2 text-sm leading-7 text-[#3f5a4c]">
                    {section.points.map((point) => (
                      <li key={point}>• {point}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="techmix-panel">
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold text-[#10263c]">Privacy commitments</h2>
              <p className="mt-2 text-sm text-[#3f5a4c]">
                We keep policy language clear and publish operational commitments with measurable timelines.
              </p>
              <div className="mt-5 grid gap-3">
                {commitments.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between rounded-xl border border-[rgba(27,74,53,0.12)] bg-white/75 p-4"
                  >
                    <span className="text-sm text-[#3f5a4c]">{item.label}</span>
                    <span className="text-sm font-semibold text-[#10263c]">{item.value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
      <Footer />
    </div>
  )
}
