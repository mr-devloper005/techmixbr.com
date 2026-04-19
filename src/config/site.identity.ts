export const siteIdentity = {
  code: process.env.NEXT_PUBLIC_SITE_CODE || 'tb9v4q2m7x',
  name: process.env.NEXT_PUBLIC_SITE_NAME || 'Techmix BR',
  tagline: process.env.NEXT_PUBLIC_SITE_TAGLINE || 'Technology and growth journal',
  description:
    process.env.NEXT_PUBLIC_SITE_DESCRIPTION ||
    'An article-first technology publication focused on AI tools, digital growth, and practical business insights.',
  domain: process.env.NEXT_PUBLIC_SITE_DOMAIN || 'techmixbr.com',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://techmixbr.com',
  ogImage: process.env.NEXT_PUBLIC_SITE_OG_IMAGE || '/og-default.png',
  googleMapsEmbedApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_API_KEY || 'AIzaSyBco7dIECu3rJWjP3J0MImnR_uxlbeqAe0',

} as const

export const defaultAuthorProfile = {
  name: siteIdentity.name,
  avatar: '/placeholder.svg?height=80&width=80',
} as const
