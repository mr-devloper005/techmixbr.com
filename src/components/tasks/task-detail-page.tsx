import { ContentImage } from "@/components/shared/content-image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin, Globe, Phone, Tag, Mail, Clock } from "lucide-react";
import { NavbarShell } from "@/components/shared/navbar-shell";
import { Footer } from "@/components/shared/footer";
import { TaskPostCard } from "@/components/shared/task-post-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { buildPostUrl, fetchTaskPostBySlug, fetchTaskPosts } from "@/lib/task-data";
import { SITE_CONFIG, getTaskConfig, type TaskKey } from "@/lib/site-config";
import type { SitePost } from "@/lib/site-connector";
import { TaskImageCarousel } from "@/components/tasks/task-image-carousel";
import { cn } from "@/lib/utils";
import { ArticleComments } from "@/components/tasks/article-comments";
import { ArticleShareButtons } from "@/components/tasks/article-share-buttons";
import { SchemaJsonLd } from "@/components/seo/schema-jsonld";
import { RichContent, formatRichHtml } from "@/components/shared/rich-content";
import { getFactoryState } from "@/design/factory/get-factory-state";
import { getProductKind } from "@/design/factory/get-product-kind";
import { DirectoryTaskDetailPage } from "@/design/products/directory/task-detail-page";
import { TASK_DETAIL_PAGE_OVERRIDE_ENABLED, TaskDetailPageOverride } from "@/overrides/task-detail-page";

type PostContent = {
  category?: string;
  location?: string;
  address?: string;
  website?: string;
  phone?: string;
  email?: string;
  description?: string;
  body?: string;
  excerpt?: string;
  author?: string;
  highlights?: string[];
  logo?: string;
  images?: string[];
  latitude?: number | string;
  longitude?: number | string;
};

