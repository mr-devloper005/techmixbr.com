import Link from "next/link";
import { NavbarShell } from "@/components/shared/navbar-shell";
import { Footer } from "@/components/shared/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { mockTeamMembers } from "@/data/mock-data";
import { SITE_CONFIG } from "@/lib/site-config";

const highlights = [
  { label: "Monthly readers", value: "120k+" },
  { label: "Guides and reviews", value: "2,400+" },
  { label: "Publishing partners", value: "90+" },
  { label: "Average response time", value: "< 24h" },
];

const pillars = [
  {
    title: "Practical over noisy",
    description:
      "Every post is structured to answer what to do next, not just what happened.",
  },
  {
    title: "Human editorial judgment",
    description:
      "We prioritize relevance, depth, and clarity before we publish anything.",
  },
  {
    title: "Search-first architecture",
    description:
      "Content is organized for discovery and quick retrieval, not endless scrolling.",
  },
];

const roadmap = [
  { quarter: "Q2 2026", item: "Expanded AI tooling playbooks and benchmark reports." },
  { quarter: "Q3 2026", item: "Creator profiles and contributor quality scoring." },
  { quarter: "Q4 2026", item: "Regional content editions and language-tailored guides." },
];

export default function AboutPage() {
  return (
    <div className="techmix-shell min-h-screen text-[#10231a]">
      <NavbarShell />
      <main className="mx-auto w-full max-w-[1450px] px-4 py-12 sm:px-6 lg:px-8">
        <section className="techmix-panel rounded-[2rem] p-6 sm:p-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-3xl font-semibold tracking-[-0.04em] text-[#10263c]">
                {`About ${SITE_CONFIG.name}`}
              </h1>
              <p className="mt-2 text-sm text-[#3f5a4c]">
                {`${SITE_CONFIG.name} publishes practical marketing and software insights designed for operators, founders, and growth teams.`}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button variant="ghost" className="techmix-btn-soft" asChild>
                <Link href="/team">Meet the Team</Link>
              </Button>
              <Button className="techmix-btn" asChild>
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <Card className="techmix-panel">
            <CardContent className="space-y-5 p-6">
              <Badge className="bg-[#0f2237] text-[#f3f7fb]">What we do</Badge>
              <h2 className="text-2xl font-semibold text-[#10263c]">
                A focused editorial platform for growth, technology, and execution.
              </h2>
              <p className="text-sm leading-7 text-[#3f5a4c]">
                We help teams make better decisions with actionable frameworks, tested tool
                recommendations, and high-signal updates. Instead of generic news feeds, we publish
                clear breakdowns built for real implementation.
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                {highlights.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-lg border border-[rgba(27,74,53,0.12)] bg-white/70 p-4"
                  >
                    <div className="text-2xl font-semibold text-[#10263c]">{item.value}</div>
                    <div className="text-xs uppercase tracking-[0.15em] text-[#3f5a4c]">
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <div className="space-y-4">
            {pillars.map((value) => (
              <Card key={value.title} className="techmix-panel">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-[#10263c]">{value.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-[#3f5a4c]">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="mt-10 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <Card className="techmix-panel">
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold text-[#10263c]">Product roadmap</h2>
              <p className="mt-2 text-sm text-[#3f5a4c]">
                Key milestones we are building toward over the next two releases.
              </p>
              <div className="mt-6 space-y-4">
                {roadmap.map((entry) => (
                  <div
                    key={entry.quarter}
                    className="rounded-xl border border-[rgba(27,74,53,0.12)] bg-white/75 p-4"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#2b7244]">
                      {entry.quarter}
                    </p>
                    <p className="mt-2 text-sm text-[#3f5a4c]">{entry.item}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card className="techmix-panel">
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold text-[#10263c]">How we work with contributors</h2>
              <ul className="mt-4 space-y-3 text-sm leading-7 text-[#3f5a4c]">
                <li>Submit your outline with practical examples and expected reader outcomes.</li>
                <li>Our editorial team reviews structure, clarity, and evidence quality.</li>
                <li>Approved drafts move through formatting and SEO optimization.</li>
                <li>Published content gets distributed across newsletter and search surfaces.</li>
              </ul>
              <Button className="techmix-btn mt-6" asChild>
                <Link href="/contact">Pitch a story idea</Link>
              </Button>
            </CardContent>
          </Card>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold text-[#10263c]">Core team</h2>
          <p className="mt-2 text-sm text-[#3f5a4c]">
            Editorial, product, and growth specialists shaping the platform experience.
          </p>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {mockTeamMembers.map((member) => (
              <Card
                key={member.id}
                className="techmix-panel transition-transform hover:-translate-y-1"
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={member.avatar} alt={member.name} />
                      <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-semibold text-[#10263c]">{member.name}</p>
                      <p className="text-xs text-[#3f5a4c]">{member.role}</p>
                    </div>
                  </div>
                  <p className="mt-3 text-sm text-[#3f5a4c]">{member.bio}</p>
                  <p className="mt-3 text-xs text-[#3f5a4c]">{member.location}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
