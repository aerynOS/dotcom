import { defineConfig, svgoOptimizer } from "astro/config";
import icon from "astro-icon"
import starlight from '@astrojs/starlight'
import starlightBlog from 'starlight-blog'
import astroBrokenLinksChecker from 'astro-broken-link-checker';
import mdx from "@astrojs/mdx"

// https://astro.build/config
export default defineConfig({
  // https://docs.astro.build/en/guides/images/#authorizing-remote-images
  site: "https://aerynos.com",
  // image: {
  //   domains: ["images.unsplash.com"],
  // },
  // i18n: {
  //   defaultLocale: "en",
  //   locales: ["en"],
  //   fallback: {},
  //   routing: {
  //     prefixDefaultLocale: false,
  //   },
  // },
  prefetch: true,
  integrations: [
    astroBrokenLinksChecker({
      logFilePath: 'dist/broken-links.log', // Optional: specify the log file path
      checkExternalLinks: false // Optional: check external links (currently, caching to disk is not supported, and it is slow )
    }),
    icon(),
    // tailwind(),
    starlight({ // Starlight config:
      title: "aerynOS",
      logo: {
        dark: '@/images/logo.svg',
        light: '@/images/logo-light-mode.svg',
        replacesTitle: true,
      },
      favicon: '/images/favicons/favicon.svg', // Starlight requires favicons from the public/ directory
      head: [
        // favicon set
        { tag: 'link', attrs: { rel: 'shortcut icon', href: 'favicon.ico', media: '(prefers-color-scheme: light)' } },
        { tag: 'link', attrs: { rel: 'shortcut icon', href: '/images/favicons/favicon-dark.ico', media: '(prefers-color-scheme: dark)' } },
      ],
      sidebar: [
        { slug: '' },
        { slug: 'about' },
        { slug: 'download' },
        { slug: 'community' },
        { slug: 'privacy' },
        { slug: 'sponsor' },
        {
          label: 'Tooling',
          collapsed: true,
          items: [
            { slug: 'tooling' },
            { slug: 'tooling/moss' },
            { slug: 'tooling/boulder' },
          ]
        },
        { label: 'Blog', link: '/blog' },
      ],
      plugins: [
        starlightBlog({
          title: "Blog",
          recentPostCount: 100,
          metrics: {
            readingTime: true,
            words: 'total',
            },
          authors: {
            ikey: {
              name: 'Ikey',
              title: 'Founder: Retired',
              picture: '/images/authors/ikey.jpg',
              url: 'https://github.com/ikeycode',
            },
            sunnyflunk: {
              name: 'SunnyFlunk',
              title: 'Distro Engineer: Retired',
              picture: '/images/authors/sunnyflunk.png',
              url: 'https://github.com/sunnyflunk',
            },
            ermo: {
              name: 'ermo',
              title: 'Co-founder & Project Steward',
              picture: '/images/authors/ermo.png',
              url: 'https://github.com/ermo',
            },
            nomadiccore: {
              name: 'NomadicCore',
              title: 'Project Comms',
              picture: '/images/authors/khaga87.png',
              url: 'https://github.com/khaga87',
            },
            khaga87: {
              name: 'khaga87',
              title: 'Project Comms',
              picture: '/images/authors/khaga87.png',
              url: 'https://github.com/khaga87',
            },
            joebonrichie: {
              name: 'Joey Riches',
              picture: '/images/authors/joey.png',
              url: 'https://github.com/joebonrichie'
            }
          },
        }),
      ],
      customCss: [
        "@/styles/global.css",
      ],
      components: {
        Sidebar: "@/components/starlight-overrides/Sidebar.astro",
        Pagination: "@/components/starlight-overrides/Pagination.astro",
        SocialIcons: '@/components/starlight-overrides/SocialIcons.astro',
        PageTitle: '@/components/starlight-overrides/PageTitle.astro',
        ContentPanel: '@/components/starlight-overrides/ContentPanel.astro',

      },
      credits: false,
    }),
    // sitemap({
    //   i18n: {
    //     defaultLocale: "en", // All urls that don't contain `fr` after `https://aerynos.com/` will be treated as default locale, i.e. `en`
    //     locales: {
    //       en: "en", // The `defaultLocale` value must present in `locales` keys
    //       // fr: "fr",
    //     },
    //   },
    // }),

    // pre-compress them generated files - requires web server to be configured to look for these first
    // compressor({
    //   gzip: false,
    //   brotli: true,
    // }),

    mdx()
  ],
  experimental: {
    clientPrerender: true,
    svgOptimizer: svgoOptimizer()
  },
})
