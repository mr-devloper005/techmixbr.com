import { NavbarShell } from "@/components/shared/navbar-shell";
import { Footer } from "@/components/shared/footer";
import { Card, CardContent } from "@/components/ui/card";
import { SITE_CONFIG } from "@/lib/site-config";

const sections = [
  {
    title: "Account Usage",
    body: "Keep your credentials secure, provide accurate profile information, and follow community rules.",
  },
  {
    title: "Content Ownership",
    body: "You retain ownership of submitted content and grant us a license to host and distribute it.",
  },
  {
    title: "Acceptable Use",
    body: "No spam, malware, impersonation, harassment, or illegal content across any site surface.",
  },
  {
    title: "Service Availability",
    body: "We continuously improve reliability but cannot guarantee uninterrupted service at all times.",
  },
  {
    title: "Enforcement",
    body: "Violations can result in content removal, account restrictions, or permanent suspension.",
  },
];

const policyNotes = [
  { title: "Legal requests", value: "Processed per applicable law and jurisdiction." },
  { title: "Appeal process", value: "Users can submit a review request for moderation actions." },
  { title: "Policy changes", value: "Material updates are announced before they become effective." },
];

export default function TermsPage() {
  return (
    <div className="techmix-shell min-h-screen text-[#10231a]">
      <NavbarShell />
      <main className="mx-auto w-full max-w-[1450px] px-4 py-12 sm:px-6 lg:px-8">
        <section className="techmix-panel rounded-[2rem] p-6 sm:p-8">
          <h1 className="text-3xl font-semibold tracking-[-0.04em] text-[#10263c]">Terms of Service</h1>
          <p className="mt-2 text-sm text-[#3f5a4c]">{`The rules and guidelines for using ${SITE_CONFIG.name}.`}</p>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <Card className="techmix-panel">
            <CardContent className="space-y-4 p-6">
              <p className="text-xs uppercase tracking-[0.2em] text-[#2b7244]">Last updated: April 15, 2026</p>
              {sections.map((section) => (
                <div
                  key={section.title}
                  className="rounded-lg border border-[rgba(27,74,53,0.12)] bg-white/70 p-4"
                >
                  <h3 className="text-sm font-semibold text-[#10263c]">{section.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-[#3f5a4c]">{section.body}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="techmix-panel">
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold text-[#10263c]">Policy notes</h2>
              <p className="mt-2 text-sm text-[#3f5a4c]">
                Additional operational guidance for moderation, legal process, and policy updates.
              </p>
              <div className="mt-5 space-y-3">
                {policyNotes.map((note) => (
                  <div
                    key={note.title}
                    className="rounded-xl border border-[rgba(27,74,53,0.12)] bg-white/75 p-4"
                  >
                    <p className="text-sm font-semibold text-[#10263c]">{note.title}</p>
                    <p className="mt-1 text-sm text-[#3f5a4c]">{note.value}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
      <Footer />
    </div>
  );
}
