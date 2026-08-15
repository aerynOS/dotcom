import ogImageSrc from "@/images/logo.png";

export const SITE = {
  title: "aerynOS",
  tagline: "A alpha performance focused Linux distribution",
  description: "aerynOS is an independent performance-oriented Linux-based operating system that diverges significantly from traditional distributions whilst still aiming to provide a familiar and comfortable environment. The code-base is currently in an alpha technical preview stage, which means that it is not yet ready for widespread use. However, we are committed to eventually providing a stable and reliable operating system that will be easy to use and customize.",
  description_short: "aerynOS is an independent performance-oriented Linux-based operating system that diverges significantly from traditional distributions whilst still aiming to provide a familiar and comfortable environment.",
  url: "https://aerynos.com",
  author: "aerynOS Team",
};

export const SEO = {
  title: SITE.title,
  description: SITE.description,
  structuredData: {
    "@context": "https://schema.org",
    "@type": "WebPage",
    inLanguage: "en-US",
    "@id": SITE.url,
    url: SITE.url,
    name: SITE.title,
    description: SITE.description,
    isPartOf: {
      "@type": "WebSite",
      url: SITE.url,
      name: SITE.title,
      description: SITE.description,
    },
  },
};

export const OG = {
  locale: "en_US",
  type: "website",
  url: SITE.url,
  title: `${SITE.title}: : Hardware Tools & Construction Services`,
  description: "Equip your projects with ScrewFast's top-quality hardware tools and expert construction services. Trusted by industry leaders, ScrewFast offers simplicity, affordability, and reliability. Experience the difference with user-centric design and cutting-edge tools. Start exploring now!",
  image: ogImageSrc,
};

export const COMMUNITY = [
  {
    title: "Zulip",
    description: "Join our community on Zulip.",
    url: "https://aerynos.zulipchat.com/join/fuqokhsomj5mzqj6akqaiqlr/",
    icon: "tabler:brand-zulip",
  },
  {
    title: "GitHub Discussions",
    description: "Join the conversation on GitHub.",
    url: "https://github.com/aerynOS",
    icon: "tabler:brand-github",
  },
  {
    title: "X",
    description: "Join our community on X.",
    url: "https://x.com/aerynOS_Linux",
    icon: "tabler:brand-x",
  },
  {
    title: "Mastodon",
    description: "Join our community on Mastodon.",
    url: "https://hachyderm.io/@aerynOS",
    icon: "tabler:brand-mastodon",
  },
];

// An array of links for navigation bar
export const NAVBAR_LINKS = [
  { name: "About", url: "/about" },
  { name: "Blog", url: "/blog" },
  { name: "Download", url: "/download" },
  { name: "Documentation", url: "/docs" },
  { name: "Sponsor", url: "/sponsor" },
  { name: "Community", url: "/community" },
]

type FooterLinksType = {
  section: string
  links: { name: string; url: string }[]
}
// An array of links for footer
export const FOOTER_LINKS: FooterLinksType[] = []