const isValidImageUrl = (value?: string | null) =>
  typeof value === "string" && (value.startsWith("/") || /^https?:\/\//i.test(value));

const absoluteUrl = (value?: string | null) => {
  if (!value) return null;
  if (/^https?:\/\//i.test(value)) return value;
  if (!value.startsWith("/")) return null;
  return `${SITE_CONFIG.baseUrl.replace(/\/$/, "")}${value}`;
};

const getContent = (post: SitePost): PostContent => {
  const content = post.content && typeof post.content === "object" ? post.content : {};
  return content as PostContent;
};

const formatArticleHtml = (content: PostContent, post: SitePost) => {
  const raw =
    (typeof content.body === "string" && content.body.trim()) ||
    (typeof content.description === "string" && content.description.trim()) ||
    (typeof post.summary === "string" && post.summary.trim()) ||
    "";

  return formatRichHtml(raw, "Details coming soon.");
};

const getImageUrls = (post: SitePost, content: PostContent) => {
  const media = Array.isArray(post.media) ? post.media : [];
  const mediaImages = media
    .map((item) => item?.url)
    .filter((url): url is string => isValidImageUrl(url));
  const contentImages = Array.isArray(content.images)
    ? content.images.filter((url): url is string => isValidImageUrl(url))
    : [];
  const merged = [...mediaImages, ...contentImages];
  if (merged.length) return merged;
  if (isValidImageUrl(content.logo)) return [content.logo as string];
  return ["/placeholder.svg?height=900&width=1400"];
};

const toNumber = (value?: number | string) => {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string") {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
  }
  return null;
};

const calculateReadingTime = (html: string): number => {
  const text = html.replace(/<[^>]*>/g, '');
  const words = text.split(/\s+/).filter(word => word.length > 0).length;
  const wordsPerMinute = 200;
  return Math.ceil(words / wordsPerMinute);
};

const extractHeadings = (html: string): { id: string; text: string; level: number }[] => {
  const headingRegex = /<h([2-6])[^>]*>(.*?)<\/h[2-6]>/gi;
  const headings: { id: string; text: string; level: number }[] = [];
  let match;
  
  while ((match = headingRegex.exec(html)) !== null) {
    const level = parseInt(match[1]);
    const text = match[2].replace(/<[^>]*>/g, '').trim();
    const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    headings.push({ id, text, level });
  }
  
  return headings;
};

const addIdsToHeadings = (html: string): string => {
  return html.replace(/<h([2-6])([^>]*)>(.*?)<\/h[2-6]>/gi, (match, level, attrs, text) => {
    const cleanText = text.replace(/<[^>]*>/g, '').trim();
    const id = cleanText.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    return `<h${level}${attrs} id="${id}">${text}</h${level}>`;
  });
};

function TableOfContents({ headings }: { headings: { id: string; text: string; level: number }[] }) {
  if (headings.length === 0) return null;

  return (
    <div className="techmix-panel sticky top-24 rounded-2xl p-6">
      <h3 className="text-lg font-semibold text-foreground">CONTENTS</h3>
      <nav className="mt-4">
        <ul className="space-y-2 text-sm">
          {headings.map((heading) => (
            <li key={heading.id}>
              <a
                href={`#${heading.id}`}
                className={cn(
                  "block text-muted-foreground hover:text-foreground transition-colors",
                  heading.level === 3 && "pl-4",
                  heading.level === 4 && "pl-8",
                  heading.level === 5 && "pl-12",
                  heading.level === 6 && "pl-16"
                )}
              >
                {heading.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

const buildMapEmbedUrl = (
  latitude?: number | string,
  longitude?: number | string,
  address?: string
) => {
  const lat = toNumber(latitude);
  const lon = toNumber(longitude);
  const normalizedAddress = typeof address === "string" ? address.trim() : "";
  const googleMapsEmbedApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_API_KEY?.trim();

  if (googleMapsEmbedApiKey) {
    const query = lat !== null && lon !== null ? `${lat},${lon}` : normalizedAddress;
    if (!query) return null;
    return `https://www.google.com/maps/embed/v1/place?key=${encodeURIComponent(
      googleMapsEmbedApiKey
    )}&q=${encodeURIComponent(query)}`;
  }

  if (lat !== null && lon !== null) {
    const delta = 0.01;
    const left = lon - delta;
    const right = lon + delta;
    const bottom = lat - delta;
    const top = lat + delta;
    const bbox = `${left},${bottom},${right},${top}`;
    return `https://www.openstreetmap.org/export/embed.html?bbox=${encodeURIComponent(
      bbox
    )}&layer=mapnik&marker=${encodeURIComponent(`${lat},${lon}`)}`;
  }

  if (normalizedAddress) {
    return `https://www.google.com/maps?q=${encodeURIComponent(normalizedAddress)}&output=embed`;
  }

  return null;
};

export async function TaskDetailPage({ task, slug }: { task: TaskKey; slug: string }) {
  if (TASK_DETAIL_PAGE_OVERRIDE_ENABLED) {
    return await TaskDetailPageOverride({ task, slug });
  }

  const taskConfig = getTaskConfig(task);
  let post: SitePost | null = null;
  try {
    post = await fetchTaskPostBySlug(task, slug);
  } catch (error) {
    console.warn("Failed to load post detail", error);
  }

  if (!post) {
    notFound();
  }

  const content = getContent(post);
  const isClassified = task === "classified";
  const isArticle = task === "article";
  const category = content.category || post.tags?.[0] || taskConfig?.label || task;
  const description = content.description || post.summary || "Details coming soon.";
  const descriptionHtml = !isArticle ? formatRichHtml(description, "Details coming soon.") : "";
  const rawArticleHtml = isArticle ? formatArticleHtml(content, post) : "";
  const articleHtml = isArticle ? addIdsToHeadings(rawArticleHtml) : "";
  const readingTime = isArticle ? calculateReadingTime(rawArticleHtml) : 0;
  const tocHeadings = isArticle ? extractHeadings(rawArticleHtml) : [];
  const articleSummary =
    post.summary ||
    (typeof content.excerpt === "string" ? content.excerpt : "") ||
    "";
  const articleAuthor =
    (typeof content.author === "string" && content.author.trim()) ||
    post.authorName ||
    "Editorial Team";
  const articleDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("en-IN", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";
  const postTags = Array.isArray(post.tags) ? post.tags.filter((tag) => typeof tag === "string") : [];
  const location = content.address || content.location;
  const images = getImageUrls(post, content);
  const mapEmbedUrl = buildMapEmbedUrl(content.latitude, content.longitude, location);
  const isBookmark = task === "sbm" || task === "social";
  const hideSidebar = isClassified || task === "image" || isBookmark;
  const showArticleSidebar = isArticle && tocHeadings.length > 0;
  const related = (await fetchTaskPosts(task, 6))
    .filter((item) => item.slug !== post.slug)
    .filter((item) => {
      if (!content.category) return true;
      const itemContent = getContent(item);
      return itemContent.category === content.category;
    })
    .slice(0, 3);
  const articleUrl = `${SITE_CONFIG.baseUrl.replace(/\/$/, "")}${taskConfig?.route || "/articles"}/${post.slug}`;
  const articleImage = absoluteUrl(images[0]) || absoluteUrl(SITE_CONFIG.defaultOgImage);
  const articleSchema = isArticle
    ? {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: post.title,
        description: articleSummary || description,
        image: articleImage ? [articleImage] : [],
        author: {
          "@type": "Person",
          name: articleAuthor,
        },
        datePublished: post.publishedAt || undefined,
        dateModified: post.publishedAt || undefined,
        articleSection: category,
        keywords: postTags.join(", "),
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": articleUrl,
        },
      }
    : null;
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_CONFIG.baseUrl.replace(/\/$/, ""),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: taskConfig?.label || "Posts",
        item: `${SITE_CONFIG.baseUrl.replace(/\/$/, "")}${taskConfig?.route || "/"}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `${SITE_CONFIG.baseUrl.replace(/\/$/, "")}${taskConfig?.route || "/posts"}/${post.slug}`,
      },
    ],
  };
  const schemaPayload = articleSchema ? [articleSchema, breadcrumbSchema] : breadcrumbSchema;
  const { recipe } = getFactoryState();
  const productKind = getProductKind(recipe);

  if (productKind === "directory" && (task === "listing" || task === "classified" || task === "profile")) {
    return (
      <div className="min-h-screen bg-[#f8fbff]">
        <NavbarShell />
        <DirectoryTaskDetailPage
          task={task}
          taskLabel={taskConfig?.label || task}
          taskRoute={taskConfig?.route || "/"}
          post={post}
          description={description}
          category={category}
          images={images}
          mapEmbedUrl={mapEmbedUrl}
          related={related}
        />
        <Footer />
      </div>
    );
  }

  return (
    <div className="techmix-shell min-h-screen text-[#10231a]">
      <NavbarShell />
      <main className="mx-auto w-full max-w-[1450px] px-4 py-10 sm:px-6 lg:px-8">
        <SchemaJsonLd data={schemaPayload} />
        <Link
          href={taskConfig?.route || "/"}
          className="mb-6 inline-flex items-center text-sm text-[#3f5a4c] hover:text-[#10231a]"
        >
          ← Back to {taskConfig?.label || "posts"}
        </Link>

        <div
          className={cn(
            "grid gap-10",
            hideSidebar && !showArticleSidebar ? "lg:grid-cols-1" : "lg:grid-cols-[2fr_1fr]"
          )}
        >
          <div className={cn(isClassified ? "space-y-8" : "")}>
            {isArticle ? (
              <div className="mx-auto w-full max-w-4xl space-y-8">
                <div className="space-y-6">
                  <h1 className="text-4xl font-bold leading-tight text-foreground sm:text-5xl">
                    {post.title}
                  </h1>
                  <div className="flex flex-wrap items-center justify-between gap-4 border-y border-border py-4">
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
                      <span className="font-medium text-foreground">By {articleAuthor}</span>
                      {readingTime > 0 && (
                        <span className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" />
                          {readingTime} min read
                        </span>
                      )}
                      <Badge variant="secondary" className="inline-flex items-center gap-1">
                        <Tag className="h-3.5 w-3.5" />
                        {category}
                      </Badge>
                    </div>
                    <ArticleShareButtons url={articleUrl} title={post.title} />
                  </div>
                </div>
                {images[0] ? (
                  <div className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl border border-border bg-muted">
                    <ContentImage
                      src={images[0]}
                      alt={`${post.title} featured image`}
                      fill
                      className="object-cover"
                      intrinsicWidth={1600}
                      intrinsicHeight={900}
                    />
                  </div>
                ) : null}
                {postTags.length ? (
                  <div className="flex flex-wrap gap-2">
                    {postTags.map((tag) => (
                      <Badge key={tag} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                ) : null}
                <div className="prose prose-lg max-w-none">
                  <RichContent 
                    html={articleHtml} 
                    className="leading-8 prose-p:my-6 prose-h2:my-8 prose-h3:my-6 prose-ul:my-6 [&_p:first-child::first-letter]:float-left [&_p:first-child::first-letter]:text-6xl [&_p:first-child::first-letter]:font-bold [&_p:first-child::first-letter]:leading-none [&_p:first-child::first-letter]:mr-2 [&_p:first-child::first-letter]:mt-1 [&_p:first-child::first-letter]:text-foreground" 
                  />
                </div>
                <ArticleComments slug={post.slug} />
              </div>
            ) : null}

            {!isArticle ? (
              <>
                {!isBookmark ? (
                  <div className={cn(isClassified ? "w-full" : "")}>
                    <TaskImageCarousel images={images} />
                  </div>
                ) : null}

                <div className={cn(isClassified ? "mx-auto w-full max-w-4xl" : "mt-6")}>
                  <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                    <Badge variant="secondary" className="inline-flex items-center gap-1">
                      <Tag className="h-3.5 w-3.5" />
                      {category}
                    </Badge>
                    {location && (
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {location}
                      </span>
                    )}
                  </div>
                  <h1 className="mt-4 text-3xl font-semibold text-foreground">{post.title}</h1>
                  <RichContent html={descriptionHtml} className="mt-3 max-w-3xl" />
                </div>
              </>
            ) : null}

            {isClassified ? (
              <div className="techmix-panel mx-auto w-full max-w-4xl rounded-2xl p-6">
                <h2 className="text-lg font-semibold text-foreground">Business details</h2>
                <div className="mt-4 space-y-3 text-sm text-muted-foreground">
                  {content.website && (
                    <div className="flex items-start gap-2">
                      <Globe className="mt-0.5 h-4 w-4" />
                      <a
                        href={content.website}
                        className="break-all text-foreground hover:underline"
                        target="_blank"
                        rel="noreferrer"
                      >
                        {content.website}
                      </a>
                    </div>
                  )}
                  {content.phone && (
                    <div className="flex items-start gap-2">
                      <Phone className="mt-0.5 h-4 w-4" />
                      <span>{content.phone}</span>
                    </div>
                  )}
                  {content.email && (
                    <div className="flex items-start gap-2">
                      <Mail className="mt-0.5 h-4 w-4" />
                      <a
                        href={`mailto:${content.email}`}
                        className="break-all text-foreground hover:underline"
                      >
                        {content.email}
                      </a>
                    </div>
                  )}
                  {location && (
                    <div className="flex items-start gap-2">
                      <MapPin className="mt-0.5 h-4 w-4" />
                      <span>{location}</span>
                    </div>
                  )}
                </div>
              </div>
            ) : null}

            {content.highlights?.length && !isArticle ? (
              <div className={cn("techmix-panel mt-8 rounded-2xl p-6", isClassified ? "mx-auto w-full max-w-4xl" : "")}>
                <h2 className="text-lg font-semibold text-foreground">Highlights</h2>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  {content.highlights.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </div>
            ) : null}

            {isClassified && mapEmbedUrl ? (
              <div className="techmix-panel mx-auto w-full max-w-4xl rounded-2xl p-4">
                <p className="text-sm font-semibold text-foreground">Location map</p>
                <div className="mt-4 overflow-hidden rounded-xl border border-border">
                  <iframe
                    title="Business location map"
                    src={mapEmbedUrl}
                    className="h-56 w-full"
                    loading="lazy"
                  />
                </div>
              </div>
            ) : null}

          </div>

          {!hideSidebar || showArticleSidebar ? (
            <aside className="space-y-6">
            {isArticle ? (
              <TableOfContents headings={tocHeadings} />
            ) : (
              <>
                <div className="techmix-panel rounded-2xl p-6">
                  <h2 className="text-lg font-semibold text-foreground">Listing details</h2>
                    <div className="mt-4 space-y-3 text-sm text-muted-foreground">
                      {content.website && (
                        <div className="flex items-start gap-2">
                          <Globe className="mt-0.5 h-4 w-4" />
                          <a
                            href={content.website}
                            className="break-all text-foreground hover:underline"
                            target="_blank"
                            rel="noreferrer"
                          >
                            {content.website}
                          </a>
                        </div>
                      )}
                      {content.phone && (
                        <div className="flex items-start gap-2">
                          <Phone className="mt-0.5 h-4 w-4" />
                          <span>{content.phone}</span>
                        </div>
                      )}
                      {content.email && (
                        <div className="flex items-start gap-2">
                          <Mail className="mt-0.5 h-4 w-4" />
                          <a
                            href={`mailto:${content.email}`}
                            className="break-all text-foreground hover:underline"
                          >
                            {content.email}
                          </a>
                        </div>
                      )}
                      {location && (
                        <div className="flex items-start gap-2">
                          <MapPin className="mt-0.5 h-4 w-4" />
                          <span>{location}</span>
                        </div>
                      )}
                    </div>
                  {content.website ? (
                    <Button className="mt-5 w-full" asChild>
                      <a href={content.website} target="_blank" rel="noreferrer">
                        Visit Website
                      </a>
                    </Button>
                  ) : null}
                </div>

                {mapEmbedUrl ? (
                  <div className="techmix-panel rounded-2xl p-4">
                    <p className="text-sm font-semibold text-foreground">Location map</p>
                    <div className="mt-4 overflow-hidden rounded-xl border border-border">
                      <iframe
                        title="Business location map"
                        src={mapEmbedUrl}
                        className="h-56 w-full"
                        loading="lazy"
                      />
                    </div>
                  </div>
                ) : null}
              </>
            )}

          </aside>
          ) : null}
        </div>

        <section className="mt-12">
          {related.length ? (
            <>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-foreground">
                More in {category}
              </h2>
              {taskConfig?.route && (
                <Link
                  href={taskConfig.route}
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  View all
                </Link>
              )}
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <TaskPostCard
                  key={item.id}
                  post={item}
                  href={buildPostUrl(task, item.slug)}
                />
              ))}
            </div>
            </>
          ) : null}
          <nav className="techmix-panel mt-6 rounded-2xl p-4">
            <p className="text-sm font-semibold text-foreground">Related links</p>
            <ul className="mt-2 space-y-2 text-sm">
              {related.map((item) => (
                <li key={`link-${item.id}`}>
                  <Link
                    href={buildPostUrl(task, item.slug)}
                    className="text-primary underline-offset-4 hover:underline"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
              {taskConfig?.route ? (
                <li>
                  <Link
                    href={taskConfig.route}
                    className="text-primary underline-offset-4 hover:underline"
                  >
                    Browse all {taskConfig.label}
                  </Link>
                </li>
              ) : null}
              <li>
                <Link
                  href={`/search?q=${encodeURIComponent(category)}`}
                  className="text-primary underline-offset-4 hover:underline"
                >
                  Search more in {category}
                </Link>
              </li>
            </ul>
          </nav>
        </section>
      </main>
      <Footer />
    </div>
  );
}
