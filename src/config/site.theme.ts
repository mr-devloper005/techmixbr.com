import { defineSiteTheme } from '@/config/site.theme.defaults'

export const SITE_THEME = defineSiteTheme({
  shell: 'editorial',
  hero: {
    variant: 'spotlight-split',
    eyebrow: 'Premium multi-surface publishing system',
  },
  home: {
    layout: 'editorial-rhythm',
    primaryTask: 'article',
    featuredTaskKeys: ['article', 'profile', 'image'],
  },
  navigation: {
    variant: 'editorial',
  },
  footer: {
    variant: 'editorial',
  },
  cards: {
    listing: 'listing-elevated',
    article: 'listing-elevated',
    image: 'listing-elevated',
    profile: 'listing-elevated',
    classified: 'listing-elevated',
    pdf: 'listing-elevated',
    sbm: 'listing-elevated',
    social: 'listing-elevated',
    org: 'listing-elevated',
    comment: 'listing-elevated',
  },
})
