import Link from 'next/link'
import { ArrowRight, BarChart3, BookOpen, Sparkles, Users } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { SchemaJsonLd } from '@/components/seo/schema-jsonld'
import { TaskPostCard } from '@/components/shared/task-post-card'
import { SITE_CONFIG } from '@/lib/site-config'
import { fetchTaskPosts } from '@/lib/task-data'

export const HOME_PAGE_OVERRIDE_ENABLED = true

export async function HomePageOverride() {
  const [articles, updates, tools] = await Promise.all([
    fetchTaskPosts('article', 12),
    fetchTaskPosts('comment', 6),
    fetchTaskPosts('sbm', 6),
  ])

  const featured = articles.slice(0, 3)
  const latest = articles.slice(3, 9)
  const sideUpdates = updates.slice(0, 3)
  const sideTools = tools.slice(0, 3)

  return (
    <div className="techmix-shell min-h-screen text-[#10231a]">
      <NavbarShell />
      <main className="mx-auto max-w-[1450px] px-4 pb-14 pt-7 sm:px-6 lg:px-8">
        <SchemaJsonLd
          data={{
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: SITE_CONFIG.name,
            url: SITE_CONFIG.baseUrl,
          }}
        />

        <section className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <div className="techmix-panel rounded-[2rem] p-7 sm:p-9">
            <div className="techmix-badge">
              <Sparkles className="h-3.5 w-3.5" />
              Article-first platform
            </div>
            <h1 className="mt-5 max-w-[13ch] text-5xl font-semibold tracking-[-0.06em] text-[#10263c] sm:text-6xl">
              Smarter marketing and AI insights for real growth.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-8 text-[#3f5a4c]">
              Techmix BR brings practical software analysis, digital marketing strategy, and actionable business content into one cleaner publishing experience.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/articles" className="techmix-btn">
                Read latest
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/blog" className="techmix-btn-soft">
                Explore guides
              </Link>
            </div>
            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              <div className="techmix-stat">
                <BookOpen className="h-4 w-4 text-[#45b76b]" />
                <p className="mt-3 text-lg font-semibold text-[#10263c]">Long-form</p>
                <p className="mt-2 text-sm leading-6 text-[#3f5a4c]">Detailed reviews and strategic explainers.</p>
              </div>
              <div className="techmix-stat">
                <BarChart3 className="h-4 w-4 text-[#45b76b]" />
                <p className="mt-3 text-lg font-semibold text-[#10263c]">Data-driven</p>
                <p className="mt-2 text-sm leading-6 text-[#3f5a4c]">Tool-focused coverage with practical context.</p>
              </div>
              <div className="techmix-stat">
                <Users className="h-4 w-4 text-[#45b76b]" />
                <p className="mt-3 text-lg font-semibold text-[#10263c]">Community</p>
                <p className="mt-2 text-sm leading-6 text-[#3f5a4c]">Trends, updates, and useful references.</p>
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {featured.map((post, index) => (
              <TaskPostCard key={post.id ?? `${post.slug}-${index}`} post={post} href={`/articles/${post.slug}`} taskKey="article" />
            ))}
          </div>
        </section>

        <section className="mt-12 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="techmix-panel rounded-[2rem] p-6 sm:p-7">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-3xl font-semibold tracking-[-0.05em] text-[#10263c]">Latest updates</h2>
              <Link href="/articles" className="text-sm font-semibold text-[#2b7244]">View all</Link>
            </div>
            <div className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {latest.map((post, index) => (
                <TaskPostCard key={post.id ?? `${post.slug}-${index}`} post={post} href={`/articles/${post.slug}`} taskKey="article" compact />
              ))}
            </div>
          </div>

          <div className="grid gap-6">
            <div className="techmix-panel-strong rounded-[2rem] p-6">
              <h3 className="text-2xl font-semibold tracking-[-0.04em] text-[#0f2237]">Community signals</h3>
              <div className="mt-4 grid gap-4">
                {sideUpdates.map((post, index) => (
                  <TaskPostCard key={post.id ?? `${post.slug}-${index}`} post={post} href={`/blog/${post.slug}`} taskKey="comment" compact />
                ))}
              </div>
            </div>
            <div className="techmix-panel rounded-[2rem] p-6">
              <h3 className="text-2xl font-semibold tracking-[-0.04em] text-[#0f2237]">Tool picks</h3>
              <div className="mt-4 grid gap-4">
                {sideTools.map((post, index) => (
                  <TaskPostCard key={post.id ?? `${post.slug}-${index}`} post={post} href={`/sbm/${post.slug}`} taskKey="sbm" compact />
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
